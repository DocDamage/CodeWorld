import * as T from 'three';
import {Builder,label,tint,v} from './model.js';
import {
  MINE,MINE_ROUTE_LENGTH,MINE_PORTAL_PROGRESS,mineAt,mineFloor,mineLayer,mineLocation,mineNearby,
  minePoint,mineTangent,
} from './mine-layout.js';
import {METALS} from './smithing.js';
import {createMineState} from './mine-state.js';

const rail='#665f59',timber='#5c4431',rock='#4e4c49';

function routeSamples(from,to,spacing=1.42){
  const count=Math.ceil((to-from)*MINE_ROUTE_LENGTH/spacing);
  return Array.from({length:count+1},(_,index)=>minePoint(from+(to-from)*index/count));
}

function trackAndTunnel(root,from,to){
  const b=new Builder(root),points=routeSamples(from,to);
  for(let i=0;i<points.length-1;i++){
    const a=points[i],c=points[i+1],dx=c.x-a.x,dz=c.z-a.z,horizontal=Math.hypot(dx,dz)||1;
    const side={x:dz/horizontal,z:-dx/horizontal},mid={x:(a.x+c.x)/2,y:(a.y+c.y)/2,z:(a.z+c.z)/2};
    const yaw=Math.atan2(dx,dz),length=Math.hypot(dx,c.y-a.y,dz);
    b.put('box','#3f3e3c',mid.x,mid.y-.38,mid.z,4.26,.42,length+.24,0,yaw,0,'masonry');
    b.put('stone',tint(i%3?'#53514e':'#5b5752',.07),mid.x,mid.y-.27,mid.z,4.22,.52,length+.18,0,yaw,0,'stone');
    for(const edge of [-1,1]){
      const ax=a.x+side.x*edge*.63,az=a.z+side.z*edge*.63;
      const bx=c.x+side.x*edge*.63,bz=c.z+side.z*edge*.63;
      b.beam(rail,v(ax,a.y+.08,az),v(bx,c.y+.08,bz),.075,.075,'box','iron');
      b.put('box','#3b3a38',mid.x+side.x*edge*2.08,mid.y+1.20,mid.z+side.z*edge*2.08,
        .34,2.66,length+.34,0,yaw,0,'masonry');
      b.put('stone',tint(rock,.08),mid.x+side.x*edge*2.08,mid.y+1.20,mid.z+side.z*edge*2.08,
        1.16,2.52,length+.28,.08*Math.sin(i),yaw,.08*Math.cos(i*.7),'stone');
    }
    b.put('box','#393837',mid.x,mid.y+2.73,mid.z,4.42,.34,length+.32,0,yaw,0,'masonry');
    b.put('stone',tint('#464545',.06),mid.x,mid.y+2.72,mid.z,4.46,.62,length+.24,0,yaw,0,'stone');
    b.put('box',tint(timber,.09),mid.x,mid.y-.02,mid.z,1.82,.13,.23,0,yaw,0,'agedWood');
    if(i%9===2){
      for(const edge of [-1,1])b.put('box',timber,mid.x+side.x*edge*1.62,mid.y+1.23,mid.z+side.z*edge*1.62,.20,2.52,.20,0,yaw,0,'agedWood');
      b.put('box',timber,mid.x,mid.y+2.43,mid.z,3.48,.20,.22,0,yaw,0,'agedWood');
    }
  }
  b.finish();
}

function portal(root,point,title,yaw=0){
  const b=new Builder(root);
  b.group(point.x,point.y,point.z,yaw,()=>{
    for(const side of [-1,1]){
      b.put('stone','#777168',side*1.62,1.36,0,.72,2.72,.86,0,0,side*.035,'masonry');
      b.put('box','#3f3329',side*1.23,1.35,-.06,.20,2.70,.24,0,0,0,'agedWood');
    }
    b.put('stone','#716b64',0,2.73,0,3.92,.65,.92,0,0,0,'masonry');
    b.put('box','#3f3329',0,2.56,-.06,2.66,.21,.24,0,0,0,'agedWood');
    b.put('box','#47372b',0,2.96,.39,3.42,.44,.13,0,0,0,'agedWood');
    label(root,b,title,'#ead7a6',0,2.96,.48,3.15,.38);
  });
  b.finish();
}

const oreColors={iron:'#8e7160',copper:'#b66c43',tin:'#9ba2a0',silver:'#c3c7c1'};

function buildVeins(root,state){
  return state.veins.map(vein=>{
    const group=new T.Group();
    group.position.set(vein.x,vein.y,vein.z);
    root.add(group);const b=new Builder(group);
    const color=oreColors[vein.ore];
    for(let i=0;i<9;i++)b.put('stone',i%3?color:'#68615a',(i%3-1)*.28,(i%2)*.29,(Math.floor(i/3)-1)*.22,
      .38+(i%2)*.12,.34,.32,0,i*.7,0,i%3?'gilt':'stone');
    b.finish();return group;
  });
}

function buildCart(scene,state,oreMaterials){
  const root=new T.Group();scene.add(root);const b=new Builder(root);
  b.put('box','#4d3525',0,.48,0,1.55,.28,1.72,0,0,0,'agedWood');
  for(const side of [-1,1]){
    b.put('box','#664733',side*.73,.87,0,.13,.76,1.65,0,0,side*.09,'agedWood');
    for(const z of [-.61,.61])b.put('cyl','#34312f',side*.80,.31,z,.34,.18,.34,0,0,Math.PI/2,'iron');
  }
  for(const z of [-1,1])b.put('box','#60432f',0,.83,z*.78,1.45,.67,.13,z*.08,0,0,'agedWood');
  b.put('box','#807569',0,.17,0,1.68,.11,1.56,0,0,0,'iron');b.finish();
  const geometry=new T.DodecahedronGeometry(.24,0);
  const ore=[];
  for(let i=0;i<state.cart.capacity;i++){
    const piece=new T.Mesh(geometry,oreMaterials.iron);piece.position.set((i%3-1)*.38,.83+Math.floor(i/3)*.31,(i%2-.5)*.46);
    piece.rotation.set(i*.7,i*1.1,i*.37);piece.castShadow=true;root.add(piece);ore.push(piece);
  }
  root.traverse(object=>{object.layers.enable(2);object.layers.enable(3);});
  return {root,ore};
}

function buildYard(scene,oreMaterials){
  const root=new T.Group();scene.add(root);const b=new Builder(root);
  const a=MINE.portal,c=MINE.yard,length=c.z-a.z,mid=(a.z+c.z)/2;
  const tilt=Math.atan2(a.y-c.y,length);
  b.put('box','#55504a',a.x,(a.y+c.y)/2-.10,mid,2.18,.20,length+.16,tilt,0,0,'masonry');
  for(const x of [-.63,.63])b.beam(rail,v(a.x+x,a.y+.08,a.z),v(c.x+x,c.y+.08,c.z),.075,.075,'box','iron');
  for(let z=a.z+.18;z<c.z+.1;z+=.66)b.put('box',timber,a.x,a.y+(c.y-a.y)*(z-a.z)/length,z,1.78,.13,.22,tilt,0,0,'agedWood');
  portal(root,MINE.portal,'BRIARWICK MINE',0);
  b.group(MINE.yard.x,MINE.yard.y,MINE.yard.z+.62,0,()=>{
    for(const side of [-1,1])b.put('box','#54402f',side*1.65,1.38,0,.24,2.76,.24,0,0,0,'agedWood');
    b.put('box','#54402f',0,2.66,0,3.56,.25,.28,0,0,0,'agedWood');
    b.put('box','#353333',1.18,1.93,0,.08,1.32,.08,0,0,0,'iron');
    b.put('cyl','#373433',1.18,1.25,0,.35,.14,.35,Math.PI/2,0,0,'iron');
  });
  b.finish();
  const delivered=[];
  for(let i=0;i<12;i++){
    const pile=new T.Mesh(new T.DodecahedronGeometry(.27+(i%3)*.035,0),oreMaterials.iron);
    pile.position.set(MINE.yard.x+1.5+(i%4)*.31,MINE.yard.y+.20+Math.floor(i/4)*.25,MINE.yard.z+.4+(i%2)*.25);
    pile.castShadow=true;root.add(pile);delivered.push(pile);
  }
  return {root,delivered};
}

function buildPick(scene){
  const pick=new T.Group(),b=new Builder(pick);
  b.beam('#8b6441',v(0,-.38,0),v(0,.28,0),.037,.046,'box','agedWood');
  b.put('box','#605d55',0,.28,0,.11,.072,.074,0,0,0,'iron');
  for(const side of [-1,1]){
    b.beam('#716e68',v(side*.036,.28,0),v(side*.16,.267,0),.046,.047,'box','iron');
    b.beam('#716e68',v(side*.16,.267,0),v(side*.255,.209,0),.025,.028,'box','iron');
  }
  b.finish();
  const socket=new T.Group(),inlay=new T.Group();
  const collar=new Builder(socket),finish=new Builder(inlay);
  collar.put('box','#858b89',0,.21,0,.071,.14,.070,0,0,0,'iron');
  for(const side of [-1,1]){
    collar.beam('#919793',v(side*.18,.255,0),v(side*.29,.179,0),.032,.034,'box','iron');
    finish.beam('#c2c8bf',v(side*.09,.301,0),v(side*.183,.284,0),.021,.027,'box','gilt');
  }
  finish.put('box','#bcc4be',0,.125,0,.059,.023,.055,0,0,0,'gilt');
  collar.finish();finish.finish();pick.add(socket,inlay);
  pick.traverse(o=>{o.layers.enable(2);o.layers.enable(3);});
  pick.visible=false;scene.add(pick);return {pick,socket,inlay};
}

export function buildMine(scene,saved={}){
  const state=createMineState(saved),root=new T.Group();scene.add(root);
  const {pick,socket,inlay}=buildPick(scene),hand=new T.Vector3();let strike=0;
  const mouth=new T.Group(),mouthStart=MINE_PORTAL_PROGRESS-5/MINE_ROUTE_LENGTH;
  scene.add(mouth);
  // Seen from town, the covered drift recedes below the terrain behind the portal.
  const end=minePoint(mouthStart),shade=new T.Mesh(new T.PlaneGeometry(4.12,3),new T.MeshBasicMaterial({color:'#171615',side:T.DoubleSide}));
  shade.position.set(end.x,end.y+1.20,end.z);scene.add(shade);
  trackAndTunnel(mouth,mouthStart,MINE_PORTAL_PROGRESS);
  mouth.traverse(object=>object.layers.enable(3));
  trackAndTunnel(root,0,mouthStart);portal(root,MINE.entry,'NAMELESS MINE',Math.PI);
  const oreMaterials=Object.fromEntries(METALS.map(metal=>[metal,new T.MeshStandardMaterial({color:oreColors[metal],roughness:.82,metalness:.14})]));
  const veinRoots=buildVeins(root,state),cartVisual=buildCart(scene,state,oreMaterials),yard=buildYard(scene,oreMaterials),lights=[];
  for(let distance=18;distance<MINE_ROUTE_LENGTH-12;distance+=25){
    const point=minePoint(distance/MINE_ROUTE_LENGTH),light=new T.PointLight('#e6b16a',9,14,1.8);
    light.position.set(point.x,point.y+2.05,point.z);light.visible=false;root.add(light);lights.push(light);
  }
  root.traverse(object=>{object.layers.set(3);object.layers.enable(2);});
  function showStock(meshes,stock){
    let i=0;
    for(const metal of METALS){
      const end=Math.min(meshes.length,i+stock[metal]);
      while(i<end){
        const mesh=meshes[i++];mesh.material=oreMaterials[metal];mesh.visible=true;
      }
    }
    while(i<meshes.length)meshes[i++].visible=false;
  }
  function sync(){
    const pose=state.cart.pose;cartVisual.root.position.set(pose.x,pose.y,pose.z);cartVisual.root.rotation.set(pose.pitch,pose.yaw,0,'YXZ');
    showStock(cartVisual.ore,state.cart.cargo);
    veinRoots.forEach((vein,index)=>vein.visible=state.veins[index].remaining>0);
    showStock(yard.delivered,state.forge.ore);
  }
  sync();
  const api={
    ...MINE,root,yardRoot:yard.root,state,cart:state.cart,
    places:Object.freeze([MINE.entry,MINE.portal,MINE.yard]),
    nearby:mineNearby,at:mineAt,next:mineFloor,area:mineLocation,layer:mineLayer,
    depth(y){return Math.max(0,MINE.portal.y-y);},
    action(x,z,y){return state.action(x,z,y);},
    perform(x,z,y){
      const result=state.perform(x,z,y);
      if(result.ore)strike=.48;
      sync();return result;
    },
    interaction(x,z,y){const action=state.action(x,z,y);return action?{label:action,perform:()=>api.perform(x,z,y)}:null;},
    drive(dt,forward){const pose=state.drive(dt,forward);sync();return pose;},
    dismount(){const pose=state.dismount();sync();return pose;},
    snapshot(){return state.snapshot();},
    tick(time,dt,eye,camera,layer){
      sync();
      shade.visible=layer!==3;
      strike=Math.max(0,strike-dt);
      pick.visible=strike>0&&!!layer&&!!camera&&!state.cart.mounted;
      if(pick.visible){
        socket.visible=state.forge.tools.ironPick;inlay.visible=state.forge.tools.masterPick;
        const arc=Math.sin(Math.PI*(1-strike/.48)),swing=.18+arc*1.12;
        pick.position.copy(eye).add(hand.set(.19,-.25,-.41-arc*.11).applyQuaternion(camera.quaternion));
        pick.quaternion.copy(camera.quaternion);pick.rotateX(-swing);pick.rotateZ(-.26);
      }
      root.visible=mineNearby(eye.x,eye.z)||Math.hypot(eye.x-MINE.entry.x,eye.z-MINE.entry.z)<24;
      for(const light of lights)light.visible=false;
      if(layer!==3&&!mineAt(eye.x,eye.z,eye.y-1.57,.95))return;
      const nearest=[...lights].sort((a,b)=>a.position.distanceToSquared(eye)-b.position.distanceToSquared(eye)).slice(0,4);
      nearest.forEach((light,index)=>{light.visible=true;light.intensity=8.5*(1+.07*Math.sin(time*7.7+index));});
    },
  };
  return api;
}
