import Link from 'next/link'
import { Hero } from '@/components/Hero'
import { SectionHeader } from '@/components/SectionHeader'
import { ProviderCard } from '@/components/ProviderCard'
import { CTASection } from '@/components/CTASection'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata('/providers', {
  title: 'Our Providers',
  description:
    'Meet the Elevate Wellness & Health care team — board-certified physicians spanning orthopedic surgery, internal medicine, and gastroenterology.',
})

export default function ProvidersPage() {
  return (
    <>
      <Hero
        subtitle="Specialist Physicians"
        title="Meet Our Expert Team"
        description="Board-certified specialists across orthopedics, internal medicine, and gastroenterology — here to support your wellness & health goals."
        highlights={[
          'Subspecialty-focused physicians across clinical and wellness care',
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

          <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-12 md:grid-cols-2">
            {/* Dr. Kamil M. Amer */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-[minmax(0,14rem)_1fr]">
              <ProviderCard
                name="Dr. Kamil M. Amer"
                title="MD — Orthopedic Surgery"
                specialty="Hand & Upper Extremity"
                slug="dr-kamil-amer"
              />
              <div>
                <h3 className="text-xl font-bold tracking-tight text-neutral-900">
                  Dr. Kamil M. Amer, MD
                </h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-primary-700">
                  Orthopedic Surgery · Hand &amp; Upper Extremity
                </p>
                <p className="mt-4 text-sm text-neutral-600">
                  Board-certified orthopedic surgeon and fellowship-trained hand and upper-extremity
                  specialist. Dr. Amer earned his MD from the Lewis Katz School of Medicine at
                  Temple University, completed his orthopedic surgery residency at Rutgers New
                  Jersey Medical School, and a hand and upper extremity fellowship at Thomas
                  Jefferson University Hospital.
                </p>
                <p className="mt-3 text-sm text-neutral-600">
                  Hospital affiliations include Saint Michael&apos;s Medical Center (Newark),
                  Chilton Medical Center / Atlantic Health (Clifton), Saint Clare&apos;s Denville
                  Hospital, and St. Mary&apos;s General Hospital.
                </p>
                <div className="mt-5">
                  <Link href="/providers/dr-kamil-amer" className="btn-secondary">
                    Read Full Bio
                  </Link>
                </div>
              </div>
            </div>

            {/* Dr. Kamal M. Amer */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-[minmax(0,14rem)_1fr]">
              <ProviderCard
                name="Dr. Kamal M. Amer"
                title="MD — Gastroenterology"
                specialty="Internal Medicine · GI"
                slug="dr-kamal-amer"
              />
              <div>
                <h3 className="text-xl font-bold tracking-tight text-neutral-900">
                  Dr. Kamal M. Amer, MD
                </h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-primary-700">
                  Gastroenterology · Internal Medicine
                </p>
                <p className="mt-4 text-sm text-neutral-600">
                  Board-certified in Gastroenterology, Internal Medicine, and Obesity &amp;
                  Nutrition. Dr. Amer completed his fellowship in Gastroenterology and Hepatology
                  at Rutgers New Jersey Medical School and his Internal Medicine residency at
                  Thomas Jefferson University Hospital.
                </p>
                <p className="mt-3 text-sm text-neutral-600">
                  Hospital affiliations include Hackensack Meridian Jersey Shore, Hackensack
                  Meridian Mountainside, St. Joseph&apos;s University Medical Center, and Bergen
                  New Bridge Medical Center. He cares for patients in English, Spanish, and Arabic.
                </p>
                <div className="mt-5">
                  <Link href="/providers/dr-kamal-amer" className="btn-secondary">
                    Read Full Bio
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Our Team */}
      <section className="section-padding section-band">
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
                  Our physicians are board-certified by their respective specialty boards —
                  Orthopaedic Surgery, Gastroenterology, and Internal Medicine — ensuring high
                  clinical standards across every service.
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
                  Our providers regularly attend conferences and training to stay current with the
                  latest advances in their fields — from musculoskeletal surgery to gastroenterology
                  and internal medicine.
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
                    Academic Background
                  </h3>
                </div>
                <p className="text-neutral-600">
                  Our team brings academic training and research experience across orthopedics,
                  digestive health, and adult medicine to inform thoughtful patient care.
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
                  We take the time to listen, explain options clearly, and involve you in every
                  decision about your care.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Ready to Meet Your Provider?"
        description="Schedule a consultation with an Elevate Wellness & Health specialist today."
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
