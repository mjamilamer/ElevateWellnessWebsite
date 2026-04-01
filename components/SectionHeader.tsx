import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  title: string
  subtitle?: string
  description?: string
  centered?: boolean
  className?: string
}

export function SectionHeader({
  title,
  subtitle,
  description,
  centered = false,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn(centered ? 'text-center mx-auto max-w-3xl' : '', className)}>
      {subtitle && (
        <p className="mb-3 inline-flex items-center rounded-full border border-primary-200 bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-primary-700">
          {subtitle}
        </p>
      )}
      <h2 className="heading-2 mb-4 text-balance">{title}</h2>
      {description && (
        <p className="body-large text-balance">{description}</p>
      )}
    </div>
  )
}
