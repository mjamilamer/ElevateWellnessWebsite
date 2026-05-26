import Link from 'next/link'
import { cn } from '@/lib/utils'

interface CTASectionProps {
  title: string
  description?: string
  primaryCTA: {
    text: string
    href: string
  }
  secondaryCTA?: {
    text: string
    href: string
  }
  variant?: 'primary' | 'secondary'
  className?: string
}

export function CTASection({
  title,
  description,
  primaryCTA,
  secondaryCTA,
  variant = 'primary',
  className,
}: CTASectionProps) {
  if (variant === 'secondary') {
    return (
      <section className={cn('section-padding bg-neutral-50', className)}>
        <div className="container-custom">
          <div className="mx-auto max-w-5xl rounded-3xl surface-card px-6 py-10 text-center md:px-10 md:py-14">
            <h2 className="heading-2 mb-4 text-neutral-900">{title}</h2>
            {description && (
              <p className="body-large mx-auto mb-8 max-w-3xl text-neutral-600">{description}</p>
            )}
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link href={primaryCTA.href} className="btn-primary">
                {primaryCTA.text}
              </Link>
              {secondaryCTA && (
                <Link href={secondaryCTA.href} className="btn-secondary">
                  {secondaryCTA.text}
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      className={cn(
        'relative overflow-hidden bg-gradient-to-b from-secondary-800 to-secondary-900 py-16 text-white md:py-20 lg:py-24',
        className
      )}
    >
      {/* Centered radial highlight for depth */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 60% 50% at 50% 30%, rgba(241,210,163,0.22), rgba(214,162,116,0.08) 45%, transparent 70%)',
        }}
      />
      {/* Subtle brushed-metal vertical streaks echoing the logo backplate */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-screen"
        style={{
          backgroundImage:
            'repeating-linear-gradient(90deg, transparent 0px, transparent 2px, rgba(253,246,234,0.65) 2px, rgba(253,246,234,0.65) 3px)',
        }}
      />
      {/* Soft vignette at top edge for elegant section entry */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/15 to-transparent"
      />

      <div className="container-custom relative">
        <div className="mx-auto max-w-3xl text-center">
          <span
            aria-hidden="true"
            className="mx-auto mb-6 block h-px w-16 bg-gradient-to-r from-transparent via-primary-300 to-transparent"
          />
          <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
            {title}
          </h2>
          {description && (
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-primary-100/85 sm:text-lg">
              {description}
            </p>
          )}
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              href={primaryCTA.href}
              className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-primary-600 px-7 py-3.5 text-base font-semibold tracking-tight text-white shadow-[0_10px_28px_-8px_rgba(0,0,0,0.45)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-700 hover:shadow-[0_14px_34px_-10px_rgba(0,0,0,0.55)] active:translate-y-0"
            >
              {primaryCTA.text}
            </Link>
            {secondaryCTA && (
              <Link
                href={secondaryCTA.href}
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl border border-white/35 bg-white/[0.04] px-7 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-white/55 hover:bg-white/[0.08] active:translate-y-0"
              >
                {secondaryCTA.text}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
