'use client'

import { useEffect, useId, useState } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { siteConfig } from '@/lib/config'

/** Matches Tailwind default `lg` breakpoint (see tailwind.config.js). */
const LG_MIN_PX = 1024

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const menuId = useId()
  const pathname = usePathname()

  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Toggle subtle shadow on the header once user scrolls past 8px.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${LG_MIN_PX}px)`)
    const onChange = () => {
      if (mq.matches) setMobileMenuOpen(false)
    }
    mq.addEventListener('change', onChange)
    onChange()
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (!mobileMenuOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [mobileMenuOpen])

  useEffect(() => {
    if (!mobileMenuOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [mobileMenuOpen])

  const mobileNav = (
    <>
      <div
        className="fixed left-0 right-0 top-16 z-[90] bg-neutral-900/25 sm:top-[4.5rem] lg:hidden"
        aria-hidden
        onClick={() => setMobileMenuOpen(false)}
      />
      <div
        id={menuId}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        className="fixed left-0 right-0 top-16 z-[100] max-h-[min(85dvh,calc(100dvh-4rem))] overflow-y-auto border-b border-neutral-200 bg-white px-4 py-4 shadow-lg sm:top-[4.5rem] sm:max-h-[min(85dvh,calc(100dvh-4.5rem))] sm:px-6 lg:hidden"
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-0.5">
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
    </>
  )

  return (
    <header
      data-scrolled={scrolled ? 'true' : 'false'}
      className="header-shadow sticky top-0 z-[120] border-b border-neutral-200/80 bg-white/95 backdrop-blur-md transition-shadow duration-200 supports-[backdrop-filter]:bg-white/80"
    >
      <nav className="container-custom" aria-label="Main navigation">
        <div className="flex h-16 items-center justify-between gap-3 sm:h-[4.5rem] sm:gap-4">
          <div className="min-w-0 shrink">
            <Link
              href="/"
              className="flex items-center gap-2 rounded-md text-neutral-900 focus-visible:outline-offset-4 sm:gap-2.5"
              aria-label={`${siteConfig.name} — Home`}
            >
              <span
                aria-hidden="true"
                className="relative inline-flex h-10 w-12 shrink-0 items-center justify-center rounded-full border border-primary-400/60 bg-primary-50/60 p-1 shadow-[inset_0_1px_2px_rgba(78,50,22,0.18)] sm:h-11 sm:w-14 lg:h-12 lg:w-[3.75rem]"
              >
                <span
                  aria-hidden="true"
                  className="block h-full w-full bg-gradient-to-b from-primary-400 via-primary-600 to-primary-700"
                  style={{
                    WebkitMaskImage: 'url(/images/elevate_logo_icon.svg)',
                    WebkitMaskRepeat: 'no-repeat',
                    WebkitMaskPosition: 'center',
                    WebkitMaskSize: 'contain',
                    maskImage: 'url(/images/elevate_logo_icon.svg)',
                    maskRepeat: 'no-repeat',
                    maskPosition: 'center',
                    maskSize: 'contain',
                  }}
                />
              </span>
              <span className="block font-display text-base font-semibold leading-snug tracking-tight sm:text-lg lg:text-xl">
                {siteConfig.name.split(/(\s&\s)/).map((part, i) =>
                  /\s&\s/.test(part) ? (
                    <span key={i} className="text-primary-600">{part}</span>
                  ) : (
                    <span key={i}>{part}</span>
                  )
                )}
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
            aria-controls={menuId}
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
      </nav>
      {mounted && mobileMenuOpen && createPortal(mobileNav, document.body)}
    </header>
  )
}
