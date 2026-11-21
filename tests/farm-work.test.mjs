import assert from 'node:assert/strict';
import {test} from 'node:test';

test('a prepared bed needs seed and moisture, then harvests once and can be replanted',async()=>{
  const {createFarmWork}=await import('../src/farm-state.js');
  const farm=createFarmWork();
  const crop='carrots',seed=farm.stock.seeds[crop];
  assert.equal(farm.harvest(crop).ok,false);
  assert.ok(farm.plant(crop).ok);
  assert.equal(farm.stock.seeds[crop],seed-1);
  farm.step(10,0);
  assert.ok(farm.fields[crop].growth<.05);
  assert.ok(farm.water(crop).ok);
  assert.equal(farm.stock.water,7);
  for(let i=0;i<60;i++)farm.step(1,0);
  assert.equal(farm.fields[crop].stage,'ripe');
  assert.ok(farm.harvest(crop).amount>0);
  assert.equal(farm.harvest(crop).ok,false);
  assert.ok(farm.plant(crop).ok);
});

test('feeding controls egg production and saves inventories and field progress',async()=>{
  const {createFarmWork}=await import('../src/farm-state.js');
  const farm=createFarmWork();
  farm.collectEggs();
  const initialEggs=farm.stock.eggs;
  farm.step(35,0);
  assert.equal(farm.collectEggs().ok,false);
  assert.ok(farm.feed('chicken').ok);
  farm.step(38,0);
  assert.equal(farm.collectEggs().amount,2);
  assert.equal(farm.stock.eggs,initialEggs+2);
  assert.ok(farm.till('potatoes').ok);
  assert.ok(farm.plant('potatoes').ok);
  farm.step(26,1);
  const restored=createFarmWork(farm.snapshot());
  assert.equal(restored.stock.eggs,farm.stock.eggs);
  assert.equal(restored.fields.potatoes.growth,farm.fields.potatoes.growth);
  assert.ok(restored.fields.potatoes.growth>0);
});

test('a wagon transfers crops to storage with capacity and no duplicate harvest',async()=>{
  const {createFarmWork}=await import('../src/farm-state.js');
  const farm=createFarmWork();
  assert.ok(farm.harvest('corn','wagon').ok);
  assert.equal(farm.harvest('corn','wagon').ok,false);
  assert.ok(farm.wagonLoad>0);
  const carried=farm.wagonLoad;
  assert.equal(farm.unloadWagon().amount,carried);
  assert.equal(farm.wagonLoad,0);
  assert.equal(farm.stock.produce.corn,carried);
  assert.equal(farm.unloadWagon().ok,false);
});

test('milking resumes after reload and a finished pail can only be collected once',async()=>{
  const {createFarmWork}=await import('../src/farm-state.js');
  const farm=createFarmWork();assert.ok(farm.milk(0).ok);
  farm.advanceMilking(1.2);
  const resumed=createFarmWork(farm.snapshot());assert.equal(resumed.pails[0].running,true);
  resumed.advanceMilking(2.7);
  const full=createFarmWork(resumed.snapshot());assert.equal(full.pails[0].running,false);
  assert.equal(full.milk(0).amount,1);assert.equal(full.stock.milk,1);
  assert.equal(full.milk(0).amount,0);assert.equal(full.stock.milk,1);
});

test('tractor steering follows throttle, supports reverse, and stops at solid geometry',async()=>{
  const {stepTractor}=await import('../src/farm-driving.js');
  let pose={x:0,z:0,yaw:0,speed:0};
  for(let i=0;i<80;i++)pose=stepTractor(pose,1,0,.05,(_x,z)=>z>-3);
  assert.ok(pose.z<-2.7&&pose.z>-3);
  for(let i=0;i<60;i++)pose=stepTractor(pose,-.8,.6,.05,()=>true);
  assert.ok(pose.z>-.7&&Math.abs(pose.yaw)>.25&&pose.speed<0);
});

test('forging the bronze sickle adds one to subsequent hand harvests only',async()=>{
  const {createFarmWork}=await import('../src/farm-state.js');
  let crafted=false;
  const farm=createFarmWork(undefined,()=>crafted);
  const ripe=Object.keys(farm.fields).filter(crop=>farm.fields[crop].stage==='ripe');
  assert.equal(farm.harvest(ripe[0]).amount,farm.fields[ripe[0]].yield);
  crafted=true;
  assert.equal(farm.harvest(ripe[1]).amount,farm.fields[ripe[1]].yield+1);
  assert.equal(farm.stock.produce[ripe[1]],farm.fields[ripe[1]].yield+1);
  assert.equal(farm.harvest(ripe[2],'wagon').amount,farm.fields[ripe[2]].yield);
});
