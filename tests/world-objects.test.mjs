import assert from 'node:assert/strict';
import { test } from 'node:test';
import * as T from 'three';

globalThis.document ??= {
  createElement() {
    return {
      width: 0,
      height: 0,
      getContext: () => ({
        fillStyle: '', strokeStyle: '', textAlign: '', textBaseline: '', font: '', lineWidth: 0,
        fillRect() {}, clearRect() {}, fillText() {}, putImageData() {}, beginPath() {}, moveTo() {},
        lineTo() {}, arc() {}, ellipse() {}, stroke() {}, fill() {}, closePath() {},
        getImageData: () => ({ data: new Uint8ClampedArray(512 * 512 * 4) }),
        createImageData: (w, h) => ({ data: new Uint8ClampedArray(w * h * 4) }),
        createLinearGradient: () => ({ addColorStop() {} }),
        createRadialGradient: () => ({ addColorStop() {} })
      })
    };
  }
};

test('bakery has a stable serializable logical record and local anchors', async () => {
  const { plots, doorOffset } = await import('../src/layout.js');
  const { MANIFEST_VERSION, worldObjects, exportWorldManifest } = await import('../src/world-objects.js');
  const plot = plots.find(candidate => candidate.id === 'bakery');
  const bakery = worldObjects.get('bakery');

  assert.equal(bakery.id, 'bakery');
  assert.equal(bakery.parentId, 'region:village');
  assert.equal(bakery.regionId, 'region:village');
  assert.equal(bakery.visual.assetKey, 'procedural:village/bakery');
  assert.deepEqual(bakery.transform.position, [plot.x, plot.y, plot.z]);
  assert.deepEqual(bakery.transform.rotation, [0, plot.a, 0]);
  assert.deepEqual(bakery.anchors.entrance.position, [doorOffset(plot), 0, plot.d / 2 + .24]);
  assert.equal(bakery.relationships.interiorId, 'room:bakery');

  const manifest = exportWorldManifest({ ids: ['bakery'] });
  assert.equal(manifest.version, MANIFEST_VERSION);
  assert.equal(manifest.objects[0].id, 'bakery');
  const roundTrip = JSON.parse(JSON.stringify(manifest));
  assert.deepEqual(roundTrip, manifest);
  assert.equal(JSON.stringify(manifest).includes('Object3D'), false);
});

test('Builder preserves stable owner and part lookup across shared instances', async () => {
  const { Builder } = await import('../src/model.js');
  const { worldObjects } = await import('../src/world-objects.js');
  const root = new T.Group();
  const builder = new Builder(root);
  builder.owner('bakery', 'bakery:wall', () => {
    builder.put('box', '#ffffff', 0, 0, 0, 1, 1, 1);
    builder.put('box', '#ffffff', 2, 0, 0, 1, 1, 1);
  });
  builder.owner('region:village', 'village:marker', () => {
    builder.put('box', '#ffffff', 4, 0, 0, 1, 1, 1);
  });
  const [mesh] = builder.finish();

  assert.deepEqual(worldObjects.lookupInstance(mesh, 0), { objectId: 'bakery', partId: 'bakery:wall' });
  assert.deepEqual(worldObjects.lookupInstance(mesh, 1), { objectId: 'bakery', partId: 'bakery:wall' });
  assert.deepEqual(worldObjects.lookupInstance(mesh, 2), { objectId: 'region:village', partId: 'village:marker' });
});

test('supported bakery placement edits update binding, collision, door, road and path cache', async () => {
  const layout = await import('../src/layout.js');
  const { worldObjects, editWorldObjectPlacement } = await import('../src/world-objects.js');
  const plot = layout.plots.find(candidate => candidate.id === 'bakery');
  const original = { x: plot.x, y: plot.y, z: plot.z, a: plot.a };
  const binding = new T.Group();
  worldObjects.bindGroup('bakery', binding);
  const revision = layout.roadCacheRevision();

  try {
    const next = { x: original.x + 18, y: original.y + .4, z: original.z + 11, a: original.a + .61 };
    editWorldObjectPlacement('bakery', next);
    const road = layout.roads.find(item => item.destination === 'bakery');
    const end = road.curve.getPointAt(1);
    const door = layout.doorstep(plot, .36);

    assert.deepEqual(binding.position.toArray(), [next.x, next.y, next.z]);
    assert.equal(binding.rotation.y, next.a);
    assert.ok(layout.plotDistance(plot, next.x, next.z) < 0);
    assert.ok(Math.hypot(end.x - door.x, end.z - door.z) < .01);
    assert.ok(layout.nearPath(door.x, door.z, .15));
    assert.equal(layout.roadCacheRevision(), revision + 1);
    assert.deepEqual(worldObjects.get('bakery').transform.position, [next.x, next.y, next.z]);
  } finally {
    editWorldObjectPlacement('bakery', original);
    worldObjects.unbindGroup('bakery', binding);
  }
});

test('bakery procedural visual binding builds a named persistent group', async () => {
  const { Builder } = await import('../src/model.js');
  const { buildings } = await import('../src/houses.js');
  const { worldObjects, visualBindings } = await import('../src/world-objects.js');
  const root = new T.Group();
  const builder = new Builder(root);

  buildings(root, builder);
  const group = root.getObjectByName('world:bakery');
  assert.ok(group);
  assert.equal(group.userData.objectId, 'bakery');
  assert.equal(group.userData.assetKey, 'procedural:village/bakery');
  assert.equal(worldObjects.binding('bakery'), group);
  assert.equal(visualBindings.get('procedural:village/bakery').kind, 'procedural');
  const owned = group.children.find(child => child.isInstancedMesh);
  assert.ok(owned);
  assert.equal(worldObjects.lookupInstance(owned, 0).objectId, 'bakery');
});
