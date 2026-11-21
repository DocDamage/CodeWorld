import {soilMesh} from './soil.js';
import {swayMaterial} from './foliage.js';
import * as T from 'three';
import { Builder, TAU, label, meshSurface, v, tint, range } from './model.js';
import { farm, farmClear, farmHeight, fieldAt, fieldPlan, farmFencePlan, farmStations } from './farm-layout.js';
import {createFarmWork,milkingDuration} from './farm-state.js';
import {buildFarmEquipment} from './farm-equipment.js';
import {buildWorksites} from './farm-worksite.js';
import {livestock} from './farm-livestock.js';
import { mountSmoke } from './smoke.js';
import {trackYaw,updateGait} from './animal-gait.js';
import {moveWithClearance,nearestOpenPoint} from './animal-collision.js';

export { farm, farmHeight, farmClear, fieldPlan, animalPlan } from './farm-layout.js';

const timber = '#735238', darkTimber = '#4e392b', iron = '#454945';
const red = '#8d4136', cream = '#d6c9a8', stone = '#8c8878';
const leafMaterial = 'plant';

function terrain(root) {
  const positions = [], indices = [], colors = [], uvs = [];
  const { minX, maxX, minZ, maxZ } = farm.bounds;
  const margin=11, nx = 79, nz = 105, grass = new T.Color('#68794d'), soil = new T.Color('#786248');
  for (let j = 0; j <= nz; j++) for (let i = 0; i <= nx; i++) {
    const x = minX - margin + i;
    const z = minZ - margin + j;
    const edge=Math.hypot(Math.max(minX-x,0),Math.max(minZ-z,0,z-maxZ));
    positions.push(x, farmHeight(x, z) + .014 - Math.min(1,edge / margin)*1.64, z); uvs.push(i / nx * 18, j / nz * 22);
    const color = grass.clone().multiplyScalar(.92 + .1 * Math.sin(i * 2.17 + j * .73));
    const field = fieldPlan.find(f => x >= f.minX && x <= f.maxX && z >= f.minZ && z <= f.maxZ);
    if (field) color.lerp(soil, .46 + .08 * Math.sin(i * .9));
    const lane = Math.abs(z - 24) < 2.2 || (z > 22 && Math.abs(x + 86) < 1.7);
    if (lane) color.lerp(new T.Color('#8c8066'), .72);
    colors.push(color.r, color.g, color.b);
    if (i && j && !(x > -54.25 && z <= minZ)) { const n = j * (nx + 1) + i; indices.push(n - nx - 2, n - 1, n, n - nx - 2, n, n - nx - 1); }
  }
  const ground = meshSurface(root, positions, indices, colors, { roughness: 1 });
  ground.geometry.setAttribute('uv', new T.Float32BufferAttribute(uvs, 2));
  ground.name = 'Farm terrain';soilMesh(ground,'pasture');
  return ground;
}

function heightAt(x, z, lift = 0) { return farmHeight(x, z) + lift; }

function fence(b, ax, az, bx, bz, style = 'rail') {
  const length = Math.hypot(bx - ax, bz - az), count = Math.max(1, Math.ceil(length / 2.45));
  for (let i = 0; i <= count; i++) {
    const t = i / count, x = ax + (bx - ax) * t, z = az + (bz - az) * t, y = heightAt(x, z);
    b.put('box', darkTimber, x, y + .67, z, .13, 1.34, .13, 0, 0, 0, 'wood');
  }
  for (let i = 0; i < count; i++) {
    const t0 = i / count, t1 = (i + 1) / count;
    const x0 = ax + (bx - ax) * t0, z0 = az + (bz - az) * t0;
    const x1 = ax + (bx - ax) * t1, z1 = az + (bz - az) * t1;
    for (const lift of style === 'wire' ? [.34, .67, 1] : [.42, 1.02])
      b.beam(style === 'wire' ? iron : timber, v(x0, heightAt(x0, z0, lift), z0), v(x1, heightAt(x1, z1, lift), z1), style === 'wire' ? .025 : .065, style === 'wire' ? .025 : .09, style === 'wire' ? 'cyl' : 'box');
  }
}

function gate(b,x,z,axis,halfWidth){
  for(const side of [-1,1]){
    const hx=x+Math.cos(axis)*halfWidth*side,hz=z-Math.sin(axis)*halfWidth*side;
    b.group(hx,heightAt(hx,hz),hz,axis-Math.PI/2,()=>{
      b.put('box',darkTimber,0,.75,0,.165,1.5,.165,0,0,0,'agedWood');
      b.put('box',darkTimber,halfWidth-.09,.58,0,.106,1.10,.10,0,0,0,'agedWood');
      for(const y of [.35,.95]){
        b.put('box',timber,halfWidth*.50,y,0,halfWidth,.088,.108,0,0,0,'agedWood');
        b.put('box',iron,.069,y,.078,.26,.095,.053,0,0,0,'iron');
      }
      b.beam(timber,v(.08,.33,0),v(halfWidth-.10,.97,0),.057,.072,'box','wood');
    });
  }
}

function barn(b) {
  const x = -86, z = 18.2, y = heightAt(x, z);
  b.group(x, y, z, 0, () => {
    b.put('box', '#777164', 0, .16, 0, 17, .32, 13.4, 0, 0, 0, 'stone');
    for (const side of [-1, 1]) {
      b.put('box', red, side * 7.87, 2.55, 0, .28, 4.9, 12.7, 0, 0, 0, 'wood');
      for (let zz = -5.3; zz <= 5.3; zz += 1.33) b.put('box', cream, side * 8.04, 2.55, zz, .075, 4.5, .075);
    }
    for (const end of [-1, 1]) {
      b.put('box', red, 0, 2.55, end * 6.22, 16, 4.9, .27, 0, 0, 0, 'wood');
      b.put('gable', red, 0, 4.98, end * 6.22, 16, 3.75, .28);
      for (const door of [-1, 1]) b.put('box', darkTimber, door * 2.08, 2.12, end * 6.39, 3.72, 4.12, .12, 0, 0, 0, 'wood');
      for (const door of [-1, 1]) for (const s of [-1, 1]) b.beam(cream, v(door * 2.08 - s * 1.48, .4, end * 6.47), v(door * 2.08 + s * 1.48, 3.83, end * 6.47), .07, .08);
    }
    for (const side of [-1, 1]) b.put('box', '#6f3a32', side * 4.03, 6.89, 0, 8.96, .25, 13.9, 0, 0, -side * .45, 'roofTile');
    b.put('box', '#4e342b', 0, 8.91, 0, .29, .28, 14.1, 0, 0, 0, 'wood');
    for (let zz = -4.8; zz <= 4.8; zz += 2.4) for (const xx of [-6.7, 6.7]) b.put('box', darkTimber, xx, 2.45, zz, .25, 4.9, .25, 0, 0, 0, 'wood');
  });

  // Open milking parlor: six locking stalls, a clear central aisle, milk line and cans.
  const py = heightAt(-86, 29);
  b.group(-86, py, 29, 0, () => {
    for (const side of [-1, 1]) {
      for (let i = -3; i <= 3; i++) {
        b.put('cyl', iron, side * 2.18, 1.05, i * 1.42, .09, 2.1, .09);
        if (i < 3) {
          b.put('box', '#8b8067', side * 3.12, .32, i * 1.42 + .7, 1.75, .62, 1.23, 0, 0, 0, 'wood');
          b.put('cyl', '#c5b88f', side * 1.9, .52, i * 1.42 + .7, .23, .56, .23);
        }
      }
      for (const h of [.58, 1.42]) b.put('box', iron, side * 2.18, h, 0, .08, .08, 8.8);
      b.put('box', '#715349', side * 3.15, 2.76, 0, 2.25, .16, 9.5, 0, 0, -side * .08, 'roofTile');
    }
    b.put('cyl', '#b7b1a1', 0, 2.17, 0, .1, 8.9, .1, Math.PI / 2);
    for (const zz of [-3.4, -1.2, 1.1, 3.3]) b.put('cyl', '#9ba19b', -.65, .43, zz, .42, .78, .42);
  });
}

function farmhouse(b, root) {
  const x = -101.6, z = 20, y = heightAt(x, z);
  b.group(x, y, z, 0, () => {
    b.put('box', '#918a78', 0, .15, 0, 10.1, .3, 10.8, 0, 0, 0, 'stone');
    b.put('box', cream, 0, 2.35, 0, 9.5, 4.4, 10.1, 0, 0, 0, 'plaster');
    for (const side of [-1, 1]){
      b.put('box', '#70453a', side * 2.77, 6.12, 0, 6.55, .26, 11.15, 0, 0, -side * .53, 'roofTile');
      b.put('gable', cream, 0, 4.49, side*5.03, 9.51, 3.24, .18,0,0,0,'plaster');
    }
    b.put('box', darkTimber, 0, 7.86, 0, .24, .25, 11.1, 0, 0, 0, 'wood');
    b.put('box', stone, 3.12, 6.35, 2.4, 1.0, 4.8, 1.0, 0, 0, 0, 'stone');
    for (const side of [-1, 1]) for (const zz of [-2.7, 2.7]) {
      b.put('box', '#7ba0a2', side * 4.79, 2.54, zz, .07, 1.18, 1.36, 0, 0, 0, 'glass');
      b.put('box', darkTimber, side * 4.84, 2.54, zz, .09, 1.42, 1.58, 0, 0, 0, 'wood');
    }
    b.put('box', darkTimber, 0, 1.42, 5.12, 1.8, 2.55, .13, 0, 0, 0, 'wood');
    b.put('box', '#b29154', .56, 1.45, 5.22, .12, .12, .11);
    for (const xx of [-3.1, 3.1]) b.put('box', timber, xx, 1.35, 5.9, .18, 2.7, .18, 0, 0, 0, 'wood');
    b.put('box', timber, 0, 2.67, 5.9, 6.4, .16, .22, 0, 0, 0, 'wood');
  });
  mountSmoke(root.parent??root,v(x+3.12,y+8.79,z+2.4),'chimney');
  b.group(x, y, z + 6.02, 0, () => label(root, b, 'FARMHOUSE', '#3c3025', 0, 2.82, .13, 2.8, .55));
}

function siloAndUtilities(b) {
  const x = -70, z = 15.8, y = heightAt(x, z);
  for (let ring = 0; ring < 9; ring++) b.put('cyl', ring % 2 ? '#9e9d91' : '#aeada1', x, y + .55 + ring * .78, z, 4.55, .76, 4.55, 0, 0, 0, 'masonry');
  b.put('cone', '#817768', x, y + 8.28, z, 5.05, 2.25, 5.05, 0, 0, 0, 'roofTile');
  for (let i = 0; i < 11; i++) b.put('box', iron, x + 2.38, y + .48 + i * .57, z, .58, .055, .12);
  for (const xx of [x + 2.12, x + 2.64]) b.put('box', iron, xx, y + 3.35, z, .06, 6.35, .08);

  const wx = -63.5, wz = 16, wy = heightAt(wx, wz);
  for (const dx of [-.9, .9]) for (const dz of [-.9, .9]) {
    b.put('box', iron, wx + dx, wy + 3.1, wz + dz, .14, 6.2, .14);
    b.beam(iron, v(wx + dx, wy + .5, wz + dz), v(wx - dx, wy + 5.7, wz + dz), .045, .045);
  }
  b.put('barrel', '#7b9a95', wx, wy + 6.55, wz, 3.2, 3.0, 3.2);
  b.put('cone', '#526b67', wx, wy + 8.22, wz, 3.45, .55, 3.45);
}

function coopsAndPens(b, root) {
  const coop = (x, z, w, d) => {
    const y = heightAt(x, z); b.group(x, y, z, 0, () => {
      for (const xx of [-w / 2 + .35, w / 2 - .35]) for (const zz of [-d / 2 + .3, d / 2 - .3]) b.put('box', darkTimber, xx, .75, zz, .14, 1.5, .14, 0, 0, 0, 'wood');
      b.put('box', '#b87343', 0, 1.55, 0, w, 1.8, d, 0, 0, 0, 'wood');
      b.put('box', '#4b332c', 0, 1.43, d / 2 + .04, .84, .92, .08, 0, 0, 0, 'wood');
      for (const side of [-1, 1]) b.put('box', '#6f4535', side * w * .25, 2.83, 0, w * .62, .16, d + .5, 0, 0, -side * .47, 'roofTile');
      for (let i = -2; i <= 2; i++) b.put('box', '#9a714b', i * .55, .52 - Math.abs(i) * .08, d / 2 + .75 + (i + 2) * .34, .48, .09, .84, -.12);
      for (let i = -2; i <= 2; i++) b.put('box', cream, (i + .2) * .69, 1.6, -d / 2 - .13, .62, .58, .25, 0, 0, 0, 'wood');
    });
  };
  coop(-75, 46.2, 5.2, 5.2); coop(-69, 48, 3.7, 3.8);
  b.group(-75, heightAt(-75, 46.2), 49, 0, () => label(root, b, 'HEN HOUSE', '#e6d9b5', 0, 2.1, .08, 2.4, .48));

  const x = -58.2, z = 48.3, y = heightAt(x, z);
  b.group(x, y, z, 0, () => {
    b.put('box', '#8d674d', 0, 1.3, 0, 9.2, 2.6, 5.7, 0, 0, 0, 'wood');
    b.put('box', '#41352f', 0, 1.2, 2.91, 2.4, 1.75, .12, 0, 0, 0, 'wood');
    for (const side of [-1, 1]){
      b.put('box', '#745044', side * 2.34, 3.77, 0, 5.35, .18, 6.3, 0, 0, -side * .46, 'roofTile');
      b.put('gable','#8d674d',0,2.59,side*2.83,9.2,2.31,.13,0,0,0,'wood');
    }
    for (const xx of [-3, 0, 3]) b.put('box', '#aa8f67', xx, .38, 3.25, 2.5, .48, .62, 0, 0, 0, 'wood');
  });

}

function windbreakAndOrchard(b, leafSources) {
  const trees = [
    [-110.5, 18, 3.0], [-110.2, 32, 3.4], [-110.4, 47, 3.1], [-110.1, 65, 3.5], [-110.4, 85, 3.2],
    [-106, 34.5, 2.6], [-101.5, 36.5, 2.5], [-106.5, 43, 2.8], [-101.2, 46.2, 2.7],
  ];
  for (const [x, z, size] of trees) {
    const y = heightAt(x, z), trunk = 2.2 + size * .32;
    b.put('cyl', darkTimber, x, y + trunk / 2, z, .28 + size * .055, trunk, .28 + size * .055, 0, 0, 0, 'wood');
    for (let k = 0; k < 5; k++) {
      const angle = k * 2.4, spread = size * .35;
      b.put('crown', k % 2 ? '#557441' : '#6d874c', x + Math.sin(angle) * spread, y + trunk + .5 + (k % 3) * .28, z + Math.cos(angle) * spread, size * .72, size * .64, size * .72, 0, angle, 0, 'canopy');
    }
    leafSources?.add?.(x, y + trunk + .7, z, size * .88);
  }
  // Low hedging screens the farmhouse garden without creating another hard boundary.
  for (let z = 28; z <= 52; z += 2.2) {
    const x = -96.2, y = heightAt(x, z);
    b.put('crown', z % 4 < 2 ? '#617b49' : '#708950', x, y + .67, z, 1.35, 1.2, 1.15, 0, z, 0, 'canopy');
    if (Math.round(z) % 7 === 0) leafSources?.add?.(x, y + .75, z, .9);
  }
}

function cropPlant(b, crop, x, y, z, phase, harvest=b) {
  const stalk = (height, color = '#70804b', width = .035) => b.put('cyl', color, x, y + height / 2, z, width, height, width, 0, 0, 0, leafMaterial);
  switch (crop) {
    case 'corn': {
      const h = 1.55 + .25 * Math.sin(phase); stalk(h, '#607c42', .045);
      for(let k=0;k<5;k++)b.put('cropLeaf',k%2?'#688545':'#7c914e',x,y+h*(.17+.135*k),z,.12,.64,.73,0,phase+k*2.8,0,leafMaterial);
      const earY=y+h*.63,a=phase*1.38,dx=Math.sin(a),dz=Math.cos(a);
      harvest.put('cornEar','#baaa66',x+dx*.075,earY,z+dz*.075,.112,.31,.112,.29,a,0,leafMaterial);
      for(let k=0;k<3;k++)harvest.put('cropLeaf',k===0?'#88924d':'#768949',x+dx*.056,earY-.15,z+dz*.056,.092,.51,.102,0,a+k*2.1,0,leafMaterial);
      harvest.put('tassel','#a39156',x,y+h-.007,z,.31,.28,.31,0,phase,0,leafMaterial);
      break;
    }
    case 'wheat': case 'barley': {
      const h = crop === 'wheat' ? 1.0 : .88; for (let k = 0; k < 3; k++) {
        const dx = (k - 1) * .1; b.put('cyl', '#a9944e', x + dx, y + h / 2, z + Math.sin(phase + k) * .06, .018, h, .018, 0, 0, 0, leafMaterial);
        const zz=z+Math.sin(phase+k)*.06;
        harvest.put('grainHead',crop==='wheat'?'#caae63':'#ba9e58',x+dx,y+h+.095,zz,.112,.24,.112,0,phase+k,-.09,leafMaterial);
        b.put('cropLeaf','#879450',x+dx,y+h*.52,zz,.04,.39,.34,0,phase+k*2.2,0,leafMaterial);
      } break;
    }
    case 'carrots': {
      harvest.put('cone', '#d9782f', x, y + .03, z, .13, .32, .13, Math.PI, 0, 0, leafMaterial);
      for (let k = 0; k < 4; k++) b.put('leaf', '#5e8446', x + Math.sin(k * 2.1) * .1, y + .28, z + Math.cos(k * 2.1) * .1, .09, .43, .12, .3, k, .3, leafMaterial); break;
    }
    case 'potatoes': case 'cabbage': {
      const color = crop === 'cabbage' ? '#789958' : '#688348';
      for(let k=0;k<8;k++){const a=k*2.4;
        b.put('cropLeaf',color,x,y+.08+(k%3)*.047,z,.32,.43,.38,0,a,0,leafMaterial);
      }
      if(crop==='cabbage')harvest.put('ball','#92a76a',x,y+.25,z,.36,.29,.36,0,phase,0,leafMaterial);
      if (crop === 'potatoes') b.put('ball', '#d9d0b2', x, y + .42, z, .09, .09, .09, 0, 0, 0, leafMaterial); break;
    }
    case 'tomatoes': {
      stalk(1.25, '#557342', .027); b.put('cyl', timber, x, y + .7, z, .035, 1.4, .035);
      for (let k = 0; k < 4; k++) { const a = k * 2.3 + phase; b.put('leaf', '#527946', x + Math.sin(a) * .2, y + .55 + k * .13, z + Math.cos(a) * .2, .2, .26, .13, 0, a, 0, leafMaterial); harvest.put('ball', '#b94432', x + Math.sin(a) * .23, y + .43 + k * .12, z + Math.cos(a) * .23, .13, .13, .13, 0, 0, 0, leafMaterial); } break;
    }
    case 'pumpkins': {
      harvest.put('pumpkin', '#c9722b', x, y + .2, z, .55, .43, .55, 0, phase, 0, leafMaterial); harvest.put('cyl', '#4e6d3f', x, y + .40, z, .07, .13, .07, 0, 0, .12, leafMaterial);
      for (const side of [-1, 1]) b.put('leaf', '#5e7f47', x + side * .42, y + .12, z + .15, .3, .12, .42, 0, phase, 0, leafMaterial); break;
    }
    case 'beets': {
      harvest.put('ball', '#7b3440', x, y + .06, z, .25, .3, .25, 0, 0, 0, leafMaterial);
      for (let k = 0; k < 3; k++) b.put('leaf', '#667c45', x + (k - 1) * .1, y + .32, z, .12, .46, .17, .3, k, .25, leafMaterial); break;
    }
    case 'sunflowers': {
      const h=1.63+.13*Math.sin(phase*.7),a=.36*Math.sin(phase);
      stalk(h,'#607641',.035);
      for(let k=0;k<5;k++)b.put('cropLeaf','#628146',x,y+.29+k*.22,z,.23,.35,.32,0,phase+k*2.4,0,leafMaterial);
      harvest.put('disk','#4a3425',x,y+h,z,.25,.052,.25,Math.PI/2,a,0,leafMaterial);
      harvest.put('flowerRays','#e6ac30',x,y+h,z,.49,.49,.47,0,a,0,leafMaterial);break;
    }
    case 'lavender': {
      for (let k = 0; k < 5; k++) { const a = k * 2.4; b.put('cyl', '#65774d', x + Math.sin(a) * .12, y + .34, z + Math.cos(a) * .12, .016, .68, .016, 0, 0, 0, leafMaterial); harvest.put('cone', '#77669c', x + Math.sin(a) * .12, y + .77, z + Math.cos(a) * .12, .11, .34, .11, 0, 0, 0, leafMaterial); } break;
    }
    case 'beans': {
      for (const side of [-1, 1]) {
        b.beam(timber, v(x, y, z), v(x + side * .45, y + 1.45, z), .025, .025, 'cyl');
        b.beam('#557b45', v(x + side * .04, y + .08, z), v(x + side * .41, y + 1.38, z), .014, .014, 'cyl', leafMaterial);
      }
      for (let k = 0; k < 5; k++) { const a = phase + k * 1.7; b.put('leaf', '#4f7845', x + Math.sin(a) * .3, y + .35 + k * .2, z + Math.cos(a) * .18, .18, .27, .12, 0, a, 0, leafMaterial); } break;
    }
  }
}

function soilTexture(){
  const size=96,data=new Uint8Array(size*size*4);
  let state=1319;
  for(let y=0;y<size;y++)for(let x=0;x<size;x++){
    state=(Math.imul(state,1664525)+1013904223)>>>0;
    const i=(y*size+x)*4,value=139+(state>>>26)*1.26+21*Math.sin(x*.42+y*.07)*Math.sin(y*.37)+13*Math.cos(y*.5-x*.61);
    data.set([value,value,value,255],i);
  }
  const texture=new T.DataTexture(data,size,size,T.RGBAFormat);
  texture.wrapS=texture.wrapT=T.RepeatWrapping;texture.colorSpace=T.SRGBColorSpace;
  texture.minFilter=T.LinearMipmapLinearFilter;texture.magFilter=T.LinearFilter;texture.generateMipmaps=true;texture.needsUpdate=true;
  return texture;
}

function crops(b,root,work){
  const soil=soilTexture(),dry=new T.Color('#a28b6e'),wet=new T.Color('#554535');
  const plots=fieldPlan.map(field=>{
    const sx=['pumpkins','cabbage'].includes(field.crop)?1.24:.82,sz=field.crop==='pumpkins'?1.46:1.04;
    const width=field.maxX-field.minX,depth=field.maxZ-field.minZ,signX=(field.minX+field.maxX)/2,centerZ=(field.minZ+field.maxZ)/2;
    const material=new T.MeshStandardMaterial({map:soil,bumpMap:soil,bumpScale:.045,roughness:.88,
      polygonOffset:true,polygonOffsetFactor:-1,polygonOffsetUnits:-2});
    material.userData.watered={value:0};
    function surface(ridges){
      const geometry=new T.PlaneGeometry(width,depth,21,104).rotateX(-Math.PI/2);
      const pos=geometry.attributes.position,uv=geometry.attributes.uv;
      for(let i=0;i<pos.count;i++){
        const x=pos.getX(i),z=pos.getZ(i),edge=T.MathUtils.smoothstep(width*.5-Math.abs(x),0,.50)*T.MathUtils.smoothstep(depth*.5-Math.abs(z),0,.54);
        const phase=((centerZ+z)-(field.minZ+.65))*TAU/sz+.15*Math.sin(x*.83);
        const ridge=(.5+.5*Math.cos(phase))**3;
        const base=farmHeight(x+signX,centerZ+z)-field.level;
        const aisle=T.MathUtils.smoothstep(Math.abs(x+signX+86),.25,.66);
        pos.setY(i,base+.036+edge*(ridges?ridge*.088*aisle:.009*Math.sin(x*1.12+z*.75)));
        uv.setXY(i,(x+signX)*.63,(z+centerZ)*.63);
      }
      geometry.computeVertexNormals();
      const ground=new T.Mesh(geometry,material);ground.position.set(signX,field.level,centerZ);
      ground.receiveShadow=true;root.add(ground);soilMesh(ground,'field');return ground;
    }
    const bare=surface(false),furrows=surface(true),plants=new T.Group(),produce=new T.Group(),rootY=field.level+.101;
    plants.name=`crop-${field.crop}-foliage`;produce.name=`crop-${field.crop}-harvest`;
    plants.userData.rootY=produce.userData.rootY=rootY;root.add(plants,produce);
    const planting=new Builder(plants),harvest=new Builder(produce);
    for(let z=field.minZ+.70;z<field.maxZ-.43;z+=sz)for(let x=field.minX+.55;x<field.maxX-.38;x+=sx){
      const px=x+range(-.09,.09),pz=z+range(-.12,.12);
      if(Math.abs(px+86)<.55)continue;
      cropPlant(planting,field.crop,px,farmHeight(px,pz)+.101,pz,x*.31+z*.19,harvest);
    }
    planting.finish();harvest.finish();
    const fruitSize={value:1};
    for(const group of [plants,produce]){
      const mat=swayMaterial(new T.MeshStandardMaterial({side:T.DoubleSide,roughness:.87}),{strength:.72,cropRoot:rootY,partSize:group===produce?fruitSize:{value:1}});
      for(const part of group.children)if(part.material.userData.foliageKind){
        part.material=mat;part.customDepthMaterial=mat.userData.windDepth;
      }
    }
    const signZ=field.minZ-.43,signY=heightAt(signX,signZ);
    b.put('box',darkTimber,signX,signY+.52,signZ,.10,1.04,.10,0,0,0,'wood');
    b.put('box','#80694b',signX,signY+.93,signZ,1.58,.41,.09,0,0,0,'agedWood');
    b.group(signX,signY,signZ-.064,Math.PI,()=>label(root,b,field.crop.toUpperCase(),'#e1ceb0',0,.943,.048,1.34,.28));
    return {field,material,bare,furrows,plants,produce,rootY,fruitSize};
  });
  function update(){
    for(const {field,material,bare,furrows,plants,produce,rootY,fruitSize} of plots){
      const state=work.fields[field.crop],planted=state.stage==='growing'||state.stage==='ripe';
      bare.visible=state.stage==='fallow';furrows.visible=!bare.visible;plants.visible=planted;
      const growth=.13+Math.pow(state.growth,.72)*.87,harvestGrowth=Math.max(0,(state.growth-.38)/.62);
      plants.scale.y=growth;plants.position.y=rootY*(1-growth);plants.userData.growth=state.growth;
      produce.visible=planted&&harvestGrowth>.015;produce.scale.y=growth;produce.position.y=plants.position.y;
      fruitSize.value=harvestGrowth;produce.userData.growth=harvestGrowth;
      material.userData.watered.value=state.moisture*.70;
      material.color.copy(dry).lerp(wet,state.moisture*.54);material.roughness=.93-state.moisture*.26;
    }
  }
  update();return {update,materials:plots.map(p=>p.material)};
}

function laneDetails(b, root) {
  for (let x = -110; x <= -46; x += 1.15) {
    const z = 24 + .25 * Math.sin(x * .6); b.put('paver', x % 3 < 1 ? '#978a73' : '#817662', x, heightAt(x, z, .035), z, .7, .07, .62, 0, .1 * Math.sin(x), 0, 'roadStone');
  }
  for (let z = 27; z <= 90; z += 1.18) b.put('paver', '#887b65', -86 + .2 * Math.sin(z), heightAt(-86, z, .032), z, .67, .065, .64, 0, .04, 0, 'roadStone');
  b.group(-47.4, heightAt(-47.4, 24), 24, Math.PI / 2, () => {
    b.put('box', darkTimber, -2.9, 1.7, 0, .22, 3.4, .22, 0, 0, 0, 'wood'); b.put('box', darkTimber, 2.9, 1.7, 0, .22, 3.4, .22, 0, 0, 0, 'wood');
    b.put('box', timber, 0, 3.18, 0, 6.1, .55, .24, 0, 0, 0, 'wood');
    label(root, b, 'BRIARWICK FARM', '#f4e2b9', 0, 3.2, .13, 5.25, .58);
  });
  b.group(-87.8, heightAt(-87.8, 25.7), 25.7, 0, () => {
    b.put('box', darkTimber, 0, .7, 0, .12, 1.4, .12, 0, 0, 0, 'wood'); b.put('box', '#76553a', 0, 1.25, 0, 2.2, .62, .14, 0, 0, 0, 'wood');
    label(root, b, 'DAIRY', '#f1ddb1', 0, 1.28, .08, 1.75, .36);
  });
}

function dairyStation(root,b,work){
  const pails=[[-87.47,27.7],[-84.57,30.5]].map(([x,z],slot)=>{
    const base=heightAt(x,z);
    b.put('disk','#777e7b',x,base+.037,z,.33,.074,.33);
    b.put('ring','#888d86',x,base+.355,z,.38,.38,.67,Math.PI/2);
    for(let i=0;i<14;i++){
      const a=i*TAU/14;
      b.put('box','#6e7671',x+Math.sin(a)*.165,base+.192,z+Math.cos(a)*.165,.085,.314,.034,0,a,0);
    }
    const milk=new T.Mesh(new T.CylinderGeometry(.145,.145,.016,18),new T.MeshStandardMaterial({color:'#f2e6c2',roughness:.32}));
    milk.position.set(x,base+.056,z);milk.visible=false;root.add(milk);
    const data=new Float32Array(15),geo=new T.BufferGeometry();geo.setAttribute('position',new T.BufferAttribute(data,3).setUsage(T.DynamicDrawUsage));
    const stream=new T.Points(geo,new T.PointsMaterial({color:'#f5ead0',size:.037}));
    stream.frustumCulled=false;stream.visible=false;root.add(stream);
    return {x,z,base,milk,data,stream,slot};
  });
  function nearest(x,z){
    return pails.find(p=>Math.hypot(x-p.x,z-p.z)<1.36);
  }
  return {
    get collected(){return work.stock.milk;},
    action(x,z){
      const p=nearest(x,z);if(!p)return '';
      const state=work.pails[p.slot];if(state.running)return '';
      return state.elapsed>=milkingDuration?'Collect the milk pail':work.animals.cow.fed>0?'Milk the dairy cow':'Check the dairy cow';
    },
    use(x,z){
      const p=nearest(x,z);if(!p)return;
      const result=work.milk(p.slot);
      return result.ok?(result.amount?'Collected a pail of milk.':'Milking started.'):result.reason;
    },
    tick(dt){
      work.advanceMilking(dt);
      for(const p of pails){
        const {elapsed,running}=work.pails[p.slot];
        p.milk.position.y=p.base+.062+elapsed/milkingDuration*.23;
        p.milk.visible=elapsed>0||running;p.stream.visible=running;
        if(!running)continue;
        for(let i=0;i<5;i++){
          const age=(elapsed*3.45+i*.20)%1;
          p.data.set([p.x+Math.sin(i)*.031*(1-age),p.milk.position.y+.41*(1-age)**.72,p.z+.038*Math.cos(i*2)*(1-age)],3*i);
        }
        p.stream.geometry.attributes.position.needsUpdate=true;
      }
    }
  };
}

export function buildFarm(scene, leafSources, saved, hasBronzeSickle, plantTrack) {
  const root = new T.Group(); root.name = farm.name; scene.add(root);
  const ground = terrain(root), b = new Builder(root),work=createFarmWork(saved,hasBronzeSickle),vehicle=buildFarmEquipment(root);
  laneDetails(b, root);
  farmFencePlan.forEach((segment, i) => fence(b, ...segment, i > 9 ? 'wire' : 'rail'));
  gate(b,-44,24.05,Math.PI/2,2.65);gate(b,-73.5,24.1,Math.PI/2,2.90);
  gate(b,-86,55.5,0,2.50);gate(b,-86,75.7,0,2.50);
  gate(b,-50,55.5,0,2.65);gate(b,-50,75.7,0,2.65);
  farmhouse(b, root);barn(b);siloAndUtilities(b);coopsAndPens(b,root);windbreakAndOrchard(b,leafSources);
  const fields=crops(b,root,work),dairy=dairyStation(root,b,work),worksites=buildWorksites(root,b,work,vehicle);
  b.finish();
  const troughClear=(x,z)=>!farmStations.troughs.some(trough=>Math.abs(x-trough.x)<.70&&Math.abs(z-trough.z)<.30);
  const animalClear=(x,z)=>troughClear(x,z)&&vehicle.clear(x,z);
  const animals = livestock(root,animalClear);
  if(plantTrack)for(const creature of animals){
    const m=creature.userData.motion,animalKind=creature.userData.farmAnimal;
    const bird=animalKind==='chicken';m.touchdowns=new Uint8Array(m.limbs.length);
    m.touchdown=index=>{m.touchdowns[index]=1;};m.trackKind=bird?'bird':'hoof';
    m.trackWidth=bird?.045:animalKind==='cow'?.12:.085;m.trackLength=bird?.072:animalKind==='cow'?.17:.125;
  }
  let instances = 0; root.traverse(object => { if (object.isInstancedMesh) instances += object.count; });
  const stats = Object.freeze({ instances, animals: animals.length, cropTypes: fieldPlan.length });

  const feeding=new Map(farmStations.troughs.map(item=>[item.kind,item]));
  function tick(time, dt = 0, wind = 0, player) {
    fields.update();worksites.tick(dt);
    if(!vehicle.mounted)vehicle.update(dt,work.wagonLoad);
    const locomotionDt=dt>0&&dt<=.25?Math.min(dt,1/15):0;
    for (const creature of animals) {
      const m = creature.userData.motion, speed = creature.userData.farmAnimal === 'chicken' ? .78 : creature.userData.farmAnimal === 'pig' ? .34 : .22;
      if(!locomotionDt)continue;
      const trough=feeding.get(creature.userData.farmAnimal),atTrough=!m.inStall&&work.animals[trough.kind].fed>70&&m.phase%3.1<2.28;
      let px = atTrough?T.MathUtils.clamp(trough.x+Math.sin(m.phase)*2.5,m.area.minX+.75,m.area.maxX-.44):m.baseX+Math.sin(time*speed+m.phase)*(m.inStall?.13:1.14);
      let pz = atTrough?T.MathUtils.clamp(trough.z+Math.cos(m.phase)*2.3,m.area.minZ+.71,m.area.maxZ-.71):m.baseZ+Math.sin(time*speed*.71+m.phase*1.7)*(m.inStall?.07:.89);
      // Coops occupy most of the nominal hen range. Route birds from their
      // north doors around the outside wall before turning toward the trough.
      if(atTrough&&trough.kind==='chicken'&&creature.position.z>42.7){
        const passageX=m.baseX<-72?-78.85:-66.05;
        if(Math.abs(creature.position.x-passageX)>.30){px=passageX;pz=Math.max(50.35,creature.position.z);}
        else{px=passageX;pz=42.25;}
      }
      if(player&&!m.inStall){
        const dx=px-player.x,dz=pz-player.z,space=trough.kind==='cow'?2.15:trough.kind==='pig'?1.43:.74;
        const distance=Math.hypot(dx,dz);
        if(distance<space){
          const direction=distance>.01?Math.atan2(dz,dx):m.phase;
          px=T.MathUtils.clamp(player.x+Math.cos(direction)*space,m.area.minX+.55,m.area.maxX-.42);
          pz=T.MathUtils.clamp(player.z+Math.sin(direction)*space,m.area.minZ+.55,m.area.maxZ-.42);
        }
      }
      if(!m.inStall&&vehicle.blocks(creature.position.x,creature.position.z,m.collisionRadius)){
        const escape=nearestOpenPoint(animalClear,creature.position.x,creature.position.z,m.collisionRadius,m.area,4);
        if(escape)creature.position.set(escape.x,heightAt(escape.x,escape.z),escape.z);
      }
      const oldX=creature.position.x,oldZ=creature.position.z;
      const dx = px - oldX, dz = pz - oldZ;
      const blend=Math.min(1,locomotionDt*2.4);
      const step=m.inStall?{x:oldX+dx*blend,z:oldZ+dz*blend}:moveWithClearance(animalClear,oldX,oldZ,dx*blend,dz*blend,m.collisionRadius);
      creature.position.x=step.x;creature.position.z=step.z;
      const movedX=creature.position.x-oldX,movedZ=creature.position.z-oldZ,travel=Math.hypot(movedX,movedZ);
      if(travel>.00001){m.moveX=movedX/travel;m.moveZ=movedZ/travel;}
      const heading=!m.inStall&&Math.hypot(dx,dz)>.12?Math.atan2(-dz,dx):atTrough?Math.atan2(creature.position.z-trough.z,trough.x-creature.position.x):creature.rotation.y;
      creature.rotation.y+=Math.atan2(Math.sin(heading-creature.rotation.y),Math.cos(heading-creature.rotation.y))*Math.min(1,locomotionDt*4);
      const gaiting=updateGait(m.gait,m.inStall?0:travel,locomotionDt,m.gaitProfile,false,m.touchdown,m.strideScale);
      const bird=creature.userData.farmAnimal==='chicken',bob=gaiting?(bird?.018:.012)*Math.cos(m.gait.phase*2):0;
      creature.position.y = heightAt(creature.position.x, creature.position.z)+bob;
      creature.rotation.z=gaiting?.018*Math.sin(m.gait.phase):.006*Math.sin(time*.72+m.phase);
      creature.rotation.x=gaiting?.024*Math.sin(m.gait.phase+Math.PI/2):.009*Math.sin(time*.49+m.phase);
      for(let i=0;i<m.limbs.length;i++){
        const leg=m.limbs[i];leg.upper.rotation.z=-m.gait.swing[i];
        leg.lower.rotation.z=m.gait.swing[i]*.21-m.gait.flex[i];
        leg.foot.rotation.z=-leg.upper.rotation.z-leg.lower.rotation.z*.72;
      }
      if(m.touchdowns)for(let i=0;i<m.touchdowns.length;i++)if(m.touchdowns[i]){
        m.touchdowns[i]=0;
        const leg=m.limbs[i];leg.foot.updateWorldMatrix(true,false);
        m.contact.copy(leg.contactOffset).applyMatrix4(leg.foot.matrixWorld);
        plantTrack({x:m.contact.x,z:m.contact.z,y:heightAt(m.contact.x,m.contact.z),yaw:trackYaw(m.moveX,m.moveZ),
          kind:m.trackKind,width:m.trackWidth,length:m.trackLength,side:leg.side});
      }
      if (m.tail) m.tail.rotation.x = wind * .18 + .25 * Math.sin(time * 2.4 + m.phase);
      if (m.wings)for(let i=0;i<m.wings.length;i++)m.wings[i].rotation.x=(i?-1:1)*(.12+wind*.13)*Math.sin(time*5.5+m.phase);
      if(m.head){
        const feedingPose=atTrough&&Math.hypot(dx,dz)<.65?-.23:0;
        const peck=bird&&!gaiting?-.17*Math.max(0,Math.sin(time*3.7+m.phase))**5:0;
        m.head.rotation.z=feedingPose+peck+.055*Math.sin(time*(bird?2.6:1.3)+m.phase)-creature.rotation.z*.55;
      }
      if (!m.inStall && player && Math.hypot(player.x - creature.position.x, player.z - creature.position.z) < 1.65) creature.rotation.y+=.28*dt*Math.sin(time+m.phase);
    }
  }
  return {clear:vehicle.clear,animalClear,tick,ground,stats,dairy,work,vehicle,fieldMaterials:fields.materials,
    surfaceLift(x,z){return fieldAt(x,z)?.level===undefined?0:Math.abs(x+86)<.42?.042:.074;},
    nearbyTask(x,z,yaw){
      if(vehicle.mounted)return worksites.driverAction();
      if(vehicle.nearTractor(x,z))return {label:'Drive the tractor',perform:()=>{vehicle.mount();return 'Drive with movement controls. Use the plow on bare ground.';}};
      const action=dairy.action(x,z);
      if(action)return {label:action,perform:()=>dairy.use(x,z)};
      return worksites.stationAction(x,z)??worksites.fieldAction(x,z,yaw);
    },
    description:worksites.description,
    advance(dt,rain){work.step(dt,rain);dairy.tick(dt);},
    drive(dt,forward,steer){
      const blade=vehicle.drive(dt,forward,steer,work.wagonLoad);
      const field=blade&&fieldAt(blade.x,blade.z);
      if(field&&work.fields[field.crop].stage==='fallow'){work.till(field.crop);return `${field.crop[0].toUpperCase()+field.crop.slice(1)} plot tilled.`;}
    }
  };
}
