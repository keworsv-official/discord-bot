import test from 'node:test';
import assert from 'node:assert/strict';
import { createAntiNukeService } from '../src/services/anti-nuke.js';

test('anti-nuke flags repeated destructive actions', () => {
  const service = createAntiNukeService({ channelDelete: 2 });
  assert.equal(service.record({ guildId: 'g', userId: 'u', action: 'channelDelete' }).suspicious, false);
  assert.equal(service.record({ guildId: 'g', userId: 'u', action: 'channelDelete' }).suspicious, true);
});
