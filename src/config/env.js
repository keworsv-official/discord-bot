const requiredVariables = ['DISCORD_TOKEN'];

export function loadEnvironment(env = process.env) {
  const missing = requiredVariables.filter((name) => !env[name]);

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }

  return {
    discordToken: env.DISCORD_TOKEN,
    clientId: env.DISCORD_CLIENT_ID ?? null,
    nodeEnv: env.NODE_ENV ?? 'development',
    logLevel: env.LOG_LEVEL ?? 'info',
    databasePath: env.DATABASE_PATH ?? './data/bot.sqlite',
  };
}
