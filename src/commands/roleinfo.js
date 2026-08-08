import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('roleinfo')
  .setDescription('Pokazuje informacje o roli.')
  .addRoleOption((option) => option.setName('rola').setDescription('Rola do sprawdzenia.').setRequired(true));

export async function execute(interaction) {
  const role = interaction.options.getRole('rola', true);
  const embed = new EmbedBuilder()
    .setTitle(`Rola: ${role.name}`)
    .addFields(
      { name: 'ID', value: role.id, inline: true },
      { name: 'Pozycja', value: String(role.position), inline: true },
      { name: 'Członkowie', value: String(role.members.size), inline: true },
      { name: 'Wzmiankowalna', value: role.mentionable ? 'Tak' : 'Nie', inline: true },
      { name: 'Wyświetlana osobno', value: role.hoist ? 'Tak' : 'Nie', inline: true },
    );
  await interaction.reply({ embeds: [embed], ephemeral: true });
}
