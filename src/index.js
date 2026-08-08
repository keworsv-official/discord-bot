import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadEnvironment } from './config/env.js';
import { createApplication } from './core/application.js';
import { createCommandRegistry } from './core/command-registry.js';
import { loadCommands } from './core/command-loader.js';
import { publishCommands } from './core/command-publisher.js';
import { registerInteractionHandler } from './core/interaction-handler.js';
import { createDatabaseService } from './database/index.js';

const config = loadEnvironment();
const databaseService = await createDatabaseService(config.databasePath);
const application = createApplication(config, databaseService);
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
  application.container.logger.error('Uncaught exception.', {
    message: error.message,
    stack: error.stack,
  });
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
