import { PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('role')
  .setDescription('Zarządza rolą użytkownika.')
  .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
  .addSubcommand((sub) => sub
    .setName('dodaj')
    .setDescription('Nadaje rolę użytkownikowi.')
    .addUserOption((option) => option.setName('użytkownik').setDescription('Użytkownik.').setRequired(true))
    .addRoleOption((option) => option.setName('rola').setDescription('Rola.').setRequired(true)))
  .addSubcommand((sub) => sub
    .setName('usuń')
    .setDescription('Usuwa rolę użytkownikowi.')
    .addUserOption((option) => option.setName('użytkownik').setDescription('Użytkownik.').setRequired(true))
    .addRoleOption((option) => option.setName('rola').setDescription('Rola.').setRequired(true)));

export async function execute(interaction) {
  const user = interaction.options.getUser('użytkownik', true);
  const role = interaction.options.getRole('rola', true);
  const member = await interaction.guild.members.fetch(user.id);

  if (role.managed || role.position >= interaction.member.roles.highest.position) {
    await interaction.reply({ content: 'Nie możesz zarządzać tą rolą.', ephemeral: true });
    return;
  }

  const action = interaction.options.getSubcommand();
  if (action === 'dodaj') await member.roles.add(role, `Przez ${interaction.user.tag}`);
  else await member.roles.remove(role, `Przez ${interaction.user.tag}`);

  await interaction.reply({ content: `Rola ${role} została ${action === 'dodaj' ? 'nadana' : 'usunięta'} dla ${member}.`, ephemeral: true });
}
