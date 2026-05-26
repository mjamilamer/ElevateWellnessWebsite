import { NextResponse } from 'next/server'
import { z } from 'zod'
import {
  clientIp,
  containsPotentialPHI,
  generateId,
  sanitizeInput,
} from '@/lib/server/api-utils'
import { mailConfigured, sendEmail } from '@/lib/server/email'
import { contactMessageEmail } from '@/lib/server/email-templates/contact-message'

const contactSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email().max(255),
  phone: z.string().min(10).max(20).optional(),
  message: z.string().min(1).max(2000),
})

export async function POST(request: Request) {
  // Mail transport is the only persistence layer now. Without it, surface a
  // clear failure so the patient knows to call the office.
  if (!mailConfigured()) {
    return NextResponse.json(
      { error: 'Contact form is temporarily unavailable. Please call our office.' },
      { status: 503 }
    )
  }

  try {
    const body = await request.json()
    const validationResult = contactSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validationResult.error.issues },
        { status: 400 }
      )
    }

    const data = validationResult.data

    if (containsPotentialPHI(data.message)) {
      return NextResponse.json(
        { error: 'Please do not include medical information in this form' },
        { status: 400 }
      )
    }

    const sanitized = {
      name: sanitizeInput(data.name),
      email: sanitizeInput(data.email),
      phone: data.phone ? sanitizeInput(data.phone) : null,
      message: sanitizeInput(data.message),
    }

    const id = generateId('msg')
    const ipAddress = clientIp(request)
    const userAgent = request.headers.get('user-agent') || 'unknown'

    const { subject, html, text } = contactMessageEmail({
      id,
      name: sanitized.name,
      email: sanitized.email,
      phone: sanitized.phone,
      message: sanitized.message,
      ipAddress,
      userAgent,
      submittedAt: new Date(),
    })

    const result = await sendEmail({
      subject,
      html,
      text,
      replyTo: sanitized.email,
    })

    if (!result.ok) {
      console.error('Contact email send failed:', result.error)
      return NextResponse.json(
        { error: 'Failed to send message. Please try again or call our office.' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        id,
        message: 'Message received. We will respond within 24 hours.',
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error processing contact message:', error)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}
