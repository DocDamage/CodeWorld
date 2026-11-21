import * as T from 'three';
import {glass,v,TAU} from './model.js';
import {height,smooth} from './land.js';
import {clockHands,moving,lamps} from './houses.js';

export function buildDaylight({scene,renderer,air,hemi,sun,clock,clockText,phase,presets}){
  // A soft radial sprite lets the lanterns fade without hard edges.
  const cv=document.createElement('canvas');cv.width=cv.height=64;const cx=cv.getContext('2d');
  const grad=cx.createRadialGradient(32,32,0,32,32,32);grad.addColorStop(0,'white');grad.addColorStop(.35,'rgba(255,255,255,.65)');grad.addColorStop(1,'rgba(255,255,255,0)');cx.fillStyle=grad;cx.fillRect(0,0,64,64);
  const soft=new T.CanvasTexture(cv);
  const lampGeo=new T.BufferGeometry().setFromPoints(lamps);
  const halo=new T.PointsMaterial({color:'#ffbf70',size:1.35,map:soft,transparent:true,blending:T.AdditiveBlending,depthWrite:false});
  scene.add(new T.Points(lampGeo,halo));
  // Ground pools stay inexpensive even when the entire village is in view.
  const pools=lamps.map(p=>{const m=new T.Mesh(new T.PlaneGeometry(3.3,3.3),new T.MeshBasicMaterial({map:soft,color:'#e6ab64',blending:T.AdditiveBlending,transparent:true,depthWrite:false}));
    m.position.set(p.x,height(p.x,p.z)+.065,p.z);
    const dx=(height(p.x+.1,p.z)-height(p.x-.1,p.z))/.2,dz=(height(p.x,p.z+.1)-height(p.x,p.z-.1))/.2;
    m.quaternion.setFromUnitVectors(v(0,0,1),v(-dx,1,-dz).normalize());scene.add(m);return m;});
  const birdPos=new Float32Array(9*4*3),birdG=new T.BufferGeometry();
  birdG.setAttribute('position',new T.BufferAttribute(birdPos,3));const birds=new T.LineSegments(birdG,new T.LineBasicMaterial({color:'#606954'}));birds.frustumCulled=false;scene.add(birds);
  function ambientMotion(t,dt,weatherState) {
    const {gust}=weatherState;birds.visible=air.uniforms.night.value<.6&&weatherState.rain<.36;
    for(const m of moving)m.hub.rotation[m.axis]+=dt*m.speed*(.53+gust);
    for(let i=0;i<9;i++){const a=t*.048+i*.21,x=-1+Math.cos(a)*12+i*.8,z=-24+Math.sin(a)*6+i*.78,y=13+Math.sin(a*2.3+i)*.58,flap=Math.sin(t*4.5+i*2)*.13+.07;
      birdPos.set([x-.28,y+flap,z,x,y,z+.05,x,y,z+.05,x+.28,y+flap,z],i*12);}
    birdG.attributes.position.needsUpdate=true;
  }
  const daysky=new T.Color('#d9dfdc'),nightsky=new T.Color('#9aa9c6'),dayground=new T.Color('#7b7864'),nightground=new T.Color('#434853'),sunDay=new T.Color('#e6dfca'),sunDusk=new T.Color('#df9163'),sunNight=new T.Color('#a9b6d0'),fogDay=new T.Color('#b0b4a6'),fogDusk=new T.Color('#a58b74'),fogNight=new T.Color('#444d60');
  const vaultFog=new T.Color('#3b3640');
  const rainFog=new T.Color('#858f93'),lightning=new T.Color('#b3cefa');
  let shadowHour=-24;
  function setHour(h){
    const hour=((h%24)+24)%24;
    for(const {hand,kind} of clockHands)hand.rotation.z=-TAU*(kind==='hour'?hour/12:hour%1);
    const night=1-smooth(4.6,7.45,hour)* (1-smooth(17.5,20.65,hour));
    const dusk=Math.max(1-smooth(0,2.6,Math.abs(hour-18.35)),1-smooth(0,2.1,Math.abs(hour-6.75)))*.89;
    air.uniforms.night.value=night;air.uniforms.dusk.value=dusk;
    hemi.color.copy(daysky).lerp(nightsky,night);hemi.groundColor.copy(dayground).lerp(nightground,night);hemi.intensity=1.55-night*1.29;
    sun.color.copy(sunDay).lerp(sunDusk,dusk).lerp(sunNight,night);sun.intensity=2.03-night*1.77;
    const arc=(hour-6)*Math.PI/12,east=Math.cos(arc),alt=Math.sin(arc);
    const solar=air.uniforms.solarDirection.value.set(.84*east-.39*alt,.84*alt,.54*east+.54*alt).normalize();
    if(Math.abs(hour-shadowHour)>.18){
      sun.position.copy(solar).multiplyScalar((solar.y<0?-1:1)*48);
      sun.position.y=Math.max(4,sun.position.y);sun.position.add(sun.target.position);
      renderer.shadowMap.needsUpdate=true;shadowHour=hour;
    }
    scene.fog.color.copy(fogDay).lerp(fogDusk,dusk*.8).lerp(fogNight,night);scene.fog.density=.012+night*.011;
    glass.emissiveIntensity=.019+night*1.7;halo.opacity=night*.65;for(const pool of pools)pool.material.opacity=night*.42;
    birds.visible=night<.6;clock.value=hour;
    const mins=Math.floor(hour*60+.001);clockText.textContent=String(Math.floor(mins/60)).padStart(2,'0')+':'+String(mins%60).padStart(2,'0');
    phase.textContent=night>.78?'Nightfall':hour<8.2?'Dawn':hour>=17.4?'Dusk':'Daylight';
    presets.forEach(n=>n.classList.toggle('chosen',Math.abs(+n.dataset.hour-hour)<.15));
    return hour;
  }
  function weather(w,night,depth,anchorX){
    sun.color.copy(sunDay).lerp(sunDusk,air.uniforms.dusk.value).lerp(sunNight,night).lerp(lightning,w.flash);
    sun.intensity=((2.43-night*2.20)*(1-w.cloud*.68)+w.flash*3.15)*(1-depth*.95);
    hemi.intensity=((1.52-night*1.20)*(1-w.cloud*.21)+w.flash*.65)*(1-depth)+.72*depth;
    const distanceEast=smooth(28,86,anchorX);
    scene.fog.density=.0065-distanceEast*.0018+night*.008+Math.pow(w.mist,1.64)*.023*(1-depth)+depth*.012;
    scene.fog.color.copy(fogDay).lerp(fogDusk,air.uniforms.dusk.value*.8).lerp(rainFog,w.cloud*.50).lerp(fogNight,night).lerp(lightning,w.flash*.20).lerp(vaultFog,depth);
    air.uniforms.waterFog.value.copy(scene.fog.color);air.uniforms.waterFogDensity.value=scene.fog.density;
    air.uniforms.sunDirection.value.subVectors(sun.position,sun.target.position).normalize();
    air.uniforms.sunTint.value.copy(sun.color);
  }
  return {setHour,ambientMotion,weather};
}
