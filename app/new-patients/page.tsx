import Link from 'next/link'
import { Hero } from '@/components/Hero'
import { SectionHeader } from '@/components/SectionHeader'
import { FAQItem } from '@/components/FAQItem'
import { StructuredData } from '@/components/StructuredData'
import { siteConfig } from '@/lib/config'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata('/new-patients', {
  title: 'New Patients',
  description:
    'New patient information for Elevate Wellness & Health—what to expect, insurance, billing, and FAQs.',
})

/**
 * FAQ Q/A pairs. Single source of truth used both for visual rendering and
 * for the FAQPage JSON-LD that unlocks Google rich results.
 */
const FAQS: Array<{ question: string; answer: string }> = [
  {
    question: 'Do I need a referral to schedule an appointment?',
    answer:
      'In most cases, you do not need a referral to see our specialists at Elevate Wellness & Health. However, some insurance plans require referrals for specialist visits. Please check with your insurance provider to confirm their requirements.',
  },
  {
    question: 'How long will my first appointment take?',
    answer:
      'Your initial consultation typically lasts 45-60 minutes. This allows time for a comprehensive evaluation, discussion of your symptoms, physical examination, and development of a treatment plan.',
  },
  {
    question: 'What should I bring to my appointment?',
    answer:
      'Please bring your insurance card, photo ID, any previous medical records or imaging (X-rays, MRI, CT scans), a list of current medications, and any questions you want to discuss with your provider.',
  },
  {
    question: 'Will I need surgery?',
    answer:
      'Not necessarily. We always explore conservative treatment options first, including physical therapy, medication, and injections. Surgery is recommended only when necessary and after discussing all alternatives with you.',
  },
  {
    question: 'How quickly can I get an appointment?',
    answer:
      'We strive to see new patients as quickly as possible. Depending on provider availability and urgency, we can often schedule appointments within a few days to a week.',
  },
  {
    question: 'Do you offer same-day appointments for urgent issues?',
    answer:
      "We reserve appointment slots for urgent medical concerns across our specialties. Call our office and we'll do our best to accommodate you the same day or next day.",
  },
  {
    question: 'What if I need to cancel or reschedule?',
    answer:
      'We understand that schedules change. Please call us at least 24 hours in advance if you need to cancel or reschedule your appointment. This allows us to offer that time to another patient.',
  },
  {
    question: 'Do you provide imaging services on-site?',
    answer:
      'We coordinate imaging based on your clinical needs. Some studies can be done in-office; for MRI or CT scans we work with nearby imaging centers and help coordinate those appointments for you.',
  },
]

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: f.answer,
    },
  })),
}

export default function NewPatientsPage() {
  return (
    <>
      <StructuredData data={faqJsonLd} />
      <Hero
        subtitle="First Visit Guide"
        title="Welcome New Patients"
        description="We're here to help you get back to doing what you love. Here's everything you need to know for your first visit."
        highlights={[
          'Simple pre-visit checklist so you arrive prepared',
          'Transparent insurance and billing guidance',
          'Clear answers to common first-visit questions',
        ]}
        primaryCTA={{
          text: 'Schedule Appointment',
          href: '/appointments',
        }}
      />

      {/* What to Expect */}
      <section className="section-padding bg-white" id="what-to-expect">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              title="What to Expect"
              subtitle="Your First Visit"
              description="We've streamlined the process to make your first visit as smooth and efficient as possible."
            />

            <div className="mt-12 space-y-8">
              <div className="surface-muted p-6">
                <h3 className="text-xl font-bold text-neutral-900 mb-4">Before Your Appointment</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-secondary-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-neutral-700">
                      <strong>Arrive 15 minutes early</strong> to complete registration and paperwork
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-secondary-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-neutral-700">
                      <strong>Bring your insurance card</strong> and a valid photo ID
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-secondary-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-neutral-700">
                      <strong>Bring previous medical records</strong> including X-rays, MRI, or CT scans (if available)
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-secondary-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-neutral-700">
                      <strong>List of current medications</strong> including dosages
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-secondary-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-neutral-700">
                      <strong>Wear comfortable clothing</strong> that allows easy access to the affected area
                    </span>
                  </li>
                </ul>
              </div>

              <div className="surface-muted p-6">
                <h3 className="text-xl font-bold text-neutral-900 mb-4">During Your Visit</h3>
                <p className="text-neutral-700 mb-4">
                  Your first appointment typically lasts 45-60 minutes and includes:
                </p>
                <ul className="space-y-2 text-neutral-700">
                  <li className="flex items-start">
                    <span className="text-primary-600 mr-2">•</span>
                    <span>Review of your medical history and current symptoms</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 mr-2">•</span>
                    <span>Comprehensive physical examination</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 mr-2">•</span>
                    <span>Review of any previous imaging or test results</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 mr-2">•</span>
                    <span>Discussion of diagnosis and treatment options</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 mr-2">•</span>
                    <span>Opportunity to ask questions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 mr-2">•</span>
                    <span>Development of a personalized treatment plan</span>
                  </li>
                </ul>
              </div>

              <div className="surface-muted p-6">
                <h3 className="text-xl font-bold text-neutral-900 mb-4">After Your Visit</h3>
                <p className="text-neutral-700">
                  You'll receive clear instructions for your treatment plan, including any 
                  prescriptions, therapy referrals, or follow-up appointments. Our staff will 
                  help you schedule any necessary imaging or additional appointments before you leave.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Insurance & Billing */}
      <section className="section-padding bg-neutral-50" id="insurance">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              title="Insurance & Billing"
              subtitle="Coverage Information"
              description="We work with most major insurance providers to make your care affordable."
            />

            <div className="mt-12 space-y-6">
              <div className="surface-card p-6">
                <h3 className="text-xl font-bold text-neutral-900 mb-3">Accepted Insurance Plans</h3>
                <p className="text-neutral-700 mb-4">
                  We are in-network with most major insurance plans, including:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {siteConfig.insurance.map((provider) => (
                    <div key={provider} className="flex items-center text-neutral-700">
                      <svg className="w-5 h-5 text-secondary-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {provider}
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-neutral-600">
                  Not sure if your plan is accepted?{' '}
                  <Link href="/contact" className="text-primary-700 font-semibold hover:underline">
                    Contact us
                  </Link>{' '}
                  to verify your coverage.
                </p>
              </div>

              <div className="surface-card p-6">
                <h3 className="text-xl font-bold text-neutral-900 mb-3">Payment Options</h3>
                <p className="text-neutral-700 mb-3">
                  We accept various payment methods:
                </p>
                <ul className="space-y-2 text-neutral-700">
                  <li className="flex items-start">
                    <span className="text-primary-600 mr-2">•</span>
                    <span>Cash, check, or credit/debit cards</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 mr-2">•</span>
                    <span>HSA and FSA cards</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 mr-2">•</span>
                    <span>Payment plans available for qualifying patients</span>
                  </li>
                </ul>
              </div>

              <div className="surface-card p-6">
                <h3 className="text-xl font-bold text-neutral-900 mb-3">Financial Assistance</h3>
                <p className="text-neutral-700">
                  We understand that medical costs can be challenging. We offer payment plans 
                  and financial assistance programs for qualifying patients. Please speak with 
                  our billing department to discuss your options.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section-padding bg-white" id="faq">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <SectionHeader
              title="Frequently Asked Questions"
              subtitle="FAQs"
              centered
            />

            <div className="surface-card mt-12 divide-y divide-neutral-200 p-6">
              {FAQS.map((faq) => (
                <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-neutral-600 mb-4">
                Don't see your question answered?
              </p>
              <Link href="/contact" className="btn-primary">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
