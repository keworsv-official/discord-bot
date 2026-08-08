export function createAllowlistService() {
  const users = new Map();

  function key(guildId) {
    return users.get(guildId) ?? new Set();
  }

  function has(guildId, userId) {
    return key(guildId).has(userId);
  }

  function add(guildId, userId) {
    const set = key(guildId);
    set.add(userId);
    users.set(guildId, set);
  }

  function remove(guildId, userId) {
    const set = key(guildId);
    set.delete(userId);
    users.set(guildId, set);
  }

  function list(guildId) {
    return [...key(guildId)];
  }

  return Object.freeze({ has, add, remove, list });
}
