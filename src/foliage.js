import * as T from 'three';

const trail=Array.from({length:5},()=>new T.Vector4(0,-300,0,0));
const windDirection=new T.Vector2(1,0);
const uniforms={leafTime:{value:0},leafWind:{value:.4},foliageWindDirection:{value:windDirection},brushes:{value:trail}};

export function setFoliageWind(time,amplitude,windX=1,windZ=0){
  const x=Number.isFinite(windX)?windX:1,z=Number.isFinite(windZ)?windZ:0,length=Math.hypot(x,z);
  uniforms.leafTime.value=Number.isFinite(time)?time:0;
  uniforms.leafWind.value=Math.max(0,Math.min(2,Number.isFinite(amplitude)?amplitude:0));
  windDirection.set(length>.0001?x/length:1,length>.0001?z/length:0);
  return {time:uniforms.leafTime.value,amplitude:uniforms.leafWind.value,x:windDirection.x,z:windDirection.y};
}

export function swayMaterial(material,{strength=1,blade=false,crown=false,tree=false,flutter=false,cropRoot=null,partSize=null}={}) {
  material.userData.foliageStrength=strength;
  material.userData.foliageKind=blade?'grass':crown?'crown':'plant';
  const flex=point=>blade?'bladeFlex':tree?'smoothstep(.06,1.,position.y)':cropRoot!==null?`smoothstep(0.,1.65,${point}.y-cropRoot)`:'smoothstep(-.5,.5,position.y)';
  const development=cropRoot!==null?'(position+vec3(0.,.5,0.))*partSize-vec3(0.,.5,0.)':'position';
  const declaration=`uniform float leafTime,leafWind;uniform vec2 foliageWindDirection;uniform vec4 brushes[5];
    vec3 foliageMotion(vec3 leaf,float flex){
      vec2 direction=normalize(foliageWindDirection+vec2(.00001,0.));
      vec2 across=vec2(-direction.y,direction.x);
      float phase=dot(leaf.xz,direction*.34+across*.12);
      float wave=.67+.24*sin(leafTime*1.71-phase)+.09*sin(leafTime*3.37-phase*.47);
      vec3 motion=vec3(direction.x,0.,direction.y)*(.026+leafWind*wave*.48);
      ${flutter?'motion.xz+=across*sin(leafTime*5.3+leaf.x*3.7+leaf.z*1.2)*leafWind*.047;':''}
      motion.xz+=across*sin(leafTime*1.13+phase*.73)*(.008+leafWind*.045);
      for(int i=0;i<5;i++){
        vec3 away=leaf-brushes[i].xyz;
        float proximity=(1.-smoothstep(.12,1.43,length(away.xz)))*(1.-smoothstep(.43,1.46,abs(away.y)));
        float push=brushes[i].w*proximity;
        motion.xz+=normalize(away.xz+vec2(.0001))*push*.63;
        motion.y-=push*.34;
      }
      return motion*flex*${strength.toFixed(3)};
    }
    vec3 foliageLocalMotion(vec3 motion,mat4 stem){
      return vec3(dot(motion,stem[0].xyz)/max(.00001,dot(stem[0].xyz,stem[0].xyz)),
        dot(motion,stem[1].xyz)/max(.00001,dot(stem[1].xyz,stem[1].xyz)),
        dot(motion,stem[2].xyz)/max(.00001,dot(stem[2].xyz,stem[2].xyz)));
    }`;
  const apply=shader=>{
    Object.assign(shader.uniforms,uniforms);
    if(cropRoot!==null){shader.uniforms.cropRoot={value:cropRoot};shader.uniforms.partSize=partSize;
      shader.vertexShader='uniform float cropRoot,partSize;\n'+shader.vertexShader;
    }
    shader.vertexShader=declaration+(blade?'attribute float bladeFlex;\n':'\n')+shader.vertexShader;
    shader.vertexShader=shader.vertexShader.replace('#include <beginnormal_vertex>',`#include <beginnormal_vertex>
      mat4 foliageNormalStem=modelMatrix;
      #ifdef USE_INSTANCING
        foliageNormalStem=modelMatrix*instanceMatrix;
      #endif
      vec3 foliageNormalLeaf=(foliageNormalStem*vec4(${development},1.)).xyz;
      float foliageNormalFlex=${flex('foliageNormalLeaf')};
      vec3 foliageNormalBend=foliageLocalMotion(foliageMotion(foliageNormalLeaf,foliageNormalFlex),foliageNormalStem);
      objectNormal=normalize(objectNormal-vec3(foliageNormalBend.x,0.,foliageNormalBend.z)*.68);
    `);
    shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>',`#include <begin_vertex>
      mat4 stem=modelMatrix;
      #ifdef USE_INSTANCING
        stem=modelMatrix*instanceMatrix;
      #endif
      ${cropRoot!==null?`transformed=${development};`:''}
      vec3 leaf=(stem*vec4(transformed,1.)).xyz;
      float foliageVertexFlex=${flex('leaf')};
      transformed+=foliageLocalMotion(foliageMotion(leaf,foliageVertexFlex),stem);
    `);
  };
  const key=`foliage-${strength}-${tree}-${flutter}-${blade}-${cropRoot!==null}`;
  material.onBeforeCompile=shader=>{
    apply(shader);
    if(cropRoot!==null){
      shader.vertexShader='varying vec3 cropPoint;\n'+shader.vertexShader.replace('#include <project_vertex>','cropPoint=position;\n#include <project_vertex>');
      shader.fragmentShader='varying vec3 cropPoint;\n'+shader.fragmentShader.replace('#include <color_fragment>',`#include <color_fragment>
        float leafColor=smoothstep(.005,.055,diffuseColor.g-diffuseColor.r);
        float rib=exp(-abs(cropPoint.x)*43.);
        float veins=sin(102.*abs(cropPoint.x)-cropPoint.y*23.);
        float detail=1.-smoothstep(.014,.075,length(fwidth(cropPoint)));
        diffuseColor.rgb*=1.+leafColor*(.11*cropPoint.y-.10+.12*rib+.062*veins*detail);
        diffuseColor.rgb+=leafColor*(.007*rib+.004*max(0.,veins)*detail)*vec3(.85,1.,.41);
      `);
    }
    if(!crown)return;
    shader.vertexShader='varying float canopyLight;\n'+shader.vertexShader.replace('#include <project_vertex>',`
      // Ambient occlusion builds up under each cluster of leaves.
      canopyLight=smoothstep(-.48,.40,position.y+.14*sin(leaf.x*5.2)*sin(leaf.z*4.4));
      #include <project_vertex>`);
    shader.fragmentShader='varying float canopyLight;\n'+shader.fragmentShader.replace('#include <color_fragment>',`#include <color_fragment>
      diffuseColor.rgb*=mix(vec3(.57,.64,.62),vec3(1.12,1.08,.93),canopyLight);`);
  };
  material.customProgramCacheKey=()=>key+'-'+crown;
  const shadow=new T.MeshDepthMaterial({depthPacking:T.RGBADepthPacking,map:material.map,alphaTest:material.alphaTest,side:material.side});
  shadow.onBeforeCompile=apply;shadow.customProgramCacheKey=()=>key;
  material.userData.windDepth=shadow;
  return material;
}

export function buildFallingLeaves(scene,ground){
  const sources=[],leafCount=135;
  const leaves=Array.from({length:leafCount},()=>({life:0,x:0,y:0,z:0,dx:0,dy:0,dz:0,spin:0,roll:0,age:0,settled:false}));
  const shape=new T.Shape();shape.moveTo(0,-.5);shape.quadraticCurveTo(-.46,-.20,-.28,.15);shape.quadraticCurveTo(-.17,.36,.10,.51);shape.quadraticCurveTo(.41,.21,.28,-.14);shape.quadraticCurveTo(.15,-.36,0,-.5);
  const geometry=new T.ShapeGeometry(shape,4);
  const mesh=new T.InstancedMesh(geometry,new T.MeshStandardMaterial({roughness:.92,side:T.DoubleSide}),leafCount);
  mesh.instanceMatrix.setUsage(T.DynamicDrawUsage);mesh.frustumCulled=false;scene.add(mesh);
  const dummy=new T.Object3D(),colors=['#8c7041','#ad7737','#af813f','#846643','#8b9255','#b8a068'].map(c=>new T.Color(c));
  let cursor=0,traces=0,lastX=Infinity,lastY=Infinity,lastZ=Infinity,spawn=0,push=0,lastSpace=null,nearby=[];
  function emit(x,y,z,velocity){
    const p=leaves[cursor];mesh.setColorAt(cursor,colors[cursor%colors.length]);cursor=(cursor+1)%leafCount;
    Object.assign(p,{x,y,z,dx:(Math.random()-.4)*velocity,dy:Math.random()*.64, dz:(Math.random()-.38)*velocity,
      spin:(Math.random()-.5)*6,roll:Math.random()*6.28,age:0,life:7+Math.random()*6,settled:false});
    mesh.instanceColor.needsUpdate=true;
  }
  return {
    add(x,y,z,spread=.65){sources.push({x,y,z,spread});},
    tick(time,dt,wind,eye,actor,space=null,windX=1,windZ=0){
      setFoliageWind(time,space ? .06 : wind,windX,windZ);
      for(const point of trail)point.w=Math.max(0,point.w-dt*.9);
      if(lastSpace!==space){for(const point of trail)point.w=0;lastX=Infinity;lastSpace=space;}
      if(actor){
        const distance=Math.hypot(actor.x-lastX,actor.z-lastZ,actor.y-lastY);
        if(distance>.29){
          if(distance>6)for(const point of trail)point.w=0;
          lastX=actor.x;lastY=actor.y;lastZ=actor.z;
          const target=trail[1+(traces++%(trail.length-1))];target.set(actor.x,actor.y-.95,actor.z,.73);
          if(distance<6&&!space)push+=distance;
        }
        trail[0].set(actor.x,actor.y-.83,actor.z,.88);
      }else{trail[0].w=0;lastX=Infinity;}
      if(space)return;
      spawn+=dt*(3.9+wind*9.5);
      if(spawn>1){
        nearby=sources.filter(p=>(p.x-eye.x)**2+(p.z-eye.z)**2<33**2);
        while(spawn>=1){spawn--;
          if(!nearby.length)continue;
          const source=nearby[Math.floor(Math.random()*nearby.length)];
          emit(source.x+(Math.random()-.5)*source.spread*2,source.y+(Math.random()-.4)*source.spread,source.z+(Math.random()-.5)*source.spread*2,.65);
        }
      }
      if(push>.82&&actor){
        push=0;
        const source=nearby.find(p=>Math.hypot(p.x-actor.x,p.z-actor.z)<1.65&&Math.abs(p.y-actor.y)<2.9);
        if(source)for(let i=0;i<3;i++)emit(source.x+(Math.random()-.5)*.65,Math.min(source.y,actor.y+.3),source.z+(Math.random()-.5)*.65,1.6);
      }
      for(let i=0;i<leafCount;i++){
        const p=leaves[i];p.age+=dt;
        let size=0;
        if(p.age<p.life){
          if(!p.settled){
            p.dx+=(windDirection.x*(.18+wind*2.05)-p.dx)*dt*.65;p.dz+=(windDirection.y*(.18+wind*2.05)-p.dz)*dt*.65;
            p.dy+=(-.76-p.dy)*dt*1.55;
            p.x+=(p.dx+Math.sin(p.age*5+i)*.47)*dt;p.z+=(p.dz+Math.cos(p.age*3.4+i)*.34)*dt;p.y+=p.dy*dt;
            p.roll+=p.spin*dt;
            if(p.y<ground(p.x,p.z)+.032){p.y=ground(p.x,p.z)+.032;p.settled=true;}
          }
          size=(.073+(i%9)*.013)*Math.min(1,(p.life-p.age)*.76);
        }
        dummy.position.set(p.x,p.y,p.z);dummy.rotation.set(p.settled?-Math.PI/2:p.roll, p.settled?0:p.roll*.53, i*.42+p.roll);
        dummy.scale.set(size,size,size);dummy.updateMatrix();mesh.setMatrixAt(i,dummy.matrix);
      }
      mesh.instanceMatrix.needsUpdate=true;
    }
  };
}
