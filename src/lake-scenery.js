import {soilMesh} from './soil.js';
import * as T from 'three';
import {Builder,meshSurface,range,tint,v,TAU,label} from './model.js';
import {grassMap,height} from './land.js';
import {lake,lakePoint,lakeRadius,lakeDepth,dock,falls} from './lake-layout.js';

function groundPatch(root,x0,x1,z0,z1,mat){
  const nx=Math.ceil((x1-x0)/.90),nz=Math.ceil((z1-z0)/.90),pos=[],uv=[],idx=[],cols=[];
  const sand=new T.Color('#9b9070'),weed=new T.Color('#5b7356'),color=new T.Color();
  for(let j=0;j<=nz;j++)for(let i=0;i<=nx;i++){
    const x=x0+(x1-x0)*i/nx,z=z0+(z1-z0)*j/nz,y=height(x,z),r=lakeRadius(x,z);
    color.copy(sand).lerp(weed,Math.min(1,Math.abs(r-1)*4)).multiplyScalar(.90+.07*Math.cos(x*.8+z*.26)+.06*Math.sin(z*.53-x*.37));
    pos.push(x,y,z);cols.push(color.r,color.g,color.b);uv.push(x*.38,z*.38);
    if(i&&j){const k=j*(nx+1)+i;idx.push(k-nx-2,k-1,k,k-nx-2,k,k-nx-1);}
  }
  const m=meshSurface(root,pos,idx,cols,{map:mat,roughness:1,flatShading:false});
  m.geometry.setAttribute('uv',new T.Float32BufferAttribute(uv,2));return soilMesh(m,'shore');
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
function waterfall(root,b){
  const {x,z}=falls;
  // A dark, stepped escarpment leaves the falling sheet in front of the rock face.
  for(let i=-8;i<=8;i++)for(let j=0;j<3;j++){
    const h=Math.max(1.3,9.2-.61*Math.abs(i)+Math.cos(i*.77)*.8);
    b.put('stone',tint(j===2?'#69725d':'#59615c',.15),x+i*1.55,h*(.12+j*.31),z+4.2+Math.cos(i*.79)*.55,4.7,h*.66,6.5,range(-.13,.13),range(-.3,.3),range(-.12,.12),'stone');
  }
  const pos=[],uv=[],idx=[],across=28,rows=29;
  for(let j=0;j<=rows;j++)for(let i=0;i<=across;i++){
    const s=i/across,u=j/rows,w=s*2-1;
    pos.push(x+w*(2.5+u*.89)+.12*Math.sin(s*7),9.45*(1-u*u)-.14*w*w,z+3.3-3.8*Math.sin(u*Math.PI*.51)+.11*Math.cos(w*10));
    uv.push(s,u);
    if(i&&j){const k=j*(across+1)+i;idx.push(k-across-2,k-1,k,k-across-2,k,k-across-1);}
  }
  const geometry=new T.BufferGeometry();geometry.setAttribute('position',new T.Float32BufferAttribute(pos,3));geometry.setAttribute('uv',new T.Float32BufferAttribute(uv,2));geometry.setIndex(idx);geometry.computeVertexNormals();
  const clock={value:0};
  const curtain=new T.MeshStandardMaterial({color:'#c0dfd9',roughness:.42,transparent:true,opacity:.9,side:T.DoubleSide});
  curtain.onBeforeCompile=shader=>{
    shader.uniforms.fallsClock=clock;
    shader.vertexShader='varying vec2 chute;\n'+shader.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\n chute=uv;');
    shader.fragmentShader='varying vec2 chute;uniform float fallsClock;\n'+shader.fragmentShader.replace('#include <color_fragment>',`#include <color_fragment>
      float lane=sin(chute.x*143.+1.2*sin(chute.y*9.-fallsClock*3.)+.8*sin(chute.x*41.));
      float glint=sin(chute.y*58.-fallsClock*13.+chute.x*49.);
      diffuseColor.rgb*=.66+.38*smoothstep(-.9,.74,lane+.44*glint);
      diffuseColor.a*=.68+.32*smoothstep(-1.,.5,lane);`);
  };
  const sheet=new T.Mesh(geometry,curtain);root.add(sheet);
  // The spray fans out from the foot of the falls. Its particles loop ballistically.
  const sprayPos=new Float32Array(95*3),sprayG=new T.BufferGeometry();
  sprayG.setAttribute('position',new T.BufferAttribute(sprayPos,3));
  const spray=new T.Points(sprayG,new T.PointsMaterial({color:'#e1e9dc',size:.14,transparent:true,opacity:.63,depthWrite:false}));
  spray.position.set(x,.06,z-.5);spray.frustumCulled=false;root.add(spray);
  return t=>{
    clock.value=t;
    for(let i=0;i<95;i++){
      const a=(i*.618033+t*(.7+(i%7)*.073))%1;
      sprayPos[i*3]=Math.sin(i*1.71)*3.3+Math.cos(i)*a*.7;
      sprayPos[i*3+1]=a*(1-a)*(2+(i%5)*.7);
      sprayPos[i*3+2]=Math.sin(i*2.6)*.44-a*(.6+(i%9)*.19);
    }
    sprayG.attributes.position.needsUpdate=true;
  };
}

function southernRidge(root,b){
  // Fold two wooded ridges around the far shore. Taper their ends into the valley.
  const pos=[],cols=[],idx=[],count=110;
  for(let row=0;row<=12;row++)for(let i=0;i<=count;i++){
    const a=-.36+i/count*(Math.PI+.75),r=1.19+row*.103,p=lakePoint(a,r);
    const fringe=Math.min(1,i/12,(count-i)/12);
    const peak=10+4*Math.sin(a*7)+3*Math.cos(a*13)+2*Math.sin(a*24);
    const y=lakeHeightForRidge(p,r,row,peak)*fringe-2.8;
    pos.push(p.x,y,p.z);
    const c=new T.Color(row>8?'#758781':'#526b59').lerp(new T.Color('#888c7a'),Math.max(0,(y-8)/22));
    c.multiplyScalar(.92+.10*Math.cos(a*24+row*.65));cols.push(c.r,c.g,c.b);
    if(i&&row){const k=row*(count+1)+i;idx.push(k-count-2,k-1,k,k-count-2,k,k-count-1);}
    if(row>1&&y>2&&row<10&&i%3){
      const h=2+.9*Math.cos(i*3.4+row);b.put('pine',tint('#476451'),p.x,y+h*.39,p.z,h*.56,h,h*.56,0,a);
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
  const shores=[groundPatch(root,-35,54.25,54.25,182,map),groundPatch(root,54.25,96,102.64,182,map)];
  southernRidge(root,b);approach(root,b);lakeSurface(root,waterMaterial);
  const fallTick=waterfall(root,b);
  const trunks=[];
  for(let i=0;i<245;i++){
    const a=range(0,TAU),r=range(1.09,1.49),{x,z}=lakePoint(a,r);
    if((Math.abs(x-dock.x)<4&&z<lake.z)||x< -34||z<54.25||x>93)continue;
    const y=height(x,z),h=range(3.2,9.6);
    b.put('cyl',tint('#655646'),x,y+h*.28,z,h*.05,h*.60,h*.05,0,0,0,'wood');
    trunks.push({x,z,r:h*.025+.17});
    if(i%4){
      for(let k=0;k<4;k++){const w=h*(.42-k*.071);b.put('pine',tint(['#375344','#456448','#4d6b52','#57745b'][k],.1),x,y+h*(.38+k*.16),z,w,h*(.52-k*.055),w,.025,i+k*.41,0,'canopy');}
    }else{
      for(let k=0;k<5;k++){const q=k*2.40+i;b.put('crown',tint(k%2?'#647b48':'#80905a'),x+Math.cos(q)*h*.14,y+h*(.67+.07*Math.sin(q)),z+Math.sin(q)*h*.14,h*.48,h*.39,h*.49,0,q,0,'canopy');}
    }
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
  return {shores,tick:fallTick,clear(x,z){return !trunks.some(tree=>(tree.x-x)**2+(tree.z-z)**2<tree.r**2)&&
    !(Math.abs(x-falls.x)<13&&z>falls.z+.5&&z<falls.z+7.5);}};
}
