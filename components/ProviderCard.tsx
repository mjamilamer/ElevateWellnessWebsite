import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface ProviderCardProps {
  name: string
  title: string
  specialty: string
  image?: string
  slug: string
  className?: string
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
        'group block overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-all duration-200 hover:-translate-y-1 hover:border-primary-200',
        className
      )}
    >
      <div className="aspect-[3/4] relative bg-neutral-100">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-neutral-400">
            <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="mb-1 text-xl font-bold text-neutral-900 transition-colors group-hover:text-primary-700">
          {name}
        </h3>
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-primary-700">{title}</p>
        <p className="text-sm leading-relaxed text-neutral-600">{specialty}</p>
      </div>
    </Link>
  )
}
