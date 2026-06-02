'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { servicePages } from '@/lib/service-content'
import { isValidEmail, isValidPhone, sanitizeInput, containsPotentialPHI } from '@/lib/utils'

type TimeOfDay = 'any' | 'morning' | 'afternoon'
type Step = 'service' | 'window' | 'slot' | 'contact' | 'success'

type Slot = {
  startISO: string
  endISO: string
  label: string
}

type AvailabilityResponse = {
  doctor: { slug: string; name: string; confidence: 'definitive' | 'suggested' }
  slots: Slot[]
  calendarChecked: boolean
}

function todayISO(offsetDays = 0): string {
  const d = new Date()
  d.setDate(d.getDate() + offsetDays)
  return d.toISOString().slice(0, 10)
}

const STEPS: Array<{ id: Step; label: string }> = [
  { id: 'service', label: 'Service' },
  { id: 'window', label: 'When' },
  { id: 'slot', label: 'Time' },
  { id: 'contact', label: 'You' },
]

const OTHER_SERVICE = {
  slug: 'other',
  title: 'Other',
  cardDescription: "Something else? Tell us what you need and we'll point you to the right care.",
}

export function AppointmentRequestForm() {
  const [step, setStep] = useState<Step>('service')

  // Step 1
  const [service, setService] = useState<string>('')

  // Step 2
  const [dateFrom, setDateFrom] = useState<string>(todayISO(1))
  const [dateTo, setDateTo] = useState<string>(todayISO(14))
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('any')

  // Step 3
  const [availability, setAvailability] = useState<AvailabilityResponse | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null)
  const [loadingAvail, setLoadingAvail] = useState(false)
  const [availError, setAvailError] = useState<string | null>(null)

  // Step 4
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [reason, setReason] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submittedId, setSubmittedId] = useState<string | null>(null)

  const stepIndex = STEPS.findIndex((s) => s.id === step)
  const isOtherService = service === OTHER_SERVICE.slug
  const serviceTitle = useMemo(
    () =>
      service === OTHER_SERVICE.slug
        ? OTHER_SERVICE.title
        : servicePages.find((p) => p.slug === service)?.title ?? '',
    [service]
  )

  const goBack = () => {
    if (step === 'window') setStep('service')
    else if (step === 'slot') setStep('window')
    else if (step === 'contact') setStep('slot')
  }

  // Step 2 → Step 3: fetch availability
  const fetchAvailability = async () => {
    setLoadingAvail(true)
    setAvailError(null)
    try {
      const r = await fetch('/api/appointments/availability', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ service, dateFrom, dateTo, timeOfDay }),
      })
      const body = await r.json()
      if (!r.ok) {
        setAvailError(body.error || 'Failed to load availability')
        setLoadingAvail(false)
        return
      }
      setAvailability(body as AvailabilityResponse)
      setStep('slot')
    } catch (err) {
      setAvailError('Network error. Please try again.')
    } finally {
      setLoadingAvail(false)
    }
  }

  // Step 4 → submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}
    if (!name.trim()) newErrors.name = 'Name is required'
    if (!email.trim()) newErrors.email = 'Email is required'
    else if (!isValidEmail(email)) newErrors.email = 'Please enter a valid email'
    if (!phone.trim()) newErrors.phone = 'Phone is required'
    else if (!isValidPhone(phone)) newErrors.phone = 'Please enter a valid phone number'
    if (isOtherService && !reason.trim()) {
      newErrors.reason = 'Please tell us how we can help'
    } else if (reason && containsPotentialPHI(reason)) {
      newErrors.reason = 'Please do not include medical information here'
    }
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return
    if (!selectedSlot) return

    setSubmitting(true)
    setSubmitError(null)
    try {
      const r = await fetch('/api/appointments/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service,
          slotStartISO: selectedSlot.startISO,
          dateFrom,
          dateTo,
          timeOfDay,
          name: sanitizeInput(name),
          email: sanitizeInput(email),
          phone: sanitizeInput(phone),
          ...(reason && { reason: sanitizeInput(reason) }),
        }),
      })
      const body = await r.json()
      if (!r.ok) {
        setSubmitError(body.error || 'Failed to submit request')
        setSubmitting(false)
        return
      }
      setSubmittedId(body.id)
      setStep('success')
    } catch (err) {
      setSubmitError('Network error. Please try again or call our office.')
    } finally {
      setSubmitting(false)
    }
  }

  // Reset to start (after success)
  const startOver = () => {
    setStep('service')
    setService('')
    setAvailability(null)
    setSelectedSlot(null)
    setName('')
    setEmail('')
    setPhone('')
    setReason('')
    setErrors({})
    setSubmittedId(null)
  }

  return (
    <div className="surface-card overflow-hidden">
      {/* Stepper */}
      {step !== 'success' && (
        <div className="border-b border-neutral-200 bg-secondary-50/40 px-6 py-4">
          <ol className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs sm:text-sm">
            {STEPS.map((s, i) => {
              const isDone = i < stepIndex
              const isCurrent = s.id === step
              return (
                <li key={s.id} className="flex items-center gap-2">
                  <span
                    className={`inline-flex h-7 w-7 items-center justify-center rounded-full font-semibold ${
                      isCurrent
                        ? 'bg-primary-600 text-white'
                        : isDone
                        ? 'bg-primary-100 text-primary-700'
                        : 'bg-neutral-100 text-neutral-500'
                    }`}
                  >
                    {i + 1}
                  </span>
                  <span
                    className={`font-medium ${
                      isCurrent ? 'text-neutral-900' : 'text-neutral-500'
                    }`}
                  >
                    {s.label}
                  </span>
                  {i < STEPS.length - 1 && (
                    <span aria-hidden="true" className="text-neutral-300">
                      ›
                    </span>
                  )}
                </li>
              )
            })}
          </ol>
        </div>
      )}

      <div className="px-6 py-7 sm:px-8 sm:py-8">
        {/* STEP 1: Service */}
        {step === 'service' && (
          <div className="space-y-6">
            <div>
              <h3 className="font-display text-xl font-semibold text-neutral-900">
                What can we help you with?
              </h3>
              <p className="mt-1 text-sm text-neutral-600">
                Select the service that best matches your visit. Our team will confirm the
                right provider when scheduling.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {servicePages.map((s) => (
                <button
                  key={s.slug}
                  type="button"
                  onClick={() => {
                    setService(s.slug)
                    setStep('window')
                  }}
                  className={`text-left rounded-xl border p-4 transition-colors hover:border-primary-300 hover:bg-primary-50/40 ${
                    service === s.slug
                      ? 'border-primary-500 bg-primary-50/60'
                      : 'border-neutral-200 bg-white'
                  }`}
                >
                  <p className="font-semibold text-neutral-900">{s.title}</p>
                  <p className="mt-1 text-xs text-neutral-600 line-clamp-2">
                    {s.cardDescription}
                  </p>
                </button>
              ))}
              <button
                key={OTHER_SERVICE.slug}
                type="button"
                onClick={() => {
                  setService(OTHER_SERVICE.slug)
                  setStep('window')
                }}
                className={`text-left rounded-xl border p-4 transition-colors hover:border-primary-300 hover:bg-primary-50/40 ${
                  isOtherService
                    ? 'border-primary-500 bg-primary-50/60'
                    : 'border-neutral-200 bg-white'
                }`}
              >
                <p className="font-semibold text-neutral-900">{OTHER_SERVICE.title}</p>
                <p className="mt-1 text-xs text-neutral-600 line-clamp-2">
                  {OTHER_SERVICE.cardDescription}
                </p>
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Window */}
        {step === 'window' && (
          <div className="space-y-6">
            <div>
              <h3 className="font-display text-xl font-semibold text-neutral-900">
                When would you like to come in?
              </h3>
              <p className="mt-1 text-sm text-neutral-600">
                Selected: <strong>{serviceTitle}</strong>. Pick a date range and the time of
                day that works best.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="dateFrom" className="block text-sm font-semibold text-neutral-900 mb-2">
                  Earliest date
                </label>
                <input
                  type="date"
                  id="dateFrom"
                  value={dateFrom}
                  min={todayISO(0)}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="dateTo" className="block text-sm font-semibold text-neutral-900 mb-2">
                  Latest date
                </label>
                <input
                  type="date"
                  id="dateTo"
                  value={dateTo}
                  min={dateFrom}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <p className="block text-sm font-semibold text-neutral-900 mb-2">Time of day</p>
              <div className="grid grid-cols-3 gap-2">
                {(['any', 'morning', 'afternoon'] as const).map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setTimeOfDay(opt)}
                    className={`rounded-lg border px-3 py-2.5 text-sm font-semibold capitalize transition-colors ${
                      timeOfDay === opt
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-neutral-200 bg-white text-neutral-700 hover:border-primary-300'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
            {availError && (
              <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800">
                {availError}
              </div>
            )}
            <div className="flex items-center justify-between gap-3 pt-2">
              <button type="button" onClick={goBack} className="text-sm font-semibold text-neutral-600 hover:text-neutral-900">
                ← Back
              </button>
              <button
                type="button"
                onClick={fetchAvailability}
                disabled={loadingAvail || !dateFrom || !dateTo}
                className="btn-primary"
              >
                {loadingAvail ? 'Finding times...' : 'Find available times'}
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Slot */}
        {step === 'slot' && availability && (
          <div className="space-y-6">
            <div>
              <h3 className="font-display text-xl font-semibold text-neutral-900">
                Pick a time that works
              </h3>
              <p className="mt-1 text-sm text-neutral-600">
                Suggested with{' '}
                <strong>{availability.doctor.name}</strong>
                {availability.doctor.confidence === 'suggested' && (
                  <span className="text-neutral-500"> (subject to provider confirmation)</span>
                )}
                .
              </p>
            </div>

            <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-3 text-sm text-yellow-900">
              <strong>Tentative —</strong> all times are subject to confirmation by our team. We&apos;ll
              email you within 1 business day if any adjustment is needed.
            </div>

            {availability.slots.length === 0 ? (
              <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 text-sm text-neutral-700">
                <p>No times available in that window.</p>
                <p className="mt-2">Try widening your date range, or call our office for help.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {availability.slots.map((s) => (
                  <button
                    key={s.startISO}
                    type="button"
                    onClick={() => {
                      setSelectedSlot(s)
                      setStep('contact')
                    }}
                    className={`text-left rounded-xl border p-4 transition-colors hover:border-primary-300 hover:bg-primary-50/40 ${
                      selectedSlot?.startISO === s.startISO
                        ? 'border-primary-500 bg-primary-50/60'
                        : 'border-neutral-200 bg-white'
                    }`}
                  >
                    <p className="font-semibold text-neutral-900">{s.label}</p>
                    <p className="mt-1 text-xs text-neutral-500">30-minute appointment</p>
                  </button>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between gap-3 pt-2">
              <button type="button" onClick={goBack} className="text-sm font-semibold text-neutral-600 hover:text-neutral-900">
                ← Back
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Contact */}
        {step === 'contact' && selectedSlot && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h3 className="font-display text-xl font-semibold text-neutral-900">
                Last step — your contact info
              </h3>
              <p className="mt-1 text-sm text-neutral-600">
                Holding <strong>{selectedSlot.label}</strong> for{' '}
                <strong>{serviceTitle}</strong>. Our team will confirm or adjust.
              </p>
            </div>

            <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-3 text-sm text-yellow-900">
              <strong>Important:</strong> Please do not include medical history, diagnoses, or
              prescriptions in this form. For urgent medical issues, call 911.
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="name" className="block text-sm font-semibold text-neutral-900 mb-2">
                  Full Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  aria-invalid={!!errors.name}
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-neutral-900 mb-2">
                  Email <span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  aria-invalid={!!errors.email}
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-neutral-900 mb-2">
                  Phone <span className="text-red-600">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(000) 000-0000"
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  aria-invalid={!!errors.phone}
                />
                {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="reason" className="block text-sm font-semibold text-neutral-900 mb-2">
                  {isOtherService ? (
                    <>
                      How can we help? <span className="text-red-600">*</span>
                    </>
                  ) : (
                    <>
                      Brief reason for visit{' '}
                      <span className="text-neutral-500 font-normal">(optional, no medical details)</span>
                    </>
                  )}
                </label>
                <textarea
                  id="reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  rows={3}
                  required={isOtherService}
                  placeholder={
                    isOtherService
                      ? 'Tell us what you need — a question, a service not listed, or anything else (no medical details)'
                      : 'e.g. follow-up, new evaluation, recurring issue'
                  }
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  aria-invalid={!!errors.reason}
                />
                {errors.reason && <p className="mt-1 text-sm text-red-600">{errors.reason}</p>}
              </div>
            </div>

            {submitError && (
              <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800">
                {submitError}
              </div>
            )}

            <div className="flex items-center justify-between gap-3 pt-2">
              <button type="button" onClick={goBack} className="text-sm font-semibold text-neutral-600 hover:text-neutral-900">
                ← Back
              </button>
              <button type="submit" disabled={submitting} className="btn-primary">
                {submitting ? 'Sending request...' : 'Submit request'}
              </button>
            </div>
          </form>
        )}

        {/* STEP 5: Success */}
        {step === 'success' && (
          <div className="space-y-5 text-center">
            <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-700">
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h3 className="font-display text-xl font-semibold text-neutral-900">
                Request received
              </h3>
              <p className="mx-auto mt-2 max-w-md text-sm text-neutral-600">
                Our team will confirm your appointment within <strong>1 business day</strong>. The
                time you selected is tentative and may be adjusted to fit our schedule.
                You&apos;ll receive a calendar invite once confirmed.
              </p>
              {submittedId && (
                <p className="mt-2 text-xs text-neutral-500">
                  Reference: <code className="font-mono">{submittedId}</code>
                </p>
              )}
            </div>
            <div className="flex flex-col items-center justify-center gap-3 pt-2 sm:flex-row">
              <button type="button" onClick={startOver} className="btn-secondary">
                Book another appointment
              </button>
              <Link href="/" className="text-sm font-semibold text-primary-700 hover:underline">
                Return home →
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
