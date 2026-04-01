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
  return (
    <section
      className={cn(
        'section-padding',
        variant === 'primary'
          ? 'bg-gradient-to-br from-primary-700 via-primary-600 to-secondary-600 text-white'
          : 'bg-neutral-50',
        className
      )}
    >
      <div className="container-custom">
        <div className={cn(
          'mx-auto max-w-5xl rounded-3xl px-6 py-10 text-center md:px-10 md:py-14',
          variant === 'primary' ? 'border border-white/20 bg-white/10 backdrop-blur-sm' : 'surface-card'
        )}>
          <h2
            className={cn(
              'heading-2 mb-4',
              variant === 'primary' ? 'text-white' : 'text-neutral-900'
            )}
          >
            {title}
          </h2>
          {description && (
            <p
              className={cn(
                'body-large mx-auto mb-8 max-w-3xl',
                variant === 'primary' ? 'text-primary-100' : 'text-neutral-600'
              )}
            >
              {description}
            </p>
          )}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={primaryCTA.href}
              className={cn(
                variant === 'primary'
                  ? 'btn-primary bg-white text-primary-700 hover:bg-neutral-100'
                  : 'btn-primary'
              )}
            >
              {primaryCTA.text}
            </Link>
            {secondaryCTA && (
              <Link
                href={secondaryCTA.href}
                className={cn(
                  variant === 'primary'
                    ? 'inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border-2 border-white px-6 py-3 text-base font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/10 hover:shadow-md active:translate-y-0'
                    : 'btn-secondary'
                )}
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
