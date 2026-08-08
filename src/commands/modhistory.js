import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('modhistory')
  .setDescription('Pokazuje historię moderacji użytkownika.')
  .addUserOption((option) => option
    .setName('użytkownik')
    .setDescription('Użytkownik, którego historię chcesz sprawdzić.')
    .setRequired(true));

export async function execute(interaction) {
  const service = interaction.client.container?.services?.moderation;
  if (!service) {
    await interaction.reply({ content: 'System moderacji nie jest jeszcze dostępny.', ephemeral: true });
    return;
  }

  const user = interaction.options.getUser('użytkownik', true);
  const cases = await service.history(interaction.guildId, user.id, 15);

  if (!cases.length) {
    await interaction.reply({ content: `Użytkownik ${user.tag} nie ma zapisanej historii moderacji.`, ephemeral: true });
    return;
  }

  const lines = cases.map((entry) => {
    const reason = entry.reason ? ` — ${entry.reason}` : '';
    return `#${entry.id} ${entry.action} — <@${entry.moderator_id}>${reason}`;
  });

  await interaction.reply({
    content: `Historia moderacji użytkownika ${user.tag}:\n${lines.join('\n')}`,
    ephemeral: true,
  });
}
