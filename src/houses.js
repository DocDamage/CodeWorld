import * as T from 'three';
import { Builder,v,TAU,tint,range,random,pick,label,proceduralSeed } from './model.js';
import { plots,height,doorOffset } from './land.js';

const timber='#544439',oak='#805a3c',trim='#655040',cream='#e7d4aa',iron='#383f39';
import { mountSmoke } from './smoke.js';
import { thatchedRoof } from './thatch.js';
import { visualBindings,worldObjects } from './world-objects.js';
export const moving=[],lamps=[],clockHands=[];
function fieldstoneFooting(b,w,d){
  for(const side of [-1,1])for(let i=0;i<Math.ceil(w/.42);i++){
    const x=-w/2+(i+.5)*w/Math.ceil(w/.42),s=range(.32,.48),y=range(.05,.18);
    b.put('stone',tint(pick(['#8f8878','#a49a84','#77766d']),.10),x,y,side*(d/2+.07),s,range(.22,.35),range(.16,.25),range(-.13,.13),range(0,TAU),0,'stone');
  }
  for(const side of [-1,1])for(let i=0;i<Math.ceil(d/.45);i++){
    const z=-d/2+(i+.5)*d/Math.ceil(d/.45),s=range(.33,.49),y=range(.04,.17);
    b.put('stone',tint(pick(['#8f8878','#a49a84','#77766d']),.10),side*(w/2+.07),y,z,range(.16,.25),range(.22,.35),s,range(-.13,.13),range(0,TAU),0,'stone');
  }
}
function rainGoods(b,w,d,h){
  for(const side of [-1,1]){
    b.put('cyl','#464844',0,h+.035,side*(d/2+.285),.075,w+.55,.075,0,0,Math.PI/2,'iron');
    const x=side*w*.38;
    b.put('cyl','#414541',x,h*.48,side*(d/2+.32),.054,h-.02,.054,0,0,0,'iron');
    b.put('cyl','#414541',x,.10,side*(d/2+.22),.055,.28,.055,side*.72,0,0,'iron');
  }
}
function shingles(b,width,depth,eave,rise,color) {
  const run=depth/2+.30,length=width+.63;

  const rows=Math.ceil(run/.40),count=Math.ceil(length/.4),row=run/rows,tile=length/count;
  for(const side of [-1,1]) b.group(0,eave,0,-side*Math.PI/2,()=>{
    b.put('box',trim,run*.5,rise*.5-.065,0,Math.hypot(run,rise),.12,length,0,0,-Math.atan2(rise,run),'agedWood');
    const elevation=x=>rise*(1-x/run)+.15*Math.sin(Math.PI*x/run);
    for(let i=0;i<rows;i++) {
      const x=(i+.55)*row,y=elevation(x),slope=-rise/run+.15*Math.PI/run*Math.cos(Math.PI*x/run),angle=Math.atan(slope);
      // Alternating half tiles keep the joints staggered all the way to the verge.
      for(let j=0;j<count+(i%2);j++) {
        const start=Math.max(0,(j-(i%2)*.5)*tile),end=Math.min(length,(j+1-(i%2)*.5)*tile);
        b.put('tile',tint(color,.24),x+.022,y+.041+range(0,.014),(start+end-length)/2,row*Math.hypot(1,slope)*1.12,.095,end-start-.008,0,0,angle);
      }
    }
    for(const end of [-1,1]) b.beam(trim,v(0,rise+.012,end*length/2),v(run,0,end*length/2),.12,.14,'box','agedWood');
  });
  for(let i=0;i<count;i++)b.put('cyl',tint(color,.15),(i+.5-count/2)*tile,eave+rise+.07,0,.24,tile*.99,.24,0,0,Math.PI/2,'roofTile');
}
function flowerBox(b,x,y,z,width) {
  b.put('box',oak,x,y-.07,z+.11,width+.16,.20,.32);
  for(let j=0;j<9;j++){
    const xx=x+range(-.46,.46)*width,zz=z+range(.06,.26);
    b.put('leaf',pick(['#59753e','#69884a','#3f6343']),xx,y+.07,zz,.21,.19,.2,0,0,0,'plant');
    b.put('ball',pick(['#d67e86','#f1d496','#ba5a71','#ede3cc']),xx,y+range(.14,.23),zz,.085,.08,.09);
  }
}
function windowBox(b,x,y,z,w=.74,h=.94,shutters=true,flowers=false) {
  b.put('box',timber,x,y,z+.035,w+.16,h+.17,.13,0,0,0,'agedWood');
  b.put('box','#faf9ed',x,y,z+.105,w,h,.043,0,0,0,'glass');
  b.put('box',trim,x,y,z+.15,.055,h,.06,0,0,0,'agedWood');b.put('box',trim,x,y,z+.15,w,.055,.06,0,0,0,'agedWood');
  b.put('box','#937452',x,y-h*.5-.08,z+.08,w+.28,.10,.23,0,0,0,'stone');
  if(shutters)for(const s of [-1,1]){
    const xx=x+s*(w*.67+.09);
    b.put('box','#587263',xx,y,z+.048,w*.30,h+.07,.09,0,0,0,'agedWood');
    for(let k=0;k<5;k++)b.put('box',tint('#76816a'),xx,y+(k-2)*h*.18,z+.103,w*.30,.046,.055,0,0,0,'agedWood');
    for(const yy of [-h*.34,h*.34])b.put('ball','#343a37',xx,y+yy,z+.142,.025,.025,.016,0,0,0,'iron');
  }
  if(flowers)flowerBox(b,x,y-h*.5-.1,z+.12,w);
}
function chimney(b,w,d,h,forge=false) {
  const x=-w*.31,z=-d*.18,y=h+.55;
  b.put('box','#806f61',x,y+1.05,z,.53,2.1,.56,0,0,0,'masonry');
  for(let i=0;i<9;i++)for(let j=0;j<2;j++)b.put('box',tint('#8e7461',.15),x+(j-.5)*.26,y+i*.225,z+.286,.244,.192,.024,0,0,0,'clay');
  b.put('box',trim,x,y+2.12,z,.68,.17,.69,0,0,0,'stone');
  b.put('box','#54514a',x,y+.05,z,.76,.075,.79,0,0,0,'iron');
  mountSmoke(b.root,v(x,y+2.27,z).applyMatrix4(b.frame),forge?'forgeStack':'chimney');
}
function dormer(b,h,d,w,color) {
  b.group(0,h+.55,d*.31,Math.PI/2,()=>{
    b.put('box',cream,0,.30,0,1.15,.72,1.27);
    b.put('gable',cream,0,.65,0,1.36,.70,1.13,0,Math.PI/2);
    shingles(b,1.12,1.18,.7,.69,color);
    b.group(-.59,.32,0,-Math.PI/2,()=>windowBox(b,0,0,0,.52,.57,false));
  });
}
function cottage(b,p,root) {
  const {w,d,h,wall,roof,id}=p,front=d/2;
  b.put('box','#9d9580',0,-.97,0,w+.12,2.34,d+.12,0,0,0,'stone');
  fieldstoneFooting(b,w,d);
  b.put('box',wall,0,h/2,0,w,h,d,0,0,0,'plaster');
  const thatched=['potter','herb','inn'].includes(id),rise=thatched?2.55:1.92;
  b.put('gable',wall,0,h-.02,0,d,rise,w,0,Math.PI/2,0,'plaster');
  for(const side of [-1,1]){
    b.group(0,0,side*front,side===1?0:Math.PI,()=>{
      for(const x of [-w/2+.04,0,w/2-.04])b.put('box',timber,x,h/2,0,.12,h+.05,.17,0,0,0,'agedWood');
      for(const y of [.16,h*.49,h-.12])b.put('box',timber,0,y,0,w+.12,.14,.17,0,0,0,'agedWood');
      for(const x of [-w*.25,w*.25])windowBox(b,x,h*.74,.018,.71,.95,true,side===1);
      for(let k=0;k<7;k++)b.put('box',trim,(k/6-.5)*w,h-.04,.19,.115,.18,.50,.18);
    });
    b.group(side*w/2,0,0,side*Math.PI/2,()=>{
      b.put('box',timber,0,h*.49,.025,d,.14,.13,0,0,0,'agedWood');
      for(const z of [-d*.46,d*.46])b.put('box',timber,z,h*.5,0,.13,h,.13,0,0,0,'agedWood');
      b.beam(timber,v(-d*.47,.25,.052),v(-d*.17,h*.46,.052),.12,.12,'box','agedWood');
      b.beam(timber,v(d*.47,h*.51,.052),v(d*.15,h*.96,.052),.12,.12,'box','agedWood');
      windowBox(b,0,h*.7,.055,.69,.91,false);
      windowBox(b,0,h+ .46,.04,.54,.57,false);
      b.put('box',timber,0,h-.02,.04,d,.13,.14,0,0,0,'agedWood');
      for(const s of [-1,1])b.beam(trim,v(s*d*.38,h+.05,.052),v(s*.27,h+1.41,.052),.095,.115,'box','agedWood');
    });
  }
  // Narrow flecks of lime plaster reveal the fieldstone at the foot of the walls.
  for(let j=0;j<18;j++){
    const x=range(-w*.47,w*.47),y=.22+Math.pow(random(),2)*h*.83;
    b.put('stone',tint('#8f8775'),x,y,front+.015,range(.08,.22),range(.035,.075),.025,0,0,range(-.3,.3),'stone');
  }
  const doorX=doorOffset(p);
  b.put('arch',timber,doorX,1.02,front+.1,1.01,1.97,.16);
  b.put('arch',id==='bakery'?'#647e6d':'#97764e',doorX,1.01,front+.195,.82,1.76,.071);
  windowBox(b,doorX,1.41,front+.24,.39,.35,false);
  for(let k=0;k<5;k++)b.put('box',id==='bakery'?'#506e5e':'#806748',doorX+(k-2)*.15,.65,front+.237,.012,.91,.009);
  b.put('ball','#c9aa67',doorX+.27,.8,front+.28,.095,.095,.085);
  for(const yy of [.56,1.10,1.49])b.put('box','#353a37',doorX-.28,yy,front+.282,.42,.042,.025,0,0,0,'iron');
  for(const yy of [.56,1.10,1.49])b.put('ball','#242825',doorX-.47,yy,front+.305,.045,.045,.025,0,0,0,'iron');
  b.put('box','#8f8a7d',doorX,.085,front+.43,1.30,.17,.75,0,0,0,'stone');
  windowBox(b,-doorX,1.19,front+.02,.85,.86,true);
  if(thatched)thatchedRoof(b,w,d,h,rise);
  else {shingles(b,w,d,h,rise,roof);rainGoods(b,w,d,h);}
  if(id==='bakery'||id==='inn')dormer(b,h+(thatched?.46:0),d,w,roof);
  chimney(b,w,d,h,id==='mill');
  if(id==='bakery'){
    for(let i=0;i<11;i++){
      const xx=(i-5)*w/11,c=tint(i%2?'#975d50':'#c8b79b',.10),sag=.018*Math.sin(i*1.31);
      b.put('box',c,xx,2.203+sag,front+.52,w/11+.003,.065,1.2,.23);
      b.put('arch',c,xx,1.98+sag,front+1.106,w/11,.228,.061,0,0,Math.PI);
      b.put('box','#8f7861',xx-w/22,2.238+sag,front+.516,.014,.013,1.17,.23);
    }
    for(const x of [-w*.46,w*.46])b.put('cyl',oak,x,1.01,front+1.04,.085,2.02,.085);
    b.put('box',oak,w*.22,.67,front+.71,1.56,.19,.7);
    for(let i=0;i<7;i++){
      const x=w*.22+range(-.64,.64),z=front+range(.43,.93);
      b.put('ball',tint('#c88944'),x,.83,z,.25,.15,.39,0,range(-.6,.6));
      b.put('box','#f3cf8d',x,.903,z,.13,.011,.025,0,.45);
    }
    b.put('box','#634c39',0,2.51,front+.14,1.73,.35,.12);label(root,b,'BAKERY','#f9e4b5',0,2.51,front+.21,1.57,.31);
    cat(b,-w*.45,.12,front+1.49);
  } else if(id==='inn'){
    b.put('box',oak,0,h*.52,front+.30,w*.94,.14,.77,0,0,0,'wood');
    b.put('box',oak,0,h*.52+.58,front+.64,w*.94,.105,.11,0,0,0,'wood');
    for(let i=0;i<=16;i++)b.put('box',trim,(i/16-.5)*w*.91,h*.52+.30,front+.64,.058,.54,.065);
    for(const s of [-1,1])b.beam(trim,v(s*w*.38,h*.52-.57,front+.08),v(s*w*.38,h*.52-.03,front+.69),.12);
    b.put('box',timber,w*.5+.24,2.8,front,.62,.09,.1);
    b.put('box','#506b5e',w*.5+.49,2.43,front,.53,.51,.12);
    label(root,b,'INN','#fce2a4',w*.5+.49,2.43,front+.07,.44,.20);
  } else if(id!=='tower'){
    const sign={mill:'BROOK ARMORY',slate:'THE BINDERY',herb:'ROSEMARY HOUSE',potter:'POTTER'}[id];
    b.put('box',iron,doorX,2.24,front+.11,2.05,.44,.14);
    b.put('box',timber,doorX,2.24,front+.19,1.92,.33,.05,0,0,0,'wood');
    for(const x of [-.88,.88])b.put('ball','#a48260',doorX+x,2.24,front+.225,.07,.07,.045);
    label(root,b,sign,'#e3c99f',doorX,2.24,front+.224,1.78,.29);
  }
  barrel(b,w*.52,0,front+.38);if(id!=='tower')barrel(b,w*.51+.47,-.04,front+.15,.73);
  // Climbing vines are concentrated near the downwind corner.
  for(let j=0;j<48;j++){const y=range(.4,h),x=w*.45+.13*Math.sin(y*3)+range(-.22,.11);
    b.put('leaf',pick(['#5d7947','#87954c','#607243']),x,y,front+.13,range(.13,.31),range(.13,.29),.11,0,0,range(-.8,.8),'plant');
  }
}
function barrel(b,x,y,z,s=1){
  b.put('barrel',tint('#967450'),x,y+.35*s,z,.56*s,.7*s,.56*s,0,0,0,'agedWood');
  for(const yy of [.15,.52])b.put('cyl',iron,x,y+yy*s,z,.55*s,.048*s,.55*s,0,0,0,'iron');
  b.put('disk',oak,x,y+.70*s,z,.43*s,.026*s,.43*s,0,0,0,'agedWood');
}
function cat(b,x,y,z){
  b.group(x,y,z,-.38,()=>{
    const fur='#272a2b';
    b.put('ball',fur,0,.235,-.05,.31,.40,.34,-.18);
    for(const s of [-1,1]){
      b.put('ball',fur,s*.105,.15,-.06,.18,.23,.25);
      b.put('ball','#303334',s*.068,.14,.087,.073,.24,.075);
      b.put('ball','#353637',s*.07,.051,.112,.094,.069,.11);
    }
    b.put('ball',fur,0,.45,.056,.32,.275,.265);
    for(const s of [-1,1]){
      b.put('cone',fur,s*.103,.585,.035,.136,.16,.11,0,0,-s*.15);
      b.put('cone','#806568',s*.103,.589,.071,.065,.094,.032,0,0,-s*.15);
      b.put('ball','#c7ba76',s*.073,.468,.172,.048,.029,.018);
      b.put('box','#242628',s*.073,.468,.183,.009,.023,.008);
      for(const dy of [-.014,.012])b.beam('#a7a295',v(s*.054,.417+dy,.181),v(s*.183,.421+dy*1.6,.199),.005,.005);
    }
    b.put('ball','#997a78',0,.422,.192,.039,.027,.028);
    const tail=new T.CatmullRomCurve3([v(.03,.102,-.151),v(.15,.07,-.21),v(.24,.055,-.134),v(.248,.073,-.018),v(.203,.102,.027)]);
    const pts=tail.getPoints(8);
    for(let j=1;j<pts.length;j++){const d=.071-j*.003;b.beam(fur,pts[j-1],pts[j],d,d,'cyl');b.put('ball',fur,...pts[j].toArray(),d,d,d);}

  });
}
function towerStone(b,r,h,taper=0) {
  for(let j=0;j<Math.floor(h*17);j++){const a=range(0,TAU),y=range(.16,h-.16);
    const radius=r-taper*y/h;
    b.put('stone',tint(pick(['#938a76','#a49a83','#7f7d72'])),Math.sin(a)*(radius-.012),y,Math.cos(a)*(radius-.012),range(.15,.34),range(.08,.17),.075,0,a,0,'stone');
  }
}
function roundRoof(b,base,radius,rise,color,rows) {
  b.put('cone',trim,0,base+rise/2,0,radius*1.94,rise,radius*1.94);
  const incline=Math.atan(radius/rise);
  for(let row=0;row<rows;row++) {
    const t=(row+.5)/rows,r=radius*(1-t),y=base+rise*t;
    const count=Math.max(5,Math.round(TAU*r/.32));
    for(let j=0;j<count;j++){
      const a=(j+(row%2)*.52)*TAU/count;
      b.group(0,0,0,a,()=>b.put('roofScale',tint(color,.18),0,y,r,TAU*r/count*1.12,Math.hypot(rise,radius)/rows*1.14,.095,-incline,0,0,'clay'));
    }
  }
}
function clocktower(b,root,ownerId='tower') {
  const r=1.24,h=7.7;
  const clockAssembly=new T.Group();clockAssembly.name='world:tower:clock';clockAssembly.userData={objectId:'tower:clock',ownerId};root.add(clockAssembly);worldObjects.bindGroup('tower:clock',clockAssembly);
  b.put('cyl','#d9c8a6',0,h/2,0,r*2,h,r*2,0,0,0,'plaster');towerStone(b,r,h);
  for(const y of [.28,5.75,7.28,7.58])b.put('disk','#b3a382',0,y,0,2.64,.17,2.64);
  for(let k=0;k<4;k++)b.group(0,0,0,k*Math.PI/2,()=>{
    windowBox(b,0,4.1,r-.07,.37,.84,false);
    b.put('disk',trim,0,6.55,r-.03,1.29,.17,1.29,Math.PI/2);
    b.put('disk','#f2db9e',0,6.55,r+.075,1.12,.04,1.12,Math.PI/2);
    for(let j=0;j<12;j++){const a=j*TAU/12;b.put('box',trim,.46*Math.sin(a),6.55+.46*Math.cos(a),r+.11,.036,.105,.025,0,0,-a);}
    const mount=new T.Group();mount.name=`part:${ownerId}:clock-face:${k}`;mount.userData={objectId:'tower:clock',partId:`${ownerId}:clock-hands`};mount.matrixAutoUpdate=false;
    mount.matrix.copy(b.frame).multiply(new T.Matrix4().makeTranslation(0,6.55,r+.15));clockAssembly.add(mount);
    for(const [kind,len,width] of [['hour',.3,.055],['minute',.42,.036]]){
      const hand=new T.Group();mount.add(hand);const hb=new Builder(hand);
      hb.put('box',iron,0,len*.42,kind==='minute'?.014:0,width,len,.025);hb.finish();clockHands.push({hand,kind});
    }
    b.put('ball',iron,0,6.55,r+.19,.081,.081,.041);
  });
  roundRoof(b,7.67,1.69,2.40,'#688782',8);
  b.put('cyl',iron,0,10.23,0,.048,.76,.048);b.put('ball','#c4a25e',0,10.33,0,.19,.19,.19);
}
function windmill(b) {
  const h=6;
  b.put('millBody','#d5c4a3',0,h/2,0,3.05,h,3.05,0,0,0,'plaster');towerStone(b,1.676,h,.367);
  for(let i=0;i<4;i++)b.group(0,0,0,i*Math.PI/2,()=>{
    b.put('arch',trim,0,2.82,1.43,.51,.99,.13);b.put('arch','#edcd8b',0,2.82,1.51,.34,.79,.04,0,0,0,'glass');
    b.put('box',trim,0,2.81,1.55,.035,.76,.045);
  });
  b.put('arch',timber,0,1,1.61,1.07,2.04,.18);b.put('arch',oak,0,.96,1.71,.87,1.86,.08);
  b.put('cyl',trim,0,5.92,0,3.37,.24,3.37);
  roundRoof(b,6.02,1.87,2.39,'#b76046',8);
}
function rotor(root,b,x,y,z,axis,construct,speed,ownerId='wind',partId='wind:rotor') {
  const mount=new T.Group();mount.name=`part:${partId}`;mount.userData={objectId:ownerId,partId};mount.matrixAutoUpdate=false;mount.matrix.copy(b.frame).multiply(new T.Matrix4().makeTranslation(x,y,z));root.add(mount);
  const hub=new T.Group();mount.add(hub);const mb=new Builder(hub);mb.owner(ownerId,`${partId}:sails`,()=>construct(mb));mb.finish();
  moving.push({hub,axis,speed});return {mount,hub};
}
function sails(b){
  b.put('cyl',trim,0,0,0,.44,.46,.44,Math.PI/2);
  for(let i=0;i<4;i++){
    const a=i*TAU/4+.43,point=(r,offset,z=0)=>v(Math.cos(a)*offset-Math.sin(a)*r,Math.sin(a)*offset+Math.cos(a)*r,z);
    b.beam(timber,point(.1,0),point(3.44,0),.11,.12);
    b.put('box','#dac69e',...point(2.35,.30,-.045).toArray(),.57,2.07,.033,0,0,a);
    for(const off of [0,.32,.66])b.beam(oak,point(1.22,off),point(3.48,off),.063,.07);
    for(let j=0;j<8;j++){const r=1.22+j*.32;b.beam(trim,point(r,-.04,.035),point(r,.70,.035),.055,.065);}
  }
}
export function lantern(b,x,y,z) {
  b.group(x,y,z,0,()=>{
    b.put('cyl',timber,0,1.45,0,.14,2.9,.14,0,0,0,'agedWood');b.put('box',trim,.22,2.83,0,.58,.11,.15,0,0,0,'iron');
    b.put('box','#ffdf92',.44,2.44,0,.27,.40,.27,0,0,0,'glass');
    for(const s of [-1,1])for(const t of [-1,1])b.put('box',iron,.44+s*.15,2.44,t*.15,.036,.46,.036,0,0,0,'iron');
    b.put('spire',iron,.44,2.74,0,.53,.24,.53,0,0,0,'iron');b.put('box',iron,.44,2.21,0,.34,.06,.34,0,0,0,'iron');
    lamps.push(v(.44,2.43,0).applyMatrix4(b.frame));
  });
}
const villageBuildingBinding={kind:'procedural',build:({builder,plot,root:visualRoot})=>{
  if(plot.id==='wind'){
    windmill(builder);const movingRotor=rotor(visualRoot,builder,0,5.8,1.8,'z',sails,.23,'wind:rotor','wind:rotor');worldObjects.bindGroup('wind:rotor',movingRotor.mount);
  }
  else cottage(builder,plot,visualRoot);
  if(plot.id==='tower')builder.group(-2,0,.64,0,()=>clocktower(builder,visualRoot,plot.id));
}};

function anchor(group,plot,name,x,y,z,forwardZ=1){
  const node=new T.Group();node.name=`anchor:${plot.id}:${name}`;node.position.set(x,y,z);
  node.userData={objectId:plot.id,anchor:name,forward:[0,0,forwardZ]};group.add(node);return node;
}

export function buildings(root,b) {
  for(const p of plots){
    const assetKey=`procedural:village/${p.id}`;
    if(!visualBindings.has(assetKey))visualBindings.register(assetKey,villageBuildingBinding);
    const group=new T.Group();group.name=`world:${p.id}`;group.position.set(p.x,p.y,p.z);group.rotation.y=p.a;
    group.userData.assetKey=assetKey;root.add(group);worldObjects.bindGroup(p.id,group);
    const entranceZ=p.id==='wind'?1.91:p.d/2+.24,buildingBuilder=new Builder(group);
    anchor(group,p,'ground',0,0,0);anchor(group,p,'entrance',doorOffset(p),0,entranceZ);anchor(group,p,'arrival',doorOffset(p),0,entranceZ+.36,-1);
    anchor(group,p,'delivery',p.w*.38,0,entranceZ+1.05,-1);
    const record=worldObjects.get(p.id);
    record.generation.random={algorithm:'lcg32-1664525-1013904223',initialState:proceduralSeed()};
    worldObjects.upsert(record);
    buildingBuilder.owner(p.id,`${p.id}:exterior`,()=>visualBindings.get(assetKey).build({builder:buildingBuilder,plot:p,root:group}));
    buildingBuilder.finish();
  }
  for(const [x,z] of [[1.45,13],[-6,5.6],[-16.7,5.3],[3.65,-3.5],[9.1,-10.1],[-21.6,-6.3],[3.4,-14.9],[14,6.8],[-23.1,8.6],[7.7,22.8]])lantern(b,x,height(x,z),z);
}
