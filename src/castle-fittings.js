import {brass,candle,chair,cup,cupboard,hearth,iron,linen,oak,plate,shelf,table,vessel,volume,walnut,wood} from './furnishings.js';

function bench(b,w,cloth){
  table(b,0,0,w,.56,.46);
  b.put('box',cloth,0,.50,0,w-.10,.09,.52);
  wood(b,0,.82,.24,w,.32,.09,walnut);
  for(const s of [-1,1])wood(b,s*(w/2-.10),.66,.24,.09,.55,.09);
}
function folded(b,x,y,z,count){
  for(let i=0;i<count;i++)b.put('box',i%3?'#d4cbb6':'#87999b',x+(i%2)*.04,y+i*.067,z,.64,.07,.42,0,.028*i);
}
function provisions(b,x,z){
  for(const [dx,dz,h] of [[-.44,.12,.8],[.36,-.11,.97],[.18,.47,.62]]){
    b.put('barrel','#ae936c',x+dx,h*.43,z+dz,.61,h*.86,.56);
    b.put('ball','#bfa783',x+dx,h*.87,z+dz,.32,.16,.26);
    b.put('ring','#614e39',x+dx,h*.81,z+dz,.28,.24,.32,Math.PI/2);
  }
}
export function furnishRoyalSuite(k,y){
  k.furnishing(15.98,-19.80,y,2.65,.92,b=>hearth(b,0,0),0,2.9);
  k.furnishing(12.13,-18.94,y,2.1,.57,b=>bench(b,2.1,'#735364'),Math.PI);
  k.furnishing(17.42,-17.35,y,.61,.62,b=>chair(b,0,0,1.04,'#733d50'));
  k.furnishing(15.65,-17.36,y,1.28,.79,b=>{
    table(b,0,0,1.28,.79,.58);volume(b,-.22,.58,.01,-.2);cup(b,.40,.58,.12);
  });
  k.furnishing(7.80,-19.70,y,2.55,.78,b=>{
    cupboard(b,0,0,2.50,.78,2.05,walnut);
    for(const s of [-1,1])b.put('gable','#896340',s*.58,2.10,.41,.98,.19,.10,0,0,0,'wood');
  },0,2.28);
  k.furnishing(17.74,-12.5,y,1.63,.80,b=>{
    table(b,0,0,1.63,.80);vessel(b,-.36,.88,-.06,.49,'#637b84');plate(b,.35,.88,0,.46);
    folded(b,.20,.93,-.17,2);
  },-Math.PI/2);
  k.furnishing(10.07,-14.8,y,.58,.61,b=>{cupboard(b,0,0,.58,.61,.64,walnut);candle(b,0,.69,0);});
  k.furnishing(13.98,-14.8,y,.58,.61,b=>{cupboard(b,0,0,.58,.61,.64,walnut);cup(b,0,.69,0);});
  k.furnishing(12.1,-11.99,y,1.79,.60,b=>bench(b,1.79,'#784754'));
  // A woven hearth rug follows the sitting area, leaving the bedside route clear.
  k.box(15.78,y+.018,-17.63,3.92,.024,2.88,'#764f4a','standard');
  for(const side of [-1,1]){
    k.box(15.78+side*1.78,y+.033,-17.63,.06,.014,2.64,'#ba995e','standard');
    k.box(15.78,y+.033,-17.63+side*1.24,3.60,.014,.06,'#ba995e','standard');
  }
  for(let i=0;i<5;i++)k.b.put('box','#ae8462',14.34+i*.68,y+.034,-17.62,.25,.012,.25,0,Math.PI/4);
  k.furnishing(7.14,-6.0,y,.62,.62,b=>chair(b,0,0,-.42,'#876852'));
  k.furnishing(17.64,-6.12,y,1.25,.66,b=>{cupboard(b,0,0,1.25,.66,.74);folded(b,0,.79,0,4);},-Math.PI/2);
  k.furnishing(-13.57,-18.52,y,1.74,.80,b=>{table(b,0,0,1.74,.8);volume(b,-.43,.88,.04);cup(b,.32,.88,.02);candle(b,.61,.88,-.10);});
  // The cabinet faces the council room's interior wall, clear of the tall windows.
  k.furnishing(-5.30,-18.24,y,2.57,.77,b=>{cupboard(b,0,0,2.57,.77,.91);volume(b,-.58,.95,0);vessel(b,.63,.95,0,.33);},Math.PI/2);
}

export function furnishWings(k){
  k.furnishing(-20.45,-2.86,0,3.24,.69,b=>{
    cupboard(b,0,0,3.24,.69,.68);for(let i=-1;i<=1;i++){
      b.put('ball','#646b69',i*.90,.91,0,.40,.37,.41,0,0,0,'iron');
      b.put('disk',iron,i*.90,.79,.035,.50,.06,.49,0,0,0,'iron');
    }
  });
  k.furnishing(-21.9,1.47,0,1.70,.56,b=>bench(b,1.70,'#656550'),Math.PI/2);
  k.furnishing(-20.49,7.33,0,2.76,.74,b=>{
    table(b,0,0,2.76,.74);
    for(let i=0;i<4;i++){const x=(i-1.5)*.48;b.put('cyl','#907656',x,1.57,0,.045,1.5,.045,-.08,0,0,'wood');}
    wood(b,0,1.79,.02,2.68,.11,.16,walnut);
  },Math.PI,2.30);
  k.furnishing(-21.14,9.20,0,2.3,.9,b=>{
    table(b,0,0,2.28,.9);
    for(let i=0;i<6;i++)b.put('box',iron,(i%3-1)*.46,.93+(i>2?.10:0),.04,.42,.095,.20,0,.05*i,0,'iron');
  });
  k.furnishing(-20.73,12.55,0,1.4,1.0,b=>provisions(b,0,0));
  k.furnishing(18.7,-2.98,0,2.98,.77,b=>{
    cupboard(b,0,0,2.98,.77,.86);folded(b,-.86,.94,0,4);vessel(b,.18,.92,0,.45);plate(b,1.02,.93,0,.42);
  });
  k.furnishing(21.55,1.83,0,.61,.59,b=>chair(b,0,0,-.8));
  k.furnishing(20.98,7.32,0,2.46,.72,b=>{cupboard(b,0,0,2.46,.72,1.39);folded(b,-.51,1.48,0,3);folded(b,.43,1.48,0,2);},Math.PI,1.8);
  k.furnishing(14.34,6.89,0,1.25,.62,b=>{table(b,0,0,1.25,.62);cup(b,-.31,.87,0);candle(b,.35,.87,0);});
  k.furnishing(20.75,12.55,0,2.42,.98,b=>{
    for(let i=0;i<3;i++)b.put('box','#b49a5e',(i-1)*.71,.37,0,.67,.7,.91,0,.055*i,0,'thatch');
    for(const x of [-.52,.52])wood(b,x,.68,0,.05,.06,.98,walnut);
  });
  k.furnishing(21.35,8.91,0,1.70,.50,b=>{
    wood(b,0,.95,0,1.65,.17,.13);for(const x of [-.60,.58]){wood(b,x,.53,0,.11,1.06,.14);
      b.put('ring','#70503e',x,.68,.09,.38,.63,.7,0,0,0,'agedWood');}
  },0,1.10);
}

export function furnishHousehold(k){
  k.furnishing(-10.45,5.97,0,.86,.72,b=>provisions(b,0,0));
  k.furnishing(4.02,.95,0,1.19,.66,b=>{table(b,0,0,1.19,.66,.46);folded(b,.04,.53,0,3);});
  k.furnishing(-10.7,.99,0,.7,.64,b=>{table(b,0,0,.70,.64,.62);vessel(b,0,.65,0,.32);});
  k.furnishing(-21.62,18.18,0,.79,.65,b=>{b.put('barrel','#826749',0,.25,0,.75,.5,.61,0,0,0,'wood');
    b.put('disk','#677b76',0,.495,0,.62,.022,.5);});
  k.furnishing(13.68,15.13,0,.66,.66,b=>{wood(b,0,.89,0,.09,1.78,.13);wood(b,0,1.65,0,.65,.075,.09);
    b.put('box',linen,-.13,1.26,.07,.29,.74,.09);},0,1.75);
  k.furnishing(-5.11,8.88,0,1.60,.68,b=>shelf(b,0,.55,0,1.58,'bread'),0,2.04);
  k.furnishing(-10.38,12.82,0,1.25,.97,b=>provisions(b,0,0));
  k.furnishing(-6.13,12.78,0,2.20,.68,b=>{table(b,0,0,2.20,.68);for(const x of [-.63,-.15,.46])vessel(b,x,.88,0,.39,'#a07852');},Math.PI);
  k.furnishing(9.99,.73,0,1.65,.64,b=>{wood(b,0,1.78,0,1.63,.09,.11);for(const s of [-1,1])wood(b,s*.76,.9,0,.08,1.80,.19);
    for(const x of [-.35,.32])b.put('box',linen,x,1.34,.04,.53,.88,.06,0,.08,0);},Math.PI/2,1.86);
  k.furnishing(-10.4,-3.1,0,1.52,.64,b=>cupboard(b,0,0,1.52,.64,1.55),0,1.67);
  k.furnishing(-6.1,.92,0,1.48,.59,b=>bench(b,1.48,'#86705b'),Math.PI);
  k.furnishing(-15.33,14.83,0,2.46,.72,b=>{cupboard(b,0,0,2.46,.72,.83);
    for(const x of [-.64,0,.64]){b.put('ball','#806043',x,1.01,0,.33,.32,.31);b.put('leaf','#805446',x,1.21,0,.09,.18,.10);}});
  k.furnishing(-20.65,19.78,0,2.14,1.12,b=>{wood(b,0,.16,0,2.14,.23,1.12);b.put('box','#af925a',0,.32,0,1.96,.17,.98,0,0,0,'thatch');
    for(const side of [-1,1])wood(b,side*1.03,.39,0,.12,.52,1.12);});
  k.furnishing(-14.74,20.2,0,1.22,.7,b=>{cupboard(b,0,0,1.22,.7,.69);vessel(b,0,.75,0,.37);});
  k.furnishing(20.82,14.96,0,1.71,.57,b=>{bench(b,1.71,'#85938b');folded(b,.42,.56,0,2);});
  k.furnishing(14.43,20.25,0,2.00,.68,b=>{cupboard(b,0,0,2,.68,.75);folded(b,-.43,.82,0,5);folded(b,.40,.82,0,3);},Math.PI);
  k.furnishing(21.27,19.71,0,.55,.59,b=>chair(b,0,0,-.83));
}
export function furnishVaultStores(k,pit){
  for(const x of [-29.4,-27.6,-25.8])k.furnishing(x,16.97,pit,1.4,1.18,b=>provisions(b,0,0));
  k.furnishing(-21.03,14.90,pit,3.23,.84,b=>{
    table(b,0,0,3.23,.84);vessel(b,-.95,.88,0,.52);wood(b,.42,.91,0,1.35,.10,.54);
    b.put('box',iron,.48,1.00,.02,.51,.11,.07,0,.14,0,'iron');
  },-Math.PI/2);
  k.furnishing(26.85,16.89,pit,3.14,.90,b=>{
    cupboard(b,0,0,3.14,.90,1.33,walnut);
    for(const x of [-.91,0,.91]){vessel(b,x,1.37,0,.51,'#ba9a55');cup(b,x+.25,1.37,.13);}
  },Math.PI,1.96);
  k.furnishing(29.91,12.3,pit,2.13,.82,b=>{table(b,0,0,2.13,.82);volume(b,-.39,.88,.08);candle(b,.72,.88,-.06);},-Math.PI/2);
}
