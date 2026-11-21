import * as T from 'three';
import {Builder,registerSharedMaterial,v,TAU,tint} from './model.js';
import {animalPlan,farmClear,farmHeight} from './farm-layout.js';
import {BIRD_GAIT,HEAVY_GAIT,createGaitState} from './animal-gait.js';
import {geometryFootprintRadius,nearestOpenPoint} from './animal-collision.js';

const coats={
  piebald:{base:[224,217,194],dark:[65,59,49],spots:[[.10,.36,.16,.26],[.46,.24,.18,.22],[.70,.72,.22,.27],[.88,.35,.13,.29]]},
  dun:{base:[163,128,96],dark:[106,75,56],spots:[[.24,.68,.31,.42],[.80,.33,.22,.34]]},
  pigskin:{base:[188,146,128],dark:[131,99,82],spots:[[.21,.29,.25,.31],[.66,.76,.26,.22]]},
  plumage:{base:[225,211,189],dark:[174,157,129],spots:[]}
};

function skinTextures({base,dark,spots},feathers){
  const width=128,height=80,color=new Uint8Array(width*height*4),relief=new Uint8Array(color.length);
  let seed=5601;
  for(let y=0;y<height;y++)for(let x=0;x<width;x++){
    seed=(Math.imul(seed,1664525)+1013904223)>>>0;
    const u=x/width,w=y/height,grain=(seed>>>24)/255-.5;
    const variation=Math.sin(x*.91+y*.51)*.51+Math.cos(x*2.1+y*.18)*.38+grain*.66;
    const feather=feathers?Math.cos((u+Math.sin(w*48)*.019)*121)*Math.cos(w*95):0;
    let shade=0;
    for(const [sx,sy,rx,ry] of spots){
      const dx=Math.min(Math.abs(u-sx),1-Math.abs(u-sx));
      const d=Math.hypot(dx/rx,(w-sy)/ry)+Math.sin(u*71+w*20)*.12+Math.cos(w*42-u*31)*.17;
      shade=Math.max(shade,1-T.MathUtils.smoothstep(d,.87,1.21));
    }
    const i=(y*width+x)*4,n=Math.round(126+variation*28+feather*25);
    for(let c=0;c<3;c++)color[i+c]=Math.round(T.MathUtils.lerp(base[c],dark[c],shade)+variation*12+feather*14);
    color[i+3]=255;relief.set([n,n,n,255],i);
  }
  function texture(data,colorSpace){
    const tex=new T.DataTexture(data,width,height,T.RGBAFormat);
    if(colorSpace)tex.colorSpace=colorSpace;
    tex.wrapS=T.RepeatWrapping;tex.minFilter=T.LinearMipmapLinearFilter;tex.magFilter=T.LinearFilter;tex.generateMipmaps=true;tex.needsUpdate=true;
    return tex;
  }
  return {map:texture(color,T.SRGBColorSpace),bumpMap:texture(relief)};
}

for(const [name,colors] of Object.entries(coats)){
  registerSharedMaterial(name,new T.MeshStandardMaterial({...skinTextures(colors,name==='plumage'),roughness:name==='pigskin'?.82:.94,
    bumpScale:name==='plumage'?.026:.015}));
}

const legGeometry=new T.LatheGeometry([new T.Vector2(.34,-.5),new T.Vector2(.47,-.46),new T.Vector2(.39,-.32),new T.Vector2(.29,-.26),
  new T.Vector2(.30,-.13),new T.Vector2(.40,.11),new T.Vector2(.48,.33),new T.Vector2(.46,.5)],9);
const wingGeometry=new T.SphereGeometry(.5,13,7);
const colors=new Map();
function material(color){
  if(!colors.has(color))colors.set(color,new T.MeshStandardMaterial({color,roughness:.88}));
  return colors.get(color);
}
function limb(color,sx,sy,sz,x,y,z,wing=false){
  const pivot=new T.Group(),mesh=new T.Mesh(wing?wingGeometry:legGeometry,material(color));
  mesh.scale.set(sx,sy,sz);mesh.position.y=-sy*.48;mesh.castShadow=true;mesh.receiveShadow=true;pivot.position.set(x,y,z);pivot.add(mesh);return pivot;
}

function toe(root,color,from,to,radius){
  const delta=to.clone().sub(from),mesh=new T.Mesh(new T.CylinderGeometry(radius,radius*.72,delta.length(),7),material(color));
  mesh.position.copy(from).add(to).multiplyScalar(.5);mesh.quaternion.setFromUnitVectors(v(0,1,0),delta.clone().normalize());
  mesh.castShadow=mesh.receiveShadow=true;root.add(mesh);return mesh;
}

function articulatedLeg(color,sx,sy,sz,x,y,z,hoofColor=color,footType='cloven'){
  const upper=new T.Group(),upperMesh=new T.Mesh(legGeometry,material(color));
  upper.position.set(x,y,z);upperMesh.scale.set(sx,sy*.55,sz);upperMesh.position.y=-sy*.265;
  upperMesh.castShadow=upperMesh.receiveShadow=true;upper.add(upperMesh);
  const lower=new T.Group(),lowerMesh=new T.Mesh(legGeometry,material(color));lower.position.y=-sy*.51;
  lowerMesh.scale.set(sx*.78,sy*.50,sz*.82);lowerMesh.position.y=-sy*.245;lowerMesh.castShadow=lowerMesh.receiveShadow=true;
  lower.add(lowerMesh);upper.add(lower);
  const foot=new T.Group();foot.position.y=-sy*.48;
  if(footType==='bird'){
    const origin=v(0,-.018,0),toeLength=sy*.30;
    for(const spread of [-1,0,1])toe(foot,hoofColor,origin,v(toeLength,-.025,spread*sz*.92),sx*.16);
    toe(foot,hoofColor,origin,v(-toeLength*.58,-.021,0),sx*.14);foot.userData.toes=4;
  }else{
    for(const side of [-1,1]){
      const hoof=new T.Mesh(wingGeometry,material(hoofColor));hoof.scale.set(sx*.82,Math.max(.035,sy*.07),sz*.50);
      hoof.position.set(sy*.065,-.018,side*sz*.32);hoof.rotation.y=-side*.08;hoof.castShadow=hoof.receiveShadow=true;foot.add(hoof);
    }
    foot.userData.cloven=true;foot.userData.toes=2;
  }
  lower.add(foot);
  return {upper,lower,foot,x:x+sy*.055,z,side:z<0?'left':'right',contactOffset:new T.Vector3(sy*.055,-.018,0)};
}

function tail(root,points,radius,color,base){
  const joint=new T.Group();joint.position.copy(base);root.add(joint);
  const line=new T.CatmullRomCurve3(points),mesh=new T.Mesh(new T.TubeGeometry(line,15,radius,7),material(color));
  mesh.castShadow=true;joint.add(mesh);return joint;
}

function headOf(root,movement,x,y,z){
  const group=new T.Group();group.position.set(x,y,z);root.add(group);movement.head=group;
  return new Builder(group);
}

function cow(root,b,motion,index){
  const coat=index%4===0?'dun':'piebald',hide='#ffffff';
  b.put('ball',hide,-.08,1.23,0,1.82,1.26,1.04,0,0,.095,coat);
  b.put('ball',hide,-.74,1.18,0,.77,1.05,.91,0,0,-.11,coat);
  b.put('ball',hide,.65,1.26,0,.79,1.12,.79,0,0,-.25,coat);
  b.put('ball',hide,.89,1.42,0,.69,.85,.56,0,0,.39,coat);
  b.put('ball',hide,.70,1.18,0,.72,1.05,.79,0,0,-.17,coat);
  b.put('leaf','#d8c8b5',.79,.92,0,.34,.63,.42,0,0,-.18,coat);
  b.put('ball','#ae8d7e',-.33,.68,0,.48,.32,.44,0,0,.13);
  for(const x of [-.47,-.23])for(const z of [-.145,.145])b.put('cyl','#947367',x,.501,z,.037,.137,.044,.06,z,.11);
  for(const x of [-.72,.61])for(const z of [-.33,.33]){
    const leg=articulatedLeg('#51483d',x<0?.225:.183,.83,.171,x,.838,z,'#302d29');root.add(leg.upper);motion.limbs.push(leg);
  }
  const h=headOf(root,motion,1.0,1.46,0);
  h.put('ball',hide,.28,-.012,0,.62,.62,.55,0,0,-.34,coat);
  h.put('ball','#b7a99b',.52,-.159,0,.45,.36,.51,0,0,-.18,'pigskin');
  h.put('ball','#716359',.59,-.114,0,.33,.22,.42,0,0,-.13);
  h.put('ball','#8e7b6b',.42,-.274,0,.40,.17,.41,0,0,.052);
  for(const s of [-1,1]){
    h.put('ball','#bbb09b',.068,.18,s*.32,.43,.13,.30,0,s*.34,s*.15,coat);
    h.put('ball','#8b6d63',.114,.167,s*.39,.24,.069,.17,0,s*.27);
    h.put('cone','#c7b999',.106,.346,s*.26,.11,.31,.13,.40*s,0,.46);
    h.put('ball','#302a24',.330,.066,s*.24,.079,.056,.038,0,s*.29);
    h.put('ball','#9b836c',.350,.072,s*.260,.021,.022,.013);
    h.put('ball','#3a312a',.713,-.109,s*.123,.028,.073,.078,0,.27*s);
  }
  h.finish();
  const joint=tail(root,[v(0,0,0),v(-.14,-.22,.014),v(-.095,-.54,.09),v(-.22,-.73,.15)],.024,'#8c7861',v(-1.04,1.45,0));
  const tuft=new T.Mesh(wingGeometry,material('#3f392f'));tuft.position.set(-.22,-.75,.15);tuft.scale.set(.11,.26,.086);joint.add(tuft);motion.tail=joint;
}

function pig(root,b,motion,index){
  const hide=index%2?'#f0d5c7':'#d2a695';
  b.put('ball',hide,-.11,.682,0,1.43,.891,.846,0,0,.02,'pigskin');
  b.put('ball',hide,.43,.716,0,.73,.76,.666,0,0,-.23,'pigskin');
  b.put('ball',hide,.61,.624,0,.52,.62,.62,0,0,-.20,'pigskin');
  for(const x of [-.48,.47])for(const z of [-.26,.26]){
    const leg=articulatedLeg('#826a59',.135,.47,.142,x,.48,z,'#5a4b42');root.add(leg.upper);motion.limbs.push(leg);
  }
  const h=headOf(root,motion,.59,.73,0);
  h.put('ball',hide,.14,.012,0,.65,.55,.58,0,0,-.22,'pigskin');
  h.put('ball','#d9baa9',.381,-.111,0,.48,.32,.39,0,0,-.22,'pigskin');
  h.put('ball','#9f796c',.593,-.124,0,.16,.239,.32,0,.03,-.11);
  for(const s of [-1,1]){
    h.put('leaf','#9f776a',.027,.246,s*.213,.19,.31,.081,.13*s,.19*s,.44);
    h.put('leaf','#bd9185',.042,.266,s*.24,.136,.225,.041,.13*s,.19*s,.43);
    h.put('ball','#3b2f29',.248,.039,s*.264,.055,.045,.026,0,.22*s);
    h.put('ball','#564239',.664,-.103,s*.072,.035,.066,.051,0,.23*s,.09);
  }
  h.finish();
  const path=[];
  for(let i=0;i<=13;i++){
    const a=i/13*TAU*1.18,r=.082-i*.002;path.push(v(-i*.013,Math.sin(a)*r+i*.004,Math.cos(a)*r-.084));
  }
  motion.tail=tail(root,path,.016,'#9b7569',v(-.78,.86,.03));
}

function hen(root,b,motion,index){
  const plumage=['#a27750','#ded6c2','#6f665a'][index%3],shade=['#694a32','#938677','#4a443c'][index%3];
  b.put('ball',plumage,-.046,.465,0,.70,.55,.490,0,0,-.14,'plumage');
  b.put('ball',plumage,.205,.508,0,.43,.54,.41,0,0,.28,'plumage');
  for(let i=0;i<7;i++){
    b.put('leaf',shade,-.365-i*.011,.67+(i%4)*.047,(i-3)*.048,.32,.087,.080,.19,i*.07,.83+i*.06,'plumage');
  }
  for(const s of [-1,1]){
    for(let row=0;row<3;row++)for(let i=0;i<5;i++){
      const c=tint(plumage,.17);b.put('leaf',c,-.22+i*.087,.438+row*.078,s*(.223+row*.013),.218,.081,.059,0,s*.13,.09+row*.08,'plumage');
    }
    const wing=limb(shade,.35,.23,.092,-.04,.61,s*.211,true);wing.rotation.z=-.19;root.add(wing);(motion.wings??=[]).push(wing);
    b.put('ball',plumage,.01,.385,s*.19,.22,.25,.20,0,0,-.16,'plumage');
    const leg=articulatedLeg('#937745',.043,.30,.058,.065,.32,s*.113,'#6f5a35','bird');root.add(leg.upper);motion.limbs.push(leg);
  }
  const h=headOf(root,motion,.287,.694,0);
  h.put('ball',plumage,.093,.038,0,.304,.303,.232,0,0,-.11,'plumage');
  h.put('cone','#a78a51',.273,.014,0,.137,.174,.139,0,0,-Math.PI/2);
  for(let i=0;i<4;i++)h.put('ball','#904c40',.049+i*.047,.174+Math.sin(i*1.4)*.025,0,.069,.131,.04,0,0,-.27);
  for(const s of [-1,1]){
    h.put('ball','#985747',.210,-.067,s*.048,.083,.128,.05,0,0,-.13);
    h.put('ball','#9b7957',.163,.062,s*.106,.052,.054,.025,0,.51*s);
    h.put('ball','#2f2821',.167,.061,s*.125,.021,.031,.017);
  }
  h.finish();
}

function animal(root,kind,x,z,index,area,allowSolid=false,clear=farmClear){
  const group=new T.Group();group.position.set(x,farmHeight(x,z),z);root.add(group);
  group.userData.farmAnimal=kind;
  const legCount=kind==='chicken'?2:4;
  const motion={baseX:x,baseZ:z,phase:index*1.731+(kind==='cow'?0:kind==='pig'?7:13),area,limbs:[],
    gait:createGaitState(legCount,index*.73),gaitProfile:kind==='chicken'?BIRD_GAIT:HEAVY_GAIT,
    strideScale:kind==='cow'?1.25:kind==='pig'?.8:.4,collisionRadius:0,moveX:1,moveZ:0,contact:new T.Vector3()};
  group.userData.motion=motion;
  const b=new Builder(group);
  ({cow,pig,chicken:hen})[kind](group,b,motion,index);b.finish();
  motion.collisionRadius=geometryFootprintRadius(group);
  if(!allowSolid){
    const open=nearestOpenPoint(clear,x,z,motion.collisionRadius,area,9);
    if(open){x=open.x;z=open.z;group.position.set(x,farmHeight(x,z),z);motion.baseX=x;motion.baseZ=z;}
  }
  return group;
}

export function livestock(root,clear=farmClear){
  const animals=[];
  for(const plan of animalPlan)for(let i=0;i<plan.count;i++){
    const cols=Math.ceil(Math.sqrt(plan.count)),row=i/cols|0,col=i%cols;
    const x=plan.minX+2+col*(plan.maxX-plan.minX-4)/Math.max(1,cols-1);
    const z=plan.minZ+2+row*(plan.maxZ-plan.minZ-4)/Math.max(1,Math.ceil(plan.count/cols)-1);
    animals.push(animal(root,plan.kind,x,z,i,plan,false,clear));
  }
  const milkingArea={minX:-89.1,maxX:-82.9,minZ:26.2,maxZ:32.2};
  for(const [index,x,z] of [[18,-88.72,27.7],[19,-83.27,30.5]]){
    const cow=animal(root,'cow',x,z,index,milkingArea,true);cow.rotation.y=index===18?0:Math.PI;
    cow.userData.motion.inStall=true;animals.push(cow);
  }
  return animals;
}
