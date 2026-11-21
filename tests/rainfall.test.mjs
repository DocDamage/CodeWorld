import test from 'node:test';
import assert from 'node:assert/strict';
import {createCatchment,LAND,BROOK} from '../src/catchment.js';
import {createWeatherCycle} from '../src/weather-cycle.js';
import {brookBed,brookStage,wakeAt} from '../src/brook.js';
import {riverX} from '../src/layout.js';
import {lakeWind} from '../src/lake-layout.js';

test('a closed hollow fills, levels out, retains a pool after rain, and dries gradually',()=>{
  const bed=new Float32Array([.2,0,0,.2]),kind=new Uint8Array(4).fill(LAND);
  const sim=createCatchment(4,1,1,bed,kind);
  for(let i=0;i<180;i++)sim.step(.25,1);
  const d=sim.depth;
  assert.ok(d[1]>.065&&d[0]<d[1]*.07);
  assert.ok(Math.abs(d[1]-d[2])<.0001);
  const peak=d[1];
  for(let i=0;i<160;i++)sim.step(.25,0);
  assert.ok(d[1]<peak&&d[1]>peak*.6);
  for(let i=0;i<12000;i++)sim.step(.25,0);
  assert.ok(d.every(v=>v===0));
});

test('runoff crosses a spill crest before reaching the brook, and conserves stored, absorbed and discharged water',()=>{
  const bed=Float32Array.of(.21,0,.027,.018,-.10),kind=Uint8Array.of(LAND,LAND,LAND,LAND,BROOK);
  const sim=createCatchment(5,1,1,bed,kind);
  sim.depth[1]=.012;
  for(let i=0;i<12;i++)assert.equal(sim.step(.25,0).brook,0);
  sim.depth[1]=.15;
  const start=sim.depth.reduce((a,b)=>a+b,0)+sim.moisture.reduce((a,b)=>a+b,0);
  let out=0;
  for(let i=0;i<30;i++)out+=sim.step(.25,0).brook;
  const rem=sim.depth.reduce((a,b)=>a+b,0)+sim.moisture.reduce((a,b)=>a+b,0);
  assert.ok(out>.045&&sim.depth[1]>.014&&sim.depth.every(v=>v>=0));
  assert.ok(start-rem-out>=-1e-7&&start-rem-out<.004);
});

test('held storms have lulls and squalls and share a normalized wind with the boat',()=>{
  let seed=173;const weather=createWeatherCycle(()=>((seed=Math.imul(1664525,seed)+1013904223>>>0)/2**32));
  weather.select('storm');
  const rain=[],gust=[],bearings=[];
  for(let i=0;i<1000;i++){
    weather.step(.125);
    if(i%8||i<80)continue;
    const w=weather.state;rain.push(w.rain);gust.push(w.gust);bearings.push(w.windZ);
    const sail=lakeWind(w.time,w);
    assert.ok(Math.abs(Math.hypot(w.windX,w.windZ)-1)<1e-7&&Math.abs(sail.z/sail.speed-w.windZ)<1e-7);
  }
  assert.ok(Math.max(...rain)-Math.min(...rain)>.35);
  assert.ok(Math.max(...gust)-Math.min(...gust)>.50);
  assert.ok(Math.max(...bearings)-Math.min(...bearings)>.25);
});

test('brook descends through pools and riffles and each boulder leaves its wake downstream',()=>{
  assert.ok(brookStage(-36)>brookStage(0)&&brookStage(0)>brookStage(36));
  assert.ok(brookStage(13.7)-brookBed(riverX(13.7)+1.7,13.7)<.4);
  assert.ok(wakeAt(-.78,14)[0]>wakeAt(-.78,12)[0]+.25);
});
