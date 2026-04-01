import { NextResponse } from 'next/server'
import { z } from 'zod'
import { dbConfigured, getDb } from '@/lib/server/db'
import {
  clientIp,
  containsPotentialPHI,
  generateId,
  logAudit,
  sanitizeInput,
} from '@/lib/server/api-utils'

const createAppointmentSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email().max(255),
  phone: z.string().min(10).max(20),
  preferred_slot: z.string().optional(),
  provider_slug: z.string().optional(),
  visit_type: z.enum(['new_patient', 'follow_up', 'consultation']).default('new_patient'),
  message: z.string().max(1000).optional(),
})

export async function POST(request: Request) {
  if (!dbConfigured()) {
    return NextResponse.json(
      { error: 'Appointments API is not available (database not configured).' },
      { status: 503 }
    )
  }

  try {
    const body = await request.json()
    const validationResult = createAppointmentSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validationResult.error.issues },
        { status: 400 }
      )
    }

    const data = validationResult.data

    if (data.message && containsPotentialPHI(data.message)) {
      return NextResponse.json(
        { error: 'Please do not include medical information in this form' },
        { status: 400 }
      )
    }

    const sanitized = {
      name: sanitizeInput(data.name),
      email: sanitizeInput(data.email),
      phone: sanitizeInput(data.phone),
      preferred_slot: data.preferred_slot,
      provider_slug: data.provider_slug ? sanitizeInput(data.provider_slug) : null,
      visit_type: data.visit_type,
      message: data.message ? sanitizeInput(data.message) : null,
    }

    const id = generateId('apt')
    const db = getDb()

    await db.execute({
      sql: `INSERT INTO appointments (
        id, name, email, phone, preferred_slot, provider_slug,
        visit_type, source, status, notes
      ) VALUES (?, ?, ?, ?, ?, ?, ?, 'manual_form', 'pending', ?)`,
      args: [
        id,
        sanitized.name,
        sanitized.email,
        sanitized.phone,
        sanitized.preferred_slot || null,
        sanitized.provider_slug,
        sanitized.visit_type,
        sanitized.message,
      ],
    })

    await logAudit(db, {
      actor: sanitized.email,
      action: 'create_appointment',
      resource_type: 'appointment',
      resource_id: id,
      payload: JSON.stringify({ source: 'manual_form', visit_type: sanitized.visit_type }),
      ip_address: clientIp(request),
      user_agent: request.headers.get('user-agent') || 'unknown',
    })

    return NextResponse.json(
      {
        id,
        status: 'pending',
        message:
          'Appointment request received. We will contact you shortly to confirm.',
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating appointment:', error)
    return NextResponse.json(
      { error: 'Failed to create appointment request' },
      { status: 500 }
    )
  }
}
