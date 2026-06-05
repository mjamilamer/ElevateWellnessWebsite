import { describe, it, expect } from 'vitest'
import { generateCandidateSlots, isValidSlotStart, formatSlotLabel } from '@/lib/scheduling/slots'

// Far-future fixed dates so "now" never interferes.
// 2027-01-04 = Monday, 2027-01-09 = Saturday, 2027-01-10 = Sunday.
const NOW = new Date('2027-01-01T00:00:00Z')

function etParts(d: Date) {
  const p = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(d)
  const get = (t: string) => parseInt(p.find((x) => x.type === t)!.value, 10)
  return { hour: get('hour'), minute: get('minute') }
}

describe('generateCandidateSlots', () => {
  it('returns 30-minute slots on a weekday', () => {
    const slots = generateCandidateSlots({ dateFrom: '2027-01-04', dateTo: '2027-01-04', now: NOW })
    expect(slots.length).toBeGreaterThan(0)
    for (const s of slots) {
      expect(s.end.getTime() - s.start.getTime()).toBe(30 * 60 * 1000)
    }
  })

  it('returns no slots on weekends (Sat/Sun closed)', () => {
    const slots = generateCandidateSlots({ dateFrom: '2027-01-09', dateTo: '2027-01-10', now: NOW })
    expect(slots).toHaveLength(0)
  })

  it('morning filter returns only AM slots; afternoon only PM', () => {
    const morning = generateCandidateSlots({ dateFrom: '2027-01-04', dateTo: '2027-01-04', timeOfDay: 'morning', now: NOW })
    const afternoon = generateCandidateSlots({ dateFrom: '2027-01-04', dateTo: '2027-01-04', timeOfDay: 'afternoon', now: NOW })
    expect(morning.length).toBeGreaterThan(0)
    expect(afternoon.length).toBeGreaterThan(0)
    for (const s of morning) expect(etParts(s.start).hour).toBeLessThan(12)
    for (const s of afternoon) expect(etParts(s.start).hour).toBeGreaterThanOrEqual(12)
  })

  it('slot starts land on :00 or :30 boundaries', () => {
    const slots = generateCandidateSlots({ dateFrom: '2027-01-04', dateTo: '2027-01-04', now: NOW })
    for (const s of slots) expect([0, 30]).toContain(etParts(s.start).minute)
  })

  it('returns [] for an inverted date range', () => {
    expect(generateCandidateSlots({ dateFrom: '2027-01-10', dateTo: '2027-01-04', now: NOW })).toHaveLength(0)
  })

  it('honors the minimum lead time (no slots too soon)', () => {
    const slots = generateCandidateSlots({
      dateFrom: '2027-01-04',
      dateTo: '2027-01-04',
      now: new Date('2027-01-04T00:00:00Z'),
      minLeadHours: 48,
    })
    expect(slots).toHaveLength(0)
  })
})

describe('isValidSlotStart', () => {
  it('accepts a slot produced by the generator', () => {
    const slots = generateCandidateSlots({ dateFrom: '2027-01-04', dateTo: '2027-01-04', now: NOW })
    expect(isValidSlotStart(slots[0].start.toISOString())).toBe(true)
  })

  it('rejects an off-boundary time', () => {
    const slots = generateCandidateSlots({ dateFrom: '2027-01-04', dateTo: '2027-01-04', now: NOW })
    const offBoundary = new Date(slots[0].start.getTime() + 7 * 60 * 1000).toISOString()
    expect(isValidSlotStart(offBoundary)).toBe(false)
  })

  it('rejects a weekend time', () => {
    expect(isValidSlotStart('2027-01-09T15:00:00.000Z')).toBe(false)
  })

  it('rejects a non-date string', () => {
    expect(isValidSlotStart('not-a-date')).toBe(false)
  })
})

describe('formatSlotLabel', () => {
  it('formats a slot in ET with weekday and time', () => {
    const slots = generateCandidateSlots({ dateFrom: '2027-01-04', dateTo: '2027-01-04', now: NOW })
    const label = formatSlotLabel(slots[0].start)
    expect(label).toMatch(/Mon/)
    expect(label).toMatch(/AM|PM/)
  })
})
