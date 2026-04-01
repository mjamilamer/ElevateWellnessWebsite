import { Hono } from 'hono'
import { z } from 'zod'
import type { Env } from '../index'
import { generateId, sanitizeInput, containsPotentialPHI, logAudit } from '../utils'

const appointmentsRouter = new Hono<{ Bindings: Env }>()

// Validation schema
const createAppointmentSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email().max(255),
  phone: z.string().min(10).max(20),
  preferred_slot: z.string().optional(),
  provider_slug: z.string().optional(),
  visit_type: z.enum(['new_patient', 'follow_up', 'consultation']).default('new_patient'),
  message: z.string().max(1000).optional(),
})

// Create appointment request
appointmentsRouter.post('/create', async (c) => {
  try {
    const body = await c.req.json()
    
    // Validate input
    const validationResult = createAppointmentSchema.safeParse(body)
    if (!validationResult.success) {
      return c.json({ 
        error: 'Invalid input', 
        details: validationResult.error.errors 
      }, 400)
    }

    const data = validationResult.data

    // Check for potential PHI in message
    if (data.message && containsPotentialPHI(data.message)) {
      return c.json({
        error: 'Please do not include medical information in this form'
      }, 400)
    }

    // Sanitize inputs
    const sanitized = {
      name: sanitizeInput(data.name),
      email: sanitizeInput(data.email),
      phone: sanitizeInput(data.phone),
      preferred_slot: data.preferred_slot,
      provider_slug: data.provider_slug ? sanitizeInput(data.provider_slug) : null,
      visit_type: data.visit_type,
      message: data.message ? sanitizeInput(data.message) : null,
    }

    // Generate ID
    const id = generateId('apt')

    // Insert into database
    await c.env.DB.prepare(`
      INSERT INTO appointments (
        id, name, email, phone, preferred_slot, provider_slug, 
        visit_type, source, status, notes
      ) VALUES (?, ?, ?, ?, ?, ?, ?, 'manual_form', 'pending', ?)
    `).bind(
      id,
      sanitized.name,
      sanitized.email,
      sanitized.phone,
      sanitized.preferred_slot || null,
      sanitized.provider_slug,
      sanitized.visit_type,
      sanitized.message
    ).run()

    // Log audit
    await logAudit(c.env.DB, {
      actor: sanitized.email,
      action: 'create_appointment',
      resource_type: 'appointment',
      resource_id: id,
      payload: JSON.stringify({ source: 'manual_form', visit_type: sanitized.visit_type }),
      ip_address: c.req.header('cf-connecting-ip') || 'unknown',
      user_agent: c.req.header('user-agent') || 'unknown',
    })

    return c.json({
      id,
      status: 'pending',
      message: 'Appointment request received. We will contact you shortly to confirm.'
    }, 201)

  } catch (error) {
    console.error('Error creating appointment:', error)
    return c.json({ error: 'Failed to create appointment request' }, 500)
  }
})

// Get appointment by ID (with email verification)
appointmentsRouter.get('/:id', async (c) => {
  try {
    const id = c.req.param('id')
    const email = c.req.query('email')

    if (!email) {
      return c.json({ error: 'Email is required for verification' }, 400)
    }

    const result = await c.env.DB.prepare(`
      SELECT id, created_at, name, email, phone, preferred_slot, 
             provider_slug, visit_type, status
      FROM appointments
      WHERE id = ? AND email = ?
    `).bind(id, email).first()

    if (!result) {
      return c.json({ error: 'Appointment not found' }, 404)
    }

    return c.json(result)

  } catch (error) {
    console.error('Error fetching appointment:', error)
    return c.json({ error: 'Failed to fetch appointment' }, 500)
  }
})

export { appointmentsRouter }
