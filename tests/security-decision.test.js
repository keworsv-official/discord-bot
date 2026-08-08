import test from 'node:test';
import assert from 'node:assert/strict';
import { createSecurityDecisionService } from '../src/services/security-decision.js';

test('security decision ignores owner and allowlisted users', () => {
  const allowlist = { has: (guildId, userId) => guildId === 'g' && userId === 'trusted' };
  const service = createSecurityDecisionService({ allowlist });

  assert.equal(service.shouldIgnore({ guildId: 'g', userId: 'owner', guildOwnerId: 'owner' }), true);
  assert.equal(service.shouldIgnore({ guildId: 'g', userId: 'trusted', guildOwnerId: 'owner' }), true);
  assert.equal(service.shouldEscalate({ guildId: 'g', userId: 'trusted', guildOwnerId: 'owner', suspicious: true }), false);
  assert.equal(service.shouldEscalate({ guildId: 'g', userId: 'attacker', guildOwnerId: 'owner', suspicious: true }), true);
});
