import assert from 'node:assert/strict';
import { test } from 'node:test';

test('the catacomb has a continuous five-flight descent and a walkable return', async () => {
  const { CATACOMB, catacombFloor, catacombLocation,catacombWorld } = await import('../src/catacomb-layout.js');
  const route = [
    [0,6],[0,2],[0,-18],[22,-19],[24,-19],[42,-19],[45,-25],
    [45,-46],[21,-47],[20,-47],[0,-47],[-3,-50],[-3,-70],[0,-73],
  ];
  const complete=[...route,...route.slice(0,-1).reverse()];
  let previous=CATACOMB.entryY;
  let deepest = previous;
  for(let segment=1;segment<complete.length;segment++){
    const [ax,az]=complete[segment-1],[bx,bz]=complete[segment];
    const distance=Math.hypot(bx-ax,bz-az),steps=Math.max(1,Math.ceil(distance/.1));
    for(let i=1;i<=steps;i++){
      const {x,z}=catacombWorld(ax+(bx-ax)*i/steps,az+(bz-az)*i/steps);
      const floor=catacombFloor(x,z,previous,CATACOMB.entryY);
      assert.notEqual(floor,null,`route blocked at local ${x-CATACOMB.x}, ${z-CATACOMB.z}`);
      assert.ok(Math.abs(floor-previous)<.32,'floor changes remain walkable');
      previous=floor;deepest=Math.min(deepest,floor);
    }
  }
  assert.ok(deepest<=CATACOMB.entryY-51.5,'the lower sanctum is over fifty metres down');
  assert.ok(Math.abs(previous-CATACOMB.entryY)<.01,'the same route leads back to daylight');
  const sanctum=catacombWorld(0,-73),returnMarker=catacombWorld(-3,-51);
  assert.equal(catacombLocation(sanctum.x,sanctum.z,deepest),'The Nameless Sanctum');
  assert.equal(catacombLocation(returnMarker.x,returnMarker.z,deepest+12),'Pilgrims’ Return');
});

test('catacomb walls collide while the surface doorway remains an exit', async () => {
  const { CATACOMB,catacombFloor,catacombTerrainCut,catacombWorld } = await import('../src/catacomb-layout.js');
  const wall=catacombWorld(12,-10),exit=catacombWorld(0,9);
  assert.equal(catacombFloor(wall.x,wall.z,CATACOMB.entryY-10,CATACOMB.entryY),null);
  assert.equal(catacombFloor(exit.x,exit.z,CATACOMB.entryY,CATACOMB.entryY),CATACOMB.entryY);
  const portal=catacombWorld(0,0),woodland=catacombWorld(5,0);
  assert.equal(catacombTerrainCut(portal.x,portal.z),true,'the descent has a real opening in the terrain mesh');
  assert.equal(catacombTerrainCut(woodland.x,woodland.z),false,'the cut is tightly bounded to the stair');
});
