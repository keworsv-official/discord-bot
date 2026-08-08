import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('avatar')
  .setDescription('Pokazuje avatar użytkownika.')
  .addUserOption((option) => option.setName('użytkownik').setDescription('Użytkownik.').setRequired(false));

export async function execute(interaction) {
  const user = interaction.options.getUser('użytkownik') ?? interaction.user;
  const embed = new EmbedBuilder()
    .setTitle(`Avatar: ${user.tag}`)
    .setImage(user.displayAvatarURL({ size: 1024 }))
    .setURL(user.displayAvatarURL({ size: 1024 }));
  await interaction.reply({ embeds: [embed], ephemeral: true });
}
