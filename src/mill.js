import * as T from 'three';
import { Builder,TAU,range,tint,v } from './model.js';
import { millWheel,bucketPose } from './hydraulics.js';
import { brookLevel } from './layout.js';

const timber='#594436',rim='#342d27',iron='#474948';
const cupWidth=.91,cupDepth=.51,cupBottom=-.26,cupTop=.19;

function wetSection(angle,fill){
  const c=Math.cos(angle),s=Math.sin(angle);
  const section=[[cupBottom,-cupDepth/2],[cupBottom,cupDepth/2],[cupTop,cupDepth/2],[cupTop,-cupDepth/2]]
    .map(([y,z])=>[y*c-z*s,y*s+z*c]);
  function below(level){
    const out=[];
    for(let i=0;i<4;i++){
      const a=section[i],b=section[(i+1)%4],inside=a[0]<=level;
      if(inside)out.push(a);
      if(inside!==(b[0]<=level))out.push([level,a[1]+(b[1]-a[1])*(level-a[0])/(b[0]-a[0])]);
    }
    return out;
  }
  function area(poly){
    let sum=0;
    for(let i=0;i<poly.length;i++){
      const a=poly[i],b=poly[(i+1)%poly.length];sum+=a[0]*b[1]-a[1]*b[0];
    }
    return Math.abs(sum)*.5;
  }
  let min=Math.min(...section.map(p=>p[0])),max=Math.min(section[2][0],section[3][0]);
  const wanted=fill*cupDepth*(cupTop-cupBottom)*.95;
  for(let i=0;i<9;i++){
    const mid=(min+max)*.5;
    if(area(below(mid))<wanted)min=mid;else max=mid;
  }
  return below((min+max)*.5);
}

export function buildMillWheel(root,drive) {
  const {x,y,z,a,radius,count}=millWheel;
  const station=new T.Group();station.position.set(x,y,z);station.rotation.y=a;root.add(station);
  const hub=new T.Group();station.add(hub);
  const b=new Builder(hub);
  for(const side of [-1,1]){
    b.put('ring',rim,side*.57,0,0,radius*1.98,radius*1.98,2.6,0,Math.PI/2);
    b.put('ring',timber,side*.48,0,0,radius*1.83,radius*1.83,2.1,0,Math.PI/2);
    for(let i=0;i<10;i++){
      const angle=i*TAU/10;
      b.beam(timber,v(side*.43,0,0),v(side*.49,radius*.95*Math.cos(angle),radius*.95*Math.sin(angle)),.17,.18);
      b.put('ball',iron,side*.63,radius*.92*Math.cos(angle),radius*.92*Math.sin(angle),.13,.10,.10);
    }
  }
  for(let i=0;i<count;i++){
    const angle=i*TAU/count,yy=-Math.cos(angle)*millWheel.carrierRadius,zz=-Math.sin(angle)*millWheel.carrierRadius;
    for(const side of [-1,1])b.put('cyl',iron,side*.57,yy,zz,.133,.24,.133,0,0,Math.PI/2);
    // The broad paddles push against the current. The hanging cups turn on their own pins.
    b.put('box',tint(timber),0,yy*.89,zz*.89,1.03,.10,.23,angle);
  }
  b.put('cyl',iron,.22,0,0,.40,2.76,.40,0,0,Math.PI/2);
  b.finish();

  const gate=new T.Group();gate.position.set(0,brookLevel-y-.12,-2.85);station.add(gate);
  const bed=new Builder(station);
  for(const side of [-1,1]){
    const xx=side*.79;
    for(const zz of [-3.5,-2.62,2.36])bed.put('box',timber,xx,-.94,zz,.23,2.2,.27,0,0,0,'wood');
    bed.put('box','#575750',xx,-1.64,-2.40,.37,1.1,3.75,0,0,0,'stone');
  }
  bed.put('box',timber,0,.28,-2.85,2,.26,.39,0,0,0,'wood');
  bed.put('box','#575650',.96,-.81,0,.68,1.63,.77,0,0,0,'stone');
  bed.put('box',iron,-.61,-1.21,-1.25,.08,.16,.81,.44);
  bed.finish();
  const gateBuilder=new Builder(gate);
  for(let i=-3;i<=3;i++)gateBuilder.put('box',tint(timber),i*.19,0,0,.18,.91,.16,0,0,0,'wood');
  for(const yy of [-.29,.29])gateBuilder.put('box',iron,0,yy,-.08,1.45,.10,.11);
  gateBuilder.put('box',iron,0,.59,0,.11,.81,.11);
  gateBuilder.finish();

  const cupParts=[
    [0,cupBottom-.023,0,1.02,.062,.59],[0,-.035,-.278,1.02,.45,.052],[0,-.035,.279,1.02,.45,.052],
    [0,.191,-.285,1.05,.058,.077],[.49,-.042,0,.061,.451,.59],
    [-.49,-.23,0,.08,.065,.59],[-.49,.16,0,.08,.075,.59],[-.49,-.039,-.25,.08,.35,.074],[-.49,-.039,.25,.08,.35,.074]
  ];
  const cups=new T.InstancedMesh(new T.BoxGeometry(1,1,1),new T.MeshStandardMaterial({color:'#9a7553',roughness:.83}),count*cupParts.length);
  cups.frustumCulled=false;cups.castShadow=true;cups.receiveShadow=true;cups.instanceMatrix.setUsage(T.DynamicDrawUsage);station.add(cups);
  for(let i=0;i<cups.count;i++)cups.setColorAt(i,tint(i%cupParts.length===3?'#c1ac8b':'#aa8064',.13));
  const inspection=new T.InstancedMesh(new T.BoxGeometry(1,1,1),new T.MeshStandardMaterial({color:'#83a5a6',transparent:true,opacity:.16,roughness:.19,depthWrite:false}),count);
  inspection.frustumCulled=false;inspection.instanceMatrix.setUsage(T.DynamicDrawUsage);inspection.renderOrder=2;station.add(inspection);
  const liquidData=new Float32Array(count*90*3),liquidGeometry=new T.BufferGeometry();
  liquidGeometry.setAttribute('position',new T.BufferAttribute(liquidData,3).setUsage(T.DynamicDrawUsage));
  const waterMaterial=new T.MeshStandardMaterial({color:'#53929e',emissive:'#113a49',emissiveIntensity:.28,
    roughness:.19,metalness:.15,transparent:true,opacity:.84,flatShading:true,side:T.DoubleSide,depthWrite:false});
  const slosh={value:0};
  waterMaterial.onBeforeCompile=shader=>{
    shader.uniforms.slosh=slosh;
    shader.vertexShader=`varying vec3 cupWater;\n${shader.vertexShader}`.replace('#include <begin_vertex>','#include <begin_vertex>\ncupWater=position;');
    shader.fragmentShader=`uniform float slosh;varying vec3 cupWater;\n${shader.fragmentShader}`.replace('#include <color_fragment>',`#include <color_fragment>
      float ripples=sin(cupWater.x*47.+cupWater.z*23.-slosh*7.3+sin(cupWater.z*13.+slosh*3.2)*1.7);
      float glint=sin(cupWater.z*19.+slosh*4.7);
      float sheen=smoothstep(.81,.995,ripples)*(.28+.72*glint*glint);
      diffuseColor.rgb=mix(diffuseColor.rgb,vec3(.32,.63,.69),sheen*.38);`);
  };
  const water=new T.Mesh(liquidGeometry,waterMaterial);
  water.frustumCulled=false;station.add(water);
  const dummy=new T.Object3D(),cupsSpill=new Float32Array(count);
  const particleCount=320,particles=Array.from({length:particleCount},()=>({life:0,x:0,y:0,z:0,dx:0,dy:0,dz:0}));
  const data=new Float32Array(particleCount*3),colors=new Float32Array(particleCount*3);
  const geo=new T.BufferGeometry();geo.setAttribute('position',new T.BufferAttribute(data,3).setUsage(T.DynamicDrawUsage));geo.setAttribute('color',new T.BufferAttribute(colors,3).setUsage(T.DynamicDrawUsage));
  const spray=new T.Points(geo,new T.PointsMaterial({size:.065,vertexColors:true,transparent:true,depthWrite:false,opacity:.82}));
  spray.frustumCulled=false;station.add(spray);
  const rings=Array.from({length:38},()=>({age:1,x:0,z:0}));
  const ringMesh=new T.InstancedMesh(new T.RingGeometry(.78,1,12).rotateX(-Math.PI/2),
    new T.MeshBasicMaterial({color:'#c4dfd8',transparent:true,opacity:.30,depthWrite:false,side:T.DoubleSide}),rings.length);
  ringMesh.frustumCulled=false;ringMesh.instanceMatrix.setUsage(T.DynamicDrawUsage);station.add(ringMesh);
  let ringHead=0;
  let cursor=0,emission=0;
  const waterY=brookLevel-y;
  function drop(yy,zz,kick,vy=0,vz=0){
    const p=particles[cursor];cursor=(cursor+1)%particleCount;
    Object.assign(p,{x:range(-.45,.45),y:yy,z:zz,dx:range(-.32,.32),dy:vy+range(.08,1.26)*kick,dz:vz+range(.31,1.34)*kick,life:range(.39,1.35)});
  }
  const tick=(dt,eye)=>{
    if(eye&&Math.hypot(x-eye.x,z-eye.z)>72)return;
    slosh.value+=dt*(.31+drive.speed);
    hub.rotation.x=-drive.angle;
    gate.position.y=waterY-.18+drive.gate*1.17;
    let triangles=0;
    for(let i=0;i<count;i++){
      const {y:yy,z:zz,tip,fill,released,velocityY,velocityZ}=bucketPose(drive,i);
      const c=Math.cos(tip),s=Math.sin(tip);
      for(let j=0;j<cupParts.length;j++){
        const [px,py,pz,wx,hy,dz]=cupParts[j];
        dummy.position.set(px,yy+py*c-pz*s,zz+py*s+pz*c);dummy.rotation.x=tip;dummy.scale.set(wx,hy,dz);
        dummy.updateMatrix();cups.setMatrixAt(i*cupParts.length+j,dummy.matrix);
      }
      dummy.position.set(-.488,yy-.03*c,zz-.03*s);dummy.rotation.x=tip;dummy.scale.set(.033,.38,.475);
      dummy.updateMatrix();inspection.setMatrixAt(i,dummy.matrix);
      if(fill>.019){
        const shape=wetSection(tip,fill);
        const vertex=(side,p)=>{liquidData[triangles++]=side*cupWidth*.5;liquidData[triangles++]=yy+p[0];liquidData[triangles++]=zz+p[1];};
        if(shape.length>=3){
          for(let j=0;j<shape.length;j++){
            const a=shape[j],b=shape[(j+1)%shape.length];
            vertex(-1,a);vertex(1,a);vertex(1,b);vertex(-1,a);vertex(1,b);vertex(-1,b);
          }
          for(let j=1;j<shape.length-1;j++){
            vertex(-1,shape[0]);vertex(-1,shape[j]);vertex(-1,shape[j+1]);
            vertex(1,shape[0]);vertex(1,shape[j+1]);vertex(1,shape[j]);
          }
        }
      }
      if(Math.abs(tip)>.43&&yy>waterY-.25){
        cupsSpill[i]+=released*175;
        while(cupsSpill[i]>=1){
          cupsSpill[i]--;
          const lip=Math.sign(tip)*cupDepth/2;
          drop(yy+cupTop*c-lip*s,zz+cupTop*s+lip*c,.20,velocityY-.35,velocityZ);
        }
      }
    }
    cups.instanceMatrix.needsUpdate=true;inspection.instanceMatrix.needsUpdate=true;
    liquidGeometry.setDrawRange(0,triangles/3);liquidGeometry.attributes.position.needsUpdate=true;
    emission+=dt*drive.flow*(51+28*drive.speed);
    while(emission>=1){emission--;drop(waterY+range(.01,.10),range(-1.39,-.54),1.15);}
    for(let i=0;i<particles.length;i++){
      const p=particles[i],k=i*3;
      if(p.life>0){
        const oldY=p.y;p.life-=dt;p.dy-=9.81*dt;p.x+=p.dx*dt;p.y+=p.dy*dt;p.z+=p.dz*dt;
        const level=drive.level-y-.035;
        if(p.dy<0&&p.y<level&&oldY>=level){
          const r=rings[ringHead];ringHead=(ringHead+1)%rings.length;Object.assign(r,{x:p.x,z:p.z,age:0});p.life=0;
        }
      }
      const alpha=p.life>0&&p.y>=drive.level-y-.13?Math.min(1,p.life*2.5):0;
      data[k]=p.x;data[k+1]=alpha?p.y:-100;data[k+2]=p.z;
      colors[k]=alpha*.57;colors[k+1]=alpha*.76;colors[k+2]=alpha*.79;
    }
    dummy.rotation.set(0,0,0);
    for(let i=0;i<rings.length;i++){
      const r=rings[i];r.age+=dt*1.8;
      const scale=r.age<1?.045+.20*r.age:0;
      dummy.position.set(r.x,drive.level-y+.04,r.z+r.age*.17);dummy.scale.set(scale,1,scale);
      dummy.updateMatrix();ringMesh.setMatrixAt(i,dummy.matrix);
    }
    ringMesh.instanceMatrix.needsUpdate=true;
    geo.attributes.position.needsUpdate=true;geo.attributes.color.needsUpdate=true;
  };
  tick.root=station;return tick;
}
