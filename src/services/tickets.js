export function createTicketService(database) {
  async function create({ guildId, userId, channelId, subject }) {
    await database.run(
      `CREATE TABLE IF NOT EXISTS tickets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        guild_id TEXT NOT NULL,
        user_id TEXT NOT NULL,
        channel_id TEXT NOT NULL,
        subject TEXT,
        status TEXT NOT NULL DEFAULT 'open',
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        closed_at TEXT
      )`,
    );
    const result = await database.run(
      'INSERT INTO tickets (guild_id, user_id, channel_id, subject) VALUES (?, ?, ?, ?)',
      guildId, userId, channelId, subject,
    );
    return database.get('SELECT * FROM tickets WHERE id = ?', result.lastID);
  }

  async function close(guildId, channelId) {
    return database.run(
      `UPDATE tickets SET status = 'closed', closed_at = CURRENT_TIMESTAMP
       WHERE guild_id = ? AND channel_id = ? AND status = 'open'`,
      guildId, channelId,
    );
  }

  async function findOpen(guildId, userId) {
    return database.get(
      `SELECT * FROM tickets WHERE guild_id = ? AND user_id = ? AND status = 'open' ORDER BY id DESC LIMIT 1`,
      guildId, userId,
    );
  }

  return Object.freeze({ create, close, findOpen });
}
