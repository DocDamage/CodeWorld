import assert from 'node:assert/strict';
import { test } from 'node:test';

test('gameplay actions retain stable IDs independently of their labels', async () => {
  const { createAction, actionIds } = await import('../src/actions.js');
  let calls = 0;
  const first = createAction(actionIds.village.enter, 'Enter Bramble Bakery', () => ++calls, { objectId: 'bakery' });
  const renamed = createAction(actionIds.village.enter, 'Go inside Bramble Bakery', () => ++calls, { objectId: 'bakery' });
  assert.equal(first.id, 'village.enter');
  assert.equal(renamed.id, first.id);
  assert.notEqual(renamed.label, first.label);
  assert.equal(first.objectId, 'bakery');
  assert.equal(first.perform(), 1);
  assert.throws(() => createAction('', 'Broken', () => {}), /stable id/i);
});

test('legacy task shapes gain deterministic scoped action IDs without changing behavior', async () => {
  const { normalizeAction } = await import('../src/actions.js');
  const legacy = { label: 'Collect iron ore', perform: () => 7 };
  const action = normalizeAction(legacy, 'mine.perform', 'region:mine');
  assert.equal(action.id, 'mine.perform');
  assert.equal(action.label, legacy.label);
  assert.equal(action.objectId, 'region:mine');
  assert.equal(action.perform(), 7);
});
