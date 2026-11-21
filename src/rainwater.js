import * as T from 'three';
import {createCatchment,LAND,BROOK,OUTLET} from './catchment.js';
import {riverX,riverWidth,inPlot} from './layout.js';
import {lakeRadius} from './lake-layout.js';
import {moatDistance} from './estate.js';
import {fieldPlan,inFarm,underFarmRoof} from './farm-layout.js';
import {brookStage} from './brook.js';

export function buildRainwater(scene,sample,uniforms,fields){
  const cell=1.25,x0=-113,z0=-121,cols=295,rows=244,n=cols*rows;
  const bed=new Float32Array(n),kind=new Uint8Array(n),pos=new Float32Array(n*3);
  for(let j=0;j<rows;j++)for(let k=0;k<cols;k++){
    const x=x0+k*cell,z=z0+j*cell,i=j*cols+k;
    pos[i*3]=x;pos[i*3+2]=z;
    if(Math.abs(x)<40&&Math.abs(z)<45&&inPlot(x,z))continue;
    if(inFarm(x,z)&&underFarmRoof(x,z))continue;
    const sd=x>100?moatDistance(x,z):100;
    if(sd<=0)continue;
    const ground=sample(x,z);
    if(!ground)continue;
    bed[i]=ground.y;kind[i]=LAND;
    if(Math.abs(z)<53&&Math.abs(x-riverX(z))<riverWidth(z)+.4&&ground.y<brookStage(z))kind[i]=BROOK;
    else if((z>54&&lakeRadius(x,z)<1)||(sd<8&&ground.y<2.52)||k===0||k===cols-1||j===0||j===rows-1)kind[i]=OUTLET;
  }
  const plots=fieldPlan.map(field=>({field,bare:fields[field.crop].stage==='fallow'}));
  function updateFields(){
    for(const plot of plots){
      const f=plot.field,bare=fields[f.crop].stage==='fallow';
      if(plot.bare===bare)continue;
      plot.bare=bare;
      for(let z=Math.ceil((f.minZ-z0)/cell);z<=(f.maxZ-z0)/cell;z++)
        for(let x=Math.ceil((f.minX-x0)/cell);x<=(f.maxX-x0)/cell;x++){
          const contact=sample(x0+x*cell,z0+z*cell);if(contact)bed[z*cols+x]=contact.y;
        }
    }
  }
  const sim=createCatchment(cols,rows,cell,bed,kind),pixels=new Uint8Array(n*4);
  const tex=new T.DataTexture(pixels,cols,rows);
  tex.minFilter=tex.magFilter=T.LinearFilter;tex.needsUpdate=true;
  uniforms.catchmentMap={value:tex};
  uniforms.catchmentArea={value:new T.Vector4(x0-cell*.5,z0-cell*.5,1/(cell*cols),1/(cell*rows))};
  const indices=new Uint32Array((cols-1)*(rows-1)*6),g=new T.BufferGeometry();
  const verts=new T.BufferAttribute(pos,3).setUsage(T.DynamicDrawUsage);
  g.setAttribute('position',verts);g.setIndex(new T.BufferAttribute(indices,1).setUsage(T.DynamicDrawUsage));
  g.setDrawRange(0,0);
  const mat=new T.ShaderMaterial({uniforms,transparent:true,depthWrite:false,side:T.DoubleSide,
    vertexShader:`varying vec3 at;void main(){at=position;gl_Position=projectionMatrix*viewMatrix*vec4(at,1.);}`,
    fragmentShader:`
      uniform sampler2D catchmentMap,noiseMap,reflectedScene;uniform vec4 catchmentArea;
      uniform mat4 reflectionMatrix;uniform float mirrorLevel;
      uniform float clock,rain,night,cloud,waterFogDensity;uniform vec3 waterFog,dayLow,dayTop,sunTint,sunDirection;
      varying vec3 at;
      void main(){
        vec4 water=texture2D(catchmentMap,(at.xz-catchmentArea.xy)*catchmentArea.zw);
        float d=water.r*.13;if(d<.0028)discard;
        vec2 flow=(water.gb-.5)*4.;float speed=length(flow);
        vec2 tile=at.xz*2.7,id=floor(tile);
        vec2 seed=texture2D(noiseMap,(id+.5)/256.).rr;
        float ringAge=fract(clock*1.45+seed.x*43.);
        vec2 rad=fract(tile)-(.37+.26*seed);float r=length(rad);
        float crest=r-.53*ringAge;
        vec2 ripple=rain*(1.-ringAge)*exp(-crest*crest*700.)*cos(crest*76.)*rad/max(.04,r)*.13;
        vec2 dir=flow/max(.03,speed),across=vec2(-dir.y,dir.x);
        float stretch=sin(dot(at.xz,across)*21.+1.35*sin(dot(at.xz,dir)*8.-clock*4.));
        vec3 normal=normalize(vec3(ripple.x+dir.x*stretch*.034*speed,1.,ripple.y+dir.y*stretch*.034*speed));
        vec3 eye=normalize(cameraPosition-at),reflection=reflect(-eye,normal);
        float fresnel=.055+.82*pow(1.-max(0.,dot(eye,normal)),3.);
        vec3 sky=mix(dayLow,dayTop,smoothstep(0.,.74,reflection.y));
        sky=mix(sky,waterFog,.48*cloud)*(1.-.87*night);
        float spec=pow(max(0.,dot(reflect(-sunDirection,normal),eye)),115.)*(1.-cloud*.9)*(1.-night);
        vec4 proj=reflectionMatrix*vec4(at,1.);
        vec2 uv=proj.xy/max(proj.w,.001)+normal.xz*.013,edge=min(uv,1.-uv);
        float captured=smoothstep(0.,.05,min(edge.x,edge.y))*step(.01,proj.w)*(1.-smoothstep(.24,.75,abs(at.y-mirrorLevel)));
        sky=mix(sky,texture2D(reflectedScene,clamp(uv,.001,.999)).rgb,captured);
        float opacity=smoothstep(.0028,.019,d)*(.22+.68*sqrt(fresnel)+.27*smoothstep(.012,.095,d));
        vec3 col=mix(vec3(.039,.030,.019)*(1.-night*.86),sky,.19+.81*sqrt(fresnel))+sunTint*spec;
        float fog=distance(at,cameraPosition)*waterFogDensity;
        gl_FragColor=vec4(mix(col,waterFog,1.-exp(-fog*fog)),opacity);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`});
  const mesh=new T.Mesh(g,mat);mesh.name='Rain pools and surface runoff';mesh.frustumCulled=false;mesh.visible=false;
  scene.add(mesh);
  let accumulator=0,awake=false,inflow=0;
  function upload(){
    let count=0,wet=false;
    for(const i of sim.active){
      const d=sim.depth[i],k=i*4;
      wet||=d>.0001||sim.moisture[i]>.0001;
      pos[i*3+1]=bed[i]+d+.001;
      pixels[k]=Math.min(255,Math.round(d*255/.13));
      pixels[k+1]=Math.round(127.5+Math.max(-1,Math.min(1,sim.flowX[i]/2))*127.5);
      pixels[k+2]=Math.round(127.5+Math.max(-1,Math.min(1,sim.flowZ[i]/2))*127.5);
      pixels[k+3]=Math.min(255,Math.round(sim.moisture[i]*255/.008));
      if(i%cols===cols-1||i>=n-cols)continue;
      const j=i+1,h=i+cols,l=h+1;
      if(kind[j]!==LAND||kind[h]!==LAND||kind[l]!==LAND||Math.max(d,sim.depth[j],sim.depth[h],sim.depth[l])<.0028)continue;
      indices[count++]=i;indices[count++]=h;indices[count++]=l;
      indices[count++]=i;indices[count++]=l;indices[count++]=j;
    }
    mesh.visible=count>0;g.setDrawRange(0,count);
    if(count){verts.needsUpdate=true;g.index.clearUpdateRanges();g.index.addUpdateRange(0,count);g.index.needsUpdate=true;}
    tex.needsUpdate=true;awake=wet;
  }
  function indexAt(x,z){
    const k=Math.round((x-x0)/cell),j=Math.round((z-z0)/cell);
    return k<0||k>=cols||j<0||j>=rows?-1:j*cols+k;
  }
  return {
    mesh,
    mirrorHeight(x,z){
      if(!mesh.visible)return null;
      const i=indexAt(x,z);
      if(i<0)return null;
      let weight=0,sum=0;
      for(let j=-5;j<=5;j++)for(let k=-5;k<=5;k++){
        if(i%cols+k<0||i%cols+k>=cols)continue;
        const h=i+j*cols+k;
        if(sim.depth[h]>.009){
          const w=Math.min(.12,sim.depth[h])/(1+k*k+j*j);
          weight+=w;sum+=(bed[h]+sim.depth[h])*w;
        }
      }
      // Quantize the capture plane to avoid refreshing for millimetres of rainfall.
      return weight?Math.round(sum/weight*10)/10:null;
    },
    dampness(x,z){const i=indexAt(x,z);return i<0?0:Math.min(1,sim.moisture[i]/.008+sim.depth[i]*10);},
    surface(x,z){const i=indexAt(x,z);return sim.depth[i]>.004?bed[i]+sim.depth[i]:-Infinity;},
    step(dt,rain){
      if(!awake&&rain<.002){inflow*=Math.exp(-dt*.08);return inflow;}
      accumulator+=dt;
      if(accumulator>=.25){
        updateFields();
        const volume=sim.step(.25,rain).brook;
        inflow+=(Math.min(.85,volume/.25*.35)-inflow)*.035;
        accumulator-=.25;upload();
      }
      return inflow;
    }
  };
}
