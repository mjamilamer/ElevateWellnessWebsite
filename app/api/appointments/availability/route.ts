/**
 * POST /api/appointments/availability
 *
 * Body: { service, dateFrom, dateTo, timeOfDay }
 * Returns 3–5 candidate appointment slots within the requested window.
 *
 * If Google Calendar is configured, the system applies the overlap rule
 * (max 2 per doctor). Otherwise it returns business-hour-only slots and the
 * manager validates manually on confirm.
 */

import { NextResponse } from 'next/server'
import { z } from 'zod'
import { siteConfig } from '@/lib/config'
import { assignDoctor, allServiceSlugs } from '@/lib/scheduling/assignment'
import { generateCandidateSlots, formatSlotLabel } from '@/lib/scheduling/slots'
import { clientIp } from '@/lib/server/api-utils'
import { rateLimit } from '@/lib/server/rate-limit'
import { schedulerCalendarEnabled, listEventsInRange } from '@/lib/server/google-calendar'

const MAX_PER_DOCTOR = 2
const MAX_RESULTS = 5

const OTHER_SERVICE_SLUG = 'other'

const availabilitySchema = z.object({
  service: z.string().refine((s) => allServiceSlugs().includes(s) || s === OTHER_SERVICE_SLUG, {
    message: 'Unknown service',
  }),
  dateFrom: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  dateTo: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  timeOfDay: z.enum(['any', 'morning', 'afternoon']).default('any'),
  // Only honored for the "Other" service: the patient's optional provider pick.
  doctorSlug: z.enum(['dr-kamil-amer', 'dr-kamal-amer']).optional(),
})

export async function POST(request: Request) {
  // Availability is browsed repeatedly while picking a slot, so the limit is
  // looser than the submit endpoint — it only guards against scripted floods.
  const limit = rateLimit(`apt:availability:${clientIp(request)}`, 40, 60_000)
  if (!limit.ok) {
    return NextResponse.json(
      { error: 'Too many requests. Please slow down.' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfterSec) } }
    )
  }

  try {
    const body = await request.json()
    const parsed = availabilitySchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: parsed.error.issues },
        { status: 400 }
      )
    }
    const { service, dateFrom, dateTo, timeOfDay, doctorSlug } = parsed.data

    const candidates = generateCandidateSlots({ dateFrom, dateTo, timeOfDay })

    const toSlot = (c: { start: Date; end: Date }) => ({
      startISO: c.start.toISOString(),
      endISO: c.end.toISOString(),
      label: formatSlotLabel(c.start),
    })

    // "Other" requests have no auto-assignment. Echo the patient's optional
    // provider pick (or "Our team" for no preference); the team routes on review.
    if (service === OTHER_SERVICE_SLUG) {
      const picked = doctorSlug
        ? siteConfig.team.physicians.find((p) => p.slug === doctorSlug)
        : null
      return NextResponse.json({
        doctor: picked
          ? { slug: picked.slug, name: picked.name, confidence: 'suggested' }
          : { slug: OTHER_SERVICE_SLUG, name: 'Our team', confidence: 'suggested' },
        slots: candidates.slice(0, MAX_RESULTS).map(toSlot),
        calendarChecked: false,
      })
    }

    const assignment = assignDoctor(service)
    if (!assignment) {
      return NextResponse.json({ error: 'No provider configured for this service' }, { status: 400 })
    }

    const doctor = siteConfig.team.physicians.find((p) => p.slug === assignment.doctor)
    if (!doctor) {
      return NextResponse.json({ error: 'Physician metadata missing' }, { status: 500 })
    }

    // If the Calendar scheduler is disabled, return the first N candidates straight away.
    if (!schedulerCalendarEnabled() || candidates.length === 0) {
      return NextResponse.json({
        doctor: { slug: doctor.slug, name: doctor.name, confidence: assignment.confidence },
        slots: candidates.slice(0, MAX_RESULTS).map(toSlot),
        calendarChecked: false,
      })
    }

    // Pull all events in the window and use them to filter overlapping slots.
    const windowStart = candidates[0].start
    const windowEnd = candidates[candidates.length - 1].end
    const events = await listEventsInRange({ start: windowStart, end: windowEnd })

    const doctorEmail = doctor.email.toLowerCase()
    const availableSlots = candidates.filter((c) => {
      // Count events overlapping this slot where the target doctor is an attendee
      const overlaps = events.filter((e) => {
        const overlapsTime = e.start < c.end && e.end > c.start
        if (!overlapsTime) return false
        return e.attendeeEmails.includes(doctorEmail)
      })
      return overlaps.length < MAX_PER_DOCTOR
    })

    // Spread results across distinct days when possible
    const seenDays = new Set<string>()
    const spread: typeof availableSlots = []
    for (const slot of availableSlots) {
      const dayKey = slot.start.toISOString().slice(0, 10)
      if (seenDays.has(dayKey) && spread.length >= 3) continue
      seenDays.add(dayKey)
      spread.push(slot)
      if (spread.length >= MAX_RESULTS) break
    }
    // If we didn't fill, top up from the linear list
    for (const slot of availableSlots) {
      if (spread.length >= MAX_RESULTS) break
      if (!spread.includes(slot)) spread.push(slot)
    }

    return NextResponse.json({
      doctor: { slug: doctor.slug, name: doctor.name, confidence: assignment.confidence },
      slots: spread.map((c) => ({
        startISO: c.start.toISOString(),
        endISO: c.end.toISOString(),
        label: formatSlotLabel(c.start),
      })),
      calendarChecked: true,
    })
  } catch (err) {
    console.error('Availability check failed:', err)
    return NextResponse.json({ error: 'Failed to compute availability' }, { status: 500 })
  }
}

