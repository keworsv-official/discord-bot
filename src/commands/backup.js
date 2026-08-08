import path from 'node:path';
import { PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('backup')
  .setDescription('Tworzy kopię zapasową bazy SQLite.')
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

export async function execute(interaction) {
  if (interaction.guild.ownerId !== interaction.user.id) {
    await interaction.reply({ content: 'Tylko właściciel serwera może wykonać backup bazy.', ephemeral: true });
    return;
  }

  const service = interaction.client.container?.services?.databaseBackup;
  if (!service) {
    await interaction.reply({ content: 'Usługa backupu nie jest dostępna.', ephemeral: true });
    return;
  }

  const timestamp = new Date().toISOString().replaceAll(':', '-').replaceAll('.', '-');
  const destination = path.join('data', 'backups', `${interaction.guildId}-${timestamp}.sqlite`);
  const resolved = await service.backup(destination);

  await interaction.reply({
    content: `Backup został utworzony: \`${resolved}\`.`,
    ephemeral: true,
  });
}
