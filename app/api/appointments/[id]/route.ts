import { NextResponse } from 'next/server'
import { dbConfigured, getDb } from '@/lib/server/db'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  if (!dbConfigured()) {
    return NextResponse.json({ error: 'Service unavailable' }, { status: 503 })
  }

  const { id } = params
  const email = new URL(request.url).searchParams.get('email')

  if (!email) {
    return NextResponse.json({ error: 'Email is required for verification' }, { status: 400 })
  }

  try {
    const db = getDb()
    const result = await db.execute({
      sql: `SELECT id, created_at, name, email, phone, preferred_slot,
                   provider_slug, visit_type, status
            FROM appointments
            WHERE id = ? AND email = ?`,
      args: [id, email],
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
