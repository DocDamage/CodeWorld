import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  createFishFight,
  FISH_FIGHT_LIMITS,
  stepFishFight,
} from '../src/lake-fight.js';

function sequence(values) {
  let index = 0;
  return () => values[index++ % values.length];
}

function playAdaptive(species, weightKg, distance, dt = 1 / 60, limit = 75) {
  const state = createFishFight(species, weightKg, distance, sequence([.18, .82, .36, .64, .27, .73]));
  let reel = 1;
  let sawRun = false;
  while (!state.outcome && state.time < limit) {
    if (reel && state.tension >= .70) reel = 0;
    else if (!reel && state.tension <= .40) reel = 1;
    stepFishFight(state, dt, reel);
    sawRun ||= state.running;
  }
  return { state, sawRun };
}

test('creates a deterministic public fight state with safe normalized values', () => {
  const a = createFishFight({ name: 'European Perch' }, 1.4, 13, () => .25);
  const b = createFishFight('European Perch', 1.4, 13, () => .25);

  for (const state of [a, b]) {
    assert.equal(state.distance, 13);
    assert.ok(state.tension >= 0 && state.tension <= 1);
    assert.equal(state.running, false);
    assert.equal(state.stamina, 1);
    assert.equal(state.time, 0);
    assert.equal(state.outcome, null);
    assert.equal(state.lateral, 0);
    assert.ok(state.depth > 0);
    assert.equal(state.pull, 0);
    assert.equal(state.headShake, 0);
  }
  assert.deepEqual(
    [a.distance, a.tension, a.stamina, a.depth],
    [b.distance, b.tension, b.stamina, b.depth],
  );
  assert.ok(FISH_FIGHT_LIMITS.snapTension > FISH_FIGHT_LIMITS.slackTension);
  assert.ok(FISH_FIGHT_LIMITS.snapGraceSeconds >= .3);
  assert.ok(FISH_FIGHT_LIMITS.slackGraceSeconds >= .8);
});

test('hysteresis reeling lands fish and a heavy pike fights substantially longer than a perch', () => {
  const perch = playAdaptive('European Perch', 1.2, 13);
  const pike = playAdaptive('Northern Pike', 8, 13);

  assert.equal(perch.state.outcome, 'landed');
  assert.equal(pike.state.outcome, 'landed');
  assert.ok(perch.sawRun && pike.sawRun);
  assert.ok(perch.state.time >= 5 && perch.state.time < 30, `perch took ${perch.state.time}s`);
  assert.ok(pike.state.time > perch.state.time * 1.35, `${pike.state.time}s versus ${perch.state.time}s`);
  assert.ok(pike.state.time < 65, `pike took ${pike.state.time}s`);
});

test('a gentle perch can be steadily reeled in without inevitable line failure', () => {
  const perch = createFishFight('European Perch', .35, 13, sequence([.2, .8, .35, .65]));
  while (!perch.outcome && perch.time < 20) stepFishFight(perch, 1 / 60, 1);

  assert.equal(perch.outcome, 'landed');
  assert.ok(perch.time < 12, `small perch took ${perch.time}s`);
  assert.ok(perch.tension < FISH_FIGHT_LIMITS.snapTension);
});

test('holding reel through a run snaps the line while prolonged loose line loses the hook', () => {
  const snapped = createFishFight('Northern Pike', 10, 18, () => .2);
  let sawRun = false;
  while (!snapped.outcome && snapped.time < 12) {
    stepFishFight(snapped, 1 / 60, 1);
    sawRun ||= snapped.running;
  }
  assert.ok(sawRun, 'the pike begins a run before the line snaps');
  assert.equal(snapped.outcome, 'snapped');
  assert.equal(snapped.tension, 1);

  const slack = createFishFight('European Perch', .8, 12, () => .95);
  while (!slack.outcome && slack.time < 8) stepFishFight(slack, 1 / 60, 0);
  assert.equal(slack.outcome, 'slack');
  assert.equal(slack.tension, 0);
});

test('brief high and low tension warnings are both recoverable', () => {
  const high = createFishFight('Northern Pike', 6, 16, () => .1);
  while (high.tension < FISH_FIGHT_LIMITS.snapTension && !high.outcome) {
    stepFishFight(high, 1 / 120, 1);
  }
  stepFishFight(high, FISH_FIGHT_LIMITS.snapGraceSeconds * .45, 0);
  assert.equal(high.outcome, null);
  assert.ok(high.tension < FISH_FIGHT_LIMITS.snapTension);

  const low = createFishFight('European Perch', .9, 12, () => .95);
  while (low.tension > FISH_FIGHT_LIMITS.slackTension && !low.outcome) {
    stepFishFight(low, 1 / 120, 0);
  }
  stepFishFight(low, FISH_FIGHT_LIMITS.slackGraceSeconds * .45, 1);
  assert.equal(low.outcome, null);
  assert.ok(low.tension > FISH_FIGHT_LIMITS.slackTension);
});

test('pike runs produce stronger pulls and broader lateral/depth movement than perch', () => {
  function observe(species, weight) {
    const state = createFishFight(species, weight, 13, sequence([.12, .88, .32, .68]));
    let reel = 1, runTime = 0, peakPull = 0, peakShake = 0;
    let minLateral = 0, maxLateral = 0, minDepth = state.depth, maxDepth = state.depth;
    for (let i = 0; i < 12 * 60 && !state.outcome; i++) {
      if (reel && state.tension >= .72) reel = 0;
      else if (!reel && state.tension <= .38) reel = 1;
      stepFishFight(state, 1 / 60, reel);
      if (state.running) runTime += 1 / 60;
      peakPull = Math.max(peakPull, state.pull);
      peakShake = Math.max(peakShake, Math.abs(state.headShake));
      minLateral = Math.min(minLateral, state.lateral);
      maxLateral = Math.max(maxLateral, state.lateral);
      minDepth = Math.min(minDepth, state.depth);
      maxDepth = Math.max(maxDepth, state.depth);
    }
    return { runTime, peakPull, peakShake, lateralRange: maxLateral - minLateral, depthRange: maxDepth - minDepth };
  }

  const perch = observe('European Perch', 1.2);
  const pike = observe('Northern Pike', 8);
  assert.ok(pike.runTime > perch.runTime * 1.25, `${pike.runTime} versus ${perch.runTime}`);
  assert.ok(pike.peakPull > perch.peakPull + .15);
  assert.ok(pike.peakShake > perch.peakShake + .15);
  assert.ok(pike.lateralRange > perch.lateralRange * 1.25);
  assert.ok(pike.depthRange > perch.depthRange * 1.15);
});

test('simulation is stable across render step rates', () => {
  function simulate(dt) {
    const state = createFishFight('Northern Pike', 5, 20, sequence([.17, .83, .29, .71]));
    const duration = 6;
    for (let time = 0; time < duration - 1e-9; time += dt) {
      stepFishFight(state, dt, .4, .09 * dt);
    }
    return state;
  }

  const coarse = simulate(1 / 30);
  const fine = simulate(1 / 120);
  for (const key of ['distance', 'tension', 'stamina', 'lateral', 'depth']) {
    assert.ok(Math.abs(coarse[key] - fine[key]) < .035, `${key}: ${coarse[key]} versus ${fine[key]}`);
  }
  assert.equal(coarse.running, fine.running);
  assert.equal(coarse.outcome, fine.outcome);
  assert.ok(Math.abs(coarse.time - 6) < 1e-8);
  assert.ok(Math.abs(fine.time - 6) < 1e-8);
});

test('angler movement away from the fish pays out distance and raises line tension', () => {
  const still = createFishFight('European Perch', 1, 14, () => .5);
  const moving = createFishFight('European Perch', 1, 14, () => .5);

  stepFishFight(still, .1, .4, 0);
  stepFishFight(moving, .1, .4, .65);

  assert.ok(moving.distance > still.distance + .60);
  assert.ok(moving.tension > still.tension + .07);
  assert.ok(moving.depth > 0);
});

test('a pike takes line against loose drag and can be brought back on tighter drag as it tires', () => {
  const fight = createFishFight('Northern Pike', 12, 14, () => .35);
  const locked = createFishFight('Northern Pike', 12, 14, () => .35);
  fight.drag = .2;
  let lineTaken = 0;
  while (fight.stamina > .45 && fight.time < 30 && !fight.outcome) {
    const before = fight.distance;
    stepFishFight(fight, 1 / 60, 1);
    stepFishFight(locked, 1 / 60, 1);
    if (fight.payout > 0) {
      assert.ok(fight.distance > before);
      lineTaken += fight.distance - before;
    }
  }
  assert.ok(lineTaken > 3);
  assert.equal(fight.outcome, null);
  assert.equal(locked.outcome, 'snapped');
  const distanceBeforeRecovery = fight.distance;
  fight.drag = .75;
  let reel = 1;
  while (!fight.outcome && fight.time < 65) {
    if (fight.tension > .73) reel = 0;
    if (fight.tension < .43) reel = 1;
    stepFishFight(fight, 1 / 60, reel);
  }
  assert.equal(fight.outcome, 'landed');
  assert.ok(fight.distance < distanceBeforeRecovery);
});
