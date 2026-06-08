'use client'

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type PointerEvent,
} from 'react'
import { ServiceCard } from '@/components/ServiceCard'
import { ServiceModal } from '@/components/ServiceModal'
import { servicePages } from '@/lib/service-content'

const SCROLL_SPEED = 65 // px per second for the gentle auto-roll
const COPIES = 3 // three identical groups give a seamless loop in both directions
const INTERACTIVE_COPY = 1 // the middle copy is the real (focusable, clickable) one
const DRAG_THRESHOLD = 6 // px of movement before a press counts as a drag, not a click
const IDLE_RESUME_MS = 1800 // auto-roll resumes this long after the last user scroll

/**
 * Auto-rolling AND fully scrollable services carousel.
 *
 * The track is a native horizontal scroll container (touch + trackpad + mouse
 * click-drag), and a requestAnimationFrame loop nudges `scrollLeft` for a gentle
 * continuous roll. Three identical card groups are laid out side by side; the
 * scroll position is normalized to the middle copy every frame, so wrapping is
 * seamless in either direction with no visible seam.
 *
 * Behaviour:
 * - auto-roll pauses on hover, keyboard focus, drag, and when the tab is hidden
 * - mouse click-drag scrubs the track; a real drag suppresses the card click
 * - clicking a card opens the in-place ServiceModal (href preserved for crawlers)
 * - only the middle copy is interactive; the others are `inert` + aria-hidden
 * - `prefers-reduced-motion` disables the auto-roll but keeps manual scrolling
 */
export function ServicesCarousel() {
  const [openSlug, setOpenSlug] = useState<string | null>(null)
  const openService = openSlug ? servicePages.find((s) => s.slug === openSlug) ?? null : null

  const scrollerRef = useRef<HTMLDivElement | null>(null)
  const groupRefs = useRef<(HTMLDivElement | null)[]>([])
  const groupWidthRef = useRef(0)
  const pausedRef = useRef(false)
  const draggingRef = useRef(false)
  const dragMovedRef = useRef(0)
  const dragStartXRef = useRef(0)
  const dragStartScrollRef = useRef(0)
  const suppressClickRef = useRef(false)
  const initializedRef = useRef(false)
  const lastInteractionRef = useRef(0)

  // Measure one group's width (start-to-start) and seed the scroll position.
  useEffect(() => {
    const measure = () => {
      const g0 = groupRefs.current[0]
      const g1 = groupRefs.current[1]
      const scroller = scrollerRef.current
      if (!g0 || !g1 || !scroller) return
      const width = g1.offsetLeft - g0.offsetLeft
      if (width <= 0) return
      groupWidthRef.current = width
      if (!initializedRef.current) {
        scroller.scrollLeft = width * INTERACTIVE_COPY
        initializedRef.current = true
      }
    }
    measure()
    const ro = new ResizeObserver(measure)
    groupRefs.current.forEach((g) => g && ro.observe(g))
    if (scrollerRef.current) ro.observe(scrollerRef.current)
    return () => ro.disconnect()
  }, [])

  // Keep non-interactive copies out of the tab order + accessibility tree.
  useEffect(() => {
    groupRefs.current.forEach((g, i) => {
      if (g) g.inert = i !== INTERACTIVE_COPY
    })
  }, [])

  // Snap the scroll position back into the middle copy's range — invisible
  // because the copies are identical, which is what makes the loop seamless.
  const normalize = useCallback(() => {
    const el = scrollerRef.current
    const g = groupWidthRef.current
    if (!el || g <= 0) return
    if (el.scrollLeft >= g * 2) el.scrollLeft -= g
    else if (el.scrollLeft < g) el.scrollLeft += g
  }, [])

  useEffect(() => {
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    let raf = 0
    let last = performance.now()
    let remainder = 0 // carry sub-pixel motion; scrollLeft is rounded by some browsers
    const step = (now: number) => {
      const dt = Math.min(now - last, 50) // clamp huge gaps (e.g. tab refocus)
      last = now
      const el = scrollerRef.current
      const idle = now - lastInteractionRef.current > IDLE_RESUME_MS
      if (
        el &&
        idle &&
        !pausedRef.current &&
        !draggingRef.current &&
        document.visibilityState === 'visible'
      ) {
        const advance = (SCROLL_SPEED * dt) / 1000 + remainder
        const whole = Math.floor(advance)
        remainder = advance - whole
        if (whole > 0) el.scrollLeft += whole
      }
      normalize()
      raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [normalize])

  const pause = () => {
    pausedRef.current = true
  }
  const resume = () => {
    pausedRef.current = false
  }

  // Any wheel/touch scroll hands control to the user; the auto-roll backs off
  // and only resumes after IDLE_RESUME_MS of no interaction — so manual
  // scrolling always feels smooth and consistent.
  const markInteraction = () => {
    lastInteractionRef.current = performance.now()
  }

  // Mouse click-drag scrubbing (touch + trackpad use native scrolling).
  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return
    const el = scrollerRef.current
    if (!el) return
    draggingRef.current = true
    dragMovedRef.current = 0
    dragStartXRef.current = e.clientX
    dragStartScrollRef.current = el.scrollLeft
    el.setPointerCapture(e.pointerId)
  }
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return
    const el = scrollerRef.current
    if (!el) return
    const dx = e.clientX - dragStartXRef.current
    dragMovedRef.current = Math.max(dragMovedRef.current, Math.abs(dx))
    el.scrollLeft = dragStartScrollRef.current - dx
    markInteraction()
  }
  const endDrag = (e: PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return
    draggingRef.current = false
    if (dragMovedRef.current > DRAG_THRESHOLD) suppressClickRef.current = true
    try {
      scrollerRef.current?.releasePointerCapture(e.pointerId)
    } catch {
      /* pointer already released */
    }
  }
  // Swallow the click that ends a drag so it doesn't open the modal.
  const onClickCapture = (e: MouseEvent<HTMLDivElement>) => {
    if (suppressClickRef.current) {
      e.preventDefault()
      e.stopPropagation()
      suppressClickRef.current = false
    }
  }

  const handleCardClick = (slug: string) => (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button === 1) return
    e.preventDefault()
    setOpenSlug(slug)
  }

  const renderGroup = (copyIndex: number) => {
    const interactive = copyIndex === INTERACTIVE_COPY
    return (
      <div
        key={copyIndex}
        ref={(el) => {
          groupRefs.current[copyIndex] = el
        }}
        aria-hidden={interactive ? undefined : true}
        className="flex items-stretch"
      >
        {servicePages.map((service) => (
          <ServiceCard
            key={`${copyIndex}-${service.slug}`}
            title={service.title}
            description={service.cardDescription}
            iconKey={service.iconKey}
            href={`/services/${service.slug}`}
            onClick={interactive ? handleCardClick(service.slug) : undefined}
            className="pointer-events-auto mr-6 w-[19rem] shrink-0 sm:w-[20.5rem]"
          />
        ))}
      </div>
    )
  }

  return (
    <>
      <div
        ref={scrollerRef}
        role="region"
        aria-label="Clinical programs"
        aria-roledescription="carousel"
        onMouseEnter={pause}
        onMouseLeave={resume}
        onFocusCapture={pause}
        onBlurCapture={resume}
        onWheel={markInteraction}
        onTouchStart={markInteraction}
        onTouchMove={markInteraction}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
        className="scroll-auto cursor-grab select-none overflow-x-auto overscroll-x-contain py-2 [-ms-overflow-style:none] [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] [scrollbar-width:none] active:cursor-grabbing [&::-webkit-scrollbar]:hidden"
      >
        <div className="flex w-max items-stretch">
          {Array.from({ length: COPIES }, (_, i) => renderGroup(i))}
        </div>
      </div>
      <ServiceModal service={openService} isOpen={!!openService} onClose={() => setOpenSlug(null)} />
    </>
  )
}
