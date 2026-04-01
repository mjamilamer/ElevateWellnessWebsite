import { NextResponse } from 'next/server'
import { verifyAdminAuth } from './api-utils'

export function requireAdmin(request: Request): NextResponse | null {
  const raw = request.headers.get('Authorization')
  const token = raw?.startsWith('Bearer ') ? raw.slice(7) : undefined
  if (!verifyAdminAuth(token, process.env.ADMIN_API_TOKEN)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  return null
}
