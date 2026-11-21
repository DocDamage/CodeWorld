export const lake = Object.freeze({name:'Alder Lake', x:26, z:104, rx:38, rz:44, level:0});
export const dock = Object.freeze({x:26, near:56.8, end:67.2, width:1.8, deck:.62, berthX:23.95, berthZ:66.7});
const clamp = (value,lo,hi) => Math.max(lo,Math.min(hi,value));

// Offset the shore with coves, keeping the northern jetty on the same meridian.
function coast(a){
  return 1+.053*Math.sin(3*(a+Math.PI/2))+.038*Math.sin(5*(a+Math.PI/2));
}
export function lakePoint(a,r){
  const radius=r*coast(a);
  return {x:lake.x+lake.rx*radius*Math.cos(a),z:lake.z+lake.rz*radius*Math.sin(a)};
}
export function lakeRadius(x,z){
  const dx=(x-lake.x)/lake.rx,dz=(z-lake.z)/lake.rz;
  return Math.hypot(dx,dz)/coast(Math.atan2(dz,dx));
}
export const falls = lakePoint(Math.PI*.4,.97);
export function lakeDepth(x,z){
  const r=lakeRadius(x,z);
  return Math.max(0,(1-r)*(6.5+2*Math.sin(x*.13+z*.07))+4*Math.max(0,.68-r));
}
export function lakeHeight(x,z){
  const r=lakeRadius(x,z);
  if(r<1)return lake.level-lakeDepth(x,z);
  const hills=2.4+.85*Math.sin(x*.17)+.66*Math.cos(z*.21)+.42*Math.cos(x*.25+z*.19);
  return lake.level+Math.min(1,(r-1)*4.6)*hills;
}
export function lakeHabitat(x,z){
  if(Math.hypot(x-falls.x,z-falls.z)<12)return 'falls';
  const r=lakeRadius(x,z);
  if(r>.77&&(x<lake.x-2||z>lake.z+7))return 'reeds';
  return r>.71?'shallows':'open water';
}
export const onLakeDock=(x,z)=>Math.abs(x-dock.x)<=dock.width*.5&&z>=dock.near&&z<=dock.end;
export const atLake=(x,z)=>z>54&&lakeRadius(x,z)<1.31;
export function lakeWalkable(x,z){
  return onLakeDock(x,z)||lakeRadius(x,z)>=1.002;
}
export function lakeWind(t,gust){
  const bearing=1.73+.24*Math.sin(t*.033)+.09*Math.sin(t*.14);
  if(typeof gust==='object'){
    const speed=1.5+8*clamp(gust.gust,0,1.65);
    return {x:gust.windX*speed,z:gust.windZ*speed,speed};
  }
  const speed=1.5+8*clamp(gust,0,1.3);
  return {x:speed*Math.sin(bearing),z:speed*Math.cos(bearing),speed};
}
