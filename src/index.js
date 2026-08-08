import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadEnvironment } from './config/env.js';
import { createApplication } from './core/application.js';
import { createCommandRegistry } from './core/command-registry.js';
import { loadCommands } from './core/command-loader.js';
import { publishCommands } from './core/command-publisher.js';
import { registerInteractionHandler } from './core/interaction-handler.js';
import { createDatabaseService } from './database/index.js';
import { createAuditService } from './services/audit.js';
import { createAutoModService } from './services/automod.js';
import { createAntiRaidService } from './services/anti-raid.js';
import { createAntiSpamService } from './services/antispam.js';
import { createCooldownService } from './services/cooldown.js';
import { createGuildSettingsService } from './services/guild-settings.js';
import { createModerationService } from './services/moderation.js';
import { createTicketService } from './services/tickets.js';
import { registerAntiRaidEvents } from './events/anti-raid.js';
import { registerProtectionEvents } from './events/anti-protection.js';
import { registerAuditEvents } from './events/audit.js';

const config = loadEnvironment();
const databaseService = await createDatabaseService(config.databasePath);
const application = createApplication(config, databaseService);
const database = databaseService.database;

Object.assign(application.container.services, {
  audit: createAuditService(database),
  autoMod: createAutoModService(),
  antiRaid: createAntiRaidService(),
  antiSpam: createAntiSpamService(),
  cooldown: createCooldownService(),
  guildSettings: createGuildSettingsService(database),
  moderation: createModerationService(database),
  tickets: createTicketService(database),
});

registerProtectionEvents(application.client, {
  autoMod: application.container.services.autoMod,
  antiSpam: application.container.services.antiSpam,
  logger: application.container.logger,
});
registerAntiRaidEvents(application.client, {
  antiRaid: application.container.services.antiRaid,
  logger: application.container.logger,
});
registerAuditEvents(application.client, application.container.services.audit, application.container.logger);

const registry = createCommandRegistry();
const commandsDirectory = path.join(path.dirname(fileURLToPath(import.meta.url)), 'commands');
const loadedCommands = await loadCommands(commandsDirectory, registry);
application.container.logger.info('Loaded commands.', { count: loadedCommands.length, commands: loadedCommands });
registerInteractionHandler(application.client, registry, application.container.logger);
application.client.once('ready', async (client) => {
  await publishCommands(client, registry, config, application.container.logger);
});

process.on('unhandledRejection', (error) => {
  application.container.logger.error('Unhandled promise rejection.', {
    message: error instanceof Error ? error.message : String(error),
  });
});
process.on('uncaughtException', (error) => {
  application.container.logger.error('Uncaught exception.', { message: error.message, stack: error.stack });
  process.exitCode = 1;
});

const shutdown = async (signal) => {
  application.container.logger.info(`Received ${signal}; shutting down.`);
  application.client.destroy();
  await databaseService.close();
};
process.once('SIGINT', () => void shutdown('SIGINT'));
process.once('SIGTERM', () => void shutdown('SIGTERM'));

await application.start();
