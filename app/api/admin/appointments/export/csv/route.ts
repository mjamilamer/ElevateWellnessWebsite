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
    const db = getDb()
    const result = await db.execute({
      sql: `SELECT id, created_at, name, email, phone, preferred_slot,
                   provider_slug, visit_type, source, status
            FROM appointments
            ORDER BY created_at DESC`,
      args: [],
    })

    const headers = [
      'ID',
      'Created At',
      'Name',
      'Email',
      'Phone',
      'Preferred Slot',
      'Provider',
      'Visit Type',
      'Source',
      'Status',
    ]
    const csvRows = [headers.join(',')]

    for (const row of result.rows) {
      const r = row as Record<string, string | null | undefined>
      const line = [
        r.id,
        r.created_at,
        `"${(r.name ?? '').replace(/"/g, '""')}"`,
        r.email,
        r.phone,
        r.preferred_slot || '',
        r.provider_slug || '',
        r.visit_type,
        r.source,
        r.status,
      ]
      csvRows.push(line.join(','))
    }

    const csv = csvRows.join('\n')
    const filename = `appointments-${new Date().toISOString().split('T')[0]}.csv`

    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    })
  } catch (error) {
    console.error('Error exporting appointments:', error)
    return NextResponse.json({ error: 'Failed to export appointments' }, { status: 500 })
  }
}
