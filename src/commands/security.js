import { PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('security')
  .setDescription('Konfiguruje ochronę serwera.')
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
  .addSubcommand((command) => command
    .setName('status')
    .setDescription('Pokazuje stan ochrony.'))
  .addSubcommand((command) => command
    .setName('ustaw')
    .setDescription('Włącza lub wyłącza moduł ochrony.')
    .addStringOption((option) => option
      .setName('moduł')
      .setDescription('Moduł ochrony.')
      .setRequired(true)
      .addChoices(
        { name: 'AutoMod', value: 'autoModEnabled' },
        { name: 'Anti-Spam', value: 'antiSpamEnabled' },
        { name: 'Anti-Raid', value: 'antiRaidEnabled' },
        { name: 'Anti-Nuke', value: 'antiNukeEnabled' },
      ))
    .addBooleanOption((option) => option
      .setName('włączone')
      .setDescription('Czy moduł ma być aktywny?')
      .setRequired(true)));

export async function execute(interaction) {
  const service = interaction.client.container?.services?.securityConfig;
  if (!service) {
    await interaction.reply({ content: 'Konfiguracja bezpieczeństwa nie jest dostępna.', ephemeral: true });
    return;
  }

  if (interaction.options.getSubcommand() === 'status') {
    const config = await service.get(interaction.guildId);
    await interaction.reply({
      content: [
        `AutoMod: ${config.autoModEnabled ? 'ON' : 'OFF'}`,
        `Anti-Spam: ${config.antiSpamEnabled ? 'ON' : 'OFF'}`,
        `Anti-Raid: ${config.antiRaidEnabled ? 'ON' : 'OFF'}`,
        `Anti-Nuke: ${config.antiNukeEnabled ? 'ON' : 'OFF'}`,
      ].join('\n'),
      ephemeral: true,
    });
    return;
  }

  const module = interaction.options.getString('moduł', true);
  const enabled = interaction.options.getBoolean('włączone', true);
  await service.update(interaction.guildId, { [module]: enabled ? 1 : 0 });
  await interaction.reply({ content: `Moduł \`${module}\` został ${enabled ? 'włączony' : 'wyłączony'}.`, ephemeral: true });
}
