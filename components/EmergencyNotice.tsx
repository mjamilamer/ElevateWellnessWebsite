/**
 * Red "for medical emergencies" banner. Shared by the Contact and Appointments
 * pages. `bordered` renders a contained card variant (used inside a page
 * section) instead of the full-bleed section background.
 */
export function EmergencyNotice({ bordered = false }: { bordered?: boolean }) {
  const content = (
    <div className="max-w-3xl mx-auto text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-600 mb-4">
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-red-900 mb-4">For Medical Emergencies</h2>
      <p className="text-lg text-red-800 mb-6">
        If you are experiencing a medical emergency, please call <strong>911</strong> or go to your
        nearest emergency room immediately. Do not use this form for urgent medical situations.
      </p>
      <p className="text-sm text-red-700">
        Examples of emergencies include: severe trauma, uncontrolled bleeding, loss of
        consciousness, chest pain, difficulty breathing, or signs of stroke.
      </p>
    </div>
  )

  if (bordered) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-8">{content}</div>
    )
  }

  return (
    <section className="section-padding bg-red-50">
      <div className="container-custom">{content}</div>
    </section>
  )
}
