import type { SVGProps } from 'react'
import type { ServiceIconKey } from '@/lib/service-content'

type Props = {
  name: ServiceIconKey
  className?: string
} & Omit<SVGProps<SVGSVGElement>, 'name'>

/**
 * Bronze line-art glyphs for each service card. All paths use
 * `stroke="currentColor"` so the icon takes its color from the parent's
 * text-* class (e.g. `text-primary-700` for bronze).
 */
export function ServiceIcon({ name, className, ...rest }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...rest}
    >
      {GLYPHS[name]}
    </svg>
  )
}

const GLYPHS: Record<ServiceIconKey, JSX.Element> = {
  // Stylized bone — two rounded knobs connected by a shaft. Orthopedic.
  orthopedic: (
    <>
      <path d="M7 4.2a2.2 2.2 0 0 0-3.8 1.6 2.2 2.2 0 0 0 1.6 2.1 2.2 2.2 0 0 0 2.1 1.6 2.2 2.2 0 0 0 1.6-.6l8 8a2.2 2.2 0 0 0-.6 1.6 2.2 2.2 0 0 0 1.6 2.1 2.2 2.2 0 0 0 2.1 1.6 2.2 2.2 0 0 0 1.6-3.8 2.2 2.2 0 0 0-1.6-2.1 2.2 2.2 0 0 0-2.1-1.6 2.2 2.2 0 0 0-1.6.6l-8-8A2.2 2.2 0 0 0 8.6 5.8 2.2 2.2 0 0 0 7 4.2Z" />
    </>
  ),

  // Stethoscope — loop, tubing, chest piece. Internal medicine.
  'internal-medicine': (
    <>
      <path d="M5 3v6a4 4 0 0 0 8 0V3" />
      <path d="M5 3h2M11 3h2" />
      <path d="M9 13v3a4 4 0 0 0 4 4h1a4 4 0 0 0 4-4v-1.5" />
      <circle cx="18" cy="13" r="1.8" />
    </>
  ),

  // Person stretching — head + curved body + extended limbs. Physical therapy.
  'physical-therapy': (
    <>
      <circle cx="13" cy="4.5" r="1.8" />
      <path d="M13 7v4l-4 3 2 5" />
      <path d="M13 11l3.5 2 3-2.5" />
      <path d="M11 19l-2 2" />
    </>
  ),

  // Peptide molecule — chain of nodes + small vial alongside. Peptide wellness.
  'peptide-wellness': (
    <>
      <circle cx="5" cy="9" r="1.4" />
      <circle cx="9" cy="6" r="1.4" />
      <circle cx="13" cy="9" r="1.4" />
      <circle cx="9" cy="13" r="1.4" />
      <path d="M6.2 8.2 7.8 6.8M10.2 6.8l1.6 1.4M12 10.2l-2 2.2M8 10.4 7 12" />
      <rect x="16" y="9" width="4" height="9" rx="1.2" />
      <path d="M16 12h4" />
      <path d="M17 9V7.5h2V9" />
    </>
  ),

  // Acupuncture — three needles descending with a small leaf at base.
  acupuncture: (
    <>
      <path d="M7 3v12M12 5v10M17 3v12" />
      <path d="M6.4 14.4 7 16l.6-1.6M11.4 14.4l.6 1.6.6-1.6M16.4 14.4l.6 1.6.6-1.6" />
      <path d="M5 19c2-1 5-1 7 0 2-1 5-1 7 0" />
      <path d="M19.5 18.5c.5-1.5-.5-2.8-2-3 0 1.5 1 2.8 2 3z" />
    </>
  ),

  // IV bag with drip line and droplet. IV & infusion.
  'iv-infusion': (
    <>
      <path d="M9 3h6l-1 3v6a2 2 0 0 1-2 2h-0a2 2 0 0 1-2-2V6L9 3z" />
      <path d="M10 7h4" />
      <path d="M12 14v3" />
      <rect x="11" y="17" width="2" height="2" rx="0.4" />
      <path d="M12 19v2" />
    </>
  ),

  // Test tube and droplet. In-house lab.
  'in-house-lab': (
    <>
      <path d="M9 3h6M10 3v13a2.5 2.5 0 0 0 5 0V3" />
      <path d="M10 9.5h5" />
      <path d="M18.5 7.5c.6-1 2-1 2.6 0a1.5 1.5 0 1 1-2.6 0z" />
    </>
  ),
}
