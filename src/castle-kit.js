import * as T from 'three';
import {Builder,v,tint,label} from './model.js';
import {placedFire} from './fire.js';

export const stone='#aaa596',trim='#beb49f',darkStone='#676b69',slate='#3d5660',gold='#aa8951',red='#713f49';
export class CastleKit {
  constructor(root){
    this.root=root;this.b=new Builder(root);this.surfaces=[];this.blocks=[];this.spirals=[];this.zones=[];this.flags=[];
  }
  box(x,y,z,w,h,d,c=stone,material='masonry'){
    this.b.put('box',c,x,y,z,w,h,d,0,0,0,material);
  }
  obstacle(x,z,w,d,base,top){this.blocks.push({x,z,w:w/2+.18,d:d/2+.18,base,top});}
  solid(x,base,z,w,h,d,c=stone,mat='masonry'){
    this.box(x,base+h/2,z,w,h,d,c,mat);this.obstacle(x,z,w,d,base,base+h);
  }
  slab(x1,x2,z1,z2,y,c='#b4a891',mat='masonry'){
    if(x2<=x1||z2<=z1)return;
    this.box((x1+x2)/2,y-.12,(z1+z2)/2,x2-x1,.24,z2-z1,c,mat);
    this.surfaces.push({x1,x2,z1,z2,y});
  }
  cutSlab(x1,x2,z1,z2,y,[a,b,c,d],color){
    this.slab(x1,a,z1,z2,y,color);this.slab(b,x2,z1,z2,y,color);
    this.slab(a,b,z1,c,y,color);this.slab(a,b,d,z2,y,color);
  }
  stairs(x1,x2,zStart,zEnd,from,to,c=trim){
    const n=Math.ceil(Math.abs(to-from)/.18),step=(zEnd-zStart)/n;
    for(let i=0;i<n;i++){
      const y=from+(to-from)*(i+1)/n;
      this.box((x1+x2)/2,y-.105,zStart+(i+.5)*step,x2-x1,.21,Math.abs(step)+.018,c);
    }
    this.surfaces.push({x1,x2,z1:Math.min(zStart,zEnd),z2:Math.max(zStart,zEnd),y:from,zStart,slope:(to-from)/(zEnd-zStart)});
    for(const x of [x1+.015,x2-.015]){
      this.b.beam('#655b4c',v(x,from-.12,zStart),v(x,to-.12,zEnd),.10,.23,'box','agedWood');
    }
  }
  // Openings are cut through the masonry, including their lintels and sills.
  wall(axis,line,start,end,base,h,openings=[],c=stone,thick=.38){
    const along=(lo,hi,bottom,top)=>{
      if(hi-lo<.002||top-bottom<.002)return;
      const center=(lo+hi)/2;
      this.solid(axis==='x'?center:line,bottom,axis==='x'?line:center,axis==='x'?hi-lo:thick,top-bottom,axis==='x'?thick:hi-lo,c);
    };
    let prev=start;
    for(const [p,w,sill=0,clear=2.6] of [...openings].sort((a,b)=>a[0]-b[0])){
      const lo=p-w/2,hi=p+w/2;along(prev,lo,base,base+h);along(lo,hi,base,base+sill);along(lo,hi,base+sill+clear,base+h);
      const x=axis==='x'?p:line,z=axis==='x'?line:p;
      this.b.group(x,base+sill,z,axis==='x'?0:Math.PI/2,()=>{
        for(const s of [-1,1])this.b.put('box',trim,s*(w/2+.04),clear/2,0,.105,clear,thick+.09,0,0,0,'stone');
        this.b.put('box',trim,0,clear+.065,0,w+.24,.16,thick+.14,0,0,0,'stone');
        for(const s of [-1,0,1])this.b.put('stone',tint(s?trim:stone,.07),s*w*.28,clear+.11,.03,w*.31,.18,thick*.56,0,0,s*.045,'stone');
        if(sill<.1)this.b.put('paver','#77766f',0,.025,.04,w*.86,.055,thick*.86,0,0,0,'stone');
      });prev=hi;
    }
    along(prev,end,base,base+h);
  }
  rail(x1,z1,x2,z2,y,color='#79694f'){
    const dx=x2-x1,dz=z2-z1,n=Math.ceil(Math.hypot(dx,dz)/1.35);
    for(let i=0;i<=n;i++){this.box(x1+dx*i/n,y+.49,z1+dz*i/n,.10,.98,.10,color,'agedWood');this.b.put('ball','#343936',x1+dx*i/n,y+.86,z1+dz*i/n,.032,.032,.032,0,0,0,'iron');}
    for(const h of [.48,.95])this.b.beam(color,v(x1,y+h,z1),v(x2,y+h,z2),.087,.087,'box','agedWood');
    this.obstacle((x1+x2)/2,(z1+z2)/2,Math.abs(dx)+.055,Math.abs(dz)+.055,y,y+1.0);
  }
  plaque(text,x,y,z,a=0,w=1.9){
    this.b.group(x,y,z,a,()=>{this.box(0,0,0,w,.34,.08,'#3e504b','agedWood');for(const s of [-1,1])this.b.put('ball','#343936',s*(w*.5-.10),0,.052,.038,.038,.022,0,0,0,'iron');label(this.root,this.b,text,'#dfc99d',0,0,.046,w-.1,.26);});
  }
  room(name,x1,x2,z1,z2,base,top){this.zones.push({name,x1,x2,z1,z2,base,top});}
  furnishing(x,z,base,w,d,fn,a=0,h=1){
    this.b.group(x,base,z,a,()=>fn(this.b));const cs=Math.abs(Math.cos(a)),sn=Math.abs(Math.sin(a));
    this.obstacle(x,z,w*cs+d*sn,w*sn+d*cs,base,base+h);
  }
  torch(x,y,z,options={}){
    this.b.put('cyl','#3d423f',x,y-.22,z,.13,.51,.13,0,0,0,'iron');
    this.b.put('cone','#765b42',x,y+.02,z,.28,.27,.28,0,0,Math.PI,'agedWood');
    this.b.put('ring','#343936',x,y-.27,z,.21,.21,.32,Math.PI/2,0,0,'iron');
    placedFire(this.b,x,y+.10,z,{width:.31,height:.58,intensity:0,embers:5,smoke:'torch',...options});
  }
  banner(x,y,z,w,h,a=0){
    this.b.group(x,y,z,a,()=>{
      this.box(0,0,0,w,h,.055,red,'standard');
      this.b.put('gable',red,0,-h/2,0,w,.46,.051,0,0,Math.PI);
      for(const s of [-1,1])this.box(s*w*.44,0,.035,.05,h,.022,gold,'standard');
      this.b.put('spire',gold,0,.06,.052,w*.49,h*.43,.041,0,0,0);
      this.box(0,h/2+.05,0,w+.35,.096,.13,gold,'standard');
    });
  }
  floorAt(x,z,previous,extra=null){
    const options=[];
    if(extra!==null)options.push(extra);
    for(const f of this.surfaces){
      if(x>=f.x1&&x<=f.x2&&z>=f.z1&&z<=f.z2)options.push(f.slope===undefined?f.y:f.y+(z-f.zStart)*f.slope);
    }
    for(const s of this.spirals){
      const dx=x-s.x,dz=z-s.z,r=Math.hypot(dx,dz);if(r<.50||r>1.79)continue;
      const turn=((Math.atan2(dx,dz)+Math.PI*2)%(Math.PI*2))/(Math.PI*2);
      for(let level=0;level<2;level++)options.push((level+turn)*s.rise);
    }
    // Only surfaces within a single step can support the player. This also
    // distinguishes a prison corridor from the courtyard directly above it.
    let best=null;
    for(const y of options){
      if(Math.abs(y-previous)>.38||best!==null&&y<=best)continue;
      if(this.blocks.some(o=>Math.abs(x-o.x)<o.w&&Math.abs(z-o.z)<o.d&&y+.19<o.top&&y+1.53>o.base))continue;
      best=y;
    }return best;
  }
  location(x,z,y){
    const room=this.zones.find(o=>x>=o.x1&&x<=o.x2&&z>=o.z1&&z<=o.z2&&y>=o.base-.17&&y<o.top);
    if(room)return room.name;
    if(y<-6)return 'Dragon vault';if(y<-.5)return 'The dungeons';
    if(y>3.8)return 'Battlements';return 'Castle courtyard';
  }
}
