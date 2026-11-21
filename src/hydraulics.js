import { brookLevel,localToWorld,plots } from './layout.js';

const mill=plots.find(plot=>plot.id==='mill');
const localX=-mill.w/2-1.13,localY=.87,localZ=.08;
export const millWheel={localX,localY,localZ,...localToWorld(mill,localX,localZ),y:mill.y+localY,a:mill.a,radius:2.04,carrierRadius:1.93,waterline:brookLevel,count:16};
const fullTurn=Math.PI*2;
const clamp=(value,min,max)=>Math.min(max,Math.max(min,value));
const phaseAt=(angle,index)=>((angle-index*fullTurn/millWheel.count)%fullTurn+fullTurn)%fullTurn;
const ease=(low,high,value)=>{const t=clamp((value-low)/(high-low),0,1);return t*t*(3-2*t);};

export function bucketPose(drive,index){
  const phase=phaseAt(drive.angle,index),radius=millWheel.carrierRadius;
  return {phase,y:-radius*Math.cos(phase),z:radius*Math.sin(phase),
    velocityY:radius*Math.sin(phase)*drive.speed,velocityZ:radius*Math.cos(phase)*drive.speed,
    tip:drive.tips[index],fill:drive.buckets[index],released:drive.released[index]};
}

export function createMillDrive() {
  return {
    sluice:true,gate:1,angle:0,speed:0,flow:1,level:brookLevel,
    buckets:new Float32Array(millWheel.count),tips:new Float32Array(millWheel.count),
    tipVelocity:new Float32Array(millWheel.count),released:new Float32Array(millWheel.count),
    toggle(){this.sluice=!this.sluice;},
    step(dt,runoff){
      this.released.fill(0);
      if(dt<=0)return;
      const steps=Math.ceil(dt/.012),step=dt/steps;
      for(let n=0;n<steps;n++){
        this.gate+=(Number(this.sluice)-this.gate)*(1-Math.exp(-step*1.7));
        this.flow=this.gate*clamp(runoff,.54,1.75);
        this.level=brookLevel+.12*(runoff-1)+.13*(this.gate-1);
        let loadTorque=0;
        for(let i=0;i<this.buckets.length;i++){
          const phase=phaseAt(this.angle,i),y=millWheel.y-millWheel.carrierRadius*Math.cos(phase);
          // A fixed cam opens the scoop near the stream and tips the hanging bucket on the return.
          const dumping=ease(5.42,5.85,phase)*(1-ease(6.08,6.27,phase));
          const scoop=(1-ease(.22,.64,phase))*ease(0,.16,phase);
          const tiltTarget=-1.36*dumping+.39*scoop-.18*this.speed**2*Math.sin(phase);
          this.tipVelocity[i]=(this.tipVelocity[i]+(tiltTarget-this.tips[i])*step*116)*Math.exp(-step*16);
          this.tips[i]+=this.tipVelocity[i]*step;
          const immersion=ease(0,.25,this.level-(y-.16))*scoop;
          const volume=this.buckets[i],fill=(1-volume)*immersion*this.flow*18;
          const lipOverflow=ease(.44,1.20,Math.abs(this.tips[i]))*ease(.05,.3,volume);
          const release=Math.min(volume,step*volume*(.019+lipOverflow*12+(1-this.gate)*.81));
          this.buckets[i]=clamp(volume+fill*step-release,0,1);
          this.released[i]+=release;
          loadTorque-=Math.sin(phase)*volume;
        }
        const currentTorque=this.flow*1.02+loadTorque*.027;
        const friction=.39*this.speed+.50*this.speed**2;
        this.speed=Math.max(0,this.speed+step*(currentTorque-friction)*(this.sluice?1:1.5));
        this.angle+=this.speed*step;
      }
    }
  };
}
