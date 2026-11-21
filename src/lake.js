import * as T from 'three';
import {atLake,dock,lakeWind} from './lake-layout.js';
import {buildLakeScenery} from './lake-scenery.js';
import {createLakeBoat} from './lake-boat.js';
import {buildBoatModel} from './lake-boat-model.js';
import {buildLakeWildlife} from './lake-wildlife.js';
import {buildLakeTackle} from './lake-tackle.js';

const gears=['rod','glass','stone'],drives=['sail','motor','oars'];
const el=id=>document.getElementById(id);
const showText=(node,text)=>{if(node.textContent!==text)node.textContent=text;};
function bearing(x,z){
  const sector=Math.round(Math.atan2(x,-z)/(Math.PI/4));
  return ['N','NE','E','SE','S','SW','W','NW'][(sector+8)%8];
}
export function buildLake(scene,camera,material,updateFov,pulse){
  const root=new T.Group();scene.add(root);
  const scenery=buildLakeScenery(root,material);
  const cover=root.children.filter(item=>item.isMesh&&!item.material.transparent);
  const vesselRoot=new T.Group();root.add(vesselRoot);
  const wildlife=buildLakeWildlife(root);
  const vessel=createLakeBoat(),{boat}=vessel,drawBoat=buildBoatModel(vesselRoot);
  const ray=new T.Raycaster(),look=new T.Vector3(),hits=[];
  function unobstructed(eye,target){
    look.subVectors(target,eye);ray.far=Math.max(0,look.length()-.25);ray.set(eye,look.normalize());hits.length=0;
    ray.intersectObjects(cover,false,hits);
    if(hits.length)return false;
    vesselRoot.traverseVisible(node=>{if(node.isMesh&&!hits.length)ray.intersectObject(node,false,hits);});
    return hits.length===0;
  }
  const panel=el('lakePanel'),message=el('lakeMessage'),use=el('lakeUse'),hint=el('lakeHint');
  const records={catch:new Set(),sighting:new Set()},journalKey='briarwick-alder-lake-notes-v1';
  try{
    const saved=JSON.parse(localStorage.getItem(journalKey));
    for(const kind of Object.keys(records))if(Array.isArray(saved?.[kind]))for(const name of saved[kind])if(typeof name==='string')records[kind].add(name);
  }catch{}
  function displayNotes(){
    const rows=Object.entries(records).map(([kind,list])=>{
      const p=document.createElement('p');
      p.textContent=(kind==='catch'?'Caught ('+list.size+'/30)':'Sightings ('+list.size+')')+' · '+([...list].sort().join(', ')||'None yet');
      return p;
    });
    el('lakeRecords').replaceChildren(...rows);
  }
  function record(kind,name){
    if(records[kind].has(name))return;
    records[kind].add(name);displayNotes();
    try{localStorage.setItem(journalKey,JSON.stringify({catch:[...records.catch],sighting:[...records.sighting]}));}catch{}
  }
  displayNotes();
  let active=false,tool='rod',scoped=false,heldName='',heldTime=0,scanIn=0,target=null;
  const report=text=>showText(message,text);
  const tackle=buildLakeTackle(root,camera,wildlife,report,record);
  const fightPanel=el('lakeFight'),reelButton=el('lakeReel'),meter=el('lineTension');
  const reelInputs=new Set();
  let reelDrag=90;
  function adjustDrag(delta){
    reelDrag=T.MathUtils.clamp(reelDrag+delta,10,100);
    showText(el('dragSetting'),'Drag '+reelDrag+'%');
    el('dragLess').disabled=reelDrag===10;el('dragMore').disabled=reelDrag===100;
  }
  let padFight=false,nextPulse=0;
  function setReel(source,held){
    if(held&&tackle.fight){reelInputs.add(source);padFight=source==='pad';}
    else reelInputs.delete(source);
  }
  function clearReel(){reelInputs.clear();padFight=false;nextPulse=0;}
  const toolBtns=Array.from(panel.querySelectorAll('[data-lake-tool]')),driveBtns=Array.from(panel.querySelectorAll('[data-lake-drive]'));
  function scope(value){
    scoped=value;el('lakeOptics').hidden=!value;document.body.classList.toggle('lake-glass',value);
    updateFov(value);heldName='';heldTime=0;target=null;scanIn=0;
  }
  function select(value){
    if(tool!==value){tackle.reset();clearReel();report('');if(scoped)scope(false);}
    tool=value;toolBtns.forEach(b=>b.setAttribute('aria-pressed',b.dataset.lakeTool===tool));
  }
  function propulsion(value){boat.mode=value;driveBtns.forEach(b=>b.setAttribute('aria-pressed',b.dataset.lakeDrive===value));}
  function action(){
    if(!active)return;
    if(tool==='glass'){scope(!scoped);report('');}else tackle.action(tool);
  }
  const canvas=document.querySelector('#view canvas');
  function buttonAction(fn){return ()=>{fn();canvas.focus({preventScroll:true});};}
  for(const b of toolBtns)b.onclick=buttonAction(()=>select(b.dataset.lakeTool));
  for(const b of driveBtns)b.onclick=buttonAction(()=>propulsion(b.dataset.lakeDrive));
  use.onclick=buttonAction(action);el('lakeAnchor').onclick=buttonAction(()=>vessel.toggleAnchor());
  el('dragLess').onclick=buttonAction(()=>adjustDrag(-10));el('dragMore').onclick=buttonAction(()=>adjustDrag(10));
  reelButton.onpointerdown=e=>{
    if(e.button!==0||!e.isPrimary)return;
    reelButton.setPointerCapture(e.pointerId);setReel('pointer',true);
  };
  for(const event of ['pointerup','pointercancel','lostpointercapture']){
    reelButton.addEventListener(event,()=>setReel('pointer',false));
  }
  for(const event of ['keydown','keyup']){
    reelButton.addEventListener(event,e=>{
      if(e.code!=='Space'&&e.code!=='Enter')return;
      e.preventDefault();e.stopPropagation();setReel('button',event==='keydown');
    });
  }
  reelButton.onblur=()=>setReel('button',false);
  // Assistive technologies can activate a button without sending press/release events.
  reelButton.onclick=e=>{if(e.detail===0)setReel('toggle',!reelInputs.has('toggle'));};
  propulsion(boat.mode);drawBoat(boat,0);
  function leave(){
    if(scoped)scope(false);
    if(boat.aboard)vessel.moor();
    tackle.reset();clearReel();active=false;panel.hidden=true;report('');
  }
  function interact(x,z){
    if(boat.aboard)return vessel.canDock()?'Dock and step ashore':'';
    return boat.moored&&Math.abs(x-dock.x)<1.3&&Math.abs(z-dock.berthZ)<3.4?'Board sailboat':'';
  }
  function toggleBoard(){
    tackle.reset();clearReel();if(scoped)scope(false);report('');
    if(boat.aboard){vessel.moor();return false;}
    vessel.board();return true;
  }
  function boardAt(x,z,yaw){
    tackle.reset();clearReel();if(scoped)scope(false);report('');
    return vessel.boardAt(x,z,yaw);
  }
  let lastX=NaN,lastZ=NaN,wakeIn=0;
  function tick(dt,t,gust,walking,paused=false){
    const {x,z}=camera.position;
    root.visible=z>14&&Math.abs(x-26)<135;
    const nearby=atLake(x,z);
    const shown=walking&&(nearby||boat.aboard);
    if(!shown&&active)leave();
    active=shown;panel.hidden=!shown;
    if(!root.visible)return;
    // Keep the moored boat responding to wind even while the player stands ashore.
    if(!boat.aboard)vessel.step(dt,0,0,lakeWind(t,gust));
    drawBoat(boat,t);
    const walkingNoise=active&&dt>0&&Number.isFinite(lastX)?Math.min(.82,Math.hypot(x-lastX,z-lastZ)/dt*.19):0;
    lastX=x;lastZ=z;
    const motion=boat.aboard?Math.min(1,Math.abs(boat.speed)*(boat.mode==='motor'?.30:.12)):walkingNoise;
    wildlife.update(t,dt,{x,z,disturbance:motion});
    if(boat.aboard&&Math.abs(boat.speed)>.65&&(wakeIn-=dt)<=0){
      const aft=boat.speed>0?2.0:-2.2;
      tackle.splash(boat.x+Math.sin(boat.yaw)*aft,boat.z+Math.cos(boat.yaw)*aft,.36+motion*.60);
      wakeIn=.42;
    }
    if(paused)clearReel();
    tackle.tick(paused?0:dt,t,active?tool:null,Number(reelInputs.size>0),reelDrag/100);
    if(!active)return;
    el('lakeBoatControls').hidden=!boat.aboard;
    const stage=tackle.stage;
    const fight=tackle.fight;
    el('reelDrag').hidden=tool!=='rod';
    use.hidden=!!fight;fightPanel.hidden=!fight;
    if(fight){
      const load=Math.round(100*T.MathUtils.clamp(fight.tension,0,1));
      const zone=load<28?'Slack · take up line':load>=76?'Straining · ease off':'Working tension';
      const pulling=reelInputs.size>0;
      meter.style.setProperty('--load',load+'%');
      meter.setAttribute('aria-valuenow',String(load));meter.setAttribute('aria-valuetext',zone);
      showText(el('lakeTensionState'),zone);
      const pull=fight.payout>.1?'Paying out '+fight.payout.toFixed(1)+' m/s':fight.running?'Running':fight.stamina<.25?'Tiring':'Holding';
      showText(el('lakePull'),pull+' · '+fight.distance.toFixed(1)+' m');
      reelButton.setAttribute('aria-pressed',String(pulling));
      showText(reelButton,pulling?'Reeling · release to ease':'Hold to reel');
      if(padFight&&!paused&&fight.time>=nextPulse){
        const strain=T.MathUtils.clamp(fight.tension,0,1);
        pulse?.(.52*fight.pull*strain,.045+.37*strain*Math.abs(fight.headShake),fight.running?125:65);
        nextPulse=fight.time+(fight.running?.23:.58);
      }
    }else clearReel();
    use.disabled=tool==='rod'&&stage==='casting';
    showText(use,tool==='stone'?'Skip stone':tool==='glass'?(scoped?'Lower binoculars':'Raise binoculars'):
      ({waiting:'Retrieve line',bite:'Set hook!',landed:'Release catch',casting:'Casting…'}[stage]||'Cast line'));
    showText(hint,fight?'Hold F, X / □, or the reel button to wind in. Release to give line.':
      tool==='rod'?'Cast over water. Set the hook when the float dips.':tool==='stone'?'Face the water and throw low for more skips.':'Hold a bird or animal in the centre of the lenses.');
    if(scoped){
      if((scanIn-=dt)<=0){camera.updateMatrixWorld();target=wildlife.sight(camera,unobstructed);scanIn=.10;}
      if(target){
        if(heldName!==target.name){heldName=target.name;heldTime=0;}
        heldTime+=dt;if(heldTime>.65){record('sighting',target.name);report(target.name+' · '+Math.round(target.distance)+' m. '+target.description);}
        else report('Focusing…');
      }else{heldName='';heldTime=0;report('');}
    }
    if(boat.aboard){
      const wind=lakeWind(t,gust);
      const state=boat.anchored?'At anchor':Math.abs(boat.speed).toFixed(1)+' m/s';
      const steer=boat.mode==='sail'?'Trim '+Math.round(boat.sheet*180/Math.PI)+'° · '+(boat.fill<.12?'Luffing':'Drawing'):'W/S forward or astern';
      showText(el('lakeWind'),state+' · Heading '+bearing(-Math.sin(boat.yaw),-Math.cos(boat.yaw))+' · Wind from '+bearing(-wind.x,-wind.z)+' '+wind.speed.toFixed(1)+' m/s · '+steer);
      showText(el('lakeAnchor'),boat.anchored?'Weigh anchor':'Drop anchor');
    }
  }
  return {shores:scenery.shores,boat,tick,interact,toggleBoard,boardAt,leave,clearReel,setReel,clear:scenery.clear,
    get scoped(){return scoped;},get active(){return active;},
    drive(dt,forward,steer,t,gust){vessel.step(dt,forward,steer,lakeWind(t,gust));},
    key(code){
      if(!active)return false;
      if(['Digit1','Digit2','Digit3'].includes(code))select(gears[Number(code.slice(-1))-1]);
      else if(tool==='rod'&&(code==='BracketLeft'||code==='BracketRight'))adjustDrag(code==='BracketLeft'?-10:10);
      else if(code==='KeyF'){action();setReel('key',true);}
      else if(code==='KeyB'){select('glass');action();}
      else if(code==='KeyQ'&&boat.aboard)propulsion(drives[(drives.indexOf(boat.mode)+1)%3]);
      else if(code==='Space'&&boat.aboard)vessel.toggleAnchor();
      else if(code==='Escape'&&scoped){scope(false);report('');}
      else return false;
      return true;
    },
    controller(input){
      if(!active)return false;
      if(!input.reelHeld)setReel('pad',false);
      if(tackle.fight&&(input.dragLess||input.driveMode)){adjustDrag(input.dragLess?-10:10);return true;}
      if(input.interact){action();setReel('pad',true);return true;}
      if(input.next||input.previous){select(gears[(gears.indexOf(tool)+(input.next?1:2))%3]);return true;}
      if(boat.aboard&&input.driveMode){propulsion(drives[(drives.indexOf(boat.mode)+1)%3]);return true;}
      if(boat.aboard&&input.anchor){vessel.toggleAnchor();return true;}
      if(scoped&&input.back){scope(false);report('');return true;}
      return false;
    }};
}
