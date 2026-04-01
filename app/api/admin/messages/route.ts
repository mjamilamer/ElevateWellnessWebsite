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

    const result = status
      ? await db.execute({
          sql: `SELECT * FROM contact_messages
                WHERE status = ?
                ORDER BY created_at DESC LIMIT ? OFFSET ?`,
          args: [status, limit, offset],
        })
      : await db.execute({
          sql: `SELECT * FROM contact_messages
                ORDER BY created_at DESC LIMIT ? OFFSET ?`,
          args: [limit, offset],
        })

    return NextResponse.json({
      messages: result.rows.map((r) => Object.fromEntries(Object.entries(r))),
      limit,
      offset,
    })
  } catch (error) {
    console.error('Error listing messages:', error)
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 })
  }
}
