import * as T from 'three';
import { estateHeight } from './estate.js';
import { v,TAU,range,random,tint,pick,meshSurface } from './model.js';

export const riverX=z=>-9-3*Math.sin(z*.092)-z*.13;
export const riverWidth=z=>2.05+.35*Math.cos(z*.21);
export const mix=(a,b,t)=>a+(b-a)*t;
export function smooth(a,b,x) {const t=Math.min(1,Math.max(0,(x-a)/(b-a)));return t*t*(3-2*t);}
export const plots=[
  {id:'bakery',name:'Bramble Bakery',x:4.1,z:8.2,y:1.1,a:-.20,w:4.3,d:3.65,h:3.9,roof:'#b95336',wall:'#eddbaf'},
  {id:'mill',name:'Brook Mill',x:-9.0,z:7.4,y:.65,a:.08,w:3.55,d:3.5,h:3.6,roof:'#b15a40',wall:'#d9caa4'},
  {id:'inn',name:'The Copper Kettle',x:-1.2,z:-2.5,y:2.45,a:.14,w:4.6,d:3.7,h:4.15,roof:'#b65539',wall:'#f0d8a4'},
  {id:'slate',name:'The Bindery',x:8.6,z:-1.5,y:3.45,a:-.55,w:3.6,d:3.1,h:3.9,roof:'#617e82',wall:'#e6d9b8'},
  {id:'tower',name:'Hilltop Clock',x:8,z:-16,y:6.65,a:-.12,w:3.2,d:3.15,h:4.25,roof:'#ac5840',wall:'#ddcda9'},
  {id:'wind',name:'Clover Windmill',x:-16.2,z:-12,y:4.7,a:.35,w:3,d:3,h:6.8},
  {id:'potter',name:'Potter’s Cottage',x:-20.4,z:2.7,y:1.65,a:.7,w:3.4,d:3.2,h:2.9,roof:'#ac6248',wall:'#edd4b5'},
  {id:'herb',name:'Rosemary House',x:-.9,z:-14,y:4.55,a:.45,w:3.6,d:3.4,h:3.3,roof:'#758578',wall:'#e7cdaa'}
];
export function doorOffset(p) {
  if(p.id==='wind')return 0;
  return p.w*(p.id==='mill'?.25:-.25);
}
export function doorstep(p,distance) {
  const x=doorOffset(p),z=(p.id==='wind'?1.71:p.d/2+.24)+distance;
  return {x:p.x+x*Math.cos(p.a)+z*Math.sin(p.a),z:p.z-x*Math.sin(p.a)+z*Math.cos(p.a)};
}
export function height(x,z) {
  if(x>=54.25)return estateHeight(x,z);
  let h=.85+.5*Math.sin(.21*x+.08*z)+.39*Math.cos(z*.29)+.47*Math.sin(.32*x-.11*z);
  h+=5.65*Math.exp(-((x-7)**2/166+(z+17)**2/159))+4.3*Math.exp(-((x+17)**2/110+(z+13)**2/117));
  h+=1.3*Math.sin(x*.11+2.5)*Math.cos(z*.10)*smooth(16,32,Math.hypot(x,z));
  for(const p of plots) {
    const dx=Math.max(0,Math.abs(x-p.x)-p.w*.52),dz=Math.max(0,Math.abs(z-p.z)-p.d*.52);
    h=mix(p.y,h,smooth(.15,3.6,Math.hypot(dx,dz)));
  }
  const bank=Math.abs(x-riverX(z))-riverWidth(z);
  h=mix(-1.24,h,smooth(-.4,2.1,bank));
  return x>42?mix(h,estateHeight(x,z),smooth(42,54.25,x)):h;
}
const pathLines=[
  [[1,31],[.7,21],[1.7,15],[1.6,11],[.9,7],[-1,3],[-.9,.3]],
  [[-21,6],[-17,6],[-13,4],[-10,3.4],[-6,3.5],[-2,4],[2,5],[6,3],[8,1]],
  [[1,4],[3,1.5],[3.7,-3.2],[4.7,-6.3],[8,-8.8],[9.3,-11.2],[8.5,-13.6]],
  [[-1,1],[-4,-1.6],[-4.2,-6],[-3.2,-9.2],[-.3,-11.9]],
  [[-17,6],[-18,2],[-18.7,-3],[-17,-7],[-15.6,-10.1]],
  [[1.4,11],[2.2,10.8],[3.8,10.5]], [[-8,3.6],[-7.1,6],[-7,9.1],[-8.6,9.8]]
];
export const paths=pathLines.map(points=>new T.CatmullRomCurve3(points.map(([x,z])=>v(x,0,z))));
const samples=paths.flatMap(p=>p.getSpacedPoints(Math.ceil(p.getLength()/.7)));
export function nearPath(x,z,r) {return samples.some(p=>Math.abs(x-p.x)<r&&Math.abs(z-p.z)<r&&((p.x-x)**2+(p.z-z)**2)<r*r);}
export function inPlot(x,z,margin=0) {
  return plots.some(p=>{const dx=x-p.x,dz=z-p.z;
    return Math.abs(dx*Math.cos(p.a)-dz*Math.sin(p.a))<p.w/2+margin && Math.abs(dx*Math.sin(p.a)+dz*Math.cos(p.a))<p.d/2+margin;});
}
export function grassMap() {
  const c=document.createElement('canvas');c.width=c.height=256;const ctx=c.getContext('2d');
  ctx.fillStyle='#e1dfbc';ctx.fillRect(0,0,256,256);
  for(let i=0;i<13000;i++){ctx.fillStyle=pick(['#c2c19d','#f4f1cf','#babb94','#dedcb7']);const x=random()*256,y=random()*256;ctx.fillRect(x,y,range(.5,2.8),range(.5,2));}
  const tex=new T.CanvasTexture(c);tex.wrapS=tex.wrapT=T.RepeatWrapping;tex.colorSpace=T.SRGBColorSpace;tex.anisotropy=4;return tex;
}
export function terrain(root,b) {
  const pos=[],idx=[],cols=[],uv=[],n=175,step=.62;
  for(let j=0;j<=n;j++)for(let i=0;i<=n;i++){
    const x=(i-n/2)*step,z=(j-n/2)*step,y=height(x,z);
    pos.push(x,y,z);uv.push(x*.38,z*.38);
    const pattern=.5+.21*Math.sin(x*.46+z*.08)+.13*Math.sin(z*.83-x*.34)+.1*Math.cos(z*.18+x*.18)+range(-.05,.05);
    const c=new T.Color('#68954e').lerp(new T.Color('#b2cc75'),pattern);
    c.lerp(new T.Color('#88886a'),1-smooth(-.6,1.45,Math.abs(x-riverX(z))-riverWidth(z)));
    let footing=1;
    for(const p of plots){
      const dx=x-p.x,dz=z-p.z,lx=Math.abs(dx*Math.cos(p.a)-dz*Math.sin(p.a)),lz=Math.abs(dx*Math.sin(p.a)+dz*Math.cos(p.a));
      const d=Math.hypot(Math.max(0,lx-p.w*.5),Math.max(0,lz-p.d*.5));
      footing=Math.min(footing,smooth(0,1.45,d));
    }
    c.lerp(new T.Color('#7e805b'),(1-footing)*.75);
    if(nearPath(x,z,.90))c.lerp(new T.Color('#999075'),.63);
    cols.push(c.r,c.g,c.b);
    if(i&&j){const a=j*(n+1)+i;idx.push(a-n-2,a-1,a,a-n-2,a,a-n-1);}
  }
  const ground=meshSurface(root,pos,idx,cols,{map:grassMap()});ground.geometry.setAttribute('uv',new T.Float32BufferAttribute(uv,2));
  // Set each cobble independently so the climbing lanes follow both cross-slope and grade.
  const laid=new Map();
  paths.forEach((path,k)=>{
    const length=path.getLength(),rows=Math.ceil(length/.46),lanes=k>4?2:3;
    for(let i=0;i<rows;i++){
      const t=i/rows,p=path.getPointAt(t),d=path.getTangentAt(t),angle=Math.atan2(d.x,d.z);
      for(let j=0;j<lanes;j++){
        const off=(j-(lanes-1)/2)*.5;
        const x=p.x+d.z*off+range(-.035,.035),z=p.z-d.x*off+range(-.035,.035);
        if(Math.abs(x-riverX(z))<riverWidth(z)+.65)continue;
        const gx=Math.floor(x),gz=Math.floor(z);
        let occupied=false;
        for(let ix=gx-1;ix<=gx+1;ix++)for(let iz=gz-1;iz<=gz+1;iz++){
          const other=laid.get(ix+','+iz);
          if(other?.some(p=>p.k!==k&&(p.x-x)**2+(p.z-z)**2<.49**2))occupied=true;
        }
        if(occupied)continue;
        const key=gx+','+gz;if(!laid.has(key))laid.set(key,[]);laid.get(key).push({x,z,k});
        const dx=(height(x+.05,z)-height(x-.05,z))/.1,dz=(height(x,z+.05)-height(x,z-.05))/.1;
        const up=v(-dx,1,-dz).normalize(),q=new T.Quaternion().setFromUnitVectors(v(0,1,0),up).multiply(new T.Quaternion().setFromAxisAngle(v(0,1,0),angle+range(-.07,.07)));
        b.place('paver',tint(pick(['#c5b79a','#c8bea7','#b4a78c','#b5af98'])),v(x,height(x,z)+.035,z),q,v(range(.45,.49),.085,range(.39,.45)),'stone');
      }
    }
  });
}
export function grass(root) {
  const pos=[],idx=[],cols=[];
  for(let i=0;i<14600;i++){
    const x=range(-32,33),z=range(-32,33);
    if(inPlot(x,z,.1)||nearPath(x,z,.86)||Math.abs(x-riverX(z))<riverWidth(z)+.3)continue;
    const y=height(x,z)-.026,scale=range(.14,.46);
    for(let j=0;j<5;j++){const a=range(0,TAU),dx=Math.cos(a),dz=Math.sin(a),r=range(0,.12),cx=x+r*dx,cz=z+r*dz,w=range(.02,.048),h=scale*range(.55,1.18),n=pos.length/3;
      pos.push(cx-dz*w,y,cz+dx*w,cx+dz*w,y,cz-dx*w,cx+dx*h*.48,y+h,cz+dz*h*.48);idx.push(n,n+1,n+2);
      const c=new T.Color(pick(['#68863e','#83984c','#8da953','#a0b95d'])),tip=c.clone().multiplyScalar(1.26);
      cols.push(c.r*.75,c.g*.75,c.b*.75,c.r,c.g,c.b,tip.r,tip.g,tip.b);
    }
  }meshSurface(root,pos,idx,cols);
}
export function bridge(b) {
  const z=3.9,x=riverX(z),span=7.8;
  const floor=t=>.73+1.04*Math.sin(Math.PI*t);
  for(let i=0;i<31;i++){
    const t=(i+.5)/31,xx=x+(t-.5)*span,yy=floor(t),slope=1.04*Math.PI*Math.cos(Math.PI*t)/span;
    b.put('box',tint('#b8aa91'),xx,yy,z,span/31+.012,.26,2.05,0,0,Math.atan(slope));
    for(const side of [-1,1]){
      const zz=z+side*1.01;
      b.put('box',tint('#a99c80'),xx,yy-.24,zz,span/31+.01,.42,.35,0,0,Math.atan(slope));
      if(i%2===0){b.put('box',tint('#ae9e80'),xx,yy+.28,zz,.5,.6,.32,0,0,Math.atan(slope));b.put('box',tint('#d6c7a5'),xx,yy+.6,zz,.51,.13,.4,0,0,Math.atan(slope));}
      if(t<.19||t>.81)b.put('box',tint('#a49a82'),xx,(yy-.95)/2,zz,.27,yy+1.15,.4);
    }
  }
}
export function walkHeight(x,z) {
  const t=(x-riverX(3.9))/7.8+.5;
  if(t>=0&&t<=1&&Math.abs(z-3.9)<.86)return Math.max(height(x,z),.86+1.04*Math.sin(t*Math.PI));
  return height(x,z);
}
export function walkable(x,z) {
  if(Math.hypot(x-6.09,z+15.60)<1.5 || Math.hypot(x+10.55,z-9.88)<1.43)return false;
  if(x>31||Math.abs(z)>32)return x>25&&x<213&&z<49&&z>(x<54.25?-48:-102);
  if(x< -31||inPlot(x,z,.24))return false;
  return Math.abs(x-riverX(z))>riverWidth(z)+.32 || (Math.abs(z-3.9)<.87 && Math.abs(x-riverX(3.9))<4);
}
