import * as T from 'three';
import {groundForPrint} from './footfall.js';

const outline=`float oval(vec2 p,vec2 c,vec2 r){return (length((p-c)/r)-1.)*min(r.x,r.y);}
float lineDist(vec2 p,vec2 a,vec2 b){vec2 v=b-a;return length(p-a-v*clamp(dot(p-a,v)/dot(v,v),0.,1.));}
float outline(vec2 p){
  if(stamp.z<.5){
    float tread=oval(p,vec2(.04,.39),vec2(.82,.51));
    vec2 q=abs(p-vec2(-.05,-.58))-vec2(.47,.18);
    float heel=length(max(q,0.))+min(max(q.x,q.y),0.)-.13;
    float arch=oval(p,vec2(-.38,-.10),vec2(.24,.39));
    return min(arch,min(tread,heel));
  }
  if(stamp.z<1.5){
    vec2 q=vec2(abs(p.x),p.y);
    q.x-=.13*q.y;
    float cleft=oval(q,vec2(.40,.12),vec2(.32-.055*q.y,.72));
    float dew=oval(q,vec2(.49,-.69),vec2(.13,.12));
    return min(cleft,dew);
  }
  if(stamp.z<2.5){
    float pad=oval(p,vec2(0.,-.25),vec2(.59,.42));
    vec2 q=vec2(abs(p.x),p.y);
    float inner=oval(q,vec2(.22,.53),vec2(.20,.28));
    float outer=oval(q,vec2(.61,.27),vec2(.18,.25));
    return min(pad,min(inner,outer));
  }
  float center=lineDist(p,vec2(-.02,-.31),vec2(.09,.84))-.073;
  float side=lineDist(vec2(abs(p.x),p.y),vec2(0.,-.27),vec2(.74,.53))-.066;
  return min(min(center,side),lineDist(p,vec2(0.,-.25),vec2(-.20,-.77))-.062);
}
`;
const sampleShape=`  if(stamp.x<=.003)discard;
  vec2 p=(printUv-.5)*2.4;p.x*=stamp.w;
  float grit=sin(p.x*28.1+p.y*13.)*cos(p.y*31.-p.x*9.);
  float d=outline(p)+grit*.015,aa=max(.019,fwidth(d));
  float bed=1.-smoothstep(-aa,aa,d),rim=(1.-smoothstep(.015,.145+aa,d))*(1.-bed);
  if(bed+rim<.006)discard;

  float tread=cos(p.y*29.+abs(p.x+.04)*5.+step(.0,p.y)*1.8);
  float grooves=stamp.z<.5?.45*smoothstep(.30,.88,tread):0.;
`;

const vertex=`attribute vec4 track;
uniform vec3 trackSun;
varying vec2 printUv,stampLight,markXZ;
varying vec4 stamp;
#include <fog_pars_vertex>
void main(){
  printUv=uv;stamp=track;
  stampLight=vec2(dot(normalize(instanceMatrix[0].xyz),trackSun),dot(normalize(instanceMatrix[1].xyz),trackSun));
  vec4 point=instanceMatrix*vec4(position,1.);markXZ=point.xz;
  vec4 mvPosition=modelViewMatrix*point;
  gl_Position=projectionMatrix*mvPosition;
  #include <fog_vertex>
}`;
const fragment=`varying vec2 printUv,stampLight,markXZ;varying vec4 stamp;
uniform vec3 trackRegion;
uniform float trackNight;
#include <fog_pars_fragment>
${outline}
void main(){
  ${sampleShape}
  vec2 slope=vec2(outline(p+vec2(.025,0))-outline(p-vec2(.025,0)),outline(p+vec2(0,.025))-outline(p-vec2(0,.025)))/.05;
  vec2 l=stampLight;l.x*=stamp.w;
  float edgeLight=clamp(dot(slope,l),-1.,1.)*exp(-abs(d)*7.);
  vec2 tile=(markXZ-trackRegion.xy)*trackRegion.z;
  float edge=max(abs(tile.x-.5),abs(tile.y-.5));
  float inTile=step(.0001,trackRegion.z)*(1.-smoothstep(.45,.50,edge));
  float fallback=1.-inTile*(stamp.y==1.?0.:1.);
  if(fallback<.001)discard;
  float snow=step(.5,stamp.y)*(1.-step(1.5,stamp.y)),earth=step(1.5,stamp.y);
  vec3 bottom=mix(vec3(.043,.028,.019),vec3(.15,.19,.23),snow);
  vec3 lip=mix(vec3(.15,.097,.059),vec3(.63,.69,.74),snow);
  vec3 color=mix(bottom,lip,rim/(bed+rim+.001));
  color*=clamp(.85+edgeLight*1.2+grit*.053,.28,1.85)*(1.-.72*trackNight);
  gl_FragColor=vec4(color,(bed*(.72-grooves)+rim*.56)*stamp.x*fallback*(1.-earth*.35));
  #include <fog_fragment>
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}`;

// The near field is a height/compaction map sampled by the actual soil shader.
// The more distant tracks and snow retain a single instanced overlay.
function buildTrackField(renderer,source,region){
  const size=1536,span=16,texel=span/size;
  const target=new T.WebGLRenderTarget(size,size,{minFilter:T.LinearFilter,magFilter:T.LinearFilter,depthBuffer:false});
  const fieldScene=new T.Scene(),camera=new T.Camera(),clear=new T.Color();
  const material=new T.ShaderMaterial({uniforms:{trackRegion:region},depthTest:false,depthWrite:false,toneMapped:false,
    side:T.DoubleSide,transparent:true,blending:T.CustomBlending,blendEquation:T.MaxEquation,blendSrc:T.OneFactor,blendDst:T.OneFactor,
    vertexShader:`attribute vec4 track;uniform vec3 trackRegion;varying vec2 printUv;varying vec4 stamp;
      void main(){printUv=uv;stamp=track;vec4 world=instanceMatrix*vec4(position,1.);
      gl_Position=vec4((world.xz-trackRegion.xy)*trackRegion.z*2.-1.,0.,1.);}`,
    fragmentShader:`varying vec2 printUv;varying vec4 stamp;
${outline}
      void main(){if(stamp.y==1.)discard; ${sampleShape}
        float depth=stamp.x*clamp(-d/.17+.32,0.,1.)*bed*(1.-grooves);
        gl_FragColor=vec4(depth,rim*stamp.x,0.,1.);
      }`});
  const quad=new T.InstancedMesh(source.geometry,material,source.instanceMatrix.count);
  quad.instanceMatrix=source.instanceMatrix;quad.frustumCulled=false;fieldScene.add(quad);
  let timer=0;
  return {texture:target.texture,draw(dt,eye,changed){
    timer+=dt;
    const x=Math.round(eye.x/texel)*texel-span*.5,z=Math.round(eye.z/texel)*texel-span*.5;
    const recenter=region.value.z===0||Math.abs(x-region.value.x)>1.5||Math.abs(z-region.value.y)>1.5;
    if(!recenter&&timer<(changed?.06:.22))return false;
    if(recenter)region.value.set(x,z,1/span);
    timer=0;quad.count=source.count;
    const old=renderer.getRenderTarget(),alpha=renderer.getClearAlpha(),shadows=renderer.shadowMap.needsUpdate;
    renderer.getClearColor(clear);renderer.shadowMap.needsUpdate=false;
    try{renderer.setRenderTarget(target);renderer.setClearColor(0,0);renderer.render(fieldScene,camera);}
    finally{renderer.setRenderTarget(old);renderer.setClearColor(clear,alpha);renderer.shadowMap.needsUpdate=shadows;}
    return true;
  }};
}

export function buildFootprints(scene,surface,light={},renderer=null){
  const capacity=1800,bootSlots=280,geometry=new T.PlaneGeometry(1,1);
  const info=new T.InstancedBufferAttribute(new Float32Array(capacity*4),4).setUsage(T.DynamicDrawUsage);
  geometry.setAttribute('track',info);
  const uniforms=T.UniformsUtils.clone(T.UniformsLib.fog);
  uniforms.trackSun=light.sunDirection??{value:new T.Vector3(.4,.8,.4)};uniforms.trackNight=light.night??{value:0};
  uniforms.trackRegion={value:new T.Vector3()};
  const material=new T.ShaderMaterial({uniforms,vertexShader:vertex,fragmentShader:fragment,
    transparent:true,depthWrite:false,fog:true,polygonOffset:true,polygonOffsetFactor:-2,polygonOffsetUnits:-2});
  const mesh=new T.InstancedMesh(geometry,material,capacity);
  mesh.name='Ground impressions';mesh.frustumCulled=false;mesh.count=0;mesh.renderOrder=1;
  mesh.instanceMatrix.setUsage(T.DynamicDrawUsage);scene.add(mesh);
  const field=renderer?buildTrackField(renderer,mesh,uniforms.trackRegion):null;
  light.trackRegion=uniforms.trackRegion;
  light.trackTexture={value:field?.texture??null};
  let fresh=false;
  const ages=new Float32Array(capacity),pose=new T.Matrix4(),right=new T.Vector3(),forward=new T.Vector3(),normal=new T.Vector3(),position=new T.Vector3();
  const shapes={boot:0,hoof:1,paw:2,bird:3};
  let boot=0,animal=bootSlots;
  return {
    plant(mark,weather){
      const {x,z,yaw}=mark,ground=surface(x,z,mark);
      if(!ground)return null;
      const medium=groundForPrint(weather,ground.soft,ground.reserve,ground.loose);
      if(!medium)return null;
      normal.set(ground.nx??0,ground.ny??1,ground.nz??0).normalize();if(normal.y<.56)return null;
      forward.set(-Math.sin(yaw),0,-Math.cos(yaw)).addScaledVector(normal,Math.sin(yaw)*normal.x+Math.cos(yaw)*normal.z).normalize();
      right.crossVectors(forward,normal).normalize();
      pose.makeBasis(right,forward,normal);
      pose.scale(position.set((mark.width??.145)*1.35,(mark.length??.30)*1.30,1));
      pose.setPosition(position.set(x,ground.y,z).addScaledVector(normal,.006));
      const shape=shapes[mark.kind]??0,i=shape?animal:boot;
      if(shape)animal=bootSlots+(animal-bootSlots+1)%(capacity-bootSlots);else boot=(boot+1)%bootSlots;
      const dry=medium==='earth',snow=medium==='snow';
      ages[i]=0;info.setXYZW(i,dry?.61:.92,snow?1:dry?2:0,shape,mark.side===-1||mark.side==='left'?-1:1);
      mesh.setMatrixAt(i,pose);mesh.count=Math.max(mesh.count,i+1);mesh.instanceMatrix.needsUpdate=info.needsUpdate=true;
      fresh=true;return medium;
    },
    tick(dt,w,eye){
      let dirty=false;
      for(let i=0;i<mesh.count;i++){
        const alpha=info.getX(i);if(alpha<=0)continue;
        ages[i]+=dt;
        const medium=info.getY(i);
        const wear=medium===1?w.snow*.014+Math.max(0,.36-w.snowpack)*.13+w.rain*.075
          :w.rain*.016+(medium===2?.012:.004);
        info.setX(i,Math.max(0,alpha-dt*(.002+wear+(ages[i]>100?.032:0))));dirty=true;
      }
      if(dirty)info.needsUpdate=true;
      if(field&&eye&&mesh.count){if(field.draw(dt,eye,fresh))fresh=false;}
      else uniforms.trackRegion.value.z=0;
    }
  };
}
