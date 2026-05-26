/**
 * Server-side utilities for the lightweight form-handling API routes.
 * Database/audit helpers were removed in the move to a no-DB architecture —
 * scheduling now goes through Google Appointment Schedules and the contact
 * form forwards directly to the manager's inbox via Resend.
 */

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

export function clientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  return request.headers.get('x-real-ip') || 'unknown'
}
