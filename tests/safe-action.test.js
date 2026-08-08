import test from 'node:test';
import assert from 'node:assert/strict';
import { canActOnMember, canManageRole } from '../src/core/safe-action.js';

function member(id, position, ownerId = 'owner') {
  return {
    id,
    guild: { ownerId },
    roles: { highest: { position } },
  };
}

test('moderator cannot act on owner or equal role', () => {
  const actor = member('mod', 10);
  assert.equal(canActOnMember(actor, member('owner', 1)), false);
  assert.equal(canActOnMember(actor, member('target', 10)), false);
  assert.equal(canActOnMember(actor, member('target', 9)), true);
});

test('role management respects hierarchy', () => {
  const actor = member('mod', 10);
  assert.equal(canManageRole(actor, { position: 10, managed: false }), false);
  assert.equal(canManageRole(actor, { position: 9, managed: false }), true);
  assert.equal(canManageRole(actor, { position: 9, managed: true }), false);
});
