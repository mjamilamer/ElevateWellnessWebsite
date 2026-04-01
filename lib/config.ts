export const siteConfig = {
  name: 'AmerMed Orthopedics',
  description: 'Personalized orthopedic care that gets you moving again. Book a convenient appointment—no referral required.',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://amermed.com',
  
  contact: {
    phone: '+1 (000) 000-0000',
    email: 'hello@exampleclinic.test',
    address: {
      street: '000 Wellness Avenue',
      suite: 'Suite 000',
      city: 'Sample City',
      state: 'ST',
      zip: '00000',
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
    facebook: 'https://facebook.com/amermed',
    twitter: 'https://twitter.com/amermed',
    linkedin: 'https://linkedin.com/company/amermed',
    instagram: 'https://instagram.com/amermed',
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
