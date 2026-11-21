import * as T from 'three';
import {v} from './model.js';
import {surfaces} from './surfaces.js';

// A dressed reed coat curves over the rafters and rolls under at the cut ends.
// Measure UVs in roof space so the stalks keep their size on different houses.
export function thatchedRoof(b,width,depth,eave,rise){
  const half=width/2+.42,run=depth/2+.53,columns=Math.ceil(half*2/.09);
  const pos=[],uv=[],colors=[],indices=[];
  const dip=x=>.065*Math.cos(x*1.42)+.026*Math.sin(x*3.21);
  const profile=[[0,.21],[.12,.29],[.32,.29],[.60,.24],[.85,.18],[.98,.13],[1,.04],[.996,-.10],[.96,-.22],[.88,-.21]];
  for(const side of [-1,1]){
    const start=pos.length/3;
    for(let row=0;row<profile.length;row++)for(let i=0;i<=columns;i++){
      const [u,lift]=profile[row],x=(i/columns*2-1)*half;
      const reed=Math.sin(x*11.7+side)*.45+Math.cos(x*28.3)*.26+Math.sin(x*3.17)*.29;
      const z=side*u*(run+.067*reed*u);
      const y=eave+rise*(1-u)+.19*Math.sin(u*Math.PI)+lift+dip(x)*(1-u*.46)+reed*.025*u;
      pos.push(x,y,z);uv.push(x/.89,(u*Math.hypot(run,rise)+Math.max(0,row-6)*.12)/1.24);
      const shade=(.85+.075*Math.sin(x*3.7+u)+.046*reed)*(row<7?1:.78);
      colors.push(shade,shade*.98,shade*.93);
      if(row&&i){
        const a=start+row*(columns+1)+i,c=a-columns-1;
        if(side>0)indices.push(c-1,a-1,a,c-1,a,c);else indices.push(c-1,a,a-1,c-1,c,a);
      }
    }
    // Sew the ridge cap with paired hazel spars.
    for(let x=-half+.14;x<half-.22;x+=.42){
      for(const skew of [0,.32]){
        b.beam('#836242',v(x+skew,eave+rise+.22+dip(x+skew),side*.03),
          v(x+.32-skew,eave+rise*(1-.53/run)+.30+dip(x),side*.53),.032,.032,'cyl','wood');
      }
    }
    // Close the verges over the end rafters.
    for(const end of [-1,1])b.beam('#614e39',v(end*(half-.04),eave+rise+dip(end*half),0),
      v(end*(half-.04),eave-.10,side*run),.27,.26,'cyl','agedWood');
  }
  const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(pos,3));
  g.setAttribute('uv',new T.Float32BufferAttribute(uv,2));g.setAttribute('color',new T.Float32BufferAttribute(colors,3));
  g.setIndex(indices);g.computeVertexNormals();
  const roof=new T.Mesh(g,surfaces.thatch);roof.applyMatrix4(b.frame);roof.castShadow=roof.receiveShadow=true;b.root.add(roof);
}
