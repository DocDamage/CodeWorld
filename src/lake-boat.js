import {dock,lakeDepth,onLakeDock} from './lake-layout.js';

const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
const radians=Math.PI/180;
export function sailForces(heading,speed,sideSpeed,sheet,wind){
  const sin=Math.sin(heading),cos=Math.cos(heading);
  const forward=-wind.x*sin-wind.z*cos-speed;
  const cross=wind.x*cos-wind.z*sin-sideSpeed;
  const apparent=Math.hypot(forward,cross);
  const offBow=Math.atan2(Math.abs(cross),-forward);
  const boom=Math.sign(cross||1)*Math.min(sheet,offBow);
  const incidence=offBow-Math.abs(boom);
  const fill=clamp(incidence/.31,0,1)*clamp((offBow-.48)/.30,0,1);
  // The sail redirects air sideways on a reach. Running downwind it also
  // presents area across the airflow. Both loads scale with apparent wind squared.
  const lift=Math.sin(2*incidence)*Math.sin(offBow);
  const drag=Math.sin(incidence)**2*(-Math.cos(offBow));
  const pressure=apparent**2*.049*fill;
  return {boom,fill,drive:Math.max(0,lift+drag)*pressure,
    side:Math.sign(cross)*pressure*Math.sin(offBow)*.30,offBow,apparent,windAngle:Math.atan2(cross,-forward)};
}
export function boatFits(x,z,yaw){
  for(const [across,aft] of [[0,-2.29],[0,2.08],[-.86,-.45],[.86,-.45],[-.78,1.22],[.78,1.22]]){
    const xx=x+across*Math.cos(yaw)+aft*Math.sin(yaw),zz=z-across*Math.sin(yaw)+aft*Math.cos(yaw);
    if(lakeDepth(xx,zz)<.19||onLakeDock(xx,zz))return false;
  }
  return true;
}
export function findBoatPlacement(x,z,yaw,maxDistance=8){
  if(![x,z,yaw,maxDistance].every(Number.isFinite)||maxDistance<0)return null;
  const headings=[yaw,yaw+Math.PI/2,yaw-Math.PI/2,yaw+Math.PI];
  const step=.5,rings=Math.ceil(maxDistance/step);
  let best=null;
  for(let ring=0;ring<=rings;ring++){
    const radius=Math.min(maxDistance,ring*step),count=ring?Math.max(12,ring*8):1;
    for(let i=0;i<count;i++){
      const angle=count===1?0:i*Math.PI*2/count,xx=x+Math.cos(angle)*radius,zz=z+Math.sin(angle)*radius;
      for(const [turn,heading] of headings.entries()){
        if(!boatFits(xx,zz,heading))continue;
        const score=radius+turn*.08;
        if(!best||score<best.score)best={x:xx,z:zz,yaw:heading,score};
      }
    }
    if(best&&best.score<=radius+.25)break;
  }
  return best&&Object.freeze({x:best.x,z:best.z,yaw:best.yaw});
}
export function createLakeBoat(){
  const boat={x:dock.berthX,z:dock.berthZ,yaw:Math.PI,speed:0,sideSpeed:0,mode:'sail',
    aboard:false,moored:true,anchored:false,sheet:45*radians,boom:0,fill:0,heel:0,stroke:0,rowing:false,offBow:0,windAngle:0};
  function stop(){boat.speed=boat.sideSpeed=0;boat.rowing=false;}
  function moor(){
    Object.assign(boat,{x:dock.berthX,z:dock.berthZ,yaw:Math.PI,moored:true,anchored:false,aboard:false});
    stop();
  }
  function canDock(){return Math.hypot(boat.x-dock.berthX,boat.z-dock.berthZ)<4.3&&Math.abs(boat.speed)<1.4;}
  function boardAt(x,z,yaw){
    const placement=findBoatPlacement(x,z,yaw);
    if(!placement)return null;
    Object.assign(boat,placement,{aboard:true,moored:false,anchored:true});stop();
    return placement;
  }
  function step(dt,thrust,helm,wind){
    const sail=sailForces(boat.yaw,boat.speed,boat.sideSpeed,boat.sheet,wind);
    boat.offBow=sail.offBow;boat.windAngle=sail.windAngle;
    boat.boom+=(sail.boom-boat.boom)*(1-Math.exp(-dt*4));
    boat.fill=boat.mode==='sail'?sail.fill:0;
    boat.heel+=((boat.mode==='sail'?clamp(-sail.side*.11,-.24,.24):0)-boat.heel)*(1-Math.exp(-dt*2));
    boat.rowing=false;
    if(boat.moored||boat.anchored)return;
    let drive=0,leeway=0;
    if(boat.mode==='sail'){
      boat.sheet=clamp(boat.sheet-thrust*dt*.57,8*radians,86*radians);
      drive=sail.drive;leeway=sail.side;
    }else if(boat.mode==='motor')drive=thrust*(thrust<0?1.2:2.95);
    else if(thrust||helm){
      boat.rowing=true;boat.stroke=(boat.stroke+dt*4.3)%(Math.PI*2);
      drive=thrust*2.15*Math.max(0,Math.sin(boat.stroke));
    }
    const turn=boat.mode==='oars'?.87:clamp(Math.abs(boat.speed)*.45+(boat.mode==='motor'?Math.abs(thrust)*.22:0),0,1)*.77;
    const yaw=boat.yaw-helm*turn*dt*(boat.speed<-.15?-1:1);
    if(boatFits(boat.x,boat.z,yaw))boat.yaw=yaw;
    boat.speed+=dt*(drive-.14*boat.speed*Math.abs(boat.speed)-.16*boat.speed);
    boat.sideSpeed+=dt*(leeway-boat.sideSpeed*3.6);
    const sin=Math.sin(boat.yaw),cos=Math.cos(boat.yaw);
    const x=boat.x+dt*(-sin*boat.speed+cos*boat.sideSpeed),z=boat.z+dt*(-cos*boat.speed-sin*boat.sideSpeed);
    if(boatFits(x,z,boat.yaw)){boat.x=x;boat.z=z;}else stop();
  }
  return {boat,step,moor,canDock,boardAt,board(){boat.aboard=true;boat.moored=false;},toggleAnchor(){boat.anchored=!boat.anchored;stop();}};
}
