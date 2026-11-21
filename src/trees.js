import * as T from 'three';
import {registerSharedGeometry,registerSharedMaterial} from './model.js';
import {swayMaterial} from './foliage.js';
import {branchMap,barkMap,ridgeMap,seeded} from './botanical-textures.js';

function surface(){
  const positions=[],indices=[],uv=[],colour=[];
  return {positions,indices,uv,colour,finish(){
    const geometry=new T.BufferGeometry();
    for(const [key,data,size] of [['position',positions,3],['uv',uv,2],['color',colour,3]])
      geometry.setAttribute(key,new T.Float32BufferAttribute(data,size));
    geometry.setIndex(indices);geometry.computeVertexNormals();return geometry;
  }};
}
const up=new T.Vector3(0,1,0);
const point=(x,y,z)=>new T.Vector3(x,y,z);
function limb(g,start,end,base,tip,sides){
  const axis=end.clone().sub(start).normalize();
  const along=point(0,0,1).cross(axis).normalize(),across=axis.clone().cross(along);
  const first=g.positions.length/3;
  for(let endIndex=0;endIndex<2;endIndex++)for(let i=0;i<=sides;i++){
    const a=i/sides*Math.PI*2,rad=endIndex?tip:base;
    const p=(endIndex?end:start).clone().addScaledVector(along,rad*Math.cos(a)).addScaledVector(across,rad*Math.sin(a));
    g.positions.push(p.x,p.y,p.z);g.uv.push(i/sides*2,p.y*5);
    const light=.85+.13*Math.cos(a);g.colour.push(light,light,light);
    if(endIndex&&i){
      const a=first+i-1,b=a+sides+1;
      g.indices.push(a,a+1,b+1,a,b+1,b);
    }
  }
}
function spray(g,start,end,width,roll,shade,arched=true){
  const dir=end.clone().sub(start).normalize(),wing=dir.clone().cross(up);
  if(wing.lengthSq()<.0001)wing.set(1,0,0);else wing.normalize();
  wing.applyAxisAngle(dir,roll);
  const n=g.positions.length/3;
  for(const [p,w,u,v] of [[start,-width,0,0],[start,width,1,0],[end,-width,0,1],[end,width,1,1]]){
    const q=p.clone().addScaledVector(wing,w);g.positions.push(q.x,q.y,q.z);g.uv.push(u,v);
    const l=shade*(v?.99:.82);g.colour.push(l*.98,l,l*.96);
  }
  if(!arched){g.indices.push(n,n+1,n+2,n+2,n+1,n+3);return;}
  // Bow the midrib away from the tips, so edge-on sprays still have volume.
  const rib=start.clone().lerp(end,.51);rib.y+=width*.32;
  g.positions.push(rib.x,rib.y,rib.z);g.uv.push(.5,.51);g.colour.push(shade*.96,shade,shade*.94);
  g.indices.push(n,n+1,n+4,n+1,n+3,n+4,n+3,n+2,n+4,n+2,n,n+4);
}
function treeGeometry(pine,seed){
  const r=seeded(seed),wood=surface(),leaves=surface(),golden=2.399963;
  const lean=point((r()-.5)*.13,0,(r()-.5)*.13);
  const trunk=h=>point(lean.x*h*h+.012*Math.sin(h*8),h,lean.z*h*h);
  const radius=h=>(.033*(1-h)**.77+.001)*(pine?.86:1.12);
  const levels=[0,.07,.28,.49,.69,.86,1];
  const sides=8;
  for(let j=0;j<levels.length;j++){
    const h=levels[j],p=trunk(h),rad=radius(h)*(j===0?1.18:1);
    for(let i=0;i<=sides;i++){
      const a=i/sides*Math.PI*2,flute=rad*(1+.075*Math.cos(a*3+.4));
      wood.positions.push(p.x+Math.cos(a)*flute,j===0?-.042:p.y,p.z+Math.sin(a)*flute);
      wood.uv.push(i/sides*2,p.y*5);wood.colour.push(.93,.93,.93);
      if(j&&i){const k=j*(sides+1)+i;wood.indices.push(k-sides-2,k-1,k,k-sides-2,k,k-sides-1);}
    }
  }
  for(let i=0;i<5;i++){
    const a=i*golden;limb(wood,point(.068*Math.cos(a),-.038,.068*Math.sin(a)),trunk(.041),.003,.019,5);
  }
  const count=pine?33:17;
  for(let i=0;i<count;i++){
    const t=(i+r()*.38)/count,h=(pine?.24:.30)+t*(pine?.74:.64),a=i*golden+r()*.48;
    const dir=point(Math.cos(a),0,Math.sin(a)),side=point(-dir.z,0,dir.x);
    const length=(pine?.30*(1-t)**.69:.15+.21*Math.sin(Math.PI*(.14+t*.81)))*(.82+.32*r());
    const start=trunk(h),fork=start.clone().addScaledVector(dir,length*.53);
    fork.y+=pine?-.035*(1-t):.07+.055*r();
    const end=fork.clone().addScaledVector(dir,length*.52);end.y+=pine?.025+.024*r():.064+.084*r();
    if(!pine||i%3===0)limb(wood,start,fork,(pine?.008:.015)*(1-.6*t),pine?.0035:.006,5);
    if(!pine)limb(wood,fork,end,.006,.002,4);
    const spread=pine?(.09+.14*(1-t)):(.16+.038*r());
    const light=.73+.19*t+.20*r();
    const base=pine?start.clone().lerp(fork,.30):fork;
    const tip=end.clone().addScaledVector(dir,spread*.35);tip.y+=pine?-.025:.055;
    spray(leaves,base,tip,spread*.72,(r()-.5)*.9,light);
    for(const sign of [-1,1]){
      const joint=base.clone().lerp(end,pine?.34:.38);
      const extremity=joint.clone().addScaledVector(side,sign*spread*.85).addScaledVector(dir,spread*.70);
      extremity.y+=(pine?-.035:.045)+r()*.06;
      spray(leaves,joint,extremity,spread*.60,sign*(.40+r()*.74),light);
      if(!pine){
        const outer=extremity.clone().addScaledVector(dir,.067);outer.y+=.105;
        spray(leaves,extremity.clone().lerp(joint,.49),outer,spread*.45,sign*(1+r()),light);
      }
    }
  }
  return [wood.finish(),leaves.finish()];
}
let installed=false;
function install(){
  if(installed)return;
  const bark=barkMap();
  registerSharedMaterial('livingBark',swayMaterial(new T.MeshStandardMaterial({map:bark,bumpMap:bark,bumpScale:.035,roughness:1,vertexColors:true}),{strength:.62,tree:true}));
  for(const [species,pine] of [['beech',false],['fir',true]]){
    const material=new T.MeshStandardMaterial({map:branchMap(pine),alphaTest:.29,side:T.DoubleSide,roughness:.94,vertexColors:true});
    registerSharedMaterial(species+'Sprays',swayMaterial(material,{strength:.62,tree:true,flutter:true}));
    const [wood,leaf]=treeGeometry(pine,pine?45321:82451);
    if(!pine){
      const twigs=surface();
      for(let i=0;i<19;i++){
        const a=i*2.39996,r=.12+.19*Math.cos(i*.73)**2;
        const from=point(Math.cos(a)*r*.25,.09,Math.sin(a)*r*.25),to=point(Math.cos(a)*r,.66+.25*Math.sin(i*1.8),Math.sin(a)*r);
        spray(twigs,from,to,.22,(i%5-2)*.46,.86+.06*Math.sin(i));
      }
      registerSharedGeometry('shrubSprays',twigs.finish());
    }
    registerSharedGeometry(species+'Frame',wood);registerSharedGeometry(species+'Foliage',leaf);
  }
  const far=surface();
  for(const a of [0,Math.PI*.5])spray(far,point(0,0,0),point(0,1,0),.32,a,1,false);
  registerSharedGeometry('distantFir',far.finish());
  registerSharedMaterial('distantNeedles',new T.MeshStandardMaterial({map:ridgeMap(),alphaTest:.28,side:T.DoubleSide,roughness:1}));
  installed=true;
}
export function plantTree(b,species,x,y,z,height,width=height){
  install();
  const seed=Math.sin(x*173.31+z*91.89)*317.71;
  const yaw=seed%6.283,shade=.85+.15*(seed-Math.floor(seed)),colour=new T.Color(shade,shade,shade);
  b.put(species+'Frame',species==='fir'?'#6f6255':'#8c8072',x,y,z,width,height,width,0,yaw,0,'livingBark');
  b.put(species+'Foliage',colour,x,y,z,width,height,width,0,yaw,0,species+'Sprays');
}
export function plantShrub(b,x,y,z,h,w){
  install();b.put('shrubSprays','#e1e3cb',x,y,z,w,h,w,0,x+z,0,'beechSprays');
}
export function ridgeTree(b,x,y,z,height,yaw){
  install();b.put('distantFir','#ffffff',x,y,z,height,height,height,0,yaw,0,'distantNeedles');
}
