import { Hero } from '@/components/Hero'
import { SectionHeader } from '@/components/SectionHeader'
import { ContactForm } from '@/components/ContactForm'
import { siteConfig } from '@/lib/config'
import { formatPhone } from '@/lib/utils'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata('/contact', {
  title: 'Contact Us',
  description:
    "Contact Elevate Wellness & Health—call, email, or message us and we'll respond promptly.",
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
            <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-3">
              {/* Phone */}
              <div className="surface-muted p-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-700 mb-4">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-neutral-900 mb-2">Call Us</h3>
                <a
                  href={`tel:${siteConfig.contact.phone.replace(/\D/g, '')}`}
                  className="text-primary-700 font-semibold hover:underline"
                >
                  {formatPhone(siteConfig.contact.phone)}
                </a>
                {siteConfig.contact.fax && (
                  <p className="mt-1 text-sm text-neutral-500">Fax: {siteConfig.contact.fax}</p>
                )}
                <p className="mt-2 text-sm text-neutral-600">
                  Monday - Friday<br />8:00 AM - 5:00 PM
                </p>
              </div>

              {/* Email */}
              <div className="surface-muted p-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-700 mb-4">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-neutral-900 mb-2">Email Us</h3>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-primary-700 font-semibold hover:underline break-all"
                >
                  {siteConfig.contact.email}
                </a>
                <p className="mt-2 text-sm text-neutral-600">
                  We typically respond<br />within 24 hours
                </p>
              </div>

              {/* Visit */}
              <div className="surface-muted p-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-700 mb-4">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-neutral-900 mb-2">Visit Us</h3>
                <address className="not-italic text-neutral-700 text-sm">
                  {siteConfig.contact.address.street}<br />
                  {siteConfig.contact.address.suite && <>{siteConfig.contact.address.suite}<br /></>}
                  {siteConfig.contact.address.city}, {siteConfig.contact.address.state} {siteConfig.contact.address.zip}
                </address>
                <a
                  href="/locations"
                  className="inline-block mt-2 text-sm text-primary-700 font-semibold hover:underline"
                >
                  Get Directions →
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="max-w-2xl mx-auto">
              <SectionHeader
                title="Send Us a Message"
                subtitle="Contact Form"
                description="Fill out the form below and we'll get back to you promptly."
                centered
              />

              <div className="mt-12">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Notice */}
      <section className="section-padding bg-red-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-600 mb-4">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-red-900 mb-4">
              For Medical Emergencies
            </h2>
            <p className="text-lg text-red-800 mb-6">
              If you are experiencing a medical emergency, please call <strong>911</strong> or 
              go to your nearest emergency room immediately. Do not use this contact form for 
              urgent medical situations.
            </p>
            <p className="text-sm text-red-700">
              Examples of emergencies include: severe trauma, uncontrolled bleeding, loss of 
              consciousness, chest pain, difficulty breathing, or signs of stroke.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
