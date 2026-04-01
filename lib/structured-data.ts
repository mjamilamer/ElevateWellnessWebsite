import { siteConfig } from './config'

/**
 * Generate JSON-LD structured data for the medical practice
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalOrganization',
    '@id': `${siteConfig.siteUrl}/#organization`,
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.siteUrl,
    logo: `${siteConfig.siteUrl}/logo.png`,
    image: `${siteConfig.siteUrl}/og-image.jpg`,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.contact.address.street,
      addressLocality: siteConfig.contact.address.city,
      addressRegion: siteConfig.contact.address.state,
      postalCode: siteConfig.contact.address.zip,
      addressCountry: 'US',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
        opens: '08:00',
        closes: '17:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Friday',
        opens: '08:00',
        closes: '16:00',
      },
    ],
    sameAs: Object.values(siteConfig.social).filter(Boolean),
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
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    '@id': `${siteConfig.siteUrl}/#localbusiness`,
    name: siteConfig.name,
    image: `${siteConfig.siteUrl}/og-image.jpg`,
    url: siteConfig.siteUrl,
    telephone: siteConfig.contact.phone,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.contact.address.street,
      addressLocality: siteConfig.contact.address.city,
      addressRegion: siteConfig.contact.address.state,
      postalCode: siteConfig.contact.address.zip,
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '42.3601', // Replace with actual coordinates
      longitude: '-71.0589', // Replace with actual coordinates
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
        opens: '08:00',
        closes: '17:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Friday',
        opens: '08:00',
        closes: '16:00',
      },
    ],
  }
}
