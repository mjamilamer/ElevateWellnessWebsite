/**
 * Dev-only HTML email preview. Iterate on email design without sending real
 * mail. Disabled in production (returns 404).
 *
 *   /api/dev/email-preview/contact                 — general contact form
 *   /api/dev/email-preview/appointment-tentative   — appointment-request email
 *   ?text=1                                         — plain-text fallback
 */

import { NextResponse } from 'next/server'
import { contactMessageEmail } from '@/lib/server/email-templates/contact-message'
import { appointmentTentativeEmail } from '@/lib/server/email-templates/appointment-tentative'

const SAMPLE_CONTACT = {
  id: 'msg_sample456',
  name: 'John Caller',
  email: 'john.caller@example.com',
  phone: '+1 (201) 555-0123',
  message:
    'Hello — wanted to ask about whether you accept Aetna PPO plans and whether new patients need a referral. Thanks!',
  ipAddress: '203.0.113.55',
  userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
  submittedAt: new Date('2026-05-26T15:01:00-04:00'),
}

const SAMPLE_APPOINTMENT = {
  id: 'apt_sample789',
  serviceTitle: 'Orthopedic Services',
  patient: {
    name: 'Jane Patient',
    email: 'jane.patient@example.com',
    phone: '+1 (201) 555-0142',
  },
  slotStart: new Date('2026-06-15T13:30:00Z'), // 9:30 AM ET
  slotEnd: new Date('2026-06-15T14:00:00Z'),
  doctorName: 'Dr. Kamil M. Amer, MD',
  doctorConfidence: 'definitive' as const,
  reason: 'Recurring discomfort in my right wrist after a fall last month.',
  calendarEventLink: 'https://calendar.google.com/calendar/event?eid=sample',
  submittedAt: new Date('2026-05-26T14:23:00-04:00'),
}

export async function GET(
  request: Request,
  { params }: { params: { template: string } }
) {
  if (process.env.NODE_ENV === 'production') {
    return new NextResponse('Not found', { status: 404 })
  }

  let payload: { subject: string; html: string; text: string }
  switch (params.template) {
    case 'contact':
      payload = contactMessageEmail(SAMPLE_CONTACT)
      break
    case 'appointment-tentative':
      payload = appointmentTentativeEmail(SAMPLE_APPOINTMENT)
      break
    default:
      return NextResponse.json(
        { error: 'Unknown template', available: ['contact', 'appointment-tentative'] },
        { status: 404 }
      )
  }

  const wantText = new URL(request.url).searchParams.get('text') === '1'
  if (wantText) {
    return new NextResponse(`Subject: ${payload.subject}\n\n${payload.text}`, {
      status: 200,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    })
  }
  return new NextResponse(payload.html, {
    status: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  })
}
