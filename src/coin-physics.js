const cellSize=.75;
const maxAwake=256;
const cell=(x,z)=>Math.floor(x/cellSize)+','+Math.floor(z/cellSize);

// The packed gold supplies the support surface. Only disturbed coins integrate
// motion, while the spatial index keeps even a large sleeping hoard inexpensive.
export function createCoinPhysics(coins,height,blocks=[]){
  const buckets=new Map(),awake=new Set(),changed=new Set();
  const walls=new Map();
  for(const b of blocks){
    for(let iz=Math.floor((b.z-b.d)/cellSize);iz<=Math.floor((b.z+b.d)/cellSize);iz++)
      for(let ix=Math.floor((b.x-b.w)/cellSize);ix<=Math.floor((b.x+b.w)/cellSize);ix++){
        const key=ix+','+iz;if(!walls.has(key))walls.set(key,[]);walls.get(key).push(b);
      }
  }
  const moveToCell=(c,key)=>{
    if(key===c.cell)return;
    const old=buckets.get(c.cell);if(old){old.delete(c);if(!old.size)buckets.delete(c.cell);}
    if(!buckets.has(key))buckets.set(key,new Set());
    buckets.get(key).add(c);c.cell=key;
  };
  coins.forEach((c,i)=>{
    Object.assign(c,{i,vx:0,vy:0,vz:0,spin:0});moveToCell(c,cell(c.x,c.z));
  });
  function nearby(x,z,r,visit){
    for(let iz=Math.floor((z-r)/cellSize);iz<=Math.floor((z+r)/cellSize);iz++)
      for(let ix=Math.floor((x-r)/cellSize);ix<=Math.floor((x+r)/cellSize);ix++){
        const bin=buckets.get(ix+','+iz);if(bin)for(const c of bin)visit(c);
      }
  }
  function kick(x,z,dx,dz){
    const speed=Math.hypot(dx,dz);
    if(speed<.12)return;
    nearby(x,z,.79,c=>{
      const rx=c.x-x,rz=c.z-z,r=Math.hypot(rx,rz);
      if(r>.79||awake.has(c)||awake.size>=maxAwake)return;
      const push=Math.min(4.7,speed)*(.42+.42*(1-r/.79));
      c.vx=push*(dx/speed*.62+rx/Math.max(.1,r));
      c.vz=push*(dz/speed*.62+rz/Math.max(.1,r));
      c.vy=.66+push*.35;c.spin=(c.i%2?1:-1)*(5+push);awake.add(c);
    });
  }
  function update(dt){
    changed.clear();
    if(!awake.size)return changed;
    const steps=Math.max(1,Math.ceil(Math.min(.1,dt)*90)),h=Math.min(.1,dt)/steps;
    // Contacts join the next substep, independent of insertion order in the grid.
    for(let step=0;step<steps;step++)for(const c of Array.from(awake)){
      const x=c.x,z=c.z;
      c.vy-=11*h;c.x+=c.vx*h;c.z+=c.vz*h;c.y+=c.vy*h;
      for(const b of walls.get(cell(c.x,c.z))??[]){
        if(c.y>b.top||c.y<b.base-.05||Math.abs(c.x-b.x)>=b.w||Math.abs(c.z-b.z)>=b.d)continue;
        if(Math.abs(x-b.x)>=b.w){c.x=x;c.vx*=-.41;}
        if(Math.abs(z-b.z)>=b.d){c.z=z;c.vz*=-.41;}
      }
      const support=height(c.x,c.z)+c.thickness*.5;
      c.tilt+=c.spin*h;c.angle+=c.spin*h*.44;
      if(c.y<=support){
        c.y=support;c.vy=c.vy<-.52?-c.vy*.27:0;
        const slopeX=(height(c.x+.05,c.z)-height(c.x-.05,c.z))*10;
        const slopeZ=(height(c.x,c.z+.05)-height(c.x,c.z-.05))*10;
        const drag=Math.exp(-6*h);
        c.vx=(c.vx-slopeX*5*h)*drag;c.vz=(c.vz-slopeZ*5*h)*drag;
        c.tilt*=Math.exp(-17*h);c.spin*=Math.exp(-10*h);
        if(Math.hypot(c.vx,c.vz)<.08+Math.hypot(slopeX,slopeZ)&&!c.vy&&Math.abs(c.tilt)<.05){
          c.vx=c.vz=c.spin=c.tilt=0;awake.delete(c);
        }
      }
      if(Math.hypot(c.vx,c.vz)>1.1){
        nearby(c.x,c.z,c.radius+.18,other=>{
          if(other===c||awake.has(other)||awake.size>=maxAwake||Math.abs(other.y-c.y)>.09)return;
          const dx=other.x-c.x,dz=other.z-c.z,d=Math.hypot(dx,dz);
          if(d<.001||d>other.radius+c.radius)return;
          const impulse=(c.vx*dx+c.vz*dz)/d*.55;
          if(impulse<.55)return;
          other.vx=dx/d*impulse;other.vz=dz/d*impulse;other.vy=.29;other.spin=impulse*3;
          c.vx-=other.vx*.55;c.vz-=other.vz*.55;awake.add(other);
        });
      }
      moveToCell(c,cell(c.x,c.z));changed.add(c);
    }
    return changed;
  }
  return {kick,update};
}
