import * as T from 'three';
import { mountSmoke } from './smoke.js';

const flameGeometry=new T.PlaneGeometry(1,1);
const flameVertex=`varying vec2 flameUv;
uniform vec2 size;
void main(){
  flameUv=uv;
  vec4 center=modelViewMatrix*vec4(0.,0.,0.,1.);
  float scale=length(modelMatrix[0].xyz);
  center.xy+=vec2(position.x,position.y+.5)*size*scale;
  gl_Position=projectionMatrix*center;
}`;
const flameFragment=`varying vec2 flameUv;
uniform float clock,seed;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+1.),f.x),f.y);}
float turbulence(vec2 p){return .55*noise(p)+.29*noise(p*2.02)+.16*noise(p*4.07);}
void main(){
  vec2 p=flameUv;float t=clock*2.3+seed;
  float w=turbulence(vec2(p.x*5.8,p.y*6.-t*1.7));
  float shear=(w-.5)*p.y*.76;
  float a=abs(p.x-.5+shear);
  float taper=(1.-p.y)*.37+.012;
  float tongues=taper-a+(w-.46)*(.095+p.y*.32);
  float alpha=smoothstep(-.015,.106,tongues)*(1.-smoothstep(.62,1.,p.y))*smoothstep(0.,.11,p.y);
  alpha*=(1.-smoothstep(.40,.50,abs(p.x-.5)))*(.62+w*.48);
  if(alpha<.014)discard;
  float heat=clamp((1.-p.y)*.67+w*.31+max(tongues,0.)*.53,0.,1.);
  vec3 color=mix(vec3(.70,.034,.005),vec3(1.,.28,.028),smoothstep(.21,.58,heat));
  color=mix(color,vec3(1.,.83,.44),smoothstep(.57,.91,heat));
  color=mix(color,vec3(.24,.23,1.),(1.-smoothstep(.015,.13,p.y))*.52);
  gl_FragColor=vec4(color,alpha);
  #include <colorspace_fragment>
}`;

export function mountFire(root,position,{width=.85,height=1.03,intensity=9,range=6,embers=22,smoke}={}) {
  const group=new T.Group();group.position.copy(position);root.add(group);
  const seed=(position.x*15.77+position.z*6.31)%27;
  const uniforms={clock:{value:0},seed:{value:seed},size:{value:new T.Vector2(width,height)}};
  const flame=new T.Mesh(flameGeometry,new T.ShaderMaterial({uniforms,vertexShader:flameVertex,fragmentShader:flameFragment,transparent:true,depthWrite:false}));
  flame.frustumCulled=false;group.add(flame);
  const light=intensity>0?new T.PointLight('#ff883b',intensity,range,2):null;
  if(light){light.position.y=height*.36;group.add(light);}
  if(smoke)mountSmoke(root,position.clone().add(new T.Vector3(0,height*.55,0)),smoke);
  const geometry=new T.BufferGeometry();
  const points=new Float32Array(embers*3),colors=new Float32Array(embers*3);
  geometry.setAttribute('position',new T.BufferAttribute(points,3).setUsage(T.DynamicDrawUsage));
  geometry.setAttribute('color',new T.BufferAttribute(colors,3).setUsage(T.DynamicDrawUsage));
  if(embers){
    const material=new T.PointsMaterial({size:.036*height,vertexColors:true,transparent:true,depthWrite:false,blending:T.AdditiveBlending});
    const sparks=new T.Points(geometry,material);sparks.frustumCulled=false;group.add(sparks);
  }
  return time=>{
    uniforms.clock.value=time;
    if(light)light.intensity=intensity*(.90+.10*Math.sin(time*7.1+seed)+.075*Math.sin(time*15.7+seed));
    for(let i=0;i<embers;i++){
      const phase=((time*(.31+(i%4)*.035)+i*.618)%1),fade=Math.sin(Math.PI*phase)**1.7,j=i*3;
      points[j]=(.18*Math.sin(i*34)+.22*Math.sin(phase*6+i)*phase)*width;
      points[j+1]=height*(.13+1.65*phase);
      points[j+2]=Math.cos(i*27+phase*3)*.23*width;
      colors[j]=fade;colors[j+1]=fade*(.28+.29*(1-phase));colors[j+2]=fade*.045;
    }
    geometry.attributes.position.needsUpdate=true;geometry.attributes.color.needsUpdate=true;
  };
}

export function placedFire(builder,x,y,z,options) {
  const {root,frame}=builder;
  const update=mountFire(root,new T.Vector3(x,y,z).applyMatrix4(frame),options);
  (root.userData.fires??=[]).push(update);
}

export function animateFires(root,time) {
  root.userData.fires?.forEach(update=>update(time));
}
