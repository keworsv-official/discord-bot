export function createGuildSettingsService(database) {
  async function get(guildId) {
    return database.get('SELECT * FROM guild_settings WHERE guild_id = ?', guildId);
  }

  async function ensure(guildId) {
    await database.run(
      `INSERT INTO guild_settings (guild_id) VALUES (?) ON CONFLICT(guild_id) DO NOTHING`,
      guildId,
    );
    return get(guildId);
  }

  async function update(guildId, patch) {
    await ensure(guildId);
    const allowed = ['locale', 'log_channel_id', 'moderation_log_channel_id', 'report_channel_id', 'ticket_category_id'];
    const entries = Object.entries(patch).filter(([key]) => allowed.includes(key));
    if (!entries.length) return get(guildId);

    const assignments = entries.map(([key]) => `${key} = ?`).join(', ');
    const values = entries.map(([, value]) => value);
    values.push(guildId);

    await database.run(
      `UPDATE guild_settings SET ${assignments}, updated_at = CURRENT_TIMESTAMP WHERE guild_id = ?`,
      ...values,
    );

    return get(guildId);
  }

  return Object.freeze({ get, ensure, update });
}
