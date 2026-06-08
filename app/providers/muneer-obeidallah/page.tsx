import Link from 'next/link'
import type { Metadata } from 'next'
import { CTASection } from '@/components/CTASection'
import { StructuredData } from '@/components/StructuredData'
import { pageMetadata } from '@/lib/seo'
import { generateBreadcrumbSchema } from '@/lib/structured-data'
import { siteConfig } from '@/lib/config'

export const metadata: Metadata = pageMetadata('/providers/muneer-obeidallah', {
  title: 'Muneer Obeidallah, PT — Physical Therapist',
  description:
    'Muneer Obeidallah is a licensed Physical Therapist at Elevate Wellness & Health, helping patients restore mobility, reduce pain, and recover through personalized rehabilitation.',
})

const AREAS_OF_FOCUS = [
  'Orthopedic Rehabilitation',
  'Post-Surgical Recovery',
  'Sports Injury Rehabilitation',
  'Balance and Fall Prevention',
  'Chronic Pain Management',
  'Strength and Mobility Training',
  'Functional Movement Restoration',
  'Personalized Exercise Programs',
]

export default function MuneerObeidallahPage() {
  const base = siteConfig.siteUrl.replace(/\/$/, '')
  const jsonLd = [
    generateBreadcrumbSchema([
      { name: 'Home', url: `${base}/` },
      { name: 'Providers', url: `${base}/providers` },
      { name: 'Muneer Obeidallah, PT', url: `${base}/providers/muneer-obeidallah` },
    ]),
  ]

  return (
    <>
      <StructuredData data={jsonLd} />
      {/* Header strip */}
      <section className="bg-gradient-to-br from-primary-50/90 via-white to-secondary-50/80">
        <div className="container-custom py-12 md:py-16">
          <Link href="/providers" className="text-sm font-semibold text-primary-700 hover:underline">
            ← All Providers
          </Link>
          <div className="mt-6 grid grid-cols-1 gap-10 md:grid-cols-[minmax(0,18rem)_1fr] md:items-end">
            <div className="aspect-[3/4] overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100">
              <div className="flex h-full items-center justify-center text-neutral-400">
                <svg className="h-24 w-24" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-700">Rehabilitation Team</p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl md:text-5xl">
                Muneer Obeidallah, PT
              </h1>
              <p className="mt-3 text-sm font-semibold uppercase tracking-wide text-primary-700">
                Physical Therapist
              </p>
              <p className="mt-5 max-w-2xl text-lg text-neutral-700">
                Restore Movement. Relieve Pain. Reclaim Your Life.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link href="/appointments" className="btn-primary">
                  Schedule Physical Therapy
                </Link>
                <Link href="/contact" className="btn-secondary">
                  Contact Office
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bio + Sidebar */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_minmax(0,20rem)] lg:gap-14">
            <article className="space-y-6 text-neutral-700">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-neutral-900">About Muneer</h2>
                <p className="mt-4">
                  Muneer Obeidallah is a dedicated Physical Therapist committed to helping patients
                  restore mobility, reduce pain, and improve their overall quality of life. He
                  specializes in evaluating and treating a wide range of musculoskeletal and
                  orthopedic conditions, including sports injuries, post-surgical rehabilitation,
                  chronic pain, balance disorders, and mobility limitations.
                </p>
                <p className="mt-4">
                  Muneer believes in a patient-centered approach, creating individualized treatment
                  plans tailored to each patient’s specific needs and goals. Through a combination
                  of therapeutic exercise, manual therapy, functional training, and education, he
                  helps patients achieve lasting recovery and return to their daily activities with
                  confidence.
                </p>
                <p className="mt-4">
                  At Elevate Wellness &amp; Health, Muneer works closely with physicians and
                  healthcare providers to deliver comprehensive, coordinated care that promotes
                  healing, strength, and long-term wellness. His focus is on empowering patients to
                  take an active role in their recovery while providing the guidance and support
                  needed for successful outcomes.
                </p>
                <p className="mt-4">
                  Muneer is dedicated to helping every patient move better, feel stronger, and live
                  healthier.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold tracking-tight text-neutral-900">Areas of Focus</h2>
                <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {AREAS_OF_FOCUS.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-neutral-700">
                      <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="space-y-6">
              <div className="surface-card p-6">
                <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-primary-700">
                  Specialty
                </h3>
                <p className="mt-3 text-sm text-neutral-700">
                  Physical Therapy &amp; Rehabilitation
                </p>
              </div>

              <div className="surface-card border-t-2 border-t-primary-600 p-6">
                <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-primary-700">
                  Approach
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-neutral-700">
                  <li>Therapeutic exercise</li>
                  <li>Manual therapy</li>
                  <li>Functional training</li>
                  <li>Patient education</li>
                </ul>
              </div>

              <div className="surface-card p-6">
                <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-primary-700">
                  Practice Location
                </h3>
                <p className="mt-3 text-sm text-neutral-700">
                  North Bergen, NJ — Elevate Wellness &amp; Health
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to start physical therapy?"
        description="Book an appointment online or contact the office to begin your personalized rehabilitation plan."
        primaryCTA={{ text: 'Schedule Appointment', href: '/appointments' }}
        secondaryCTA={{ text: 'Contact Office', href: '/contact' }}
      />
    </>
  )
}
