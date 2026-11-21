import {Group} from 'three';
import {Builder} from './model.js';
import {linkWorldObject,registerWorldObject,visualBindings,worldObjects} from './world-objects.js';

// These keys remain stable when a room's displayed title changes.
const roomKeys=new Map(Object.entries({
  'Great hall & throne':'great-hall','Kitchens & scullery':'kitchens','Pantry & buttery':'pantry','Chapel':'chapel',
  'Council chamber':'council','Royal library':'library','Treasury':'treasury','King’s chamber':'royal-chamber',
  'Royal solar':'solar','Garderobe':'garderobe','Guard barracks':'barracks','Armoury':'armoury','Smithy':'smithy',
  'Infirmary':'infirmary','Servants’ quarters':'servants','Stables':'stables','Bakehouse':'bakehouse','Brewhouse':'brewhouse',
  'Laundry & linen room':'laundry','Guest chamber':'guest','Falconry':'falconry','Hound keeper':'hound-keeper',
  'Bathhouse':'bathhouse','Mending room':'mending','Royal crypt':'crypt','Warden’s office':'warden','Wine cellar':'wine-cellar',
  'Prison galleries':'prison-galleries','Dragon viewing gallery':'viewing-gallery','Dragon vault':'dragon-hall',
  'Dragon keeper’s station':'dragon-keeper','Chain winch chamber':'chain-winch','Feeding stores':'feeding-stores','Deep hoard chamber':'deep-hoard',
  'Prison cell 1':'west-cell-north','Prison cell 2':'west-cell-middle-north','Prison cell 3':'west-cell-middle-south','Prison cell 4':'west-cell-south',
}));
function bind(group,id,name,type,parentId,collision=null,anchors={},binding='live-scene'){
  const assetKey='procedural:'+id.replaceAll(':','/');
  registerWorldObject({id,name,type,gameplayRole:id.split(':').at(-1),regionId:'region:castle',parentId,
    transformSpace:id==='castle:surface'?'world':'local',transform:{position:group.position.toArray(),rotation:[0,group.rotation.y,0],scale:[1,1,1]},
    visual:{assetKey,binding},anchors,collision,relationships:{children:[]}});
  linkWorldObject(parentId,id);group.name='world:'+id;group.userData.assetKey=assetKey;worldObjects.bindGroup(id,group);
  return assetKey;
}
export function castleLevel(group,id,name,parentId){
  bind(group,id,name,'world-section',parentId);
}
export function castleSection(kit,id,name,parentId,build){
  const parent=kit.root,priorBuilder=kit.b,group=new Group();
  parent.add(group);bind(group,id,name,'world-section',parentId,null,{},'procedural');
  const builder=new Builder(group);kit.b=builder;kit.root=group;
  kit.effectRoots.push(group);
  const assetKey=group.userData.assetKey;
  if(!visualBindings.has(assetKey))visualBindings.register(assetKey,{kind:'procedural',build});
  try{
    const result=builder.owner(id,'structure',()=>visualBindings.get(assetKey).build(kit));
    builder.finish();return result;
  }finally{kit.root=parent;kit.b=priorBuilder;}
}
export function castleRoom(k,zone){
  const owner=k.root.userData.objectId;
  if(!owner)return;
  const key=zone.key??roomKeys.get(zone.name);
  if(!key)throw new Error('Castle room needs an authored ID: '+zone.name);
  const id='castle:room:'+key,room=new Group(),w=zone.x2-zone.x1,d=zone.z2-zone.z1;
  room.position.set(zone.x1+w/2,zone.base,zone.z1+d/2);k.root.add(room);
  bind(room,id,zone.name,'room',owner,{shape:'bounds',min:[-w/2,0,-d/2],max:[w/2,zone.top-zone.base,d/2]},{floor:{position:[0,0,0]}});
  zone.objectId=id;
}
export function castleFixture(k,key,name,x,z,base,w,d,draw,yaw=0,h=1){
  const zone=k.roomAt(x,z,base),parent=worldObjects.binding(zone?.objectId);
  if(!parent)return k.furnishing(x,z,base,w,d,draw,yaw,h);
  const id='castle:fixture:'+key,group=new Group();
  group.position.set(x-parent.position.x,base-parent.position.y,z-parent.position.z);group.rotation.y=yaw;parent.add(group);
  const assetKey=bind(group,id,name,'furniture',zone.objectId,{shape:'box',size:[w,h,d]},{floor:{position:[0,0,0]}},'procedural');
  if(!visualBindings.has(assetKey))visualBindings.register(assetKey,{kind:'procedural',build:draw});
  k.furnishing(x,z,base,w,d,()=>{
    const b=new Builder(group);b.owner(id,'assembly',()=>visualBindings.get(assetKey).build(b));b.finish();
    if(group.userData.fires||group.userData.smokeSources)k.effectRoots.push(group);
  },yaw,h);
}
