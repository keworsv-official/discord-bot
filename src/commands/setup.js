import { PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('setup')
  .setDescription('Konfiguruje podstawowe ustawienia serwera.')
  .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
  .addChannelOption((option) => option
    .setName('logi')
    .setDescription('Kanał dla ogólnych logów.')
    .setRequired(false))
  .addChannelOption((option) => option
    .setName('moderacja')
    .setDescription('Kanał dla logów moderacji.')
    .setRequired(false))
  .addChannelOption((option) => option
    .setName('reporty')
    .setDescription('Kanał dla zgłoszeń użytkowników.')
    .setRequired(false));

export async function execute(interaction) {
  const settings = interaction.client.container?.services?.guildSettings;
  if (!settings) {
    await interaction.reply({ content: 'System konfiguracji nie jest jeszcze dostępny.', ephemeral: true });
    return;
  }

  await settings.update(interaction.guildId, {
    log_channel_id: interaction.options.getChannel('logi')?.id ?? null,
    moderation_log_channel_id: interaction.options.getChannel('moderacja')?.id ?? null,
    report_channel_id: interaction.options.getChannel('reporty')?.id ?? null,
  });

  await interaction.reply({ content: 'Podstawowa konfiguracja serwera została zapisana.', ephemeral: true });
}
