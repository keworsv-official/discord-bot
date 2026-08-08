import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('userinfo')
  .setDescription('Pokazuje informacje o użytkowniku.')
  .addUserOption((option) => option
    .setName('użytkownik')
    .setDescription('Użytkownik do sprawdzenia.')
    .setRequired(false));

export async function execute(interaction) {
  const user = interaction.options.getUser('użytkownik') ?? interaction.user;
  const member = await interaction.guild.members.fetch(user.id).catch(() => null);

  const embed = new EmbedBuilder()
    .setTitle(`Informacje: ${user.tag}`)
    .setThumbnail(user.displayAvatarURL({ size: 256 }))
    .addFields(
      { name: 'ID', value: user.id, inline: true },
      { name: 'Konto utworzone', value: `<t:${Math.floor(user.createdTimestamp / 1000)}:F>`, inline: true },
      { name: 'Dołączył na serwer', value: member ? `<t:${Math.floor(member.joinedTimestamp / 1000)}:F>` : 'Brak danych', inline: true },
    )
    .setTimestamp();

  await interaction.reply({ embeds: [embed], ephemeral: true });
}
