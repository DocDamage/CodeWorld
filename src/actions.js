export const actionIds=Object.freeze({
  village:Object.freeze({enter:'village.enter',leave:'village.leave',sluice:'village.sluice.toggle',forge:'village.forge.work'}),
  mine:Object.freeze({perform:'mine.perform'}),
  farm:Object.freeze({perform:'farm.perform',tractorMount:'farm.tractor.mount',dairyUse:'farm.dairy.use',
    fieldHarvest:'farm.field.harvest',fieldTill:'farm.field.till',fieldPlant:'farm.field.plant',fieldWater:'farm.field.water',
    waterRefill:'farm.station.water.refill',feedMix:'farm.station.feed.mix',eggsCollect:'farm.station.eggs.collect',animalFeed:'farm.animal.feed',
    wagonLoad:'farm.wagon.load',wagonUnload:'farm.wagon.unload',plowToggle:'farm.tractor.plow.toggle'}),
  lake:Object.freeze({boat:'lake.boat.toggle'}),
  castle:Object.freeze({bridge:'castle.drawbridge.toggle',dragon:'castle.dragon.talk'}),
  hunting:Object.freeze({harvest:'hunting.harvest'})
});

export function createAction(id,label,perform,{objectId=null,metadata=null}={}){
  if(typeof id!=='string'||!id.trim())throw new TypeError('Gameplay actions require a stable id');
  if(typeof label!=='string'||!label.trim())throw new TypeError(`Gameplay action ${id} requires a label`);
  if(typeof perform!=='function')throw new TypeError(`Gameplay action ${id} requires a performer`);
  return Object.freeze({id,label,objectId,metadata,perform});
}

export function normalizeAction(task,id,objectId=null){
  if(!task)return null;
  if(task.id)return createAction(task.id,task.label,task.perform,{objectId:task.objectId??objectId,metadata:task.metadata});
  return createAction(id,task.label,task.perform,{objectId});
}
