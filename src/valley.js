import * as T from 'three';
import { trailDistance } from './estate.js';
import { v,TAU,range,random,tint,pick,meshSurface } from './model.js';
import { height,inPlot,nearPath,riverX,riverWidth,plots,smooth } from './land.js';

function leafTexture() {
  const canvas=document.createElement('canvas');canvas.width=canvas.height=128;
  const ctx=canvas.getContext('2d');
  for(let i=0;i<1800;i++){
    const a=range(0,TAU),r=Math.sqrt(random()),edge=.80+.10*Math.sin(a*5+.2)+.064*Math.cos(a*9);
    if(r>edge)continue;
    const x=64+60*r*Math.cos(a),y=64+60*r*Math.sin(a);
    const l=Math.round(range(56,87)-y*.07);
    ctx.fillStyle='hsl(61, 14%, '+l+'%)';ctx.beginPath();ctx.ellipse(x,y,range(1.1,3.9),range(.9,2.1),range(-1.2,1.2),0,TAU);ctx.fill();
  }
  const tex=new T.CanvasTexture(canvas);tex.colorSpace=T.SRGBColorSpace;return tex;
}
export function plantValley(root,b) {
  const foliage=[],treePositions=[];
  function tree(x,z,s,rich=true){
    if(x>8&&trailDistance(x,z)<2.9)return;
    const y=height(x,z)-.08,base=v(x,y,z);
    const fork=v(x+range(-.23,.23)*s,y+2.2*s,z+range(-.23,.23)*s);
    b.beam(tint('#645842'),base,fork,.46*s,.40*s,'cyl');
    for(let i=0;i<5;i++){
      const a=i*TAU/5+range(-.35,.35),r=range(.63,1.39)*s;
      const end=v(fork.x+Math.cos(a)*r,y+range(3.1,4.45)*s,fork.z+Math.sin(a)*r);
      b.beam(tint('#6c5d44'),fork.clone().lerp(base,range(.0,.34)),end,.22*s,.22*s,'cyl');
      const size=range(1.8,2.7)*s,col=pick(['#698c4d','#7f9a50','#708e44','#78974f','#8ca652']);
      b.put('crown',tint(col,.09),end.x,end.y,end.z,size*.82,size*.57,size*.80,range(-.24,.24),a,0,'canopy');
      if(rich)for(let j=0;j<21;j++){
        const phi=range(0,TAU),incl=range(-.62,.96),rad=Math.sqrt(1-incl*incl);
        const p=v(end.x+Math.cos(phi)*size*.40*rad,end.y+size*.31*incl,end.z+Math.sin(phi)*size*.40*rad);
        const q=new T.Quaternion().setFromEuler(new T.Euler(-incl*.9,Math.PI/2-phi,range(-.65,.65),'YXZ'));
        const sc=size*range(.53,.76);
        foliage.push({m:new T.Matrix4().compose(p,q,v(sc,sc*.80,1)),c:tint(col,.1).multiplyScalar(1.2+incl*.15)});
      }
    }
    treePositions.push([x,z,s]);return base;
  }
  for(const [x,z,s] of [[-18,10,1.13],[13.1,5.4,1.24],[-5,-10,.93],[14.5,-13,1.06],[-23,-9,1.1],[-21,17,1.2],[18,13,1.28],[-21,-17,1],[-12,-23,1.03],[3,-23,.96],[18.3,-3,1.17]])tree(x,z,s);
  for(let i=0;i<480;i++) {
    const x=range(-50,50),z=range(-50,38);
    if(Math.abs(x)<18&&z>-17 || x>-17&&x<24&&z>12 || inPlot(x,z,3.2)||nearPath(x,z,2)||Math.abs(x-riverX(z))<riverWidth(z)+2.5)continue;
    if(treePositions.some(([xx,zz])=>(xx-x)**2+(zz-z)**2<13))continue;
    tree(x,z,range(.69,1.32),Math.hypot(x,z)<42);
  }
  const canopy=new T.InstancedMesh(new T.PlaneGeometry(1,1),new T.MeshStandardMaterial({map:leafTexture(),alphaTest:.46,side:T.DoubleSide,roughness:1}),foliage.length);
  foliage.forEach(({m,c},i)=>{canopy.setMatrixAt(i,m);canopy.setColorAt(i,c);});canopy.receiveShadow=true;root.add(canopy);
  for(let i=0;i<3100;i++){
    const x=range(-35,33),z=range(-33,33);
    if(inPlot(x,z,.5)||nearPath(x,z,1)||Math.abs(x-riverX(z))<riverWidth(z)+.32)continue;
    const y=height(x,z),s=range(.20,.89),c=pick(['#739047','#95a956','#869e59','#708848']);
    if(i%4===0){b.put('crown',tint(c),x,y+s*.21,z,s*1.3,s*.79,s,range(-.22,.22),range(0,TAU));}
    else if(i%3===0){b.put('leaf',tint('#a5a38c'),x,y,z,s*.84,s*.48,s,range(-.3,.3),range(0,6));}
    else {
      const flower=pick(['#eee5be','#f6d77a','#c796b0','#b39cbd','#efebcb']);
      for(let j=0;j<5;j++){
        const xx=x+range(-.27,.27),zz=z+range(-.27,.27),yy=height(xx,zz),h=range(.14,.35);
        b.put('box','#78914c',xx,yy+h*.5,zz,.014,h,.014);
        b.put('leaf',tint(flower),xx,yy+h,zz,.087,.07,.086);
      }
    }
  }
  for(let i=0;i<330;i++){
    const z=range(-43,42),x=riverX(z)+pick([-1,1])*(riverWidth(z)+range(-.52,.98)),s=range(.18,.76);
    b.put('leaf',tint(pick(['#a4a591','#959781','#9eaa86'])),x,height(x,z)+.065,z,s*1.3,s*.75,s,range(-.5,.5),range(0,TAU));
  }
  // Split-rail fences trace the gardens and the upper lane.
  for(const pts of [[[6.9,12.1],[8.9,10],[10.2,7.2]], [[-3,8],[-5.5,7],[-6.7,5.4]], [[9.9,-5.5],[11,-8.5],[11,-12.5]], [[-18.5,-8.4],[-20,-10],[-20,-14]], [[-4.5,-4.3],[-6,-4.4],[-7,-5.8]]]){
    let last=null;
    for(let i=1;i<pts.length;i++){const [ax,az]=pts[i-1],[bx,bz]=pts[i];const n=Math.ceil(Math.hypot(bx-ax,bz-az)/1.65);
      for(let j=(i===1?0:1);j<=n;j++){const t=j/n,x=ax+(bx-ax)*t,z=az+(bz-az)*t,y=height(x,z),p=v(x,y,z);
        b.put('box',tint('#886f4f'),x,y+.55,z,.15,1.13,.16,0,range(-.10,.10),range(-.05,.05));
        if(last)for(const yy of [.37,.82])b.beam(tint('#937955'),last.clone().add(v(0,yy,0)),p.clone().add(v(0,yy,0)),.11,.12);
        last=p;
      }
    }
  }
}
function mountains(root) {
  const pos=[],cols=[],idx=[],rings=27,n=180;
  for(let j=0;j<rings;j++)for(let i=0;i<=n;i++){
    const a=(i%n)/n*TAU,r=37+j*5.6,x=r*Math.cos(a),z=r*Math.sin(a);
    const ridge=8+5*Math.sin(a*7+.5)+3*Math.sin(a*15+1)+2*Math.cos(a*24);
    const ridge2=13+6*Math.sin(a*9+2.4)+4*Math.cos(a*17);
    const y=-4+Math.exp(-(((r-66)/13)**2))*ridge+Math.exp(-(((r-99)/15)**2))*ridge2+Math.exp(-(((r-141)/17)**2))*(21+6*Math.cos(a*11));
    const east=smooth(32,56,x)*(1-smooth(89,111,Math.abs(z+10)));
    pos.push(x,y-east*40,z);
    const c=new T.Color('#879e72').lerp(new T.Color('#8ca29c'),smooth(48,145,r));c.multiplyScalar(.93+.066*Math.sin(x*.21+z*.24));
    cols.push(c.r,c.g,c.b);if(j&&i){const k=j*(n+1)+i;idx.push(k-n-2,k-1,k,k-n-2,k,k-n-1);}
  }meshSurface(root,pos,idx,cols);
}
function noiseTexture() {
  const size=256,data=new Uint8Array(size*size);for(let i=0;i<data.length;i++)data[i]=random()*255;
  const t=new T.DataTexture(data,size,size,T.RedFormat);t.minFilter=t.magFilter=T.LinearFilter;t.wrapS=t.wrapT=T.RepeatWrapping;t.needsUpdate=true;return t;
}
export function atmosphere(scene) {
  mountains(scene);const uniforms={clock:{value:0},night:{value:0},dusk:{value:0},noiseMap:{value:noiseTexture()},dayTop:{value:new T.Color('#529ed5')},dayLow:{value:new T.Color('#e0e9d9')}};
  const sky=new T.Mesh(new T.SphereGeometry(190,32,20),new T.ShaderMaterial({side:T.BackSide,depthWrite:false,uniforms,
    vertexShader:`varying vec3 dir; void main(){dir=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
    fragmentShader:`varying vec3 dir;uniform sampler2D noiseMap;uniform float clock,night,dusk;uniform vec3 dayTop,dayLow;
      float n(vec2 p){return texture2D(noiseMap,p/256.).r;}
      float fb(vec2 p){return .46*n(p)+.27*n(p*2.03)+.15*n(p*4.07)+.08*n(p*8.1)+.04*n(p*16.3);}
      void main(){vec3 d=normalize(dir);float h=max(0.,d.y);
      vec3 low=mix(dayLow,vec3(.93,.44,.24),dusk),top=mix(dayTop,vec3(.27,.35,.56),dusk);
      vec3 col=mix(low,top,smoothstep(-.12,.32,h));col=mix(col,mix(vec3(.080,.115,.18),vec3(.009,.020,.054),smoothstep(0.,.55,h)),night);
      vec2 uv=d.xz/(h+.115)*2.0+vec2(clock*.014,8.7);
      float f=fb(uv);float cloud=smoothstep(.48,.62,f)*smoothstep(.005,.14,h);
      vec3 cl=mix(vec3(.85,.88,.82),vec3(1.,.99,.90),smoothstep(.46,.69,f));
      cl=mix(cl,vec3(.99,.70,.48),dusk*.7);cl=mix(cl,vec3(.13,.16,.23),night);
      col=mix(col,cl,cloud*.94);
      vec2 star=vec2(atan(d.z,d.x),asin(d.y))*330.;float s=step(.987,n(floor(star)+.5))*(1.-smoothstep(.03,.24,length(fract(star)-.5)));
      col+=night*(1.-cloud)*s*.72;
      gl_FragColor=vec4(col,1.);
      #include <colorspace_fragment>
      }`}));
  sky.frustumCulled=false;sky.renderOrder=-10;scene.add(sky);
  const pos=[],idx=[],uv=[];for(let i=0;i<=255;i++){
    const z=-53+i*106/255,x=riverX(z),w=riverWidth(z)+.95;
    for(const s of [-1,1]){pos.push(x+s*w,-.76,z);uv.push(s,z);}
    if(i){const k=i*2;idx.push(k-2,k,k+1,k-2,k+1,k-1);}
  }
  const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(pos,3));g.setAttribute('uv',new T.Float32BufferAttribute(uv,2));g.setIndex(idx);
  const water=new T.Mesh(g,new T.ShaderMaterial({uniforms,side:T.DoubleSide,vertexShader:`varying vec2 world;varying vec2 river;void main(){world=position.xz;river=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
  fragmentShader:`varying vec2 world;varying vec2 river;uniform float clock,night,dusk;uniform sampler2D noiseMap;
  void main(){vec2 p=world;float w=texture2D(noiseMap,(p*vec2(3.,14.)+vec2(clock*.6,-clock*2.))/256.).r;
  float c=sin(p.y*12.+sin(p.x*3.+clock)+clock*1.9);float spark=smoothstep(.72,.91,w)*smoothstep(.3,.96,c);
  vec3 col=mix(vec3(.066,.28,.27),vec3(.22,.54,.52),abs(river.x)*.71+w*.22);col+=spark*.34;col=mix(col,vec3(.34,.32,.24),dusk*.40);col*=1.-night*.83;
  gl_FragColor=vec4(col,1.);
  #include <colorspace_fragment>
  }`}));
  scene.add(water);return {uniforms,sky,waterMaterial:water.material};
}
