import Link from 'next/link'
import { cn } from '@/lib/utils'

interface ServiceCardProps {
  title: string
  description: string
  icon?: React.ReactNode
  href: string
  className?: string
}

export function ServiceCard({ title, description, icon, href, className }: ServiceCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        'group block rounded-2xl border border-neutral-200 bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:border-primary-200',
        className
      )}
    >
      {icon && (
        <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-primary-50 text-primary-700 transition-colors group-hover:bg-primary-100">
          {icon}
        </div>
      )}
      <h3 className="heading-4 mb-2 text-[1.25rem] transition-colors group-hover:text-primary-700">
        {title}
      </h3>
      <p className="mb-5 text-base leading-relaxed text-neutral-600">{description}</p>
      <span className="inline-flex items-center font-semibold text-primary-700 group-hover:underline">
        Learn more
        <svg className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </span>
    </Link>
  )
}
