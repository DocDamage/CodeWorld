import { doorOffset, plots, updatePlotPlacement } from './layout.js';

export const MANIFEST_VERSION=1;
const clone=value=>JSON.parse(JSON.stringify(value));

export class VisualBindingRegistry {
  constructor(){this.bindings=new Map();}
  register(assetKey,binding){
    if(!assetKey||typeof binding?.build!=='function')throw new TypeError('Visual bindings require an asset key and build function');
    const current=this.bindings.get(assetKey);
    if(current&&current.build!==binding.build)throw new Error(`Visual binding already registered: ${assetKey}`);
    this.bindings.set(assetKey,binding);return binding;
  }
  has(assetKey){return this.bindings.has(assetKey);}
  get(assetKey){return this.bindings.get(assetKey);}
}

export class WorldObjectRegistry {
  constructor(){this.records=new Map();this.groups=new Map();}
  register(record){
    if(!record?.id)throw new TypeError('World object records require a stable id');
    if(this.records.has(record.id))throw new Error(`Duplicate world object id: ${record.id}`);
    this.records.set(record.id,clone(record));return this.get(record.id);
  }
  upsert(record){this.records.set(record.id,clone(record));return this.get(record.id);}
  has(id){return this.records.has(id);}
  get(id){const record=this.records.get(id);return record?clone(record):undefined;}
  list(){return [...this.records.values()].map(clone);}
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
  inspect(id){return {record:this.get(id),group:this.binding(id)};}
}

function plotRecord(plot){
  const entranceZ=plot.id==='wind'?1.91:plot.d/2+.24;
  return {
    id:plot.id,type:'building',name:plot.name,parentId:'region:village',regionId:'region:village',
    transform:{position:[plot.x,plot.y,plot.z],rotation:[0,plot.a,0],scale:[1,1,1]},
    visual:{assetKey:`procedural:village/${plot.id}`,binding:'procedural'},
    collision:{shape:plot.id==='wind'?'circle':'oriented-box',width:plot.w,depth:plot.d},
    anchors:{
      origin:{position:[0,0,0]},
      entrance:{position:[doorOffset(plot),0,entranceZ],forward:[0,0,1]},
      arrival:{position:[doorOffset(plot),0,entranceZ+.36],forward:[0,0,-1]}
    },
    relationships:{interiorId:`room:${plot.id}`,roadId:`road:${plot.id}`},
    generation:{builder:plot.id==='wind'?'windmill':'cottage',dimensions:{width:plot.w,depth:plot.d,height:plot.h},resolved:{wall:plot.wall??null,roof:plot.roof??null}}
  };
}

export const visualBindings=new VisualBindingRegistry();
export const worldObjects=new WorldObjectRegistry();
worldObjects.register({
  id:'region:village',type:'region',name:'Briarwick Village',parentId:null,regionId:'region:village',
  transform:{position:[0,0,0],rotation:[0,0,0],scale:[1,1,1]},
  visual:{assetKey:null,binding:'group'},anchors:{},relationships:{children:['bakery']}
});
worldObjects.register(plotRecord(plots.find(plot=>plot.id==='bakery')));

export function editWorldObjectPlacement(id,placement){
  const plot=plots.find(candidate=>candidate.id===id);
  if(!plot||!worldObjects.has(id))throw new Error(`Unsupported world object placement: ${id}`);
  updatePlotPlacement(id,placement);
  worldObjects.upsert(plotRecord(plot));
  const group=worldObjects.binding(id);
  if(group){group.position.set(plot.x,plot.y,plot.z);group.rotation.set(0,plot.a,0);group.updateMatrix();}
  return worldObjects.get(id);
}

export function exportWorldManifest({ids}={}){
  const selected=ids?ids.map(id=>worldObjects.get(id)).filter(Boolean):worldObjects.list();
  return {
    schema:'briarwick-world-objects',version:MANIFEST_VERSION,
    coordinateSystem:{handedness:'right',up:'y',forward:'negative-z',units:'meters',angles:'radians'},
    objects:selected
  };
}
