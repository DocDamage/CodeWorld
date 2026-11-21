import * as T from 'three';
import {alderSource,alderStage,alderWidth,alderX,falls,lakeHeight,lipZ} from './lake-layout.js';
import {range,tint} from './model.js';

// Both surfaces start at the same surveyed crest. Flight time parameterizes the
// sheet so features accelerate and stretch as they fall away from the lip.
function ribbon(rows,across,sample){
  const positions=[],uv=[],indices=[];
  for(let row=0;row<=rows;row++)for(let col=0;col<=across;col++){
    const u=col/across,t=row/rows;
    positions.push(...sample(u*2-1,t));uv.push(u,t);
    if(row&&col){
      const k=row*(across+1)+col;
      indices.push(k-across-2,k-1,k,k-across-2,k,k-across-1);
    }
  }
  const g=new T.BufferGeometry();
  g.setAttribute('position',new T.Float32BufferAttribute(positions,3));
  g.setAttribute('uv',new T.Float32BufferAttribute(uv,2));g.setIndex(indices);g.computeVertexNormals();
  return g;
}

function alpineRiver(root,b,material){
  const bed=[],channel=[],grade=[];
  const boulders=[];
  for(let i=0;i<44;i++){
    const s=range(1.6,49),offset=range(-1.15,1.15)*alderWidth(s);
    const x=alderX(s)+offset,z=lipZ+s,size=range(.46,1.45);
    const y=lakeHeight(x,z)+size*.27;
    b.put('stone',tint(i%3?'#606762':'#82847b'),x,y,z,size*1.58,size*1.24,size,.18,range(0,3),.08,'stone');
    if(y+size*.5>alderStage(s)-.14)boulders.push({s,offset,size});
  }
  const geometry=ribbon(175,22,(u,t)=>{
    const s=(alderSource+3)*t,z=lipZ+s,lateral=u*(alderWidth(s)+.48),x=alderX(s)+lateral;
    const slope=(alderX(s+.05)-alderX(s-.05))/.1;
    bed.push(-slope,-1,lakeHeight(x,z));
    grade.push((alderStage(s+.05)-alderStage(s-.05))/.1);
    let wake=.6*Math.exp(-s*1.2);
    for(const stone of boulders){
      const downstream=stone.s-s;
      if(downstream<0||downstream>3.3)continue;
      const cross=(lateral-stone.offset)/(stone.size*.48+.23*downstream);
      wake+=Math.exp(-cross*cross-downstream*1.23);
    }
    channel.push(lateral,.18+.45*Math.sin(s*.27)**4,Math.min(1,wake),2);
    return [x,alderStage(s),z];
  });
  geometry.setAttribute('waterBed',new T.Float32BufferAttribute(bed,3));
  geometry.setAttribute('brookChannel',new T.Float32BufferAttribute(channel,4));
  geometry.setAttribute('alpineGrade',new T.Float32BufferAttribute(grade,1));
  const river=new T.Mesh(geometry,material);river.name='Alder headwaters';root.add(river);
}

function fallingWater(root,uniforms){
  const geometry=ribbon(44,54,(u,t)=>{
    const width=alderWidth(0)-.14+t*(.56+.17*Math.cos(u*16));
    const fluting=t*(.13*Math.sin(u*25)+.1*Math.cos(u*13));
    return [falls.x+u*width+.12*t*t,alderStage(0)-10.05*t*t,lipZ-4.5*t+fluting];
  });
  const material=new T.MeshStandardMaterial({color:0xffffff,roughness:.29,metalness:.04,
    side:T.DoubleSide,transparent:true,depthWrite:false});
  material.onBeforeCompile=shader=>{
    Object.assign(shader.uniforms,{fallTime:uniforms.clock,fallNoise:uniforms.noiseMap,runoff:uniforms.runoff});
    shader.vertexShader='varying vec2 chute;uniform float fallTime,runoff;\n'+shader.vertexShader.replace('#include <begin_vertex>',`#include <begin_vertex>
      chute=uv;
      transformed.y+=(1.-uv.y)*(.10*(runoff-1.)+.015*sin(position.x*3.8-fallTime*1.4));
      transformed.z+=uv.y*.085*sin(uv.x*36.+uv.y*8.-fallTime*3.2);`);
    shader.fragmentShader=`varying vec2 chute;uniform float fallTime;uniform sampler2D fallNoise;
      float grain(vec2 p){return texture2D(fallNoise,(p+.5)/256.).r;}
    `+shader.fragmentShader.replace('#include <color_fragment>',`#include <color_fragment>
      float flight=chute.y-fallTime*.64;
      float bend=.72*sin(chute.x*14.+chute.y*3.)+.42*sin(flight*8.+chute.x*9.);
      vec2 p=vec2(chute.x*38.+bend,flight*11.);
      float broad=grain(p*vec2(.26,.51)),strand=grain(p),fine=grain(p*vec2(3.1,1.7));
      float air=smoothstep(.25,.85,.39*broad+.41*strand+.20*fine+.18*chute.y);
      float rim=min(chute.x,1.-chute.x);
      float ragged=smoothstep(.0,.044,rim-(.027*strand+.014*broad)*chute.y);
      diffuseColor.rgb=mix(vec3(.10,.27,.255),vec3(.81,.89,.87),air);
      diffuseColor.a=ragged*mix(.31,.96,air);
      if(diffuseColor.a<.015)discard;`);
  };
  const water=new T.Mesh(geometry,material);water.name='Alder Falls';water.renderOrder=2;root.add(water);
}

function plungeSpray(root,uniforms){
  const seeds=[],positions=[];
  for(let i=0;i<320;i++){seeds.push(range(0,1),range(0,1),range(0,1),range(0,1));positions.push(0,0,0);}
  const g=new T.BufferGeometry();
  g.setAttribute('position',new T.Float32BufferAttribute(positions,3));
  g.setAttribute('seed',new T.Float32BufferAttribute(seeds,4));
  const material=new T.ShaderMaterial({uniforms,transparent:true,depthWrite:false,
    vertexShader:`attribute vec4 seed;uniform float clock;varying float fade,mist,sprig;
      void main(){
        mist=step(.72,seed.w);sprig=seed.x*219.;
        float t=fract(seed.y+clock*mix(.88+.50*seed.z,.24+seed.z*.14,mist));
        vec3 p=vec3((seed.x-.5)*6.0,.10,(seed.z-.5)*.69);
        p.x+=(seed.y-.5)*t*mix(2.5,5.6,mist);
        p.z-=t*(.5+2.*seed.z+2.9*mist);
        p.y+=mix(t*(1.-t)*(3.1+seed.z*4.7),t*(1.4+2.4*seed.y),mist);
        vec4 eye=modelViewMatrix*vec4(p,1.);
        gl_Position=projectionMatrix*eye;
        gl_PointSize=clamp((mix(15.+18.*seed.x,390.+560.*t,mist)) / max(1.,-eye.z),1.,136.);
        fade=sin(3.14159*t)*mix(.66,.095,mist);
      }`,
    fragmentShader:`uniform float night,cloud;uniform sampler2D noiseMap;varying float fade,mist,sprig;
      void main(){
        vec2 p=gl_PointCoord-.5;
        float n=texture2D(noiseMap,(p*8.+sprig)/256.).r;
        float a=(1.-smoothstep(.04,.50,length(p)+(n-.5)*mist*.17))*fade;
        gl_FragColor=vec4(mix(vec3(.83,.90,.89),vec3(.58,.65,.67),cloud)*(1.-.86*night),a);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`});
  const spray=new T.Points(g,material);spray.position.set(falls.x,0,lipZ-4.5);
  spray.frustumCulled=false;spray.renderOrder=3;spray.name='Plunge pool spray';root.add(spray);
}

export function buildAlderFalls(root,b,material){
  alpineRiver(root,b,material);
  fallingWater(root,material.uniforms);
  plungeSpray(root,material.uniforms);
  // Broken strata frame the wet face. Leave the centre channel open.
  for(const side of [-1,1])for(let i=0;i<34;i++){
    const dx=range(3.2,16),x=falls.x+side*dx,z=lipZ+(i%3?range(-4.2,-3.1):range(1.0,4.0));
    const y=lakeHeight(x,z);
    b.put('stone',tint(i%3?'#636962':'#888979'),x,y-.22,z,range(1.1,3.1),range(.95,2.25),range(1.1,2.4),.06,range(-.28,.28),side*.08,'stone');
  }
}
