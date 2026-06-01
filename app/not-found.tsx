import Link from 'next/link'
import { siteConfig } from '@/lib/config'
import { formatPhone } from '@/lib/utils'

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-secondary-50">
      <div className="pointer-events-none absolute -top-24 -right-16 h-72 w-72 rounded-full bg-secondary-200/45 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-secondary-300/30 blur-3xl" />

      <div className="container-custom relative z-10 py-24 md:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-display text-7xl font-semibold tracking-tight text-primary-700 sm:text-8xl">
            404
          </p>
          <span aria-hidden="true" className="mx-auto mt-4 block h-px w-12 bg-primary-500/70" />
          <h1 className="mt-6 hero-heading text-balance">We couldn’t find that page</h1>
          <p className="body-large mx-auto mt-4 max-w-lg">
            The page you were looking for may have moved, or the link may be out of date. Here are
            a few places to pick up from.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-4 text-left sm:grid-cols-3">
            {[
              { href: '/', label: 'Homepage' },
              { href: '/services', label: 'Services' },
              { href: '/providers', label: 'Our Providers' },
              { href: '/appointments', label: 'Request an Appointment' },
              { href: '/locations', label: 'Locations & Hours' },
              { href: '/contact', label: 'Contact Us' },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="surface-card group block p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-md"
              >
                <span className="text-sm font-semibold text-neutral-900 group-hover:text-primary-700">
                  {label}
                </span>
              </Link>
            ))}
          </div>

          <p className="mt-10 text-sm text-neutral-600">
            Or call our office:{' '}
            <a
              href={`tel:${siteConfig.contact.phone.replace(/\D/g, '')}`}
              className="font-semibold text-primary-700 hover:underline"
            >
              {formatPhone(siteConfig.contact.phone)}
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
