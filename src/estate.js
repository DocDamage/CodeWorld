import * as T from 'three';

export const estate={x:162,z:-55,y:4};
export const trail=new T.CatmullRomCurve3([[8,1.18],[11.5,2.32],[15.5,2.80],[20,4],[29,1],[39,-6],[49,-9],[59,-1],[66,9],[77,10],[84,2],[85,-10],[96,-19],[110,-17],[120,-6],[132,-2],[144,-9],[155,-13],[161,-18],[162,-22.2]].map(([x,z])=>new T.Vector3(x,0,z)));
const markers=trail.getSpacedPoints(Math.ceil(trail.getLength()/.65));
const cells=new Map();
for(const p of markers){const k=Math.floor(p.x/8)+','+Math.floor(p.z/8);if(!cells.has(k))cells.set(k,[]);cells.get(k).push(p);}
export function trailDistance(x,z){
  let best=Infinity;const gx=Math.floor(x/8),gz=Math.floor(z/8);
  for(let j=-1;j<=1;j++)for(let i=-1;i<=1;i++)for(const p of cells.get((gx+i)+','+(gz+j))||[]){
    best=Math.min(best,(p.x-x)**2+(p.z-z)**2);
  }return Math.sqrt(best);
}
export function moatDistance(x,z){
  const dx=Math.abs(x-estate.x)-22.3,dz=Math.abs(z-estate.z)-20.2;
  return Math.hypot(Math.max(dx,0),Math.max(dz,0))+Math.min(Math.max(dx,dz),0)-3.25;
}
function blend(a,b,t){t=Math.min(1,Math.max(0,t));return a+(b-a)*t*t*(3-2*t);}
export function estateHeight(x,z){
  const sd=moatDistance(x,z);
  if(sd<9){
    const trench=blend(4,1,(sd+.65)/2.3);
    return blend(trench,4,(sd-6.18)/2.55);
  }
  const wild=2.4+1.8*Math.sin(x*.062+z*.026)+1.15*Math.cos(z*.098)+.38*Math.sin(x*.25-z*.1);
  const rim=Math.max(0,(Math.abs(z+15)-93)/31,(x-211)/39);
  const ridge=3.5*Math.exp(-(((x-158)/19)**2+((z+9)/13)**2));
  return blend(4,wild+ridge,(sd-9)/15)+Math.min(rim,1)*(10+6*Math.cos(x*.073+z*.06));
}
export const trailhead=trail.getPoint(0);
export const trailYaw=-Math.atan2(trail.getTangent(0).x,-trail.getTangent(0).z);
