import assert from 'node:assert/strict';
import {test} from 'node:test';

test('animal clearance checks the whole body and swept path',async()=>{
  const {discIsClear,pathIsClear,moveWithClearance}=await import('../src/animal-collision.js');
  const clear=(x,z)=>Math.hypot(x,z)>=1;

  assert.equal(discIsClear(clear,1.3,0,.35),false,'body radius reaches the trunk');
  assert.equal(discIsClear(clear,1.5,0,.35),true);
  assert.equal(pathIsClear(clear,-2,0,2,0,.3),false,'a clear endpoint cannot tunnel through a trunk');

  const slid=moveWithClearance(clear,-1.5,-1.5,.8,1.1,.3);
  assert.ok(slid.x===-1.5||slid.z===-1.5,'blocked diagonal motion may slide along one clear axis');
  assert.equal(pathIsClear(clear,-1.5,-1.5,slid.x,slid.z,.3),true);
});

test('geometry footprint is root-relative and contains asymmetric rotated rigs',async()=>{
  const T=await import('three'),{geometryFootprintRadius}=await import('../src/animal-collision.js');
  const root=new T.Group(),nose=new T.Mesh(new T.BoxGeometry(4,.5,1));nose.position.x=1.5;root.add(nose);
  const radius=geometryFootprintRadius(root,0);
  assert.ok(radius>=3.5,'forward geometry is measured from the actor root, not half its AABB width');
  root.rotation.y=.73;root.updateWorldMatrix(true,true);
  const origin=new T.Vector3();root.getWorldPosition(origin);
  for(const x of [-.5,3.5])for(const z of [-.5,.5]){
    const point=new T.Vector3(x,0,z).applyMatrix4(root.matrixWorld);
    assert.ok(Math.hypot(point.x-origin.x,point.z-origin.z)<=radius+1e-9,'rotation remains inside the circular footprint');
  }
});

test('open-point search relocates livestock spawned inside a solid',async()=>{
  const {nearestOpenPoint}=await import('../src/animal-collision.js');
  const clear=(x,z)=>!(x>-.8&&x<.8&&z>-.8&&z<.8);
  const point=nearestOpenPoint(clear,0,0,.2,{minX:-2,maxX:2,minZ:-2,maxZ:2});
  assert.ok(point);
  assert.equal(discIsClearAt(clear,point.x,point.z,.2),true);

  function discIsClearAt(predicate,x,z,radius){
    if(!predicate(x,z))return false;
    for(let i=0;i<8;i++)if(!predicate(x+Math.cos(i*Math.PI/4)*radius,z+Math.sin(i*Math.PI/4)*radius))return false;
    return true;
  }
});

test('woodland wildlife clearance indexes trees, lanterns, logs, and substantial rocks',async()=>{
  globalThis.document??={createElement:()=>({width:0,height:0,getContext:()=>({
    fillStyle:'',textAlign:'',textBaseline:'',font:'',fillRect(){},fillText(){},beginPath(){},ellipse(){},fill(){},moveTo(){},lineTo(){},closePath(){},stroke(){},arc(){},
    createLinearGradient:()=>({addColorStop(){}}),putImageData(){},createImageData:(w,h)=>({data:new Uint8ClampedArray(w*h*4)}),
    getImageData:()=>({data:new Uint8ClampedArray(512*256*4)}),
  })})};
  const T=await import('three'),{buildWoodland}=await import('../src/woodland.js');
  const woodland=buildWoodland(new T.Group());
  for(const kind of ['trees','lanterns','logs','rocks']){
    assert.ok(woodland.collisionStats[kind]>0,`${kind} are registered`);
    const sample=woodland.collisionSamples[kind];
    assert.equal(woodland.clear(sample.x,sample.z),false,`${kind} sample blocks wildlife movement`);
  }
});
