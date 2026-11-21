export const forestSites=[
  {name:'Alder Glade',x:66,z:6}, {name:'Fern Hollow',x:77,z:-15},
  {name:'High Pines',x:98,z:-9}, {name:'Bracken Meadow',x:98,z:20},
];
// Length is used by both the silhouette and the stride.
const animal=(name,form,length,coat,accent,site,dx,dz)=>({name,form,length,coat,accent,site,dx,dz});
export const forestSpecies=[
  animal('Red deer','stag',1.95,'#9b654a','#d6b694',0,1,-3),
  animal('Roe deer','roe',1.24,'#ad7953','#e1c8a2',0,-7,6),
  animal('Red fox','fox',.91,'#ad5e35','#e2cfac',0,8,-4),
  animal('Red squirrel','squirrel',.37,'#a65d38','#e5c5a2',0,-5,-7),
  animal('Wood pigeon','pigeon',.43,'#788591','#b69898',0,7,6),
  animal('Wild boar','boar',1.47,'#605144','#948274',1,2,-3),
  animal('European badger','badger',.84,'#81817a','#e3dbc8',1,-7,-3),
  animal('Stoat','stoat',.36,'#98603d','#eee1c5',1,-6,4),
  animal('European rabbit','rabbit',.49,'#918271','#d4c9b5',1,6,5),
  animal('Grey partridge','partridge',.40,'#998274','#bd8857',1,7,-6),
  animal('Eurasian lynx','lynx',1.09,'#b29468','#ddc7a6',2,-4,-4),
  animal('European wildcat','wildcat',.74,'#928675','#cdbaa0',2,6,3),
  animal('Pine marten','marten',.60,'#665040','#d8ae69',2,-6,6),
  animal('European polecat','polecat',.51,'#584942','#c7aa85',2,2,8),
  animal('Western capercaillie','grouse',.86,'#434c49','#546b60',2,7,-6),
  animal('Fallow deer','fallow',1.54,'#ab7853','#e0c7a1',3,-2,-4),
  animal('European mouflon','ram',1.35,'#80624b','#e0d2bc',3,6,5),
  animal('Brown hare','hare',.67,'#ae906e','#e1cdb1',3,-7,5),
  animal('European hedgehog','hedgehog',.35,'#796348','#c2a483',3,7,-4),
  animal('Ring-necked pheasant','pheasant',.70,'#ad794a','#405d50',3,-8,-5),
];
export const inHuntingWoods=(x,z)=>x>=42&&x<=126&&z>=-47&&z<=42;
export function closestForestSite(x,z){
  return forestSites.reduce((best,site)=>Math.hypot(x-site.x,z-site.z)<Math.hypot(x-best.x,z-best.z)?site:best);
}
