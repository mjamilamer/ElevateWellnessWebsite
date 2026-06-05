import { describe, it, expect } from 'vitest'
import {
  appointmentTentativeEmail,
  type AppointmentTentativeEmailData,
} from '@/lib/server/email-templates/appointment-tentative'

const base: AppointmentTentativeEmailData = {
  id: 'apt_test',
  serviceTitle: 'Orthopedic Services',
  patient: { name: 'Jane Patient', email: 'jane@example.com', phone: '+1 (201) 555-0142' },
  slotStart: new Date('2027-01-04T14:30:00Z'),
  slotEnd: new Date('2027-01-04T15:00:00Z'),
  doctorName: 'Dr. Kamil M. Amer, MD',
  doctorConfidence: 'definitive',
}

describe('appointmentTentativeEmail', () => {
  it('returns subject, html, and text with the key details', () => {
    const email = appointmentTentativeEmail(base)
    expect(email.subject).toContain('Jane Patient')
    expect(email.subject).toContain('Orthopedic Services')
    expect(email.html).toContain('Jane Patient')
    expect(email.html).toContain('jane@example.com')
    expect(email.html).toContain('Dr. Kamil M. Amer')
    expect(email.text).toContain('Jane Patient')
  })

  it('flags a suggested provider for manager review', () => {
    const email = appointmentTentativeEmail({ ...base, doctorConfidence: 'suggested' })
    expect(email.html.toLowerCase()).toContain('suggested')
  })

  it('renders a backup slot when provided', () => {
    const email = appointmentTentativeEmail({
      ...base,
      secondarySlotStart: new Date('2027-01-05T18:30:00Z'),
      secondarySlotEnd: new Date('2027-01-05T19:00:00Z'),
    })
    // Both the primary (Jan 4) and backup (Jan 5) dates should appear.
    expect(email.html).toContain('January 4')
    expect(email.html).toContain('January 5')
  })

  it('escapes HTML in user-provided fields (no injection)', () => {
    const email = appointmentTentativeEmail({
      ...base,
      patient: { ...base.patient, name: '<script>alert(1)</script>' },
    })
    expect(email.html).not.toContain('<script>alert(1)</script>')
  })
})
