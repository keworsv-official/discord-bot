import { Client, GatewayIntentBits, Partials } from 'discord.js';
import { createContainer } from './container.js';
import { createLogger } from './logger.js';

export function createApplication(config, database = null) {
  const logger = createLogger({ level: config.logLevel });
  const container = createContainer({ config, logger, database });

  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
    ],
    partials: [Partials.Channel, Partials.GuildMember, Partials.Message, Partials.User],
  });

  client.container = container;

  client.once('ready', (readyClient) => {
    logger.info(`Discord client ready as ${readyClient.user.tag}.`);
  });

  client.on('error', (error) => {
    logger.error('Discord client error.', { message: error.message, stack: error.stack });
  });

  async function start() {
    logger.info('Starting application.', { environment: config.nodeEnv });
    await client.login(config.discordToken);
  }

  return Object.freeze({ client, container, start });
}
