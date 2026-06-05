import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock the side-effecting modules BEFORE importing the route. No real email is
// ever sent and the Google Calendar client is never constructed.
vi.mock('@/lib/server/email', () => ({
  mailConfigured: vi.fn(() => true),
  mailRecipient: vi.fn(() => 'info@elevatewellnessnj.com'),
  sendEmail: vi.fn(async () => ({ ok: true, id: 'test-email-id' })),
}))
vi.mock('@/lib/server/google-calendar', () => ({
  schedulerCalendarEnabled: vi.fn(() => false),
  createTentativeEvent: vi.fn(async () => ({ id: 'evt_test', htmlLink: 'https://calendar/evt_test' })),
}))

import { POST } from '@/app/api/appointments/request/route'
import { mailConfigured, sendEmail } from '@/lib/server/email'
import { generateCandidateSlots } from '@/lib/scheduling/slots'

/** A guaranteed-valid slot start (open weekday, on-boundary, in the booking window). */
function validSlotISO(): string {
  const slots = generateCandidateSlots({
    dateFrom: '2027-01-04', // Monday
    dateTo: '2027-01-08', // Friday
    now: new Date('2027-01-01T00:00:00Z'),
  })
  return slots[0].start.toISOString()
}

function makeRequest(body: unknown): Request {
  return new Request('http://localhost/api/appointments/request', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  })
}

const validBody = () => ({
  service: 'orthopedic-services',
  slotStartISO: validSlotISO(),
  firstName: 'Test',
  lastName: 'Patient',
  email: 'test@example.com',
  phone: '5555550100',
})

describe('POST /api/appointments/request', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(mailConfigured).mockReturnValue(true)
    vi.mocked(sendEmail).mockResolvedValue({ ok: true, id: 'test-email-id' })
  })

  it('accepts a valid request, sends one email, and returns 201', async () => {
    const res = await POST(makeRequest(validBody()))
    expect(res.status).toBe(201)
    const body = await res.json()
    expect(typeof body.id).toBe('string')
    expect(sendEmail).toHaveBeenCalledTimes(1)
  })

  it('returns 503 when email transport is not configured', async () => {
    vi.mocked(mailConfigured).mockReturnValue(false)
    const res = await POST(makeRequest(validBody()))
    expect(res.status).toBe(503)
    expect(sendEmail).not.toHaveBeenCalled()
  })

  it('returns 400 for invalid input (missing first name)', async () => {
    const body = validBody() as Record<string, unknown>
    delete body.firstName
    const res = await POST(makeRequest(body))
    expect(res.status).toBe(400)
  })

  it('returns 400 when the chosen time is outside booking hours', async () => {
    const res = await POST(makeRequest({ ...validBody(), slotStartISO: '2027-01-09T15:00:00.000Z' })) // Saturday
    expect(res.status).toBe(400)
    expect(sendEmail).not.toHaveBeenCalled()
  })

  it('rejects a request that includes medical information in the reason', async () => {
    const res = await POST(makeRequest({ ...validBody(), reason: 'I need a new prescription for my medication' }))
    expect(res.status).toBe(400)
  })
})
