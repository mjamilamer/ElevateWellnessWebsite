import Link from 'next/link'
import { Hero } from '@/components/Hero'
import { SectionHeader } from '@/components/SectionHeader'
import { ContactMethods } from '@/components/ContactMethods'
import { EmergencyNotice } from '@/components/EmergencyNotice'
import { siteConfig } from '@/lib/config'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata('/contact', {
  title: 'Contact Us',
  description:
    "Contact Elevate Wellness & Health—call, email, or visit us, or request an appointment online and we'll confirm promptly.",
})

export default function ContactPage() {
  return (
    <>
      <Hero
        subtitle="Get In Touch"
        title="Contact Us"
        description="Have questions? We're here to help. Reach out to our team and we'll get back to you as soon as possible."
        highlights={[
          'Fast response for general scheduling and visit questions',
          'Clear guidance for insurance and first-visit preparation',
          'Multiple contact options with one coordinated team',
        ]}
      />

      {/* Contact Methods */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <ContactMethods />

            <div className="surface-card mt-12 p-8 text-center">
              <SectionHeader
                title="Have a question or need to be seen?"
                subtitle="Book Your Visit"
                description="Request an appointment online—pick a service, choose a time, and our team will confirm within 1 business day. Choose 'Other' to send us a general question."
                centered
              />
              <div className="mt-8">
                <Link href="/appointments" className="btn-primary">
                  Book your visit
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Google review CTA */}
            <div className="surface-card mt-8 flex flex-col items-center gap-5 p-8 text-center sm:flex-row sm:justify-between sm:text-left">
              <div className="flex items-start gap-4">
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary-50 text-primary-700">
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27Z" />
                  </svg>
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-neutral-900">
                    Been in to see us?
                  </h3>
                  <p className="mt-1 text-sm text-neutral-600">
                    A quick Google review helps other patients find our practice. We&apos;d be
                    grateful for your feedback.
                  </p>
                </div>
              </div>
              <a
                href={siteConfig.googleBusiness.reviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary shrink-0"
              >
                Leave a Google review
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Notice */}
      <EmergencyNotice />
    </>
  )
}
