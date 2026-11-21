const clamp01=value=>Math.max(0,Math.min(1,Number(value)||0));
const mix=(a,b,t)=>a+(b-a)*t;

export const MINE=Object.freeze({
  name:'Briarwick Ore Mine',
  entry:Object.freeze({x:41,z:7,y:-47.28,yaw:0}),
  // These are the actual land.height values at the two surface rail points.
  portal:Object.freeze({x:-3.2,z:6.15,y:.40208686038486086,yaw:0}),
  yard:Object.freeze({x:-3.2,z:10.10,y:.3936135083104251,yaw:0}),
  capacity:6,
});

// Three long, monotonic sweeps make the required 48 m rise without crossings.
// Elevation is assigned from horizontal distance, so even the turnarounds retain
// the same gentle grade instead of becoming steep where their plan view turns.
const raw=[];
for(let i=0;i<=240;i++){
  const t=i/240;
  raw.push({
    x:mix(MINE.entry.x,MINE.portal.x,t),
    z:mix(MINE.entry.z,MINE.portal.z,t)+42*Math.sin(Math.PI*6*t),
  });
}
let horizontal=0;
for(let i=1;i<raw.length;i++)horizontal+=Math.hypot(raw[i].x-raw[i-1].x,raw[i].z-raw[i-1].z);
let run=0;
const nodes=raw.map((point,index)=>{
  if(index)run+=Math.hypot(point.x-raw[index-1].x,point.z-raw[index-1].z);
  return Object.freeze({...point,y:mix(MINE.entry.y,MINE.portal.y,run/horizontal)});
});
nodes.push(MINE.yard);

const cumulative=[0];
for(let i=1;i<nodes.length;i++)cumulative.push(cumulative[i-1]+Math.hypot(
  nodes[i].x-nodes[i-1].x,nodes[i].y-nodes[i-1].y,nodes[i].z-nodes[i-1].z,
));
export const MINE_ROUTE_LENGTH=cumulative.at(-1);
export const MINE_ROUTE=Object.freeze(nodes);
export const MINE_PORTAL_PROGRESS=cumulative.at(-2)/MINE_ROUTE_LENGTH;

function segmentForDistance(distance){
  let low=0,high=cumulative.length-1;
  while(low+1<high){const mid=(low+high)>>1;if(cumulative[mid]<=distance)low=mid;else high=mid;}
  return Math.min(low,nodes.length-2);
}

export function minePoint(progress){
  const distance=clamp01(progress)*MINE_ROUTE_LENGTH,index=segmentForDistance(distance);
  const span=cumulative[index+1]-cumulative[index]||1,t=(distance-cumulative[index])/span;
  const a=nodes[index],b=nodes[index+1];
  return {x:mix(a.x,b.x,t),y:mix(a.y,b.y,t),z:mix(a.z,b.z,t)};
}

export function mineTangent(progress){
  const epsilon=.35/MINE_ROUTE_LENGTH,a=minePoint(clamp01(progress-epsilon)),b=minePoint(clamp01(progress+epsilon));
  const length=Math.hypot(b.x-a.x,b.y-a.y,b.z-a.z)||1;
  return {x:(b.x-a.x)/length,y:(b.y-a.y)/length,z:(b.z-a.z)/length};
}

function candidates(x,z,radius=1.42){
  const found=[];
  for(let i=0;i<nodes.length-1;i++){
    const a=nodes[i],b=nodes[i+1],dx=b.x-a.x,dz=b.z-a.z,length2=dx*dx+dz*dz;
    const t=Math.max(0,Math.min(1,length2?((x-a.x)*dx+(z-a.z)*dz)/length2:0));
    const px=mix(a.x,b.x,t),pz=mix(a.z,b.z,t),distance=Math.hypot(x-px,z-pz);
    if(distance>radius)continue;
    const routeDistance=mix(cumulative[i],cumulative[i+1],t);
    found.push({distance,y:mix(a.y,b.y,t),progress:routeDistance/MINE_ROUTE_LENGTH});
  }
  return found;
}

export function mineTrackProgress(x,z,y=0){
  return candidates(x,z,3.1).sort((a,b)=>Math.abs(a.y-y)-Math.abs(b.y-y)||a.distance-b.distance)[0]?.progress??null;
}

export function mineAt(x,z,y,tolerance=.72){
  return candidates(x,z).some(candidate=>Math.abs(candidate.y-y)<=tolerance);
}

export function mineNearby(x,z){
  if(x<MINE.portal.x-8||x>MINE.entry.x+8||z<-51||z>50)return false;
  return candidates(x,z,8).length>0;
}

export function mineFloor(x,z,previous,ground=previous){
  // Prefer the centreline beneath the traveller. Vertical proximity only breaks
  // ties where separate sweeps pass alongside one another.
  const available=candidates(x,z).sort((a,b)=>a.distance-b.distance||Math.abs(a.y-previous)-Math.abs(b.y-previous));
  if(available.length&&Math.abs(available[0].y-previous)<.32)return available[0].y;
  const atSurface=Math.hypot(x-MINE.yard.x,z-MINE.yard.z)<4.5;
  if(atSurface&&Math.abs(ground-MINE.yard.y)<.55)return ground;
  return null;
}

export function mineLocation(x,z,y=MINE.entry.y){
  const progress=mineTrackProgress(x,z,y);
  if(progress===null)return '';
  if(progress<.07)return 'Sanctum Minehead';
  if(progress<.34)return 'The Copper Sweeps';
  if(progress<.67)return 'The Long Haul';
  if(progress<.965)return 'Upper Drift';
  return 'Brook Armory Unloading Yard';
}

export function mineLayer(x,z,y){
  const progress=mineTrackProgress(x,z,y);
  if(progress===null)return 0;
  if(progress<.025)return 2;
  return progress<MINE_PORTAL_PROGRESS?3:0;
}

export function mineTerrainCut(x,z,margin=0){
  const dz=z-MINE.portal.z;
  return Math.abs(x-MINE.portal.x)<1.92+margin && dz>=-4.98-margin && dz<.5+margin;
}

export function mineCatacombDoorway(localX,localZ,margin=0){
  return Math.abs(localX+12)<.72+margin&&Math.abs(localZ+73)<2.05+margin;
}
