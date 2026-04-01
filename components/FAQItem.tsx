'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

interface FAQItemProps {
  question: string
  answer: string
  defaultOpen?: boolean
}

export function FAQItem({ question, answer, defaultOpen = false }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="border-b border-neutral-200 last:border-0">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between py-5 text-left hover:text-primary-700 transition-colors group"
      >
        <span className="text-lg font-semibold text-neutral-900 group-hover:text-primary-700 pr-8">
          {question}
        </span>
        <svg
          className={cn(
            'flex-shrink-0 w-6 h-6 text-primary-700 transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="pb-5 pr-12">
          <p className="text-neutral-600 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  )
}
