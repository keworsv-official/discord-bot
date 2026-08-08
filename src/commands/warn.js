import { PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('warn')
  .setDescription('Nadaje użytkownikowi ostrzeżenie.')
  .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
  .addUserOption((option) => option.setName('użytkownik').setDescription('Użytkownik do ostrzeżenia.').setRequired(true))
  .addStringOption((option) => option.setName('powód').setDescription('Powód ostrzeżenia.').setMaxLength(500).setRequired(false));

export async function execute(interaction) {
  const target = interaction.options.getMember('użytkownik');
  const user = interaction.options.getUser('użytkownik');
  const reason = interaction.options.getString('powód') ?? 'Nie podano powodu.';

  if (!target || target.id === interaction.user.id || target.id === interaction.guild.ownerId) {
    await interaction.reply({ content: 'Nie można nadać ostrzeżenia temu użytkownikowi.', ephemeral: true });
    return;
  }

  if (target.roles.highest.position >= interaction.member.roles.highest.position) {
    await interaction.reply({ content: 'Nie możesz moderować użytkownika z równą lub wyższą rolą.', ephemeral: true });
    return;
  }

  await interaction.client.container.services.moderation.createCase({
    guildId: interaction.guildId,
    userId: user.id,
    moderatorId: interaction.user.id,
    action: 'WARN',
    reason,
  });

  await interaction.reply({ content: `Użytkownik ${user.tag} otrzymał ostrzeżenie. Powód: ${reason}`, ephemeral: false });
}
