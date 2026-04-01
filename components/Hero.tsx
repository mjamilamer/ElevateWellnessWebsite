import Link from 'next/link'
import { cn } from '@/lib/utils'

interface HeroProps {
  title: string
  subtitle?: string
  description?: string
  primaryCTA?: {
    text: string
    href: string
  }
  secondaryCTA?: {
    text: string
    href: string
  }
  backgroundImage?: string
  highlights?: string[]
  className?: string
}

export function Hero({
  title,
  subtitle,
  description,
  primaryCTA,
  secondaryCTA,
  backgroundImage,
  highlights,
  className,
}: HeroProps) {
  const hasHighlights = Boolean(highlights && highlights.length > 0)

  return (
    <section
      className={cn(
        'relative overflow-hidden bg-gradient-to-br from-primary-50/90 via-white to-secondary-50/80',
        className
      )}
    >
      <div className="pointer-events-none absolute -top-24 -right-16 h-64 w-64 rounded-full bg-primary-100/60 blur-3xl sm:h-72 sm:w-72" />
      <div className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-secondary-100/50 blur-3xl sm:h-64 sm:w-64" />
      {backgroundImage && (
        <div
          className="absolute inset-0 z-0 opacity-10"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      )}
      
      <div className="container-custom relative z-10 py-10 sm:py-12 md:py-14 lg:py-16">
        <div
          className={cn(
            'grid items-start gap-6 md:gap-8 lg:items-end',
            hasHighlights ? 'lg:grid-cols-[1.1fr_0.9fr]' : 'grid-cols-1'
          )}
        >
          <div className="max-w-4xl">
            {subtitle && (
              <p className="mb-3 inline-flex items-center rounded-full border border-primary-200 bg-white/90 px-3 py-1 text-xs font-semibold tracking-wide text-primary-700 shadow-sm sm:mb-4 sm:px-4 sm:text-sm">
                {subtitle}
              </p>
            )}

            <h1 className="heading-1 mb-4 text-balance sm:mb-5">
              {title}
            </h1>

            {description && (
              <p className="body-large mb-6 max-w-2xl sm:mb-8">
                {description}
              </p>
            )}

            {(primaryCTA || secondaryCTA) && (
              <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                {primaryCTA && (
                  <Link href={primaryCTA.href} className="btn-primary">
                    {primaryCTA.text}
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                )}
                {secondaryCTA && (
                  <Link href={secondaryCTA.href} className="btn-secondary">
                    {secondaryCTA.text}
                  </Link>
                )}
              </div>
            )}
          </div>

          {hasHighlights && (
            <aside className="surface-card p-5 lg:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary-700">
                Why patients choose us
              </p>
              <ul className="mt-4 space-y-3">
                {highlights?.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-neutral-700">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-secondary-500" />
                    <span className="text-sm leading-relaxed sm:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </aside>
          )}
        </div>
      </div>
    </section>
  )
}
