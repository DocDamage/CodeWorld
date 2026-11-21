const ORIGIN=Object.freeze({x:114,z:-4});
export const CATACOMB=Object.freeze({
  ...ORIGIN,
  entryY:4.72,
  name:'The Briar Crypts',
  entry:Object.freeze({x:130,z:-4,yaw:Math.PI/2}),
  sanctum:Object.freeze({x:41,z:-4,y:-47.28,yaw:Math.PI/2}),
});

const d1=CATACOMB.entryY-10,d2=CATACOMB.entryY-20,d3=CATACOMB.entryY-30,d4=CATACOMB.entryY-40,deep=CATACOMB.entryY-52;
const clamp01=value=>Math.max(0,Math.min(1,value));
const mix=(a,b,t)=>a+(b-a)*clamp01(t);
const zones=[
  {name:'Briar Crypt Entrance',x1:-2.35,x2:2.35,z1:2,z2:7,floor:()=>CATACOMB.entryY},
  {name:'The First Descent',x1:-2,x2:2,z1:-16,z2:2,floor:(_x,z)=>mix(d1,CATACOMB.entryY,(z+16)/18)},
  {name:'The Lantern Landing',x1:-6,x2:24,z1:-22,z2:-16,floor:()=>d1},
  {name:'The Bell Crypt',x1:5,x2:9,z1:-30,z2:-22,floor:()=>d1},
  {name:'The Bell Crypt',x1:-3,x2:16,z1:-38,z2:-30,floor:()=>d1},
  {name:'The Second Descent',x1:24,x2:40,z1:-22,z2:-16,floor:x=>mix(d1,d2,(x-24)/16)},
  {name:'The Sunken Rotunda',x1:40,x2:48,z1:-26,z2:-14,floor:()=>d2},
  {name:'The Third Descent',x1:42,x2:48,z1:-44,z2:-26,floor:(_x,z)=>mix(d3,d2,(z+44)/18)},
  {name:'The Ossuary Gallery',x1:20,x2:48,z1:-50,z2:-44,floor:()=>d3},
  {name:'Chapel of the Watchers',x1:27,x2:32,z1:-60,z2:-50,floor:()=>d3},
  {name:'Chapel of the Watchers',x1:17,x2:42,z1:-76,z2:-60,floor:()=>d3},
  {name:'The Fourth Descent',x1:2,x2:20,z1:-50,z2:-44,floor:x=>mix(d4,d3,(x-2)/18)},
  {name:'Pilgrims’ Return',x1:-8,x2:2,z1:-52,z2:-42,floor:()=>d4},
  {name:'The Fifth Descent',x1:-6,x2:0,z1:-68,z2:-52,floor:(_x,z)=>mix(deep,d4,(z+68)/16)},
  {name:'The Nameless Sanctum',x1:-12,x2:8,z1:-78,z2:-68,floor:()=>deep},
];

export function catacombWorld(x,z){return {x:ORIGIN.x+z,z:ORIGIN.z-x};}
function local(x,z){return {x:ORIGIN.z-z,z:x-ORIGIN.x};}
function candidates(x,z){
  const p=local(x,z);
  return zones.filter(zone=>p.x>=zone.x1&&p.x<=zone.x2&&p.z>=zone.z1&&p.z<=zone.z2)
    .map(zone=>({zone,y:zone.floor(p.x,p.z)}));
}

export function catacombContainsLocal(x,z){
  return zones.some(zone=>x>=zone.x1&&x<=zone.x2&&z>=zone.z1&&z<=zone.z2);
}

export function catacombElevation(x,z,preferred=CATACOMB.entryY){
  const available=zones.filter(zone=>x>=zone.x1&&x<=zone.x2&&z>=zone.z1&&z<=zone.z2)
    .map(zone=>zone.floor(x,z)).sort((a,b)=>Math.abs(a-preferred)-Math.abs(b-preferred));
  return available[0]??null;
}

export function catacombNearby(x,z){
  const p=local(x,z);return p.x>-15&&p.x<51&&p.z>-81&&p.z<11;
}

export function catacombTerrainCut(x,z,margin=0){
  const p=local(x,z);return Math.abs(p.x)<2.7+margin&&p.z>-8-margin&&p.z<8+margin;
}

export function catacombAt(x,z,y,tolerance=.65){
  return candidates(x,z).some(candidate=>Math.abs(candidate.y-y)<=tolerance);
}

export function catacombFloor(x,z,previous=CATACOMB.entryY,surfaceY=CATACOMB.entryY){
  const p=local(x,z),available=candidates(x,z).sort((a,b)=>Math.abs(a.y-previous)-Math.abs(b.y-previous));
  if(available.length&&Math.abs(available[0].y-previous)<.32)return available[0].y;
  if(Math.abs(p.x)<=2.35&&p.z>6&&p.z<10.5&&Math.abs(previous-surfaceY)<.55)return surfaceY;
  return null;
}

export function catacombLocation(x,z,y=CATACOMB.entryY){
  const priority=['The Nameless Sanctum','Pilgrims’ Return','The Sunken Rotunda'];
  const rank=name=>{const index=priority.indexOf(name);return index<0?priority.length:index;};
  const available=candidates(x,z).sort((a,b)=>Math.abs(a.y-y)-Math.abs(b.y-y)||rank(a.zone.name)-rank(b.zone.name));
  return available[0]?.zone.name??(catacombNearby(x,z)?CATACOMB.name:'');
}

export const CATACOMB_ZONES=Object.freeze(zones.map(({name,x1,x2,z1,z2})=>Object.freeze({name,x1,x2,z1,z2})));
