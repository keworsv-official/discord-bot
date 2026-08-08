import { loadEnvironment } from './config/env.js';
import { createApplication } from './core/application.js';

const config = loadEnvironment();
const application = createApplication(config);

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

await application.start();
