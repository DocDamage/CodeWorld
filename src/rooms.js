import * as T from 'three';
import { Builder,v,TAU,tint,pick } from './model.js';
import { wood, cupboard, plant, candle, volume, sleepingLoft, fitWorkshop, walnut, oak, honey, brass, iron, linen } from './furnishings.js';

const halfW=4.4,halfD=4.05,loft=2.85,landing=-.95,foot=2.86,stairSide=2.78,steps=17;
const schemes={
  bakery:['#e1c6a1','#a35949','#7a8c77'],mill:['#d3c5ab','#627e80','#8c7e5e'],
  inn:['#e7c496','#9b574c','#567c70'],slate:['#d3c7ac','#4d7680','#758c7b'],
  tower:['#d9c7a4','#48667b','#8a885e'],wind:['#dbcaa5','#869066','#8c6952'],
  potter:['#e4c2a6','#b66f52','#788c89'],herb:['#d5d0ac','#5f8068','#9b7277']
};
function rug(scene,x,y,z,w,d,accent){
  const c=document.createElement('canvas');c.width=256;c.height=384;const g=c.getContext('2d');
  g.fillStyle=accent;g.fillRect(0,0,256,384);
  for(const [i,color,line] of [[4,'#584f40',5],[11,'#d4b77b',3],[18,'#d8c59b',2],[28,'#dfc797',3],[33,'#4c5f59',4]]){
    g.strokeStyle=color;g.lineWidth=line;g.strokeRect(i,i,256-2*i,384-2*i);
  }
  function diamond(x,z,w,h,c){g.fillStyle=c;g.beginPath();g.moveTo(x,z-h);g.lineTo(x+w,z);g.lineTo(x,z+h);g.lineTo(x-w,z);g.fill();}
  for(let i=0;i<3;i++){const yy=87+i*104;diamond(128,yy,60,47,'#d2af77');diamond(128,yy,47,35,'#55695e');diamond(128,yy,29,23,'#dbc69b');diamond(128,yy,16,13,accent);
    for(const s of [-1,1])diamond(128+s*77,yy,9,13,'#d6be8e');}
  g.fillStyle='#fff3c719';for(let j=0;j<384;j+=3)g.fillRect(0,j,256,1);
  const map=new T.CanvasTexture(c);map.colorSpace=T.SRGBColorSpace;map.anisotropy=4;
  const m=new T.Mesh(new T.PlaneGeometry(w,d),new T.MeshStandardMaterial({map,roughness:1}));m.rotation.x=-Math.PI/2;m.position.set(x,y+.011,z);m.receiveShadow=true;scene.add(m);
}
function entryDoor(b){
  b.group(0,0,halfD-.10,Math.PI,()=>{
    b.put('arch',walnut,0,1.17,.025,1.48,2.34,.11);
    b.put('arch','#788979',0,1.11,.10,1.25,2.19,.07);
    for(let j=-2;j<=2;j++)wood(b,j*.20,.72,.145,.012,1.38,.012,walnut);
    for(const y of [.45,1.30])b.put('box',iron,-.32,y,.16,.47,.06,.045);
    b.put('ball',brass,.42,1.01,.19,.106,.11,.11);
  });
}
function framedPrint(b,x,y,z,a,accent) {
  b.group(x,y,z,a,()=>{
    wood(b,0,0,0,.86,1.02,.081,walnut);b.put('box',brass,0,0,.045,.78,.94,.018);
    b.put('box',linen,0,0,.060,.71,.87,.012);
    b.beam('#758465',v(0,-.33,.072),v(.04,.31,.072),.022);
    for(let j=0;j<8;j++){const s=j%2?1:-1;b.put('leaf',j>5?accent:'#859772',s*.094,-.22+j*.068,.08,.18,.105,.025,0,0,s*.54);}
  });
}
function swag(b,x,y,z,a,accent){
  b.group(x,y,z,a,()=>{
    wood(b,0,.78,.13,1.83,.07,.075,walnut);
    for(const sign of [-1,1]){
      for(let j=0;j<5;j++){
        const xx=sign*(.63+j*.043);
        b.put('box',tint(accent,.12),xx,.11,.145+.015*(j%2),.059,1.28-.045*(j%3),.065,0,0,sign*.037);
      }
      b.put('box',brass,sign*.72,-.06,.195,.20,.045,.037);
    }
  });
}
function addWindow(room,b,x,y,z,yaw,side,accent){
  b.group(x,y,z,yaw,()=>{
    wood(b,0,0,0,1.57,1.53,.12,walnut);
    const m=new T.Mesh(new T.PlaneGeometry(1.35,1.30),new T.MeshBasicMaterial({color:0xffffff,toneMapped:false}));
    m.position.z=.075;m.applyMatrix4(b.frame);room.scene.add(m);room.windows.push({mesh:m,side});
    wood(b,0,0,.095,.064,1.36,.055);wood(b,0,0,.095,1.41,.065,.055);wood(b,0,-.78,.05,1.78,.12,.29,honey);
  });
  swag(b,x,y,z,yaw,accent);
}
function ceilingLamp(b,x,top,z,drop){
  const bottom=top-drop;b.put('cyl',iron,x,top-drop*.5,z,.032,drop,.032);
  b.put('cone',brass,x,bottom+.12,z,.68,.28,.68);
  b.put('ball','#ffda98',x,bottom-.05,z,.31,.34,.31,0,0,0,'glow');
  b.put('disk',brass,x,bottom-.22,z,.26,.05,.26);
}
function architecture(room,b,plot){
  const [plaster,accent,paint]=schemes[plot.id],round=plot.id==='wind';
  const w=halfW*2,d=halfD*2,eave=5.18,ridge=6.55;
  // The staggered planks on both levels are actual floorboards.
  function boards(front,back,y){
    const n=Math.ceil((front-back)/.29);
    for(let j=0;j<n;j++){
      const zz=back+(front-back)*(j+.5)/n;
      for(let left=-halfW,k=0;left<halfW-.001;k++){
        const right=Math.min(halfW,left+(k===0?1.2+(j%4)*.54:2.61));
        wood(b,(left+right)/2,y-.065,zz,right-left-.012,.13,(front-back)/n-.008,tint('#b38a62',.12));left=right;
      }
    }
  }
  boards(halfD,-halfD,0);boards(landing,-halfD,loft);
  for(const [x,z,a,len] of [[0,-halfD,0,w],[0,halfD,Math.PI,w],[-halfW,0,Math.PI/2,d],[halfW,0,-Math.PI/2,d]]){
    b.group(x,0,z,a,()=>{
      b.put('box',plaster,0,eave/2,0,len,eave,.15,0,0,0,'plaster');
      for(const y of [.08,.76,loft-.11,eave-.08])wood(b,0,y,.082,len,.13,.13,walnut);
      for(let i=0;i<Math.floor(len/.27);i++)wood(b,(i+.5)*.27-len/2,.4,.084,.257,.66,.08,tint(paint,.08));
      for(const xx of [-len*.47,0,len*.47])wood(b,xx,eave/2,.09,.15,eave,.16,walnut);
    });
  }
  if(round){
    for(const sx of [-1,1])for(const sz of [-1,1])b.group(sx*(halfW-.30),0,sz*(halfD-.30),sx===sz?Math.PI/4:-Math.PI/4,()=>{
      b.put('box','#c0ad8b',0,eave/2,0,.98,eave,.25,0,0,0,'stone');
    });
  }
  for(const s of [-1,1]){
    b.put('gable',plaster,0,eave,s*halfD,w,ridge-eave,.18,0,0,0,'plaster');
    const slope=Math.atan2(ridge-eave,halfW);
    b.put('box','#a6845f',s*halfW/2,(eave+ridge)/2,0,Math.hypot(halfW,ridge-eave)+.20,.18,d+.15,0,0,-s*slope, 'wood');
  }
  for(const z of [-3.77,-1.35,1.12,3.78]){
    for(const s of [-1,1])b.beam(walnut,v(s*halfW,eave-.11,z),v(0,ridge-.14,z),.20,.20);
    wood(b,0,eave-.1,z,w,.18,.18,walnut);
    for(const s of [-1,1])b.beam(oak,v(s*(halfW-.15),eave-.81,z),v(s*(halfW-.94),eave-.10,z),.12);
  }
  wood(b,0,loft-.18,landing,w,.27,.19,walnut);
  for(let x=-4.15;x<stairSide-.13;x+=.44)wood(b,x,loft+.43,landing,.071,.85,.08);
  wood(b,(-halfW+stairSide)/2,loft+.87,landing,halfW+stairSide,.11,.12,honey);
  for(const x of [-3.12,1.88]){wood(b,x,loft/2,landing,.14,loft,.14,walnut);b.beam(oak,v(x,loft-.62,landing),v(x+.46,loft-.14,landing),.12);}
  for(let j=0;j<steps;j++){
    const h=(j+1)*loft/steps,depth=(foot-landing)/steps,z=foot-(j+.5)*depth;
    wood(b,(stairSide+halfW)/2,h-.081,z,halfW-stairSide,.165,depth+.024,honey);
    wood(b,(stairSide+halfW)/2,h-.17,z+depth*.49,halfW-stairSide,.18,.044,oak);
    if(j%3===0)wood(b,stairSide+.04,h+.43,z,.077,.86,.077,walnut);
  }
  for(const x of [stairSide+.04,halfW-.12])b.beam(oak,v(x,.90,foot),v(x,loft+.91,landing),.09,.09);
  b.beam(walnut,v(stairSide+.03,-.03,foot),v(stairSide+.03,loft-.15,landing),.14,.20);
  entryDoor(b);
  addWindow(room,b,-halfW+.13,1.84,2.46,Math.PI/2,'left',accent);
  addWindow(room,b,halfW-.13,3.60,.10,-Math.PI/2,'right',accent);
  addWindow(room,b,-.95,loft+1.44,-halfD+.13,0,'rear',accent);
  framedPrint(b,-halfW+.15,1.78,-2.48,Math.PI/2,accent);
  framedPrint(b,halfW-.15,1.84,2.75,-Math.PI/2,accent);
  b.group(0,loft,0,0,()=>sleepingLoft(b,plot,accent));
  room.block(-2.66,-2.50,1.32,2.12,loft);room.block(-1.55,-3.32,.72,.51,loft);
  if(plot.id==='inn')room.block(.12,-2.58,1.32,2.12,loft);
  else room.block(plot.id==='tower'?.61:.24,-3.43,plot.id==='tower'?1.65:1.25,.67,loft);
  room.block(2.05,-3.43,.94,.64,loft);
  for(const x of [-3.12,1.88])room.block(x,landing,.14,.14);
  fitWorkshop(b,plot.id,room.block);
  // A small writing nook and pegs beside the door make the front half usable too.
  b.group(-2.72,0,halfD-.45,Math.PI,()=>{cupboard(b,0,0,1.72,.63,.73,paint);plant(b,-.53,.80,0,.50,true);volume(b,.21,.80,0,.18);candle(b,.60,.80,-.07);});
  room.block(-2.72,halfD-.45,1.77,.66);
  b.group(1.40,0,halfD-.15,Math.PI,()=>{wood(b,0,1.71,0,1.17,.14,.11,honey);
    for(let j=-1;j<=1;j++)b.put('ball',brass,j*.39,1.71,.11,.093,.09,.15);
    b.put('box',accent,-.38,1.19,.13,.31,.92,.11,0,0,-.06);});
  ceilingLamp(b,-.52,5.02,1.73,1.80);ceilingLamp(b,1.16,loft-.15,-2.04,.38);
  rug(room.scene,.62,0,.72,2.02,3.72,accent);rug(room.scene,.24,loft,-2.03,1.87,1.10,paint);
  return room;
}

export function makeRoom(plot){
  const scene=new T.Scene();scene.background=new T.Color('#625444');
  const obstacles=[],windows=[];
  const block=(x,z,w,d,y=0)=>obstacles.push({x,z,w,d,y});
  const motion=[];scene.userData.motion=motion;
  const room={scene,windows,block,plot,animate:(time,hour)=>{for(const update of motion)update(time,hour);}};
  const b=new Builder(scene);architecture(room,b,plot);b.finish();
  const ambient=new T.HemisphereLight('#f7f4ea','#ad9984',1.47);
  const glow=new T.PointLight('#ffdaa6',16,15,2);glow.position.set(-.52,3.20,1.73);
  const under=new T.PointLight('#ffe4ba',9,11,2);under.position.set(.60,1.98,-2.24);
  const sun=new T.SpotLight('#fff0cb',65,20,1.13,.7,1.4);
  sun.position.set(-3.95,3.12,2.27);sun.target.position.set(.3,0,-.85);
  sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);sun.shadow.bias=-.0006;sun.shadow.normalBias=.012;sun.shadow.camera.near=.15;
  scene.add(ambient,glow,under,sun,sun.target);
  room.light=night=>{ambient.intensity=1.47-night*.59;glow.intensity=16+night*4;sun.intensity=39-night*34;under.intensity=9+night*3;};
  room.nextFloor=(x,z,previous)=>{
    if(Math.abs(x)>halfW-.28||Math.abs(z)>halfD-.29)return null;
    if(plot.id==='wind'&&halfW-Math.abs(x)+halfD-Math.abs(z)<1.04)return null;
    let floor=0;
    if(z<=landing)floor=previous>loft-.34?loft:0;
    else if(z<foot&&x>stairSide+.15)floor=loft*(foot-z)/(foot-landing);
    else if(z<foot&&x>stairSide-.15)return null;
    if(Math.abs(floor-previous)>.27)return null;
    if(obstacles.some(o=>Math.abs(o.y-floor)<.68&&Math.abs(x-o.x)<o.w/2+.19&&Math.abs(z-o.z)<o.d/2+.19))return null;
    return floor;
  };
  return room;
}

// Render exterior views from the corresponding facades. The three small targets
// are shared by whichever interior is occupied, including when time changes.
export function makeWindowViews(renderer,exterior,sky){
  const sides={left:[-1,0,Math.PI/2],right:[1,0,-Math.PI/2],rear:[0,-1,0]};
  const targets=new Map(),cam=new T.PerspectiveCamera(64,1.04,.08,295);
  return room=>{
    const p=room.plot,oldTarget=renderer.getRenderTarget(),skyPosition=sky.position.clone();
    try{
      for(const {side,mesh} of room.windows){
        if(!targets.has(side))targets.set(side,new T.WebGLRenderTarget(256,248));
        const target=targets.get(side),[sx,sz,turn]=sides[side];
        const lx=sx*(p.w/2+.42),lz=sz*(p.d/2+.46);
        cam.position.set(p.x+lx*Math.cos(p.a)+lz*Math.sin(p.a),p.y+(side==='left'?1.62:p.h*.78),p.z-lx*Math.sin(p.a)+lz*Math.cos(p.a));
        cam.rotation.set(-.07,p.a+turn,0,'YXZ');sky.position.copy(cam.position);
        renderer.setRenderTarget(target);renderer.render(exterior,cam);
        if(mesh.material.map!==target.texture){mesh.material.map=target.texture;mesh.material.needsUpdate=true;}
      }
    }finally{renderer.setRenderTarget(oldTarget);sky.position.copy(skyPosition);}
  };
}
