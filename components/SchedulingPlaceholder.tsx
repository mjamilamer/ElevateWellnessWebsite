interface SchedulingPlaceholderProps {
  className?: string
}

/**
 * Reserves the same layout footprint as the former embed; online scheduling integration TBD.
 */
export function SchedulingPlaceholder({ className }: SchedulingPlaceholderProps) {
  return (
    <div className={className}>
      <div
        className="flex min-h-[600px] w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-neutral-200 bg-neutral-50 px-6 text-center"
        role="region"
        aria-label="Online scheduling"
      >
        <p className="text-base font-semibold text-neutral-900">Online scheduling</p>
        <p className="mt-2 max-w-md text-sm text-neutral-600">
          Self-service booking will be available here soon. For now, use the form below or call our office
          to request an appointment.
        </p>
      </div>
    </div>
  )
}
