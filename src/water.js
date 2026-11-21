import * as T from 'three';
import {Reflector} from 'three/addons/objects/Reflector.js';
import {falls,lipZ} from './lake-layout.js';

export function waterSurface(uniforms){
  Object.assign(uniforms,{
    reflectedScene:{value:null},reflectionMatrix:{value:new T.Matrix4()},mirrorLevel:{value:-999},
    sunDirection:{value:new T.Vector3(-.5,.8,.3)},sunTint:{value:new T.Color('#fff2d4')},
    plunge:{value:new T.Vector2(falls.x,lipZ-4.5)}
  });
  const material=new T.ShaderMaterial({uniforms,side:T.DoubleSide,transparent:true,depthWrite:false,
    vertexShader:`
    attribute vec3 waterBed;
    attribute float lakeClarity,alpineGrade;
    varying float bedGrade;
    attribute vec4 brookChannel;varying vec4 channel;
    uniform float streamTravel;
    uniform float clock,runoff,rain,raceLevel;
    uniform vec2 wheel;
    varying vec3 world;
    varying vec2 current;
    varying float depth,clearLake;
    void main(){
      world=(modelMatrix*vec4(position,1.)).xyz;
      current=waterBed.xy;channel=brookChannel;bedGrade=alpineGrade;
      clearLake=lakeClarity;
      vec2 rel=world.xz-wheel;
      float race=exp(-abs(rel.x)*1.35)*smoothstep(-3.9,-.9,rel.y)*(1.-smoothstep(2.7,5.3,rel.y));
      vec2 p=world.xz-current*mix(clock,streamTravel,min(1.,channel.w))*.62;
      world.y+=.018*sin(dot(p,vec2(1.2,3.2)))+.012*sin(dot(p,vec2(3.7,-1.2))-clock*.65)
              +mix(.10*(runoff-1.),raceLevel,race)*(1.-clearLake);
      depth=max(0.,world.y-waterBed.z);
      gl_Position=projectionMatrix*viewMatrix*vec4(world,1.);
    }`,
    fragmentShader:`
    uniform float clock,night,dusk,cloud,runoff,raceFlow,rain,flash,waterFogDensity,mirrorLevel;
    uniform vec2 wheel,plunge;
    uniform float streamTravel;varying vec4 channel;
    uniform vec3 waterFog,dayTop,dayLow,sunDirection,sunTint;
    uniform mat4 reflectionMatrix;
    uniform sampler2D noiseMap,reflectedScene;
    varying vec3 world;
    varying vec2 current;
    varying float depth,clearLake,bedGrade;
    float noiseAt(vec2 p){return texture2D(noiseMap,p/256.).r;}
    // Difference between the two nearest bubbles gives a thin film around each cell.
    float bubbleFilm(vec2 p){
      vec2 cell=floor(p),local=fract(p);float a=4.,b=4.;
      for(int j=-1;j<=1;j++)for(int i=-1;i<=1;i++){
        vec2 off=vec2(float(i),float(j));
        vec2 center=.15+.70*vec2(noiseAt(cell+off+.5),noiseAt(cell+off+75.5));
        vec2 d=off+center-local;float r=dot(d,d);
        b=min(b,max(a,r));a=min(a,r);
      }
      return 1.-smoothstep(.015,.18,b-a);
    }
    void main(){
      vec2 p=world.xz-current*clock*.62,rel=world.xz-wheel;
      float wake=exp(-abs(rel.x)*1.9)*smoothstep(-1.9,-.7,rel.y)*(1.-smoothstep(1.1,5.6,rel.y))*raceFlow;
      float roll=dot(p,vec2(1.2,3.2)),crossWave=dot(p,vec2(3.7,-1.2))-clock*.65;
      vec2 slope=.018*vec2(1.2,3.2)*cos(roll)+.012*vec2(3.7,-1.2)*cos(crossWave);
      float fade=1.-smoothstep(.025,.16,length(fwidth(world.xz)));
      vec2 q=p*vec2(8.,17.)+2.*noiseAt(p*1.8);
      float grain=noiseAt(q);
      slope+=fade*vec2(noiseAt(q+vec2(.36,0.))-grain,noiseAt(q+vec2(0.,.36))-grain)*(.25+.16*wake);
      float whitewater=0.;
      if(channel.w>.5){
        if(depth<.004)discard;
        vec2 along=normalize(current),crossDir=vec2(along.y,-along.x);
        // Flow coordinates follow the river bends. A pair of short advection
        // cycles lets adjacent current lanes travel at different speeds without stretching.
        float velocity=.54+.50*exp(-.34*channel.x*channel.x)+.45*channel.y-.28*channel.z;
        float travel=streamTravel*.28,phase=fract(travel),other=fract(travel+.5);
        vec2 lane=vec2(channel.x,world.z*sign(current.y)),warp=vec2(.22*sin(lane.y*1.21+channel.x)+.35*channel.z,0.);
        vec2 uv=(lane+warp)*vec2(8.4,3.5);
        vec2 shift=vec2(current.x*.63,3.5)*velocity/.28;
        float blend=abs(2.*phase-1.);
        float n1=mix(noiseAt(uv-phase*shift),noiseAt(uv-other*shift),blend);
        float n2=mix(noiseAt(uv*2.1-phase*shift*2.1),noiseAt(uv*2.1-other*shift*2.1),blend);
        float tongue=sin(lane.y*15.+channel.x*channel.x*1.9+4.*n1-streamTravel*5.);
        float broken=channel.y*(.38+.62*(1.-smoothstep(.20,.80,depth)))+channel.z;
        slope=(crossDir*(n1-.5)*.30+along*((n2-.5)*.20+tongue*(.032+.115*broken)))*(.27+.73*fade);
        float lace=smoothstep(.48,.74,.58*n1+.42*n2+.11*tongue);
        whitewater=clamp(lace*(.43*channel.y+.91*channel.z)*(.72+.25*runoff),0.,.83);
        grain=n1;
      }
      // Expanding rings are dephased per cell and fade before reaching the cell boundary.
      vec2 cell=world.xz*1.8,offset=fract(cell)-.5;
      float seed=noiseAt(floor(cell)+.5),age=fract(clock*1.3+seed*15.);
      float radius=length(offset),delta=(radius-age*.48)*29.;
      slope+=fade*rain*offset/max(radius,.02)*cos(delta*1.8)*exp(-delta*delta*.35)*(1.-age)*.24;
      float froth=0.;
      vec2 pool=world.xz-plunge;
      if(clearLake>.5 && abs(pool.x)<11. && abs(pool.y)<15.){
        float reach=max(0.,-pool.y),radius=length(vec2(pool.x*.85,pool.y));
        vec2 drift=vec2(.18*sin(reach*.69+clock*.43),1.)*clock*.65;
        vec2 p=pool+drift+vec2(.55*sin(pool.y*.69+clock*.38),.48*sin(pool.x*.81+clock*.22));
        float swirl=noiseAt(p*1.55)*.57+noiseAt(p*3.3)*.29+noiseAt(p*8.1)*.14;
        float fan=exp(-pow(abs(pool.x)/(.48*reach+3.1),2.)-reach*.16-max(0.,pool.y)*1.4);
        float impact=exp(-pow(pool.x/3.35,4.)-pool.y*pool.y*1.2);
        float lace=bubbleFilm(p*2.4+swirl*2.);
        froth=clamp(impact*(.70+.29*swirl)+fan*smoothstep(.28,.76,swirl+.13*lace)*(.24+.82*lace),0.,.99);
        slope+=pool/max(radius,.2)*cos(radius*7.-clock*4.5+swirl)*fan*.16;
      }
      vec3 n=normalize(vec3(-slope.x,1.,-slope.y-bedGrade)),eye=normalize(cameraPosition-world),r=reflect(-eye,n);
      float cosine=clamp(dot(eye,n),0.,1.),fresnel=.025+.975*pow(1.-cosine,5.);
      vec3 sky=mix(dayLow,dayTop,smoothstep(0.,.69,r.y));
      sky=mix(sky,vec3(.45,.23,.13),dusk*(1.-max(r.y,0.))*.64);
      sky=mix(sky,vec3(.030,.049,.082),night);
      if(channel.w>1.5)sky=mix(vec3(.085,.14,.13)*(1.-night*.84),sky,smoothstep(-.06,.69,r.y));
      vec4 projected=reflectionMatrix*vec4(world,1.);
      vec2 screen=projected.xy/max(.01,projected.w)+n.xz*.018;
      vec2 edge=min(screen,1.-screen);
      float valid=smoothstep(0.,.04,min(edge.x,edge.y))*step(.01,projected.w)*(1.-smoothstep(.28,.65,abs(world.y-mirrorLevel)));
      vec3 reflection=mix(sky,texture2D(reflectedScene,clamp(screen,.001,.999)).rgb,valid);
      float path=depth/max(.24,cosine);
      vec3 body=mix(vec3(.105,.205,.145),vec3(.015,.080,.082),1.-exp(-path*.88))*(1.-night*.83);
      float opacity=clamp(1.-exp(-path*mix(.95,.18,clearLake)),.09,mix(.97,.56,clearLake));
      body=mix(body,vec3(.045,.195,.173)*(1.-night*.83),clearLake*.52);
      if(channel.w>.5){
        float silt=smoothstep(1.04,1.71,runoff);
        body=mix(vec3(.060,.161,.132),vec3(.185,.141,.082),silt)*(1.-night*.84);
        opacity=clamp(1.-exp(-path*(.44+.79*silt)),.075,.91);
      }
      float glint=pow(max(dot(reflect(-sunDirection,n),eye),0.),160.)*(1.-cloud*.93)*(1.-night);
      float foam=(wake*.8+.37*(1.-smoothstep(.015,.19,depth)))*smoothstep(.49,.78,grain);
      foam=channel.w>.5?max(whitewater,wake*.53*smoothstep(.54,.79,grain)):foam;
      foam=max(foam,froth);
      float alpha=mix(opacity,1.,max(fresnel,foam));
      vec3 col=(body*opacity*(1.-fresnel)+reflection*fresnel)/max(alpha,.01);
      col=mix(col,mix(vec3(.70,.76,.67),vec3(.80,.89,.86),froth)*(1.-night*.8),clamp(foam,0.,.98))+glint*sunTint*1.8+flash*.13;
      float fogRange=length(cameraPosition-world)*waterFogDensity;
      gl_FragColor=vec4(mix(col,waterFog,1.-exp(-fogRange*fogRange)),max(alpha,glint));
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    }`});
  material.defaultAttributeValues.lakeClarity=[0];material.defaultAttributeValues.brookChannel=[0,0,0,0];
  material.defaultAttributeValues.alpineGrade=[0];
  return material;
}

// One low-resolution capture serves the nearby water body. Reproject its last
// frame between updates so changing the camera never pins reflections to the screen.
export function waterReflections(renderer,scene,material){
  const mirror=new Reflector(new T.PlaneGeometry(1,1),{textureWidth:384,textureHeight:256,multisample:0});
  mirror.rotation.x=-Math.PI/2;
  const inverse=new T.Matrix4(),u=material.uniforms;
  const lastPosition=new T.Vector3(),lastRotation=new T.Quaternion();
  u.reflectedScene.value=mirror.getRenderTarget().texture;
  let next=0,lastTime=-Infinity,lastAspect=0;
  return (camera,time,level,pools)=>{
    if(time<next||camera.position.y<level+.08)return;
    if(u.mirrorLevel.value===level&&time-lastTime<1.4&&lastAspect===camera.aspect&&
      lastPosition.distanceToSquared(camera.position)<.01&&lastRotation.angleTo(camera.quaternion)<.012)return;
    next=time+.24;mirror.position.y=level;mirror.updateMatrixWorld();camera.updateMatrixWorld();
    const dirty=renderer.shadowMap.needsUpdate;
    const showPools=pools?.visible;
    if(pools)pools.visible=false;
    material.visible=false;renderer.shadowMap.needsUpdate=false;
    try{
      mirror.onBeforeRender(renderer,scene,camera);
      u.reflectionMatrix.value.copy(mirror.material.uniforms.textureMatrix.value).multiply(inverse.copy(mirror.matrixWorld).invert());
      u.mirrorLevel.value=level;lastTime=time;lastAspect=camera.aspect;
      lastPosition.copy(camera.position);lastRotation.copy(camera.quaternion);
    }finally{if(pools)pools.visible=showPools;material.visible=true;renderer.shadowMap.needsUpdate=dirty;}
  };
}
