import assert from 'node:assert/strict';
import {test} from 'node:test';

test('an individual mill bucket carries water over the crown and releases it on the return',async()=>{
  const {createMillDrive,bucketPose}=await import('../src/hydraulics.js');
  const drive=createMillDrive();
  let loaded=false,overTop=false,descending=false,emptied=false;
  for(let i=0;i<3600;i++){
    drive.step(1/120,1);
    const pose=bucketPose(drive,0);
    if(pose.phase>.3&&pose.phase<.65&&pose.fill>.45)loaded=true;
    if(loaded&&pose.phase>3&&pose.phase<3.25&&pose.fill>.38)overTop=true;
    if(overTop&&pose.phase>4.7&&pose.phase<5.25&&pose.fill>.33)descending=true;
    if(descending&&pose.phase>6.04&&pose.fill<.1&&pose.released>0)emptied=true;
  }
  assert.ok(loaded&&overTop&&descending&&emptied);
});

test('boot prints follow distance traveled, alternate feet, and reset on teleport',async()=>{
  const {createFootfallTracker,groundForPrint}=await import('../src/footfall.js');
  const marks=[];
  const tracker=createFootfallTracker(mark=>marks.push(mark));
  tracker.reset(0,0);
  tracker.move(0,-.4);tracker.move(0,-.8);tracker.move(0,-1.3);
  assert.equal(marks.length,2);
  assert.ok(marks[0].x<0&&marks[1].x>0);
  tracker.reset(-100,55);tracker.move(-100,55);
  assert.equal(marks.length,2);
  assert.equal(groundForPrint({snowpack:.7,wetness:.8},true),'snow');
  assert.equal(groundForPrint({snowpack:0,wetness:.7},true),'mud');
  assert.equal(groundForPrint({snowpack:0,wetness:.7},false),null);
});

test('standard gamepad filters drift, preserves analog magnitude and edge-triggers actions',async()=>{
  const {createGamepadControls}=await import('../src/gamepad.js');
  const pad={mapping:'standard',index:0,connected:true,axes:[.08,.05,0,0],buttons:Array.from({length:17},()=>({value:0,pressed:false}))};
  const controls=createGamepadControls(()=>[pad]);
  assert.equal(controls.poll().moveX,0);
  pad.axes[1]=-.56;pad.buttons[0]={pressed:true,value:1};
  const first=controls.poll();
  assert.ok(first.forward>.3&&first.forward<.6);
  assert.equal(first.confirm,true);
  assert.equal(controls.poll().confirm,false);
  pad.connected=false;
  assert.equal(controls.poll().connected,false);
});
