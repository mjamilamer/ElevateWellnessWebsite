export const siteConfig = {
  name: 'Elevate Wellness & Health',
  /** Use for copyright, legal footers, and structured data where the legal entity is required. */
  legalName: 'Elevate Wellness & Health',
  description:
    'Personalized wellness & health care to help you feel your best. Schedule a convenient visit—no referral required.',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.elevatewellnessnj.com',
  
  contact: {
    phone: '+1 (201) 305-5103',
    fax: '201-305-5104',
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
    monday: '9:00 AM - 5:00 PM',
    tuesday: '9:00 AM - 5:00 PM',
    wednesday: '9:00 AM - 5:00 PM',
    thursday: '9:00 AM - 5:00 PM',
    friday: '9:00 AM - 5:00 PM',
    saturday: 'Closed',
    sunday: 'Closed',
  },

  /**
   * Practice team metadata used by the scheduling backend and the Calendar
   * integration. `email` is the Workspace address that becomes a Calendar
   * attendee on tentative events. Update with real Workspace addresses
   * before going live; placeholders below are illustrative.
   */
  team: {
    physicians: [
      {
        slug: 'dr-kamil-amer',
        name: 'Dr. Kamil M. Amer, MD',
        email: 'kamil@elevatewellnessnj.com',
        title: 'Orthopedic Surgery — Hand & Upper Extremity',
      },
      {
        slug: 'dr-kamal-amer',
        name: 'Dr. Kamal M. Amer, MD',
        email: 'kamal@elevatewellnessnj.com',
        title: 'Gastroenterology & Internal Medicine',
      },
    ],
  } as {
    physicians: Array<{
      slug: 'dr-kamil-amer' | 'dr-kamal-amer'
      name: string
      email: string
      title: string
    }>
  },

  /**
   * Patient-facing booking URLs for each physician.
   *
   * SETUP — Google Appointment Schedules (free with Google Workspace):
   *   1. Each provider signs into their Workspace Google Calendar.
   *   2. Create → "Appointment schedule" → configure title, duration,
   *      availability, location, buffer, confirmation/reminder emails.
   *   3. Save → click "Share" on the schedule → copy the public booking URL.
   *      It looks like https://calendar.app.google/<short-id> or
   *      https://calendar.google.com/calendar/appointments/schedules/<long-id>.
   *   4. Paste the URL into the `bookingUrl` field for that provider below.
   *
   * If `bookingUrl` is empty, the /appointments page shows a "call to
   * schedule" fallback CTA for that provider instead of an online-booking
   * button — so it's safe to ship with these blank.
   */
  scheduling: {
    providers: [
      {
        slug: 'dr-kamil-amer',
        name: 'Dr. Kamil M. Amer, MD',
        title: 'Orthopedic Surgery — Hand & Upper Extremity',
        description:
          'Bones, joints, spine, hands, fractures, sports injuries, and surgical evaluations.',
        bookingUrl: '',
      },
      {
        slug: 'dr-kamal-amer',
        name: 'Dr. Kamal M. Amer, MD',
        title: 'Gastroenterology & Internal Medicine',
        description:
          'Adult primary care, preventive visits, chronic-condition management, and digestive health.',
        bookingUrl: '',
      },
    ],
  } as {
    providers: Array<{
      slug: string
      name: string
      title: string
      description: string
      bookingUrl: string
    }>
  },

  social: {
    facebook: 'https://facebook.com/elevatewellnessandhealth',
    twitter: 'https://twitter.com/elevatewellnessandhealth',
    linkedin: 'https://linkedin.com/company/elevatewellnessandhealth',
    instagram: 'https://instagram.com/elevatewellnessandhealth',
  },

  /**
   * Google Business Profile links. These connect the website to the Google
   * listing — used in JSON-LD `sameAs`/`hasMap` and the "review us" CTA.
   * `reviewUrl` is the short link Google generates under "Get more reviews".
   */
  googleBusiness: {
    reviewUrl: 'https://g.page/r/Ca1f1Cxoyz3oEAI/review',
    profileUrl: 'https://g.page/r/Ca1f1Cxoyz3oEAI',
  },

  /**
   * Geo coordinates for LocalBusiness JSON-LD (improves local-pack ranking).
   * Exact pin for 7504 Broadway, North Bergen, NJ 07047 — taken from the
   * Google Maps place URL (`!3d<lat>!4d<lng>`).
   */
  geo: {
    latitude: '40.796634',
    longitude: '-74.0027832',
  },

  /** Towns/areas served — reinforces local relevance for nearby searches. */
  areaServed: [
    'North Bergen',
    'Union City',
    'West New York',
    'Guttenberg',
    'Secaucus',
    'Hudson County',
  ],

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
