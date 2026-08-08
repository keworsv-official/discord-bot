export function createCooldownService() {
  const entries = new Map();

  function check(key, durationMs) {
    const now = Date.now();
    const expiresAt = entries.get(key) ?? 0;

    if (expiresAt > now) {
      return { allowed: false, remainingMs: expiresAt - now };
    }

    entries.set(key, now + durationMs);
    return { allowed: true, remainingMs: 0 };
  }

  function clear(key) {
    entries.delete(key);
  }

  return Object.freeze({ check, clear });
}
