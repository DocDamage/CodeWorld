import * as T from 'three';
import { Builder, v, TAU, pick, tint } from './model.js';

export const walnut='#684530', oak='#a57449', honey='#bc915e', iron='#454640', brass='#c49a53', linen='#f1dfbc';
const bookColors=['#7d4140','#48645c','#af8952','#536375','#785449'];
export function wood(b,x,y,z,w,h,d,c=oak) {b.put('box',c,x,y,z,w,h,d,0,0,0,'wood');}
export function table(b,x,z,w,d,h=.87) {
  wood(b,x,h-.055,z,w,.11,d,honey);
  wood(b,x,h-.19,z,w-.13,.19,d-.13,oak);
  for(const sx of [-1,1])for(const sz of [-1,1]){
    const xx=x+sx*(w/2-.11),zz=z+sz*(d/2-.11);
    wood(b,xx,(h-.19)/2,zz,.12,h-.19,.12);
    b.put('ball',walnut,xx,.15,zz,.15,.17,.15);
  }
}
export function chair(b,x,z,a=0,cloth='#667b67') {
  b.group(x,0,z,a,()=>{
    table(b,0,0,.53,.54,.47);b.put('box',cloth,0,.49,0,.49,.065,.46);
    for(const s of [-1,1])wood(b,s*.20,.73,.218,.075,.64,.084);
    wood(b,0,.88,.22,.46,.13,.075,honey);wood(b,0,1.02,.22,.50,.085,.08);
  });
}
export function cupboard(b,x,z,w,d,h,color) {
  wood(b,x,h/2,z,w,h,d,color||oak);
  wood(b,x,h+.025,z,w+.09,.075,d+.065,honey);
  wood(b,x,.085,z,w+.06,.13,d+.045,walnut);
  for(const s of [-1,1]){
    const xx=x+s*w*.236,front=z+d/2;
    wood(b,xx,h*.51,front+.021,w*.44,h*.76,.055,color||honey);
    wood(b,xx,h*.51,front+.051,w*.34,h*.62,.025,color||oak);
    b.put('ball',brass,x+s*.085,h*.56,front+.09,.072,.072,.068);
  }
}
export function book(b,x,y,z,w=.15,h=.36,d=.23,color=pick(bookColors)) {
  b.put('box',linen,x,y+h/2,z,w-.02,h-.025,d-.012);
  for(const s of [-1,1])b.put('box',color,x+s*(w/2-.008),y+h/2,z,.017,h,d);
  b.put('box',color,x,y+h/2,z+d/2,w,h,.038);
  for(const f of [.19,.76,.85])b.put('box',brass,x,y+h*f,z+d/2+.022,w*.83,.014,.008);
}
export function volume(b,x,y,z,a=0) {
  b.group(x,y,z,a,()=>{b.put('box',linen,0,.055,0,.47,.09,.34);for(const h of [.008,.105])b.put('box','#6c5144',0,h,0,.49,.018,.37);});
}
export function vessel(b,x,y,z,s=.3,color='#8ca397',shape='jar') {
  const r=s*(shape==='bottle'?.62:1);
  b.put('ball',color,x,y+s*.41,z,r*.96,s*.81,r*.96);
  b.put('cyl',color,x,y+s*.76,z,r*.53,s*.34,r*.53);
  b.put('cyl',color,x,y+s*.91,z,r*.66,s*.083,r*.66);
  b.put('disk','#52483d',x,y+s*.955,z,r*.474,.009,r*.474);
  if(shape==='bottle')b.put('cyl',oak,x,y+s*1.01,z,r*.42,.09,r*.42);
}
export function cup(b,x,y,z) {
  b.put('cyl','#d1ba8b',x,y+.084,z,.14,.16,.14);b.put('disk','#604736',x,y+.166,z,.111,.006,.111);
  b.put('ring','#d1ba8b',x+.084,y+.095,z,.112,.118,.43);
}
export function plate(b,x,y,z,s=.36){b.put('disk',linen,x,y+.016,z,s,.032,s);b.put('ring','#78918a',x,y+.035,z,s*.78,s*.78,.15,Math.PI/2);}
export function plant(b,x,y,z,s=.52,flowers=false) {
  vessel(b,x,y,z,s*.54,'#b57856');
  for(let j=0;j<7;j++){
    const a=j*2.4,r=s*(.12+.027*(j%4)),h=s*(.73+.11*(j%3)),xx=x+Math.sin(a)*r,zz=z+Math.cos(a)*r;
    b.beam('#678252',v(x,y+s*.43,z),v(xx,y+h,zz),.015,.015,'cyl');
    b.put('leaf',pick(['#5b8059','#819951','#586f47']),xx,y+h-.04,zz,s*.23,s*.37,s*.13,.45,a,.3);
    if(flowers)b.put('ball',pick(['#c48891','#ded4a4','#cfafa4']),xx,y+h+.02,zz,.079,.08,.075);
  }
}
export function candle(b,x,y,z,h=.22) {
  b.put('disk',brass,x,y+.018,z,.15,.03,.15);
  b.put('cyl',linen,x,y+h/2,z,.074,h,.074);
  b.put('ball','#ffeea6',x,y+h+.048,z,.034,.10,.034,0,0,0,'glow');
}
function loaf(b,x,y,z,s=.48){
  b.put('ball','#c98e4d',x,y+s*.22,z,s,s*.48,s*.63);
  for(let i=-1;i<2;i++)b.put('box','#f2cc84',x+i*s*.21,y+s*(i===0?.45:.414),z,.023,.013,s*.23,0,.44);
}
function bundle(b,x,y,z,s=.7) {
  b.put('barrel','#c0a983',x,y+.34*s,z,.62*s,.70*s,.53*s);
  b.put('ball','#b49a73',x,y+.73*s,z,.31*s,.18*s,.30*s);
  b.put('cyl',walnut,x,y+.65*s,z,.34*s,.037,.31*s);
}
export function gear(b,x,y,z,r,c=brass){
  b.put('ring',c,x,y,z,r*1.83,r*1.83,2.6);
  for(let i=0;i<16;i++){
    const a=i*TAU/16;
    b.put('box',c,x+Math.sin(a)*r,y+Math.cos(a)*r,z,r*.22,r*.24,.11,0,0,-a);
    if(i%2===0)b.beam(c,v(x,y,z),v(x+r*.88*Math.sin(a),y+r*.88*Math.cos(a),z),r*.105,.083);
  }
  b.put('cyl',iron,x,y,z,r*.32,.19,r*.32,Math.PI/2);
}
export function shelf(b,x,y,z,w,stock) {
  for(let k=0;k<3;k++){
    const h=y+k*.54;wood(b,x,h,z,w,.075,.42,honey);
    const count=Math.floor(w/(stock==='books'?.21:.44));
    for(let j=0;j<count;j++){const xx=x+(j+.5-count/2)*(w-.16)/count;
      if(stock==='books')book(b,xx,h+.042,z,.13+.025*(j%3),.27+.047*((j+k)%4));
      else if(stock==='bread')loaf(b,xx,h+.055,z,.37);
      else vessel(b,xx,h+.047,z,.24+.045*((k+j)%4),pick(['#84998a','#be8864','#739298','#d3bc8e','#976f69']),stock==='herbs'?'bottle':'jar');
    }
  }
  for(const s of [-1,1])wood(b,x+s*(w*.5-.04),y+.54,z,.078,1.45,.39,walnut);
}
export function hearth(b,x,z,oven=false){
  const w=oven?2.22:1.68;
  // Build the jambs and a recessed firebox so the hearth has depth from the side.
  for(const s of [-1,1])b.put('box','#aa9a80',x+s*w*.407,.66,z,w*.19,1.32,.82,0,0,0,'stone');
  b.put('box','#a0927c',x,1.71,z,w,.62,.82,0,0,0,'stone');
  b.put('gable','#b2a48d',x,2.01,z,w,.54,.82);
  b.put('box','#988b76',x,2.49,z,.69,.85,.68,0,0,0,'stone');
  b.put('box','#48392f',x,.71,z-.30,w*.68,1.47,.17,0,0,0,'stone');
  for(let j=0;j<6;j++)for(let k=0;k<5;k++)
    b.put('box',tint('#625044',.15),x+(k-2)*w*.115,.28+j*.18,z-.18,w*.108,.157,.07);
  for(let j=0;j<7;j++)b.put('leaf','#ac4931',x+(j-3)*.096,.203,z+.24,.13,.06,.13,0,j,0,'glow');
  for(const s of [-1,1])for(let i=0;i<4;i++)b.put('paver',tint('#ac8568'),x+s*w*.375,.18+i*.23,z+.46,.24,.21,.16);
  for(let i=0;i<9;i++){
    const a=Math.PI*i/8;
    b.put('box',tint('#ba9375'),x+w*.37*Math.cos(a),.98+.52*Math.sin(a),z+.47,.20,.23,.16,0,0,a-Math.PI/2);
  }
  b.put('box','#918470',x,.075,z+.47,w+.26,.15,.65,0,0,0,'stone');
  for(let j=0;j<4;j++){
    b.put('cyl',walnut,x+(j-1.5)*.17,.23,z+.46,.13,.47,.13,Math.PI/2,.2);
    b.put('leaf','#ed9449',x+(j-1.5)*.15,.4,z+.49,.14,.30+j%2*.1,.12,0,0,.1*j,'glow');
  }
}
function bed(b,x,z,accent) {
  wood(b,x,.37,z,1.30,.20,2.12,walnut);
  for(const dx of [-.59,.59])for(const dz of [-.94,.94])wood(b,x+dx,.30,z+dz,.11,.60,.11);
  wood(b,x,.66,z-.99,1.32,.64,.12,honey);
  b.put('box',linen,x,.53,z,1.24,.19,2.03);
  b.put('box',accent,x,.65,z+.30,1.25,.09,1.40);
  for(let j=0;j<5;j++)b.put('box',linen,x,.699,z-.18+j*.235,1.22,.01,.022);
  b.put('ball','#f0dfbd',x,.69,z-.68,.91,.20,.43);
}
function movingPart(b,x,y,z,build,update){
  const anchor=new T.Group();anchor.matrixAutoUpdate=false;
  anchor.matrix.copy(b.frame).multiply(new T.Matrix4().makeTranslation(x,y,z));b.root.add(anchor);
  const pivot=new T.Group();anchor.add(pivot);
  const mb=new Builder(pivot);build(mb);mb.finish();
  b.root.userData.motion.push((time,hour)=>update(pivot,time,hour));
}
function turningGear(b,x,y,z,r,rate,c=brass){
  movingPart(b,x,y,z,mb=>gear(mb,0,0,0,r,c),(pivot,t)=>pivot.rotation.z=t*rate);
}
function tallClock(b){
  wood(b,0,1.14,0,.65,2.28,.43);wood(b,0,.13,0,.76,.24,.53,walnut);
  wood(b,0,2.26,0,.79,.13,.52,honey);
  b.put('arch',walnut,0,.98,.229,.46,1.27,.034);
  movingPart(b,0,1.53,.27,mb=>{mb.put('box',brass,0,-.40,0,.033,.81,.035);mb.put('disk',brass,0,-.82,0,.23,.058,.23,Math.PI/2);},(pivot,t)=>pivot.rotation.z=.125*Math.sin(t*3.14));
  b.put('disk',brass,0,1.84,.25,.59,.08,.59,Math.PI/2);
  b.put('disk',linen,0,1.84,.298,.50,.03,.50,Math.PI/2);
  for(let i=0;i<12;i++){const a=i*TAU/12;b.put('box',walnut,Math.sin(a)*.203,1.84+Math.cos(a)*.203,.32,.015,.05,.012,0,0,-a);}
  for(const len of [.13,.19])movingPart(b,0,1.84,.34,mb=>mb.put('box',iron,0,len*.40,0,.024,len,.016),(pivot,t,h)=>pivot.rotation.z=-TAU*(len===.13?h/12:h%1));
}
export function sleepingLoft(b,p,accent) {
  bed(b,-2.66,-2.50,accent);
  cupboard(b,-1.55,-3.32,.70,.49,.62);candle(b,-1.57,.69,-3.31);
  if(p.id==='inn'){bed(b,.12,-2.58,'#8a6860');}
  else if(p.id==='tower'){
    turningGear(b,.10,1.45,-3.67,.71,.16);turningGear(b,1.16,1.01,-3.64,.44,-.255,'#907b53');
    cupboard(b,.61,-3.38,1.65,.56,.60,'#788675');
  }else{
    cupboard(b,.24,-3.48,1.25,.63,1.48,accent);
    plant(b,.22,1.55,-3.45,.50);
  }
  cupboard(b,2.05,-3.43,.92,.61,.65);volume(b,2.06,.72,-3.40,.11);
}
export function fitWorkshop(b,id,block) {
  // Left-side counters face the central aisle. Local bounds travel with each workstation.
  function left(z,w,build,d=.79) {
    b.group(-3.76,0,z,Math.PI/2,build);
    block(-3.76,z,d,w);
  }
  function back(x,w,build,d=.85) {
    b.group(x,0,-3.49,0,build);block(x,-3.49,w,d);
  }
  function sideboard(stock){
    cupboard(b,0,0,2.46,.74,.88);shelf(b,0,1.36,-.12,2.35,stock);
  }
  const center=(x,z,w,d,fn)=>{b.group(x,0,z,0,fn);block(x,z,w,d);};
  switch(id){
    case 'bakery':
      back(-1.55,2.45,()=>{hearth(b,0,0,true);
        b.beam(honey,v(1.06,.29,.64),v(1.36,1.98,.21),.075,.075,'cyl');
        b.put('paver',honey,1.09,.44,.60,.31,.065,.51,1.24,0,-.14);
      },1.50);
      back(1.10,2.46,()=>sideboard('bread'));
      left(.09,2.65,()=>{table(b,0,0,2.65,.85);for(let j=0;j<4;j++)loaf(b,-.91+j*.57,.88,.06,.46);});
      center(-1.15,.65,1.62,.88,()=>{table(b,0,0,1.62,.88);b.put('box','#debf92',-.10,.884,.01,.73,.028,.46);loaf(b,-.15,.91,.02,.45);b.put('cyl',honey,.46,.96,.02,.12,.55,.12,Math.PI/2);vessel(b,-.57,.88,-.15,.25);});
      break;
    case 'mill':
      back(-1.54,2.21,()=>{table(b,0,0,2.21,1,.58);
        for(let j=0;j<2;j++)b.put('disk',tint('#ada590'),0,.73+j*.21,0,1.40,.23,1.4,0,0,0,'stone');
        b.put('cyl',walnut,0,1.68,0,.18,1.48,.18);turningGear(b,.75,1.69,-.15,.47,.46,oak);},1.10);
      back(1.32,2.10,()=>{cupboard(b,0,0,2.1,.78,.88);for(let i=0;i<3;i++)bundle(b,(i-1)*.55,.93,0,.80);});
      left(-.5,2.3,()=>{table(b,0,0,2.3,.75);vessel(b,-.62,.89,0,.44);volume(b,.36,.88,0,.15);});
      center(-2.36,1.36,1.1,.84,()=>{bundle(b,-.27,0,.06,1.02);bundle(b,.27,0,-.12,.88);});break;
    case 'inn':
      back(-2.53,1.86,()=>hearth(b,0,0),1.42);
      back(.21,2.65,()=>{cupboard(b,0,0,2.65,.79,1.02,'#647c70');shelf(b,0,1.39,-.1,2.54,'pots');});
      for(const z of [-.95,1.38]){
        center(-2.18,z,1.57,.83,()=>{table(b,0,0,1.57,.83);for(const x of [-.46,.46]){plate(b,x,.88,0);cup(b,x+.18,.89,.1);}candle(b,0,.89,0);});
        for(const s of [-1,1]){chair(b,-2.18,z+s*.71,s===1?0:Math.PI);block(-2.18,z+s*.71,.55,.54);}
      }break;
    case 'slate':
      back(-1.89,2.65,()=>{cupboard(b,0,0,2.65,.74,.67);shelf(b,0,.89,-.12,2.60,'books');});
      back(1.13,2.37,()=>{table(b,0,0,2.37,.81);wood(b,.22,.99,0,1.14,.18,.65);for(const x of [-.24,.68])wood(b,x,1.28,0,.09,.68,.1);wood(b,.22,1.62,0,1.14,.12,.15);b.put('cyl',iron,.22,1.39,0,.075,.44,.075);wood(b,.22,1.20,0,.97,.12,.54);});
      left(.1,2.45,()=>sideboard('books'));
      center(-1.12,.77,1.63,.91,()=>{table(b,0,0,1.63,.91);volume(b,-.41,.88,.01,-.23);for(let i=0;i<4;i++)b.put('box',linen,.27+i*.015,.89+i*.018,0,.50,.012,.40,0,i*.06);candle(b,.65,.88,-.18);});break;
    case 'tower':
      back(-.89,2.80,()=>{cupboard(b,0,0,2.8,.76,.73,'#748173');turningGear(b,-.67,1.75,-.28,.63,.22);turningGear(b,.26,1.42,-.23,.42,-.33);turningGear(b,.94,1.73,-.25,.30,.46);});
      left(.20,2.43,()=>{table(b,0,0,2.43,.8);volume(b,-.59,.88,.04);gear(b,.22,1.26,-.10,.34);vessel(b,.82,.88,-.02,.34);});
      back(1.82,1.24,()=>tallClock(b));
      chair(b,-2.26,.61,.41);block(-2.26,.61,.64,.62);break;
    case 'wind':
      back(-1.12,2.4,()=>{table(b,0,0,2.40,.95,.65);b.put('disk','#a99e87',0,.81,0,1.22,.30,1.22);b.put('cone',oak,0,1.48,0,1.27,1.12,1.27,0,0,Math.PI);b.put('disk','#5e4b39',0,2.04,0,1.11,.02,1.11);turningGear(b,-.86,1.30,0,.42,-.37,oak);},1.05);
      back(1.57,1.73,()=>{for(let j=0;j<3;j++)bundle(b,(j-1)*.53,0,0,1);});
      left(-.1,2.28,()=>{cupboard(b,0,0,2.28,.74,.91);volume(b,-.58,.96,0);vessel(b,.45,.96,0,.41);cup(b,.0,.96,.16);});
      center(-2.48,1.58,.94,.73,()=>{wood(b,0,.38,0,.92,.74,.73);for(const s of [-1,1])wood(b,s*.35,.38,.38,.09,.74,.06,walnut);bundle(b,0,.76,0,.67);});break;
    case 'potter':
      back(-2.12,1.87,()=>hearth(b,0,0,true),1.45);back(.72,2.6,()=>sideboard('pots'));
      left(-.03,2.48,()=>{table(b,0,0,2.48,.79);for(let j=0;j<4;j++)vessel(b,-.86+j*.56,.88,0,.35+j*.045,'#b67859');});
      center(-1.39,.80,1.12,1.1,()=>{b.put('disk',oak,0,.19,0,.91,.15,.91);b.put('cyl',iron,0,.42,0,.15,.53,.15);b.put('disk','#ad967d',0,.74,0,.93,.11,.93);vessel(b,0,.80,0,.50,'#ba795d');});
      chair(b,-1.43,1.72);block(-1.43,1.72,.55,.54);break;
    case 'herb':
      back(-1.93,2.45,()=>sideboard('herbs'));back(1.06,2.25,()=>{cupboard(b,0,0,2.25,.78,.90,'#788871');plant(b,-.62,.96,0,.70,true);vessel(b,.1,.96,0,.40);plant(b,.71,.96,0,.59);});
      left(-.22,2.23,()=>{table(b,0,0,2.23,.78);for(let j=0;j<4;j++)plant(b,-.79+j*.52,.88,0,.54+j*.06,true);});
      center(-1.26,.81,1.55,.88,()=>{table(b,0,0,1.55,.88);vessel(b,-.31,.88,0,.32,'#8e9a88');b.put('cyl',walnut,-.25,1.21,0,.065,.28,.065,0,0,-.52);volume(b,.33,.88,.01,.2);});
      break;
  }
}
