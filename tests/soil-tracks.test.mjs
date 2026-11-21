import assert from 'node:assert/strict';
import {test} from 'node:test';
import * as T from 'three';
import {soilMesh,soilSampler} from '../src/soil.js';
import {buildFootprints} from '../src/footprints.js';
import {groundForPrint} from '../src/footfall.js';

function ground(scene,y,type){
  const g=new T.PlaneGeometry(4,4,3,3).rotateX(-Math.PI/2);
  const p=g.attributes.position;
  for(let i=0;i<p.count;i++)p.setY(i,p.getX(i)*.15);
  const m=new T.Mesh(g,new T.MeshStandardMaterial());m.position.set(-55,y,38);
  scene.add(m);soilMesh(m,type);return m;
}
test('tracks use the highest visible soil triangle and its slope, including raised furrows',()=>{
  const scene=new T.Scene();
  ground(scene,1,'pasture');const bed=ground(scene,1.1,'field');
  const sample=soilSampler(scene),x=-54.23,z=38.63;
  assert.ok(Math.abs(sample(x,z).y-(1.1+.77*.15))<1e-5);
  bed.visible=false;const field=sample(x,z);
  assert.ok(Math.abs(field.y-(1+.77*.15))<1e-5);
  assert.ok(field.nx<0&&field.ny>.95&&field.reserve>.7);
  assert.equal(sample(-34,z),null);
});

test('hoof, paw, bird and alternating boot impressions use oriented, bounded instances',()=>{
  const scene=new T.Scene(),dry={wetness:0,snowpack:0,rain:0,snow:0};
  const track=buildFootprints(scene,(x,z)=>({y:.73,nx:0,ny:1,nz:0,soft:x>0,reserve:.8,loose:true}));
  const mesh=scene.getObjectByName('Ground impressions'),data=mesh.geometry.attributes.track;
  assert.equal(track.plant({x:-1,z:0,yaw:0},dry),null);
  assert.equal(track.plant({x:1,z:0,yaw:0,side:-1},dry),'mud');
  for(const [i,kind] of ['hoof','paw','bird'].entries()){
    track.plant({x:1,z:1,yaw:Math.PI/2,kind,width:.08,length:.12,side:'left'},dry);
    const index=mesh.count-1;assert.equal(data.getZ(index),i+1);assert.equal(data.getW(index),-1);
    const pose=new T.Matrix4();mesh.getMatrixAt(index,pose);
    assert.ok(pose.elements[4]<0&&Math.abs(pose.elements[6])<1e-10);
  }
  assert.equal(data.getW(0),-1);
  const initial=data.getX(0);track.tick(9,{...dry,rain:1});assert.ok(data.getX(0)<initial);
  for(let i=0;i<mesh.instanceMatrix.count+10;i++)track.plant({x:1,z:0,yaw:0,kind:'hoof',side:1},dry);
  assert.equal(mesh.count,mesh.instanceMatrix.count);
  assert.equal(data.getZ(0),0,'animal traffic preserves player boot slots');
  assert.equal(groundForPrint(dry,true,0,true),'earth');
  assert.equal(groundForPrint({...dry,snowpack:.85},true,.8,true),'snow');
});
