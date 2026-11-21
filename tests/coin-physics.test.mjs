import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createCoinPhysics} from '../src/coin-physics.js';

const mint=x=>({x,z:0,y:.02,radius:.12,thickness:.04,tilt:0,angle:0});

test('walking kicks nearby gold into the air and it settles on the actual bed',()=>{
  const first=mint(.10),second=mint(1.75),far=mint(12);
  const ground=(x,z)=>Math.max(0,z*.08);
  const sim=createCoinPhysics([first,second,far],ground);
  sim.kick(0,0,0,0);assert.equal(sim.update(1/60).size,0);
  sim.kick(0,0,4,0);sim.update(1/60);
  assert.ok(first.x>.1&&first.y>.02);
  for(let i=0;i<360;i++)sim.update(1/60);
  assert.ok(second.x>1.75);
  assert.equal(first.y,ground(first.x,first.z)+first.thickness/2);
  assert.equal(far.x,12);assert.equal(sim.update(1/60).size,0);
});

test('a kicked coin stays on its side of a vault wall',()=>{
  const coin=mint(.2),wall={x:1.4,z:0,w:.2,d:2,base:0,top:3};
  const sim=createCoinPhysics([coin],()=>0,[wall]);sim.kick(0,0,5,0);
  for(let i=0;i<180;i++){sim.update(1/30);assert.ok(coin.x<1.2);}
});

test('a dense pile limits work per physics substep',()=>{
  const pile=Array.from({length:2000},(_,i)=>({...mint(i%50*.009),z:Math.floor(i/50)*.009}));
  const sim=createCoinPhysics(pile,()=>0);sim.kick(0,0,4,0);
  assert.equal(sim.update(1/120).size,256);
});
