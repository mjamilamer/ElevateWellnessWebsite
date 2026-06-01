import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface ProviderCardProps {
  name: string
  title: string
  specialty: string
  /**
   * Optional headshot. Drop a file in `public/images/photos/` and pass the
   * path here (e.g. "/images/photos/dr-kamil-amer.jpg"). When absent, the
   * card shows a branded bronze medallion placeholder so the design stays
   * intentional until real photos arrive.
   */
  image?: string
  slug: string
  className?: string
}

/**
 * Derives a monogram from the provider's name. For our two doctors who share
 * initials, falls back to the last name's first two letters for the second
 * monogram character so the medallions look distinct ("KA"-style ambiguity is
 * resolved at the call-site if needed via the slug).
 */
function monogramFor(name: string, slug: string): string {
  // Hand-set per-provider monograms because both doctors share initials.
  if (slug === 'dr-kamil-amer') return 'Ki'
  if (slug === 'dr-kamal-amer') return 'Ka'
  const parts = name
    .replace(/^Dr\.?\s+/i, '')
    .replace(/,?\s*M\.?D\.?$/i, '')
    .trim()
    .split(/\s+/)
  const first = parts[0]?.[0] ?? '?'
  const last = parts[parts.length - 1]?.[0] ?? ''
  return `${first}${last}`.toUpperCase()
}

export function ProviderCard({
  name,
  title,
  specialty,
  image,
  slug,
  className,
}: ProviderCardProps) {
  return (
    <Link
      href={`/providers/${slug}`}
      className={cn(
        'group block overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-all duration-200 hover:-translate-y-1 hover:border-primary-300 hover:shadow-lg',
        className
      )}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(min-width: 768px) 18rem, 100vw"
          />
        ) : (
          <Medallion monogram={monogramFor(name, slug)} />
        )}
      </div>
      <div className="p-6">
        <h3 className="mb-1 text-xl font-bold text-neutral-900 transition-colors group-hover:text-primary-700">
          {name}
        </h3>
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-primary-700">
          {title}
        </p>
        <p className="text-sm leading-relaxed text-neutral-600">{specialty}</p>
      </div>
    </Link>
  )
}

/**
 * Branded placeholder shown when no headshot is available. Bronze radial
 * gradient + thin outer ring + serif monogram. Intentional brand element
 * rather than a "missing photo" silhouette.
 */
function Medallion({ monogram }: { monogram: string }) {
  return (
    <div
      className="absolute inset-0"
      style={{
        backgroundImage:
          'radial-gradient(ellipse 80% 60% at 50% 35%, rgba(241,210,163,0.95) 0%, rgba(214,162,116,0.85) 35%, rgba(154,106,60,0.95) 75%, rgba(63,41,22,1) 100%)',
      }}
      aria-hidden="true"
    >
      {/* Subtle brushed-metal vertical streaks echoing the logo backplate */}
      <div
        className="absolute inset-0 opacity-[0.08] mix-blend-soft-light"
        style={{
          backgroundImage:
            'repeating-linear-gradient(90deg, transparent 0px, transparent 2px, rgba(253,246,234,0.65) 2px, rgba(253,246,234,0.65) 3px)',
        }}
      />
      {/* Inner decorative ring */}
      <div className="absolute inset-[14%] flex items-center justify-center rounded-full border border-primary-100/40 shadow-[inset_0_2px_6px_rgba(63,41,22,0.25)]">
        <span
          className="font-display text-5xl font-semibold leading-none text-primary-50 sm:text-6xl"
          style={{ textShadow: '0 2px 6px rgba(63,41,22,0.35)' }}
        >
          {monogram}
        </span>
      </div>
      {/* Outer ring */}
      <div className="absolute inset-3 rounded-2xl border border-primary-200/30" />
    </div>
  )
}
