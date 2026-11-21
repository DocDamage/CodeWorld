import {castleSection,castleLevel} from './castle-objects.js';
import {plantShrub} from './trees.js';
import {dragonBed} from './hoard.js';
import * as T from 'three';
import { Builder,v,TAU,range,tint } from './model.js';
import { CastleKit,stone,trim,darkStone,red,gold } from './castle-kit.js';
import { buildKeep,buildWings,buildHousehold,buildDungeon,buildVault } from './castle-rooms.js';
import { makeDragon } from './dragon.js';
import { estate,estateHeight,moatDistance } from './estate.js';
import { table,chair,volume,candle,wood,oak,iron } from './furnishings.js';
import {animateFires} from './fire.js';
import {stepSmoke} from './smoke.js';

export const CASTLE_LAYOUT=Object.freeze({
  wallX:26,wallZ:24,floorHalfX:28.5,floorHalfZ:26.66,
  bridgeHingeZ:24.82,bridgeLength:11.65,
});

function flag(k,x,y,z){
  k.b.put('cyl',gold,x,y+.63,z,.074,1.75,.074,0,0,0,'gilt');k.b.put('ball',gold,x,y+1.54,z,.16,.16,.16,0,0,0,'gilt');
  const verts=[],idx=[];
  for(let j=0;j<=8;j++){const t=j/8;verts.push(t*1.68,0,0,t*1.68,-.56*(1-t),0);if(j){const i=j*2;idx.push(i-2,i-1,i+1,i-2,i+1,i);}}
  const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(verts,3));g.setIndex(idx);g.computeVertexNormals();
  const mesh=new T.Mesh(g,new T.MeshStandardMaterial({color:red,side:T.DoubleSide,roughness:1}));mesh.position.set(x,y+1.43,z);k.root.add(mesh);k.flags.push(mesh);
}
function spire(k,x,y,z,r,h){
  const rings=16;
  const radius=t=>r*Math.pow(1-t,1.24);
  for(let j=0;j<rings;j++){
    const t=(j+.5)/rings,rad=radius(t),count=Math.max(6,Math.ceil(2*Math.PI*rad/.43));
    const tilt=Math.atan(1.24*r/h*Math.pow(1-t,.24));
    for(let i=0;i<count;i++){
      const a=(i+.5*(j%2))*TAU/count;
      k.b.group(x,y+h*t,z,a,()=>k.b.put('roofScale',tint('#4f7281',.17),0,0,rad,TAU*rad/count*1.17,h/rings/Math.cos(tilt)*1.13,.095,-tilt,0,0,'clay'));
    }
  }
  k.b.put('cone','#303f48',x,y+h*.49,z,1.63*r,h*.98,1.63*r,0,0,0,'clay');
  k.b.put('disk',gold,x,y+.05,z,r*1.97,.105,r*1.97,0,0,0,'gilt');flag(k,x,y+h,z);
}
function tower(k,x,z,rise,spireH){
  const r=2.55,innerX=x-Math.sign(x)*r,outerX=x+Math.sign(x)*r,innerZ=z-Math.sign(z)*r,outerZ=z+Math.sign(z)*r;
  const hw=1.91;
  for(const [axis,line,center,inward] of [['x',innerZ,x,true],['x',outerZ,x,false],['z',innerX,z,true],['z',outerX,z,false]]){
    for(let level=0;level<2;level++){
      const openings=inward?[[center,hw,0,2.57]]:[[center,.57,1.15,1.38]];
      k.wall(axis,line,center-r,center+r,level*rise,rise,openings,'#bfb6a2',.37);
    }
    k.wall(axis,line,center-r,center+r,2*rise,2.29,[[center,1.68,.73,1.34]],stone,.37);
    for(const y of [3.18,rise-.11,2*rise-.13,2*rise+2.32]){
      k.box(axis==='x'?center:line,y,axis==='x'?line:center,axis==='x'?r*2+.19:.50,.20,axis==='x'?.50:r*2+.19,trim,'stone');
    }
  }
  for(const y of [rise,rise*2])k.cutSlab(x-r,x+r,z-r,z+r,y,[x-1.57,x+1.57,z-1.57,z+1.57],'#ad9f86');
  k.solid(x,0,z,.56,rise*2+.9,.56,darkStone);
  k.spirals.push({x,z,rise});
  for(let j=0;j<52;j++){
    const a=(j+.5)*TAU/26,y=(j+1)*rise/26;
    k.b.put('box',tint(trim,.055),x+Math.sin(a)*1.02,y-.10,z+Math.cos(a)*1.02,.443,.20,1.57,0,a,0,'masonry');
  }
  const top=rise*2+2.48;
  k.b.put('box',darkStone,x,top,z,r*2+.39,.33,r*2+.39,0,0,0,'masonry');
  spire(k,x,top+.12,z,3.86,spireH);
  k.room((z>0?'Gate':'Crown')+' tower · '+(x>0?'East':'West'),x-r,x+r,z-r,z+r,0,top,false,(z>0?'gate':'crown')+'-tower-'+(x>0?'east':'west'));
}
function ramparts(k){
  for(const s of [-1,1]){
    const x=s*CASTLE_LAYOUT.wallX,z=s*CASTLE_LAYOUT.wallZ,inner=s>0?23.3:-26.45,outer=s>0?26.45:-23.3;
    k.wall('z',x,-21.45,21.45,0,4.8,[],stone,.72);
    k.slab(inner,outer,-21.45,21.45,4.8);
    k.wall('z',x,-21.45,21.45,4.8,.70,[],trim,.52);
    k.rail(s*23.4,-21.40,s*23.4,21.4,4.8);
    if(s<0)k.wall('x',z,-23.45,23.45,0,4.8,[],stone,.73);
    else k.wall('x',z,-23.45,23.45,0,4.8,[[0,4.1,0,4.02]],stone,.82);
    k.slab(-23.45,23.45,s<0?-24.43:21.35,s<0?-21.35:24.43,4.8);
    k.wall('x',z,-23.45,23.45,4.8,.74,[],trim,.50);
    k.rail(-23.45,s*21.45,23.45,s*21.45,4.8);
    for(let j=-21;j<=21;j+=1.5)k.box(x,5.87,j,.60,.81,.73,stone);
    for(let j=-22.7;j<=22.9;j+=1.46)k.box(j,5.87,z,.73,.81,.62,stone);
    for(let j=-19;j<20;j+=5){
      k.box(x+Math.sign(x)*.39,2.25,j,.42,4.50,.69,'#b5aa95');
      if(s<0||j!==0)k.box(j,2.22,z+Math.sign(z)*.37,.77,4.44,.41,'#b5aa95');
      for(const y of [1.02,2.74,4.15]){
        k.b.put('stone',tint('#7f7d74',.07),x-Math.sign(x)*.38,y,j+.44*Math.sin(j+y),.32,.17,.10,0,0,0,'stone');
        if(s<0||j!==0)k.b.put('stone',tint('#827f75',.07),j+.34*Math.cos(j-y),y,z-Math.sign(z)*.39,.30,.16,.10,0,0,0,'stone');
      }
    }
  }
  for(const x of [-CASTLE_LAYOUT.wallX,CASTLE_LAYOUT.wallX])for(const z of [-CASTLE_LAYOUT.wallZ,CASTLE_LAYOUT.wallZ])tower(k,x,z,4.8,z<0?8.55:6.44);
}
function gatehouse(k){
  for(const s of [-1,1]){
    const x=s*4.7;
    k.wall('x',19.40,x-2.1,x+2.1,0,4.8,[[x,1.61]]);
    for(const xx of [x-2.1,x+2.1])k.wall('z',xx,19.40,24,0,4.8,[]);
    k.slab(x-2.1,x+2.1,19.40,24,4.8);
    k.furnishing(x,22.85,0,1.40,.67,b=>{table(b,0,0,1.4,.67);volume(b,-.2,.88,0);candle(b,.49,.88,0);});
    k.room('Gatehouse watch room',x-2.1,x+2.1,19.40,24,0,4.6,false,x>0?'watch-east':'watch-west');
    // The gatehouse rises into twin watch towers. Both galleries open onto the wall walk.
    for(const xx of [x-2.1,x+2.1])k.wall('z',xx,19.40,24.42,4.8,3.05,[[23.08,1.84]]);
    for(const zz of [19.40,24.42])k.wall('x',zz,x-2.1,x+2.1,4.8,3.05,[[x,1.15,.84,1.61]]);
    const a=x+.44,b=x+1.79;
    k.cutSlab(x-2.10,x+2.1,19.40,24.42,7.85,[a,b,20.20,23.22],'#a69e8c');
    k.stairs(a,b,23.22,20.20,4.8,7.85);
    for(const xx of [x-2.1,x+2.1])k.wall('z',xx,19.40,24.42,7.85,2.09,[[22.26,1.74,.67,1.24]]);
    for(const zz of [19.40,24.42])k.wall('x',zz,x-2.1,x+2.1,7.85,2.09,[[x,1.64,.67,1.24]]);
    k.box(x,9.96,22.26,4.63,.23,4.68,trim,'stone');
    spire(k,x,10.03,22.26,3.19,6.08);
    k.room('Gatehouse lookout',x-2.1,x+2.1,19.40,24.42,4.8,10.0,false,x>0?'lookout-east':'lookout-west');
    k.banner(x,3.13,24.50,1.04,2.40);
    k.torch(s*2.64,2.15,24.63);
  }
  // A stone arch and a raised iron grille frame the open passage.
  for(let j=0;j<15;j++){
    const a=j*Math.PI/14;
    k.b.put('box',tint(trim),2.27*Math.cos(a),3.18+1.21*Math.sin(a),24.48,.37,.47,.33,0,0,a-Math.PI/2, 'stone');
  }
  for(let j=-4;j<=4;j++)k.b.put('box',iron,j*.42,3.80,23.89,.070,.75,.082,0,0,0,'iron');
  k.box(0,3.83,23.89,4.05,.065,.09,iron,'iron');
  k.plaque('Thornmere',0,5.05,24.40,0,2.45);
}
function moat(root,material,b){
  const pos=[],idx=[],bed=[],n=96,slices=12;
  for(let j=0;j<=n;j++){
    const a=(j%n)/n*TAU,dx=Math.cos(a),dz=Math.sin(a);
    for(let slice=0;slice<=slices;slice++){
      const dist=-.35+8.70*slice/slices;
      let lo=0,hi=56;for(let k=0;k<12;k++){const m=(lo+hi)/2;if(moatDistance(estate.x+dx*m,estate.z+dz*m)<dist)lo=m;else hi=m;}
      const x=dx*hi,z=dz*hi;pos.push(x,-1.48,z);bed.push(-dz*.12,dx*.12,estateHeight(estate.x+x,estate.z+z));
      if(j&&slice){const i=j*(slices+1)+slice;idx.push(i-1,i,i-slices-2,i,i-slices-1,i-slices-2);}
    }
  }
  const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(pos,3));g.setAttribute('waterBed',new T.Float32BufferAttribute(bed,3));g.setIndex(idx);
  root.add(new T.Mesh(g,material));
  for(let i=0;i<340;i++){
    const x=range(-36,36),z=range(-34,34),d=moatDistance(estate.x+x,estate.z+z);
    if(d<1.5||d>7.0||Math.abs(x)<3&&z>0)continue;
    b.put('disk',tint('#789658'),x,-1.45,z,.25,.022,.21,0,range(0,TAU));
    if(i%5===0)b.put('leaf','#e4c8a6',x,-1.39,z,.12,.085,.13);
  }
}
function drawbridge(k){
  const hinge=new T.Group();hinge.position.set(0,.10,CASTLE_LAYOUT.bridgeHingeZ);k.root.add(hinge);
  const deck=new Builder(hinge),len=CASTLE_LAYOUT.bridgeLength;
  for(let j=0;j<45;j++)deck.put('box',tint('#765b43'),0,-.09,(j+.5)*len/45,3.96,.20,len/45-.015,0,0,0,'agedWood');
  for(const x of [-1.67,0,1.67])deck.put('box','#59493b',x,-.28,len/2,.27,.33,len,0,0,0,'agedWood');
  for(const x of [-1.82,1.82])for(let j=0;j<13;j++)deck.put('disk',iron,x,.021,.46+j*.88,.078,.034,.078,0,0,0,'iron');
  deck.finish();
  const chains=[];
  for(const side of [-1,1]){
    const mount=v(side*2.16,4.85,24.48);k.b.put('ring',iron,...mount.toArray(),.53,.52,1.05,0,0,0,'iron');
    const group=new T.Group();k.root.add(group);const bb=new Builder(group);
    for(let j=0;j<35;j++)bb.put('ring',iron,0,(j+.5)/35,0,.11,.041,.72,0,j%2*Math.PI/2,0,'iron');
    bb.finish();chains.push({group,mount,side});
  }
  k.plaque('Bridge winch',-3.23,1.76,37.10,0,1.45);
  for(const z of [37.0,22.24]){
    k.box(-2.72,.53,z,.46,1.06,.46,darkStone);
    k.b.put('cyl',oak,-2.72,1.04,z,.39,.71,.39,0,0,Math.PI/2,'agedWood');
    k.b.beam(iron,v(-3.09,1.03,z),v(-3.09,1.34,z+.22),.070,.070,'box','iron');
  }
  let angle=0,goal=0;
  return {
    root:hinge,
    get down(){return angle<.025&&goal===0;},
    action(x,z,y){
      return Math.abs(y)<.5&&((Math.hypot(x+2.72,z-37)<2.45&&z>36.48)||(Math.hypot(x+2.72,z-22.24)<2.34&&z<24))?(goal?'Lower drawbridge':'Raise drawbridge'):'';
    },
    toggle(){goal=goal===0?1.32:0;},
    tick(dt){
      angle+=Math.sign(goal-angle)*Math.min(Math.abs(goal-angle),dt*.70);hinge.rotation.x=-angle;
      for(const {group,mount,side} of chains){
        const end=v(side*1.82,.10+Math.sin(angle)*(len-.32),CASTLE_LAYOUT.bridgeHingeZ+Math.cos(angle)*(len-.32));
        const dir=end.sub(mount);group.position.copy(mount);group.quaternion.setFromUnitVectors(v(0,1,0),dir.clone().normalize());group.scale.y=dir.length();
      }
    }
  };
}
export function buildCastle(scene,waterMaterial){
  const root=new T.Group();root.position.set(estate.x,estate.y,estate.z);scene.add(root);castleLevel(root,'castle:surface','Thornmere Castle','region:castle');
  const k=new CastleKit(root);k.b.ownership={objectId:'castle:surface',partId:'courtyard'};k.cutSlab(-CASTLE_LAYOUT.floorHalfX,CASTLE_LAYOUT.floorHalfX,-CASTLE_LAYOUT.floorHalfZ,CASTLE_LAYOUT.floorHalfZ,0,[6.25,8.75,3.00,12.8],'#b4aa95');
  ramparts(k);gatehouse(k);
  castleSection(k,'castle:keep','Royal keep','castle:surface',buildKeep);
  castleSection(k,'castle:wings','Service wings','castle:surface',buildWings);
  castleSection(k,'castle:household','Household lodges','castle:surface',buildHousehold);
  for(const x of [6.25,8.75])k.rail(x,3,x,12.75,0);
  k.rail(6.25,3,8.75,3,0);
  // Hang the sign overhead to leave the foot of the stair completely open.
  for(const x of [6.08,8.92])k.box(x,1.55,12.94,.13,3.10,.14,oak,'wood');
  k.plaque('Prison & dragon vault',7.5,2.92,12.95,0,2.78);
  for(const [x,z] of [[-2.1,12.6],[-7.7,3.62],[1.65,-.77],[10.62,11]]){
    k.b.put('disk','#a1957a',x,.16,z,1.32,.32,1.32);
    plantShrub(k.b,x,.22,z,1.10,1.76);k.obstacle(x,z,1.2,1.2,0,1.2);
  }
  // The open well, bucket and turning drum mark the centre of the ward.
  for(let j=0;j<22;j++){const a=j*TAU/22;k.b.put('stone',tint(trim,.08),-4.8+1.03*Math.sin(a),.43,3.1+1.03*Math.cos(a),.34,.72,.25,0,a,0,'stone');}
  k.b.put('disk','#384e49',-4.80,.33,3.1,1.88,.027,1.88);
  for(const side of [-1,1])k.box(-4.8+side*.97,1.07,3.1,.13,2.14,.17,oak,'agedWood');
  k.b.put('cyl',oak,-4.8,1.91,3.1,.30,2.21,.30,0,0,Math.PI/2,'agedWood');
  k.b.put('cyl','#71604c',-4.55,1.24,3.10,.026,1.19,.026,0,0,0,'agedWood');
  k.b.put('barrel','#655845',-4.55,.72,3.1,.33,.34,.33,0,0,0,'agedWood');k.obstacle(-4.8,3.1,2.26,2.26,0,1.0);
  for(let i=0;i<54;i++){
    const a=i*2.39996,r=2.1+((i*37)%29)/29*8.8,x=-1.8+Math.cos(a)*r,z=4.2+Math.sin(a)*r;
    if(Math.abs(x-7.5)<2&&z>2.5&&z<13.2)continue;
    k.b.put('paver',tint(i%3?'#77766e':'#8a8579',.06),x,.025,z,.30+(i%4)*.05,.035,.25+(i%3)*.05,0,a,0,'stone');
  }
  for(const x of [-2.10,2.10])k.torch(x,2.25,-4.48,{width:.34,height:.65,embers:7});
  moat(root,waterMaterial,k.b);const bridge=drawbridge(k);k.b.finish();
  const below=new T.Group();root.add(below);const dungeon=new CastleKit(below);
  castleLevel(below,'castle:dungeon','Castle dungeons','castle:surface');
  dungeon.b.ownership={objectId:'castle:dungeon',partId:'structure'};
  buildDungeon(dungeon);dungeon.b.finish();
  const tickCoins=castleSection(dungeon,'castle:vault','Dragon vault','castle:dungeon',buildVault);
  for(const prop of ['surfaces','blocks','zones'])k[prop].push(...dungeon[prop]);
  const dragon=makeDragon(below);
  const lights=[[-9,-2,1,'#ffe0a4',30],[7,-2,5,'#ffc58b',27],[-4,-8,-9,'#efba83',28],[0,-10,-3,'#ffc499',46],[9,-12,5,'#a3dbdc',55],[-9,-10,8,'#e2ad73',56]].map(([x,y,z,c,i])=>{const light=new T.PointLight(c,i,27,1.6);light.position.set(x,y,z);below.add(light);return light;});
  const hallLamp=new T.PointLight('#ffdb9a',10,15,1.65);
  below.traverse(object=>object.layers.enable(1));
  hallLamp.position.set(0,3.47,-10.46);root.add(hallLamp);
  const wardLamp=new T.PointLight('#ffcc89',12,21,1.60);
  wardLamp.position.set(1.60,3.05,18);root.add(wardLamp);
  const royalLamp=new T.PointLight('#ffc275',16,8,1.8);
  royalLamp.position.set(9.9,7.89,-14.8);root.add(royalLamp);
  const upperEffects=[root,...k.effectRoots].filter(g=>g.userData.fires||g.userData.smokeSources);
  const lowerEffects=[below,...dungeon.effectRoots].filter(g=>g.userData.fires||g.userData.smokeSources);
  // Keep the view through the stairwell, and skip the underground sets from the distant village.
  return {root,bridge,kit:k,
    dragon,
    nearby(x,z){return Math.abs(x-estate.x)<41&&Math.abs(z-estate.z)<39;},
    next(x,z,previous,ground){
      const lx=x-estate.x,lz=z-estate.z,sd=moatDistance(x,z),y=previous-estate.y;
      const onSpan=Math.abs(lx)<1.79&&lz>=CASTLE_LAYOUT.bridgeHingeZ-.22&&lz<=CASTLE_LAYOUT.bridgeHingeZ+CASTLE_LAYOUT.bridgeLength+.19&&bridge.down;
      const outside=Math.abs(lx)>CASTLE_LAYOUT.floorHalfX||Math.abs(lz)>CASTLE_LAYOUT.floorHalfZ;
      let extra=outside&&(sd<=-.33||sd>7.82)?ground-estate.y:null;
      if(onSpan)extra=.10;
      if(y< -14.15&&dragonBed(lx,lz)>0)extra=-16+dragonBed(lx,lz);
      const next=k.floorAt(lx,lz,y,extra);return next===null?null:estate.y+next;
    },
    area(x,z,y){
      const lx=x-estate.x,lz=z-estate.z;if(y>=estate.y-.5&&(Math.abs(lx)>CASTLE_LAYOUT.floorHalfX+.5||Math.abs(lz)>CASTLE_LAYOUT.floorHalfZ+.5))return 'Thornmere Castle';
      return k.location(lx,lz,y-estate.y);
    },
    tick(t,dt,eye,insideVillage,night,wind,viewport,walkingFloor){
      tickCoins(dt,walkingFloor==null?null:{x:eye.x-estate.x,y:walkingFloor-estate.y,z:eye.z-estate.z});
      bridge.tick(dt);
      const near=!insideVillage&&Math.hypot(eye.x-estate.x,eye.z-estate.z)<78;
      const lx=eye.x-estate.x,lz=eye.z-estate.z;
      const stairView=Math.abs(lx-7.5)<9&&lz>-.5&&lz<20&&eye.y<estate.y+4.2;
      below.visible=near&&Math.abs(lx)<34&&Math.abs(lz)<28&&(eye.y<estate.y+.3||stairView);
      hallLamp.visible=near&&eye.y>estate.y-1;wardLamp.visible=hallLamp.visible&&night>.12;
      royalLamp.visible=hallLamp.visible&&Math.hypot(eye.x-estate.x-10,eye.z-estate.z+13)<29;
      royalLamp.intensity=13+night*10+Math.sin(t*8.3)*.65;
      hallLamp.intensity=11+night*12;if(!near)return;
      for(const l of lights)l.visible=eye.y<estate.y+2;
      for(const g of upperEffects){animateFires(g,t);stepSmoke(g,dt,t,wind*.54,eye,viewport,night);}
      for(const g of lowerEffects){animateFires(g,t);stepSmoke(g,dt,t,0,eye,viewport,night);}
      if(below.visible)dragon.tick(t,dt,{x:lx,y:eye.y-estate.y,z:lz});
      for(const m of k.flags){const a=m.geometry.attributes.position;for(let j=0;j<=8;j++){const f=j/8,flutter=.22*f*Math.sin(t*2.3-f*5+m.position.x);a.setZ(j*2,flutter);a.setZ(j*2+1,flutter+.053*f);}a.needsUpdate=true;}
    }
  };
}
