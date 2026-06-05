import { describe, it, expect } from 'vitest'
import {
  generateOrganizationSchema,
  generateLocalBusinessSchema,
  generatePhysicianSchema,
  generateServiceSchema,
  generateBreadcrumbSchema,
} from '@/lib/structured-data'
import { siteConfig } from '@/lib/config'

/* eslint-disable @typescript-eslint/no-explicit-any */

describe('LocalBusiness schema (local SEO)', () => {
  const s = generateLocalBusinessSchema() as any

  it('is a MedicalClinic with the North Bergen address + geo', () => {
    expect(s['@type']).toBe('MedicalClinic')
    expect(s.address.addressLocality).toBe('North Bergen')
    expect(s.geo).toMatchObject({ '@type': 'GeoCoordinates' })
    expect(s.geo.latitude).toBe(siteConfig.geo.latitude)
    expect(s.geo.longitude).toBe(siteConfig.geo.longitude)
  })

  it('links to the Google Business Profile via hasMap + sameAs', () => {
    expect(s.hasMap).toBe(siteConfig.googleBusiness.profileUrl)
    expect(s.sameAs).toContain(siteConfig.googleBusiness.profileUrl)
  })

  it('lists the areas served', () => {
    expect(Array.isArray(s.areaServed)).toBe(true)
    expect(s.areaServed.length).toBeGreaterThan(0)
  })

  it('derives opening hours (Mon–Fri 09:00–17:00, weekends closed)', () => {
    const days = s.openingHoursSpecification.flatMap((o: any) => o.dayOfWeek)
    expect(days).toContain('Monday')
    expect(days).toContain('Friday')
    expect(days).not.toContain('Saturday')
    expect(days).not.toContain('Sunday')
    expect(s.openingHoursSpecification[0].opens).toBe('09:00')
    expect(s.openingHoursSpecification[0].closes).toBe('17:00')
  })
})

describe('Organization schema', () => {
  it('matches the LocalBusiness hours (single source of truth)', () => {
    const org = generateOrganizationSchema() as any
    const local = generateLocalBusinessSchema() as any
    expect(org.openingHoursSpecification).toEqual(local.openingHoursSpecification)
  })

  it('includes the Google profile in sameAs', () => {
    const org = generateOrganizationSchema() as any
    expect(org.sameAs).toContain(siteConfig.googleBusiness.profileUrl)
  })
})

describe('other schema generators', () => {
  it('physician schema is a Physician with the given name', () => {
    const p = generatePhysicianSchema({ name: 'Dr. Test', slug: 'dr-test', title: 'MD', specialty: 'Ortho' }) as any
    expect(p['@type']).toBe('Physician')
    expect(p.name).toBe('Dr. Test')
  })

  it('service schema is a MedicalProcedure', () => {
    const sv = generateServiceSchema({ name: 'X', slug: 'x', description: 'd' }) as any
    expect(sv['@type']).toBe('MedicalProcedure')
  })

  it('breadcrumb positions are sequential', () => {
    const b = generateBreadcrumbSchema([
      { name: 'Home', url: 'https://x/' },
      { name: 'Services', url: 'https://x/services' },
    ]) as any
    expect(b.itemListElement[0].position).toBe(1)
    expect(b.itemListElement[1].position).toBe(2)
  })
})
