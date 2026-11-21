import * as T from 'three';

// Tileable value noise supplies broad weathering and fine grain at walking distance.
let state=6653;
const rand=()=>{state=(Math.imul(1664525,state)+1013904223)>>>0;return state/4294967296;};
const n=256,hash=new Float32Array(n*n);
for(let i=0;i<hash.length;i++)hash[i]=rand();
function noise(x,y,fx,fy) {
  const xx=x*fx/n,yy=y*fy/n,ix=Math.floor(xx),iy=Math.floor(yy);
  let u=xx-ix,w=yy-iy;u*=u*(3-2*u);w*=w*(3-2*w);
  const at=(a,b)=>hash[(((b%fy+fy)%fy)*73%n)*n+(((a%fx+fx)%fx)*61%n)];
  return (1-w)*((1-u)*at(ix,iy)+u*at(ix+1,iy))+w*((1-u)*at(ix,iy+1)+u*at(ix+1,iy+1));
}
function texture(kind) {
  const c=document.createElement('canvas'),heightCanvas=document.createElement('canvas'),roughCanvas=document.createElement('canvas');
  c.width=c.height=heightCanvas.width=heightCanvas.height=roughCanvas.width=roughCanvas.height=n;
  const ctx=c.getContext('2d'),heightCtx=heightCanvas.getContext('2d'),roughCtx=roughCanvas.getContext('2d');
  const im=ctx.createImageData(n,n),heightImage=heightCtx.createImageData(n,n),roughImage=roughCtx.createImageData(n,n);
  for(let y=0;y<n;y++)for(let x=0;x<n;x++){
    const w=y/n,broad=noise(x,y,5,5),fine=noise(x,y,25,25);
    let value=218+24*broad+10*fine,red=0,green=0,blue=0,heightValue=116+66*broad+34*fine,roughness=228;
    if(kind==='plaster'){
      const stain=noise(x,y,13,3),lime=noise(x,y,3,11);
      value=214+26*broad+9*fine-19*(1-smooth(w/.24))*stain;red=4;green=1;blue=-7;
      heightValue=150+33*broad+17*fine+8*lime;roughness=232-12*fine;
    }else if(kind==='wood'){
      const grain=noise(x,y,70,4)*.48+noise(x+10*Math.sin(w*6.28),y,20,2)*.52;
      const seam=Math.min(x%n,n-x%n)<2?-.18:0;
      value=151+72*grain+19*broad+seam*80;red=8;green=-1;blue=-12;
      heightValue=91+118*grain+14*broad+seam*60;roughness=211+20*(1-grain);
    }else if(kind==='clay'){
      const pit=noise(x,y,31,31);value=184+43*broad+17*fine-12*(pit>.74);red=8;green=-2;blue=-11+4*(broad-.5);
      heightValue=126+72*broad+27*fine-26*(pit>.74);roughness=222+13*pit;
    }else if(kind==='stone'){
      const mineral=noise(x+31,y-17,19,19);value=183+42*broad+14*fine;red=2;green=1;blue=-5+6*mineral;
      heightValue=112+82*broad+32*fine;roughness=229-17*mineral;
    }else if(kind==='iron'){
      const pitting=noise(x,y,39,39),oxidation=noise(x+8,y-13,8,8);
      value=154+34*broad+15*fine-25*(pitting>.72);red=8*oxidation;green=-3;blue=-7;
      heightValue=105+70*broad+20*fine-42*(pitting>.72);roughness=160+51*oxidation;
    }
    const k=(y*n+x)*4,grain=(rand()-.5)*(kind==='plaster'?14:22);
    im.data[k]=value+grain+red;im.data[k+1]=value+grain+green;im.data[k+2]=value+grain+blue;im.data[k+3]=255;
    heightImage.data[k]=heightImage.data[k+1]=heightImage.data[k+2]=heightValue;heightImage.data[k+3]=255;
    roughImage.data[k]=roughImage.data[k+1]=roughImage.data[k+2]=roughness;roughImage.data[k+3]=255;
  }
  ctx.putImageData(im,0,0);
  if(kind==='canopy'){
    ctx.fillStyle='#a2a792';ctx.fillRect(0,0,n,n);
    for(let i=0;i<8200;i++){
      const x=rand()*n,y=rand()*n,l=48+rand()*36+noise(x,y,8,8)*10;
      ctx.fillStyle='hsl(65,10%,'+l+'%)';ctx.beginPath();ctx.ellipse(x,y,2+rand()*4,1+rand()*2.6,rand()*3.14,0,Math.PI*2);ctx.fill();
    }
  }
  if(kind==='plaster'){
    // Broken patches of fieldstone show through the lime at the corners.
    for(let side=0;side<2;side++)for(let j=0;j<10;j++)for(let i=0;i<4;i++){
      if(rand()<(i*.21+j*.052))continue;
      const x=side*(n-1)+(side?-1:1)*(i*12+(j%2)*6),y=n-7*j-rand()*2;
      ctx.fillStyle='rgba(118,111,95,'+(.15+rand()*.19)+')';ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+10,y-1);ctx.lineTo(x+9,y-5);ctx.lineTo(x+2,y-5);ctx.closePath();ctx.fill();
    }
  }
  heightCtx.putImageData(heightImage,0,0);roughCtx.putImageData(roughImage,0,0);
  const tex=new T.CanvasTexture(c),bump=new T.CanvasTexture(heightCanvas),roughnessMap=new T.CanvasTexture(roughCanvas);
  for(const map of [tex,bump,roughnessMap]){map.wrapS=map.wrapT=T.RepeatWrapping;map.anisotropy=4;}
  tex.colorSpace=T.SRGBColorSpace;
  const settings={
    plaster:{roughness:.91,bumpScale:.014},wood:{roughness:.84,bumpScale:.028},clay:{roughness:.88,bumpScale:.022},
    stone:{roughness:.94,bumpScale:.038},canopy:{roughness:.98,bumpScale:.012},iron:{roughness:.58,bumpScale:.018,metalness:.42}
  }[kind]||{roughness:.92,bumpScale:.015};
  return new T.MeshStandardMaterial({map:tex,bumpMap:bump,roughnessMap, ...settings});
}
function smooth(t){t=Math.min(1,Math.max(0,t));return t*t*(3-2*t);}
export const surfaces={plaster:texture('plaster'),wood:texture('wood'),clay:texture('clay'),stone:texture('stone'),canopy:texture('canopy'),iron:texture('iron')};
// Each stalk contributes to both albedo and relief. Wrapped ends keep a roof course seamless.
function reedMaterial(){
  const size=256,color=document.createElement('canvas'),relief=document.createElement('canvas');
  color.width=color.height=relief.width=relief.height=size;
  const paint=color.getContext('2d'),bump=relief.getContext('2d');
  paint.fillStyle='#715536';bump.fillStyle='#565656';
  for(const ctx of [paint,bump])ctx.fillRect(0,0,size,size);
  for(let i=0;i<3300;i++){
    const x=rand()*size,y=rand()*size,length=14+rand()*55,bend=(rand()-.5)*5;
    const light=36+rand()*36;
    paint.fillStyle='hsl(39, '+(24+rand()*18)+'%, '+light+'%)';
    const h=72+Math.round(light*1.7);bump.fillStyle='rgb('+h+','+h+','+h+')';
    const width=.6+rand()*1.5;
    for(const dx of (x<5?[0,size]:x>size-5?[0,-size]:[0])){
      for(const dy of (y+length>=size?[0,-size]:[0]))for(const ctx of [paint,bump]){
        ctx.beginPath();ctx.moveTo(x+dx,y+dy);
        ctx.lineTo(x+dx+width,y+dy+.3);ctx.lineTo(x+dx+bend*.3+width,y+dy+length*.55);
        ctx.lineTo(x+dx+bend,y+dy+length);ctx.lineTo(x+dx+bend*.3,y+dy+length*.55);ctx.closePath();ctx.fill();
      }
    }
  }
  const map=new T.CanvasTexture(color),bumpMap=new T.CanvasTexture(relief);
  for(const t of [map,bumpMap]){t.wrapS=t.wrapT=T.RepeatWrapping;t.anisotropy=8;}
  map.colorSpace=T.SRGBColorSpace;
  return new T.MeshStandardMaterial({map,bumpMap,bumpScale:.023,roughness:.96,vertexColors:true,side:T.DoubleSide});
}
surfaces.thatch=reedMaterial();
surfaces.roadStone=surfaces.stone.clone();
surfaces.roofTile=surfaces.clay.clone();
surfaces.agedWood=surfaces.wood.clone();
surfaces.roadStone.roughness=.88;surfaces.roadStone.bumpScale=.055;
surfaces.roofTile.roughness=.86;surfaces.roofTile.bumpScale=.030;
surfaces.agedWood.roughness=.91;surfaces.agedWood.bumpScale=.036;
export function glazing(){
  const c=document.createElement('canvas');c.width=c.height=64;const ctx=c.getContext('2d');
  const g=ctx.createLinearGradient(0,0,14,64);g.addColorStop(0,'#94b6ad');g.addColorStop(.44,'#b9c7b3');g.addColorStop(.48,'#829384');g.addColorStop(1,'#c2ad85');ctx.fillStyle=g;ctx.fillRect(0,0,64,64);
  for(let i=0;i<3;i++){ctx.fillStyle='rgba(242,245,211,.16)';ctx.beginPath();ctx.moveTo(43+i*19,0);ctx.lineTo(48+i*19,0);ctx.lineTo(6+i*19,64);ctx.lineTo(i*19,64);ctx.fill();}
  const tex=new T.CanvasTexture(c);tex.colorSpace=T.SRGBColorSpace;
  return new T.MeshStandardMaterial({map:tex,emissive:0xffb950,emissiveIntensity:.02,roughness:.38});
}

function masonryMaterial(){
  const c=document.createElement('canvas');c.width=512;c.height=256;const g=c.getContext('2d');
  g.fillStyle='#8e897e';g.fillRect(0,0,512,256);
  for(let j=0;j<8;j++){
    let left=-32*(j%2);
    for(let i=0;i<8;i++){
      const right=(i+1)*64-32*(j%2)+(i===7?0:Math.sin(i*21+j*5)*12);
      const y=j*32,light=195+rand()*30,chip=2+rand()*5;
      for(const offset of [0,512]){
        const x=left+offset,end=right+offset;
        g.beginPath();g.moveTo(x+chip,y+1);g.lineTo(end-5,y+1.5);
        g.lineTo(end-1,y+5);g.lineTo(end-2,y+27);g.lineTo(end-chip,y+30);
        g.lineTo(x+3,y+30.5);g.lineTo(x+1,y+25);g.lineTo(x+1.5,y+chip);g.closePath();
        const face=g.createLinearGradient(0,y,0,y+32);
        for(const [at,factor] of [[0,1.06],[.12,1],[.84,.98],[1,.78]]){
          const n=Math.round(light*factor);face.addColorStop(at,'rgb('+n+','+(n-3)+','+(n-8)+')');
        }
        g.fillStyle=face;g.fill();
      }
      left=right;
    }
  }
  const data=g.getImageData(0,0,512,256);for(let i=0;i<data.data.length;i+=4){
    const n=(Math.random()-.5)*14;for(let j=0;j<3;j++)data.data[i+j]+=n;
  }g.putImageData(data,0,0);
  const map=new T.CanvasTexture(c);map.wrapS=map.wrapT=T.RepeatWrapping;map.colorSpace=T.SRGBColorSpace;map.anisotropy=4;
  const bump=map.clone();bump.colorSpace=T.NoColorSpace;bump.needsUpdate=true;
  const mat=new T.MeshStandardMaterial({map,bumpMap:bump,bumpScale:.045,roughness:.94});
  mat.onBeforeCompile=shader=>{shader.vertexShader=shader.vertexShader.replace('#include <uv_vertex>',`#include <uv_vertex>
    vec3 loc=(instanceMatrix*vec4(position,1.)).xyz;
    vec3 side=abs(normalize(mat3(instanceMatrix)*normal));
    vMapUv=(side.y>.7?loc.xz:(side.x>.7?loc.zy:loc.xy))/vec2(5.4,2.7);
    vBumpMapUv=vMapUv;
  `);};return mat;
}

surfaces.masonry=masonryMaterial();
