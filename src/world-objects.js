import {validateManifest} from './manifest-validation.js';
import { doorOffset, interiorLayouts, plots, proposedPlotPlacement, updatePlotPlacement } from './layout.js';

export const MANIFEST_VERSION=1;
const clone=value=>JSON.parse(JSON.stringify(value));
const identity=()=>({position:[0,0,0],rotation:[0,0,0],scale:[1,1,1]});

export class VisualBindingRegistry {
  constructor(){this.bindings=new Map();}
  register(assetKey,binding){
    if(!assetKey||typeof binding?.build!=='function')throw new TypeError('Visual bindings require an asset key and build function');
    const current=this.bindings.get(assetKey);
    if(current&&current.build!==binding.build)throw new Error(`Visual binding already registered: ${assetKey}`);
    this.bindings.set(assetKey,binding);return binding;
  }
  replace(assetKey,binding){
    if(!assetKey||typeof binding?.build!=='function')throw new TypeError('Visual bindings require an asset key and build function');
    this.bindings.set(assetKey,binding);return binding;
  }
  has(assetKey){return this.bindings.has(assetKey);}
  get(assetKey){return this.bindings.get(assetKey);}
  list(){return [...this.bindings].map(([assetKey,binding])=>({assetKey,kind:binding.kind??'unknown'}));}
}

export class WorldObjectRegistry {
  constructor(){this.records=new Map();this.groups=new Map();this.placementListeners=new Set();}
  register(record){
    if(!record?.id)throw new TypeError('World object records require a stable id');
    if(this.records.has(record.id))throw new Error(`Duplicate world object id: ${record.id}`);
    this.records.set(record.id,clone(record));return this.get(record.id);
  }
  upsert(record){
    if(!record?.id)throw new TypeError('World object records require a stable id');
    this.records.set(record.id,clone(record));return this.get(record.id);
  }
  has(id){return this.records.has(id);}
  get(id){const record=this.records.get(id);return record?clone(record):undefined;}
  list({type,regionId,parentId}={}){
    return [...this.records.values()].filter(record=>(!type||record.type===type)&&(!regionId||record.regionId===regionId)&&(parentId===undefined||record.parentId===parentId)).map(clone);
  }
  bindGroup(id,group){
    if(!this.records.has(id))throw new Error(`Cannot bind unknown world object: ${id}`);
    group.userData.objectId=id;this.groups.set(id,group);return group;
  }
  unbindGroup(id,group){if(!group||this.groups.get(id)===group)this.groups.delete(id);}
  binding(id){return this.groups.get(id);}
  lookupInstance(mesh,index){
    const objectId=mesh?.userData?.instanceOwners?.[index];
    if(objectId==null)return undefined;
    return {objectId,partId:mesh.userData.instanceParts?.[index]??null};
  }
  inspect(id){
    const group=this.binding(id),record=this.get(id);
    return {record,binding:group?{name:group.name,type:group.type,visible:group.visible,childCount:group.children.length}:null};
  }
  pick(hit){
    const object=hit?.object??hit;if(!object)return undefined;
    if(Number.isInteger(hit?.instanceId)){
      const owned=this.lookupInstance(object,hit.instanceId);
      if(owned)return {...owned,record:this.get(owned.objectId)};
    }
    let current=object;
    while(current){
      const objectId=current.userData?.objectId;
      if(objectId)return {objectId,partId:current.userData.partId??null,record:this.get(objectId)};
      current=current.parent;
    }
    return undefined;
  }
  linkChild(parentId,childId){
    const parent=this.records.get(parentId);
    if(!parent)throw new Error(`Unknown parent world object: ${parentId}`);
    const children=parent.relationships?.children??(parent.relationships={children:[]}).children;
    if(!children.includes(childId))children.push(childId);
  }
  onPlacement(listener){this.placementListeners.add(listener);return()=>this.placementListeners.delete(listener);}
  placementChanged(change){for(const listener of this.placementListeners)listener(change);}
}

const region=(id,name,assetKey,anchors={})=>({
  id:`region:${id}`,type:'region',gameplayRole:id,name,parentId:null,regionId:`region:${id}`,transform:identity(),
  visual:{assetKey,binding:'procedural'},anchors,collision:null,relationships:{children:[]},generation:{builder:id}
});

function plotRecord(plot){
  const entranceZ=plot.id==='wind'?1.91:plot.d/2+.24;
  return {
    id:plot.id,type:'building',gameplayRole:plot.id,name:plot.name,parentId:'region:village',regionId:'region:village',
    transform:{position:[plot.x,plot.y,plot.z],rotation:[0,plot.a,0],scale:[1,1,1]},
    visual:{assetKey:`procedural:village/${plot.id}`,binding:'procedural'},
    collision:{shape:plot.id==='wind'?'circle':'oriented-box',width:plot.w,depth:plot.d},
    anchors:{
      ground:{position:[0,0,0],forward:[0,0,1]},
      entrance:{position:[doorOffset(plot),0,entranceZ],forward:[0,0,1]},
      arrival:{position:[doorOffset(plot),0,entranceZ+.36],forward:[0,0,-1]},
      delivery:{position:[plot.w*.38,0,entranceZ+1.05],forward:[0,0,-1]}
    },
    relationships:{interiorId:`room:${plot.id}`,roadId:`road:${plot.id}`,children:[`room:${plot.id}`,...(plot.id==='mill'?['mill:water-wheel']:plot.id==='tower'?['tower:clock']:plot.id==='wind'?['wind:rotor']:[])]},
    placement:{dependencies:['visual-transform','plot-collision','door-anchors',`road:${plot.id}`,'road-spatial-cache']},
    generation:{builder:plot.id==='wind'?'windmill':'cottage',dimensions:{width:plot.w,depth:plot.d,height:plot.h},resolved:{wall:plot.wall??null,roof:plot.roof??null}}
  };
}

function interiorRecords(plot){
  const [halfW,halfD]=interiorLayouts[plot.id],stairSide=halfW-1.62,landing=4.05-halfD-.9,foot=landing+3.81,roomId=`room:${plot.id}`;
  const children=['structure','furnishings','workshop','sleeping-loft','lighting'].map(name=>`${roomId}:${name}`);
  const room={id:roomId,type:'interior',gameplayRole:'building-interior',name:`${plot.name} interior`,parentId:plot.id,regionId:'region:village',
    transform:identity(),transformSpace:'interior-local',visual:{assetKey:`procedural:interior/${plot.id}`,binding:'procedural'},
    collision:{shape:'interior-bounds',width:halfW*2,depth:halfD*2},anchors:{entrance:{position:[0,0,halfD-.52],forward:[0,0,-1]}},
    relationships:{exteriorId:plot.id,children},generation:{builder:'village-room',layout:{halfW,halfD,stairSide,landing,foot}}};
  return [room,...children.map(id=>({id,type:'interior-section',gameplayRole:id.split(':').at(-1),parentId:roomId,regionId:'region:village',
    transform:identity(),transformSpace:'interior-local',visual:{assetKey:`procedural:interior/${plot.id}/${id.split(':').at(-1)}`,binding:'live-scene'},
    anchors:{},collision:null,relationships:{children:[]},generation:{builder:id.split(':').at(-1)}}))];
}

function mechanismRecords(){
  const mill=plots.find(plot=>plot.id==='mill');
  return [
    {id:'mill:water-wheel',type:'machinery',gameplayRole:'water-wheel',name:'Armory water wheel',parentId:'mill',regionId:'region:village',transformSpace:'local',
      transform:{position:[-mill.w/2-1.13,.87,.08],rotation:[0,0,0],scale:[1,1,1]},visual:{assetKey:'procedural:village/mill-water-wheel',binding:'live-scene'},
      anchors:{axle:{position:[0,0,0]}},collision:{shape:'cylinder',radius:2.04,depth:1.3},relationships:{driveId:'mill:drive',sluiceId:'mill:sluice'},placement:{followsParent:false,coupledTo:['brook','mill:sluice','mill:drive']},generation:{builder:'water-wheel'}},
    {id:'tower:clock',type:'machinery',gameplayRole:'clock',name:'Hilltop clock faces',parentId:'tower',regionId:'region:village',transformSpace:'local',transform:identity(),
      visual:{assetKey:'procedural:village/tower-clock',binding:'live-scene'},anchors:{face:{position:[-2,6.55,2.03],forward:[0,0,1]}},collision:null,relationships:{children:['tower:clock-hands']},generation:{builder:'clocktower'}},
    {id:'wind:rotor',type:'machinery',gameplayRole:'windmill-rotor',name:'Clover windmill rotor',parentId:'wind',regionId:'region:village',transformSpace:'local',
      transform:{position:[0,5.8,1.8],rotation:[0,0,0],scale:[1,1,1]},visual:{assetKey:'procedural:village/wind-rotor',binding:'live-scene'},anchors:{axle:{position:[0,0,0]}},
      collision:null,relationships:{children:[]},generation:{builder:'windmill-rotor'}}
  ];
}

export const visualBindings=new VisualBindingRegistry();
export const worldObjects=new WorldObjectRegistry();

const regions=[
  region('village','Briarwick Village','procedural:region/village'),
  region('castle','Thornmere Castle','procedural:region/castle',{gate:{position:[0,0,36.47],forward:[0,0,-1]}}),
  region('farm','Briarwick Commons Farm','procedural:region/farm'),
  region('woodland','Briarwick Woodland','procedural:region/woodland'),
  region('lake','Briarwick Lake','procedural:region/lake'),
  region('mine','Nameless Mine','procedural:region/mine'),
  region('catacomb','Valley Catacomb','procedural:region/catacomb')
];
regions[0].relationships.children=plots.map(plot=>plot.id);
for(const record of regions)worldObjects.register(record);
for(const plot of plots){worldObjects.register(plotRecord(plot));for(const record of interiorRecords(plot))worldObjects.register(record);}
for(const record of mechanismRecords())worldObjects.register(record);

export function registerWorldObject(record){return worldObjects.upsert(record);}
export function linkWorldObject(parentId,childId){worldObjects.linkChild(parentId,childId);}

function rotateYXZ([x,y,z],[rx=0,ry=0,rz=0]){
  const cz=Math.cos(rz),sz=Math.sin(rz),x1=x*cz-y*sz,y1=x*sz+y*cz;
  const cx=Math.cos(rx),sx=Math.sin(rx),y2=y1*cx-z*sx,z2=y1*sx+z*cx;
  const cy=Math.cos(ry),sy=Math.sin(ry);
  return [x1*cy+z2*sy,y2,-x1*sy+z2*cy];
}
function applyTransform(point,transform){
  const scale=transform?.scale??[1,1,1],position=transform?.position??[0,0,0];
  const rotated=rotateYXZ(point.map((value,index)=>value*scale[index]),transform?.rotation??[0,0,0]);
  return rotated.map((value,index)=>value+position[index]);
}

export function resolveWorldAnchor(registry,id,anchorName){
  let record=registry.get(id);const anchor=record?.anchors?.[anchorName];
  if(!record||!anchor)return undefined;
  let position=[...anchor.position],forward=anchor.forward?[...anchor.forward]:null,space='world';
  while(record){
    position=applyTransform(position,record.transform);
    if(forward)forward=rotateYXZ(forward,record.transform?.rotation??[0,0,0]);
    if(record.transformSpace==='world'){space='world';break;}
    if(record.transformSpace==='interior-local'){space='interior-local';break;}
    if(!record.parentId)break;
    record=registry.get(record.parentId);
  }
  const result={...clone(anchor),position,space};
  if(forward){const length=Math.hypot(...forward)||1;result.forward=forward.map(value=>value/length);}
  return result;
}
export const worldAnchor=(id,anchorName)=>resolveWorldAnchor(worldObjects,id,anchorName);

export function proposeWorldPlacement(id,placement){
  const plot=plots.find(candidate=>candidate.id===id);
  if(!plot||!worldObjects.has(id))throw new Error(`Unsupported world object placement: ${id}`);
  if(id==='mill')throw new Error('Mill placement is coupled to the brook, sluice, drive, and water wheel; rebuild the connected system instead');
  return proposedPlotPlacement(plot,placement);
}

export function editWorldObjectPlacement(id,placement){
  const next=proposeWorldPlacement(id,placement);
  const previous=worldObjects.get(id);
  const plot=updatePlotPlacement(id,next);
  const rebuilt=plotRecord(plot),previousChildren=previous.relationships?.children??[],rebuiltChildren=rebuilt.relationships.children;
  rebuilt.relationships={...previous.relationships,...rebuilt.relationships,children:[...new Set([...previousChildren,...rebuiltChildren])]};
  rebuilt.generation={...previous.generation,...rebuilt.generation};
  const current=worldObjects.upsert(rebuilt),group=worldObjects.binding(id);
  if(group){group.position.set(plot.x,plot.y,plot.z);group.rotation.set(0,plot.a,0);group.updateMatrix();group.updateMatrixWorld(true);}
  worldObjects.placementChanged({id,previous,current,dependencies:current.placement.dependencies});
  return current;
}

export function applyWorldPlacementOverrides(saved){
  if(saved?.version!==1||!saved.objects||typeof saved.objects!=='object')return {applied:[],rejected:['version']};
  const applied=[],rejected=[];
  for(const [id,placement] of Object.entries(saved.objects)){
    try{editWorldObjectPlacement(id,placement);applied.push(id);}catch{rejected.push(id);}
  }
  return {applied,rejected};
}

function descendants(rootId){
  const ids=new Set([rootId]);let changed=true;
  while(changed){changed=false;for(const record of worldObjects.list())if(record.parentId&&ids.has(record.parentId)&&!ids.has(record.id)){ids.add(record.id);changed=true;}}
  return ids;
}

export function exportWorldManifest({ids,rootId,includeDescendants=false}={}){
  let selected;
  if(ids)selected=ids.map(id=>worldObjects.get(id)).filter(Boolean);
  else if(rootId){const wanted=includeDescendants?descendants(rootId):new Set([rootId]);selected=worldObjects.list().filter(record=>wanted.has(record.id));}
  else selected=worldObjects.list();
  return {
    schema:'briarwick-world-objects',version:MANIFEST_VERSION,
    coordinateSystem:{handedness:'right',up:'y',forward:'negative-z',units:'meters',angles:'radians',rotationOrder:'YXZ'},
    objects:selected
  };
}

export const validateWorldManifest=manifest=>validateManifest(manifest,MANIFEST_VERSION);

export function createWorldInspector(services={}){
  return Object.freeze({
    list:filter=>worldObjects.list(filter),inspect:id=>worldObjects.inspect(id),bindings:()=>visualBindings.list(),
    pick:hit=>worldObjects.pick(hit),
    anchor:(id,name)=>worldAnchor(id,name),exportManifest:options=>exportWorldManifest(options),
    validate:manifest=>validateWorldManifest(manifest),
    editPlacement:(id,placement)=>services.editPlacement?services.editPlacement(id,placement):editWorldObjectPlacement(id,placement),
    resetPlacements:()=>services.resetPlacements?.()??false
  });
}
