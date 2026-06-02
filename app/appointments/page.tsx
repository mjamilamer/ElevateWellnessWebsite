import { Hero } from '@/components/Hero'
import { SectionHeader } from '@/components/SectionHeader'
import { AppointmentRequestForm } from '@/components/AppointmentRequestForm'
import { ContactMethods } from '@/components/ContactMethods'
import { EmergencyNotice } from '@/components/EmergencyNotice'
import { siteConfig } from '@/lib/config'
import { formatPhone } from '@/lib/utils'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata('/appointments', {
  title: 'Request an Appointment',
  description:
    'Request an appointment with our team at Elevate Wellness & Health. Pick a service, choose a time, and our team will confirm within 1 business day.',
})

export default function AppointmentsPage() {
  const tel = `tel:${siteConfig.contact.phone.replace(/\D/g, '')}`

  return (
    <>
      <Hero
        subtitle="Appointment Center"
        title="Request an appointment"
        description="Pick a service, choose a time, and our team will confirm your visit within 1 business day. Prefer to talk to someone? Call us during office hours."
        highlights={[
          'Tentative times are subject to confirmation by our team',
          'Email confirmation with a calendar invite once approved',
          'Call our office anytime during business hours',
        ]}
        primaryCTA={{
          text: `Call ${formatPhone(siteConfig.contact.phone)}`,
          href: tel,
        }}
      />

      {/* Request form */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl">
            <SectionHeader
              title="Book your visit"
              subtitle="Online Request"
              description="Tell us what you need, when works for you, and how to reach you. We'll handle the rest."
              centered
            />
            <div className="mt-10">
              <AppointmentRequestForm />
            </div>
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="section-padding section-band">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              title="What to Expect"
              subtitle="Your Visit"
              centered
            />

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: 1,
                  title: 'Request',
                  body: 'Pick a service, choose a time window, and submit your contact info. We hold the slot tentatively.',
                },
                {
                  step: 2,
                  title: 'Confirm',
                  body: 'Our team reviews and sends you a calendar invite — usually within one business day.',
                },
                {
                  step: 3,
                  title: 'Visit',
                  body: 'Meet with your provider for a comprehensive evaluation and personalized care plan.',
                },
              ].map(({ step, title, body }) => (
                <div key={step} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 text-primary-700 font-bold text-xl mb-4">
                    {step}
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">{title}</h3>
                  <p className="text-neutral-600">{body}</p>
                </div>
              ))}
            </div>

            <div className="surface-card mt-12 p-6">
              <h4 className="text-lg font-semibold text-neutral-900 mb-4">
                Before Your Appointment
              </h4>
              <ul className="space-y-2 text-neutral-600">
                {[
                  'Bring your insurance card and photo ID',
                  'Arrive 15 minutes early to complete paperwork',
                  'Bring any previous X-rays, MRIs, or medical records',
                  'Write down any questions you want to ask',
                  'Wear comfortable, loose-fitting clothing',
                ].map((item) => (
                  <li key={item} className="flex items-start">
                    <svg className="w-5 h-5 text-primary-700 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-8 text-center text-sm text-neutral-600">
              Prefer to call?{' '}
              <a href={tel} className="font-semibold text-primary-700 hover:underline">
                {formatPhone(siteConfig.contact.phone)}
              </a>{' '}
              during office hours.
            </p>
          </div>
        </div>
      </section>

      {/* Other ways to reach us */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <SectionHeader
              title="Other ways to reach us"
              subtitle="Contact"
              description="Call, email, or visit us in North Bergen. We're happy to help with scheduling, insurance, and first-visit questions."
              centered
            />
            <div className="mt-12">
              <ContactMethods />
            </div>
            <div className="mt-12">
              <EmergencyNotice bordered />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
