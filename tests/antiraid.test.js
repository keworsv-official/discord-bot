import test from 'node:test';
import assert from 'node:assert/strict';
import { createAntiRaidService } from '../src/services/anti-raid.js';

test('anti-raid detects join bursts', () => {
  const service = createAntiRaidService({ windowMs: 1000, threshold: 3 });
  assert.equal(service.recordJoin('g', '1').raidDetected, false);
  assert.equal(service.recordJoin('g', '2').raidDetected, false);
  assert.equal(service.recordJoin('g', '3').raidDetected, true);
});
