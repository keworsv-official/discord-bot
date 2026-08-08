const DEFAULT_LIMITS = Object.freeze({
  channelDelete: 3,
  roleDelete: 3,
  ban: 5,
  kick: 5,
});

export function createAntiNukeService(customLimits = {}) {
  const limits = { ...DEFAULT_LIMITS, ...customLimits };
  const events = new Map();

  function record({ guildId, userId, action }) {
    const key = `${guildId}:${userId}:${action}`;
    const now = Date.now();
    const recent = (events.get(key) ?? []).filter((timestamp) => now - timestamp < 10_000);
    recent.push(now);
    events.set(key, recent);

    const limit = limits[action] ?? Number.POSITIVE_INFINITY;
    return {
      action,
      count: recent.length,
      limit,
      suspicious: recent.length >= limit,
    };
  }

  function reset(guildId, userId) {
    for (const key of events.keys()) {
      if (key.startsWith(`${guildId}:${userId}:`)) events.delete(key);
    }
  }

  return Object.freeze({ record, reset, limits: Object.freeze({ ...limits }) });
}
