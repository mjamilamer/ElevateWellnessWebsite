import Link from 'next/link'
import { siteConfig } from '@/lib/config'
import { formatPhone } from '@/lib/utils'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden bg-secondary-900 text-primary-100/85">
      {/* Thin bronze hairline separates the footer from the CTA banner above */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary-500/40 to-transparent" />
      <div className="pointer-events-none absolute -top-32 -right-24 h-72 w-72 rounded-full bg-primary-700/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-primary-600/10 blur-3xl" />
      <div className="container-custom relative pb-24 pt-14 md:py-16">
        {/* Trust strip — hospital affiliations + multilingual badge */}
        <div className="mb-10 border-b border-primary-700/30 pb-10">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.16em] text-primary-200/80">
            Trusted by patients across northern New Jersey
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-primary-100/85">
            {[
              'Saint Michael’s Medical Center',
              'Atlantic Health · Chilton',
              'Hackensack Meridian Health',
              'St. Joseph’s University Medical Center',
              'Bergen New Bridge Medical Center',
            ].map((aff, i, arr) => (
              <span key={aff} className="flex items-center gap-x-6">
                <span>{aff}</span>
                {i < arr.length - 1 && (
                  <span aria-hidden="true" className="hidden text-primary-500/40 md:inline">
                    •
                  </span>
                )}
              </span>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-xs">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary-500/30 bg-primary-900/40 px-3 py-1 text-primary-100/85">
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H9l-4 3v-3H5a2 2 0 0 1-2-2V5Z" />
              </svg>
              Care available in English · Spanish · Arabic
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary-500/30 bg-primary-900/40 px-3 py-1 text-primary-100/85">
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 0 0 1.946-.806 3.42 3.42 0 0 1 4.438 0 3.42 3.42 0 0 0 1.946.806 3.42 3.42 0 0 1 3.138 3.138 3.42 3.42 0 0 0 .806 1.946 3.42 3.42 0 0 1 0 4.438 3.42 3.42 0 0 0-.806 1.946 3.42 3.42 0 0 1-3.138 3.138 3.42 3.42 0 0 0-1.946.806 3.42 3.42 0 0 1-4.438 0 3.42 3.42 0 0 0-1.946-.806 3.42 3.42 0 0 1-3.138-3.138 3.42 3.42 0 0 0-.806-1.946 3.42 3.42 0 0 1 0-4.438 3.42 3.42 0 0 0 .806-1.946 3.42 3.42 0 0 1 3.138-3.138z" />
              </svg>
              Board-certified physicians
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {/* Practice Info */}
          <div>
            <h3 className="mb-4 font-display text-lg font-semibold tracking-tight text-white">{siteConfig.name}</h3>
            <p className="mb-4 text-sm leading-relaxed text-primary-100/75">
              {siteConfig.description}
            </p>
            <div className="flex space-x-4">
              {siteConfig.social.facebook && (
                <a
                  href={siteConfig.social.facebook}
                  className="text-primary-100/80 transition-colors hover:text-primary-200"
                  aria-label="Facebook"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
              )}
              {siteConfig.social.twitter && (
                <a
                  href={siteConfig.social.twitter}
                  className="text-primary-100/80 transition-colors hover:text-primary-200"
                  aria-label="Twitter"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              )}
              {siteConfig.social.linkedin && (
                <a
                  href={siteConfig.social.linkedin}
                  className="text-primary-100/80 transition-colors hover:text-primary-200"
                  aria-label="LinkedIn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-display text-lg font-semibold tracking-tight text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/providers" className="hover:text-white transition-colors">Our Providers</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
              <li><Link href="/appointments" className="hover:text-white transition-colors">Schedule Appointment</Link></li>
            </ul>
          </div>

          {/* Patient Resources */}
          <div>
            <h3 className="mb-4 font-display text-lg font-semibold tracking-tight text-white">Patient Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/new-patients" className="hover:text-white transition-colors">New Patients</Link></li>
              <li><Link href="/new-patients#insurance" className="hover:text-white transition-colors">Insurance & Billing</Link></li>
              <li><Link href="/new-patients#faq" className="hover:text-white transition-colors">FAQs</Link></li>
              <li><Link href="/locations" className="hover:text-white transition-colors">Locations & Hours</Link></li>
              <li>
                <a
                  href={siteConfig.googleBusiness.reviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Review us on Google
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 font-display text-lg font-semibold tracking-tight text-white">Contact</h3>
            <address className="not-italic text-sm space-y-2">
              <p>{siteConfig.contact.address.street}</p>
              {siteConfig.contact.address.suite && <p>{siteConfig.contact.address.suite}</p>}
              <p>
                {siteConfig.contact.address.city}, {siteConfig.contact.address.state}{' '}
                {siteConfig.contact.address.zip}
              </p>
              <p className="pt-2">
                <a href={`tel:${siteConfig.contact.phone.replace(/\D/g, '')}`} className="hover:text-white transition-colors">
                  {formatPhone(siteConfig.contact.phone)}
                </a>
              </p>
              {siteConfig.contact.fax && (
                <p className="text-primary-100/70">Fax: {siteConfig.contact.fax}</p>
              )}
              <p>
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-white transition-colors">
                  {siteConfig.contact.email}
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-primary-700/40 pt-8">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <p className="text-sm text-primary-200/70">
              &copy; {currentYear} {siteConfig.legalName}. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-primary-200/70 transition-colors hover:text-primary-100">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-primary-200/70 transition-colors hover:text-primary-100">
                Terms of Service
              </Link>
              <Link href="/hipaa" className="text-primary-200/70 transition-colors hover:text-primary-100">
                HIPAA Notice
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
