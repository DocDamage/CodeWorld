import assert from 'node:assert/strict';
import {test} from 'node:test';
import * as THREE from 'three';

import {plots} from '../src/layout.js';
import {forestSites} from '../src/forest-species.js';
import {lakeRadius,onLakeDock} from '../src/lake-layout.js';
import {mineAt} from '../src/mine-layout.js';
import {catacombAt} from '../src/catacomb-layout.js';
import {tourDuration,tourStops,sampleTour,tourHandoff,restoreTourCheckpoint} from '../src/tour.js';

const distance=(a,b)=>Math.hypot(a[0]-b[0],a[1]-b[1],a[2]-b[2]);

test('the itinerary covers every major playable destination',()=>{
  assert.ok(tourStops.length>=40,'the whole-game tour should use short, varied shots');
  assert.equal(tourDuration,tourStops.reduce((total,stop)=>total+stop.duration,0));

  const roomStops=tourStops.filter(stop=>stop.room);
  assert.deepEqual(new Set(roomStops.map(stop=>stop.room)),new Set(plots.map(plot=>plot.id)));
  for(const plot of plots)assert.ok(roomStops.some(stop=>stop.room===plot.id&&stop.region===`room:${plot.id}`));
  for(const site of forestSites)assert.ok(tourStops.some(stop=>stop.name.includes(site.name)),site.name);

  const names=tourStops.map(stop=>stop.name).join('\n').toLowerCase();
  for(const landmark of [
    'village','mill wheel','brook','farm','crop','cattle','hens','pigs','work stations','tractor','wagon',
    'lake dock','sailing','fishing','wildlife','fish schools','falls','woodland trail',
    'castle exterior','courtyard','battlements','service wings','great hall','council chamber','royal library','treasury',
    'king’s chamber','prison galleries','royal crypt','dragon viewing gallery','dragon hoard','side chambers','catacomb','ossuary','chapel',
    'minehead','copper sweeps','long haul','upper drift','rail yard','forge',
  ])assert.ok(names.includes(landmark),`missing ${landmark}`);
});

test('shots are short, finite, directed, and scene-cut at disconnected boundaries',()=>{
  for(const [index,stop] of tourStops.entries()){
    assert.ok(stop.duration>=3&&stop.duration<=8,`${stop.name} is not a short shot`);
    assert.ok(['from','to','lookAt','lookTo'].every(key=>stop[key].length===3&&stop[key].every(Number.isFinite)));
    assert.ok(distance(stop.from,stop.to)>0.05,`${stop.name} should move`);
    assert.ok(distance(stop.from,stop.lookAt)>0.5,`${stop.name} needs a useful orientation`);
    if(stop.layer!==undefined)assert.ok([1,2,3].includes(stop.layer));
    if(index){
      const previous=tourStops[index-1];
      const disconnected=previous.region!==stop.region||previous.room!==stop.room||previous.layer!==stop.layer;
      if(disconnected)assert.equal(stop.cut,true,`${stop.name} must explicitly cut to its region`);
    }
  }
});

test('sampleTour deterministically samples every shot without allocating output vectors',()=>{
  const eye=new THREE.Vector3(),aim=new THREE.Vector3();
  let elapsed=0;
  for(const stop of tourStops){
    const returned=sampleTour(elapsed+stop.duration*.5,eye,aim);
    assert.equal(returned,stop);
    assert.ok([eye.x,eye.y,eye.z,aim.x,aim.y,aim.z].every(Number.isFinite));
    assert.ok(eye.distanceTo(aim)>.5);
    elapsed+=stop.duration;
  }

  const first=sampleTour(0,eye,aim);
  assert.equal(first,tourStops[0]);
  assert.deepEqual(eye.toArray(),first.from);
  assert.equal(sampleTour(tourDuration,eye,aim),first,'the itinerary loops exactly at its duration');
  assert.equal(sampleTour(-.01,eye,aim),tourStops.at(-1),'negative time wraps to the final shot');
});

test('sampling changes shots exactly at cumulative duration boundaries',()=>{
  const eye=new THREE.Vector3(),aim=new THREE.Vector3();
  let boundary=tourStops[0].duration;
  assert.equal(sampleTour(boundary-1e-6,eye,aim),tourStops[0]);
  assert.equal(sampleTour(boundary,eye,aim),tourStops[1]);
  assert.ok(distance(eye.toArray(),tourStops[1].from)<1e-9);
});

test('every moving shot produces a finite, timestamp-exact walking handoff',()=>{
  let start=0;
  for(const stop of tourStops){
    for(const progress of [.03,.5,.97]){
      const time=start+stop.duration*progress,state=tourHandoff(time);
      assert.equal(state.stop,stop,stop.name);
      assert.ok(Math.abs(state.time-time)<1e-9,`${stop.name} changed the resume timestamp`);
      assert.ok(['world','room','castle','catacomb','mine','lake'].includes(state.domain),stop.name);
      assert.ok([state.x,state.z,state.yaw,state.pitch].every(Number.isFinite),stop.name);
      assert.ok(state.floor===null||Number.isFinite(state.floor),stop.name);
      assert.ok(state.pitch>=-Math.PI/2&&state.pitch<=Math.PI/2,stop.name);
    }
    start+=stop.duration;
  }
});

test('handoffs keep enclosed shots on their playable floor and rooms local',()=>{
  let start=0;
  for(const stop of tourStops){
    for(const progress of [.03,.5,.97]){
      const state=tourHandoff(start+stop.duration*progress);
      if(stop.room){
        assert.equal(state.domain,'room',stop.name);
        assert.equal(state.room,stop.room,stop.name);
        assert.equal(state.floor,0,stop.name);
        assert.ok(Math.abs(state.x)<3&&Math.abs(state.z)<4,stop.name);
      }else if(stop.region==='catacomb'){
        assert.equal(state.domain,'catacomb',stop.name);
        assert.ok(catacombAt(state.x,state.z,state.floor,.03),`${stop.name} at ${progress}`);
      }else if(stop.region==='ore-mine'){
        assert.equal(state.domain,'mine',stop.name);
        assert.ok(mineAt(state.x,state.z,state.floor,.03),`${stop.name} at ${progress}`);
      }else if(stop.region.startsWith('castle-')&&!['castle-surface'].includes(stop.region)){
        assert.equal(state.domain,'castle',stop.name);
        assert.ok(Number.isFinite(state.floor),stop.name);
      }
    }
    start+=stop.duration;
  }
});

test('open-water lake shots hand off locally to a boat while shore and dock shots stay on foot',()=>{
  let start=0,boatShots=0;
  for(const stop of tourStops){
    if(stop.region==='lake')for(const progress of [.1,.5,.9]){
      const state=tourHandoff(start+stop.duration*progress);
      const openWater=lakeRadius(state.x,state.z)<.995&&!onLakeDock(state.x,state.z);
      assert.equal(state.domain,openWater?'lake':'world',`${stop.name} at ${progress}`);
      boatShots+=Number(openWater);
    }
    start+=stop.duration;
  }
  assert.ok(boatShots>=10,'the moving lake sequence should offer several local boat handoffs');
});

test('wrapped handoff timestamps resume at the same loop position',()=>{
  for(const time of [-.25,0,47.125,tourDuration,tourDuration*2+12.75]){
    const state=tourHandoff(time),again=tourHandoff(state.time);
    assert.equal(state.time,((time%tourDuration)+tourDuration)%tourDuration);
    assert.equal(again.stop,state.stop);
    assert.ok(Math.abs(again.x-state.x)<1e-9&&Math.abs(again.z-state.z)<1e-9);
    assert.ok(Math.abs(again.yaw-state.yaw)<1e-9&&Math.abs(again.pitch-state.pitch)<1e-9);
  }
});

test('persisted resume state keeps exact supported pause/rate and rejects unsafe values',()=>{
  assert.deepEqual(restoreTourCheckpoint({time:41.25,rate:0}),{time:41.25,rate:0});
  assert.deepEqual(restoreTourCheckpoint({time:tourDuration+7.5,rate:1.5}),{time:7.5,rate:1.5});
  for(const saved of [null,{}, {time:2,rate:-1},{time:2,rate:.75},{time:NaN,rate:1},{time:2,rate:'1'}])
    assert.equal(restoreTourCheckpoint(saved),null);
});
