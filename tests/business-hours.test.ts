import { describe, it, expect } from 'vitest'
import { parseHoursString, hoursForDayOfWeek } from '@/lib/scheduling/business-hours'

describe('parseHoursString', () => {
  it('parses a standard 9–5 range to minute offsets', () => {
    expect(parseHoursString('9:00 AM - 5:00 PM')).toEqual({ startMinutes: 540, endMinutes: 1020 })
  })

  it('handles 12-hour AM/PM boundaries correctly', () => {
    expect(parseHoursString('12:00 AM - 12:00 PM')).toEqual({ startMinutes: 0, endMinutes: 720 })
  })

  it('returns null for "Closed"', () => {
    expect(parseHoursString('Closed')).toBeNull()
  })

  it('returns null for unparseable input', () => {
    expect(parseHoursString('whenever')).toBeNull()
    expect(parseHoursString('')).toBeNull()
  })

  it('returns null when close is not after open', () => {
    expect(parseHoursString('5:00 PM - 9:00 AM')).toBeNull()
  })
})

describe('hoursForDayOfWeek', () => {
  it('treats weekdays as open and weekends as closed', () => {
    // 0 = Sunday, 6 = Saturday
    expect(hoursForDayOfWeek(0)).toBeNull() // Sunday
    expect(hoursForDayOfWeek(6)).toBeNull() // Saturday
    expect(hoursForDayOfWeek(1)).not.toBeNull() // Monday
    expect(hoursForDayOfWeek(5)).not.toBeNull() // Friday
  })
})
