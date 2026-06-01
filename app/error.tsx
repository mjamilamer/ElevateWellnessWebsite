'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { siteConfig } from '@/lib/config'
import { formatPhone } from '@/lib/utils'

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Route segment error:', error)
  }, [error])

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-secondary-50">
      <div className="pointer-events-none absolute -top-24 -right-16 h-72 w-72 rounded-full bg-secondary-200/45 blur-3xl" />

      <div className="container-custom relative z-10 py-24 md:py-32">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary-700">
            Something went wrong
          </p>
          <h1 className="mt-3 hero-heading text-balance">An unexpected error occurred</h1>
          <p className="body-large mx-auto mt-4">
            We’ve been notified. You can try again, return home, or call our office if you need
            help right away.
          </p>

          {error.digest && (
            <p className="mt-3 text-xs text-neutral-500">
              Reference:{' '}
              <code className="font-mono text-[11px] text-neutral-700">{error.digest}</code>
            </p>
          )}

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button type="button" onClick={() => reset()} className="btn-primary">
              Try again
            </button>
            <Link href="/" className="btn-secondary">
              Return home
            </Link>
          </div>

          <p className="mt-8 text-sm text-neutral-600">
            Need help now?{' '}
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
