import { PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('timeout')
  .setDescription('Nadaje użytkownikowi timeout.')
  .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
  .addUserOption((option) => option.setName('użytkownik').setDescription('Użytkownik.').setRequired(true))
  .addIntegerOption((option) => option.setName('minuty').setDescription('Czas timeoutu w minutach.').setMinValue(1).setMaxValue(40320).setRequired(true))
  .addStringOption((option) => option.setName('powód').setDescription('Powód timeoutu.').setMaxLength(500));

export async function execute(interaction) {
  const target = interaction.options.getMember('użytkownik');
  const user = interaction.options.getUser('użytkownik');
  const minutes = interaction.options.getInteger('minuty');
  const reason = interaction.options.getString('powód') ?? 'Nie podano powodu.';

  if (!target || target.id === interaction.user.id || target.id === interaction.guild.ownerId) {
    await interaction.reply({ content: 'Nie można nadać timeoutu temu użytkownikowi.', ephemeral: true });
    return;
  }

  if (!target.moderatable || target.roles.highest.position >= interaction.member.roles.highest.position) {
    await interaction.reply({ content: 'Nie możesz moderować tego użytkownika.', ephemeral: true });
    return;
  }

  await target.timeout(minutes * 60_000, reason);
  await interaction.client.container.services.moderation.createCase({
    guildId: interaction.guildId,
    userId: user.id,
    moderatorId: interaction.user.id,
    action: 'TIMEOUT',
    reason,
    expiresAt: new Date(Date.now() + minutes * 60_000).toISOString(),
  });

  await interaction.reply({ content: `Użytkownik ${user.tag} otrzymał timeout na ${minutes} min.`, ephemeral: false });
}
