export function registerAntiRaidEvents(client, { antiRaid, logger }) {
  client.on('guildMemberAdd', async (member) => {
    const result = antiRaid.recordJoin(member.guild.id, member.id);
    if (!result.raidDetected) return;

    logger.warn('Potential raid detected.', {
      guild: member.guild.id,
      recentJoins: result.recentJoins,
    });

    const owner = await member.guild.fetchOwner().catch(() => null);
    const channel = member.guild.systemChannel;
    if (channel?.isTextBased()) {
      await channel.send({
        content: `Wykryto możliwy raid: ${result.recentJoins} nowych członków w krótkim czasie. Administratorzy powinni sprawdzić sytuację${owner ? `, <@${owner.id}>` : ''}.`,
      }).catch(() => undefined);
    }
  });
}
