/**
 * Doctor-assignment algorithm: maps a service slug to the recommended provider.
 *
 * Two confidence levels:
 *   - 'definitive' → doctor is auto-added as a Calendar attendee on the tentative event.
 *   - 'suggested'  → doctor is listed in the event description only; the manager
 *                    adds them as an attendee when confirming. Used for wellness
 *                    services that any provider could see.
 *
 * EDITING: change a row to reassign a service, or add a new row for a new service.
 * Keep slugs in sync with lib/service-content.ts.
 */

export type DoctorSlug = 'dr-kamil-amer' | 'dr-kamal-amer'
export type AssignmentConfidence = 'definitive' | 'suggested'

export type DoctorAssignment = {
  doctor: DoctorSlug
  confidence: AssignmentConfidence
}

const ASSIGNMENTS: Record<string, DoctorAssignment> = {
  'orthopedic-services': { doctor: 'dr-kamil-amer', confidence: 'definitive' },
  'physical-therapy': { doctor: 'dr-kamil-amer', confidence: 'definitive' },
  'internal-medicine-gastroenterology': { doctor: 'dr-kamal-amer', confidence: 'definitive' },
  'peptide-wellness': { doctor: 'dr-kamal-amer', confidence: 'definitive' },
  'iv-infusion-therapy': { doctor: 'dr-kamal-amer', confidence: 'suggested' },
  'in-house-lab': { doctor: 'dr-kamal-amer', confidence: 'suggested' },
  acupuncture: { doctor: 'dr-kamil-amer', confidence: 'suggested' },
}

export function assignDoctor(serviceSlug: string): DoctorAssignment | null {
  return ASSIGNMENTS[serviceSlug] ?? null
}

export function isKnownService(serviceSlug: string): boolean {
  return serviceSlug in ASSIGNMENTS
}

export function allServiceSlugs(): string[] {
  return Object.keys(ASSIGNMENTS)
}
