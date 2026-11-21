import assert from 'node:assert/strict';
import {test} from 'node:test';
import {sailForces,createLakeBoat,boatFits} from '../src/lake-boat.js';
import {dock,lake,lakePoint,lakeRadius} from '../src/lake-layout.js';
import {throwStone,stepStone} from '../src/lake-stone.js';

test('trim, wind angle and boat speed change the apparent load on both tacks',()=>{
  const sheet=Math.PI/4;
  const reach=sailForces(0,0,0,sheet,{x:5,z:0});
  const other=sailForces(0,0,0,sheet,{x:-5,z:0});
  assert.ok(reach.drive>1);
  assert.equal(other.drive,reach.drive);
  assert.equal(other.boom,-reach.boom);
  assert.equal(other.side,-reach.side);
  assert.equal(sailForces(0,0,0,sheet,{x:0,z:6}).drive,0);
  assert.equal(sailForces(0,0,0,1.56,{x:4,z:2}).fill,0);
  assert.ok(sailForces(0,0,0,sheet,{x:7,z:0}).drive>reach.drive);
  assert.ok(sailForces(0,0,0,1.48,{x:0,z:-6}).drive>sailForces(0,3,0,1.48,{x:0,z:-6}).drive);
});

test('each propulsion mode leaves the berth, anchors and respects the shoreline',()=>{
  for(const mode of ['sail','motor','oars']){
    const v=createLakeBoat(),{boat}=v;boat.mode=mode;
    assert.ok(boatFits(boat.x,boat.z,boat.yaw));
    v.board();
    for(let i=0;i<350;i++)v.step(1/60,mode==='sail'?0:1,0,{x:5,z:0});
    assert.ok(boat.z>dock.berthZ+3,mode);
    assert.equal(v.canDock(),false,mode);
    v.toggleAnchor();const stopped=[boat.x,boat.z];
    v.step(.1,1,1,{x:9,z:3});assert.deepEqual([boat.x,boat.z],stopped);
    v.toggleAnchor();boat.mode='motor';
    for(let i=0;i<4300;i++)v.step(1/60,1,0,{x:0,z:0});
    assert.ok(lakeRadius(boat.x,boat.z)<1&&boatFits(boat.x,boat.z,boat.yaw));
    v.moor();assert.equal(boat.aboard,false);assert.equal(boat.z,dock.berthZ);assert.ok(v.canDock());
  }
});

test('a low cast skips repeatedly, a steep throw sinks, and frame rate preserves the result',()=>{
  function flight(pitch,dt){
    const stone=throwStone({x:lake.x,y:1.75,z:lake.z-18},{x:0,y:Math.sin(pitch),z:Math.cos(pitch)});
    let impacts=0;
    for(let time=0;!stone.done&&time<9;time+=dt)stepStone(stone,dt,()=>impacts++);
    assert.ok(stone.done);assert.ok(impacts>0);return stone.skips;
  }
  assert.ok(flight(0,1/60)>=3);assert.equal(flight(0,.1),flight(0,1/60));
  assert.equal(flight(-1,.1),0);
  for(let i=0;i<36;i++){const p=lakePoint(i*Math.PI/18,1);assert.ok(Math.abs(lakeRadius(p.x,p.z)-1)<1e-10);}
});

test('a cast can be retrieved, missed, hooked, landed and released at the jetty',async()=>{
  const T=await import('three');
  const {buildLakeTackle}=await import('../src/lake-tackle.js');
  const camera=new T.PerspectiveCamera(46,1,.08,295);
  camera.position.set(dock.x,dock.deck+1.57,dock.end-1);camera.lookAt(dock.x,0,dock.end+14);
  const messages=[],captures=[],splashes=[];
  const tackle=buildLakeTackle(new T.Group(),camera,{disturb:(...args)=>splashes.push(args)},m=>messages.push(m),(kind,name)=>captures.push({kind,name}),()=>.18);
  let clock=0;
  function advanceTo(stage){
    for(let i=0;i<240&&tackle.stage!==stage;i++)tackle.tick(.05,clock+=.05,'rod');
    assert.equal(tackle.stage,stage);
  }
  tackle.action('rod');advanceTo('waiting');assert.equal(splashes.length,1);
  tackle.action('rod');assert.equal(tackle.stage,'idle');
  tackle.action('rod');advanceTo('bite');advanceTo('waiting');assert.equal(captures.length,0);
  advanceTo('bite');tackle.action('rod');assert.equal(tackle.stage,'fighting');
  advanceTo('idle');assert.match(messages.at(-1),/slack/i);assert.equal(captures.length,0);
  tackle.action('rod');advanceTo('bite');tackle.action('rod');
  let reeling=true;
  for(let i=0;i<2400&&tackle.fight;i++){
    if(tackle.fight.tension>=.70)reeling=false;
    else if(tackle.fight.tension<=.40)reeling=true;
    tackle.tick(.05,clock+=.05,'rod',Number(reeling));
  }
  assert.equal(tackle.stage,'landed');assert.equal(captures.length,1);
  assert.equal(captures[0].kind,'catch');assert.ok(messages.at(-1).includes(captures[0].name));
  tackle.action('rod');assert.equal(tackle.stage,'idle');
});

test('moving sideways preserves the hooked fish position during a sideways run',async()=>{
  const T=await import('three');
  const {buildLakeTackle}=await import('../src/lake-tackle.js');
  const root=new T.Group(),camera=new T.PerspectiveCamera();
  camera.position.set(dock.x,dock.deck+1.57,dock.end-1);camera.lookAt(dock.x,0,dock.end+14);
  const tackle=buildLakeTackle(root,camera,{disturb(){}},()=>{},()=>{},()=>.25);
  tackle.action('rod');
  for(let i=0;i<160&&tackle.stage!=='bite';i++)tackle.tick(.05,i*.05,'rod');
  tackle.action('rod');assert.ok(tackle.fight);
  tackle.fight.lateral=3;
  const line=root.getObjectByProperty('isLine',true).geometry.attributes.position;
  const hook=()=>new T.Vector3().fromBufferAttribute(line,line.count-1);
  tackle.tick(.001,8,'rod');const before=hook();
  camera.position.x+=3;camera.position.z-=2;
  tackle.tick(.001,8.001,'rod');
  assert.ok(hook().distanceTo(before)<.005);
});
