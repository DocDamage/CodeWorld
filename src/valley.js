import { lakeRadius } from './lake-layout.js';
import { waterSurface } from './water.js';
import {buildSky} from './sky.js';
import {brookStage,wakeAt,riffle} from './brook.js';
import * as T from 'three';
import { trailDistance } from './estate.js';
import { Builder,v,TAU,range,random,tint,pick,meshSurface } from './model.js';
import { height,inPlot,nearPath,nearFarmLane,riverX,riverWidth,smooth } from './land.js';
import { millWheel } from './hydraulics.js';
import {plantShrub,plantTree,ridgeTree} from './trees.js';
import { farm,inFarm } from './farm-layout.js';
import {springZ} from './layout.js';
import {inMineYard} from './mine-layout.js';

export function plantValley(root,b,leaves) {
  const treePositions=[];
  function tree(x,z,s){
    if(inFarm(x,z)||nearFarmLane(x,z,2.4)||inPlot(x,z,2.6)||nearPath(x,z,1.45)||(x>14&&trailDistance(x,z)<3.2)||
      inMineYard(x,z,2))return;
    const y=height(x,z)-.08,base=v(x,y,z);
    plantTree(b,'beech',x,y,z,5.25*s);
    leaves?.add(x,y+3.8*s,z,s*1.35);treePositions.push([x,z,s]);return base;
  }
  for(const [x,z,s] of [[-19,11,1.13],[11,2.4,1.24],[-4.8,-10,.93],[20,-13,1.06],[-27,-9,1.1],[-21,17,1.2],[18,13,1.28],[-19,-19,1],[-12,-23,1.03],[5,-26,.96],[22,-4,1.17]])tree(x,z,s);
  for(let i=0;i<480;i++) {
    const x=range(-50,50),z=range(-50,38);
    if(x>-32&&x<22&&z>-25&&z<28 || inPlot(x,z,3.2)||nearPath(x,z,2)||Math.abs(x-riverX(z))<riverWidth(z)+2.5)continue;
    if(treePositions.some(([xx,zz])=>(xx-x)**2+(zz-z)**2<13))continue;
    tree(x,z,range(.69,1.32));
  }
  for(let i=0;i<3100;i++){
    const x=range(-35,33),z=range(-33,33);
    if((x>16&&trailDistance(x,z)<1.82)||inMineYard(x,z,.5)||inPlot(x,z,.5)||nearPath(x,z,1)||nearFarmLane(x,z,1.15)||Math.abs(x-riverX(z))<riverWidth(z)+.32)continue;
    const y=height(x,z),s=range(.20,.89),c=pick(['#5d7047','#788052','#69784e','#566943']);
    if(i%4===0){plantShrub(b,x,y,z,s*.86,s*1.6);if(i%20===0)leaves?.add(x,y+s*.55,z,s*.45);}
    else if(i%3===0){b.put('leaf',tint('#a5a38c'),x,y,z,s*.84,s*.48,s,range(-.3,.3),range(0,6));}
    else {
      const flower=pick(['#eee5be','#f6d77a','#c796b0','#b39cbd','#efebcb']);
      for(let j=0;j<5;j++){
        const xx=x+range(-.27,.27),zz=z+range(-.27,.27),yy=height(xx,zz),h=range(.14,.35);
        b.put('box','#78914c',xx,yy+h*.5,zz,.014,h,.014,0,0,0,'plant');
        b.put('leaf',tint(flower),xx,yy+h,zz,.087,.07,.086,0,0,0,'plant');
      }
    }
  }
  for(let i=0;i<330;i++){
    const z=range(-43,42),x=riverX(z)+pick([-1,1])*(riverWidth(z)+range(-.52,.98)),s=range(.18,.76);
    const y=height(x,z);
    if(i%3===0)b.put('stone',tint(pick(['#74786f','#89877c','#686e66']),.09),x,y+s*.13,z,s*1.12,s*.42,s,range(-.35,.35),range(0,TAU),0,'stone');
    else for(let j=0;j<3;j++){
      const xx=x+range(-.12,.12),zz=z+range(-.12,.12),h=s*range(.7,1.4);
      b.put('box',tint('#69735b',.08),xx,y+h*.5,zz,.018,h,.018,range(-.08,.08),0,range(-.08,.08),'plant');
      b.put('leaf',tint('#879078',.08),xx,y+h,zz,.09,.28,.045,range(-.25,.25),range(0,TAU),0,'plant');
    }
  }
  // Fences run behind gardens, leaving every shopfront approach open.
  for(const pts of [[[5.2,11.4],[9.1,10.7],[13.2,10.2]], [[-32.4,5],[-33.9,2],[-33,-.2]], [[17.8,-8.9],[20.8,-7.7],[21.3,-3.6]], [[-30,-17.4],[-27.1,-20],[-23,-22]], [[.3,-26],[3.6,-27],[6.4,-25.6]]]){
    let last=null;
    for(let i=1;i<pts.length;i++){const [ax,az]=pts[i-1],[bx,bz]=pts[i];const n=Math.ceil(Math.hypot(bx-ax,bz-az)/1.65);
      for(let j=(i===1?0:1);j<=n;j++){const t=j/n,x=ax+(bx-ax)*t,z=az+(bz-az)*t,y=height(x,z),p=v(x,y,z);
        b.put('box',tint('#6f5d47'),x,y+.55,z,.15,1.13,.16,0,range(-.10,.10),range(-.05,.05),'agedWood');
        if(last)for(const yy of [.37,.82])b.beam(tint('#756049'),last.clone().add(v(0,yy,0)),p.clone().add(v(0,yy,0)),.11,.12,'box','agedWood');
        last=p;
      }
    }
  }
  // Sparse outcrops and deadfall make the common feel inhabited by weather rather than decoration.
  for(let i=0;i<150;i++){
    const x=range(-38,40),z=range(-35,38);
    if(inMineYard(x,z,.45)||inFarm(x,z)||inPlot(x,z,1.2)||nearPath(x,z,1.35)||nearFarmLane(x,z,1.5)||Math.abs(x-riverX(z))<riverWidth(z)+1.1)continue;
    const s=range(.12,.48),y=height(x,z);
    b.put('stone',tint(pick(['#6f7168','#858174','#77786d','#969080']),.11),x,y+s*.16,z,s*range(.8,1.45),s*.46,s,range(-.35,.35),range(0,TAU),0,'stone');
  }
  for(const [x,z,a,len] of [[-25,13,.7,1.8],[17,17,-.35,2.3],[-12,-27,.2,1.6],[26,-18,-.75,2.1]]){
    const y=height(x,z);
    b.put('cyl','#554b3d',x,y+.16,z,.23,len,.23,Math.PI/2,a,0,'agedWood');
    for(const off of [-.36,.35])b.put('cyl','#6d6251',x+Math.cos(a)*len*off,y+.16,z-Math.sin(a)*len*off,.245,.035,.245,Math.PI/2,a,0,'agedWood');
  }
  return (x,z)=>!treePositions.some(([tx,tz,s])=>(x-tx)**2+(z-tz)**2<(.25*s+.22)**2);
}
function mountains(root) {
  const pos=[],cols=[],idx=[],rings=27,n=180;
  const conifers=new Builder(root);
  const {minX,maxX,minZ,maxZ}=farm.bounds;
  for(let j=0;j<rings;j++)for(let i=0;i<=n;i++){
    const a=(i%n)/n*TAU,r=37+j*5.6,x=r*Math.cos(a),z=r*Math.sin(a);
    const crags=Math.sin(a*39+1.3*Math.sin(a*14))+.56*Math.sin(a*58);
    const ridge=8+5*Math.sin(a*7+.5)+3*Math.sin(a*15+1)+2*Math.cos(a*24)+crags;
    const ridge2=13+6*Math.sin(a*9+2.4)+4*Math.cos(a*17)+crags*1.62;
    const y=-4+Math.exp(-(((r-66)/13)**2))*ridge+Math.exp(-(((r-99)/15)**2))*ridge2+Math.exp(-(((r-141)/17)**2))*(21+6*Math.cos(a*11));
    const east=smooth(32,56,x)*(1-smooth(89,111,Math.abs(z+10)));
    const farmEdge=Math.hypot(Math.max(minX-x,0,x-maxX),Math.max(minZ-z,0,z-maxZ));
    const west=smooth(4,29,farmEdge);
    const lakeCut=z>40?1-smooth(1.38,1.72,lakeRadius(x,z)):0;
    const base=Math.min(y,.18)+(y-Math.min(y,.18))*west-east*40;
    pos.push(x,base+(Math.min(-15,base)-base)*lakeCut,z);
    const c=new T.Color('#415d49').lerp(new T.Color('#6a827c'),smooth(48,145,r));
    c.lerp(new T.Color('#999788'),smooth(11,21,y+crags*1.3)*.75);
    c.multiplyScalar(.88+.105*Math.sin(x*.21+z*.24)+crags*.043);
    if(i<n&&r>59&&r<115&&lakeCut<.02&&west>.98&&east<.05&&y>1.5&&y<16&&Math.sin(i*1.71+j*.86)>.05){
      const h=1.8+1.05*Math.cos(i*2.43+j);
      ridgeTree(conifers,x,y,z,h,a);
    }
    cols.push(c.r,c.g,c.b);if(j&&i){const k=j*(n+1)+i;idx.push(k-n-2,k-1,k,k-n-2,k,k-n-1);}
  }meshSurface(root,pos,idx,cols,{roughness:1,flatShading:false});conifers.finish();
}
function noiseTexture() {
  const size=256,data=new Uint8Array(size*size);for(let i=0;i<data.length;i++)data[i]=random()*255;
  const t=new T.DataTexture(data,size,size,T.RedFormat);t.minFilter=t.magFilter=T.LinearFilter;t.wrapS=t.wrapT=T.RepeatWrapping;t.needsUpdate=true;return t;
}
export function atmosphere(scene) {
  mountains(scene);
  const uniforms={clock:{value:0},night:{value:0},dusk:{value:0},noiseMap:{value:noiseTexture()},
    dayTop:{value:new T.Color('#538ac2')},dayLow:{value:new T.Color('#cad9df')},
    cloud:{value:.75},wind:{value:.5},rain:{value:0},flash:{value:0},wetness:{value:0},snowpack:{value:0},
    runoff:{value:1},raceFlow:{value:1},raceLevel:{value:0},waterFog:{value:new T.Color('#9fa5a0')},waterFogDensity:{value:.014},
    cloudOffset:{value:new T.Vector2()},streamTravel:{value:0},wheel:{value:new T.Vector2(millWheel.x,millWheel.z)}};
  const sky=buildSky(uniforms);scene.add(sky);
  const pos=[],idx=[],bed=[],channel=[],segments=440,cross=24;
  for(let i=0;i<=segments;i++){
    const z=springZ-.55+i*(53-springZ+.55)/segments,x=riverX(z),w=riverWidth(z)+1.28;
    for(let j=0;j<=cross;j++){
      const bank=j/cross*2-1,lateral=bank*w,[wake,swerve]=wakeAt(lateral,z);
      pos.push(x+lateral,brookStage(z),z);
      bed.push((riverX(z+.05)-riverX(z-.05))/.10+swerve*.63,1,height(x+lateral,z));
      channel.push(lateral,riffle(z),wake,1);
      if(i&&j){const k=i*(cross+1)+j;idx.push(k,k-1,k-cross-2,k,k-cross-2,k-cross-1);}
    }
  }
  const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(pos,3));g.setAttribute('waterBed',new T.Float32BufferAttribute(bed,3));g.setIndex(idx);
  g.setAttribute('brookChannel',new T.Float32BufferAttribute(channel,4));
  const water=new T.Mesh(g,waterSurface(uniforms));water.name='Mill brook';
  scene.add(water);return {uniforms,sky,waterMaterial:water.material};
}
