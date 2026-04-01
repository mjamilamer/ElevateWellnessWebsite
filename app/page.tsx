import type { Metadata } from 'next'
import Link from 'next/link'
import { Hero } from '@/components/Hero'
import { SectionHeader } from '@/components/SectionHeader'
import { ServiceCard } from '@/components/ServiceCard'
import { ProviderCard } from '@/components/ProviderCard'
import { TestimonialCard } from '@/components/TestimonialCard'
import { CTASection } from '@/components/CTASection'
import { siteConfig } from '@/lib/config'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata('/', {
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: ['orthopedic', 'medical practice', 'healthcare', 'appointments', 'physicians'],
})

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <Hero
        subtitle="Orthopedic Excellence"
        title="Personalized orthopedic care that gets you moving again"
        description="Board-certified specialists, evidence-based treatment plans, and a streamlined appointment experience for busy patients."
        highlights={[
          'Board-certified specialists with outcomes-focused care plans',
          'Same-week availability for most non-emergency appointments',
          'Most major insurance accepted with pre-visit verification support',
        ]}
        primaryCTA={{
          text: 'Schedule Now',
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
          <div className="surface-card grid grid-cols-1 gap-4 p-6 text-center md:grid-cols-3 md:p-8">
            <div>
              <p className="text-3xl font-bold tracking-tight text-primary-700">20+ years</p>
              <p className="text-sm leading-relaxed text-neutral-600">Orthopedic clinical leadership</p>
            </div>
            <div>
              <p className="text-3xl font-bold tracking-tight text-primary-700">Same-week</p>
              <p className="text-sm leading-relaxed text-neutral-600">Appointments for most new patients</p>
            </div>
            <div>
              <p className="text-3xl font-bold tracking-tight text-primary-700">Patient-first</p>
              <p className="text-sm leading-relaxed text-neutral-600">Clear treatment plans and outcomes focus</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Highlights */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeader
            subtitle="Specialty Programs"
            title="High-precision care across core orthopedic conditions"
            description="Targeted programs built around outcomes, recovery time, and long-term mobility."
            centered
          />

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <ServiceCard
              title="Joint Replacement"
              description="Advanced hip, knee, and shoulder replacement pathways with optimized recovery protocols."
              href="/services/joint-replacement"
              icon={
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              }
            />
            <ServiceCard
              title="Sports Medicine"
              description="Return-to-performance care for acute injuries and overuse conditions."
              href="/services/sports-medicine"
              icon={
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            />
            <ServiceCard
              title="Spine Care"
              description="Comprehensive evaluation and treatment strategies for neck and back conditions."
              href="/services/spine-care"
              icon={
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              }
            />
            <ServiceCard
              title="Pain & Function"
              description="Integrated non-operative and interventional plans to restore movement with less pain."
              href="/services/pain-management"
              icon={
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V7a2 2 0 012-2h3l2 2h5a2 2 0 012 2v10a2 2 0 01-2 2z" />
                </svg>
              }
            />
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
              {['Lower Back Pain', 'Knee Pain', 'Herniated Disc', 'Shoulder Pain', 'Foot & Ankle Pain', 'Elbow Pain'].map((condition) => (
                <span key={condition} className="rounded-full border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700">
                  {condition}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Care Pathway */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <SectionHeader
            subtitle="Care Journey"
            title="A clear, confidence-building path from first visit to recovery"
            description="No confusion, no unnecessary steps. Just focused care and transparent next actions."
            centered
          />
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="surface-card p-6">
              <p className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700">1</p>
              <h3 className="text-xl font-semibold text-neutral-900">Comprehensive Assessment</h3>
              <p className="mt-3 text-neutral-600">Your provider evaluates symptoms, imaging, and functional goals to define the right plan early.</p>
            </div>
            <div className="surface-card p-6">
              <p className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700">2</p>
              <h3 className="text-xl font-semibold text-neutral-900">Personalized Plan</h3>
              <p className="mt-3 text-neutral-600">We align non-operative and surgical options to your lifestyle, timeline, and outcomes priorities.</p>
            </div>
            <div className="surface-card p-6">
              <p className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700">3</p>
              <h3 className="text-xl font-semibold text-neutral-900">Measured Recovery</h3>
              <p className="mt-3 text-neutral-600">Follow-ups and progress checkpoints keep your recovery on track and clinically guided.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Provider Spotlight */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeader
            subtitle="Clinical Team"
            title="Specialists trusted for complex orthopedic care"
            description="Experienced physicians focused on precision, communication, and long-term mobility outcomes."
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
            title="Results our patients can feel"
            description="High clinical standards paired with clear communication at every step."
            centered
          />

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <TestimonialCard
              quote="Dr. Johnson and her team were incredible. After my knee replacement, I'm back to hiking and living pain-free. I couldn't be happier with the care I received."
              author="Robert Martinez"
              role="Knee Replacement Patient"
              rating={5}
            />
            <TestimonialCard
              quote="The entire staff made me feel comfortable from day one. They explained everything clearly and answered all my questions. Highly recommend!"
              author="Linda Thompson"
              role="Sports Injury Patient"
              rating={5}
            />
            <div className="surface-card p-6">
              <p className="text-sm font-semibold uppercase tracking-wide text-primary-700">Why patients choose us</p>
              <ul className="mt-4 space-y-3 text-neutral-700">
                <li className="flex items-start gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-secondary-500" /> Clear expectations from day one</li>
                <li className="flex items-start gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-secondary-500" /> Efficient scheduling and follow-up communication</li>
                <li className="flex items-start gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-secondary-500" /> Evidence-based treatment recommendations</li>
                <li className="flex items-start gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-secondary-500" /> Recovery plans designed around real life</li>
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
