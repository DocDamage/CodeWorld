import * as T from 'three';
import {Builder,v} from './model.js';

function makeHull(parent){
  // Open clinker-built dinghy, with a fine bow, a broad stern and a slatted sole.
  const frames=[[-2.38,.025,.73],[-2.04,.44,.66],[-1.42,.77,.55],[-.55,.91,.49],[.55,.88,.49],[1.46,.71,.53],[2.04,.55,.58]];
  const pos=[],col=[];
  function quad(a,b,c,d,shade){
    const color=new T.Color(shade);
    for(const p of [a,b,c,a,c,d]){pos.push(...p);col.push(color.r,color.g,color.b);}
  }
  for(let i=1;i<frames.length;i++){
    for(const side of [-1,1]){
      const rib=([z,w,h])=>[[0,-.28,z],[w*side*.62,-.17,z],[w*side*.86,.04,z],[w*side*.96,.22,z],[w*side,h-.055,z],[w*side,h,z],[w*side*.935,h-.02,z],[w*side*.63,.025,z]];
      const a=rib(frames[i-1]),b=rib(frames[i]);
      const shades=['#4a3930','#764c36','#2b5754','#356761','#d8b97c','#926c44','#936f4b'];
      for(let j=0;j<shades.length;j++)quad(a[j],b[j],b[j+1],a[j+1],shades[j]);
    }
  }
  quad([-.55,.58,2.04],[.55,.58,2.04],[.39,-.16,2.04],[-.39,-.16,2.04],'#694934');
  const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(pos,3));g.setAttribute('color',new T.Float32BufferAttribute(col,3));g.computeVertexNormals();
  const mesh=new T.Mesh(g,new T.MeshStandardMaterial({vertexColors:true,side:T.DoubleSide}));mesh.castShadow=mesh.receiveShadow=true;parent.add(mesh);
}
function sailPanel(parent,height,width,foot,tack){
  // Rows converge on the head of the sail. Camber bows the cloth between its edges.
  const rows=14,cols=9,coords=[],colors=[],indices=[],shades=['#e6d6ab','#d6bd8f','#b06c4e'];
  for(let j=0;j<=rows;j++){
    const h=j/rows;
    for(let i=0;i<=cols;i++){
      const q=i/cols,w=width*(1-h);
      coords.push(0,foot+h*height+q*.19*(1-h),tack*(1-h)+w*q);
      const c=new T.Color(shades[j===4||j===5?2:j%4===0?1:0]);colors.push(c.r,c.g,c.b);
      if(i&&j){const k=j*(cols+1)+i;indices.push(k-cols-2,k-1,k,k-cols-2,k,k-cols-1);}
    }
  }
  const g=new T.BufferGeometry(),points=new T.Float32BufferAttribute(coords,3);
  points.setUsage(T.DynamicDrawUsage);g.setAttribute('position',points);g.setAttribute('color',new T.Float32BufferAttribute(colors,3));g.setIndex(indices);g.computeVertexNormals();
  const mesh=new T.Mesh(g,new T.MeshStandardMaterial({vertexColors:true,roughness:.96,side:T.DoubleSide}));mesh.castShadow=true;parent.add(mesh);
  return (t,fill,sign,clewAngle=0)=>{
    for(let j=0;j<=rows;j++)for(let i=0;i<=cols;i++){
      const h=j/rows,q=i/cols;
      const camber=Math.sin(q*Math.PI)*(1-h)*Math.sin(.35+h*2.25);
      const clew=width*(1-h)*q,flutter=(1-fill)*q*(1-h)*.07*Math.sin(t*10+h*13+q*6);
      points.setX(j*(cols+1)+i,clew*Math.sin(clewAngle)+sign*width*camber*(fill*.16+.017)+flutter);
      points.setZ(j*(cols+1)+i,tack*(1-h)+clew*Math.cos(clewAngle));
    }
    points.needsUpdate=true;g.computeVertexNormals();
  };
}
export function buildBoatModel(root){
  const hull=new T.Group();root.add(hull);makeHull(hull);
  const b=new Builder(hull);
  for(let i=-3;i<=3;i++)b.put('box',i%2?'#ac8050':'#926b45',i*.13,.075,.18,.119,.09,3.1-Math.abs(i)*.22,0,0,0,'wood');
  for(const aft of [-1.13,.05,1.22])b.put('box','#b98c5a',0,.38,aft,aft===.05?1.72:1.36,.085,.28,0,0,0,'wood');
  b.put('cyl','#987449',0,2.65,-.58,.102,5.05,.102,0,0,0,'wood');
  for(const [x,z] of [[-.86,.27],[.86,.27],[0,-2.24],[0,1.96]])b.beam('#aaa48b',v(0,4.92,-.58),v(x,.56,z),.013,.013,'cyl');
  b.put('box','#6f5942',0,.18,2.17,.12,.96,.42,0,0,0,'wood');
  b.beam('#886340',v(0,.66,2.12),v(.06,.73,1.04),.07,.07,'cyl','wood');
  b.put('box','#474f4c',-.38,.49,2.03,.33,.34,.31);
  b.put('box','#646d68',-.38,.04,2.14,.09,.64,.13);
  b.finish();
  const rig=new T.Group(),jib=new T.Group();rig.position.z=jib.position.z=-.58;hull.add(rig,jib);
  const spars=new Builder(rig);spars.beam('#99794e',v(0,1.12,0),v(0,1.28,2.42),.065,.065,'cyl','wood');spars.finish();
  const main=sailPanel(rig,3.88,2.40,1.16,0);
  // Jib luff runs up the forestay and the clew sheets aft of the tack.
  const jibCloth=sailPanel(jib,3.08,.98,.85,-1.41);
  const flagGeo=new T.BufferGeometry();flagGeo.setAttribute('position',new T.Float32BufferAttribute([0,0,0,0,.17,0,0,.085,.54],3));flagGeo.computeVertexNormals();
  const vane=new T.Mesh(flagGeo,new T.MeshStandardMaterial({color:'#c28a52',side:T.DoubleSide}));
  vane.position.set(0,5.08,-.58);hull.add(vane);
  const oars=[];
  for(const side of [-1,1]){
    const pivot=new T.Group();pivot.position.set(side*.86,.48,.32);hull.add(pivot);oars.push(pivot);
    const o=new Builder(pivot);o.beam('#ab8357',v(-side*.58,.10,0),v(side*1.34,-.10,0),.055,.055,'cyl','wood');
    o.put('ball','#b68a56',side*1.42,-.11,0,.62,.068,.19,0,0,0,'wood');o.finish();
  }
  const draw=(boat,t)=>{
    hull.position.set(boat.x,.026*Math.sin(t*1.6+boat.z),boat.z);
    hull.rotation.set(.012*Math.sin(t*.93),boat.yaw,boat.heel+.014*Math.sin(t*1.37),'YXZ');
    rig.visible=jib.visible=boat.mode==='sail';
    if(rig.visible){rig.rotation.y=boat.boom;const side=Math.sign(boat.boom)||1;main(t,boat.fill,side);jibCloth(t,boat.fill,side,boat.boom*.55);}
    vane.rotation.y=boat.windAngle+.09*Math.sin(t*7.1);
    oars.forEach((o,i)=>{const s=i?1:-1;o.visible=boat.mode==='oars';o.rotation.y=s*(boat.rowing?Math.cos(boat.stroke)*.68:.12);o.rotation.z=s*(boat.rowing?-.14-.22*Math.sin(boat.stroke):.09);});
  };
  draw.root=hull;return draw;
}
