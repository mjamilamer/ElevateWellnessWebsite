import { NextResponse } from 'next/server'
import { dbConfigured, getDb } from '@/lib/server/db'
import { requireAdmin } from '@/lib/server/require-admin'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const denied = requireAdmin(request)
  if (denied) return denied

  if (!dbConfigured()) {
    return NextResponse.json({ error: 'Service unavailable' }, { status: 503 })
  }

  try {
    const db = getDb()
    const result = await db.execute({
      sql: 'SELECT * FROM appointments WHERE id = ?',
      args: [params.id],
    })

    const row = result.rows[0]
    if (!row) {
      return NextResponse.json({ error: 'Appointment not found' }, { status: 404 })
    }

    return NextResponse.json(Object.fromEntries(Object.entries(row)))
  } catch (error) {
    console.error('Error fetching appointment:', error)
    return NextResponse.json({ error: 'Failed to fetch appointment' }, { status: 500 })
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const denied = requireAdmin(request)
  if (denied) return denied

  if (!dbConfigured()) {
    return NextResponse.json({ error: 'Service unavailable' }, { status: 503 })
  }

  try {
    const body = (await request.json()) as { status?: string; notes?: string }
    const { status, notes } = body

    if (
      !status ||
      !['pending', 'confirmed', 'canceled', 'completed'].includes(status)
    ) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
    }

    const db = getDb()

    if (notes !== undefined) {
      await db.execute({
        sql: `UPDATE appointments
              SET status = ?, notes = ?, updated_at = datetime('now')
              WHERE id = ?`,
        args: [status, notes, params.id],
      })
    } else {
      await db.execute({
        sql: `UPDATE appointments
              SET status = ?, updated_at = datetime('now')
              WHERE id = ?`,
        args: [status, params.id],
      })
    }

    return NextResponse.json({ success: true, id: params.id, status })
  } catch (error) {
    console.error('Error updating appointment:', error)
    return NextResponse.json({ error: 'Failed to update appointment' }, { status: 500 })
  }
}
