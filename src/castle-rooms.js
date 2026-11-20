import {v,pick,tint} from './model.js';
import {wood,table,chair,cupboard,shelf,book,volume,plate,cup,plant,candle,vessel,hearth,gear,oak,walnut,linen,brass,iron} from './furnishings.js';
import {stone,trim,darkStone,red,gold} from './castle-kit.js';

function bunk(b,x,z,c='#708589'){
  wood(b,x,.36,z,1.06,.20,1.98,walnut);
  for(const dx of [-.44,.44])for(const dz of [-.88,.88])wood(b,x+dx,.21,z+dz,.11,.42,.11);
  b.put('box',linen,x,.51,z,1.03,.15,1.93);b.put('box',c,x,.60,z+.25,1.06,.10,1.43);
  b.put('ball',linen,x,.66,z-.69,.77,.19,.38);wood(b,x,.69,z-.96,1.1,.70,.10);
}
function cask(b,x,z,h=1.0){b.put('barrel',tint(oak),x,h/2,z,h*.73,h,h*.73);for(const f of [.2,.76])b.put('cyl',iron,x,h*f,z,h*.72,.05,h*.72);}
function chest(b,x,z){cupboard(b,x,z,1.03,.61,.54,walnut);for(const s of [-1,1])b.put('box',brass,x+s*.36,.58,z,.07,.022,.64);}
function runner(k,x,z,w,d,y,color=red){
  k.box(x,y+.014,z,w,.028,d,color,'standard');
  for(const s of [-1,1])k.box(x+s*(w/2-.075),y+.033,z,.041,.009,d-.09,gold,'standard');
  for(let j=0;j<Math.floor(d/1.6);j++)k.b.put('box',gold,x,y+.036,z-d*.5+.85+j*1.6,.28,.010,.28,0,Math.PI/4);
}
function stock(k,x,z,y,w,type,a=0){
  k.furnishing(x,z,y,w,.76,b=>{cupboard(b,0,0,w,.72,.77);shelf(b,0,1.02,-.11,w-.09,type);},a,2.4);
}
function bedPlace(k,x,z,y,c){k.furnishing(x,z,y,1.1,2,b=>bunk(b,0,0,c));}
function partition(k,axis,line,start,end,base,h,doors){k.wall(axis,line,start,end,base,h,doors.map(p=>[p,1.58]),'#c6baa2',.25);}
function roof(k,x,z,w,d,base,rise,color){
  const slope=Math.atan2(rise,d/2);
  for(const s of [-1,1])k.b.put('box',color,x,base+rise/2,z+s*d/4,w+.68,.20,Math.hypot(d/2,rise)+.53,s*slope,0,0,'clay');
  for(const s of [-1,1])k.b.put('gable',stone,x+s*w/2,base,z,d,rise,.29,0,Math.PI/2,0,'masonry');
  for(let i=0;i<Math.ceil(w/.57);i++)k.b.put('cyl',tint(color),x-w/2+i*.57+.25,base+rise+.091,z,.19,.57,.19,0,0,Math.PI/2);
  for(const s of [-1,1])for(let j=1;j<8;j++){const f=j/8;k.box(x,base+rise*(1-f)+.086,z+s*d*.5*f,w+.61,.055,.085,tint(color),'clay');}
}
export function buildKeep(k){
  const base=4.8,lo=-16.6,hi=-4.8;
  k.wall('x',hi,-15.2,15.2,0,base,[[-11,1.52,1.25,1.8],[0,3.10,0,3.57],[10.5,1.62,1.12,2.16]]);
  k.wall('x',lo,-15.2,15.2,0,base,[[-10.9,1.27,1.35,1.8],[0,1.36,2.10,1.82],[11,1.26,1.35,2.1]]);
  for(const x of [-15.2,15.2])k.wall('z',x,lo,hi,0,base,[[-10.6,1.32,1.3,1.72]]);
  partition(k,'z',-6,lo,hi,0,base,[-9.0]);partition(k,'z',6,lo,hi,0,base,[-8.0]);
  k.cutSlab(-15.2,15.2,lo,hi,base,[3.58,5.83,-14.20,-5.84],'#a99980');
  k.stairs(3.58,5.83,-5.84,-14.2,0,base);
  k.rail(3.59,-14.13,3.59,-5.88,base);k.rail(5.81,-14.1,5.81,-5.87,base);
  for(const z of [lo,hi])k.wall('x',z,-15.2,15.2,base,4.05,[-11,-4.3,0,4.3,11].map(p=>[p,1.32,.94,1.91]));
  for(const x of [-15.2,15.2])k.wall('z',x,lo,hi,base,4.05,[[-10.8,1.52,.98,1.95]]);
  partition(k,'z',-6,lo,hi,base,4.05,[-10.45]);partition(k,'z',6,lo,hi,base,4.05,[-15.13]);
  partition(k,'x',-13.55,-15.2,-6,base,4.05,[-10.1]);
  partition(k,'x',-9.75,6,15.2,base,4.05,[8.6]);
  partition(k,'z',12.5,-9.75,hi,base,4.05,[-6.9]);
  roof(k,0,(lo+hi)/2,30.4,hi-lo,8.85,3.4,'#4e7181');
  // The keep's heraldic gable faces the gate above a traceried rose window.
  k.b.put('gable','#cfc1a5',0,8.79,hi+.11,7.15,3.36,.48,0,0,0,'masonry');
  for(const side of [-1,1])k.b.beam(trim,v(side*3.65,8.75,hi+.40),v(0,12.27,hi+.40),.22,.30);
  k.b.put('disk',gold,0,9.76,hi+.39,1.50,.13,1.50,Math.PI/2);
  k.b.put('disk','#71999e',0,9.76,hi+.473,1.34,.06,1.34,Math.PI/2);
  for(let i=0;i<8;i++){const a=i*Math.PI/4;k.b.beam(gold,v(0,9.76,hi+.52),v(.62*Math.cos(a),9.76+.62*Math.sin(a),hi+.52),.056);}
  for(const x of [-14.6,-8.2,0,8.2,14.6]){
    for(const s of [-1,1])k.b.beam(walnut,v(x,8.73,(lo+hi)/2+s*(hi-lo)/2),v(x,12.05,(lo+hi)/2),.19,.19);
  }
  k.banner(-3.56,2.9,hi+.27,1.08,2.62);k.banner(3.56,2.9,hi+.27,1.08,2.62);
  k.plaque('Great Hall',0,3.94,hi+.25);
  k.room('Great hall & throne',-6,6,lo,hi,0,4.6);
  runner(k,0,-10.6,2.04,10.6,0);
  k.furnishing(0,-15.1,0,2.5,1.66,b=>{
    b.put('box','#aa987a',0,.13,.03,2.5,.26,1.59,0,0,0,'masonry');wood(b,0,.71,0,1.08,.19,.82);
    for(const x of [-.47,.47]){wood(b,x,.46,0,.12,.60,.67);wood(b,x,.98,0,.13,.17,.78);}
    wood(b,0,1.31,-.36,1.13,1.55,.15);b.put('arch',red,0,1.38,-.26,.89,1.29,.055);
    for(const x of [-.47,0,.47])b.put('spire',gold,x,2.23,-.34,.22,.37,.22);
  });
  for(const x of [-2.54,2.54]){
    k.banner(x,2.62,-16.33,1.42,2.74);k.torch(x*.64,2.12,-16.12);
  }
  for(const z of [-14.8,-10.5,-6.28]){
    k.box(0,4.53,z,11.82,.28,.25,walnut,'wood');
    for(const side of [-1,1])k.b.beam(oak,v(side*5.79,3.18,z),v(side*4.38,4.48,z),.19,.2);
  }
  k.b.put('cyl',iron,0,4.03,-10.46,.055,.87,.055);
  k.b.put('ring',brass,0,3.55,-10.46,1.85,1.85,1.04,Math.PI/2);
  for(let j=0;j<8;j++){const a=j*Math.PI/4;candle(k.b,.93*Math.sin(a),3.55,-10.46+.93*Math.cos(a),.22);}
  for(const x of [-3.22,2.12])k.furnishing(x,-10.85,0,1.28,4.24,b=>{
    table(b,0,0,1.15,4.24);for(const z of [-1.52,-.51,.51,1.52]){plate(b,-.16,.88,z);cup(b,.24,.88,z+.12);}candle(b,.19,.88,.02);
    for(const side of [-1,1]){wood(b,side*.89,.42,0,.31,.11,3.9);for(const z of [-1.6,1.6])wood(b,side*.89,.2,z,.16,.40,.17);}
  });
  k.room('Kitchens & scullery',-15.2,-6,lo,hi,0,3.8);
  k.furnishing(-12.8,-15.85,0,2.4,1.25,b=>hearth(b,0,0,true));
  k.furnishing(-11.25,-10.8,0,2.8,.98,b=>{table(b,0,0,2.8,.98);vessel(b,-.72,.87,0,.52,'#9a6b49');plate(b,.26,.87,0,.5);vessel(b,.89,.87,0,.36);});
  partition(k,'x',-12.98,-10.35,-6,0,base,[-8.15]);k.wall('z',-10.35,lo,-12.98,0,base,[]);
  k.zones.unshift({name:'Pantry & buttery',x1:-10.35,x2:-6,z1:lo,z2:-12.98,base:0,top:4});
  stock(k,-8.1,-16.05,0,3.36,'pots');for(const x of [-9.68,-8.84])k.furnishing(x,-14.26,0,.7,.7,b=>cask(b,0,0));
  k.room('Chapel',6,15.2,lo,hi,0,4.2);
  for(const z of [-9.05,-11.0,-12.95])for(const x of [8.46,12.93])k.furnishing(x,z,0,2.20,.52,b=>{table(b,0,0,2.2,.51,.46);wood(b,0,.69,.22,2.18,.43,.09);});
  k.furnishing(10.68,-15.45,0,2.25,.89,b=>{table(b,0,0,2.25,.89,1.0);for(const x of [-.87,.87])candle(b,x,1,0,.38);volume(b,0,1,0);});
  runner(k,10.68,-10.55,1.45,8.4,0,'#547786');
  k.room('Council chamber',-6,6,lo,hi,base,8.8);k.furnishing(-.9,-10.53,base,2.1,3.1,b=>{table(b,0,0,2.1,3.1);volume(b,-.32,.87,.55,.16);candle(b,.41,.87,-.48);});
  for(const z of [-11.56,-9.44])for(const x of [-2.62,.85])k.furnishing(x,z,base,.55,.55,b=>chair(b,0,0),x<0?-Math.PI/2:Math.PI/2);
  k.room('Royal library',-15.2,-6,-13.55,hi,base,8.8);
  for(const z of [-11.6,-7.63])stock(k,-14.58,z,base,3.35,'books',Math.PI/2);
  k.furnishing(-10.55,-8.9,base,2.25,.96,b=>{table(b,0,0,2.25,.96);volume(b,-.41,.88,0);book(b,.38,.88,0);candle(b,.86,.88,-.2);});
  k.room('Treasury',-15.2,-6,lo,-13.55,base,8.8);
  for(const x of [-13.65,-11.6,-8.48])k.furnishing(x,-15.63,base,1.16,.65,b=>{chest(b,0,0);for(let j=0;j<8;j++)b.put('disk',gold,(j%4-.5)*.13,.62+Math.floor(j/4)*.045,0,.15,.035,.15);});
  k.room('Royal bedchamber',6,15.2,lo,-9.75,base,8.8);
  k.furnishing(12.09,-14.22,base,2.05,2.43,b=>{bunk(b,-.48,0,red);bunk(b,.48,0,red);for(const x of [-1,1])for(const z of [-1.1,1.1])wood(b,x,1.24,z,.11,2.48,.11);b.put('box',red,0,2.5,0,2.19,.18,2.42);});
  k.room('Royal solar',6,12.5,-9.75,hi,base,8.8);
  k.furnishing(10.4,-6.48,base,1.4,.81,b=>{table(b,0,0,1.4,.81);volume(b,-.3,.87,0);plant(b,.39,.87,0,.54,true);});
  k.room('Garderobe',12.5,15.2,-9.75,hi,base,8.8);k.furnishing(14.47,-8.56,base,.78,1,b=>{wood(b,0,.32,0,.78,.64,1);b.put('disk','#4b4237',0,.645,0,.32,.015,.39);});
}
export function buildWings(k){
  for(const s of [-1,1]){
    const x1=s<0?-19.65:12.45,x2=s<0?-12.45:19.65,front=s<0?x2:x1,back=s<0?x1:x2;
    k.wall('z',front,-2,13.5,0,3.53,[.32,5.59,10.96].map(z=>[z,1.67]));
    k.wall('z',back,-2,13.5,0,3.53,[.5,5.85,11].map(z=>[z,1,.96,1.43]));
    for(const z of [-2,3.22,8.04,13.5])k.wall('x',z,x1,x2,0,3.53,[]);
    // A continuous lean-to roof leaves each courtyard door directly accessible.
    k.b.put('box','#647674',(x1+x2)/2,4.11,5.75,7.73,.20,16.1,0,0,s*.15,'clay');
    for(const z of [-2,3.22,8.04,13.5])k.box((x1+x2)/2,3.59,z,7.2,.17,.26,walnut,'wood');
    const names=s<0?['Guard barracks','Armoury','Smithy']:['Infirmary','Servants’ quarters','Stables'];
    for(let i=0;i<3;i++){const z=[.32,5.59,10.96][i];k.room(names[i],x1,x2,[-2,3.22,8.04][i],[3.22,8.04,13.5][i],0,4);k.plaque(names[i],front-s*.24,2.99,z,-s*Math.PI/2,2.13);}
  }
  for(const x of [-18.65,-16.49])bedPlace(k,x,.20,0,'#617781');
  for(const x of [16.34,18.56])bedPlace(k,x,.13,0,'#e1dabe');
  stock(k,18.89,2.21,0,1.38,'herbs',-Math.PI/2);
  for(const x of [16.44,18.59])bedPlace(k,x,5.45,0,'#87785e');
  k.furnishing(-17.55,5.52,0,2.52,.74,b=>{cupboard(b,0,0,2.52,.73,.80);for(let j=-2;j<=2;j++){
    b.put('arch',j%2?red:'#577987',j*.48,1.45,0,.40,.75,.12,0,0,Math.PI);b.put('ball',brass,j*.48,1.45,.08,.11,.11,.06);}});
  k.furnishing(-18.49,12.26,0,1.92,1.35,b=>hearth(b,0,0),Math.PI/2);
  k.furnishing(-15.65,10.25,0,1.25,.69,b=>{wood(b,0,.30,0,.74,.60,.60);b.put('box',iron,0,.71,0,1.14,.25,.44);b.put('cone',iron,-.65,.74,0,.35,.58,.35,0,0,Math.PI/2);});
  for(const z of [9.08,11.52])k.furnishing(18.25,z,0,2.2,.97,b=>{wood(b,0,.32,0,2.2,.24,.67);b.put('box','#bda364',0,.53,0,1.97,.30,.59);for(const x of [-.91,.91])wood(b,x,.20,0,.11,.40,.55);});
  for(const z of [10.38,12.9])k.solid(17.84,0,z,3.3,1.10,.13,oak,'wood');
}
export function buildHousehold(k){
  function lodge(x1,x2,z1,z2,names,doorSide){
    const mid=(z1+z2)/2,centers=names.length===1?[mid]:[(z1+mid)/2,(mid+z2)/2];
    const front=doorSide>0?x2:x1,rear=doorSide>0?x1:x2;
    k.wall('z',front,z1,z2,0,3.12,centers.map(z=>[z,1.47]));
    k.wall('z',rear,z1,z2,0,3.12,centers.map(z=>[z,.97,1.14,1.33]));
    for(const z of [z1,z2])k.wall('x',z,x1,x2,0,3.12,[[(x1+x2)/2,1.07,1.14,1.31]]);
    if(names.length>1)k.wall('x',mid,x1,x2,0,3.12,[]);
    roof(k,(x1+x2)/2,mid,x2-x1,z2-z1,3.12,1.58,'#797e75');
    for(const [i,name] of names.entries()){
      k.room(name,x1,x2,i===0?z1:mid,i===names.length-1?z2:mid,0,3.1);
      k.plaque(name,front+doorSide*.25,2.85,centers[i],doorSide*Math.PI/2,1.93);
    }
  }
  lodge(-11.1,-5.65,5.65,13.65,['Bakehouse','Brewhouse'],1);
  k.furnishing(-10.32,7.35,0,1.83,1.29,b=>hearth(b,0,0,true),Math.PI/2);
  k.furnishing(-7.85,8.93,0,1.65,.71,b=>{table(b,0,0,1.65,.71);for(const x of [-.42,.09,.56])b.put('ball','#be884c',x,.98,0,.46,.22,.26);});
  for(const z of [10.79,12.40])k.furnishing(-9.7,z,0,1.4,1.4,b=>{cask(b,0,0,1.65);b.put('cyl',brass,.02,.68,.67,.065,.25,.067,Math.PI/2);},0,1.67);
  lodge(3.15,9.47,-3.18,1.96,['Laundry & linen room'],-1);
  k.furnishing(7.63,-1.32,0,1.36,1.36,b=>{cask(b,0,0,1.48);b.put('disk','#718d8d',0,1.47,0,1.02,.035,1.02);b.put('box',oak,.12,1.49,.14,.40,.75,.065,.31);});
  k.furnishing(5.38,-2.64,0,1.95,.71,b=>{cupboard(b,0,0,1.95,.71,.77);for(let j=0;j<5;j++)b.put('box',j%2?linen:'#9db1aa',0,.85+j*.07,0,.95,.075,.48);});
  lodge(-11.15,-5.78,-3.0,1.72,['Guest chamber'],1);
  bedPlace(k,-9.93,-1.11,0,'#aa7d73');k.furnishing(-7.23,-2.33,0,.86,.61,b=>{cupboard(b,0,0,.86,.61,.64);candle(b,0,.69,0);});
  k.furnishing(16.63,11.02,0,1.72,.82,b=>{
    const coat='#8f6349';
    b.put('ball',coat,0,1.00,0,1.39,.75,.59);
    b.put('ball',coat,-.58,1.44,0,.45,.99,.43,0,0,-.27);
    b.put('ball',coat,-.82,1.80,0,.67,.35,.31,0,0,.13);
    for(const side of [-1,1]){
      b.put('cone',coat,-.62,2.04,side*.09,.11,.25,.09);
      b.put('ball','#292725',-.82,1.86,side*.15,.044,.046,.031);
      for(const xx of [-.43,.48]){b.beam(coat,v(xx,.88,side*.17),v(xx+.04,.15,side*.21),.12,.13,'cyl');b.put('box','#493e33',xx+.016,.077,side*.21,.16,.15,.14);}
    }
    b.beam('#544038',v(.61,1.13,0),v(.79,.49,0),.16,.19,'cyl');
  },.15,1.87);
}
export function buildDungeon(k){
  const prison=-4.8,gallery=-10.45,pit=-16;
  k.cutSlab(-17,17,-13,14,prison,[-1.75,1.05,-10.4,3.40],'#958c7c');
  for(const z of [-13,14])k.wall('x',z,-17,17,prison,4.75,[],darkStone);
  for(const x of [-17,17])k.wall('z',x,-13,14,prison,4.75,[],darkStone);
  k.stairs(6.25,8.75,12.8,3.00,0,prison);
  k.stairs(-1.75,1.05,3.4,-10.4,prison,gallery,darkStone);
  for(const x of [-1.75,1.05])k.rail(x,-10.44,x,3.38,prison);
  k.plaque('Dragon vault',-.38,-1.50,3.62,0,2.05);
  for(let j=0;j<4;j++){
    const z=-9.7+j*5.64;
    k.wall('x',z-2.80,-17,-9,prison,4.50,[],darkStone);
    for(let i=0;i<15;i++){const zz=z-2.64+i*.37;if(Math.abs(zz-z)<.76)continue;
      k.solid(-8.99,prison,zz,.087,3.15,.09,iron,'standard');}
    k.box(-9,prison+3.10,z,.16,.15,5.53,iron,'standard');
    k.furnishing(-15.3,z,prison,1.02,2.02,b=>bunk(b,0,0,'#827655'));
    k.room('Prison cell '+(j+1),-17,-9,z-2.8,z+2.8,prison,-.1);k.torch(-8.70,prison+2.15,z+1.22);
  }
  k.wall('z',9.85,-13,14,prison,4.65,[[-8,1.62],[.65,1.65],[9.7,1.65]],darkStone);
  for(const z of [-3.6,5.37])k.wall('x',z,9.85,17,prison,4.65,[],darkStone);
  k.room('Royal crypt',9.85,17,-13,-3.6,prison,-.1);
  for(const z of [-10.9,-7.15])k.furnishing(14.3,z,prison,1.26,2.1,b=>{b.put('box','#827e78',0,.40,0,1.26,.80,2.13,0,0,0,'masonry');b.put('paver',trim,0,.87,0,1.40,.18,2.22);});
  k.room('Warden’s office',9.85,17,-3.6,5.37,prison,-.1);k.furnishing(14.25,.12,prison,2.3,.85,b=>{table(b,0,0,2.3,.85);volume(b,-.4,.88,0);candle(b,.65,.88,0);});
  k.room('Wine cellar',9.85,17,5.37,14,prison,-.1);for(let j=0;j<4;j++)for(let i=0;i<2;i++)k.furnishing(14.5+i*1.02,6.6+j*1.61,prison,.87,.87,b=>cask(b,0,0,1.14));
  k.room('Prison galleries',-17,17,-13,14,prison,-.1);
  k.slab(-20,20,-18.5,18.5,pit,'#706b65');
  k.slab(-18.9,18.9,-18.2,-10.4,gallery,'#948d81');
  for(const z of [-18.5,18.5])k.wall('x',z,-20,20,pit,11.1,[],'#77736e',.64);
  for(const x of [-19.8,19.8])k.wall('z',x,-18.5,18.5,pit,11.1,[[-.60,2.10,0,3.12],[10.1,2.10,0,3.12]],'#77736e',.64);
  // The crown of the vault closes the space around the flight from the prison.
  k.cutSlab(-20,20,-18.5,18.5,prison-.12,[-1.83,1.13,-10.52,3.48],'#77736e');
  k.stairs(10,12.85,-10.4,2.2,gallery,pit);
  k.rail(-18.8,-10.42,-1.88,-10.42,gallery);k.rail(1.18,-10.42,9.93,-10.42,gallery);k.rail(12.92,-10.42,18.8,-10.42,gallery);
  k.room('Dragon viewing gallery',-19.7,19.7,-18.5,-10.36,gallery,-6);
  k.room('Dragon vault',-20,20,-18.5,18.5,pit,-10.51);
  for(const x of [-16.7,16.7])for(const z of [-12,-3,6,14]){
    k.solid(x,pit,z,1.10,8.15,1.10,'#74716e');k.box(x,pit+.23,z,1.67,.46,1.67,darkStone);
    k.b.beam(darkStone,v(x,pit+7.7,z),v(x*.60,pit+10.85,z),.66,.79);k.torch(x-Math.sign(x)*.68,pit+3.05,z);
  }
  for(const x of [-7,7]){k.torch(x,gallery+1.81,-10.68);k.box(x,gallery+.71,-10.69,.40,1.42,.40,darkStone);}
  for(let i=0;i<240;i++){
    const a=i*2.4,r=.22+4.0*Math.sqrt((i%101)/101),x=-1.9+Math.cos(a)*r,z=4+Math.sin(a)*r;
    k.b.put('disk',tint(i%3?'#bb9348':'#d0ab59'),x,pit+.043+(4.4-r)*.055,z,.20,.06,.20,.04,i*.3);
  }
  // Side passages service the enclosure below the height of the viewing gallery.
  for(const side of [-1,1]){
    const x1=side<0?-30:19.8,x2=side<0?-19.8:30,outer=side*30;
    k.slab(x1,x2,-5.3,15.1,pit,'#81796e');k.slab(x1,x2,-5.3,15.1,pit+4.3,'#7a756f');
    k.wall('z',outer,-5.3,15.1,pit,4.3,[],darkStone);
    for(const z of [-5.3,4.7,15.1])k.wall('x',z,x1,x2,pit,4.3,z===4.7?[[(x1+x2)/2,1.7]]:[],darkStone);
    k.room(side<0?'Dragon keeper’s station':'Chain winch chamber',x1,x2,-5.3,4.7,pit,pit+4);
    k.room(side<0?'Feeding stores':'Deep hoard chamber',x1,x2,4.7,15.1,pit,pit+4);
    for(const z of [-.6,10.1])k.torch(side*20.45,pit+2.23,z+1.45);
    k.plaque(side<0?'Keeper’s station':'Chain winches',side*19.42,pit+3.60,-.6,-side*Math.PI/2,2.67);
  }
  k.furnishing(-25,-1.4,pit,2.49,1.03,b=>{table(b,0,0,2.49,1.03);volume(b,-.54,.87,0);vessel(b,.05,.87,.1,.39);candle(b,.93,.87,0);});
  bedPlace(k,-28.0,1.62,pit,'#667b77');
  for(let j=0;j<4;j++)for(let i=0;i<2;i++)k.furnishing(-27.5+i*1.45,6.5+j*1.94,pit,1.0,1.0,b=>cask(b,0,0,1.32));
  for(const x of [23.3,27.24])k.furnishing(x,-.8,pit,2.0,1.7,b=>{
    for(const s of [-1,1])wood(b,s*.80,.78,0,.29,1.56,1.02);b.put('cyl',iron,0,1.29,0,1.02,2.18,1.02,0,0,Math.PI/2);
    for(let j=0;j<9;j++)b.put('ring','#968975',-.65+j*.16,1.3,0,1.07,1.07,1.0,0,Math.PI/2);
  },0,1.9);
  for(const x of [23,26.6])for(const z of [8.1,12.57])k.furnishing(x,z,pit,1.32,.83,b=>{chest(b,0,0);for(let j=0;j<15;j++)b.put('disk',gold,(j%5-2)*.14,.62+Math.floor(j/5)*.035,0,.15,.05,.15);});
  for(const side of [-1,1])for(let j=0;j<13;j++){
    const z=-15+j*2.66,x=side*(18.0+.61*Math.sin(j*2.3));
    if(Math.min(Math.abs(z+.60),Math.abs(z-10.1))<1.9)continue;
    k.b.put('crown',tint('#656b69'),x,pit+.50,z,2.31,2.39+1.4*Math.sin(j*.7),2.61,.17,j,0,'stone');
    k.obstacle(x,z,1.93,1.88,pit,pit+1.87);
    k.b.put('cone',tint('#777977'),x,pit+9.0,z,1.12,3.30,1.07,0,.4*j,Math.PI);
    if(j%3===0)for(let c=0;c<4;c++)k.b.put('spire','#75b7b2',x-side*.77+c*.16,pit+.56,z+c*.22,.35,1.03+c*.10,.39,0,c,.22);
  }
  for(const z of [-5,5.9,14.2])for(const side of [-1,1]){
    const a=v(side*16.64,pit+6.45,z),b=v(side*12.50,pit+9.05,z),c=v(side*6,pit+10.50,z),d=v(0,pit+10.85,z);
    k.b.beam(darkStone,a,b,.67,.69);k.b.beam(darkStone,b,c,.61,.69);k.b.beam(darkStone,c,d,.55,.69);
  }
  for(const x of [-12,11.65]){
    k.b.put('ring',iron,x,pit+2.0,13.75,1.05,1.05,3.0);
    k.solid(x,pit,14.17,1.26,2.91,1.0,darkStone);
    for(let j=0;j<17;j++)k.b.put('ring',iron,x+(x>0?-1:1)*j*.19,pit+.16+1.67*Math.exp(-.18*j),13.57-j*.26,.34,.49,1.08,1.15,j%2?1.19:.10);
  }
  k.obstacle(-2,3.5,3.7,7.75,pit,pit+4.2);
  k.obstacle(-2.1,-1.7,1.72,3.7,pit,pit+5.3);
}
