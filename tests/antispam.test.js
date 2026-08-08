import test from 'node:test';
import assert from 'node:assert/strict';
import { createAntiSpamService } from '../src/services/antispam.js';

test('anti-spam detects message bursts', () => {
  const service = createAntiSpamService({ windowMs: 1000, maxMessages: 2 });
  assert.equal(service.inspect({ guildId: 'g', userId: 'u', content: 'a' }).spam, false);
  assert.equal(service.inspect({ guildId: 'g', userId: 'u', content: 'b' }).spam, false);
  assert.equal(service.inspect({ guildId: 'g', userId: 'u', content: 'c' }).spam, true);
});

test('anti-spam detects duplicates', () => {
  const service = createAntiSpamService({ duplicateLimit: 2 });
  service.inspect({ guildId: 'g', userId: 'u', content: 'same' });
  assert.equal(service.inspect({ guildId: 'g', userId: 'u', content: 'same' }).duplicateSpam, true);
});
