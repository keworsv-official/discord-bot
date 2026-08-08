export function createAntiSpamService({ windowMs = 8000, maxMessages = 6, duplicateLimit = 3 } = {}) {
  const buckets = new Map();

  function inspect({ guildId, userId, content }) {
    const key = `${guildId}:${userId}`;
    const now = Date.now();
    const bucket = buckets.get(key) ?? { messages: [], lastContent: null, duplicates: 0 };

    bucket.messages = bucket.messages.filter((timestamp) => now - timestamp < windowMs);
    bucket.messages.push(now);

    if (content && content === bucket.lastContent) {
      bucket.duplicates += 1;
    } else {
      bucket.lastContent = content ?? null;
      bucket.duplicates = 1;
    }

    buckets.set(key, bucket);

    return {
      spam: bucket.messages.length > maxMessages,
      duplicateSpam: bucket.duplicates >= duplicateLimit,
      count: bucket.messages.length,
    };
  }

  function clear(guildId, userId) {
    buckets.delete(`${guildId}:${userId}`);
  }

  return Object.freeze({ inspect, clear });
}
