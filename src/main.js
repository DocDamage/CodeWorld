import * as T from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Builder,glass,v,range,TAU } from './model.js';
import { terrain,grass,bridge,plots,height,smooth,walkable,walkHeight,doorstep } from './land.js';
import { buildings,moving,chimneys,lamps,clockHands } from './houses.js';
import { makeRoom,makeWindowViews } from './rooms.js';
import { estate,trailhead,trailYaw,trailDistance } from './estate.js';
import { buildWoodland } from './woodland.js';
import { buildCastle } from './castle.js';
import { atmosphere,plantValley } from './valley.js';

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
  renderer.setPixelRatio(Math.min(devicePixelRatio,1.65));renderer.shadowMap.enabled=true;
  renderer.shadowMap.type=T.PCFSoftShadowMap;renderer.shadowMap.autoUpdate=false;renderer.shadowMap.needsUpdate=true;
  el('view').appendChild(renderer.domElement);const canvas=renderer.domElement;
  canvas.setAttribute('aria-label','Briarwick village view');canvas.tabIndex=0;
  scene.fog=new T.FogExp2('#dce6d7',.0125);
  const hemi=new T.HemisphereLight('#fff4dc','#8c9b73',1.55);scene.add(hemi);
  const sun=new T.DirectionalLight('#fff0ce',2.05);scene.add(sun);sun.position.set(-24,38,19);
  scene.add(sun.target);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);const sc=sun.shadow.camera;
  sc.left=-33;sc.right=33;sc.top=34;sc.bottom=-32;sc.near=.5;sc.far=112;sun.shadow.normalBias=.035;sun.shadow.bias=-.00022;
  const air=atmosphere(scene),b=new Builder(scene);
  terrain(scene,b);buildings(scene,b);bridge(b);plantValley(scene,b);grass(scene);b.finish();
  const treesClear=buildWoodland(scene),castle=buildCastle(scene,air.waterMaterial);
  const homePos=v(11.7,11.2,36),homeTarget=v(-1.2,4.6,-1.4);
  const orbit=new OrbitControls(camera,canvas);orbit.enablePan=false;orbit.enableDamping=true;orbit.dampingFactor=.095;orbit.minDistance=4;orbit.maxDistance=53;orbit.minPolarAngle=.3;orbit.maxPolarAngle=Math.PI*.485;
  camera.position.copy(homePos);orbit.target.copy(homeTarget);orbit.update();

  // A soft radial sprite lets the chimney wisps and lanterns fade without hard edges.
  const cv=document.createElement('canvas');cv.width=cv.height=64;const cx=cv.getContext('2d');
  const grad=cx.createRadialGradient(32,32,0,32,32,32);grad.addColorStop(0,'white');grad.addColorStop(.35,'rgba(255,255,255,.65)');grad.addColorStop(1,'rgba(255,255,255,0)');cx.fillStyle=grad;cx.fillRect(0,0,64,64);
  const soft=new T.CanvasTexture(cv);
  const smokeCount=chimneys.length*10,smokeP=new Float32Array(smokeCount*3);
  const smokeG=new T.BufferGeometry();smokeG.setAttribute('position',new T.BufferAttribute(smokeP,3));
  const smokeMat=new T.PointsMaterial({map:soft,color:'#ded8cf',size:.85,transparent:true,opacity:.27,depthWrite:false});
  const smoke=new T.Points(smokeG,smokeMat);smoke.frustumCulled=false;scene.add(smoke);
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
  function ambientMotion(t) {
    for(const m of moving)m.hub.rotation[m.axis]=t*m.speed;
    for(let i=0;i<smokeCount;i++){const p=chimneys[Math.floor(i/10)],f=(i%10*.1+t*.13)%1;
      smokeP[i*3]=p.x+f*f*.88+.07*Math.sin(f*12+i);smokeP[i*3+1]=p.y+f*2.2;smokeP[i*3+2]=p.z+f*.2+.07*Math.cos(f*8+i);}
    smokeG.attributes.position.needsUpdate=true;
    for(let i=0;i<9;i++){const a=t*.048+i*.21,x=-1+Math.cos(a)*12+i*.8,z=-24+Math.sin(a)*6+i*.78,y=13+Math.sin(a*2.3+i)*.58,flap=Math.sin(t*4.5+i*2)*.13+.07;
      birdPos.set([x-.28,y+flap,z,x,y,z+.05,x,y,z+.05,x+.28,y+flap,z],i*12);}
    birdG.attributes.position.needsUpdate=true;
  }
  const daysky=new T.Color('#f2f6ff'),nightsky=new T.Color('#9eb5dc'),dayground=new T.Color('#8c9e73'),nightground=new T.Color('#536077'),sunDay=new T.Color('#fff3df'),sunDusk=new T.Color('#ffb174'),sunNight=new T.Color('#a6bee1'),fogDay=new T.Color('#d8e4d3'),fogDusk=new T.Color('#ddb894'),fogNight=new T.Color('#485671');
  const vaultFog=new T.Color('#3b3640');
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
    smokeMat.opacity=.23-night*.10;birds.visible=night<.6;el('hour').value=hour;
    const mins=Math.floor(hour*60+.001);el('time').textContent=String(Math.floor(mins/60)).padStart(2,'0')+':'+String(mins%60).padStart(2,'0');
    el('phase').textContent=night>.78?'Nightfall':hour<8.2?'Dawn':hour>=17.4?'Dusk':'Daylight';
    document.querySelectorAll('[data-hour]').forEach(n=>n.classList.toggle('chosen',Math.abs(+n.dataset.hour-hour)<.15));
  }
  light(12);
  let mode='orbit',flight=null,tourTime=0,yaw=0,pitch=0,drag=null,lastWalk=null;
  const keys=new Set(),rooms=new Map();
  const castlePlace={id:'castle',name:'Thornmere Castle'};
  const castleWalk=()=>enterWalk(estate.x,estate.z+43,0,.12);
  const captureWindows=makeWindowViews(renderer,scene,air.sky);
  let exteriorY=0,bridgeAction='',interior=null,floorY=0,doorPlot=null,landmark=null,lastCapture=0,windowHour=NaN;
  const doorButton=el('doorAction'),roomName=el('roomName');
  function setPose(x,y,z,angle,tilt){
    camera.position.set(x,y,z);yaw=angle;pitch=tilt;camera.rotation.set(pitch,yaw,0,'YXZ');
  }
  function leaveInterior(){
    if(!interior)return;
    const p=interior.plot,at=doorstep(p,1.2);
    interior=null;resize();floorY=0;roomName.hidden=true;roomName.textContent='';doorButton.hidden=true;
    keys.clear();drag=null;exteriorY=walkHeight(at.x,at.z);setPose(at.x,exteriorY+1.57,at.z,p.a+Math.PI,0);
    renderer.shadowMap.needsUpdate=true;
  }
  function enterInterior(p){
    if(!rooms.has(p.id))rooms.set(p.id,makeRoom(p));
    interior=rooms.get(p.id);resize();floorY=0;roomName.hidden=false;roomName.textContent=p.name;
    keys.clear();drag=null;doorPlot=null;doorButton.hidden=true;
    setPose(0,1.57,3.54,.135,.075);windowHour=NaN;
    renderer.shadowMap.needsUpdate=true;canvas.focus({preventScroll:true});
  }
  function useDoor(){
    if(doorButton.hidden)return;
    if(bridgeAction){castle.bridge.toggle();checkDoor(false);}
    else if(interior)leaveInterior();
    else if(doorPlot){
      const destination=doorPlot;
      if(destination===castlePlace)castleWalk();
      else {if(mode!=='walk')modeUI('walk');enterInterior(destination);}
    }
    canvas.focus({preventScroll:true});
  }
  doorButton.onclick=useDoor;
  doorButton.onpointerup=e=>{
    if(e.pointerType==='touch'&&e.isPrimary&&doorButton.contains(document.elementFromPoint(e.clientX,e.clientY)))useDoor();
  };
  function checkDoor(moving){
    let label='';bridgeAction='';
    if(mode!=='walk'){
      doorPlot=mode==='orbit'&&!flight?landmark:null;
      if(doorPlot)label=doorPlot===castlePlace?'Walk to the castle gate':'Enter '+doorPlot.name;
    }else if(interior){
      doorPlot=null;
      const atDoor=floorY<.15&&Math.abs(camera.position.x)<.96&&camera.position.z>2.36&&Math.cos(yaw)<-.18;
      if(atDoor){label='Step outside';if(moving&&Math.abs(camera.position.x)<.61&&camera.position.z>3.63){leaveInterior();return;}}
    }else{
      doorPlot=null;
      if(castle.nearby(camera.position.x,camera.position.z)){
        bridgeAction=castle.bridge.action(camera.position.x-estate.x,camera.position.z-estate.z,exteriorY-estate.y);
        label=bridgeAction;
      }
      for(const p of plots){
        const door=doorstep(p,0),dx=camera.position.x-door.x,dz=camera.position.z-door.z;
        const across=dx*Math.cos(p.a)-dz*Math.sin(p.a),inFront=dx*Math.sin(p.a)+dz*Math.cos(p.a);
        if(Math.abs(across)>.98||inFront<-.13||inFront>1.92||Math.cos(yaw-p.a)<.12)continue;
        doorPlot=p;label='Enter '+p.name;
        if(moving&&Math.abs(across)<.53&&inFront<.39){enterInterior(p);return;}break;
      }
    }
    doorButton.hidden=!label;
    if(label&&doorButton.lastElementChild.textContent!==label)doorButton.lastElementChild.textContent=label;
  }
  const path=new T.CatmullRomCurve3([homePos,v(-5,10,29),v(-17,10,18),v(-8,13,27),v(9,10,23),v(19,13,24),homePos],false);
  const targets=new T.CatmullRomCurve3([homeTarget,v(-2,4,-2),v(-1,3.6,1),v(1,4,-4),v(-1,4.2,0),v(-2,4.7,-2),homeTarget],false);
  function modeUI(next){
    leaveInterior();orbit.maxDistance=53;landmark=null;doorPlot=null;bridgeAction='';doorButton.hidden=true;roomName.hidden=true;
    mode=next;orbit.enabled=next==='orbit';keys.clear();drag=null;flight=null;
    el('tour').setAttribute('aria-pressed',next==='tour');el('walk').setAttribute('aria-pressed',next==='walk');
    el('tour').querySelector('i').innerHTML=svg(next==='tour'?'stop':'play');
    el('tour').querySelector('span').textContent=next==='tour'?'Stop':'Tour';
    el('pad').hidden=next!=='walk'||!matchMedia('(pointer: coarse)').matches;
    el('hint').innerHTML=next==='walk'?'WASD to walk <span>·</span> Drag to look':next==='tour'?'Village tour <span>·</span> Esc to leave':'Drag to orbit <span>·</span> Scroll to zoom';
  }
  function fly(pos,target,duration=1.15){
    orbit.update();flight={from:camera.position.clone(),aim:orbit.target.clone(),pos,target,elapsed:0,duration};
  }
  function overlook(reset=false){
    leaveInterior();
    if(mode==='walk'){lastWalk={x:camera.position.x,z:camera.position.z,yaw,pitch,y:exteriorY};orbit.target.copy(camera.position).add(camera.getWorldDirection(v(0,0,0)).multiplyScalar(6));}
    modeUI('orbit');if(reset)fly(homePos,homeTarget);else orbit.update();
  }
  function enterWalk(x=1.5,z=14.1,a=.10,p=.035){
    modeUI('walk');exteriorY=walkHeight(x,z);camera.position.set(x,exteriorY+1.57,z);yaw=a;pitch=p;camera.rotation.order='YXZ';camera.rotation.set(pitch,yaw,0);canvas.focus({preventScroll:true});
  }
  el('walk').onclick=()=>{closePlaces();if(mode==='walk')overlook(true);else if(landmark===castlePlace)castleWalk();else if(landmark){const p=landmark,at=doorstep(p,1.5);enterWalk(at.x,at.z,p.a,0);}else if(lastWalk){enterWalk(lastWalk.x,lastWalk.z,lastWalk.yaw,lastWalk.pitch);exteriorY=lastWalk.y;camera.position.y=exteriorY+1.57;}else enterWalk();};
  el('tour').onclick=()=>{closePlaces();if(mode==='tour'){overlook();return;}desiredHour=null;modeUI('tour');tourTime=0;light(12);};
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
      if(mode!=='orbit')overlook();const dist=p.id==='wind'||p.id==='tower'?11:8.5;
      const pos=v(p.x+Math.sin(p.a+.45)*dist,p.y+4.4,p.z+Math.cos(p.a+.45)*dist);
      pos.y=Math.max(pos.y,height(pos.x,pos.z)+2.0);landmark=p;fly(pos,target);
    };el('placeList').append(btn);
  }
  const entrances=new Map();
  for(const [name,x,z,a,tilt] of [['Woodland trail',trailhead.x,trailhead.z,trailYaw,0],['Thornmere Castle',estate.x,estate.z+41,0,.10]]){
    const btn=document.createElement('button');btn.textContent=name;
    btn.onclick=()=>{
      closePlaces();
      if(name===castlePlace.name&&mode!=='walk'){
        modeUI('orbit');orbit.maxDistance=100;landmark=castlePlace;
        fly(v(estate.x+25,estate.y+23,estate.z+58),v(estate.x,estate.y+4.3,estate.z+1),1.55);
      }else enterWalk(x,z,a,tilt);
    };
    entrances.set(name===castlePlace.name?'#thornmere-castle':'#woodland-trail',btn.onclick);
    el('placeList').append(btn);
  }
  el('places').onclick=()=>{const open=el('placeList').hidden;el('placeList').hidden=!open;el('places').setAttribute('aria-expanded',open);};
  document.addEventListener('pointerdown',e=>{if(!e.target.closest('.dock'))closePlaces();});
  const guide=el('guide');el('help').onclick=()=>guide.showModal();el('closeHelp').onclick=()=>guide.close();
  function hideUI(){const hidden=document.body.classList.toggle('clean');el('show').hidden=!hidden;closePlaces();}
  el('hide').onclick=el('show').onclick=hideUI;
  const movement=new Set(['KeyW','KeyA','KeyS','KeyD','ArrowUp','ArrowLeft','ArrowDown','ArrowRight','ShiftLeft','ShiftRight']);
  window.addEventListener('keydown',e=>{
    if(guide.open||e.ctrlKey||e.altKey||e.metaKey)return;
    if(e.code==='KeyH'&&!e.repeat){hideUI();return;}
    if(e.code==='Escape'){if(!el('placeList').hidden)closePlaces();else if(interior)leaveInterior();else if(mode!=='orbit')overlook(true);return;}
    if(e.code==='KeyE'&&!doorButton.hidden&&!e.repeat){e.preventDefault();useDoor();return;}
    if(mode==='walk'&&movement.has(e.code)&&e.target.tagName!=='INPUT'){e.preventDefault();keys.add(e.code);}
  });
  window.addEventListener('keyup',e=>keys.delete(e.code));window.addEventListener('blur',()=>keys.clear());
  canvas.addEventListener('pointerdown',e=>{if(mode==='walk'){drag={id:e.pointerId,x:e.clientX,y:e.clientY};canvas.setPointerCapture(e.pointerId);}});
  canvas.addEventListener('pointermove',e=>{if(drag?.id!==e.pointerId)return;
    yaw-=(e.clientX-drag.x)*.004;pitch=T.MathUtils.clamp(pitch-(e.clientY-drag.y)*.004,-1.22,1.24);drag.x=e.clientX;drag.y=e.clientY;camera.rotation.set(pitch,yaw,0);});
  for(const type of ['pointerup','pointercancel','lostpointercapture'])canvas.addEventListener(type,()=>drag=null);
  document.querySelectorAll('[data-key]').forEach(n=>{n.onpointerdown=e=>{e.preventDefault();keys.add(n.dataset.key);n.setPointerCapture(e.pointerId);};n.onpointerup=n.onpointercancel=n.onlostpointercapture=()=>keys.delete(n.dataset.key);});
  function walkStep(dt){const f=Number(keys.has('KeyW')||keys.has('ArrowUp'))-Number(keys.has('KeyS')||keys.has('ArrowDown'));
    const s=Number(keys.has('KeyD')||keys.has('ArrowRight'))-Number(keys.has('KeyA')||keys.has('ArrowLeft'));
    const speed=(keys.has('ShiftLeft')||keys.has('ShiftRight')?4.2:2.55)*dt/Math.max(1,Math.hypot(f,s));
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
      if(castle.nearby(xx,zz))return castle.next(xx,zz,exteriorY,ground);
      return walkable(xx,zz)&&treesClear(xx,zz)?ground:null;
    };
    const dx=x-camera.position.x,dz=z-camera.position.z,n=Math.max(1,Math.ceil(Math.hypot(dx,dz)/.12));
    for(let i=0;i<n;i++){
      if(dx){const xx=camera.position.x+dx/n,h=outdoorStep(xx,camera.position.z);if(h!==null){camera.position.x=xx;exteriorY=h;}}
      if(dz){const zz=camera.position.z+dz/n,h=outdoorStep(camera.position.x,zz);if(h!==null){camera.position.z=zz;exteriorY=h;}}
    }
    camera.position.y=T.MathUtils.lerp(camera.position.y,exteriorY+1.57,1-Math.exp(-dt*15));
    const xx=camera.position.x,zz=camera.position.z;
    const place=castle.nearby(xx,zz)?castle.area(xx,zz,exteriorY):xx>16&&trailDistance(xx,zz)<8?'Pinewood Way':'';
    roomName.hidden=!place;if(roomName.textContent!==place)roomName.textContent=place;
    checkDoor(f>0);
  }
  function resize(){renderer.setSize(innerWidth,innerHeight);camera.aspect=innerWidth/innerHeight;camera.fov=interior?(innerWidth<innerHeight?78:68):(innerWidth<innerHeight?59:46);camera.updateProjectionMatrix();}
  window.addEventListener('resize',resize);resize();
  const openEntrance=()=>entrances.get(location.hash)?.();
  window.addEventListener('hashchange',openEntrance);openEntrance();
  let t=0,previous=performance.now(),drawn=false;
  renderer.setAnimationLoop(now=>{
    const dt=Math.min(.1,Math.max(0,(now-previous)/1000));previous=now;if(document.hidden)return;t+=dt;
    if(mode==='tour'){
      tourTime=(tourTime+dt)%48;const u=tourTime/48;camera.position.copy(path.getPoint(u));orbit.target.copy(targets.getPoint(u));camera.lookAt(orbit.target);
      const h=u<.47?12+2*u: u<.76?13+10*smooth(.47,.76,u):23+13*smooth(.85,1,u);light(h);
    }else if(mode==='walk'){if(!guide.open)walkStep(dt);}
    else if(flight){
      flight.elapsed+=dt;const f=smooth(0,1,flight.elapsed/flight.duration);
      camera.position.lerpVectors(flight.from,flight.pos,f);orbit.target.lerpVectors(flight.aim,flight.target,f);orbit.update();if(f>=1)flight=null;
    }else orbit.update();
    if(mode==='orbit'){checkDoor(false);const floor=height(camera.position.x,camera.position.z)+.65;if(camera.position.y<floor){camera.position.y=floor;camera.lookAt(orbit.target);}}
    if(desiredHour!==null){const diff=((desiredHour-hour+36)%24)-12; if(Math.abs(diff)<.015){light(desiredHour);desiredHour=null;}else light(hour+diff*(1-Math.exp(-dt*4.3)));}
    // Follow the traveller with the shadow camera so trees, battlements and the keep cast shadows at either end of the road.
    const anchor=!interior&&mode==='walk'?camera.position:mode==='orbit'?orbit.target:homeTarget;
    const sx=Math.round(anchor.x/14)*14,sz=Math.round(anchor.z/14)*14;
    if(sun.target.position.x!==sx||sun.target.position.z!==sz){
      sun.position.x+=sx-sun.target.position.x;sun.position.z+=sz-sun.target.position.z;
      sun.target.position.set(sx,0,sz);renderer.shadowMap.needsUpdate=true;
    }
    const depth=mode==='walk'&&!interior&&castle.nearby(camera.position.x,camera.position.z)?smooth(.5,4.0,estate.y-exteriorY):0;
    const night=air.uniforms.night.value;
    sun.intensity=(2.03-night*1.77)*(1-depth*.94);hemi.intensity=(1.55-night*1.29)*(1-depth)+.69*depth;
    const distanceEast=smooth(28,86,anchor.x);
    scene.fog.density=.012-distanceEast*.004+night*.011+depth*.012;
    scene.fog.color.copy(fogDay).lerp(fogDusk,air.uniforms.dusk.value*.8).lerp(fogNight,night).lerp(vaultFog,depth);
    castle.tick(t,dt,camera.position,!!interior,night);
    air.sky.position.copy(camera.position);air.uniforms.clock.value=t;ambientMotion(t);
    if(interior){
      interior.light(air.uniforms.night.value);interior.animate(t,hour);
      if(!Number.isFinite(windowHour)||(Math.abs(windowHour-hour)>.015&&now-lastCapture>350)){
        captureWindows(interior);windowHour=hour;lastCapture=now;renderer.shadowMap.needsUpdate=true;
      }
      renderer.render(interior.scene,camera);
    }else renderer.render(scene,camera);
    if(!drawn){el('loading').hidden=true;drawn=true;}
  });
}
try{start();}catch(e){console.error(e);el('loading').textContent='The village could not open. Enable WebGL 2 or hardware acceleration in your browser and reload.';}
