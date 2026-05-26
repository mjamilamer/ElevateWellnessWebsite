import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Hero } from '@/components/Hero'
import { CTASection } from '@/components/CTASection'
import { StructuredData } from '@/components/StructuredData'
import { siteConfig } from '@/lib/config'
import {
  getAllServiceSlugs,
  getServicePage,
} from '@/lib/service-content'
import {
  generateBreadcrumbSchema,
  generateServiceSchema,
} from '@/lib/structured-data'
import type { Metadata } from 'next'

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
          <p className="body-large text-neutral-700">{service.intro}</p>

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

          {service.specialistBio && (
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
          )}

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
