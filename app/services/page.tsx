import { Hero } from '@/components/Hero'
import { SectionHeader } from '@/components/SectionHeader'
import { ServicesGrid } from '@/components/ServicesGrid'
import { CTASection } from '@/components/CTASection'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata('/services', {
  title: 'Our Services',
  description:
    'Elevate Wellness & Health offers orthopedic services, internal medicine & gastroenterology, physical therapy, peptide wellness, acupuncture, IV & infusion therapy, and in-house labs.',
})

const TREATMENT_STEPS = [
  {
    step: 1,
    title: 'Complete Health Evaluation',
    description:
      'Full medical review to understand symptoms, history, lifestyle, and wellness goals.',
  },
  {
    step: 2,
    title: 'Personalized Care Plan',
    description:
      'A treatment plan designed around each patient’s needs — medical, wellness, therapy, or specialty care.',
  },
  {
    step: 3,
    title: 'Integrated Services',
    description:
      'Access to internal medicine, GI, orthopedics, physical therapy, labs, acupuncture, peptides, and IV therapy in one place.',
  },
  {
    step: 4,
    title: 'Ongoing Wellness Support',
    description:
      'We focus on prevention, follow-up care, recovery, and helping patients feel healthier long-term.',
  },
]

export default function ServicesPage() {
  return (
    <>
      <Hero
        subtitle="Clinical Programs"
        title="Comprehensive Wellness & Clinical Services"
        description="From evaluation to recovery, Elevate Wellness & Health offers expert care across orthopedics, internal medicine, gastroenterology, therapy, and wellness."
        image="/images/photos/office-lobby.jpg"
        imageAlt="Clinical office environment showing the practice's professional setting"
        imageCaption="Integrated care under one roof"
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
            description="A full range of medical and wellness services delivered under one roof at Elevate Wellness & Health."
            centered
          />

          <div className="mt-12">
            <ServicesGrid />
          </div>
        </div>
      </section>

      {/* Treatment Approach */}
      <section className="section-padding section-band">
        <div className="container-custom">
          <div className="mx-auto max-w-5xl">
            <SectionHeader
              title="Our Treatment Approach"
              subtitle="Comprehensive Care"
              centered
            />

            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {TREATMENT_STEPS.map(({ step, title, description }) => (
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
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Ready to start your treatment?"
        description="Schedule a consultation to discuss your needs and explore the right care path."
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
