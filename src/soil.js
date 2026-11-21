import * as T from 'three';
import {lakeRadius} from './lake-layout.js';
import {riverWidth,riverX} from './layout.js';

const clamp=x=>Math.min(1,Math.max(0,x));
function dampness(x,z,type){
  if(type==='field')return .29;
  if(x < -43){
    // Persistent churned ground in the pig wallow and by the cattle trough.
    const wallow=Math.hypot((x+55)/8.3,(z-38.3)/4.6);
    const trough=Math.hypot((x+93.4)/4.9,(z-35.3)/3.6);
    return .12+.85*clamp(1.5-Math.min(wallow,trough));
  }
  if(z>52&&x>=-35)return .76*clamp(1-Math.abs(lakeRadius(x,z)-1)*15);
  if(x<45)return .73*clamp(1-Math.abs(Math.abs(x-riverX(z))-riverWidth(z))*.38);
  return type==='trail'?.24:.10;
}

// Soil triangles are also the contact surface. This keeps marks on the rendered
// furrows and trails, including where a second mesh sits above the base terrain.
export function soilMesh(mesh,type='earth'){
  const p=mesh.geometry.attributes.position,values=new Float32Array(p.count);
  for(let i=0;i<p.count;i++)values[i]=dampness(p.getX(i)+mesh.position.x,p.getZ(i)+mesh.position.z,type);
  mesh.geometry.setAttribute('soilReserve',new T.BufferAttribute(values,1));
  mesh.userData.soilType=type;
  mesh.material.userData.isSoil=true;
  return mesh.material;
}
export function soilSampler(scene){
  const surfaces=[],ray=new T.Ray(),down=new T.Vector3(0,-1,0);
  scene.updateMatrixWorld(true);
  scene.traverse(mesh=>{
    if(!mesh.userData.soilType)return;
    mesh.geometry.computeBoundingBox();
    const box=mesh.geometry.boundingBox.clone().applyMatrix4(mesh.matrixWorld);
    surfaces.push({mesh,box,bins:null,columns:Math.ceil((box.max.x-box.min.x)/2)+1});
  });
  // Index the nearby ground once. Each following touchdown checks just the
  // triangles in its two-metre cell, even on the full woodland mesh.
  function index(surface){
    const {mesh,box,columns}=surface,g=mesh.geometry,p=g.attributes.position,idx=g.index.array,bins=new Map();
    for(let j=0;j<idx.length;j+=3){
      const a=idx[j],b=idx[j+1],c=idx[j+2];
      const x0=Math.floor((Math.min(p.getX(a),p.getX(b),p.getX(c))+mesh.position.x-box.min.x)/2);
      const x1=Math.floor((Math.max(p.getX(a),p.getX(b),p.getX(c))+mesh.position.x-box.min.x)/2);
      const z0=Math.floor((Math.min(p.getZ(a),p.getZ(b),p.getZ(c))+mesh.position.z-box.min.z)/2);
      const z1=Math.floor((Math.max(p.getZ(a),p.getZ(b),p.getZ(c))+mesh.position.z-box.min.z)/2);
      for(let z=z0;z<=z1;z++)for(let x=x0;x<=x1;x++){
        const key=z*columns+x;let cell=bins.get(key);if(!cell)bins.set(key,cell=[]);cell.push(j);
      }
    }
    return bins;
  }
  const a=new T.Vector3(),b=new T.Vector3(),c=new T.Vector3(),hit=new T.Vector3(),normal=new T.Vector3(),weights=new T.Vector3();
  return (x,z)=>{
    let best=null;
    for(const s of surfaces){
      const {mesh,box}=s;
      if(!mesh.visible||x<box.min.x||x>box.max.x||z<box.min.z||z>box.max.z)continue;
      s.bins??=index(s);
      const cell=s.bins.get(Math.floor((z-box.min.z)/2)*s.columns+Math.floor((x-box.min.x)/2));
      if(!cell)continue;
      const {geometry:g,position:offset}=mesh,idx=g.index.array,p=g.attributes.position;
      ray.origin.set(x-offset.x,box.max.y-offset.y+1,z-offset.z);ray.direction.copy(down);
      for(const j of cell){
        const i0=idx[j],i1=idx[j+1],i2=idx[j+2];
        a.fromBufferAttribute(p,i0);b.fromBufferAttribute(p,i1);c.fromBufferAttribute(p,i2);
        if(!ray.intersectTriangle(a,b,c,false,hit))continue;
        const y=hit.y+offset.y;
        if(best&&best.y>=y)continue;
        T.Triangle.getNormal(a,b,c,normal);if(normal.y<0)normal.negate();
        T.Triangle.getBarycoord(hit,a,b,c,weights);
        const m=g.attributes.soilReserve;
        const reserve=m.getX(i0)*weights.x+m.getX(i1)*weights.y+m.getX(i2)*weights.z;
        best={y,nx:normal.x,ny:normal.y,nz:normal.z,soft:true,reserve:Math.max(reserve,mesh.material.userData.watered?.value??0),loose:mesh.userData.soilType!=='earth'||reserve>.22};
      }
    }
    return best;
  };
}
