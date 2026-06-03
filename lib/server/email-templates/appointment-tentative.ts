/**
 * Email template for appointment requests. Sent to info@ as soon as a patient
 * submits the form on /appointments. Editing rules: inline styles, table
 * layout, always escape user content.
 *
 * In email-only mode (the default) there is no Calendar event, so the template
 * adapts its call-to-action and next-steps. When the Calendar scheduler is
 * enabled it includes a deep-link to the tentative event instead.
 */

import { siteConfig } from '@/lib/config'

const BRAND_BRONZE = '#9a6a3c'
const BRAND_BRONZE_DARK = '#3f2916'
const BG_CARD = '#ffffff'
const BG_PAGE = '#f6f8fa'
const BORDER = '#dde3ec'
const TEXT = '#1e293b'
const MUTED = '#64748b'
const ACCENT_YELLOW = '#fbbf24'

export type AppointmentTentativeEmailData = {
  id: string
  serviceTitle: string
  patient: {
    name: string
    email: string
    phone: string
    contactWindow?: 'morning' | 'afternoon' | 'evening' | null
    preferredContactMethod?: 'phone' | 'email' | 'text' | null
  }
  slotStart: Date
  slotEnd: Date
  secondarySlotStart?: Date | null
  secondarySlotEnd?: Date | null
  doctorName: string
  /** 'definitive' — auto-added to Calendar event; 'suggested' — manager picks; null — none */
  doctorConfidence: 'definitive' | 'suggested' | null
  reason?: string | null
  calendarEventLink?: string | null
  requestedWindow?: {
    dateFrom: string | null
    dateTo: string | null
    timeOfDay: 'any' | 'morning' | 'afternoon' | null
  } | null
  submittedAt?: Date
}

function formatRequestedWindow(
  window: AppointmentTentativeEmailData['requestedWindow']
): string | null {
  if (!window) return null
  const { dateFrom, dateTo, timeOfDay } = window
  const fmt = (d: string) =>
    new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      timeZone: 'America/New_York',
    }).format(new Date(`${d}T12:00:00Z`))
  let range: string | null = null
  if (dateFrom && dateTo) range = dateFrom === dateTo ? fmt(dateFrom) : `${fmt(dateFrom)} – ${fmt(dateTo)}`
  else if (dateFrom) range = `From ${fmt(dateFrom)}`
  else if (dateTo) range = `Through ${fmt(dateTo)}`
  const todLabel =
    timeOfDay === 'morning'
      ? 'Mornings'
      : timeOfDay === 'afternoon'
      ? 'Afternoons'
      : timeOfDay === 'any'
      ? 'Any time of day'
      : null
  const parts = [range, todLabel].filter((p): p is string => Boolean(p))
  return parts.length ? parts.join(' · ') : null
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function formatSlot(start: Date, end: Date): string {
  const dateLabel = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'America/New_York',
  }).format(start)
  const startLabel = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'America/New_York',
  }).format(start)
  const endLabel = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'America/New_York',
  }).format(end)
  return `${dateLabel}, ${startLabel}–${endLabel} ET`
}

export function appointmentTentativeEmail(data: AppointmentTentativeEmailData) {
  const submittedAt = (data.submittedAt ?? new Date()).toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'America/New_York',
  })

  const slotLabel = formatSlot(data.slotStart, data.slotEnd)
  const backupSlotLabel =
    data.secondarySlotStart && data.secondarySlotEnd
      ? formatSlot(data.secondarySlotStart, data.secondarySlotEnd)
      : null
  const requestedWindowLabel = formatRequestedWindow(data.requestedWindow)
  const titleCase = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
  const contactWindowLabel = data.patient.contactWindow
    ? `${titleCase(data.patient.contactWindow)}s`
    : null
  const preferredMethodLabel = data.patient.preferredContactMethod
    ? titleCase(data.patient.preferredContactMethod)
    : null
  const emailOnly = !data.calendarEventLink
  const confidenceLabel =
    data.doctorConfidence === 'definitive'
      ? `${data.doctorName} (auto-assigned)`
      : data.doctorConfidence === 'suggested'
      ? `${data.doctorName ? data.doctorName + ' ' : ''}(suggested — please confirm or reassign)`
      : 'No doctor assigned — please assign on review'

  const subject = `[Action needed] Appointment request — ${data.patient.name} — ${data.serviceTitle}`

  const text = [
    `Tentative appointment request received via the website.`,
    '',
    `SERVICE`,
    `  ${data.serviceTitle}`,
    '',
    `PROPOSED SLOT (1st choice)`,
    `  ${slotLabel}`,
    '',
    backupSlotLabel ? `BACKUP SLOT (2nd choice)` : null,
    backupSlotLabel ? `  ${backupSlotLabel}` : null,
    backupSlotLabel ? '' : null,
    requestedWindowLabel ? `REQUESTED AVAILABILITY` : null,
    requestedWindowLabel ? `  ${requestedWindowLabel}` : null,
    requestedWindowLabel ? '' : null,
    `PROVIDER`,
    `  ${confidenceLabel}`,
    '',
    `PATIENT`,
    `  Name:  ${data.patient.name}`,
    `  Email: ${data.patient.email}`,
    `  Phone: ${data.patient.phone}`,
    preferredMethodLabel ? `  Preferred contact: ${preferredMethodLabel}` : null,
    contactWindowLabel ? `  Best time to reach: ${contactWindowLabel}` : null,
    '',
    data.reason?.trim() ? `MESSAGE / REASON` : null,
    data.reason?.trim() ? `  ${data.reason.trim()}` : null,
    data.reason?.trim() ? '' : null,
    `NEXT STEPS`,
    ...(emailOnly
      ? [
          `  1. Review the request details above.`,
          `  2. Reply to this email (or call the patient) to confirm or adjust the time.`,
          `  3. Add the confirmed appointment to the practice calendar.`,
        ]
      : [
          `  1. Open the Calendar event: ${data.calendarEventLink}`,
          `  2. Confirm or reassign the provider.`,
          `  3. Adjust the time/duration if needed.`,
          `  4. Remove "[TENTATIVE]" from the title and click Send to notify the patient.`,
        ]),
    '',
    `Reply to this email to respond to the patient directly.`,
    `Submitted ${submittedAt} (ET).`,
    `Ref: ${data.id}`,
  ]
    .filter((line): line is string => line !== null)
    .join('\n')

  const reasonBlock = data.reason?.trim()
    ? `
            <tr>
              <td style="padding:20px 28px 0;">
                <p style="margin:0 0 8px; font-size:11px; letter-spacing:1.2px; text-transform:uppercase; color:${BRAND_BRONZE_DARK}; font-weight:700;">Message / reason</p>
                <div style="padding:14px 16px; background-color:#fdf6ea; border:1px solid #f1d2a3; border-radius:10px; white-space:pre-wrap; font-size:14px; line-height:1.55; color:${TEXT};">${escapeHtml(data.reason.trim())}</div>
              </td>
            </tr>`
    : ''

  const eventButton = data.calendarEventLink
    ? `<a href="${escapeHtml(data.calendarEventLink)}" style="display:inline-block;background-color:${BRAND_BRONZE};color:#ffffff;padding:11px 22px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;">Open in Google Calendar →</a>`
    : `<p style="margin:0;color:${MUTED};font-size:13px;font-style:italic;">Email-only request — confirm the time with the patient and add it to the practice calendar.</p>`

  const backupSlotRow = backupSlotLabel
    ? `
                  <tr>
                    <td style="padding:12px 16px; background-color:${BG_PAGE}; border-top:1px solid ${BORDER}; font-size:13px; color:${MUTED}; vertical-align:top;">Backup (2nd choice)</td>
                    <td style="padding:12px 16px; border-top:1px solid ${BORDER}; font-size:14px; color:${TEXT}; vertical-align:top;">${escapeHtml(backupSlotLabel)}</td>
                  </tr>`
    : ''

  const requestedWindowRow = requestedWindowLabel
    ? `
                  <tr>
                    <td style="padding:12px 16px; background-color:${BG_PAGE}; border-top:1px solid ${BORDER}; font-size:13px; color:${MUTED}; vertical-align:top;">Preferred window</td>
                    <td style="padding:12px 16px; border-top:1px solid ${BORDER}; font-size:14px; color:${TEXT}; vertical-align:top;">${escapeHtml(requestedWindowLabel)}</td>
                  </tr>`
    : ''

  const contactPrefRows = `${
    preferredMethodLabel
      ? `${renderRow('Preferred contact', escapeHtml(preferredMethodLabel))}`
      : ''
  }${
    contactWindowLabel ? `${renderRow('Best time to reach', escapeHtml(contactWindowLabel))}` : ''
  }`

  const nextStepsList = emailOnly
    ? `<ol style="margin:0; padding-left:20px; font-size:14px; line-height:1.6; color:${TEXT};">
                  <li>Review the request details above.</li>
                  <li>Reply to this email (or call the patient) to confirm or adjust the time.</li>
                  <li>Add the confirmed appointment to the practice calendar.</li>
                </ol>`
    : `<ol style="margin:0; padding-left:20px; font-size:14px; line-height:1.6; color:${TEXT};">
                  <li>Open the Calendar event using the button above.</li>
                  <li>Confirm or reassign the provider${data.doctorConfidence === 'suggested' ? ' — this one is a suggestion, not a definitive assignment' : ''}.</li>
                  <li>Adjust time / duration as needed.</li>
                  <li>Remove <code style="font-family:Menlo,monospace;font-size:12px;background:#f1f5f9;padding:1px 5px;border-radius:3px;">[TENTATIVE]</code> from the title and click Send to notify the patient.</li>
                </ol>`

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(subject)}</title>
  </head>
  <body style="margin:0; padding:0; background-color:${BG_PAGE}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color:${TEXT};">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${BG_PAGE}; padding:24px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px; width:100%; background-color:${BG_CARD}; border:1px solid ${BORDER}; border-radius:14px; overflow:hidden;">
            <tr>
              <td style="background-color:${BRAND_BRONZE}; padding:20px 28px;">
                <p style="margin:0; font-size:12px; letter-spacing:1.5px; text-transform:uppercase; color:#fdf6ea; font-weight:600;">${escapeHtml(siteConfig.name)}</p>
                <h1 style="margin:6px 0 0; font-size:22px; line-height:1.3; color:#ffffff; font-weight:600;">New appointment request</h1>
                <p style="margin:6px 0 0; font-size:13px; color:#fdf6ea;">Tentative hold — your action required</p>
              </td>
            </tr>

            <tr>
              <td style="padding:24px 28px 8px;">
                <p style="margin:0 0 4px; color:${TEXT}; font-size:16px; line-height:1.5;">
                  <strong>${escapeHtml(data.patient.name)}</strong> requested <strong>${escapeHtml(data.serviceTitle)}</strong>.
                </p>
                <p style="margin:8px 0 0;">${eventButton}</p>
              </td>
            </tr>

            <tr>
              <td style="padding:20px 28px 0;">
                <p style="margin:0 0 8px; font-size:11px; letter-spacing:1.2px; text-transform:uppercase; color:${BRAND_BRONZE_DARK}; font-weight:700;">Proposed slot</p>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid ${BORDER}; border-radius:10px; overflow:hidden;">
                  <tr>
                    <td style="padding:12px 16px; background-color:${BG_PAGE}; width:140px; font-size:13px; color:${MUTED}; vertical-align:top;">${backupSlotLabel ? '1st choice' : 'When'}</td>
                    <td style="padding:12px 16px; font-size:14px; color:${TEXT}; vertical-align:top;">${escapeHtml(slotLabel)}</td>
                  </tr>
                  ${backupSlotRow}
                  ${requestedWindowRow}
                  <tr>
                    <td style="padding:12px 16px; background-color:${BG_PAGE}; border-top:1px solid ${BORDER}; font-size:13px; color:${MUTED}; vertical-align:top;">Provider</td>
                    <td style="padding:12px 16px; border-top:1px solid ${BORDER}; font-size:14px; color:${TEXT}; vertical-align:top;">
                      ${escapeHtml(confidenceLabel)}
                      ${
                        data.doctorConfidence === 'suggested'
                          ? `<div style="display:inline-block; margin-left:8px; padding:2px 8px; background-color:${ACCENT_YELLOW}; color:#78350f; font-size:11px; border-radius:99px; font-weight:600;">REVIEW</div>`
                          : ''
                      }
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:20px 28px 0;">
                <p style="margin:0 0 8px; font-size:11px; letter-spacing:1.2px; text-transform:uppercase; color:${BRAND_BRONZE_DARK}; font-weight:700;">Patient</p>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid ${BORDER}; border-radius:10px; overflow:hidden;">
                  ${renderRow('Name', escapeHtml(data.patient.name))}
                  ${renderRow('Email', `<a href="mailto:${escapeHtml(data.patient.email)}" style="color:${BRAND_BRONZE}; text-decoration:none;">${escapeHtml(data.patient.email)}</a>`)}
                  ${renderRow('Phone', `<a href="tel:${escapeHtml(data.patient.phone.replace(/[^0-9+]/g, ''))}" style="color:${BRAND_BRONZE}; text-decoration:none;">${escapeHtml(data.patient.phone)}</a>`, !preferredMethodLabel && !contactWindowLabel)}
                  ${contactPrefRows}
                </table>
              </td>
            </tr>

            ${reasonBlock}

            <tr>
              <td style="padding:20px 28px 0;">
                <p style="margin:0 0 8px; font-size:11px; letter-spacing:1.2px; text-transform:uppercase; color:${BRAND_BRONZE_DARK}; font-weight:700;">Next steps</p>
                ${nextStepsList}
              </td>
            </tr>

            <tr>
              <td style="padding:24px 28px 28px;">
                <hr style="border:none; border-top:1px solid ${BORDER}; margin:8px 0 16px;" />
                <p style="margin:0; font-size:12px; color:${MUTED}; line-height:1.5;">
                  Submitted ${escapeHtml(submittedAt)} (ET) · Ref: <code style="font-family:'SFMono-Regular',Consolas,monospace; font-size:12px;">${escapeHtml(data.id)}</code>
                </p>
                <p style="margin:6px 0 0; font-size:12px; color:${MUTED}; line-height:1.5;">Reply to this email to respond to the patient directly.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`

  return { subject, html, text }
}

function renderRow(label: string, value: string, isLast = false): string {
  const borderBottom = isLast ? '' : `border-bottom:1px solid ${BORDER};`
  return `
    <tr>
      <td style="padding:12px 16px; ${borderBottom} background-color:#f6f8fa; width:140px; font-size:13px; color:${MUTED}; vertical-align:top;">${label}</td>
      <td style="padding:12px 16px; ${borderBottom} font-size:14px; color:${TEXT}; vertical-align:top; word-break:break-word;">${value}</td>
    </tr>`
}
