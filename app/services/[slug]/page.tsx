import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Hero } from '@/components/Hero'
import { CTASection } from '@/components/CTASection'
import { StructuredData } from '@/components/StructuredData'
import { siteConfig } from '@/lib/config'
import {
  getAllServiceSlugs,
  getServicePage,
  type ServiceIconKey,
} from '@/lib/service-content'
import {
  generateBreadcrumbSchema,
  generateServiceSchema,
} from '@/lib/structured-data'
import type { Metadata } from 'next'

/**
 * Per-service hero photography. Drop-in replacement: once real practice photos
 * arrive, swap the file in /public/images/photos/ — no code change needed.
 */
const SERVICE_IMAGES: Record<ServiceIconKey, { src: string; caption: string }> = {
  orthopedic: { src: '/images/photos/office-lobby.jpg', caption: 'Orthopedic and surgical evaluation' },
  'internal-medicine': { src: '/images/photos/waiting-room.jpg', caption: 'Comprehensive adult care' },
  'physical-therapy': { src: '/images/photos/physical-therapy.jpg', caption: 'Hands-on rehabilitation' },
  'peptide-wellness': { src: '/images/photos/hero-wellness.jpg', caption: 'Medically guided wellness' },
  acupuncture: { src: '/images/photos/wellness-care.jpg', caption: 'Calm, patient-centered care' },
  'iv-infusion': { src: '/images/photos/hero-wellness.jpg', caption: 'Restorative infusion therapy' },
  'in-house-lab': { src: '/images/photos/office-lobby.jpg', caption: 'In-house lab and blood draws' },
  'emg-ncs': { src: '/images/photos/office-lobby.jpg', caption: 'Advanced diagnostic nerve testing' },
  'weight-management': { src: '/images/photos/wellness-care.jpg', caption: 'Medically supervised weight management' },
}

type Props = { params: { slug: string } }

export function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const service = getServicePage(params.slug)
  if (!service) {
    return { title: 'Service' }
  }
  const path = `/services/${service.slug}`
  const canonical = `${siteConfig.siteUrl.replace(/\/$/, '')}${path}`

  return {
    title: service.title,
    description: service.metaDescription,
    keywords: service.keywords,
    alternates: { canonical },
    openGraph: {
      url: canonical,
      title: `${service.title} | ${siteConfig.name}`,
      description: service.metaDescription,
    },
  }
}

export default function ServiceDetailPage({ params }: Props) {
  const service = getServicePage(params.slug)
  if (!service) {
    notFound()
  }

  const base = siteConfig.siteUrl.replace(/\/$/, '')
  const breadcrumbItems = [
    { name: 'Home', url: `${base}/` },
    { name: 'Services', url: `${base}/services` },
    { name: service.title, url: `${base}/services/${service.slug}` },
  ]

  const jsonLd = [
    generateServiceSchema({
      name: service.title,
      slug: service.slug,
      description: service.metaDescription,
    }),
    generateBreadcrumbSchema(breadcrumbItems),
  ]

  return (
    <>
      <StructuredData data={jsonLd} />
      <nav
        className="border-b border-neutral-100 bg-neutral-50/80"
        aria-label="Breadcrumb"
      >
        <div className="container-custom py-3">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-neutral-600">
            <li>
              <Link href="/" className="font-medium text-primary-700 hover:underline">
                Home
              </Link>
            </li>
            <li aria-hidden className="text-neutral-400">
              /
            </li>
            <li>
              <Link href="/services" className="font-medium text-primary-700 hover:underline">
                Services
              </Link>
            </li>
            <li aria-hidden className="text-neutral-400">
              /
            </li>
            <li className="font-semibold text-neutral-900">{service.title}</li>
          </ol>
        </div>
      </nav>

      <Hero
        subtitle="Specialty"
        title={service.title}
        description={service.summary}
        image={SERVICE_IMAGES[service.iconKey]?.src}
        imageAlt={`${service.title} at Elevate Wellness & Health`}
        imageCaption={SERVICE_IMAGES[service.iconKey]?.caption}
        primaryCTA={{
          text: 'Schedule consultation',
          href: '/appointments',
        }}
        secondaryCTA={{
          text: 'All services',
          href: '/services',
        }}
      />

      <section className="section-padding bg-white">
        <div className="container-custom max-w-3xl">
          <div className="space-y-4">
            {service.intro.split('\n\n').map((paragraph) => (
              <p key={paragraph} className="body-large text-neutral-700">
                {paragraph}
              </p>
            ))}
          </div>

          {service.conditions.length > 0 && (
            <div className="mt-10">
              <h2 className="heading-4 mb-4">Conditions we often evaluate</h2>
              <ul className="space-y-2 text-neutral-700">
                {service.conditions.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Pull quote — visual break between conditions and approach. */}
          <figure className="my-12 border-l-4 border-primary-600 bg-primary-50/40 px-6 py-5 sm:px-8">
            <blockquote>
              <p className="font-display text-lg leading-relaxed text-neutral-800 sm:text-xl">
                “{service.summary}”
              </p>
            </blockquote>
          </figure>

          <div className="mt-10">
            <h2 className="heading-4 mb-4">
              {service.conditions.length > 0 ? 'How we approach care' : 'What our service includes'}
            </h2>
            <ul className="space-y-2 text-neutral-700">
              {service.approach.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {service.specialistBio &&
            (service.specialistSlug ? (
              <Link
                href={`/providers/${service.specialistSlug}`}
                className="group mt-10 block rounded-2xl surface-card border-t-2 border-t-primary-600 p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary-200 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
                aria-label={`Read the full profile of ${service.specialistName ?? 'the specialist'}`}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-700">
                  About the Specialist
                </p>
                {service.specialistName && (
                  <h2 className="mt-2 font-display text-xl font-semibold text-neutral-900 transition-colors group-hover:text-primary-700">
                    {service.specialistName}
                  </h2>
                )}
                <p className="mt-3 text-neutral-700">{service.specialistBio}</p>
                <span className="mt-4 inline-flex items-center font-semibold text-primary-700 group-hover:underline">
                  View full profile
                  <svg
                    className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            ) : (
              <div className="mt-10 surface-card border-t-2 border-t-primary-600 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-700">
                  About the Specialist
                </p>
                {service.specialistName && (
                  <h2 className="mt-2 font-display text-xl font-semibold text-neutral-900">
                    {service.specialistName}
                  </h2>
                )}
                <p className="mt-3 text-neutral-700">{service.specialistBio}</p>
              </div>
            ))}

          <p className="mt-10 text-sm text-neutral-500">
            {siteConfig.legalName} provides individualized medical care. This page is for general
            information and is not a substitute for a visit with your clinician.
          </p>
        </div>
      </section>

      <CTASection
        title={`Questions about ${service.title.toLowerCase()}?`}
        description="Schedule a visit to discuss symptoms, imaging, and options that fit your goals."
        primaryCTA={{ text: 'Request an appointment', href: '/appointments' }}
        secondaryCTA={{ text: 'Contact us', href: '/contact' }}
      />
    </>
  )
}
