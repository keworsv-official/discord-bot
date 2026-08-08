export function createRateLimitService() {
  const buckets = new Map();

  function consume(key, { limit, windowMs }) {
    const now = Date.now();
    const bucket = buckets.get(key);

    if (!bucket || now >= bucket.resetAt) {
      buckets.set(key, { count: 1, resetAt: now + windowMs });
      return { allowed: true, remaining: Math.max(0, limit - 1), retryAfterMs: 0 };
    }

    if (bucket.count >= limit) {
      return { allowed: false, remaining: 0, retryAfterMs: bucket.resetAt - now };
    }

    bucket.count += 1;
    return { allowed: true, remaining: Math.max(0, limit - bucket.count), retryAfterMs: 0 };
  }

  function clear(prefix) {
    for (const key of buckets.keys()) {
      if (key.startsWith(prefix)) buckets.delete(key);
    }
  }

  return Object.freeze({ consume, clear });
}
