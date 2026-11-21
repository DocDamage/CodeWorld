import * as T from 'three';
import { surfaces,glazing } from './surfaces.js';
import { swayMaterial } from './foliage.js';
import { skullFaceGeometry } from './skull.js';
import {cropGeometry} from './crop-geometry.js';

export const TAU = Math.PI * 2;
export const v = (x,y,z) => new T.Vector3(x,y,z);
let seed = 42121;
export function random() { seed = (Math.imul(seed,1664525)+1013904223)>>>0; return seed/4294967296; }
export const range = (a,b) => a+(b-a)*random();
export const pick = a => a[Math.floor(random()*a.length)];
export function tint(hex, amount=.09) {
  const color = new T.Color(hex);
  return color.multiplyScalar(range(1-amount,1+amount));
}
function extrude(points, depth) {
  const shape = new T.Shape();
  points.forEach(([x,y],i) => i ? shape.lineTo(x,y) : shape.moveTo(x,y));
  shape.closePath();
  return new T.ExtrudeGeometry(shape,{depth,bevelEnabled:false}).translate(0,0,-depth/2);
}
const shingle = extrude([[-.5,-.5],[.29,-.5],[.43,-.42],[.5,-.23],[.5,.23],[.43,.42],[.29,.5],[-.5,.5]],1).rotateX(-Math.PI/2);
const fieldstone=new T.DodecahedronGeometry(.5,0);
{
  const p=fieldstone.attributes.position;
  for(let i=0;i<p.count;i++){
    const x=p.getX(i),y=p.getY(i),z=p.getZ(i),weather=.91+.08*Math.sin(x*17+y*31+z*47);
    p.setXYZ(i,x*weather,y*(.82+.08*Math.cos(x*29+z*13)),z*weather);
  }
  fieldstone.computeVertexNormals();
}
const geometries = {
  ...cropGeometry,
  paver:extrude([[-.49,-.38],[-.36,-.5],[.38,-.48],[.50,-.34],[.48,.37],[.35,.5],[-.41,.48],[-.5,.34]],1).rotateX(-Math.PI/2),
  box: new T.BoxGeometry(1,1,1), ball:new T.SphereGeometry(.5,12,8),
  leaf:new T.IcosahedronGeometry(.5,0), crown:new T.IcosahedronGeometry(.5,1),
  cyl:new T.CylinderGeometry(.5,.5,1,12), barrel:new T.LatheGeometry([[.38,-.5],[.46,-.43],[.5,-.15],[.5,.15],[.46,.43],[.38,.5]].map(p=>new T.Vector2(...p)),12),
  cone:new T.ConeGeometry(.5,1,9), pine:new T.ConeGeometry(.5,1,9,1),
  spire:new T.ConeGeometry(.5,1,4).rotateY(Math.PI/4),
  millBody:new T.CylinderGeometry(.43,.55,1,24), roofScale:extrude([[-.5,-.38],[-.36,-.5],[.33,-.5],[.5,-.38],[.42,.5],[-.42,.5]],1),
  gable:extrude([[-.5,0],[.5,0],[0,1]],1), tile:shingle,
  disk:new T.CylinderGeometry(.5,.5,1,24),coin:new T.CylinderGeometry(.5,.5,1,8),ring:new T.TorusGeometry(.5,.052,6,40),
  arch:extrude([[-.5,-.5],[.5,-.5],[.5,.17],[.43,.33],[.23,.46],[0,.5],[-.23,.46],[-.43,.33],[-.5,.17]],1),
  stone:fieldstone, skull:skullFaceGeometry()
};
const standard = new T.MeshStandardMaterial({roughness:.89,metalness:0});
export const glass = glazing();
const glow = new T.MeshBasicMaterial({color:0xffdf95});
const gilt=new T.MeshStandardMaterial({roughness:.32,metalness:.55,emissive:'#412407',emissiveIntensity:.24});
const jewel=new T.MeshPhysicalMaterial({roughness:.27,metalness:.23,clearcoat:.68,clearcoatRoughness:.17,flatShading:true});
const plant=swayMaterial(standard.clone(),{strength:.72}),plantWood=swayMaterial(surfaces.wood.clone(),{strength:.16});
swayMaterial(surfaces.canopy,{strength:.48,crown:true});
const materials={standard,glass,glow,gilt,jewel,plant,plantWood,...surfaces};
export function getSharedMaterial(name='standard') { return materials[name]; }
export function registerSharedMaterial(name,material) {
  if(!name||materials[name])return false;
  materials[name]=material;return true;
}
const angles = new T.Euler(), rot = new T.Quaternion();
const unitY = v(0,1,0);
export class Builder {
  constructor(root) { this.root=root; this.frame=new T.Matrix4(); this.batches=new Map(); }
  group(x,y,z,yaw,fn) {
    const old=this.frame;
    this.frame=old.clone().multiply(new T.Matrix4().makeTranslation(x,y,z)).multiply(new T.Matrix4().makeRotationY(yaw));
    try {fn();} finally {this.frame=old;}
  }
  put(type,color,x,y,z,sx,sy,sz,rx=0,ry=0,rz=0,material='standard') {
    if(material==='standard' && type==='tile') material='roofTile';
    this.place(type,color,v(x,y,z),rot.setFromEuler(angles.set(rx,ry,rz)),v(sx,sy,sz),material);
  }
  place(type,color,pos,orientation,scale,material='standard') {
    const key=type+'-'+material;
    if(!this.batches.has(key)) this.batches.set(key,{type,material,matrices:[],colors:[]});
    const b=this.batches.get(key);
    b.matrices.push(new T.Matrix4().compose(pos,orientation,scale).premultiply(this.frame));
    b.colors.push(new T.Color(color));
  }
  beam(color,a,b,width,depth=width,type='box',material='standard') {
    const dir=b.clone().sub(a);
    this.place(type,color,a.clone().lerp(b,.5),new T.Quaternion().setFromUnitVectors(unitY,dir.clone().normalize()),v(width,dir.length(),depth),material);
  }
  finish() {
    for(const {type,material,matrices,colors} of this.batches.values()) {
      const geometry=geometries[type],surface=materials[material];
      if(!geometry)throw new Error(`Unknown shared geometry: ${type}`);
      if(!surface)throw new Error(`Unknown shared material: ${material}`);
      const mesh=new T.InstancedMesh(geometry,surface,matrices.length);
      matrices.forEach((m,i)=>{mesh.setMatrixAt(i,m);mesh.setColorAt(i,colors[i]);});
      mesh.castShadow=material!=='glow'&&material!=='glass';mesh.receiveShadow=mesh.castShadow;
      if(mesh.material.userData.windDepth)mesh.customDepthMaterial=mesh.material.userData.windDepth;
      this.root.add(mesh);
    }
    this.batches.clear();
  }
}
export function meshSurface(root, positions, indices, colors, options={}) {
  const g=new T.BufferGeometry();
  g.setAttribute('position',new T.Float32BufferAttribute(positions,3));
  g.setAttribute('color',new T.Float32BufferAttribute(colors,3));g.setIndex(indices);g.computeVertexNormals();
  const m=new T.Mesh(g,new T.MeshStandardMaterial({vertexColors:true,side:T.DoubleSide,flatShading:true,...options}));
  m.receiveShadow=true;root.add(m);return m;
}
export function label(root,builder,text,color,x,y,z,width,height) {
  const c=document.createElement('canvas');c.width=512;c.height=128;
  const ctx=c.getContext('2d');ctx.fillStyle=color;ctx.textAlign='center';ctx.textBaseline='middle';
  ctx.font='bold 68px Georgia';ctx.fillText(text,256,66,482);
  const map=new T.CanvasTexture(c);map.colorSpace=T.SRGBColorSpace;
  const m=new T.Mesh(new T.PlaneGeometry(width,height),new T.MeshBasicMaterial({map,transparent:true,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-2}));
  m.position.set(x,y,z);m.applyMatrix4(builder.frame);root.add(m);
}
