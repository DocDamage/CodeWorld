import {forestSites} from './forest-species.js';
import {minePoint} from './mine-layout.js';
import {dock,lake,falls} from './lake-layout.js';
import {estate,trailhead,trailYaw} from './estate.js';
import {farm,inFarm,farmStations} from './farm-layout.js';
import {plots,riverX,springZ} from './layout.js';
import {walkHeight} from './land.js';
import {millWheel} from './hydraulics.js';
import {v} from './model.js';

export function closePlaces(){
  document.getElementById('places').setAttribute('aria-expanded','false');
  document.getElementById('placeList').hidden=true;
}
export function installPlaces({navigation,catacomb,mine,hunting,farmScene}){
  const {enterWalk,startTour,restartTour,checkDoor,showView}=navigation;
  const {vehicle}=farmScene,menu=document.getElementById('placeList'),toggle=document.getElementById('places');
  const entrances=new Map([['#play',enterWalk],['#tour',startTour]]);
  function place(name,visit,hash){
    const button=document.createElement('button');button.type='button';button.textContent=name;
    button.onclick=()=>{closePlaces();visit();};menu.append(button);
    if(hash)entrances.set(hash,button.onclick);
  }
  place('Village overlook',()=>navigation.overlook(true));
  for(const plot of plots)place(plot.name,()=>navigation.visitBuilding(plot));
  place('Woodland trail',()=>enterWalk(trailhead.x,trailhead.z,trailYaw,0),'#woodland-trail');
  place('Thornmere Castle',navigation.visitCastle,'#thornmere-castle');
  for(const [id,name,x,z,y,a,p] of [
    ['kings-chamber','King’s chamber',17.94,-10.46,4.8,.84,-.075],
    ['dragon-gallery','Dragon viewing gallery',-5.8,-12.3,-10.45,-2.79,-.17]]){
    place(name,()=>{enterWalk(estate.x+x,estate.z+z,a,p,estate.y+y);checkDoor(false);},'#'+id);
  }
  place('Dragon hoard',()=>enterWalk(estate.x+10.4,estate.z-9.4,2.23,.21,estate.y-16),'#dragon-hoard');
  place(catacomb.name,()=>enterWalk(catacomb.entry.x,catacomb.entry.z,catacomb.entry.yaw,-.14),'#briar-crypts');
  place(mine.name,()=>{
    const point=minePoint(mine.state.veins[0].progress),cart=mine.cart.pose;
    enterWalk(point.x,point.z,Math.atan2(point.x-cart.x,point.z-cart.z),-.17,point.y);checkDoor(false);
  },'#ore-mine');
  place('Blacksmith rail yard',()=>{
    const x=mine.yard.x+5.1,z=mine.yard.z+4.2;
    enterWalk(x,z,Math.atan2(x-mine.portal.x,z-mine.portal.z),.08,walkHeight(x,z));checkDoor(false);
  },'#armory-rail-yard');
  place('Blacksmith forge',navigation.visitForge,'#blacksmith-forge');
  place(lake.name,()=>{enterWalk(dock.x,dock.near+3.8,Math.PI-.15,-.075);checkDoor(false);},'#alder-lake');
  place('Alder Falls',()=>showView(v(falls.x+14,26,falls.z-43),v(falls.x+2,12,falls.z+6),1.4,90),'#alder-falls');
  for(const [i,site] of forestSites.entries()){
    place(i===0?'Pinewood hunting trail':site.name,()=>{
      const p=hunting.arrival(i);enterWalk(p.x,p.z,p.yaw,p.pitch);
    },i===0?'#pinewood-hunting':'#'+site.name.toLowerCase().replaceAll(' ','-'));
  }
  place(farm.name,()=>enterWalk(farm.entry.x,farm.entry.z,farm.entry.a,.045),'#commons-farm');
  place('Dairy stalls',()=>{enterWalk(-86.5,27.96,1.33,-.09);checkDoor(false);});
  place('Crop fields',()=>enterWalk(-100.5,61.7,2.34,-.13),'#crop-fields');
  place('Farm tractor',()=>{
    const {x,z,yaw}=vehicle.pose,at=vehicle.mounted?vehicle.dismount(true):null;
    const spot=[[x+1.65,z],[x-1.65,z],[x,z-1.87],[x,z+2]].find(([xx,zz])=>inFarm(xx,zz)&&farmScene.clear(xx,zz));
    enterWalk(spot?.[0]??at?.x??farm.entry.x,spot?.[1]??at?.z??farm.entry.z,spot?Math.atan2(spot[0]-x,spot[1]-z):yaw,-.05);checkDoor(false);
  });
  for(const [name,site] of [['Water tower',farmStations.water],['Hen house',farmStations.eggs],['Hen trough',farmStations.troughs[1]],['Cattle trough',farmStations.troughs[0]],['Pig trough',farmStations.troughs[2]],['Grain bin',farmStations.feed]]){
    place(name,()=>{enterWalk(site.x,site.z-1.10,Math.PI,-.13);checkDoor(false);});
  }
  place('Pig wallow',()=>enterWalk(-59.5,40.4,-.88,-.25),'#pig-wallow');
  place('Farm overlook',()=>{const {x,y,z}=farm.overview;showView(v(x+15,y,z+6),v(-78,1.1,54),1.55,137);});
  place('Mill wheel',()=>{
    const x=millWheel.x-5.85,z=millWheel.z+4.25;
    if(navigation.isWalking())enterWalk(x,z,-1.20,-.12);
    else showView(v(x,5.15,z),v(millWheel.x,millWheel.y,millWheel.z),1.15);
  },'#mill-wheel');
  place('Brook riffles',()=>enterWalk(riverX(29.8)+2.65,29.8,.49,-.29),'#brook');
  place('Brook spring',()=>enterWalk(riverX(springZ)+3.7,springZ+4.8,.66,-.22),'#brook-spring');
  place('Restart tour',restartTour);
  toggle.onclick=()=>{const open=menu.hidden;menu.hidden=!open;toggle.setAttribute('aria-expanded',open);};
  document.addEventListener('pointerdown',e=>{if(!e.target.closest('.dock'))closePlaces();});
  return ()=>entrances.get(location.hash)?.();
}
