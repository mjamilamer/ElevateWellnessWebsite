import { createClient, type Client } from '@libsql/client'

let client: Client | null = null

export function dbConfigured(): boolean {
  return Boolean(process.env.TURSO_DATABASE_URL)
}

/**
 * Turso / LibSQL client (SQLite-compatible, similar to Cloudflare D1).
 * Create a DB at https://turso.tech and run db/migrations/0001_initial_schema.sql.
 */
export function getDb(): Client {
  if (client) return client
  const url = process.env.TURSO_DATABASE_URL
  if (!url) {
    throw new Error('TURSO_DATABASE_URL is not set')
  }
  client = createClient({
    url,
    authToken: process.env.TURSO_AUTH_TOKEN || undefined,
  })
  return client
}
