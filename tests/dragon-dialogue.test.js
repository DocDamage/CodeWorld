import test from 'node:test';
import assert from 'node:assert/strict';

import { createDragonDialogue } from '../src/dragon-dialogue.js';

test('Aurelith begins wary but explicitly peaceful', () => {
  const dialogue=createDragonDialogue();
  assert.equal(dialogue.snapshot.open,false);

  const opening=dialogue.talk();
  assert.equal(opening.open,true);
  assert.equal(opening.speaker,'Aurelith');
  assert.match(opening.text,/peace|harm/i);
  assert.deepEqual(opening.choices.map(choice=>choice.id),['ask_name','offer_name','ask_chains']);
});

test('respectful conversation can form a persistent friendship', () => {
  const dialogue=createDragonDialogue();
  dialogue.talk();
  let state=dialogue.reply('offer_name');
  assert.equal(state.relationship,1);
  assert.equal(state.chapter,'introduced');

  state=dialogue.reply('offer_help');
  assert.equal(state.chapter,'accord');
  state=dialogue.reply('promise');
  assert.equal(state.befriended,true);
  assert.equal(state.chapter,'friend');
  assert.equal(state.relationship,3);

  dialogue.close();
  state=dialogue.talk();
  assert.equal(state.befriended,true);
  assert.match(state.text,/friend/i);
});

test('invalid and closed replies cannot mutate the dialogue', () => {
  const dialogue=createDragonDialogue();
  assert.throws(()=>dialogue.reply('ask_name'),/not open/i);
  dialogue.talk();
  const before=dialogue.snapshot;
  assert.throws(()=>dialogue.reply('steal_hoard'),/choice/i);
  assert.deepEqual(dialogue.snapshot,before);
});
