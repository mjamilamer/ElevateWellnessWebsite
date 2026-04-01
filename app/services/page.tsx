import { Metadata } from 'next'
import { Hero } from '@/components/Hero'
import { SectionHeader } from '@/components/SectionHeader'
import { ServiceCard } from '@/components/ServiceCard'
import { CTASection } from '@/components/CTASection'

export const metadata: Metadata = {
  title: 'Our Services',
  description: 'Comprehensive orthopedic services including joint replacement, sports medicine, spine care, and more.',
}

export default function ServicesPage() {
  return (
    <>
      <Hero
        subtitle="Clinical Programs"
        title="Comprehensive Orthopedic Services"
        description="From diagnosis to recovery, we provide expert treatment for all musculoskeletal conditions."
        highlights={[
          'Non-operative and surgical options based on evidence and goals',
          'Recovery-first planning with clear milestones',
          'Specialists aligned to complex orthopedic conditions',
        ]}
        primaryCTA={{
          text: 'Schedule Consultation',
          href: '/appointments',
        }}
      />

      {/* Services Grid */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeader
            title="Our Specialties"
            subtitle="Expert Care"
            description="We offer a full range of orthopedic services using the latest techniques and technology."
            centered
          />

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <ServiceCard
              title="Joint Replacement"
              description="Advanced hip, knee, and shoulder replacement surgery with minimally invasive techniques for faster recovery."
              href="/services/joint-replacement"
              icon={
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              }
            />

            <ServiceCard
              title="Sports Medicine"
              description="Specialized care for athletic injuries including ACL tears, rotator cuff injuries, and more."
              href="/services/sports-medicine"
              icon={
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            />

            <ServiceCard
              title="Spine Care"
              description="Comprehensive treatment for back and neck pain, including surgery and non-surgical options."
              href="/services/spine-care"
              icon={
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              }
            />

            <ServiceCard
              title="Hand & Wrist"
              description="Expert treatment for carpal tunnel, arthritis, fractures, and other hand conditions."
              href="/services/hand-wrist"
              icon={
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                </svg>
              }
            />

            <ServiceCard
              title="Foot & Ankle"
              description="Treatment for bunions, plantar fasciitis, Achilles injuries, and ankle instability."
              href="/services/foot-ankle"
              icon={
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              }
            />

            <ServiceCard
              title="Arthroscopic Surgery"
              description="Minimally invasive procedures for joint problems with smaller incisions and faster recovery."
              href="/services/arthroscopic-surgery"
              icon={
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              }
            />

            <ServiceCard
              title="Physical Therapy"
              description="Personalized rehabilitation programs to restore strength, flexibility, and function."
              href="/services/physical-therapy"
              icon={
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              }
            />

            <ServiceCard
              title="Pain Management"
              description="Comprehensive pain relief solutions including injections, medications, and therapy."
              href="/services/pain-management"
              icon={
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              }
            />

            <ServiceCard
              title="Fracture Care"
              description="Emergency and elective treatment for broken bones and traumatic injuries."
              href="/services/fracture-care"
              icon={
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              }
            />
          </div>
        </div>
      </section>

      {/* Treatment Approach */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              title="Our Treatment Approach"
              subtitle="Comprehensive Care"
              centered
            />

            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="surface-card p-6">
                <p className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700">1</p>
                <h3 className="text-xl font-bold text-neutral-900 mb-2">
                  Comprehensive Evaluation
                </h3>
                <p className="text-neutral-600">
                  We begin with a full assessment and diagnostic review to understand the root cause and define the right care pathway.
                </p>
              </div>

              <div className="surface-card p-6">
                <p className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700">2</p>
                <h3 className="text-xl font-bold text-neutral-900 mb-2">
                  Personalized Treatment Plan
                </h3>
                <p className="text-neutral-600">
                  Your plan is tailored to symptoms, lifestyle, and outcomes goals, with conservative options explored first.
                </p>
              </div>

              <div className="surface-card p-6">
                <p className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700">3</p>
                <h3 className="text-xl font-bold text-neutral-900 mb-2">
                  Advanced Treatment
                </h3>
                <p className="text-neutral-600">
                  We apply modern non-operative and surgical techniques selected for clinical fit and recovery quality.
                </p>
              </div>

              <div className="surface-card p-6">
                <p className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700">4</p>
                <h3 className="text-xl font-bold text-neutral-900 mb-2">
                  Recovery & Follow-up
                </h3>
                <p className="text-neutral-600">
                  Ongoing checkpoints and follow-up visits keep progress measurable and treatment aligned with your goals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Ready to Start Your Treatment?"
        description="Schedule a consultation to discuss your condition and explore your treatment options."
        primaryCTA={{
          text: 'Schedule Consultation',
          href: '/appointments',
        }}
        secondaryCTA={{
          text: 'Contact Us',
          href: '/contact',
        }}
      />
    </>
  )
}
