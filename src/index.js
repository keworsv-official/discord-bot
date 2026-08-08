import 'dotenv/config';
import { Client, GatewayIntentBits, Partials } from 'discord.js';

const token = process.env.DISCORD_TOKEN;

if (!token) {
  throw new Error('DISCORD_TOKEN is not configured. Copy .env.example to .env and provide a valid bot token.');
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Channel, Partials.GuildMember, Partials.Message, Partials.User],
});

client.once('ready', (readyClient) => {
  console.log(`[READY] ${readyClient.user.tag} is online.`);
});

client.on('error', (error) => {
  console.error('[DISCORD] Client error:', error);
});

process.on('unhandledRejection', (error) => {
  console.error('[PROCESS] Unhandled rejection:', error);
});

process.on('uncaughtException', (error) => {
  console.error('[PROCESS] Uncaught exception:', error);
  process.exitCode = 1;
});

await client.login(token);
