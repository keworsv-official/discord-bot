export function createSecurityDecisionService({ allowlist }) {
  function shouldIgnore({ guildId, userId, guildOwnerId }) {
    if (userId === guildOwnerId) return true;
    return allowlist.has(guildId, userId);
  }

  function shouldEscalate({ guildId, userId, guildOwnerId, suspicious }) {
    if (!suspicious) return false;
    return !shouldIgnore({ guildId, userId, guildOwnerId });
  }

  return Object.freeze({ shouldIgnore, shouldEscalate });
}
