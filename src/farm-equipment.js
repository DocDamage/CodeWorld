import * as T from 'three';
import {Builder,v,tint,TAU} from './model.js';
import {farm,farmHeight,farmClear,inFarm} from './farm-layout.js';
import {tractorPoint,stepTractor,followHitch} from './farm-driving.js';

const olive='#4b5541',steel='#626766',frame='#393c38',rubber='#252824',wood='#65513d';

function wheel(root,x,z,r,width,hubPaint){
  const knuckle=new T.Group();knuckle.position.set(x,r,z);root.add(knuckle);
  const axle=new T.Group();knuckle.add(axle);const b=new Builder(axle);
  const tyre=new T.Mesh(new T.TorusGeometry(r*.77,r*.285,9,30).rotateY(Math.PI/2),new T.MeshStandardMaterial({color:rubber,roughness:.92}));
  tyre.scale.x=width/(r*.57);tyre.castShadow=true;tyre.receiveShadow=true;axle.add(tyre);
  for(let i=0;i<25;i++){
    const a=i*TAU/25,yy=Math.sin(a)*r*.986,zz=Math.cos(a)*r*.986;
    for(const side of [-1,1])b.put('box',tint('#2e302a',.11),side*width*.20,yy,zz,width*.60,.037,r*.21,-a+Math.PI/2,side*.37);
  }
  b.put('cyl',hubPaint,0,0,0,r*1.20,width*1.04,r*1.20,0,0,Math.PI/2);
  for(const side of [-1,1]){
    b.put('cyl',steel,side*width*.58,0,0,r*.48,width*.18,r*.48,0,0,Math.PI/2);
    for(let i=0;i<5;i++)b.put('cyl','#8a8170',side*width*.63,Math.sin(i*TAU/5)*r*.25,Math.cos(i*TAU/5)*r*.25,.052,.057,.052,0,0,Math.PI/2);
  }
  b.finish();return {knuckle,axle,r};
}

function tractorModel(root){
  const b=new Builder(root);
  b.put('box',frame,0,.62,-.15,1.17,.26,2.17,0,0,0,'iron');
  b.put('box','#69725a',0,1.045,-.66,.94,.57,1.58,0,0,0,'iron');
  b.put('paver','#5f694f',0,1.34,-.66,1.013,.14,1.66,0,0,0,'iron');
  b.put('box','#383e39',0,1,-1.49,.79,.53,.057);
  for(let i=-5;i<=5;i++)b.put('box',steel,i*.063,1.022,-1.525,.019,.47,.035);
  for(const x of [-.48,.48]){
    b.put('box','#72745e',x,1.15,-.73,.038,.063,1.39);b.put('box',steel,x*.99,.91,-.73,.033,.033,1.07);
    b.put('cyl','#7c7b67',x,1.20,-1.38,.23,.16,.23,Math.PI/2);
    b.put('cyl','#aaa693',x,1.20,-1.46,.18,.027,.18,Math.PI/2,0,0,'glass');
    for(let j=0;j<6;j++)b.put('box','#384039',x*1.02,1.01,-.99+j*.13,.034,.064,.067,.12,0,.04);
    b.put('box',frame,x*1.42,.54,.32,.47,.094,.56);
    for(let i=0;i<6;i++){
      const a=-1.12+i*.447;b.put('box',olive,x*1.65,Math.cos(a)*.72+.65,Math.sin(a)*.72+.66,.43,.073,.37,a,0,0,'iron');
    }
  }
  b.put('box','#444438',0,.92,.71,.60,.11,.46,0,0,0,'wood');
  b.put('box','#514c3d',0,1.089,.93,.61,.31,.08,-.19);
  b.put('box',olive,0,1.02,.095,.59,.36,.20,-.19);
  b.put('disk','#887f61',.11,1.18,.194,.092,.024,.092,Math.PI*.43);
  b.beam(frame,v(0,.91,.03),v(0,1.34,.41),.044,.043,'cyl');
  b.put('ring','#292c29',0,1.36,.42,.365,.365,.62,-.99);
  b.put('cyl',frame,.27,1.55,-.83,.091,.65,.091);
  b.put('cyl','#737269',.27,1.86,-.83,.117,.048,.117);
  b.put('cyl',steel,0,.56,1.53,.13,.41,.13,Math.PI/2);
  b.put('ring',steel,0,.53,1.72,.22,.22,.78,Math.PI/2);b.finish();

  const wheels=[];
  for(const side of [-1,1]){
    wheels.push(wheel(root,side*.77,.69,.66,.42,'#777359'));
    const front=wheel(root,side*.63,-1.06,.43,.25,'#756c51');front.front=true;wheels.push(front);
  }
  const plow=new T.Group();plow.position.set(0,.39,1.23);root.add(plow);const p=new Builder(plow);
  for(const x of [-.38,.38])p.beam('#747065',v(0,.2,0),v(x,0,1.17),.07,.09);
  p.beam(frame,v(-.83,0,1.06),v(.83,0,1.06),.101,.11);
  for(const x of [-.55,0,.55]){
    p.beam('#595c52',v(x,.03,1.03),v(x+.08,-.21,1.44),.083,.08);
    p.put('paver','#818380',x+.11,-.23,1.43,.42,.064,.53,-.18,.31,-.47);
  }
  p.beam('#666e61',v(.31,.16,.16),v(.43,.24,1.4),.062,.062,'cyl');p.finish();
  return {wheels,plow};
}

function wagonModel(root){
  const b=new Builder(root);
  for(let i=0;i<12;i++)b.put('box',tint(wood,.19),0,.79,(i-5.5)*.28,2.03,.11,.269,0,0,0,'wood');
  for(const x of [-.91,.91]){
    b.put('box','#4f4436',x,.685,0,.16,.21,3.53,0,0,0,'wood');
    for(const z of [-1.61,0,1.61])b.put('box','#4b4337',x,1.07,z,.13,.68,.11,0,0,0,'wood');
    for(const y of [.94,1.31])b.put('box',tint(wood),x,y,0,.097,.19,3.51,0,0,0,'wood');
    b.beam('#4f5047',v(x*.76,.62,-1.53),v(0,.51,-2.65),.105);
  }
  b.put('box',wood,0,1.03,1.68,2.02,.41,.11,0,0,0,'wood');b.finish();
  const wheels=[];
  for(const side of [-1,1])for(const z of [-.99,.99])wheels.push(wheel(root,side*1.10,z,.43,.17,'#726750'));
  const cargo=new T.Group();root.add(cargo);const crates=[];
  for(let i=0;i<8;i++){
    const crate=new T.Group();crate.position.set((i%2-.5)*.95,.84+(i>=6?.43:0),((i/2|0)%3-1)*.96);cargo.add(crate);
    const cb=new Builder(crate);cb.put('box',tint('#7f6a4d',.16),0,.215,0,.82,.43,.72,0,0,0,'wood');
    for(const x of [-.34,.34])cb.put('box','#514839',x,.22,.367,.078,.44,.051,0,0,0,'wood');
    for(const z of [-.26,.26])cb.put('box','#62543e',0,.445,z,.86,.054,.082,0,0,0,'wood');
    cb.finish();crate.visible=false;crates.push(crate);
  }
  return {wheels,crates};
}

function fits(pose,halfWidth,minBack,maxBack,clear){
  for(const side of [-halfWidth,0,halfWidth])for(let back=minBack;back<=maxBack+.001;back+=(maxBack-minBack)/4){
    const p=tractorPoint(pose,side,back);if(!clear(p.x,p.z))return false;
  }
  return true;
}

function overlaps(pose,x,z,halfWidth,minBack,maxBack){
  const dx=x-pose.x,dz=z-pose.z,c=Math.cos(pose.yaw),s=Math.sin(pose.yaw),back=dx*s+dz*c;
  return Math.abs(dx*c-dz*s)<halfWidth&&back>minBack&&back<maxBack;
}

export function buildFarmEquipment(root){
  const tractorGroup=new T.Group(),wagonGroup=new T.Group();root.add(tractorGroup,wagonGroup);
  const tractor=tractorModel(tractorGroup),trailer=wagonModel(wagonGroup);
  let pose={x:-67.45,z:28.6,yaw:0,speed:0},wagon={x:-67.45,z:33.57,yaw:0};
  let mounted=false,plowing=false,hitched=false,plowAngle=-.40,wheelTurn=0,wagonTurn=0,steering=0;
  const staticClear=(x,z)=>inFarm(x,z)&&farmClear(x,z);
  const tractorBlocks=(x,z)=>overlaps(pose,x,z,1.12,-1.72,plowing?2.81:1.83);
  const wagonBlocks=(x,z)=>overlaps(wagon,x,z,1.29,-1.88,1.88);
  function canHitch(){
    const coupling=tractorPoint(wagon,0,-2.65),hitch=tractorPoint(pose,0,1.72);
    return Math.abs(pose.speed)<.65&&!plowing&&Math.hypot(coupling.x-hitch.x,coupling.z-hitch.z)<1.05&&Math.cos(pose.yaw-wagon.yaw)>.50;
  }
  function updateModels(dt,cargo){
    tractorGroup.position.set(pose.x,farmHeight(pose.x,pose.z),pose.z);tractorGroup.rotation.y=pose.yaw;
    wagonGroup.position.set(wagon.x,farmHeight(wagon.x,wagon.z),wagon.z);wagonGroup.rotation.y=wagon.yaw;
    const target=plowing?0:-.43;plowAngle+= (target-plowAngle)*(dt?1-Math.exp(-dt*8):1);
    tractor.plow.rotation.x=plowAngle;tractor.plow.visible=!hitched;
    for(const wheel of tractor.wheels){wheel.axle.rotation.x=-wheelTurn/wheel.r;if(wheel.front)wheel.knuckle.rotation.y=-steering*.47;}
    for(const wheel of trailer.wheels)wheel.axle.rotation.x=-wagonTurn/wheel.r;
    trailer.crates.forEach((item,i)=>item.visible=i<Math.ceil(cargo/4));
  }
  updateModels(0,0);
  return {
    get mounted(){return mounted;},get plowing(){return plowing;},get hitched(){return hitched;},
    get pose(){return pose;},get wagon(){return wagon;},
    nearTractor(x,z){return Math.hypot(x-pose.x,z-pose.z)<2.20;},
    nearWagon(x,z){return Math.hypot(x-wagon.x,z-wagon.z)<2.38;},
    blocks(x,z,radius=0){return overlaps(pose,x,z,1.12+radius,-1.72-radius,(plowing?2.81:1.83)+radius)||
      overlaps(wagon,x,z,1.29+radius,-1.88-radius,1.88+radius);},
    clear(x,z){return farmClear(x,z)&&!tractorBlocks(x,z)&&!wagonBlocks(x,z);},
    mount(){mounted=true;pose={...pose,speed:0};},
    dismount(relocate=false){
      pose={...pose,speed:0};steering=0;
      const exits=[[1.55,.18],[-1.55,.18],[0,-2.11],[1.62,-1.02],[-1.62,-1.02],[1.50,1.56],[-1.50,1.56],[0,plowing?3.06:2.21]];
      const spot=exits.map(([side,back])=>tractorPoint(pose,side,back)).find(p=>staticClear(p.x,p.z)&&!tractorBlocks(p.x,p.z)&&!wagonBlocks(p.x,p.z));
      if(!spot&&!relocate)return null;
      mounted=false;return {...(spot??farm.entry),yaw:pose.yaw};
    },
    togglePlow(){
      if(hitched||!plowing&&!fits(pose,.83,1.63,2.82,(x,z)=>staticClear(x,z)&&!wagonBlocks(x,z)))return null;
      plowing=!plowing;return plowing;
    },
    hitchLabel(){return !mounted?'':hitched&&Math.abs(pose.speed)<.65?'Unhitch wagon':canHitch()?'Hitch wagon':'';},
    toggleHitch(){
      if(!mounted||Math.abs(pose.speed)>=.65)return false;
      if(hitched){hitched=false;return true;}
      if(!canHitch())return false;
      const next=followHitch(pose,wagon);
      if(!fits(next,1.23,-1.8,1.82,staticClear))return false;
      wagon=next;hitched=true;return true;
    },
    drive(dt,throttle,steer,cargo){
      if(!mounted)return;
      steering+=(Math.max(-1,Math.min(1,steer))-steering)*(1-Math.exp(-dt*7));
      const old=pose,previousWagon=wagon;
      pose=stepTractor(pose,throttle,steering,dt,(x,z,yaw)=>{
        const candidate={x,z,yaw};
        const limits=(xx,zz)=>staticClear(xx,zz)&&(hitched||!wagonBlocks(xx,zz));
        if(!fits(candidate,.96,-1.55,plowing?2.83:1.64,limits))return false;
        return !hitched||fits(followHitch(candidate,wagon),1.23,-1.8,1.82,staticClear);
      },plowing);
      wheelTurn+=Math.sign(pose.speed)*Math.hypot(pose.x-old.x,pose.z-old.z);
      if(hitched){wagon=followHitch(pose,wagon);wagonTurn+=Math.sign(pose.speed)*Math.hypot(wagon.x-previousWagon.x,wagon.z-previousWagon.z);}
      updateModels(dt,cargo);
      return plowing&&Math.abs(pose.speed)>.40?tractorPoint(pose,0,2.53):null;
    },
    update(dt,cargo){updateModels(dt,cargo);}
  };
}
