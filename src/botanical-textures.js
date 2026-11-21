import * as T from 'three';

// Generate each atlas once. The same branch silhouettes drive the colour and shadow passes.
export function seeded(seed){
  return ()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
}
function atlas(size,draw,repeat=false){
  const canvas=document.createElement('canvas');canvas.width=canvas.height=size;
  draw(canvas.getContext('2d'),seeded(93701),size);
  const texture=new T.CanvasTexture(canvas);texture.colorSpace=T.SRGBColorSpace;texture.anisotropy=4;
  if(repeat)texture.wrapS=texture.wrapT=T.RepeatWrapping;
  return texture;
}
function line(c,x,y,u,v,color,width){
  c.strokeStyle=color;c.lineWidth=width;c.beginPath();c.moveTo(x,y);c.lineTo(u,v);c.stroke();
}
function blade(c,x,y,dx,dy,bend,w,col){
  c.fillStyle=col;c.beginPath();c.moveTo(x-w,y);c.lineTo(x+dx*.40+bend-w*.56,y+dy*.52);
  c.lineTo(x+dx,y+dy);c.lineTo(x+dx*.40+bend+w*.55,y+dy*.55);c.lineTo(x+w,y);c.fill();
}
export function branchMap(pine){
  return atlas(512,(c,r)=>{
    const twig=(x,y,length,angle,depth)=>{
      const dx=Math.cos(angle),dy=Math.sin(angle),ex=x+dx*length,ey=y+dy*length;
      line(c,x,y,ex,ey,depth===2?'#665341':'#78744d',Math.max(1,length*.026));
      const count=depth===2?(pine?9:5):depth===1?(pine?7:3):(pine?15:4);
      for(let i=0;i<count;i++){
        const t=(i+.36+r()*.28)/(count+.25),px=x+dx*length*t,py=y+dy*length*t;
        for(const side of [-1,1]){
          const a=angle+side*(.49+r()*.56),l=length*(1-t*.62);
          if(depth){twig(px,py,l*(depth===2?.42:.39)*(.83+r()*.36),a,depth-1);continue;}
          const leaf=pine?(7+r()*8):(13+r()*13),width=pine?.85+r()*.48:4.3+r()*3.2;
          const tx=px+Math.cos(a)*leaf,ty=py+Math.sin(a)*leaf;
          const nx=-Math.sin(a)*width,ny=Math.cos(a)*width;
          const tone= pine?23+r()*22:29+r()*27;
          c.fillStyle='hsl('+(pine?95+r()*23:74+r()*24)+', '+(pine?19:32)+'%, '+tone+'%)';
          c.beginPath();c.moveTo(px,py);c.lineTo(px*.54+tx*.46+nx,py*.54+ty*.46+ny);
          c.lineTo(tx,ty);c.lineTo(px*.45+tx*.55-nx*.76,py*.45+ty*.55-ny*.76);c.fill();
          if(!pine)line(c,px,py,tx,ty,'rgba(204,210,137,.39)',.8);
        }
      }
    };
    twig(255,507,466,-Math.PI/2+.032,2);
  });
}
export function ridgeMap(){
  return atlas(256,(c,r)=>{
    line(c,127,250,130,8,'#554e3f',4);
    for(let i=0;i<205;i++){
      const t=r(),y=17+t*201,side=i%2?1:-1,len=(3+t*80)*(.42+r()*.64);
      const x=129+side*len,by=y+len*.30;
      line(c,128,y,x,by,'#495e4f',2.6);
      for(let j=0;j<25;j++){
        const u=r(),px=128+side*len*u,py=y+(by-y)*u;
        blade(c,px,py,side*(1+r()*8),4+r()*11,0,1.6,'hsl(127,13%,'+(20+19*r())+'%)');
      }
    }
  });
}
let turfAtlas;
export function turfMap(){
  return turfAtlas??=atlas(256,(c,r,size)=>{
    c.fillStyle='#b0b397';c.fillRect(0,0,size,size);
    for(let i=0;i<10500;i++){
      const x=r()*size,y=r()*size,h=2+r()*8,dx=(r()-.42)*h,dy=-h*(.38+r()*.65),tone=54+r()*27;
      const col='hsl('+(64+r()*27)+','+(11+r()*15)+'%,'+tone+'%)';
      for(const ox of x<8?[0,size]:x>size-8?[0,-size]:[0])for(const oy of y<10?[0,size]:[0])
        blade(c,x+ox,y+oy,dx,dy,-dx*.16,.32+r()*.52,col);
    }
  },true);
}
export function barkMap(){
  return atlas(128,(c,r)=>{
    c.fillStyle='#bdb3a2';c.fillRect(0,0,128,128);
    for(let i=0;i<950;i++){
      const x=r()*128,y=r()*128,h=3+r()*21,dx=(r()-.5)*3;
      const ink='rgba('+(i%3?'88,73,62':'229,219,196')+','+(.15+r()*.36)+')';
      line(c,x,y,x+dx,y+h,ink,.4+r()*1.7);
      if(y+h>128)line(c,x,y-128,x+dx,y+h-128,ink,1);
    }
  },true);
}
