export const siteConfig = {
  name: 'Elevate Wellness & Health',
  /** Use for copyright, legal footers, and structured data where the legal entity is required. */
  legalName: 'Elevate Wellness & Health, LLC',
  description:
    'Personalized wellness & health care to help you feel your best. Schedule a convenient visit—no referral required.',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://elevatewellnessnj.com',
  
  contact: {
    phone: '+1 (206) 397-8171',
    fax: '206-395-0372',
    email: 'Info@elevatewellnessnj.com',
    address: {
      street: '7504-06 Broadway Avenue',
      suite: '',
      city: 'North Bergen',
      state: 'NJ',
      zip: '07047',
    },
  },

  hours: {
    monday: '8:00 AM - 5:00 PM',
    tuesday: '8:00 AM - 5:00 PM',
    wednesday: '8:00 AM - 5:00 PM',
    thursday: '8:00 AM - 5:00 PM',
    friday: '8:00 AM - 4:00 PM',
    saturday: 'Closed',
    sunday: 'Closed',
  },

  social: {
    facebook: 'https://facebook.com/elevatewellnessandhealth',
    twitter: 'https://twitter.com/elevatewellnessandhealth',
    linkedin: 'https://linkedin.com/company/elevatewellnessandhealth',
    instagram: 'https://instagram.com/elevatewellnessandhealth',
  },

  /** Set real coordinates for LocalBusiness JSON-LD (better local SEO). */
  geo: {
    latitude: '',
    longitude: '',
  },

  // Insurance providers
  insurance: [
    'Aetna',
    'Blue Cross Blue Shield',
    'Cigna',
    'UnitedHealthcare',
    'Medicare',
    'Medicaid',
    'Humana',
    'And most major plans',
  ],

  // Navigation
  navigation: [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Providers', href: '/providers' },
    { name: 'Services', href: '/services' },
    { name: 'New Patients', href: '/new-patients' },
    { name: 'Locations', href: '/locations' },
    { name: 'Appointments', href: '/appointments' },
    { name: 'Contact', href: '/contact' },
  ],
}

export type SiteConfig = typeof siteConfig
