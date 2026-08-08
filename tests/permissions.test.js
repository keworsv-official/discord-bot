import test from 'node:test';
import assert from 'node:assert/strict';
import { hasPermissionLevel, permissionLevels } from '../src/core/permissions.js';

function member({ owner = false, administrator = false, manageMessages = false } = {}) {
  return {
    id: 'user',
    guild: { ownerId: owner ? 'user' : 'owner' },
    permissions: {
      has(permission) {
        return permission === 'Administrator' ? administrator : manageMessages;
      },
    },
  };
}

test('guild owner satisfies every permission level', () => {
  const owner = member({ owner: true });
  assert.equal(hasPermissionLevel(owner, permissionLevels.OWNER), true);
});

test('administrator satisfies administrator level', () => {
  const admin = member({ administrator: true });
  assert.equal(hasPermissionLevel(admin, permissionLevels.ADMINISTRATOR), true);
});

test('moderator requires message management permission', () => {
  const moderator = member({ manageMessages: true });
  assert.equal(hasPermissionLevel(moderator, permissionLevels.MODERATOR), true);
});
