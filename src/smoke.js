import * as T from 'three';

const profiles={
  chimney:{rate:7,size:.68,life:6.8,rise:1.09,wind:1,shade:.44,density:.38,spread:.23},
  forgeStack:{rate:15,size:.75,life:7.9,rise:1.48,wind:1,shade:.22,density:.59,spread:.28},
  hearth:{rate:8,size:.36,life:2.7,rise:.77,wind:.10,shade:.30,density:.31,spread:.17,ceiling:1.65},
  forge:{rate:14,size:.47,life:3.3,rise:.88,wind:.10,shade:.24,density:.44,spread:.19,ceiling:1.67},
  campfire:{rate:13,size:.51,life:5.7,rise:1.21,wind:.87,shade:.39,density:.47,spread:.28},
  torch:{rate:2.2,size:.093,life:1.32,rise:.58,wind:.28,shade:.26,density:.18,spread:.037},
  candle:{rate:1.5,size:.032,life:1.1,rise:.26,wind:.08,shade:.39,density:.11,spread:.018}
};

const vertex=`attribute vec4 plume;varying vec4 smoke;
uniform float viewport;
#include <fog_pars_vertex>
void main(){smoke=plume;vec4 mvPosition=modelViewMatrix*vec4(position,1.);
  gl_PointSize=clamp(plume.x*projectionMatrix[1][1]*viewport*.5/max(.04,-mvPosition.z),1.,185.);
  gl_Position=projectionMatrix*mvPosition;
  #include <fog_vertex>
}`;
const fragment=`varying vec4 smoke;
#include <fog_pars_fragment>
float hash(vec2 p){return fract(sin(dot(p,vec2(92.8,69.3)))*41958.);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+1.),f.x),f.y);}
void main(){
  vec2 p=(gl_PointCoord-.5)*2.;
  float angle=smoke.w*.64;float s=sin(angle),c=cos(angle);p=mat2(c,s,-s,c)*p;
  vec2 q=p*vec2(3.9,4.7)+vec2(smoke.w*2.1,smoke.w*.66);
  float mottling=noise(q)*.57+noise(q*2.17)*.29+noise(q*4.3)*.14;
  float edge=1.-smoothstep(.29,1.,length(p)+.38*(mottling-.5));
  float density=edge*edge*(.38+.88*mottling)*smoke.y;
  if(density<.005)discard;
  vec3 col=mix(vec3(.023,.021,.020),vec3(.41,.43,.45),smoke.z+.13*(mottling-.5));
  gl_FragColor=vec4(col,density);
  #include <fog_fragment>
  #include <colorspace_fragment>
}`;

export function mountSmoke(root,position,type){
  const profile=profiles[type];if(!profile)return;
  (root.userData.smokeSources??=[]).push({position:position.clone(),profile,accumulator:Math.random(),world:new T.Vector3()});
}

function createPlumes(root){
  const capacity=Math.min(1100,Math.ceil(root.userData.smokeSources.reduce((sum,s)=>sum+s.profile.rate*s.profile.life,0)*1.28));
  const particles=Array.from({length:capacity},()=>({age:0,life:0}));
  const points=new Float32Array(capacity*3),data=new Float32Array(capacity*4),geometry=new T.BufferGeometry();
  geometry.setAttribute('position',new T.BufferAttribute(points,3).setUsage(T.DynamicDrawUsage));
  geometry.setAttribute('plume',new T.BufferAttribute(data,4).setUsage(T.DynamicDrawUsage));
  const uniforms=T.UniformsUtils.merge([T.UniformsLib.fog,{viewport:{value:720}}]);
  const material=new T.ShaderMaterial({uniforms,vertexShader:vertex,fragmentShader:fragment,transparent:true,depthWrite:false,fog:true});
  const mesh=new T.Points(geometry,material);mesh.frustumCulled=false;root.add(mesh);
  let cursor=0;
  return (dt,time,wind,eye,viewport,night)=>{
    uniforms.viewport.value=viewport;
    root.updateWorldMatrix(true,false);
    for(const source of root.userData.smokeSources){
      source.world.copy(source.position).applyMatrix4(root.matrixWorld);
      if(eye.distanceToSquared(source.world)>115**2)continue;
      const {profile,position}=source;
      source.accumulator+=dt*profile.rate*(.87+.25*Math.sin(time*4.9+position.x));
      while(source.accumulator>=1){
        source.accumulator--;
        const p=particles[cursor];cursor=(cursor+1)%capacity;
        Object.assign(p,{profile,age:0,life:profile.life*(.76+Math.random()*.48),base:position.y,seed:Math.random()*30,
          x:position.x+(Math.random()-.5)*profile.spread,y:position.y,z:position.z+(Math.random()-.5)*profile.spread,
          vx:(Math.random()-.5)*profile.spread,vy:profile.rise*(.68+Math.random()*.71),vz:(Math.random()-.5)*profile.spread});
      }
    }
    for(let i=0;i<capacity;i++){
      const p=particles[i],k=i*3,j=i*4;p.age+=dt;
      if(p.age>=p.life){data[j+1]=0;continue;}
      const f=p.age/p.life,h=p.y-p.base,s=p.seed,profile=p.profile;
      const ceiling=profile.ceiling&&h>profile.ceiling;
      p.vy+=((ceiling?-.025:profile.rise*(1-.68*f))-p.vy)*dt*2;
      p.vx+=(profile.wind*(wind*3.6+.29)+Math.sin(time*1.45+s)*(.19+.45*f)-p.vx)*dt*.9;
      p.vz+=(profile.wind*wind*1.17+Math.sin(time*.91+s*1.3)*.52-p.vz)*dt*.88;
      p.x+=p.vx*dt;p.y+=p.vy*dt;p.z+=p.vz*dt;
      points[k]=p.x;points[k+1]=p.y;points[k+2]=p.z;
      data[j]=profile.size*(.48+2.45*f+Math.min(1,h*.24));
      data[j+1]=profile.density*Math.min(1,p.age*6)*(1-f)**1.8;
      data[j+2]=profile.shade*(1-night*.65)+f*.23;data[j+3]=s+p.age*.76;
    }
    geometry.attributes.position.needsUpdate=true;geometry.attributes.plume.needsUpdate=true;
  };
}

export function stepSmoke(root,dt,time,wind,eye,viewport,night){
  if(!root.userData.smokeSources?.length)return;
  (root.userData.plumeUpdate??=createPlumes(root))(dt,time,wind,eye,viewport,night);
}
