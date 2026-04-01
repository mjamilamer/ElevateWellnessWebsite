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
        'relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50',
        className
      )}
    >
      <div className="pointer-events-none absolute -top-28 -right-24 h-80 w-80 rounded-full bg-primary-100/70 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-secondary-100/60 blur-3xl" />
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
      
      <div className="container-custom relative z-10 py-16 md:py-20 lg:py-24">
        <div className={cn('grid items-end gap-8', hasHighlights ? 'lg:grid-cols-[1.1fr_0.9fr]' : 'grid-cols-1')}>
          <div className="max-w-4xl">
            {subtitle && (
              <p className="mb-4 inline-flex items-center rounded-full border border-primary-200 bg-white/90 px-4 py-1 text-sm font-semibold tracking-wide text-primary-700 shadow-sm">
                {subtitle}
              </p>
            )}

            <h1 className="heading-1 mb-5 text-balance">
              {title}
            </h1>

            {description && (
              <p className="body-large mb-8 max-w-2xl">
                {description}
              </p>
            )}

            {(primaryCTA || secondaryCTA) && (
              <div className="flex flex-col gap-4 sm:flex-row">
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
            <aside className="surface-card p-6 lg:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-700">Why patients choose us</p>
              <ul className="mt-5 space-y-4">
                {highlights?.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-neutral-700">
                    <span className="mt-1.5 h-2.5 w-2.5 rounded-full bg-secondary-500" />
                    <span className="text-base leading-relaxed">{item}</span>
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
