/**
 * One-time Google OAuth setup helper. Dev-only — returns 404 in production.
 *
 * USAGE:
 *   1. In Google Cloud Console, create an OAuth 2.0 Client (Web application).
 *   2. Add this route's URL as an authorized redirect URI, e.g.
 *      http://localhost:60125/api/dev/google-oauth-setup
 *   3. Set GOOGLE_OAUTH_CLIENT_ID + GOOGLE_OAUTH_CLIENT_SECRET in .env.local.
 *   4. Start the dev server, visit this route, click "Authorize", grant
 *      Calendar access on the info@ account.
 *   5. The route prints the refresh token. Copy it into Vercel as
 *      GOOGLE_OAUTH_REFRESH_TOKEN, and also set GOOGLE_CALENDAR_ID
 *      (the shared calendar's ID, found in Calendar settings).
 */

import { NextResponse } from 'next/server'
import { OAuth2Client } from 'google-auth-library'

const SCOPES = ['https://www.googleapis.com/auth/calendar']

function isDev() {
  return process.env.NODE_ENV !== 'production'
}

function buildRedirectUri(request: Request): string {
  const url = new URL(request.url)
  return `${url.origin}${url.pathname}`
}

function htmlPage(body: string): NextResponse {
  return new NextResponse(
    `<!doctype html><html><head><meta charset="utf-8"><title>Google OAuth setup</title>
    <style>body{font:14px/1.5 -apple-system,Segoe UI,sans-serif;max-width:720px;margin:40px auto;padding:0 20px;color:#1e293b}
    h1{font-size:22px;color:#9a6a3c}h2{font-size:16px;color:#9a6a3c;margin-top:28px}
    code{background:#f6f8fa;padding:2px 6px;border-radius:4px;font-family:Menlo,monospace;font-size:12px}
    pre{background:#f6f8fa;border:1px solid #dde3ec;padding:14px 16px;border-radius:8px;overflow:auto;font-size:12px}
    .ok{color:#15803d;font-weight:600}.err{color:#b91c1c;font-weight:600}
    a.btn{display:inline-block;background:#9a6a3c;color:#fff;padding:10px 18px;border-radius:8px;text-decoration:none;font-weight:600}
    a.btn:hover{background:#6f4a26}</style></head><body>${body}</body></html>`,
    { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
  )
}

export async function GET(request: Request) {
  if (!isDev()) {
    return new NextResponse('Not found', { status: 404 })
  }

  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID
  const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    return htmlPage(`<h1>Missing OAuth credentials</h1>
      <p>Set <code>GOOGLE_OAUTH_CLIENT_ID</code> and <code>GOOGLE_OAUTH_CLIENT_SECRET</code> in <code>.env.local</code>, then restart the dev server.</p>
      <p>Create credentials at <a href="https://console.cloud.google.com/apis/credentials" target="_blank">console.cloud.google.com/apis/credentials</a> → <em>Create Credentials</em> → <em>OAuth client ID</em> → <em>Web application</em>.</p>
      <p>Authorized redirect URI to register:</p>
      <pre>${buildRedirectUri(request)}</pre>`)
  }

  const url = new URL(request.url)
  const code = url.searchParams.get('code')
  const errorParam = url.searchParams.get('error')

  const redirectUri = buildRedirectUri(request)
  const oauth = new OAuth2Client(clientId, clientSecret, redirectUri)

  // Initial visit → render an Authorize link
  if (!code && !errorParam) {
    const authUrl = oauth.generateAuthUrl({
      access_type: 'offline',
      prompt: 'consent', // forces refresh_token to be returned every time
      scope: SCOPES,
    })
    return htmlPage(`<h1>Google OAuth setup — Elevate Wellness</h1>
      <p>This one-time flow grants the scheduling backend access to your Workspace's shared booking calendar.</p>
      <p><strong>Sign in with the <code>info@elevatewellnessnj.com</code> account when prompted.</strong> The refresh token issued will be tied to that account.</p>
      <p><a class="btn" href="${authUrl}">Authorize Google Calendar access</a></p>
      <h2>Registered redirect URI</h2>
      <p>Make sure this URI is listed under "Authorized redirect URIs" in your Google Cloud OAuth client:</p>
      <pre>${redirectUri}</pre>`)
  }

  if (errorParam) {
    return htmlPage(`<h1 class="err">Authorization failed</h1>
      <p>Google returned an error: <code>${escape(errorParam)}</code></p>
      <p><a href="${url.origin}${url.pathname}">Try again</a></p>`)
  }

  // Callback path: exchange code for tokens
  try {
    const { tokens } = await oauth.getToken(code!)
    if (!tokens.refresh_token) {
      return htmlPage(`<h1 class="err">No refresh token returned</h1>
        <p>Google did not issue a refresh token. This usually happens if the account already authorized this OAuth client. To force a fresh token:</p>
        <ol><li>Visit <a href="https://myaccount.google.com/permissions" target="_blank">myaccount.google.com/permissions</a></li>
        <li>Revoke access for this OAuth client</li>
        <li><a href="${url.origin}${url.pathname}">Retry the flow</a></li></ol>`)
    }
    return htmlPage(`<h1 class="ok">Success — refresh token issued</h1>
      <p>Copy this value into your Vercel project as <code>GOOGLE_OAUTH_REFRESH_TOKEN</code> (also add it to <code>.env.local</code> if you want to test locally):</p>
      <pre>${escape(tokens.refresh_token)}</pre>
      <h2>Other env vars you'll need</h2>
      <ul>
        <li><code>GOOGLE_OAUTH_CLIENT_ID</code> — already set</li>
        <li><code>GOOGLE_OAUTH_CLIENT_SECRET</code> — already set</li>
        <li><code>GOOGLE_CALENDAR_ID</code> — open the shared <em>Practice Bookings</em> calendar's Settings in Google Calendar → scroll to <em>Calendar ID</em> (looks like <code>xxx@group.calendar.google.com</code>)</li>
      </ul>
      <p>Once all four are set on Vercel and redeployed, the appointment scheduling backend is live.</p>`)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return htmlPage(`<h1 class="err">Token exchange failed</h1>
      <p><code>${escape(message)}</code></p>
      <p><a href="${url.origin}${url.pathname}">Retry</a></p>`)
  }
}

function escape(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
