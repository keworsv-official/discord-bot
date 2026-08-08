import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('help')
  .setDescription('Pokazuje dostępne funkcje bota.');

export async function execute(interaction) {
  const commands = [...interaction.client.commands?.values?.() ?? []]
    .map((command) => command.data.name)
    .sort();

  const embed = new EmbedBuilder()
    .setTitle('Pomoc')
    .setDescription('Dostępne polecenia są rejestrowane automatycznie podczas uruchamiania bota.')
    .addFields({ name: 'Komendy', value: commands.length ? commands.map((name) => `\`/${name}\``).join(', ') : 'Brak zarejestrowanych komend.' })
    .setTimestamp();

  await interaction.reply({ embeds: [embed], ephemeral: true });
}
