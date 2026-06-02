/**
 * Slot generation: produces candidate appointment start times within a date
 * window, filtered by business hours, time-of-day preference, and a minimum
 * lead time (no slots in the past or too soon).
 *
 * All Date objects in/out are UTC. The window dates are interpreted as
 * calendar days in the practice time zone (ET).
 */

import { fromZonedTime, toZonedTime } from 'date-fns-tz'
import { hoursForDayOfWeek, PRACTICE_TIMEZONE } from './business-hours'

export type TimeOfDay = 'any' | 'morning' | 'afternoon'

export type SlotCandidate = {
  /** UTC */
  start: Date
  /** UTC */
  end: Date
}

const DEFAULT_SLOT_MINUTES = 30
const DEFAULT_MIN_LEAD_HOURS = 24

/**
 * Bookable window (ET), decoupled from the displayed office hours. Office hours
 * are 9-5; bookings run 9:30 AM through 4:30 PM start times (the last 30-min
 * appointment ends at 5:00 PM), leaving a buffer at open and close.
 */
const BOOKING_FIRST_START_MIN = 9 * 60 + 30 // 9:30 AM
const BOOKING_END_MIN = 17 * 60 // 5:00 PM — last valid 30-min start is 4:30 PM

export type SlotGenerationOptions = {
  /** ISO date YYYY-MM-DD, inclusive, interpreted in ET */
  dateFrom: string
  /** ISO date YYYY-MM-DD, inclusive, interpreted in ET */
  dateTo: string
  timeOfDay?: TimeOfDay
  slotMinutes?: number
  /** Earliest "now" reference (UTC). Slots earlier than now + leadHours are filtered out. */
  now?: Date
  minLeadHours?: number
}

export function generateCandidateSlots(opts: SlotGenerationOptions): SlotCandidate[] {
  const slotMinutes = opts.slotMinutes ?? DEFAULT_SLOT_MINUTES
  const timeOfDay = opts.timeOfDay ?? 'any'
  const now = opts.now ?? new Date()
  const leadHours = opts.minLeadHours ?? DEFAULT_MIN_LEAD_HOURS
  const earliestAllowedUtc = new Date(now.getTime() + leadHours * 60 * 60 * 1000)

  const fromDate = parseDateOnly(opts.dateFrom)
  const toDate = parseDateOnly(opts.dateTo)
  if (!fromDate || !toDate || toDate < fromDate) return []

  const results: SlotCandidate[] = []
  const cursor = new Date(fromDate)

  while (cursor <= toDate) {
    // Use the day's hours only to decide whether the practice is open (null =
    // Closed). The actual slot times come from the fixed booking window so the
    // bookable range stays 9:30 AM-4:30 PM regardless of displayed open/close.
    const dow = cursor.getUTCDay() // we constructed cursor as midnight UTC of the date
    const isOpen = hoursForDayOfWeek(dow) !== null
    if (isOpen) {
      const [todStartMin, todEndMin] = timeOfDayWindow(timeOfDay, BOOKING_FIRST_START_MIN, BOOKING_END_MIN)
      let startMin = todStartMin
      const endMin = todEndMin
      while (startMin + slotMinutes <= endMin) {
        // Convert local ET start to UTC
        const isoLocal = `${formatDateISO(cursor)}T${formatTimeISO(startMin)}:00`
        const startUtc = fromZonedTime(isoLocal, PRACTICE_TIMEZONE)
        const endUtc = new Date(startUtc.getTime() + slotMinutes * 60 * 1000)
        if (startUtc >= earliestAllowedUtc) {
          results.push({ start: startUtc, end: endUtc })
        }
        startMin += slotMinutes
      }
    }
    cursor.setUTCDate(cursor.getUTCDate() + 1)
  }

  return results
}

function parseDateOnly(s: string): Date | null {
  const m = s.match(/^(\d{4})-(\d{2})-(\d{2})$/)
  if (!m) return null
  const d = new Date(Date.UTC(parseInt(m[1], 10), parseInt(m[2], 10) - 1, parseInt(m[3], 10)))
  return Number.isNaN(d.getTime()) ? null : d
}

function formatDateISO(d: Date): string {
  const y = d.getUTCFullYear()
  const m = String(d.getUTCMonth() + 1).padStart(2, '0')
  const dd = String(d.getUTCDate()).padStart(2, '0')
  return `${y}-${m}-${dd}`
}

function formatTimeISO(totalMinutes: number): string {
  const h = Math.floor(totalMinutes / 60)
  const m = totalMinutes % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}

function timeOfDayWindow(
  tod: TimeOfDay,
  dayStart: number,
  dayEnd: number
): [number, number] {
  // Morning = before noon (12:00). Afternoon = noon onward.
  switch (tod) {
    case 'morning':
      return [dayStart, Math.min(dayEnd, 12 * 60)]
    case 'afternoon':
      return [Math.max(dayStart, 12 * 60), dayEnd]
    case 'any':
    default:
      return [dayStart, dayEnd]
  }
}

/**
 * Pretty-print a slot in ET for patient-facing display.
 * E.g. "Mon Jun 16 · 10:30 AM"
 */
export function formatSlotLabel(start: Date): string {
  const zoned = toZonedTime(start, PRACTICE_TIMEZONE)
  const date = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    timeZone: PRACTICE_TIMEZONE,
  }).format(zoned)
  const time = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: PRACTICE_TIMEZONE,
  }).format(zoned)
  return `${date} · ${time}`
}
