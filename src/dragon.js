import * as T from 'three';
import {Builder,v,TAU,tint,meshSurface} from './model.js';
import {createDragonDialogue} from './dragon-dialogue.js';

const skin='#323238',crest='#63383e',horn='#a89c84',belly='#554845';
function shadeDragon(mesh,color){
  const skinLike=color===skin||color===crest||color===belly;
  mesh.material.roughness=skinLike?.76:.59;mesh.material.metalness=skinLike?.035:.015;
  if(!skinLike)return mesh;
  mesh.material.onBeforeCompile=shader=>{
    shader.vertexShader=shader.vertexShader.replace('#include <common>','#include <common>\nvarying vec3 vDragonPosition,vDragonNormal;')
      .replace('#include <begin_vertex>','#include <begin_vertex>\nvDragonPosition=position;vDragonNormal=normal;');
    shader.fragmentShader=shader.fragmentShader.replace('#include <common>',`#include <common>
      varying vec3 vDragonPosition,vDragonNormal;
      float scaleRow(vec2 p,float row,float aa){
        float across=p.x+mod(row,2.)*.5;
        vec2 cell=vec2(fract(across)-.5,p.y-row-.44);
        float variation=sin(floor(across)*18.1+row*32.7);
        cell.x+=variation*.03+cell.y*.07;
        float width=.53-.18*smoothstep(-.18,.56,cell.y);
        float edge=length(vec2(cell.x/width,cell.y/(.69+.055*variation)));
        float plate=1.-smoothstep(.83-aa,1.+aa,edge);
        return plate*(.77+.18*(1.-min(edge,1.))+.12*cell.y);
      }
      float scute(vec2 p){
        p*=vec2(7.3,8.8);
        p+=.17*sin(p.yx*.73+sin(p*.31));
        float footprint=max(fwidth(p.x),fwidth(p.y)),row=floor(p.y);
        float plates=max(scaleRow(p,row,footprint*.5),scaleRow(p,row-1.,footprint*.5));
        plates=max(plates,scaleRow(p,row+1.,footprint*.5));
        return mix(plates,.67,smoothstep(.18,.74,footprint));
      }`)
      .replace('#include <color_fragment>',`#include <color_fragment>
        vec3 dragonWeights=pow(abs(normalize(vDragonNormal)),vec3(4.));
        dragonWeights/=max(dot(dragonWeights,vec3(1.)),.001);
        float scuteHeight=dot(dragonWeights,vec3(scute(vDragonPosition.zy),scute(vDragonPosition.xz),scute(vDragonPosition.xy)));
        float mottling=.5+.5*sin(vDragonPosition.z*4.8+vDragonPosition.x*7.+sin(vDragonPosition.y*12.)*.8);
        diffuseColor.rgb*=mix(.70,1.10,scuteHeight)*mix(.93,1.12,mottling);
      `)
      .replace('#include <normal_fragment_maps>',`#include <normal_fragment_maps>
        vec3 dxDragon=dFdx(-vViewPosition),dyDragon=dFdy(-vViewPosition);
        vec3 uxDragon=cross(dyDragon,normal),uyDragon=cross(normal,dxDragon);
        float detDragon=dot(dxDragon,uxDragon);
        vec3 gradientDragon=sign(detDragon)*(dFdx(scuteHeight)*uxDragon+dFdy(scuteHeight)*uyDragon);
        normal=normalize(max(.000001,abs(detDragon))*normal-gradientDragon*.0045);
      `)
      .replace('#include <roughnessmap_fragment>',`#include <roughnessmap_fragment>
        roughnessFactor*=mix(.86,1.08,scuteHeight);
      `);
  };
  mesh.material.customProgramCacheKey=()=>`aurelith-scales-${color}`;
  return mesh;
}
function tapered(root,points,color,sides=12,previousSurface=null){
  const pos=[],idx=[],cols=[];
  const line=new T.CatmullRomCurve3(points.map(a=>v(a[0],a[1],a[2])),false,'centripetal');
  const count=(points.length-1)*3+1;
  let previousAxis=null,horizontal=null;
  // Parallel-transport each cross-section around elbows and tail bends.
  // Using world-up at each ring would flip a limb abruptly near a vertical tangent.
  for(let i=0;i<count;i++){
    const t=i/(count-1),p=line.getPoint(t),axis=i===0&&previousSurface?
      v(...previousSurface.userData.taper.endAxis):line.getTangent(t).normalize();
    const f=t*(points.length-1),j=Math.min(points.length-2,Math.floor(f)),u=f-j;
    const w=T.MathUtils.lerp(points[j][3],points[j+1][3],u),h=T.MathUtils.lerp(points[j][4],points[j+1][4],u);
    if(previousAxis)horizontal.applyQuaternion(new T.Quaternion().setFromUnitVectors(previousAxis,axis)).normalize();
    else if(previousSurface)horizontal=v(...previousSurface.userData.taper.endHorizontal);
    else{horizontal=v(0,1,0).cross(axis);if(horizontal.lengthSq()<.01)horizontal.set(1,0,0);horizontal.normalize();}
    if(previousSurface&&i){
      // Ease out of the parent's twist so the pad lies flat and the skull stays level.
      const level=v(0,1,0).cross(axis).normalize();
      if(level.dot(horizontal)<0)level.negate();
      horizontal.lerp(level,Math.min(1,t*2)).normalize();
    }
    previousAxis=axis;
    const vertical=axis.clone().cross(horizontal).normalize();
    for(let k=0;k<sides;k++){
      const angle=k*TAU/sides,s=Math.sin(angle),pt=p.clone().addScaledVector(horizontal,w*Math.cos(angle)).addScaledVector(vertical,h*s);
      pos.push(...pt.toArray());const c=tint(s<-.44&&color===skin?belly:color,.035);cols.push(c.r,c.g,c.b);
      if(i){const n=i*sides+k,j=i*sides+(k+1)%sides;idx.push(n-sides,j-sides,n,j-sides,j,n);}
    }
  }for(let j=1;j<sides-1;j++){
    const end=(count-1)*sides;
    idx.push(0,j+1,j,end,end+j,end+j+1);
  }
  const m=shadeDragon(meshSurface(root,pos,idx,cols,{roughness:.76,flatShading:false}),color);m.castShadow=true;
  m.userData.taper={sides,rings:count,start:line.getPoint(0).toArray(),end:line.getPoint(1).toArray(),
    startAxis:previousSurface?.userData.taper.endAxis??line.getTangent(0).normalize().toArray(),
    endAxis:previousAxis.toArray(),endHorizontal:horizontal.toArray()};
  return m;
}
function wing(root,s){
  const arm=[[.74,3,.0,.45,.45],[2.35,4.05,-.72,.34,.34],[3.9,5.65,-1.37,.25,.25],[4.57,6.36,-.87,.20,.21]];
  const mirror=pts=>pts.map(([x,...r])=>[x*s,...r]);tapered(root,mirror(arm),skin);
  const wrist=v(s*4.57,6.36,-.87),anchors=[[7.65,4.25,.05],[7.41,2.4,2.04],[6.40,1.35,4.00],[4.64,1.43,5.66],[2.53,1.65,5.90],[.86,2.44,3.12]];
  const point=([x,y,z])=>v(s*x,y,z);
  const pos=[],cols=[],idx=[];
  for(let k=0;k<anchors.length-1;k++){
    const a=point(anchors[k]),b=point(anchors[k+1]),mid=a.clone().lerp(b,.5).lerp(wrist,.105);
    const inset=wrist.clone().lerp(mid,.58);inset.y+=.25;
    const points=[wrist,a,mid,b,inset];const start=pos.length/3;
    for(const [i,p] of points.entries()){pos.push(...p.toArray());const c=new T.Color(i===4?'#754842':i===0?'#563638':'#68403c');cols.push(c.r,c.g,c.b);}
    for(const tri of [[0,1,4],[1,2,4],[2,3,4],[3,0,4]])idx.push(...tri.map(i=>start+i));
  }
  const start=pos.length/3;
  for(const p of [wrist,point(anchors.at(-1)),v(s*.77,3.04,.08),v(s*2.35,4.08,-.70)]){
    pos.push(...p.toArray());const c=new T.Color('#623c3a');cols.push(c.r,c.g,c.b);
  }
  idx.push(start,start+1,start+3,start+1,start+2,start+3);
  const membrane=meshSurface(root,pos,idx,cols,{roughness:.91,metalness:0,flatShading:false});membrane.castShadow=true;
  for(const a of anchors){const p=point(a),mid=wrist.clone().lerp(p,.5);mid.y+=.17;
    tapered(root,[[...wrist.toArray(),.115,.12],[...mid.toArray(),.083,.09],[...p.toArray(),.018,.022]],crest,7);}
  tapered(root,mirror([[4.57,6.36,-.87,.13,.13],[4.62,6.68,-1.11,.09,.10],[4.48,6.90,-1.18,.008,.008]]),horn,8);
}

function makeSpring(stiffness,drag){
  let position=0,velocity=0;
  return (target,dt)=>{
    const steps=Math.max(1,Math.ceil(dt/.018)),interval=dt/steps;
    for(let i=0;i<steps;i++){
      velocity+=(target-position)*stiffness*interval;
      velocity*=Math.exp(-drag*interval);
      position+=velocity*interval;
    }
    return position;
  };
}
export function makeDragon(parent){
  const beast=new T.Group();beast.position.set(-2,-15.12,2.8);parent.add(beast);
  const body=new T.Group();body.scale.set(1.58,1.32,1.55);beast.add(body);const b=new Builder(body);
  tapered(body,[[0,2.20,-1.7,.58,.79],[0,2.48,-.87,1.38,1.41],[0,2.38,.48,1.72,1.50],[.1,2.13,2.10,1.72,1.31],[.35,1.82,3.49,1.23,.96],[.75,1.57,4.47,.73,.64]],skin,18);
  const tail=new T.Group();tail.position.set(.62,1.63,3.90);body.add(tail);
  tapered(tail,[[0,0,0,.89,.75],[.51,-.41,1.64,.73,.61],[1.70,-.75,3.18,.54,.44],[3.59,-.95,4.04,.38,.32],[5.36,-1.04,3.58,.26,.23],[6.19,-.93,2.35,.16,.16],[6.08,-.73,1.34,.07,.09],[5.74,-.60,.93,.012,.014]],skin);
  for(const s of [-1,1]){
    for(const back of [false,true]){
      const z=back?2.43:-.86;
      const end=`${back?'hind':'front'} ${s<0?'left':'right'}`;
      const ankle=[s*1.90,.38,z-.18,.25,.25];
      const leg=tapered(body,[[s*.98,2.44,z,.61,.64],[s*1.69,1.96,z+.28,.51,.49],[s*2.10,.92,z+.49,.36,.43],ankle],skin);
      leg.name=`dragon ${end} leg`;
      const foot=tapered(body,[ankle,[s*1.97,.18,z-.58,.35,.17],[s*1.97,.105,z-.84,.31,.095]],skin,12,leg);
      foot.name=`dragon ${end} foot`;
      for(let k=-1;k<=1;k++){
        const spread=k*.25,xx=s*1.97+spread;
        const toe=tapered(body,[[s*1.97+k*.08,.105,z-.77,.13,.085],[xx,.075,z-1.11,.105,.065],[xx+k*.04,.060,z-1.25,.075,.045]],skin,8);
        toe.name=`dragon ${end} toe ${k+2}`;
        const claw=tapered(body,[[xx+k*.04,.060,z-1.25,.075,.045],[xx+k*.055,.050,z-1.39,.045,.030],[xx+k*.065,.048,z-1.48,.006,.008]],horn,7);
        claw.name=`dragon ${end} claw ${k+2}`;
      }
    }
    for(let j=0;j<13;j++){const z=-.71+j*.30,h=2.93-.14*Math.abs(z-1),xx=s*(1.35+.17*Math.sin(j*.3));
      b.put('leaf',tint(crest,.10),xx,h,z,.24,.37,.44,0,0,s*.26);}
  }
  for(let j=0;j<15;j++){const z=-1.33+j*.49,h=z<3.8?3.96-.15*Math.abs(z-.1):2.25-(z-3.8)*.58;
    const x=z<3?.03:Math.pow(z-3,1.6)*.23;b.put('cone',crest,x,h,z,.38,.65-j*.02,.50,-.35);}
  // Layered shoulder and flank scutes break up the silhouette and catch vault light.
  for(const side of [-1,1])for(let row=0;row<4;row++)for(let j=0;j<8;j++){
    const z=-.15+j*.53+row*.11,x=side*(1.40-.13*row-.055*j),y=2.28+.23*row-.08*j;
    b.put('leaf',tint(row%2?'#44363d':'#4e3a40',.11),x,y,z,.45,.19,.58,.12,0,side*(.42+.08*row));
  }
  const neck=new T.Group();neck.name='dragon neck';neck.position.set(0,2.77,-1.20);body.add(neck);const hb=new Builder(neck);
  const eyelids=[];
  const neckJoin=[-.23,1.61,-2.76,.62,.57];
  const neckCore=tapered(neck,[[0,-.40,.85,.77,.80],[-.10,.10,-.54,.86,.90],[-.31,.69,-1.33,.72,.76],[-.39,1.31,-2.02,.63,.68],neckJoin],skin,18);
  neckCore.name='dragon neck core';
  const head=tapered(neck,[neckJoin,[-.20,1.71,-3.03,.85,.60],[-.16,1.65,-3.34,.78,.52],
    [-.12,1.58,-3.65,.60,.37],[-.09,1.52,-4.08,.46,.26],[-.08,1.49,-4.36,.47,.24],[-.08,1.47,-4.52,.32,.17]],skin,18,neckCore);
  head.name='dragon head';
  for(let j=0;j<10;j++){
    const f=j/9,z=-.63-f*3.42;
    hb.put('leaf',tint(j%2?belly:'#6a5650',.06),-.13,1.11+.12*Math.sin(f*Math.PI),z,.43-f*.09,.10,.31,0,0,(j%2-.5)*.16);
  }
  for(const s of [-1,1]){
    tapered(neck,[[s*.43-.24,1.98,-2.56,.27,.28],[s*.71-.24,2.40,-2.21,.21,.21],[s*.91-.24,2.75,-1.73,.13,.13],[s*.98-.24,3.04,-1.50,.01,.01]],horn);
    const eyeX=s*.812-.19;
    hb.put('ball','#423936',eyeX,1.79,-3.16,.25,.35,.45,0,s*.18,-s*.09);
    hb.put('ball','#de9b39',eyeX+s*.074,1.80,-3.19,.17,.237,.32,0,s*.21,0,'glow');
    hb.put('ball','#231c16',eyeX+s*.15,1.80,-3.20,.038,.187,.061,0,s*.21,0);
    hb.put('ball','#fbeac0',eyeX+s*.159,1.86,-3.23,.026,.035,.038);
    const lid=new T.Mesh(new T.SphereGeometry(.5,12,8),new T.MeshStandardMaterial({color:skin,roughness:.84}));
    lid.position.set(eyeX+s*.099,1.92,-3.19);lid.scale.set(.18,.006,.334);lid.rotation.y=s*.21;neck.add(lid);eyelids.push(lid);
    tapered(neck,[[s*.63-.20,1.99,-2.91,.15,.11],[eyeX+s*.025,1.96,-3.13,.14,.095],
      [s*.66-.16,1.90,-3.42,.085,.06],[s*.49-.12,1.78,-3.63,.018,.018]],skin,9);
    hb.put('leaf',tint(skin,.08),s*.54-.20,1.73,-3.45,.43,.17,.55,-.08,s*.31,s*.12);
    hb.put('ball','#4b4240',s*.30-.08,1.61,-4.32,.26,.18,.31,-.06,s*.30,0);
    hb.put('ball','#201f20',s*.36-.08,1.65,-4.37,.16,.095,.17,-.18,s*.29,0);
    for(let j=0;j<5;j++){
      const f=j/4;
      hb.put('cone',horn,s*(.43-.15*f)-.10,1.27+.06*f,-3.61-f*.74,.080,j===3?.19:.105,.082,0,.10*s,Math.PI);
    }
    tapered(neck,[[s*.64-.24,1.64,-2.54,.22,.24],[s*1.02-.24,1.77,-2.17,.14,.14],[s*1.32-.24,1.82,-1.95,.01,.01]],crest);
  }
  for(let j=0;j<7;j++){
    const f=j/6;hb.put('cone',crest,-.14-.17*Math.sin(f*Math.PI),.79+f*1.60,-.27-f*2.03,.23,.48-f*.10,.26,-.49);
  }
  for(const s of [-1,1])for(let j=0;j<8;j++){
    const f=j/7;hb.put('leaf',tint('#ad674f'),s*(.71-.24*f)-.19,.29+f*1.34,-.24-f*1.95,.16,.26,.30,0,0,s*.26);
  }
  const jaw=new T.Group();jaw.name='dragon lower jaw';jaw.position.set(-.14,1.35,-2.99);neck.add(jaw);
  tapered(jaw,[[0,.06,.14,.47,.32],[0,-.065,-.31,.57,.24],[.03,-.10,-.72,.46,.17],
    [.05,-.105,-1.13,.38,.125],[.06,-.10,-1.38,.35,.12],[.06,-.085,-1.49,.23,.085]],belly,16);
  const jb=new Builder(jaw);
  jb.put('ball','#513733',.04,.004,-.88,.76,.10,1.05);
  for(const s of [-1,1])for(let j=0;j<4;j++)jb.put('cone',horn,s*(.36-j*.027)+.04,.027,-.67-j*.196,.057,.10,.061);
  jb.finish();
  hb.finish();b.finish();
  const wings=[-1,1].map(s=>{const g=new T.Group();body.add(g);wing(g,s);return g;});
  const dialogue=createDragonDialogue();let awareness=0,voice=0;
  const turnHead=makeSpring(9.8,4.4),settleWings=makeSpring(6,2.75),settleTail=makeSpring(4.8,2.53),moveJaw=makeSpring(70,11.7);
  const speak=fn=>(voice=1,fn());
  return {
    root:beast,
    get snapshot(){return dialogue.snapshot;},
    action(x,z,y){
      const onFloor=y<-14.55&&Math.hypot(x+2,z+5.7)<6.2;
      const onGallery=y>-10.85&&y<-9.85&&z>-13.7&&z<-9.7&&Math.abs(x)<10.5;
      if(!onFloor&&!onGallery)return '';
      return dialogue.snapshot.befriended?'Speak with your friend Aurelith':'Speak with Aurelith';
    },
    talk(){return speak(()=>dialogue.talk());},
    reply(choiceId){return speak(()=>dialogue.reply(choiceId));},
    close(){voice=0;return dialogue.close();},
    tick(t,dt,observer){
      const dx=(observer?.x??-2)+2,dz=(observer?.z??-6)-(-2.4),distance=Math.hypot(dx,dz);
      const targetAwareness=distance<17&&observer?.y<-8?1:0;
      awareness+=((targetAwareness-awareness)*(1-Math.exp(-dt*2.4)));
      const desired=T.MathUtils.clamp(Math.atan2(dx,-dz),-.68,.68),gaze=turnHead(desired*.68*awareness,dt);
      const breath=Math.sin(t*.82),weight=Math.sin(t*.41+.7);
      body.scale.y=1.32+breath*.013;body.position.y=.012*breath;body.rotation.z=.009*weight;
      neck.rotation.y=.082*Math.sin(t*.27)+gaze;
      neck.rotation.x=.025*Math.sin(t*.63)-.045*awareness;
      tail.rotation.y=settleTail(.083*Math.sin(t*.34)-gaze*.25,dt);tail.rotation.x=.012*Math.sin(t*.46);
      const wingAngle=settleWings(.018*Math.sin(t*.53)+.055*awareness,dt);
      wings.forEach((g,i)=>{const side=i?1:-1;g.rotation.z=side*wingAngle;g.rotation.x=.012*weight;});
      voice=Math.max(0,voice-dt*.16);jaw.rotation.x=-moveJaw(.035+voice*(.055+.095*Math.max(0,Math.sin(t*7.4))),dt);
      const blink=Math.max(0,1-Math.abs((t+1.7)%5.84-5.48)*7.4);
      for(const lid of eyelids){lid.visible=blink>.015;lid.position.y=1.92-.12*blink;lid.scale.y=.26*blink;}
    },
  };
}
