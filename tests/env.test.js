import test from 'node:test';
import assert from 'node:assert/strict';
import { loadEnvironment } from '../src/config/env.js';

test('environment requires discord token', () => {
  assert.throws(() => loadEnvironment({}), /DISCORD_TOKEN/);
});

test('production requires client id', () => {
  assert.throws(
    () => loadEnvironment({ DISCORD_TOKEN: 'token', NODE_ENV: 'production' }),
    /DISCORD_CLIENT_ID/,
  );
});

test('environment accepts valid configuration', () => {
  const config = loadEnvironment({
    DISCORD_TOKEN: 'token',
    DISCORD_CLIENT_ID: 'client',
    NODE_ENV: 'production',
    LOG_LEVEL: 'warn',
    DATABASE_PATH: './data/test.sqlite',
  });

  assert.equal(config.nodeEnv, 'production');
  assert.equal(config.logLevel, 'warn');
  assert.equal(config.databasePath, './data/test.sqlite');
});
