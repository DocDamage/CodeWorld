import {shadeSoil} from './soil-shader.js';
import {brookStage} from './brook.js';
import * as T from 'three';
import { height,walkHeight,riverWidth,riverX,inPlot } from './land.js';
import { range } from './model.js';

function surfaceHeight(x,z){
  const ground=walkHeight(x,z);
  return Math.abs(z)<53&&Math.abs(x-riverX(z))<riverWidth(z)+.23 ? Math.max(ground,brookStage(z)) : ground;
}

export function buildWeatherEffects(scene,rainSurface=()=>-Infinity) {
  const impactHeight=(x,z)=>Math.max(surfaceHeight(x,z),rainSurface(x,z));
  const amount=1000,flakeAmount=600,ringAmount=110;
  const drops=Array.from({length:amount},()=>({x:0,y:-999,z:0,ground:0,seed:Math.random()}));
  const flakes=Array.from({length:flakeAmount},()=>({x:0,y:-999,z:0,ground:0,seed:Math.random()}));
  const buffer=(count,itemSize)=>new T.BufferAttribute(new Float32Array(count*itemSize),itemSize).setUsage(T.DynamicDrawUsage);
  const rainGeo=new T.BufferGeometry();rainGeo.setAttribute('position',buffer(amount*2,3));
  const rainMat=new T.LineBasicMaterial({color:'#a4b7bf',transparent:true,opacity:0,depthWrite:false});
  const rain=new T.LineSegments(rainGeo,rainMat);rain.frustumCulled=false;scene.add(rain);
  const snowGeo=new T.BufferGeometry();snowGeo.setAttribute('position',buffer(flakeAmount,3));
  const snowMat=new T.ShaderMaterial({uniforms:{opacity:{value:0}},transparent:true,depthWrite:false,
    vertexShader:`void main(){vec4 p=modelViewMatrix*vec4(position,1.);gl_PointSize=clamp(45./max(-p.z,.1),1.,7.);gl_Position=projectionMatrix*p;}`,
    fragmentShader:`uniform float opacity;void main(){float a=1.-smoothstep(.11,.5,length(gl_PointCoord-.5));gl_FragColor=vec4(.88,.91,.92,a*opacity);}`});
  const snow=new T.Points(snowGeo,snowMat);snow.frustumCulled=false;scene.add(snow);
  const rings=Array.from({length:ringAmount},()=>({x:0,y:-999,z:0,t:1}));
  const ringGeo=new T.RingGeometry(.73,1,10).rotateX(-Math.PI/2);
  const ringMat=new T.MeshBasicMaterial({color:'#a9c1be',transparent:true,opacity:0,depthWrite:false,side:T.DoubleSide,polygonOffset:true,polygonOffsetFactor:-2});
  const marks=new T.InstancedMesh(ringGeo,ringMat,ringAmount);marks.frustumCulled=false;marks.instanceMatrix.setUsage(T.DynamicDrawUsage);scene.add(marks);
  const marker=new T.Object3D();let ringIndex=0,lastX=Infinity,lastZ=Infinity,first=true;
  const boltPoints=buffer(74,3),boltGeo=new T.BufferGeometry();boltGeo.setAttribute('position',boltPoints);
  const boltMat=new T.LineBasicMaterial({color:'#d5e8ff',transparent:true,depthWrite:false,blending:T.AdditiveBlending});
  const bolt=new T.LineSegments(boltGeo,boltMat);bolt.frustumCulled=false;bolt.visible=false;scene.add(bolt);
  let previousFlash=0;

  function strike(camera){
    const angle=range(0,Math.PI*2),distance=range(25,61);
    const x=camera.x+distance*Math.cos(angle),z=camera.z+distance*Math.sin(angle),base=height(x,z);
    const line=[];
    for(let i=0;i<=16;i++)line.push([x+Math.sin(i*.32)*3.5+range(-1.1,1.1),base+(16-i)*2.40,z+(16-i)*.41+range(-.80,.80)]);
    let cursor=0;
    const segment=(a,b)=>{boltPoints.array.set(a,cursor*3);boltPoints.array.set(b,(cursor+1)*3);cursor+=2;};
    for(let i=0;i<line.length-1;i++)segment(line[i],line[i+1]);
    for(const j of [3,6,8,10]){
      let a=line[j];const sign=j%2===0?1:-1;
      for(let i=0;i<4;i++){const b=[a[0]+sign*range(.8,2.7),a[1]-range(1.7,3.3),a[2]+range(-1.3,1.3)];segment(a,b);a=b;}
    }
    boltGeo.setDrawRange(0,cursor);boltPoints.needsUpdate=true;
  }

  function respawn(p,camera,initial){
    p.x=camera.x+range(-17,17);p.z=camera.z+range(-17,17);
    p.ground=impactHeight(p.x,p.z);
    p.y=Math.max(p.ground,camera.y-5)+range(initial?.65:9.5,initial?15:16);
  }

  function update(p,camera,dt,reset,dx,dy,dz,impact){
    if(reset||Math.abs(p.x-camera.x)>19||Math.abs(p.z-camera.z)>19||p.y<p.ground){respawn(p,camera,reset);return;}
    p.x+=dx*dt;p.y-=dy*dt;p.z+=dz*dt;
    if(p.y>=p.ground)return;
    if(impact&&!inPlot(p.x,p.z,.08)&&p.seed<.37){
      const r=rings[ringIndex];ringIndex=(ringIndex+1)%rings.length;
      r.x=p.x;r.z=p.z;r.y=impactHeight(p.x,p.z)+.015;r.t=0;
    }
    respawn(p,camera,false);
  }

  return (camera,dt,state,sheltered,nearGround)=>{
    const reset=first||Math.hypot(lastX-camera.x,lastZ-camera.z)>12;first=false;lastX=camera.x;lastZ=camera.z;
    const windX=state.gust*5.7*state.windX,windZ=state.gust*5.7*state.windZ;
    const rainCount=Math.floor(amount*state.rain),snowCount=Math.floor(flakeAmount*state.snow);
    rain.visible=!sheltered&&rainCount>5;snow.visible=!sheltered&&snowCount>5;marks.visible=rain.visible&&nearGround;
    bolt.visible=!sheltered&&state.flash>.27;
    if(bolt.visible&&state.flash>previousFlash)strike(camera);
    boltMat.opacity=state.flash**2;
    previousFlash=state.flash;
    if(sheltered)return;
    if(rain.visible){
      const pos=rainGeo.attributes.position.array;
      for(let i=0;i<rainCount;i++){
        const p=drops[i],speed=12+7*p.seed;
        update(p,camera,dt,reset,windX,speed,windZ,nearGround);
        const f=.031+p.seed*.027,k=i*6;
        pos[k]=p.x;pos[k+1]=p.y;pos[k+2]=p.z;pos[k+3]=p.x-windX*f;pos[k+4]=p.y+speed*f;pos[k+5]=p.z-windZ*f;
      }
      rainMat.opacity=.14+state.rain*.21;rainGeo.setDrawRange(0,rainCount*2);rainGeo.attributes.position.needsUpdate=true;
    }
    if(snow.visible){
      const pos=snowGeo.attributes.position.array;
      for(let i=0;i<snowCount;i++){
        const p=flakes[i],drift=Math.sin(state.time*1.65+i)*.60;
        update(p,camera,dt,reset,windX*.39+drift,.95+p.seed*1.25,windZ*.39+Math.cos(state.time+i)*.41,false);
        pos.set([p.x,p.y,p.z],i*3);
      }
      snowMat.uniforms.opacity.value=.3+state.snow*.60;snowGeo.setDrawRange(0,snowCount);snowGeo.attributes.position.needsUpdate=true;
    }
    if(marks.visible){
      rings.forEach((r,i)=>{r.t+=dt*2.9;const radius=r.t<1?.05+r.t*.21:0;
        marker.position.set(r.x,r.y,r.z);marker.scale.set(radius,1,radius);marker.updateMatrix();marks.setMatrixAt(i,marker.matrix);
      });
      ringMat.opacity=state.rain*.28;marks.instanceMatrix.needsUpdate=true;
    }
  };
}

export function weatherGround(material,uniforms,snowCoverage=1){
  const original=material.onBeforeCompile,priorKey=material.customProgramCacheKey();
  material.onBeforeCompile=(shader,renderer)=>{
    original.call(material,shader,renderer);
    shader.uniforms.wetGround=uniforms.wetness;
    shader.uniforms.snowGround=uniforms.snowpack;
    shader.uniforms.snowCoverage={value:snowCoverage};
    shader.vertexShader=`varying vec3 weatherPosition;\n${shader.vertexShader}`.replace('#include <begin_vertex>',`#include <begin_vertex>
      vec4 weatherPoint=vec4(position,1.);
      #ifdef USE_INSTANCING
        weatherPoint=instanceMatrix*weatherPoint;
      #endif
      weatherPosition=(modelMatrix*weatherPoint).xyz;`);
    shader.fragmentShader=`uniform float wetGround,snowGround,snowCoverage; varying vec3 weatherPosition;\n${shader.fragmentShader}`
      .replace('#include <color_fragment>',`#include <color_fragment>
        float groundVariation=sin(weatherPosition.x*1.76+sin(weatherPosition.z*1.41))*.17+sin(weatherPosition.z*.43+weatherPosition.x*.35)*.19;
        vec3 faceNormal=normalize(cross(dFdx(weatherPosition),dFdy(weatherPosition)));
        float upward=max(0.,faceNormal.y);
        float snow=smoothstep(.18,.75,snowGround+groundVariation*.62)*smoothstep(.25,.41,snowGround)*smoothstep(.24,.88,upward);
        diffuseColor.rgb*=1.-wetGround*(.16+groundVariation*.19);
        diffuseColor.rgb=mix(diffuseColor.rgb,vec3(.59,.65,.68),snow*.94*snowCoverage);`)
      .replace('#include <roughnessmap_fragment>',`#include <roughnessmap_fragment>
        ${material.userData.isSoil?'':'roughnessFactor=mix(roughnessFactor,.40,wetGround*.64*(1.-snow));'}`);
    if(material.userData.isSoil)shadeSoil.call(material,shader,uniforms);
  };
  material.customProgramCacheKey=()=>priorKey+(material.userData.isSoil?'|mud':'|weather');
}
