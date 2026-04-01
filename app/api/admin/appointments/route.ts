import { NextResponse } from 'next/server'
import { dbConfigured, getDb } from '@/lib/server/db'
import { requireAdmin } from '@/lib/server/require-admin'

export async function GET(request: Request) {
  const denied = requireAdmin(request)
  if (denied) return denied

  if (!dbConfigured()) {
    return NextResponse.json({ error: 'Service unavailable' }, { status: 503 })
  }

  try {
    const url = new URL(request.url)
    const status = url.searchParams.get('status')
    const limit = parseInt(url.searchParams.get('limit') || '50', 10)
    const offset = parseInt(url.searchParams.get('offset') || '0', 10)

    const db = getDb()

    const listResult = status
      ? await db.execute({
          sql: `SELECT id, created_at, name, email, phone, preferred_slot,
                       provider_slug, visit_type, source, status
                FROM appointments
                WHERE status = ?
                ORDER BY created_at DESC LIMIT ? OFFSET ?`,
          args: [status, limit, offset],
        })
      : await db.execute({
          sql: `SELECT id, created_at, name, email, phone, preferred_slot,
                       provider_slug, visit_type, source, status
                FROM appointments
                ORDER BY created_at DESC LIMIT ? OFFSET ?`,
          args: [limit, offset],
        })

    const countResult = status
      ? await db.execute({
          sql: 'SELECT COUNT(*) AS count FROM appointments WHERE status = ?',
          args: [status],
        })
      : await db.execute({
          sql: 'SELECT COUNT(*) AS count FROM appointments',
          args: [],
        })

    const total = Number((countResult.rows[0] as Record<string, unknown>)?.count ?? 0)

    return NextResponse.json({
      appointments: listResult.rows.map((r) => Object.fromEntries(Object.entries(r))),
      total,
      limit,
      offset,
    })
  } catch (error) {
    console.error('Error listing appointments:', error)
    return NextResponse.json({ error: 'Failed to fetch appointments' }, { status: 500 })
  }
}
