import {bridgeZ,plots,riverX} from './layout.js';
import {farmStations} from './farm-layout.js';
import {dock,falls,lake,lakePoint,lakeRadius,onLakeDock} from './lake-layout.js';
import {forestSites} from './forest-species.js';
import {estate,trail,castleLocalToWorld} from './estate.js';
import {CATACOMB,catacombElevation,catacombWorld} from './catacomb-layout.js';
import {MINE,minePoint} from './mine-layout.js';
import {millWheel} from './hydraulics.js';
import {height as worldHeight} from './world-height.js';

const point=(x,y,z)=>Object.freeze([x,y,z]);
const groundPoint=(x,z,lift=1.57)=>point(x,worldHeight(x,z)+lift,z);
const targetPoint=(x,z,lift=.9)=>point(x,worldHeight(x,z)+lift,z);

function shot(name,region,duration,from,to,lookAt,lookTo=lookAt,extra={}){
  return Object.freeze({name,region,duration,from,to,lookAt,lookTo,...extra});
}

function roomShot(plot,index){
  const side=index%2?-1:1;
  return shot(
    `${plot.name} interior`,`room:${plot.id}`,5,
    point(side*.88,1.57,1.72),point(-side*.42,1.57,.72),
    point(-side*.35,1.32,-1.85),point(side*.72,1.18,-2.55),
    {room:plot.id,cut:true},
  );
}

function castlePoint(x,z,floor=0,lift=1.57){
  const p=castleLocalToWorld(x,z,floor+lift);
  return point(p.x,p.y,p.z);
}

function cryptPoint(x,z,lift=1.57){
  const p=catacombWorld(x,z),floor=catacombElevation(x,z,CATACOMB.entryY);
  return point(p.x,(floor??CATACOMB.entryY)+lift,p.z);
}

function mineCamera(progress,lift=1.48){
  const p=minePoint(progress);
  return point(p.x,p.y+lift,p.z);
}

function mineShot(name,progress,layer){
  return shot(name,'ore-mine',5,
    mineCamera(progress),mineCamera(progress+.004),
    mineCamera(progress+.008,.92),mineCamera(progress+.011,.92),
    {layer,cut:true,handoffProgress:Object.freeze([progress,progress+.004])});
}

const village=[];
village.push(
  shot('Briarwick village arrival','village',6,
    groundPoint(4.8,28,5.2),groundPoint(3.1,22.8,4.4),
    targetPoint(3.8,13,1.6),targetPoint(.8,8,1.3),{cut:true}),
  shot('Village rooftops, windmill and hilltop clock','village',7,
    point(-4,19,35),point(0,17,30),
    point(-24,6.8,-15.5),point(15,8.2,-19.5)),
  shot('Brook crossing','village',5,
    point(riverX(bridgeZ-8),6.4,bridgeZ-8),point(riverX(bridgeZ-5.4),4.7,bridgeZ-5.4),
    point(riverX(bridgeZ),1.35,bridgeZ),point(riverX(bridgeZ)+.75,1.41,bridgeZ)),
);
const millPlot=plots.find(plot=>plot.id==='mill'),wheelSideX=Math.cos(millWheel.a),wheelSideZ=-Math.sin(millWheel.a);
village.push(shot('Mill wheel and brook race','village',6,
  point(millWheel.x-wheelSideX*4.7,millWheel.y+1.8,millWheel.z-wheelSideZ*4.7),
  point(millWheel.x-wheelSideX*3.4,millWheel.y+1.6,millWheel.z-wheelSideZ*3.4),
  point(millWheel.x,millWheel.y,millWheel.z),point(millWheel.x,millWheel.waterline+.25,millWheel.z+1.2)));
village.push(...plots.map(roomShot));

const water=farmStations.water,feed=farmStations.feed,store=farmStations.store;
const farmShots=[
  shot('Briarwick Commons Farm overview','farm',7,
    point(-42,12,14),point(-50,9,22),point(-82,1.2,52),point(-88,1.1,67),{cut:true}),
  shot('Farm work stations','farm',6,
    groundPoint(water.x+5.2,water.z-2.1,1.9),groundPoint(water.x+4.0,water.z-.4,1.8),
    targetPoint(water.x,water.z,1.0),targetPoint(feed.x,feed.z,1.0)),
  shot('Farm tractor and harvest wagon','farm',5,
    groundPoint(-72.2,27.2,1.95),groundPoint(-70.5,28.2,1.82),
    targetPoint(-67.45,28.6,1.0),targetPoint(-67.45,33.57,.9)),
  shot('Dairy cattle and milking stalls','farm',6,
    groundPoint(-89.6,39.5,2.0),groundPoint(-91,34.2,1.8),
    targetPoint(-101,41,1.15),targetPoint(-86.5,28,1.0)),
  shot('Free-range hens and egg station','farm',5,
    groundPoint(-81,38,1.9),groundPoint(-79.2,43,1.75),
    targetPoint(-73.5,42,1.0),targetPoint(farmStations.eggs.x,farmStations.eggs.z,.8)),
  shot('Pigs in the pasture and shelter','farm',5,
    groundPoint(-66,39,1.9),groundPoint(-64.5,44,1.75),
    targetPoint(-56,40,1.0),targetPoint(-58,47,.8)),
  shot('Lower crop fields','farm',6,
    groundPoint(-107,57,3.3),groundPoint(-95,57.5,3.0),
    targetPoint(-97,66,.8),targetPoint(-84,66,.8)),
  shot('Upper crop fields','farm',6,
    groundPoint(-84,75,3.0),groundPoint(-70,75,2.8),
    targetPoint(-83,84,.9),targetPoint(-60,84,.9)),
  shot('Harvest delivery and barn work','farm',5,
    groundPoint(store.x+2.2,store.z+6.5,1.95),groundPoint(store.x+.7,store.z+4.3,1.82),
    targetPoint(store.x,store.z,1.05),targetPoint(-86,24.5,1.5)),
];

const reed=lakePoint(Math.PI*.72,.86),shoal=lakePoint(2.32,.90);
const lakeShots=[
  shot('Alder Lake dock','lake',5,
    groundPoint(dock.x,dock.near+3.9,1.82),point(dock.x,dock.deck+1.57,dock.near+1.2),
    point(dock.x,lake.level+.55,dock.end),point(dock.berthX,lake.level+.9,dock.berthZ),{cut:true}),
  shot('Sailing across Alder Lake','lake',7,
    point(dock.berthX-7,2.9,dock.berthZ+3),point(dock.berthX-4,2.35,dock.berthZ+6),
    point(dock.berthX,2.0,dock.berthZ),point(dock.berthX,1.7,dock.berthZ)),
  shot('Fishing the deep water','lake',5,
    point(12,2.15,98),point(15,2.1,102),point(24,.15,106),point(28,.1,108)),
  shot('Lake wildlife in the reeds','lake',6,
    point(reed.x+5,2.3,reed.z-3),point(reed.x+3.3,2.0,reed.z-1.5),
    point(reed.x,.55,reed.z),point(reed.x-2,.65,reed.z+2)),
  shot('Lake shallows and fish schools','lake',5,
    point(shoal.x+1.5,3.3,shoal.z-2.6),point(shoal.x+.85,2.6,shoal.z-2.0),
    point(shoal.x,-.30,shoal.z),point(shoal.x,-.33,shoal.z)),
  shot('Alder Falls','lake',6,
    point(falls.x+14,26,falls.z-43),point(falls.x+5,6.4,falls.z-17),
    point(falls.x+2,12,falls.z+6),point(falls.x,4.8,falls.z+1.2)),
];

const trailA=trail.getPointAt(.07),trailB=trail.getPointAt(.19);
const woodlandShots=[
  shot('Pinewood woodland trail','woodland',7,
    groundPoint(trailA.x,trailA.z,1.75),groundPoint(trailB.x,trailB.z,1.75),
    targetPoint(trailB.x,trailB.z,1.1),targetPoint(trail.getPointAt(.26).x,trail.getPointAt(.26).z,1.1),{cut:true}),
  ...forestSites.map((site,index)=>index===3
    ?shot(`${site.name} forest site`,'woodland',5,
      groundPoint(95,20.5,1.68),groundPoint(95.5,19.2,1.68),
      targetPoint(96,16,1.05),targetPoint(97,16.5,1.05),{cut:true})
    :shot(`${site.name} forest site`,'woodland',5,
      groundPoint(site.x-4.5,site.z+5.5,1.72),groundPoint(site.x-2.7,site.z+4.1,1.72),
      targetPoint(site.x,site.z,1.0),targetPoint(site.x+(index%2?2:-2),site.z-1.5,1.0),
      {cut:true})),
];

const castleShots=[
  shot('Thornmere Castle exterior','castle-surface',7,
    groundPoint(estate.x+34,estate.z+50,10),groundPoint(estate.x+27,estate.z+43,7.5),
    castlePoint(0,5,8),castlePoint(0,14,5),{cut:true}),
  shot('Castle gate and drawbridge','castle-surface',6,
    groundPoint(estate.x+4,estate.z+39,2.2),groundPoint(estate.x+2,estate.z+34,1.8),
    castlePoint(0,24,3),castlePoint(0,20,2.5)),
  shot('Castle courtyard','castle-surface',6,
    castlePoint(2,17,0),castlePoint(-1,12,0),castlePoint(-4.8,3.1,1),castlePoint(0,-5,2)),
  shot('Castle battlements','castle-battlements',6,
    castlePoint(23.4,13,4.8),castlePoint(23.4,6,4.8),castlePoint(0,5,2),castlePoint(0,-10,4),{cut:true}),
  shot('Castle service wings · Armoury','castle-service-west',5,
    castlePoint(-13.1,4.1),castlePoint(-13.8,4.4),
    castlePoint(-17.45,5.6,0,1.2),castlePoint(-17.8,5.6,0,1.1),{cut:true}),
  shot('Castle service wings · Infirmary','castle-service-east',5,
    castlePoint(13.05,.48),castlePoint(13.6,1.42),
    castlePoint(17.4,.13,0,.78),castlePoint(18.7,1.2,0,.92),{cut:true}),
  shot('Great hall and throne','castle-keep',6,
    castlePoint(0,-5.8,0),castlePoint(0,-8.4,0),castlePoint(0,-15.1,1.15),castlePoint(0,-14.6,1.5),{cut:true}),
  shot('Council chamber','castle-keep',5,
    castlePoint(3.3,-7.2,4.8),castlePoint(2.3,-8.3,4.8),castlePoint(-.9,-10.53,5.7),castlePoint(-2,-11.2,5.5),{cut:true}),
  shot('Royal library','castle-keep',5,
    castlePoint(-7.2,-6.8,4.8),castlePoint(-8.2,-7.6,4.8),castlePoint(-14,-11.4,6.2),castlePoint(-11,-8.9,5.8),{cut:true}),
  shot('Royal treasury','castle-keep',5,
    castlePoint(-7.2,-14.1,4.8),castlePoint(-8.1,-14.5,4.8),castlePoint(-13.6,-15.6,5.65),castlePoint(-11.5,-15.6,5.55),{cut:true}),
  shot('King’s chamber','castle-royal',6,
    castlePoint(7.48,-10.42,4.8),castlePoint(8.2,-11.4,4.8),castlePoint(12.1,-14.2,6),castlePoint(12.1,-14.2,5.5),{cut:true}),
  shot('Prison galleries','castle-prison',5,
    castlePoint(-5.8,-4.5,-4.8),castlePoint(-6.8,-5.8,-4.8),
    castlePoint(-9,-7,-3.5),castlePoint(-14,-7,-3.5),{cut:true}),
  shot('Royal crypt','castle-prison',5,
    castlePoint(7.2,-8,-4.8),castlePoint(8.1,-8,-4.8),
    castlePoint(13.8,-8,-3.55),castlePoint(14.2,-10.5,-3.55),{cut:true}),
  shot('Dragon viewing gallery','castle-dungeon',6,
    castlePoint(-5.8,-12.3,-10.45),castlePoint(-2.7,-12.5,-10.45),castlePoint(1,-4,-14),castlePoint(7,2,-14.2),{layer:1,cut:true}),
  shot('Dragon hoard','castle-dungeon',7,
    castlePoint(6.5,-8.3,-16),castlePoint(4,-6.5,-16),castlePoint(-3,3,-14.6),castlePoint(-10,7,-14.8),{layer:1,cut:true}),
  shot('Dragon dungeon side chambers','castle-dungeon',6,
    castlePoint(22.2,1.5,-16),castlePoint(23.8,.3,-16),castlePoint(27,-.8,-14.7),castlePoint(25,9,-14.8),{layer:1,cut:true}),
];

const cryptShots=[
  shot('Briar Crypts catacomb entrance','catacomb',5,
    cryptPoint(0,6),cryptPoint(0,3),cryptPoint(0,-2,1),cryptPoint(0,-5,1),{layer:2,cut:true}),
  shot('Catacomb first descent','catacomb',6,
    cryptPoint(0,-1),cryptPoint(0,-10),cryptPoint(0,-12,1),cryptPoint(0,-15,1),{layer:2}),
  shot('Bell Crypt','catacomb',5,
    cryptPoint(7,-24),cryptPoint(7,-27),cryptPoint(7,-31,1),cryptPoint(4,-34,1),{layer:2,cut:true}),
  shot('Sunken Rotunda','catacomb',5,
    cryptPoint(43,-19),cryptPoint(45,-20),cryptPoint(44,-24,1),cryptPoint(43,-25,1),{layer:2,cut:true}),
  shot('Ossuary gallery','catacomb',6,
    cryptPoint(39,-47),cryptPoint(34,-47),cryptPoint(27,-47,1.2),cryptPoint(22,-47,1.2),{layer:2,cut:true}),
  shot('Chapel of the Watchers','catacomb',6,
    cryptPoint(29,-62),cryptPoint(29,-66),cryptPoint(29,-72,1.1),cryptPoint(25,-73,1.1),{layer:2,cut:true}),
  shot('Nameless catacomb sanctum','catacomb',6,
    cryptPoint(2,-70),cryptPoint(0,-72),cryptPoint(-5,-75,1),cryptPoint(-9,-75,1),{layer:2,cut:true}),
];

const mineShots=[
  mineShot('Ore minehead at depth',.006,2),
  mineShot('The Copper Sweeps',.22,3),
  mineShot('The Long Haul',.50,3),
  mineShot('Upper Drift',.80,3),
  shot('Town rail yard and ore unloading','rail-yard',6,
    groundPoint(MINE.yard.x+4,MINE.yard.z+3,2.15),groundPoint(MINE.yard.x+2.4,MINE.yard.z+2.2,1.85),
    point(MINE.yard.x,MINE.yard.y+.8,MINE.yard.z),point(MINE.portal.x,MINE.portal.y+1,MINE.portal.z),{cut:true}),
  shot('Brook Armory forge','room:mill',6,
    point(-1.65,1.57,.7),point(-2.15,1.57,.15),
    point(-3.50,1.05,-.92),point(-4.41,1.15,-4.40),
    {room:'mill',cut:true}),
];

export const tourStops=Object.freeze([
  ...village,...farmShots,...lakeShots,...woodlandShots,...castleShots,...cryptShots,...mineShots,
]);

export const tourDuration=tourStops.reduce((seconds,stop)=>seconds+stop.duration,0);
export const tourPlaybackRates=Object.freeze([0,.25,.5,1,1.5,2,4]);
const ends=[];
let running=0;
for(const stop of tourStops)ends.push(running+=stop.duration);

function interpolate(out,a,b,t){
  const eased=t*t*(3-2*t);
  out.set(
    a[0]+(b[0]-a[0])*eased,
    a[1]+(b[1]-a[1])*eased,
    a[2]+(b[2]-a[2])*eased,
  );
}

/** Sample the looping itinerary into caller-owned vectors and return its current shot. */
export function sampleTour(seconds,eye,aim){
  const value=Number.isFinite(seconds)?seconds:0;
  const time=((value%tourDuration)+tourDuration)%tourDuration;
  let low=0,high=ends.length-1;
  while(low<high){
    const middle=(low+high)>>1;
    if(time<ends[middle])high=middle;else low=middle+1;
  }
  const index=low,stop=tourStops[index],start=index?ends[index-1]:0;
  const progress=(time-start)/stop.duration;
  interpolate(eye,stop.from,stop.to,progress);
  interpolate(aim,stop.lookAt,stop.lookTo,progress);
  return stop;
}

const samplePoint=()=>({x:0,y:0,z:0,set(x,y,z){this.x=x;this.y=y;this.z=z;}});

/**
 * Describe the playable state nearest a tour frame. The caller resolves final
 * collision against the live scene, but enclosed floor hints are exact and the
 * timestamp is normalized so it can be persisted and resumed verbatim.
 */
export function tourHandoff(seconds){
  const value=Number.isFinite(seconds)?seconds:0;
  const time=((value%tourDuration)+tourDuration)%tourDuration;
  const eye=samplePoint(),aim=samplePoint(),stop=sampleTour(time,eye,aim);
  const dx=aim.x-eye.x,dy=aim.y-eye.y,dz=aim.z-eye.z;
  const horizontal=Math.hypot(dx,dz);
  let domain='world',floor=null,room=null,x=eye.x,z=eye.z;
  if(stop.room){domain='room';room=stop.room;floor=0;}
  else if(stop.region==='catacomb'){domain='catacomb';floor=eye.y-1.57;}
  else if(stop.region==='ore-mine'){
    domain='mine';
    const index=tourStops.indexOf(stop),start=index?ends[index-1]:0,linear=(time-start)/stop.duration,eased=linear*linear*(3-2*linear);
    const progress=stop.handoffProgress[0]+(stop.handoffProgress[1]-stop.handoffProgress[0])*eased,point=minePoint(progress);
    x=point.x;z=point.z;floor=point.y;
  }
  else if(stop.region?.startsWith('castle-')){
    domain='castle';
    if(stop.region!=='castle-surface'||stop.name==='Castle courtyard')floor=eye.y-1.57;
  }else if(stop.region==='lake'&&lakeRadius(eye.x,eye.z)<.995&&!onLakeDock(eye.x,eye.z))domain='lake';
  return Object.freeze({time,stop,domain,room,x,z,floor,
    yaw:Math.atan2(-dx,-dz),pitch:Math.atan2(dy,horizontal)});
}

export function restoreTourCheckpoint(saved){
  if(!Number.isFinite(saved?.time)||!tourPlaybackRates.includes(saved?.rate))return null;
  return {time:tourHandoff(saved.time).time,rate:saved.rate};
}
