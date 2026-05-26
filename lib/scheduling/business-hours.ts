/**
 * Business-hours utilities. Pulls hours from siteConfig.hours and converts
 * the human-readable strings ('8:00 AM - 5:00 PM' / 'Closed') into machine-usable
 * minute ranges. All times are interpreted in the practice time zone (ET).
 */

import { siteConfig } from '@/lib/config'

export const PRACTICE_TIMEZONE = 'America/New_York'

const DAY_KEYS = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
] as const

type DayKey = (typeof DAY_KEYS)[number]

export type HoursRange = {
  /** Minutes since 00:00 local */
  startMinutes: number
  endMinutes: number
}

/** Returns the open-hours range for a given JS day-of-week (0 = Sunday). */
export function hoursForDayOfWeek(dow: number): HoursRange | null {
  const key = DAY_KEYS[dow] as DayKey | undefined
  if (!key) return null
  const raw = siteConfig.hours[key]
  return parseHoursString(raw)
}

/** Parses '8:00 AM - 5:00 PM' → {startMinutes, endMinutes}. Returns null for 'Closed' or unparseable input. */
export function parseHoursString(raw: string): HoursRange | null {
  if (!raw || /closed/i.test(raw)) return null
  const parts = raw.split(/\s*[–-]\s*/)
  if (parts.length !== 2) return null
  const start = parseClockTime(parts[0])
  const end = parseClockTime(parts[1])
  if (start === null || end === null || end <= start) return null
  return { startMinutes: start, endMinutes: end }
}

function parseClockTime(s: string): number | null {
  const m = s.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i)
  if (!m) return null
  let h = parseInt(m[1], 10)
  const min = parseInt(m[2], 10)
  const meridiem = m[3].toUpperCase()
  if (h < 1 || h > 12 || min < 0 || min > 59) return null
  if (meridiem === 'AM') {
    if (h === 12) h = 0
  } else {
    if (h !== 12) h += 12
  }
  return h * 60 + min
}
