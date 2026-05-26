import { Resend } from 'resend'
import { siteConfig } from '@/lib/config'

/**
 * Email transport for transactional messages (appointment requests, contact
 * messages). Uses Resend (https://resend.com).
 *
 * Required env vars:
 *   RESEND_API_KEY — your Resend secret key (starts with `re_`).
 *
 * Optional env vars:
 *   MAIL_FROM — sender address. Defaults to `Elevate Wellness <onboarding@resend.dev>`
 *               (Resend's test sender). Switch to a verified domain address
 *               like `Elevate Wellness <appointments@elevatewellnessnj.com>`
 *               once the domain is verified in Resend.
 *   MAIL_TO   — recipient mailbox the practice monitors. Defaults to
 *               `siteConfig.contact.email`.
 *
 * If RESEND_API_KEY is not set, mailConfigured() returns false and the API
 * routes skip the send (DB write still runs). This lets the form keep working
 * during local development without an API key.
 */

const DEFAULT_FROM = 'Elevate Wellness <onboarding@resend.dev>'

export function mailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY)
}

let cachedClient: Resend | null = null
function getClient(): Resend {
  if (!cachedClient) {
    cachedClient = new Resend(process.env.RESEND_API_KEY)
  }
  return cachedClient
}

export function mailRecipient(): string {
  return process.env.MAIL_TO || siteConfig.contact.email
}

export function mailSender(): string {
  return process.env.MAIL_FROM || DEFAULT_FROM
}

export type SendEmailInput = {
  to?: string
  replyTo?: string
  subject: string
  html: string
  text: string
}

export type SendEmailResult =
  | { ok: true; id: string | undefined }
  | { ok: false; error: string }

/**
 * Send an email via Resend. Never throws — returns a discriminated union so
 * callers can decide how to respond. Resilient design: failures are logged but
 * do not break the API request.
 */
export async function sendEmail(input: SendEmailInput): Promise<SendEmailResult> {
  if (!mailConfigured()) {
    return { ok: false, error: 'RESEND_API_KEY not configured' }
  }

  try {
    const result = await getClient().emails.send({
      from: mailSender(),
      to: input.to || mailRecipient(),
      replyTo: input.replyTo,
      subject: input.subject,
      html: input.html,
      text: input.text,
    })

    if (result.error) {
      return { ok: false, error: result.error.message || 'Resend returned an error' }
    }

    return { ok: true, id: result.data?.id }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown email error'
    return { ok: false, error: message }
  }
}
