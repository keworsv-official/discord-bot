import { loadEnvironment } from './config/env.js';
import { createApplication } from './core/application.js';
import { createDatabaseService } from './database/index.js';

const config = loadEnvironment();
const databaseService = await createDatabaseService(config.databasePath);
const application = createApplication(config, databaseService);

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
