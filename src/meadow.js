import * as T from 'three';
import {seeded,turfMap} from './botanical-textures.js';
import {swayMaterial} from './foliage.js';

export function applyTurf(mesh,coverage){
  const p=mesh.geometry.attributes.position,weights=new Float32Array(p.count);
  for(let i=0;i<p.count;i++)weights[i]=coverage(p.getX(i),p.getZ(i))?1:0;
  mesh.geometry.setAttribute('turfCover',new T.BufferAttribute(weights,1));
  const material=mesh.material;
  const prior=material.onBeforeCompile,priorKey=material.customProgramCacheKey();
  material.onBeforeCompile=(shader,renderer)=>{
    prior.call(material,shader,renderer);
    shader.uniforms.meadowTurf={value:turfMap()};
    shader.vertexShader='attribute float turfCover;varying float turfAmount;varying vec2 turfUv;\n'+shader.vertexShader.replace('#include <begin_vertex>',
      '#include <begin_vertex>\nturfAmount=turfCover;turfUv=position.xz;');
    shader.fragmentShader='uniform sampler2D meadowTurf;varying float turfAmount;varying vec2 turfUv;\n'+shader.fragmentShader.replace('#include <map_fragment>',
      `#include <map_fragment>
       vec3 turf=texture2D(meadowTurf,turfUv*.95).rgb;
       float variation=texture2D(meadowTurf,turfUv.yx*.27).g;
       diffuseColor.rgb*=mix(vec3(1.),(.55+turf*1.25)*(.91+.21*variation)*vec3(.96,1.09,.94),turfAmount);`);
  };
  material.customProgramCacheKey=()=>priorKey+'|meadow';
}
// Each zone keeps a reusable square of real, tapered blades. Wrap roots around the
// viewer in world space. Only the distant, already-faded perimeter is recycled.
function terrainLookup(zone,height,allowed){
  const {minX,maxX,minZ,maxZ}=zone,w=Math.ceil((maxX-minX)/.40)+1,h=Math.ceil((maxZ-minZ)/.40)+1;
  const data=new Float32Array(w*h*4);
  for(let j=0;j<h;j++)for(let i=0;i<w;i++){
    const x=minX+i/(w-1)*(maxX-minX),z=minZ+j/(h-1)*(maxZ-minZ),n=(j*w+i)*4;
    data[n]=height(x,z);data[n+1]=Number(allowed(x,z,zone.name));data[n+3]=1;
  }
  const texture=new T.DataTexture(data,w,h,T.RGBAFormat,T.FloatType);
  texture.needsUpdate=true;
  return {texture,bounds:new T.Vector4(minX,minZ,maxX-minX,maxZ-minZ),size:new T.Vector2(w,h)};
}
const size=20.5;
let bladeStand;
function buildBladeStand(){
  const positions=[],indices=[],colours=[],flex=[],roots=[],rng=seeded(0x3ca71);
  const side=64,step=size/side;
  for(let j=0;j<side;j++)for(let i=0;i<side;i++)for(let tuft=0;tuft<2;tuft++){
    const cx=(i+rng())*step,cz=(j+rng())*step;
    for(let b=0;b<5;b++){
      const baseX=cx+(rng()-.5)*.20,baseZ=cz+(rng()-.5)*.20;
      const a=rng()*Math.PI*2,dx=Math.cos(a),dz=Math.sin(a),w=.0040+rng()*.0070;
      const h=.095+rng()*.144,lean=h*(.16+.46*rng()),n=positions.length/3;
      const base=new T.Color().setHSL(.201+rng()*.046,.20+rng()*.14,.21+rng()*.085,T.SRGBColorSpace);
      const tip=base.clone().lerp(new T.Color('#98a765'),.21+rng()*.30);
      for(const [across,lift,bend,f] of [[-1,0,0,0],[1,0,0,0],[-.58,.55,.28,.28],[.58,.55,.28,.28],[0,1,1,1]]){
        positions.push(baseX+dx*across*w-dz*bend*lean,lift*h,baseZ+dz*across*w+dx*bend*lean);
        roots.push(baseX,baseZ);flex.push(f);const c=lift===1?tip:base;colours.push(c.r,c.g,c.b);
      }
      indices.push(n,n+1,n+3,n,n+3,n+2,n+2,n+3,n+4);
    }
  }
  const geometry=new T.BufferGeometry();
  for(const [name,data,channels] of [['position',positions,3],['color',colours,3],['bladeRoot',roots,2],['bladeFlex',flex,1]])
    geometry.setAttribute(name,new T.Float32BufferAttribute(data,channels));
  const normals=new Float32Array(positions.length);
  for(let i=1;i<normals.length;i+=3)normals[i]=1;
  geometry.setAttribute('normal',new T.BufferAttribute(normals,3));geometry.setIndex(indices);
  return geometry;
}
export function meadowMesh(root,zone,height,allowed){
  bladeStand??=buildBladeStand();
  // Per-region bounds and draw ranges, shared GPU buffers.
  const geometry=new T.BufferGeometry();
  for(const [name,attribute] of Object.entries(bladeStand.attributes))geometry.setAttribute(name,attribute);
  geometry.setIndex(bladeStand.index);
  const mesh=new T.Mesh(geometry,new T.MeshStandardMaterial({vertexColors:true,roughness:1,side:T.DoubleSide}));
  mesh.receiveShadow=true;root.add(mesh);
  const {texture,bounds,size:grid}=terrainLookup(zone,height,allowed);
  mesh.name=zone.name+' meadow';mesh.userData.grassZone=zone.name;
  swayMaterial(mesh.material,{strength:.18,blade:true});mesh.customDepthMaterial=mesh.material.userData.windDepth;
  const project=`
    attribute vec2 bladeRoot;
    uniform vec4 meadowBounds;uniform vec2 meadowGrid;uniform sampler2D meadowTerrain;
    vec3 meadowPosition(vec3 vertex){
      vec2 root=cameraPosition.xz+mod(bladeRoot-cameraPosition.xz+${size/2},${size})-${size/2};
      vec2 cell=(root-meadowBounds.xy)/meadowBounds.zw*(meadowGrid-1.);
      vec2 uv=(floor(cell)+.5)/meadowGrid,delta=1./meadowGrid,f=fract(cell);
      vec2 a=texture2D(meadowTerrain,uv).rg,b=texture2D(meadowTerrain,uv+vec2(delta.x,0.)).rg;
      vec2 c=texture2D(meadowTerrain,uv+vec2(0.,delta.y)).rg,d=texture2D(meadowTerrain,uv+delta).rg;
      vec2 land=mix(mix(a,b,f.x),mix(c,d,f.x),f.y);
      float growth=smoothstep(.62,.95,land.y)*(1.-smoothstep(7.3,10.15,distance(root,cameraPosition.xz)));
      if(any(lessThan(cell,vec2(0.)))||any(greaterThan(cell,meadowGrid-1.))||growth<.01) return vec3(root.x,land.x-.12,root.y);
      return vec3(root.x+(vertex.x-bladeRoot.x)*growth,land.x-.013+vertex.y*growth,root.y+(vertex.z-bladeRoot.y)*growth);
    }`;
  for(const material of [mesh.material,mesh.customDepthMaterial]){
    const wind=material.onBeforeCompile;
    material.onBeforeCompile=(shader,renderer)=>{
      wind(shader,renderer);Object.assign(shader.uniforms,{meadowBounds:{value:bounds},meadowGrid:{value:grid},meadowTerrain:{value:texture}});
      shader.vertexShader=project+'\n'+shader.vertexShader.replace('vec4(position,1.)','vec4(meadowPosition(position),1.)')
        .replace('#include <begin_vertex>','#include <begin_vertex>\ntransformed=meadowPosition(position);');
      shader.fragmentShader=shader.fragmentShader.replace('#include <normal_fragment_maps>', '#include <normal_fragment_maps>\nnormal=normalize(mat3(viewMatrix)*vec3(.05,1.,.07));');
    };
  }
  const count=geometry.index.count;
  mesh.onBeforeRender=(_renderer,_scene,camera)=>{
    const {x,z}=camera.position;
    const visible=x>=zone.minX-size/2&&x<=zone.maxX+size/2&&z>=zone.minZ-size/2&&z<=zone.maxZ+size/2;
    mesh.geometry.setDrawRange(0,visible?count:0);
  };
  mesh.geometry.boundingSphere=new T.Sphere(new T.Vector3(bounds.x+bounds.z/2,2,bounds.y+bounds.w/2),Math.hypot(bounds.z,bounds.w)*.5+10);
  return mesh;
}
