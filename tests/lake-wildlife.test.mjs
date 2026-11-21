import assert from 'node:assert/strict';
import { test } from 'node:test';
import * as T from 'three';

test('the lake has thirty distinct, habitat-aware catchable species', async () => {
  const { FISH_SPECIES, chooseCatch } = await import('../src/lake-species.js');
  const { lake, lakeHabitat } = await import('../src/lake-layout.js');

  assert.equal(FISH_SPECIES.length, 30);
  assert.equal(new Set(FISH_SPECIES.map(species => species.name)).size, 30);
  for (const species of FISH_SPECIES) {
    assert.ok(species.description.length >= 24, species.name);
    assert.ok(species.minWeight > 0 && species.maxWeight > species.minWeight, species.name);
    assert.ok(Object.values(species.habitatWeights).some(weight => weight > 0), species.name);
  }

  const locations = {};
  for (let z = lake.z - lake.rz; z <= lake.z + lake.rz; z += 1) {
    for (let x = lake.x - lake.rx; x <= lake.x + lake.rx; x += 1) {
      const habitat = lakeHabitat(x, z);
      if (!(habitat in locations)) locations[habitat] = { x, z };
    }
  }
  const reachable=new Set();
  for (const habitat of ['reeds', 'shallows', 'open water', 'falls']) {
    assert.ok(locations[habitat], `layout exposes ${habitat}`);
    const catches = Array.from({ length: 4096 }, (_, index) =>
      chooseCatch(locations[habitat].x, locations[habitat].z, () => (index+.5) / 4096));
    for(const fish of catches)reachable.add(fish.name);
    if(habitat==='falls')assert.ok(catches.filter(f=>f.name==='Grayling').length>catches.filter(f=>f.name==='Atlantic Salmon').length);
    assert.ok(catches.every(species => species.habitatWeights[habitat] > 0));
    assert.ok(new Set(catches.map(species => species.name)).size >= 4, `${habitat} catch variety`);
  }

  assert.equal(reachable.size,30);
  assert.ok(FISH_SPECIES.some(species => species.habitatWeights.falls >= 3));
  assert.ok(FISH_SPECIES.some(species => species.habitatWeights.reeds >= 3));
  assert.ok(FISH_SPECIES.some(species => species.habitatWeights['open water'] >= 3));
});

test('wildlife builds efficient populations, reacts safely, and can be sighted', async () => {
  const { buildLakeWildlife } = await import('../src/lake-wildlife.js');
  const { dock, lake } = await import('../src/lake-layout.js');
  const root = new T.Group();
  const wildlife = buildLakeWildlife(root);

  assert.equal(typeof wildlife.update, 'function');
  assert.equal(typeof wildlife.disturb, 'function');
  assert.equal(typeof wildlife.sight, 'function');
  assert.ok(wildlife.stats.catchableSpecies === 30);
  assert.ok(wildlife.stats.fish >= 24);
  assert.ok(wildlife.stats.birds >= 6);
  assert.ok(wildlife.stats.plants >= 100);

  const instances = [];
  const creatures = [];
  root.traverse(object => {
    if (object.isInstancedMesh) instances.push(object);
    if (object.userData.lakeCreature) creatures.push(object);
  });
  assert.ok(instances.length >= 4, 'plants, insects, and schooling fish use instancing');
  assert.ok(instances.reduce((sum, mesh) => sum + mesh.count, 0) >= 150);
  assert.ok(new Set(creatures.map(object => object.userData.lakeCreature)).size >= 8);
  const matrix = new T.Matrix4(), position = new T.Vector3();
  for (const plants of instances.filter(object => object.name.startsWith('lake-plants-'))) {
    for (let index = 0; index < plants.count; index++) {
      plants.getMatrixAt(index, matrix);
      position.setFromMatrixPosition(matrix);
      assert.ok(!(Math.abs(position.x - dock.x) < 4.4 && position.z < dock.end + 7), 'pier lane stays clear');
      assert.ok(Math.hypot(position.x - dock.berthX, position.z - dock.berthZ) >= 6.2, 'berth stays clear');
    }
  }

  wildlife.update(2, 1 / 60, { x: lake.x, z: lake.z, disturbance: 0 });
  wildlife.disturb(lake.x, lake.z, 1);
  wildlife.update(2.1, 1 / 30, { x: lake.x, z: lake.z, disturbance: 0.8 });

  const target = creatures.find(object => object.visible !== false);
  assert.ok(target);
  const world = target.getWorldPosition(new T.Vector3());
  const camera = new T.PerspectiveCamera(60, 1, 0.1, 100);
  camera.position.set(world.x, world.y + 1.2, world.z + 5);
  camera.lookAt(world);
  camera.updateMatrixWorld(true);
  const sighting = wildlife.sight(camera);
  assert.ok(sighting?.name);
  assert.ok(sighting.description.length >= 20);
  assert.ok(sighting.distance > 0 && sighting.distance < 20);
});
