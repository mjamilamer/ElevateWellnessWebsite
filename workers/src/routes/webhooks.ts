import { Hono } from 'hono'
import type { Env } from '../index'
import { generateId, sanitizeInput, verifyCalSignature, logAudit } from '../utils'

const webhooksRouter = new Hono<{ Bindings: Env }>()

// Cal.com webhook handler
webhooksRouter.post('/cal', async (c) => {
  try {
    const signature = c.req.header('x-cal-signature')
    const body = await c.req.text()

    // Verify webhook signature
    if (!signature || !verifyCalSignature(body, signature, c.env.CAL_WEBHOOK_SECRET)) {
      console.error('Invalid Cal.com webhook signature')
      return c.json({ error: 'Invalid signature' }, 401)
    }

    const payload = JSON.parse(body)
    const event = payload.triggerEvent || payload.event

    console.log('Cal.com webhook received:', event)

    // Handle booking.created event
    if (event === 'BOOKING_CREATED' || event === 'booking.created') {
      const bookingData = payload.payload || payload.data

      // Extract invitee information
      const name = bookingData.attendees?.[0]?.name || bookingData.invitee?.name || ''
      const email = bookingData.attendees?.[0]?.email || bookingData.invitee?.email || ''
      const phone = bookingData.attendees?.[0]?.phoneNumber || bookingData.invitee?.phone || ''
      const startTime = bookingData.startTime || bookingData.start_time
      const bookingId = bookingData.uid || bookingData.id || generateId('cal')

      if (!email || !name) {
        console.error('Missing required booking data:', bookingData)
        return c.json({ error: 'Missing required data' }, 400)
      }

      // Insert or update appointment
      await c.env.DB.prepare(`
        INSERT INTO appointments (
          id, name, email, phone, preferred_slot, 
          visit_type, source, status
        ) VALUES (?, ?, ?, ?, ?, 'new_patient', 'cal_embed', 'confirmed')
        ON CONFLICT(id) DO UPDATE SET
          name = excluded.name,
          email = excluded.email,
          phone = excluded.phone,
          preferred_slot = excluded.preferred_slot,
          status = 'confirmed',
          updated_at = datetime('now')
      `).bind(
        bookingId,
        sanitizeInput(name),
        sanitizeInput(email),
        phone ? sanitizeInput(phone) : '',
        startTime
      ).run()

      // Log audit
      await logAudit(c.env.DB, {
        actor: 'system:cal.com',
        action: 'booking_created',
        resource_type: 'appointment',
        resource_id: bookingId,
        payload: JSON.stringify({ event, booking_id: bookingId }),
        ip_address: c.req.header('cf-connecting-ip') || 'unknown',
        user_agent: 'cal.com-webhook',
      })

      return c.json({ success: true, booking_id: bookingId })
    }

    // Handle booking.cancelled event
    if (event === 'BOOKING_CANCELLED' || event === 'booking.cancelled') {
      const bookingData = payload.payload || payload.data
      const bookingId = bookingData.uid || bookingData.id

      if (!bookingId) {
        return c.json({ error: 'Missing booking ID' }, 400)
      }

      // Update appointment status
      await c.env.DB.prepare(`
        UPDATE appointments 
        SET status = 'canceled', updated_at = datetime('now')
        WHERE id = ?
      `).bind(bookingId).run()

      // Log audit
      await logAudit(c.env.DB, {
        actor: 'system:cal.com',
        action: 'booking_cancelled',
        resource_type: 'appointment',
        resource_id: bookingId,
        payload: JSON.stringify({ event, booking_id: bookingId }),
        ip_address: c.req.header('cf-connecting-ip') || 'unknown',
        user_agent: 'cal.com-webhook',
      })

      return c.json({ success: true, booking_id: bookingId })
    }

    // Handle booking.rescheduled event
    if (event === 'BOOKING_RESCHEDULED' || event === 'booking.rescheduled') {
      const bookingData = payload.payload || payload.data
      const bookingId = bookingData.uid || bookingData.id
      const newStartTime = bookingData.startTime || bookingData.start_time

      if (!bookingId) {
        return c.json({ error: 'Missing booking ID' }, 400)
      }

      // Update appointment
      await c.env.DB.prepare(`
        UPDATE appointments 
        SET preferred_slot = ?, updated_at = datetime('now')
        WHERE id = ?
      `).bind(newStartTime, bookingId).run()

      // Log audit
      await logAudit(c.env.DB, {
        actor: 'system:cal.com',
        action: 'booking_rescheduled',
        resource_type: 'appointment',
        resource_id: bookingId,
        payload: JSON.stringify({ event, booking_id: bookingId, new_start_time: newStartTime }),
        ip_address: c.req.header('cf-connecting-ip') || 'unknown',
        user_agent: 'cal.com-webhook',
      })

      return c.json({ success: true, booking_id: bookingId })
    }

    // Unknown event
    console.log('Unhandled Cal.com event:', event)
    return c.json({ success: true, message: 'Event received but not processed' })

  } catch (error) {
    console.error('Error processing Cal.com webhook:', error)
    return c.json({ error: 'Webhook processing failed' }, 500)
  }
})

export { webhooksRouter }
