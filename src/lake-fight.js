const FIXED_STEP = 1 / 120;

export const FISH_FIGHT_LIMITS = Object.freeze({
  slackTension: .07,
  snapTension: .96,
  slackGraceSeconds: 1.1,
  snapGraceSeconds: .45,
});

const PROFILES = Object.freeze({
  default: Object.freeze({
    pull: .36, runSpeed: 1.35, runMin: .62, runMax: 1.02,
    restMin: 1.15, restMax: 2.15, shake: .14, shakeHz: 3.2,
    lateral: 1.0, depth: 1.05, dive: .55, fatigue: 1.0,
  }),
  perch: Object.freeze({
    pull: .31, runSpeed: 1.05, runMin: .36, runMax: .68,
    restMin: 1.35, restMax: 2.35, shake: .13, shakeHz: 5.4,
    lateral: .72, depth: .78, dive: .32, fatigue: 1.48,
  }),
  pike: Object.freeze({
    pull: .58, runSpeed: 2.15, runMin: .92, runMax: 1.52,
    restMin: .72, restMax: 1.38, shake: .22, shakeHz: 2.15,
    lateral: 1.95, depth: .92, dive: 1.05, fatigue: .68,
  }),
  carp: Object.freeze({
    pull: .50, runSpeed: 1.72, runMin: .9, runMax: 1.5,
    restMin: 1.05, restMax: 1.85, shake: .09, shakeHz: 1.45,
    lateral: 1.2, depth: 1.45, dive: .9, fatigue: .64,
  }),
  trout: Object.freeze({
    pull: .43, runSpeed: 1.85, runMin: .5, runMax: .92,
    restMin: .82, restMax: 1.55, shake: .18, shakeHz: 4.5,
    lateral: 1.65, depth: .72, dive: .48, fatigue: .9,
  }),
  eel: Object.freeze({
    pull: .38, runSpeed: 1.18, runMin: .8, runMax: 1.38,
    restMin: 1.0, restMax: 1.85, shake: .17, shakeHz: 3.8,
    lateral: 1.45, depth: 1.35, dive: .72, fatigue: .82,
  }),
  salmon: Object.freeze({
    pull: .59, runSpeed: 2.25, runMin: .82, runMax: 1.4,
    restMin: .72, restMax: 1.4, shake: .17, shakeHz: 3.65,
    lateral: 1.8, depth: 1.0, dive: .72, fatigue: .58,
  }),
  catfish: Object.freeze({
    pull: .65, runSpeed: 1.38, runMin: 1.15, runMax: 1.9,
    restMin: 1.25, restMax: 2.2, shake: .08, shakeHz: 1.2,
    lateral: .9, depth: 1.7, dive: 1.15, fatigue: .46,
  }),
  small: Object.freeze({
    pull: .22, runSpeed: .82, runMin: .28, runMax: .52,
    restMin: 1.45, restMax: 2.5, shake: .1, shakeHz: 6.2,
    lateral: .52, depth: .48, dive: .2, fatigue: 1.8,
  }),
});

const clamp = (value, low, high) => Math.max(low, Math.min(high, value));
const mix = (low, high, amount) => low + (high - low) * amount;

function speciesName(species) {
  if (typeof species === 'string') return species;
  if (species && typeof species.name === 'string') return species.name;
  return 'Fish';
}

function profileFor(name, weightKg) {
  const lower = name.toLowerCase();
  if (lower.includes('perch')) return PROFILES.perch;
  if (lower.includes('pike')) return PROFILES.pike;
  if (lower.includes('carp')) return PROFILES.carp;
  if (lower.includes('trout') || lower.includes('grayling')) return PROFILES.trout;
  if (lower.includes('eel') || lower.includes('burbot')) return PROFILES.eel;
  if (lower.includes('salmon')) return PROFILES.salmon;
  if (lower.includes('catfish')) return PROFILES.catfish;
  if (weightKg < .35) return PROFILES.small;
  return PROFILES.default;
}

function randomUnit(state) {
  const value = Number(state._rng());
  return Number.isFinite(value) ? clamp(value, 0, 1 - Number.EPSILON) : .5;
}

function scheduleRest(state) {
  const tiredness = 1 - state.stamina;
  state._nextRun = mix(state._profile.restMin, state._profile.restMax, randomUnit(state))
    * (1 + tiredness * 1.15);
}

function startRun(state) {
  const strength = .48 + state.stamina * .52;
  state.running = true;
  state._runRemaining = mix(state._profile.runMin, state._profile.runMax, randomUnit(state)) * strength;
  state._runDirection = randomUnit(state) < .5 ? -1 : 1;
  state._phase += randomUnit(state) * Math.PI;
  state.tension = Math.min(1, state.tension + state._profile.pull * .025 * strength);
}

/**
 * Creates the mutable state for a deterministic, renderer-independent fish fight.
 * `species` may be a species name or an object containing a `name` property.
 */
export function createFishFight(species, weightKg, distance, rng = Math.random) {
  const name = speciesName(species);
  const weight = Math.max(.01, Number(weightKg) || .01);
  const startDistance = Math.max(.35, Number(distance) || .35);
  const profile = profileFor(name, weight);
  const size = clamp(Math.log2(1 + weight) / 5, 0, 1);
  const state = {
    distance: startDistance,
    tension: .42,
    drag: 1,
    payout: 0,
    running: false,
    stamina: 1,
    time: 0,
    outcome: null,
    lateral: 0,
    depth: Math.max(.18, profile.depth + size * .28),
    pull: 0,
    headShake: 0,

    _weight: weight,
    _profile: profile,
    _rng: typeof rng === 'function' ? rng : Math.random,
    _size: size,
    _accumulator: 0,
    _phase: 0,
    _nextRun: 0,
    _runRemaining: 0,
    _runDirection: 1,
    _lateralVelocity: 0,
    _snapTimer: 0,
    _slackTimer: 0,
  };
  scheduleRest(state);
  return state;
}

function finish(state, outcome) {
  state.outcome = outcome;
  state.running = false;
  state.pull = 0;
  state.headShake = 0;
  state.payout = 0;
  if (outcome === 'snapped') state.tension = 1;
  else if (outcome === 'slack') state.tension = 0;
}

function simulateFixedStep(state, reel) {
  const profile = state._profile;

  if (state.running) {
    state._runRemaining -= FIXED_STEP;
    if (state._runRemaining <= 0) {
      state.running = false;
      scheduleRest(state);
    }
  } else {
    state._nextRun -= FIXED_STEP;
    if (state._nextRun <= 0 && state.stamina > .1) startRun(state);
  }

  state._phase += Math.PI * 2 * profile.shakeHz * FIXED_STEP;
  const massPull = .9 + state._size * .36;
  const pull = profile.pull * massPull * (.42 + state.stamina * .58);
  const shake = Math.sin(state._phase) * profile.shake
    * (state.running ? 1 : .28) * (.48 + state.stamina * .52);
  const runLoad = state.running ? pull : pull * .13;
  const reelLoad = .20 + state._size * .34;
  state.pull = clamp(runLoad * (state.running ? 1.35 : .7), 0, 1);
  state.headShake = clamp(shake / .24, -1, 1);
  const tensionRate = reel * (reelLoad + pull * (state.running ? .95 : .18))
    - (1 - reel) * .43
    + runLoad * (.14 + reel * .30)
    + shake
    - state.tension * .45;
  state.tension = clamp(state.tension + tensionRate * FIXED_STEP, 0, 1);

  // The spool slips when the fish loads it above the clutch setting. The crank
  // can keep turning during a run while the fish wins line against the drag.
  const clutch=.08+1.06*state.drag;
  const load=Math.max(state.tension,state.pull);
  const slip=clamp((load-clutch)*5,0,1);
  if(slip>0){
    state.tension+=(clutch-state.tension)*(1-Math.exp(-10*slip*FIXED_STEP));
  }
  const traction=reel*(1-slip);
  const retrieveSpeed = Math.max(1.72, 2.68 - Math.sqrt(state._weight) * .18)
    * (.72 + state.tension * .28) * traction;
  const runSpeed = state.running
    ? profile.runSpeed * (.92 + state._size * .28) * (.35 + state.stamina * .65) * (1 - traction * .42)
    : 0;
  state.distance = Math.max(.35, state.distance + (runSpeed - retrieveSpeed) * FIXED_STEP);
  state.payout=Math.max(0,runSpeed-retrieveSpeed)*slip;

  const endurance = .88 + Math.sqrt(state._weight) * .105;
  const effort = .018
    + reel * (.045 + state.tension * .035)
    + (state.running ? .055 + state.tension * .025 : 0);
  state.stamina = clamp(state.stamina - effort * profile.fatigue / endurance * FIXED_STEP, 0, 1);

  const lateralDrive = state.running ? state._runDirection * profile.lateral * (.4 + state.stamina * .6) : 0;
  const headShake = Math.sin(state._phase) * profile.lateral * (state.running ? .32 : .1);
  state._lateralVelocity += (lateralDrive + headShake - state._lateralVelocity * 1.35) * FIXED_STEP;
  state.lateral += state._lateralVelocity * FIXED_STEP;
  const lateralLimit = Math.max(.45, state.distance * .86);
  state.lateral = clamp(state.lateral, -lateralLimit, lateralLimit);

  const depthTarget = profile.depth + state._size * .28
    + (state.running ? profile.dive * (.35 + state.stamina * .65) : 0)
    - reel * .25
    + Math.sin(state._phase) * profile.dive * .055;
  state.depth = Math.max(.12, state.depth + (depthTarget - state.depth) * FIXED_STEP * 2.2);

  if (state.tension >= FISH_FIGHT_LIMITS.snapTension) state._snapTimer += FIXED_STEP;
  else state._snapTimer = Math.max(0, state._snapTimer - FIXED_STEP * 2.5);
  if (state.tension <= FISH_FIGHT_LIMITS.slackTension) state._slackTimer += FIXED_STEP;
  else state._slackTimer = Math.max(0, state._slackTimer - FIXED_STEP * 2.5);

  if (state._snapTimer >= FISH_FIGHT_LIMITS.snapGraceSeconds) finish(state, 'snapped');
  else if (state._slackTimer >= FISH_FIGHT_LIMITS.slackGraceSeconds) finish(state, 'slack');
  else if (state.distance <= 1.15 && state.stamina <= .48) finish(state, 'landed');
}

/**
 * Advances a fight in place. `reel` is clamped to 0..1. A positive
 * `anglerDistanceDelta` means the angler moved farther from the fish this frame.
 */
export function stepFishFight(state, dt, reel, anglerDistanceDelta = 0) {
  if (!state || state.outcome) return state;
  const seconds = Number(dt);
  if (!Number.isFinite(seconds) || seconds <= 0) return state;

  const reelAmount = clamp(Number(reel) || 0, 0, 1);
  const movement = Number(anglerDistanceDelta);
  if (Number.isFinite(movement) && movement !== 0) {
    state.distance = Math.max(.35, state.distance + movement);
    state.tension = clamp(state.tension + movement * .18, 0, 1);
  }

  state.time += seconds;
  state._accumulator += seconds;
  while (state._accumulator + 1e-12 >= FIXED_STEP && !state.outcome) {
    simulateFixedStep(state, reelAmount);
    state._accumulator -= FIXED_STEP;
  }
  state._accumulator = Math.max(0, state._accumulator);
  return state;
}
