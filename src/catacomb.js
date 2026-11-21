import * as T from 'three';
import { Builder,label,range,tint,TAU,v } from './model.js';
import {
  CATACOMB,CATACOMB_ZONES,catacombContainsLocal,catacombElevation,
  catacombAt,catacombFloor,catacombLocation,catacombNearby,
} from './catacomb-layout.js';
import {mineCatacombDoorway} from './mine-layout.js';

const d1=CATACOMB.entryY-10,d2=CATACOMB.entryY-20,d3=CATACOMB.entryY-30,deep=CATACOMB.entryY-52;
const stone='#625f5a',deepStone='#464548',bone='#c9ba99';

function visualFloor(x,z){
  return catacombElevation(x,z)??d1;
}

const chapelBay=zone=>zone.name==='Chapel of the Watchers'&&zone.x2-zone.x1>20;

function skull(b,x,y,z,yaw=0,scale=1){
  b.group(x,y,z,yaw,()=>{
    b.put('ball',bone,0,.10*scale,-.076*scale,.54*scale,.53*scale,.43*scale,0,0,0,'stone');
    b.put('ball','#302b26',0,-.008*scale,.085*scale,.51*scale,.37*scale,.086*scale);
    b.put('skull',bone,0,0,0,scale,scale,scale,0,0,0,'stone');
    for(let tooth=-3;tooth<=3;tooth++){
      const edge=Math.abs(tooth)/3;
      b.put('ball','#d2c4a8',tooth*.036*scale,(-.229+edge*.025)*scale,(.174-edge*.028)*scale,
        .040*scale,(.071+edge*.012)*scale,.046*scale,0,tooth*.095,-tooth*.026,'stone');
    }
  });
}

function lamp(b,lights,x,y,z,color='#f4bd70'){
  b.put('cyl','#302e2d',x,y-.35,z,.10,.72,.10,0,0,0,'iron');
  b.put('ring','#4a443c',x,y,z,.26,.12,.26,Math.PI/2,0,0,'iron');
  b.put('ball',color,x,y,z,.17,.25,.17,0,0,0,'glow');
  const light=new T.PointLight(color,12,12,1.7);light.position.set(x,y,z);lights.push(light);return light;
}

function floorAndCeiling(b,zone){
  const width=zone.x2-zone.x1,depth=zone.z2-zone.z1;
  const sloped=zone.name.includes('Descent');
  if(!sloped){
    const x=(zone.x1+zone.x2)/2,z=(zone.z1+zone.z2)/2,y=visualFloor(x,z);
    b.put('box',tint(deepStone,.07),x,y-.12,z,width+.12,.24,depth+.12,0,0,0,'masonry');
    if(zone.name!=='Briar Crypt Entrance')b.put('box',tint('#3e3d3d',.06),x,y+(chapelBay(zone)?6.74:3.45),z,width+.35,.35,depth+.35,0,0,0,'masonry');
    return;
  }
  const alongX=zone.name==='The Second Descent'||zone.name==='The Fourth Descent',length=alongX?width:depth,n=Math.ceil(length/.48),step=length/n;
  for(let i=0;i<n;i++){
    const x=alongX?zone.x1+(i+.5)*step:(zone.x1+zone.x2)/2;
    const z=alongX?(zone.z1+zone.z2)/2:zone.z1+(i+.5)*step;
    const y=visualFloor(x,z);
    b.put('box',tint(deepStone,.06),x,y-.25,z,alongX?step+.025:width+.1,.50,alongX?depth+.1:step+.025,0,0,0,'masonry');
    b.put('box',tint('#3c3b3b',.06),x,y+3.50,z,alongX?step+.04:width+.24,.54,alongX?depth+.24:step+.04,0,0,0,'masonry');
  }
}

function roughWalls(b){
  const used=new Set();
  function edge(zone,x,z,outX,outZ,yaw,index){
    if(catacombContainsLocal(x+outX*.38,z+outZ*.38))return;
    if(zone.name==='The Nameless Sanctum'&&mineCatacombDoorway(x,z,.18))return;
    const key=`${Math.round(x*2)},${Math.round(z*2)}`;if(used.has(key))return;used.add(key);
    const floor=visualFloor(x,z);
    // The continuous rock behind the fieldstones seals the joints between courses.
    const tiers=chapelBay(zone)?8:4;
    b.put('box','#423f3b',x+outX*.48,floor+tiers*.41,z+outZ*.48,1.15,tiers*.82+.48,.55,0,yaw,0,'masonry');
    for(let tier=0;tier<tiers;tier++){
      const yy=floor+.40+tier*.82,offset=(tier%2-.5)*.21;
      b.put('stone',tint(tier>2?'#555252':stone,.10),x+outX*(.30+range(-.05,.09))+outZ*offset,yy,z+outZ*(.30+range(-.05,.09))+outX*offset,
        1.08+range(-.12,.18),.91+range(-.10,.14),.72+range(-.08,.13),range(-.16,.16),yaw+range(-.15,.15),range(-.12,.12),'stone');
    }
    if(index%5===2&&floor<CATACOMB.entryY-2)skull(b,x+outX*.03,floor+1.48,z+outZ*.03,yaw,.72);
  }
  for(const zone of CATACOMB_ZONES){
    let index=0;
    for(let x=zone.x1+.45;x<zone.x2;x+=1.02){edge(zone,x,zone.z1,0,-1,0,index++);if(zone.name!=='Briar Crypt Entrance')edge(zone,x,zone.z2,0,1,Math.PI,index++);}
    for(let z=zone.z1+.45;z<zone.z2;z+=1.02){edge(zone,zone.x1,z,-1,0,Math.PI/2,index++);edge(zone,zone.x2,z,1,0,-Math.PI/2,index++);}
  }
}

function entrance(root,b){
  const y=CATACOMB.entryY;
  for(const side of [-1,1]){
    for(let j=0;j<10;j++){
      const z=6.8-j*.98,wide=2.8+.32*Math.sin(j*.9),s=1.8+.6*Math.cos(j);
      b.put('stone',tint(j%3?'#737468':'#686f62'),side*wide,y+1.18,z,s,3.3+Math.sin(j*.78)*.45,2.3,.13*j,side*j*.57,side*.19,'stone');
      b.put('stone',tint('#69715b'),side*(wide+.85),y+.36,z+.2,s*1.25,1.82,2.24,.21,side*j*.43,.35,'stone');
      b.put('stone',tint('#797c6e'),side*1.78,y+2.97-j*.25,z,2.16,1.64,1.85,.3,j*1.13,.43*side,'stone');
    }
    b.put('stone',tint('#77736a'),side*1.62,y+1.38,5.55,.88,2.76,.92,0,0,side*.04,'stone');
    b.put('cyl','#2e2d2c',side*2.23,y+.55,5.65,.11,1.25,.11,0,0,0,'iron');
  }
  for(let j=0;j<6;j++){
    const z=6.1-j*1.08;
    b.put('stone',tint('#73786c'),.12*Math.sin(j),y+3.10-.12*j,z,6.28,1.68,2.80,.09,j*.09,.025,'stone');
    b.put('stone',tint('#66705c'),.33,y+3.56-.12*j,z-.13,5.76,1.12,2.64,.05,-.13*j,-.08,'stone');
  }
  b.put('box','#393735',0,y+.10,5.56,3.45,.20,2.7,0,0,0,'masonry');
  b.group(-2.4,y,8.25,.16,()=>{
    for(const s of [-1,1])b.put('box','#514637',s*.75,.74,0,.13,1.7,.15,0,0,0,'agedWood');
    b.put('box','#3d4139',0,1.50,0,2.28,.51,.13,0,0,0,'agedWood');
    label(root,b,'BRIAR CRYPTS','#ead9b0',0,1.50,.073,2.12,.35);
  });
  for(let i=0;i<7;i++)b.put('stone',tint('#767269'),-2.8+i*.92,y+.12,7.35+Math.sin(i)*.18,.72,.27,.58,0,i*.31,0,'stone');
}

function landmarks(b,lights){
  for(const [x,z] of [[-1.65,-2],[1.65,-10]])lamp(b,lights,x,visualFloor(x,z)+1.42,z,'#f3ba74');
  // The two lateral chambers leave the central procession open.
  for(const x of [1,13]){
    b.put('arch','#59524b',x,d1+1.4,-37.89,3.5,2.71,.21,0,0,0,'stone');
    b.put('cone','#946c45',x,d1+1.65,-37.52,.83,1.04,.83,0,0,0,'gilt');
    b.put('ring','#a2835b',x,d1+2.37,-37.56,.25,.31,.32,0,0,0,'iron');
    lamp(b,lights,x,d1+1.23,-36.92,'#e2a15c');
  }
  for(const z of [-62,-67.8,-73.6])for(const side of [-1,1]){
    const x=29.5+side*12.05;
    b.put('box','#726b61',x,d3+1.63,z,.63,3.26,.85,0,0,0,'masonry');
    const feet=v(x,d3+3.25,z),haunch=v(x-side*3.20,d3+5.11,z),crown=v(29.5,d3+6.43,z);
    b.beam('#847b6e',feet,haunch,.47,.64,'box','masonry');b.beam('#847b6e',haunch,crown,.41,.61,'box','masonry');
    skull(b,x-side*.36,d3+2.08,z,-side*Math.PI/2,1.28);
  }
  for(const x of [21.5,37.5])lamp(b,lights,x,d3+2.07,-74.9,'#dbba8d');
  // Three warm lights make the first landing unmistakable from either stair.
  for(const x of [-4.2,0,4.2])lamp(b,lights,x,d1+1.32,-19,'#f6b661');
  b.put('ring','#81775d',0,d1+2.02,-20.20,1.13,.12,1.13,Math.PI/2,0,0,'iron');
  b.put('cyl','#4e4940',0,d1+.86,-20.20,.08,1.72,.08,0,0,0,'iron');

  // A dense, ordered wall of skulls identifies the ossuary gallery.
  const bayCount=7,bayWidth=3.74,start=20.5;
  for(let i=0;i<bayCount;i++){
    const x=start+(i+.5)*bayWidth;
    b.put('box','#6a6255',x,d3+1.63,-43.81,bayWidth+.025,3.26,.42,0,0,0,'masonry');
    for(const y of [.50,1.68,2.80])b.put('box','#8f8472',x,d3+y,-44.035,bayWidth,.10,.21,0,0,0,'stone');
    b.put('box','#796f60',x-bayWidth*.5,d3+1.64,-44.08,.17,3.16,.24,0,0,0,'masonry');
    if(i%3===1)lamp(b,lights,x,d3+1.8,-49.55,'#e8ab65');
  }
  for(let i=0;i<20;i++){
    const x=21+i*1.29;skull(b,x,d3+1.32,-44.03,Math.PI,.82);
    if(i%2===0)skull(b,x+.55,d3+2.18,-44.03,Math.PI,.69);
    for(const y of [.76,1.81]){
      const z=-44.12;
      b.put('cyl','#b6a888',x,d3+y,z,.065,.87,.065,0,0,1.43,'stone');
      for(const side of [-1,1])b.put('ball','#c6b89b',x+side*.416,d3+y-side*.06,z,.13,.12,.115,0,0,0,'stone');
    }
  }

  // The rotunda's ring of pillars points onward to the lower processional.
  for(let i=0;i<10;i++){
    const a=i*TAU/10,x=44+Math.sin(a)*3.0,z=-20+Math.cos(a)*3.8;
    b.put('cyl',tint('#5b5754'),x,d2+1.55,z,.46,3.10,.46,0,0,0,'masonry');
    skull(b,x,d2+1.62,z,a+Math.PI,.67);
  }
  lamp(b,lights,44,d2+1.20,-20,'#82b7ae');

  // A black memorial stele and red votives anchor the deepest destination.
  b.put('box','#252428',0,deep+.28,-73,7.5,.56,3.0,0,0,0,'stone');
  b.put('stone','#26252a',0,deep+2.15,-73,1.35,4.3,1.05,0,.13,0,'stone');
  skull(b,0,deep+2.35,-72.40,0,1.5);
  for(const x of [-5,-2,2,5])lamp(b,lights,x,deep+.58,-71.2,'#aa4938');

  // Cool cairns repeat along the alternate ascent, making the way out legible.
  for(const [x,z] of [[-3,-64],[-3,-53],[5,-47],[18,-47],[31,-47],[45,-39],[45,-29],[38,-19],[20,-19],[5,-19]]){
    const y=visualFloor(x,z);
    for(let i=0;i<4;i++)b.put('stone',tint('#65706d'),x,y+.16+i*.27,z,.58-i*.09,.31,.51-i*.07,0,i*.5,0,'stone');
    lamp(b,lights,x,y+.92,z,'#79b9ae');
  }
}

export function buildCatacomb(scene){
  const root=new T.Group();root.position.set(CATACOMB.x,0,CATACOMB.z);root.rotation.y=Math.PI/2;scene.add(root);
  const b=new Builder(root),lights=[];
  for(const zone of CATACOMB_ZONES)floorAndCeiling(b,zone);
  roughWalls(b);entrance(root,b);landmarks(b,lights);b.finish();
  for(const light of lights)root.add(light);
  root.traverse(object=>object.layers.enable(2));
  return {
    ...CATACOMB,
    root,
    nearby:catacombNearby,
    at:catacombAt,
    next(x,z,previous,ground){return catacombFloor(x,z,previous,ground);},
    area:catacombLocation,
    depth(y){return Math.max(0,CATACOMB.entryY-y);},
    tick(t,eye,touringBelow=false){
      const entranceDistance=Math.hypot(eye.x-CATACOMB.entry.x,eye.z-CATACOMB.entry.z);
      const underground=touringBelow||catacombAt(eye.x,eye.z,eye.y-1.57,.85)&&eye.y<CATACOMB.entryY+2.1;
      root.visible=underground||entranceDistance<30;
      for(const light of lights)light.visible=false;
      if(!underground)return;
      const localEye=root.worldToLocal(eye.clone());
      const nearest=[...lights].sort((a,b)=>a.position.distanceToSquared(localEye)-b.position.distanceToSquared(localEye)).slice(0,3);
      for(let i=0;i<nearest.length;i++){
        nearest[i].visible=true;nearest[i].intensity=11*(1+.08*Math.sin(t*(8.1+i*.37)+i));
      }
    },
  };
}
