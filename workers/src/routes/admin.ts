import { Hono } from 'hono'
import type { Env } from '../index'
import { verifyAdminAuth } from '../utils'

const adminRouter = new Hono<{ Bindings: Env }>()

// Middleware for admin authentication
adminRouter.use('/*', async (c, next) => {
  const authHeader = c.req.header('Authorization')
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({ error: 'Unauthorized' }, 401)
  }

  const token = authHeader.substring(7)
  const isValid = await verifyAdminAuth(token, c.env.ADMIN_SESSION_SECRET)

  if (!isValid) {
    return c.json({ error: 'Invalid or expired token' }, 401)
  }

  await next()
})

// List appointments
adminRouter.get('/appointments', async (c) => {
  try {
    const status = c.req.query('status')
    const limit = parseInt(c.req.query('limit') || '50')
    const offset = parseInt(c.req.query('offset') || '0')

    let query = `
      SELECT id, created_at, name, email, phone, preferred_slot,
             provider_slug, visit_type, source, status
      FROM appointments
    `

    const params: any[] = []

    if (status) {
      query += ' WHERE status = ?'
      params.push(status)
    }

    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?'
    params.push(limit, offset)

    const result = await c.env.DB.prepare(query).bind(...params).all()

    // Get total count
    let countQuery = 'SELECT COUNT(*) as count FROM appointments'
    if (status) {
      countQuery += ' WHERE status = ?'
    }
    const countResult = await c.env.DB.prepare(countQuery)
      .bind(...(status ? [status] : []))
      .first<{ count: number }>()

    return c.json({
      appointments: result.results || [],
      total: countResult?.count || 0,
      limit,
      offset,
    })

  } catch (error) {
    console.error('Error listing appointments:', error)
    return c.json({ error: 'Failed to fetch appointments' }, 500)
  }
})

// Get single appointment
adminRouter.get('/appointments/:id', async (c) => {
  try {
    const id = c.req.param('id')

    const result = await c.env.DB.prepare(`
      SELECT * FROM appointments WHERE id = ?
    `).bind(id).first()

    if (!result) {
      return c.json({ error: 'Appointment not found' }, 404)
    }

    return c.json(result)

  } catch (error) {
    console.error('Error fetching appointment:', error)
    return c.json({ error: 'Failed to fetch appointment' }, 500)
  }
})

// Update appointment status
adminRouter.patch('/appointments/:id', async (c) => {
  try {
    const id = c.req.param('id')
    const body = await c.req.json()
    const { status, notes } = body

    if (!status || !['pending', 'confirmed', 'canceled', 'completed'].includes(status)) {
      return c.json({ error: 'Invalid status' }, 400)
    }

    const updates: string[] = ['status = ?', 'updated_at = datetime(\'now\')']
    const params: any[] = [status]

    if (notes !== undefined) {
      updates.push('notes = ?')
      params.push(notes)
    }

    params.push(id)

    await c.env.DB.prepare(`
      UPDATE appointments SET ${updates.join(', ')} WHERE id = ?
    `).bind(...params).run()

    return c.json({ success: true, id, status })

  } catch (error) {
    console.error('Error updating appointment:', error)
    return c.json({ error: 'Failed to update appointment' }, 500)
  }
})

// List contact messages
adminRouter.get('/messages', async (c) => {
  try {
    const status = c.req.query('status')
    const limit = parseInt(c.req.query('limit') || '50')
    const offset = parseInt(c.req.query('offset') || '0')

    let query = 'SELECT * FROM contact_messages'
    const params: any[] = []

    if (status) {
      query += ' WHERE status = ?'
      params.push(status)
    }

    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?'
    params.push(limit, offset)

    const result = await c.env.DB.prepare(query).bind(...params).all()

    return c.json({
      messages: result.results || [],
      limit,
      offset,
    })

  } catch (error) {
    console.error('Error listing messages:', error)
    return c.json({ error: 'Failed to fetch messages' }, 500)
  }
})

// Export appointments as CSV
adminRouter.get('/appointments/export/csv', async (c) => {
  try {
    const result = await c.env.DB.prepare(`
      SELECT id, created_at, name, email, phone, preferred_slot,
             provider_slug, visit_type, source, status
      FROM appointments
      ORDER BY created_at DESC
    `).all()

    const appointments = result.results || []

    // Generate CSV
    const headers = ['ID', 'Created At', 'Name', 'Email', 'Phone', 'Preferred Slot', 'Provider', 'Visit Type', 'Source', 'Status']
    const csvRows = [headers.join(',')]

    for (const apt of appointments) {
      const row = [
        apt.id,
        apt.created_at,
        `"${apt.name}"`,
        apt.email,
        apt.phone,
        apt.preferred_slot || '',
        apt.provider_slug || '',
        apt.visit_type,
        apt.source,
        apt.status,
      ]
      csvRows.push(row.join(','))
    }

    const csv = csvRows.join('\n')

    return new Response(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="appointments-${new Date().toISOString().split('T')[0]}.csv"`,
      },
    })

  } catch (error) {
    console.error('Error exporting appointments:', error)
    return c.json({ error: 'Failed to export appointments' }, 500)
  }
})

export { adminRouter }
