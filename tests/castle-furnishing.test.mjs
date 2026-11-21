import test from 'node:test';
import assert from 'node:assert/strict';
import {Group} from 'three';

globalThis.document??={createElement:()=>({getContext:()=>({
  createImageData:(w,h)=>({data:new Uint8ClampedArray(w*h*4)}),putImageData(){},
  getImageData:()=>({data:new Uint8ClampedArray(512*256*4)}),fillRect(){},fillText(){},beginPath(){},moveTo(){},lineTo(){},ellipse(){},arc(){},fill(){},stroke(){},closePath(){},
  createLinearGradient:()=>({addColorStop(){}}),createRadialGradient:()=>({addColorStop(){}}),
})})};
const {CastleKit}=await import('../src/castle-kit.js');
const {buildKeep,buildHousehold,buildWings}=await import('../src/castle-rooms.js');
const kit=new CastleKit(new Group()),windows=[],furniture=[];
const place=kit.furnishing.bind(kit),wall=kit.wall.bind(kit);
kit.furnishing=(x,z,base,w,d,draw,yaw=0,h=1)=>{
  const c=Math.abs(Math.cos(yaw)),s=Math.abs(Math.sin(yaw));
  furniture.push({x,z,base,w:(w*c+d*s)/2,d:(w*s+d*c)/2,h});
  return place(x,z,base,w,d,draw,yaw,h);
};
kit.wall=(axis,line,start,end,base,h,openings,...rest)=>{
  for(const [center,w,sill] of openings)if(sill>0)windows.push({axis,line,center,w,base,sill});
  return wall(axis,line,start,end,base,h,openings,...rest);
};
kit.slab(-25,25,-23,22,0);buildKeep(kit);buildWings(kit);buildHousehold(kit);

test('castle service rooms have usable floor space, furnishings, and courtyard access',()=>{
  const rooms=['Bakehouse','Brewhouse','Guest chamber','Laundry & linen room','Falconry','Hound keeper','Bathhouse','Mending room','Guard barracks','Armoury','Smithy','Infirmary','Servants’ quarters','Stables'];
  const queue=[[0,12]],visited=new Set(['0,12']),reached=new Set();
  for(let head=0;head<queue.length;head++){
    const [x,z]=queue[head];reached.add(kit.location(x,z,0));
    for(const [dx,dz] of [[.5,0],[-.5,0],[0,.5],[0,-.5]]){
      const xx=x+dx,zz=z+dz,key=xx+','+zz;
      if(visited.has(key)||Math.abs(xx)>24||zz< -4.5||zz>21.5)continue;
      visited.add(key);if(kit.floorAt(xx,zz,0)!==null)queue.push([xx,zz]);
    }
  }
  for(const name of rooms){
    const room=kit.zones.find(zone=>zone.name===name);assert.ok(room,name);
    assert.ok((room.x2-room.x1)*(room.z2-room.z1)>30,name+' has a functional floor plan');
    assert.ok(furniture.filter(f=>f.base===0&&f.x>room.x1&&f.x<room.x2&&f.z>room.z1&&f.z<room.z2).length>=2,name+' has distinct fittings');
    assert.ok(reached.has(name),name+' can be entered from the courtyard');
  }
});
test('royal suite has room to circulate and tall cabinets clear window recesses',()=>{
  const room=kit.zones.find(zone=>zone.name==='King’s chamber');
  assert.ok((room.x2-room.x1)*(room.z2-room.z1)>=130);
  const royal=furniture.filter(f=>f.base===room.base&&f.x>room.x1&&f.x<room.x2&&f.z>room.z1&&f.z<room.z2);
  assert.ok(royal.length>=11);
  for(const [x,z] of [[6,-15.13],[8.6,-9.75],[12,-16.65],[16.65,-15],[10,-11.05]])
    assert.equal(kit.floorAt(x,z,room.base),room.base,'royal route at '+x+','+z);
  for(const win of windows)for(const f of furniture){
    if(f.base!==win.base||f.h<=win.sill)continue;
    const [cross,along,depth,width]=win.axis==='x'?[f.z,f.x,f.d,f.w]:[f.x,f.z,f.w,f.d];
    assert.ok(Math.abs(cross-win.line)>depth+.46||Math.abs(along-win.center)>(width+win.w/2),
      'window at '+win.axis+'='+win.line+', '+win.center+' behind tall furniture at '+f.x+','+f.z);
  }
});
