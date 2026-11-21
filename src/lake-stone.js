import {lakeHeight,lakeDepth,lake} from './lake-layout.js';

export function throwStone(origin,direction){
  const length=Math.hypot(direction.x,direction.z)||1;
  const incline=Math.max(-.85,Math.min(.8,direction.y));
  const speed=14*(1-.38*Math.abs(incline));
  return {x:origin.x,y:origin.y-.48,z:origin.z,vx:direction.x/length*speed,
    vy:1.4+incline*8,vz:direction.z/length*speed,skips:0,done:false};
}
export function stepStone(stone,dt,impact){
  // Resolve the water crossing on short steps so the skip count is stable at low frame rates.
  const n=Math.ceil(dt*180);
  for(let i=0;i<n&&!stone.done;i++){
    const h=dt/n;
    stone.x+=stone.vx*h;stone.z+=stone.vz*h;
    stone.y+=stone.vy*h-.5*9.81*h*h;stone.vy-=9.81*h;
    if(stone.y>lake.level+.025){
      if(stone.y<=lakeHeight(stone.x,stone.z))stone.done=true;
      continue;
    }
    if(lakeDepth(stone.x,stone.z)<.035){stone.done=true;break;}
    const speed=Math.hypot(stone.vx,stone.vz);
    if(speed<4.6||-stone.vy/speed>.55){impact(stone.x,stone.z,false);stone.done=true;break;}
    stone.skips++;impact(stone.x,stone.z,true);stone.y=lake.level+.031;
    stone.vy=Math.min(2.4,Math.abs(stone.vy)*.60);
    stone.vx*=.78;stone.vz*=.78;
  }
}
