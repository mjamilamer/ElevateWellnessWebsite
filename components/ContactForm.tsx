'use client'

import { useState } from 'react'
import { isValidEmail, isValidPhone, sanitizeInput, containsPotentialPHI } from '@/lib/utils'

interface ContactFormProps {
  formType?: 'contact' | 'appointment'
}

export function ContactForm({ formType = 'contact' }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: '',
    visitType: 'new_patient',
    message: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!isValidPhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number'
    }

    if (formType === 'appointment' && !formData.preferredDate) {
      newErrors.preferredDate = 'Preferred date is required'
    }

    // Check for potential PHI in message
    if (formData.message && containsPotentialPHI(formData.message)) {
      newErrors.message = 'Please do not include medical information in this form'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) return

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const endpoint = formType === 'appointment' 
        ? '/api/appointments/create' 
        : '/api/contact'

      const payload = {
        name: sanitizeInput(formData.name),
        email: sanitizeInput(formData.email),
        phone: sanitizeInput(formData.phone),
        ...(formType === 'appointment' && {
          preferred_slot: `${formData.preferredDate}T${formData.preferredTime || '09:00'}:00`,
          visit_type: formData.visitType,
          source: 'manual_form',
        }),
        ...(formData.message && { message: sanitizeInput(formData.message) }),
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({
          name: '',
          email: '',
          phone: '',
          preferredDate: '',
          preferredTime: '',
          visitType: 'new_patient',
          message: '',
        })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Notice */}
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-sm text-yellow-800">
          <strong>Important:</strong> Please do not include medical information in this form. 
          For urgent medical issues, call 911.
        </p>
      </div>

      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-neutral-900 mb-2">
          Full Name <span className="text-red-600">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {errors.name && (
          <p id="name-error" className="mt-1 text-sm text-red-600">
            {errors.name}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-neutral-900 mb-2">
          Email <span className="text-red-600">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <p id="email-error" className="mt-1 text-sm text-red-600">
            {errors.email}
          </p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-semibold text-neutral-900 mb-2">
          Phone Number <span className="text-red-600">*</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="(000) 000-0000"
          className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? 'phone-error' : undefined}
        />
        {errors.phone && (
          <p id="phone-error" className="mt-1 text-sm text-red-600">
            {errors.phone}
          </p>
        )}
      </div>

      {/* Appointment-specific fields */}
      {formType === 'appointment' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Preferred Date */}
            <div>
              <label htmlFor="preferredDate" className="block text-sm font-semibold text-neutral-900 mb-2">
                Preferred Date <span className="text-red-600">*</span>
              </label>
              <input
                type="date"
                id="preferredDate"
                name="preferredDate"
                value={formData.preferredDate}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                aria-invalid={!!errors.preferredDate}
                aria-describedby={errors.preferredDate ? 'date-error' : undefined}
              />
              {errors.preferredDate && (
                <p id="date-error" className="mt-1 text-sm text-red-600">
                  {errors.preferredDate}
                </p>
              )}
            </div>

            {/* Preferred Time */}
            <div>
              <label htmlFor="preferredTime" className="block text-sm font-semibold text-neutral-900 mb-2">
                Preferred Time
              </label>
              <input
                type="time"
                id="preferredTime"
                name="preferredTime"
                value={formData.preferredTime}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Visit Type */}
          <div>
            <label htmlFor="visitType" className="block text-sm font-semibold text-neutral-900 mb-2">
              Visit Type <span className="text-red-600">*</span>
            </label>
            <select
              id="visitType"
              name="visitType"
              value={formData.visitType}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="new_patient">New Patient</option>
              <option value="follow_up">Follow-up Visit</option>
              <option value="consultation">Consultation</option>
            </select>
          </div>
        </>
      )}

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-neutral-900 mb-2">
          {formType === 'appointment' ? 'Scheduling Question (Optional)' : 'Message'}
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {errors.message && (
          <p id="message-error" className="mt-1 text-sm text-red-600">
            {errors.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full"
      >
        {isSubmitting ? 'Submitting...' : formType === 'appointment' ? 'Request Appointment' : 'Send Message'}
      </button>

      {/* Status Messages */}
      {submitStatus === 'success' && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-800">
            {formType === 'appointment'
              ? 'Thank you! We\'ve received your appointment request and will contact you shortly to confirm.'
              : 'Thank you! We\'ve received your message and will respond soon.'}
          </p>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-800">
            Sorry, there was an error submitting your request. Please try again or call us directly.
          </p>
        </div>
      )}
    </form>
  )
}
