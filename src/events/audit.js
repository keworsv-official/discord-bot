export function registerAuditEvents(client, audit, logger) {
  client.on('guildMemberRemove', async (member) => {
    await audit.record({ guildId: member.guild.id, eventType: 'member_remove', targetId: member.id });
  });

  client.on('guildMemberAdd', async (member) => {
    await audit.record({ guildId: member.guild.id, eventType: 'member_add', targetId: member.id });
  });

  client.on('channelCreate', async (channel) => {
    if (!channel.guild) return;
    await audit.record({ guildId: channel.guild.id, eventType: 'channel_create', targetId: channel.id });
  });

  client.on('channelDelete', async (channel) => {
    if (!channel.guild) return;
    await audit.record({ guildId: channel.guild.id, eventType: 'channel_delete', targetId: channel.id });
  });

  client.on('roleCreate', async (role) => {
    await audit.record({ guildId: role.guild.id, eventType: 'role_create', targetId: role.id });
  });

  client.on('roleDelete', async (role) => {
    await audit.record({ guildId: role.guild.id, eventType: 'role_delete', targetId: role.id });
  });

  client.on('warn', (message) => logger.warn('Discord warning.', { message }));
}
