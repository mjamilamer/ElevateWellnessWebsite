'use client'

import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { ServiceIcon } from '@/components/ServiceIcon'
import type { ServicePage } from '@/lib/service-content'

interface ServiceModalProps {
  service: ServicePage | null
  isOpen: boolean
  onClose: () => void
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])'

export function ServiceModal({ service, isOpen, onClose }: ServiceModalProps) {
  const [mounted, setMounted] = useState(false)
  const dialogRef = useRef<HTMLDivElement | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)
  const lastFocusedRef = useRef<HTMLElement | null>(null)
  const titleId = useId()

  useEffect(() => {
    setMounted(true)
  }, [])

  // ESC to close
  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        onClose()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen, onClose])

  // Body scroll lock
  useEffect(() => {
    if (!isOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [isOpen])

  // Save focus on open, restore on close
  useEffect(() => {
    if (isOpen) {
      lastFocusedRef.current = document.activeElement as HTMLElement | null
      const id = requestAnimationFrame(() => {
        closeButtonRef.current?.focus()
      })
      return () => cancelAnimationFrame(id)
    }
    lastFocusedRef.current?.focus?.()
  }, [isOpen])

  // Focus trap on Tab
  const onTrapTab = useCallback((e: React.KeyboardEvent) => {
    if (e.key !== 'Tab' || !dialogRef.current) return
    const focusables = dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
    if (focusables.length === 0) {
      e.preventDefault()
      return
    }
    const first = focusables[0]
    const last = focusables[focusables.length - 1]
    const active = document.activeElement as HTMLElement | null
    if (e.shiftKey) {
      if (active === first || !dialogRef.current.contains(active)) {
        e.preventDefault()
        last.focus()
      }
    } else {
      if (active === last) {
        e.preventDefault()
        first.focus()
      }
    }
  }, [])

  if (!mounted || !isOpen || !service) return null

  const modal = (
    <>
      <div
        aria-hidden="true"
        className="fixed inset-0 z-[200] bg-secondary-900/55 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        ref={dialogRef}
        onKeyDown={onTrapTab}
        className="fixed inset-0 z-[210] flex items-stretch justify-center p-0 sm:items-center sm:p-4 md:p-6"
      >
        <div className="relative flex h-full max-h-[100dvh] w-full flex-col bg-white shadow-2xl sm:h-auto sm:max-h-[calc(100dvh-3rem)] sm:max-w-2xl sm:rounded-3xl md:max-h-[calc(100dvh-4rem)]">
          {/* Close button — absolute, always visible above content */}
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close service details"
            className="absolute right-3 top-3 z-20 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-neutral-700 shadow-md ring-1 ring-neutral-200 transition-colors hover:bg-neutral-50 hover:text-neutral-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 sm:right-4 sm:top-4"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.25} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Header band — sticky inside scroll container */}
          <div className="flex items-start gap-4 border-b border-neutral-200 px-6 py-5 pr-16 sm:rounded-t-3xl sm:px-8 sm:py-6 sm:pr-20">
            <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-secondary-50 text-primary-700">
              <ServiceIcon name={service.iconKey} className="h-7 w-7" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-700">Service</p>
              <h2
                id={titleId}
                className="mt-1 font-display text-xl font-semibold tracking-tight text-neutral-900 sm:text-2xl md:text-3xl"
              >
                {service.title}
              </h2>
            </div>
          </div>

          {/* Scrollable body */}
          <div className="flex-1 space-y-6 overflow-y-auto px-6 py-6 sm:px-8 sm:py-7">
            <p className="text-base leading-relaxed text-neutral-800 sm:text-lg">{service.summary}</p>
            <p className="text-sm leading-relaxed text-neutral-700 sm:text-base">{service.intro}</p>

            {service.conditions.length > 0 && (
              <div>
                <h3 className="font-display text-base font-semibold text-neutral-900 sm:text-lg">
                  Conditions we often evaluate
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-neutral-700 sm:text-base">
                  {service.conditions.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <h3 className="font-display text-base font-semibold text-neutral-900 sm:text-lg">
                {service.conditions.length > 0 ? 'How we approach care' : 'What this service includes'}
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-neutral-700 sm:text-base">
                {service.approach.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {service.specialistBio && (
              <div className="rounded-2xl border border-neutral-200 bg-secondary-50/70 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-700">About the Specialist</p>
                {service.specialistName && (
                  <h4 className="mt-2 font-display text-base font-semibold text-neutral-900 sm:text-lg">
                    {service.specialistName}
                  </h4>
                )}
                <p className="mt-2 text-sm leading-relaxed text-neutral-700">{service.specialistBio}</p>
              </div>
            )}
          </div>

          {/* Sticky footer — always visible */}
          <div className="flex flex-col-reverse gap-3 border-t border-neutral-200 bg-white px-6 py-4 sm:flex-row sm:items-center sm:justify-between sm:rounded-b-3xl sm:px-8 sm:py-5">
            <Link
              href={`/services/${service.slug}`}
              className="text-sm font-semibold text-primary-700 hover:underline"
              onClick={onClose}
            >
              Read the full page →
            </Link>
            <Link href="/appointments" className="btn-primary" onClick={onClose}>
              Schedule consultation
            </Link>
          </div>
        </div>
      </div>
    </>
  )

  return createPortal(modal, document.body)
}
