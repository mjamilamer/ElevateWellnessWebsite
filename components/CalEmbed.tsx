'use client'

import { useEffect } from 'react'

interface CalEmbedProps {
  calLink: string
  className?: string
}

export function CalEmbed({ calLink, className }: CalEmbedProps) {
  useEffect(() => {
    // Dynamically load Cal.com embed script
    const script = document.createElement('script')
    script.src = 'https://app.cal.com/embed/embed.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      // Cleanup
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [])

  useEffect(() => {
    // Initialize Cal embed when script is loaded
    const initCal = () => {
      if (typeof window !== 'undefined' && (window as any).Cal) {
        ;(window as any).Cal('init', { origin: 'https://app.cal.com' })
      }
    }

    // Check if Cal is already loaded
    if (typeof window !== 'undefined' && (window as any).Cal) {
      initCal()
    } else {
      // Wait for script to load
      window.addEventListener('cal-embed-ready', initCal)
      return () => window.removeEventListener('cal-embed-ready', initCal)
    }
  }, [])

  return (
    <div className={className}>
      {/* Cal.com embed */}
      <div
        data-cal-link={calLink}
        data-cal-config='{"layout":"month_view","theme":"light"}'
        style={{ width: '100%', height: '100%', minHeight: '600px' }}
      />
    </div>
  )
}
