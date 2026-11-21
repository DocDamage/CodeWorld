import {height,smooth} from './world-height.js';
import {soilMesh} from './soil.js';
import {brookStage,cobbles,riffle} from './brook.js';
import * as T from 'three';
import { atLake,onLakeDock,lakeWalkable,dock } from './lake-layout.js';
import { moatDistance,trailDistance } from './estate.js';
import { v,TAU,range,random,tint,pick,meshSurface,label } from './model.js';
import { swayMaterial } from './foliage.js';
import { farmClear,fieldAt,inFarm } from './farm-layout.js';
import { mineTerrainCut } from './mine-layout.js';
import { catacombTerrainCut } from './catacomb-layout.js';

import { bridgeSpan, bridgeZ, onBridge, pavingAllowed, plots, roads, nearPath, inPlot, riverX, riverWidth } from './layout.js';
export { plots, nearPath, inPlot, riverX, riverWidth, brookLevel, doorstep, doorOffset } from './layout.js';

export {height,mix,smooth} from './world-height.js';
export function grassMap() {
  const c=document.createElement('canvas');c.width=c.height=256;const ctx=c.getContext('2d');
  ctx.fillStyle='#9ea58a';ctx.fillRect(0,0,256,256);
  for(let i=0;i<680;i++){
    const x=random()*256,y=random()*256,r=range(3,16),shade=pick(['#657459','#788165','#abb08d','#52674c','#8e9574']);
    ctx.fillStyle=shade+'32';ctx.beginPath();ctx.ellipse(x,y,r,r*range(.28,.78),range(0,TAU),0,TAU);ctx.fill();
  }
  for(let i=0;i<12800;i++){
    ctx.fillStyle=pick(['#758060','#a6aa86','#687557','#8d9571','#b4b18c']);const x=random()*256,y=random()*256;
    ctx.fillRect(x,y,range(.3,1.45),range(.4,1.8));
  }
  const tex=new T.CanvasTexture(c);tex.wrapS=tex.wrapT=T.RepeatWrapping;tex.colorSpace=T.SRGBColorSpace;tex.anisotropy=4;return tex;
}
export function terrain(root,b) {
  const pos=[],idx=[],cols=[],uv=[],n=175,step=.62;
  for(let j=0;j<=n;j++)for(let i=0;i<=n;i++){
    const x=(i-n/2)*step,z=(j-n/2)*step,y=height(x,z);
    pos.push(x,y,z);uv.push(x*.38,z*.38);
    const pattern=.5+.21*Math.sin(x*.46+z*.08)+.13*Math.sin(z*.83-x*.34)+.1*Math.cos(z*.18+x*.18)+range(-.05,.05);
    const c=new T.Color('#596447').lerp(new T.Color('#8c9165'),pattern);
    c.lerp(new T.Color('#88886a'),1-smooth(-.6,1.45,Math.abs(x-riverX(z))-riverWidth(z)));
    let footing=1;
    for(const p of plots){
      const dx=x-p.x,dz=z-p.z,lx=Math.abs(dx*Math.cos(p.a)-dz*Math.sin(p.a)),lz=Math.abs(dx*Math.sin(p.a)+dz*Math.cos(p.a));
      const d=Math.hypot(Math.max(0,lx-p.w*.5),Math.max(0,lz-p.d*.5));
      footing=Math.min(footing,smooth(0,1.45,d));
    }
    c.lerp(new T.Color('#7e805b'),(1-footing)*.75);
    if(pavingAllowed(x,z)&&nearPath(x,z,.15))c.lerp(new T.Color('#777269'),.63);
    cols.push(c.r,c.g,c.b);
    if(i&&j){
      const a=j*(n+1)+i;
      if(!inFarm(x-step*.68,z-step*.68)&&!mineTerrainCut(x-step*.68,z-step*.68))idx.push(a-n-2,a-1,a);
      if(!inFarm(x-step*.32,z-step*.32)&&!mineTerrainCut(x-step*.32,z-step*.32))idx.push(a-n-2,a,a-n-1);
    }
  }
  const groundMap=grassMap();
  const ground=meshSurface(root,pos,idx,cols,{map:groundMap,bumpMap:groundMap,bumpScale:.018,roughness:.97,flatShading:false});ground.geometry.setAttribute('uv',new T.Float32BufferAttribute(uv,2));
  // Set each cobble independently so the climbing lanes follow both cross-slope and grade.
  const laid=new Map();
  roads.forEach(({curve:path,lanes},k)=>{
    const length=path.getLength(),rows=Math.ceil(length/.42);
    for(let i=0;i<=rows;i++){
      const t=i/rows,p=path.getPointAt(t),d=path.getTangentAt(t),angle=Math.atan2(d.x,d.z);
      for(let j=0;j<lanes;j++){
        const off=(j-(lanes-1)/2)*.5;
        const x=p.x+d.z*off+range(-.035,.035),z=p.z-d.x*off+range(-.035,.035);
        if(!pavingAllowed(x,z)||mineTerrainCut(x,z,.45))continue;
        const gx=Math.floor(x),gz=Math.floor(z);
        let occupied=false;
        for(let ix=gx-1;ix<=gx+1;ix++)for(let iz=gz-1;iz<=gz+1;iz++){
          const other=laid.get(ix+','+iz);
          if(other?.some(p=>p.k!==k&&(p.x-x)**2+(p.z-z)**2<.49**2))occupied=true;
        }
        if(occupied)continue;
        const key=gx+','+gz;if(!laid.has(key))laid.set(key,[]);laid.get(key).push({x,z,k});
        const dx=(height(x+.05,z)-height(x-.05,z))/.1,dz=(height(x,z+.05)-height(x,z-.05))/.1;
        const up=v(-dx,1,-dz).normalize(),q=new T.Quaternion().setFromUnitVectors(v(0,1,0),up).multiply(new T.Quaternion().setFromAxisAngle(v(0,1,0),angle+range(-.07,.07)));
        b.place('paver',tint(pick(['#938c80','#8b8279','#a09a8b','#78776d'])),v(x,height(x,z)+.035,z),q,v(range(.42,.48),.081,range(.40,.46)),'roadStone');
        if(i%11===0&&j===0){
          const shoulder=(lanes*.25+.22)*pick([-1,1]),sx=x+d.z*shoulder,sz=z-d.x*shoulder;
          b.put('stone',tint(pick(['#726f63','#898275','#9a9181']),.08),sx,height(sx,sz)+.035,sz,range(.16,.31),range(.08,.16),range(.14,.28),0,range(0,TAU),0,'stone');
        }
      }
    }
  });
  for(const [z,offset,size] of cobbles){
    const x=riverX(z)+offset;
    b.put('stone',tint('#787668',.12),x,brookStage(z)-size*.13,z,size*1.16,size*.75,size*.98,.14,z*.19,.07,'stone');
  }
  // Sorting by the current leaves gravel bars on shoals and along the inside bank.
  for(let i=0;i<1800;i++){
    const z=range(-50,50),offset=range(-1,1),x=riverX(z)+offset*riverWidth(z);
    if(Math.abs(offset)<.69&&riffle(z)<.48)continue;
    const s=range(.045,.23);
    b.put('stone',tint(pick(['#a29981','#6c7368','#817463','#988c78']),.12),x,height(x,z)+.024,z,s*1.25,s*.46,s,0,range(0,TAU),.09,'stone');
  }
  // Low bank stones break up the mathematically clean waterline without changing traversal.
  for(let i=0;i<230;i++){
    const z=range(-45,45),side=pick([-1,1]),x=riverX(z)+side*(riverWidth(z)+range(.10,.78));
    if(onBridge(x,z)||inFarm(x,z)||nearPath(x,z,.45))continue;
    const s=range(.10,.38);
    b.put('stone',tint(pick(['#77796e','#89897c','#696f67','#989080']),.10),x,height(x,z)+s*.15,z,s*range(.8,1.35),s*.44,s,range(-.25,.25),range(0,TAU),0,'stone');
  }
  return soilMesh(ground);
}
const grassZones=Object.freeze([
  Object.freeze({name:'village',minX:-37,maxX:38,minZ:-36,maxZ:38,attempts:16000,seed:0x3ca71}),
  Object.freeze({name:'farm',minX:-111.5,maxX:-44.5,minZ:10.5,maxZ:92.5,attempts:14500,seed:0xfa471}),
  Object.freeze({name:'woodland',minX:55,maxX:216,minZ:-101,maxZ:61,attempts:19500,seed:0x70dd5}),
]);

export function grassAllowed(x,z,zone){
  if(zone==='village')return !mineTerrainCut(x,z,.42)&&!inPlot(x,z,.48)&&!nearPath(x,z,.52)&&
    !nearFarmLane(x,z,1.42)&&Math.abs(x-riverX(z))>=riverWidth(z)+.46&&!atLake(x,z);
  if(zone==='farm')return inFarm(x,z)&&!fieldAt(x,z,.42)&&farmClear(x,z)&&
    Math.abs(z-24)>=2.35&&!(z>22&&Math.abs(x+86)<1.78)&&Math.hypot(x+55.5,z-39.5)>=2.75;
  if(zone==='woodland')return !atLake(x,z)&&trailDistance(x,z)>=2.36&&moatDistance(x,z)>=9&&
    !catacombTerrainCut(x,z,1.4);
  return false;
}

function grassRandom(seed){
  let state=seed>>>0;
  return ()=>{state=(Math.imul(state,1664525)+1013904223)>>>0;return state/4294967296;};
}

function grassMesh(root,zone){
  const pos=[],idx=[],cols=[],flex=[],rng=grassRandom(zone.seed),palette=['#49613a','#597044','#68794c','#748354','#5d7443'];
  const between=(a,b)=>a+(b-a)*rng();
  for(let i=0;i<zone.attempts;i++){
    const x=between(zone.minX,zone.maxX),z=between(zone.minZ,zone.maxZ);
    if(!grassAllowed(x,z,zone.name))continue;
    const y=height(x,z)-.018,tuft=between(.21,.54)*(zone.name==='woodland'?.9:1);
    for(let j=0;j<3;j++){
      const a=between(0,TAU),dx=Math.cos(a),dz=Math.sin(a),px=-dz,pz=dx,r=between(0,.13),cx=x+dx*r,cz=z+dz*r;
      const w=between(.018,.042),h=tuft*between(.68,1.18),midBend=h*between(.08,.15),tipBend=h*between(.34,.52),n=pos.length/3;
      pos.push(
        cx-px*w,y,cz-pz*w, cx+px*w,y,cz+pz*w,
        cx+dx*midBend-px*w*.68,y+h*.54,cz+dz*midBend-pz*w*.68,
        cx+dx*midBend+px*w*.68,y+h*.54,cz+dz*midBend+pz*w*.68,
        cx+dx*tipBend,y+h,cz+dz*tipBend,
      );
      idx.push(n,n+1,n+3,n,n+3,n+2,n+2,n+3,n+4);
      flex.push(0,0,.34,.34,1);
      const base=new T.Color(palette[Math.floor(rng()*palette.length)]).multiplyScalar(between(.80,.98));
      const middle=base.clone().multiplyScalar(between(1.03,1.12)),tip=middle.clone().lerp(new T.Color('#879461'),between(.08,.22));
      cols.push(base.r,base.g,base.b,base.r,base.g,base.b,middle.r,middle.g,middle.b,middle.r,middle.g,middle.b,tip.r,tip.g,tip.b);
    }
  }
  const blades=meshSurface(root,pos,idx,cols,{roughness:.93});
  blades.name=`${zone.name} bent grass`;
  blades.userData.grassZone=zone.name;
  blades.geometry.setAttribute('bladeFlex',new T.Float32BufferAttribute(flex,1));
  swayMaterial(blades.material,{strength:zone.name==='woodland'?.90:1.08,blade:true});
  blades.customDepthMaterial=blades.material.userData.windDepth;
  return blades;
}

export function grass(root) {
  const meshes=grassZones.map(zone=>grassMesh(root,zone));
  return {meshes,stats:Object.freeze(Object.fromEntries(meshes.map(mesh=>[mesh.userData.grassZone,mesh.geometry.index.count/3])))};
}
export function bridge(b) {
  const z=bridgeZ,x=riverX(z),span=bridgeSpan;
  const floor=t=>.73+1.04*Math.sin(Math.PI*t);
  for(let i=0;i<31;i++){
    const t=(i+.5)/31,xx=x+(t-.5)*span,yy=floor(t),slope=1.04*Math.PI*Math.cos(Math.PI*t)/span;
    b.put('box',tint('#938d80'),xx,yy,z,span/31+.012,.26,2.05,0,0,Math.atan(slope),'roadStone');
    for(const side of [-1,1]){
      const zz=z+side*1.01;
      b.put('box',tint('#817b70'),xx,yy-.24,zz,span/31+.01,.42,.35,0,0,Math.atan(slope),'masonry');
      if(i%2===0){b.put('box',tint('#8d8678'),xx,yy+.28,zz,.5,.6,.32,0,0,Math.atan(slope),'stone');b.put('box',tint('#aaa18f'),xx,yy+.6,zz,.51,.13,.4,0,0,Math.atan(slope),'stone');}
      if(t<.19||t>.81)b.put('box',tint('#817c70'),xx,(yy-.95)/2,zz,.27,yy+1.15,.4,0,0,0,'masonry');
    }
  }
  for(const side of [-1,1])for(const t of [.12,.88]){
    const xx=x+(t-.5)*span,base=height(xx,z+side*.84),pierHeight=Math.max(.35,.31-base);
    b.put('box','#77746a',xx,.31-pierHeight/2,z+side*.98,.92,pierHeight,.72,0,range(-.12,.12),0,'masonry');
    b.put('box','#a09887',xx,.30,z+side*1.04,1.15,.35,.87,0,0,0,'stone');
  }
}
export function walkHeight(x,z) {
  if(onLakeDock(x,z))return Math.max(height(x,z),dock.deck);
  const t=(x-riverX(bridgeZ))/bridgeSpan+.5;
  if(onBridge(x,z))return Math.max(height(x,z),.86+1.04*Math.sin(t*Math.PI));
  return height(x,z);
}
export function walkable(x,z) {
  if(atLake(x,z)||z>48&&z<62&&Math.abs(x-dock.x)<10)return lakeWalkable(x,z);
  if(inFarm(x,z))return true;
  if(inPlot(x,z,.24)||x< -46||x>213||z>49||z<(x<54.25?-43:-102))return false;
  return Math.abs(x-riverX(z))>riverWidth(z)+.32 || onBridge(x,z);
}

const farmLane=new T.CatmullRomCurve3([[-24,7.58],[-22.8,12.65],[-24.3,17.8],[-30.5,21],[-36.8,23.9],[-44.15,24]].map(([x,z])=>v(x,0,z)));
const laneSamples=farmLane.getSpacedPoints(Math.ceil(farmLane.getLength()*1.65));
export function nearFarmLane(x,z,distance){
  return x>-46&&x<-19&&z>5&&z<27&&laneSamples.some(p=>(p.x-x)**2+(p.z-z)**2<distance*distance);
}
export function farmApproach(root,b){
  const pos=[],idx=[],col=[],uv=[],n=Math.ceil(farmLane.getLength()*2.1),cross=8;
  for(let i=0;i<=n;i++){
    const p=farmLane.getPointAt(i/n),direction=farmLane.getTangentAt(i/n);
    for(let j=0;j<=cross;j++){
      const off=(j/cross-.5)*(2.38+.25*Math.sin(i*.23)),x=p.x+off*direction.z,z=p.z-off*direction.x;
      pos.push(x,height(x,z)+.051,z);uv.push(x*.71,z*.71);
      const c=tint(j===2||j===6?'#6f5840':j===4?'#796b4a':'#8a7658',.12);col.push(c.r,c.g,c.b);
      if(i&&j){const k=pos.length/3-1;idx.push(k,k-1,k-cross-2,k,k-cross-2,k-cross-1);}
    }
  }
  const laneMap=grassMap();
  const ground=meshSurface(root,pos,idx,col,{map:laneMap,bumpMap:laneMap,bumpScale:.022,roughness:.96,flatShading:false});ground.geometry.setAttribute('uv',new T.Float32BufferAttribute(uv,2));
  for(const [x,z,a] of [[-21.20,11.22,.12],[-39.4,22.2,-.47]])b.group(x,height(x,z),z,a,()=>{
    b.put('box','#67513c',0,1.02,0,.15,2.13,.15,0,0,0,'wood');
    b.put('box','#62513c',0,1.81,.06,1.32,.33,.12,0,0,0,'wood');
    label(root,b,'COMMONS FARM','#e8d5a8',0,1.81,.126,1.22,.28);
  });
  return soilMesh(ground,'trail');
}
