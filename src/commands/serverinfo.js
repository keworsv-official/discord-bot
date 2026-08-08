import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('serverinfo')
  .setDescription('Pokazuje informacje o serwerze.');

export async function execute(interaction) {
  const guild = interaction.guild;
  const owner = await guild.fetchOwner().catch(() => null);
  const embed = new EmbedBuilder()
    .setTitle(guild.name)
    .setThumbnail(guild.iconURL({ size: 256 }))
    .addFields(
      { name: 'ID', value: guild.id, inline: true },
      { name: 'Właściciel', value: owner ? `<@${owner.id}>` : 'Brak danych', inline: true },
      { name: 'Członkowie', value: String(guild.memberCount), inline: true },
      { name: 'Kanały', value: String(guild.channels.cache.size), inline: true },
      { name: 'Role', value: String(guild.roles.cache.size), inline: true },
      { name: 'Utworzono', value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:F>`, inline: false },
    )
    .setTimestamp();
  await interaction.reply({ embeds: [embed], ephemeral: true });
}
