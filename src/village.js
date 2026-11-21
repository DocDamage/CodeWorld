import * as T from 'three';
import { Builder,tint,v,range,label } from './model.js';
import { height,inPlot,nearPath,riverX,riverWidth } from './land.js';
import { localToWorld,plots } from './layout.js';
import { oak,walnut,iron,honey,wood,table,vessel,plant,volume } from './furnishings.js';
import { placedFire } from './fire.js';

const clothMaterial=new T.MeshStandardMaterial({color:'#c0ae92',side:T.DoubleSide,roughness:.96});

function crate(b,x,z,s=.72) {
  wood(b,x,s*.37,z,s,s*.74,s*.79,'#80664e');
  for(const offset of [-.38,.38]) {
    wood(b,x+offset*s,s*.42,z+s*.403,.11*s,s*.80,.065*s,walnut);
    wood(b,x+offset*s,s*.42,z-s*.403,.11*s,s*.80,.065*s,walnut);
  }
  for(let i=0;i<4;i++)wood(b,x,s*.75,z+(i-1.5)*s*.19,s*.99,.046,s*.181,tint(honey,.19));
}

function cask(b,x,z,s=1){
  b.put('barrel','#7b5d43',x,s*.48,z,s*.77,s*.96,s*.77,0,0,0,'wood');
  for(const y of [.19,.74])b.put('cyl',iron,x,y*s,z,s*.75,.070,s*.75);
  b.put('disk','#594731',x,s*.96,z,s*.59,.039,s*.59,0,0,0,'wood');
}

function cart(b,stock){
  for(const x of [-.69,.69]){
    b.put('ring',iron,x,.52,.15,1.03,1.03,1.3,0,Math.PI/2);
    b.put('cyl',walnut,x,.52,.15,.20,.25,.20,0,0,Math.PI/2);
    for(let i=0;i<8;i++){
      const a=i*Math.PI/4;b.beam(oak,v(x,.52,.15),v(x,.52+.49*Math.sin(a),.15+.49*Math.cos(a)),.048,.068);
    }
    wood(b,x*.8,.76,.04,.13,.16,2.02,walnut);
    b.beam(oak,v(x*.8,.77,.62),v(x*.66,.96,1.85),.096);
    for(const z of [-.72,.78])wood(b,x*.8,1.03,z,.11,.61,.105,walnut);
    for(const y of [.90,1.18])wood(b,x*.84,y,.025,.073,.16,1.66,tint(oak,.12));
  }
  for(let i=0;i<7;i++)wood(b,(i-3)*.155,.86,.06,.149,.055,1.68,tint(oak,.18));
  b.group(0,.90,0,0,stock);
}

function logs(b,x,z){
  for(let row=0;row<3;row++)for(let i=0;i<6-row;i++){
    const xx=x+(i-(5-row)/2)*.22,zz=z+range(-.11,.11),y=.13+row*.19;
    b.put('cyl',tint('#514338'),xx,y,zz,.223,1.06,.223,Math.PI/2,0,range(-.10,.10),'wood');
    b.put('disk',tint('#a38662'),xx,y,zz+.534,.16,.025,.16,Math.PI/2);
  }
}

function clothLine(b,updates){
  for(const x of [-1.73,1.73])wood(b,x,1.37,0,.13,2.74,.14,walnut);
  b.beam('#655949',v(-1.73,2.61,0),v(0,2.47,0),.025);
  b.beam('#655949',v(0,2.47,0),v(1.73,2.61,0),.025);
  for(const [x,w,h,phase] of [[-.98,.74,.63,1],[.07,.68,.91,3],[1.04,.82,.76,5]]){
    const geometry=new T.PlaneGeometry(w,h,9,8),pos=geometry.attributes.position;
    const material=clothMaterial.clone();material.color.set(phase===3?'#9a6e61':phase===5?'#777f73':'#b5ad92');
    const mesh=new T.Mesh(geometry,material);mesh.position.set(x,2.47+Math.abs(x)*.071-h/2,0);mesh.applyMatrix4(b.frame);
    mesh.castShadow=true;mesh.receiveShadow=true;b.root.add(mesh);
    updates.push((t,wind)=>{
      for(let i=0;i<pos.count;i++){
        const xx=pos.getX(i),hang=1-((i/10|0)===0?1:(pos.getY(i)+h/2)/h);
        pos.setZ(i,hang*(.05+wind*.28)*Math.sin(t*(2.1+wind)+xx*6.3+hang*2.6+phase)+hang*hang*wind*.24);
      }
      pos.needsUpdate=true;geometry.computeVertexNormals();
    });
  }
}

function campfire(b){
  for(let i=0;i<10;i++){
    const a=i*Math.PI/5;b.put('paver',tint('#656158',.25),Math.cos(a)*.49,.105,Math.sin(a)*.49,.30,.22,.26,0,a,0,'stone');
  }
  b.put('disk','#35312a',0,.042,0,.92,.084,.89);
  for(let i=0;i<5;i++)b.put('cyl',tint('#4c382b'),Math.sin(i*3)*.08,.10+i*.036,Math.cos(i*.8)*.085,.136,.65,.135,Math.PI/2,i*.76,0,'wood');
  placedFire(b,0,.18,0,{width:.88,height:1.03,intensity:12,range:8,embers:37,smoke:'campfire'});
}

export function dressVillage(root,b){
  const updates=[],blocks=[];
  const mill=plots.find(p=>p.id==='mill');
  const sluice=localToWorld(mill,-.62,mill.d/2+.96);
  const sluiceY=height(sluice.x,sluice.z);
  const lever=new T.Group();lever.position.set(sluice.x,sluiceY+.80,sluice.z);lever.rotation.y=mill.a;root.add(lever);
  const handle=new T.Group();lever.add(handle);const leverB=new Builder(handle);
  leverB.beam(iron,v(0,0,0),v(0,.74,0),.076,.074,'cyl');leverB.put('ball','#a78254',0,.74,0,.19,.16,.17);leverB.finish();
  b.group(sluice.x,sluiceY,sluice.z,mill.a,()=>{
    b.put('box','#5f5d52',0,.34,0,.5,.69,.51,0,0,0,'stone');
    b.put('box',walnut,0,.76,0,.51,.24,.52);
    label(root,b,'SLUICE','#d2bc8c',0,.75,.273,.38,.13);
  });
  blocks.push({x:sluice.x,z:sluice.z,r:.31});

  function yard(p,x,z,angle,r,build){
    const at=localToWorld(p,x,z);
    if(nearPath(at.x,at.z,r*.68)||inPlot(at.x,at.z,r*.68)||Math.abs(at.x-riverX(at.z))<riverWidth(at.z)+r*.66)return;
    b.group(at.x,height(at.x,at.z),at.z,p.a+angle,build);
    if(r>.34)blocks.push({...at,r});
  }

  for(const plot of plots){
    const w=plot.w/2,d=plot.d/2;
    switch(plot.id){
      case 'bakery':
        yard(plot,w+2.2,d+.8,.7,1.17,()=>cart(b,()=>{crate(b,0,-.48,.67);cask(b,0,.34,.76);}));
        yard(plot,w+1.65,-.5,-.3,.82,()=>{table(b,0,0,1.46,.62);for(let i=0;i<5;i++)b.put('ball',tint('#ac7749'),(i-2)*.24,.94,Math.sin(i)*.15,.23,.14,.32,0,i);});
        yard(plot,-.2,-d-1.47,0,.90,()=>logs(b,0,0));
        break;
      case 'mill':
        yard(plot,w+1.55,-.9,Math.PI/2,.84,()=>logs(b,0,0));
        yard(plot,.45,-d-1.45,0,.78,()=>{crate(b,-.38,0,.76);crate(b,.41,.14,.65);cask(b,.13,-.57,.63);});
        break;
      case 'inn':
        yard(plot,-w-2.0,1.6,.28,1.23,()=>{
          table(b,0,0,1.62,.75);for(const z of [-.68,.68])wood(b,0,.39,z,1.77,.12,.32);
          for(const x of [-.65,.65])for(const z of [-.68,.68])wood(b,x,.19,z,.11,.37,.13,walnut);
          for(const x of [-.52,.41])vessel(b,x,.89,.12,.22,'#91836a');
        });
        yard(plot,0,-d-2.2,.18,1.4,()=>clothLine(b,updates));
        yard(plot,w+1.38,-1.9,.0,.71,()=>{cask(b,-.35,.05,.83);cask(b,.48,-.12,1.06);});
        break;
      case 'slate':
        yard(plot,w+1.55,.4,-.9,.82,()=>{table(b,0,0,1.24,.63);crate(b,0,.04,.48);volume(b,-.31,.89,-.15,.30);volume(b,.36,.90,.15,-.40);});
        yard(plot,-.18,-d-1.44,.3,.73,()=>{crate(b,-.39,0,.65);crate(b,.4,.05,.69);});
        break;
      case 'tower':
        yard(plot,w+1.56,d+.07,-.38,.8,()=>{crate(b,-.44,0,.66);table(b,.31,0,.77,.64);for(let i=0;i<4;i++)b.put('ring',iron,.11+i*.13,.91,0,.37,.37,1.08,Math.PI/2);});
        break;
      case 'wind':
        yard(plot,-w-1.55,d+1.45,.42,1.22,()=>cart(b,()=>{for(let i=0;i<3;i++)b.put('barrel',tint('#b4a17c'),Math.sin(i*8)*.25,.31,(i-1)*.44,.54,.65,.51);}));
        yard(plot,w+1.14,-.55,-.2,.61,()=>{crate(b,-.33,0,.56);cask(b,.38,.04,.80);});
        break;
      case 'potter':
        yard(plot,-w-1.38,d+.71,-.4,.82,()=>{table(b,0,0,1.52,.64);for(let i=0;i<6;i++)vessel(b,(i-2.5)*.23,.90,Math.sin(i)*.16,.29,tint('#945f49').getStyle());});
        yard(plot,0,-d-2.1,.10,.88,()=>{crate(b,-.55,0,.69);for(let i=0;i<3;i++)vessel(b,i*.4,0,0,.54,'#826e61');});
        break;
      case 'herb':
        for(let i=0;i<2;i++)yard(plot,w+1.65+i*1.65,-1.3,.08,.78,()=>{
          wood(b,0,.13,0,1.34,.27,2.12,walnut);
          b.put('box','#4b4131',0,.275,0,1.22,.025,2.0);
          for(let j=0;j<8;j++)plant(b,(j%2-.5)*.61,.28,((j/2|0)-1.5)*.48,.41,false);
        });
        break;
    }
  }
  yard({x:5.9,z:11.7,a:0},0,0,.19,1.14,()=>{
    b.put('cyl','#787467',0,.51,0,1.70,1.05,1.70,0,0,0,'masonry');
    b.put('disk','#262a25',0,1.05,0,1.42,.025,1.42);
    b.put('ring','#929085',0,1.05,0,1.49,1.49,3.3,Math.PI/2);
    for(const x of [-.79,.79])wood(b,x,1.37,0,.12,2.73,.14,walnut);
    wood(b,0,2.69,0,1.80,.14,.18,walnut);b.beam('#665243',v(.15,2.66,0),v(.15,1.52,0),.028,.027);vessel(b,.15,1.30,0,.33,'#82674c');
  });
  yard({x:22.1,z:12.1,a:0},0,0,0,.69,()=>campfire(b));
  yard({x:-33.8,z:15.2,a:0},0,0,0,.66,()=>campfire(b));

  return {
    walkable:(x,z)=>!blocks.some(p=>(x-p.x)**2+(z-p.z)**2<(p.r+.20)**2),
    sluice,
    tick(t,wind,gate){handle.rotation.z=-.67+gate*1.30;for(const update of updates)update(t,wind);}
  };
}
