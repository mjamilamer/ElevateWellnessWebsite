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
import { mailConfigured, mailRecipient, sendEmail } from '@/lib/server/email'
import { appointmentTentativeEmail } from '@/lib/server/email-templates/appointment-tentative'
import { calendarConfigured, createTentativeEvent } from '@/lib/server/google-calendar'

const SLOT_DURATION_MIN = 30

const requestSchema = z.object({
  service: z.string().refine((s) => allServiceSlugs().includes(s), { message: 'Unknown service' }),
  slotStartISO: z.string().datetime(),
  name: z.string().min(1).max(100),
  email: z.string().email().max(255),
  phone: z.string().min(10).max(20),
  reason: z.string().max(1000).optional(),
})

export async function POST(request: Request) {
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

    const sanitized = {
      name: sanitizeInput(data.name),
      email: sanitizeInput(data.email),
      phone: sanitizeInput(data.phone),
      reason: data.reason ? sanitizeInput(data.reason) : null,
    }

    const assignment = assignDoctor(data.service)
    if (!assignment) {
      return NextResponse.json({ error: 'No provider configured for this service' }, { status: 400 })
    }
    const doctor = siteConfig.team.physicians.find((p) => p.slug === assignment.doctor)
    const servicePage = getServicePage(data.service)
    if (!doctor || !servicePage) {
      return NextResponse.json({ error: 'Service metadata missing' }, { status: 500 })
    }

    const id = generateId('apt')
    const start = new Date(data.slotStartISO)
    const end = new Date(start.getTime() + SLOT_DURATION_MIN * 60_000)
    if (Number.isNaN(start.getTime())) {
      return NextResponse.json({ error: 'Invalid slot' }, { status: 400 })
    }

    // Try to create the tentative Calendar event. If anything fails, fall
    // through to email-only — the lead is preserved either way.
    let calendarEventLink: string | null = null
    if (calendarConfigured()) {
      try {
        const attendees =
          assignment.confidence === 'definitive'
            ? [mailRecipient(), doctor.email]
            : [mailRecipient()]

        const eventDescription = buildEventDescription({
          id,
          patient: sanitized,
          service: servicePage.title,
          doctor,
          confidence: assignment.confidence,
          reason: sanitized.reason,
        })

        const event = await createTentativeEvent({
          summary: `[TENTATIVE] ${servicePage.title} — ${sanitized.name}`,
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
      serviceTitle: servicePage.title,
      patient: sanitized,
      slotStart: start,
      slotEnd: end,
      doctorName: doctor.name,
      doctorConfidence: assignment.confidence,
      reason: sanitized.reason,
      calendarEventLink,
      submittedAt: new Date(),
    })

    const mailResult = await sendEmail({
      subject,
      html,
      text,
      replyTo: sanitized.email,
    })

    if (!mailResult.ok) {
      console.error('Appointment email send failed:', mailResult.error)
      return NextResponse.json(
        { error: 'Failed to submit request. Please try again or call our office.' },
        { status: 500 }
      )
    }

    // Log a single structured line so we can grep Vercel logs if needed
    console.log(
      `appointment.request id=${id} service=${data.service} doctor=${assignment.doctor} ` +
        `confidence=${assignment.confidence} calendar=${calendarEventLink ? 'created' : 'skipped'} ` +
        `ip=${clientIp(request)}`
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
