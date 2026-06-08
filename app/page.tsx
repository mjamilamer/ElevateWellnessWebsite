import type { Metadata } from 'next'
import Link from 'next/link'
import { Hero } from '@/components/Hero'
import { SectionHeader } from '@/components/SectionHeader'
import { ServicesCarousel } from '@/components/ServicesCarousel'
import { ProviderCard } from '@/components/ProviderCard'
import { FocusPills } from '@/components/FocusPills'
import { CTASection } from '@/components/CTASection'
import { Reveal } from '@/components/Reveal'
import { providerFocus } from '@/lib/provider-focus'
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
        image="/images/photos/hero-wellness.jpg"
        imageAlt="Sunlit treatment room reflecting the Elevate Wellness & Health environment"
        imageCaption="Our practice in North Bergen, NJ"
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
      <section className="bg-white pb-12 -mt-6 sm:-mt-10 relative z-10">
        <div className="container-custom">
          <div className="surface-card grid grid-cols-2 gap-y-6 divide-y-0 p-6 text-center md:grid-cols-4 md:gap-0 md:divide-x md:divide-primary-200/50 md:p-4">
            {[
              { headline: '4', subheadline: 'Board Certifications', detail: 'Orthopedic Surgery · Internal Medicine · Gastroenterology · Obesity & Nutrition' },
              { headline: '9', subheadline: 'Integrated Services', detail: 'Specialty medicine and wellness under one roof' },
              { headline: '3', subheadline: 'Languages of Care', detail: 'English · Spanish · Arabic' },
              { headline: 'Same Week', subheadline: 'Average Availability', detail: 'Convenient scheduling for new patients' },
            ].map(({ headline, subheadline, detail }) => (
              <div key={subheadline} className="px-3 py-2 md:px-6 md:py-4">
                <p className="font-display text-3xl font-semibold tracking-tight text-primary-700 sm:text-4xl">{headline}</p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-neutral-800">
                  {subheadline}
                </p>
                <span aria-hidden="true" className="mx-auto mt-3 block h-px w-10 bg-primary-500/60" />
                <p className="mt-3 text-xs leading-relaxed text-neutral-600">{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured offerings — at a glance */}
      <section className="bg-white pb-4 pt-10">
        <div className="container-custom">
          <Reveal className="surface-muted p-6 md:p-8">
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary-700">
                Comprehensive Wellness, Recovery &amp; Preventive Care Under One Roof
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-neutral-900">
                Everything our patients need, in one place
              </h2>
            </div>
            <ul className="mx-auto mt-6 grid max-w-4xl grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
              {[
                'Internal Medicine & Gastroenterology',
                'Orthopedic Surgery',
                'Physical Therapy',
                'EMG & Nerve Conduction Studies',
                'IV Therapy & Infusions',
                'Peptide Therapy',
                'In-House Laboratory Services',
                'Weight Management & Wellness Programs',
                'Same-Week Appointments Available',
                'Most Major Insurances Accepted',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm font-medium text-neutral-800">
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-700">
                    <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
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
        </div>

        {/* Full-bleed rolling carousel: cards glide edge to edge, pause on hover */}
        <Reveal className="mt-12">
          <ServicesCarousel />
        </Reveal>

        <div className="container-custom mt-12 text-center">
          <Link href="/services" className="btn-secondary">
            View Clinical Programs
          </Link>
        </div>
      </section>

      {/* Conditions We Treat */}
      <section className="bg-neutral-50 pb-8">
        <div className="container-custom">
          <Reveal className="surface-muted p-6 md:p-8">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary-700">Common Conditions</p>
                <h3 className="mt-2 text-2xl font-bold tracking-tight text-neutral-900">Conditions We Commonly Treat</h3>
              </div>
              <Link href="/services" className="btn-text">
                See all conditions and treatments
              </Link>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              {[
                'Back and Neck Pain',
                'Joint Pain and Arthritis',
                'Sports Injuries',
                'Nerve Pain and Neuropathy',
                'Carpal Tunnel Syndrome',
                'Digestive Disorders',
                'Acid Reflux (GERD)',
                'Diabetes',
                'High Blood Pressure',
                'High Cholesterol',
                'Weight Management Concerns',
                'Chronic Pain Conditions',
                'Balance and Mobility Issues',
                'Post-Surgical Recovery',
              ].map((condition) => (
                <span key={condition} className="rounded-full border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700">
                  {condition}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* The Elevate Experience */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <Reveal>
          <SectionHeader
            subtitle="The Elevate Experience"
            title="Care designed around the way you live"
            description="What makes a visit at Elevate different — coordinated specialties, multilingual team, and the convenience of in-house services under one roof."
            centered
          />
          <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Multilingual care',
                description: 'Our team cares for patients comfortably in English, Spanish, and Arabic.',
                icon: (
                  <path d="M3 5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H9l-4 3v-3H5a2 2 0 0 1-2-2V5Zm8 9 4 3v-3h2a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-1" />
                ),
              },
              {
                title: 'Integrated specialties',
                description: 'Orthopedic surgery, internal medicine, GI, physical therapy, and wellness — coordinated, not siloed.',
                icon: (
                  <>
                    <circle cx="7" cy="9" r="3.5" />
                    <circle cx="14.5" cy="9" r="3.5" />
                    <circle cx="10.75" cy="15" r="3.5" />
                  </>
                ),
              },
              {
                title: 'In-house labs',
                description: 'Blood draws and lab orders completed in the same visit — no separate trip to a draw station.',
                icon: (
                  <>
                    <path d="M9 3h6M10 3v13a2.5 2.5 0 0 0 5 0V3" />
                    <path d="M10 9.5h5" />
                  </>
                ),
              },
              {
                title: 'Same-week availability',
                description: 'New patients and follow-ups scheduled efficiently — usually within a week of requesting.',
                icon: (
                  <>
                    <circle cx="12" cy="12" r="8" />
                    <path d="M12 7v5l3.5 2" />
                  </>
                ),
              },
              {
                title: 'Personalized plans',
                description: 'Treatment plans built around your symptoms, lifestyle, and outcomes — conservative options explored first.',
                icon: (
                  <>
                    <path d="M5 6h12M5 12h8M5 18h12" />
                    <circle cx="20" cy="6" r="1.5" />
                    <circle cx="16" cy="12" r="1.5" />
                    <circle cx="20" cy="18" r="1.5" />
                  </>
                ),
              },
              {
                title: 'Clear communication',
                description: 'Coordinated follow-up across providers, with simple next steps after every visit.',
                icon: (
                  <>
                    <path d="M4 6h16v10H8l-4 4z" />
                    <path d="M8 10h8M8 13h5" />
                  </>
                ),
              },
            ].map(({ title, description, icon }) => (
              <div
                key={title}
                className="surface-card group p-6 transition-all duration-200 hover:-translate-y-1 hover:border-primary-300 hover:shadow-md"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-secondary-50 text-primary-700 transition-colors group-hover:bg-secondary-100">
                  <svg
                    className="h-7 w-7"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.6}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    {icon}
                  </svg>
                </div>
                <h3 className="font-display text-lg font-semibold text-neutral-900">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">{description}</p>
              </div>
            ))}
          </div>
          </Reveal>
        </div>
      </section>

      {/* Treatment Approach */}
      <section className="section-padding section-band">
        <div className="container-custom">
          <Reveal>
          <SectionHeader
            subtitle="Comprehensive Care"
            title="Our Treatment Approach"
            description="From first evaluation through ongoing follow-up, our integrated services are designed around the way you live."
            centered
          />
          <div className="relative mt-12">
            {/* Horizontal connector line — desktop only, runs behind the step badges */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-0 right-0 top-9 hidden h-px bg-gradient-to-r from-transparent via-primary-300 to-transparent lg:block"
            />
            <div className="relative grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
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
                <div
                  key={step}
                  className="surface-card relative flex flex-col items-center text-center border-t-2 border-t-primary-600 p-6 pt-9"
                >
                  <p className="absolute -top-7 left-1/2 -translate-x-1/2 inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary-600 to-primary-800 font-display text-lg font-semibold text-white shadow-md ring-4 ring-white">
                    {step}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-semibold text-neutral-900">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-600">{description}</p>
                </div>
              ))}
            </div>
          </div>
          </Reveal>
        </div>
      </section>

      {/* Provider Spotlight */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeader
            subtitle="Clinical Team"
            title="Led by board-certified specialists"
            description="Two physicians anchor our integrated practice — orthopedic surgery and gastroenterology/internal medicine — working alongside our licensed physical therapist."
            centered
          />

          <Reveal className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-10 md:grid-cols-2">
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
                <FocusPills areas={providerFocus['dr-kamil-amer']} />
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
                  Cares for patients in English, Spanish, and Arabic.
                </p>
                <FocusPills areas={providerFocus['dr-kamal-amer']} />
                <div className="pt-1">
                  <Link href="/providers/dr-kamal-amer" className="text-sm font-semibold text-primary-700 hover:underline">
                    Read full bio →
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Rehabilitation Team — grouped below the physicians for clear hierarchy */}
          <Reveal delay={120} className="mx-auto mt-16 max-w-5xl">
            <div className="flex items-center gap-4">
              <span aria-hidden="true" className="h-px flex-1 bg-neutral-200" />
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-700">
                Rehabilitation Team
              </p>
              <span aria-hidden="true" className="h-px flex-1 bg-neutral-200" />
            </div>

            <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-[minmax(0,12rem)_1fr]">
              <ProviderCard
                name="Muneer Obeidallah, PT"
                title="Physical Therapist"
                specialty="Physical Therapy & Rehabilitation"
                slug="muneer-obeidallah"
              />
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-700">Physical Therapy</p>
                  <h3 className="mt-1 text-xl font-bold tracking-tight text-neutral-900">
                    Muneer Obeidallah, PT
                  </h3>
                </div>
                <p className="text-sm text-neutral-600">
                  Muneer Obeidallah is a dedicated Physical Therapist committed to helping patients
                  restore mobility, reduce pain, and improve their overall quality of life.
                </p>
                <FocusPills areas={providerFocus['muneer-obeidallah']} />
                <div className="pt-1">
                  <Link href="/providers/muneer-obeidallah" className="text-sm font-semibold text-primary-700 hover:underline">
                    Read full bio →
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>

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

          <Reveal className="mx-auto mt-12 max-w-3xl">
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
          </Reveal>
        </div>
      </section>

      {/* Why Choose Elevate */}
      <section className="section-padding section-band">
        <div className="container-custom">
          <SectionHeader
            subtitle="Why Elevate"
            title="Why Choose Elevate Wellness & Health?"
            description="At Elevate Wellness & Health, we believe healthcare should be personalized, accessible, and focused on the whole patient. Our team combines primary care, specialty care, rehabilitation, diagnostics, and wellness services under one roof, providing a seamless healthcare experience designed around your needs."
            centered
          />

          <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {([
              {
                title: 'Same-Week Appointments Available',
                description:
                  'We understand that health concerns can’t always wait. That’s why we offer same-week appointments whenever possible, helping patients receive timely care without unnecessary delays.',
              },
              {
                title: 'Personalized Treatment Plans',
                description:
                  'No two patients are alike. Our providers take the time to understand your unique health goals and create individualized treatment plans tailored to your condition, lifestyle, and long-term wellness objectives.',
              },
              {
                title: 'Preventive & Wellness Care',
                description:
                  'Our focus extends beyond treating illness. We emphasize preventive medicine, routine screenings, health education, and wellness programs to help patients stay healthy and reduce future health risks.',
              },
              {
                title: 'In-House Diagnostics & Testing',
                description:
                  'From laboratory testing and diagnostic evaluations to nerve studies and specialty assessments, our in-house services help streamline care and provide faster answers for patients.',
              },
              {
                title: 'Multidisciplinary Care Team',
                description:
                  'Our physicians, specialists, therapists, and clinical staff work together to coordinate your care, ensuring a comprehensive and integrated approach to treatment and recovery.',
              },
              {
                title: 'Weight Management & Metabolic Health',
                description:
                  'We offer medically supervised programs designed to help patients achieve and maintain a healthy weight while improving overall metabolic health, energy levels, and wellness.',
              },
              {
                title: 'Recovery & Performance Optimization',
                description:
                  'Whether recovering from an injury, surgery, or simply seeking to optimize physical performance, we provide therapies and wellness solutions designed to support healing, strength, and long-term vitality.',
              },
              {
                title: 'Compassionate, Patient-Centered Care',
                description:
                  'Our mission is to treat every patient with respect, compassion, and dignity. We are committed to building lasting relationships and delivering exceptional healthcare experiences.',
              },
            ] as const).map(({ title, description }, i) => (
              <Reveal
                key={title}
                delay={(i % 3) * 80}
                className="surface-card border-t-2 border-t-primary-600 p-6 transition-shadow duration-200 hover:shadow-md"
              >
                <h3 className="font-display text-lg font-semibold text-neutral-900">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">{description}</p>
              </Reveal>
            ))}
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

            <Reveal className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
              {['Aetna', 'Blue Cross Blue Shield', 'Cigna', 'UnitedHealthcare', 'Medicare', 'Medicaid', 'Humana', 'Most major plans'].map((provider) => (
                <div
                  key={provider}
                  className="surface-card flex items-center gap-3 p-4 text-left transition-colors hover:border-primary-300"
                >
                  <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary-50 text-primary-700">
                    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <p className="text-sm font-semibold text-neutral-800">{provider}</p>
                </div>
              ))}
            </Reveal>

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
