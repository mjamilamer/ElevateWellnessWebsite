import { Metadata } from 'next'
import { Hero } from '@/components/Hero'
import { SectionHeader } from '@/components/SectionHeader'
import { CalEmbed } from '@/components/CalEmbed'
import { ContactForm } from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Schedule Appointment',
  description: 'Book your appointment online or request a preferred time. Fast, convenient scheduling with no referral required.',
}

export default function AppointmentsPage() {
  return (
    <>
      <Hero
        subtitle="Appointment Center"
        title="Schedule Your Appointment"
        description="Choose a convenient time that works for you. We'll confirm your appointment within 24 hours."
        highlights={[
          'Online booking with real-time availability',
          'Manual request option if preferred slots are unavailable',
          'Non-PHI intake design for safer scheduling',
        ]}
      />

      {/* Cal.com Embed Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <SectionHeader
              title="Book Online"
              subtitle="Instant Scheduling"
              description="Select your preferred provider and available time slot. Your appointment will be confirmed immediately."
              centered
            />

            <div className="surface-muted mt-8 p-4">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> This scheduling form collects only contact details and your preferred time. 
                Please do not include medical information. For urgent medical issues, call 911.
              </p>
            </div>

            {/* Cal.com Embed */}
            <div className="mt-12">
              <CalEmbed 
                calLink="your-practice/consultation" 
                className="w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="container-custom">
        <div className="max-w-5xl mx-auto">
          <div className="relative py-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-300"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 bg-white text-neutral-500 text-sm font-medium">
                Or request a callback
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Manual Request Form */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            <SectionHeader
              title="Request an Appointment"
              subtitle="Manual Request"
              description="Can't find a suitable time? Fill out this form and we'll contact you to schedule an appointment."
              centered
            />

            <div className="mt-12">
              <ContactForm formType="appointment" />
            </div>
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              title="What to Expect"
              subtitle="Your Visit"
              centered
            />

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 text-primary-700 font-bold text-xl mb-4">
                  1
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                  Schedule
                </h3>
                <p className="text-neutral-600">
                  Book online or request a callback. We'll confirm your appointment within 24 hours.
                </p>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 text-primary-700 font-bold text-xl mb-4">
                  2
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                  Prepare
                </h3>
                <p className="text-neutral-600">
                  Bring your insurance card, photo ID, and any relevant medical records or imaging.
                </p>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 text-primary-700 font-bold text-xl mb-4">
                  3
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                  Visit
                </h3>
                <p className="text-neutral-600">
                  Meet with your provider for a comprehensive evaluation and personalized treatment plan.
                </p>
              </div>
            </div>

            <div className="surface-card mt-12 p-6">
              <h4 className="text-lg font-semibold text-neutral-900 mb-4">
                Before Your Appointment
              </h4>
              <ul className="space-y-2 text-neutral-600">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-secondary-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Bring your insurance card and photo ID
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-secondary-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Arrive 15 minutes early to complete paperwork
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-secondary-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Bring any previous X-rays, MRIs, or medical records
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-secondary-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Write down any questions you want to ask
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-secondary-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Wear comfortable, loose-fitting clothing
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
