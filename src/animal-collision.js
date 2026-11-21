import * as T from 'three';

const TAU=Math.PI*2;

/** Conservative horizontal radius of a rendered rig, including its current scale. */
export function geometryFootprintRadius(object,padding=.035){
  object.updateWorldMatrix(true,true);
  const bounds=new T.Box3().setFromObject(object),origin=new T.Vector3();object.getWorldPosition(origin);
  const dx=Math.max(Math.abs(bounds.min.x-origin.x),Math.abs(bounds.max.x-origin.x));
  const dz=Math.max(Math.abs(bounds.min.z-origin.z),Math.abs(bounds.max.z-origin.z));
  return Math.hypot(dx,dz)+padding;
}

/** Test a circular animal footprint rather than a dimensionless centre point. */
export function discIsClear(clear,x,z,radius=0,samples=8){
  if(!clear(x,z))return false;
  if(radius<=0)return true;
  // A half-radius ring catches small obstacles inside a large silhouette; the
  // denser perimeter catches tangential contacts without a costly filled grid.
  for(let ring=1;ring<=2;ring++){
    const r=radius*ring/2,count=ring===1?Math.max(samples,12):Math.max(samples,24);
    for(let i=0;i<count;i++){
      const angle=i*TAU/count;
      if(!clear(x+Math.cos(angle)*r,z+Math.sin(angle)*r))return false;
    }
  }
  return true;
}

/** Sweep a footprint in short increments so a quick animal cannot tunnel through a trunk or wall. */
export function pathIsClear(clear,fromX,fromZ,toX,toZ,radius=0){
  const distance=Math.hypot(toX-fromX,toZ-fromZ);
  const steps=Math.max(1,Math.ceil(distance/Math.max(.08,radius*.45)));
  for(let i=1;i<=steps;i++){
    const t=i/steps;
    if(!discIsClear(clear,fromX+(toX-fromX)*t,fromZ+(toZ-fromZ)*t,radius))return false;
  }
  return true;
}

/** Move to a requested point, falling back to wall-sliding before remaining in place. */
export function moveWithClearance(clear,x,z,dx,dz,radius=0){
  const toX=x+dx,toZ=z+dz;
  if(pathIsClear(clear,x,z,toX,toZ,radius))return {x:toX,z:toZ};
  if(Math.abs(dx)>=Math.abs(dz)){
    if(pathIsClear(clear,x,z,toX,z,radius))return {x:toX,z};
    if(pathIsClear(clear,x,z,x,toZ,radius))return {x,z:toZ};
  }else{
    if(pathIsClear(clear,x,z,x,toZ,radius))return {x,z:toZ};
    if(pathIsClear(clear,x,z,toX,z,radius))return {x:toX,z};
  }
  return {x,z};
}

/** Find a nearby valid spawn without allowing it to escape its assigned habitat. */
export function nearestOpenPoint(clear,x,z,radius=0,bounds,maximumDistance=6){
  const within=(xx,zz)=>!bounds||xx>=bounds.minX+radius&&xx<=bounds.maxX-radius&&zz>=bounds.minZ+radius&&zz<=bounds.maxZ-radius;
  if(within(x,z)&&discIsClear(clear,x,z,radius))return {x,z};
  const spacing=Math.max(.18,radius*.8);
  for(let distance=spacing;distance<=maximumDistance;distance+=spacing){
    const count=Math.max(12,Math.ceil(TAU*distance/spacing));
    for(let i=0;i<count;i++){
      const angle=i*TAU/count,xx=x+Math.cos(angle)*distance,zz=z+Math.sin(angle)*distance;
      if(within(xx,zz)&&discIsClear(clear,xx,zz,radius))return {x:xx,z:zz};
    }
  }
  return null;
}
