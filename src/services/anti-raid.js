export function createAntiRaidService({ windowMs = 15000, threshold = 8 } = {}) {
  const joins = new Map();

  function recordJoin(guildId, userId) {
    const now = Date.now();
    const recent = (joins.get(guildId) ?? []).filter((entry) => now - entry.timestamp < windowMs);
    recent.push({ userId, timestamp: now });
    joins.set(guildId, recent);

    return {
      raidDetected: recent.length >= threshold,
      recentJoins: recent.length,
    };
  }

  function reset(guildId) {
    joins.delete(guildId);
  }

  return Object.freeze({ recordJoin, reset });
}
