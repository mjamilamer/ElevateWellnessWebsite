'use client'

import { useState } from 'react'
import { ServiceCard } from '@/components/ServiceCard'
import { ServiceModal } from '@/components/ServiceModal'
import { servicePages } from '@/lib/service-content'

interface ServicesGridProps {
  className?: string
}

/**
 * Renders the full set of service cards. Clicking a card opens an in-place
 * modal showing the service detail; the underlying <Link href> is preserved
 * so middle-click, right-click, and crawlers still see the canonical URL.
 */
export function ServicesGrid({ className }: ServicesGridProps) {
  const [openSlug, setOpenSlug] = useState<string | null>(null)
  const openService = openSlug ? servicePages.find((s) => s.slug === openSlug) ?? null : null

  return (
    <>
      <div
        className={
          className ??
          'grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
        }
      >
        {servicePages.map((service) => (
          <ServiceCard
            key={service.slug}
            title={service.title}
            description={service.cardDescription}
            iconKey={service.iconKey}
            href={`/services/${service.slug}`}
            onClick={(e) => {
              // Allow modifier-clicks (cmd/ctrl/shift) and middle-click to navigate normally.
              if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button === 1) return
              e.preventDefault()
              setOpenSlug(service.slug)
            }}
          />
        ))}
      </div>
      <ServiceModal
        service={openService}
        isOpen={!!openService}
        onClose={() => setOpenSlug(null)}
      />
    </>
  )
}
