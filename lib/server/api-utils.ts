import type { Client } from '@libsql/client'
import { timingSafeEqual } from 'crypto'

export function generateId(prefix: string): string {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substring(2, 10)
  return `${prefix}_${timestamp}${random}`
}

export function sanitizeInput(input: string): string {
  return input.replace(/[<>]/g, '').trim().slice(0, 1000)
}

export function containsPotentialPHI(text: string): boolean {
  const phiKeywords = [
    'diagnosis',
    'symptom',
    'medication',
    'prescription',
    'pain level',
    'medical history',
    'insurance number',
    'ssn',
    'social security',
    'dob',
    'date of birth',
    'blood pressure',
    'medical condition',
  ]
  const lowerText = text.toLowerCase()
  return phiKeywords.some((keyword) => lowerText.includes(keyword))
}

export async function verifyCalSignature(
  body: string,
  signature: string | null,
  secret: string
): Promise<boolean> {
  if (!signature || !secret) return false
  const encoder = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const mac = await crypto.subtle.sign('HMAC', key, encoder.encode(body))
  const expectedHex = Array.from(new Uint8Array(mac))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
  const normalized = signature.replace(/^sha256=/i, '').trim().toLowerCase()
  if (!/^[0-9a-f]{64}$/.test(normalized) || !/^[0-9a-f]{64}$/.test(expectedHex)) {
    return false
  }
  try {
    return timingSafeEqual(Buffer.from(expectedHex, 'hex'), Buffer.from(normalized, 'hex'))
  } catch {
    return false
  }
}

/**
 * Admin API: set ADMIN_API_TOKEN to a long random string; send Authorization: Bearer <token>.
 */
export function verifyAdminAuth(token: string | undefined, secret: string | undefined): boolean {
  if (!token || !secret || secret.length < 16) return false
  try {
    const a = Buffer.from(token, 'utf8')
    const b = Buffer.from(secret, 'utf8')
    if (a.length !== b.length) return false
    return timingSafeEqual(a, b)
  } catch {
    return false
  }
}

export async function logAudit(
  db: Client,
  data: {
    actor: string
    action: string
    resource_type: string
    resource_id: string
    payload: string
    ip_address: string
    user_agent: string
  }
): Promise<void> {
  try {
    const id = generateId('log')
    await db.execute({
      sql: `INSERT INTO audit_logs (
        id, actor, action, resource_type, resource_id,
        payload, ip_address, user_agent
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        id,
        data.actor,
        data.action,
        data.resource_type,
        data.resource_id,
        data.payload,
        data.ip_address,
        data.user_agent,
      ],
    })
  } catch (error) {
    console.error('Failed to log audit:', error)
  }
}

export function clientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  return request.headers.get('x-real-ip') || 'unknown'
}
