import assert from 'node:assert/strict';
import {test} from 'node:test';
import {
  BIRD_GAIT,
  BOUND_GAIT,
  WALK_GAIT,
  createGaitState,
  trackYaw,
  updateGait,
  worldContact,
} from '../src/animal-gait.js';

test('distance-driven gait emits only grounded touchdown transitions',()=>{
  const gait=createGaitState(4,.2),touchdowns=[];
  const land=index=>touchdowns.push(index);

  for(let i=0;i<20;i++)updateGait(gait,0,1/60,WALK_GAIT,false,land);
  assert.deepEqual(touchdowns,[],'standing weight shifts never paint tracks');

  for(let i=0;i<40;i++)updateGait(gait,.025,1/60,WALK_GAIT,true,land);
  assert.deepEqual(touchdowns,[],'feet cannot touch down while the animal is airborne');

  for(let i=0;i<80;i++)updateGait(gait,.018,1/60,WALK_GAIT,false,land);
  assert.ok(touchdowns.length>=4,'a full grounded stride records each planted foot');
  assert.ok(touchdowns.every(index=>index>=0&&index<4));
});

test('bird gait alternates feet and settles without false idle contacts',()=>{
  const gait=createGaitState(2,0),touchdowns=[];
  for(let i=0;i<100;i++)updateGait(gait,.006,1/60,BIRD_GAIT,false,index=>touchdowns.push(index));
  assert.ok(touchdowns.includes(0)&&touchdowns.includes(1));
  const count=touchdowns.length;
  for(let i=0;i<60;i++)updateGait(gait,0,1/60,BIRD_GAIT,false,index=>touchdowns.push(index));
  assert.equal(touchdowns.length,count);
  assert.ok(Math.abs(gait.swing[0])<.02&&Math.abs(gait.swing[1])<.02);
});

test('contact projection and track yaw follow world facing',()=>{
  const out={x:0,z:0};
  worldContact(out,10,20,Math.PI/2,.3,.8,2);
  assert.ok(Math.abs(out.x-11.6)<1e-9);
  assert.ok(Math.abs(out.z-19.4)<1e-9);
  assert.ok(Math.abs(Math.abs(trackYaw(0,1))-Math.PI)<1e-12);
  assert.equal(trackYaw(1,0),-Math.PI/2);
});

test('a planted stance foot cancels body travel instead of sliding',()=>{
  const gait=createGaitState(4,.08),out={x:0,z:0};
  let rootZ=0,plantedZ;
  for(let i=0;i<4;i++){
    const travel=.025;rootZ+=travel;
    updateGait(gait,travel,1/60,WALK_GAIT,false,undefined,1);
    assert.equal(gait.contact[0],1,'selected foot stays in its stance interval');
    worldContact(out,0,rootZ,0,0,gait.forward[0]);
    plantedZ??=out.z;
    assert.ok(Math.abs(out.z-plantedZ)<1e-6,'world foot remains planted while the body advances');
  }
});

test('touchdown reports a forward posed foot and bound flight lands by travel phase',()=>{
  const gait=createGaitState(4,Math.PI*.99),events=[];
  for(let i=0;i<20;i++){
    updateGait(gait,.018,1/60,BOUND_GAIT,false,index=>events.push({index,forward:gait.forward[index],airborne:gait.airborne}),.65);
    if(gait.bodyLift>0)assert.equal(gait.airborne,true);
  }
  assert.ok(events.length>=2,'bounding fore or hind paws land after a distance-driven flight');
  assert.ok(events.every(event=>event.forward>0&&event.airborne===false),'touchdowns occur at the forward recovery endpoint on the ground');
});
