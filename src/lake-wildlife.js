import * as T from 'three';
import { dock, falls, lake, lakeDepth, lakeHabitat, lakePoint } from './lake-layout.js';
import { FISH_SPECIES } from './lake-species.js';

const TAU = Math.PI * 2;
const colors = new Map();
function material(color, options = {}) {
  const key = `${color}:${options.side ?? ''}:${options.transparent ?? ''}`;
  if (!colors.has(key)) colors.set(key, new T.MeshStandardMaterial({
    color, roughness: .86, metalness: 0, flatShading: true, ...options,
  }));
  return colors.get(key);
}

const ball = new T.SphereGeometry(.5, 9, 6);
const lowBall = new T.SphereGeometry(.5, 7, 5);
const cone = new T.ConeGeometry(.5, 1, 7);
const cylinder = new T.CylinderGeometry(.5, .5, 1, 7);
const wing = new T.SphereGeometry(.5, 7, 4, 0, TAU, 0, Math.PI * .64);

function seededRandom(seed = 0xA1DEBEEF) {
  return () => ((seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0) / 4294967296);
}

function mesh(geometry, color, scale, position, rotation) {
  const object = new T.Mesh(geometry, material(color));
  object.scale.set(...scale);
  object.position.set(...position);
  if (rotation) object.rotation.set(...rotation);
  object.castShadow = true;
  object.receiveShadow = true;
  return object;
}

function safePlantPosition(x, z) {
  const pierLane = Math.abs(x - dock.x) < 4.4 && z < dock.end + 7;
  const berth = Math.hypot(x - dock.berthX, z - dock.berthZ) < 6.2;
  return !pierLane && !berth && Math.hypot(x - falls.x, z - falls.z) > 9;
}

function setInstance(object, x, y, z, sx, sy, sz, yaw = 0, pitch = 0, roll = 0) {
  object.position.set(x, y, z);
  object.rotation.set(pitch, yaw, roll, 'YXZ');
  object.scale.set(sx, sy, sz);
  object.updateMatrix();
  return object.matrix;
}

function makeFishGeometry() {
  // A faceted fish with the caudal fin included in one economical mesh.
  const points = [
    [.58, 0, 0], [.14, .25, 0], [.14, 0, .18], [.14, -.25, 0], [.14, 0, -.18],
    [-.43, .13, 0], [-.43, 0, .10], [-.43, -.13, 0], [-.43, 0, -.10],
    [-.76, .30, 0], [-.67, 0, 0], [-.76, -.30, 0],
  ];
  const faces = [
    [0,1,2],[0,2,3],[0,3,4],[0,4,1], [1,5,2],[2,6,3],[3,7,4],[4,8,1],
    [2,5,6],[3,6,7],[4,7,8],[1,8,5], [5,8,6],[6,8,7],
    [5,9,10],[5,10,11],[7,10,9],[7,11,10],
  ];
  const positions = [];
  for (const face of faces) for (const index of face) positions.push(...points[index]);
  const geometry = new T.BufferGeometry();
  geometry.setAttribute('position', new T.Float32BufferAttribute(positions, 3));
  geometry.computeVertexNormals();
  return geometry;
}

function makePlants(root, random) {
  const dummy = new T.Object3D();
  const reedCount = 116;
  const reedStems = new T.InstancedMesh(
    new T.CylinderGeometry(.034, .055, 1, 5), material('#718248'), reedCount,
  );
  const reedHeads = new T.InstancedMesh(
    new T.SphereGeometry(.5, 6, 4), material('#7b6140'), reedCount,
  );
  reedStems.name = 'lake-plants-reed-stems';
  reedHeads.name = 'lake-plants-reed-heads';
  const reedBlade=new T.BufferGeometry();
  reedBlade.setAttribute('position',new T.Float32BufferAttribute([-.034,0,0,.034,0,0,.035,.55,.055,-.035,.55,.055,.01,.93,.19],3));
  reedBlade.setIndex([0,1,2,0,2,3,3,2,4]);reedBlade.computeVertexNormals();
  const foliage=new T.InstancedMesh(reedBlade,material('#7e9258',{side:T.DoubleSide}),reedCount*4);
  let placed = 0;
  for (let attempts = 0; placed < reedCount && attempts < 3000; attempts++) {
    const angle = random() * TAU;
    const point = lakePoint(angle, .81 + random() * .17);
    point.x += (random() - .5) * 1.5;
    point.z += (random() - .5) * 1.5;
    if (lakeHabitat(point.x, point.z) !== 'reeds' || !safePlantPosition(point.x, point.z)) continue;
    const height = .82 + random() * 1.12;
    reedStems.setMatrixAt(placed, setInstance(dummy, point.x, lake.level + height * .44, point.z,
      .75 + random() * .55, height, .75 + random() * .55, random() * .16));
    reedHeads.setMatrixAt(placed, setInstance(dummy, point.x, lake.level + height * .93, point.z,
      .12, .32 + random() * .12, .12, random() * .2, (random() - .5) * .13));
    reedStems.setColorAt(placed, new T.Color(random() > .4 ? '#718248' : '#819053'));
    reedHeads.setColorAt(placed, new T.Color(random() > .45 ? '#765a39' : '#927249'));
    for(let leaf=0;leaf<4;leaf++){
      const a=leaf*2.4+placed;
      foliage.setMatrixAt(placed*4+leaf,setInstance(dummy,point.x+.12*Math.sin(a),-.06,point.z+.12*Math.cos(a),
        1,height*(.58+leaf*.09),1.4,a,.11+leaf*.075));
    }
    placed++;
  }
  reedStems.count = reedHeads.count = placed;
  reedStems.castShadow = reedHeads.castShadow = true;
  reedStems.receiveShadow = true;
  foliage.count=placed*4;root.add(reedStems, reedHeads,foliage);

  const padCount = 44;
  const padShape = new T.Shape();
  padShape.moveTo(.10, 0);
  for (let i = 1; i <= 24; i++) {
    const a = .22 + (TAU - .44) * i / 24;
    padShape.lineTo(Math.cos(a) * .5, Math.sin(a) * .5);
  }
  padShape.closePath();
  const pads = new T.InstancedMesh(new T.ShapeGeometry(padShape), material('#5f873e', { side: T.DoubleSide }), padCount);
  const flowers = new T.InstancedMesh(lowBall, material('#edc860'), 13);
  const petals=new T.InstancedMesh(ball,material('#f2d9cc'),13*7);
  pads.name = 'lake-plants-lily-pads';
  flowers.name = 'lake-plants-lily-flowers';
  let flower = 0;
  for (let i = 0; i < padCount; i++) {
    let point;
    do {
      const angle = random() * TAU;
      point = lakePoint(angle, .72 + random() * .19);
    } while (!safePlantPosition(point.x, point.z));
    const size = .55 + random() * .58;
    pads.setMatrixAt(i, setInstance(dummy, point.x, lake.level + .025, point.z, size, size, size,
      random() * TAU, -Math.PI / 2));
    pads.setColorAt(i, new T.Color(i % 4 ? '#5f873e' : '#769b4c'));
    if (flower < flowers.count && i % 3 === 0) {
      for(let k=0;k<7;k++){
        const a=k*TAU/7+i;
        petals.setMatrixAt(flower*7+k,setInstance(dummy,point.x+.08+.074*Math.sin(a),.095,point.z-.04+.074*Math.cos(a),.080,.043,.167,a,-.36));
      }
      flowers.setMatrixAt(flower, setInstance(dummy, point.x + .08, lake.level + .10, point.z - .04,
        .17, .10, .17, random() * TAU));
      flowers.setColorAt(flower, new T.Color(flower % 3 ? '#f1cfd0' : '#eee2b8'));
      flower++;
    }
  }
  flowers.count = flower;
  pads.receiveShadow = true;
  flowers.castShadow = true;
  petals.count=flower*7;root.add(pads, flowers,petals);
  return { plants: placed + padCount + flower };
}

function makeFishSchools(root, random, sightings) {
  const count = 40;
  const swimTime={value:0},geometry=makeFishGeometry();
  const phases=new Float32Array(count);for(let i=0;i<count;i++)phases[i]=i*2.39;
  geometry.setAttribute('swimPhase',new T.InstancedBufferAttribute(phases,1));
  const swimMaterial=material('#9eb8a4').clone();
  function bendFish(shader){
    shader.uniforms.swimTime=swimTime;
    shader.vertexShader='uniform float swimTime;attribute float swimPhase;\n'+shader.vertexShader.replace('#include <begin_vertex>',`#include <begin_vertex>
      float travel=clamp((.35-position.x)*.91,0.,1.);
      transformed.z+=sin(swimTime*9.5+swimPhase-travel*3.3)*(.015+.24*travel*travel);
    `);
  }
  swimMaterial.onBeforeCompile=bendFish;
  const fish = new T.InstancedMesh(geometry,swimMaterial,count);
  fish.customDepthMaterial=new T.MeshDepthMaterial({depthPacking:T.RGBADepthPacking});
  fish.customDepthMaterial.onBeforeCompile=bendFish;
  fish.instanceMatrix.setUsage(T.DynamicDrawUsage);
  fish.castShadow = true;
  const entries = [];
  const schoolData = [
    ['Silver Minnow School', 'A quick cloud of tiny minnows turning silver in unison.', '#a8bdba', .83, .86],
    ['Rudd School', 'Golden rudd browse delicately beneath the shelter of lily pads.', '#c49b45', .90, .77],
    ['Perch School', 'Young striped perch cruise the drop-off in a watchful company.', '#75824c', .59, .71],
    ['Rainbow Trout', 'Rose-striped trout hold in the cool current below the falls.', '#91aaa4', .82, .58],
  ];
  let cursor = 0;
  for (let school = 0; school < schoolData.length; school++) {
    const [name, description, color, radius, speed] = schoolData[school];
    const angle = [4.86,2.32,3.89,Math.PI*.40][school];
    const center = lakePoint(angle, radius);
    const proxy = new T.Group();
    proxy.position.set(center.x, lake.level - .20, center.z);
    proxy.userData.lakeCreature = name;
    root.add(proxy);
    const state = { proxy, center, angle, radius, speed, phase: school * 1.61, start: cursor, count: 10 };
    sightings.push({ object: proxy, name, description, radius: 1.8 });
    for (let i = 0; i < state.count; i++) {
      entries.push({ school: state, phase: i / state.count * TAU + random() * .4, spread: .7 + random() * 1.6 });
      fish.setColorAt(cursor++, new T.Color(color));
    }
  }
  root.add(fish);
  const dummy = new T.Object3D();
  function update(time, dangerAt) {
    swimTime.value=time;
    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i], state = entry.school;
      const orbit = state.phase + time * state.speed;
      const cx = state.center.x + Math.cos(orbit) * 2.2;
      const cz = state.center.z + Math.sin(orbit) * 1.6;
      state.proxy.position.set(cx, lake.level - .18, cz);
      const danger = dangerAt(cx, cz, 7);
      const a = entry.phase + time * .68 + danger * .75;
      const x = cx + Math.cos(a) * entry.spread * (1 + danger * .7);
      const z = cz + Math.sin(a * .91) * entry.spread * .56;
      const y = lake.level - .18 - (i % 4) * .075 - danger * .20 + Math.sin(time * 2 + i) * .025;
      dummy.position.set(x, y, z);
      const vx=-Math.sin(orbit)*2.2*state.speed-Math.sin(a)*entry.spread*.68*(1+danger*.7);
      const vz=Math.cos(orbit)*1.6*state.speed+Math.cos(a*.91)*entry.spread*.56*.619*(1+danger*.7);
      dummy.rotation.set(0,-Math.atan2(vz,vx),Math.sin(time*2+i)*.06);
      const size = i % 10 === 9 ? .62 : .28 + (i % 3) * .06;
      dummy.scale.set(size * 1.35, size, size);
      dummy.updateMatrix();
      fish.setMatrixAt(i, dummy.matrix);
    }
    fish.instanceMatrix.needsUpdate = true;
  }
  return { count, update };
}

function frog(root, name, description, point, color, phase, sightings) {
  const group = new T.Group();
  group.position.set(point.x, lake.level + .10, point.z);
  group.userData.lakeCreature = name;
  const body = mesh(lowBall, color, [.62, .32, .48], [0, .06, 0]);
  const head = mesh(lowBall, color, [.45, .34, .42], [.32, .14, 0]);
  const face=new T.Group(),legs=[];
  group.add(body,face);face.add(head);
  for(const side of [-1,1]){
    face.add(mesh(lowBall,'#b8c06c',[.16,.15,.12],[.49,.25,side*.20]));
    face.add(mesh(lowBall,'#171712',[.055,.065,.04],[.55,.27,side*.225]));
    const hip=new T.Group(),shin=new T.Group();hip.position.set(-.13,.04,side*.15);
    hip.add(mesh(lowBall,color,[.24,.13,.13],[-.07,0,side*.055]));
    shin.position.set(-.16,0,side*.095);shin.add(mesh(lowBall,color,[.22,.062,.083],[.085,-.042,.014*side]));
    hip.add(shin);group.add(hip);legs.push({hip,shin,side});
    group.add(mesh(lowBall,color,[.17,.050,.072],[.19,-.025,side*.17]));
  }
  root.add(group);
  const perch=mesh(new T.CylinderGeometry(.43,.42,.034,22,1,false,.16,TAU-.31),'#6b8547',[1,1,.81],[point.x,.044,point.z]);
  root.add(perch);
  const state = { group, base: point, phase, hidden:0,face,body,legs,throat:head };
  sightings.push({ object: group, name, description, radius: .65 });
  return state;
}

function turtle(root, name, description, point, phase, sightings) {
  const group = new T.Group();
  group.position.set(point.x, lake.level + .03, point.z);
  group.userData.lakeCreature = name;
  group.add(mesh(lowBall, '#6a6338', [1.0, .30, .72], [0, .04, 0]));
  const head=mesh(lowBall,'#878052',[.28,.21,.22],[.52,.02,0]),paddles=[];
  group.add(head);
  for(const x of [-.28,.30])for(const side of [-1,1]){
    const pivot=new T.Group();pivot.position.set(x,-.02,side*.24);
    pivot.add(mesh(lowBall,'#74764b',[.21,.066,.25],[0,0,side*.12]));
    group.add(pivot);paddles.push({pivot,side,phase:x>0?0:Math.PI});
  }
  root.add(group);
  const state={group,base:point,phase,dive:0,head,paddles};
  sightings.push({ object: group, name, description, radius: .85 });
  return state;
}

function makeShoreCreatures(root, sightings) {
  const frogs = [
    frog(root, 'Common Frog', 'A russet-brown frog resting perfectly still on a sunlit pad.', lakePoint(2.75, .84), '#74834a', .1, sightings),
    frog(root, 'Marsh Frog', 'A large bright-green frog whose call carries across the reeds.', lakePoint(1.82, .88), '#568947', 2.1, sightings),
    frog(root, 'Golden Reed Frog', 'A tiny ochre frog clinging to a stem above the dark water.', lakePoint(3.55, .87), '#ae8a3f', 4.2, sightings),
    frog(root, 'Moor Frog', 'A shy blue-grey frog peering between the lily-pad shadows.', lakePoint(.92, .84), '#697968', 5.6, sightings),
  ];
  const turtles = [
    turtle(root, 'Old Pond Turtle', 'A broad weathered turtle basking with its feet spread wide.', lakePoint(2.35, .75), .4, sightings),
    turtle(root, 'Painted Turtle', 'A small striped turtle paddling neatly along the reed edge.', lakePoint(3.72, .78), 2.5, sightings),
    turtle(root, 'Snapping Turtle', 'A heavy dark turtle moving like an old stone beneath the surface.', lakePoint(.18, .69), 4.7, sightings),
  ];
  function update(time,dangerAt,dt){
    for(const f of frogs){
      const danger=dangerAt(f.base.x,f.base.z,5.5);
      // A startled frog jumps off its pad, then kicks back when the water settles.
      const target=danger>.22?1:0;
      const old=f.hidden;
      f.hidden=T.MathUtils.clamp(old+dt*(target?1.9:-.48),0,1);
      const u=f.hidden,leaping=target?Math.sin(Math.PI*u):0,heading=f.phase;
      f.group.position.set(f.base.x+Math.cos(heading)*u*.84,
        lake.level+.10+leaping*.32-u*.30,f.base.z+Math.sin(heading)*u*.84);
      f.group.rotation.set(0,-heading+(target?0:.22*Math.sin(time*.42+heading)),leaping*.26);
      f.face.rotation.z=.047*Math.sin(time*2+heading);
      f.body.scale.y=.32*(1+.07*Math.sin(time*2.1+heading));
      const kick=leaping||(!target&&u>0?.45+.42*Math.sin(time*9):0);
      for(const leg of f.legs){
        leg.hip.rotation.y=leg.side*(.21+.46*kick);leg.shin.rotation.y=leg.side*(2.35*kick);
      }
    }
    for(const t of turtles){
      const a=time*.08+t.phase,danger=dangerAt(t.group.position.x,t.group.position.z,6);
      t.dive+=(danger-t.dive)*(1-Math.exp(-dt*3.8));
      t.group.position.set(t.base.x+Math.cos(a)*1.25,lake.level+.02-t.dive*.44+.012*Math.sin(time*2+t.phase),t.base.z+Math.sin(a)*.72);
      t.group.rotation.set(.046*Math.sin(time*2+t.phase),-Math.atan2(.72*Math.cos(a),-1.25*Math.sin(a)),-t.dive*.14);
      t.head.position.x=.53+.065*Math.sin(time*1.45+t.phase)-.08*t.dive;
      t.head.rotation.y=.17*Math.sin(time*.85+t.phase);
      for(const limb of t.paddles){
        const phase=time*2.6+t.phase+limb.phase+(limb.side>0?Math.PI:0);
        limb.pivot.rotation.y=limb.side*.65*Math.sin(phase);
        limb.pivot.rotation.x=limb.side*.34*Math.cos(phase);
      }
    }
  }
  return { frogs, turtles, update };
}

function makeInsects(root, random, sightings) {
  const count = 20, dummy = new T.Object3D();
  const bodies = new T.InstancedMesh(new T.CapsuleGeometry(.035, .24, 2, 5), material('#426a71'), count);
  const wings = new T.InstancedMesh(new T.PlaneGeometry(.42, .095), material('#b8d8d4', {
    transparent: true, opacity: .62, side: T.DoubleSide, depthWrite: false,
  }), count);
  bodies.instanceMatrix.setUsage(T.DynamicDrawUsage);
  wings.instanceMatrix.setUsage(T.DynamicDrawUsage);
  const entries = [];
  const centers = [lakePoint(2.65, .80), lakePoint(1.35, .82), lakePoint(3.72, .80)];
  for (let i = 0; i < count; i++) {
    const kind = i < 8 ? 'Emperor Dragonfly' : i < 14 ? 'Blue Damselfly' : 'Amber Skimmer';
    entries.push({ center: centers[i % centers.length], phase: random() * TAU, radius: .5 + random() * 2, kind });
    bodies.setColorAt(i, new T.Color(kind === 'Emperor Dragonfly' ? '#387886' : kind === 'Blue Damselfly' ? '#548cad' : '#b47035'));
  }
  root.add(bodies, wings);
  const descriptions={
    'Emperor Dragonfly':'A large blue-green dragonfly patrolling the same reed-lined circuit.',
    'Blue Damselfly':'A needle-thin blue damselfly hovering just above the lily pads.',
    'Amber Skimmer':'A copper-winged skimmer flashing warmly whenever it turns.',
  };
  for(const entry of entries){
    const proxy=new T.Group();proxy.userData.lakeCreature=entry.kind;root.add(proxy);entry.proxy=proxy;
    sightings.push({object:proxy,name:entry.kind,description:descriptions[entry.kind],radius:.22});
  }
  function update(time, dangerAt) {
    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i], speed = entry.kind === 'Blue Damselfly' ? .75 : 1.25;
      const danger = dangerAt(entry.center.x, entry.center.z, 4);
      const a = entry.phase + time * speed + danger * .8;
      const x = entry.center.x + Math.cos(a) * entry.radius;
      const z = entry.center.z + Math.sin(a * 1.7) * entry.radius * .55;
      const y = lake.level + .62 + Math.sin(time * 3.2 + entry.phase) * .24 + danger * .55;
      dummy.position.set(x, y, z);
      dummy.rotation.set(0, -a, Math.PI / 2);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      bodies.setMatrixAt(i, dummy.matrix);
      dummy.rotation.set(-Math.PI / 2 + Math.sin(time * 23 + i) * .18, -a, 0);
      dummy.updateMatrix();
      wings.setMatrixAt(i, dummy.matrix);
      if (entry.proxy) entry.proxy.position.set(x, y, z);
    }
    bodies.instanceMatrix.needsUpdate = wings.instanceMatrix.needsUpdate = true;
  }
  return { count, update };
}

const birdSpecs = [
  { name: 'Grey Heron', description: 'A patient slate-grey heron stalking minnows on impossibly long legs.', color: '#8b9290', chest: '#d0c9b7', bill: '#b58a45', mode: 'wade', angle: 2.72, radius: .91, size: 1.25, neck: 1.28 },
  { name: 'Common Kingfisher', description: 'A jewel-bright kingfisher watching the water from its low alder perch.', color: '#277b88', chest: '#ba6339', bill: '#34332e', mode: 'perch', angle: 3.35, radius: .97, size: .54, neck: .28 },
  { name: 'Mallard Drake', description: 'An emerald-headed mallard leaving a fine V-shaped wake behind him.', color: '#6f6752', chest: '#784c39', bill: '#c4a83e', head: '#315b48', mode: 'swim', angle: 2.08, radius: .70, size: .78, neck: .42 },
  { name: 'Great Crested Grebe', description: 'A sharp-crested grebe slipping low and elegant across open water.', color: '#70685d', chest: '#e4d5b9', bill: '#a97654', head: '#4f3c31', mode: 'swim', angle: .10, radius: .61, size: .72, neck: .58, crest: true },
  { name: 'Reed Warbler', description: 'A warm-brown warbler balancing between two swaying reed stems.', color: '#8c6947', chest: '#c5aa83', bill: '#665441', mode: 'reeds', angle: 1.72, radius: .93, size: .38, neck: .18 },
  { name: 'Barn Swallow', description: 'A blue-backed swallow scything low over the lake on forked wings.', color: '#314c5b', chest: '#d9c5a0', bill: '#6b4235', mode: 'fly', angle: 4.3, radius: .56, size: .48, neck: .12, forked: true },
  { name: 'Mute Swan', description: 'A white swan sailing with its long neck curved into a quiet question.', color: '#e5e1d2', chest: '#eeeade', bill: '#c66a37', head: '#e8e5d8', mode: 'swim', angle: 4.82, radius: .68, size: 1.22, neck: 1.30 },
  { name: 'Common Moorhen', description: 'A dark moorhen flicking its white tail as it threads through the pads.', color: '#393d38', chest: '#4d4940', bill: '#b94b35', mode: 'swim', angle: 1.15, radius: .81, size: .55, neck: .25 },
];

function makeBird(root, spec, sightings) {
  const point = lakePoint(spec.angle, spec.radius);
  const group = new T.Group();
  group.position.set(point.x, lake.level, point.z);
  group.userData.lakeCreature = spec.name;
  const s = spec.size, flying=spec.mode==='fly';
  const longNeck=spec.name==='Mute Swan'||spec.name==='Grey Heron';
  const bodyY=spec.mode==='wade'?.51:.13;
  const torso=mesh(ball,spec.color,[s, s*.49, s*.52], [0,s*bodyY,0]);
  group.add(torso);
  group.add(mesh(ball,spec.chest,[s*.40,s*.39,s*.43],[s*.29,s*(bodyY+.04),0]));
  const headX=s*(longNeck?.53:.43),headY=s*(bodyY+.24)+spec.neck*(longNeck?.67:.42);
  const headRig=new T.Group();headRig.position.set(s*.28,s*bodyY,0);group.add(headRig);
  function attachHead(part){part.position.sub(headRig.position);headRig.add(part);}
  const curve=new T.CatmullRomCurve3([
    new T.Vector3(s*.30,s*(bodyY+.06),0),new T.Vector3(s*.40,s*(bodyY+.21),0),
    new T.Vector3(s*(longNeck?.35:.42),headY-.13*s,0),new T.Vector3(headX,headY,0)]);
  const neck=new T.Mesh(new T.TubeGeometry(curve,9,s*(longNeck?.086:.095),7,false),material(spec.chest));
  neck.castShadow=true;attachHead(neck);
  attachHead(mesh(ball,spec.head??spec.color,[s*.29,s*.24,s*.24],[headX,headY,0]));
  const probing=spec.mode==='wade'||spec.mode==='perch';
  const billLength=s*(probing?.36:.21),billX=headX+s*.10+billLength*.46;
  attachHead(mesh(probing?cone:ball,spec.bill,probing?[s*.082,billLength,s*.09]:[billLength,s*.064,s*.116],
    [billX,headY-s*.031,0],probing?[0,0,-Math.PI/2]:null));
  const wings=[];
  for(const side of [-1,1]){
    attachHead(mesh(lowBall,'#201e19',[s*.048,s*.053,s*.024],[headX+s*.067,headY+s*.029,side*s*.097]));
    const pinion=mesh(wing,spec.color,[s*.80,s*.19,s*(flying?.95:.35)],[-s*.12,s*(bodyY+.07),side*s*(flying?.49:.20)],[side*.11,.08*side,-side*.12]);
    const shoulder=new T.Group();shoulder.position.set(s*.01,s*(bodyY+.10),side*s*.16);
    pinion.position.sub(shoulder.position);shoulder.add(pinion);group.add(shoulder);wings.push(shoulder);
    if(!flying)group.add(mesh(lowBall,spec.color,[s*.36,s*.085,s*.11],[-s*.44,s*(bodyY+.10),side*s*.078],[0,side*.12,.21]));
  }
  if(spec.mode==='perch'||spec.mode==='reeds'){
    const start=new T.Vector3(point.x-.28,-lakeDepth(point.x,point.z)-.12,point.z+.20);
    const end=new T.Vector3(point.x+.12,1.25,point.z);
    const delta=end.clone().sub(start),support=new T.Mesh(cylinder,material(spec.mode==='perch'?'#75674e':'#7d8951'));
    support.position.copy(start).lerp(end,.5);support.scale.set(.062,delta.length(),.062);
    support.quaternion.setFromUnitVectors(T.Object3D.DEFAULT_UP,delta.normalize());root.add(support);
  }
  const legs=[];
  if(spec.mode==='wade')for(const side of [-1,1]){
    const leg=new T.Group();leg.position.set(-s*.10,s*.31,side*s*.15);
    leg.add(mesh(cylinder,'#827253',[s*.045,s*.95,s*.045],[0,-s*.47,0]));
    leg.add(mesh(lowBall,'#827253',[s*.20,s*.024,s*.076],[s*.06,-s*.94,0]));
    group.add(leg);legs.push(leg);
  }
  if (spec.crest) for (const side of [-1, 1])
    attachHead(mesh(cone, '#4b362e', [s * .13, s * .36, s * .10], [s * .42, headY + s * .14, side * s * .13], [0, 0, side * .55]));
  if (spec.forked) for (const side of [-1, 1])
    group.add(mesh(cone, spec.color, [s * .11, s * .72, s * .08], [-s * .70, s * bodyY, side * s * .16], [0, 0, Math.PI / 2 + side * .12]));
  root.add(group);
  sightings.push({ object: group, name: spec.name, description: spec.description, radius: Math.max(.55, s) });
  return { group, spec, point, phase: spec.angle * 2.71, alarm:0,wings,legs,headRig,torso };
}

function makeBirds(root, sightings) {
  const birds = birdSpecs.map(spec => makeBird(root, spec, sightings));
  function update(time,dangerAt,dt) {
    for (const bird of birds) {
      const { group, point, spec, phase } = bird;
      const danger = dangerAt(group.position.x, group.position.z, spec.mode === 'fly' ? 4 : 8);
      bird.alarm+=(danger-bird.alarm)*(1-Math.exp(-dt*3.3));
      if (spec.mode === 'swim') {
        const a = time * (.055 + .01 * spec.size) + phase;
        group.position.set(point.x + Math.cos(a) * 2.8, lake.level + .05 + bird.alarm * 1.8,
          point.z + Math.sin(a) * 1.7);
        group.rotation.y=-Math.atan2(1.7*Math.cos(a),-2.8*Math.sin(a));
      } else if (spec.mode === 'fly') {
        const a = time * .20 + phase;
        group.position.set(lake.x + Math.cos(a) * 19, lake.level + 3.3 + Math.sin(a * 2) * .65,
          lake.z + Math.sin(a) * 20);
        group.rotation.y = -a - Math.PI / 2;
      } else {
        const a = time * .12 + phase;
        group.position.set(point.x + Math.cos(a) * bird.alarm * 5, lake.level +
          (spec.mode === 'perch' || spec.mode === 'reeds' ? 1.25 : .15) + bird.alarm * 3.2,
          point.z + Math.sin(a) * bird.alarm * 4);
        if(spec.mode==='wade'){
          const walk=time*.30+phase;
          group.position.x+=.62*Math.sin(walk)*(1-bird.alarm);
          group.rotation.y=(1-Math.cos(walk))*1.50;
          for(let i=0;i<bird.legs.length;i++){
            const gait=Math.sin(time*2.4+phase+i*Math.PI);
            bird.legs[i].rotation.z=.23*gait*(1-bird.alarm)+.64*bird.alarm;
            bird.legs[i].position.y=spec.size*(.31+.10*Math.max(0,gait)*(1-bird.alarm));
          }
        }else group.rotation.y=Math.sin(time*.17+phase)*.35;
      }
      const flying=spec.mode==='fly'||bird.alarm>.12;
      const effort=flying?(.25+.75*T.MathUtils.smoothstep(Math.sin(time*1.8+phase)+bird.alarm,.03,.70)):0;
      const flap=flying?.09+effort*Math.sin(time*(spec.size>.8?6.5:12)+phase)*.90:.035*Math.sin(time*1.3+phase);
      bird.wings.forEach((w,i)=>{const side=i?1:-1;w.scale.z=1+bird.alarm*1.4;w.rotation.x=side*flap;w.rotation.y=side*effort*.14*Math.cos(time*8+phase);});
      const probe=spec.mode==='wade'?Math.pow(Math.max(0,Math.sin(time*.90+phase)),6):0;
      bird.headRig.rotation.z=-.82*probe+.07*Math.sin(time*(flying?1.8:.9)+phase);
      bird.headRig.rotation.y=.25*Math.sin(time*.55+phase);
      bird.torso.scale.y=spec.size*.49*(1+.042*Math.sin(time*2.3+phase));
      group.rotation.x=(flying?.19:.034)*Math.sin(time*(flying?.48:1.5)+phase);
    }
  }
  return { count: birds.length, update };
}

export function buildLakeWildlife(root) {
  if (!root?.add) throw new TypeError('buildLakeWildlife requires a THREE.Object3D root');
  const random = seededRandom();
  const sightings = [];
  const plantStats = makePlants(root, random);
  const fish = makeFishSchools(root, random, sightings);
  const shore = makeShoreCreatures(root, sightings);
  const insects = makeInsects(root, random, sightings);
  const birds = makeBirds(root, sightings);
  const disturbances = [];
  let observerPulse = null;

  function disturb(x, z, strength = 1) {
    if (!Number.isFinite(x) || !Number.isFinite(z)) return;
    disturbances.push({ x, z, strength: T.MathUtils.clamp(Number(strength) || 0, 0, 1), life: 1 });
    if (disturbances.length > 8) disturbances.shift();
  }

  function dangerAt(x, z, radius) {
    let amount = 0;
    for (const pulse of disturbances) {
      const distance = Math.hypot(x - pulse.x, z - pulse.z);
      amount = Math.max(amount, pulse.strength * pulse.life * (1 - T.MathUtils.smoothstep(distance, radius * .3, radius)));
    }
    if (observerPulse) {
      const distance = Math.hypot(x - observerPulse.x, z - observerPulse.z);
      amount = Math.max(amount, observerPulse.strength * (1 - T.MathUtils.smoothstep(distance, radius * .25, radius)));
    }
    return amount;
  }

  function update(time = 0, dt = 0, observer = null) {
    dt = Math.max(0, Math.min(.1, Number(dt) || 0));
    observerPulse = observer && Number.isFinite(observer.x) && Number.isFinite(observer.z)
      ? { x: observer.x, z: observer.z, strength: T.MathUtils.clamp(Number(observer.disturbance) || 0, 0, 1) }
      : null;
    for (let i = disturbances.length - 1; i >= 0; i--) {
      disturbances[i].life -= dt * .68;
      if (disturbances[i].life <= 0) disturbances.splice(i, 1);
    }
    fish.update(time, dangerAt);
    shore.update(time,dangerAt,dt);
    insects.update(time, dangerAt);
    birds.update(time,dangerAt,dt);
  }

  const eye = new T.Vector3(), direction = new T.Vector3(), target = new T.Vector3(), offset = new T.Vector3();
  function sight(camera,unobstructed) {
    if (!camera?.getWorldDirection || !camera?.getWorldPosition) return null;
    camera.getWorldPosition(eye);
    camera.getWorldDirection(direction).normalize();
    let best = null;
    for (const entry of sightings) {
      if (!entry.object.visible) continue;
      entry.object.getWorldPosition(target);
      offset.copy(target).sub(eye);
      const distance = offset.length();
      if (distance < .35 || distance > Math.min(110,28+entry.radius*85)) continue;
      const forward = offset.dot(direction);
      if (forward <= 0) continue;
      const miss = Math.sqrt(Math.max(0, distance * distance - forward * forward));
      const allowance = entry.radius + distance * .012;
      if (miss > allowance) continue;
      const score = miss / allowance + distance / 180;
      if (!best || score < best.score) best = { ...entry, distance, score };
    }
    if(best && unobstructed && !unobstructed(eye,best.object.getWorldPosition(target)))return null;
    return best ? { name: best.name, description: best.description, distance: best.distance } : null;
  }

  return {
    update, disturb, sight,
    stats: Object.freeze({
      catchableSpecies: FISH_SPECIES.length,
      fish: fish.count,
      frogs: shore.frogs.length,
      turtles: shore.turtles.length,
      insects: insects.count,
      birds: birds.count,
      plants: plantStats.plants,
    }),
  };
}
