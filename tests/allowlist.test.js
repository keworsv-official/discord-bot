import test from 'node:test';
import assert from 'node:assert/strict';
import { createAllowlistService } from '../src/services/allowlist.js';

test('allowlist supports add, check, remove and list', () => {
  const service = createAllowlistService();
  service.add('guild', 'user');
  assert.equal(service.has('guild', 'user'), true);
  assert.deepEqual(service.list('guild'), ['user']);
  service.remove('guild', 'user');
  assert.equal(service.has('guild', 'user'), false);
});
