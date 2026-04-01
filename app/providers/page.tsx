import { Hero } from '@/components/Hero'
import { SectionHeader } from '@/components/SectionHeader'
import { ProviderCard } from '@/components/ProviderCard'
import { CTASection } from '@/components/CTASection'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata('/providers', {
  title: 'Our Providers',
  description:
    'Meet our board-certified orthopedic specialists dedicated to providing expert, compassionate care.',
})

export default function ProvidersPage() {
  return (
    <>
      <Hero
        subtitle="Specialist Physicians"
        title="Meet Our Expert Team"
        description="Board-certified orthopedic specialists with decades of combined experience dedicated to your care."
        highlights={[
          'Subspecialty-focused physicians across major orthopedic domains',
          'Shared treatment planning and coordinated follow-up',
          'Patient-centered communication at each decision point',
        ]}
        primaryCTA={{
          text: 'Schedule Appointment',
          href: '/appointments',
        }}
      />

      {/* Providers Grid */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeader
            title="Our Physicians"
            subtitle="Expert Care"
            description="Each of our providers brings specialized expertise and a commitment to personalized patient care."
            centered
          />

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <ProviderCard
              name="Dr. Sarah Johnson"
              title="MD, FAAOS"
              specialty="Joint Replacement & Sports Medicine"
              slug="dr-sarah-johnson"
            />
            <ProviderCard
              name="Dr. Michael Chen"
              title="MD, PhD"
              specialty="Spine Surgery & Pain Management"
              slug="dr-michael-chen"
            />
            <ProviderCard
              name="Dr. Emily Rodriguez"
              title="DO, FAOA"
              specialty="Hand & Upper Extremity"
              slug="dr-emily-rodriguez"
            />
            <ProviderCard
              name="Dr. David Kim"
              title="MD, FAAOS"
              specialty="Pediatric Orthopedics"
              slug="dr-david-kim"
            />
            <ProviderCard
              name="Dr. Jennifer Lee"
              title="MD"
              specialty="Sports Medicine & Arthroscopy"
              slug="dr-jennifer-lee"
            />
            <ProviderCard
              name="Dr. Robert Thompson"
              title="DO"
              specialty="Trauma & Reconstructive Surgery"
              slug="dr-robert-thompson"
            />
          </div>
        </div>
      </section>

      {/* Why Choose Our Team */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              title="Why Choose Our Team"
              subtitle="Excellence in Care"
              centered
            />

            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="surface-card p-6">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center text-primary-700">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <h3 className="ml-4 text-lg font-semibold text-neutral-900">
                    Board Certified
                  </h3>
                </div>
                <p className="text-neutral-600">
                  All our physicians are board-certified by the American Board of Orthopaedic Surgery, 
                  ensuring the highest standards of care and expertise.
                </p>
              </div>

              <div className="surface-card p-6">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center text-primary-700">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 className="ml-4 text-lg font-semibold text-neutral-900">
                    Continuing Education
                  </h3>
                </div>
                <p className="text-neutral-600">
                  Our providers regularly attend conferences and training to stay current with 
                  the latest advances in orthopedic medicine and surgical techniques.
                </p>
              </div>

              <div className="surface-card p-6">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center text-primary-700">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="ml-4 text-lg font-semibold text-neutral-900">
                    Academic Excellence
                  </h3>
                </div>
                <p className="text-neutral-600">
                  Our team includes faculty members and published researchers who contribute 
                  to advancing the field of orthopedic medicine.
                </p>
              </div>

              <div className="surface-card p-6">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center text-primary-700">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <h3 className="ml-4 text-lg font-semibold text-neutral-900">
                    Patient-Centered
                  </h3>
                </div>
                <p className="text-neutral-600">
                  We take the time to listen, explain options clearly, and involve you in 
                  every decision about your care.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Ready to Meet Your Provider?"
        description="Schedule a consultation with one of our expert orthopedic specialists today."
        primaryCTA={{
          text: 'Schedule Appointment',
          href: '/appointments',
        }}
        secondaryCTA={{
          text: 'View Services',
          href: '/services',
        }}
      />
    </>
  )
}
