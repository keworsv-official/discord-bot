import { PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('ban')
  .setDescription('Banuje użytkownika.')
  .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
  .addUserOption((option) => option.setName('użytkownik').setDescription('Użytkownik.').setRequired(true))
  .addStringOption((option) => option.setName('powód').setDescription('Powód bana.').setMaxLength(500));

export async function execute(interaction) {
  const target = interaction.options.getMember('użytkownik');
  const user = interaction.options.getUser('użytkownik');
  const reason = interaction.options.getString('powód') ?? 'Nie podano powodu.';

  if (!target || target.id === interaction.user.id || target.id === interaction.guild.ownerId) {
    await interaction.reply({ content: 'Nie można zbanować tego użytkownika.', ephemeral: true });
    return;
  }

  if (!target.bannable || target.roles.highest.position >= interaction.member.roles.highest.position) {
    await interaction.reply({ content: 'Nie możesz zbanować tego użytkownika.', ephemeral: true });
    return;
  }

  await target.ban({ reason });
  await interaction.client.container.services.moderation.createCase({
    guildId: interaction.guildId,
    userId: user.id,
    moderatorId: interaction.user.id,
    action: 'BAN',
    reason,
  });

  await interaction.reply({ content: `Użytkownik ${user.tag} został zbanowany.`, ephemeral: false });
}
