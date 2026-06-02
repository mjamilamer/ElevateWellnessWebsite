import { siteConfig } from '@/lib/config'
import { formatPhone } from '@/lib/utils'

/**
 * Call / Email / Visit contact cards. Shared by the Contact page and the
 * Appointments page so the practice details stay in sync in one place.
 */
export function ContactMethods() {
  const { phone, fax, email, address } = siteConfig.contact

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
      {/* Phone */}
      <div className="surface-muted p-6 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-700 mb-4">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-neutral-900 mb-2">Call Us</h3>
        <a
          href={`tel:${phone.replace(/\D/g, '')}`}
          className="text-primary-700 font-semibold hover:underline"
        >
          {formatPhone(phone)}
        </a>
        {fax && <p className="mt-1 text-sm text-neutral-500">Fax: {fax}</p>}
        <p className="mt-2 text-sm text-neutral-600">
          Monday - Friday<br />9:00 AM - 5:00 PM
        </p>
      </div>

      {/* Email */}
      <div className="surface-muted p-6 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-700 mb-4">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-neutral-900 mb-2">Email Us</h3>
        <a
          href={`mailto:${email}`}
          className="text-primary-700 font-semibold hover:underline break-all"
        >
          {email}
        </a>
        <p className="mt-2 text-sm text-neutral-600">
          We typically respond<br />within 24 hours
        </p>
      </div>

      {/* Visit */}
      <div className="surface-muted p-6 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-700 mb-4">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-neutral-900 mb-2">Visit Us</h3>
        <address className="not-italic text-neutral-700 text-sm">
          {address.street}<br />
          {address.suite && <>{address.suite}<br /></>}
          {address.city}, {address.state} {address.zip}
        </address>
        <a
          href="/locations"
          className="inline-block mt-2 text-sm text-primary-700 font-semibold hover:underline"
        >
          Get Directions →
        </a>
      </div>
    </div>
  )
}
