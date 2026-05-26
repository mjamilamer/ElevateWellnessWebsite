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
        'relative overflow-hidden bg-gradient-to-b from-white to-secondary-50',
        className
      )}
    >
      <div className="pointer-events-none absolute -top-24 -right-16 h-72 w-72 rounded-full bg-secondary-200/45 blur-3xl sm:h-96 sm:w-96" />
      <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-secondary-300/30 blur-3xl sm:h-80 sm:w-80" />
      {/* Subtle navy vertical streaks for soft texture against the pale-blue gradient. */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.05] mix-blend-multiply"
        aria-hidden="true"
        style={{
          backgroundImage:
            'repeating-linear-gradient(90deg, transparent 0px, transparent 2px, rgba(15,30,51,0.45) 2px, rgba(15,30,51,0.45) 3px)',
        }}
      />
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
              <div className="mb-3 flex items-center gap-3 sm:mb-4">
                <span aria-hidden="true" className="h-px w-10 bg-gradient-to-r from-primary-600 to-transparent" />
                <p className="inline-flex items-center rounded-full border border-primary-300/70 bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-primary-700 shadow-sm sm:px-4 sm:text-sm">
                  {subtitle}
                </p>
              </div>
            )}

            <h1 className="hero-heading mb-4 text-balance sm:mb-5">
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
            <aside className="surface-card border-t-2 border-t-primary-600 p-5 lg:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-700">
                Why patients choose us
              </p>
              <ul className="mt-4 space-y-3">
                {highlights?.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-neutral-700">
                    <span aria-hidden="true" className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 ring-2 ring-primary-200/50" />
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
