export function groundForPrint({snowpack,wetness},softGround,reserve=0,loose=false){
  if(snowpack>(softGround?.23:.46))return 'snow';
  if(!softGround)return null;
  return Math.max(wetness,reserve)>.30?'mud':loose?'earth':null;
}

export function createFootfallTracker(plant,spacing=.57){
  let x=0,z=0,remaining=spacing,side=-1;
  return {
    reset(nx,nz){x=nx;z=nz;remaining=spacing;side=-1;},
    move(nx,nz){
      const dx=nx-x,dz=nz-z,distance=Math.hypot(dx,dz);
      if(distance<.001)return;
      const ux=dx/distance,uz=dz/distance;
      while(remaining<=distance){
        plant({x:x+ux*remaining-uz*.135*side,z:z+uz*remaining+ux*.135*side,yaw:Math.atan2(-ux,-uz)+side*.12,side});
        side=-side;remaining+=spacing;
      }
      remaining-=distance;x=nx;z=nz;
    }
  };
}
