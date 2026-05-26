/**
 * Email template for general contact-form submissions, sent to the practice
 * manager. Mirrors the appointment template's structure — same editing rules
 * apply (inline styles, table layout, escape user content).
 */

import { siteConfig } from '@/lib/config'

const BRAND_BRONZE = '#9a6a3c'
const BRAND_BRONZE_DARK = '#3f2916'
const BG_CARD = '#ffffff'
const BG_PAGE = '#f6f8fa'
const BORDER = '#dde3ec'
const TEXT = '#1e293b'
const MUTED = '#64748b'

export type ContactMessageEmailData = {
  id: string
  name: string
  email: string
  phone?: string | null
  message: string
  ipAddress?: string | null
  userAgent?: string | null
  submittedAt?: Date
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export function contactMessageEmail(data: ContactMessageEmailData) {
  const submittedAt = (data.submittedAt ?? new Date()).toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'America/New_York',
  })

  const subject = `New contact message — ${data.name}`

  const text = [
    `New contact message from ${siteConfig.name}`,
    '',
    `PATIENT`,
    `  Name:  ${data.name}`,
    `  Email: ${data.email}`,
    data.phone ? `  Phone: ${data.phone}` : null,
    '',
    `MESSAGE`,
    `  ${data.message}`,
    '',
    `Reply directly to this email to respond to the sender.`,
    `Submitted ${submittedAt} (ET).`,
    `Reference: ${data.id}`,
  ]
    .filter((line): line is string => line !== null)
    .join('\n')

  const phoneRow = data.phone
    ? renderRow('Phone', `<a href="tel:${escapeHtml(data.phone.replace(/[^0-9+]/g, ''))}" style="color:${BRAND_BRONZE}; text-decoration:none;">${escapeHtml(data.phone)}</a>`, true)
    : ''

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
                <h1 style="margin:6px 0 0; font-size:22px; line-height:1.3; color:#ffffff; font-weight:600;">New contact message</h1>
              </td>
            </tr>

            <tr>
              <td style="padding:24px 28px 8px;">
                <p style="margin:0 0 4px; color:${TEXT}; font-size:16px; line-height:1.5;">
                  <strong>${escapeHtml(data.name)}</strong> sent a message through the website.
                </p>
                <p style="margin:0; color:${MUTED}; font-size:14px;">Reply directly to this email to respond.</p>
              </td>
            </tr>

            <tr>
              <td style="padding:20px 28px 0;">
                <p style="margin:0 0 8px; font-size:11px; letter-spacing:1.2px; text-transform:uppercase; color:${BRAND_BRONZE_DARK}; font-weight:700;">Sender</p>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid ${BORDER}; border-radius:10px; overflow:hidden;">
                  ${renderRow('Name', escapeHtml(data.name))}
                  ${renderRow('Email', `<a href="mailto:${escapeHtml(data.email)}" style="color:${BRAND_BRONZE}; text-decoration:none;">${escapeHtml(data.email)}</a>`, !data.phone)}
                  ${phoneRow}
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:20px 28px 0;">
                <p style="margin:0 0 8px; font-size:11px; letter-spacing:1.2px; text-transform:uppercase; color:${BRAND_BRONZE_DARK}; font-weight:700;">Message</p>
                <div style="padding:14px 16px; background-color:#fdf6ea; border:1px solid #f1d2a3; border-radius:10px; white-space:pre-wrap; font-size:14px; line-height:1.55; color:${TEXT};">${escapeHtml(data.message)}</div>
              </td>
            </tr>

            <tr>
              <td style="padding:24px 28px 28px;">
                <hr style="border:none; border-top:1px solid ${BORDER}; margin:8px 0 16px;" />
                <p style="margin:0; font-size:12px; color:${MUTED}; line-height:1.5;">
                  Submitted ${escapeHtml(submittedAt)} (ET) · Ref: <code style="font-family:'SFMono-Regular',Consolas,monospace; font-size:12px;">${escapeHtml(data.id)}</code>
                </p>
                ${
                  data.ipAddress || data.userAgent
                    ? `<p style="margin:6px 0 0; font-size:11px; color:${MUTED}; line-height:1.5;">${escapeHtml([data.ipAddress, data.userAgent].filter(Boolean).join(' · '))}</p>`
                    : ''
                }
              </td>
            </tr>
          </table>
          <p style="max-width:600px; width:100%; margin:14px auto 0; font-size:12px; color:${MUTED}; text-align:center; line-height:1.5;">
            Sent automatically by ${escapeHtml(siteConfig.name)} · <a href="${siteConfig.siteUrl}" style="color:${BRAND_BRONZE}; text-decoration:none;">${escapeHtml(siteConfig.siteUrl.replace(/^https?:\/\//, ''))}</a>
          </p>
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
