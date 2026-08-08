import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('ping')
  .setDescription('Sprawdza opóźnienie bota.');

export async function execute(interaction) {
  await interaction.reply({
    content: `Pong. Opóźnienie: ${interaction.client.ws.ping} ms.`,
    ephemeral: true,
  });
}
