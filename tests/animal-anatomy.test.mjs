import assert from 'node:assert/strict';
import {test} from 'node:test';
import * as T from 'three';

function installCanvasStub(){
  globalThis.document??={createElement(){return {width:0,height:0,getContext:()=>({
    fillStyle:'',strokeStyle:'',lineWidth:0,globalAlpha:1,filter:'',
    fillRect(){},clearRect(){},beginPath(){},moveTo(){},lineTo(){},arc(){},ellipse(){},stroke(){},fill(){},closePath(){},
    createLinearGradient:()=>({addColorStop(){}}),createRadialGradient:()=>({addColorStop(){}}),
    getImageData:()=>({data:new Uint8ClampedArray(512*512*4)}),putImageData(){},createImageData:(w,h)=>({data:new Uint8ClampedArray(w*h*4)}),
  })};}};
}

test('deer have four articulated, cloven-hoofed weight-bearing legs',async()=>{
  const {forestAnimal}=await import('../src/forest-models.js');
  const rig=forestAnimal({form:'stag',length:1.95,coat:'#9b654a',accent:'#d6b694'});
  assert.equal(rig.legs.length,4);
  for(const leg of rig.legs){
    assert.match(leg.upper.name,/deer (front|hind) (left|right) upper leg/);
    assert.equal(leg.lower.parent,leg.upper);
    assert.equal(leg.foot.parent,leg.lower);
    assert.equal(leg.foot.userData.cloven,true);
    const upperMesh=leg.upper.children.find(child=>child.isMesh);upperMesh.geometry.computeBoundingBox();
    assert.ok(upperMesh.geometry.boundingBox.min.y<=leg.lower.position.y+.002,'upper leg reaches its knee pivot');
    assert.equal(leg.foot.userData.toes,2);
  }
  const bounds=new T.Box3().setFromObject(rig.root);
  assert.ok(bounds.min.y<.04,'hooves reach the ground');
});

test('woodland birds have connected shanks and visible anisodactyl toes',async()=>{
  const {forestAnimal}=await import('../src/forest-models.js');
  const rig=forestAnimal({form:'pheasant',length:.70,coat:'#ad794a',accent:'#405d50'});
  for(const leg of rig.legs){
    const upperMesh=leg.upper.children.find(child=>child.isMesh);upperMesh.geometry.computeBoundingBox();
    assert.ok(upperMesh.geometry.boundingBox.min.y<=leg.lower.position.y+.002);
    assert.equal(leg.foot.userData.toes,4);
    const footMesh=leg.foot.children.find(child=>child.isMesh);footMesh.geometry.computeBoundingBox();
    const box=footMesh.geometry.boundingBox;
    assert.ok(box.max.x-box.min.x>.12&&box.max.z-box.min.z>.12,'three forward toes and a rear toe create a readable foot');
  }
});

test('dragon exposes a connected neck, expressive head, and four named clawed feet',async()=>{
  installCanvasStub();
  const {makeDragon}=await import('../src/dragon.js');
  const parent=new T.Group();makeDragon(parent);
  const names=[],named=new Map();parent.traverse(object=>{names.push(object.name);if(object.name)named.set(object.name,object);});
  assert.ok(names.includes('dragon neck'));
  assert.ok(names.includes('dragon head'));
  assert.ok(names.includes('dragon lower jaw'));
  for(const end of ['front left','front right','hind left','hind right']){
    assert.ok(names.includes(`dragon ${end} foot`),end);
    assert.ok(names.filter(name=>name.startsWith(`dragon ${end} claw`)).length>=3,`${end} has three claws`);
    const leg=named.get(`dragon ${end} leg`),foot=named.get(`dragon ${end} foot`);
    assert.ok(new T.Vector3(...leg.userData.taper.end).distanceTo(new T.Vector3(...foot.userData.taper.start))<1e-8,
      `${end} leg joins its foot at one ankle ring`);
    const footBox=new T.Box3().setFromObject(foot);
    for(let i=1;i<=3;i++){
      const claw=named.get(`dragon ${end} claw ${i}`),clawBox=new T.Box3().setFromObject(claw);
      assert.ok(clawBox.max.z-clawBox.min.z<.58,'terminal claws stay shorter than the toes');
      assert.ok(clawBox.min.y<=footBox.min.y+.09,'claws plant at the same ground plane as the pad');
    }
  }
  const neck=named.get('dragon neck core'),head=named.get('dragon head');
  assert.ok(new T.Vector3(...neck.userData.taper.end).distanceTo(new T.Vector3(...head.userData.taper.start))<1e-8,
    'neck and skull share a cross-section centre');
  const collar=neck.geometry.attributes.position,skull=head.geometry.attributes.position;
  const sides=neck.userData.taper.sides;
  assert.equal(sides,head.userData.taper.sides);
  for(let i=0;i<sides;i++)assert.ok(
    new T.Vector3().fromBufferAttribute(collar,collar.count-sides+i).distanceTo(new T.Vector3().fromBufferAttribute(skull,i))<1e-6,
    'the skull meets the entire circumference of the neck with no open wedge');
  const headBox=new T.Box3().setFromObject(head),jawBox=new T.Box3().setFromObject(named.get('dragon lower jaw'));
  assert.equal(headBox.intersectsBox(jawBox),true,'lower jaw seats inside the skull silhouette');

  for(const surface of [neck,head]){
    const {sides,rings,startAxis,endAxis}=surface.userData.taper,index=surface.geometry.index.array,pos=surface.geometry.attributes.position;
    const cap=index.length-(sides-2)*6;
    const triangleNormal=(offset)=>{
      const a=new T.Vector3().fromBufferAttribute(pos,index[offset]),b=new T.Vector3().fromBufferAttribute(pos,index[offset+1]),c=new T.Vector3().fromBufferAttribute(pos,index[offset+2]);
      return b.sub(a).cross(c.sub(a)).normalize();
    };
    assert.ok(triangleNormal(cap).dot(new T.Vector3(...startAxis))<-.9,'start cap faces out of the tube');
    assert.ok(triangleNormal(cap+3).dot(new T.Vector3(...endAxis))>.9,'end cap faces out of the tube');
    assert.ok(rings>=4);
  }
});

test('farm animals have geometry-sized collision bodies and species-specific feet',async()=>{
  installCanvasStub();
  const {livestock}=await import('../src/farm-livestock.js');
  const root=new T.Group(),animals=livestock(root);
  for(const kind of ['cow','pig','chicken']){
    const animal=animals.find(item=>item.userData.farmAnimal===kind),motion=animal.userData.motion;
    const box=new T.Box3().setFromObject(animal),size=new T.Vector3();box.getSize(size);
    assert.ok(motion.collisionRadius>=Math.max(size.x,size.z)*.5-.02,`${kind} collision radius contains its visible silhouette`);
    if(kind==='chicken')assert.ok(motion.limbs.every(leg=>leg.foot.userData.toes===4));
    else assert.ok(motion.limbs.every(leg=>leg.foot.userData.cloven===true));
  }
});
