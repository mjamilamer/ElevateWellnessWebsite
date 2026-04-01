import type { D1Database } from '@cloudflare/workers-types'

/**
 * Generate a unique ID with a prefix
 */
export function generateId(prefix: string): string {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substring(2, 10)
  return `${prefix}_${timestamp}${random}`
}

/**
 * Sanitize user input
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove HTML brackets
    .trim()
    .slice(0, 1000) // Max length
}

/**
 * Check if text contains potential PHI keywords
 */
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
  return phiKeywords.some(keyword => lowerText.includes(keyword))
}

/**
 * Verify Cal.com webhook signature
 */
export function verifyCalSignature(
  body: string,
  signature: string,
  secret: string
): boolean {
  // Cal.com uses HMAC SHA256 for webhook signatures
  // Implementation depends on Cal.com's exact format
  // This is a placeholder - check Cal.com docs for exact implementation
  
  // For now, we'll do a basic check
  // In production, implement proper HMAC verification
  return signature && secret && signature.length > 10
}

/**
 * Verify admin authentication token
 */
export async function verifyAdminAuth(
  token: string,
  secret: string
): Promise<boolean> {
  // Simple token verification
  // In production, implement proper JWT verification
  // For now, check if token matches a pattern
  
  try {
    // This is a placeholder
    // Implement proper JWT verification with expiry check
    return token && token.length > 20 && secret.length > 0
  } catch {
    return false
  }
}

/**
 * Log audit event
 */
export async function logAudit(
  db: D1Database,
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
    
    await db.prepare(`
      INSERT INTO audit_logs (
        id, actor, action, resource_type, resource_id, 
        payload, ip_address, user_agent
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      id,
      data.actor,
      data.action,
      data.resource_type,
      data.resource_id,
      data.payload,
      data.ip_address,
      data.user_agent
    ).run()
  } catch (error) {
    console.error('Failed to log audit:', error)
    // Don't throw - logging should not break the main flow
  }
}

/**
 * Hash password (for admin users)
 */
export async function hashPassword(password: string): Promise<string> {
  // Use Web Crypto API for password hashing
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

/**
 * Verify password against hash
 */
export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  const passwordHash = await hashPassword(password)
  return passwordHash === hash
}

/**
 * Rate limiting helper
 */
export async function checkRateLimit(
  kv: KVNamespace | undefined,
  key: string,
  limit: number,
  windowSeconds: number
): Promise<{ allowed: boolean; remaining: number }> {
  if (!kv) {
    // No KV namespace configured, allow all requests
    return { allowed: true, remaining: limit }
  }

  try {
    const current = await kv.get(key)
    const count = current ? parseInt(current) : 0

    if (count >= limit) {
      return { allowed: false, remaining: 0 }
    }

    const newCount = count + 1
    await kv.put(key, newCount.toString(), { expirationTtl: windowSeconds })

    return { allowed: true, remaining: limit - newCount }
  } catch (error) {
    console.error('Rate limit check failed:', error)
    // On error, allow the request
    return { allowed: true, remaining: limit }
  }
}
