import * as T from 'three';

function surface(points,indices){
  const g=new T.BufferGeometry();
  g.setAttribute('position',new T.Float32BufferAttribute(points,3));
  g.setIndex(indices);g.computeVertexNormals();return g;
}
// A folded midrib catches light independently of the thin margins. The base
// is at y=0 so a blade can spring directly from a stalk or a rosette.
function leaf(){
  const p=[],idx=[];
  for(let i=0;i<=8;i++){
    const t=i/8,w=.48*Math.pow(Math.max(.0001,Math.sin(Math.PI*t)),.78);
    const y=t*.91-.42*t**3,z=.07*t+.77*t*t;
    p.push(-w,y,z-.13*w, .032*Math.sin(4*t),y+.095*w,z+.22*w, w,y+.025*Math.sin(6*t),z-.13*w);
    if(i){const n=i*3;idx.push(n-3,n,n-2,n,n+1,n-2,n-2,n+1,n-1,n+1,n+2,n-1);}
  }
  return surface(p,idx);
}
function grainHead(){
  const p=[],idx=[];
  for(let row=0;row<6;row++)for(let side=0;side<2;side++){
    const a=2.4*row+side*Math.PI,c=Math.cos(a),s=Math.sin(a),h=-.49+row*.13,n=p.length/3;
    const pt=(r,t,w)=>p.push(c*r-s*w,h+t,s*r+c*w);
    pt(0,0,0);pt(.15,.078,-.14);pt(.48,.14,0);pt(.15,.078,.14);pt(.39,.28,0);
    idx.push(n,n+2,n+1,n,n+3,n+2,n+1,n+2,n+4,n+2,n+3,n+4);
    pt(.70,.42,0);idx.push(n+1,n+4,n+5);
  }
  return surface(p,idx);
}
function flowerRays(){
  const p=[],idx=[];
  for(let k=0;k<22;k++){
    const a=k*Math.PI/11,r=.47+.04*Math.cos(k*4),n=p.length/3;
    for(const [rad,side,z] of [[.21,0,0],[.37,-.047,.036],[r,0,.072],[.36,.05,.018]])
      p.push(rad*Math.cos(a)-side*Math.sin(a),rad*Math.sin(a)+side*Math.cos(a),z);
    idx.push(n,n+1,n+2,n,n+2,n+3);
  }
  return surface(p,idx);
}
function pumpkin(){
  const g=new T.SphereGeometry(.5,32,12),p=g.attributes.position;
  for(let i=0;i<p.count;i++){
    const x=p.getX(i),y=p.getY(i),z=p.getZ(i),r=.95+.065*Math.cos(Math.atan2(z,x)*8);
    p.setXYZ(i,x*r,y*(1-.16*Math.abs(y*2)**6),z*r);
  }
  g.computeVertexNormals();return g;
}
function tassel(){
  const p=[],idx=[];
  for(let k=0;k<8;k++){
    const a=k*2.4,n=p.length/3;
    for(let j=0;j<=5;j++){
      const t=j/5,r=k===0?0:.52*t,w=(.031+.018*Math.sin(j*2))*(1-t*.83);
      const y=k===0?t:t*(1.14-.55*t)-.12;
      p.push(Math.cos(a)*r-w,y,Math.sin(a)*r,Math.cos(a)*r+w,y+.01,Math.sin(a)*r+.01);
      if(j){const h=n+2*j;idx.push(h-2,h,h-1,h,h+1,h-1);}
    }
  }
  return surface(p,idx);
}
const earProfile=[[.03,-.5],[.36,-.43],[.48,-.24],[.5,.06],[.41,.29],[.25,.45],[.06,.50]];
export const cropGeometry={cropLeaf:leaf(),grainHead:grainHead(),flowerRays:flowerRays(),pumpkin:pumpkin(),
  cornEar:new T.LatheGeometry(earProfile.map(([r,y])=>new T.Vector2(r,y)),14),tassel:tassel()};
