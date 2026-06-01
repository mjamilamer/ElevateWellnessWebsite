import Image from 'next/image'
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
  /**
   * Optional foreground photo card shown in the right column on lg+ viewports.
   * Takes precedence over `highlights` when provided. Use paths under
   * /images/photos/ — see public/images/photos/README.md.
   */
  image?: string
  imageAlt?: string
  /** Small caption overlaid on the photo card (e.g. "Our North Bergen office"). */
  imageCaption?: string
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
  image,
  imageAlt,
  imageCaption,
  className,
}: HeroProps) {
  const showImage = Boolean(image)
  const showHighlights = !showImage && Boolean(highlights && highlights.length > 0)
  const hasSidebar = showImage || showHighlights

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
            hasSidebar ? 'lg:grid-cols-[1.1fr_0.9fr]' : 'grid-cols-1'
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

          {showImage && (
            <HeroPhotoCard src={image!} alt={imageAlt || title} caption={imageCaption} />
          )}

          {showHighlights && (
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

/**
 * Photo card shown in the hero's right column. Slight depth via shadow + ring,
 * subtle bronze accent at corner, optional caption pill on bottom.
 */
function HeroPhotoCard({
  src,
  alt,
  caption,
}: {
  src: string
  alt: string
  caption?: string
}) {
  return (
    <div className="relative w-full lg:max-w-[440px] lg:justify-self-end">
      {/* Bronze decorative card behind, creates depth */}
      <div
        aria-hidden="true"
        className="absolute -bottom-3 -right-3 h-full w-full rounded-3xl bg-gradient-to-br from-primary-300/40 to-primary-600/30 lg:-bottom-4 lg:-right-4"
      />
      <div className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-xl ring-1 ring-primary-200/30">
        <div className="relative aspect-[4/5] w-full">
          <Image
            src={src}
            alt={alt}
            fill
            priority
            sizes="(min-width: 1024px) 440px, 100vw"
            className="object-cover"
          />
          {/* Subtle gradient overlay anchoring text contrast at bottom if caption used */}
          {caption && (
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/55 via-black/15 to-transparent"
            />
          )}
        </div>
        {caption && (
          <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2">
            <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-600 text-white">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M17.657 16.657L13.414 20.9a2 2 0 0 1-2.828 0l-4.243-4.243a8 8 0 1 1 11.314 0z" />
                <circle cx="12" cy="11" r="3" />
              </svg>
            </span>
            <p className="text-sm font-semibold text-white drop-shadow-sm">{caption}</p>
          </div>
        )}
      </div>
    </div>
  )
}
