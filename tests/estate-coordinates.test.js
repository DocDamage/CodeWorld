import test from 'node:test';
import assert from 'node:assert/strict';

import {
  estate,
  castleLocalToWorld,
  castleWorldToLocal,
  trail,
} from '../src/estate.js';

test('castle coordinate helpers round-trip enlarged-vault positions', () => {
  const world=castleLocalToWorld(12.5,-10.4,-16);
  assert.deepEqual(world,{x:estate.x+12.5,y:estate.y-16,z:estate.z-10.4});
  const local=castleWorldToLocal(world.x,world.z,world.y);
  assert.ok(Math.abs(local.x-12.5)<1e-10);
  assert.ok(Math.abs(local.y+16)<1e-10);
  assert.ok(Math.abs(local.z+10.4)<1e-10);
});

test('the estate trail starts at the town approach and reaches the enlarged drawbridge', () => {
  const start=trail.getPoint(0);
  const end=trail.getPoint(1);
  assert.ok(Math.hypot(start.x-19,start.z-4.7)<.001);
  assert.ok(Math.hypot(end.x-estate.x,end.z-(estate.z+36.7))<.15);
});
