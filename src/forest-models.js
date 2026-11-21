import * as T from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';

const forms={
  round:new T.SphereGeometry(.5,10,7),stone:new T.IcosahedronGeometry(.5,0),
  cone:new T.ConeGeometry(.5,1,9),shaft:new T.CylinderGeometry(.34,.5,1,9),box:new T.BoxGeometry(1,1,1),
};
const hide=new T.MeshStandardMaterial({vertexColors:true,roughness:.89});
const up=new T.Vector3(0,1,0);
function part(parent){
  const group=new T.Group(),parts=[],dummy=new T.Object3D();
  parent.add(group);
  function add(form,color,x,y,z,w,h,l,rx=0,ry=0,rz=0){
    dummy.position.set(x,y,z);dummy.rotation.set(rx,ry,rz);dummy.scale.set(w,h,l);dummy.updateMatrix();
    const base=forms[form],g=base.index?base.toNonIndexed():base.clone();g.deleteAttribute('uv');g.applyMatrix4(dummy.matrix);
    const c=new T.Color(color),colors=new Float32Array(g.attributes.position.count*3);
    for(let i=0;i<colors.length;i+=3){colors[i]=c.r;colors[i+1]=c.g;colors[i+2]=c.b;}
    g.setAttribute('color',new T.BufferAttribute(colors,3));parts.push(g);
  }
  function branch(color,x,y,z,xx,yy,zz,w){
    const delta=new T.Vector3(xx-x,yy-y,zz-z);
    const r=new T.Euler().setFromQuaternion(new T.Quaternion().setFromUnitVectors(up,delta.clone().normalize()));
    add('shaft',color,(x+xx)/2,(y+yy)/2,(z+zz)/2,w,delta.length(),w,r.x,r.y,r.z);
  }
  function finish(){
    const geo=mergeGeometries(parts);const mesh=new T.Mesh(geo,hide);mesh.castShadow=mesh.receiveShadow=true;group.add(mesh);
    parts.forEach(g=>g.dispose());return group;
  }
  return {group,add,branch,finish};
}

function articulatedLeg(root,{color,footColor,x,y,z,length,thick,footLength,footZ=0}){
  const upperLength=length*.48,lowerLength=length-upperLength;
  const upper=part(root);upper.group.position.set(x,y,z);
  upper.add('round',color,0,-upperLength*.47,0,thick*1.3,upperLength*.58,thick*1.45);
  const lower=part(upper.group);lower.group.position.y=-upperLength;
  lower.branch(color,0,0,0,0,-lowerLength,footZ*.22,thick*.72);
  const foot=part(lower.group);foot.group.position.set(0,-lowerLength,footZ*.22);
  foot.add('round',footColor,0,-.022,footLength*.34,thick*.82,.05,footLength);
  const leg={upper:upper.group,lower:lower.group,foot:foot.group,x,z:z+footZ,side:x<0?'left':'right',
    contactOffset:new T.Vector3(0,-.022,footLength*.34)};
  foot.finish();lower.finish();upper.finish();return leg;
}

function bird(root,s){
  const {form,coat,accent}=s,b=part(root),neck=part(root),wings=[],legs=[];
  const long=form==='pheasant',fan=form==='grouse',plump=form==='partridge';
  const y=plump?.40:.50;
  b.add('round',coat,0,y,0,.46,.51,.79,-.14);
  b.add('round',plump?'#c19d7f':accent,0,y+.015,.18,.40,.45,.39);
  for(let i=-2;i<=2;i++){
    const a=i*(fan?.22:.055);
    b.add('round',i%2?coat:'#665745',Math.sin(a)*(fan?.28:.12),y+(fan?.16:.025),-.40,
      fan?.15:.095,.105,long?.93:fan?.65:.40,fan?.75:.11,a);
  }
  neck.group.position.set(0,y+.19,.23);
  neck.add('round',long||fan?accent:coat,0,.04,.015,.27,.32,.29);
  neck.add('round',long?accent:plump?'#be8f63':coat,0,.18,.085,.28,.26,.29);
  neck.add('cone',fan?'#ddd0aa':'#a28b70',0,.155,.275,.081,.16,.078,Math.PI/2);
  for(const side of [-1,1]){
    if(long||fan)neck.add('round','#a54b3b',side*.118,.192,.118,.044,.086,.098);
    neck.add('round','#25241d',side*.133,.19,.13,.034,.038,.039);
    if(long||form==='pigeon')neck.add('round','#dcd8c8',side*.127,.045,.015,.028,.059,.17);
    const wing=part(root);wing.group.position.set(side*.18,y+.04,.02);
    wing.add('round',coat,side*.028,0,-.03,.15,.31,.67,-.19);
    for(let i=0;i<3;i++)wing.add('round',i%2?accent:'#756959',side*.09,-.05+i*.043,-.18,.040,.055,.39,-.15);
    wings.push(wing.finish());
    legs.push(articulatedLeg(root,{color:'#8b7050',footColor:'#937c5b',x:side*.098,y:y-.16,z:0,
      length:y-.18,thick:.043,footLength:.145,footZ:.052}));
  }
  b.finish();return {head:neck.finish(),legs,wings};
}

function mammal(root,s){
  const {form,coat,accent}=s,b=part(root),head=part(root),legs=[];
  const deer=['stag','roe','fallow','ram'].includes(form),cat=['wildcat','lynx'].includes(form);
  const low=['stoat','polecat','marten','badger','hedgehog'].includes(form),rabbit=['rabbit','hare'].includes(form);
  const leg=deer?.52:low?.13:rabbit?.22:form==='boar'?.26:form==='squirrel'?.21:.35;
  const width=deer?.28:form==='boar'||form==='hedgehog'?.44:low&&form!=='badger'?.23:.35;
  const h=form==='hedgehog'?.45:low?.25:deer?.39:.40,y=leg+h*.37;
  b.add('round',coat,0,y,-.04,width,h,.78,-.025);
  b.add('round',accent,0,y-h*.24,.02,width*.77,h*.47,.61);
  b.add('round',coat,0,y+.02,.20,width*1.03,h*1.04,.44);
  for(const side of [-1,1]){
    if(form==='fallow'||form==='lynx')for(let i=0;i<9;i++){
      const z=-.28+i%5*.103;
      b.add('round',form==='fallow'?'#e8d4af':'#65513e',side*width*(.39+.044*Math.cos(z*8)),y+.040+Math.floor(i/5)*.062,z,.023,.031,.036);
    }
    if(form==='wildcat')for(let i=0;i<4;i++)b.add('round','#665d51',side*width*.445,y+.043,-.25+i*.12,.021,.13,.040,.30);
  }
  if(form==='hedgehog')for(let i=0;i<34;i++){
    const a=i*2.40,r=Math.sqrt((i+.5)/34);
    b.add('cone',i%3?'#9c8564':'#6e604e',Math.cos(a)*r*.182,y+h*.33+(1-r)*.05,Math.sin(a)*r*.32-.05,.066,.12,.065,-.72,0,-Math.cos(a)*.45);
  }
  head.group.position.set(0,y+.07,.25);
  const neckY=deer?.24:form==='boar'?-.015:.045;
  head.add('round',coat,0,neckY*.48,.058,width*.74,deer?.44:.23,.24,.36);
  head.add('round',coat,0,neckY+.07,.19,width*.81,cat?.23:.21,.29);
  head.add('round',accent,0,neckY+.027,.31,width*.54,.13,cat?.125:.20);
  head.add('round',form==='boar'?'#87665b':'#352e29',0,neckY+.045,cat?.368:.401,width*.39,form==='boar'?.098:.055,.048);
  for(const side of [-1,1]){
    const ear=rabbit?(form==='hare'?.35:.27):form==='squirrel'||form==='lynx'?.18:deer?.15:.094;
    head.add('round',coat,side*width*.25,neckY+.17+ear*.29,.128,.087,ear,.076,-.15,0,-side*.25);
    head.add('round',rabbit?'#93706a':accent,side*width*.26,neckY+.17+ear*.33,.156,.048,ear*.66,.029,-.15,0,-side*.25);
    if(form==='lynx'||form==='squirrel')head.add('cone','#4c4034',side*width*.28,neckY+.32,.113,.042,.081,.052,-.20);
    if(form==='badger'||form==='polecat')head.add('round','#36332f',side*width*.32,neckY+.09,.228,.058,.076,.25,-.08);
    head.add('round','#25241f',side*width*.366,neckY+.105,.235,.027,.035,.036);
    if(form==='boar')head.add('cone','#daceb0',side*.070,neckY+.045,.357,.036,.092,.034,.24,0,-side*.31);
    if(deer&&form!=='ram'){
      const x=side*.082,yy=neckY+.164,horn=form==='roe'?.16:.34,wood='#79644f';
      head.branch(wood,x,yy,.14,side*.18,yy+horn*.59,.02,.047);
      head.branch(wood,side*.18,yy+horn*.59,.02,side*.235,yy+horn,-.055,.038);
      head.branch(wood,side*.155,yy+horn*.45,.055,side*.174,yy+horn*.70,.142,.03);
      if(form!=='roe')head.branch(wood,side*.20,yy+horn*.76,-.010,side*.25,yy+horn*1.16,.060,.031);
      if(form==='fallow')head.add('round',wood,side*.211,yy+horn*.82,-.024,.066,.15,.095,-.3);
    }else if(form==='ram'){
      let x=side*.082,yy=neckY+.16,z=.15;
      for(let j=1;j<=9;j++){const a=j*.58,xx=side*(.086+j*.011),nextY=neckY+.12+.115*Math.cos(a),zz=.12-.125*Math.sin(a);head.branch('#9c8867',x,yy,z,xx,nextY,zz,.088-j*.005);x=xx;yy=nextY;z=zz;}
    }
  }
  const tail=part(root);tail.group.position.set(0,y+.045,-.36);
  const bushy=form==='fox'||form==='squirrel'||form==='marten',long=bushy||cat||['polecat','stoat'].includes(form);
  if(form==='squirrel'){
    tail.add('round',coat,0,.18,-.115,.22,.47,.24,-.26);tail.add('round',coat,0,.41,-.054,.18,.24,.22,.75);
  }else{
    tail.add('round',deer?accent:coat,0,long?-.08:.015,long?-.23:-.043,bushy?.16:.093,long?.14:.11,long?.57:.18,-.32);
    if(form==='fox'||form==='stoat'||form==='wildcat')tail.add('round',form==='fox'?'#d8c7a9':'#423c32',0,-.147,-.444,.10,.098,.15,-.32);
  }
  for(let i=0;i<4;i++){
    const side=i%2?1:-1,front=i<2,thick=deer?.073:low?.076:.10;
    legs.push(articulatedLeg(root,{color:coat,footColor:deer?'#403b32':accent,x:side*width*.31,y:leg+.05,
      z:front?.224:-.256,length:leg+.025,thick,footLength:rabbit?.195:.095,footZ:rabbit?.075:.04}));
  }
  b.finish();return {head:head.finish(),legs,tail:tail.finish()};
}
export function forestAnimal(s){
  const root=new T.Group(),isBird=['pigeon','partridge','grouse','pheasant'].includes(s.form);
  const rig=isBird?bird(root,s):mammal(root,s);
  root.scale.setScalar(s.length);return {root,...rig};
}

// A fictional, non-operable first-person prop. All gameplay interactions are resolved on game animals.
export function forestRifle(){
  const root=new T.Group(),b=part(root);
  b.add('round','#74513a',.012,-.035,.18,.12,.16,.38,-.13);
  b.add('round','#99704d',0,-.017,-.13,.094,.091,.48);
  b.add('round','#484a45',0,.018,-.24,.055,.064,.55);
  b.add('shaft','#444946',0,.026,-.54,.037,.46,.037,Math.PI/2);
  for(const z of [-.085,-.21])b.add('box','#4c514b',0,.078,z,.051,.075,.036);
  b.add('round','#353c39',0,.116,-.145,.076,.077,.28);
  for(const z of [-.294,-.012])b.add('round','#4c5350',0,.117,z,.094,.090,.078);
  b.add('round','#334d4d',0,.117,.025,.067,.063,.013);
  b.finish();return root;
}
