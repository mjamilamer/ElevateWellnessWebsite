import Link from 'next/link'
import { siteConfig } from '@/lib/config'
import { formatPhone } from '@/lib/utils'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-neutral-200 bg-neutral-900 text-neutral-200">
      <div className="container-custom py-14 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {/* Practice Info */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">{siteConfig.name}</h3>
            <p className="mb-4 text-sm leading-relaxed text-neutral-300">
              {siteConfig.description}
            </p>
            <div className="flex space-x-4">
              {siteConfig.social.facebook && (
                <a
                  href={siteConfig.social.facebook}
                  className="text-neutral-300 hover:text-white transition-colors"
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
                  className="text-neutral-300 hover:text-white transition-colors"
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
                  className="text-neutral-300 hover:text-white transition-colors"
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
            <h3 className="mb-4 text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/providers" className="hover:text-white transition-colors">Our Providers</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
              <li><Link href="/appointments" className="hover:text-white transition-colors">Schedule Appointment</Link></li>
            </ul>
          </div>

          {/* Patient Resources */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Patient Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/new-patients" className="hover:text-white transition-colors">New Patients</Link></li>
              <li><Link href="/new-patients#insurance" className="hover:text-white transition-colors">Insurance & Billing</Link></li>
              <li><Link href="/new-patients#faq" className="hover:text-white transition-colors">FAQs</Link></li>
              <li><Link href="/locations" className="hover:text-white transition-colors">Locations & Hours</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Contact</h3>
            <address className="not-italic text-sm space-y-2">
              <p>{siteConfig.contact.address.street}</p>
              <p>{siteConfig.contact.address.suite}</p>
              <p>
                {siteConfig.contact.address.city}, {siteConfig.contact.address.state}{' '}
                {siteConfig.contact.address.zip}
              </p>
              <p className="pt-2">
                <a href={`tel:${siteConfig.contact.phone.replace(/\D/g, '')}`} className="hover:text-white transition-colors">
                  {formatPhone(siteConfig.contact.phone)}
                </a>
              </p>
              <p>
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-white transition-colors">
                  {siteConfig.contact.email}
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-neutral-700">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <p className="text-sm text-neutral-400">
              &copy; {currentYear} {siteConfig.legalName}. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-neutral-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-neutral-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/hipaa" className="text-neutral-400 hover:text-white transition-colors">
                HIPAA Notice
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
