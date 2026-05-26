import Link from 'next/link'
import type { Metadata } from 'next'
import { CTASection } from '@/components/CTASection'
import { StructuredData } from '@/components/StructuredData'
import { pageMetadata } from '@/lib/seo'
import { generateBreadcrumbSchema, generatePhysicianSchema } from '@/lib/structured-data'
import { siteConfig } from '@/lib/config'

export const metadata: Metadata = pageMetadata('/providers/dr-kamal-amer', {
  title: 'Dr. Kamal M. Amer, MD — Gastroenterology & Internal Medicine',
  description:
    'Dr. Kamal M. Amer is board-certified in Gastroenterology, Internal Medicine, and Obesity & Nutrition, caring for adult patients with a focus on digestive health and metabolic wellness.',
})

export default function DrKamalAmerPage() {
  const base = siteConfig.siteUrl.replace(/\/$/, '')
  const jsonLd = [
    generatePhysicianSchema({
      name: 'Dr. Kamal M. Amer, MD',
      slug: 'dr-kamal-amer',
      title: 'MD',
      specialty: 'Gastroenterology — Internal Medicine',
      bio: 'Board-certified gastroenterologist and internal medicine physician with fellowship training in Gastroenterology & Hepatology at Rutgers New Jersey Medical School.',
    }),
    generateBreadcrumbSchema([
      { name: 'Home', url: `${base}/` },
      { name: 'Providers', url: `${base}/providers` },
      { name: 'Dr. Kamal M. Amer', url: `${base}/providers/dr-kamal-amer` },
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
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-700">Clinical Team</p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl md:text-5xl">
                Dr. Kamal M. Amer, MD
              </h1>
              <p className="mt-3 text-sm font-semibold uppercase tracking-wide text-primary-700">
                Gastroenterology · Internal Medicine
              </p>
              <p className="mt-5 max-w-2xl text-lg text-neutral-700">
                Board-certified gastroenterologist and internal medicine physician with a clinical
                focus on digestive health, metabolic wellness, and nutrition-based interventions.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link href="/appointments" className="btn-primary">
                  Schedule with Dr. Amer
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
                <h2 className="text-2xl font-bold tracking-tight text-neutral-900">About Dr. Amer</h2>
                <p className="mt-4">
                  Dr. Kamal M. Amer brings a well-rounded approach to adult care through his
                  combined training in Internal Medicine and Gastroenterology. His background
                  allows him to see the whole patient — not just a single symptom — and connect
                  overall medical health with digestive wellness in one coordinated plan.
                </p>
                <p className="mt-4">
                  He completed his fellowship in Gastroenterology and Hepatology at Rutgers New
                  Jersey Medical School and his Internal Medicine residency at Thomas Jefferson
                  University Hospital. Dr. Amer is board-certified in Gastroenterology, Internal
                  Medicine, and Obesity & Nutrition.
                </p>
                <p className="mt-4">
                  As an Internal Medicine provider, he focuses on adult preventive care, annual
                  wellness visits, chronic condition management, and concerns such as high blood
                  pressure, diabetes, cholesterol, fatigue, and overall wellness. As a
                  Gastroenterology specialist, he evaluates and treats acid reflux, abdominal pain,
                  bloating, constipation, diarrhea, liver concerns, stomach issues, and intestinal
                  disorders. Patients can expect thoughtful, detailed, and compassionate care
                  focused on finding the cause of symptoms.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold tracking-tight text-neutral-900">Clinical Interests</h2>
                <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {[
                    'Gastroenterology consultation',
                    'Colonoscopy and screening',
                    'Acid reflux, GERD, and abdominal pain',
                    'Liver and metabolic health',
                    'Adult preventive care',
                    'Chronic condition management',
                    'Weight loss and nutrition support',
                    'Hemorrhoid evaluation and care',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-neutral-700">
                      <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold tracking-tight text-neutral-900">Languages</h2>
                <p className="mt-4">
                  Dr. Amer cares for patients in English, Spanish, and Arabic.
                </p>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="space-y-6">
              <div className="surface-card p-6">
                <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-primary-700">
                  Education &amp; Training
                </h3>
                <dl className="mt-4 space-y-4 text-sm">
                  <div>
                    <dt className="font-semibold text-neutral-900">Fellowship</dt>
                    <dd className="mt-0.5 text-neutral-600">
                      Gastroenterology &amp; Hepatology,
                      <br />
                      Rutgers New Jersey Medical School
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-neutral-900">Residency</dt>
                    <dd className="mt-0.5 text-neutral-600">
                      Internal Medicine,
                      <br />
                      Thomas Jefferson University Hospital
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="surface-card p-6">
                <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-primary-700">
                  Board Certification
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-neutral-700">
                  <li>Gastroenterology</li>
                  <li>Internal Medicine</li>
                  <li>Obesity &amp; Nutrition</li>
                </ul>
              </div>

              <div className="surface-card p-6">
                <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-primary-700">
                  Hospital Affiliations
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-neutral-700">
                  <li>Hackensack Meridian Jersey Shore University Medical Center</li>
                  <li>Hackensack Meridian Mountainside Medical Center</li>
                  <li>St. Joseph&apos;s University Medical Center</li>
                  <li>Bergen New Bridge Medical Center</li>
                </ul>
              </div>

              <div className="surface-card p-6">
                <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-primary-700">
                  Practice Locations
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-neutral-700">
                  <li>North Bergen, NJ — Elevate Wellness &amp; Health</li>
                  <li>Paterson, NJ</li>
                  <li>Woodland Park, NJ</li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to schedule with Dr. Amer?"
        description="Book an appointment online or contact the office for new-patient scheduling and insurance verification."
        primaryCTA={{ text: 'Schedule Appointment', href: '/appointments' }}
        secondaryCTA={{ text: 'Contact Office', href: '/contact' }}
      />
    </>
  )
}
