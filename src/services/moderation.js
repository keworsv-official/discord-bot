export function createModerationService(database) {
  async function createCase({ guildId, userId, moderatorId, action, reason = null, expiresAt = null }) {
    const result = await database.run(
      `INSERT INTO moderation_cases (guild_id, user_id, moderator_id, action, reason, expires_at)
       VALUES (?, ?, ?, ?, ?, ?)`,
      guildId,
      userId,
      moderatorId,
      action,
      reason,
      expiresAt,
    );

    return database.get('SELECT * FROM moderation_cases WHERE id = ?', result.lastID);
  }

  async function history(guildId, userId, limit = 25) {
    return database.all(
      `SELECT * FROM moderation_cases
       WHERE guild_id = ? AND user_id = ?
       ORDER BY id DESC LIMIT ?`,
      guildId,
      userId,
      limit,
    );
  }

  return Object.freeze({ createCase, history });
}
