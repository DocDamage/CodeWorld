import {applyTurf} from './meadow.js';
import {plantTree,ridgeTree} from './trees.js';
import {soilMesh} from './soil.js';
import * as T from 'three';
import {Builder,meshSurface,range,tint,v,TAU,label} from './model.js';
import {grassAllowed,grassMap,height} from './land.js';
import {lake,lakePoint,lakeRadius,dock,falls,alderInfluence,alderX,alderWidth,lipZ} from './lake-layout.js';
import {buildAlderFalls} from './waterfall.js';

function groundPatch(root,x0,x1,z0,z1,mat){
  const nx=Math.ceil((x1-x0)/.78),nz=Math.ceil((z1-z0)/.78),pos=[],uv=[],idx=[],cols=[],alpine=[];
  const sand=new T.Color('#9b9070'),weed=new T.Color('#5b7356'),color=new T.Color();
  const slate=new T.Color('#68706c'),moss=new T.Color('#768150'),snow=new T.Color('#e1e8e5');
  for(let j=0;j<=nz;j++)for(let i=0;i<=nx;i++){
    const x=x0+(x1-x0)*i/nx,z=z0+(z1-z0)*j/nz,y=height(x,z),r=lakeRadius(x,z);
    color.copy(sand).lerp(weed,Math.min(1,Math.abs(r-1)*4)).multiplyScalar(.90+.07*Math.cos(x*.8+z*.26)+.06*Math.sin(z*.53-x*.37));
    let rockFace=0,snowCover=0;
    if(z>lipZ-8&&alderInfluence(x,z)>.01){
      const slope=Math.hypot(height(x+.5,z)-height(x-.5,z),height(x,z+.5)-height(x,z-.5));
      const up=z-lipZ,band=.5+.5*Math.sin(3.8*y+.18*x+.09*z);
      color.lerp(moss,.45).lerp(slate,Math.min(1,.22+slope*.85)).multiplyScalar(.80+band*.24);
      const drift=(up-47)*.15-slope*.60+.21*Math.sin(x*.91)+.34*Math.cos(x*.37-up*.52);
      rockFace=Math.min(1,Math.max(0,(slope-.52)*1.45))*alderInfluence(x,z);
      snowCover=Math.min(1,Math.max(0,drift))*alderInfluence(x,z);
      color.lerp(snow,snowCover);
    }
    alpine.push(rockFace,snowCover);
    pos.push(x,y,z);cols.push(color.r,color.g,color.b);uv.push(x*.38,z*.38);
    if(i&&j){const k=j*(nx+1)+i;idx.push(k-nx-2,k-1,k,k-nx-2,k,k-nx-1);}
  }
  const m=meshSurface(root,pos,idx,cols,{map:mat,roughness:1,flatShading:false});
  m.geometry.setAttribute('uv',new T.Float32BufferAttribute(uv,2));
  m.geometry.setAttribute('alpineCover',new T.Float32BufferAttribute(alpine,2));
  // Sample stone in the vertical plane of the face. A plan-view turf texture
  // stretches into long green stripes where the escarpment drops away.
  m.material.onBeforeCompile=shader=>{
    shader.vertexShader='attribute vec2 alpineCover;varying vec2 cover;varying vec3 ledge;\n'+
      shader.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\ncover=alpineCover;ledge=position;');
    shader.fragmentShader='varying vec2 cover;varying vec3 ledge;\n'+
      shader.fragmentShader.replace('#include <color_fragment>',`#include <color_fragment>
        if(cover.x+cover.y>.015){
          float shear=ledge.y+.16*ledge.x+.48*sin(ledge.x*.47+ledge.z*.28);
          vec2 face=vec2(ledge.x+ledge.z*.61,shear);
          float grain=texture2D(map,face*vec2(.19,.54)).r;
          float strata=texture2D(map,face*vec2(.035,.28)+grain*.064).g;
          float fault=sin(ledge.x*1.73+sin(ledge.z*.68)+shear*.27);
          float joint=(1.-smoothstep(.04,.16,abs(fault)))*smoothstep(.31,.65,strata+grain);
          float seam=1.-smoothstep(.018,.15,abs(fract(shear*.72+strata*.54)-.5));
          vec3 stone=mix(vec3(.115,.136,.137),vec3(.40,.375,.31),clamp(strata*1.15+.24*grain,0.,1.));
          stone*=.87+grain*.52-seam*.075-joint*.18;
          diffuseColor.rgb=mix(diffuseColor.rgb,stone,cover.x);
          diffuseColor.rgb=mix(diffuseColor.rgb,vec3(.76,.83,.87)*(.86+.2*grain),cover.y);
        }`);
  };
  applyTurf(m,(x,z)=>grassAllowed(x,z,'lakeshore'));
  return soilMesh(m,'shore');
}
function lakeSurface(root,material){
  const pos=[],bed=[],idx=[],rings=45,sides=156;
  for(let j=0;j<=rings;j++)for(let i=0;i<=sides;i++){
    const {x,z}=lakePoint(i*TAU/sides,j/rings*1.004);
    pos.push(x,lake.level,z);bed.push(.84,-.2,height(x,z));
    if(i&&j){const k=j*(sides+1)+i;idx.push(k-sides-2,k-1,k,k-sides-2,k,k-sides-1);}
  }
  const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(pos,3));g.setAttribute('waterBed',new T.Float32BufferAttribute(bed,3));g.setIndex(idx);
  g.setAttribute('lakeClarity',new T.BufferAttribute(new Float32Array(pos.length/3).fill(1),1));
  const water=new T.Mesh(g,material);root.add(water);
}
function southernRidge(root,b){
  // Fold two wooded ridges around the far shore. Taper their ends into the valley.
  const pos=[],cols=[],idx=[],count=110;
  for(let row=0;row<=12;row++)for(let i=0;i<=count;i++){
    const a=-.36+i/count*(Math.PI+.75),r=1.19+row*.103,p=lakePoint(a,r);
    const fringe=Math.min(1,i/12,(count-i)/12);
    const peak=10+4*Math.sin(a*7)+3*Math.cos(a*13)+2*Math.sin(a*24);
    const native=lakeHeightForRidge(p,r,row,peak)*fringe-2.8;
    const cover=alderInfluence(p.x,p.z);
    const y=native+cover*(Math.min(native,height(p.x,p.z)-8)-native);
    pos.push(p.x,y,p.z);
    const c=new T.Color(row>8?'#758781':'#526b59').lerp(new T.Color('#888c7a'),Math.max(0,(y-8)/22));
    c.multiplyScalar(.92+.10*Math.cos(a*24+row*.65));cols.push(c.r,c.g,c.b);
    if(i&&row){const k=row*(count+1)+i;idx.push(k-count-2,k-1,k,k-count-2,k,k-count-1);}
    if(row>1&&y>2&&row<10&&i%3&&cover<.12){
      const h=2+.9*Math.cos(i*3.4+row);ridgeTree(b,p.x,y,p.z,h,a);
    }
  }
  meshSurface(root,pos,idx,cols,{roughness:1,flatShading:true});
}
function lakeHeightForRidge(p,r,row,peak){
  return Math.max(0,Math.min(1,(r-1.25)*1.9))*(peak*(.54+.40*Math.sin((row-2)*.90))+
    Math.max(0,row-6)*1.65+1.65*Math.sin(p.x*.17+p.z*.09));
}

function approach(root,b){
  const path=new T.CatmullRomCurve3([[3,33],[7,37],[13,42],[20,46.5],[25.1,52.2],[26,57.4]].map(([x,z])=>v(x,0,z)));
  const pos=[],cols=[],idx=[];
  for(let i=0;i<=80;i++){
    const p=path.getPointAt(i/80),d=path.getTangentAt(i/80);
    for(let j=0;j<5;j++){
      const width=(j-2)*(.38+.04*Math.cos(i*.35)),x=p.x+width*d.z,z=p.z-width*d.x;
      pos.push(x,height(x,z)+.035,z);
      const color=tint(j===0||j===4?'#898969':'#a19577',.045);cols.push(color.r,color.g,color.b);
      if(i&&j){const k=i*5+j;idx.push(k-6,k-1,k,k-6,k,k-5);}
    }
  }
  meshSurface(root,pos,idx,cols);
  b.group(4.1,height(4.1,34.1),34.1,Math.PI-.3,()=>{
    b.put('box','#6e5942',0,.79,0,.11,1.63,.12,0,0,0,'agedWood');
    b.put('box','#5b5540',0,1.45,.02,1.05,.26,.10,0,0,0,'agedWood');
    label(root,b,'ALDER LAKE','#efe3bd',0,1.45,.076,.98,.23);
  });
}

export function buildLakeScenery(root,waterMaterial){
  const b=new Builder(root),map=grassMap();
  // The east woodland already supplies the portion east of x=54.25 up to z=102.64.
  const shores=[groundPatch(root,-35,54.25,54.25,lipZ+80,map),groundPatch(root,54.25,96,102.64,lipZ+80,map)];
  southernRidge(root,b);approach(root,b);lakeSurface(root,waterMaterial);
  buildAlderFalls(root,b,waterMaterial);
  const trunks=[];
  for(let i=0;i<245;i++){
    const a=range(0,TAU),r=range(1.09,1.49),{x,z}=lakePoint(a,r);
    if((Math.abs(x-dock.x)<4&&z<lake.z)||x< -34||z<54.25||x>93||
      (z>lipZ-3&&Math.abs(x-alderX(z-lipZ))<alderWidth(z-lipZ)+2.7))continue;
    const y=height(x,z),h=range(3.2,9.6);
    if(z>lipZ-5 && Math.hypot(height(x+.5,z)-height(x-.5,z),height(x,z+.5)-height(x,z-.5))>.72)continue;
    plantTree(b,i%4?'fir':'beech',x,y,z,h);
    trunks.push({x,z,r:h*.025+.17});
  }
  for(let i=0;i<530;i++){
    const {x,z}=lakePoint(range(0,TAU),range(.85,1.065)),s=range(.09,.62);
    b.put('stone',tint(i%3?'#86877b':'#a0977c'),x,height(x,z)+s*.12,z,s*1.28,s*.58,s,.16,range(0,TAU),.07,'stone');
  }
  const len=dock.end-dock.near;
  for(let i=0;i<36;i++){
    const z=dock.near+(i+.5)*len/36;
    b.put('box',tint(i%3?'#948166':'#807059',.07),dock.x,dock.deck-.07,z,dock.width,.14,len/36-.015,0,0,0,'agedWood');
  }
  for(const x of [dock.x-.78,dock.x+.78]){
    b.put('box','#615540',x,dock.deck-.22,dock.near+len/2,.14,.20,len,0,0,0,'wood');
    for(let j=0;j<5;j++){const z=dock.near+.20+j*(len-.40)/4;
      b.put('cyl',tint('#67563e'),x,-.23,z,.18,2.37,.18,0,j,0,'agedWood');
      b.put('ring','#afa281',x,.83,z,.20,.20,.20,Math.PI/2);
    }
  }
  b.finish();
  return {shores,clear(x,z){return !trunks.some(tree=>(tree.x-x)**2+(tree.z-z)**2<tree.r**2)&&
    !(Math.abs(x-falls.x)<13&&z>falls.z+.5&&z<falls.z+7.5);}};
}
