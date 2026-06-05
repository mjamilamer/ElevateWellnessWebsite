import Link from 'next/link'
import type { Metadata } from 'next'
import { CTASection } from '@/components/CTASection'
import { StructuredData } from '@/components/StructuredData'
import { pageMetadata } from '@/lib/seo'
import { generateBreadcrumbSchema, generatePhysicianSchema } from '@/lib/structured-data'
import { siteConfig } from '@/lib/config'

export const metadata: Metadata = pageMetadata('/providers/dr-kamil-amer', {
  title: 'Dr. Kamil M. Amer, MD — Orthopedic Surgery',
  description:
    'Dr. Kamil M. Amer is a board-certified orthopedic surgeon and fellowship-trained hand and upper extremity specialist serving patients across northern New Jersey.',
})

export default function DrKamilAmerPage() {
  const base = siteConfig.siteUrl.replace(/\/$/, '')
  const jsonLd = [
    generatePhysicianSchema({
      name: 'Dr. Kamil M. Amer, MD',
      slug: 'dr-kamil-amer',
      title: 'MD',
      specialty: 'Orthopedic Surgery — Hand & Upper Extremity',
      bio: 'Board-certified orthopedic surgeon specializing in musculoskeletal care with advanced expertise in hand and upper extremity surgery — treating fractures, sports injuries, arthritis, carpal tunnel syndrome, and hand and wrist disorders.',
    }),
    generateBreadcrumbSchema([
      { name: 'Home', url: `${base}/` },
      { name: 'Providers', url: `${base}/providers` },
      { name: 'Dr. Kamil M. Amer', url: `${base}/providers/dr-kamil-amer` },
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
                Dr. Kamil M. Amer, MD
              </h1>
              <p className="mt-3 text-sm font-semibold uppercase tracking-wide text-primary-700">
                Orthopedic Surgery · Hand &amp; Upper Extremity
              </p>
              <p className="mt-5 max-w-2xl text-lg text-neutral-700">
                Board-certified orthopedic surgeon specializing in musculoskeletal care, with advanced
                expertise in hand and upper extremity surgery.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link href="/appointments" className="btn-primary">
                  Schedule Appointment
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
                  Dr. Kamil M. Amer is a board-certified orthopedic surgeon specializing in the diagnosis and
                  treatment of musculoskeletal conditions, with advanced expertise in hand and upper extremity
                  surgery. He is dedicated to helping patients restore function, reduce pain, and return to
                  their daily activities through both non-surgical and surgical treatment options.
                </p>
                <p className="mt-4">
                  Dr. Amer earned his medical degree from the Lewis Katz School of Medicine at Temple
                  University and has extensive training in orthopedic surgery and hand surgery. He treats a wide
                  range of conditions, including fractures, sports injuries, arthritis, tendon and ligament
                  injuries, carpal tunnel syndrome, hand and wrist disorders, joint pain, and other orthopedic
                  conditions affecting the upper and lower extremities.
                </p>
                <p className="mt-4">
                  Known for his patient-centered approach, Dr. Amer works closely with each patient to develop
                  individualized treatment plans focused on achieving the best possible outcomes. His goal is to
                  provide comprehensive orthopedic care utilizing the latest evidence-based techniques and
                  minimally invasive treatment options whenever appropriate.
                </p>
                <p className="mt-4">
                  At Elevate Wellness &amp; Health, Dr. Amer is committed to delivering high-quality orthopedic
                  care to help patients regain mobility, improve function, and enhance their quality of life.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold tracking-tight text-neutral-900">Conditions Treated</h2>
                <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {[
                    'Fractures and trauma care',
                    'Sports injuries',
                    'Arthritis and joint pain',
                    'Tendon and ligament injuries',
                    'Carpal tunnel syndrome',
                    'Hand and wrist disorders',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-neutral-700">
                      <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold tracking-tight text-neutral-900">Research &amp; Scholarship</h2>
                <p className="mt-4">
                  Dr. Amer has contributed to the peer-reviewed orthopedic literature on topics including
                  tranexamic acid use in orthopedic surgery, radial head arthroplasty, intertrochanteric fracture
                  management, posterior interosseous neuropathy, and the development of mobile-based surgical
                  simulation tools for procedures such as carpal tunnel release.
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
                      Hand &amp; Upper Extremity Surgery,
                      <br />
                      Thomas Jefferson University Hospital
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-neutral-900">Residency</dt>
                    <dd className="mt-0.5 text-neutral-600">
                      Orthopedic Surgery,
                      <br />
                      Rutgers New Jersey Medical School
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-neutral-900">Medical School</dt>
                    <dd className="mt-0.5 text-neutral-600">
                      Doctor of Medicine,
                      <br />
                      Lewis Katz School of Medicine at Temple University
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="surface-card p-6">
                <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-primary-700">
                  Board Certification
                </h3>
                <p className="mt-3 text-sm text-neutral-700">
                  American Board of Orthopaedic Surgery (ABOS)
                </p>
              </div>

              <div className="surface-card p-6">
                <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-primary-700">
                  Hospital Affiliations
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-neutral-700">
                  <li>Saint Michael&apos;s Medical Center — Newark, NJ</li>
                  <li>Chilton Medical Center (Atlantic Health) — Clifton, NJ</li>
                  <li>Saint Clare&apos;s Denville Hospital</li>
                  <li>St. Mary&apos;s General Hospital</li>
                </ul>
              </div>

              <div className="surface-card p-6">
                <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-primary-700">
                  Practice Locations
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-neutral-700">
                  <li>Clifton, NJ</li>
                  <li>Paramus, NJ</li>
                  <li>Newark, NJ</li>
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
