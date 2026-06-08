/**
 * Best-effort, in-memory rate limiter for the public form endpoints.
 *
 * This is a fixed-window counter keyed by a caller identifier (usually the
 * client IP). It runs per serverless instance — it is NOT a distributed limit —
 * but it meaningfully blunts scripted abuse and accidental rapid resubmits
 * without adding infrastructure. For stronger guarantees, swap the Map for a
 * shared store (e.g. Upstash/Redis) behind the same interface.
 */

interface WindowEntry {
  count: number
  resetAt: number
}

const buckets = new Map<string, WindowEntry>()
const MAX_TRACKED_KEYS = 10_000

export interface RateLimitResult {
  ok: boolean
  remaining: number
  /** Seconds until the window resets (only meaningful when `ok` is false). */
  retryAfterSec: number
}

export function rateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now()
  const entry = buckets.get(key)

  if (!entry || now >= entry.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs })
    if (buckets.size > MAX_TRACKED_KEYS) pruneExpired(now)
    return { ok: true, remaining: limit - 1, retryAfterSec: 0 }
  }

  if (entry.count >= limit) {
    return { ok: false, remaining: 0, retryAfterSec: Math.max(1, Math.ceil((entry.resetAt - now) / 1000)) }
  }

  entry.count += 1
  return { ok: true, remaining: limit - entry.count, retryAfterSec: 0 }
}

function pruneExpired(now: number): void {
  for (const [key, entry] of buckets) {
    if (now >= entry.resetAt) buckets.delete(key)
  }
}
