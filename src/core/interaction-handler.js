export function registerInteractionHandler(client, registry, logger) {
  client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = registry.get(interaction.commandName);
    if (!command) {
      logger.warn('Received unknown slash command.', {
        command: interaction.commandName,
        user: interaction.user.id,
        guild: interaction.guildId,
      });
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      logger.error('Command execution failed.', {
        command: interaction.commandName,
        user: interaction.user.id,
        guild: interaction.guildId,
        message: error instanceof Error ? error.message : String(error),
      });

      const response = {
        content: 'Wystąpił nieoczekiwany błąd podczas wykonywania polecenia.',
        ephemeral: true,
      };

      if (interaction.replied || interaction.deferred) {
        await interaction.followUp(response).catch(() => undefined);
      } else {
        await interaction.reply(response).catch(() => undefined);
      }
    }
  });
}
