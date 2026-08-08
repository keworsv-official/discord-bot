import test from 'node:test';
import assert from 'node:assert/strict';
import { createRateLimitService } from '../src/services/rate-limit.js';

test('rate limit blocks after configured limit', () => {
  const service = createRateLimitService();
  assert.equal(service.consume('test', { limit: 2, windowMs: 1000 }).allowed, true);
  assert.equal(service.consume('test', { limit: 2, windowMs: 1000 }).allowed, true);
  const blocked = service.consume('test', { limit: 2, windowMs: 1000 });
  assert.equal(blocked.allowed, false);
  assert.ok(blocked.retryAfterMs > 0);
});
