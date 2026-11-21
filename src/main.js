import {buildLake} from './lake.js';
import {sampleTour,tourDuration,tourHandoff,restoreTourCheckpoint} from './tour.js';
import {buildHunting} from './hunting.js';
import {forestSites} from './forest-species.js';
import {buildMine} from './mine.js';
import {buildForgePanel,describeCargo} from './forge-panel.js';
import {minePoint} from './mine-layout.js';
import {atLake,onLakeDock,dock,lake} from './lake-layout.js';
import {waterReflections} from './water.js';
import * as T from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { Builder,glass,v,TAU } from './model.js';
import { terrain,grass,bridge,plots,height,smooth,walkable,walkHeight,doorstep,farmApproach } from './land.js';
import { buildings,moving,lamps,clockHands } from './houses.js';
import { makeRoom,makeWindowViews } from './rooms.js';
import { estate,trailhead,trailYaw,trailDistance } from './estate.js';
import { buildWoodland } from './woodland.js';
import { buildCastle } from './castle.js';
import { buildCatacomb } from './catacomb.js';
import { atmosphere,plantValley } from './valley.js';
import { createMillDrive,millWheel } from './hydraulics.js';
import { buildMillWheel } from './mill.js';
import { buildWeatherEffects,weatherGround } from './weather.js';
import { createWeatherCycle,weatherPresets } from './weather-cycle.js';
import { dressVillage } from './village.js';
import { surfaces } from './surfaces.js';
import { buildFarm } from './farm.js';
import { farm,inFarm,farmSheltered,farmStations } from './farm-layout.js';
import { waterCapacity } from './farm-state.js';
import { buildFallingLeaves } from './foliage.js';
import {soilSampler} from './soil.js';
import {brookStage} from './brook.js';
import {buildRainwater} from './rainwater.js';
import { createFootfallTracker } from './footfall.js';
import { buildFootprints } from './footprints.js';
import { onBridge,nearPath,riverWidth,riverX } from './layout.js';
import { animateFires } from './fire.js';
import { stepSmoke } from './smoke.js';
import { createGamepadControls } from './gamepad.js';

const el=id=>document.getElementById(id);
const icons={sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/>',
  eye:'<path d="M2 12q10-14 20 0-10 14-20 0Z"/><circle cx="12" cy="12" r="3"/>',
  play:'<path d="m7 4 13 8-13 8z"/>',stop:'<rect x="5" y="5" width="14" height="14" rx="1"/>',
  walk:'<circle cx="14" cy="4" r="2"/><path d="m8 21 4-7 4 7m-5-7 2-7 3 4 4 1M6 13l3-4 4-2"/>',
  pin:'<path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z"/><circle cx="12" cy="10" r="2"/>',
  up:'<path d="m5 15 7-7 7 7"/>'};
const svg=k=>'<svg aria-hidden="true" viewBox="0 0 24 24">'+icons[k]+'</svg>';
document.querySelectorAll('[data-icon]').forEach(n=>n.innerHTML=svg(n.dataset.icon));
function start(){
  const scene=new T.Scene(),camera=new T.PerspectiveCamera(46,1,.08,295);
  const renderer=new T.WebGLRenderer({antialias:true,powerPreference:'high-performance'});
  renderer.toneMapping=T.AgXToneMapping;renderer.toneMappingExposure=1.31;
  const reflectionRoom=new RoomEnvironment(),reflectionBuilder=new T.PMREMGenerator(renderer);
  const environment=reflectionBuilder.fromScene(reflectionRoom,.06,.1,100,{size:128});
  reflectionRoom.dispose();reflectionBuilder.dispose();
  scene.environment=environment.texture;scene.environmentIntensity=.23;
  renderer.setPixelRatio(Math.min(devicePixelRatio,1.65));renderer.shadowMap.enabled=true;
  renderer.shadowMap.type=T.PCFSoftShadowMap;renderer.shadowMap.autoUpdate=false;renderer.shadowMap.needsUpdate=true;
  el('view').appendChild(renderer.domElement);const canvas=renderer.domElement;
  canvas.setAttribute('aria-label','Briarwick village view');canvas.tabIndex=0;
  scene.fog=new T.FogExp2('#dce6d7',.0125);
  const hemi=new T.HemisphereLight('#fff4dc','#8c9b73',1.55);scene.add(hemi);
  const sun=new T.DirectionalLight('#fff0ce',2.05);scene.add(sun);sun.position.set(-24,38,19);
  for(const light of [hemi,sun]){light.layers.enable(1);light.layers.enable(2);light.layers.enable(3);}
  scene.add(sun.target);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);const sc=sun.shadow.camera;
  sc.left=-33;sc.right=33;sc.top=34;sc.bottom=-32;sc.near=.5;sc.far=112;sun.shadow.normalBias=.028;sun.shadow.bias=-.00018;
  const air=atmosphere(scene),b=new Builder(scene),drive=createMillDrive(),weather=createWeatherCycle();
  const leaves=buildFallingLeaves(scene,walkHeight);
  weatherGround(surfaces.roadStone,air.uniforms,.58);
  const reflectWater=waterReflections(renderer,scene,air.waterMaterial);
  weatherGround(surfaces.thatch,air.uniforms,.90);
  weatherGround(surfaces.roofTile,air.uniforms,.80);
  weatherGround(terrain(scene,b),air.uniforms);buildings(scene,b);bridge(b);
  weatherGround(farmApproach(scene,b),air.uniforms);
  const villageTreesClear=plantValley(scene,b,leaves),village=dressVillage(scene,b);
  grass(scene);b.finish();
  const farmSaveKey='briarwick-commons-farm-v1';
  let savedFarm=null;
  try{savedFarm=JSON.parse(localStorage.getItem(farmSaveKey));}catch{}
  const woodlandRoot=new T.Group();scene.add(woodlandRoot);
  const woodland=buildWoodland(woodlandRoot,leaves),castle=buildCastle(scene,air.waterMaterial),catacomb=buildCatacomb(scene),farmScene=buildFarm(scene,leaves,savedFarm,()=>mine.state.forge.tools.bronzeSickle,animalTrack);
  const hunting=buildHunting(scene,camera,height,woodland.clear,woodlandRoot,()=>resize(),animalTrack);
  const mineKey='briarwick-ore-mine-v1';
  let savedMine=null;
  try{savedMine=JSON.parse(localStorage.getItem(mineKey));}catch{}
  const mine=buildMine(scene,savedMine);
  let mineSnapshot=JSON.stringify(mine.snapshot()),cartHeading=0,oreMessage='',oreMessageUntil=0;
  function saveMine(){
    const next=JSON.stringify(mine.snapshot());
    if(next!==mineSnapshot)try{localStorage.setItem(mineKey,next);mineSnapshot=next;}catch{}
  }
  window.addEventListener('pagehide',saveMine);
  const lakeScene=buildLake(scene,camera,air.waterMaterial,()=>resize(),(strong,weak,duration)=>{
    if(el('padRumble').checked)gamepad.pulse(strong,weak,duration);
  });
  const {vehicle,work:farmWork}=farmScene;
  for(const material of [woodland.ground,woodland.trailGround,...lakeScene.shores])weatherGround(material,air.uniforms);
  weatherGround(farmScene.ground.material,air.uniforms);
  for(const material of farmScene.fieldMaterials)weatherGround(material,air.uniforms);
  let farmSavedRevision=farmWork.revision,saveIn=8;
  function saveFarm(){
    if(farmSavedRevision===farmWork.revision)return;
    try{localStorage.setItem(farmSaveKey,JSON.stringify(farmWork.snapshot()));farmSavedRevision=farmWork.revision;}catch{}
  }
  window.addEventListener('pagehide',saveFarm);
  const tickWheel=buildMillWheel(scene,drive);
  const weatherSelect=el('weather'),weatherStatus=el('weatherStatus');
  weatherSelect.onchange=()=>weather.select(weatherSelect.value);
  const homePos=v(12.2,23.8,55),homeTarget=v(-5.9,2.85,-1.5);
  const orbit=new OrbitControls(camera,canvas);orbit.enablePan=false;orbit.enableDamping=true;orbit.dampingFactor=.095;orbit.minDistance=4;orbit.maxDistance=74;orbit.minPolarAngle=.3;orbit.maxPolarAngle=Math.PI*.485;
  camera.position.copy(homePos);orbit.target.copy(homeTarget);orbit.update();

  // A soft radial sprite lets the lanterns fade without hard edges.
  const cv=document.createElement('canvas');cv.width=cv.height=64;const cx=cv.getContext('2d');
  const grad=cx.createRadialGradient(32,32,0,32,32,32);grad.addColorStop(0,'white');grad.addColorStop(.35,'rgba(255,255,255,.65)');grad.addColorStop(1,'rgba(255,255,255,0)');cx.fillStyle=grad;cx.fillRect(0,0,64,64);
  const soft=new T.CanvasTexture(cv);
  const lampGeo=new T.BufferGeometry().setFromPoints(lamps);
  const halo=new T.PointsMaterial({color:'#ffbf70',size:1.35,map:soft,transparent:true,blending:T.AdditiveBlending,depthWrite:false});
  scene.add(new T.Points(lampGeo,halo));
  // Ground pools stay inexpensive even when the entire village is in view.
  const pools=lamps.map(p=>{const m=new T.Mesh(new T.PlaneGeometry(3.3,3.3),new T.MeshBasicMaterial({map:soft,color:'#e6ab64',blending:T.AdditiveBlending,transparent:true,depthWrite:false}));
    m.position.set(p.x,height(p.x,p.z)+.065,p.z);
    const dx=(height(p.x+.1,p.z)-height(p.x-.1,p.z))/.2,dz=(height(p.x,p.z+.1)-height(p.x,p.z-.1))/.2;
    m.quaternion.setFromUnitVectors(v(0,0,1),v(-dx,1,-dz).normalize());scene.add(m);return m;});
  const birdPos=new Float32Array(9*4*3),birdG=new T.BufferGeometry();
  birdG.setAttribute('position',new T.BufferAttribute(birdPos,3));const birds=new T.LineSegments(birdG,new T.LineBasicMaterial({color:'#606954'}));birds.frustumCulled=false;scene.add(birds);
  function ambientMotion(t,dt,weatherState) {
    const {gust}=weatherState;
    for(const m of moving)m.hub.rotation[m.axis]+=dt*m.speed*(.53+gust);
    for(let i=0;i<9;i++){const a=t*.048+i*.21,x=-1+Math.cos(a)*12+i*.8,z=-24+Math.sin(a)*6+i*.78,y=13+Math.sin(a*2.3+i)*.58,flap=Math.sin(t*4.5+i*2)*.13+.07;
      birdPos.set([x-.28,y+flap,z,x,y,z+.05,x,y,z+.05,x+.28,y+flap,z],i*12);}
    birdG.attributes.position.needsUpdate=true;
  }
  const daysky=new T.Color('#d9dfdc'),nightsky=new T.Color('#9aa9c6'),dayground=new T.Color('#7b7864'),nightground=new T.Color('#434853'),sunDay=new T.Color('#e6dfca'),sunDusk=new T.Color('#df9163'),sunNight=new T.Color('#a9b6d0'),fogDay=new T.Color('#b0b4a6'),fogDusk=new T.Color('#a58b74'),fogNight=new T.Color('#444d60');
  const vaultFog=new T.Color('#3b3640');
  const rainFog=new T.Color('#858f93'),lightning=new T.Color('#b3cefa');
  let hour=12,desiredHour=null,shadowHour=-24;
  function light(h){
    hour=((h%24)+24)%24;
    for(const {hand,kind} of clockHands)hand.rotation.z=-TAU*(kind==='hour'?hour/12:hour%1);
    const night=1-smooth(4.6,7.45,hour)* (1-smooth(17.5,20.65,hour));
    const dusk=Math.max(1-smooth(0,2.6,Math.abs(hour-18.35)),1-smooth(0,2.1,Math.abs(hour-6.75)))*.89;
    air.uniforms.night.value=night;air.uniforms.dusk.value=dusk;
    hemi.color.copy(daysky).lerp(nightsky,night);hemi.groundColor.copy(dayground).lerp(nightground,night);hemi.intensity=1.55-night*1.29;
    sun.color.copy(sunDay).lerp(sunDusk,dusk).lerp(sunNight,night);sun.intensity=2.03-night*1.77;
    if(Math.abs(hour-shadowHour)>.18){
      const arc=(hour-6)*Math.PI/12;
      sun.position.set(sun.target.position.x-23+27*Math.cos(arc),sun.target.position.y+15+23*Math.max(0,Math.sin(arc)),sun.target.position.z+19+8*Math.cos(arc));
      renderer.shadowMap.needsUpdate=true;shadowHour=hour;
    }
    scene.fog.color.copy(fogDay).lerp(fogDusk,dusk*.8).lerp(fogNight,night);scene.fog.density=.012+night*.011;
    glass.emissiveIntensity=.019+night*1.7;halo.opacity=night*.65;for(const pool of pools)pool.material.opacity=night*.42;
    birds.visible=night<.6;el('hour').value=hour;
    const mins=Math.floor(hour*60+.001);el('time').textContent=String(Math.floor(mins/60)).padStart(2,'0')+':'+String(mins%60).padStart(2,'0');
    el('phase').textContent=night>.78?'Nightfall':hour<8.2?'Dawn':hour>=17.4?'Dusk':'Daylight';
    document.querySelectorAll('[data-hour]').forEach(n=>n.classList.toggle('chosen',Math.abs(+n.dataset.hour-hour)<.15));
  }
  light(12);
  const tourSaveKey='briarwick-tour-checkpoint-v1';
  let tourCheckpoint=null;
  try{
    tourCheckpoint=restoreTourCheckpoint(JSON.parse(localStorage.getItem(tourSaveKey)));
  }catch{}
  let mode='orbit',flight=null,tourTime=0,tourStop=null,yaw=0,pitch=0,drag=null,lastWalk=null;
  const keys=new Set(),rooms=new Map();
  const castlePlace={id:'castle',name:'Thornmere Castle'};
  const castleWalk=()=>enterWalk(estate.x,estate.z+43,0,.12);
  const captureWindows=makeWindowViews(renderer,scene,air.sky);
  let exteriorY=0,interaction=null,interior=null,floorY=0,doorPlot=null,landmark=null,lastCapture=0,windowHour=NaN,windowCloud=NaN;
  const gamepad=createGamepadControls();let padInput={connected:false};
  const sampleSoil=soilSampler(scene);
  const rainwater=buildRainwater(scene,sampleSoil,air.uniforms,farmScene.work.fields);
  const tickWeatherEffects=buildWeatherEffects(scene,rainwater.surface);
  const footprints=buildFootprints(scene,(x,z,mark)=>{
    const boot=!mark.kind||mark.kind==='boot',floor=boot?exteriorY:height(x,z);
    if(onLakeDock(x,z)||atLake(x,z)&&height(x,z)<lake.level||onBridge(x,z,.11)||farmSheltered(x,z))return null;
    if(!inFarm(x,z)&&z<54&&Math.abs(x-riverX(z))<riverWidth(z)+.18)return null;
    if(boot&&Math.abs(floor-height(x,z))>.45)return null;
    if(castle.nearby(x,z)){
      const place=castle.area(x,z,floor);
      if(place==='Castle courtyard')return {y:estate.y,soft:false};
      if(place!=='Thornmere Castle')return null;
    }
    const ground=sampleSoil(x,z);
    if(!ground)return null;
    if(nearPath(x,z,-.12))return {...ground,y:ground.y+.075,soft:false};
    // The farm lanes have isolated flat stones with soft earth between them.
    if(inFarm(x,z)){
      const row=-110+Math.round((x+110)/1.15)*1.15,col=27+Math.round((z-27)/1.18)*1.18;
      if((x>=-110.35&&x<=-45.65&&Math.abs(row-x)<.35&&Math.abs(z-24-.25*Math.sin(row*.6))<.31)
        ||(z>=26.65&&z<=90.35&&Math.abs(z-col)<.32&&Math.abs(x+86-.2*Math.sin(col))<.34))
        return {...ground,y:ground.y+.06,soft:false};
    }
    ground.reserve=Math.max(ground.reserve,rainwater.dampness(x,z));
    return ground;
  },air.uniforms,renderer);
  function animalTrack(mark){
    if(!interior&&Math.hypot(camera.position.x-mark.x,camera.position.z-mark.z)<40)
      footprints.plant(mark,weather.state);
  }
  const steps=createFootfallTracker(mark=>{
    const medium=footprints.plant(mark,weather.state);
    if(padInput.active&&medium&&el('padRumble').checked)gamepad.pulse(.045,.09,42);
  });
  const farmPanel=el('farmPanel'),farmTitle=el('farmTaskTitle'),farmDetail=el('farmTaskDetail'),farmStock=el('farmStock'),farmMessage=el('farmMessage');
  const tractorControls=el('tractorControls'),hitchButton=el('tractorHitch'),exitTractor=el('exitTractor');
  let farmFeedback='',farmFeedbackUntil=0,chaseYaw=0,chasePitch=0,shadowRefresh=0;
  function informFarm(message){
    if(!message)return;
    farmFeedback=message;farmFeedbackUntil=t+4.8;saveFarm();
    renderer.shadowMap.needsUpdate=true;
  }
  function updateFarmPanel(){
    const shown=mode==='walk'&&!interior&&(vehicle.mounted||inFarm(camera.position.x,camera.position.z));
    farmPanel.hidden=!shown;if(!shown)return;
    const {title,text}=farmScene.description(camera.position.x,camera.position.z);
    const stock=farmWork.stock,summary=`Water ${stock.water}/${waterCapacity} · Feed ${stock.feed} · Harvest ${farmWork.harvestTotal} · Eggs ${stock.eggs} · Milk ${stock.milk}`;
    const message=t<farmFeedbackUntil?farmFeedback:'';
    for(const [element,value] of [[farmTitle,title],[farmDetail,text],[farmStock,summary],[farmMessage,message]])if(element.textContent!==value)element.textContent=value;
    farmMessage.hidden=!message;tractorControls.hidden=!vehicle.mounted;
    const hitch=vehicle.hitchLabel();hitchButton.hidden=!hitch;
    if(hitch&&hitchButton.textContent!==hitch)hitchButton.textContent=hitch;
  }
  function tractorCamera(snap=false,dt=0){
    const {x,z,yaw:heading}=vehicle.pose,rad=heading+chaseYaw;
    const floor=walkHeight(x,z),dist=5.10,tx=x+Math.sin(rad)*dist,tz=z+Math.cos(rad)*dist;
    const point=v(tx,Math.max(floor+3.10+chasePitch*1.8,height(tx,tz)+1.28),tz);
    if(snap)camera.position.copy(point);else camera.position.lerp(point,1-Math.exp(-dt*10.4));
    camera.lookAt(x-Math.sin(heading)*1.22,floor+1.01+chasePitch*.67,z-Math.cos(heading)*1.22);
  }
  function dismountTractor(relocate=false){
    if(!vehicle.mounted)return;
    const spot=vehicle.dismount(relocate);
    if(!spot){informFarm('Move the tractor to a clear spot before dismounting.');return;}
    const {x,z,yaw:heading}=spot;
    exteriorY=walkHeight(x,z);setPose(x,exteriorY+1.57,z,heading,.014);steps.reset(x,z);keys.clear();drag=null;
    refreshHint();checkDoor(false);updateFarmPanel();canvas.focus({preventScroll:true});
  }
  function hitchWagon(){
    if(vehicle.toggleHitch())informFarm(vehicle.hitched?'Hay wagon hitched.':'Hay wagon unhitched.');
    else if(vehicle.mounted)informFarm('Park with the plow raised and line up with the wagon tongue.');
    updateFarmPanel();checkDoor(false);
  }
  hitchButton.onclick=hitchWagon;exitTractor.onclick=()=>dismountTractor();
  const doorButton=el('doorAction'),roomName=el('roomName');
  function cartPose(pose,aboard){
    exteriorY=pose.y;cartHeading=pose.yaw;
    setPose(pose.x,pose.y+1.57,pose.z,pose.yaw,aboard?clampCartPitch(pose.pitch):-.04);
    keys.clear();drag=null;steps.reset(pose.x,pose.z);refreshHint();
  }
  function clampCartPitch(angle){return T.MathUtils.clamp((angle||0)*.65,-.24,.18);}
  function stepOffCart(){
    const pose=mine.dismount();
    if(pose){cartPose(pose,false);saveMine();}
  }
  function handleMine(result){
    if(result.message){oreMessage=result.message;oreMessageUntil=performance.now()+4800;}
    if(result.pose)cartPose(result.pose,mine.cart.mounted);
    if(result.ok){saveMine();renderer.shadowMap.needsUpdate=true;}
  }
  const conversation=el('dragonTalk');
  function showConversation(snapshot){
    el('dragonSpeaker').textContent=snapshot.speaker;
    el('dragonText').textContent=snapshot.text;
    el('dragonFriend').hidden=!snapshot.befriended;
    const choices=el('dragonChoices');choices.replaceChildren();
    for(const choice of snapshot.choices){
      const button=document.createElement('button');button.type='button';button.textContent=choice.label;
      button.onclick=()=>showConversation(castle.dragon.reply(choice.id));choices.append(button);
    }
    if(!conversation.open){keys.clear();drag=null;conversation.showModal();}
    (choices.querySelector('button')??el('closeTalk')).focus();
  }
  el('closeTalk').onclick=()=>conversation.close();
  conversation.addEventListener('close',()=>{castle.dragon.close();canvas.focus({preventScroll:true});});
  const smithy=el('smithy'),smith=buildForgePanel(smithy,mine.state.forge,()=>{
    saveMine();interior.forge.showBars(mine.state.forge.bars);renderer.shadowMap.needsUpdate=true;
  });
  function atForge(){
    if(!interior?.forge||floorY>.15)return false;
    const {x,z}=camera.position,{hearth,anvil}=interior.forge;
    return Math.hypot(x-anvil.x,z-anvil.z)<1.95||Math.hypot(x-hearth.x,z-hearth.z)<2.15;
  }
  function useForge(){
    if(!atForge())return;
    keys.clear();drag=null;smith.open();
  }
  smithy.addEventListener('close',()=>canvas.focus({preventScroll:true}));
  function setPose(x,y,z,angle,tilt){
    camera.position.set(x,y,z);yaw=angle;pitch=tilt;camera.rotation.set(pitch,yaw,0,'YXZ');
  }
  function leaveInterior(){
    if(!interior)return;
    if(smithy.open)smithy.close();
    const p=interior.plot,at=doorstep(p,1.2);
    interior=null;resize();floorY=0;roomName.hidden=true;roomName.textContent='';doorButton.hidden=true;
    keys.clear();drag=null;exteriorY=walkHeight(at.x,at.z);setPose(at.x,exteriorY+1.57,at.z,p.a+Math.PI,0);
    steps.reset(at.x,at.z);
    renderer.shadowMap.needsUpdate=true;
  }
  function setInteriorView(p){
    if(p&&!rooms.has(p.id))rooms.set(p.id,makeRoom(p));
    interior=p?rooms.get(p.id):null;
    if(interior){
      interior.forge?.showBars(mine.state.forge.bars);
      interior.scene.environment=environment.texture;interior.scene.environmentIntensity=.075;
    }
    resize();windowHour=NaN;renderer.shadowMap.needsUpdate=true;
  }
  function enterInterior(p){
    setInteriorView(p);
    floorY=0;roomName.hidden=false;roomName.textContent=p.name;
    keys.clear();drag=null;doorPlot=null;doorButton.hidden=true;
    setPose(0,1.57,interior.entryZ,.135,.075);canvas.focus({preventScroll:true});
  }
  function useDoor(){
    if(doorButton.hidden)return;
    if(interaction){interaction();checkDoor(false);}
    else if(interior)leaveInterior();
    else if(doorPlot){
      const destination=doorPlot;
      if(destination===castlePlace)castleWalk();
      else {if(mode!=='walk')modeUI('walk');enterInterior(destination);}
    }
    if(!conversation.open&&!smithy.open)canvas.focus({preventScroll:true});
  }
  doorButton.onclick=useDoor;
  function checkDoor(moving){
    let label='';interaction=null;
    if(mode!=='walk'){
      doorPlot=mode==='orbit'&&!flight?landmark:null;
      if(doorPlot)label=doorPlot===castlePlace?'Walk to the castle gate':'Enter '+doorPlot.name;
    }else if(interior){
      doorPlot=null;
      const atDoor=floorY<.15&&Math.abs(camera.position.x)<.96&&camera.position.z>interior.entryZ-1.18&&Math.cos(yaw)<-.18;
      if(atDoor){label='Step outside';if(moving&&Math.abs(camera.position.x)<.61&&camera.position.z>interior.entryZ+.09){leaveInterior();return;}}
      else if(atForge()){label='Work at the forge';interaction=useForge;}
      else if(floorY<.15&&interior.sluice&&Math.hypot(camera.position.x-interior.sluice.x,camera.position.z-interior.sluice.z)<1.75){
        label=drive.sluice?'Close the armory sluice':'Open the armory sluice';interaction=()=>drive.toggle();
      }
    }else{
      doorPlot=null;
      const railTask=mine.interaction(camera.position.x,camera.position.z,exteriorY);
      if(railTask){label=railTask.label;interaction=()=>handleMine(railTask.perform());}
      if(!railTask&&exteriorY<walkHeight(camera.position.x,camera.position.z)-.75&&mine.at(camera.position.x,camera.position.z,exteriorY,.5)){
        doorButton.hidden=true;
        return;
      }
      const game=hunting.active?hunting.nearbyHarvest(camera.position.x,camera.position.z):null;
      if(game){label='Collect '+game.spec.name;interaction=()=>hunting.harvest(game);}
      const boatAction=lakeScene.interact(camera.position.x,camera.position.z);
      if(boatAction){label=boatAction;interaction=()=>{
        const aboard=lakeScene.toggleBoard();keys.clear();drag=null;
        if(aboard){yaw=lakeScene.boat.yaw;pitch=-.09;camera.rotation.set(pitch,yaw,0,'YXZ');}
        else returnToJetty();
        refreshHint();
      };}
      if(!label&&castle.nearby(camera.position.x,camera.position.z)){
        const x=camera.position.x-estate.x,z=camera.position.z-estate.z,y=exteriorY-estate.y;
        label=castle.bridge.action(x,z,y);
        if(label)interaction=()=>castle.bridge.toggle();
        else if((label=castle.dragon.action(x,z,y)))interaction=()=>showConversation(castle.dragon.talk());
      }
      for(const p of interaction?[]:plots){
        const door=doorstep(p,0),dx=camera.position.x-door.x,dz=camera.position.z-door.z;
        const across=dx*Math.cos(p.a)-dz*Math.sin(p.a),inFront=dx*Math.sin(p.a)+dz*Math.cos(p.a);
        if(Math.abs(across)>.98||inFront<-.13||inFront>1.92||Math.cos(yaw-p.a)<.12)continue;
        doorPlot=p;label='Enter '+p.name;
        if(moving&&Math.abs(across)<.53&&inFront<.39){enterInterior(p);return;}break;
      }
      if(!label&&Math.hypot(camera.position.x-village.sluice.x,camera.position.z-village.sluice.z)<1.90){
        label=drive.sluice?'Close the armory sluice':'Open the armory sluice';interaction=()=>drive.toggle();
      }
      if(!label){
        const {x,z}=camera.position;
        const task=farmScene.nearbyTask(x,z,yaw);
        if(task){label=task.label;interaction=()=>{
          const mounted=vehicle.mounted;
          informFarm(task.perform());
          if(!mounted&&vehicle.mounted){chaseYaw=chasePitch=0;keys.clear();tractorCamera(true);refreshHint();}
          updateFarmPanel();
        };}
      }
    }
    doorButton.hidden=!label;
    if(label&&doorButton.lastElementChild.textContent!==label)doorButton.lastElementChild.textContent=label;
  }
  const speedControl=el('tourSpeed'),padSpeed=el('padTourSpeed');
  padSpeed.replaceChildren(...Array.from(speedControl.options,option=>option.cloneNode(true)));
  let playbackRate=1;
  function setTourSpeed(index){
    const selected=Math.max(0,Math.min(speedControl.options.length-1,index));
    speedControl.selectedIndex=padSpeed.selectedIndex=selected;
    playbackRate=Number(speedControl.value);
  }
  speedControl.onchange=()=>setTourSpeed(speedControl.selectedIndex);
  padSpeed.onchange=()=>setTourSpeed(padSpeed.selectedIndex);
  function updateTour(elapsed){
    tourTime=(tourTime+elapsed*playbackRate)%tourDuration;
    const stop=sampleTour(tourTime,camera.position,orbit.target);
    if(stop!==tourStop){
      if((interior?.plot.id??null)!==(stop.room??null))setInteriorView(stop.room?plots.find(plot=>plot.id===stop.room):null);
      roomName.textContent=stop.name;roomName.hidden=false;tourStop=stop;
      renderer.shadowMap.needsUpdate=true;
    }
    camera.lookAt(orbit.target);
    const progress=tourTime/tourDuration;
    light(12+6.4*smooth(.42,.88,progress)+4.6*smooth(.89,.97,progress)+13*smooth(.97,1,progress));
  }
  function refreshHint(){
    el('hint').innerHTML=mode==='tour'?(padInput.connected?'Bumpers change speed · B / ○ to walk here':'[ and ] change speed · Esc to walk here'):mine.cart.mounted?(padInput.connected?'Left stick forward to town · Back toward the mine':'W to town · S toward the mine · E to dismount'):lakeScene.boat.aboard?(padInput.connected?'Left stick to steer and trim or drive · Bumpers for gear · X / □ to use':'A/D steer · W/S trim or drive · Q propulsion · Space anchor · F use gear'):vehicle.mounted?(padInput.connected?'Left stick to drive <span>·</span> X / □ to hitch <span>·</span> B / ○ to exit':'WASD to drive <span>·</span> R to hitch <span>·</span> Esc to exit'):
      padInput.connected?(mode==='walk'?'Left stick to walk <span>·</span> Right stick to look <span>·</span> Menu for controls':'Right stick to orbit <span>·</span> Triggers to zoom'):
      mode==='walk'?'WASD to walk <span>·</span> Drag to look':'Drag to orbit <span>·</span> Scroll to zoom';
    doorButton.firstElementChild.textContent=padInput.connected?'A / ×':'E';
  }
  function rememberTour(){
    const state=tourHandoff(tourTime);
    tourCheckpoint={time:state.time,rate:playbackRate};
    try{localStorage.setItem(tourSaveKey,JSON.stringify(tourCheckpoint));}catch{}
    return state;
  }
  function updateTourAction(){
    const button=el('tour'),touring=mode==='tour',label=touring?'Walk here':tourCheckpoint?'Resume tour':'Tour';
    button.querySelector('i').innerHTML=svg(touring?'walk':'play');
    button.querySelector('span').textContent=label;button.setAttribute('aria-label',label);
    el('padTour').textContent=touring?'Walk here':tourCheckpoint?'Resume tour':'Start tour';
  }
  function modeUI(next){
    if(mode==='tour'){
      if(next!=='tour')rememberTour();
      const enclosed=interior||tourStop?.layer||tourStop?.region?.startsWith('castle-')&&tourStop.region!=='castle-surface'&&tourStop.region!=='castle-battlements';
      if(interior)setInteriorView(null);
      if(enclosed){camera.position.copy(homePos);orbit.target.copy(homeTarget);}
      tourStop=null;camera.layers.set(0);
    }
    el('tourSpeedRow').hidden=next!=='tour';
    stepOffCart();hunting.leave();lakeScene.leave();dismountTractor(true);leaveInterior();orbit.maxDistance=74;landmark=null;doorPlot=null;interaction=null;doorButton.hidden=true;roomName.hidden=true;
    mode=next;orbit.enabled=next==='orbit';keys.clear();drag=null;flight=null;
    el('tour').setAttribute('aria-pressed',next==='tour');el('walk').setAttribute('aria-pressed',next==='walk');
    updateTourAction();
    el('pad').hidden=next!=='walk'||!matchMedia('(pointer: coarse)').matches;
    refreshHint();
  }
  function fly(pos,target,duration=1.15){
    orbit.update();flight={from:camera.position.clone(),aim:orbit.target.clone(),pos,target,elapsed:0,duration};
  }
  function returnToJetty(){
    exteriorY=walkHeight(dock.x,dock.end-.65);
    setPose(dock.x,exteriorY+1.57,dock.end-.65,Math.PI,-.08);
    steps.reset(dock.x,dock.end-.65);
  }
  function overlook(reset=false){
    if(mode==='tour'){
      modeUI('orbit');
      if(reset){camera.position.copy(homePos);orbit.target.copy(homeTarget);}
      orbit.update();return;
    }
    stepOffCart();
    if(lakeScene.boat.aboard)returnToJetty();
    dismountTractor(true);leaveInterior();
    if(mode==='walk'){lastWalk={x:camera.position.x,z:camera.position.z,yaw,pitch,y:exteriorY};orbit.target.copy(camera.position).add(camera.getWorldDirection(v(0,0,0)).multiplyScalar(6));}
    modeUI('orbit');if(reset)fly(homePos,homeTarget);else orbit.update();
  }
  function enterWalk(x=.55,z=17.3,a=.10,p=.035,ground=walkHeight(x,z)){
    modeUI('walk');exteriorY=ground;setPose(x,exteriorY+1.57,z,a,p);steps.reset(x,z);canvas.focus({preventScroll:true});
  }
  function nearbySpots(x,z,max=6,step=.3){
    const points=[{x,z}];
    for(let radius=step;radius<=max+.001;radius+=step){
      const count=Math.max(12,Math.ceil(radius*Math.PI*2/step));
      for(let i=0;i<count;i++){const angle=i*Math.PI*2/count;points.push({x:x+Math.cos(angle)*radius,z:z+Math.sin(angle)*radius});}
    }
    return points;
  }
  function resolveRoomHandoff(state,room){
    if(!room)return null;
    for(const point of nearbySpots(state.x,state.z,2.4,.18)){
      const floor=room.nextFloor(point.x,point.z,state.floor);
      if(floor!==null&&Math.abs(floor-state.floor)<.03)return {...point,floor};
    }
    return null;
  }
  function resolveOutdoorHandoff(state){
    for(const point of nearbySpots(state.x,state.z)){
      const ground=walkHeight(point.x,point.z),preferred=state.floor??ground;
      let floor=null;
      if(state.domain==='castle')floor=castle.next(point.x,point.z,preferred,ground);
      else if(state.domain==='catacomb')floor=catacomb.next(point.x,point.z,preferred,ground);
      else if(state.domain==='mine')floor=mine.next(point.x,point.z,preferred,ground);
      else if(atLake(point.x,point.z))floor=walkable(point.x,point.z)&&lakeScene.clear(point.x,point.z)?ground:null;
      else floor=walkable(point.x,point.z)&&farmScene.clear(point.x,point.z)&&woodland.clear(point.x,point.z)&&villageTreesClear(point.x,point.z)&&village.walkable(point.x,point.z)?ground:null;
      if(floor!==null&&(state.floor===null||Math.abs(floor-state.floor)<.4))return {...point,floor};
    }
    return null;
  }
  function handoffTour(){
    if(mode!=='tour')return;
    const state=rememberTour();
    const roomSpot=state.domain==='room'?resolveRoomHandoff(state,interior):null;
    const outdoorSpot=!['room','lake'].includes(state.domain)?resolveOutdoorHandoff(state):null;
    if((state.domain==='room'&&!roomSpot)||(!['room','lake'].includes(state.domain)&&!outdoorSpot))return;
    modeUI('walk');
    if(state.domain==='room'){
      const plot=plots.find(candidate=>candidate.id===state.room);setInteriorView(plot);floorY=state.floor;
      setPose(roomSpot.x,roomSpot.floor+1.57,roomSpot.z,state.yaw,state.pitch);
      roomName.textContent=plot.name;roomName.hidden=false;
    }else if(state.domain==='lake'){
      const placement=lakeScene.boardAt(state.x,state.z,state.yaw);
      if(placement){
        exteriorY=.30;setPose(placement.x+1.18*Math.sin(placement.yaw),1.57,placement.z+1.18*Math.cos(placement.yaw),state.yaw,state.pitch);
        roomName.textContent='Alder Lake · Sailboat';roomName.hidden=false;
      }
    }else{
      exteriorY=outdoorSpot.floor;setPose(outdoorSpot.x,outdoorSpot.floor+1.57,outdoorSpot.z,state.yaw,state.pitch);
      steps.reset(outdoorSpot.x,outdoorSpot.z);
    }
    camera.layers.set(0);keys.clear();drag=null;checkDoor(false);refreshHint();resize();canvas.focus({preventScroll:true});
  }
  el('walk').onclick=()=>{closePlaces();if(mode==='tour')handoffTour();else if(mode==='walk')overlook(true);else if(landmark===castlePlace)castleWalk();else if(landmark){const p=landmark,at=doorstep(p,1.5);enterWalk(at.x,at.z,p.a,0);}else if(lastWalk){enterWalk(lastWalk.x,lastWalk.z,lastWalk.yaw,lastWalk.pitch);exteriorY=lastWalk.y;camera.position.y=exteriorY+1.57;}else enterWalk();};
  function startTour(){
    closePlaces();desiredHour=null;
    if(tourCheckpoint){tourTime=tourCheckpoint.time;const index=Array.from(speedControl.options).findIndex(option=>Number(option.value)===tourCheckpoint.rate);setTourSpeed(index>=0?index:3);}
    else tourTime=0;
    modeUI('tour');
    updateTour(0);
  }
  el('tour').onclick=()=>mode==='tour'?handoffTour():startTour();
  function restartTour(){
    tourCheckpoint=null;
    try{localStorage.removeItem(tourSaveKey);}catch{}
    startTour();
  }
  window.addEventListener('pagehide',()=>{if(mode==='tour')rememberTour();});
  updateTourAction();
  orbit.addEventListener('start',()=>{flight=null;landmark=null;checkDoor(false);});
  el('hour').oninput=e=>{if(mode==='tour')overlook();desiredHour=null;light(+e.target.value);};
  document.querySelectorAll('[data-hour]').forEach(n=>n.onclick=()=>{if(mode==='tour')overlook();desiredHour=+n.dataset.hour;});
  function closePlaces(){el('places').setAttribute('aria-expanded','false');el('placeList').hidden=true;}
  for(const p of [{id:'home',name:'Village overlook'},...plots]){
    const btn=document.createElement('button');btn.type='button';btn.textContent=p.name;
    btn.onclick=()=>{closePlaces();if(p.id==='home'){overlook(true);return;}
      const target=v(p.x,p.y+(p.id==='wind'?3.8:p.h*.58),p.z);
      if(mode==='walk'){
        const spot=doorstep(p,1.5);enterWalk(spot.x,spot.z,p.a,0);checkDoor(false);return;
      }
      if(mode!=='orbit')overlook();orbit.maxDistance=74;const dist=p.id==='wind'||p.id==='tower'?11:8.5;
      const pos=v(p.x+Math.sin(p.a+.45)*dist,p.y+4.4,p.z+Math.cos(p.a+.45)*dist);
      pos.y=Math.max(pos.y,height(pos.x,pos.z)+2.0);landmark=p;fly(pos,target);
    };el('placeList').append(btn);
  }
  const entrances=new Map([['#tour',startTour]]);
  for(const [name,x,z,a,tilt] of [['Woodland trail',trailhead.x,trailhead.z,trailYaw,0],['Thornmere Castle',estate.x,estate.z+41,0,.10]]){
    const btn=document.createElement('button');btn.textContent=name;
    btn.onclick=()=>{
      closePlaces();
      if(name===castlePlace.name&&mode!=='walk'){
        modeUI('orbit');orbit.maxDistance=100;landmark=castlePlace;
        fly(v(estate.x+37,estate.y+31,estate.z+66),v(estate.x,estate.y+5.5,estate.z+1),1.55);
      }else enterWalk(x,z,a,tilt);
    };
    entrances.set(name===castlePlace.name?'#thornmere-castle':'#woodland-trail',btn.onclick);
    el('placeList').append(btn);
  }
  for(const [name,x,z,y,a,p] of [['King’s chamber',7.48,-10.42,4.8,-.92,.02],['Dragon viewing gallery',-5.8,-12.3,-10.45,-2.79,-.17]]){
    const button=document.createElement('button');button.type='button';button.textContent=name;
    button.onclick=()=>{closePlaces();enterWalk(estate.x+x,estate.z+z,a,p,estate.y+y);checkDoor(false);};
    el('placeList').append(button);
  }
  function destination(name,go){
    const button=document.createElement('button');button.type='button';button.textContent=name;
    button.onclick=()=>{closePlaces();go();};el('placeList').append(button);return button.onclick;
  }
  entrances.set('#dragon-hoard',destination('Dragon hoard',()=>enterWalk(estate.x+6.5,estate.z-8.3,2.38,.19,estate.y-16)));
  entrances.set('#briar-crypts',destination(catacomb.name,()=>enterWalk(catacomb.entry.x,catacomb.entry.z,catacomb.entry.yaw,-.14)));
  entrances.set('#ore-mine',destination(mine.name,()=>{
    const vein=mine.state.veins[0],point=minePoint(vein.progress),cart=mine.cart.pose;
    enterWalk(point.x,point.z,Math.atan2(point.x-cart.x,point.z-cart.z),-.17,point.y);checkDoor(false);
  }));
  entrances.set('#armory-rail-yard',destination('Blacksmith rail yard',()=>{
    const p=mine.yard,x=p.x+2.3,z=p.z+2.6;
    enterWalk(x,z,Math.atan2(x-mine.portal.x,z-mine.portal.z),-.14,walkHeight(x,z));checkDoor(false);
  }));
  entrances.set('#blacksmith-forge',destination('Blacksmith forge',()=>{
    modeUI('walk');enterInterior(plots.find(p=>p.id==='mill'));
    const {anvil}=interior.forge;
    setPose(anvil.x+1.15,1.57,anvil.z+.85,.94,-.18);checkDoor(false);
  }));
  const lakeEntrance=destination(lake.name,()=>{
    enterWalk(dock.x,dock.near+3.8,Math.PI-.15,-.075);checkDoor(false);
  });
  entrances.set('#alder-lake',lakeEntrance);
  for(const [i,site] of forestSites.entries()){
    const visit=destination(i===0?'Pinewood hunting trail':site.name,()=>{
      const p=hunting.arrival(i);
      enterWalk(p.x,p.z,p.yaw,p.pitch);
    });
    entrances.set(i===0?'#pinewood-hunting':'#'+site.name.toLowerCase().replaceAll(' ','-'),visit);
  }
  const farmEntrance=destination(farm.name,()=>enterWalk(farm.entry.x,farm.entry.z,farm.entry.a,.045));
  entrances.set('#commons-farm',farmEntrance);
  destination('Dairy stalls',()=>{enterWalk(-86.5,27.96,1.33,-.09);checkDoor(false);});
  entrances.set('#crop-fields',destination('Crop fields',()=>enterWalk(-100.5,61.7,2.34,-.13)));
  destination('Farm tractor',()=>{
    const {x,z,yaw:heading}=vehicle.pose;
    const at=vehicle.mounted?vehicle.dismount(true):null;
    const spaces=[[x+1.65,z],[x-1.65,z],[x,z-1.87],[x,z+2.0]];
    const spot=spaces.find(([xx,zz])=>inFarm(xx,zz)&&farmScene.clear(xx,zz));
    enterWalk(spot?.[0]??at?.x??farm.entry.x,spot?.[1]??at?.z??farm.entry.z,spot?Math.atan2(spot[0]-x,spot[1]-z):heading,-.05);checkDoor(false);
  });
  for(const [name,site] of [['Water tower',farmStations.water],['Hen house',farmStations.eggs],['Hen trough',farmStations.troughs[1]],['Cattle trough',farmStations.troughs[0]],['Pig trough',farmStations.troughs[2]],['Grain bin',farmStations.feed]]){
    destination(name,()=>{enterWalk(site.x,site.z-1.10,Math.PI,-.13);checkDoor(false);});
  }
  entrances.set('#pig-wallow',destination('Pig wallow',()=>enterWalk(-59.5,40.4,-.88,-.25)));
  destination('Farm overlook',()=>{
    modeUI('orbit');orbit.maxDistance=137;const {x,y,z}=farm.overview;
    fly(v(x+15,y,z+6),v(-78,1.1,54),1.55);
  });
  const wheelEntrance=destination('Mill wheel',()=>{
    const x=millWheel.x-5.85,z=millWheel.z+4.25;
    if(mode==='walk')enterWalk(x,z,-1.20,-.12);
    else{modeUI('orbit');fly(v(x,5.15,z),v(millWheel.x,millWheel.y,millWheel.z),1.15);}
  });
  entrances.set('#mill-wheel',wheelEntrance);
  entrances.set('#brook',destination('Brook riffles',()=>enterWalk(riverX(29.8)+2.65,29.8,.49,-.29)));
  destination('Restart tour',restartTour);
  el('places').onclick=()=>{const open=el('placeList').hidden;el('placeList').hidden=!open;el('places').setAttribute('aria-expanded',open);};
  document.addEventListener('pointerdown',e=>{if(!e.target.closest('.dock'))closePlaces();});
  const guide=el('guide');el('help').onclick=()=>guide.showModal();el('closeHelp').onclick=()=>guide.close();
  const controllerMenu=el('controllerMenu'),placeMenu=el('placeList'),controllerWeather=el('padWeather'),controllerHour=el('padHour');
  controllerWeather.replaceChildren(...Array.from(weatherSelect.options,option=>option.cloneNode(true)));
  controllerWeather.onchange=()=>{weatherSelect.value=controllerWeather.value;weather.select(weatherSelect.value);};
  controllerHour.oninput=()=>{if(mode==='tour')overlook();desiredHour=null;light(+controllerHour.value);};
  el('closeController').onclick=()=>controllerMenu.close();
  el('padWalk').onclick=()=>{controllerMenu.close();el('walk').click();};
  el('padTour').onclick=()=>{controllerMenu.close();el('tour').click();};
  el('padHelp').onclick=()=>{controllerMenu.close();guide.showModal();};
  el('padHud').onclick=()=>{controllerMenu.close();hideUI();};
  el('padPlaces').onclick=()=>{controllerMenu.close();openPlacesWithPad();};
  controllerMenu.addEventListener('close',()=>{if(placeMenu.hidden&&!guide.open)canvas.focus({preventScroll:true});});

  function openPlacesWithPad(){
    if(document.body.classList.contains('clean'))hideUI();
    if(placeMenu.hidden)el('places').click();
    placeMenu.querySelector('button')?.focus();
  }
  function openController(){
    closePlaces();keys.clear();drag=null;
    controllerHour.value=hour;controllerWeather.value=weatherSelect.value;
    controllerMenu.showModal();el('padPlaces').focus();
  }
  function moveMenuFocus(root,input){
    const choices=Array.from(root.querySelectorAll('button,input,select')).filter(node=>!node.disabled&&node.getClientRects().length);
    if(!choices.length)return;
    let current=choices.indexOf(document.activeElement);
    if(input.up||input.down){
      current=current<0?0:(current+(input.up?-1:1)+choices.length)%choices.length;
      choices[current].focus();choices[current].scrollIntoView({block:'nearest'});return;
    }
    const focus=choices[current]??choices[0];
    if(input.left||input.right){
      const direction=input.left?-1:1;
      if(focus.tagName==='SELECT'){
        focus.selectedIndex=(focus.selectedIndex+direction+focus.options.length)%focus.options.length;
        focus.dispatchEvent(new Event('change',{bubbles:true}));
      }else if(focus.type==='range'){
        if(direction>0)focus.stepUp();else focus.stepDown();
        focus.dispatchEvent(new Event('input',{bubbles:true}));
      }else if(focus.type==='checkbox')focus.click();
    }
    if(input.confirm||input.interact)focus.click();
  }
  const hemisphere=new T.Spherical(),orbitOffset=v(0,0,0),pan=v(0,0,0);
  function pollController(dt){
    const wasConnected=padInput.connected;padInput=gamepad.poll(dt);
    if(wasConnected!==padInput.connected){
      if(!padInput.connected)lakeScene.setReel('pad',false);
      document.body.classList.toggle('using-gamepad',padInput.connected);refreshHint();
    }
    if(!padInput.connected)return;
    const locked=[conversation,guide,controllerMenu,smithy].find(dialog=>dialog.open);
    if(locked){if(padInput.back||padInput.menu)locked.close();else moveMenuFocus(locked,padInput);return;}
    if(padInput.menu){openController();return;}
    if(!placeMenu.hidden){
      if(padInput.back||padInput.places){closePlaces();canvas.focus({preventScroll:true});}
      else moveMenuFocus(placeMenu,padInput);
      return;
    }
    if(padInput.places){openPlacesWithPad();return;}
    if(padInput.toggleWalk){if(document.body.classList.contains('clean'))hideUI();el('walk').click();return;}
    if(mode==='tour'){
      if(padInput.back)handoffTour();
      else if(padInput.previous||padInput.next)setTourSpeed(speedControl.selectedIndex+(padInput.next?1:-1));
      return;
    }
    if(lakeScene.controller(padInput)||hunting.controller(padInput))return;
    if(padInput.back){if(mine.cart.mounted)stepOffCart();else if(vehicle.mounted)dismountTractor();else if(interior)leaveInterior();else if(mode!=='orbit')overlook(true);else openController();return;}
    if(vehicle.mounted&&padInput.interact){hitchWagon();return;}
    if((padInput.confirm||padInput.interact)&&!doorButton.hidden){useDoor();if(el('padRumble').checked)gamepad.pulse(.13,.18,72);return;}
    if(padInput.previous||padInput.next){
      const presets=[7,12,18.6,23],current=presets.reduce((best,h,i)=>Math.abs(h-hour)<Math.abs(presets[best]-hour)?i:best,0);
      const prior=desiredHour===null?-1:presets.indexOf(desiredHour);
      desiredHour=presets[((prior<0?current:prior)+(padInput.previous?-1:1)+presets.length)%presets.length];
    }
    const speed=+el('padSensitivity').value;
    const vertical=padInput.lookY*dt*speed*(el('padInvert').checked?-1:1);
    if(vehicle.mounted){
      chaseYaw=T.MathUtils.clamp(chaseYaw-padInput.lookX*dt*1.75*speed,-1.25,1.25);
      chasePitch=T.MathUtils.clamp(chasePitch-vertical,-.56,.38);
    }else if(mode==='walk'&&(padInput.lookX||padInput.lookY)){
      const lookScale=lakeScene.scoped||hunting.scoped?.27:1;
      yaw-=padInput.lookX*dt*2.25*speed*lookScale;pitch=T.MathUtils.clamp(pitch-vertical*1.76*lookScale,-1.22,1.24);
      camera.rotation.set(pitch,yaw,0,'YXZ');
    }else if(mode==='orbit'&&(padInput.lookX||padInput.lookY||padInput.zoom||padInput.moveX||padInput.forward)){
      flight=null;landmark=null;
      hemisphere.setFromVector3(orbitOffset.subVectors(camera.position,orbit.target));
      hemisphere.theta+=padInput.lookX*dt*1.75*speed;hemisphere.phi=T.MathUtils.clamp(hemisphere.phi+vertical*1.55,orbit.minPolarAngle,orbit.maxPolarAngle);
      hemisphere.radius=T.MathUtils.clamp(hemisphere.radius*Math.exp(-padInput.zoom*dt*1.35),orbit.minDistance,orbit.maxDistance);
      const sin=Math.sin(hemisphere.theta),cos=Math.cos(hemisphere.theta);
      pan.set(cos*padInput.moveX-sin*padInput.forward,0,-sin*padInput.moveX-cos*padInput.forward).multiplyScalar(dt*(2+hemisphere.radius*.33));
      orbit.target.add(pan);camera.position.copy(orbitOffset.setFromSpherical(hemisphere)).add(orbit.target);orbit.update();
    }
  }
  function hideUI(){const hidden=document.body.classList.toggle('clean');el('show').hidden=!hidden;closePlaces();}
  el('hide').onclick=el('show').onclick=hideUI;
  const movement=new Set(['KeyW','KeyA','KeyS','KeyD','ArrowUp','ArrowLeft','ArrowDown','ArrowRight','ShiftLeft','ShiftRight']);
  window.addEventListener('keydown',e=>{
    if(smithy.open||guide.open||conversation.open||controllerMenu.open||e.ctrlKey||e.altKey||e.metaKey)return;
    if(mode==='tour'&&el('placeList').hidden){
      if(e.code==='Escape'){e.preventDefault();handoffTour();return;}
      if(e.code==='BracketLeft'||e.code==='BracketRight'){
        e.preventDefault();if(!e.repeat)setTourSpeed(speedControl.selectedIndex+(e.code==='BracketRight'?1:-1));return;
      }
    }
    if(e.target.matches?.('input,select,textarea'))return;
    if(e.code==='KeyH'&&!e.repeat){hideUI();return;}
    if(!e.repeat&&el('placeList').hidden&&(lakeScene.key(e.code)||hunting.key(e.code))){e.preventDefault();return;}
    if(e.code==='Escape'){if(!el('placeList').hidden)closePlaces();else if(mine.cart.mounted)stepOffCart();else if(vehicle.mounted)dismountTractor();else if(interior)leaveInterior();else if(mode!=='orbit')overlook(true);return;}
    if(e.code==='KeyR'&&vehicle.mounted&&!e.repeat){hitchWagon();return;}
    if(e.code==='KeyE'&&!doorButton.hidden&&!e.repeat){e.preventDefault();useDoor();return;}
    if(mode==='walk'&&movement.has(e.code)&&e.target.tagName!=='INPUT'){e.preventDefault();keys.add(e.code);}
  });
  window.addEventListener('keyup',e=>{
    keys.delete(e.code);if(e.code==='KeyF')lakeScene.setReel('key',false);
  });
  window.addEventListener('blur',()=>{keys.clear();lakeScene.clearReel();});
  document.addEventListener('visibilitychange',()=>{if(document.hidden)lakeScene.clearReel();});
  canvas.addEventListener('pointerdown',e=>{if(mode==='walk'){drag={id:e.pointerId,x:e.clientX,y:e.clientY};canvas.setPointerCapture(e.pointerId);}});
  canvas.addEventListener('pointermove',e=>{if(drag?.id!==e.pointerId)return;
    if(vehicle.mounted){
      chaseYaw=T.MathUtils.clamp(chaseYaw-(e.clientX-drag.x)*.004,-1.25,1.25);
      chasePitch=T.MathUtils.clamp(chasePitch-(e.clientY-drag.y)*.004,-.56,.38);drag.x=e.clientX;drag.y=e.clientY;return;
    }
    const sensitivity=lakeScene.scoped||hunting.scoped?.0011:.004;
    yaw-=(e.clientX-drag.x)*sensitivity;pitch=T.MathUtils.clamp(pitch-(e.clientY-drag.y)*sensitivity,-1.22,1.24);drag.x=e.clientX;drag.y=e.clientY;camera.rotation.set(pitch,yaw,0);});
  for(const type of ['pointerup','pointercancel','lostpointercapture'])canvas.addEventListener(type,()=>drag=null);
  document.querySelectorAll('[data-key]').forEach(n=>{n.onpointerdown=e=>{e.preventDefault();keys.add(n.dataset.key);n.setPointerCapture(e.pointerId);};n.onpointerup=n.onpointercancel=n.onlostpointercapture=()=>keys.delete(n.dataset.key);});
  function walkStep(dt){const f=Number(keys.has('KeyW')||keys.has('ArrowUp'))-Number(keys.has('KeyS')||keys.has('ArrowDown'))+(padInput.forward??0);
    const s=Number(keys.has('KeyD')||keys.has('ArrowRight'))-Number(keys.has('KeyA')||keys.has('ArrowLeft'))+(padInput.moveX??0);
    if(mine.cart.mounted){
      const p=mine.drive(dt,T.MathUtils.clamp(f,-1,1));
      yaw+=Math.atan2(Math.sin(p.yaw-cartHeading),Math.cos(p.yaw-cartHeading));cartHeading=p.yaw;
      exteriorY=p.y;setPose(p.x,p.y+1.57,p.z,yaw,pitch);roomName.hidden=false;
      roomName.textContent=mine.area(p.x,p.z,p.y)+' · Ore cart';checkDoor(false);return;
    }
    if(lakeScene.boat.aboard){
      const boat=lakeScene.boat,previousYaw=boat.yaw;
      lakeScene.drive(dt,T.MathUtils.clamp(f,-1,1),T.MathUtils.clamp(s,-1,1),t,weather.state);
      yaw+=boat.yaw-previousYaw;
      exteriorY=.30;
      setPose(boat.x+1.18*Math.sin(boat.yaw),1.57+.035*Math.sin(t*1.6+boat.z),boat.z+1.18*Math.cos(boat.yaw),yaw,pitch);
      if(roomName.textContent!=='Alder Lake · Sailboat')roomName.textContent='Alder Lake · Sailboat';roomName.hidden=false;checkDoor(false);return;
    }
    if(vehicle.mounted){
      informFarm(farmScene.drive(dt,f,s));tractorCamera(false,dt);
      if(roomName.textContent!=='Farm tractor')roomName.textContent='Farm tractor';roomName.hidden=false;
      checkDoor(false);return;
    }
    const speed=(keys.has('ShiftLeft')||keys.has('ShiftRight')||padInput.sprint?4.2:2.55)*dt/Math.max(1,Math.hypot(f,s));
    const x=camera.position.x+(s*Math.cos(yaw)-f*Math.sin(yaw))*speed,z=camera.position.z-(f*Math.cos(yaw)+s*Math.sin(yaw))*speed;
    if(interior){
      // Substeps keep collision and stair climbing consistent while sprinting on slow frames.
      const dx=x-camera.position.x,dz=z-camera.position.z,n=Math.max(1,Math.ceil(Math.hypot(dx,dz)/.09));
      for(let i=0;i<n;i++){
        let next=interior.nextFloor(camera.position.x+dx/n,camera.position.z,floorY);
        if(next!==null){camera.position.x+=dx/n;floorY=next;}
        next=interior.nextFloor(camera.position.x,camera.position.z+dz/n,floorY);
        if(next!==null){camera.position.z+=dz/n;floorY=next;}
      }
      camera.position.y=T.MathUtils.lerp(camera.position.y,floorY+1.57,1-Math.exp(-dt*18));
      const location=interior.plot.name+(floorY>=2.84?' · Loft':'');
      if(roomName.textContent!==location)roomName.textContent=location;
      checkDoor(f>0);return;
    }
    const outdoorStep=(xx,zz)=>{
      const ground=walkHeight(xx,zz);
      if(atLake(xx,zz))return walkable(xx,zz)&&lakeScene.clear(xx,zz)?ground:null;
      const insideCatacomb=catacomb.at(camera.position.x,camera.position.z,exteriorY,.7);
      const inMine=mine.nearby(camera.position.x,camera.position.z)&&mine.at(camera.position.x,camera.position.z,exteriorY,.45);
      if(mine.nearby(xx,zz)){
        const floor=mine.next(xx,zz,exteriorY,ground);
        if(floor!==null&&Math.abs(floor-exteriorY)<.32&&(inMine||insideCatacomb||Math.hypot(xx-mine.yard.x,zz-mine.yard.z)<5.5))return floor;
      }
      if(catacomb.nearby(xx,zz)){
        const floor=catacomb.next(xx,zz,exteriorY,ground);
        if(insideCatacomb||floor!==null&&Math.abs(floor-exteriorY)<.32)return floor;
      }
      if(inMine&&Math.abs(ground-exteriorY)>.5)return null;
      if(castle.nearby(xx,zz))return castle.next(xx,zz,exteriorY,ground);
      return walkable(xx,zz)&&farmScene.clear(xx,zz)&&woodland.clear(xx,zz)&&villageTreesClear(xx,zz)&&village.walkable(xx,zz)?ground:null;
    };
    const dx=x-camera.position.x,dz=z-camera.position.z,n=Math.max(1,Math.ceil(Math.hypot(dx,dz)/.12));
    for(let i=0;i<n;i++){
      if(dx){const xx=camera.position.x+dx/n,h=outdoorStep(xx,camera.position.z);if(h!==null){camera.position.x=xx;exteriorY=h;}}
      if(dz){const zz=camera.position.z+dz/n,h=outdoorStep(camera.position.x,zz);if(h!==null){camera.position.z=zz;exteriorY=h;}}
    }
    camera.position.y=T.MathUtils.lerp(camera.position.y,exteriorY+1.57,1-Math.exp(-dt*15));
    const xx=camera.position.x,zz=camera.position.z;
    steps.move(xx,zz);
    const inDairy=xx>-90.25&&xx<-81.75&&zz>24.55&&zz<33.8;
    const pails=farmScene.dairy.collected;
    const inCatacomb=catacomb.at(xx,zz,exteriorY,.7);
    const place=mine.nearby(xx,zz)&&mine.at(xx,zz,exteriorY,.50)?mine.area(xx,zz,exteriorY):atLake(xx,zz)?lake.name:inCatacomb?catacomb.area(xx,zz,exteriorY):castle.nearby(xx,zz)?castle.area(xx,zz,exteriorY):inDairy?`Dairy stalls${pails?` · Milk pails ${pails}`:''}`:
      inFarm(xx,zz)?farm.name:xx>20&&trailDistance(xx,zz)<6?'Pinewood Way':'';
    roomName.hidden=!place;if(roomName.textContent!==place)roomName.textContent=place;
    checkDoor(f>0);
  }
  function resize(){renderer.setSize(innerWidth,innerHeight);camera.aspect=innerWidth/innerHeight;camera.fov=lakeScene.scoped||hunting.scoped?(innerWidth<innerHeight?15:11):interior?(innerWidth<innerHeight?78:68):(innerWidth<innerHeight?59:46);camera.updateProjectionMatrix();}
  window.addEventListener('resize',resize);resize();
  const openEntrance=()=>entrances.get(location.hash)?.();
  window.addEventListener('hashchange',openEntrance);openEntrance();
  let t=0,previous=performance.now(),drawn=false;
  document.addEventListener('visibilitychange',()=>{previous=performance.now();});
  renderer.setAnimationLoop(now=>{
    const elapsed=Math.max(0,(now-previous)/1000),dt=Math.min(.1,elapsed);previous=now;if(document.hidden)return;t+=dt;
    pollController(dt);
    if(mode==='tour'){
      updateTour(dt);
    }else if(mode==='walk'){if(!smithy.open&&!guide.open&&!conversation.open&&!controllerMenu.open&&placeMenu.hidden)walkStep(dt);}
    else if(flight){
      flight.elapsed+=dt;const f=smooth(0,1,flight.elapsed/flight.duration);
      camera.position.lerpVectors(flight.from,flight.pos,f);orbit.target.lerpVectors(flight.aim,flight.target,f);orbit.update();if(f>=1)flight=null;
    }else orbit.update();
    if(mode==='orbit'){checkDoor(false);const floor=height(camera.position.x,camera.position.z)+.65;if(camera.position.y<floor){camera.position.y=floor;camera.lookAt(orbit.target);}}
    if(desiredHour!==null){const diff=((desiredHour-hour+36)%24)-12; if(Math.abs(diff)<.015){light(desiredHour);desiredHour=null;}else light(hour+diff*(1-Math.exp(-dt*4.3)));}
    // Follow the traveller with the shadow camera so trees, battlements and the keep cast shadows at either end of the road.
    const observingWorld=!interior&&(mode==='walk'||mode==='tour');
    const anchor=observingWorld?camera.position:interior?interior.plot:orbit.target;
    const sx=Math.round(anchor.x/14)*14,sz=Math.round(anchor.z/14)*14;
    if(sun.target.position.x!==sx||sun.target.position.z!==sz){
      sun.position.x+=sx-sun.target.position.x;sun.position.z+=sz-sun.target.position.z;
      sun.target.position.set(sx,0,sz);renderer.shadowMap.needsUpdate=true;
    }
    const floor=mode==='tour'?camera.position.y-1.57:exteriorY;
    const shotLayer=tourStop?.layer??0;
    const castleDepth=observingWorld&&castle.nearby(camera.position.x,camera.position.z)?smooth(.5,4.0,estate.y-floor):0;
    const catacombDepth=shotLayer===2?1:observingWorld&&catacomb.at(camera.position.x,camera.position.z,floor,.7)?smooth(.5,5.0,catacomb.depth(floor)):0;
    const atMine=mode==='walk'&&!interior&&(mine.cart.mounted||mine.nearby(camera.position.x,camera.position.z)&&mine.at(camera.position.x,camera.position.z,floor,.55));
    const mineLayer=atMine?mine.layer(camera.position.x,camera.position.z,floor):shotLayer===3?3:0;
    const depth=Math.max(castleDepth,catacombDepth,mineLayer?smooth(.1,4,mine.depth(floor)):0);
    const night=air.uniforms.night.value;
    weather.step(dt);
    const w=weather.state;
    const label=weatherPresets[weather.front].label;
    const condition=w.rain>.08&&(weather.front==='storm'||weather.front==='rain')?label+' · '+(w.rain>.78?'heavy':w.rain>.44?'steady':'light'):label;
    const brookFlow=rainwater.step(dt,w.rain)+.85+.19*w.wetness;
    air.uniforms.streamTravel.value+=dt*brookFlow;
    const drift=dt*(.018+.094*w.gust);
    air.uniforms.cloudOffset.value.x-=drift*w.windX;air.uniforms.cloudOffset.value.y-=drift*w.windZ;
    farmScene.advance(dt,w.rain);
    if((saveIn-=dt)<0){saveFarm();if(mine.cart.mounted)saveMine();saveIn=8;}
    if(weatherStatus.textContent!==condition)weatherStatus.textContent=condition;
    for(const key of ['cloud','rain','flash','wetness','snowpack'])air.uniforms[key].value=w[key];
    air.uniforms.wind.value=w.gust;
    air.uniforms.runoff.value=brookFlow;
    drive.step(dt,brookFlow);air.uniforms.raceFlow.value=drive.flow;air.uniforms.raceLevel.value=drive.level-millWheel.waterline;
    sun.color.copy(sunDay).lerp(sunDusk,air.uniforms.dusk.value).lerp(sunNight,night).lerp(lightning,w.flash);
    sun.intensity=((2.43-night*2.20)*(1-w.cloud*.68)+w.flash*3.15)*(1-depth*.95);
    hemi.intensity=((1.52-night*1.20)*(1-w.cloud*.21)+w.flash*.65)*(1-depth)+.72*depth;
    const distanceEast=smooth(28,86,anchor.x);
    scene.fog.density=.0065-distanceEast*.0018+night*.008+Math.pow(w.mist,1.64)*.023*(1-depth)+depth*.012;
    scene.fog.color.copy(fogDay).lerp(fogDusk,air.uniforms.dusk.value*.8).lerp(rainFog,w.cloud*.50).lerp(fogNight,night).lerp(lightning,w.flash*.20).lerp(vaultFog,depth);
    air.uniforms.waterFog.value.copy(scene.fog.color);air.uniforms.waterFogDensity.value=scene.fog.density;
    air.uniforms.sunDirection.value.subVectors(sun.position,sun.target.position).normalize();
    air.uniforms.sunTint.value.copy(sun.color);
    // Below the ceiling, exterior geometry and its lights cannot contribute.
    const buried=mode==='walk'&&!interior&&camera.position.y<walkHeight(camera.position.x,camera.position.z)-3.0;
    const renderLayer=shotLayer||mineLayer||(buried&&catacombDepth>0?2:buried&&castleDepth>0&&exteriorY<estate.y-8?1:0);
    const atMineMouth=mineLayer===3&&Math.hypot(camera.position.x-mine.portal.x,camera.position.z-mine.portal.z)<4.5;
    const mask=(1<<renderLayer)|(atMineMouth?1:0);
    if(camera.layers.mask!==mask){camera.layers.mask=mask;renderer.shadowMap.needsUpdate=true;}
    scene.background=renderLayer&&!atMineMouth?scene.fog.color:null;
    const viewport=renderer.getPixelRatio()*innerHeight;
    castle.tick(t,dt,camera.position,!!interior,night,w.gust,viewport,mode==='walk'&&!interior&&castleDepth>.9?exteriorY:null);
    catacomb.tick(t,camera.position,shotLayer===2);
    mine.tick(t,dt,camera.position,mode==='tour'?null:camera,mineLayer);
    const minePanel=el('minePanel');minePanel.hidden=!atMine;
    if(atMine){
      const cargo=describeCargo(mine.cart.cargo);
      const tools=mine.state.forge.tools,pick=tools.masterPick?'Master pick':tools.ironPick?'Iron pick':'Mining pick';
      const summary='Cart '+mine.cart.load+'/'+mine.cart.capacity+(cargo?' ('+cargo+')':'')+' · Delivered '+mine.state.delivered+' · '+pick;
      if(el('mineCargo').textContent!==summary)el('mineCargo').textContent=summary;
      const cart=mine.cart.pose,cartFar=Math.hypot(cart.x-camera.position.x,cart.z-camera.position.z,cart.y-exteriorY)>7;
      let task=cartFar?'The cart is at '+mine.area(cart.x,cart.z,cart.y)+'.':'Work a vein with the cart nearby. Unload beside Brook Armory.';
      if(mine.cart.mounted){
        task=padInput.connected?'Left stick forward to town or back toward the mine.':'W / ↑ toward the blacksmith. S / ↓ toward the minehead.';
        const seam=mine.state.veins.find(v=>v.remaining>0&&Math.abs(v.progress-mine.cart.progress)<.023);
        if(seam){
          const distance=Math.hypot(seam.x-cart.x,seam.z-cart.z,seam.y-cart.y);
          const name=seam.ore[0].toUpperCase()+seam.ore.slice(1);
          task=distance<4?name+' vein within reach. Dismount to mine.':name+' vein · '+Math.round(distance)+' m';
        }
      }
      if(el('mineHint').textContent!==task)el('mineHint').textContent=task;
      const notice=performance.now()<oreMessageUntil?oreMessage:'';
      if(el('mineMessage').textContent!==notice)el('mineMessage').textContent=notice;
    }
    air.sky.position.copy(camera.position);air.uniforms.clock.value=t;ambientMotion(t,dt,w);
    const player=mode==='walk'&&!interior&&!vehicle.mounted?camera.position:null;
    tickWheel(dt,interior?null:camera.position);village.tick(t,w.gust,drive.gate);birds.visible=night<.6&&w.rain<.36;
    if(!interior&&camera.position.x<-22)farmScene.tick(t,dt,w.gust,player);
    const paused=smithy.open||guide.open||conversation.open||controllerMenu.open||!placeMenu.hidden||!document.hasFocus();
    updateFarmPanel();lakeScene.tick(dt,t,w,mode==='walk'&&!interior&&!vehicle.mounted,paused);
    hunting.tick(dt,mode==='walk'&&!interior&&!mineLayer&&!mine.cart.mounted&&!vehicle.mounted&&!lakeScene.boat.aboard&&Math.abs(exteriorY-walkHeight(camera.position.x,camera.position.z))<.75,paused);
    const nearActors=vehicle.mounted||hunting.active||inFarm(camera.position.x,camera.position.z)||atLake(camera.position.x,camera.position.z);
    const shadowInterval=nearActors ? .24 : .65;
    if(!paused&&!interior&&!depth&&t-shadowRefresh>shadowInterval){renderer.shadowMap.needsUpdate=true;shadowRefresh=t;}
    footprints.tick(dt,w,mode==='walk'&&!interior&&!mineLayer?camera.position:null);animateFires(scene,t);
    if(!interior)stepSmoke(scene,dt,t,w.gust,camera.position,viewport,night);
    const castleRoom=observingWorld&&castle.nearby(camera.position.x,camera.position.z)?castle.area(camera.position.x,camera.position.z,floor):'';
    const sheltered=depth>.36||catacombDepth>.08||(castleRoom&&!['Thornmere Castle','Castle courtyard','Battlements','Gatehouse'].includes(castleRoom))||!!player&&farmSheltered(player.x,player.z);
    tickWeatherEffects(camera.position,dt,w,!!interior||sheltered,mode==='walk');
    if(interior){
      interior.light(night,w.cloud,w.flash);interior.animate(t,hour,drive);
      stepSmoke(interior.scene,dt,t,0,camera.position,viewport,night);
      if(!Number.isFinite(windowHour)||((Math.abs(windowHour-hour)>.035||Math.abs(windowCloud-w.cloud)>.11)&&now-lastCapture>700)){
        captureWindows(interior);windowHour=hour;windowCloud=w.cloud;lastCapture=now;renderer.shadowMap.needsUpdate=true;
      }
      leaves.tick(t,dt,w.gust,camera.position,camera.position,interior,w.windX,w.windZ);
      renderer.render(interior.scene,camera);
    }else{leaves.tick(t,dt,w.gust,camera.position,player,null,w.windX,w.windZ);
      const moat=castle.nearby(camera.position.x,camera.position.z);
      const nearLake=atLake(camera.position.x,camera.position.z);
      if(!depth){
        const byBrook=Math.abs(camera.position.x-riverX(camera.position.z))<13&&Math.abs(camera.position.z)<55;
        const level=nearLake?lake.level:moat?estate.y-1.48:byBrook?brookStage(camera.position.z):rainwater.mirrorHeight(camera.position.x,camera.position.z);
        if(level!==null)reflectWater(camera,t,level,rainwater.mesh);
      }
      renderer.render(scene,camera);}
    if(!drawn){el('loading').hidden=true;drawn=true;}
  });
}
try{start();}catch(e){console.error(e);el('loading').textContent='The village could not open. Enable WebGL 2 or hardware acceleration in your browser and reload.';}
