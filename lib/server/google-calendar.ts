/**
 * Google Calendar wrapper for the appointment-scheduling backend.
 *
 * Auth model: OAuth2 with a long-lived refresh token. The refresh token is
 * obtained ONCE via the /api/dev/google-oauth-setup helper (dev-only) and
 * pasted into Vercel as GOOGLE_OAUTH_REFRESH_TOKEN.
 *
 * All Calendar operations target the single shared calendar identified by
 * GOOGLE_CALENDAR_ID (a Workspace shared calendar that the info@ account owns
 * and the doctors have read access to).
 */

import { calendar as buildCalendar, calendar_v3 } from '@googleapis/calendar'
import { OAuth2Client } from 'google-auth-library'

export type GoogleCalendarEvent = {
  id: string
  summary: string | null | undefined
  start: Date
  end: Date
  attendeeEmails: string[]
}

export function calendarConfigured(): boolean {
  return Boolean(
    process.env.GOOGLE_OAUTH_CLIENT_ID &&
      process.env.GOOGLE_OAUTH_CLIENT_SECRET &&
      process.env.GOOGLE_OAUTH_REFRESH_TOKEN &&
      process.env.GOOGLE_CALENDAR_ID
  )
}

let cachedAuth: OAuth2Client | null = null

function getAuth(): OAuth2Client {
  if (cachedAuth) return cachedAuth
  const oauth = new OAuth2Client(
    process.env.GOOGLE_OAUTH_CLIENT_ID,
    process.env.GOOGLE_OAUTH_CLIENT_SECRET
  )
  oauth.setCredentials({ refresh_token: process.env.GOOGLE_OAUTH_REFRESH_TOKEN })
  cachedAuth = oauth
  return oauth
}

function getClient(): calendar_v3.Calendar {
  return buildCalendar({ version: 'v3', auth: getAuth() })
}

/**
 * Returns all events on the shared booking calendar that overlap the given
 * window. Used to compute per-doctor availability.
 */
export async function listEventsInRange(opts: {
  start: Date
  end: Date
}): Promise<GoogleCalendarEvent[]> {
  const cal = getClient()
  const result = await cal.events.list({
    calendarId: process.env.GOOGLE_CALENDAR_ID,
    timeMin: opts.start.toISOString(),
    timeMax: opts.end.toISOString(),
    singleEvents: true,
    orderBy: 'startTime',
    maxResults: 250,
  })

  const items = result.data.items ?? []
  return items
    .map((e) => parseEvent(e))
    .filter((e): e is GoogleCalendarEvent => e !== null)
}

function parseEvent(e: calendar_v3.Schema$Event): GoogleCalendarEvent | null {
  if (!e.id) return null
  const startISO = e.start?.dateTime ?? e.start?.date
  const endISO = e.end?.dateTime ?? e.end?.date
  if (!startISO || !endISO) return null
  const start = new Date(startISO)
  const end = new Date(endISO)
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return null
  const attendeeEmails = (e.attendees ?? [])
    .map((a) => a.email?.toLowerCase())
    .filter((s): s is string => Boolean(s))
  return { id: e.id, summary: e.summary, start, end, attendeeEmails }
}

/**
 * Creates a tentative event on the shared booking calendar. Patient is NOT
 * an attendee — the event is for internal team tracking only.
 *
 * Returns the event ID and a deep link the manager can click to open it.
 */
export async function createTentativeEvent(opts: {
  summary: string
  description: string
  start: Date
  end: Date
  /** Internal team attendees only (info@ + assigned doctor). Patient excluded. */
  attendeeEmails: string[]
}): Promise<{ id: string; htmlLink: string }> {
  const cal = getClient()
  const inserted = await cal.events.insert({
    calendarId: process.env.GOOGLE_CALENDAR_ID,
    sendUpdates: 'none', // do not auto-email anyone yet; manager confirms first
    requestBody: {
      summary: opts.summary,
      description: opts.description,
      start: { dateTime: opts.start.toISOString() },
      end: { dateTime: opts.end.toISOString() },
      status: 'tentative',
      colorId: '5', // Banana / yellow — Google's "tentative" visual cue
      attendees: opts.attendeeEmails.map((email) => ({ email })),
      reminders: { useDefault: true },
    },
  })

  const id = inserted.data.id
  const htmlLink = inserted.data.htmlLink ?? ''
  if (!id) throw new Error('Calendar event insert returned no ID')
  return { id, htmlLink }
}
