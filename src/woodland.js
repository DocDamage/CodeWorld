import {soilMesh} from './soil.js';
import * as T from 'three';
import { Builder,v,pick,tint,range,TAU,meshSurface,label } from './model.js';
import { height,grassMap } from './land.js';
import { estate,moatDistance,trail,trailDistance } from './estate.js';
import { lantern } from './houses.js';
import { CASTLE_LAYOUT } from './castle.js';
import { catacombTerrainCut } from './catacomb-layout.js';

function easternGround(root){
  const pos=[],idx=[],cols=[],uv=[],nx=233,nz=253,step=.88;
  for(let j=0;j<=nz;j++)for(let i=0;i<=nx;i++){
    const x=54.25+i*step,z=-120+j*step,y=height(x,z),d=moatDistance(x,z);
    pos.push(x,y,z);uv.push(x*.38,z*.38);
    const c=new T.Color('#56634e').lerp(new T.Color('#868b6b'),.49+.21*Math.sin(x*.31+z*.12)+.15*Math.cos(z*.56)+range(-.05,.05));
    if(d>-.8&&d<8.5)c.lerp(new T.Color('#9b9980'),.66);
    cols.push(c.r,c.g,c.b);
    if(i&&j){
      if(Math.abs(x-step/2-estate.x)<CASTLE_LAYOUT.floorHalfX-.25&&Math.abs(z-step/2-estate.z)<CASTLE_LAYOUT.floorHalfZ-.2)continue;
      if(catacombTerrainCut(x-step/2,z-step/2))continue;
      const k=j*(nx+1)+i;idx.push(k-nx-2,k-1,k,k-nx-2,k,k-nx-1);
    }
  }
  const forestMap=grassMap();
  const m=meshSurface(root,pos,idx,cols,{map:forestMap,bumpMap:forestMap,bumpScale:.021,roughness:.98,flatShading:false});m.geometry.setAttribute('uv',new T.Float32BufferAttribute(uv,2));
  return soilMesh(m,'forest');
}
function pine(b,x,z,s){
  const y=height(x,z),a=range(0,TAU);
  b.put('cyl',tint('#5d5042'),x,y+2.85*s,z,.39*s,6.15*s,.39*s,0,0,0,'agedWood');
  for(let k=0;k<7;k++){
    const h=(1.82+k*.72)*s,w=(3.58-k*.39)*s,lean=.08*Math.sin(a+k*1.7)*s;
    b.put('pine',tint(pick(['#354f3d','#405b43','#496148','#3c5740']),.07),x+lean,y+h+s*.79,z-lean*.4,w,1.92*s,w,.025,a+k*.58,0,'canopy');
    for(let j=0;j<3;j++){const t=a+j*TAU/3+k*.43,r=w*.25;
      b.put('pine',tint('#465e44',.08),x+r*Math.sin(t),y+h+.45*s,z+r*Math.cos(t),w*.49,1.08*s,w*.51,.10,t,0,'canopy');}
  }
  b.put('spire','#435941',x,y+6.45*s,z,.68*s,1.45*s,.68*s,0,a,0,'canopy');
}
function beech(b,x,z,s){
  const y=height(x,z),a=range(0,TAU);
  b.beam('#625949',v(x,y-.1,z),v(x+.12*s,y+3.3*s,z),.46*s,.40*s,'cyl','plantWood');
  for(let j=0;j<6;j++){
    const ang=a+j*2.4,r=(j===5?.25:1.16)*s,h=(j===5?5.35:range(3.85,4.85))*s,xx=x+Math.sin(ang)*r,zz=z+Math.cos(ang)*r;
    b.beam('#655a48',v(x+.1*s,y+2.34*s,z),v(xx,y+h,zz),.18*s,.18*s,'cyl','plantWood');
    b.put('crown',tint(pick(['#566f48','#5c7048','#6b7950','#4d6746']),.08),xx,y+h,zz,s*2.64,s*1.85,s*2.57,.15,ang,0,'canopy');
  }
}
function trailMesh(root,b){
  const n=Math.ceil(trail.getLength()/.35),pos=[],col=[],idx=[],uv=[];
  for(let j=0;j<=n;j++){
    const p=trail.getPointAt(j/n),dir=trail.getTangentAt(j/n),w=1.32+.14*Math.sin(j*.06);
    for(let i=0;i<5;i++){
      const off=(i-2)*w*.49+(i===0||i===4?range(-.07,.07):0);
      const x=p.x+dir.z*off,z=p.z-dir.x*off;pos.push(x,height(x,z)+.055,z);uv.push(x*.66,z*.66);
      const c=tint(i===0||i===4?'#9b9a69':i===2?'#b6a17c':'#c3ac84',.062);col.push(c.r,c.g,c.b);
      if(i&&j&&!catacombTerrainCut(x,z)){const k=j*5+i;idx.push(k-6,k-1,k,k-6,k,k-5);}
    }
    if(j%3===0){const o=range(-1.25,1.25),x=p.x+dir.z*o,z=p.z-dir.x*o;
      if(!catacombTerrainCut(x,z))b.put('paver',tint('#8e887b'),x,height(x,z)+.076,z,range(.08,.31),.035,range(.06,.17),0,range(0,TAU),0,'roadStone');}
  }
  const trailMap=grassMap();
  const road=meshSurface(root,pos,idx,col,{map:trailMap,bumpMap:trailMap,bumpScale:.026,roughness:.97,flatShading:false});road.geometry.setAttribute('uv',new T.Float32BufferAttribute(uv,2));return soilMesh(road,'trail');
}
function sign(root,b,t,title){
  const p=trail.getPointAt(t),d=trail.getTangentAt(t),x=p.x-d.z*1.77,z=p.z+d.x*1.77,y=height(x,z);
  const a=Math.atan2(-d.x,-d.z);
  if(catacombTerrainCut(x,z,1.5))return;
  b.group(x,y,z,a,()=>{
    b.put('box','#66523e',0,.94,0,.14,1.89,.15,0,0,0,'agedWood');
    b.put('box','#3f5149',0,1.63,0,1.74,.39,.12,0,0,0,'agedWood');
    for(const x of [-.76,.76])b.put('ball','#303633',x,1.63,.071,.045,.045,.025,0,0,0,'iron');
    label(root,b,title,'#f5dfaa',0,1.63,.066,1.58,.31);
    b.group(0,1.63,-.067,Math.PI,()=>label(root,b,'Briarwick','#f5dfaa',0,0,0,1.42,.30));
  });
}
export function buildWoodland(root,leaves){
  const ground=easternGround(root);const b=new Builder(root),trailGround=trailMesh(root,b);
  for(const [t,title] of [[.024,'Thornmere Castle'],[.36,'Pinewood Way'],[.73,'Castle Road'],[.967,'Thornmere Castle']])sign(root,b,t,title);
  for(let j=1;j<16;j++){
    const p=trail.getPointAt(j/16),d=trail.getTangentAt(j/16),s=j%2?1:-1,x=p.x+s*1.82*d.z,z=p.z-s*1.82*d.x;
    if(!catacombTerrainCut(x,z,2.5))lantern(b,x,height(x,z),z);
  }
  b.finish();
  const trunks=new Map();
  function register(x,z,r){
    const k=Math.floor(x/5)+','+Math.floor(z/5);if(!trunks.has(k))trunks.set(k,[]);trunks.get(k).push({x,z,r});
  }
  for(let cx=25;cx<219;cx+=24)for(let cz=-98;cz<62;cz+=24){
    const trees=new Builder(root);
    for(let j=0;j<33;j++){
      const x=cx+range(0,24),z=cz+range(0,24),dist=trailDistance(x,z),moat=moatDistance(x,z);
      if(dist<2.9||moat<12||catacombTerrainCut(x,z,3.4)||x<51&&dist>9||x<54.25&&Math.abs(z)>49)continue;
      if(x>estate.x-20&&x<estate.x+18&&z>estate.z+23&&z<estate.z+53&&Math.abs(x-estate.x)<9)continue;
      const s=range(.87,1.65);if(j%3===0)beech(trees,x,z,s);else pine(trees,x,z,s);
      if(j%3===0)leaves?.add(x,height(x,z)+4.9*s,z,s*1.4);
      register(x,z,s*.24+.16);
    }
    trees.finish();
  }
  const low=new Builder(root);
  for(let i=0;i<2250;i++){
    const t=range(.05,.98),p=trail.getPointAt(t),d=trail.getTangentAt(t),s=(i%2?-1:1)*range(1.65,9),x=p.x+s*d.z,z=p.z-s*d.x,y=height(x,z);
    if(trailDistance(x,z)<1.58||catacombTerrainCut(x,z,1.25))continue;
    if(i%8===0){low.put('stone',tint('#777a71'),x,y+.06,z,.68,.30,.52,.1,t*8,0,'stone');continue;}
    if(i%11===0){for(let j=0;j<3;j++){const xx=x+j*.12;low.put('cyl','#e6d9b7',xx,y+.09,z,.046,.18,.046);low.put('ball','#b86743',xx,y+.18,z,.17,.09,.17);}continue;}
    for(let j=0;j<6;j++){const a=j*2.4+i;low.put('leaf',tint(i%3?'#708b4f':'#899f56'),x+.13*Math.sin(a),y+.15,z+.14*Math.cos(a),.105,.38,.14,.65*Math.cos(a),0,-.65*Math.sin(a),'plant');}
  }
  for(let i=0;i<90;i++){
    const t=range(.04,.98),p=trail.getPointAt(t),d=trail.getTangentAt(t),side=pick([-1,1]),offset=side*range(3.1,10.5),x=p.x+d.z*offset,z=p.z-d.x*offset,y=height(x,z);
    if(trailDistance(x,z)<2.8||moatDistance(x,z)<10||catacombTerrainCut(x,z,2.5))continue;
    if(i%5===0){
      const len=range(1.1,2.7),a=range(0,TAU);
      low.put('cyl',tint('#51473b'),x,y+.18,z,.24,len,.24,Math.PI/2,a,0,'agedWood');
      low.put('cyl','#807560',x+Math.cos(a)*len*.49,y+.18,z-Math.sin(a)*len*.49,.25,.035,.25,Math.PI/2,a,0,'agedWood');
    }else{
      const s=range(.16,.48);low.put('stone',tint(pick(['#676c66','#77796f','#89857a']),.08),x,y+s*.14,z,s*1.25,s*.43,s,range(-.3,.3),range(0,TAU),0,'stone');
    }
  }
  low.finish();
  const clear=(x,z)=>{
    const cx=Math.floor(x/5),cz=Math.floor(z/5);
    for(let j=-1;j<=1;j++)for(let i=-1;i<=1;i++)for(const t of trunks.get((cx+i)+','+(cz+j))||[])
      if((x-t.x)**2+(z-t.z)**2<t.r*t.r)return false;
    return true;
  };
  return {clear,ground,trailGround};
}
