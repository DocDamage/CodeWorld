import * as T from 'three';
import {meshSurface,pick,range,tint,v,TAU,getSharedMaterial} from './model.js';
import {createCoinPhysics} from './coin-physics.js';
import {walnut,wood} from './furnishings.js';

const coinColors=['#d6a748','#e0b258','#b48437','#f5cb70','#a67836','#d3a64e'];
const gems=['#59133a','#8257be','#2e9f81','#a73634','#3675aa','#c6924d'];
const mounds=[[-13.5,-11.1,3.5,1.5],[13.55,-12.6,2.97,1.31],[-5.5,-6.65,2.0,1.18],[-12.83,5.46,3.27,2.03],
  [-13.5,13.34,3.4,1.72],[13.42,14.03,3.95,2.14],[14.20,5.05,2.75,1.45],[8.43,10.10,2.86,1.60],[-5.26,12.71,2.55,1.5],
  [1.83,14.42,2.88,1.82],[-15.75,-5.87,2.14,1.22],[24.85,10.11,2.45,1.14],[27.6,11.10,2.12,1.22]];

function moundShape(radius,x,z,height,phase){
  const a=Math.atan2(z,x),edge=radius*(.87+.10*Math.sin(a*3+phase)+.10*Math.sin(a*5-phase));
  const r=Math.hypot(x,z*.99)/edge;
  return height*Math.max(0,1-r)**.78*(.84+.16*Math.cos(x*1.6+z*.8)+.08*Math.sin(z*2.8+phase));
}

export function dragonBed(x,z){
  const u=(x+1.85)/8.35,w=(z-3.45)/8.85,r=Math.hypot(u,w);
  if(r>=1)return 0;
  return (1-r*r)**1.62*(1.23+.13*Math.sin(x*1.04+z*.57)+.09*Math.cos(z*1.48));
}

function support(x,z){
  let y=dragonBed(x,z);
  for(const [i,m] of mounds.entries()){
    const [cx,cz,r,h]=m,dx=x-cx,dz=z-cz;
    if(Math.abs(dx)<r*1.1&&Math.abs(dz)<r*1.1)y=Math.max(y,moundShape(r,dx,dz,h,i));
  }
  return y;
}

function layMound(k,coins,x,z,pit,radius,height,phase,nest=false){
  const positions=[],indices=[],colors=[],rings=9,segments=28;
  for(let ring=0;ring<=rings;ring++)for(let j=0;j<=segments;j++){
    const a=j/segments*TAU,r=radius*1.15*ring/rings;
    const dx=r*Math.sin(a),dz=r*Math.cos(a)*(nest?8.85/8.35:1),y=nest?dragonBed(x+dx,z+dz):moundShape(radius,dx,dz,height,phase);
    positions.push(x+dx,pit+.025+y,z+dz);
    const color=tint(pick(coinColors),.35).multiplyScalar(.52+y*.09);colors.push(color.r,color.g,color.b);
    if(ring&&j){const i=positions.length/3-1;indices.push(i-1,i,i-segments-1,i-1,i-segments-1,i-segments-2);}
  }
  const packed=meshSurface(k.root,positions,indices,colors,{roughness:.46,metalness:.48,flatShading:false});
  packed.material.onBeforeCompile=shader=>{
    shader.vertexShader='varying vec2 packedUv;\n'+shader.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\npackedUv=position.xz;');
    shader.fragmentShader='varying vec2 packedUv;\n'+shader.fragmentShader.replace('#include <color_fragment>',`#include <color_fragment>
      vec2 course=packedUv*6.8;
      course.x+=.5*mod(floor(course.y),2.);
      vec2 coin=fract(course)-.5;
      float r=length(coin),soft=max(.018,fwidth(r));
      float face=1.-smoothstep(.46-soft,.48+soft,r);
      float rim=1.-smoothstep(.015,.025+soft,abs(r-.385));
      diffuseColor.rgb*=.74+face*.49+rim*.21+face*dot(coin,vec2(-.21,.31));`);
  };
  for(let i=0;i<Math.floor(radius*radius*97);i++){
    const a=range(0,TAU),r=radius*range(.025,1.09)**.55,dx=r*Math.cos(a),dz=r*Math.sin(a)*(nest?8.85/8.35:1);
    const dy=support(x+dx,z+dz),size=range(.13,nest?.32:.27);
    coins.push({x:x+dx,z:z+dz,y:pit+dy+range(.036,.085),radius:size*.5,thickness:range(.025,.052),
      tilt:range(-.40,.40),angle:a,color:tint(pick(coinColors),.18)});
    if(i%30===0)k.b.put('leaf',pick(gems),x+dx,pit+dy+.09,z+dz,size*1.24,range(.13,.32),size*1.4,range(-.35,.35),a,.24,'jewel');
    if(i%99===0)k.b.put('ring',pick(coinColors),x+dx,pit+dy+.087,z+dz,size*2.1,size*2.1,.56,1.38,a,.15,'gilt');
  }
  if(!nest)k.obstacle(x,z,radius*.70,radius*.68,pit,pit+height*.74);
}

export function buildTreasureHoard(k,pit){
  const coins=[];
  layMound(k,coins,-1.85,3.45,pit,8.35,1.4,0,true);
  for(const [index,[x,z,radius,height]] of mounds.entries())layMound(k,coins,x,z,pit,radius,height,index);
  for(const [cx,cz,turn] of [[4.4,.3,.28],[-6.8,6,-.51],[.9,9.9,.66],[-6.9,-.8,.21]]){
    for(let row=0;row<3;row++)for(let j=0;j<4-row;j++){
      const x=cx+(j-(3-row)/2)*.32*Math.cos(turn),z=cz-(j-(3-row)/2)*.32*Math.sin(turn);
      k.b.put('paver',tint('#e4af4d',.12),x,pit+support(x,z)+.12+row*.13,z,.34,.16,.68,.06,turn,.04,'gilt');
    }
  }
  for(let i=0;i<1550;i++){
    const x=range(-18.7,18.7),z=range(-14,17.3),size=range(.088,.195),scattered=(Math.sin(x*.64)+Math.cos(z*.46))*.21;
    if(Math.random()>scattered+.49||mounds.some(([mx,mz,r])=>Math.hypot(x-mx,z-mz)<r*.94))continue;
    coins.push({x,z,y:pit+support(x,z)+.035,radius:size*.5,thickness:.03,tilt:range(-.18,.18),angle:range(0,TAU),color:tint(pick(coinColors),.24)});
  }

  for(const [x,z,a] of [[-7.6,-8.52,.21],[8.93,-8.74,-.47],[-8.20,7.15,.45],[14.9,9.78,-.6],[-15.8,11.7,.3],[25.3,7.3,0]]){
    k.furnishing(x,z,pit,1.42,.89,b=>{
      wood(b,0,.27,0,1.42,.54,.89,walnut);wood(b,0,.58,-.44,1.44,.07,.16,walnut);
      b.put('box','#6f4a29',0,.83,-.51,1.44,.10,.84,-.94,0,0,'wood');
      for(const off of [-.54,.54]){b.put('box','#ae864d',off,.29,.452,.085,.56,.047,0,0,0,'gilt');b.put('box','#bc9654',off,.83,-.51,.075,.118,.84,-.94,0,0,'gilt');}
      b.put('box','#c69a57',0,.46,.47,.21,.16,.05,0,0,0,'gilt');
      for(let i=0;i<51;i++){
        const cx=range(-.58,.58),cz=range(-.37,.37),size=range(.10,.22);
        b.put('coin',pick(coinColors),cx,range(.54,.71),cz,size,.03,size,i*.13,i*.91,.19,'gilt');
        if(i%8===0)b.put('leaf',pick(gems),cx,.74,cz,.15,.17,.15,.4,i,.1,'jewel');
      }
    },a,1.18);
  }
  for(const [x,z] of [[-8.1,-10.7],[-7.25,-9.85],[7.7,-8.8],[15.17,7.67],[2.8,12.1],[-15.5,12.32],[24.2,8.7]]){
    const y=range(.55,1.02);
    k.furnishing(x,z,pit,.66,.66,b=>{
      b.put('disk','#8d693e',0,.053,0,.50,.106,.5,0,0,0,'gilt');
      b.put('cyl','#ceab67',0,y*.40,0,.145,y*.72,.15,0,0,0,'gilt');
      b.put('barrel','#ad7f47',0,y*.76,0,.56,y*.50,.56,0,0,0,'gilt');
      b.put('ring','#cfac69',0,y*.97,0,.46,.46,.70,Math.PI/2,0,0,'gilt');
      for(let i=0;i<7;i++){
        const a=i*TAU/7;b.put('leaf',pick(gems),Math.sin(a)*.27,y*.77,Math.cos(a)*.27,.098,.12,.086,0,a,.4,'jewel');
      }
    },0,y);
  }
  for(const [x,z,angle] of [[-9.62,9.49,-.48],[13.30,7.89,.72]]){
    k.furnishing(x,z,pit,1.7,1.37,b=>{
      wood(b,0,.38,0,1.6,.73,1.28,walnut);
      b.beam('#76623d',v(0,.10,-.45),v(0,2.15,-.42),.14);
      b.put('arch','#89653e',0,1.29,-.24,1.26,1.56,.19,0,0,Math.PI,'gilt');
      b.put('arch','#336253',0,1.31,-.12,1.04,1.29,.12,0,0,Math.PI);
      b.put('disk','#d9b26b',0,1.29,-.04,.49,.11,.49,Math.PI/2,0,0,'gilt');
      b.put('leaf','#ad3659',0,1.29,.036,.23,.26,.13,0,.35,.78,'jewel');
    },angle,2.2);
  }
  return animateCoins(k,coins,pit);
}

function animateCoins(k,coins,pit){
  const material=getSharedMaterial('gilt').clone();
  material.roughness=.31;material.metalness=.72;
  material.onBeforeCompile=shader=>{
    shader.vertexShader='varying vec3 mintPos;\n'+shader.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\nmintPos=position;');
    shader.fragmentShader='varying vec3 mintPos;\n'+shader.fragmentShader.replace('#include <color_fragment>',`#include <color_fragment>
      float r=length(mintPos.xz),a=atan(mintPos.z,mintPos.x);
      float edge=1.-smoothstep(.009,.024,abs(r-.413));
      float seal=1.-smoothstep(.01,.035,abs(r-.19-.058*cos(a*6.)));
      diffuseColor.rgb*=1.+(.18*edge+.24*seal-.08)*smoothstep(.11,.44,abs(mintPos.y));`);
  };
  const mesh=new T.InstancedMesh(new T.CylinderGeometry(.5,.5,1,12),material,coins.length);
  mesh.instanceMatrix.setUsage(T.DynamicDrawUsage);mesh.receiveShadow=true;
  const pose=new T.Object3D();
  function place(c){
    pose.position.set(c.x,c.y,c.z);pose.rotation.set(c.tilt,c.angle,c.tilt*.37,'YXZ');
    pose.scale.set(c.radius*2,c.thickness,c.radius*2);pose.updateMatrix();mesh.setMatrixAt(c.i,pose.matrix);
  }
  // The kit finishes adding vault walls and furnishings before the first visit.
  let simulation=null,lastX=null,lastZ=null;
  coins.forEach((c,i)=>{c.i=i;mesh.setColorAt(i,c.color);place(c);});k.root.add(mesh);
  return (dt,foot)=>{
    if(foot&&foot.y>=pit-.5&&foot.y<=pit+1.7){
      simulation??=createCoinPhysics(coins,(x,z)=>pit+.033+support(x,z),k.blocks.filter(b=>b.base<=pit+.25&&b.top>pit+.16));
      const distance=lastX===null?0:Math.hypot(foot.x-lastX,foot.z-lastZ);
      if(dt>0&&distance>0&&distance<1.6)simulation.kick(foot.x,foot.z,(foot.x-lastX)/dt,(foot.z-lastZ)/dt);
      lastX=foot.x;lastZ=foot.z;
    }else {lastX=lastZ=null;if(!simulation)return;}
    const moved=simulation.update(dt);
    if(moved.size){
      for(const c of moved){place(c);mesh.instanceMatrix.addUpdateRange(c.i*16,16);}
      mesh.instanceMatrix.needsUpdate=true;
    }
  };
}
