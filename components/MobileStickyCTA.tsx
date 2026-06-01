'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

/**
 * Floating "Request Appointment" pill anchored to the bottom of the viewport
 * on mobile only. Hidden on /appointments (already on that page) and on
 * `/api/*` dev preview routes.
 */
export function MobileStickyCTA() {
  const pathname = usePathname()

  // Don't show on the appointments flow itself or on the dev preview routes
  if (
    pathname === '/appointments' ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/')
  ) {
    return null
  }

  return (
    <div
      aria-hidden={false}
      className="fixed bottom-4 left-4 right-4 z-[80] flex justify-center lg:hidden"
    >
      <Link
        href="/appointments"
        className="inline-flex h-12 w-full max-w-md items-center justify-center gap-2 rounded-full bg-primary-700 px-6 text-sm font-semibold text-white shadow-[0_10px_30px_-8px_rgba(63,41,22,0.55)] ring-1 ring-primary-900/20 transition-colors hover:bg-primary-800 active:bg-primary-900"
      >
        Request Appointment
        <svg
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  )
}
