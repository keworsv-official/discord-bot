export function createCommandContext(interaction) {
  return Object.freeze({
    guildId: interaction.guildId,
    userId: interaction.user.id,
    channelId: interaction.channelId,
    commandName: interaction.commandName,
    interaction,
  });
}
