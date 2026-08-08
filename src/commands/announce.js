import { PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('announce')
  .setDescription('Wysyła oficjalne ogłoszenie na wybrany kanał.')
  .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
  .addChannelOption((option) => option.setName('kanał').setDescription('Kanał docelowy.').setRequired(true))
  .addStringOption((option) => option.setName('treść').setDescription('Treść ogłoszenia.').setMaxLength(2000).setRequired(true));

export async function execute(interaction) {
  const channel = interaction.options.getChannel('kanał', true);
  const content = interaction.options.getString('treść', true);

  if (!channel.isTextBased()) {
    await interaction.reply({ content: 'Wybrany kanał nie obsługuje wiadomości.', ephemeral: true });
    return;
  }

  await channel.send({ content });
  await interaction.reply({ content: `Ogłoszenie wysłano na ${channel}.`, ephemeral: true });
}
