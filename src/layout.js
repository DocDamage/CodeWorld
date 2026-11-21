import { CatmullRomCurve3, Vector3 } from 'three';

export const riverX = z => -9 - 3 * Math.sin(z * .092) - z * .13;
export const riverWidth = z => 2.05 + .35 * Math.cos(z * .21);
export const brookLevel = -.17;
export const bridgeZ = 3.9;
export const bridgeSpan = 9.2;

export const plots = [
  {id:'bakery',name:'Bramble Bakery',x:10.1,z:15.3,y:1.05,a:-.26,w:6.6,d:5.2,h:4.55,roof:'#844638',wall:'#cdb995'},
  {id:'mill',name:'Brook Armory',x:riverX(10.5)+4.65,z:10.5,y:.67,a:.08,w:6.2,d:5.5,h:4.5,roof:'#744337',wall:'#b0a18a'},
  {id:'inn',name:'The Copper Kettle',x:-.6,z:-4.8,y:2.12,a:.12,w:7.5,d:6.2,h:5.1,roof:'#824938',wall:'#c8b495'},
  {id:'slate',name:'The Bindery',x:16.3,z:-1.4,y:2.45,a:-.30,w:6,d:4.75,h:4.6,roof:'#445861',wall:'#c0b59c'},
  {id:'tower',name:'Hilltop Clock',x:15,z:-19.5,y:5.75,a:-.15,w:5.2,d:4.8,h:4.8,roof:'#805344',wall:'#c7b49a'},
  {id:'wind',name:'Clover Windmill',x:-24,z:-15.5,y:4.18,a:.28,w:3.7,d:3.7,h:6.8},
  {id:'potter',name:'Potter’s Cottage',x:-28,z:5.5,y:1.64,a:.22,w:6,d:4.5,h:4.15,roof:'#8b5646',wall:'#ceb6a0'},
  {id:'herb',name:'Rosemary House',x:2.5,z:-21.8,y:4.52,a:.29,w:5.5,d:4.8,h:4.2,roof:'#5b6757',wall:'#bdb09a'}
];

export function doorOffset(plot) {
  if (plot.id === 'wind') return 0;
  return plot.w * (plot.id === 'mill' ? .25 : -.25);
}

export function localToWorld(plot, x, z) {
  return {x:plot.x+x*Math.cos(plot.a)+z*Math.sin(plot.a), z:plot.z-x*Math.sin(plot.a)+z*Math.cos(plot.a)};
}

export function doorstep(plot, distance) {
  return localToWorld(plot, doorOffset(plot), (plot.id === 'wind' ? 1.91 : plot.d/2+.24) + distance);
}

export function plotDistance(plot,x,z) {
  const dx=x-plot.x,dz=z-plot.z,c=Math.cos(plot.a),s=Math.sin(plot.a);
  const lx=dx*c-dz*s,lz=dx*s+dz*c;
  if (plot.id === 'wind') return Math.hypot(lx,lz)-1.68;
  const px=Math.abs(lx)-plot.w/2,pz=Math.abs(lz)-plot.d/2;
  const cottage=Math.hypot(Math.max(px,0),Math.max(pz,0))+Math.min(0,Math.max(px,pz));
  return plot.id === 'tower' ? Math.min(cottage,Math.hypot(lx+2,lz-.64)-1.45) : cottage;
}

export function inPlot(x,z,margin=0) {
  return plots.some(plot => plotDistance(plot,x,z)<margin);
}

export function onBridge(x,z,margin=0) {
  return Math.abs(x-riverX(bridgeZ))<bridgeSpan/2+margin && Math.abs(z-bridgeZ)<.87+margin;
}

export function pavingAllowed(x,z) {
  return !inPlot(x,z,.37) && !onBridge(x,z,-.05) && Math.abs(x-riverX(z))>riverWidth(z)+.43;
}

const eastAbutment=riverX(bridgeZ)+bridgeSpan/2;
const westAbutment=riverX(bridgeZ)-bridgeSpan/2;
const square=[.9,8];
const north=[4.5,-8.2];
const west=[-22,4.6];
const binderyBranch=[12.1,5.1];
const makeRoad=(points,lanes,destination)=>({
  curve:new CatmullRomCurve3(points.map(([x,z])=>new Vector3(x,0,z))),lanes,destination
});
const approach=(id,points)=>{
  const plot=plots.find(candidate=>candidate.id===id);
  return makeRoad([...points,...[2.15,.36].map(distance=>{const {x,z}=doorstep(plot,distance);return [x,z];})],3,id);
};

export const roads = [
  makeRoad([[3,34],[4.5,27.7],[3.6,23],[.4,18.5],[.1,13],square],5),
  makeRoad([square,[-1.9,6.1],[-4.7,4.3],[eastAbutment,bridgeZ]],4),
  makeRoad([[westAbutment,bridgeZ],[-17,3.5],[-19.1,4.05],west],4),
  makeRoad([square,[2.3,3.4],[3.9,.7],[4.65,-2],[5.5,-5.45],north],4),
  makeRoad([square,[4.2,7.1],[8.6,5.85],binderyBranch,[16.7,5.6],[19,4.7]],4),
  approach('bakery',[[3.6,23],[5.6,22.9],[7.5,21.8]]),
  approach('mill',[[-4.7,4.3],[-4.35,6.8],[-3.9,10.1],[-4.05,14.6]]),
  approach('inn',[[2.3,3.4],[.45,2.9],[-1.8,1.6]]),
  approach('slate',[binderyBranch,[13.2,4.4]]),
  approach('tower',[north,[7.4,-10.6],[10.8,-12.1],[13.65,-12.9]]),
  approach('herb',[north,[3.9,-11.5],[2.7,-14.8]]),
  approach('wind',[west,[-22.45,.35],[-23.8,-4.2],[-23.8,-8.3]]),
  approach('potter',[west,[-23.55,7.9],[-26.35,11.05]])
];

const samples=roads.flatMap(({curve,lanes})=>curve.getSpacedPoints(Math.ceil(curve.getLength()/.55)).map(p=>({x:p.x,z:p.z,edge:lanes*.24})));
const samplesByCell=new Map();
const cellKey=(x,z)=>`${x},${z}`;
for (const sample of samples) {
  const key=cellKey(Math.floor(sample.x/4),Math.floor(sample.z/4));
  if(!samplesByCell.has(key))samplesByCell.set(key,[]);
  samplesByCell.get(key).push(sample);
}
export function nearPath(x,z,r) {
  const gx=Math.floor(x/4),gz=Math.floor(z/4);
  for (let ix=gx-1;ix<=gx+1;ix++) for (let iz=gz-1;iz<=gz+1;iz++) {
    const nearby=samplesByCell.get(cellKey(ix,iz));
    if (nearby?.some(p=>(p.x-x)**2+(p.z-z)**2<(r+p.edge)**2)) return true;
  }
  return false;
}
