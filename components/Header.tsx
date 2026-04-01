'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { siteConfig } from '@/lib/config'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200/80 bg-white/95 backdrop-blur-md supports-[backdrop-filter]:bg-white/80">
      <nav className="container-custom" aria-label="Main navigation">
        <div className="flex h-14 items-center justify-between gap-3 sm:h-16 sm:gap-4">
          <div className="min-w-0 shrink">
            <Link
              href="/"
              className="block rounded-md focus-visible:outline-offset-4"
            >
              <span className="block text-sm font-bold leading-snug tracking-tight text-primary-700 sm:text-base lg:text-lg">
                {siteConfig.name}
              </span>
            </Link>
          </div>

          <div className="hidden min-w-0 flex-1 items-center justify-end gap-1 lg:flex xl:gap-2">
            <div className="flex flex-wrap items-center justify-end gap-0.5 xl:flex-nowrap xl:gap-1">
              {siteConfig.navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  aria-current={pathname === item.href ? 'page' : undefined}
                  className={`whitespace-nowrap rounded-lg px-2 py-1.5 text-xs font-semibold transition-colors focus-visible:outline-offset-4 xl:px-2.5 xl:text-sm ${
                    pathname === item.href
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-neutral-600 hover:bg-neutral-50 hover:text-primary-700'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <Link
              href="/appointments"
              className="ml-1 inline-flex h-9 shrink-0 items-center justify-center gap-1.5 rounded-lg bg-primary-600 px-3 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 xl:px-4 xl:text-sm"
            >
              Schedule
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <button
            type="button"
            className="-mr-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-neutral-700 hover:bg-neutral-100 hover:text-primary-700 lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="max-h-[min(70vh,28rem)] overflow-y-auto border-t border-neutral-200 py-3 lg:hidden">
            <div className="flex flex-col gap-0.5">
              {siteConfig.navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`rounded-lg px-3 py-2.5 text-sm font-medium ${
                    pathname === item.href
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-neutral-700 hover:bg-neutral-50'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="mt-3 border-t border-neutral-100 pt-3">
                <Link
                  href="/appointments"
                  className="btn-primary w-full justify-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Schedule Now
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
