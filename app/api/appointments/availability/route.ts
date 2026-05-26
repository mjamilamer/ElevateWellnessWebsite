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
import { getServicePage } from '@/lib/service-content'
import { assignDoctor, allServiceSlugs } from '@/lib/scheduling/assignment'
import { generateCandidateSlots, formatSlotLabel } from '@/lib/scheduling/slots'
import { calendarConfigured, listEventsInRange } from '@/lib/server/google-calendar'

const MAX_PER_DOCTOR = 2
const MAX_RESULTS = 5

const availabilitySchema = z.object({
  service: z.string().refine((s) => allServiceSlugs().includes(s), {
    message: 'Unknown service',
  }),
  dateFrom: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  dateTo: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  timeOfDay: z.enum(['any', 'morning', 'afternoon']).default('any'),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = availabilitySchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: parsed.error.issues },
        { status: 400 }
      )
    }
    const { service, dateFrom, dateTo, timeOfDay } = parsed.data

    const assignment = assignDoctor(service)
    if (!assignment) {
      return NextResponse.json({ error: 'No provider configured for this service' }, { status: 400 })
    }

    const doctor = siteConfig.team.physicians.find((p) => p.slug === assignment.doctor)
    if (!doctor) {
      return NextResponse.json({ error: 'Physician metadata missing' }, { status: 500 })
    }

    const candidates = generateCandidateSlots({ dateFrom, dateTo, timeOfDay })

    // If Calendar isn't configured, return the first N candidates straight away.
    if (!calendarConfigured() || candidates.length === 0) {
      const slots = candidates.slice(0, MAX_RESULTS).map((c) => ({
        startISO: c.start.toISOString(),
        endISO: c.end.toISOString(),
        label: formatSlotLabel(c.start),
      }))
      return NextResponse.json({
        doctor: { slug: doctor.slug, name: doctor.name, confidence: assignment.confidence },
        slots,
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

// Static helper to surface the service titles in any future client without
// re-importing service-content.
export function GET() {
  const services = allServiceSlugs().map((slug) => {
    const sp = getServicePage(slug)
    const assignment = assignDoctor(slug)!
    return {
      slug,
      title: sp?.title ?? slug,
      doctor: assignment.doctor,
      confidence: assignment.confidence,
    }
  })
  return NextResponse.json({ services })
}
