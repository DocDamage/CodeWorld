import * as T from 'three';

// Tileable, band-limited density and billow detail. Mipmaps keep distant banks
// of cloud from shimmering at the horizon and during lake reflection captures.
function cloudTexture(){
  const size=256,data=new Uint8Array(size*size*4);
  function lattice(x,y){
    let h=Math.imul(x+39,374761393)+Math.imul(y+31,668265263);
    h=Math.imul(h^(h>>>13),1274126177);
    return ((h^(h>>>16))>>>0)/4294967296;
  }
  function sample(x,y,frequency){
    const u=x*frequency/size,v=y*frequency/size,i=Math.floor(u),j=Math.floor(v);
    const tx=u-i,ty=v-j,s=tx*tx*(3-2*tx),t=ty*ty*(3-2*ty);
    const at=(a,b)=>lattice(a%frequency,b%frequency);
    return (1-t)*((1-s)*at(i,j)+s*at(i+1,j))+t*((1-s)*at(i,j+1)+s*at(i+1,j+1));
  }
  for(let y=0;y<size;y++)for(let x=0;x<size;x++){
    const p=(y*size+x)*4;
    const a=sample(x,y,6),b=sample(x,y,12),c=sample(x,y,24),d=sample(x,y,48),e=sample(x,y,96);
    data[p]=255*(.53*a+.26*b+.13*c+.06*d+.02*e);
    data[p+1]=255*(.49*b+.28*c+.15*d+.08*e);
    data[p+2]=255*(.60*c+.27*d+.13*e);data[p+3]=255;
  }
  const map=new T.DataTexture(data,size,size);
  map.magFilter=T.LinearFilter;map.minFilter=T.LinearMipMapLinearFilter;map.generateMipmaps=true;
  map.wrapS=map.wrapT=T.RepeatWrapping;map.needsUpdate=true;return map;
}

export function buildSky(uniforms){
  uniforms.cloudField={value:cloudTexture()};
  uniforms.solarDirection={value:new T.Vector3()};
  const sky=new T.Mesh(new T.SphereGeometry(190,32,20),new T.ShaderMaterial({
    side:T.BackSide,depthWrite:false,uniforms,
    vertexShader:`varying vec3 dir;void main(){
      dir=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);
      gl_Position.z=gl_Position.w;
    }`,
    fragmentShader:`
      varying vec3 dir;uniform sampler2D cloudField,noiseMap;
      uniform vec2 cloudOffset;uniform vec3 dayTop,dayLow,solarDirection,waterFog;
      uniform float clock,cloud,night,dusk,flash,rain;
      float density(vec2 uv,vec2 evolve){
        vec3 n=texture2D(cloudField,uv).rgb;
        vec2 curl=n.gb-.5;
        return .73*n.r+.27*texture2D(cloudField,uv*1.83+.072*curl-evolve).g;
      }
      void main(){
        vec3 ray=normalize(dir);float h=max(.0,ray.y);
        vec3 sun=normalize(solarDirection),moon=-sun;
        float sunlight=smoothstep(-.12,.16,sun.y);
        float mu=max(dot(ray,sun),0.),luna=max(dot(ray,moon),0.);
        vec3 glow=mix(vec3(1.,.86,.63),vec3(1.,.43,.19),dusk);
        vec3 zenith=mix(dayTop,vec3(.085,.17,.30),dusk);
        vec3 horizon=mix(dayLow,vec3(.79,.44,.28),dusk*(.32+.65*mu));
        vec3 col=mix(horizon,zenith,1.-exp(-max(h,0.)*3.4));
        col=mix(col,mix(vec3(.040,.057,.090),vec3(.004,.010,.028),smoothstep(.0,.65,h)),night);
        col+=glow*sunlight*(.18*pow(mu,8.)+.45*pow(mu,120.)+3.0*smoothstep(.999967,.999991,mu));
        col+=vec3(.61,.73,.87)*night*(smoothstep(.99994,.99998,luna)+.19*pow(luna,115.));
        vec2 star=vec2(atan(ray.z,ray.x),asin(clamp(ray.y,-1.,1.)))*280.;
        col+=night*step(.985,texture2D(noiseMap,(floor(star)+.5)/256.).r)*
          (1.-smoothstep(.035,.25,length(fract(star)-.5)))*smoothstep(.0,.17,h)*.65;

        // Intersect a curved cloud deck. Three heights give parallax between
        // the base, the illuminated crowns and gaps through to high cirrus.
        vec2 plane=ray.xz*(.54/(h+sqrt(h*h+.025)));
        vec2 viewer=cameraPosition.xz*.00015,windUV=cloudOffset*.014;
        vec2 evolve=vec2(clock*.00019,-clock*.00011);
        vec2 ice=(plane*vec2(.64,2.75)+windUV*1.62+viewer*.4);
        float cirrus=smoothstep(.50,.71,texture2D(cloudField,ice).r+
          .09*texture2D(cloudField,ice*2.8+evolve).b)*(.18+.19*cloud)*smoothstep(.0,.17,h);
        col=mix(col,mix(vec3(.82,.85,.87),vec3(.09,.12,.16),night),cirrus);
        vec3 lightDir=sunlight>.35?sun:moon;
        vec3 shade=mix(vec3(.38,.46,.54),vec3(.19,.235,.28),cloud*.72+rain*.27);
        vec3 top=mix(vec3(.94,.96,.95),vec3(.69,.72,.73),cloud*.64+rain*.32);
        top=mix(top,glow,dusk*.66);shade=mix(shade,vec3(.25,.225,.25),dusk*.6);
        top=mix(top,vec3(.078,.098,.14),night);shade=mix(shade,vec3(.018,.028,.046),night);
        for(int i=2;i>=0;i--){
          float layer=float(i)*.5;
          vec2 uv=plane*(1.+.23*layer)+viewer+windUV*(1.+.13*layer)+vec2(.24,.17);
          float value=density(uv,evolve);
          float threshold=.613-.288*cloud+.060*layer;
          float mass=smoothstep(threshold,threshold+.14,value);
          float toward=density(uv+lightDir.xz*.035,evolve);
          float lighting=clamp(.62+2.8*(value-toward)+.27*layer-.42*mass*(1.-layer),0.,1.);
          vec3 lit=mix(shade,top,lighting);
          lit+=glow*(1.-night)*pow(mu,12.)*(1.-mass)*.40;
          float opacity=1.-exp(-mass*(1.15+.7*cloud)/max(.44,h+.2));
          col=mix(col,lit,opacity*smoothstep(-.025,.1,h));
        }
        col=mix(waterFog,col,smoothstep(-.03,.13,ray.y));
        col+=vec3(.57,.68,.85)*flash*.57;
        gl_FragColor=vec4(col,1.);
        #include <colorspace_fragment>
      }`
  }));
  // Draw after opaque terrain at far depth so hidden sky pixels skip cloud shading.
  sky.name='Thornmere sky';sky.frustumCulled=false;sky.renderOrder=100;return sky;
}
