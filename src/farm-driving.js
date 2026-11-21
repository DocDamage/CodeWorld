const clamp=(v,min,max)=>Math.min(max,Math.max(min,Number.isFinite(v)?v:0));

export function tractorPoint(pose,side,back){
  const c=Math.cos(pose.yaw),s=Math.sin(pose.yaw);
  return {x:pose.x+side*c+back*s,z:pose.z-side*s+back*c};
}

export function stepTractor(pose,throttle,steer,dt,clear,plowing=false){
  dt=clamp(dt,0,.1);throttle=clamp(throttle,-1,1);steer=clamp(steer,-1,1);
  const maxSpeed=throttle<0?2.65:plowing?3.25:6.35;
  const speed=pose.speed+(throttle*maxSpeed-pose.speed)*(1-Math.exp(-dt*(throttle?2.35:3.8)));
  const yaw=pose.yaw-steer*dt*1.12*clamp(speed/1.28,-1,1);
  const x=pose.x-Math.sin(yaw)*speed*dt,z=pose.z-Math.cos(yaw)*speed*dt;
  return clear(x,z,yaw)?{x,z,yaw,speed}:{...pose,speed:0};
}

export function followHitch(tractor,wagon){
  const hitch=tractorPoint(tractor,0,1.72);
  const dx=wagon.x-hitch.x,dz=wagon.z-hitch.z;
  const yaw=Math.hypot(dx,dz)>.001?Math.atan2(dx,dz):tractor.yaw;
  return {...tractorPoint({...hitch,yaw},0,2.65),yaw};
}
