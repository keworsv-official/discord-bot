import { PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('lock')
  .setDescription('Blokuje wysyłanie wiadomości na kanale.')
  .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels);

export async function execute(interaction) {
  const channel = interaction.channel;
  if (!channel?.isTextBased() || !('permissionOverwrites' in channel)) {
    await interaction.reply({ content: 'Nie można zablokować tego kanału.', ephemeral: true });
    return;
  }

  await channel.permissionOverwrites.edit(interaction.guild.roles.everyone, { SendMessages: false });
  await interaction.reply({ content: 'Kanał został zablokowany.', ephemeral: true });
}
