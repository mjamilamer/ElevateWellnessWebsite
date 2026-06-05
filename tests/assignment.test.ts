import { describe, it, expect } from 'vitest'
import { assignDoctor, allServiceSlugs, isKnownService } from '@/lib/scheduling/assignment'
import { servicePages } from '@/lib/service-content'

describe('doctor assignment', () => {
  it('routes orthopedic + physical therapy to Dr. Kamil (definitive)', () => {
    expect(assignDoctor('orthopedic-services')).toEqual({ doctor: 'dr-kamil-amer', confidence: 'definitive' })
    expect(assignDoctor('physical-therapy')).toEqual({ doctor: 'dr-kamil-amer', confidence: 'definitive' })
  })

  it('routes internal medicine + peptide wellness to Dr. Kamal (definitive)', () => {
    expect(assignDoctor('internal-medicine-gastroenterology')).toEqual({
      doctor: 'dr-kamal-amer',
      confidence: 'definitive',
    })
    expect(assignDoctor('peptide-wellness')).toEqual({ doctor: 'dr-kamal-amer', confidence: 'definitive' })
  })

  it('marks wellness-only services as suggested (manager confirms)', () => {
    expect(assignDoctor('iv-infusion-therapy')?.confidence).toBe('suggested')
    expect(assignDoctor('in-house-lab')?.confidence).toBe('suggested')
    expect(assignDoctor('acupuncture')?.confidence).toBe('suggested')
  })

  it('returns null for an unknown service', () => {
    expect(assignDoctor('not-a-real-service')).toBeNull()
    expect(isKnownService('not-a-real-service')).toBe(false)
  })

  it('every assigned slug exists in the service catalog (no orphan routes)', () => {
    const catalogSlugs = new Set(servicePages.map((s) => s.slug))
    for (const slug of allServiceSlugs()) {
      expect(catalogSlugs.has(slug)).toBe(true)
    }
  })

  it('every catalog service has a doctor assignment (no unrouted services)', () => {
    for (const s of servicePages) {
      expect(assignDoctor(s.slug), `missing assignment for ${s.slug}`).not.toBeNull()
    }
  })
})
