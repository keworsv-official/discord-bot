const requiredVariables = ['DISCORD_TOKEN'];

const allowedLogLevels = new Set(['debug', 'info', 'warn', 'error']);
const allowedEnvironments = new Set(['development', 'test', 'production']);

export function loadEnvironment(env = process.env) {
  const missing = requiredVariables.filter((name) => !env[name]);

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }

  const nodeEnv = env.NODE_ENV ?? 'development';
  const logLevel = env.LOG_LEVEL ?? 'info';

  if (!allowedEnvironments.has(nodeEnv)) {
    throw new Error(`Invalid NODE_ENV: ${nodeEnv}`);
  }

  if (!allowedLogLevels.has(logLevel)) {
    throw new Error(`Invalid LOG_LEVEL: ${logLevel}`);
  }

  if (nodeEnv === 'production' && !env.DISCORD_CLIENT_ID) {
    throw new Error('DISCORD_CLIENT_ID is required in production.');
  }

  return {
    discordToken: env.DISCORD_TOKEN,
    clientId: env.DISCORD_CLIENT_ID ?? null,
    nodeEnv,
    logLevel,
    databasePath: env.DATABASE_PATH ?? './data/bot.sqlite',
  };
}
