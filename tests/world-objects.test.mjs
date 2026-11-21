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
        fillRect() {}, clearRect() {}, strokeRect() {}, fillText() {}, putImageData() {}, beginPath() {}, moveTo() {},
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
  const { createWorldInspector,worldObjects } = await import('../src/world-objects.js');
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
  assert.equal(createWorldInspector().pick({object:mesh,instanceId:2}).objectId,'region:village');
  const rebuiltRoot = new T.Group(), rebuilt = new Builder(rebuiltRoot);
  rebuilt.owner('region:village', 'village:marker', () => rebuilt.put('box', '#fff', 4, 0, 0, 1, 1, 1));
  rebuilt.owner('bakery', 'bakery:wall', () => rebuilt.put('box', '#fff', 0, 0, 0, 1, 1, 1));
  const [rebuiltMesh] = rebuilt.finish();
  assert.deepEqual(worldObjects.lookupInstance(rebuiltMesh, 0), { objectId: 'region:village', partId: 'village:marker' });
  assert.deepEqual(worldObjects.lookupInstance(rebuiltMesh, 1), { objectId: 'bakery', partId: 'bakery:wall' });
});

test('supported bakery placement edits update binding, collision, door, road and path cache', async () => {
  const layout = await import('../src/layout.js');
  const { worldObjects, editWorldObjectPlacement } = await import('../src/world-objects.js');
  const plot = layout.plots.find(candidate => candidate.id === 'bakery');
  const original = { x: plot.x, y: plot.y, z: plot.z, a: plot.a };
  const originalRecord = worldObjects.get('bakery');
  worldObjects.upsert({
    ...originalRecord,
    relationships:{...originalRecord.relationships,children:[...originalRecord.relationships.children,'bakery:runtime-sign']},
    generation:{...originalRecord.generation,seed:'bakery-authored-seed'}
  });
  const binding = new T.Group();
  worldObjects.bindGroup('bakery', binding);
  const revision = layout.roadCacheRevision();
  let placementChange;
  const unsubscribe = worldObjects.onPlacement(change => placementChange = change);

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
    assert.equal(placementChange.id, 'bakery');
    assert.ok(placementChange.dependencies.includes('road-spatial-cache'));
    assert.ok(worldObjects.get('bakery').relationships.children.includes('bakery:runtime-sign'));
    assert.equal(worldObjects.get('bakery').generation.seed, 'bakery-authored-seed');
  } finally {
    editWorldObjectPlacement('bakery', original);
    worldObjects.upsert(originalRecord);
    unsubscribe();
    worldObjects.unbindGroup('bakery', binding);
  }
});

test('versioned development placement overrides rebuild from authoritative plots on reload', async () => {
  const layout = await import('../src/layout.js');
  const { applyWorldPlacementOverrides, editWorldObjectPlacement, worldObjects } = await import('../src/world-objects.js');
  const plot = layout.plots.find(candidate => candidate.id === 'slate');
  const original = { x: plot.x, y: plot.y, z: plot.z, a: plot.a };
  try {
    const result = applyWorldPlacementOverrides({ version: 1, objects: { slate: { x: original.x + 2, z: original.z - 1, a: original.a + .2 } } });
    assert.deepEqual(result, { applied: ['slate'], rejected: [] });
    assert.equal(plot.x, original.x + 2);
    assert.equal(worldObjects.get('slate').transform.position[2], original.z - 1);
    assert.ok(layout.nearPath(layout.doorstep(plot, .36).x, layout.doorstep(plot, .36).z, .15));
    assert.deepEqual(applyWorldPlacementOverrides({ version: 2, objects: {} }), { applied: [], rejected: ['version'] });
  } finally { editWorldObjectPlacement('slate', original); }
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

test('every village building has a stable record, visual binding and persistent group', async () => {
  const { plots } = await import('../src/layout.js');
  const { Builder } = await import('../src/model.js');
  const { buildings } = await import('../src/houses.js');
  const { worldObjects, visualBindings } = await import('../src/world-objects.js');
  const root = new T.Group();
  buildings(root, new Builder(root));

  assert.equal(plots.length, 8);
  for (const plot of plots) {
    const record = worldObjects.get(plot.id);
    const group = root.getObjectByName(`world:${plot.id}`);
    assert.equal(record.parentId, 'region:village');
    assert.equal(record.gameplayRole, plot.id);
    assert.ok(visualBindings.has(record.visual.assetKey));
    assert.ok(group, plot.id);
    assert.equal(group.userData.objectId, plot.id);
    assert.deepEqual(group.position.toArray(), [plot.x, plot.y, plot.z]);
    assert.equal(group.rotation.y, plot.a);
    assert.equal(worldObjects.binding(plot.id), group);
    const owned = group.children.find(child => child.isInstancedMesh);
    assert.equal(worldObjects.lookupInstance(owned, 0).objectId, plot.id);
    if (plot.id !== 'wind')assert.ok(group.userData.smokeSources?.length, `${plot.id} chimney ownership`);
  }
});

test('selected building visual bindings dispatch without changing logical identity', async () => {
  const { Builder } = await import('../src/model.js');
  const { buildings } = await import('../src/houses.js');
  const { visualBindings, worldObjects } = await import('../src/world-objects.js');
  const assetKey='procedural:village/herb',original=visualBindings.get(assetKey);let calls=0;
  visualBindings.replace(assetKey,{kind:'test-replacement',build:({builder})=>{calls++;builder.put('box','#fff',0,.5,0,1,1,1);}});
  try{
    const root=new T.Group();buildings(root,new Builder(root));
    assert.equal(calls,1);
    assert.equal(worldObjects.get('herb').visual.assetKey,assetKey);
    assert.equal(worldObjects.binding('herb').getObjectByName('anchor:herb:entrance').userData.objectId,'herb');
  }finally{visualBindings.replace(assetKey,original);}
});

test('major regions and interactive equipment have stable catalog identities', async () => {
  const { bindCoreWorldCatalog,registerCoreWorldCatalog } = await import('../src/world-catalog.js');
  const { createRegionRoot } = await import('../src/world-scene.js');
  const { estate } = await import('../src/estate.js');
  const { exportWorldManifest, registerWorldObject, visualBindings, worldAnchor, worldObjects } = await import('../src/world-objects.js');
  registerCoreWorldCatalog();
  for (const id of ['farm:tractor','farm:wagon','lake:boat','lake:dock','mine:cart','mine:forge','woodland:site:alder-glade'])assert.ok(worldObjects.has(id), id);
  assert.equal(worldObjects.has('woodland:site:1'), false);
  registerWorldObject({id:'castle:surface',type:'world-section',parentId:'region:castle',regionId:'region:castle',transform:{position:[estate.x,estate.y,estate.z],rotation:[0,0,0],scale:[1,1,1]},transformSpace:'world',anchors:{},relationships:{children:[]}});
  const bridgeRoot = new T.Group();bridgeRoot.position.set(0,.1,24.82);
  const dragonRoot = new T.Group();dragonRoot.position.set(-2,-15.12,2.8);
  bindCoreWorldCatalog({castle:{bridge:{root:bridgeRoot},dragon:{root:dragonRoot}}});
  assert.equal(worldObjects.binding('castle:drawbridge'), bridgeRoot);
  assert.equal(worldObjects.binding('castle:dragon'), dragonRoot);
  assert.equal(worldObjects.get('castle:drawbridge').visual.binding,'live-scene');
  assert.equal(visualBindings.has(worldObjects.get('castle:drawbridge').visual.assetKey),false,'live assemblies are not advertised as rebuild factories');
  const conversation=worldAnchor('castle:dragon','conversation').position;
  assert.ok(Math.hypot(conversation[0]-(estate.x-2),conversation[1]-(estate.y-16),conversation[2]-(estate.z-5.7))<1e-9);
  const scene = new T.Scene(), root = createRegionRoot(scene, 'lake');
  assert.equal(root.name, 'world:region:lake');
  assert.equal(worldObjects.binding('region:lake'), root);
  assert.ok(visualBindings.has(worldObjects.get('region:lake').visual.assetKey));
  assert.deepEqual(worldObjects.get('lake:water').transform.position,[0,0,0]);
  assert.deepEqual(worldObjects.get('lake:falls').transform.position,[0,0,0]);
  assert.doesNotThrow(() => JSON.stringify(exportWorldManifest({ rootId: 'region:lake', includeDescendants: true })));
});

test('local anchors compose through the authoritative building transform', async () => {
  const { plots, doorstep } = await import('../src/layout.js');
  const { worldObjects, worldAnchor } = await import('../src/world-objects.js');
  for (const plot of plots) {
    const entrance = worldAnchor(plot.id, 'entrance');
    const expected = doorstep(plot, 0);
    assert.ok(Math.hypot(entrance.position[0] - expected.x, entrance.position[2] - expected.z) < 1e-9, plot.id);
    const arrival = worldAnchor(plot.id, 'arrival');
    const expectedArrival = doorstep(plot, .36);
    assert.ok(Math.hypot(arrival.position[0] - expectedArrival.x, arrival.position[2] - expectedArrival.z) < 1e-9, plot.id);
  }
});

test('anchor resolution composes nested scale and YXZ rotation once and respects interior scene domains', async () => {
  const { WorldObjectRegistry, resolveWorldAnchor } = await import('../src/world-objects.js');
  const registry = new WorldObjectRegistry();
  registry.register({id:'parent',transform:{position:[10,2,20],rotation:[0,Math.PI/2,0],scale:[2,2,2]},transformSpace:'world',anchors:{}});
  registry.register({id:'child',parentId:'parent',transform:{position:[1,0,0],rotation:[0,Math.PI/2,0],scale:[1,1,1]},transformSpace:'local',anchors:{use:{position:[0,0,1],forward:[0,0,1]}}});
  const use = resolveWorldAnchor(registry, 'child', 'use');
  assert.ok(Math.hypot(use.position[0]-10,use.position[1]-2,use.position[2]-16)<1e-9);
  assert.ok(Math.hypot(use.forward[0],use.forward[1],use.forward[2]+1)<1e-9);
  assert.equal(use.space, 'world');

  registry.register({id:'room',parentId:'parent',transform:{position:[3,1,4],rotation:[0,0,0],scale:[1,1,1]},transformSpace:'interior-local',anchors:{exit:{position:[0,0,2]}}});
  assert.deepEqual(resolveWorldAnchor(registry,'room','exit'),{position:[3,1,6],space:'interior-local'});
});

test('regional manifest hierarchy is valid, complete and safe to export', async () => {
  const { plots } = await import('../src/layout.js');
  const { exportWorldManifest, validateWorldManifest, worldObjects } = await import('../src/world-objects.js');
  const village = worldObjects.get('region:village');
  assert.deepEqual(village.relationships.children, plots.map(plot => plot.id));
  for(const plot of plots)assert.equal(worldObjects.get(`room:${plot.id}`).parentId,plot.id);
  for (const id of ['region:castle', 'region:farm', 'region:woodland', 'region:lake', 'region:mine'])assert.ok(worldObjects.has(id), id);
  const manifest = exportWorldManifest({ rootId: 'region:village', includeDescendants: true });
  const ids = new Set(manifest.objects.map(object => object.id));
  for (const id of ['region:village', ...plots.map(plot => plot.id)])assert.ok(ids.has(id), id);
  assert.deepEqual(validateWorldManifest(manifest), { ok: true, errors: [] });
  assert.doesNotThrow(() => structuredClone(manifest));
});

test('shared custom geometry can join owned render batches', async () => {
  const { Builder, registerSharedGeometry } = await import('../src/model.js');
  const key = `test-geometry-${Date.now()}`;
  assert.equal(registerSharedGeometry(key, new T.BoxGeometry(1, 1, 1)), true);
  assert.equal(registerSharedGeometry(key, new T.SphereGeometry(1)), false);
  const root = new T.Group(), builder = new Builder(root);
  builder.owner('bakery', 'bakery:test-custom', () => builder.put(key, '#fff', 0, 0, 0, 1, 1, 1));
  const [mesh] = builder.finish();
  assert.equal(mesh.geometry.type, 'BoxGeometry');
  assert.deepEqual(mesh.userData.instanceOwners, ['bakery']);
});

test('room construction exposes stable functional sections and colocated anchors', async () => {
  const { plots } = await import('../src/layout.js');
  const { makeRoom } = await import('../src/rooms.js');
  const { worldObjects } = await import('../src/world-objects.js');
  const plot = plots.find(candidate => candidate.id === 'mill');
  const room = makeRoom(plot);
  assert.equal(room.scene.name, 'room:mill');
  assert.ok(room.scene.getObjectByName('room:mill:structure'));
  assert.ok(room.scene.getObjectByName('room:mill:furnishings').children.length);
  assert.ok(room.scene.getObjectByName('anchor:room:mill:entrance'));
  assert.ok(room.scene.getObjectByName('anchor:room:mill:workshop'));
  assert.ok(room.scene.getObjectByName('anchor:room:mill:sluice'));
  assert.equal(worldObjects.get('room:mill').parentId, 'mill');
  assert.equal(worldObjects.get('room:mill:workshop').parentId, 'room:mill');
  assert.equal(worldObjects.get('room:mill').visual.binding,'procedural');
  assert.equal(worldObjects.get('room:mill:workshop').visual.binding,'live-scene');
  assert.equal(worldObjects.binding('room:mill'), room.scene);
  assert.ok(room.sections.workshop.children.some(child=>child.isInstancedMesh||child.children.length));
  assert.ok(room.sections['sleeping-loft'].children.some(child=>child.isInstancedMesh));
  assert.ok(room.sections.lighting.children.some(child=>child.isLight));
});

test('coupled mill placement is rejected while machinery anchors remain aligned', async () => {
  const { millWheel } = await import('../src/hydraulics.js');
  const { editWorldObjectPlacement, worldAnchor } = await import('../src/world-objects.js');
  const axle=worldAnchor('mill:water-wheel','axle').position;
  assert.ok(Math.hypot(axle[0]-millWheel.x,axle[1]-millWheel.y,axle[2]-millWheel.z)<1e-9);
  assert.throws(()=>editWorldObjectPlacement('mill',{x:0}),/coupled to the brook/i);
});

test('bound lake and mine assemblies use the coordinate frames published by the manifest', async () => {
  const {buildLakeScenery}=await import('../src/lake-scenery.js');
  const {buildMine}=await import('../src/mine.js');
  const {bindCoreWorldCatalog,registerCoreWorldCatalog}=await import('../src/world-catalog.js');
  const {worldObjects}=await import('../src/world-objects.js');
  registerCoreWorldCatalog();
  const waterMaterial=new T.MeshStandardMaterial();
  waterMaterial.uniforms={clock:{value:0},noiseMap:{value:null},runoff:{value:1},night:{value:0},cloud:{value:0}};
  const lakeRoot=new T.Group(),lake=buildLakeScenery(lakeRoot,waterMaterial);
  const mine=buildMine(new T.Group());
  bindCoreWorldCatalog({lake:{objectRoots:lake.objectRoots},mine});
  for(const id of ['lake:water','lake:dock','lake:falls','mine:portal','mine:forge']){
    const group=worldObjects.binding(id),position=worldObjects.get(id).transform.position;
    assert.deepEqual(group.position.toArray(),position,id);
    assert.equal(worldObjects.get(id).visual.binding,'live-scene',id);
  }
});

test('the live sluice assembly shares its manifest ground frame while the handle keeps its local pivot', async()=>{
  const {Builder}=await import('../src/model.js');
  const {dressVillage}=await import('../src/village.js');
  const {worldObjects,worldAnchor}=await import('../src/world-objects.js');
  const root=new T.Group(),builder=new Builder(root);dressVillage(root,builder);builder.finish();
  const record=worldObjects.get('mill:sluice'),group=worldObjects.binding('mill:sluice');
  assert.deepEqual(group.position.toArray(),record.transform.position);
  assert.equal(record.visual.binding,'live-scene');
  assert.ok(Math.abs(group.position.y+group.children[0].position.y-worldAnchor('mill:sluice','handle').position[1])<1e-9);
});
