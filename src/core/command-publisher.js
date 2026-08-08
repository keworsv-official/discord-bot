export async function publishCommands(client, registry, config, logger) {
  if (!config.clientId) {
    logger.warn('DISCORD_CLIENT_ID is not configured; slash commands were not published.');
    return;
  }

  const payload = registry.all().map((command) => command.data.toJSON());
  await client.application.commands.set(payload);
  logger.info('Published slash commands.', { count: payload.length });
}
