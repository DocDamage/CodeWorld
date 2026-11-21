import assert from 'node:assert/strict';
import { test } from 'node:test';
import * as T from 'three';

test('the farm plan has a village-facing entrance and a broad crop rotation', async () => {
  const { farm, fieldPlan, animalPlan, farmHeight } = await import('../src/farm-layout.js');
  assert.deepEqual(farm.bounds, { minX: -112, maxX: -44, minZ: 10, maxZ: 93 });
  assert.equal(farm.entry.x, farm.bounds.maxX - 4);
  assert.ok(farm.entry.z > farm.bounds.minZ && farm.entry.z < farm.bounds.maxZ);
  assert.ok(Number.isFinite(farmHeight(farm.entry.x, farm.entry.z)));
  assert.ok(fieldPlan.length >= 10);
  assert.ok(new Set(fieldPlan.map(field => field.crop)).size >= 10);
  for (const crop of ['corn', 'wheat', 'carrots', 'potatoes', 'tomatoes', 'pumpkins']) {
    assert.ok(fieldPlan.some(field => field.crop === crop), crop);
  }
  assert.deepEqual(new Set(animalPlan.map(zone => zone.kind)), new Set(['cow', 'chicken', 'pig']));
});

test('lanes and gates are walkable while barns, pens, and fences collide', async () => {
  const { farm, farmClear } = await import('../src/farm-layout.js');
  assert.equal(farmClear(farm.entry.x, farm.entry.z), true, 'entry gate');
  assert.equal(farmClear(-66, 24), true, 'main farm lane');
  assert.equal(farmClear(-86, 29), true, 'dairy center aisle');
  assert.equal(farmClear(-101.6, 20), false, 'farmhouse wall');
  assert.equal(farmClear(-86, 18), false, 'dairy side wall');
  assert.equal(farmClear(-57.8, 48), false, 'pig shelter');
  assert.equal(farmClear(-72, 75.7), false, 'field boundary fence');
  assert.equal(farmClear(-73.5, 24), true, 'open inner gate');
  for(const z of [55.5,75.7])for(const x of [-51.23,-50,-48.77])assert.equal(farmClear(x,z),true,'equipment gate clearance');
});

test('buildFarm creates an instanced, animated farm with a stable integration API', async () => {
  globalThis.document ??= {
    createElement() {
      return {
        width: 0,
        height: 0,
        getContext: () => ({
          fillStyle: '', textAlign: '', textBaseline: '', font: '',
          fillRect() {}, fillText() {}, putImageData() {}, getImageData: () => ({ data: new Uint8ClampedArray(512 * 256 * 4) }),
          createImageData: (w, h) => ({ data: new Uint8ClampedArray(w * h * 4) }),
          createLinearGradient: () => ({ addColorStop() {} }),
          beginPath() {}, ellipse() {}, fill() {}, moveTo() {}, lineTo() {}, closePath() {},
        }),
      };
    },
  };
  const { buildFarm, farm } = await import('../src/farm.js');
  const {farmClear}=await import('../src/farm-layout.js');
  const {discIsClear}=await import('../src/animal-collision.js');
  const scene = new T.Scene();
  const tracks=[];
  const built = buildFarm(scene,undefined,undefined,undefined,mark=>tracks.push(mark));
  assert.equal(typeof built.clear, 'function');
  assert.equal(typeof built.animalClear,'function');
  assert.equal(typeof built.tick, 'function');
  assert.ok(built.ground?.isMesh);
  assert.ok(built.stats.instances > 1200);
  assert.ok(built.stats.animals >= 18);
  assert.ok(built.stats.cropTypes >= 10);
  assert.equal(built.clear(farm.entry.x, farm.entry.z), true);
  assert.equal(built.dairy.action(-86.5,27.96),'Milk the dairy cow');
  built.dairy.use(-86.5,27.96);
  assert.equal(built.dairy.action(-86.5,27.96),'');
  built.dairy.tick(3.7);
  assert.equal(built.dairy.action(-86.5,27.96),'Collect the milk pail');
  built.dairy.use(-86.5,27.96);
  assert.equal(built.dairy.collected,1);
  const animated = [];
  scene.traverse(object => { if (object.userData.farmAnimal) animated.push(object); });
  assert.ok(animated.length >= 18);
  for(const trough of (await import('../src/farm-layout.js')).farmStations.troughs){
    assert.equal(built.animalClear(trough.x,trough.z),false,`${trough.kind} trough blocks livestock bodies`);
  }
  assert.equal(built.animalClear(built.vehicle.pose.x,built.vehicle.pose.z),false,'tractor blocks livestock');
  assert.equal(built.animalClear(built.vehicle.wagon.x,built.vehicle.wagon.z),false,'wagon blocks livestock');
  assert.equal(built.vehicle.blocks(built.vehicle.pose.x+1.45,built.vehicle.pose.z,0),false,'point is outside the tractor chassis');
  assert.equal(built.vehicle.blocks(built.vehicle.pose.x+1.45,built.vehicle.pose.z,.40),true,'animal radius expands tractor clearance');

  const feedingTargets=[];
  for(const creature of animated){
    const kind=creature.userData.farmAnimal,m=creature.userData.motion,trough=(await import('../src/farm-layout.js')).farmStations.troughs.find(item=>item.kind===kind);
    built.work.animals[kind].fed=110;
    if(!m.inStall&&m.phase%3.1<2.28&&!feedingTargets.some(item=>item.kind===kind)){
      feedingTargets.push({kind,creature,trough});
    }
  }
  const northHen=animated.find(creature=>creature.userData.farmAnimal==='chicken'&&creature.userData.motion.baseZ>49&&creature.userData.motion.phase%3.1<2.28);
  if(northHen&&!feedingTargets.some(item=>item.creature===northHen))feedingTargets.push({kind:'chicken',creature:northHen,
    trough:(await import('../src/farm-layout.js')).farmStations.troughs.find(item=>item.kind==='chicken')});
  for(let i=0;i<360;i++)built.tick(i/60,1/60,.2);
  for(const target of feedingTargets){
    const distance=Math.hypot(target.creature.position.x-target.trough.x,target.creature.position.z-target.trough.z);
    assert.ok(distance<3.55,`${target.kind} can still reach its feeding station (${distance.toFixed(2)}m from trough)`);
    const m=target.creature.userData.motion;
    assert.equal(discIsClear(built.animalClear,target.creature.position.x,target.creature.position.z,m.collisionRadius),true);
  }
  const before = animated[0].rotation.y;
  built.tick(2.4, 1 / 60, .7, { x: -75, z: 24 });
  assert.notEqual(animated[0].rotation.y, before);
  for(let i=1;i<=480;i++){
    built.tick(2.4+i/60,1/60,.2);
    if(i%24===0)for(const creature of animated){
      const motion=creature.userData.motion;
      if(!motion.inStall)assert.equal(discIsClear(farmClear,creature.position.x,creature.position.z,motion.collisionRadius),true,
        `${creature.userData.farmAnimal} body stays outside farm walls and fences`);
    }
  }
  assert.ok(tracks.length>8,'walking livestock leave discrete touchdown prints');
  assert.ok(tracks.some(mark=>mark.kind==='hoof')&&tracks.some(mark=>mark.kind==='bird'));
  for(const mark of tracks){
    assert.ok(Number.isFinite(mark.x)&&Number.isFinite(mark.z)&&Number.isFinite(mark.y)&&Number.isFinite(mark.yaw));
    assert.ok(mark.width>0&&mark.length>0&&['left','right'].includes(mark.side));
  }
  const beforeResume=animated.map(creature=>creature.position.clone()),resumeTracks=tracks.length;
  built.tick(120,8,.2);
  assert.equal(tracks.length,resumeTracks,'a large inactive delta does not stamp catch-up tracks');
  animated.forEach((creature,index)=>assert.ok(creature.position.distanceTo(beforeResume[index])<.001,'livestock do not jump after an inactive interval'));

  built.vehicle.mount();
  assert.equal(built.vehicle.togglePlow(),true);
  const serviceRoute=[[-63.2,24.6],[-56.1,25.6],[-49.8,29.1],[-49.8,36],[-49.8,49],[-49.8,63]];
  for(const [routeIndex,[x,z]] of serviceRoute.entries()){
    let reached=false;
    for(let i=0;i<1350;i++){
      const pose=built.vehicle.pose,dx=x-pose.x,dz=z-pose.z;
      if(Math.hypot(dx,dz)<.68){reached=true;break;}
      const offset=Math.atan2(-dx,-dz)-pose.yaw;
      const turn=Math.atan2(Math.sin(offset),Math.cos(offset));
      built.drive(.033,Math.abs(turn)<.74?.61:.355,Math.max(-1,Math.min(1,-turn*2.45)));
    }
    assert.ok(reached,`tractor reaches ${x}, ${z} through the equipment gate`);
    built.tick(200+routeIndex,1/60,.1);
    for(const creature of animated){
      const motion=creature.userData.motion;
      if(!motion.inStall)assert.equal(discIsClear(built.animalClear,creature.position.x,creature.position.z,motion.collisionRadius),true,
        'livestock vacate the moving tractor and wagon footprint');
    }
  }
  assert.equal(built.work.fields.pumpkins.stage,'tilled','driving the plow across the bare field prepares it');
});
