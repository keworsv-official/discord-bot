import { PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('report')
  .setDescription('Zgłasza użytkownika administracji.')
  .addUserOption((option) => option
    .setName('użytkownik')
    .setDescription('Użytkownik, którego zgłaszasz.')
    .setRequired(true))
  .addStringOption((option) => option
    .setName('powód')
    .setDescription('Powód zgłoszenia.')
    .setMaxLength(1000)
    .setRequired(true));

export async function execute(interaction) {
  const settings = interaction.client.container?.services?.guildSettings;
  if (!settings) {
    await interaction.reply({ content: 'System zgłoszeń nie jest jeszcze skonfigurowany.', ephemeral: true });
    return;
  }

  const config = await settings.get(interaction.guildId);
  const channelId = config?.report_channel_id;
  const channel = channelId ? await interaction.guild.channels.fetch(channelId).catch(() => null) : null;
  const target = interaction.options.getUser('użytkownik', true);
  const reason = interaction.options.getString('powód', true);

  if (!channel?.isTextBased()) {
    await interaction.reply({ content: 'Administrator nie skonfigurował kanału zgłoszeń.', ephemeral: true });
    return;
  }

  await channel.send({
    content: `Nowe zgłoszenie\nZgłaszający: <@${interaction.user.id}>\nUżytkownik: <@${target.id}>\nPowód: ${reason}`,
  });

  await interaction.reply({ content: 'Zgłoszenie zostało przekazane administracji.', ephemeral: true });
}
