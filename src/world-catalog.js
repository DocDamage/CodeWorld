import { farm,farmStations,fieldPlan,animalPlan } from './farm-layout.js';
import { lake,dock,falls } from './lake-layout.js';
import { MINE } from './mine-layout.js';
import { forestSites } from './forest-species.js';
import { linkWorldObject,registerWorldObject,worldObjects } from './world-objects.js';

const transform=(x=0,y=0,z=0,yaw=0)=>({position:[x,y,z],rotation:[0,yaw,0],scale:[1,1,1]});
const record=(id,type,role,parentId,position,assetKey,extra={})=>({
  id,type,gameplayRole:role,name:extra.name??id,parentId,regionId:parentId?.startsWith('region:')?parentId:extra.regionId,
  transform:transform(position.x,position.y??0,position.z,position.yaw??0),transformSpace:extra.transformSpace??'world',
  visual:{assetKey,binding:extra.visualBinding??'spatial-reference'},anchors:extra.anchors??{},collision:extra.collision??null,
  relationships:{children:[],...(extra.relationships??{})},generation:{builder:role,...(extra.generation??{})}
});

function add(parentId,object){registerWorldObject(object);linkWorldObject(parentId,object.id);}

export function registerCoreWorldCatalog(){
  if(worldObjects.has('farm:operations'))return;
  add('region:farm',record('farm:operations','world-section','farm-operations','region:farm',{x:farm.entry.x,z:farm.entry.z},'procedural:farm/operations',{name:'Farm operations',generation:{fields:fieldPlan.length,animalPens:animalPlan.length}}));
  add('region:farm',record('farm:tractor','vehicle','tractor','region:farm',{x:-67.45,z:28.6},'procedural:farm/tractor',{name:'Farm tractor',anchors:{driver:{position:[0,1.55,0]},hitch:{position:[0,.56,1.72]}}}));
  add('region:farm',record('farm:wagon','vehicle','wagon','region:farm',{x:-67.45,z:33.57},'procedural:farm/wagon',{name:'Produce wagon',anchors:{coupling:{position:[0,.56,-2.65]}}}));
  for(const field of fieldPlan)add('farm:operations',record(`farm:field:${field.crop}`,'world-section','crop-field','farm:operations',{
    x:(field.minX+field.maxX)/2,y:field.level,z:(field.minZ+field.maxZ)/2
  },`procedural:farm/field/${field.crop}`,{name:`${field.crop} field`,regionId:'region:farm',collision:{shape:'bounds',min:[field.minX,field.level,field.minZ],max:[field.maxX,field.level,field.maxZ]}}));
  for(const [key,station] of Object.entries(farmStations).filter(([,value])=>!Array.isArray(value)))
    add('region:farm',record(`farm:station:${key}`,'interactive-prop',`${key}-station`,'region:farm',station,`procedural:farm/station/${key}`,{name:`Farm ${key} station`}));
  for(const trough of farmStations.troughs)add('region:farm',record(`farm:trough:${trough.kind}`,'interactive-prop','feeding-trough','region:farm',trough,`procedural:farm/trough/${trough.kind}`,{name:`${trough.name} feeding trough`}));

  add('region:lake',record('lake:water','world-section','lake','region:lake',{x:0,y:0,z:0},'procedural:lake/water',{name:lake.name,
    collision:{shape:'ellipse',center:[lake.x,lake.level,lake.z],radiusX:lake.rx,radiusZ:lake.rz}}));
  add('region:lake',record('lake:dock','structure','dock','region:lake',{x:dock.x,y:dock.deck,z:dock.near},'procedural:lake/dock',{name:'Alder Lake dock',anchors:{berth:{position:[dock.berthX-dock.x,0,dock.berthZ-dock.near]}}}));
  add('region:lake',record('lake:boat','vehicle','fishing-boat','region:lake',{x:dock.berthX,y:lake.level,z:dock.berthZ,yaw:Math.PI},'procedural:lake/boat',{name:'Fishing boat',anchors:{board:{position:[0,.6,0]}}}));
  // The waterfall is one spatially batched world-coordinate assembly; its bound
  // group therefore has an identity frame rather than a misleading nominal pivot.
  add('region:lake',record('lake:falls','world-section','waterfall','region:lake',{x:0,y:0,z:0},'procedural:lake/waterfall',{name:'Alder Falls',anchors:{crest:{position:[falls.x,0,falls.z]}}}));

  add('region:mine',record('mine:portal','structure','mine-portal','region:mine',MINE.portal,'procedural:mine/portal',{name:'Nameless Mine portal',anchors:{entrance:{position:[0,0,0],forward:[0,0,-1]}}}));
  add('region:mine',record('mine:cart','vehicle','mine-cart','region:mine',MINE.entry,'procedural:mine/cart',{name:'Ore cart'}));
  add('region:mine',record('mine:forge','interactive-prop','forge','region:mine',MINE.yard,'procedural:mine/forge',{name:'Mine forge'}));

  const siteIds={'Alder Glade':'alder-glade','Fern Hollow':'fern-hollow','High Pines':'high-pines','Bracken Meadow':'bracken-meadow'};
  for(const site of forestSites)add('region:woodland',record(`woodland:site:${siteIds[site.name]}`,'world-section','wildlife-site','region:woodland',site,'procedural:woodland/site',{name:site.name}));
}

function bind(id,group,name){
  if(!group)return false;
  const current=worldObjects.get(id);
  if(current)registerWorldObject({...current,visual:{...current.visual,binding:'live-scene'}});
  group.name ||= name;worldObjects.bindGroup(id,group);
  return true;
}

export function bindCoreWorldCatalog({castle,farm,lake:lakeScene,mine,woodland,millWheel:millWheelVisual}={}){
  if(castle?.bridge?.root){
    const parentId=worldObjects.has('castle:surface')?'castle:surface':'region:castle',p=castle.bridge.root.position;
    add(parentId,record('castle:drawbridge','interactive-prop','drawbridge',parentId,{x:p.x,y:p.y,z:p.z},'procedural:castle/drawbridge',{
      name:'Thornmere drawbridge',transformSpace:'local',anchors:{winch:{position:[-2.72,.94,12.18]}}
    }));
  }
  if(castle?.dragon?.root){
    const parentId=worldObjects.has('castle:surface')?'castle:surface':'region:castle',p=castle.dragon.root.position;
    add(parentId,record('castle:dragon','character','dragon',parentId,{x:p.x,y:p.y,z:p.z},'procedural:castle/dragon',{
      name:'Aurelith',transformSpace:'local',anchors:{conversation:{position:[-2-p.x,-16-p.y,-5.7-p.z],forward:[0,0,-1]}}
    }));
  }
  bind('castle:drawbridge',castle?.bridge?.root,'world:castle:drawbridge');
  bind('castle:dragon',castle?.dragon?.root,'world:castle:dragon');
  bind('farm:tractor',farm?.vehicle?.roots?.tractor,'world:farm:tractor');
  bind('farm:wagon',farm?.vehicle?.roots?.wagon,'world:farm:wagon');
  bind('lake:boat',lakeScene?.objectRoots?.boat??lakeScene?.vesselRoot,'world:lake:boat');
  bind('lake:water',lakeScene?.objectRoots?.water,'world:lake:water');
  bind('lake:dock',lakeScene?.objectRoots?.dock,'world:lake:dock');
  bind('lake:falls',lakeScene?.objectRoots?.falls,'world:lake:falls');
  bind('mine:cart',mine?.objectRoots?.cart,'world:mine:cart');
  bind('mine:portal',mine?.objectRoots?.portal,'world:mine:portal');
  bind('mine:forge',mine?.objectRoots?.forge,'world:mine:forge');
  bind('mill:water-wheel',millWheelVisual?.root,'world:mill:water-wheel');
  const siteIds={'Alder Glade':'alder-glade','Fern Hollow':'fern-hollow','High Pines':'high-pines','Bracken Meadow':'bracken-meadow'};
  for(const site of forestSites)bind(`woodland:site:${siteIds[site.name]}`,woodland?.objectRoots?.sites?.[siteIds[site.name]],`world:woodland:site:${siteIds[site.name]}`);
  const tracked=['castle:drawbridge','castle:dragon','farm:tractor','farm:wagon','lake:boat','lake:water','lake:dock','lake:falls','mine:cart','mine:portal','mine:forge','mill:water-wheel',...Object.values(siteIds).map(id=>`woodland:site:${id}`)];
  return {
    bound:tracked.filter(id=>worldObjects.binding(id)),
    unbound:tracked.filter(id=>!worldObjects.binding(id))
  };
}
