/**
 * POST /api/appointments/request
 *
 * Body: { service, slotStartISO, name, email, phone, reason? }
 * Creates a tentative event on the shared booking calendar (info@ + assigned
 * doctor as attendees; patient is NOT an attendee) and emails info@ with a
 * formatted summary + deep link.
 *
 * If Google Calendar isn't configured, falls back to email-only — the manager
 * still gets the request and can book manually.
 */

import { NextResponse } from 'next/server'
import { z } from 'zod'
import { siteConfig } from '@/lib/config'
import { getServicePage } from '@/lib/service-content'
import { assignDoctor, allServiceSlugs } from '@/lib/scheduling/assignment'
import {
  clientIp,
  containsPotentialPHI,
  generateId,
  sanitizeInput,
} from '@/lib/server/api-utils'
import { isValidSlotStart } from '@/lib/scheduling/slots'
import { rateLimit } from '@/lib/server/rate-limit'
import { mailConfigured, mailRecipient, sendEmail } from '@/lib/server/email'
import { appointmentTentativeEmail } from '@/lib/server/email-templates/appointment-tentative'
import { schedulerCalendarEnabled, createTentativeEvent } from '@/lib/server/google-calendar'

const SLOT_DURATION_MIN = 30
const OTHER_SERVICE_SLUG = 'other'
const OTHER_SERVICE_TITLE = 'Other — general inquiry'

const requestSchema = z.object({
  service: z
    .string()
    .refine((s) => allServiceSlugs().includes(s) || s === OTHER_SERVICE_SLUG, {
      message: 'Unknown service',
    }),
  slotStartISO: z.string().datetime(),
  secondarySlotStartISO: z.string().datetime().optional(),
  dateFrom: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  dateTo: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  timeOfDay: z.enum(['any', 'morning', 'afternoon']).optional(),
  doctorSlug: z.enum(['dr-kamil-amer', 'dr-kamal-amer']).optional(),
  firstName: z.string().min(1).max(60),
  lastName: z.string().min(1).max(60),
  email: z.string().email().max(255),
  phone: z.string().min(10).max(20),
  contactWindow: z.enum(['morning', 'afternoon', 'evening']).optional(),
  preferredContactMethod: z.enum(['phone', 'email', 'text']).optional(),
  reason: z.string().max(1000).optional(),
})

export async function POST(request: Request) {
  // Throttle abusive/accidental rapid submissions before doing any work.
  const ip = clientIp(request)
  const limit = rateLimit(`apt:request:${ip}`, 5, 10 * 60_000)
  if (!limit.ok) {
    return NextResponse.json(
      { error: 'Too many requests. Please wait a few minutes or call our office.' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfterSec) } }
    )
  }

  // Mail transport is the only required dependency. Calendar is optional —
  // the manager can still book manually if it's not yet configured.
  if (!mailConfigured()) {
    return NextResponse.json(
      { error: 'Scheduling is temporarily unavailable. Please call our office.' },
      { status: 503 }
    )
  }

  try {
    const body = await request.json()
    const parsed = requestSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: parsed.error.issues },
        { status: 400 }
      )
    }
    const data = parsed.data

    if (data.reason && containsPotentialPHI(data.reason)) {
      return NextResponse.json(
        { error: 'Please do not include medical information in this form' },
        { status: 400 }
      )
    }

    // Reject any slot that isn't a real bookable time (open weekday, on a
    // boundary, within 9:30 AM-4:30 PM ET). Guards against tampered submissions.
    if (!isValidSlotStart(data.slotStartISO)) {
      return NextResponse.json({ error: 'Selected time is outside booking hours' }, { status: 400 })
    }
    if (data.secondarySlotStartISO && !isValidSlotStart(data.secondarySlotStartISO)) {
      return NextResponse.json({ error: 'Backup time is outside booking hours' }, { status: 400 })
    }

    const fullName = `${data.firstName.trim()} ${data.lastName.trim()}`.trim()
    const sanitized = {
      name: sanitizeInput(fullName),
      firstName: sanitizeInput(data.firstName),
      lastName: sanitizeInput(data.lastName),
      email: sanitizeInput(data.email),
      phone: sanitizeInput(data.phone),
      reason: data.reason ? sanitizeInput(data.reason) : null,
    }

    const isOther = data.service === OTHER_SERVICE_SLUG

    // "Other" requests carry no auto-assignment but must include a message so the
    // team knows what's being asked.
    if (isOther && !sanitized.reason?.trim()) {
      return NextResponse.json(
        { error: 'Please tell us how we can help.' },
        { status: 400 }
      )
    }

    let assignment: ReturnType<typeof assignDoctor> = null
    let doctor: (typeof siteConfig.team.physicians)[number] | null = null
    let doctorConfidence: 'definitive' | 'suggested' | null = null
    let serviceTitle: string

    if (isOther) {
      serviceTitle = OTHER_SERVICE_TITLE
      // Honor the patient's optional provider preference for "Other".
      if (data.doctorSlug) {
        doctor = siteConfig.team.physicians.find((p) => p.slug === data.doctorSlug) ?? null
        if (doctor) doctorConfidence = 'suggested'
      }
    } else {
      assignment = assignDoctor(data.service)
      if (!assignment) {
        return NextResponse.json({ error: 'No provider configured for this service' }, { status: 400 })
      }
      doctor = siteConfig.team.physicians.find((p) => p.slug === assignment!.doctor) ?? null
      const servicePage = getServicePage(data.service)
      if (!doctor || !servicePage) {
        return NextResponse.json({ error: 'Service metadata missing' }, { status: 500 })
      }
      doctorConfidence = assignment.confidence
      serviceTitle = servicePage.title
    }

    const id = generateId('apt')
    const start = new Date(data.slotStartISO)
    const end = new Date(start.getTime() + SLOT_DURATION_MIN * 60_000)
    const secondaryStart = data.secondarySlotStartISO ? new Date(data.secondarySlotStartISO) : null
    const secondaryEnd = secondaryStart
      ? new Date(secondaryStart.getTime() + SLOT_DURATION_MIN * 60_000)
      : null

    // Try to create the tentative Calendar event. If anything fails, fall
    // through to email-only — the lead is preserved either way.
    let calendarEventLink: string | null = null
    if (schedulerCalendarEnabled() && assignment && doctor) {
      try {
        const attendees =
          assignment.confidence === 'definitive'
            ? [mailRecipient(), doctor.email]
            : [mailRecipient()]

        const eventDescription = buildEventDescription({
          id,
          patient: sanitized,
          service: serviceTitle,
          doctor,
          confidence: assignment.confidence,
          reason: sanitized.reason,
        })

        const event = await createTentativeEvent({
          summary: `[TENTATIVE] ${serviceTitle} — ${sanitized.name}`,
          description: eventDescription,
          start,
          end,
          attendeeEmails: attendees,
        })
        calendarEventLink = event.htmlLink
      } catch (err) {
        console.error('Calendar event creation failed:', err)
      }
    }

    const { subject, html, text } = appointmentTentativeEmail({
      id,
      serviceTitle,
      patient: {
        name: sanitized.name,
        email: sanitized.email,
        phone: sanitized.phone,
        contactWindow: data.contactWindow ?? null,
        preferredContactMethod: data.preferredContactMethod ?? null,
      },
      slotStart: start,
      slotEnd: end,
      secondarySlotStart: secondaryStart,
      secondarySlotEnd: secondaryEnd,
      doctorName: doctor?.name ?? '',
      doctorConfidence,
      reason: sanitized.reason,
      calendarEventLink,
      requestedWindow: {
        dateFrom: data.dateFrom ?? null,
        dateTo: data.dateTo ?? null,
        timeOfDay: data.timeOfDay ?? null,
      },
      submittedAt: new Date(),
    })

    const mailResult = await sendEmail({
      subject,
      html,
      text,
      replyTo: sanitized.email,
    })

    if (!mailResult.ok) {
      // Email is the only record in email-only mode. If the send fails, log the
      // full submission so the lead is recoverable from the Vercel logs.
      console.error(
        'appointment.request.SEND_FAILED',
        JSON.stringify({
          id,
          error: mailResult.error,
          service: data.service,
          serviceTitle,
          slotStartISO: data.slotStartISO,
          secondarySlotStartISO: data.secondarySlotStartISO ?? null,
          doctorSlug: doctor?.slug ?? null,
          requestedWindow: { dateFrom: data.dateFrom, dateTo: data.dateTo, timeOfDay: data.timeOfDay },
          contactWindow: data.contactWindow ?? null,
          preferredContactMethod: data.preferredContactMethod ?? null,
          patient: sanitized,
          ip: clientIp(request),
          submittedAt: new Date().toISOString(),
        })
      )
      return NextResponse.json(
        { error: 'Failed to submit request. Please try again or call our office.' },
        { status: 500 }
      )
    }

    // Log a single structured line so we can grep Vercel logs if needed
    console.log(
      `appointment.request id=${id} service=${data.service} doctor=${doctor?.slug ?? 'unassigned'} ` +
        `confidence=${doctorConfidence ?? 'n/a'} backup=${secondaryStart ? 'yes' : 'no'} ` +
        `calendar=${calendarEventLink ? 'created' : 'skipped'} ip=${clientIp(request)}`
    )

    return NextResponse.json(
      {
        id,
        status: 'tentative',
        message:
          'Request received. Our team will confirm your appointment within 1 business day. The time you selected is tentative and may be adjusted.',
      },
      { status: 201 }
    )
  } catch (err) {
    console.error('Appointment request failed:', err)
    return NextResponse.json({ error: 'Failed to submit request' }, { status: 500 })
  }
}

function buildEventDescription(opts: {
  id: string
  patient: { name: string; email: string; phone: string; reason: string | null }
  service: string
  doctor: { name: string; email: string; title: string }
  confidence: 'definitive' | 'suggested'
  reason: string | null
}): string {
  const lines = [
    `Tentative appointment request via the website.`,
    ``,
    `PATIENT`,
    `  Name:  ${opts.patient.name}`,
    `  Email: ${opts.patient.email}`,
    `  Phone: ${opts.patient.phone}`,
    ``,
    `SERVICE`,
    `  ${opts.service}`,
    ``,
    `PROVIDER`,
    opts.confidence === 'definitive'
      ? `  ${opts.doctor.name} (auto-assigned — already added as Calendar attendee)`
      : `  ${opts.doctor.name} (suggested — please confirm or reassign before sending)`,
    ``,
  ]
  if (opts.reason?.trim()) {
    lines.push(`REASON FOR VISIT`, `  ${opts.reason.trim()}`, ``)
  }
  lines.push(
    `ACTION ITEMS`,
    `  1. Review the provider assignment above.`,
    `  2. Adjust the time / duration if needed.`,
    `  3. Add the patient (${opts.patient.email}) as an attendee when you're ready to send the invite.`,
    `  4. Remove [TENTATIVE] from the title and click Send to notify everyone.`,
    ``,
    `Ref: ${opts.id}`
  )
  return lines.join('\n')
}
