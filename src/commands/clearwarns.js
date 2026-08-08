import { PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('clearwarns')
  .setDescription('Usuwa historię ostrzeżeń użytkownika.')
  .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
  .addUserOption((option) => option
    .setName('użytkownik')
    .setDescription('Użytkownik, którego ostrzeżenia zostaną usunięte.')
    .setRequired(true));

export async function execute(interaction) {
  const user = interaction.options.getUser('użytkownik', true);
  const database = interaction.client.container?.database?.database;

  if (!database) {
    await interaction.reply({ content: 'Baza danych nie jest dostępna.', ephemeral: true });
    return;
  }

  const result = await database.run(
    `DELETE FROM moderation_cases WHERE guild_id = ? AND user_id = ? AND action = 'warn'`,
    interaction.guildId,
    user.id,
  );

  await interaction.reply({ content: `Usunięto ${result.changes} wpisów ostrzeżeń użytkownika ${user.tag}.`, ephemeral: true });
}
