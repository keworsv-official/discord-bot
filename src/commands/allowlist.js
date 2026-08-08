import { PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('allowlist')
  .setDescription('Zarządza zaufanymi użytkownikami ochrony.')
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
  .addSubcommand((command) => command
    .setName('dodaj')
    .setDescription('Dodaje użytkownika do allowlisty.')
    .addUserOption((option) => option.setName('użytkownik').setDescription('Zaufany użytkownik.').setRequired(true)))
  .addSubcommand((command) => command
    .setName('usuń')
    .setDescription('Usuwa użytkownika z allowlisty.')
    .addUserOption((option) => option.setName('użytkownik').setDescription('Użytkownik.').setRequired(true)))
  .addSubcommand((command) => command
    .setName('lista')
    .setDescription('Pokazuje allowlistę.'));

export async function execute(interaction) {
  const service = interaction.client.container?.services?.allowlist;
  if (!service) {
    await interaction.reply({ content: 'System allowlisty nie jest dostępny.', ephemeral: true });
    return;
  }

  const subcommand = interaction.options.getSubcommand();
  if (subcommand === 'lista') {
    const users = service.list(interaction.guildId);
    await interaction.reply({
      content: users.length ? users.map((id) => `<@${id}>`).join(', ') : 'Allowlista jest pusta.',
      ephemeral: true,
    });
    return;
  }

  const user = interaction.options.getUser('użytkownik', true);
  if (user.id === interaction.guild.ownerId) {
    await interaction.reply({ content: 'Właściciel serwera nie wymaga wpisu na allowliście.', ephemeral: true });
    return;
  }

  if (subcommand === 'dodaj') {
    service.add(interaction.guildId, user.id);
    await interaction.reply({ content: `Dodano <@${user.id}> do allowlisty.`, ephemeral: true });
    return;
  }

  service.remove(interaction.guildId, user.id);
  await interaction.reply({ content: `Usunięto <@${user.id}> z allowlisty.`, ephemeral: true });
}
