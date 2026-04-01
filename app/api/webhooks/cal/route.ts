import { NextResponse } from 'next/server'
import { dbConfigured, getDb } from '@/lib/server/db'
import {
  clientIp,
  generateId,
  logAudit,
  sanitizeInput,
  verifyCalSignature,
} from '@/lib/server/api-utils'

export async function POST(request: Request) {
  const secret = process.env.CAL_WEBHOOK_SECRET
  if (!secret) {
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 503 })
  }
  if (!dbConfigured()) {
    return NextResponse.json({ error: 'Service unavailable' }, { status: 503 })
  }

  try {
    const signature =
      request.headers.get('x-cal-signature') ||
      request.headers.get('X-Cal-Signature') ||
      request.headers.get('x-cal-signature-256')
    const body = await request.text()

    if (!(await verifyCalSignature(body, signature, secret))) {
      console.error('Invalid Cal.com webhook signature')
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    const payload = JSON.parse(body) as Record<string, unknown>
    const event = (payload.triggerEvent || payload.event) as string

    const db = getDb()

    if (event === 'BOOKING_CREATED' || event === 'booking.created') {
      const bookingData = (payload.payload || payload.data) as Record<string, unknown>
      const attendees = bookingData.attendees as Array<Record<string, string>> | undefined
      const invitee = bookingData.invitee as Record<string, string> | undefined

      const name = attendees?.[0]?.name || invitee?.name || ''
      const email = attendees?.[0]?.email || invitee?.email || ''
      const phone = attendees?.[0]?.phoneNumber || invitee?.phone || ''
      const startTime = (bookingData.startTime || bookingData.start_time) as string
      const bookingId =
        (bookingData.uid || bookingData.id || generateId('cal')) as string

      if (!email || !name) {
        console.error('Missing required booking data:', bookingData)
        return NextResponse.json({ error: 'Missing required data' }, { status: 400 })
      }

      await db.execute({
        sql: `INSERT INTO appointments (
          id, name, email, phone, preferred_slot,
          visit_type, source, status
        ) VALUES (?, ?, ?, ?, ?, 'new_patient', 'cal_embed', 'confirmed')
        ON CONFLICT(id) DO UPDATE SET
          name = excluded.name,
          email = excluded.email,
          phone = excluded.phone,
          preferred_slot = excluded.preferred_slot,
          status = 'confirmed',
          updated_at = datetime('now')`,
        args: [
          bookingId,
          sanitizeInput(name),
          sanitizeInput(email),
          phone ? sanitizeInput(phone) : '',
          startTime,
        ],
      })

      await logAudit(db, {
        actor: 'system:cal.com',
        action: 'booking_created',
        resource_type: 'appointment',
        resource_id: bookingId,
        payload: JSON.stringify({ event, booking_id: bookingId }),
        ip_address: clientIp(request),
        user_agent: 'cal.com-webhook',
      })

      return NextResponse.json({ success: true, booking_id: bookingId })
    }

    if (event === 'BOOKING_CANCELLED' || event === 'booking.cancelled') {
      const bookingData = (payload.payload || payload.data) as Record<string, unknown>
      const bookingId = bookingData.uid || bookingData.id

      if (!bookingId) {
        return NextResponse.json({ error: 'Missing booking ID' }, { status: 400 })
      }

      await db.execute({
        sql: `UPDATE appointments
              SET status = 'canceled', updated_at = datetime('now')
              WHERE id = ?`,
        args: [String(bookingId)],
      })

      await logAudit(db, {
        actor: 'system:cal.com',
        action: 'booking_cancelled',
        resource_type: 'appointment',
        resource_id: String(bookingId),
        payload: JSON.stringify({ event, booking_id: bookingId }),
        ip_address: clientIp(request),
        user_agent: 'cal.com-webhook',
      })

      return NextResponse.json({ success: true, booking_id: bookingId })
    }

    if (event === 'BOOKING_RESCHEDULED' || event === 'booking.rescheduled') {
      const bookingData = (payload.payload || payload.data) as Record<string, unknown>
      const bookingId = bookingData.uid || bookingData.id
      const newStartTime = bookingData.startTime || bookingData.start_time

      if (!bookingId) {
        return NextResponse.json({ error: 'Missing booking ID' }, { status: 400 })
      }

      await db.execute({
        sql: `UPDATE appointments
              SET preferred_slot = ?, updated_at = datetime('now')
              WHERE id = ?`,
        args: [String(newStartTime), String(bookingId)],
      })

      await logAudit(db, {
        actor: 'system:cal.com',
        action: 'booking_rescheduled',
        resource_type: 'appointment',
        resource_id: String(bookingId),
        payload: JSON.stringify({
          event,
          booking_id: bookingId,
          new_start_time: newStartTime,
        }),
        ip_address: clientIp(request),
        user_agent: 'cal.com-webhook',
      })

      return NextResponse.json({ success: true, booking_id: bookingId })
    }

    return NextResponse.json({
      success: true,
      message: 'Event received but not processed',
    })
  } catch (error) {
    console.error('Error processing Cal.com webhook:', error)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}
