'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { siteConfig } from '@/lib/config'
import { servicePages } from '@/lib/service-content'
import { isValidEmail, isValidPhone, sanitizeInput, containsPotentialPHI } from '@/lib/utils'

type TimeOfDay = 'any' | 'morning' | 'afternoon'
type ContactWindow = 'morning' | 'afternoon' | 'evening'
type ContactMethod = 'phone' | 'email' | 'text'
type DoctorSlug = 'dr-kamil-amer' | 'dr-kamal-amer'
type Step = 'service' | 'window' | 'slot' | 'contact' | 'success'

const NO_PREFERENCE = 'no-preference'

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
  // Provider preference — only used for the "Other" service.
  const [doctorPref, setDoctorPref] = useState<DoctorSlug | typeof NO_PREFERENCE>(NO_PREFERENCE)

  // Step 3
  const [availability, setAvailability] = useState<AvailabilityResponse | null>(null)
  const [primarySlot, setPrimarySlot] = useState<Slot | null>(null)
  const [backupSlot, setBackupSlot] = useState<Slot | null>(null)
  const [loadingAvail, setLoadingAvail] = useState(false)
  const [availError, setAvailError] = useState<string | null>(null)

  // Step 4
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [contactWindow, setContactWindow] = useState<ContactWindow | ''>('')
  const [preferredContactMethod, setPreferredContactMethod] = useState<ContactMethod>('phone')
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

  // 1st tap → primary. 2nd tap (different slot) → backup. Tapping a chosen slot
  // clears it; tapping the primary promotes the backup.
  const toggleSlot = (slot: Slot) => {
    if (primarySlot?.startISO === slot.startISO) {
      setPrimarySlot(backupSlot)
      setBackupSlot(null)
      return
    }
    if (backupSlot?.startISO === slot.startISO) {
      setBackupSlot(null)
      return
    }
    if (!primarySlot) {
      setPrimarySlot(slot)
    } else if (!backupSlot) {
      setBackupSlot(slot)
    } else {
      // Both filled — replace the backup with the newest pick.
      setBackupSlot(slot)
    }
  }

  const slotRole = (slot: Slot): '1st' | '2nd' | null => {
    if (primarySlot?.startISO === slot.startISO) return '1st'
    if (backupSlot?.startISO === slot.startISO) return '2nd'
    return null
  }

  // Step 2 → Step 3: fetch availability
  const fetchAvailability = async () => {
    setLoadingAvail(true)
    setAvailError(null)
    setPrimarySlot(null)
    setBackupSlot(null)
    try {
      const doctorSlug =
        isOtherService && doctorPref !== NO_PREFERENCE ? doctorPref : undefined
      const r = await fetch('/api/appointments/availability', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ service, dateFrom, dateTo, timeOfDay, ...(doctorSlug && { doctorSlug }) }),
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
    if (!firstName.trim()) newErrors.firstName = 'First name is required'
    if (!lastName.trim()) newErrors.lastName = 'Last name is required'
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
    if (!primarySlot) return

    const doctorSlug =
      isOtherService && doctorPref !== NO_PREFERENCE ? doctorPref : undefined

    setSubmitting(true)
    setSubmitError(null)
    try {
      const r = await fetch('/api/appointments/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service,
          slotStartISO: primarySlot.startISO,
          ...(backupSlot && { secondarySlotStartISO: backupSlot.startISO }),
          dateFrom,
          dateTo,
          timeOfDay,
          ...(doctorSlug && { doctorSlug }),
          firstName: sanitizeInput(firstName),
          lastName: sanitizeInput(lastName),
          email: sanitizeInput(email),
          phone: sanitizeInput(phone),
          ...(contactWindow && { contactWindow }),
          preferredContactMethod,
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
    setDoctorPref(NO_PREFERENCE)
    setAvailability(null)
    setPrimarySlot(null)
    setBackupSlot(null)
    setFirstName('')
    setLastName('')
    setEmail('')
    setPhone('')
    setContactWindow('')
    setPreferredContactMethod('phone')
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

            {isOtherService && (
              <div>
                <p className="block text-sm font-semibold text-neutral-900 mb-2">
                  Provider preference{' '}
                  <span className="text-neutral-500 font-normal">(optional)</span>
                </p>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                  {siteConfig.team.physicians.map((p) => (
                    <button
                      key={p.slug}
                      type="button"
                      onClick={() => setDoctorPref(p.slug)}
                      className={`text-left rounded-lg border px-3 py-2.5 text-sm transition-colors ${
                        doctorPref === p.slug
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : 'border-neutral-200 bg-white text-neutral-700 hover:border-primary-300'
                      }`}
                    >
                      <span className="block font-semibold">{p.name}</span>
                      <span className="mt-0.5 block text-xs text-neutral-500">{p.title}</span>
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setDoctorPref(NO_PREFERENCE)}
                    className={`text-left rounded-lg border px-3 py-2.5 text-sm transition-colors ${
                      doctorPref === NO_PREFERENCE
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-neutral-200 bg-white text-neutral-700 hover:border-primary-300'
                    }`}
                  >
                    <span className="block font-semibold">No preference</span>
                    <span className="mt-0.5 block text-xs text-neutral-500">
                      We&apos;ll route your request
                    </span>
                  </button>
                </div>
              </div>
            )}

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
                Pick your preferred times
              </h3>
              <p className="mt-1 text-sm text-neutral-600">
                {availability.doctor.slug === 'other' ? (
                  <>Times shown for <strong>{availability.doctor.name}</strong>.</>
                ) : (
                  <>
                    Suggested with <strong>{availability.doctor.name}</strong>
                    {availability.doctor.confidence === 'suggested' && (
                      <span className="text-neutral-500"> (subject to provider confirmation)</span>
                    )}
                    .
                  </>
                )}{' '}
                Choose a <strong>1st choice</strong>, then optionally a <strong>2nd choice</strong> backup.
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
              <>
                <div className="flex flex-wrap items-center gap-2 text-sm">
                  <span className="font-semibold text-neutral-900">Selected:</span>
                  {primarySlot ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-100 px-3 py-1 font-medium text-primary-800">
                      <span className="text-[10px] font-bold uppercase tracking-wide">1st</span>
                      {primarySlot.label}
                    </span>
                  ) : (
                    <span className="text-neutral-500">Tap a time to set your 1st choice</span>
                  )}
                  {backupSlot && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary-100 px-3 py-1 font-medium text-secondary-900">
                      <span className="text-[10px] font-bold uppercase tracking-wide">2nd</span>
                      {backupSlot.label}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {availability.slots.map((s) => {
                    const role = slotRole(s)
                    return (
                      <button
                        key={s.startISO}
                        type="button"
                        onClick={() => toggleSlot(s)}
                        aria-pressed={role !== null}
                        className={`relative text-left rounded-xl border p-4 transition-colors hover:border-primary-300 hover:bg-primary-50/40 ${
                          role
                            ? 'border-primary-500 bg-primary-50/60'
                            : 'border-neutral-200 bg-white'
                        }`}
                      >
                        {role && (
                          <span
                            className={`absolute right-3 top-3 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                              role === '1st'
                                ? 'bg-primary-600 text-white'
                                : 'bg-secondary-600 text-white'
                            }`}
                          >
                            {role === '1st' ? '1st choice' : '2nd choice'}
                          </span>
                        )}
                        <p className="font-semibold text-neutral-900">{s.label}</p>
                        <p className="mt-1 text-xs text-neutral-500">30-minute appointment</p>
                      </button>
                    )
                  })}
                </div>
              </>
            )}

            <div className="flex items-center justify-between gap-3 pt-2">
              <button type="button" onClick={goBack} className="text-sm font-semibold text-neutral-600 hover:text-neutral-900">
                ← Back
              </button>
              <button
                type="button"
                onClick={() => setStep('contact')}
                disabled={!primarySlot}
                className="btn-primary"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Contact */}
        {step === 'contact' && primarySlot && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h3 className="font-display text-xl font-semibold text-neutral-900">
                Last step — your contact info
              </h3>
              <p className="mt-1 text-sm text-neutral-600">
                Holding <strong>{primarySlot.label}</strong>
                {backupSlot && (
                  <> (backup <strong>{backupSlot.label}</strong>)</>
                )}{' '}
                for <strong>{serviceTitle}</strong>
                {availability && availability.doctor.slug !== 'other' && (
                  <> with <strong>{availability.doctor.name}</strong></>
                )}
                {availability && availability.doctor.slug === 'other' && doctorPref !== NO_PREFERENCE && (
                  <> with <strong>{availability.doctor.name}</strong></>
                )}
                . Our team will confirm or adjust.
              </p>
            </div>

            <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-3 text-sm text-yellow-900">
              <strong>Important:</strong> Please do not include medical history, diagnoses, or
              prescriptions in this form. For urgent medical issues, call 911.
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="firstName" className="block text-sm font-semibold text-neutral-900 mb-2">
                  First name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  id="firstName"
                  autoComplete="given-name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  aria-invalid={!!errors.firstName}
                />
                {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-semibold text-neutral-900 mb-2">
                  Last name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  id="lastName"
                  autoComplete="family-name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  aria-invalid={!!errors.lastName}
                />
                {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-neutral-900 mb-2">
                  Email <span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  autoComplete="email"
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
                  autoComplete="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(000) 000-0000"
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  aria-invalid={!!errors.phone}
                />
                {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
              </div>
              <div>
                <p className="block text-sm font-semibold text-neutral-900 mb-2">
                  Best time to reach you{' '}
                  <span className="text-neutral-500 font-normal">(optional)</span>
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {(['morning', 'afternoon', 'evening'] as const).map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setContactWindow((prev) => (prev === opt ? '' : opt))}
                      className={`rounded-lg border px-2 py-2.5 text-sm font-semibold capitalize transition-colors ${
                        contactWindow === opt
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : 'border-neutral-200 bg-white text-neutral-700 hover:border-primary-300'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="block text-sm font-semibold text-neutral-900 mb-2">
                  Preferred contact method
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {(['phone', 'email', 'text'] as const).map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setPreferredContactMethod(opt)}
                      className={`rounded-lg border px-2 py-2.5 text-sm font-semibold capitalize transition-colors ${
                        preferredContactMethod === opt
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : 'border-neutral-200 bg-white text-neutral-700 hover:border-primary-300'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
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
                Our team will reach out within <strong>1 business day</strong> to confirm your
                appointment. The time you selected is tentative and may be adjusted to fit our
                schedule{backupSlot ? '; your backup time gives us a second option' : ''}.
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
