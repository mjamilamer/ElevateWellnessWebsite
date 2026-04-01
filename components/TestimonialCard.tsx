import { cn } from '@/lib/utils'

interface TestimonialCardProps {
  quote: string
  author: string
  role?: string
  rating?: number
  className?: string
}

export function TestimonialCard({
  quote,
  author,
  role,
  rating = 5,
  className,
}: TestimonialCardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-neutral-200 bg-white p-6',
        className
      )}
    >
      {/* Rating Stars */}
      <div className="mb-4 flex items-center" aria-label={`Rating: ${rating} out of 5 stars`}>
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={cn(
              'w-5 h-5',
              i < rating ? 'text-yellow-400' : 'text-neutral-300'
            )}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      {/* Quote */}
      <blockquote className="mb-4 text-neutral-700">
        <p className="text-base leading-relaxed">&ldquo;{quote}&rdquo;</p>
      </blockquote>

      {/* Author */}
      <div className="border-t border-neutral-200 pt-4">
        <cite className="not-italic">
          <p className="font-semibold text-neutral-900">{author}</p>
          {role && <p className="text-sm leading-relaxed text-neutral-600">{role}</p>}
        </cite>
      </div>
    </div>
  )
}
