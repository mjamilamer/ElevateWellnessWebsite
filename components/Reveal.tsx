'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

interface RevealProps {
  children: React.ReactNode
  /** Delay in ms before transition starts after intersecting. */
  delay?: number
  className?: string
  as?: 'div' | 'section'
}

/**
 * Fade + translate-up reveal when scrolled into view. Uses IntersectionObserver
 * once per mount, then disconnects. Honors `prefers-reduced-motion` (see CSS
 * rule in globals.css — content shows immediately).
 */
export function Reveal({ children, delay = 0, className, as = 'div' }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      el.dataset.visible = 'true'
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.visible = 'true'
          observer.unobserve(el)
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const Tag = as
  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn('reveal', className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  )
}
