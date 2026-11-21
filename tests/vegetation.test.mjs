import assert from 'node:assert/strict';
import {test} from 'node:test';
import * as T from 'three';

test('foliage wind is directional, normalized, and shared by color and depth shaders',async()=>{
  const {setFoliageWind,swayMaterial}=await import('../src/foliage.js');
  const state=setFoliageWind(7.5,.82,3,4);
  assert.deepEqual(state,{time:7.5,amplitude:.82,x:.6,z:.8});

  const material=swayMaterial(new T.MeshStandardMaterial(),{blade:true,strength:1.1});
  const compile=shader=>material.onBeforeCompile(shader);
  const shader={uniforms:{},vertexShader:'#include <beginnormal_vertex>\n#include <begin_vertex>',fragmentShader:''};
  compile(shader);
  assert.equal(shader.uniforms.foliageWindDirection.value.x,.6);
  assert.equal(shader.uniforms.foliageWindDirection.value.y,.8);
  assert.match(shader.vertexShader,/foliageWindDirection/);
  assert.match(shader.vertexShader,/objectNormal/,'lit foliage bends its normals with its vertices');

  const depth={uniforms:{},vertexShader:'#include <beginnormal_vertex>\n#include <begin_vertex>',fragmentShader:''};
  material.userData.windDepth.onBeforeCompile(depth);
  assert.equal(depth.uniforms.foliageWindDirection,shader.uniforms.foliageWindDirection);
  assert.match(depth.vertexShader,/foliageWindDirection/,'shadow depth follows the same gust');
});

test('grass coverage spans the village, farm, and woodland while respecting exclusions',async()=>{
  globalThis.document??={createElement:()=>({width:0,height:0,getContext:()=>({
    fillStyle:'',textAlign:'',textBaseline:'',font:'',fillRect(){},fillText(){},beginPath(){},ellipse(){},fill(){},moveTo(){},lineTo(){},closePath(){},stroke(){},arc(){},
    createLinearGradient:()=>({addColorStop(){}}),putImageData(){},
    createImageData:(w,h)=>({data:new Uint8ClampedArray(w*h*4)}),
    getImageData:()=>({data:new Uint8ClampedArray(512*256*4)}),
  })})};
  const {grass,grassAllowed}=await import('../src/land.js');
  assert.equal(grassAllowed(1,4,'village'),false,'village path');
  assert.equal(grassAllowed(-105,60,'farm'),false,'crop soil');
  assert.equal(grassAllowed(-86,18,'farm'),false,'barn footprint');
  assert.equal(grassAllowed(-103,40,'farm'),true,'open cow pasture');
  assert.equal(grassAllowed(77,10,'woodland'),false,'woodland trail');
  assert.equal(grassAllowed(162,-55,'woodland'),false,'castle and moat');
  assert.equal(grassAllowed(110,30,'woodland'),true,'open woods');

  const scene=new T.Scene(),cover=grass(scene);
  assert.ok(cover?.meshes?.length>=3);
  assert.ok(cover.stats.village>=90000,`village meadow is too sparse at ${cover.stats.village} triangles`);
  assert.ok(Object.values(cover.stats).reduce((sum,count)=>sum+count,0)<500000,'grass stays inside the geometry budget');
  for(const zone of ['village','farm','woodland']){
    const mesh=cover.meshes.find(item=>item.userData.grassZone===zone);
    assert.ok(mesh,`${zone} grass mesh exists`);
    assert.ok(mesh.geometry.getAttribute('position').count>3000,`${zone} is visibly covered`);
    const flex=mesh.geometry.getAttribute('bladeFlex');
    let min=Infinity,max=-Infinity;for(const value of flex.array){min=Math.min(min,value);max=Math.max(max,value);}
    assert.equal(min,0,`${zone} roots stay anchored`);
    assert.ok(max>=.99,`${zone} blade tips flex`);
    assert.ok(mesh.customDepthMaterial,'grass casts wind-matched shadows');
  }
});

test('crops grow from anchored foliage before their harvest forms, with distinct flexibility',async()=>{
  const {buildFarm}=await import('../src/farm.js');
  const {getSharedMaterial}=await import('../src/model.js');
  const scene=new T.Scene(),built=buildFarm(scene);
  const barleyFoliage=scene.getObjectByName('crop-barley-foliage');
  const barleyHarvest=scene.getObjectByName('crop-barley-harvest');
  assert.ok(barleyFoliage&&barleyHarvest);
  const rootY=barleyFoliage.userData.rootY;
  built.work.fields.barley.growth=.2;built.tick(1,1/60,.4);
  assert.equal(barleyHarvest.visible,false,'young plants do not already show ripe heads or fruit');
  assert.ok(barleyFoliage.scale.y<.5);
  assert.ok(Math.abs(barleyFoliage.position.y+barleyFoliage.scale.y*rootY-rootY)<1e-6,'growth keeps roots planted');
  built.work.fields.barley.growth=.8;built.tick(2,1/60,.4);
  assert.equal(barleyHarvest.visible,true);
  assert.ok(barleyHarvest.userData.growth<barleyFoliage.userData.growth,'produce develops after foliage');
  assert.equal(barleyHarvest.scale.y,barleyFoliage.scale.y,'grain remains attached at stalk height as the head fills');

  const cropFlex=getSharedMaterial('plant').userData.foliageStrength;
  const branchFlex=getSharedMaterial('plantWood').userData.foliageStrength;
  const treeFlex=getSharedMaterial('canopy').userData.foliageStrength;
  assert.ok(branchFlex<treeFlex&&treeFlex<cropFlex,'wood, crowns, and crops react with different flexibility');
});
