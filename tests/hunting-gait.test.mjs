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
  const hunting=buildHunting(scene,camera,()=>0,()=>true,trees,()=>{},mark=>marks.push(mark));
  for(let i=0;i<1200;i++)hunting.tick(1/60,false,false);
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
