import assert from 'node:assert/strict';
import {test} from 'node:test';
import * as T from 'three';

function installDocumentStub(){
  const nodes=new Map(),classList={add(){},remove(){},toggle(){}};
  globalThis.document={
    body:{classList},
    createElement(tag){return {tagName:tag,textContent:'',append(){},replaceChildren(){},setAttribute(){},classList};},
    getElementById(id){
      if(!nodes.has(id))nodes.set(id,{id,textContent:'',hidden:false,disabled:false,append(){},replaceChildren(){},setAttribute(){},classList});
      return nodes.get(id);
    },
    querySelector(){return {focus(){}};},
  };
}

test('woodland animals emit typed, grounded contacts through the optional callback',async()=>{
  installDocumentStub();
  const {buildHunting}=await import('../src/hunting.js');
  const scene=new T.Scene(),camera=new T.PerspectiveCamera(),trees=new T.Group(),marks=[];
  camera.position.set(45,1.6,40);
  const trunk={x:67,z:3,r:.8},clear=(x,z)=>Math.hypot(x-trunk.x,z-trunk.z)>=trunk.r;
  const hunting=buildHunting(scene,camera,()=>0,clear,trees,()=>{},mark=>marks.push(mark));
  let stag;
  scene.traverse(object=>{if(object.userData.animal?.spec.form==='stag')stag=object.userData.animal;});
  assert.ok(stag,'red deer rig is available');
  const stagBox=new T.Box3().setFromObject(stag.rig.root),stagSize=new T.Vector3();stagBox.getSize(stagSize);
  assert.ok(stag.collisionRadius>=Math.max(stagSize.x,stagSize.z)*.5-.02,'deer clearance contains the rendered body and antlers');
  for(let i=0;i<1200;i++){
    hunting.tick(1/60,false,false);
    if(i%15===0)assert.ok(Math.hypot(stag.rig.root.position.x-trunk.x,stag.rig.root.position.z-trunk.z)>=trunk.r+stag.collisionRadius-.01,
      'the full deer body remains outside the trunk');
  }
  assert.ok(marks.length>12,'distance-driven woodland strides produce touchdowns');
  assert.ok(marks.some(mark=>mark.kind==='hoof'));
  assert.ok(marks.some(mark=>mark.kind==='paw'));
  assert.ok(marks.some(mark=>mark.kind==='bird'));
  for(const mark of marks){
    assert.equal(mark.y,0);
    assert.ok(Number.isFinite(mark.x)&&Number.isFinite(mark.z)&&Number.isFinite(mark.yaw));
    assert.ok(mark.width>0&&mark.length>0&&['left','right'].includes(mark.side));
  }
});
