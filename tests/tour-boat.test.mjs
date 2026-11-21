import assert from 'node:assert/strict';
import {test} from 'node:test';

import {boatFits,createLakeBoat,findBoatPlacement} from '../src/lake-boat.js';
import {tourDuration,tourStops,tourHandoff} from '../src/tour.js';

test('every open-lake tour handoff finds a nearby valid full-hull placement',()=>{
  let start=0,count=0;
  for(const stop of tourStops){
    for(const progress of [.03,.25,.5,.75,.97]){
      const state=tourHandoff(start+stop.duration*progress);
      if(state.domain!=='lake')continue;
      const placement=findBoatPlacement(state.x,state.z,state.yaw);
      assert.ok(placement,`${stop.name} at ${progress}`);
      assert.ok(boatFits(placement.x,placement.z,placement.yaw),stop.name);
      assert.ok(Math.hypot(placement.x-state.x,placement.z-state.z)<=8.01,`${stop.name} teleported too far`);
      count++;
    }
    start+=stop.duration;
  }
  assert.ok(count>=15);
  assert.ok(start===tourDuration);
});

test('placing the boat boards it locally, stops it, and anchors normal play',()=>{
  const vessel=createLakeBoat(),placement=vessel.boardAt(24,101,.3);
  assert.ok(placement&&boatFits(placement.x,placement.z,placement.yaw));
  assert.equal(vessel.boat.aboard,true);
  assert.equal(vessel.boat.moored,false);
  assert.equal(vessel.boat.anchored,true);
  assert.equal(vessel.boat.speed,0);
  assert.equal(vessel.boat.sideSpeed,0);
});
