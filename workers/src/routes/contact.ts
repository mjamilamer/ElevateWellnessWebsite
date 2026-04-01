import { Hono } from 'hono'
import { z } from 'zod'
import type { Env } from '../index'
import { generateId, sanitizeInput, containsPotentialPHI, logAudit } from '../utils'

const contactRouter = new Hono<{ Bindings: Env }>()

// Validation schema
const contactSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email().max(255),
  phone: z.string().min(10).max(20).optional(),
  message: z.string().min(1).max(2000),
})

// Create contact message
contactRouter.post('/', async (c) => {
  try {
    const body = await c.req.json()
    
    // Validate input
    const validationResult = contactSchema.safeParse(body)
    if (!validationResult.success) {
      return c.json({ 
        error: 'Invalid input', 
        details: validationResult.error.errors 
      }, 400)
    }

    const data = validationResult.data

    // Check for potential PHI
    if (containsPotentialPHI(data.message)) {
      return c.json({
        error: 'Please do not include medical information in this form'
      }, 400)
    }

    // Sanitize inputs
    const sanitized = {
      name: sanitizeInput(data.name),
      email: sanitizeInput(data.email),
      phone: data.phone ? sanitizeInput(data.phone) : null,
      message: sanitizeInput(data.message),
    }

    // Generate ID
    const id = generateId('msg')

    // Insert into database
    await c.env.DB.prepare(`
      INSERT INTO contact_messages (id, name, email, phone, message, status)
      VALUES (?, ?, ?, ?, ?, 'new')
    `).bind(
      id,
      sanitized.name,
      sanitized.email,
      sanitized.phone,
      sanitized.message
    ).run()

    // Log audit
    await logAudit(c.env.DB, {
      actor: sanitized.email,
      action: 'create_contact_message',
      resource_type: 'contact_message',
      resource_id: id,
      payload: JSON.stringify({ has_phone: !!sanitized.phone }),
      ip_address: c.req.header('cf-connecting-ip') || 'unknown',
      user_agent: c.req.header('user-agent') || 'unknown',
    })

    return c.json({
      id,
      message: 'Message received. We will respond within 24 hours.'
    }, 201)

  } catch (error) {
    console.error('Error creating contact message:', error)
    return c.json({ error: 'Failed to send message' }, 500)
  }
})

export { contactRouter }
