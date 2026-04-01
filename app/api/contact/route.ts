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

const contactSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email().max(255),
  phone: z.string().min(10).max(20).optional(),
  message: z.string().min(1).max(2000),
})

export async function POST(request: Request) {
  if (!dbConfigured()) {
    return NextResponse.json(
      { error: 'Contact form is not available (database not configured).' },
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
    const db = getDb()

    await db.execute({
      sql: `INSERT INTO contact_messages (id, name, email, phone, message, status)
            VALUES (?, ?, ?, ?, ?, 'new')`,
      args: [id, sanitized.name, sanitized.email, sanitized.phone, sanitized.message],
    })

    await logAudit(db, {
      actor: sanitized.email,
      action: 'create_contact_message',
      resource_type: 'contact_message',
      resource_id: id,
      payload: JSON.stringify({ has_phone: !!sanitized.phone }),
      ip_address: clientIp(request),
      user_agent: request.headers.get('user-agent') || 'unknown',
    })

    return NextResponse.json(
      {
        id,
        message: 'Message received. We will respond within 24 hours.',
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating contact message:', error)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}
