import { Hero } from '@/components/Hero'
import { SectionHeader } from '@/components/SectionHeader'
import { CTASection } from '@/components/CTASection'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata('/about', {
  title: 'About Us',
  description:
    'Learn about Elevate Wellness & Health, our mission, and our commitment to exceptional wellness & health care.',
})

export default function AboutPage() {
  return (
    <>
      <Hero
        subtitle="Who We Are"
        title="About Elevate Wellness & Health"
        description="Dedicated to compassionate, expert wellness & health care that helps you live your best life."
        highlights={[
          'Evidence-based recommendations tailored to your goals',
          'Collaborative care plans with clear next steps',
          'Consistent communication from consult through recovery',
        ]}
      />

      {/* Our Story */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              title="Our Story"
              subtitle="Since 2005"
              description="Building a legacy of excellence in wellness & health."
            />

            <div className="surface-card mt-8 p-6 md:p-8 prose prose-lg max-w-none">
              <p>
                Founded in 2005, Elevate Wellness & Health, LLC has been serving our community with 
                state-of-the-art care for nearly two decades. What started as a 
                single-provider practice has grown into a comprehensive wellness & health center 
                with multiple specialists, all committed to one goal: helping you get back 
                to the activities you love.
              </p>

              <p>
                Our practice combines cutting-edge medical technology with personalized, 
                compassionate care. We believe that every patient deserves individual 
                attention and a treatment plan tailored to their unique needs and goals.
              </p>

              <p>
                Over the years, we've helped thousands of patients recover from injuries, 
                manage chronic conditions, and achieve better quality of life through both 
                surgical and non-surgical treatments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Philosophy */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <SectionHeader
            title="Our Philosophy"
            subtitle="Patient-Centered Care"
            centered
          />

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="surface-card p-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-700 mb-4">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-2">Evidence-Based</h3>
              <p className="text-neutral-600">
                We use the latest research and proven treatment methods to ensure the best outcomes.
              </p>
            </div>

            <div className="surface-card p-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-700 mb-4">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-2">Collaborative</h3>
              <p className="text-neutral-600">
                Our team works together with you to create a personalized treatment plan.
              </p>
            </div>

            <div className="surface-card p-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-700 mb-4">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-2">Compassionate</h3>
              <p className="text-neutral-600">
                We treat every patient with empathy, respect, and dignity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Commitment */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              title="Our Commitment to You"
              centered
            />

            <div className="surface-card mt-8 space-y-6 p-6 md:p-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary-100 text-secondary-700">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-neutral-900 mb-1">
                    Comprehensive Care
                  </h4>
                  <p className="text-neutral-600">
                    From your first consultation to full recovery, we're with you every step of the way.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary-100 text-secondary-700">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-neutral-900 mb-1">
                    Advanced Technology
                  </h4>
                  <p className="text-neutral-600">
                    We invest in the latest diagnostic and treatment technologies for better outcomes.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary-100 text-secondary-700">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-neutral-900 mb-1">
                    Convenient Scheduling
                  </h4>
                  <p className="text-neutral-600">
                    Flexible appointment times and online scheduling make it easy to get the care you need.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary-100 text-secondary-700">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-neutral-900 mb-1">
                    Insurance Friendly
                  </h4>
                  <p className="text-neutral-600">
                    We work with most major insurance plans and offer transparent billing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Experience the Elevate Wellness & Health Difference"
        description="Join thousands of patients who have trusted us with their wellness & health care."
        primaryCTA={{
          text: 'Schedule Consultation',
          href: '/appointments',
        }}
        secondaryCTA={{
          text: 'Meet Our Providers',
          href: '/providers',
        }}
      />
    </>
  )
}
