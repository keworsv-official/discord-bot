import { PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('purge')
  .setDescription('Usuwa określoną liczbę ostatnich wiadomości.')
  .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
  .addIntegerOption((option) => option
    .setName('liczba')
    .setDescription('Liczba wiadomości do usunięcia (1-100).')
    .setMinValue(1)
    .setMaxValue(100)
    .setRequired(true));

export async function execute(interaction) {
  const amount = interaction.options.getInteger('liczba', true);
  const channel = interaction.channel;

  if (!channel?.isTextBased() || typeof channel.bulkDelete !== 'function') {
    await interaction.reply({ content: 'Ta komenda nie działa na tym kanale.', ephemeral: true });
    return;
  }

  const deleted = await channel.bulkDelete(amount, true);
  await interaction.reply({ content: `Usunięto ${deleted.size} wiadomości.`, ephemeral: true });
}
