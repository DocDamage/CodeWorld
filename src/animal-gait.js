const TAU=Math.PI*2;

function profile(stride,swing,flex,minSpeed,offsets,stance=.66,lift=.34,boundLift=0){
  return Object.freeze({stride,swing,flex,minSpeed,offsets:Object.freeze(offsets),stance,lift,boundLift});
}

// Leg order for quadrupeds is paired diagonally. Bounding animals move both
// forelegs together and then both hind legs; birds alternate left and right.
export const WALK_GAIT=profile(.68,.46,.72,.035,[0,Math.PI,Math.PI,0],.66,.34);
export const HEAVY_GAIT=profile(.82,.37,.57,.03,[0,Math.PI,Math.PI,0],.72,.25);
export const BOUND_GAIT=profile(.58,.59,.91,.04,[Math.PI,Math.PI,0,0],.36,.48,.11);
export const BIRD_GAIT=profile(.25,.52,.63,.025,[0,Math.PI],.58,.42);

export function createGaitState(legCount,phase=0){
  const contact=new Uint8Array(legCount);contact.fill(1);
  return {
    phase,active:false,airborne:false,bodyLift:0,
    swing:new Float32Array(legCount),
    flex:new Float32Array(legCount),
    lift:new Float32Array(legCount),
    forward:new Float32Array(legCount),
    contact,
  };
}

function wrap(angle){
  angle%=TAU;return angle<0?angle+TAU:angle;
}

/**
 * Advance from measured travel rather than wall-clock time. All pose storage is
 * retained in `state`; the optional callback only runs on a real air-to-ground
 * contact while moving.
 */
export function updateGait(state,travel,dt,gait,airborne=false,onTouchdown,strideScale=1){
  const moving=dt>0&&travel>0&&travel/dt>=gait.minSpeed;
  if(!moving){
    const settle=Math.max(0,1-dt*10);
    for(let i=0;i<state.swing.length;i++){
      state.swing[i]*=settle;state.flex[i]*=settle;state.lift[i]*=settle;state.forward[i]*=settle;state.contact[i]=1;
    }
    state.bodyLift*=settle;state.active=false;state.airborne=false;return false;
  }
  const cycleDistance=gait.stride*Math.max(.1,strideScale);
  state.phase=wrap(state.phase+travel/cycleDistance*TAU);
  const master=state.phase/TAU;
  state.bodyLift=0;
  if(gait.boundLift){
    let airProgress=-1;
    if(master>=gait.stance&&master<.5)airProgress=(master-gait.stance)/(.5-gait.stance);
    else if(master>=.5+gait.stance)airProgress=(master-.5-gait.stance)/(.5-gait.stance);
    if(airProgress>=0)state.bodyLift=Math.sin(Math.PI*airProgress)*gait.boundLift*strideScale;
  }
  state.airborne=airborne||state.bodyLift>1e-5;
  const stanceTravel=cycleDistance*gait.stance,halfStance=stanceTravel*.5;
  for(let i=0;i<state.swing.length;i++){
    const cycle=wrap(state.phase+gait.offsets[i%gait.offsets.length])/TAU;
    const inStance=cycle<gait.stance;
    let forward,lift;
    if(inStance){
      forward=halfStance-cycle*cycleDistance;lift=0;
    }else{
      const recovery=(cycle-gait.stance)/(1-gait.stance),smooth=recovery*recovery*(3-2*recovery);
      forward=-halfStance+stanceTravel*smooth;lift=Math.sin(Math.PI*recovery);
    }
    const planted=!state.airborne&&inStance;
    state.forward[i]=forward;
    state.swing[i]=(halfStance>0?forward/halfStance:0)*gait.swing;
    state.flex[i]=lift*gait.flex;
    state.lift[i]=lift*gait.lift;
    if(state.active&&!state.contact[i]&&planted&&onTouchdown)onTouchdown(i);
    state.contact[i]=planted?1:0;
  }
  state.active=true;return true;
}

// Three.js Y rotation projected to the X/Z plane. Writes into caller storage.
export function worldContact(out,rootX,rootZ,rootYaw,localX,localZ,scale=1){
  const c=Math.cos(rootYaw),s=Math.sin(rootYaw);
  out.x=rootX+(localX*c+localZ*s)*scale;
  out.z=rootZ+(-localX*s+localZ*c)*scale;
  return out;
}

// Track decals face local -Z, hence the sign convention here.
export function trackYaw(dx,dz){
  return Math.atan2(-dx,-dz);
}
