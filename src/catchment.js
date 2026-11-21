// Values are metres of water over a cell. Solid boundaries have no exchange.
// Brook and lake cells are open outlets. Only water that reaches one leaves there.
export const LAND=1,BROOK=2,OUTLET=3;
export function createCatchment(cols,rows,cell,bed,kind){
  const n=rows*cols,depth=new Float32Array(n),moisture=new Float32Array(n);
  const flowX=new Float32Array(n),flowZ=new Float32Array(n),delta=new Float32Array(n);
  const active=[],neighbors=new Int32Array(n*4).fill(-1);
  const weights=new Float64Array(4);
  for(let i=0;i<n;i++){
    if(kind[i]!==LAND)continue;
    active.push(i);
    const x=i%cols,z=Math.floor(i/cols);
    const ns=[x?i-1:-1,x+1<cols?i+1:-1,z?i-cols:-1,z+1<rows?i+cols:-1];
    for(let k=0;k<4;k++)if(ns[k]>=0&&kind[ns[k]])neighbors[i*4+k]=ns[k];
  }
  function step(dt,rain){
    let brook=0,outlet=0;
    const input=Math.min(1,Math.max(0,rain))*.00108*dt;
    for(const i of active){
      // The first drops infiltrate. Saturated soil takes up rain much more slowly.
      const infiltration=Math.min(depth[i]+input,.00004*dt+.00055*dt*Math.max(0,1-moisture[i]/.008));
      moisture[i]=Math.max(0,moisture[i]+infiltration-dt*(.000036+.000043*(1-rain)));
      depth[i]=Math.max(0,depth[i]+input-infiltration-.000042*dt*(1-rain));
    }
    delta.fill(0);
    for(const i of active){
      const d=depth[i];
      if(d<.00004){flowX[i]=0;flowZ[i]=0;continue;}
      const head=bed[i]+d;
      let sum=0,largest=0;
      for(let k=0;k<4;k++){
        const j=neighbors[i*4+k],drop=j<0?0:Math.max(0,head-bed[j]-depth[j]);
        weights[k]=drop;sum+=drop;largest=Math.max(largest,drop);
      }
      if(!sum){flowX[i]=0;flowZ[i]=0;continue;}
      // Limit both the fraction of storage transported and the free-surface
      // difference equalized per step to avoid overshooting on nearly level ground.
      const transfer=Math.min(d*Math.min(.82,dt*(.62+3.2*Math.sqrt(largest/cell))),largest*.21);
      delta[i]-=transfer;
      const unit=transfer/sum;
      for(let k=0;k<4;k++)if(weights[k]){
        const j=neighbors[i*4+k],share=weights[k]*unit;
        if(kind[j]===LAND)delta[j]+=share;
        else if(kind[j]===BROOK)brook+=share;
        else outlet+=share;
      }
      flowX[i]=unit*(weights[1]-weights[0])*cell/(dt*d);
      flowZ[i]=unit*(weights[3]-weights[2])*cell/(dt*d);
    }
    for(const i of active)depth[i]=Math.max(0,depth[i]+delta[i]);
    return {brook:brook*cell*cell,outlet:outlet*cell*cell};
  }
  return {depth,moisture,flowX,flowZ,active,step};
}
