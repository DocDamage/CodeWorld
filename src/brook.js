import {brookLevel,riverWidth,riverX,springZ} from './layout.js';

export const brookStage=z=>brookLevel-.0062*(z-10.5)+.82*Math.max(0,Math.min(1,(springZ+12-z)/12))**2;
export const cobbles=[
  [-42,-.6,.8],[-32,1.1,.64],[-22,.52,1.06],[-21.3,-.35,.55],[-13,-.73,.67],
  [-4,.72,.82],[-3.4,1.35,.49],[.8,-.83,.64],[13.3,-.78,1.04],[13.9,.36,.78],
  [14.6,1.23,.58],[19.6,-.25,.71],[26,.83,.96],[26.8,.04,.48],[38,-.86,.86],[46,.34,.81]
];
export function riffle(z){
  return (.5+.5*Math.cos((z-13.7)*.48+.48*Math.sin((z-13.7)*.19)))**3;
}
export function brookBed(x,z){
  const b=(x-riverX(z))/riverWidth(z);
  const groove=Math.exp(-((b-.35*Math.sin(.15*z))**2)/.32);
  return brookStage(z)-.23-.65*groove+.17*riffle(z)+.034*Math.sin(5*x+.9*z)*Math.cos(3.6*z);
}
export function wakeAt(lateral,z){
  let wake=0,swerve=0;
  for(const [station,offset,size] of cobbles){
    const along=z-station;
    if(along<-.7||along>3.8)continue;
    const side=lateral-offset,spread=size*.36+Math.max(0,along)*.19;
    const disturbance=Math.exp(-((side/spread)**2))*Math.exp(-Math.abs(along-.18)/(along<0?.34:1.18));
    wake+=disturbance;swerve+=disturbance*side/spread;
  }
  return [Math.min(1,wake),swerve];
}
