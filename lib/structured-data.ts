import { siteConfig } from './config'

const DAY_LABELS: Record<string, string> = {
  monday: 'Monday',
  tuesday: 'Tuesday',
  wednesday: 'Wednesday',
  thursday: 'Thursday',
  friday: 'Friday',
  saturday: 'Saturday',
  sunday: 'Sunday',
}

const DAY_ORDER = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] as const

/** Convert a '9:00 AM'-style time to 24-hour 'HH:MM'. Returns null if unparseable. */
function to24h(label: string): string | null {
  const m = label.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i)
  if (!m) return null
  let h = parseInt(m[1], 10)
  const min = m[2]
  const mer = m[3].toUpperCase()
  if (mer === 'AM') h = h === 12 ? 0 : h
  else h = h === 12 ? 12 : h + 12
  return `${String(h).padStart(2, '0')}:${min}`
}

/**
 * Derive schema.org openingHoursSpecification from siteConfig.hours, grouping
 * consecutive days that share the same open/close times. Single source of
 * truth — the website's displayed hours and its structured data never drift.
 *
 * NOTE: these must also match your Google Business Profile hours exactly.
 */
function buildOpeningHoursSpec() {
  const specs: Array<{ '@type': 'OpeningHoursSpecification'; dayOfWeek: string[]; opens: string; closes: string }> = []
  const byRange = new Map<string, string[]>()

  for (const day of DAY_ORDER) {
    const raw = (siteConfig.hours as Record<string, string>)[day]
    if (!raw || /closed/i.test(raw)) continue
    const [openRaw, closeRaw] = raw.split(/\s*[–-]\s*/)
    const opens = to24h(openRaw ?? '')
    const closes = to24h(closeRaw ?? '')
    if (!opens || !closes) continue
    const key = `${opens}-${closes}`
    if (!byRange.has(key)) byRange.set(key, [])
    byRange.get(key)!.push(DAY_LABELS[day])
  }

  for (const [range, days] of byRange) {
    const [opens, closes] = range.split('-')
    specs.push({ '@type': 'OpeningHoursSpecification', dayOfWeek: days, opens, closes })
  }
  return specs
}

/** Google Business Profile + social links for `sameAs`. */
function sameAsLinks(): string[] {
  return [siteConfig.googleBusiness.profileUrl, ...Object.values(siteConfig.social)].filter(Boolean)
}

/**
 * Generate JSON-LD structured data for the medical practice
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalOrganization',
    '@id': `${siteConfig.siteUrl}/#organization`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    description: siteConfig.description,
    url: siteConfig.siteUrl,
    logo: `${siteConfig.siteUrl}/images/elevate_logo.jpg`,
    image: `${siteConfig.siteUrl}/images/elevate_logo.jpg`,
    telephone: siteConfig.contact.phone,
    faxNumber: siteConfig.contact.fax,
    email: siteConfig.contact.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.contact.address.street,
      addressLocality: siteConfig.contact.address.city,
      addressRegion: siteConfig.contact.address.state,
      postalCode: siteConfig.contact.address.zip,
      addressCountry: 'US',
    },
    openingHoursSpecification: buildOpeningHoursSpec(),
    sameAs: sameAsLinks(),
  }
}

/**
 * Generate JSON-LD for a physician
 */
export function generatePhysicianSchema(physician: {
  name: string
  slug: string
  title: string
  specialty: string
  bio?: string
  image?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    '@id': `${siteConfig.siteUrl}/providers/${physician.slug}#physician`,
    name: physician.name,
    honorificSuffix: physician.title,
    medicalSpecialty: physician.specialty,
    description: physician.bio,
    image: physician.image || `${siteConfig.siteUrl}/providers/${physician.slug}.jpg`,
    worksFor: {
      '@id': `${siteConfig.siteUrl}/#organization`,
    },
    url: `${siteConfig.siteUrl}/providers/${physician.slug}`,
  }
}

/**
 * Generate JSON-LD for a medical service
 */
export function generateServiceSchema(service: {
  name: string
  slug: string
  description: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    '@id': `${siteConfig.siteUrl}/services/${service.slug}#service`,
    name: service.name,
    description: service.description,
    url: `${siteConfig.siteUrl}/services/${service.slug}`,
    provider: {
      '@id': `${siteConfig.siteUrl}/#organization`,
    },
  }
}

/**
 * Generate Breadcrumb structured data
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

/**
 * Generate LocalBusiness structured data
 */
export function generateLocalBusinessSchema() {
  const base = {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    '@id': `${siteConfig.siteUrl}/#localbusiness`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    description: siteConfig.description,
    image: `${siteConfig.siteUrl}/images/elevate_logo.jpg`,
    url: siteConfig.siteUrl,
    telephone: siteConfig.contact.phone,
    faxNumber: siteConfig.contact.fax,
    email: siteConfig.contact.email,
    priceRange: '$$',
    currenciesAccepted: 'USD',
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.contact.address.street,
      addressLocality: siteConfig.contact.address.city,
      addressRegion: siteConfig.contact.address.state,
      postalCode: siteConfig.contact.address.zip,
      addressCountry: 'US',
    },
    areaServed: siteConfig.areaServed.map((name) => ({ '@type': 'City', name })),
    hasMap: siteConfig.googleBusiness.profileUrl,
    openingHoursSpecification: buildOpeningHoursSpec(),
    sameAs: sameAsLinks(),
  } as Record<string, unknown>

  if (siteConfig.geo.latitude && siteConfig.geo.longitude) {
    base.geo = {
      '@type': 'GeoCoordinates',
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    }
  }

  return base
}
