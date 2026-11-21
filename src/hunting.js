import * as T from 'three';
import {forestAnimal,forestRifle} from './forest-models.js';
import {forestSites,forestSpecies,inHuntingWoods,closestForestSite} from './forest-species.js';
import {BIRD_GAIT,BOUND_GAIT,HEAVY_GAIT,WALK_GAIT,createGaitState,trackYaw,updateGait} from './animal-gait.js';
import {geometryFootprintRadius,moveWithClearance,nearestOpenPoint} from './animal-collision.js';

const el=id=>document.getElementById(id);
const show=(node,value)=>{if(node.textContent!==value)node.textContent=value;};
const clamp=T.MathUtils.clamp;
const turnOptions=Object.freeze([0,.75,-.75,1.5,-1.5]);
export function buildHunting(scene,camera,ground,clear,trees,resize,plantTrack){
  const root=new T.Group(),rifle=forestRifle();scene.add(root,rifle);rifle.visible=false;
  const animals=forestSpecies.map((spec,i)=>{
    const site=forestSites[spec.site],rig=forestAnimal(spec),home=new T.Vector2(site.x+spec.dx,site.z+spec.dz);
    const bird=Boolean(rig.wings),rabbit=spec.form==='hare'||spec.form==='rabbit';
    const heavy=['stag','roe','fallow','ram','boar','badger'].includes(spec.form);
    const gaitProfile=bird?BIRD_GAIT:rabbit?BOUND_GAIT:heavy?HEAVY_GAIT:WALK_GAIT;
    const hoof=['stag','roe','fallow','ram','boar'].includes(spec.form),kind=bird?'bird':hoof?'hoof':'paw';
    const width=kind==='bird'?clamp(spec.length*.07,.025,.055):kind==='hoof'?clamp(spec.length*.055,.035,.095):clamp(spec.length*.075,.025,.085);
    const length=kind==='bird'?clamp(spec.length*.11,.04,.085):kind==='hoof'?clamp(spec.length*.085,.055,.14):clamp(spec.length*.105,.035,.12);
    const collisionRadius=geometryFootprintRadius(rig.root);
    const standingHeight=new T.Box3().setFromObject(rig.root).max.y;
    const habitatClear=(x,z)=>inHuntingWoods(x,z)&&clear(x,z,standingHeight);
    const open=nearestOpenPoint(habitatClear,home.x,home.y,collisionRadius,{minX:42,maxX:126,minZ:-47,maxZ:42},8);
    if(open)home.set(open.x,open.z);
    const a={spec,rig,home,state:'live',angle:i*2.4,alarm:0,phase:i*1.83,returnIn:0,fall:0,bird,rabbit,
      gaitProfile,gait:createGaitState(rig.legs.length,i*.91),moveX:0,moveZ:1,contact:new T.Vector3(),kind,width,length,
      collisionRadius,habitatClear};
    if(plantTrack){
      a.touchdowns=new Uint8Array(rig.legs.length);a.touchdown=index=>{a.touchdowns[index]=1;};
    }
    rig.root.position.set(home.x,ground(home.x,home.y),home.y);rig.root.rotation.order='YXZ';rig.root.rotation.y=a.angle;
    rig.root.userData.animal=a;root.add(rig.root);return a;
  });
  const ray=new T.Raycaster(),hits=[],cover=[],dir=new T.Vector3(),offset=new T.Vector3(),last=new T.Vector2();
  const notes=new Map(),saveKey='briarwick-forest-journal-v1';
  try{
    const saved=JSON.parse(localStorage.getItem(saveKey));
    for(const {name} of forestSpecies){
      if(saved&&Number.isSafeInteger(saved[name])&&saved[name]>=0)notes.set(name,saved[name]);
    }
  }catch{}
  const panel=el('huntPanel'),scopeMask=el('forestLens'),message=el('huntMessage'),aim=el('huntAim'),fire=el('huntFire');
  let active=false,equipped=false,scoped=false,clock=0,cooldown=0,nextScan=0,lastSeen=null,focusTime=0,feedbackUntil=0;
  function writeJournal(){
    const entries=forestSites.map((site,i)=>{
      const p=document.createElement('p');const label=document.createElement('strong');label.textContent=site.name+' · ';p.append(label);
      p.append(forestSpecies.filter(a=>a.site===i).map(({name})=>name+(notes.has(name)?(notes.get(name)>0?' ✓ ('+notes.get(name)+')':' ✓'):'')).join(', '));return p;
    });
    el('huntRecords').replaceChildren(...entries);
    show(el('huntCount'),notes.size+'/20 species observed');
  }
  function record(name,harvest=false){
    if(!harvest&&notes.has(name))return;
    notes.set(name,(notes.get(name)||0)+Number(harvest));
    try{localStorage.setItem(saveKey,JSON.stringify(Object.fromEntries(notes)));}catch{}
    writeJournal();
  }
  function inform(text,duration=3.5){feedbackUntil=clock+duration;show(message,text);}
  function scope(on){
    scoped=on;scopeMask.hidden=!on;scopeMask.classList.toggle('field-glasses',!equipped);
    show(aim,on?(equipped?'Lower scope':'Lower binoculars'):(equipped?'Use scope':'Raise binoculars'));
    lastSeen=null;focusTime=0;nextScan=0;resize();
  }
  function select(rifleSelected){
    equipped=rifleSelected;scope(false);fire.hidden=!equipped;inform('',0);
    el('huntRifle').setAttribute('aria-pressed',String(equipped));el('huntGlass').setAttribute('aria-pressed',String(!equipped));
    document.body.classList.toggle('hunting-aim',active&&equipped);
  }
  function leave(){
    active=false;if(scoped)scope(false);
    rifle.visible=false;panel.hidden=true;document.body.classList.remove('hunting-aim');
    nextScan=focusTime=0;lastSeen=null;feedbackUntil=0;show(message,'');
  }
  function obstructed(eye,direction,distance){
    for(let d=.5;d<distance;d+=.5){
      if(eye.y+direction.y*d<ground(eye.x+direction.x*d,eye.z+direction.z*d))return true;
    }
    ray.set(eye,direction);ray.near=.15;ray.far=distance-.03;
    cover.length=0;ray.intersectObject(trees,true,cover);
    return cover.length>0;
  }
  function arrival(siteIndex){
    const site=forestSites[siteIndex],preferred={x:site.x,z:site.z+6,yaw:0,pitch:-.10};
    const animal=animals.find(a=>a.spec.site===siteIndex&&a.state==='live');
    if(!animal)return preferred;
    const point=new T.Vector3(),eye=new T.Vector3();
    animal.rig.root.updateWorldMatrix(true,true);trees.updateWorldMatrix(true,true);
    new T.Box3().setFromObject(animal.rig.root.children[0]).getCenter(point);
    for(let i=0;i<=12;i++){
      const x=i?point.x+Math.sin(i*2.4)*8:preferred.x,z=i?point.z+Math.cos(i*2.4)*8:preferred.z;
      if(!inHuntingWoods(x,z)||!clear(x,z))continue;
      eye.set(x,ground(x,z)+1.57,z);dir.subVectors(point,eye);
      const length=dir.length();dir.divideScalar(length);
      if(obstructed(eye,dir,length))continue;
      return {x,z,yaw:Math.atan2(-dir.x,-dir.z),pitch:Math.asin(dir.y)};
    }
    return preferred;
  }
  function target(){
    camera.updateMatrixWorld();root.updateMatrixWorld(true);
    ray.set(camera.position,camera.getWorldDirection(dir));ray.near=.15;ray.far=70;
    hits.length=0;
    for(const a of animals)if(a.state==='live')ray.intersectObject(a.rig.root,true,hits);
    if(!hits.length)return null;
    const first=hits[0];
    if(obstructed(camera.position,dir,first.distance))return null;
    let hit=first.object;while(hit&&!hit.userData.animal)hit=hit.parent;
    return hit?.userData.animal??null;
  }
  function shoot(){
    if(!active||!equipped||cooldown>0)return;
    const hit=target();cooldown=.78;
    for(const a of animals){
      const p=a.rig.root.position;
      if(a.state==='live'&&Math.hypot(camera.position.x-p.x,camera.position.z-p.z)<28)a.alarm=4.8;
    }
    if(hit){
      hit.state='down';hit.fall=0;record(hit.spec.name);inform(hit.spec.name+' down. Walk over to collect.',6);
    }else inform('Miss. Nearby wildlife scattered.');
  }
  function nearbyHarvest(x,z){
    let nearest=null,best=2.5;
    for(const a of animals)if(a.state==='down'){
      const d=Math.hypot(x-a.rig.root.position.x,z-a.rig.root.position.z);if(d<best){best=d;nearest=a;}
    }
    return nearest;
  }
  function harvest(a){
    if(!active||a?.state!=='down'||a!==nearbyHarvest(camera.position.x,camera.position.z))return;
    a.state='away';a.returnIn=48;a.rig.root.visible=false;
    record(a.spec.name,true);inform(a.spec.name+' collected.');
  }
  function updateAnimal(a,dt,speed){
    const {rig,spec,home}=a,p=rig.root.position;
    if(a.state==='away'){
      a.returnIn-=dt;
      if(a.returnIn>0||Math.hypot(camera.position.x-home.x,camera.position.z-home.y)<9)return;
      p.set(home.x,ground(home.x,home.y),home.y);rig.root.rotation.x=rig.root.rotation.z=0;rig.root.visible=true;a.state='live';a.alarm=0;
    }
    if(a.state==='down'){
      a.fall=Math.min(1,a.fall+dt*3.8);rig.root.rotation.z=a.fall*1.27;
      p.y=ground(p.x,p.z)+a.fall*spec.length*.14;return;
    }
    const dx=p.x-camera.position.x,dz=p.z-camera.position.z,near=Math.hypot(dx,dz);
    if(active&&speed>.5&&near<3.9+Math.min(3,spec.length*1.7))a.alarm=2.8;
    a.alarm=Math.max(0,a.alarm-dt);
    const flee=a.alarm>0,walking=flee||Math.sin(clock*.32+a.phase)>.34;
    const distHome=Math.hypot(home.x-p.x,home.y-p.z);
    let heading=Math.atan2(home.x-p.x+Math.sin(clock*.21+a.phase)*3.2,home.y-p.z+Math.cos(clock*.17+a.phase)*2.1);
    if(flee&&distHome<12)heading=Math.atan2(dx,dz);
    const oldX=p.x,oldZ=p.z;
    if(walking){
      a.angle+=Math.atan2(Math.sin(heading-a.angle),Math.cos(heading-a.angle))*Math.min(1,dt*(flee?5:2));
      const step=dt*(flee?2.1+spec.length:.21+spec.length*.14);
      let moved=false;
      for(const turn of turnOptions){
        const angle=a.angle+turn,next=moveWithClearance(a.habitatClear,p.x,p.z,step*Math.sin(angle),step*Math.cos(angle),a.collisionRadius);
        if(next.x===p.x&&next.z===p.z||Math.abs(ground(next.x,next.z)-ground(p.x,p.z))>.45)continue;
        p.x=next.x;p.z=next.z;a.angle=angle;moved=true;break;
      }
      if(!moved)a.angle+=dt;
    }
    const moved=Math.hypot(p.x-oldX,p.z-oldZ);
    if(moved>.00001){a.moveX=(p.x-oldX)/moved;a.moveZ=(p.z-oldZ)/moved;}
    const air=rig.wings?Math.min(1,a.alarm,4.8-a.alarm)*1.55:0;
    const gaiting=updateGait(a.gait,moved,dt,a.gaitProfile,air>.025,a.touchdown,clamp(spec.length,.32,1.8));
    const hop=a.rabbit?a.gait.bodyLift:0,airborne=a.gait.airborne;
    const bob=gaiting&&!airborne?.018*Math.cos(a.gait.phase*2)*Math.min(1,spec.length):0;
    p.y=ground(p.x,p.z)+hop+Math.max(0,air)+bob;rig.root.rotation.y=a.angle;
    rig.root.rotation.x=gaiting&&!airborne?.022*Math.sin(a.gait.phase):0;
    rig.root.rotation.z=gaiting&&!airborne?.028*Math.sin(a.gait.phase+Math.PI/2):.008*Math.sin(clock*.7+a.phase);
    if(!a.bird&&!airborne){
      const dx=Math.sin(a.angle)*spec.length*.31,dz=Math.cos(a.angle)*spec.length*.31;
      const pitch=Math.atan2(ground(p.x+dx,p.z+dz)-ground(p.x-dx,p.z-dz),spec.length*.62);
      const roll=Math.atan2(ground(p.x+dz,p.z-dx)-ground(p.x-dz,p.z+dx),spec.length*.62);
      rig.root.rotation.x-=clamp(pitch,-.42,.42);rig.root.rotation.z+=clamp(roll,-.39,.39);
    }
    rig.head.rotation.x=walking?-.08+.055*Math.sin(a.gait.phase):.20+.27*Math.sin(clock*1.29+a.phase);
    rig.head.rotation.y=.19*Math.cos(clock*.78+a.phase);
    for(let i=0;i<rig.legs.length;i++){
      const leg=rig.legs[i];
      if(a.bird&&airborne){leg.upper.rotation.x=-.78;leg.lower.rotation.x=1.05;leg.foot.rotation.x=-.25;continue;}
      leg.upper.rotation.x=a.gait.swing[i];leg.lower.rotation.x=-a.gait.swing[i]*.22+a.gait.flex[i];
      leg.foot.rotation.x=-leg.upper.rotation.x-leg.lower.rotation.x*.72;
      if(!airborne&&!a.bird){
        leg.upper.position.y=leg.restY;
        leg.foot.localToWorld(a.contact.copy(leg.contactOffset));
        const sole=ground(a.contact.x,a.contact.z)+(.022+a.gait.lift[i])*spec.length;
        leg.upper.position.y+=clamp((sole-a.contact.y)/spec.length,-.10,.10);
      }
    }
    if(a.touchdowns)for(let i=0;i<a.touchdowns.length;i++)if(a.touchdowns[i]){
      a.touchdowns[i]=0;
      const leg=rig.legs[i];leg.foot.updateWorldMatrix(true,false);
      a.contact.copy(leg.contactOffset).applyMatrix4(leg.foot.matrixWorld);
      plantTrack({x:a.contact.x,z:a.contact.z,y:ground(a.contact.x,a.contact.z),yaw:trackYaw(a.moveX,a.moveZ),
        kind:a.kind,width:a.width,length:a.length,side:leg.side});
    }
    if(rig.tail)rig.tail.rotation.y=.15*Math.sin(clock*(flee?7:2)+a.phase);
    if(rig.wings)for(let i=0;i<rig.wings.length;i++)rig.wings[i].rotation.z=(i?1:-1)*(airborne?(.48+Math.max(0,air)*Math.sin(clock*14)):.07*Math.sin(clock*2.2+a.phase));
  }
  const focusCanvas=()=>document.querySelector('#view canvas').focus({preventScroll:true});
  el('huntRifle').onclick=()=>{select(true);focusCanvas();};el('huntGlass').onclick=()=>{select(false);focusCanvas();};
  aim.onclick=()=>{scope(!scoped);focusCanvas();};fire.onclick=()=>{shoot();focusCanvas();};
  writeJournal();
  function tick(dt,walking,paused){
    const {x,z}=camera.position,was=active;
    root.visible=x>26&&x<160&&z>-71&&z<59;
    active=walking&&inHuntingWoods(x,z);
    if(was&&!active)leave();
    if(active&&!was){panel.hidden=false;select(false);}
    const delta=paused?0:dt;clock+=delta;cooldown=Math.max(0,cooldown-delta);
    const speed=was&&active&&dt>0?Math.min(6,Math.hypot(x-last.x,z-last.y)/dt):0;
    last.set(x,z);
    if(root.visible&&!paused)for(const a of animals)updateAnimal(a,delta,speed);
    rifle.visible=active&&equipped&&!scoped;
    if(!active)return;
    if(rifle.visible){
      const kick=Math.max(0,1-(.78-cooldown)*6);
      rifle.position.copy(camera.position).add(offset.set(.195,-.185,-.45+kick*.075).applyQuaternion(camera.quaternion));
      rifle.quaternion.copy(camera.quaternion);rifle.rotateX(.05+kick*.12);rifle.rotateY(.13);
    }
    if(scoped&&!paused&&(nextScan-=dt)<=0){
      const hit=target();if(hit===lastSeen&&hit){focusTime+=.15;if(focusTime>=.45)record(hit.spec.name);}
      else {lastSeen=hit;focusTime=0;}nextScan=.15;
    }
    if(clock>=feedbackUntil)show(message,scoped&&lastSeen?lastSeen.spec.name:'');
    fire.disabled=cooldown>0;
    show(el('huntArea'),closestForestSite(x,z).name);
  }
  return {tick,leave,arrival,nearbyHarvest,harvest,get active(){return active;},get scoped(){return scoped;},
    key(code){if(!active)return false;
      if(code==='Digit1')select(false);else if(code==='Digit2')select(true);
      else if(code==='KeyB')scope(!scoped);else if(code==='KeyF'){if(equipped)shoot();else scope(!scoped);}
      else if(code==='Escape'&&scoped)scope(false);else return false;return true;
    },
    controller(input){if(!active)return false;
      if(input.next||input.previous)select(!equipped);else if(input.scopeToggle||input.back&&scoped)scope(!scoped);
      else if(input.interact){if(equipped)shoot();else scope(!scoped);}else return false;return true;
    }};
}
