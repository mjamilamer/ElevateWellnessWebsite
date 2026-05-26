import type { Metadata } from 'next'
import Link from 'next/link'
import { Hero } from '@/components/Hero'
import { SectionHeader } from '@/components/SectionHeader'
import { ServicesGrid } from '@/components/ServicesGrid'
import { ProviderCard } from '@/components/ProviderCard'
import { CTASection } from '@/components/CTASection'
import { siteConfig } from '@/lib/config'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata('/', {
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: [
    'Elevate Wellness & Health',
    'wellness & health',
    'wellness clinic',
    'healthcare',
    'appointments',
  ],
})

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <Hero
        subtitle="Wellness & Health"
        title="Where wellness, recovery, and modern medicine come together"
        description="Advanced specialty care and wellness services designed to help you recover, restore, and feel your best."
        highlights={[
          'Personalized treatment plans tailored to your lifestyle and wellness goals',
          'Integrated specialty and wellness services under one roof',
          'Advanced therapies focused on recovery, performance, and prevention',
          'Compassionate providers committed to long-term health',
          'Convenient access to diagnostics, rehabilitation, and wellness care',
        ]}
        primaryCTA={{
          text: 'Schedule Visit',
          href: '/appointments',
        }}
        secondaryCTA={{
          text: 'Explore Services',
          href: '/services',
        }}
      />

      {/* Trust Signals */}
      <section className="bg-white pb-10">
        <div className="container-custom">
          <div className="surface-card grid grid-cols-1 divide-y divide-primary-200/60 p-2 text-center md:grid-cols-3 md:divide-x md:divide-y-0 md:p-3">
            <div className="px-4 py-6 md:px-6 md:py-8">
              <p className="font-display text-3xl font-semibold tracking-tight text-primary-700 sm:text-4xl">Board Certified</p>
              <span aria-hidden="true" className="mx-auto mt-3 block h-px w-10 bg-primary-500/70" />
              <p className="mt-3 text-sm leading-relaxed text-neutral-600">Specialty-trained physicians across orthopedics, gastroenterology, and internal medicine</p>
            </div>
            <div className="px-4 py-6 md:px-6 md:py-8">
              <p className="font-display text-3xl font-semibold tracking-tight text-primary-700 sm:text-4xl">Same-Week Access</p>
              <span aria-hidden="true" className="mx-auto mt-3 block h-px w-10 bg-primary-500/70" />
              <p className="mt-3 text-sm leading-relaxed text-neutral-600">Convenient appointments designed around your schedule</p>
            </div>
            <div className="px-4 py-6 md:px-6 md:py-8">
              <p className="font-display text-3xl font-semibold tracking-tight text-primary-700 sm:text-4xl">Personalized Care</p>
              <span aria-hidden="true" className="mx-auto mt-3 block h-px w-10 bg-primary-500/70" />
              <p className="mt-3 text-sm leading-relaxed text-neutral-600">Thoughtfully tailored treatment plans focused on long-term wellness</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Highlights */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeader
            subtitle="Specialty Programs"
            title="Comprehensive care for wellness, recovery, and long-term health"
            description="Integrated specialty and wellness services designed to support how you feel, move, and live every day."
            centered
          />

          <div className="mt-12">
            <ServicesGrid />
          </div>

          <div className="mt-12 text-center">
            <Link href="/services" className="btn-secondary">
              View Clinical Programs
            </Link>
          </div>
        </div>
      </section>

      {/* Conditions We Treat */}
      <section className="bg-neutral-50 pb-8">
        <div className="container-custom">
          <div className="surface-muted p-6 md:p-8">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary-700">Common Conditions</p>
                <h3 className="mt-2 text-2xl font-bold tracking-tight text-neutral-900">Care tailored to the diagnoses we see every day</h3>
              </div>
              <Link href="/services" className="btn-text">
                See all conditions and treatments
              </Link>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              {[
                'Joint pain and arthritis',
                'Hip, knee & shoulder problems',
                'Major fractures',
                'Hand & wrist conditions',
                'Spine & back concerns',
                'Sports injuries',
                'Tendon & ligament injuries',
                'Post-traumatic conditions',
              ].map((condition) => (
                <span key={condition} className="rounded-full border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700">
                  {condition}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Treatment Approach */}
      <section className="section-padding section-band">
        <div className="container-custom">
          <SectionHeader
            subtitle="Comprehensive Care"
            title="Our Treatment Approach"
            description="From first evaluation through ongoing follow-up, our integrated services are designed around the way you live."
            centered
          />
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: 1,
                title: 'Complete Health Evaluation',
                description: 'Full medical review to understand symptoms, history, lifestyle, and wellness goals.',
              },
              {
                step: 2,
                title: 'Personalized Care Plan',
                description: 'A treatment plan designed around each patient’s needs — medical, wellness, therapy, or specialty care.',
              },
              {
                step: 3,
                title: 'Integrated Services',
                description: 'Access to internal medicine, GI, orthopedics, physical therapy, labs, acupuncture, peptides, and IV therapy in one place.',
              },
              {
                step: 4,
                title: 'Ongoing Wellness Support',
                description: 'We focus on prevention, follow-up care, recovery, and helping patients feel healthier long-term.',
              },
            ].map(({ step, title, description }) => (
              <div key={step} className="surface-card border-t-2 border-t-primary-600 p-6">
                <p className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary-100 to-primary-200 font-display text-base font-semibold text-primary-700">
                  {step}
                </p>
                <h3 className="font-display text-xl font-semibold text-neutral-900">{title}</h3>
                <p className="mt-3 text-neutral-600">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Provider Spotlight */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeader
            subtitle="Clinical Team"
            title="Led by board-certified specialists"
            description="Two physicians anchor our integrated practice — orthopedic surgery and gastroenterology/internal medicine — working alongside our wellness and therapy team."
            centered
          />

          <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-10 md:grid-cols-2">
            {/* Dr. Kamil M. Amer */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-[minmax(0,12rem)_1fr]">
              <ProviderCard
                name="Dr. Kamil M. Amer"
                title="MD — Orthopedic Surgery"
                specialty="Hand & Upper Extremity"
                slug="dr-kamil-amer"
              />
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-700">Orthopedic Surgery</p>
                  <h3 className="mt-1 text-xl font-bold tracking-tight text-neutral-900">
                    Dr. Kamil M. Amer, MD
                  </h3>
                </div>
                <p className="text-sm text-neutral-600">
                  Board-certified orthopedic surgeon, fellowship-trained in Hand &amp; Upper
                  Extremity at Thomas Jefferson University Hospital. MD from Lewis Katz School of
                  Medicine, residency at Rutgers New Jersey Medical School.
                </p>
                <ul className="space-y-1.5 text-xs text-neutral-700">
                  <li className="flex items-start gap-2">
                    <span aria-hidden="true" className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary-600" />
                    Board certified — American Board of Orthopaedic Surgery
                  </li>
                  <li className="flex items-start gap-2">
                    <span aria-hidden="true" className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary-600" />
                    Fellowship-trained, Hand &amp; Upper Extremity
                  </li>
                  <li className="flex items-start gap-2">
                    <span aria-hidden="true" className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary-600" />
                    Saint Michael&apos;s &amp; Atlantic Health affiliations
                  </li>
                </ul>
                <div className="pt-1">
                  <Link href="/providers/dr-kamil-amer" className="text-sm font-semibold text-primary-700 hover:underline">
                    Read full bio →
                  </Link>
                </div>
              </div>
            </div>

            {/* Dr. Kamal M. Amer */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-[minmax(0,12rem)_1fr]">
              <ProviderCard
                name="Dr. Kamal M. Amer"
                title="MD — Gastroenterology"
                specialty="Internal Medicine · GI"
                slug="dr-kamal-amer"
              />
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-700">Gastroenterology &amp; Internal Medicine</p>
                  <h3 className="mt-1 text-xl font-bold tracking-tight text-neutral-900">
                    Dr. Kamal M. Amer, MD
                  </h3>
                </div>
                <p className="text-sm text-neutral-600">
                  Board-certified in Gastroenterology, Internal Medicine, and Obesity &amp;
                  Nutrition. Fellowship in GI &amp; Hepatology at Rutgers New Jersey Medical
                  School; Internal Medicine residency at Thomas Jefferson University Hospital.
                </p>
                <ul className="space-y-1.5 text-xs text-neutral-700">
                  <li className="flex items-start gap-2">
                    <span aria-hidden="true" className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary-600" />
                    Board certified — Gastroenterology, Internal Medicine
                  </li>
                  <li className="flex items-start gap-2">
                    <span aria-hidden="true" className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary-600" />
                    Fellowship-trained, GI &amp; Hepatology
                  </li>
                  <li className="flex items-start gap-2">
                    <span aria-hidden="true" className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary-600" />
                    Hackensack Meridian &amp; St. Joseph&apos;s affiliations
                  </li>
                  <li className="flex items-start gap-2">
                    <span aria-hidden="true" className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary-600" />
                    Languages: English, Spanish, Arabic
                  </li>
                </ul>
                <div className="pt-1">
                  <Link href="/providers/dr-kamal-amer" className="text-sm font-semibold text-primary-700 hover:underline">
                    Read full bio →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link href="/providers" className="btn-secondary">
              Meet All Providers
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <SectionHeader
            subtitle="Patient Experience"
            title="What patients can expect"
            description="High clinical standards paired with clear communication at every step."
            centered
          />

          <div className="mx-auto mt-12 max-w-3xl">
            <div className="surface-card border-t-2 border-t-primary-600 p-6 md:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary-700">
                Why patients choose us
              </p>
              <ul className="mt-5 grid grid-cols-1 gap-3 text-neutral-700 sm:grid-cols-2">
                {[
                  'Clear expectations from day one',
                  'Efficient scheduling and follow-up communication',
                  'Evidence-based treatment recommendations',
                  'Recovery plans designed around real life',
                  'Care that connects specialty medicine and wellness',
                  'Compassionate, multilingual team',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span aria-hidden="true" className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 ring-2 ring-primary-200/50" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Insurance Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <SectionHeader
              subtitle="Insurance"
              title="Broad plan acceptance for simpler access to care"
              description="Our team works with major insurance providers and can help verify your coverage before your visit."
              centered
            />

            <div className="mt-8 grid grid-cols-2 gap-4 text-center md:grid-cols-4">
              {['Aetna', 'Blue Cross Blue Shield', 'Cigna', 'UnitedHealthcare', 'Medicare', 'Medicaid', 'Humana', 'Most major plans'].map((provider) => (
                <div key={provider} className="surface-muted p-4">
                  <p className="text-sm font-medium text-neutral-700">{provider}</p>
                </div>
              ))}
            </div>

            <p className="mt-8 text-neutral-600">
              Not sure if your insurance is accepted?{' '}
              <Link href="/new-patients" className="text-primary-700 font-semibold hover:underline">
                Review new patient information
              </Link>{' '}
              before scheduling.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Ready to begin your recovery plan?"
        description="Schedule online in minutes and get a clear next step from our clinical team."
        primaryCTA={{
          text: 'Schedule Appointment',
          href: '/appointments',
        }}
        secondaryCTA={{
          text: 'View Locations',
          href: '/locations',
        }}
      />
    </>
  )
}
