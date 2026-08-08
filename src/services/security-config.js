const DEFAULTS = Object.freeze({
  antiNukeEnabled: true,
  antiRaidEnabled: true,
  autoModEnabled: true,
  antiSpamEnabled: true,
  antiNukeChannelDelete: 3,
  antiNukeRoleDelete: 3,
  antiNukeBan: 5,
  antiNukeKick: 5,
});

export function createSecurityConfigService(database) {
  async function get(guildId) {
    const row = await database.database.get('SELECT * FROM guild_security WHERE guild_id = ?', guildId);
    return { ...DEFAULTS, ...(row ?? {}), guildId };
  }

  async function ensure(guildId) {
    await database.database.run(
      `INSERT OR IGNORE INTO guild_security (guild_id) VALUES (?)`,
      guildId,
    );
    return get(guildId);
  }

  async function update(guildId, patch) {
    const allowed = Object.keys(DEFAULTS);
    const entries = Object.entries(patch).filter(([key]) => allowed.includes(key));
    if (!entries.length) return ensure(guildId);

    await ensure(guildId);
    const fields = entries.map(([key]) => `${key} = ?`).join(', ');
    const values = entries.map(([, value]) => value);
    await database.database.run(`UPDATE guild_security SET ${fields}, updated_at = CURRENT_TIMESTAMP WHERE guild_id = ?`, ...values, guildId);
    return get(guildId);
  }

  return Object.freeze({ get, ensure, update, defaults: DEFAULTS });
}
