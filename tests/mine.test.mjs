import assert from 'node:assert/strict';
import {test} from 'node:test';
import {inPlot,nearPath,onBridge,riverWidth,riverX} from '../src/layout.js';
import {MINE,mineTerrainCut} from '../src/mine-layout.js';
import {height} from '../src/world-height.js';

test('the surface mine and its approach sit on dry ground clear of the bridge and village lanes',()=>{
  const {portal,yard}=MINE;
  for(let z=portal.z-5;z<=yard.z+1;z+=.25)for(let x=portal.x-2;x<=portal.x+2;x+=.25){
    assert.ok(!onBridge(x,z,1)&&!inPlot(x,z,.2)&&!nearPath(x,z,.1));
    assert.ok(Math.abs(x-riverX(z))>riverWidth(z)+.4);
  }
  assert.ok(height(portal.x,portal.z-3)>portal.y+2.75);
  assert.ok(!mineTerrainCut(portal.x,portal.z-3));
  for(const p of [portal,yard])assert.ok(Math.abs(height(p.x,p.z)-p.y)<.04);
});

test('the mine railway is a continuous walkable grade between crypt and armory',async()=>{
  const {
    MINE,MINE_PORTAL_PROGRESS,MINE_ROUTE_LENGTH,mineAt,mineCatacombDoorway,mineFloor,mineLayer,minePoint,mineTerrainCut,
  }=await import('../src/mine-layout.js');
  assert.ok(MINE_ROUTE_LENGTH>450,'the gentle winding grade has enough run for its rise');
  let previous=MINE.entry.y,maxGrade=0;
  const steps=Math.ceil(MINE_ROUTE_LENGTH/.09);
  let prior=minePoint(0);
  for(let i=1;i<=steps;i++){
    const point=minePoint(i/steps);
    const floor=mineFloor(point.x,point.z,previous,point.y);
    assert.notEqual(floor,null,`track blocked at ${(i/steps).toFixed(3)}`);
    assert.ok(Math.abs(floor-previous)<.12,'walking substeps stay continuous');
    const horizontal=Math.hypot(point.x-prior.x,point.z-prior.z);
    if(horizontal>.001)maxGrade=Math.max(maxGrade,Math.abs(point.y-prior.y)/horizontal);
    previous=floor;prior=point;
  }
  assert.ok(maxGrade<.14,`rail grade ${maxGrade.toFixed(3)} is cart-friendly`);
  assert.ok(Math.abs(previous-MINE.yard.y)<.02);
  assert.ok(mineAt(MINE.entry.x,MINE.entry.z,MINE.entry.y));
  assert.ok(mineAt(MINE.yard.x,MINE.yard.z,MINE.yard.y));
  assert.equal(mineTerrainCut(MINE.portal.x,MINE.portal.z),true);
  assert.equal(mineTerrainCut(MINE.portal.x+5,MINE.portal.z),false);
  assert.equal(mineCatacombDoorway(-12,-73),true);
  assert.equal(mineCatacombDoorway(-12,-68),false);
  assert.equal(mineLayer(minePoint(MINE_PORTAL_PROGRESS-.001).x,minePoint(MINE_PORTAL_PROGRESS-.001).z,minePoint(MINE_PORTAL_PROGRESS-.001).y),3);
  assert.equal(mineLayer(MINE.yard.x,MINE.yard.z,MINE.yard.y),0);
});

test('ore can be picked repeatedly, capacity stops overloading, and a cart hauls both ways',async()=>{
  const {createMineState}=await import('../src/mine-state.js');
  const mine=createMineState();
  const vein=mine.veins[0];
  for(let i=0;i<mine.cart.capacity;i++){
    assert.match(mine.action(vein.x,vein.z,vein.y),/^Mine /);
    assert.equal(mine.perform(vein.x,vein.z,vein.y).ok,true);
    if(i===0)assert.match(mine.action(mine.cart.pose.x,mine.cart.pose.z,mine.cart.pose.y),/^Ride loaded ore cart/);
  }
  assert.equal(mine.cart.load,mine.cart.capacity);
  assert.doesNotMatch(mine.action(vein.x,vein.z,vein.y),/^Mine /,'a full cart cannot accept more ore');
  assert.match(mine.action(mine.cart.pose.x,mine.cart.pose.z,mine.cart.pose.y),/Ride loaded ore cart/);
  assert.equal(mine.perform(mine.cart.pose.x,mine.cart.pose.z,mine.cart.pose.y).mounted,true);
  for(let i=0;i<2000&&mine.cart.progress<1;i++)mine.drive(.05,1);
  assert.equal(mine.cart.progress,1);
  assert.equal(mine.perform(mine.cart.pose.x,mine.cart.pose.z,mine.cart.pose.y).mounted,false);
  assert.match(mine.action(mine.cart.pose.x,mine.cart.pose.z,mine.cart.pose.y),/^Unload 6 ore/);
  assert.equal(mine.perform(mine.cart.pose.x,mine.cart.pose.z,mine.cart.pose.y).amount,6);
  assert.equal(mine.cart.load,0);
  assert.equal(mine.delivered,6);
  assert.match(mine.action(mine.cart.pose.x,mine.cart.pose.z,mine.cart.pose.y),/^Ride ore cart/);
  mine.perform(mine.cart.pose.x,mine.cart.pose.z,mine.cart.pose.y);
  for(let i=0;i<2000&&mine.cart.progress>0;i++)mine.drive(.05,-1);
  assert.equal(mine.cart.progress,0);
});

test('mine haul state restores bounded inventory and depleted veins',async()=>{
  const {createMineState}=await import('../src/mine-state.js');
  const mine=createMineState({delivered:9,cart:{progress:2,load:99},veins:[1,-4,2]});
  assert.equal(mine.delivered,9);
  assert.equal(mine.cart.progress,1);
  assert.equal(mine.cart.load,mine.cart.capacity);
  assert.deepEqual(mine.veins.map(vein=>vein.remaining).slice(0,3),[1,0,2]);
  const restored=createMineState(mine.snapshot());
  assert.deepEqual(restored.snapshot(),mine.snapshot());
});

test('delivery renews worked seams and cart heading follows the physical rail',async()=>{
  const {createMineState}=await import('../src/mine-state.js');
  const {mineTangent}=await import('../src/mine-layout.js');
  const mine=createMineState({cart:{progress:1,load:2},veins:[0,0,0,0,0]});
  const result=mine.perform(mine.cart.pose.x,mine.cart.pose.z,mine.cart.pose.y);
  assert.equal(result.renewed,10);
  assert.deepEqual(mine.veins.map(vein=>vein.remaining),[2,2,2,2,2]);
  const moving=createMineState({cart:{progress:.42,load:3}}),pose=moving.cart.pose,tangent=mineTangent(.42);
  const horizontal=Math.hypot(tangent.x,tangent.z);
  assert.ok(Math.abs(-Math.sin(pose.yaw)-tangent.x/horizontal)<.002);
  assert.ok(Math.abs(-Math.cos(pose.yaw)-tangent.z/horizontal)<.002);
  assert.ok(pose.pitch>0&&pose.pitch<.14);
});

test('smithing exposes the four metals and permanent tool recipes',async()=>{
  const {METALS,RECIPES}=await import('../src/smithing.js');
  assert.deepEqual(METALS,['iron','copper','tin','silver']);
  assert.deepEqual(RECIPES.map(recipe=>recipe.id),['ironPick','bronzeSickle','masterPick']);
  assert.deepEqual(RECIPES.find(recipe=>recipe.id==='ironPick').cost,{iron:2});
  assert.deepEqual(RECIPES.find(recipe=>recipe.id==='bronzeSickle').cost,{copper:1,tin:1});
  assert.deepEqual(RECIPES.find(recipe=>recipe.id==='masterPick').cost,{iron:2,tin:1,silver:1});
  assert.equal(RECIPES.find(recipe=>recipe.id==='masterPick').requires,'ironPick');
});

test('mixed cart cargo unloads directly into Brook Armory stock and survives restore',async()=>{
  const {createMineState}=await import('../src/mine-state.js');
  const mine=createMineState({cart:{progress:1,load:99,cargo:{iron:1,copper:2,tin:1,silver:2}}});
  assert.equal(mine.cart.load,6);
  assert.deepEqual(mine.cart.cargo,{iron:1,copper:2,tin:1,silver:2});
  const result=mine.perform(mine.cart.pose.x,mine.cart.pose.z,mine.cart.pose.y);
  assert.equal(result.amount,6);
  assert.match(result.message,/forge/i);
  assert.deepEqual(mine.cart.cargo,{iron:0,copper:0,tin:0,silver:0});
  assert.deepEqual(mine.forge.ore,{iron:1,copper:2,tin:1,silver:2});
  assert.equal(mine.delivered,6);
  const restored=createMineState(mine.snapshot());
  assert.deepEqual(restored.snapshot(),mine.snapshot());
});

test('numeric cart load remains writable while keeping typed cargo consistent',async()=>{
  const {createMineState}=await import('../src/mine-state.js');
  const mine=createMineState({version:2,cart:{cargo:{iron:1,copper:2}},forge:{}});
  mine.cart.load=5;
  assert.equal(mine.cart.load,5);
  assert.deepEqual(mine.cart.cargo,{iron:3,copper:2,tin:0,silver:0});
  mine.cart.load=1;
  assert.equal(mine.cart.load,1);
  assert.deepEqual(mine.cart.cargo,{iron:1,copper:0,tin:0,silver:0});
});

test('legacy numeric saves recover iron once without reclaiming spent stock',async()=>{
  const {createMineState}=await import('../src/mine-state.js');
  const legacy=createMineState({delivered:4,cart:{progress:.5,load:2}});
  assert.deepEqual(legacy.cart.cargo,{iron:2,copper:0,tin:0,silver:0});
  assert.deepEqual(legacy.forge.ore,{iron:4,copper:0,tin:0,silver:0});
  assert.equal(legacy.forge.smelt('iron').ok,true);
  assert.equal(legacy.forge.smelt('iron').ok,true);
  assert.equal(legacy.forge.craft('ironPick').ok,true);
  assert.equal(legacy.forge.tools.ironPick,true);
  const restored=createMineState(legacy.snapshot());
  assert.equal(restored.delivered,4,'lifetime deliveries remain available for display');
  assert.deepEqual(restored.forge.ore,{iron:0,copper:0,tin:0,silver:0});
  assert.deepEqual(restored.forge.bars,{iron:0,copper:0,tin:0,silver:0});
  assert.equal(restored.forge.tools.ironPick,true);
});

test('forge rejects invalid work and enforces costs and prerequisites',async()=>{
  const {createMineState}=await import('../src/mine-state.js');
  const mine=createMineState({version:2,forge:{ore:{copper:2},bars:{iron:2,silver:1}}});
  assert.equal(mine.forge.smelt('gold').ok,false);
  assert.equal(mine.forge.smelt('iron').ok,false);
  assert.equal(mine.forge.craft('unknown').ok,false);
  assert.equal(mine.forge.craft('masterPick').ok,false,'master pick needs an iron pick first');
  assert.equal(mine.forge.canCraft('masterPick'),false);
  assert.equal(mine.forge.craft('ironPick').ok,true);
  assert.equal(mine.forge.canCraft('ironPick'),false,'an already forged tool cannot be crafted again');
  assert.equal(mine.forge.craft('ironPick').ok,false,'tools are permanent and cannot be forged twice');
  assert.equal(mine.forge.smelt('copper').ok,true);
  assert.equal(mine.forge.bars.copper,1);
  assert.equal(mine.forge.craft('bronzeSickle').ok,false,'one tin bar is also required');
});

test('equipped picks mine two or three units while respecting cart and vein limits',async()=>{
  const {createMineState}=await import('../src/mine-state.js');
  const iron=createMineState({version:2,cart:{progress:.035},forge:{tools:{ironPick:true}}});
  assert.equal(iron.perform(iron.veins[0].x,iron.veins[0].z,iron.veins[0].y).amount,2);
  assert.equal(iron.cart.load,2);
  assert.equal(iron.veins[0].remaining,8);

  const capacity=createMineState({version:2,cart:{progress:.035,cargo:{copper:5}},forge:{tools:{ironPick:true,masterPick:true}}});
  const capacityHit=capacity.perform(capacity.veins[0].x,capacity.veins[0].z,capacity.veins[0].y);
  assert.equal(capacityHit.amount,1);
  assert.equal(capacity.cart.load,capacity.cart.capacity);
  assert.equal(capacity.cart.cargo.iron,1);

  const veinLimit=createMineState({version:2,cart:{progress:.035},veins:[1],forge:{tools:{ironPick:true,masterPick:true}}});
  const veinHit=veinLimit.perform(veinLimit.veins[0].x,veinLimit.veins[0].z,veinLimit.veins[0].y);
  assert.equal(veinHit.amount,1);
  assert.equal(veinLimit.veins[0].remaining,0);
  assert.match(veinHit.message,/silver|master|3|1/,'mining result remains informative');
});

test('smelting a mixed stock pays for all tool upgrades and retains only the unspent ore',async()=>{
  const {createMineState}=await import('../src/mine-state.js');
  const mine=createMineState({cart:{progress:.035},forge:{ore:{iron:9,copper:2,tin:4,silver:2}}});
  for(const [metal,count] of Object.entries({iron:4,copper:1,tin:2,silver:1})){
    for(let i=0;i<count;i++)assert.equal(mine.forge.smelt(metal).ok,true);
  }
  for(const id of ['bronzeSickle','ironPick','masterPick']){
    assert.equal(mine.forge.canCraft(id),true);
    assert.equal(mine.forge.craft(id).ok,true);
  }
  const saved=createMineState(mine.snapshot());
  assert.deepEqual(saved.forge.bars,{iron:0,copper:0,tin:0,silver:0});
  assert.deepEqual(saved.forge.ore,{iron:1,copper:0,tin:0,silver:0});
  assert.ok(saved.forge.tools.bronzeSickle);
  const vein=saved.veins[0];
  assert.equal(saved.perform(vein.x,vein.z,vein.y).amount,3);
});
