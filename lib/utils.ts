import clsx, { ClassValue } from 'clsx'

/**
 * Utility for merging Tailwind classes
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

/**
 * Format phone number for display
 */
export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '')
  const match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{4})$/)
  if (match) {
    return `+${match[1]} (${match[2]}) ${match[3]}-${match[4]}`
  }
  return phone
}

/**
 * Format date/time for display
 */
export function formatDateTime(dateString: string): string {
  try {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      dateStyle: 'long',
      timeStyle: 'short',
    }).format(date)
  } catch {
    return dateString
  }
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate phone number (US format)
 */
export function isValidPhone(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, '')
  return cleaned.length === 10 || cleaned.length === 11
}

/**
 * Sanitize user input to prevent XSS
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '')
    .trim()
    .slice(0, 500) // Max length
}

/**
 * Check if string contains potential PHI keywords (basic check)
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
  ]
  
  const lowerText = text.toLowerCase()
  return phiKeywords.some(keyword => lowerText.includes(keyword))
}
