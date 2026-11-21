import {brookBed} from './brook.js';
import {lakeHeight} from './lake-layout.js';
import {estateHeight} from './estate.js';
import {farm,farmHeight,inFarm} from './farm-layout.js';
import {plotDistance,plots,riverWidth,riverX} from './layout.js';

export const mix=(a,b,t)=>a+(b-a)*t;
export function smooth(a,b,x) {const t=Math.min(1,Math.max(0,(x-a)/(b-a)));return t*t*(3-2*t);}
export function height(x,z) {
  if(z>=54.25 && x>=-35 && x<=96)return lakeHeight(x,z);
  if(inFarm(x,z))return farmHeight(x,z);
  if(x>=54.25)return estateHeight(x,z);
  let h=.85+.5*Math.sin(.21*x+.08*z)+.39*Math.cos(z*.29)+.47*Math.sin(.32*x-.11*z);
  h+=5.65*Math.exp(-((x-7)**2/166+(z+17)**2/159))+4.3*Math.exp(-((x+17)**2/110+(z+13)**2/117));
  h+=1.3*Math.sin(x*.11+2.5)*Math.cos(z*.10)*smooth(16,32,Math.hypot(x,z));
  for(const p of plots) {
    const edge=plotDistance(p,x,z);
    h=mix(p.y,h,smooth(.25,3.3,edge));
  }
  const bank=Math.abs(x-riverX(z))-riverWidth(z);
  h=mix(brookBed(x,z),h,smooth(-.36,1.62,bank));
  const border=Math.hypot(Math.max(farm.bounds.minX-x,0,x-farm.bounds.maxX),Math.max(farm.bounds.minZ-z,0,z-farm.bounds.maxZ));
  if(border<3)h=mix(farmHeight(x,z),h,smooth(0,3,border));
  const ground=x>42?mix(h,estateHeight(x,z),smooth(42,54.25,x)):h;
  return z>49&&x>=-35&&x<54.25?mix(ground,lakeHeight(x,z),smooth(49,54.25,z)):ground;
}
