import * as T from 'three';

// Tileable value noise supplies broad weathering and fine grain at walking distance.
let state=6653;
const rand=()=>{state=(Math.imul(1664525,state)+1013904223)>>>0;return state/4294967296;};
const n=256,hash=new Float32Array(n*n);
for(let i=0;i<hash.length;i++)hash[i]=rand();
function noise(x,y,fx,fy) {
  const xx=x*fx/n,yy=y*fy/n,ix=Math.floor(xx),iy=Math.floor(yy);
  let u=xx-ix,w=yy-iy;u*=u*(3-2*u);w*=w*(3-2*w);
  const at=(a,b)=>hash[((b%fy)*73%n)*n+((((a%fx)+fx)%fx)*61%n)];
  return (1-w)*((1-u)*at(ix,iy)+u*at(ix+1,iy))+w*((1-u)*at(ix,iy+1)+u*at(ix+1,iy+1));
}
function texture(kind) {
  const c=document.createElement('canvas');c.width=c.height=n;const ctx=c.getContext('2d'),im=ctx.createImageData(n,n);
  for(let y=0;y<n;y++)for(let x=0;x<n;x++){
    const w=y/n,broad=noise(x,y,5,5),fine=noise(x,y,25,25);
    let value=218+24*broad+10*fine,blue=0;
    if(kind==='plaster'){
      const stain=noise(x,y,13,3);value=212+31*broad+10*fine-17*(1-smooth(w/.24))*stain;
    }else if(kind==='wood'){
      const grain=noise(x,y,70,4)*.48+noise(x+10*Math.sin(w*6.28),y,20,2)*.52;
      value=144+83*grain+22*broad;
    }else if(kind==='clay'){
      value=177+53*broad+22*fine;blue=4*(broad-.5);
    }else if(kind==='stone'){value=182+49*broad+16*fine;}
    const k=(y*n+x)*4,grain=(rand()-.5)*(kind==='plaster'?14:22);
    im.data[k]=value+grain;im.data[k+1]=value+grain;im.data[k+2]=value+grain+blue;im.data[k+3]=255;
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
  const tex=new T.CanvasTexture(c);tex.colorSpace=T.SRGBColorSpace;tex.wrapS=tex.wrapT=T.RepeatWrapping;tex.anisotropy=4;
  return new T.MeshStandardMaterial({map:tex,roughness:.91,bumpMap:tex,bumpScale:.010});
}
function smooth(t){t=Math.min(1,Math.max(0,t));return t*t*(3-2*t);}
export const surfaces={plaster:texture('plaster'),wood:texture('wood'),clay:texture('clay'),stone:texture('stone'),canopy:texture('canopy')};
export function glazing(){
  const c=document.createElement('canvas');c.width=c.height=64;const ctx=c.getContext('2d');
  const g=ctx.createLinearGradient(0,0,14,64);g.addColorStop(0,'#94b6ad');g.addColorStop(.44,'#b9c7b3');g.addColorStop(.48,'#829384');g.addColorStop(1,'#c2ad85');ctx.fillStyle=g;ctx.fillRect(0,0,64,64);
  for(let i=0;i<3;i++){ctx.fillStyle='rgba(242,245,211,.16)';ctx.beginPath();ctx.moveTo(43+i*19,0);ctx.lineTo(48+i*19,0);ctx.lineTo(6+i*19,64);ctx.lineTo(i*19,64);ctx.fill();}
  const tex=new T.CanvasTexture(c);tex.colorSpace=T.SRGBColorSpace;
  return new T.MeshStandardMaterial({map:tex,emissive:0xffb950,emissiveIntensity:.02,roughness:.38});
}

function masonryMaterial(){
  const c=document.createElement('canvas');c.width=512;c.height=256;const g=c.getContext('2d');
  g.fillStyle='#a39e93';g.fillRect(0,0,512,256);
  for(let j=0;j<8;j++)for(let i=-1;i<8;i++){
    const x=i*68+(j%2)*34,y=j*32,n=Math.round(216+14*Math.sin(i*31+j*19));
    g.fillStyle='rgb('+n+','+(n-2)+','+(n-6)+')';g.fillRect(x+1,y+1,66,30);
    g.fillStyle='#ffffff25';g.fillRect(x+2,y+2,63,2);g.fillStyle='#38362626';g.fillRect(x+2,y+28,63,2);
  }
  const data=g.getImageData(0,0,512,256);for(let i=0;i<data.data.length;i+=4){
    const n=(Math.random()-.5)*14;for(let j=0;j<3;j++)data.data[i+j]+=n;
  }g.putImageData(data,0,0);
  const map=new T.CanvasTexture(c);map.wrapS=map.wrapT=T.RepeatWrapping;map.colorSpace=T.SRGBColorSpace;map.anisotropy=4;
  const mat=new T.MeshStandardMaterial({map,roughness:.94});
  mat.onBeforeCompile=shader=>{shader.vertexShader=shader.vertexShader.replace('#include <uv_vertex>',`#include <uv_vertex>
    vec3 loc=(instanceMatrix*vec4(position,1.)).xyz;
    vec3 side=abs(normalize(mat3(instanceMatrix)*normal));
    vMapUv=(side.y>.7?loc.xz:(side.x>.7?loc.zy:loc.xy))/vec2(5.4,2.7);
  `);};return mat;
}

surfaces.masonry=masonryMaterial();
