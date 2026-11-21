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
const ease=(a,b,x)=>{const t=clamp((x-a)/(b-a),0,1);return t*t*(3-2*t);};
export const lipZ=falls.z+2.9,alderSource=51;
// Distance upstream from the lip. The last reach expands into a tarn under the snowfield.
export const alderX=s=>falls.x+5.2*Math.sin(s*.075)**2-3.6*Math.sin(s*.142)**3+.048*s;
export const alderWidth=s=>2.48-.025*Math.max(0,s)+2.2*Math.exp(-(((s-46)/3.1)**2))
  +ease(0,5,s)*(.31*Math.sin(s*.51)+.16*Math.sin(s*.89));
export const alderStage=s=>9.6+.17*Math.min(s,42)+.019*Math.max(0,s-42)+5.4*ease(5,21,s)+5.9*ease(24,41,s);
export function alderInfluence(x,z){
  const s=z-lipZ,side=Math.abs(x-alderX(clamp(s,0,alderSource)));
  return (1-ease(16,37,side))*ease(-9,-.9,s)*(1-ease(60,78,s));
}
export function alderGround(x,z,base){
  if(z<lipZ-9||z>lipZ+78||Math.abs(x-falls.x)>47)return base;
  const weight=alderInfluence(x,z);
  if(!weight)return base;
  const s=z-lipZ,station=clamp(s,0,alderSource),d=Math.abs(x-alderX(station)),bank=d-alderWidth(station);
  const rock=.9*Math.sin(x*.68+z*.36)+.65*Math.sin(x*.32-z*.81)+.4*Math.cos(x*1.4+z*.55);
  const flank=ease(-.2,14,bank);
  const ridge=4.8+5.1*Math.sin(.12*s+x*.17)**2+4*ease(12,47,s);
  const headwall=ease(50,62,s)*(8+4*Math.cos(.26*x)+rock);
  const bed=alderStage(station)-.72+.92*ease(-1,.24,bank)+flank*(ridge+rock)+headwall;
  const edge=-1.55+ease(1,12,bank)*(1.2+rock*.72+1.35*Math.sin(x*.48));
  const face=ease(edge-1.1,edge+.6,s);
  return base+weight*face*(bed-base);
}
export function lakeDepth(x,z){
  const r=lakeRadius(x,z);
  const scour=r<1?3.1*Math.min(1,(1-r)*70)*Math.exp(-(((x-falls.x)/5.2)**2+((z-lipZ+5.8)/5.8)**2)):0;
  return Math.max(0,(1-r)*(6.5+2*Math.sin(x*.13+z*.07))+4*Math.max(0,.68-r))+scour;
}
export function lakeHeight(x,z){
  const r=lakeRadius(x,z);
  const hills=2.4+.85*Math.sin(x*.17)+.66*Math.cos(z*.21)+.42*Math.cos(x*.25+z*.19);
  const ground=r<1?lake.level-lakeDepth(x,z):lake.level+Math.min(1,(r-1)*4.6)*hills;
  return alderGround(x,z,ground);
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
