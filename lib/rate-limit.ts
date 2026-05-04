/**
 * Lightweight in-memory rate limiter for serverless / Node runtimes.
 *
 * - Fixed window, per-key (we pass the client IP as the key).
 * - Ships zero external dependencies; good enough for a low-traffic marketing
 *   site running as a single long-lived Node process (e.g. a VPS, Fly.io, or a
 *   warm Vercel serverless instance).
 * - For multi-instance / fully serverless hosting, swap in a Redis-backed
 *   limiter later — the call site in `/app/api/contact` only needs the
 *   `{ success, remaining, resetAt }` contract this file exports.
 */

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

function sweepExpired(now: number) {
  if (buckets.size < 256) return;
  for (const [key, b] of buckets) {
    if (b.resetAt <= now) buckets.delete(key);
  }
}

export type RateLimitResult = {
  success: boolean;
  remaining: number;
  resetAt: number;
};

/**
 * @param key        usually the caller IP
 * @param limit      max requests allowed in the window
 * @param windowMs   window duration in milliseconds
 */
export function rateLimit(
  key: string,
  limit: number,
  windowMs: number,
): RateLimitResult {
  const now = Date.now();
  sweepExpired(now);

  const existing = buckets.get(key);
  if (!existing || existing.resetAt <= now) {
    const bucket = { count: 1, resetAt: now + windowMs };
    buckets.set(key, bucket);
    return { success: true, remaining: limit - 1, resetAt: bucket.resetAt };
  }

  if (existing.count >= limit) {
    return { success: false, remaining: 0, resetAt: existing.resetAt };
  }

  existing.count += 1;
  return {
    success: true,
    remaining: Math.max(0, limit - existing.count),
    resetAt: existing.resetAt,
  };
}

/**
 * Extract the best-guess client IP from a Next.js Request.
 *
 * Honors `x-forwarded-for` (Vercel, Cloudflare, Nginx) and falls back to
 * `x-real-ip`. Returns `"unknown"` when nothing is available so the limiter
 * still has a stable key to bucket against.
 */
export function clientIpFrom(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const first = forwardedFor.split(",")[0]?.trim();
    if (first) return first;
  }
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return "unknown";
}
