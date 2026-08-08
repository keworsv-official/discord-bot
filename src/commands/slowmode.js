import { PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('slowmode')
  .setDescription('Ustawia limit czasu między wiadomościami.')
  .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
  .addIntegerOption((option) => option
    .setName('sekundy')
    .setDescription('0-21600 sekund.')
    .setMinValue(0)
    .setMaxValue(21600)
    .setRequired(true));

export async function execute(interaction) {
  const seconds = interaction.options.getInteger('sekundy', true);
  const channel = interaction.channel;

  if (!channel?.isTextBased() || typeof channel.setRateLimitPerUser !== 'function') {
    await interaction.reply({ content: 'Nie można ustawić slowmode na tym kanale.', ephemeral: true });
    return;
  }

  await channel.setRateLimitPerUser(seconds, `Slowmode ustawiony przez ${interaction.user.tag}`);
  await interaction.reply({ content: seconds === 0 ? 'Slowmode wyłączony.' : `Slowmode ustawiony na ${seconds} s.`, ephemeral: true });
}
