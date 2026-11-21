import assert from 'node:assert/strict';
import { test } from 'node:test';

test('JSON storage preserves legacy save payloads without injecting render identities', async () => {
  const { createJsonStore } = await import('../src/storage.js');
  const values = new Map(), storage = { getItem:key=>values.get(key)??null, setItem:(key,value)=>values.set(key,value), removeItem:key=>values.delete(key) };
  const legacy = { version: 1, stock: { feed: 7 }, fields: { wheat: { stage: 'growing' } } };
  values.set('farm', JSON.stringify(legacy));
  const store = createJsonStore(storage);
  assert.deepEqual(store.read('farm'), legacy);
  assert.equal('objectId' in store.read('farm'), false);
  assert.equal(store.write('farm', legacy), true);
  assert.equal(store.remove('farm'), true);
  assert.equal(store.read('farm'), null);
});

test('JSON storage contains malformed or unavailable browser storage failures', async () => {
  const { createJsonStore } = await import('../src/storage.js');
  const broken = createJsonStore({ getItem(){throw new Error('denied');}, setItem(){throw new Error('quota');}, removeItem(){throw new Error('denied');} });
  assert.equal(broken.read('x'), null);
  assert.equal(broken.write('x', { ok: true }), false);
  assert.equal(broken.remove('x'), false);
  const malformed = createJsonStore({ getItem:()=>'{bad' });
  assert.equal(malformed.read('x'), null);
});
