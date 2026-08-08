import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('health')
  .setDescription('Pokazuje stan techniczny bota.');

export async function execute(interaction) {
  const database = interaction.client.container?.database?.database;
  let databaseStatus = 'Niedostępna';

  try {
    await database?.get('SELECT 1 AS ok');
    databaseStatus = 'OK';
  } catch {
    databaseStatus = 'Błąd';
  }

  const embed = new EmbedBuilder()
    .setTitle('Stan systemu')
    .addFields(
      { name: 'Discord WebSocket', value: `${interaction.client.ws.ping} ms`, inline: true },
      { name: 'Baza danych', value: databaseStatus, inline: true },
      { name: 'Uptime', value: `${Math.floor(process.uptime())} s`, inline: true },
      { name: 'Node.js', value: process.version, inline: true },
    )
    .setTimestamp();

  await interaction.reply({ embeds: [embed], ephemeral: true });
}
