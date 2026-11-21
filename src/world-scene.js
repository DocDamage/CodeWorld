import * as T from 'three';
import { visualBindings,worldObjects } from './world-objects.js';

const regionBinding={kind:'procedural-region',build:({scene,record})=>{
  const root=new T.Group();root.name=`world:${record.id}`;root.userData.assetKey=record.visual.assetKey;scene.add(root);return root;
}};

export function createRegionRoot(scene,id){
  const objectId=id.startsWith('region:')?id:`region:${id}`;
  if(!worldObjects.has(objectId))throw new Error(`Unknown world region: ${objectId}`);
  const record=worldObjects.get(objectId);
  if(!visualBindings.has(record.visual.assetKey))visualBindings.register(record.visual.assetKey,regionBinding);
  const root=visualBindings.get(record.visual.assetKey).build({scene,record});
  worldObjects.bindGroup(objectId,root);return root;
}
