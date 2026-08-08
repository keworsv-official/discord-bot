import { ChannelType, PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('ticket')
  .setDescription('Zarządza zgłoszeniami pomocy.')
  .addSubcommand((sub) => sub.setName('otwórz').setDescription('Otwiera prywatny ticket.')
    .addStringOption((option) => option.setName('temat').setDescription('Temat zgłoszenia.').setMaxLength(150).setRequired(true)))
  .addSubcommand((sub) => sub.setName('zamknij').setDescription('Zamyka bieżący ticket.'));

export async function execute(interaction) {
  const service = interaction.client.container.services.tickets;
  if (!service) return interaction.reply({ content: 'System ticketów nie jest dostępny.', ephemeral: true });

  if (interaction.options.getSubcommand() === 'otwórz') {
    const existing = await service.findOpen(interaction.guildId, interaction.user.id);
    if (existing) return interaction.reply({ content: `Masz już otwarty ticket: <#${existing.channel_id}>.`, ephemeral: true });

    const subject = interaction.options.getString('temat', true);
    const channel = await interaction.guild.channels.create({
      name: `ticket-${interaction.user.username}`.slice(0, 90),
      type: ChannelType.GuildText,
      permissionOverwrites: [
        { id: interaction.guild.roles.everyone.id, deny: [PermissionFlagsBits.ViewChannel] },
        { id: interaction.user.id, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory] },
      ],
    });

    await service.create({ guildId: interaction.guildId, userId: interaction.user.id, channelId: channel.id, subject });
    await channel.send(`Ticket użytkownika <@${interaction.user.id}>\nTemat: ${subject}`);
    return interaction.reply({ content: `Ticket został utworzony: ${channel}.`, ephemeral: true });
  }

  const result = await service.close(interaction.guildId, interaction.channelId);
  if (!result.changes) return interaction.reply({ content: 'Ten kanał nie jest otwartym ticketem.', ephemeral: true });
  await interaction.reply({ content: 'Ticket został zamknięty. Kanał można teraz zarchiwizować lub usunąć.', ephemeral: true });
}
