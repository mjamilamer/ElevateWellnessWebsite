import { Metadata } from 'next'
import { Hero } from '@/components/Hero'
import { SectionHeader } from '@/components/SectionHeader'
import { siteConfig } from '@/lib/config'
import { formatPhone } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Locations',
  description: 'Find our office locations, hours of operation, and parking information.',
}

export default function LocationsPage() {
  return (
    <>
      <Hero
        subtitle="Visit Our Clinic"
        title="Our Locations"
        description="Convenient locations to serve you better. Find the office nearest to you."
        highlights={[
          'Central access with clear directions and arrival guidance',
          'Accessible facility and patient-friendly building layout',
          'Consistent office hours for easier scheduling',
        ]}
        primaryCTA={{
          text: 'Schedule Appointment',
          href: '/appointments',
        }}
      />

      {/* Main Location */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeader
            title="Main Office"
            subtitle="Primary Location"
            centered
          />

          <div className="mt-12 max-w-5xl mx-auto">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {/* Location Details */}
              <div className="space-y-6">
                <div className="surface-muted p-6">
                  <h3 className="text-xl font-bold text-neutral-900 mb-4 flex items-center">
                    <svg className="w-6 h-6 text-primary-700 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Address
                  </h3>
                  <address className="not-italic text-neutral-700">
                    <p>{siteConfig.contact.address.street}</p>
                    <p>{siteConfig.contact.address.suite}</p>
                    <p>
                      {siteConfig.contact.address.city}, {siteConfig.contact.address.state}{' '}
                      {siteConfig.contact.address.zip}
                    </p>
                  </address>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      `${siteConfig.contact.address.street}, ${siteConfig.contact.address.city}, ${siteConfig.contact.address.state} ${siteConfig.contact.address.zip}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center mt-4 text-primary-700 font-semibold hover:underline"
                  >
                    Get Directions
                    <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>

                <div className="surface-muted p-6">
                  <h3 className="text-xl font-bold text-neutral-900 mb-4 flex items-center">
                    <svg className="w-6 h-6 text-primary-700 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Hours of Operation
                  </h3>
                  <div className="space-y-2 text-neutral-700">
                    <div className="flex justify-between">
                      <span className="font-medium">Monday:</span>
                      <span>{siteConfig.hours.monday}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Tuesday:</span>
                      <span>{siteConfig.hours.tuesday}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Wednesday:</span>
                      <span>{siteConfig.hours.wednesday}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Thursday:</span>
                      <span>{siteConfig.hours.thursday}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Friday:</span>
                      <span>{siteConfig.hours.friday}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Saturday:</span>
                      <span>{siteConfig.hours.saturday}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Sunday:</span>
                      <span>{siteConfig.hours.sunday}</span>
                    </div>
                  </div>
                </div>

                <div className="surface-muted p-6">
                  <h3 className="text-xl font-bold text-neutral-900 mb-4 flex items-center">
                    <svg className="w-6 h-6 text-primary-700 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Contact
                  </h3>
                  <div className="space-y-2 text-neutral-700">
                    <div>
                      <span className="font-medium">Phone: </span>
                      <a href={`tel:${siteConfig.contact.phone.replace(/\D/g, '')}`} className="text-primary-700 hover:underline">
                        {formatPhone(siteConfig.contact.phone)}
                      </a>
                    </div>
                    <div>
                      <span className="font-medium">Email: </span>
                      <a href={`mailto:${siteConfig.contact.email}`} className="text-primary-700 hover:underline">
                        {siteConfig.contact.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="surface-card h-[600px] overflow-hidden">
                <iframe
                  title="Office Location Map"
                  src={`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${encodeURIComponent(
                    `${siteConfig.contact.address.street}, ${siteConfig.contact.address.city}, ${siteConfig.contact.address.state} ${siteConfig.contact.address.zip}`
                  )}`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Parking & Accessibility */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              title="Parking & Accessibility"
              subtitle="Getting Here"
              centered
            />

            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="surface-card p-6">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center text-primary-700">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                  </div>
                  <h3 className="ml-4 text-xl font-bold text-neutral-900">
                    Parking
                  </h3>
                </div>
                <p className="text-neutral-700">
                  Free parking is available in the building's parking garage. Enter from Main Street 
                  and look for visitor parking on levels 1-3. Handicapped-accessible parking spaces 
                  are available on level 1 near the elevators.
                </p>
              </div>

              <div className="surface-card p-6">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center text-primary-700">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                  </div>
                  <h3 className="ml-4 text-xl font-bold text-neutral-900">
                    Accessibility
                  </h3>
                </div>
                <p className="text-neutral-700">
                  Our office is fully wheelchair accessible with automatic doors, elevators, 
                  and accessible restrooms. If you require any special accommodations, please 
                  let us know when scheduling your appointment.
                </p>
              </div>

              <div className="surface-card p-6">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center text-primary-700">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                  </div>
                  <h3 className="ml-4 text-xl font-bold text-neutral-900">
                    Public Transit
                  </h3>
                </div>
                <p className="text-neutral-700">
                  We're conveniently located near several public transit routes. The Green Line 
                  station is a 5-minute walk, and bus routes 42, 57, and 89 stop within one block 
                  of our building.
                </p>
              </div>

              <div className="surface-card p-6">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center text-primary-700">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="ml-4 text-xl font-bold text-neutral-900">
                    Building Access
                  </h3>
                </div>
                <p className="text-neutral-700">
                  We're located on the 2nd floor of the main wellness building. Take the elevator 
                  or stairs from the main lobby. Our suite number is listed above, and you'll see our signage 
                  when you exit the elevator.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
