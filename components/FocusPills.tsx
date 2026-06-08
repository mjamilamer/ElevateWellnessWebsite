import { cn } from '@/lib/utils'

interface FocusPillsProps {
  areas: string[]
  /** Optional cap so denser layouts (e.g. the homepage) stay compact. */
  limit?: number
  className?: string
  'aria-label'?: string
}

/**
 * Consistent "focus area" pills used across every provider card. Keeping the
 * markup in one component guarantees the physicians and the physical therapist
 * read identically wherever they appear.
 */
export function FocusPills({ areas, limit, className, ...rest }: FocusPillsProps) {
  const shown = typeof limit === 'number' ? areas.slice(0, limit) : areas
  if (shown.length === 0) return null

  return (
    <ul className={cn('flex flex-wrap gap-2', className)} aria-label={rest['aria-label'] ?? 'Areas of focus'}>
      {shown.map((area) => (
        <li
          key={area}
          className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-medium text-neutral-700"
        >
          {area}
        </li>
      ))}
    </ul>
  )
}
