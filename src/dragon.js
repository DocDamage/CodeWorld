import * as T from 'three';
import {Builder,v,TAU,tint,meshSurface} from './model.js';

const skin='#86483e',crest='#a96346',horn='#dfc8a0',belly='#b4825d';
function tapered(root,points,color,sides=12){
  const pos=[],idx=[],cols=[];
  const line=new T.CatmullRomCurve3(points.map(a=>v(a[0],a[1],a[2])));
  const count=(points.length-1)*3+1;
  let previousAxis=null,horizontal=null;
  // Parallel-transport each cross-section around elbows and tail bends.
  // Using world-up at each ring would flip a limb abruptly near a vertical tangent.
  for(let i=0;i<count;i++){
    const t=i/(count-1),p=line.getPoint(t),axis=line.getTangent(t).normalize();
    const f=t*(points.length-1),j=Math.min(points.length-2,Math.floor(f)),u=f-j;
    const w=T.MathUtils.lerp(points[j][3],points[j+1][3],u),h=T.MathUtils.lerp(points[j][4],points[j+1][4],u);
    if(previousAxis)horizontal.applyQuaternion(new T.Quaternion().setFromUnitVectors(previousAxis,axis)).normalize();
    else{horizontal=v(0,1,0).cross(axis);if(horizontal.lengthSq()<.01)horizontal.set(1,0,0);horizontal.normalize();}
    previousAxis=axis;
    const vertical=axis.clone().cross(horizontal).normalize();
    for(let k=0;k<sides;k++){
      const angle=k*TAU/sides,s=Math.sin(angle),pt=p.clone().addScaledVector(horizontal,w*Math.cos(angle)).addScaledVector(vertical,h*s);
      pos.push(...pt.toArray());const c=tint(s<-.44&&color===skin?belly:color,.035);cols.push(c.r,c.g,c.b);
      if(i){const n=i*sides+k,j=i*sides+(k+1)%sides;idx.push(n-sides,j-sides,n,j-sides,j,n);}
    }
  }for(let j=1;j<sides-1;j++){const end=(count-1)*sides;idx.push(0,j,j+1,end,end+j+1,end+j);}
  const m=meshSurface(root,pos,idx,cols);m.castShadow=true;
}
function wing(root,s){
  const arm=[[.74,3,.0,.45,.45],[2.35,4.05,-.72,.34,.34],[3.9,5.65,-1.37,.25,.25],[4.57,6.36,-.87,.20,.21]];
  const mirror=pts=>pts.map(([x,...r])=>[x*s,...r]);tapered(root,mirror(arm),skin);
  const wrist=v(s*4.57,6.36,-.87),anchors=[[7.65,4.25,.05],[7.41,2.4,2.04],[6.40,1.35,4.00],[4.64,1.43,5.66],[2.53,1.65,5.90],[.86,2.44,3.12]];
  const point=([x,y,z])=>v(s*x,y,z);
  const pos=[],cols=[],idx=[];
  for(let k=0;k<anchors.length-1;k++){
    const a=point(anchors[k]),b=point(anchors[k+1]),mid=a.clone().lerp(b,.5).lerp(wrist,.105);
    const inset=wrist.clone().lerp(mid,.58);inset.y+=.25;
    const points=[wrist,a,mid,b,inset];const start=pos.length/3;
    for(const [i,p] of points.entries()){pos.push(...p.toArray());const c=new T.Color(i===4?'#bc805a':i===0?'#975043':'#aa674d');cols.push(c.r,c.g,c.b);}
    for(const tri of [[0,1,4],[1,2,4],[2,3,4],[3,0,4]])idx.push(...tri.map(i=>start+i));
  }
  const start=pos.length/3;
  for(const p of [wrist,point(anchors.at(-1)),v(s*.77,3.04,.08),v(s*2.35,4.08,-.70)]){
    pos.push(...p.toArray());const c=new T.Color('#a45c48');cols.push(c.r,c.g,c.b);
  }
  idx.push(start,start+1,start+3,start+1,start+2,start+3);
  const membrane=meshSurface(root,pos,idx,cols);membrane.castShadow=true;
  for(const a of anchors){const p=point(a),mid=wrist.clone().lerp(p,.5);mid.y+=.17;
    tapered(root,[[...wrist.toArray(),.115,.12],[...mid.toArray(),.083,.09],[...p.toArray(),.018,.022]],crest,7);}
  tapered(root,mirror([[4.57,6.36,-.87,.13,.13],[4.62,6.68,-1.11,.09,.10],[4.48,6.90,-1.18,.008,.008]]),horn,8);
}
export function makeDragon(parent){
  const beast=new T.Group();beast.position.set(-2,-15.98,2.8);parent.add(beast);
  const body=new T.Group();beast.add(body);const b=new Builder(body);
  tapered(body,[[0,2.20,-1.7,.58,.79],[0,2.48,-.87,1.38,1.41],[0,2.38,.48,1.72,1.50],[.1,2.13,2.10,1.72,1.31],[.35,1.82,3.49,1.23,.96],[.75,1.57,4.47,.73,.64]],skin,18);
  tapered(body,[[.62,1.63,3.90,.89,.75],[1.13,1.22,5.54,.73,.61],[2.32,.88,7.08,.54,.44],[4.21,.68,7.94,.38,.32],[5.98,.59,7.48,.26,.23],[6.81,.70,6.25,.16,.16],[6.7,.90,5.24,.07,.09],[6.36,1.03,4.83,.012,.014]],skin);
  for(const s of [-1,1]){
    for(const back of [false,true]){
      const z=back?2.43:-.86;
      tapered(body,[[s*.98,2.44,z,.61,.64],[s*1.69,1.96,z+.28,.51,.49],[s*2.10,.92,z+.49,.36,.43],[s*1.90,.44,z-.05,.25,.27],[s*1.96,.25,z-.89,.34,.20]],skin);
      for(let k=-1;k<=1;k++){
        const xx=s*(1.96+k*.24);
        tapered(body,[[s*(1.96+k*.14),.27,z-.71,.15,.15],[xx,.22,z-1.12,.11,.10],[xx+s*k*.09,.16,z-1.45,.009,.014]],horn,7);
      }
    }
    for(let j=0;j<13;j++){const z=-.71+j*.30,h=2.93-.14*Math.abs(z-1),xx=s*(1.35+.17*Math.sin(j*.3));
      b.put('leaf',tint(crest,.10),xx,h,z,.24,.37,.44,0,0,s*.26);}
  }
  for(let j=0;j<15;j++){const z=-1.33+j*.49,h=z<3.8?3.96-.15*Math.abs(z-.1):2.25-(z-3.8)*.58;
    const x=z<3?.03:Math.pow(z-3,1.6)*.23;b.put('cone',crest,x,h,z,.38,.65-j*.02,.50,-.35);}
  const neck=new T.Group();neck.position.set(0,2.77,-1.20);body.add(neck);const hb=new Builder(neck);
  tapered(neck,[[0,-.20,.30,.85,.91],[-.14,.18,-.58,.75,.82],[-.38,.76,-1.34,.62,.67],[-.39,1.40,-2.02,.55,.64],[-.23,1.61,-2.76,.58,.56]],skin);
  tapered(neck,[[-.26,1.64,-2.23,.53,.45],[-.22,1.72,-2.80,.82,.58],[-.17,1.58,-3.30,.74,.47],[-.12,1.38,-3.93,.44,.30],[-.08,1.35,-4.28,.41,.23]],skin);
  tapered(neck,[[-.20,1.28,-2.75,.57,.25],[-.15,1.17,-3.28,.57,.19],[-.09,1.12,-4.14,.36,.12]],belly);
  for(const s of [-1,1]){
    tapered(neck,[[s*.43-.24,1.98,-2.56,.27,.28],[s*.71-.24,2.40,-2.21,.21,.21],[s*.91-.24,2.75,-1.73,.13,.13],[s*.98-.24,3.04,-1.50,.01,.01]],horn);
    hb.put('ball','#f5ac40',s*.67-.20,1.78,-3.10,.20,.21,.29,0,s*.45,0,'glow');
    hb.put('ball','#262021',s*.749-.20,1.79,-3.16,.054,.155,.07);
    hb.put('leaf',crest,s*.59-.20,1.98,-2.99,.37,.22,.65,0,s*.3);
    hb.put('ball','#362d2a',s*.22-.08,1.48,-4.22,.134,.086,.088);
    for(let j=0;j<5;j++)hb.put('cone',horn,s*(.54-j*.032)-.12,1.23,-3.12-j*.20,.080,.16-.014*j,.082,0,0,Math.PI);
    tapered(neck,[[s*.64-.24,1.64,-2.54,.22,.24],[s*1.02-.24,1.77,-2.17,.14,.14],[s*1.32-.24,1.82,-1.95,.01,.01]],crest);
  }
  for(let j=0;j<7;j++){
    const f=j/6;hb.put('cone',crest,-.14-.17*Math.sin(f*Math.PI),.79+f*1.60,-.27-f*2.03,.23,.48-f*.10,.26,-.49);
  }
  for(const s of [-1,1])for(let j=0;j<8;j++){
    const f=j/7;hb.put('leaf',tint('#ad674f'),s*(.71-.24*f)-.19,.29+f*1.34,-.24-f*1.95,.16,.26,.30,0,0,s*.26);
  }
  hb.finish();b.finish();
  const wings=[-1,1].map(s=>{const g=new T.Group();body.add(g);wing(g,s);return g;});
  return t=>{body.scale.y=1+.012*Math.sin(t*1.32);neck.rotation.y=.14*Math.sin(t*.32);neck.rotation.x=.033*Math.sin(t*.76);wings.forEach((g,i)=>g.rotation.z=(i?1:-1)*.025*Math.sin(t*.71));};
}
