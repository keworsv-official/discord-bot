export function registerProtectionEvents(client, { autoMod, antiSpam, logger }) {
  client.on('messageCreate', async (message) => {
    if (!message.guild || message.author.bot) return;

    const spam = antiSpam.inspect({
      guildId: message.guild.id,
      userId: message.author.id,
      content: message.content,
    });

    const violation = autoMod.inspect(message);

    if (!spam.spam && !spam.duplicateSpam && !violation) return;

    const reason = violation?.reason ?? (spam.duplicateSpam ? 'Powtarzanie wiadomości' : 'Spam');

    try {
      if (message.deletable) await message.delete();
      logger.info('Protection system removed a message.', {
        guild: message.guild.id,
        user: message.author.id,
        reason,
      });
    } catch (error) {
      logger.warn('Protection system could not remove a message.', {
        guild: message.guild.id,
        user: message.author.id,
        message: error.message,
      });
    }
  });
}
