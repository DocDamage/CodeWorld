import * as T from 'three';

// Periodic noise at several grain sizes. One mipmapped tile supplies the
// drainage pattern, clod height and aggregate without shimmering in the distance.
let texture;
function soilTexture(){
  if(texture)return texture;
  const n=256,data=new Uint8Array(n*n*4);
  function hash(x,y){
    let h=Math.imul(x+37,1597334677)^Math.imul(y+91,3812015801);
    h=Math.imul(h^(h>>>16),2246822519);return ((h^(h>>>13))>>>0)/4294967295;
  }
  function noise(u,v,period){
    const x=u*period,z=v*period,i=Math.floor(x),j=Math.floor(z);
    let a=x-i,b=z-j;a=a*a*(3-2*a);b=b*b*(3-2*b);
    const i1=(i+1)%period,j1=(j+1)%period,k=i%period,l=j%period;
    return (hash(k,l)*(1-a)+hash(i1,l)*a)*(1-b)+(hash(k,j1)*(1-a)+hash(i1,j1)*a)*b;
  }
  for(let y=0;y<n;y++)for(let x=0;x<n;x++){
    const u=x/n,v=y/n,k=(y*n+x)*4;
    const bed=noise(u,v,4)*.54+noise(u,v,9)*.29+noise(u,v,22)*.17;
    const grains=noise(u,v,31)*.58+noise(u,v,78)*.29+hash(x,y)*.13;
    const fissure=Math.abs(noise(u,v,13)-.52);
    data[k]=255*bed;data[k+1]=255*(grains*.7+Math.min(1,fissure*9)*.3);
    data[k+2]=255*(noise(u,v,58)*.76+hash(x,y)*.24);data[k+3]=255;
  }
  texture=new T.DataTexture(data,n,n);
  texture.wrapS=texture.wrapT=T.RepeatWrapping;texture.generateMipmaps=true;
  texture.minFilter=T.LinearMipmapLinearFilter;texture.magFilter=T.LinearFilter;texture.anisotropy=4;
  texture.needsUpdate=true;return texture;
}

export function shadeSoil(shader,uniforms){
  shader.uniforms.trackTexture=uniforms.trackTexture??{value:null};shader.uniforms.trackRegion=uniforms.trackRegion??{value:new T.Vector3()};
  shader.uniforms.catchmentMap=uniforms.catchmentMap;shader.uniforms.catchmentArea=uniforms.catchmentArea;
  shader.uniforms.soilNoise={value:soilTexture()};shader.uniforms.rainOnSoil=uniforms.rain;
  shader.uniforms.soilSky=uniforms.waterFog;shader.uniforms.soilTime=uniforms.clock;shader.uniforms.soilWater=this.userData.watered??{value:0};
  shader.vertexShader='attribute float soilReserve; varying float retainedWater;\n'+shader.vertexShader
    .replace('#include <begin_vertex>','#include <begin_vertex>\n retainedWater=soilReserve;');
  shader.fragmentShader='varying float retainedWater; uniform sampler2D soilNoise,trackTexture,catchmentMap; uniform vec4 catchmentArea; uniform vec3 trackRegion; uniform vec3 soilSky; uniform float soilWater,soilTime,rainOnSoil;\n'+shader.fragmentShader;
  shader.fragmentShader=shader.fragmentShader.replace('#include <roughnessmap_fragment>',`
    vec2 soilXZ=weatherPosition.xz;
    vec3 drainage=texture2D(soilNoise,soilXZ*.119).rgb;
    vec2 shear=mat2(.81,-.59,.59,.81)*soilXZ;
    float basin=.68*drainage.r+.32*texture2D(soilNoise,shear*.037).r;
    vec3 grain=texture2D(soilNoise,shear*.62+drainage.rg*.15).rgb;
    vec2 trackUv=(soilXZ-trackRegion.xy)*trackRegion.z;
    float border=max(abs(trackUv.x-.5),abs(trackUv.y-.5));
    vec2 imprint=texture2D(trackTexture,trackUv).rg*(1.-smoothstep(.45,.50,border))*step(.0001,trackRegion.z)*(1.-snow);
    vec4 surfaceWater=texture2D(catchmentMap,(soilXZ-catchmentArea.xy)*catchmentArea.zw);
    vec2 runoffVelocity=(surfaceWater.gb-.5)*4.;
    float flowing=smoothstep(.02,.55,length(runoffVelocity))*smoothstep(.004,.085,surfaceWater.r);
    // Wet threads follow the downhill flux across the ground between pools.
    vec2 runoffDir=runoffVelocity/max(.04,length(runoffVelocity));
    float thread=texture2D(soilNoise,vec2(dot(soilXZ,vec2(-runoffDir.y,runoffDir.x))*.32,dot(soilXZ,runoffDir)*.047-soilTime*.037)).g;
    float rivulet=flowing*smoothstep(.44,.63,thread);
    float supply=max(.65*wetGround+.35*surfaceWater.a,max(soilWater,retainedWater));
    float mud=smoothstep(.10,.56,supply+.45-basin)*smoothstep(.07,.46,supply)*(1.-snow);
    float waterline=.19+.285*supply+.07*(grain.g-.5);
    float film=(1.-smoothstep(waterline-.07,waterline+.03,basin))*smoothstep(.53,.85,supply)*smoothstep(.89,.995,upward)*mud;
    // Mottled exposed earth, fine aggregate and broken clod faces persist in dry weather.
    float clod=smoothstep(.26,.66,grain.g);
    float pebble=smoothstep(.68,.84,grain.b)*smoothstep(.39,.54,grain.g);
    diffuseColor.rgb*=mix(1.,.70+.37*clod+.24*drainage.r,1.-snow);
    diffuseColor.rgb+=vec3(.048,.036,.023)*pebble*(1.-mud)*(1.-snow);
    film=max(film*.26,rivulet*.90*(1.-snow));
    vec3 earth=mix(vec3(.123,.078,.043),vec3(.047,.032,.020),supply);
    earth*=.55+.66*grain.g+.36*(drainage.r-.5);
    earth+=vec3(.06,.044,.028)*smoothstep(.60,.84,grain.b)*(1.-film);
    diffuseColor.rgb=mix(diffuseColor.rgb,earth,mud*(.53+.44*supply));
    diffuseColor.rgb=mix(diffuseColor.rgb,vec3(.033,.030,.022)*(.81+.36*basin),film*.80);
    diffuseColor.rgb*=1.-imprint.x*(.28+.21*supply);
    diffuseColor.rgb+=vec3(.030,.019,.011)*imprint.y;
    #include <roughnessmap_fragment>
    roughnessFactor=mix(roughnessFactor,.78-.29*supply+.12*(grain.b-.5),mud);
    roughnessFactor=mix(roughnessFactor,.26+.08*grain.r,film);
    roughnessFactor=mix(roughnessFactor,.29+.12*grain.r,imprint.x*supply);
  `).replace('#include <normal_fragment_maps>',`#include <normal_fragment_maps>
    vec3 face=normalize(cross(dFdx(-vViewPosition),dFdy(-vViewPosition)));
    normal=normalize(mix(normal,face,film*.94));
    vec2 cell=floor(soilXZ*3.2);
    vec2 offset=texture2D(soilNoise,(cell+.5)/57.).gb;
    float dist=length(fract(soilXZ*3.2)-.25-offset*.5);
    float age=fract(soilTime*.95+offset.x*9.);
    float crest=(dist-age*.58);
    float ripple=exp(-350.*crest*crest)*sin(crest*73.)*(1.-age)*smoothstep(.12,.42,rainOnSoil);
    float dryRelief=((clod-.5)*.013+pebble*.009+(drainage.r-.5)*.036)*(1.-mud)*(1.-snow);
    float relief=dryRelief+mud*((grain.g-.5)*.013+(.5-basin)*.042)*(1.-film)+ripple*.0012*film-imprint.x*.015+imprint.y*.005;
    vec3 dx=dFdx(-vViewPosition),dy=dFdy(-vViewPosition);
    vec3 rx=cross(dy,normal),ry=cross(normal,dx);
    float det=dot(dx,rx);
    vec3 slope=(rx*dFdx(relief)+ry*dFdy(relief))*sign(det)/max(abs(det),.0000001);
    normal=normalize(normal-slope/max(length(slope),1.));
  `).replace('#include <lights_fragment_maps>',`#include <lights_fragment_maps>
    #if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
      radiance=mix(radiance,soilSky*(.75+.55*upward),film*.86);
    #endif
  `);
}
