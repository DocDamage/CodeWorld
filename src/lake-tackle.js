import * as T from 'three';
import {lakeDepth,lakeHabitat} from './lake-layout.js';
import {chooseCatch} from './lake-species.js';
import {createFishFight,stepFishFight} from './lake-fight.js';
import {throwStone,stepStone} from './lake-stone.js';

export function buildLakeTackle(root,camera,wildlife,report,record,rng=Math.random){
  const rig=new T.Group();root.add(rig);
  const direction=new T.Vector3(),start=new T.Vector3(),target=new T.Vector3(),tip=new T.Vector3(),hand=new T.Vector3(),local=new T.Vector3();
  function solid(geometry,color,parent=rig){
    const mesh=new T.Mesh(geometry,new T.MeshStandardMaterial({color,roughness:.7}));
    parent.add(mesh);return mesh;
  }
  const rod=new T.Group();rig.add(rod);
  const sections=Array.from({length:6},(_,i)=>
    solid(new T.CylinderGeometry(.021-(i+1)*.0024,.021-i*.0024,1,8),'#6c5034',rod));
  const reelBody=new T.Group();rod.add(reelBody);
  solid(new T.BoxGeometry(.021,.081,.033),'#565a50',reelBody).position.y=.042;
  const spool=new T.Group();reelBody.add(spool);
  const winding=solid(new T.CylinderGeometry(.047,.047,.072,16),'#8e8265',spool);
  winding.rotation.z=Math.PI/2;
  const stripe=solid(new T.BoxGeometry(.068,.004,.008),'#d1bf94',spool);
  stripe.position.y=.047;
  for(const side of [-1,1]){
    const flange=solid(new T.CylinderGeometry(.058,.058,.008,16),'#53594f',reelBody);
    flange.rotation.z=Math.PI/2;flange.position.x=side*.038;
  }
  const crank=new T.Group();crank.position.x=-.050;reelBody.add(crank);
  solid(new T.BoxGeometry(.012,.061,.013),'#b79964',crank).position.y=.023;
  solid(new T.SphereGeometry(.018,8,6),'#51463a',crank).position.set(-.013,.051,0);
  const restTip=new T.Vector3(),bend=new T.Vector3(),joint=new T.Vector3(),previousJoint=new T.Vector3();
  const hook=new T.Vector3(),swimTarget=new T.Vector3(),fishHeading=new T.Vector3();
  const escapeStart=new T.Vector3(),escapeEnd=new T.Vector3(),brokenEnd=new T.Vector3();
  const angler=new T.Vector2(),castAxis=new T.Vector2(),virtualHook=new T.Vector2();
  const bob=new T.Group();rig.add(bob);
  solid(new T.SphereGeometry(.068,12,8),'#eedabc',bob).scale.y=1.55;
  solid(new T.CylinderGeometry(.027,.034,.12,9),'#c74f34',bob).position.y=.11;
  const linePoints=new Float32Array(17*3),lineG=new T.BufferGeometry();
  lineG.setAttribute('position',new T.BufferAttribute(linePoints,3));
  const line=new T.Line(lineG,new T.LineBasicMaterial({color:'#e4dcc4',transparent:true,opacity:.76}));
  line.frustumCulled=false;rig.add(line);
  const fish=new T.Group();rig.add(fish);
  const body=solid(new T.SphereGeometry(1,14,9),'#839577',fish);body.scale.set(.078,.23,.105);
  const tail=solid(new T.ConeGeometry(.105,.16,3),'#667b62',fish);tail.position.y=-.245;tail.rotation.z=Math.PI;
  for(const side of [-1,1])solid(new T.SphereGeometry(.017,7,5),'#1e2623',fish).position.set(.043*side,.145,-.056);
  const dorsal=solid(new T.ConeGeometry(.091,.15,3),'#687356',fish);dorsal.position.set(0,-.02,.099);dorsal.rotation.x=1.35;dorsal.scale.x=.24;
  for(const flank of [-1,1]){
    const fin=solid(new T.SphereGeometry(1,7,5),'#9c8461',fish);fin.scale.set(.067,.085,.014);fin.position.set(flank*.067,.036,-.014);fin.rotation.z=flank*.45;
  }
  const rock=solid(new T.DodecahedronGeometry(.094,0),'#8f8981');rock.scale.set(1,.38,.73);
  const rings=[];
  const ringG=new T.RingGeometry(.92,1,44);ringG.rotateX(-Math.PI/2);
  for(let i=0;i<16;i++){
    const mesh=new T.Mesh(ringG,new T.MeshBasicMaterial({color:'#d1e1cb',transparent:true,opacity:.6,depthWrite:false}));
    mesh.renderOrder=2;mesh.visible=false;root.add(mesh);rings.push({mesh,age:2,size:1});
  }
  let cursor=0,stone=null,stage='idle',elapsed=0,delay=0,catchInfo=null,weight=0,fight=null,nextWake=0;
  let escapeTime=0,lineBroke=false;
  function splash(x,z,size=1){
    const ring=rings[cursor++%rings.length];ring.age=0;ring.size=size;ring.mesh.position.set(x,.044,z);ring.mesh.visible=true;
    wildlife.disturb(x,z,Math.min(1,size*.65));
  }
  function reset(){
    stage='idle';stone=null;fight=null;escapeTime=0;lineBroke=false;
    fish.visible=bob.visible=line.visible=rock.visible=rod.visible=false;
  }
  reset();
  function rodPose(){
    hand.set(.30,-.35,-.44).applyQuaternion(camera.quaternion).add(camera.position);
    restTip.set(.46,fight ? .30 : .10,-1.77).applyQuaternion(camera.quaternion).add(camera.position);
    bend.set(0,0,0);
    if(fight){
      bend.subVectors(hook,restTip).normalize().multiplyScalar(.62*fight.tension);
      bend.y-=.46*fight.tension;
      const twitch=fight.headShake*(.026+.075*fight.pull)*fight.tension;
      bend.x-=castAxis.y*twitch;bend.z+=castAxis.x*twitch;
    }else if(lineBroke&&escapeTime>0)bend.y=.27*escapeTime**2*Math.sin((.8-escapeTime)*30);
    previousJoint.copy(hand);
    sections.forEach((section,i)=>{
      const q=(i+1)/sections.length;
      joint.lerpVectors(hand,restTip,q).addScaledVector(bend,q*q*q);
      section.position.copy(previousJoint).lerp(joint,.5);
      local.subVectors(joint,previousJoint);section.scale.y=local.length();
      section.quaternion.setFromUnitVectors(T.Object3D.DEFAULT_UP,local.normalize());
      previousJoint.copy(joint);
    });
    tip.copy(joint);
    reelBody.quaternion.copy(camera.quaternion);
    local.set(0,-.074,0).applyQuaternion(camera.quaternion);
    reelBody.position.lerpVectors(hand,restTip,.32).addScaledVector(bend,.32**3).add(local);
  }
  function beginFight(){
    angler.set(camera.position.x,camera.position.z);
    virtualHook.set(target.x,target.z);castAxis.subVectors(virtualHook,angler).normalize();
    fight=createFishFight(catchInfo,weight,virtualHook.distanceTo(angler),rng);
    stage='fighting';elapsed=0;nextWake=0;hook.copy(target);fishHeading.set(castAxis.x,0,castAxis.y);
    splash(hook.x,hook.z,.52);
    report(weight>5?'A heavy fish takes the line.':'Fish on!');
  }
  function playFish(dt,reel){
    const x=camera.position.x,z=camera.position.z;
    const change=Math.hypot(virtualHook.x-x,virtualHook.y-z)-virtualHook.distanceTo(angler);
    // Keep the fish in world space when the angler turns, walks, or drifts in the boat.
    if(x!==angler.x||z!==angler.y){
      const dx=virtualHook.x-x,dz=virtualHook.y-z,radius=Math.hypot(dx,dz);
      if(radius>.001){
        const side=T.MathUtils.clamp(fight.lateral,-radius*.72,radius*.72);
        const forward=Math.sqrt(radius*radius-side*side);
        // Undo the existing sideways displacement before applying the next swim step.
        castAxis.set(forward*dx+side*dz,forward*dz-side*dx).normalize();
      }
      angler.set(x,z);
    }
    stepFishFight(fight,dt,reel,change);
    const side=T.MathUtils.clamp(fight.lateral,-fight.distance*.72,fight.distance*.72);
    const along=Math.sqrt(Math.max(0,fight.distance**2-side**2));
    virtualHook.set(x+castAxis.x*along-castAxis.y*side,z+castAxis.y*along+castAxis.x*side);
    swimTarget.set(virtualHook.x,0,virtualHook.y);
    // Follow the bank up to the last swimmable point when a run meets the shallows.
    if(lakeDepth(swimTarget.x,swimTarget.z)<.12){
      let wet=0,dry=1;
      for(let i=0;i<8;i++){
        const q=(wet+dry)/2;local.lerpVectors(hook,swimTarget,q);
        if(lakeDepth(local.x,local.z)>=.12)wet=q;else dry=q;
      }
      swimTarget.lerpVectors(hook,swimTarget,wet);
    }
    swimTarget.y=-Math.min(fight.depth,Math.max(.06,lakeDepth(swimTarget.x,swimTarget.z)*.65));
    local.subVectors(swimTarget,hook);
    if(local.lengthSq()>.00001)fishHeading.lerp(local.normalize(),1-Math.exp(-dt*7));
    hook.copy(swimTarget);
    fish.rotation.set(Math.PI*.5-Math.asin(T.MathUtils.clamp(fishHeading.y,-.7,.7)),
      Math.atan2(fishHeading.x,fishHeading.z)+.27*fight.headShake,0,'YXZ');
    fish.position.set(0,-.21*fish.scale.y,0).applyQuaternion(fish.quaternion).add(hook);
    bob.position.copy(hook);bob.position.y+=.07;
    if((nextWake-=dt)<=0&&fight.running){
      splash(hook.x,hook.z,.35+.55*fight.tension);nextWake=1.05;
    }
    if(fight.outcome==='landed'){
      stage='landed';elapsed=0;start.copy(hook);fight=null;
      record('catch',catchInfo.name);
      report(catchInfo.name+' · '+(weight<1?Math.round(weight*1000)+' g':weight.toFixed(1)+' kg')+'. '+catchInfo.description);
    }else if(fight.outcome){
      const snapped=fight.outcome==='snapped';reset();
      escapeTime=.8;lineBroke=snapped;escapeStart.copy(fish.position);
      escapeEnd.copy(escapeStart);escapeEnd.x+=castAxis.x*2;escapeEnd.z+=castAxis.y*2;
      if(lakeDepth(escapeEnd.x,escapeEnd.z)<.16)escapeEnd.copy(escapeStart);
      escapeEnd.y=-Math.min(lakeDepth(escapeEnd.x,escapeEnd.z)*.8,Math.abs(escapeStart.y)+.85);
      brokenEnd.lerpVectors(tip,hook,.42);splash(hook.x,hook.z,snapped?.85:.43);
      report(snapped?'The line snapped. Ease off during a hard run.':'The fish shook the hook on slack line. Reel sooner next time.');
    }
  }
  function action(tool){
    camera.getWorldDirection(direction);
    if(tool==='stone'){
      if(stone)return;
      const test=throwStone(camera.position,direction);
      if(lakeDepth(test.x+test.vx*.6,test.z+test.vz*.6)<.02){report('Face the water to throw a stone.');return;}
      stone=test;report('');return;
    }
    if(tool!=='rod')return;
    if(stage==='idle'){
      const distance=T.MathUtils.clamp(14+direction.y*11,4,21),flat=Math.hypot(direction.x,direction.z)||1;
      target.set(camera.position.x+direction.x/flat*distance,.08,camera.position.z+direction.z/flat*distance);
      if(lakeDepth(target.x,target.z)<.16){report('Aim farther out over the water.');return;}
      escapeTime=0;lineBroke=false;rodPose();start.copy(tip);bob.position.copy(start);stage='casting';elapsed=0;report('Casting…');
    }else if(stage==='bite'){
      catchInfo=chooseCatch(target.x,target.z,rng);
      weight=catchInfo.minWeight+(catchInfo.maxWeight-catchInfo.minWeight)*rng()**2.4;
      const size=T.MathUtils.clamp(Math.cbrt(weight)*.80,.23,1.7);
      const long=['European Eel','Northern Pike','Stone Loach','Burbot'].includes(catchInfo.name);
      const deep=catchInfo.name.includes('Carp')||catchInfo.name.includes('Bream');
      body.material.color.set(catchInfo.color);fish.scale.set(size*(long?.66:1),size*(long?1.45:1),size*(deep?1.45:long?.59:1));
      beginFight();
    }else if(stage==='landed'){
      reset();report('Released back into the lake.');
    }else if(stage==='waiting'){
      reset();report('Line retrieved.');
    }
  }
  function tick(dt,t,tool,reel=0,drag=1){
    const rodOut=tool==='rod';rod.visible=rodOut;
    if(rodOut)rodPose();
    if(fight){
      fight.drag=T.MathUtils.clamp(drag,0,1);
      crank.rotation.x-=dt*reel*9;
      spool.rotation.x+=dt*fight.payout*14;
    }
    if(stage!=='idle'){
      elapsed+=dt;
      if(stage==='casting'){
        const u=Math.min(1,elapsed/.76);bob.position.lerpVectors(start,target,u);bob.position.y+=Math.sin(Math.PI*u)*1.65;
        if(u===1){splash(target.x,target.z,.52);stage='waiting';delay=2.4+rng()*3.7;elapsed=0;report('Float set in '+lakeHabitat(target.x,target.z)+'.');}
      }else if(stage==='waiting'||stage==='bite'){
        bob.position.y=.071+Math.sin(t*(stage==='bite'?17:3))*(stage==='bite'?.12:.025);
        if(camera.position.distanceTo(target)>23){reset();report('The line pulled free.');}
        else if(stage==='waiting'&&elapsed>delay){stage='bite';elapsed=0;report('A bite! Set the hook.');}
        else if(stage==='bite'&&elapsed>3.8){stage='waiting';elapsed=0;delay=3+rng()*3;report('It let go. The float is still out.');}
      }else if(stage==='fighting'){
        playFish(dt,reel);
      }else{
        const u=Math.min(1,elapsed/.48);
        local.copy(tip);local.y-=.44;
        bob.position.lerpVectors(start,local,u);bob.position.y+=Math.sin(Math.PI*u)*.20;
        fish.position.copy(bob.position);fish.position.y-=.21*fish.scale.y;fish.rotation.set(0,t*2,.16*Math.sin(t*8));
      }
    }
    if(escapeTime>0){
      escapeTime=Math.max(0,escapeTime-dt);
      fish.position.lerpVectors(escapeStart,escapeEnd,1-(escapeTime/.8)**2);
      fish.rotation.set(Math.PI*.59,Math.atan2(castAxis.x,castAxis.y),0,'YXZ');
      bob.position.lerpVectors(tip,brokenEnd,(escapeTime/.8)**3);
    }
    bob.visible=stage!=='idle';line.visible=bob.visible||(lineBroke&&escapeTime>.12);
    fish.visible=stage==='landed'||stage==='fighting'||escapeTime>0;
    if(fish.visible){
      const effort=fight?.running?1:stage==='fighting'?.56:escapeTime>0?.90:.34;
      const beat=Math.sin(t*(fight?.running?17:10.5));
      tail.rotation.z=Math.PI+beat*.58*effort;
      tail.position.x=beat*.048*effort;
      body.rotation.z=beat*.09*effort;
    }
    if(line.visible){
      const end=fight?hook:bob.position;
      const sag=fight ? .92*(1-Math.min(1,fight.tension))**3 : Math.min(.24,.015*tip.distanceTo(end));
      for(let i=0;i<=16;i++){
        const q=i/16;local.lerpVectors(tip,end,q);local.y-=Math.sin(q*Math.PI)*sag;
        lineG.attributes.position.setXYZ(i,local.x,local.y,local.z);
      }
      lineG.attributes.position.needsUpdate=true;
    }
    rock.visible=!!stone;
    if(stone){
      stepStone(stone,dt,(x,z,bounce)=>splash(x,z,bounce?.72:.38));
      rock.position.set(stone.x,stone.y,stone.z);rock.rotation.y=t*14;
      if(stone.done){report(stone.skips===0?'The stone sank. Aim closer to the horizon.':stone.skips+' skip'+(stone.skips===1?'':'s')+'.');stone=null;}
    }
    for(const ring of rings){if(!ring.mesh.visible)continue;ring.age+=dt;ring.mesh.visible=ring.age<1.5;ring.mesh.scale.setScalar((.12+ring.age*.93)*ring.size);ring.mesh.material.opacity=.61*(1-Math.min(1,ring.age/1.5));}
  }
  return {action,tick,reset,splash,get stage(){return stage;},get fight(){return fight;}};
}
