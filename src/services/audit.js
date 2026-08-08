export function createAuditService(database) {
  async function record({ guildId, actorId = null, eventType, targetId = null, metadata = null }) {
    await database.run(
      `INSERT INTO audit_events (guild_id, actor_id, event_type, target_id, metadata)
       VALUES (?, ?, ?, ?, ?)`,
      guildId,
      actorId,
      eventType,
      targetId,
      metadata ? JSON.stringify(metadata) : null,
    );
  }

  async function recent(guildId, limit = 50) {
    return database.all(
      `SELECT * FROM audit_events WHERE guild_id = ? ORDER BY id DESC LIMIT ?`,
      guildId,
      limit,
    );
  }

  return Object.freeze({ record, recent });
}
