import { PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('kick')
  .setDescription('Wyrzuca użytkownika z serwera.')
  .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
  .addUserOption((option) => option.setName('użytkownik').setDescription('Użytkownik.').setRequired(true))
  .addStringOption((option) => option.setName('powód').setDescription('Powód wyrzucenia.').setMaxLength(500));

export async function execute(interaction) {
  const target = interaction.options.getMember('użytkownik');
  const user = interaction.options.getUser('użytkownik');
  const reason = interaction.options.getString('powód') ?? 'Nie podano powodu.';

  if (!target || target.id === interaction.user.id || target.id === interaction.guild.ownerId) {
    await interaction.reply({ content: 'Nie można wyrzucić tego użytkownika.', ephemeral: true });
    return;
  }

  if (!target.kickable || target.roles.highest.position >= interaction.member.roles.highest.position) {
    await interaction.reply({ content: 'Nie możesz wyrzucić tego użytkownika.', ephemeral: true });
    return;
  }

  await target.kick(reason);
  await interaction.client.container.services.moderation.createCase({
    guildId: interaction.guildId,
    userId: user.id,
    moderatorId: interaction.user.id,
    action: 'KICK',
    reason,
  });

  await interaction.reply({ content: `Użytkownik ${user.tag} został wyrzucony.`, ephemeral: false });
}
