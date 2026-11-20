(()=>{var qi={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},Yi={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Su=0,Bc=1,bu=2;var zc=1,Ha=2,_i=3,Ci=0,sn=1,rn=2,Ri=0,us=1,fr=2,kc=3,Vc=4,Tu=5,ki=100,wu=101,Eu=102,Au=103,Cu=104,Ru=200,Pu=201,Iu=202,Du=203,da=204,fa=205,Lu=206,Uu=207,Nu=208,Fu=209,Ou=210,Bu=211,zu=212,ku=213,Vu=214,Ga=0,Wa=1,Xa=2,ds=3,qa=4,Ya=5,Za=6,Ja=7,Hc=0,Hu=1,Gu=2,Pi=0,Wu=1,Xu=2,qu=3,Yu=4,Zu=5,Ju=6,Ku=7;var Gc=300,Ts=301,ws=302,Ka=303,$a=304,Mo=306,si=1e3,zi=1001,pa=1002,Tn=1003,$u=1004;var So=1005;var Nn=1006,ja=1007;var Zi=1008;var ri=1009,Wc=1010,Xc=1011,pr=1012,Qa=1013,Ji=1014,oi=1015,mr=1016,tl=1017,el=1018,gr=1020,qc=35902,Yc=35899,Zc=1021,Jc=1022,Kn=1023,tr=1026,_r=1027,xr=1028,nl=1029,Kc=1030,il=1031;var sl=1033,bo=33776,To=33777,wo=33778,Eo=33779,rl=35840,ol=35841,al=35842,ll=35843,cl=36196,hl=37492,ul=37496,dl=37808,fl=37809,pl=37810,ml=37811,gl=37812,_l=37813,xl=37814,yl=37815,vl=37816,Ml=37817,Sl=37818,bl=37819,Tl=37820,wl=37821,El=36492,Al=36494,Cl=36495,Rl=36283,Pl=36284,Il=36285,Dl=36286;var Hr=2300,ma=2301,ua=2302,Tc=2400,wc=2401,Ec=2402;var ju=3200,Qu=3201;var $c=0,td=1,Ii="",Ce="srgb",fs="srgb-linear",Gr="linear",_e="srgb";var cs=7680;var Ac=519,ed=512,nd=513,id=514,jc=515,sd=516,rd=517,od=518,ad=519,Cc=35044;var Qc="300 es",ii=2e3,Wr=2001;var di=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){let i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){let i=this._listeners;if(i===void 0)return;let s=i[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let i=e[t.type];if(i!==void 0){t.target=this;let s=i.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}},ln=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Gh=1234567,Br=Math.PI/180,ps=180/Math.PI;function Es(){let n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(ln[n&255]+ln[n>>8&255]+ln[n>>16&255]+ln[n>>24&255]+"-"+ln[t&255]+ln[t>>8&255]+"-"+ln[t>>16&15|64]+ln[t>>24&255]+"-"+ln[e&63|128]+ln[e>>8&255]+"-"+ln[e>>16&255]+ln[e>>24&255]+ln[i&255]+ln[i>>8&255]+ln[i>>16&255]+ln[i>>24&255]).toLowerCase()}function Qt(n,t,e){return Math.max(t,Math.min(e,n))}function th(n,t){return(n%t+t)%t}function Lf(n,t,e,i,s){return i+(n-t)*(s-i)/(e-t)}function Uf(n,t,e){return n!==t?(e-n)/(t-n):0}function zr(n,t,e){return(1-e)*n+e*t}function Nf(n,t,e,i){return zr(n,t,1-Math.exp(-e*i))}function Ff(n,t=1){return t-Math.abs(th(n,t*2)-t)}function Of(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*(3-2*n))}function Bf(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*n*(n*(n*6-15)+10))}function zf(n,t){return n+Math.floor(Math.random()*(t-n+1))}function kf(n,t){return n+Math.random()*(t-n)}function Vf(n){return n*(.5-Math.random())}function Hf(n){n!==void 0&&(Gh=n);let t=Gh+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Gf(n){return n*Br}function Wf(n){return n*ps}function Xf(n){return(n&n-1)===0&&n!==0}function qf(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function Yf(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function Zf(n,t,e,i,s){let r=Math.cos,o=Math.sin,a=r(e/2),l=o(e/2),c=r((t+i)/2),h=o((t+i)/2),d=r((t-i)/2),u=o((t-i)/2),f=r((i-t)/2),g=o((i-t)/2);switch(s){case"XYX":n.set(a*h,l*d,l*u,a*c);break;case"YZY":n.set(l*u,a*h,l*d,a*c);break;case"ZXZ":n.set(l*d,l*u,a*h,a*c);break;case"XZX":n.set(a*h,l*g,l*f,a*c);break;case"YXY":n.set(l*f,a*h,l*g,a*c);break;case"ZYZ":n.set(l*g,l*f,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function js(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function pn(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}var xi={DEG2RAD:Br,RAD2DEG:ps,generateUUID:Es,clamp:Qt,euclideanModulo:th,mapLinear:Lf,inverseLerp:Uf,lerp:zr,damp:Nf,pingpong:Ff,smoothstep:Of,smootherstep:Bf,randInt:zf,randFloat:kf,randFloatSpread:Vf,seededRandom:Hf,degToRad:Gf,radToDeg:Wf,isPowerOfTwo:Xf,ceilPowerOfTwo:qf,floorPowerOfTwo:Yf,setQuaternionFromProperEuler:Zf,normalize:pn,denormalize:js},rt=class n{constructor(t=0,e=0){n.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Qt(this.x,t.x,e.x),this.y=Qt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Qt(this.x,t,e),this.y=Qt(this.y,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Qt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(Qt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let i=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*i-o*s+t.x,this.y=r*s+o*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},ke=class{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,r,o,a){let l=i[s+0],c=i[s+1],h=i[s+2],d=i[s+3],u=r[o+0],f=r[o+1],g=r[o+2],_=r[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d;return}if(a===1){t[e+0]=u,t[e+1]=f,t[e+2]=g,t[e+3]=_;return}if(d!==_||l!==u||c!==f||h!==g){let m=1-a,p=l*u+c*f+h*g+d*_,M=p>=0?1:-1,v=1-p*p;if(v>Number.EPSILON){let A=Math.sqrt(v),E=Math.atan2(A,p*M);m=Math.sin(m*E)/A,a=Math.sin(a*E)/A}let x=a*M;if(l=l*m+u*x,c=c*m+f*x,h=h*m+g*x,d=d*m+_*x,m===1-a){let A=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=A,c*=A,h*=A,d*=A}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d}static multiplyQuaternionsFlat(t,e,i,s,r,o){let a=i[s],l=i[s+1],c=i[s+2],h=i[s+3],d=r[o],u=r[o+1],f=r[o+2],g=r[o+3];return t[e]=a*g+h*d+l*f-c*u,t[e+1]=l*g+h*u+c*d-a*f,t[e+2]=c*g+h*f+a*u-l*d,t[e+3]=h*g-a*d-l*u-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let i=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(i/2),h=a(s/2),d=a(r/2),u=l(i/2),f=l(s/2),g=l(r/2);switch(o){case"XYZ":this._x=u*h*d+c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d-u*f*g;break;case"YXZ":this._x=u*h*d+c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d+u*f*g;break;case"ZXY":this._x=u*h*d-c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d-u*f*g;break;case"ZYX":this._x=u*h*d-c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d+u*f*g;break;case"YZX":this._x=u*h*d+c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d-u*f*g;break;case"XZY":this._x=u*h*d-c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d+u*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,i=e[0],s=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],h=e[6],d=e[10],u=i+a+d;if(u>0){let f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(o-s)*f}else if(i>a&&i>d){let f=2*Math.sqrt(1+i-a-d);this._w=(h-l)/f,this._x=.25*f,this._y=(s+o)/f,this._z=(r+c)/f}else if(a>d){let f=2*Math.sqrt(1+a-i-d);this._w=(r-c)/f,this._x=(s+o)/f,this._y=.25*f,this._z=(l+h)/f}else{let f=2*Math.sqrt(1+d-i-a);this._w=(o-s)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Qt(this.dot(t),-1,1)))}rotateTowards(t,e){let i=this.angleTo(t);if(i===0)return this;let s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let i=t._x,s=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=i*h+o*a+s*c-r*l,this._y=s*h+o*l+r*a-i*c,this._z=r*h+o*c+i*l-s*a,this._w=o*h-i*a-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let i=this._x,s=this._y,r=this._z,o=this._w,a=o*t._w+i*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=i,this._y=s,this._z=r,this;let l=1-a*a;if(l<=Number.EPSILON){let f=1-e;return this._w=f*o+e*this._w,this._x=f*i+e*this._x,this._y=f*s+e*this._y,this._z=f*r+e*this._z,this.normalize(),this}let c=Math.sqrt(l),h=Math.atan2(c,a),d=Math.sin((1-e)*h)/c,u=Math.sin(e*h)/c;return this._w=o*d+this._w*u,this._x=i*d+this._x*u,this._y=s*d+this._y*u,this._z=r*d+this._z*u,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},P=class n{constructor(t=0,e=0,i=0){n.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Wh.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Wh.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*s,this.y=r[1]*e+r[4]*i+r[7]*s,this.z=r[2]*e+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,i=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*i+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*i+r[10]*s+r[14])*o,this}applyQuaternion(t){let e=this.x,i=this.y,s=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*s-a*i),h=2*(a*e-r*s),d=2*(r*i-o*e);return this.x=e+l*c+o*d-a*h,this.y=i+l*h+a*c-r*d,this.z=s+l*d+r*h-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s,this.y=r[1]*e+r[5]*i+r[9]*s,this.z=r[2]*e+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Qt(this.x,t.x,e.x),this.y=Qt(this.y,t.y,e.y),this.z=Qt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Qt(this.x,t,e),this.y=Qt(this.y,t,e),this.z=Qt(this.z,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Qt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let i=t.x,s=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=s*l-r*a,this.y=r*o-i*l,this.z=i*a-s*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return $l.copy(this).projectOnVector(t),this.sub($l)}reflect(t){return this.sub($l.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(Qt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){let s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},$l=new P,Wh=new ke,$t=class n{constructor(t,e,i,s,r,o,a,l,c){n.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,l,c)}set(t,e,i,s,r,o,a,l,c){let h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=l,h[6]=i,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],h=i[4],d=i[7],u=i[2],f=i[5],g=i[8],_=s[0],m=s[3],p=s[6],M=s[1],v=s[4],x=s[7],A=s[2],E=s[5],R=s[8];return r[0]=o*_+a*M+l*A,r[3]=o*m+a*v+l*E,r[6]=o*p+a*x+l*R,r[1]=c*_+h*M+d*A,r[4]=c*m+h*v+d*E,r[7]=c*p+h*x+d*R,r[2]=u*_+f*M+g*A,r[5]=u*m+f*v+g*E,r[8]=u*p+f*x+g*R,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*o*h-e*a*c-i*r*h+i*a*l+s*r*c-s*o*l}invert(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],d=h*o-a*c,u=a*l-h*r,f=c*r-o*l,g=e*d+i*u+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/g;return t[0]=d*_,t[1]=(s*c-h*i)*_,t[2]=(a*i-s*o)*_,t[3]=u*_,t[4]=(h*e-s*l)*_,t[5]=(s*r-a*e)*_,t[6]=f*_,t[7]=(i*l-c*e)*_,t[8]=(o*e-i*r)*_,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,r,o,a){let l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*o+c*a)+o+t,-s*c,s*l,-s*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(jl.makeScale(t,e)),this}rotate(t){return this.premultiply(jl.makeRotation(-t)),this}translate(t,e){return this.premultiply(jl.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}},jl=new $t;function eh(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function Xr(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function ld(){let n=Xr("canvas");return n.style.display="block",n}var Xh={};function er(n){n in Xh||(Xh[n]=!0,console.warn(n))}function cd(n,t,e){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:i()}}setTimeout(r,e)})}var qh=new $t().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Yh=new $t().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Jf(){let n={enabled:!0,workingColorSpace:fs,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===_e&&(s.r=Ai(s.r),s.g=Ai(s.g),s.b=Ai(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===_e&&(s.r=Qs(s.r),s.g=Qs(s.g),s.b=Qs(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Ii?Gr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return er("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return er("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[fs]:{primaries:t,whitePoint:i,transfer:Gr,toXYZ:qh,fromXYZ:Yh,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Ce},outputColorSpaceConfig:{drawingBufferColorSpace:Ce}},[Ce]:{primaries:t,whitePoint:i,transfer:_e,toXYZ:qh,fromXYZ:Yh,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Ce}}}),n}var he=Jf();function Ai(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Qs(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var zs,ga=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{zs===void 0&&(zs=Xr("canvas")),zs.width=t.width,zs.height=t.height;let s=zs.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),i=zs}return i.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=Xr("canvas");e.width=t.width,e.height=t.height;let i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);let s=i.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Ai(r[o]/255)*255;return i.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(Ai(e[i]/255)*255):e[i]=Ai(e[i]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},Kf=0,nr=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Kf++}),this.uuid=Es(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):e instanceof VideoFrame?t.set(e.displayHeight,e.displayWidth,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Ql(s[o].image)):r.push(Ql(s[o]))}else r=Ql(s);i.url=r}return e||(t.images[this.uuid]=i),i}};function Ql(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?ga.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var $f=0,tc=new P,mn=class n extends di{constructor(t=n.DEFAULT_IMAGE,e=n.DEFAULT_MAPPING,i=zi,s=zi,r=Nn,o=Zi,a=Kn,l=ri,c=n.DEFAULT_ANISOTROPY,h=Ii){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:$f++}),this.uuid=Es(),this.name="",this.source=new nr(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new rt(0,0),this.repeat=new rt(1,1),this.center=new rt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new $t,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(tc).x}get height(){return this.source.getSize(tc).y}get depth(){return this.source.getSize(tc).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let i=t[e];if(i===void 0){console.warn(`THREE.Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${e}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[e]=i}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Gc)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case si:t.x=t.x-Math.floor(t.x);break;case zi:t.x=t.x<0?0:1;break;case pa:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case si:t.y=t.y-Math.floor(t.y);break;case zi:t.y=t.y<0?0:1;break;case pa:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};mn.DEFAULT_IMAGE=null;mn.DEFAULT_MAPPING=Gc;mn.DEFAULT_ANISOTROPY=1;var ge=class n{constructor(t=0,e=0,i=0,s=1){n.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,i=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*i+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*i+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*i+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*i+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,r,l=t.elements,c=l[0],h=l[4],d=l[8],u=l[1],f=l[5],g=l[9],_=l[2],m=l[6],p=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let v=(c+1)/2,x=(f+1)/2,A=(p+1)/2,E=(h+u)/4,R=(d+_)/4,D=(g+m)/4;return v>x&&v>A?v<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(v),s=E/i,r=R/i):x>A?x<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(x),i=E/s,r=D/s):A<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(A),i=R/r,s=D/r),this.set(i,s,r,e),this}let M=Math.sqrt((m-g)*(m-g)+(d-_)*(d-_)+(u-h)*(u-h));return Math.abs(M)<.001&&(M=1),this.x=(m-g)/M,this.y=(d-_)/M,this.z=(u-h)/M,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Qt(this.x,t.x,e.x),this.y=Qt(this.y,t.y,e.y),this.z=Qt(this.z,t.z,e.z),this.w=Qt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Qt(this.x,t,e),this.y=Qt(this.y,t,e),this.z=Qt(this.z,t,e),this.w=Qt(this.w,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Qt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},_a=class extends di{constructor(t=1,e=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Nn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=i.depth,this.scissor=new ge(0,0,t,e),this.scissorTest=!1,this.viewport=new ge(0,0,t,e);let s={width:t,height:e,depth:i.depth},r=new mn(s);this.textures=[];let o=i.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(t={}){let e={minFilter:Nn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=i,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,i=t.textures.length;e<i;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let s=Object.assign({},t.textures[e].image);this.textures[e].source=new nr(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Zn=class extends _a{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}},qr=class extends mn{constructor(t=null,e=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Tn,this.minFilter=Tn,this.wrapR=zi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var xa=class extends mn{constructor(t=null,e=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Tn,this.minFilter=Tn,this.wrapR=zi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var fi=class{constructor(t=new P(1/0,1/0,1/0),e=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(ti.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(ti.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let i=ti.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let i=t.geometry;if(i!==void 0){let r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,ti):ti.fromBufferAttribute(r,o),ti.applyMatrix4(t.matrixWorld),this.expandByPoint(ti);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),zo.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),zo.copy(i.boundingBox)),zo.applyMatrix4(t.matrixWorld),this.union(zo)}let s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,ti),ti.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Rr),ko.subVectors(this.max,Rr),ks.subVectors(t.a,Rr),Vs.subVectors(t.b,Rr),Hs.subVectors(t.c,Rr),Di.subVectors(Vs,ks),Li.subVectors(Hs,Vs),rs.subVectors(ks,Hs);let e=[0,-Di.z,Di.y,0,-Li.z,Li.y,0,-rs.z,rs.y,Di.z,0,-Di.x,Li.z,0,-Li.x,rs.z,0,-rs.x,-Di.y,Di.x,0,-Li.y,Li.x,0,-rs.y,rs.x,0];return!ec(e,ks,Vs,Hs,ko)||(e=[1,0,0,0,1,0,0,0,1],!ec(e,ks,Vs,Hs,ko))?!1:(Vo.crossVectors(Di,Li),e=[Vo.x,Vo.y,Vo.z],ec(e,ks,Vs,Hs,ko))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,ti).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(ti).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Si[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Si[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Si[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Si[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Si[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Si[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Si[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Si[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Si),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},Si=[new P,new P,new P,new P,new P,new P,new P,new P],ti=new P,zo=new fi,ks=new P,Vs=new P,Hs=new P,Di=new P,Li=new P,rs=new P,Rr=new P,ko=new P,Vo=new P,os=new P;function ec(n,t,e,i,s){for(let r=0,o=n.length-3;r<=o;r+=3){os.fromArray(n,r);let a=s.x*Math.abs(os.x)+s.y*Math.abs(os.y)+s.z*Math.abs(os.z),l=t.dot(os),c=e.dot(os),h=i.dot(os);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}var jf=new fi,Pr=new P,nc=new P,pi=class{constructor(t=new P,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let i=this.center;e!==void 0?i.copy(e):jf.setFromPoints(t).getCenter(i);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Pr.subVectors(t,this.center);let e=Pr.lengthSq();if(e>this.radius*this.radius){let i=Math.sqrt(e),s=(i-this.radius)*.5;this.center.addScaledVector(Pr,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(nc.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Pr.copy(t.center).add(nc)),this.expandByPoint(Pr.copy(t.center).sub(nc))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},bi=new P,ic=new P,Ho=new P,Ui=new P,sc=new P,Go=new P,rc=new P,Vi=class{constructor(t=new P,e=new P(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,bi)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=bi.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(bi.copy(this.origin).addScaledVector(this.direction,e),bi.distanceToSquared(t))}distanceSqToSegment(t,e,i,s){ic.copy(t).add(e).multiplyScalar(.5),Ho.copy(e).sub(t).normalize(),Ui.copy(this.origin).sub(ic);let r=t.distanceTo(e)*.5,o=-this.direction.dot(Ho),a=Ui.dot(this.direction),l=-Ui.dot(Ho),c=Ui.lengthSq(),h=Math.abs(1-o*o),d,u,f,g;if(h>0)if(d=o*l-a,u=o*a-l,g=r*h,d>=0)if(u>=-g)if(u<=g){let _=1/h;d*=_,u*=_,f=d*(d+o*u+2*a)+u*(o*d+u+2*l)+c}else u=r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*l)+c;else u=-r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*l)+c;else u<=-g?(d=Math.max(0,-(-o*r+a)),u=d>0?-r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c):u<=g?(d=0,u=Math.min(Math.max(-r,-l),r),f=u*(u+2*l)+c):(d=Math.max(0,-(o*r+a)),u=d>0?r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c);else u=o>0?-r:r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(ic).addScaledVector(Ho,u),f}intersectSphere(t,e){bi.subVectors(t.center,this.origin);let i=bi.dot(this.direction),s=bi.dot(bi)-i*i,r=t.radius*t.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){let i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,s,r,o,a,l,c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(i=(t.min.x-u.x)*c,s=(t.max.x-u.x)*c):(i=(t.max.x-u.x)*c,s=(t.min.x-u.x)*c),h>=0?(r=(t.min.y-u.y)*h,o=(t.max.y-u.y)*h):(r=(t.max.y-u.y)*h,o=(t.min.y-u.y)*h),i>o||r>s||((r>i||isNaN(i))&&(i=r),(o<s||isNaN(s))&&(s=o),d>=0?(a=(t.min.z-u.z)*d,l=(t.max.z-u.z)*d):(a=(t.max.z-u.z)*d,l=(t.min.z-u.z)*d),i>l||a>s)||((a>i||i!==i)&&(i=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,e)}intersectsBox(t){return this.intersectBox(t,bi)!==null}intersectTriangle(t,e,i,s,r){sc.subVectors(e,t),Go.subVectors(i,t),rc.crossVectors(sc,Go);let o=this.direction.dot(rc),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Ui.subVectors(this.origin,t);let l=a*this.direction.dot(Go.crossVectors(Ui,Go));if(l<0)return null;let c=a*this.direction.dot(sc.cross(Ui));if(c<0||l+c>o)return null;let h=-a*Ui.dot(rc);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},ne=class n{constructor(t,e,i,s,r,o,a,l,c,h,d,u,f,g,_,m){n.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,l,c,h,d,u,f,g,_,m)}set(t,e,i,s,r,o,a,l,c,h,d,u,f,g,_,m){let p=this.elements;return p[0]=t,p[4]=e,p[8]=i,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=h,p[10]=d,p[14]=u,p[3]=f,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new n().fromArray(this.elements)}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){let e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,i=t.elements,s=1/Gs.setFromMatrixColumn(t,0).length(),r=1/Gs.setFromMatrixColumn(t,1).length(),o=1/Gs.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*o,e[9]=i[9]*o,e[10]=i[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,i=t.x,s=t.y,r=t.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){let u=o*h,f=o*d,g=a*h,_=a*d;e[0]=l*h,e[4]=-l*d,e[8]=c,e[1]=f+g*c,e[5]=u-_*c,e[9]=-a*l,e[2]=_-u*c,e[6]=g+f*c,e[10]=o*l}else if(t.order==="YXZ"){let u=l*h,f=l*d,g=c*h,_=c*d;e[0]=u+_*a,e[4]=g*a-f,e[8]=o*c,e[1]=o*d,e[5]=o*h,e[9]=-a,e[2]=f*a-g,e[6]=_+u*a,e[10]=o*l}else if(t.order==="ZXY"){let u=l*h,f=l*d,g=c*h,_=c*d;e[0]=u-_*a,e[4]=-o*d,e[8]=g+f*a,e[1]=f+g*a,e[5]=o*h,e[9]=_-u*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){let u=o*h,f=o*d,g=a*h,_=a*d;e[0]=l*h,e[4]=g*c-f,e[8]=u*c+_,e[1]=l*d,e[5]=_*c+u,e[9]=f*c-g,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){let u=o*l,f=o*c,g=a*l,_=a*c;e[0]=l*h,e[4]=_-u*d,e[8]=g*d+f,e[1]=d,e[5]=o*h,e[9]=-a*h,e[2]=-c*h,e[6]=f*d+g,e[10]=u-_*d}else if(t.order==="XZY"){let u=o*l,f=o*c,g=a*l,_=a*c;e[0]=l*h,e[4]=-d,e[8]=c*h,e[1]=u*d+_,e[5]=o*h,e[9]=f*d-g,e[2]=g*d-f,e[6]=a*h,e[10]=_*d+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Qf,t,tp)}lookAt(t,e,i){let s=this.elements;return Ln.subVectors(t,e),Ln.lengthSq()===0&&(Ln.z=1),Ln.normalize(),Ni.crossVectors(i,Ln),Ni.lengthSq()===0&&(Math.abs(i.z)===1?Ln.x+=1e-4:Ln.z+=1e-4,Ln.normalize(),Ni.crossVectors(i,Ln)),Ni.normalize(),Wo.crossVectors(Ln,Ni),s[0]=Ni.x,s[4]=Wo.x,s[8]=Ln.x,s[1]=Ni.y,s[5]=Wo.y,s[9]=Ln.y,s[2]=Ni.z,s[6]=Wo.z,s[10]=Ln.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],h=i[1],d=i[5],u=i[9],f=i[13],g=i[2],_=i[6],m=i[10],p=i[14],M=i[3],v=i[7],x=i[11],A=i[15],E=s[0],R=s[4],D=s[8],T=s[12],b=s[1],I=s[5],O=s[9],H=s[13],Y=s[2],Z=s[6],G=s[10],it=s[14],W=s[3],mt=s[7],bt=s[11],Ct=s[15];return r[0]=o*E+a*b+l*Y+c*W,r[4]=o*R+a*I+l*Z+c*mt,r[8]=o*D+a*O+l*G+c*bt,r[12]=o*T+a*H+l*it+c*Ct,r[1]=h*E+d*b+u*Y+f*W,r[5]=h*R+d*I+u*Z+f*mt,r[9]=h*D+d*O+u*G+f*bt,r[13]=h*T+d*H+u*it+f*Ct,r[2]=g*E+_*b+m*Y+p*W,r[6]=g*R+_*I+m*Z+p*mt,r[10]=g*D+_*O+m*G+p*bt,r[14]=g*T+_*H+m*it+p*Ct,r[3]=M*E+v*b+x*Y+A*W,r[7]=M*R+v*I+x*Z+A*mt,r[11]=M*D+v*O+x*G+A*bt,r[15]=M*T+v*H+x*it+A*Ct,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[4],s=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],h=t[2],d=t[6],u=t[10],f=t[14],g=t[3],_=t[7],m=t[11],p=t[15];return g*(+r*l*d-s*c*d-r*a*u+i*c*u+s*a*f-i*l*f)+_*(+e*l*f-e*c*u+r*o*u-s*o*f+s*c*h-r*l*h)+m*(+e*c*d-e*a*f-r*o*d+i*o*f+r*a*h-i*c*h)+p*(-s*a*h-e*l*d+e*a*u+s*o*d-i*o*u+i*l*h)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],d=t[9],u=t[10],f=t[11],g=t[12],_=t[13],m=t[14],p=t[15],M=d*m*c-_*u*c+_*l*f-a*m*f-d*l*p+a*u*p,v=g*u*c-h*m*c-g*l*f+o*m*f+h*l*p-o*u*p,x=h*_*c-g*d*c+g*a*f-o*_*f-h*a*p+o*d*p,A=g*d*l-h*_*l-g*a*u+o*_*u+h*a*m-o*d*m,E=e*M+i*v+s*x+r*A;if(E===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let R=1/E;return t[0]=M*R,t[1]=(_*u*r-d*m*r-_*s*f+i*m*f+d*s*p-i*u*p)*R,t[2]=(a*m*r-_*l*r+_*s*c-i*m*c-a*s*p+i*l*p)*R,t[3]=(d*l*r-a*u*r-d*s*c+i*u*c+a*s*f-i*l*f)*R,t[4]=v*R,t[5]=(h*m*r-g*u*r+g*s*f-e*m*f-h*s*p+e*u*p)*R,t[6]=(g*l*r-o*m*r-g*s*c+e*m*c+o*s*p-e*l*p)*R,t[7]=(o*u*r-h*l*r+h*s*c-e*u*c-o*s*f+e*l*f)*R,t[8]=x*R,t[9]=(g*d*r-h*_*r-g*i*f+e*_*f+h*i*p-e*d*p)*R,t[10]=(o*_*r-g*a*r+g*i*c-e*_*c-o*i*p+e*a*p)*R,t[11]=(h*a*r-o*d*r-h*i*c+e*d*c+o*i*f-e*a*f)*R,t[12]=A*R,t[13]=(h*_*s-g*d*s+g*i*u-e*_*u-h*i*m+e*d*m)*R,t[14]=(g*a*s-o*_*s-g*i*l+e*_*l+o*i*m-e*a*m)*R,t[15]=(o*d*s-h*a*s+h*i*l-e*d*l-o*i*u+e*a*u)*R,this}scale(t){let e=this.elements,i=t.x,s=t.y,r=t.z;return e[0]*=i,e[4]*=s,e[8]*=r,e[1]*=i,e[5]*=s,e[9]*=r,e[2]*=i,e[6]*=s,e[10]*=r,e[3]*=i,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let i=Math.cos(e),s=Math.sin(e),r=1-i,o=t.x,a=t.y,l=t.z,c=r*o,h=r*a;return this.set(c*o+i,c*a-s*l,c*l+s*a,0,c*a+s*l,h*a+i,h*l-s*o,0,c*l-s*a,h*l+s*o,r*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,r,o){return this.set(1,i,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){let s=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,h=o+o,d=a+a,u=r*c,f=r*h,g=r*d,_=o*h,m=o*d,p=a*d,M=l*c,v=l*h,x=l*d,A=i.x,E=i.y,R=i.z;return s[0]=(1-(_+p))*A,s[1]=(f+x)*A,s[2]=(g-v)*A,s[3]=0,s[4]=(f-x)*E,s[5]=(1-(u+p))*E,s[6]=(m+M)*E,s[7]=0,s[8]=(g+v)*R,s[9]=(m-M)*R,s[10]=(1-(u+_))*R,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){let s=this.elements,r=Gs.set(s[0],s[1],s[2]).length(),o=Gs.set(s[4],s[5],s[6]).length(),a=Gs.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],ei.copy(this);let c=1/r,h=1/o,d=1/a;return ei.elements[0]*=c,ei.elements[1]*=c,ei.elements[2]*=c,ei.elements[4]*=h,ei.elements[5]*=h,ei.elements[6]*=h,ei.elements[8]*=d,ei.elements[9]*=d,ei.elements[10]*=d,e.setFromRotationMatrix(ei),i.x=r,i.y=o,i.z=a,this}makePerspective(t,e,i,s,r,o,a=ii,l=!1){let c=this.elements,h=2*r/(e-t),d=2*r/(i-s),u=(e+t)/(e-t),f=(i+s)/(i-s),g,_;if(l)g=r/(o-r),_=o*r/(o-r);else if(a===ii)g=-(o+r)/(o-r),_=-2*o*r/(o-r);else if(a===Wr)g=-o/(o-r),_=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=d,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,i,s,r,o,a=ii,l=!1){let c=this.elements,h=2/(e-t),d=2/(i-s),u=-(e+t)/(e-t),f=-(i+s)/(i-s),g,_;if(l)g=1/(o-r),_=o/(o-r);else if(a===ii)g=-2/(o-r),_=-(o+r)/(o-r);else if(a===Wr)g=-1/(o-r),_=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=d,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=g,c[14]=_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}},Gs=new P,ei=new ne,Qf=new P(0,0,0),tp=new P(1,1,1),Ni=new P,Wo=new P,Ln=new P,Zh=new ne,Jh=new ke,gn=class n{constructor(t=0,e=0,i=0,s=n.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){let s=t.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],h=s[9],d=s[2],u=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(Qt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Qt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(Qt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Qt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Qt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Qt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return Zh.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Zh,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Jh.setFromEuler(this),this.setFromQuaternion(Jh,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};gn.DEFAULT_ORDER="XYZ";var Yr=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},ep=0,Kh=new P,Ws=new ke,Ti=new ne,Xo=new P,Ir=new P,np=new P,ip=new ke,$h=new P(1,0,0),jh=new P(0,1,0),Qh=new P(0,0,1),tu={type:"added"},sp={type:"removed"},Xs={type:"childadded",child:null},oc={type:"childremoved",child:null},Ge=class n extends di{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:ep++}),this.uuid=Es(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let t=new P,e=new gn,i=new ke,s=new P(1,1,1);function r(){i.setFromEuler(e,!1)}function o(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ne},normalMatrix:{value:new $t}}),this.matrix=new ne,this.matrixWorld=new ne,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Yr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Ws.setFromAxisAngle(t,e),this.quaternion.multiply(Ws),this}rotateOnWorldAxis(t,e){return Ws.setFromAxisAngle(t,e),this.quaternion.premultiply(Ws),this}rotateX(t){return this.rotateOnAxis($h,t)}rotateY(t){return this.rotateOnAxis(jh,t)}rotateZ(t){return this.rotateOnAxis(Qh,t)}translateOnAxis(t,e){return Kh.copy(t).applyQuaternion(this.quaternion),this.position.add(Kh.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis($h,t)}translateY(t){return this.translateOnAxis(jh,t)}translateZ(t){return this.translateOnAxis(Qh,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Ti.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?Xo.copy(t):Xo.set(t,e,i);let s=this.parent;this.updateWorldMatrix(!0,!1),Ir.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ti.lookAt(Ir,Xo,this.up):Ti.lookAt(Xo,Ir,this.up),this.quaternion.setFromRotationMatrix(Ti),s&&(Ti.extractRotation(s.matrixWorld),Ws.setFromRotationMatrix(Ti),this.quaternion.premultiply(Ws.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(tu),Xs.child=t,this.dispatchEvent(Xs),Xs.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(sp),oc.child=t,this.dispatchEvent(oc),oc.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Ti.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Ti.multiply(t.parent.matrixWorld)),t.applyMatrix4(Ti),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(tu),Xs.child=t,this.dispatchEvent(Xs),Xs.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,s=this.children.length;i<s;i++){let o=this.children[i].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ir,t,np),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ir,ip,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){let i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){let e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let d=l[c];r(t.shapes,d)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let l=this.animations[a];s.animations.push(r(t.animations,l))}}if(e){let a=o(t.geometries),l=o(t.materials),c=o(t.textures),h=o(t.images),d=o(t.shapes),u=o(t.skeletons),f=o(t.animations),g=o(t.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),d.length>0&&(i.shapes=d),u.length>0&&(i.skeletons=u),f.length>0&&(i.animations=f),g.length>0&&(i.nodes=g)}return i.object=s,i;function o(a){let l=[];for(let c in a){let h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){let s=t.children[i];this.add(s.clone())}return this}};Ge.DEFAULT_UP=new P(0,1,0);Ge.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ge.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var ni=new P,wi=new P,ac=new P,Ei=new P,qs=new P,Ys=new P,eu=new P,lc=new P,cc=new P,hc=new P,uc=new ge,dc=new ge,fc=new ge,Bi=class n{constructor(t=new P,e=new P,i=new P){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,s){s.subVectors(i,e),ni.subVectors(t,e),s.cross(ni);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,i,s,r){ni.subVectors(s,e),wi.subVectors(i,e),ac.subVectors(t,e);let o=ni.dot(ni),a=ni.dot(wi),l=ni.dot(ac),c=wi.dot(wi),h=wi.dot(ac),d=o*c-a*a;if(d===0)return r.set(0,0,0),null;let u=1/d,f=(c*l-a*h)*u,g=(o*h-a*l)*u;return r.set(1-f-g,g,f)}static containsPoint(t,e,i,s){return this.getBarycoord(t,e,i,s,Ei)===null?!1:Ei.x>=0&&Ei.y>=0&&Ei.x+Ei.y<=1}static getInterpolation(t,e,i,s,r,o,a,l){return this.getBarycoord(t,e,i,s,Ei)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Ei.x),l.addScaledVector(o,Ei.y),l.addScaledVector(a,Ei.z),l)}static getInterpolatedAttribute(t,e,i,s,r,o){return uc.setScalar(0),dc.setScalar(0),fc.setScalar(0),uc.fromBufferAttribute(t,e),dc.fromBufferAttribute(t,i),fc.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(uc,r.x),o.addScaledVector(dc,r.y),o.addScaledVector(fc,r.z),o}static isFrontFacing(t,e,i,s){return ni.subVectors(i,e),wi.subVectors(t,e),ni.cross(wi).dot(s)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,s){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,i,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return ni.subVectors(this.c,this.b),wi.subVectors(this.a,this.b),ni.cross(wi).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return n.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return n.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,s,r){return n.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}containsPoint(t){return n.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return n.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let i=this.a,s=this.b,r=this.c,o,a;qs.subVectors(s,i),Ys.subVectors(r,i),lc.subVectors(t,i);let l=qs.dot(lc),c=Ys.dot(lc);if(l<=0&&c<=0)return e.copy(i);cc.subVectors(t,s);let h=qs.dot(cc),d=Ys.dot(cc);if(h>=0&&d<=h)return e.copy(s);let u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return o=l/(l-h),e.copy(i).addScaledVector(qs,o);hc.subVectors(t,r);let f=qs.dot(hc),g=Ys.dot(hc);if(g>=0&&f<=g)return e.copy(r);let _=f*c-l*g;if(_<=0&&c>=0&&g<=0)return a=c/(c-g),e.copy(i).addScaledVector(Ys,a);let m=h*g-f*d;if(m<=0&&d-h>=0&&f-g>=0)return eu.subVectors(r,s),a=(d-h)/(d-h+(f-g)),e.copy(s).addScaledVector(eu,a);let p=1/(m+_+u);return o=_*p,a=u*p,e.copy(i).addScaledVector(qs,o).addScaledVector(Ys,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},hd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Fi={h:0,s:0,l:0},qo={h:0,s:0,l:0};function pc(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}var St=class{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ce){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,he.colorSpaceToWorking(this,e),this}setRGB(t,e,i,s=he.workingColorSpace){return this.r=t,this.g=e,this.b=i,he.colorSpaceToWorking(this,s),this}setHSL(t,e,i,s=he.workingColorSpace){if(t=th(t,1),e=Qt(e,0,1),i=Qt(i,0,1),e===0)this.r=this.g=this.b=i;else{let r=i<=.5?i*(1+e):i+e-i*e,o=2*i-r;this.r=pc(o,r,t+1/3),this.g=pc(o,r,t),this.b=pc(o,r,t-1/3)}return he.colorSpaceToWorking(this,s),this}setStyle(t,e=Ce){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ce){let i=hd[t.toLowerCase()];return i!==void 0?this.setHex(i,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Ai(t.r),this.g=Ai(t.g),this.b=Ai(t.b),this}copyLinearToSRGB(t){return this.r=Qs(t.r),this.g=Qs(t.g),this.b=Qs(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ce){return he.workingToColorSpace(cn.copy(this),t),Math.round(Qt(cn.r*255,0,255))*65536+Math.round(Qt(cn.g*255,0,255))*256+Math.round(Qt(cn.b*255,0,255))}getHexString(t=Ce){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=he.workingColorSpace){he.workingToColorSpace(cn.copy(this),e);let i=cn.r,s=cn.g,r=cn.b,o=Math.max(i,s,r),a=Math.min(i,s,r),l,c,h=(a+o)/2;if(a===o)l=0,c=0;else{let d=o-a;switch(c=h<=.5?d/(o+a):d/(2-o-a),o){case i:l=(s-r)/d+(s<r?6:0);break;case s:l=(r-i)/d+2;break;case r:l=(i-s)/d+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=he.workingColorSpace){return he.workingToColorSpace(cn.copy(this),e),t.r=cn.r,t.g=cn.g,t.b=cn.b,t}getStyle(t=Ce){he.workingToColorSpace(cn.copy(this),t);let e=cn.r,i=cn.g,s=cn.b;return t!==Ce?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,e,i){return this.getHSL(Fi),this.setHSL(Fi.h+t,Fi.s+e,Fi.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(Fi),t.getHSL(qo);let i=zr(Fi.h,qo.h,e),s=zr(Fi.s,qo.s,e),r=zr(Fi.l,qo.l,e);return this.setHSL(i,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,i=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*s,this.g=r[1]*e+r[4]*i+r[7]*s,this.b=r[2]*e+r[5]*i+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},cn=new St;St.NAMES=hd;var rp=0,mi=class extends di{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:rp++}),this.uuid=Es(),this.name="",this.type="Material",this.blending=us,this.side=Ci,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=da,this.blendDst=fa,this.blendEquation=ki,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new St(0,0,0),this.blendAlpha=0,this.depthFunc=ds,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ac,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=cs,this.stencilZFail=cs,this.stencilZPass=cs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let i=t[e];if(i===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[e]=i}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==us&&(i.blending=this.blending),this.side!==Ci&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==da&&(i.blendSrc=this.blendSrc),this.blendDst!==fa&&(i.blendDst=this.blendDst),this.blendEquation!==ki&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==ds&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ac&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==cs&&(i.stencilFail=this.stencilFail),this.stencilZFail!==cs&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==cs&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){let o=[];for(let a in r){let l=r[a];delete l.metadata,o.push(l)}return o}if(e){let r=s(t.textures),o=s(t.images);r.length>0&&(i.textures=r),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,i=null;if(e!==null){let s=e.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}},Jn=class extends mi{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new St(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new gn,this.combine=Hc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}};var Ve=new P,Yo=new rt,op=0,en=class{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:op++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=Cc,this.updateRanges=[],this.gpuType=oi,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)Yo.fromBufferAttribute(this,e),Yo.applyMatrix3(t),this.setXY(e,Yo.x,Yo.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)Ve.fromBufferAttribute(this,e),Ve.applyMatrix3(t),this.setXYZ(e,Ve.x,Ve.y,Ve.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)Ve.fromBufferAttribute(this,e),Ve.applyMatrix4(t),this.setXYZ(e,Ve.x,Ve.y,Ve.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Ve.fromBufferAttribute(this,e),Ve.applyNormalMatrix(t),this.setXYZ(e,Ve.x,Ve.y,Ve.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Ve.fromBufferAttribute(this,e),Ve.transformDirection(t),this.setXYZ(e,Ve.x,Ve.y,Ve.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=js(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=pn(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=js(e,this.array)),e}setX(t,e){return this.normalized&&(e=pn(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=js(e,this.array)),e}setY(t,e){return this.normalized&&(e=pn(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=js(e,this.array)),e}setZ(t,e){return this.normalized&&(e=pn(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=js(e,this.array)),e}setW(t,e){return this.normalized&&(e=pn(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=pn(e,this.array),i=pn(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=pn(e,this.array),i=pn(i,this.array),s=pn(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t*=this.itemSize,this.normalized&&(e=pn(e,this.array),i=pn(i,this.array),s=pn(s,this.array),r=pn(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Cc&&(t.usage=this.usage),t}};var Zr=class extends en{constructor(t,e,i){super(new Uint16Array(t),e,i)}};var Jr=class extends en{constructor(t,e,i){super(new Uint32Array(t),e,i)}};var Kt=class extends en{constructor(t,e,i){super(new Float32Array(t),e,i)}},ap=0,qn=new ne,mc=new Ge,Zs=new P,Un=new fi,Dr=new fi,Qe=new P,be=class n extends di{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:ap++}),this.uuid=Es(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(eh(t)?Jr:Zr)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let r=new $t().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return qn.makeRotationFromQuaternion(t),this.applyMatrix4(qn),this}rotateX(t){return qn.makeRotationX(t),this.applyMatrix4(qn),this}rotateY(t){return qn.makeRotationY(t),this.applyMatrix4(qn),this}rotateZ(t){return qn.makeRotationZ(t),this.applyMatrix4(qn),this}translate(t,e,i){return qn.makeTranslation(t,e,i),this.applyMatrix4(qn),this}scale(t,e,i){return qn.makeScale(t,e,i),this.applyMatrix4(qn),this}lookAt(t){return mc.lookAt(t),mc.updateMatrix(),this.applyMatrix4(mc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Zs).negate(),this.translate(Zs.x,Zs.y,Zs.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let i=[];for(let s=0,r=t.length;s<r;s++){let o=t[s];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Kt(i,3))}else{let i=Math.min(t.length,e.count);for(let s=0;s<i;s++){let r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new fi);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,s=e.length;i<s;i++){let r=e[i];Un.setFromBufferAttribute(r),this.morphTargetsRelative?(Qe.addVectors(this.boundingBox.min,Un.min),this.boundingBox.expandByPoint(Qe),Qe.addVectors(this.boundingBox.max,Un.max),this.boundingBox.expandByPoint(Qe)):(this.boundingBox.expandByPoint(Un.min),this.boundingBox.expandByPoint(Un.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new pi);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new P,1/0);return}if(t){let i=this.boundingSphere.center;if(Un.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){let a=e[r];Dr.setFromBufferAttribute(a),this.morphTargetsRelative?(Qe.addVectors(Un.min,Dr.min),Un.expandByPoint(Qe),Qe.addVectors(Un.max,Dr.max),Un.expandByPoint(Qe)):(Un.expandByPoint(Dr.min),Un.expandByPoint(Dr.max))}Un.getCenter(i);let s=0;for(let r=0,o=t.count;r<o;r++)Qe.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(Qe));if(e)for(let r=0,o=e.length;r<o;r++){let a=e[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Qe.fromBufferAttribute(a,c),l&&(Zs.fromBufferAttribute(t,c),Qe.add(Zs)),s=Math.max(s,i.distanceToSquared(Qe))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new en(new Float32Array(4*i.count),4));let o=this.getAttribute("tangent"),a=[],l=[];for(let D=0;D<i.count;D++)a[D]=new P,l[D]=new P;let c=new P,h=new P,d=new P,u=new rt,f=new rt,g=new rt,_=new P,m=new P;function p(D,T,b){c.fromBufferAttribute(i,D),h.fromBufferAttribute(i,T),d.fromBufferAttribute(i,b),u.fromBufferAttribute(r,D),f.fromBufferAttribute(r,T),g.fromBufferAttribute(r,b),h.sub(c),d.sub(c),f.sub(u),g.sub(u);let I=1/(f.x*g.y-g.x*f.y);isFinite(I)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(d,-f.y).multiplyScalar(I),m.copy(d).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(I),a[D].add(_),a[T].add(_),a[b].add(_),l[D].add(m),l[T].add(m),l[b].add(m))}let M=this.groups;M.length===0&&(M=[{start:0,count:t.count}]);for(let D=0,T=M.length;D<T;++D){let b=M[D],I=b.start,O=b.count;for(let H=I,Y=I+O;H<Y;H+=3)p(t.getX(H+0),t.getX(H+1),t.getX(H+2))}let v=new P,x=new P,A=new P,E=new P;function R(D){A.fromBufferAttribute(s,D),E.copy(A);let T=a[D];v.copy(T),v.sub(A.multiplyScalar(A.dot(T))).normalize(),x.crossVectors(E,T);let I=x.dot(l[D])<0?-1:1;o.setXYZW(D,v.x,v.y,v.z,I)}for(let D=0,T=M.length;D<T;++D){let b=M[D],I=b.start,O=b.count;for(let H=I,Y=I+O;H<Y;H+=3)R(t.getX(H+0)),R(t.getX(H+1)),R(t.getX(H+2))}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new en(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let u=0,f=i.count;u<f;u++)i.setXYZ(u,0,0,0);let s=new P,r=new P,o=new P,a=new P,l=new P,c=new P,h=new P,d=new P;if(t)for(let u=0,f=t.count;u<f;u+=3){let g=t.getX(u+0),_=t.getX(u+1),m=t.getX(u+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,_),o.fromBufferAttribute(e,m),h.subVectors(o,r),d.subVectors(s,r),h.cross(d),a.fromBufferAttribute(i,g),l.fromBufferAttribute(i,_),c.fromBufferAttribute(i,m),a.add(h),l.add(h),c.add(h),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(_,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let u=0,f=e.count;u<f;u+=3)s.fromBufferAttribute(e,u+0),r.fromBufferAttribute(e,u+1),o.fromBufferAttribute(e,u+2),h.subVectors(o,r),d.subVectors(s,r),h.cross(d),i.setXYZ(u+0,h.x,h.y,h.z),i.setXYZ(u+1,h.x,h.y,h.z),i.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)Qe.fromBufferAttribute(t,e),Qe.normalize(),t.setXYZ(e,Qe.x,Qe.y,Qe.z)}toNonIndexed(){function t(a,l){let c=a.array,h=a.itemSize,d=a.normalized,u=new c.constructor(l.length*h),f=0,g=0;for(let _=0,m=l.length;_<m;_++){a.isInterleavedBufferAttribute?f=l[_]*a.data.stride+a.offset:f=l[_]*h;for(let p=0;p<h;p++)u[g++]=c[f++]}return new en(u,h,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new n,i=this.index.array,s=this.attributes;for(let a in s){let l=s[a],c=t(l,i);e.setAttribute(a,c)}let r=this.morphAttributes;for(let a in r){let l=[],c=r[a];for(let h=0,d=c.length;h<d;h++){let u=c[h],f=t(u,i);l.push(f)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,l=o.length;a<l;a++){let c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let i=this.attributes;for(let l in i){let c=i[l];t.data.attributes[l]=c.toJSON(t.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){let f=c[d];h.push(f.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let i=t.index;i!==null&&this.setIndex(i.clone());let s=t.attributes;for(let c in s){let h=s[c];this.setAttribute(c,h.clone(e))}let r=t.morphAttributes;for(let c in r){let h=[],d=r[c];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let c=0,h=o.length;c<h;c++){let d=o[c];this.addGroup(d.start,d.count,d.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},nu=new ne,as=new Vi,Zo=new pi,iu=new P,Jo=new P,Ko=new P,$o=new P,gc=new P,jo=new P,su=new P,Qo=new P,ve=class extends Ge{constructor(t=new be,e=new Jn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){let i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,o=i.morphTargetsRelative;e.fromBufferAttribute(s,t);let a=this.morphTargetInfluences;if(r&&a){jo.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=a[l],d=r[l];h!==0&&(gc.fromBufferAttribute(d,t),o?jo.addScaledVector(gc,h):jo.addScaledVector(gc.sub(e),h))}e.add(jo)}return e}raycast(t,e){let i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Zo.copy(i.boundingSphere),Zo.applyMatrix4(r),as.copy(t.ray).recast(t.near),!(Zo.containsPoint(as.origin)===!1&&(as.intersectSphere(Zo,iu)===null||as.origin.distanceToSquared(iu)>(t.far-t.near)**2))&&(nu.copy(r).invert(),as.copy(t.ray).applyMatrix4(nu),!(i.boundingBox!==null&&as.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,as)))}_computeIntersections(t,e,i){let s,r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=u.length;g<_;g++){let m=u[g],p=o[m.materialIndex],M=Math.max(m.start,f.start),v=Math.min(a.count,Math.min(m.start+m.count,f.start+f.count));for(let x=M,A=v;x<A;x+=3){let E=a.getX(x),R=a.getX(x+1),D=a.getX(x+2);s=ta(this,p,t,i,c,h,d,E,R,D),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let g=Math.max(0,f.start),_=Math.min(a.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){let M=a.getX(m),v=a.getX(m+1),x=a.getX(m+2);s=ta(this,o,t,i,c,h,d,M,v,x),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,_=u.length;g<_;g++){let m=u[g],p=o[m.materialIndex],M=Math.max(m.start,f.start),v=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let x=M,A=v;x<A;x+=3){let E=x,R=x+1,D=x+2;s=ta(this,p,t,i,c,h,d,E,R,D),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let g=Math.max(0,f.start),_=Math.min(l.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){let M=m,v=m+1,x=m+2;s=ta(this,o,t,i,c,h,d,M,v,x),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}};function lp(n,t,e,i,s,r,o,a){let l;if(t.side===sn?l=i.intersectTriangle(o,r,s,!0,a):l=i.intersectTriangle(s,r,o,t.side===Ci,a),l===null)return null;Qo.copy(a),Qo.applyMatrix4(n.matrixWorld);let c=e.ray.origin.distanceTo(Qo);return c<e.near||c>e.far?null:{distance:c,point:Qo.clone(),object:n}}function ta(n,t,e,i,s,r,o,a,l,c){n.getVertexPosition(a,Jo),n.getVertexPosition(l,Ko),n.getVertexPosition(c,$o);let h=lp(n,t,e,i,Jo,Ko,$o,su);if(h){let d=new P;Bi.getBarycoord(su,Jo,Ko,$o,d),s&&(h.uv=Bi.getInterpolatedAttribute(s,a,l,c,d,new rt)),r&&(h.uv1=Bi.getInterpolatedAttribute(r,a,l,c,d,new rt)),o&&(h.normal=Bi.getInterpolatedAttribute(o,a,l,c,d,new P),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));let u={a,b:l,c,normal:new P,materialIndex:0};Bi.getNormal(Jo,Ko,$o,u.normal),h.face=u,h.barycoord=d}return h}var Hi=class n extends be{constructor(t=1,e=1,i=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let l=[],c=[],h=[],d=[],u=0,f=0;g("z","y","x",-1,-1,i,e,t,o,r,0),g("z","y","x",1,-1,i,e,-t,o,r,1),g("x","z","y",1,1,t,i,e,s,o,2),g("x","z","y",1,-1,t,i,-e,s,o,3),g("x","y","z",1,-1,t,e,i,s,r,4),g("x","y","z",-1,-1,t,e,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new Kt(c,3)),this.setAttribute("normal",new Kt(h,3)),this.setAttribute("uv",new Kt(d,2));function g(_,m,p,M,v,x,A,E,R,D,T){let b=x/R,I=A/D,O=x/2,H=A/2,Y=E/2,Z=R+1,G=D+1,it=0,W=0,mt=new P;for(let bt=0;bt<G;bt++){let Ct=bt*I-H;for(let Yt=0;Yt<Z;Yt++){let oe=Yt*b-O;mt[_]=oe*M,mt[m]=Ct*v,mt[p]=Y,c.push(mt.x,mt.y,mt.z),mt[_]=0,mt[m]=0,mt[p]=E>0?1:-1,h.push(mt.x,mt.y,mt.z),d.push(Yt/R),d.push(1-bt/D),it+=1}}for(let bt=0;bt<D;bt++)for(let Ct=0;Ct<R;Ct++){let Yt=u+Ct+Z*bt,oe=u+Ct+Z*(bt+1),pe=u+(Ct+1)+Z*(bt+1),zt=u+(Ct+1)+Z*bt;l.push(Yt,oe,zt),l.push(oe,pe,zt),W+=6}a.addGroup(f,W,T),f+=W,u+=it}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function As(n){let t={};for(let e in n){t[e]={};for(let i in n[e]){let s=n[e][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=s.clone():Array.isArray(s)?t[e][i]=s.slice():t[e][i]=s}}return t}function un(n){let t={};for(let e=0;e<n.length;e++){let i=As(n[e]);for(let s in i)t[s]=i[s]}return t}function cp(n){let t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function nh(n){let t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:he.workingColorSpace}var ud={clone:As,merge:un},hp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,up=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,wn=class extends mi{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=hp,this.fragmentShader=up,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=As(t.uniforms),this.uniformsGroups=cp(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let i={};for(let s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}},Kr=class extends Ge{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ne,this.projectionMatrix=new ne,this.projectionMatrixInverse=new ne,this.coordinateSystem=ii,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Oi=new P,ru=new rt,ou=new rt,He=class extends Kr{constructor(t=50,e=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=ps*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Br*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return ps*2*Math.atan(Math.tan(Br*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){Oi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Oi.x,Oi.y).multiplyScalar(-t/Oi.z),Oi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Oi.x,Oi.y).multiplyScalar(-t/Oi.z)}getViewSize(t,e){return this.getViewBounds(t,ru,ou),e.subVectors(ou,ru)}setViewOffset(t,e,i,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(Br*.5*this.fov)/this.zoom,i=2*e,s=this.aspect*i,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,e-=o.offsetY*i/c,s*=o.width/l,i*=o.height/c}let a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-i,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},Js=-90,Ks=1,ya=class extends Ge{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new He(Js,Ks,t,e);s.layers=this.layers,this.add(s);let r=new He(Js,Ks,t,e);r.layers=this.layers,this.add(r);let o=new He(Js,Ks,t,e);o.layers=this.layers,this.add(o);let a=new He(Js,Ks,t,e);a.layers=this.layers,this.add(a);let l=new He(Js,Ks,t,e);l.layers=this.layers,this.add(l);let c=new He(Js,Ks,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[i,s,r,o,a,l]=e;for(let c of e)this.remove(c);if(t===ii)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Wr)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,l,c,h]=this.children,d=t.getRenderTarget(),u=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;let _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,s),t.render(e,r),t.setRenderTarget(i,1,s),t.render(e,o),t.setRenderTarget(i,2,s),t.render(e,a),t.setRenderTarget(i,3,s),t.render(e,l),t.setRenderTarget(i,4,s),t.render(e,c),i.texture.generateMipmaps=_,t.setRenderTarget(i,5,s),t.render(e,h),t.setRenderTarget(d,u,f),t.xr.enabled=g,i.texture.needsPMREMUpdate=!0}},$r=class extends mn{constructor(t=[],e=Ts,i,s,r,o,a,l,c,h){super(t,e,i,s,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},va=class extends Zn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new $r(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Hi(5,5,5),r=new wn({name:"CubemapFromEquirect",uniforms:As(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:sn,blending:Ri});r.uniforms.tEquirect.value=e;let o=new ve(s,r),a=e.minFilter;return e.minFilter===Zi&&(e.minFilter=Nn),new ya(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,i=!0,s=!0){let r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,i,s);t.setRenderTarget(r)}},Re=class extends Ge{constructor(){super(),this.isGroup=!0,this.type="Group"}},dp={type:"move"},ir=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Re,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Re,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Re,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let s=null,r=null,o=null,a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(let _ of t.hand.values()){let m=e.getJointPose(_,i),p=this._getHandJoint(c,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}let h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,g=.005;c.inputState.pinching&&u>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&u<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(dp)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let i=new Re;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}},jr=class n{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new St(t),this.density=e}clone(){return new n(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}};var ms=class extends Ge{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new gn,this.environmentIntensity=1,this.environmentRotation=new gn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}};var sr=class extends mn{constructor(t=null,e=1,i=1,s,r,o,a,l,c=Tn,h=Tn,d,u){super(null,o,a,l,c,h,s,r,d,u),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Qr=class extends en{constructor(t,e,i,s=1){super(t,e,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},$s=new ne,au=new ne,ea=[],lu=new fi,fp=new ne,Lr=new ve,Ur=new pi,gs=class extends ve{constructor(t,e,i){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Qr(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<i;s++)this.setMatrixAt(s,fp)}computeBoundingBox(){let t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new fi),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,$s),lu.copy(t.boundingBox).applyMatrix4($s),this.boundingBox.union(lu)}computeBoundingSphere(){let t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new pi),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,$s),Ur.copy(t.boundingSphere).applyMatrix4($s),this.boundingSphere.union(Ur)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){let i=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=i.length+1,o=t*r+1;for(let a=0;a<i.length;a++)i[a]=s[o+a]}raycast(t,e){let i=this.matrixWorld,s=this.count;if(Lr.geometry=this.geometry,Lr.material=this.material,Lr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ur.copy(this.boundingSphere),Ur.applyMatrix4(i),t.ray.intersectsSphere(Ur)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,$s),au.multiplyMatrices(i,$s),Lr.matrixWorld=au,Lr.raycast(t,ea);for(let o=0,a=ea.length;o<a;o++){let l=ea[o];l.instanceId=r,l.object=this,e.push(l)}ea.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new Qr(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){let i=e.morphTargetInfluences,s=i.length+1;this.morphTexture===null&&(this.morphTexture=new sr(new Float32Array(s*this.count),s,this.count,xr,oi));let r=this.morphTexture.source.data.data,o=0;for(let c=0;c<i.length;c++)o+=i[c];let a=this.geometry.morphTargetsRelative?1:1-o,l=s*t;r[l]=a,r.set(i,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},_c=new P,pp=new P,mp=new $t,Yn=class{constructor(t=new P(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,s){return this.normal.set(t,e,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){let s=_c.subVectors(i,e).cross(pp.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let i=t.delta(_c),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(i,r)}intersectsLine(t){let e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let i=e||mp.getNormalMatrix(t),s=this.coplanarPoint(_c).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},ls=new pi,gp=new rt(.5,.5),na=new P,rr=class{constructor(t=new Yn,e=new Yn,i=new Yn,s=new Yn,r=new Yn,o=new Yn){this.planes=[t,e,i,s,r,o]}set(t,e,i,s,r,o){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(i),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){let e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=ii,i=!1){let s=this.planes,r=t.elements,o=r[0],a=r[1],l=r[2],c=r[3],h=r[4],d=r[5],u=r[6],f=r[7],g=r[8],_=r[9],m=r[10],p=r[11],M=r[12],v=r[13],x=r[14],A=r[15];if(s[0].setComponents(c-o,f-h,p-g,A-M).normalize(),s[1].setComponents(c+o,f+h,p+g,A+M).normalize(),s[2].setComponents(c+a,f+d,p+_,A+v).normalize(),s[3].setComponents(c-a,f-d,p-_,A-v).normalize(),i)s[4].setComponents(l,u,m,x).normalize(),s[5].setComponents(c-l,f-u,p-m,A-x).normalize();else if(s[4].setComponents(c-l,f-u,p-m,A-x).normalize(),e===ii)s[5].setComponents(c+l,f+u,p+m,A+x).normalize();else if(e===Wr)s[5].setComponents(l,u,m,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),ls.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),ls.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(ls)}intersectsSprite(t){ls.center.set(0,0,0);let e=gp.distanceTo(t.center);return ls.radius=.7071067811865476+e,ls.applyMatrix4(t.matrixWorld),this.intersectsSphere(ls)}intersectsSphere(t){let e=this.planes,i=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let i=0;i<6;i++){let s=e[i];if(na.x=s.normal.x>0?t.max.x:t.min.x,na.y=s.normal.y>0?t.max.y:t.min.y,na.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(na)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var or=class extends mi{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new St(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},Ma=new P,Sa=new P,cu=new ne,Nr=new Vi,ia=new pi,xc=new P,hu=new P,ba=class extends Ge{constructor(t=new be,e=new or){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,i=[0];for(let s=1,r=e.count;s<r;s++)Ma.fromBufferAttribute(e,s-1),Sa.fromBufferAttribute(e,s),i[s]=i[s-1],i[s]+=Ma.distanceTo(Sa);t.setAttribute("lineDistance",new Kt(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){let i=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),ia.copy(i.boundingSphere),ia.applyMatrix4(s),ia.radius+=r,t.ray.intersectsSphere(ia)===!1)return;cu.copy(s).invert(),Nr.copy(t.ray).applyMatrix4(cu);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,h=i.index,u=i.attributes.position;if(h!==null){let f=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let _=f,m=g-1;_<m;_+=c){let p=h.getX(_),M=h.getX(_+1),v=sa(this,t,Nr,l,p,M,_);v&&e.push(v)}if(this.isLineLoop){let _=h.getX(g-1),m=h.getX(f),p=sa(this,t,Nr,l,_,m,g-1);p&&e.push(p)}}else{let f=Math.max(0,o.start),g=Math.min(u.count,o.start+o.count);for(let _=f,m=g-1;_<m;_+=c){let p=sa(this,t,Nr,l,_,_+1,_);p&&e.push(p)}if(this.isLineLoop){let _=sa(this,t,Nr,l,g-1,f,g-1);_&&e.push(_)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function sa(n,t,e,i,s,r,o){let a=n.geometry.attributes.position;if(Ma.fromBufferAttribute(a,s),Sa.fromBufferAttribute(a,r),e.distanceSqToSegment(Ma,Sa,xc,hu)>i)return;xc.applyMatrix4(n.matrixWorld);let c=t.ray.origin.distanceTo(xc);if(!(c<t.near||c>t.far))return{distance:c,point:hu.clone().applyMatrix4(n.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:n}}var uu=new P,du=new P,to=class extends ba{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,i=[];for(let s=0,r=e.count;s<r;s+=2)uu.fromBufferAttribute(e,s),du.fromBufferAttribute(e,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+uu.distanceTo(du);t.setAttribute("lineDistance",new Kt(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var _s=class extends mi{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new St(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},fu=new ne,Rc=new Vi,ra=new pi,oa=new P,ar=class extends Ge{constructor(t=new be,e=new _s){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){let i=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),ra.copy(i.boundingSphere),ra.applyMatrix4(s),ra.radius+=r,t.ray.intersectsSphere(ra)===!1)return;fu.copy(s).invert(),Rc.copy(t.ray).applyMatrix4(fu);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=i.index,d=i.attributes.position;if(c!==null){let u=Math.max(0,o.start),f=Math.min(c.count,o.start+o.count);for(let g=u,_=f;g<_;g++){let m=c.getX(g);oa.fromBufferAttribute(d,m),pu(oa,m,l,s,t,e,this)}}else{let u=Math.max(0,o.start),f=Math.min(d.count,o.start+o.count);for(let g=u,_=f;g<_;g++)oa.fromBufferAttribute(d,g),pu(oa,g,l,s,t,e,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function pu(n,t,e,i,s,r,o){let a=Rc.distanceSqToPoint(n);if(a<e){let l=new P;Rc.closestPointToPoint(n,l),l.applyMatrix4(i);let c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}var nn=class extends mn{constructor(t,e,i,s,r,o,a,l,c){super(t,e,i,s,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},eo=class extends mn{constructor(t,e,i=Ji,s,r,o,a=Tn,l=Tn,c,h=tr,d=1){if(h!==tr&&h!==_r)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:t,height:e,depth:d};super(u,s,r,o,a,l,h,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new nr(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}},no=class extends mn{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}};var Gi=class n extends be{constructor(t=1,e=1,i=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};let c=this;s=Math.floor(s),r=Math.floor(r);let h=[],d=[],u=[],f=[],g=0,_=[],m=i/2,p=0;M(),o===!1&&(t>0&&v(!0),e>0&&v(!1)),this.setIndex(h),this.setAttribute("position",new Kt(d,3)),this.setAttribute("normal",new Kt(u,3)),this.setAttribute("uv",new Kt(f,2));function M(){let x=new P,A=new P,E=0,R=(e-t)/i;for(let D=0;D<=r;D++){let T=[],b=D/r,I=b*(e-t)+t;for(let O=0;O<=s;O++){let H=O/s,Y=H*l+a,Z=Math.sin(Y),G=Math.cos(Y);A.x=I*Z,A.y=-b*i+m,A.z=I*G,d.push(A.x,A.y,A.z),x.set(Z,R,G).normalize(),u.push(x.x,x.y,x.z),f.push(H,1-b),T.push(g++)}_.push(T)}for(let D=0;D<s;D++)for(let T=0;T<r;T++){let b=_[T][D],I=_[T+1][D],O=_[T+1][D+1],H=_[T][D+1];(t>0||T!==0)&&(h.push(b,I,H),E+=3),(e>0||T!==r-1)&&(h.push(I,O,H),E+=3)}c.addGroup(p,E,0),p+=E}function v(x){let A=g,E=new rt,R=new P,D=0,T=x===!0?t:e,b=x===!0?1:-1;for(let O=1;O<=s;O++)d.push(0,m*b,0),u.push(0,b,0),f.push(.5,.5),g++;let I=g;for(let O=0;O<=s;O++){let Y=O/s*l+a,Z=Math.cos(Y),G=Math.sin(Y);R.x=T*G,R.y=m*b,R.z=T*Z,d.push(R.x,R.y,R.z),u.push(0,b,0),E.x=Z*.5+.5,E.y=G*.5*b+.5,f.push(E.x,E.y),g++}for(let O=0;O<s;O++){let H=A+O,Y=I+O;x===!0?h.push(Y,Y+1,H):h.push(Y+1,Y,H),D+=3}c.addGroup(p,D,x===!0?1:2),p+=D}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},xs=class n extends Gi{constructor(t=1,e=1,i=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,i,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:i,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new n(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Ta=class n extends be{constructor(t=[],e=[],i=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:i,detail:s};let r=[],o=[];a(s),c(i),h(),this.setAttribute("position",new Kt(r,3)),this.setAttribute("normal",new Kt(r.slice(),3)),this.setAttribute("uv",new Kt(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(M){let v=new P,x=new P,A=new P;for(let E=0;E<e.length;E+=3)f(e[E+0],v),f(e[E+1],x),f(e[E+2],A),l(v,x,A,M)}function l(M,v,x,A){let E=A+1,R=[];for(let D=0;D<=E;D++){R[D]=[];let T=M.clone().lerp(x,D/E),b=v.clone().lerp(x,D/E),I=E-D;for(let O=0;O<=I;O++)O===0&&D===E?R[D][O]=T:R[D][O]=T.clone().lerp(b,O/I)}for(let D=0;D<E;D++)for(let T=0;T<2*(E-D)-1;T++){let b=Math.floor(T/2);T%2===0?(u(R[D][b+1]),u(R[D+1][b]),u(R[D][b])):(u(R[D][b+1]),u(R[D+1][b+1]),u(R[D+1][b]))}}function c(M){let v=new P;for(let x=0;x<r.length;x+=3)v.x=r[x+0],v.y=r[x+1],v.z=r[x+2],v.normalize().multiplyScalar(M),r[x+0]=v.x,r[x+1]=v.y,r[x+2]=v.z}function h(){let M=new P;for(let v=0;v<r.length;v+=3){M.x=r[v+0],M.y=r[v+1],M.z=r[v+2];let x=m(M)/2/Math.PI+.5,A=p(M)/Math.PI+.5;o.push(x,1-A)}g(),d()}function d(){for(let M=0;M<o.length;M+=6){let v=o[M+0],x=o[M+2],A=o[M+4],E=Math.max(v,x,A),R=Math.min(v,x,A);E>.9&&R<.1&&(v<.2&&(o[M+0]+=1),x<.2&&(o[M+2]+=1),A<.2&&(o[M+4]+=1))}}function u(M){r.push(M.x,M.y,M.z)}function f(M,v){let x=M*3;v.x=t[x+0],v.y=t[x+1],v.z=t[x+2]}function g(){let M=new P,v=new P,x=new P,A=new P,E=new rt,R=new rt,D=new rt;for(let T=0,b=0;T<r.length;T+=9,b+=6){M.set(r[T+0],r[T+1],r[T+2]),v.set(r[T+3],r[T+4],r[T+5]),x.set(r[T+6],r[T+7],r[T+8]),E.set(o[b+0],o[b+1]),R.set(o[b+2],o[b+3]),D.set(o[b+4],o[b+5]),A.copy(M).add(v).add(x).divideScalar(3);let I=m(A);_(E,b+0,M,I),_(R,b+2,v,I),_(D,b+4,x,I)}}function _(M,v,x,A){A<0&&M.x===1&&(o[v]=M.x-1),x.x===0&&x.z===0&&(o[v]=A/2/Math.PI+.5)}function m(M){return Math.atan2(M.z,-M.x)}function p(M){return Math.atan2(-M.y,Math.sqrt(M.x*M.x+M.z*M.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.vertices,t.indices,t.radius,t.details)}};var Fn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(t,e){let i=this.getUtoTmapping(t);return this.getPoint(i,e)}getPoints(t=5){let e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return e}getSpacedPoints(t=5){let e=[];for(let i=0;i<=t;i++)e.push(this.getPointAt(i/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],i,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)i=this.getPoint(o/t),r+=i.distanceTo(s),e.push(r),s=i;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){let i=this.getLengths(),s=0,r=i.length,o;e?o=e:o=t*i[r-1];let a=0,l=r-1,c;for(;a<=l;)if(s=Math.floor(a+(l-a)/2),c=i[s]-o,c<0)a=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,i[s]===o)return s/(r-1);let h=i[s],u=i[s+1]-h,f=(o-h)/u;return(s+f)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);let o=this.getPoint(s),a=this.getPoint(r),l=e||(o.isVector2?new rt:new P);return l.copy(a).sub(o).normalize(),l}getTangentAt(t,e){let i=this.getUtoTmapping(t);return this.getTangent(i,e)}computeFrenetFrames(t,e=!1){let i=new P,s=[],r=[],o=[],a=new P,l=new ne;for(let f=0;f<=t;f++){let g=f/t;s[f]=this.getTangentAt(g,new P)}r[0]=new P,o[0]=new P;let c=Number.MAX_VALUE,h=Math.abs(s[0].x),d=Math.abs(s[0].y),u=Math.abs(s[0].z);h<=c&&(c=h,i.set(1,0,0)),d<=c&&(c=d,i.set(0,1,0)),u<=c&&i.set(0,0,1),a.crossVectors(s[0],i).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(s[f-1],s[f]),a.length()>Number.EPSILON){a.normalize();let g=Math.acos(Qt(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(a,g))}o[f].crossVectors(s[f],r[f])}if(e===!0){let f=Math.acos(Qt(r[0].dot(r[t]),-1,1));f/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(f=-f);for(let g=1;g<=t;g++)r[g].applyMatrix4(l.makeRotationAxis(s[g],f*g)),o[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},lr=class extends Fn{constructor(t=0,e=0,i=1,s=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=i,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(t,e=new rt){let i=e,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);let a=this.aStartAngle+t*r,l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let h=Math.cos(this.aRotation),d=Math.sin(this.aRotation),u=l-this.aX,f=c-this.aY;l=u*h-f*d+this.aX,c=u*d+f*h+this.aY}return i.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},wa=class extends lr{constructor(t,e,i,s,r,o){super(t,e,i,i,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}};function ih(){let n=0,t=0,e=0,i=0;function s(r,o,a,l){n=r,t=a,e=-3*r+3*o-2*a-l,i=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){s(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,h,d){let u=(o-r)/c-(a-r)/(c+h)+(a-o)/h,f=(a-o)/h-(l-o)/(h+d)+(l-a)/d;u*=h,f*=h,s(o,a,u,f)},calc:function(r){let o=r*r,a=o*r;return n+t*r+e*o+i*a}}}var aa=new P,yc=new ih,vc=new ih,Mc=new ih,_n=class extends Fn{constructor(t=[],e=!1,i="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=i,this.tension=s}getPoint(t,e=new P){let i=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t,a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,h;this.closed||a>0?c=s[(a-1)%r]:(aa.subVectors(s[0],s[1]).add(s[0]),c=aa);let d=s[a%r],u=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(aa.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=aa),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,g=Math.pow(c.distanceToSquared(d),f),_=Math.pow(d.distanceToSquared(u),f),m=Math.pow(u.distanceToSquared(h),f);_<1e-4&&(_=1),g<1e-4&&(g=_),m<1e-4&&(m=_),yc.initNonuniformCatmullRom(c.x,d.x,u.x,h.x,g,_,m),vc.initNonuniformCatmullRom(c.y,d.y,u.y,h.y,g,_,m),Mc.initNonuniformCatmullRom(c.z,d.z,u.z,h.z,g,_,m)}else this.curveType==="catmullrom"&&(yc.initCatmullRom(c.x,d.x,u.x,h.x,this.tension),vc.initCatmullRom(c.y,d.y,u.y,h.y,this.tension),Mc.initCatmullRom(c.z,d.z,u.z,h.z,this.tension));return i.set(yc.calc(l),vc.calc(l),Mc.calc(l)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){let s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(new P().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function mu(n,t,e,i,s){let r=(i-t)*.5,o=(s-e)*.5,a=n*n,l=n*a;return(2*e-2*i+r+o)*l+(-3*e+3*i-2*r-o)*a+r*n+e}function _p(n,t){let e=1-n;return e*e*t}function xp(n,t){return 2*(1-n)*n*t}function yp(n,t){return n*n*t}function kr(n,t,e,i){return _p(n,t)+xp(n,e)+yp(n,i)}function vp(n,t){let e=1-n;return e*e*e*t}function Mp(n,t){let e=1-n;return 3*e*e*n*t}function Sp(n,t){return 3*(1-n)*n*n*t}function bp(n,t){return n*n*n*t}function Vr(n,t,e,i,s){return vp(n,t)+Mp(n,e)+Sp(n,i)+bp(n,s)}var io=class extends Fn{constructor(t=new rt,e=new rt,i=new rt,s=new rt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new rt){let i=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return i.set(Vr(t,s.x,r.x,o.x,a.x),Vr(t,s.y,r.y,o.y,a.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Ea=class extends Fn{constructor(t=new P,e=new P,i=new P,s=new P){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new P){let i=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return i.set(Vr(t,s.x,r.x,o.x,a.x),Vr(t,s.y,r.y,o.y,a.y),Vr(t,s.z,r.z,o.z,a.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},so=class extends Fn{constructor(t=new rt,e=new rt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new rt){let i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new rt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Aa=class extends Fn{constructor(t=new P,e=new P){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new P){let i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new P){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},ro=class extends Fn{constructor(t=new rt,e=new rt,i=new rt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new rt){let i=e,s=this.v0,r=this.v1,o=this.v2;return i.set(kr(t,s.x,r.x,o.x),kr(t,s.y,r.y,o.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Ca=class extends Fn{constructor(t=new P,e=new P,i=new P){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new P){let i=e,s=this.v0,r=this.v1,o=this.v2;return i.set(kr(t,s.x,r.x,o.x),kr(t,s.y,r.y,o.y),kr(t,s.z,r.z,o.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},oo=class extends Fn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new rt){let i=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,l=s[o===0?o:o-1],c=s[o],h=s[o>s.length-2?s.length-1:o+1],d=s[o>s.length-3?s.length-1:o+2];return i.set(mu(a,l.x,c.x,h.x,d.x),mu(a,l.y,c.y,h.y,d.y)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){let s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(new rt().fromArray(s))}return this}},Pc=Object.freeze({__proto__:null,ArcCurve:wa,CatmullRomCurve3:_n,CubicBezierCurve:io,CubicBezierCurve3:Ea,EllipseCurve:lr,LineCurve:so,LineCurve3:Aa,QuadraticBezierCurve:ro,QuadraticBezierCurve3:Ca,SplineCurve:oo}),Ra=class extends Fn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let i=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Pc[i](e,t))}return this}getPoint(t,e){let i=t*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=i){let o=s[r]-i,a=this.curves[r],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,e)}r++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let i=0,s=this.curves.length;i<s;i++)e+=this.curves[i].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],i;for(let s=0,r=this.curves;s<r.length;s++){let o=r[s],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,l=o.getPoints(a);for(let c=0;c<l.length;c++){let h=l[c];i&&i.equals(h)||(e.push(h),i=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){let s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,i=this.curves.length;e<i;e++){let s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){let s=t.curves[e];this.curves.push(new Pc[s.type]().fromJSON(s))}return this}},ao=class extends Ra{constructor(t){super(),this.type="Path",this.currentPoint=new rt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,i=t.length;e<i;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let i=new so(this.currentPoint.clone(),new rt(t,e));return this.curves.push(i),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,i,s){let r=new ro(this.currentPoint.clone(),new rt(t,e),new rt(i,s));return this.curves.push(r),this.currentPoint.set(i,s),this}bezierCurveTo(t,e,i,s,r,o){let a=new io(this.currentPoint.clone(),new rt(t,e),new rt(i,s),new rt(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),i=new oo(e);return this.curves.push(i),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,i,s,r,o){let a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+a,e+l,i,s,r,o),this}absarc(t,e,i,s,r,o){return this.absellipse(t,e,i,i,s,r,o),this}ellipse(t,e,i,s,r,o,a,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,i,s,r,o,a,l),this}absellipse(t,e,i,s,r,o,a,l){let c=new lr(t,e,i,s,r,o,a,l);if(this.curves.length>0){let d=c.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}},cr=class extends ao{constructor(t){super(t),this.uuid=Es(),this.type="Shape",this.holes=[]}getPointsHoles(t){let e=[];for(let i=0,s=this.holes.length;i<s;i++)e[i]=this.holes[i].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){let s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,i=this.holes.length;e<i;e++){let s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){let s=t.holes[e];this.holes.push(new ao().fromJSON(s))}return this}};function Tp(n,t,e=2){let i=t&&t.length,s=i?t[0]*e:n.length,r=dd(n,0,s,e,!0),o=[];if(!r||r.next===r.prev)return o;let a,l,c;if(i&&(r=Rp(n,t,r,e)),n.length>80*e){a=1/0,l=1/0;let h=-1/0,d=-1/0;for(let u=e;u<s;u+=e){let f=n[u],g=n[u+1];f<a&&(a=f),g<l&&(l=g),f>h&&(h=f),g>d&&(d=g)}c=Math.max(h-a,d-l),c=c!==0?32767/c:0}return lo(r,o,e,a,l,c,0),o}function dd(n,t,e,i,s){let r;if(s===kp(n,t,e,i)>0)for(let o=t;o<e;o+=i)r=gu(o/i|0,n[o],n[o+1],r);else for(let o=e-i;o>=t;o-=i)r=gu(o/i|0,n[o],n[o+1],r);return r&&hr(r,r.next)&&(ho(r),r=r.next),r}function ys(n,t){if(!n)return n;t||(t=n);let e=n,i;do if(i=!1,!e.steiner&&(hr(e,e.next)||Fe(e.prev,e,e.next)===0)){if(ho(e),e=t=e.prev,e===e.next)break;i=!0}else e=e.next;while(i||e!==t);return t}function lo(n,t,e,i,s,r,o){if(!n)return;!o&&r&&Up(n,i,s,r);let a=n;for(;n.prev!==n.next;){let l=n.prev,c=n.next;if(r?Ep(n,i,s,r):wp(n)){t.push(l.i,n.i,c.i),ho(n),n=c.next,a=c.next;continue}if(n=c,n===a){o?o===1?(n=Ap(ys(n),t),lo(n,t,e,i,s,r,2)):o===2&&Cp(n,t,e,i,s,r):lo(ys(n),t,e,i,s,r,1);break}}}function wp(n){let t=n.prev,e=n,i=n.next;if(Fe(t,e,i)>=0)return!1;let s=t.x,r=e.x,o=i.x,a=t.y,l=e.y,c=i.y,h=Math.min(s,r,o),d=Math.min(a,l,c),u=Math.max(s,r,o),f=Math.max(a,l,c),g=i.next;for(;g!==t;){if(g.x>=h&&g.x<=u&&g.y>=d&&g.y<=f&&Or(s,a,r,l,o,c,g.x,g.y)&&Fe(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function Ep(n,t,e,i){let s=n.prev,r=n,o=n.next;if(Fe(s,r,o)>=0)return!1;let a=s.x,l=r.x,c=o.x,h=s.y,d=r.y,u=o.y,f=Math.min(a,l,c),g=Math.min(h,d,u),_=Math.max(a,l,c),m=Math.max(h,d,u),p=Ic(f,g,t,e,i),M=Ic(_,m,t,e,i),v=n.prevZ,x=n.nextZ;for(;v&&v.z>=p&&x&&x.z<=M;){if(v.x>=f&&v.x<=_&&v.y>=g&&v.y<=m&&v!==s&&v!==o&&Or(a,h,l,d,c,u,v.x,v.y)&&Fe(v.prev,v,v.next)>=0||(v=v.prevZ,x.x>=f&&x.x<=_&&x.y>=g&&x.y<=m&&x!==s&&x!==o&&Or(a,h,l,d,c,u,x.x,x.y)&&Fe(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;v&&v.z>=p;){if(v.x>=f&&v.x<=_&&v.y>=g&&v.y<=m&&v!==s&&v!==o&&Or(a,h,l,d,c,u,v.x,v.y)&&Fe(v.prev,v,v.next)>=0)return!1;v=v.prevZ}for(;x&&x.z<=M;){if(x.x>=f&&x.x<=_&&x.y>=g&&x.y<=m&&x!==s&&x!==o&&Or(a,h,l,d,c,u,x.x,x.y)&&Fe(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function Ap(n,t){let e=n;do{let i=e.prev,s=e.next.next;!hr(i,s)&&pd(i,e,e.next,s)&&co(i,s)&&co(s,i)&&(t.push(i.i,e.i,s.i),ho(e),ho(e.next),e=n=s),e=e.next}while(e!==n);return ys(e)}function Cp(n,t,e,i,s,r){let o=n;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&Op(o,a)){let l=md(o,a);o=ys(o,o.next),l=ys(l,l.next),lo(o,t,e,i,s,r,0),lo(l,t,e,i,s,r,0);return}a=a.next}o=o.next}while(o!==n)}function Rp(n,t,e,i){let s=[];for(let r=0,o=t.length;r<o;r++){let a=t[r]*i,l=r<o-1?t[r+1]*i:n.length,c=dd(n,a,l,i,!1);c===c.next&&(c.steiner=!0),s.push(Fp(c))}s.sort(Pp);for(let r=0;r<s.length;r++)e=Ip(s[r],e);return e}function Pp(n,t){let e=n.x-t.x;if(e===0&&(e=n.y-t.y,e===0)){let i=(n.next.y-n.y)/(n.next.x-n.x),s=(t.next.y-t.y)/(t.next.x-t.x);e=i-s}return e}function Ip(n,t){let e=Dp(n,t);if(!e)return t;let i=md(e,n);return ys(i,i.next),ys(e,e.next)}function Dp(n,t){let e=t,i=n.x,s=n.y,r=-1/0,o;if(hr(n,e))return e;do{if(hr(n,e.next))return e.next;if(s<=e.y&&s>=e.next.y&&e.next.y!==e.y){let d=e.x+(s-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(d<=i&&d>r&&(r=d,o=e.x<e.next.x?e:e.next,d===i))return o}e=e.next}while(e!==t);if(!o)return null;let a=o,l=o.x,c=o.y,h=1/0;e=o;do{if(i>=e.x&&e.x>=l&&i!==e.x&&fd(s<c?i:r,s,l,c,s<c?r:i,s,e.x,e.y)){let d=Math.abs(s-e.y)/(i-e.x);co(e,n)&&(d<h||d===h&&(e.x>o.x||e.x===o.x&&Lp(o,e)))&&(o=e,h=d)}e=e.next}while(e!==a);return o}function Lp(n,t){return Fe(n.prev,n,t.prev)<0&&Fe(t.next,n,n.next)<0}function Up(n,t,e,i){let s=n;do s.z===0&&(s.z=Ic(s.x,s.y,t,e,i)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==n);s.prevZ.nextZ=null,s.prevZ=null,Np(s)}function Np(n){let t,e=1;do{let i=n,s;n=null;let r=null;for(t=0;i;){t++;let o=i,a=0;for(let c=0;c<e&&(a++,o=o.nextZ,!!o);c++);let l=e;for(;a>0||l>0&&o;)a!==0&&(l===0||!o||i.z<=o.z)?(s=i,i=i.nextZ,a--):(s=o,o=o.nextZ,l--),r?r.nextZ=s:n=s,s.prevZ=r,r=s;i=o}r.nextZ=null,e*=2}while(t>1);return n}function Ic(n,t,e,i,s){return n=(n-e)*s|0,t=(t-i)*s|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,n|t<<1}function Fp(n){let t=n,e=n;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==n);return e}function fd(n,t,e,i,s,r,o,a){return(s-o)*(t-a)>=(n-o)*(r-a)&&(n-o)*(i-a)>=(e-o)*(t-a)&&(e-o)*(r-a)>=(s-o)*(i-a)}function Or(n,t,e,i,s,r,o,a){return!(n===o&&t===a)&&fd(n,t,e,i,s,r,o,a)}function Op(n,t){return n.next.i!==t.i&&n.prev.i!==t.i&&!Bp(n,t)&&(co(n,t)&&co(t,n)&&zp(n,t)&&(Fe(n.prev,n,t.prev)||Fe(n,t.prev,t))||hr(n,t)&&Fe(n.prev,n,n.next)>0&&Fe(t.prev,t,t.next)>0)}function Fe(n,t,e){return(t.y-n.y)*(e.x-t.x)-(t.x-n.x)*(e.y-t.y)}function hr(n,t){return n.x===t.x&&n.y===t.y}function pd(n,t,e,i){let s=ca(Fe(n,t,e)),r=ca(Fe(n,t,i)),o=ca(Fe(e,i,n)),a=ca(Fe(e,i,t));return!!(s!==r&&o!==a||s===0&&la(n,e,t)||r===0&&la(n,i,t)||o===0&&la(e,n,i)||a===0&&la(e,t,i))}function la(n,t,e){return t.x<=Math.max(n.x,e.x)&&t.x>=Math.min(n.x,e.x)&&t.y<=Math.max(n.y,e.y)&&t.y>=Math.min(n.y,e.y)}function ca(n){return n>0?1:n<0?-1:0}function Bp(n,t){let e=n;do{if(e.i!==n.i&&e.next.i!==n.i&&e.i!==t.i&&e.next.i!==t.i&&pd(e,e.next,n,t))return!0;e=e.next}while(e!==n);return!1}function co(n,t){return Fe(n.prev,n,n.next)<0?Fe(n,t,n.next)>=0&&Fe(n,n.prev,t)>=0:Fe(n,t,n.prev)<0||Fe(n,n.next,t)<0}function zp(n,t){let e=n,i=!1,s=(n.x+t.x)/2,r=(n.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(i=!i),e=e.next;while(e!==n);return i}function md(n,t){let e=Dc(n.i,n.x,n.y),i=Dc(t.i,t.x,t.y),s=n.next,r=t.prev;return n.next=t,t.prev=n,e.next=s,s.prev=e,i.next=e,e.prev=i,r.next=i,i.prev=r,i}function gu(n,t,e,i){let s=Dc(n,t,e);return i?(s.next=i.next,s.prev=i,i.next.prev=s,i.next=s):(s.prev=s,s.next=s),s}function ho(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function Dc(n,t,e){return{i:n,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function kp(n,t,e,i){let s=0;for(let r=t,o=e-i;r<e;r+=i)s+=(n[o]-n[r])*(n[r+1]+n[o+1]),o=r;return s}var Lc=class{static triangulate(t,e,i=2){return Tp(t,e,i)}},hs=class n{static area(t){let e=t.length,i=0;for(let s=e-1,r=0;r<e;s=r++)i+=t[s].x*t[r].y-t[r].x*t[s].y;return i*.5}static isClockWise(t){return n.area(t)<0}static triangulateShape(t,e){let i=[],s=[],r=[];_u(t),xu(i,t);let o=t.length;e.forEach(_u);for(let l=0;l<e.length;l++)s.push(o),o+=e[l].length,xu(i,e[l]);let a=Lc.triangulate(i,s);for(let l=0;l<a.length;l+=3)r.push(a.slice(l,l+3));return r}};function _u(n){let t=n.length;t>2&&n[t-1].equals(n[0])&&n.pop()}function xu(n,t){for(let e=0;e<t.length;e++)n.push(t[e].x),n.push(t[e].y)}var uo=class n extends be{constructor(t=new cr([new rt(.5,.5),new rt(-.5,.5),new rt(-.5,-.5),new rt(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];let i=this,s=[],r=[];for(let a=0,l=t.length;a<l;a++){let c=t[a];o(c)}this.setAttribute("position",new Kt(s,3)),this.setAttribute("uv",new Kt(r,2)),this.computeVertexNormals();function o(a){let l=[],c=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,d=e.depth!==void 0?e.depth:1,u=e.bevelEnabled!==void 0?e.bevelEnabled:!0,f=e.bevelThickness!==void 0?e.bevelThickness:.2,g=e.bevelSize!==void 0?e.bevelSize:f-.1,_=e.bevelOffset!==void 0?e.bevelOffset:0,m=e.bevelSegments!==void 0?e.bevelSegments:3,p=e.extrudePath,M=e.UVGenerator!==void 0?e.UVGenerator:Vp,v,x=!1,A,E,R,D;p&&(v=p.getSpacedPoints(h),x=!0,u=!1,A=p.computeFrenetFrames(h,!1),E=new P,R=new P,D=new P),u||(m=0,f=0,g=0,_=0);let T=a.extractPoints(c),b=T.shape,I=T.holes;if(!hs.isClockWise(b)){b=b.reverse();for(let tt=0,j=I.length;tt<j;tt++){let X=I[tt];hs.isClockWise(X)&&(I[tt]=X.reverse())}}function H(tt){let X=10000000000000001e-36,$=tt[0];for(let ft=1;ft<=tt.length;ft++){let ot=ft%tt.length,gt=tt[ot],Ot=gt.x-$.x,Vt=gt.y-$.y,w=Ot*Ot+Vt*Vt,y=Math.max(Math.abs(gt.x),Math.abs(gt.y),Math.abs($.x),Math.abs($.y)),N=X*y*y;if(w<=N){tt.splice(ot,1),ft--;continue}$=gt}}H(b),I.forEach(H);let Y=I.length,Z=b;for(let tt=0;tt<Y;tt++){let j=I[tt];b=b.concat(j)}function G(tt,j,X){return j||console.error("THREE.ExtrudeGeometry: vec does not exist"),tt.clone().addScaledVector(j,X)}let it=b.length;function W(tt,j,X){let $,ft,ot,gt=tt.x-j.x,Ot=tt.y-j.y,Vt=X.x-tt.x,w=X.y-tt.y,y=gt*gt+Ot*Ot,N=gt*w-Ot*Vt;if(Math.abs(N)>Number.EPSILON){let k=Math.sqrt(y),et=Math.sqrt(Vt*Vt+w*w),q=j.x-Ot/k,Et=j.y+gt/k,at=X.x-w/et,Dt=X.y+Vt/et,Rt=((at-q)*w-(Dt-Et)*Vt)/(gt*w-Ot*Vt);$=q+gt*Rt-tt.x,ft=Et+Ot*Rt-tt.y;let lt=$*$+ft*ft;if(lt<=2)return new rt($,ft);ot=Math.sqrt(lt/2)}else{let k=!1;gt>Number.EPSILON?Vt>Number.EPSILON&&(k=!0):gt<-Number.EPSILON?Vt<-Number.EPSILON&&(k=!0):Math.sign(Ot)===Math.sign(w)&&(k=!0),k?($=-Ot,ft=gt,ot=Math.sqrt(y)):($=gt,ft=Ot,ot=Math.sqrt(y/2))}return new rt($/ot,ft/ot)}let mt=[];for(let tt=0,j=Z.length,X=j-1,$=tt+1;tt<j;tt++,X++,$++)X===j&&(X=0),$===j&&($=0),mt[tt]=W(Z[tt],Z[X],Z[$]);let bt=[],Ct,Yt=mt.concat();for(let tt=0,j=Y;tt<j;tt++){let X=I[tt];Ct=[];for(let $=0,ft=X.length,ot=ft-1,gt=$+1;$<ft;$++,ot++,gt++)ot===ft&&(ot=0),gt===ft&&(gt=0),Ct[$]=W(X[$],X[ot],X[gt]);bt.push(Ct),Yt=Yt.concat(Ct)}let oe;if(m===0)oe=hs.triangulateShape(Z,I);else{let tt=[],j=[];for(let X=0;X<m;X++){let $=X/m,ft=f*Math.cos($*Math.PI/2),ot=g*Math.sin($*Math.PI/2)+_;for(let gt=0,Ot=Z.length;gt<Ot;gt++){let Vt=G(Z[gt],mt[gt],ot);_t(Vt.x,Vt.y,-ft),$===0&&tt.push(Vt)}for(let gt=0,Ot=Y;gt<Ot;gt++){let Vt=I[gt];Ct=bt[gt];let w=[];for(let y=0,N=Vt.length;y<N;y++){let k=G(Vt[y],Ct[y],ot);_t(k.x,k.y,-ft),$===0&&w.push(k)}$===0&&j.push(w)}}oe=hs.triangulateShape(tt,j)}let pe=oe.length,zt=g+_;for(let tt=0;tt<it;tt++){let j=u?G(b[tt],Yt[tt],zt):b[tt];x?(R.copy(A.normals[0]).multiplyScalar(j.x),E.copy(A.binormals[0]).multiplyScalar(j.y),D.copy(v[0]).add(R).add(E),_t(D.x,D.y,D.z)):_t(j.x,j.y,0)}for(let tt=1;tt<=h;tt++)for(let j=0;j<it;j++){let X=u?G(b[j],Yt[j],zt):b[j];x?(R.copy(A.normals[tt]).multiplyScalar(X.x),E.copy(A.binormals[tt]).multiplyScalar(X.y),D.copy(v[tt]).add(R).add(E),_t(D.x,D.y,D.z)):_t(X.x,X.y,d/h*tt)}for(let tt=m-1;tt>=0;tt--){let j=tt/m,X=f*Math.cos(j*Math.PI/2),$=g*Math.sin(j*Math.PI/2)+_;for(let ft=0,ot=Z.length;ft<ot;ft++){let gt=G(Z[ft],mt[ft],$);_t(gt.x,gt.y,d+X)}for(let ft=0,ot=I.length;ft<ot;ft++){let gt=I[ft];Ct=bt[ft];for(let Ot=0,Vt=gt.length;Ot<Vt;Ot++){let w=G(gt[Ot],Ct[Ot],$);x?_t(w.x,w.y+v[h-1].y,v[h-1].x+X):_t(w.x,w.y,d+X)}}}K(),nt();function K(){let tt=s.length/3;if(u){let j=0,X=it*j;for(let $=0;$<pe;$++){let ft=oe[$];Mt(ft[2]+X,ft[1]+X,ft[0]+X)}j=h+m*2,X=it*j;for(let $=0;$<pe;$++){let ft=oe[$];Mt(ft[0]+X,ft[1]+X,ft[2]+X)}}else{for(let j=0;j<pe;j++){let X=oe[j];Mt(X[2],X[1],X[0])}for(let j=0;j<pe;j++){let X=oe[j];Mt(X[0]+it*h,X[1]+it*h,X[2]+it*h)}}i.addGroup(tt,s.length/3-tt,0)}function nt(){let tt=s.length/3,j=0;wt(Z,j),j+=Z.length;for(let X=0,$=I.length;X<$;X++){let ft=I[X];wt(ft,j),j+=ft.length}i.addGroup(tt,s.length/3-tt,1)}function wt(tt,j){let X=tt.length;for(;--X>=0;){let $=X,ft=X-1;ft<0&&(ft=tt.length-1);for(let ot=0,gt=h+m*2;ot<gt;ot++){let Ot=it*ot,Vt=it*(ot+1),w=j+$+Ot,y=j+ft+Ot,N=j+ft+Vt,k=j+$+Vt;jt(w,y,N,k)}}}function _t(tt,j,X){l.push(tt),l.push(j),l.push(X)}function Mt(tt,j,X){te(tt),te(j),te(X);let $=s.length/3,ft=M.generateTopUV(i,s,$-3,$-2,$-1);C(ft[0]),C(ft[1]),C(ft[2])}function jt(tt,j,X,$){te(tt),te(j),te($),te(j),te(X),te($);let ft=s.length/3,ot=M.generateSideWallUV(i,s,ft-6,ft-3,ft-2,ft-1);C(ot[0]),C(ot[1]),C(ot[3]),C(ot[1]),C(ot[2]),C(ot[3])}function te(tt){s.push(l[tt*3+0]),s.push(l[tt*3+1]),s.push(l[tt*3+2])}function C(tt){r.push(tt.x),r.push(tt.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes,i=this.parameters.options;return Hp(e,i,t)}static fromJSON(t,e){let i=[];for(let r=0,o=t.shapes.length;r<o;r++){let a=e[t.shapes[r]];i.push(a)}let s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new Pc[s.type]().fromJSON(s)),new n(i,t.options)}},Vp={generateTopUV:function(n,t,e,i,s){let r=t[e*3],o=t[e*3+1],a=t[i*3],l=t[i*3+1],c=t[s*3],h=t[s*3+1];return[new rt(r,o),new rt(a,l),new rt(c,h)]},generateSideWallUV:function(n,t,e,i,s,r){let o=t[e*3],a=t[e*3+1],l=t[e*3+2],c=t[i*3],h=t[i*3+1],d=t[i*3+2],u=t[s*3],f=t[s*3+1],g=t[s*3+2],_=t[r*3],m=t[r*3+1],p=t[r*3+2];return Math.abs(a-h)<Math.abs(o-c)?[new rt(o,1-l),new rt(c,1-d),new rt(u,1-g),new rt(_,1-p)]:[new rt(a,1-l),new rt(h,1-d),new rt(f,1-g),new rt(m,1-p)]}};function Hp(n,t,e){if(e.shapes=[],Array.isArray(n))for(let i=0,s=n.length;i<s;i++){let r=n[i];e.shapes.push(r.uuid)}else e.shapes.push(n.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}var ur=class n extends Ta{constructor(t=1,e=0){let i=(1+Math.sqrt(5))/2,s=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new n(t.radius,t.detail)}},fo=class n extends be{constructor(t=[new rt(0,-.5),new rt(.5,0),new rt(0,.5)],e=12,i=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:i,phiLength:s},e=Math.floor(e),s=Qt(s,0,Math.PI*2);let r=[],o=[],a=[],l=[],c=[],h=1/e,d=new P,u=new rt,f=new P,g=new P,_=new P,m=0,p=0;for(let M=0;M<=t.length-1;M++)switch(M){case 0:m=t[M+1].x-t[M].x,p=t[M+1].y-t[M].y,f.x=p*1,f.y=-m,f.z=p*0,_.copy(f),f.normalize(),l.push(f.x,f.y,f.z);break;case t.length-1:l.push(_.x,_.y,_.z);break;default:m=t[M+1].x-t[M].x,p=t[M+1].y-t[M].y,f.x=p*1,f.y=-m,f.z=p*0,g.copy(f),f.x+=_.x,f.y+=_.y,f.z+=_.z,f.normalize(),l.push(f.x,f.y,f.z),_.copy(g)}for(let M=0;M<=e;M++){let v=i+M*h*s,x=Math.sin(v),A=Math.cos(v);for(let E=0;E<=t.length-1;E++){d.x=t[E].x*x,d.y=t[E].y,d.z=t[E].x*A,o.push(d.x,d.y,d.z),u.x=M/e,u.y=E/(t.length-1),a.push(u.x,u.y);let R=l[3*E+0]*x,D=l[3*E+1],T=l[3*E+0]*A;c.push(R,D,T)}}for(let M=0;M<e;M++)for(let v=0;v<t.length-1;v++){let x=v+M*t.length,A=x,E=x+t.length,R=x+t.length+1,D=x+1;r.push(A,E,D),r.push(R,D,E)}this.setIndex(r),this.setAttribute("position",new Kt(o,3)),this.setAttribute("uv",new Kt(a,2)),this.setAttribute("normal",new Kt(c,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.points,t.segments,t.phiStart,t.phiLength)}};var En=class n extends be{constructor(t=1,e=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:s};let r=t/2,o=e/2,a=Math.floor(i),l=Math.floor(s),c=a+1,h=l+1,d=t/a,u=e/l,f=[],g=[],_=[],m=[];for(let p=0;p<h;p++){let M=p*u-o;for(let v=0;v<c;v++){let x=v*d-r;g.push(x,-M,0),_.push(0,0,1),m.push(v/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let M=0;M<a;M++){let v=M+c*p,x=M+c*(p+1),A=M+1+c*(p+1),E=M+1+c*p;f.push(v,x,E),f.push(x,A,E)}this.setIndex(f),this.setAttribute("position",new Kt(g,3)),this.setAttribute("normal",new Kt(_,3)),this.setAttribute("uv",new Kt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.width,t.height,t.widthSegments,t.heightSegments)}};var vs=class n extends be{constructor(t=1,e=32,i=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));let l=Math.min(o+a,Math.PI),c=0,h=[],d=new P,u=new P,f=[],g=[],_=[],m=[];for(let p=0;p<=i;p++){let M=[],v=p/i,x=0;p===0&&o===0?x=.5/e:p===i&&l===Math.PI&&(x=-.5/e);for(let A=0;A<=e;A++){let E=A/e;d.x=-t*Math.cos(s+E*r)*Math.sin(o+v*a),d.y=t*Math.cos(o+v*a),d.z=t*Math.sin(s+E*r)*Math.sin(o+v*a),g.push(d.x,d.y,d.z),u.copy(d).normalize(),_.push(u.x,u.y,u.z),m.push(E+x,1-v),M.push(c++)}h.push(M)}for(let p=0;p<i;p++)for(let M=0;M<e;M++){let v=h[p][M+1],x=h[p][M],A=h[p+1][M],E=h[p+1][M+1];(p!==0||o>0)&&f.push(v,x,E),(p!==i-1||l<Math.PI)&&f.push(x,A,E)}this.setIndex(f),this.setAttribute("position",new Kt(g,3)),this.setAttribute("normal",new Kt(_,3)),this.setAttribute("uv",new Kt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var po=class n extends be{constructor(t=1,e=.4,i=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:i,tubularSegments:s,arc:r},i=Math.floor(i),s=Math.floor(s);let o=[],a=[],l=[],c=[],h=new P,d=new P,u=new P;for(let f=0;f<=i;f++)for(let g=0;g<=s;g++){let _=g/s*r,m=f/i*Math.PI*2;d.x=(t+e*Math.cos(m))*Math.cos(_),d.y=(t+e*Math.cos(m))*Math.sin(_),d.z=e*Math.sin(m),a.push(d.x,d.y,d.z),h.x=t*Math.cos(_),h.y=t*Math.sin(_),u.subVectors(d,h).normalize(),l.push(u.x,u.y,u.z),c.push(g/s),c.push(f/i)}for(let f=1;f<=i;f++)for(let g=1;g<=s;g++){let _=(s+1)*f+g-1,m=(s+1)*(f-1)+g-1,p=(s+1)*(f-1)+g,M=(s+1)*f+g;o.push(_,m,M),o.push(m,p,M)}this.setIndex(o),this.setAttribute("position",new Kt(a,3)),this.setAttribute("normal",new Kt(l,3)),this.setAttribute("uv",new Kt(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}};var hn=class extends mi{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new St(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new St(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=$c,this.normalScale=new rt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new gn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};var Pa=class extends mi{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=ju,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},Ia=class extends mi{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function ha(n,t){return!n||n.constructor===t?n:typeof t.BYTES_PER_ELEMENT=="number"?new t(n):Array.prototype.slice.call(n)}function Gp(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}var Ms=class{constructor(t,e,i,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(i),this.sampleValues=e,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,i=this._cachedIndex,s=e[i],r=e[i-1];n:{t:{let o;e:{i:if(!(t<s)){for(let a=i+2;;){if(s===void 0){if(t<r)break i;return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===a)break;if(r=s,s=e[++i],t<s)break t}o=e.length;break e}if(!(t>=r)){let a=e[1];t<a&&(i=2,r=a);for(let l=i-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(s=r,r=e[--i-1],t>=r)break t}o=i,i=0;break e}break n}for(;i<o;){let a=i+o>>>1;t<e[a]?o=a:i=a+1}if(s=e[i],r=e[i-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,r,s)}return this.interpolate_(i,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,i=this.sampleValues,s=this.valueSize,r=t*s;for(let o=0;o!==s;++o)e[o]=i[r+o];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Da=class extends Ms{constructor(t,e,i,s){super(t,e,i,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Tc,endingEnd:Tc}}intervalChanged_(t,e,i){let s=this.parameterPositions,r=t-2,o=t+1,a=s[r],l=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case wc:r=t,a=2*e-i;break;case Ec:r=s.length-2,a=e+s[r]-s[r+1];break;default:r=t,a=i}if(l===void 0)switch(this.getSettings_().endingEnd){case wc:o=t,l=2*i-e;break;case Ec:o=1,l=i+s[1]-s[0];break;default:o=t-1,l=e}let c=(i-e)*.5,h=this.valueSize;this._weightPrev=c/(e-a),this._weightNext=c/(l-i),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(t,e,i,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=this._offsetPrev,d=this._offsetNext,u=this._weightPrev,f=this._weightNext,g=(i-e)/(s-e),_=g*g,m=_*g,p=-u*m+2*u*_-u*g,M=(1+u)*m+(-1.5-2*u)*_+(-.5+u)*g+1,v=(-1-f)*m+(1.5+f)*_+.5*g,x=f*m-f*_;for(let A=0;A!==a;++A)r[A]=p*o[h+A]+M*o[c+A]+v*o[l+A]+x*o[d+A];return r}},La=class extends Ms{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t,e,i,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=(i-e)/(s-e),d=1-h;for(let u=0;u!==a;++u)r[u]=o[c+u]*d+o[l+u]*h;return r}},Ua=class extends Ms{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t){return this.copySampleValue_(t-1)}},On=class{constructor(t,e,i,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=ha(e,this.TimeBufferType),this.values=ha(i,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,i;if(e.toJSON!==this.toJSON)i=e.toJSON(t);else{i={name:t.name,times:ha(t.times,Array),values:ha(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(i.interpolation=s)}return i.type=t.ValueTypeName,i}InterpolantFactoryMethodDiscrete(t){return new Ua(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new La(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Da(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case Hr:e=this.InterpolantFactoryMethodDiscrete;break;case ma:e=this.InterpolantFactoryMethodLinear;break;case ua:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return console.warn("THREE.KeyframeTrack:",i),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Hr;case this.InterpolantFactoryMethodLinear:return ma;case this.InterpolantFactoryMethodSmooth:return ua}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let i=0,s=e.length;i!==s;++i)e[i]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let i=0,s=e.length;i!==s;++i)e[i]*=t}return this}trim(t,e){let i=this.times,s=i.length,r=0,o=s-1;for(;r!==s&&i[r]<t;)++r;for(;o!==-1&&i[o]>e;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=i.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let i=this.times,s=this.values,r=i.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){let l=i[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),t=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),t=!1;break}o=l}if(s!==void 0&&Gp(s))for(let a=0,l=s.length;a!==l;++a){let c=s[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),i=this.getValueSize(),s=this.getInterpolation()===ua,r=t.length-1,o=1;for(let a=1;a<r;++a){let l=!1,c=t[a],h=t[a+1];if(c!==h&&(a!==1||c!==t[0]))if(s)l=!0;else{let d=a*i,u=d-i,f=d+i;for(let g=0;g!==i;++g){let _=e[d+g];if(_!==e[u+g]||_!==e[f+g]){l=!0;break}}}if(l){if(a!==o){t[o]=t[a];let d=a*i,u=o*i;for(let f=0;f!==i;++f)e[u+f]=e[d+f]}++o}}if(r>0){t[o]=t[r];for(let a=r*i,l=o*i,c=0;c!==i;++c)e[l+c]=e[a+c];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*i)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),i=this.constructor,s=new i(this.name,t,e);return s.createInterpolant=this.createInterpolant,s}};On.prototype.ValueTypeName="";On.prototype.TimeBufferType=Float32Array;On.prototype.ValueBufferType=Float32Array;On.prototype.DefaultInterpolation=ma;var Wi=class extends On{constructor(t,e,i){super(t,e,i)}};Wi.prototype.ValueTypeName="bool";Wi.prototype.ValueBufferType=Array;Wi.prototype.DefaultInterpolation=Hr;Wi.prototype.InterpolantFactoryMethodLinear=void 0;Wi.prototype.InterpolantFactoryMethodSmooth=void 0;var Na=class extends On{constructor(t,e,i,s){super(t,e,i,s)}};Na.prototype.ValueTypeName="color";var Fa=class extends On{constructor(t,e,i,s){super(t,e,i,s)}};Fa.prototype.ValueTypeName="number";var Oa=class extends Ms{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t,e,i,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(i-e)/(s-e),c=t*a;for(let h=c+a;c!==h;c+=4)ke.slerpFlat(r,0,o,c-a,o,c,l);return r}},mo=class extends On{constructor(t,e,i,s){super(t,e,i,s)}InterpolantFactoryMethodLinear(t){return new Oa(this.times,this.values,this.getValueSize(),t)}};mo.prototype.ValueTypeName="quaternion";mo.prototype.InterpolantFactoryMethodSmooth=void 0;var Xi=class extends On{constructor(t,e,i){super(t,e,i)}};Xi.prototype.ValueTypeName="string";Xi.prototype.ValueBufferType=Array;Xi.prototype.DefaultInterpolation=Hr;Xi.prototype.InterpolantFactoryMethodLinear=void 0;Xi.prototype.InterpolantFactoryMethodSmooth=void 0;var Ba=class extends On{constructor(t,e,i,s){super(t,e,i,s)}};Ba.prototype.ValueTypeName="vector";var za=class{constructor(t,e,i){let s=this,r=!1,o=0,a=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=i,this.abortController=new AbortController,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,d){return c.push(h,d),this},this.removeHandler=function(h){let d=c.indexOf(h);return d!==-1&&c.splice(d,2),this},this.getHandler=function(h){for(let d=0,u=c.length;d<u;d+=2){let f=c[d],g=c[d+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}},gd=new za,ka=class{constructor(t){this.manager=t!==void 0?t:gd,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){let i=this;return new Promise(function(s,r){i.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};ka.DEFAULT_MATERIAL_NAME="__DEFAULT";var Ss=class extends Ge{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new St(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}},bs=class extends Ss{constructor(t,e,i){super(t,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ge.DEFAULT_UP),this.updateMatrix(),this.groundColor=new St(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}},Sc=new ne,yu=new P,vu=new P,go=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new rt(512,512),this.mapType=ri,this.map=null,this.mapPass=null,this.matrix=new ne,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new rr,this._frameExtents=new rt(1,1),this._viewportCount=1,this._viewports=[new ge(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera,i=this.matrix;yu.setFromMatrixPosition(t.matrixWorld),e.position.copy(yu),vu.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(vu),e.updateMatrixWorld(),Sc.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Sc,e.coordinateSystem,e.reversedDepth),e.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Sc)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},Uc=class extends go{constructor(){super(new He(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(t){let e=this.camera,i=ps*2*t.angle*this.focus,s=this.mapSize.width/this.mapSize.height*this.aspect,r=t.distance||e.far;(i!==e.fov||s!==e.aspect||r!==e.far)&&(e.fov=i,e.aspect=s,e.far=r,e.updateProjectionMatrix()),super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this}},_o=class extends Ss{constructor(t,e,i=0,s=Math.PI/3,r=0,o=2){super(t,e),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Ge.DEFAULT_UP),this.updateMatrix(),this.target=new Ge,this.distance=i,this.angle=s,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new Uc}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}},Mu=new ne,Fr=new P,bc=new P,Nc=class extends go{constructor(){super(new He(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new rt(4,2),this._viewportCount=6,this._viewports=[new ge(2,1,1,1),new ge(0,1,1,1),new ge(3,1,1,1),new ge(1,1,1,1),new ge(3,0,1,1),new ge(1,0,1,1)],this._cubeDirections=[new P(1,0,0),new P(-1,0,0),new P(0,0,1),new P(0,0,-1),new P(0,1,0),new P(0,-1,0)],this._cubeUps=[new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,0,1),new P(0,0,-1)]}updateMatrices(t,e=0){let i=this.camera,s=this.matrix,r=t.distance||i.far;r!==i.far&&(i.far=r,i.updateProjectionMatrix()),Fr.setFromMatrixPosition(t.matrixWorld),i.position.copy(Fr),bc.copy(i.position),bc.add(this._cubeDirections[e]),i.up.copy(this._cubeUps[e]),i.lookAt(bc),i.updateMatrixWorld(),s.makeTranslation(-Fr.x,-Fr.y,-Fr.z),Mu.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Mu,i.coordinateSystem,i.reversedDepth)}},gi=class extends Ss{constructor(t,e,i=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new Nc}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}},xo=class extends Kr{constructor(t=-1,e=1,i=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=i-t,o=i+t,a=s+e,l=s-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},Fc=class extends go{constructor(){super(new xo(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},yo=class extends Ss{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ge.DEFAULT_UP),this.updateMatrix(),this.target=new Ge,this.shadow=new Fc}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}};var Va=class extends He{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}};var sh="\\[\\]\\.:\\/",Wp=new RegExp("["+sh+"]","g"),rh="[^"+sh+"]",Xp="[^"+sh.replace("\\.","")+"]",qp=/((?:WC+[\/:])*)/.source.replace("WC",rh),Yp=/(WCOD+)?/.source.replace("WCOD",Xp),Zp=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",rh),Jp=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",rh),Kp=new RegExp("^"+qp+Yp+Zp+Jp+"$"),$p=["material","materials","bones","map"],Oc=class{constructor(t,e,i){let s=i||Ae.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let i=this._targetGroup.nCachedObjects_,s=this._bindings[i];s!==void 0&&s.getValue(t,e)}setValue(t,e){let i=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=i.length;s!==r;++s)i[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].unbind()}},Ae=class n{constructor(t,e,i){this.path=e,this.parsedPath=i||n.parseTrackName(e),this.node=n.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,i){return t&&t.isAnimationObjectGroup?new n.Composite(t,e,i):new n(t,e,i)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(Wp,"")}static parseTrackName(t){let e=Kp.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let i={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=i.nodeName&&i.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=i.nodeName.substring(s+1);$p.indexOf(r)!==-1&&(i.nodeName=i.nodeName.substring(0,s),i.objectName=r)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return i}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let i=t.skeleton.getBoneByName(e);if(i!==void 0)return i}if(t.children){let i=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===e||a.uuid===e)return a;let l=i(a.children);if(l)return l}return null},s=i(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)t[e++]=i[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,i=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=n.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=e.objectIndex;switch(i){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[i]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[i]}if(c!==void 0){if(t[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let o=t[s];if(o===void 0){let c=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?a=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Ae.Composite=Oc;Ae.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Ae.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Ae.prototype.GetterByBindingType=[Ae.prototype._getValue_direct,Ae.prototype._getValue_array,Ae.prototype._getValue_arrayElement,Ae.prototype._getValue_toArray];Ae.prototype.SetterByBindingTypeAndVersioning=[[Ae.prototype._setValue_direct,Ae.prototype._setValue_direct_setNeedsUpdate,Ae.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Ae.prototype._setValue_array,Ae.prototype._setValue_array_setNeedsUpdate,Ae.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Ae.prototype._setValue_arrayElement,Ae.prototype._setValue_arrayElement_setNeedsUpdate,Ae.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Ae.prototype._setValue_fromArray,Ae.prototype._setValue_fromArray_setNeedsUpdate,Ae.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Dx=new Float32Array(1);var dr=class{constructor(t=1,e=0,i=0){this.radius=t,this.phi=e,this.theta=i}set(t,e,i){return this.radius=t,this.phi=e,this.theta=i,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Qt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,i){return this.radius=Math.sqrt(t*t+e*e+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,i),this.phi=Math.acos(Qt(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var vo=class extends di{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){if(t===void 0){console.warn("THREE.Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}};function oh(n,t,e,i){let s=jp(i);switch(e){case Zc:return n*t;case xr:return n*t/s.components*s.byteLength;case nl:return n*t/s.components*s.byteLength;case Kc:return n*t*2/s.components*s.byteLength;case il:return n*t*2/s.components*s.byteLength;case Jc:return n*t*3/s.components*s.byteLength;case Kn:return n*t*4/s.components*s.byteLength;case sl:return n*t*4/s.components*s.byteLength;case bo:case To:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case wo:case Eo:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case ol:case ll:return Math.max(n,16)*Math.max(t,8)/4;case rl:case al:return Math.max(n,8)*Math.max(t,8)/2;case cl:case hl:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case ul:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case dl:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case fl:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case pl:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case ml:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case gl:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case _l:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case xl:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case yl:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case vl:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case Ml:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case Sl:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case bl:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case Tl:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case wl:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case El:case Al:case Cl:return Math.ceil(n/4)*Math.ceil(t/4)*16;case Rl:case Pl:return Math.ceil(n/4)*Math.ceil(t/4)*8;case Il:case Dl:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function jp(n){switch(n){case ri:case Wc:return{byteLength:1,components:1};case pr:case Xc:case mr:return{byteLength:2,components:1};case tl:case el:return{byteLength:2,components:4};case Ji:case Qa:case oi:return{byteLength:4,components:1};case qc:case Yc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"180"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="180");function kd(){let n=null,t=!1,e=null,i=null;function s(r,o){e(r,o),i=n.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(i=n.requestAnimationFrame(s),t=!0)},stop:function(){n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){n=r}}}function tm(n){let t=new WeakMap;function e(a,l){let c=a.array,h=a.usage,d=c.byteLength,u=n.createBuffer();n.bindBuffer(l,u),n.bufferData(l,c,h),a.onUploadCallback();let f;if(c instanceof Float32Array)f=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=n.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=n.HALF_FLOAT:f=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=n.SHORT;else if(c instanceof Uint32Array)f=n.UNSIGNED_INT;else if(c instanceof Int32Array)f=n.INT;else if(c instanceof Int8Array)f=n.BYTE;else if(c instanceof Uint8Array)f=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:d}}function i(a,l,c){let h=l.array,d=l.updateRanges;if(n.bindBuffer(c,a),d.length===0)n.bufferSubData(c,0,h);else{d.sort((f,g)=>f.start-g.start);let u=0;for(let f=1;f<d.length;f++){let g=d[u],_=d[f];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++u,d[u]=_)}d.length=u+1;for(let f=0,g=d.length;f<g;f++){let _=d[f];n.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let l=t.get(a);l&&(n.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}var em=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,nm=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,im=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,sm=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,rm=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,om=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,am=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,lm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,cm=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,hm=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,um=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,dm=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,fm=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,pm=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,mm=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,gm=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,_m=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,xm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,ym=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,vm=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Mm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Sm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,bm=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Tm=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,wm=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Em=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Am=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Cm=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Rm=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Pm=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Im="gl_FragColor = linearToOutputTexel( gl_FragColor );",Dm=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Lm=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Um=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Nm=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Fm=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Om=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Bm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,zm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,km=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Vm=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Hm=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Gm=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Wm=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Xm=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,qm=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Ym=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Zm=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Jm=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Km=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,$m=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,jm=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Qm=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,t0=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,e0=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,n0=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,i0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,s0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,r0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,o0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,a0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,l0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,c0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,h0=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,u0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,d0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,f0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,p0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,m0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,g0=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,_0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,x0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,y0=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,v0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,M0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,S0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,b0=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,T0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,w0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,E0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,A0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,C0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,R0=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,P0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,I0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,D0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,L0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,U0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,N0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,F0=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,O0=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,B0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,z0=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,k0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,V0=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,H0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,G0=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,W0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,X0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,q0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Y0=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Z0=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,J0=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,K0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,$0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,j0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Q0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,tg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,eg=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ng=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ig=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,sg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,rg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,og=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,ag=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,lg=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,cg=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,hg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,ug=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,dg=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,fg=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,pg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,mg=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,gg=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,_g=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,xg=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,yg=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,vg=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Mg=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Sg=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,bg=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Tg=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,wg=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Eg=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ag=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Cg=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Rg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Pg=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ig=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Dg=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Lg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ie={alphahash_fragment:em,alphahash_pars_fragment:nm,alphamap_fragment:im,alphamap_pars_fragment:sm,alphatest_fragment:rm,alphatest_pars_fragment:om,aomap_fragment:am,aomap_pars_fragment:lm,batching_pars_vertex:cm,batching_vertex:hm,begin_vertex:um,beginnormal_vertex:dm,bsdfs:fm,iridescence_fragment:pm,bumpmap_pars_fragment:mm,clipping_planes_fragment:gm,clipping_planes_pars_fragment:_m,clipping_planes_pars_vertex:xm,clipping_planes_vertex:ym,color_fragment:vm,color_pars_fragment:Mm,color_pars_vertex:Sm,color_vertex:bm,common:Tm,cube_uv_reflection_fragment:wm,defaultnormal_vertex:Em,displacementmap_pars_vertex:Am,displacementmap_vertex:Cm,emissivemap_fragment:Rm,emissivemap_pars_fragment:Pm,colorspace_fragment:Im,colorspace_pars_fragment:Dm,envmap_fragment:Lm,envmap_common_pars_fragment:Um,envmap_pars_fragment:Nm,envmap_pars_vertex:Fm,envmap_physical_pars_fragment:Ym,envmap_vertex:Om,fog_vertex:Bm,fog_pars_vertex:zm,fog_fragment:km,fog_pars_fragment:Vm,gradientmap_pars_fragment:Hm,lightmap_pars_fragment:Gm,lights_lambert_fragment:Wm,lights_lambert_pars_fragment:Xm,lights_pars_begin:qm,lights_toon_fragment:Zm,lights_toon_pars_fragment:Jm,lights_phong_fragment:Km,lights_phong_pars_fragment:$m,lights_physical_fragment:jm,lights_physical_pars_fragment:Qm,lights_fragment_begin:t0,lights_fragment_maps:e0,lights_fragment_end:n0,logdepthbuf_fragment:i0,logdepthbuf_pars_fragment:s0,logdepthbuf_pars_vertex:r0,logdepthbuf_vertex:o0,map_fragment:a0,map_pars_fragment:l0,map_particle_fragment:c0,map_particle_pars_fragment:h0,metalnessmap_fragment:u0,metalnessmap_pars_fragment:d0,morphinstance_vertex:f0,morphcolor_vertex:p0,morphnormal_vertex:m0,morphtarget_pars_vertex:g0,morphtarget_vertex:_0,normal_fragment_begin:x0,normal_fragment_maps:y0,normal_pars_fragment:v0,normal_pars_vertex:M0,normal_vertex:S0,normalmap_pars_fragment:b0,clearcoat_normal_fragment_begin:T0,clearcoat_normal_fragment_maps:w0,clearcoat_pars_fragment:E0,iridescence_pars_fragment:A0,opaque_fragment:C0,packing:R0,premultiplied_alpha_fragment:P0,project_vertex:I0,dithering_fragment:D0,dithering_pars_fragment:L0,roughnessmap_fragment:U0,roughnessmap_pars_fragment:N0,shadowmap_pars_fragment:F0,shadowmap_pars_vertex:O0,shadowmap_vertex:B0,shadowmask_pars_fragment:z0,skinbase_vertex:k0,skinning_pars_vertex:V0,skinning_vertex:H0,skinnormal_vertex:G0,specularmap_fragment:W0,specularmap_pars_fragment:X0,tonemapping_fragment:q0,tonemapping_pars_fragment:Y0,transmission_fragment:Z0,transmission_pars_fragment:J0,uv_pars_fragment:K0,uv_pars_vertex:$0,uv_vertex:j0,worldpos_vertex:Q0,background_vert:tg,background_frag:eg,backgroundCube_vert:ng,backgroundCube_frag:ig,cube_vert:sg,cube_frag:rg,depth_vert:og,depth_frag:ag,distanceRGBA_vert:lg,distanceRGBA_frag:cg,equirect_vert:hg,equirect_frag:ug,linedashed_vert:dg,linedashed_frag:fg,meshbasic_vert:pg,meshbasic_frag:mg,meshlambert_vert:gg,meshlambert_frag:_g,meshmatcap_vert:xg,meshmatcap_frag:yg,meshnormal_vert:vg,meshnormal_frag:Mg,meshphong_vert:Sg,meshphong_frag:bg,meshphysical_vert:Tg,meshphysical_frag:wg,meshtoon_vert:Eg,meshtoon_frag:Ag,points_vert:Cg,points_frag:Rg,shadow_vert:Pg,shadow_frag:Ig,sprite_vert:Dg,sprite_frag:Lg},vt={common:{diffuse:{value:new St(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new $t},alphaMap:{value:null},alphaMapTransform:{value:new $t},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new $t}},envmap:{envMap:{value:null},envMapRotation:{value:new $t},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new $t}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new $t}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new $t},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new $t},normalScale:{value:new rt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new $t},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new $t}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new $t}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new $t}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new St(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new St(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new $t},alphaTest:{value:0},uvTransform:{value:new $t}},sprite:{diffuse:{value:new St(16777215)},opacity:{value:1},center:{value:new rt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new $t},alphaMap:{value:null},alphaMapTransform:{value:new $t},alphaTest:{value:0}}},yi={basic:{uniforms:un([vt.common,vt.specularmap,vt.envmap,vt.aomap,vt.lightmap,vt.fog]),vertexShader:ie.meshbasic_vert,fragmentShader:ie.meshbasic_frag},lambert:{uniforms:un([vt.common,vt.specularmap,vt.envmap,vt.aomap,vt.lightmap,vt.emissivemap,vt.bumpmap,vt.normalmap,vt.displacementmap,vt.fog,vt.lights,{emissive:{value:new St(0)}}]),vertexShader:ie.meshlambert_vert,fragmentShader:ie.meshlambert_frag},phong:{uniforms:un([vt.common,vt.specularmap,vt.envmap,vt.aomap,vt.lightmap,vt.emissivemap,vt.bumpmap,vt.normalmap,vt.displacementmap,vt.fog,vt.lights,{emissive:{value:new St(0)},specular:{value:new St(1118481)},shininess:{value:30}}]),vertexShader:ie.meshphong_vert,fragmentShader:ie.meshphong_frag},standard:{uniforms:un([vt.common,vt.envmap,vt.aomap,vt.lightmap,vt.emissivemap,vt.bumpmap,vt.normalmap,vt.displacementmap,vt.roughnessmap,vt.metalnessmap,vt.fog,vt.lights,{emissive:{value:new St(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ie.meshphysical_vert,fragmentShader:ie.meshphysical_frag},toon:{uniforms:un([vt.common,vt.aomap,vt.lightmap,vt.emissivemap,vt.bumpmap,vt.normalmap,vt.displacementmap,vt.gradientmap,vt.fog,vt.lights,{emissive:{value:new St(0)}}]),vertexShader:ie.meshtoon_vert,fragmentShader:ie.meshtoon_frag},matcap:{uniforms:un([vt.common,vt.bumpmap,vt.normalmap,vt.displacementmap,vt.fog,{matcap:{value:null}}]),vertexShader:ie.meshmatcap_vert,fragmentShader:ie.meshmatcap_frag},points:{uniforms:un([vt.points,vt.fog]),vertexShader:ie.points_vert,fragmentShader:ie.points_frag},dashed:{uniforms:un([vt.common,vt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ie.linedashed_vert,fragmentShader:ie.linedashed_frag},depth:{uniforms:un([vt.common,vt.displacementmap]),vertexShader:ie.depth_vert,fragmentShader:ie.depth_frag},normal:{uniforms:un([vt.common,vt.bumpmap,vt.normalmap,vt.displacementmap,{opacity:{value:1}}]),vertexShader:ie.meshnormal_vert,fragmentShader:ie.meshnormal_frag},sprite:{uniforms:un([vt.sprite,vt.fog]),vertexShader:ie.sprite_vert,fragmentShader:ie.sprite_frag},background:{uniforms:{uvTransform:{value:new $t},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ie.background_vert,fragmentShader:ie.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new $t}},vertexShader:ie.backgroundCube_vert,fragmentShader:ie.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ie.cube_vert,fragmentShader:ie.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ie.equirect_vert,fragmentShader:ie.equirect_frag},distanceRGBA:{uniforms:un([vt.common,vt.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ie.distanceRGBA_vert,fragmentShader:ie.distanceRGBA_frag},shadow:{uniforms:un([vt.lights,vt.fog,{color:{value:new St(0)},opacity:{value:1}}]),vertexShader:ie.shadow_vert,fragmentShader:ie.shadow_frag}};yi.physical={uniforms:un([yi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new $t},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new $t},clearcoatNormalScale:{value:new rt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new $t},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new $t},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new $t},sheen:{value:0},sheenColor:{value:new St(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new $t},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new $t},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new $t},transmissionSamplerSize:{value:new rt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new $t},attenuationDistance:{value:0},attenuationColor:{value:new St(0)},specularColor:{value:new St(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new $t},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new $t},anisotropyVector:{value:new rt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new $t}}]),vertexShader:ie.meshphysical_vert,fragmentShader:ie.meshphysical_frag};var Ll={r:0,b:0,g:0},Cs=new gn,Ug=new ne;function Ng(n,t,e,i,s,r,o){let a=new St(0),l=r===!0?0:1,c,h,d=null,u=0,f=null;function g(v){let x=v.isScene===!0?v.background:null;return x&&x.isTexture&&(x=(v.backgroundBlurriness>0?e:t).get(x)),x}function _(v){let x=!1,A=g(v);A===null?p(a,l):A&&A.isColor&&(p(A,1),x=!0);let E=n.xr.getEnvironmentBlendMode();E==="additive"?i.buffers.color.setClear(0,0,0,1,o):E==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||x)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(v,x){let A=g(x);A&&(A.isCubeTexture||A.mapping===Mo)?(h===void 0&&(h=new ve(new Hi(1,1,1),new wn({name:"BackgroundCubeMaterial",uniforms:As(yi.backgroundCube.uniforms),vertexShader:yi.backgroundCube.vertexShader,fragmentShader:yi.backgroundCube.fragmentShader,side:sn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(E,R,D){this.matrixWorld.copyPosition(D.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),Cs.copy(x.backgroundRotation),Cs.x*=-1,Cs.y*=-1,Cs.z*=-1,A.isCubeTexture&&A.isRenderTargetTexture===!1&&(Cs.y*=-1,Cs.z*=-1),h.material.uniforms.envMap.value=A,h.material.uniforms.flipEnvMap.value=A.isCubeTexture&&A.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Ug.makeRotationFromEuler(Cs)),h.material.toneMapped=he.getTransfer(A.colorSpace)!==_e,(d!==A||u!==A.version||f!==n.toneMapping)&&(h.material.needsUpdate=!0,d=A,u=A.version,f=n.toneMapping),h.layers.enableAll(),v.unshift(h,h.geometry,h.material,0,0,null)):A&&A.isTexture&&(c===void 0&&(c=new ve(new En(2,2),new wn({name:"BackgroundMaterial",uniforms:As(yi.background.uniforms),vertexShader:yi.background.vertexShader,fragmentShader:yi.background.fragmentShader,side:Ci,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=A,c.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,c.material.toneMapped=he.getTransfer(A.colorSpace)!==_e,A.matrixAutoUpdate===!0&&A.updateMatrix(),c.material.uniforms.uvTransform.value.copy(A.matrix),(d!==A||u!==A.version||f!==n.toneMapping)&&(c.material.needsUpdate=!0,d=A,u=A.version,f=n.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null))}function p(v,x){v.getRGB(Ll,nh(n)),i.buffers.color.setClear(Ll.r,Ll.g,Ll.b,x,o)}function M(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(v,x=1){a.set(v),l=x,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(v){l=v,p(a,l)},render:_,addToRenderList:m,dispose:M}}function Fg(n,t){let e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=u(null),r=s,o=!1;function a(b,I,O,H,Y){let Z=!1,G=d(H,O,I);r!==G&&(r=G,c(r.object)),Z=f(b,H,O,Y),Z&&g(b,H,O,Y),Y!==null&&t.update(Y,n.ELEMENT_ARRAY_BUFFER),(Z||o)&&(o=!1,x(b,I,O,H),Y!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(Y).buffer))}function l(){return n.createVertexArray()}function c(b){return n.bindVertexArray(b)}function h(b){return n.deleteVertexArray(b)}function d(b,I,O){let H=O.wireframe===!0,Y=i[b.id];Y===void 0&&(Y={},i[b.id]=Y);let Z=Y[I.id];Z===void 0&&(Z={},Y[I.id]=Z);let G=Z[H];return G===void 0&&(G=u(l()),Z[H]=G),G}function u(b){let I=[],O=[],H=[];for(let Y=0;Y<e;Y++)I[Y]=0,O[Y]=0,H[Y]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:O,attributeDivisors:H,object:b,attributes:{},index:null}}function f(b,I,O,H){let Y=r.attributes,Z=I.attributes,G=0,it=O.getAttributes();for(let W in it)if(it[W].location>=0){let bt=Y[W],Ct=Z[W];if(Ct===void 0&&(W==="instanceMatrix"&&b.instanceMatrix&&(Ct=b.instanceMatrix),W==="instanceColor"&&b.instanceColor&&(Ct=b.instanceColor)),bt===void 0||bt.attribute!==Ct||Ct&&bt.data!==Ct.data)return!0;G++}return r.attributesNum!==G||r.index!==H}function g(b,I,O,H){let Y={},Z=I.attributes,G=0,it=O.getAttributes();for(let W in it)if(it[W].location>=0){let bt=Z[W];bt===void 0&&(W==="instanceMatrix"&&b.instanceMatrix&&(bt=b.instanceMatrix),W==="instanceColor"&&b.instanceColor&&(bt=b.instanceColor));let Ct={};Ct.attribute=bt,bt&&bt.data&&(Ct.data=bt.data),Y[W]=Ct,G++}r.attributes=Y,r.attributesNum=G,r.index=H}function _(){let b=r.newAttributes;for(let I=0,O=b.length;I<O;I++)b[I]=0}function m(b){p(b,0)}function p(b,I){let O=r.newAttributes,H=r.enabledAttributes,Y=r.attributeDivisors;O[b]=1,H[b]===0&&(n.enableVertexAttribArray(b),H[b]=1),Y[b]!==I&&(n.vertexAttribDivisor(b,I),Y[b]=I)}function M(){let b=r.newAttributes,I=r.enabledAttributes;for(let O=0,H=I.length;O<H;O++)I[O]!==b[O]&&(n.disableVertexAttribArray(O),I[O]=0)}function v(b,I,O,H,Y,Z,G){G===!0?n.vertexAttribIPointer(b,I,O,Y,Z):n.vertexAttribPointer(b,I,O,H,Y,Z)}function x(b,I,O,H){_();let Y=H.attributes,Z=O.getAttributes(),G=I.defaultAttributeValues;for(let it in Z){let W=Z[it];if(W.location>=0){let mt=Y[it];if(mt===void 0&&(it==="instanceMatrix"&&b.instanceMatrix&&(mt=b.instanceMatrix),it==="instanceColor"&&b.instanceColor&&(mt=b.instanceColor)),mt!==void 0){let bt=mt.normalized,Ct=mt.itemSize,Yt=t.get(mt);if(Yt===void 0)continue;let oe=Yt.buffer,pe=Yt.type,zt=Yt.bytesPerElement,K=pe===n.INT||pe===n.UNSIGNED_INT||mt.gpuType===Qa;if(mt.isInterleavedBufferAttribute){let nt=mt.data,wt=nt.stride,_t=mt.offset;if(nt.isInstancedInterleavedBuffer){for(let Mt=0;Mt<W.locationSize;Mt++)p(W.location+Mt,nt.meshPerAttribute);b.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=nt.meshPerAttribute*nt.count)}else for(let Mt=0;Mt<W.locationSize;Mt++)m(W.location+Mt);n.bindBuffer(n.ARRAY_BUFFER,oe);for(let Mt=0;Mt<W.locationSize;Mt++)v(W.location+Mt,Ct/W.locationSize,pe,bt,wt*zt,(_t+Ct/W.locationSize*Mt)*zt,K)}else{if(mt.isInstancedBufferAttribute){for(let nt=0;nt<W.locationSize;nt++)p(W.location+nt,mt.meshPerAttribute);b.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=mt.meshPerAttribute*mt.count)}else for(let nt=0;nt<W.locationSize;nt++)m(W.location+nt);n.bindBuffer(n.ARRAY_BUFFER,oe);for(let nt=0;nt<W.locationSize;nt++)v(W.location+nt,Ct/W.locationSize,pe,bt,Ct*zt,Ct/W.locationSize*nt*zt,K)}}else if(G!==void 0){let bt=G[it];if(bt!==void 0)switch(bt.length){case 2:n.vertexAttrib2fv(W.location,bt);break;case 3:n.vertexAttrib3fv(W.location,bt);break;case 4:n.vertexAttrib4fv(W.location,bt);break;default:n.vertexAttrib1fv(W.location,bt)}}}}M()}function A(){D();for(let b in i){let I=i[b];for(let O in I){let H=I[O];for(let Y in H)h(H[Y].object),delete H[Y];delete I[O]}delete i[b]}}function E(b){if(i[b.id]===void 0)return;let I=i[b.id];for(let O in I){let H=I[O];for(let Y in H)h(H[Y].object),delete H[Y];delete I[O]}delete i[b.id]}function R(b){for(let I in i){let O=i[I];if(O[b.id]===void 0)continue;let H=O[b.id];for(let Y in H)h(H[Y].object),delete H[Y];delete O[b.id]}}function D(){T(),o=!0,r!==s&&(r=s,c(r.object))}function T(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:D,resetDefaultState:T,dispose:A,releaseStatesOfGeometry:E,releaseStatesOfProgram:R,initAttributes:_,enableAttribute:m,disableUnusedAttributes:M}}function Og(n,t,e){let i;function s(c){i=c}function r(c,h){n.drawArrays(i,c,h),e.update(h,i,1)}function o(c,h,d){d!==0&&(n.drawArraysInstanced(i,c,h,d),e.update(h,i,d))}function a(c,h,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,h,0,d);let f=0;for(let g=0;g<d;g++)f+=h[g];e.update(f,i,1)}function l(c,h,d,u){if(d===0)return;let f=t.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<c.length;g++)o(c[g],h[g],u[g]);else{f.multiDrawArraysInstancedWEBGL(i,c,0,h,0,u,0,d);let g=0;for(let _=0;_<d;_++)g+=h[_]*u[_];e.update(g,i,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function Bg(n,t,e,i){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let R=t.get("EXT_texture_filter_anisotropic");s=n.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(R){return!(R!==Kn&&i.convert(R)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(R){let D=R===mr&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(R!==ri&&i.convert(R)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==oi&&!D)}function l(R){if(R==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let d=e.logarithmicDepthBuffer===!0,u=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),f=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),M=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),v=n.getParameter(n.MAX_VARYING_VECTORS),x=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),A=g>0,E=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:f,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:M,maxVaryings:v,maxFragmentUniforms:x,vertexTextures:A,maxSamples:E}}function zg(n){let t=this,e=null,i=0,s=!1,r=!1,o=new Yn,a=new $t,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){let f=d.length!==0||u||i!==0||s;return s=u,i=d.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){e=h(d,u,0)},this.setState=function(d,u,f){let g=d.clippingPlanes,_=d.clipIntersection,m=d.clipShadows,p=n.get(d);if(!s||g===null||g.length===0||r&&!m)r?h(null):c();else{let M=r?0:i,v=M*4,x=p.clippingState||null;l.value=x,x=h(g,u,v,f);for(let A=0;A!==v;++A)x[A]=e[A];p.clippingState=x,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=M}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function h(d,u,f,g){let _=d!==null?d.length:0,m=null;if(_!==0){if(m=l.value,g!==!0||m===null){let p=f+_*4,M=u.matrixWorldInverse;a.getNormalMatrix(M),(m===null||m.length<p)&&(m=new Float32Array(p));for(let v=0,x=f;v!==_;++v,x+=4)o.copy(d[v]).applyMatrix4(M,a),o.normal.toArray(m,x),m[x+3]=o.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,m}}function kg(n){let t=new WeakMap;function e(o,a){return a===Ka?o.mapping=Ts:a===$a&&(o.mapping=ws),o}function i(o){if(o&&o.isTexture){let a=o.mapping;if(a===Ka||a===$a)if(t.has(o)){let l=t.get(o).texture;return e(l,o.mapping)}else{let l=o.image;if(l&&l.height>0){let c=new va(l.height);return c.fromEquirectangularTexture(n,o),t.set(o,c),o.addEventListener("dispose",s),e(c.texture,o.mapping)}else return null}}return o}function s(o){let a=o.target;a.removeEventListener("dispose",s);let l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function r(){t=new WeakMap}return{get:i,dispose:r}}var vr=4,_d=[.125,.215,.35,.446,.526,.582],Is=20,ah=new xo,xd=new St,lh=null,ch=0,hh=0,uh=!1,Ps=(1+Math.sqrt(5))/2,yr=1/Ps,yd=[new P(-Ps,yr,0),new P(Ps,yr,0),new P(-yr,0,Ps),new P(yr,0,Ps),new P(0,Ps,-yr),new P(0,Ps,yr),new P(-1,1,-1),new P(1,1,-1),new P(-1,1,1),new P(1,1,1)],Vg=new P,Fl=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,i=.1,s=100,r={}){let{size:o=256,position:a=Vg}=r;lh=this._renderer.getRenderTarget(),ch=this._renderer.getActiveCubeFace(),hh=this._renderer.getActiveMipmapLevel(),uh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,i,s,l,a),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Sd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Md(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(lh,ch,hh),this._renderer.xr.enabled=uh,t.scissorTest=!1,Ul(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Ts||t.mapping===ws?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),lh=this._renderer.getRenderTarget(),ch=this._renderer.getActiveCubeFace(),hh=this._renderer.getActiveMipmapLevel(),uh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:Nn,minFilter:Nn,generateMipmaps:!1,type:mr,format:Kn,colorSpace:fs,depthBuffer:!1},s=vd(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=vd(t,e,i);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Hg(r)),this._blurMaterial=Gg(r,t,e)}return s}_compileMaterial(t){let e=new ve(this._lodPlanes[0],t);this._renderer.compile(e,ah)}_sceneToCubeUV(t,e,i,s,r){let l=new He(90,1,e,i),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,f=d.toneMapping;d.getClearColor(xd),d.toneMapping=Pi,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(s),d.clearDepth(),d.setRenderTarget(null));let _=new Jn({name:"PMREM.Background",side:sn,depthWrite:!1,depthTest:!1}),m=new ve(new Hi,_),p=!1,M=t.background;M?M.isColor&&(_.color.copy(M),t.background=null,p=!0):(_.color.copy(xd),p=!0);for(let v=0;v<6;v++){let x=v%3;x===0?(l.up.set(0,c[v],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[v],r.y,r.z)):x===1?(l.up.set(0,0,c[v]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[v],r.z)):(l.up.set(0,c[v],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[v]));let A=this._cubeSize;Ul(s,x*A,v>2?A:0,A,A),d.setRenderTarget(s),p&&d.render(m,l),d.render(t,l)}m.geometry.dispose(),m.material.dispose(),d.toneMapping=f,d.autoClear=u,t.background=M}_textureToCubeUV(t,e){let i=this._renderer,s=t.mapping===Ts||t.mapping===ws;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Sd()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Md());let r=s?this._cubemapMaterial:this._equirectMaterial,o=new ve(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;let l=this._cubeSize;Ul(e,0,0,3*l,2*l),i.setRenderTarget(e),i.render(o,ah)}_applyPMREM(t){let e=this._renderer,i=e.autoClear;e.autoClear=!1;let s=this._lodPlanes.length;for(let r=1;r<s;r++){let o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=yd[(s-r-1)%yd.length];this._blur(t,r-1,r,o,a)}e.autoClear=i}_blur(t,e,i,s,r){let o=this._pingPongRenderTarget;this._halfBlur(t,o,e,i,s,"latitudinal",r),this._halfBlur(o,t,i,i,s,"longitudinal",r)}_halfBlur(t,e,i,s,r,o,a){let l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,d=new ve(this._lodPlanes[s],c),u=c.uniforms,f=this._sizeLods[i]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Is-1),_=r/g,m=isFinite(r)?1+Math.floor(h*_):Is;m>Is&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Is}`);let p=[],M=0;for(let R=0;R<Is;++R){let D=R/_,T=Math.exp(-D*D/2);p.push(T),R===0?M+=T:R<m&&(M+=2*T)}for(let R=0;R<p.length;R++)p[R]=p[R]/M;u.envMap.value=t.texture,u.samples.value=m,u.weights.value=p,u.latitudinal.value=o==="latitudinal",a&&(u.poleAxis.value=a);let{_lodMax:v}=this;u.dTheta.value=g,u.mipInt.value=v-i;let x=this._sizeLods[s],A=3*x*(s>v-vr?s-v+vr:0),E=4*(this._cubeSize-x);Ul(e,A,E,3*x,2*x),l.setRenderTarget(e),l.render(d,ah)}};function Hg(n){let t=[],e=[],i=[],s=n,r=n-vr+1+_d.length;for(let o=0;o<r;o++){let a=Math.pow(2,s);e.push(a);let l=1/a;o>n-vr?l=_d[o-n+vr-1]:o===0&&(l=0),i.push(l);let c=1/(a-2),h=-c,d=1+c,u=[h,h,d,h,d,d,h,h,d,d,h,d],f=6,g=6,_=3,m=2,p=1,M=new Float32Array(_*g*f),v=new Float32Array(m*g*f),x=new Float32Array(p*g*f);for(let E=0;E<f;E++){let R=E%3*2/3-1,D=E>2?0:-1,T=[R,D,0,R+2/3,D,0,R+2/3,D+1,0,R,D,0,R+2/3,D+1,0,R,D+1,0];M.set(T,_*g*E),v.set(u,m*g*E);let b=[E,E,E,E,E,E];x.set(b,p*g*E)}let A=new be;A.setAttribute("position",new en(M,_)),A.setAttribute("uv",new en(v,m)),A.setAttribute("faceIndex",new en(x,p)),t.push(A),s>vr&&s--}return{lodPlanes:t,sizeLods:e,sigmas:i}}function vd(n,t,e){let i=new Zn(n,t,e);return i.texture.mapping=Mo,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Ul(n,t,e,i,s){n.viewport.set(t,e,i,s),n.scissor.set(t,e,i,s)}function Gg(n,t,e){let i=new Float32Array(Is),s=new P(0,1,0);return new wn({name:"SphericalGaussianBlur",defines:{n:Is,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Mh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Ri,depthTest:!1,depthWrite:!1})}function Md(){return new wn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Mh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Ri,depthTest:!1,depthWrite:!1})}function Sd(){return new wn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Mh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ri,depthTest:!1,depthWrite:!1})}function Mh(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Wg(n){let t=new WeakMap,e=null;function i(a){if(a&&a.isTexture){let l=a.mapping,c=l===Ka||l===$a,h=l===Ts||l===ws;if(c||h){let d=t.get(a),u=d!==void 0?d.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==u)return e===null&&(e=new Fl(n)),d=c?e.fromEquirectangular(a,d):e.fromCubemap(a,d),d.texture.pmremVersion=a.pmremVersion,t.set(a,d),d.texture;if(d!==void 0)return d.texture;{let f=a.image;return c&&f&&f.height>0||h&&f&&s(f)?(e===null&&(e=new Fl(n)),d=c?e.fromEquirectangular(a):e.fromCubemap(a),d.texture.pmremVersion=a.pmremVersion,t.set(a,d),a.addEventListener("dispose",r),d.texture):null}}}return a}function s(a){let l=0,c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function r(a){let l=a.target;l.removeEventListener("dispose",r);let c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:o}}function Xg(n){let t={};function e(i){if(t[i]!==void 0)return t[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return t[i]=s,s}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){let s=e(i);return s===null&&er("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function qg(n,t,e,i){let s={},r=new WeakMap;function o(d){let u=d.target;u.index!==null&&t.remove(u.index);for(let g in u.attributes)t.remove(u.attributes[g]);u.removeEventListener("dispose",o),delete s[u.id];let f=r.get(u);f&&(t.remove(f),r.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function a(d,u){return s[u.id]===!0||(u.addEventListener("dispose",o),s[u.id]=!0,e.memory.geometries++),u}function l(d){let u=d.attributes;for(let f in u)t.update(u[f],n.ARRAY_BUFFER)}function c(d){let u=[],f=d.index,g=d.attributes.position,_=0;if(f!==null){let M=f.array;_=f.version;for(let v=0,x=M.length;v<x;v+=3){let A=M[v+0],E=M[v+1],R=M[v+2];u.push(A,E,E,R,R,A)}}else if(g!==void 0){let M=g.array;_=g.version;for(let v=0,x=M.length/3-1;v<x;v+=3){let A=v+0,E=v+1,R=v+2;u.push(A,E,E,R,R,A)}}else return;let m=new(eh(u)?Jr:Zr)(u,1);m.version=_;let p=r.get(d);p&&t.remove(p),r.set(d,m)}function h(d){let u=r.get(d);if(u){let f=d.index;f!==null&&u.version<f.version&&c(d)}else c(d);return r.get(d)}return{get:a,update:l,getWireframeAttribute:h}}function Yg(n,t,e){let i;function s(u){i=u}let r,o;function a(u){r=u.type,o=u.bytesPerElement}function l(u,f){n.drawElements(i,f,r,u*o),e.update(f,i,1)}function c(u,f,g){g!==0&&(n.drawElementsInstanced(i,f,r,u*o,g),e.update(f,i,g))}function h(u,f,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,f,0,r,u,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];e.update(m,i,1)}function d(u,f,g,_){if(g===0)return;let m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<u.length;p++)c(u[p]/o,f[p],_[p]);else{m.multiDrawElementsInstancedWEBGL(i,f,0,r,u,0,_,0,g);let p=0;for(let M=0;M<g;M++)p+=f[M]*_[M];e.update(p,i,1)}}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=d}function Zg(n){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,a){switch(e.calls++,o){case n.TRIANGLES:e.triangles+=a*(r/3);break;case n.LINES:e.lines+=a*(r/2);break;case n.LINE_STRIP:e.lines+=a*(r-1);break;case n.LINE_LOOP:e.lines+=a*r;break;case n.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:i}}function Jg(n,t,e){let i=new WeakMap,s=new ge;function r(o,a,l){let c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=h!==void 0?h.length:0,u=i.get(a);if(u===void 0||u.count!==d){let T=function(){R.dispose(),i.delete(a),a.removeEventListener("dispose",T)};u!==void 0&&u.texture.dispose();let f=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],M=a.morphAttributes.color||[],v=0;f===!0&&(v=1),g===!0&&(v=2),_===!0&&(v=3);let x=a.attributes.position.count*v,A=1;x>t.maxTextureSize&&(A=Math.ceil(x/t.maxTextureSize),x=t.maxTextureSize);let E=new Float32Array(x*A*4*d),R=new qr(E,x,A,d);R.type=oi,R.needsUpdate=!0;let D=v*4;for(let b=0;b<d;b++){let I=m[b],O=p[b],H=M[b],Y=x*A*4*b;for(let Z=0;Z<I.count;Z++){let G=Z*D;f===!0&&(s.fromBufferAttribute(I,Z),E[Y+G+0]=s.x,E[Y+G+1]=s.y,E[Y+G+2]=s.z,E[Y+G+3]=0),g===!0&&(s.fromBufferAttribute(O,Z),E[Y+G+4]=s.x,E[Y+G+5]=s.y,E[Y+G+6]=s.z,E[Y+G+7]=0),_===!0&&(s.fromBufferAttribute(H,Z),E[Y+G+8]=s.x,E[Y+G+9]=s.y,E[Y+G+10]=s.z,E[Y+G+11]=H.itemSize===4?s.w:1)}}u={count:d,texture:R,size:new rt(x,A)},i.set(a,u),a.addEventListener("dispose",T)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",o.morphTexture,e);else{let f=0;for(let _=0;_<c.length;_++)f+=c[_];let g=a.morphTargetsRelative?1:1-f;l.getUniforms().setValue(n,"morphTargetBaseInfluence",g),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",u.texture,e),l.getUniforms().setValue(n,"morphTargetsTextureSize",u.size)}return{update:r}}function Kg(n,t,e,i){let s=new WeakMap;function r(l){let c=i.render.frame,h=l.geometry,d=t.get(l,h);if(s.get(d)!==c&&(t.update(d),s.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(e.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){let u=l.skeleton;s.get(u)!==c&&(u.update(),s.set(u,c))}return d}function o(){s=new WeakMap}function a(l){let c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:o}}var Vd=new mn,bd=new eo(1,1),Hd=new qr,Gd=new xa,Wd=new $r,Td=[],wd=[],Ed=new Float32Array(16),Ad=new Float32Array(9),Cd=new Float32Array(4);function Sr(n,t,e){let i=n[0];if(i<=0||i>0)return n;let s=t*e,r=Td[s];if(r===void 0&&(r=new Float32Array(s),Td[s]=r),t!==0){i.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,n[o].toArray(r,a)}return r}function Ze(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function Je(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function Bl(n,t){let e=wd[t];e===void 0&&(e=new Int32Array(t),wd[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function $g(n,t){let e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function jg(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ze(e,t))return;n.uniform2fv(this.addr,t),Je(e,t)}}function Qg(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ze(e,t))return;n.uniform3fv(this.addr,t),Je(e,t)}}function t_(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ze(e,t))return;n.uniform4fv(this.addr,t),Je(e,t)}}function e_(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(Ze(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),Je(e,t)}else{if(Ze(e,i))return;Cd.set(i),n.uniformMatrix2fv(this.addr,!1,Cd),Je(e,i)}}function n_(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(Ze(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),Je(e,t)}else{if(Ze(e,i))return;Ad.set(i),n.uniformMatrix3fv(this.addr,!1,Ad),Je(e,i)}}function i_(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(Ze(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),Je(e,t)}else{if(Ze(e,i))return;Ed.set(i),n.uniformMatrix4fv(this.addr,!1,Ed),Je(e,i)}}function s_(n,t){let e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function r_(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ze(e,t))return;n.uniform2iv(this.addr,t),Je(e,t)}}function o_(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ze(e,t))return;n.uniform3iv(this.addr,t),Je(e,t)}}function a_(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ze(e,t))return;n.uniform4iv(this.addr,t),Je(e,t)}}function l_(n,t){let e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function c_(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ze(e,t))return;n.uniform2uiv(this.addr,t),Je(e,t)}}function h_(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ze(e,t))return;n.uniform3uiv(this.addr,t),Je(e,t)}}function u_(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ze(e,t))return;n.uniform4uiv(this.addr,t),Je(e,t)}}function d_(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(bd.compareFunction=jc,r=bd):r=Vd,e.setTexture2D(t||r,s)}function f_(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture3D(t||Gd,s)}function p_(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTextureCube(t||Wd,s)}function m_(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture2DArray(t||Hd,s)}function g_(n){switch(n){case 5126:return $g;case 35664:return jg;case 35665:return Qg;case 35666:return t_;case 35674:return e_;case 35675:return n_;case 35676:return i_;case 5124:case 35670:return s_;case 35667:case 35671:return r_;case 35668:case 35672:return o_;case 35669:case 35673:return a_;case 5125:return l_;case 36294:return c_;case 36295:return h_;case 36296:return u_;case 35678:case 36198:case 36298:case 36306:case 35682:return d_;case 35679:case 36299:case 36307:return f_;case 35680:case 36300:case 36308:case 36293:return p_;case 36289:case 36303:case 36311:case 36292:return m_}}function __(n,t){n.uniform1fv(this.addr,t)}function x_(n,t){let e=Sr(t,this.size,2);n.uniform2fv(this.addr,e)}function y_(n,t){let e=Sr(t,this.size,3);n.uniform3fv(this.addr,e)}function v_(n,t){let e=Sr(t,this.size,4);n.uniform4fv(this.addr,e)}function M_(n,t){let e=Sr(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function S_(n,t){let e=Sr(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function b_(n,t){let e=Sr(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function T_(n,t){n.uniform1iv(this.addr,t)}function w_(n,t){n.uniform2iv(this.addr,t)}function E_(n,t){n.uniform3iv(this.addr,t)}function A_(n,t){n.uniform4iv(this.addr,t)}function C_(n,t){n.uniform1uiv(this.addr,t)}function R_(n,t){n.uniform2uiv(this.addr,t)}function P_(n,t){n.uniform3uiv(this.addr,t)}function I_(n,t){n.uniform4uiv(this.addr,t)}function D_(n,t,e){let i=this.cache,s=t.length,r=Bl(e,s);Ze(i,r)||(n.uniform1iv(this.addr,r),Je(i,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||Vd,r[o])}function L_(n,t,e){let i=this.cache,s=t.length,r=Bl(e,s);Ze(i,r)||(n.uniform1iv(this.addr,r),Je(i,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||Gd,r[o])}function U_(n,t,e){let i=this.cache,s=t.length,r=Bl(e,s);Ze(i,r)||(n.uniform1iv(this.addr,r),Je(i,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||Wd,r[o])}function N_(n,t,e){let i=this.cache,s=t.length,r=Bl(e,s);Ze(i,r)||(n.uniform1iv(this.addr,r),Je(i,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||Hd,r[o])}function F_(n){switch(n){case 5126:return __;case 35664:return x_;case 35665:return y_;case 35666:return v_;case 35674:return M_;case 35675:return S_;case 35676:return b_;case 5124:case 35670:return T_;case 35667:case 35671:return w_;case 35668:case 35672:return E_;case 35669:case 35673:return A_;case 5125:return C_;case 36294:return R_;case 36295:return P_;case 36296:return I_;case 35678:case 36198:case 36298:case 36306:case 35682:return D_;case 35679:case 36299:case 36307:return L_;case 35680:case 36300:case 36308:case 36293:return U_;case 36289:case 36303:case 36311:case 36292:return N_}}var fh=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=g_(e.type)}},ph=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=F_(e.type)}},mh=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(t,e[a.id],i)}}},dh=/(\w+)(\])?(\[|\.)?/g;function Rd(n,t){n.seq.push(t),n.map[t.id]=t}function O_(n,t,e){let i=n.name,s=i.length;for(dh.lastIndex=0;;){let r=dh.exec(i),o=dh.lastIndex,a=r[1],l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){Rd(e,c===void 0?new fh(a,n,t):new ph(a,n,t));break}else{let d=e.map[a];d===void 0&&(d=new mh(a),Rd(e,d)),e=d}}}var Mr=class{constructor(t,e){this.seq=[],this.map={};let i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){let r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);O_(r,o,this)}}setValue(t,e,i,s){let r=this.map[e];r!==void 0&&r.setValue(t,i,s)}setOptional(t,e,i){let s=e[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,e,i,s){for(let r=0,o=e.length;r!==o;++r){let a=e[r],l=i[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,s)}}static seqWithValue(t,e){let i=[];for(let s=0,r=t.length;s!==r;++s){let o=t[s];o.id in e&&i.push(o)}return i}};function Pd(n,t,e){let i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}var B_=37297,z_=0;function k_(n,t){let e=n.split(`
`),i=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){let a=o+1;i.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return i.join(`
`)}var Id=new $t;function V_(n){he._getMatrix(Id,he.workingColorSpace,n);let t=`mat3( ${Id.elements.map(e=>e.toFixed(4))} )`;switch(he.getTransfer(n)){case Gr:return[t,"LinearTransferOETF"];case _e:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function Dd(n,t,e){let i=n.getShaderParameter(t,n.COMPILE_STATUS),r=(n.getShaderInfoLog(t)||"").trim();if(i&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+k_(n.getShaderSource(t),a)}else return r}function H_(n,t){let e=V_(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function G_(n,t){let e;switch(t){case Wu:e="Linear";break;case Xu:e="Reinhard";break;case qu:e="Cineon";break;case Yu:e="ACESFilmic";break;case Ju:e="AgX";break;case Ku:e="Neutral";break;case Zu:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var Nl=new P;function W_(){he.getLuminanceCoefficients(Nl);let n=Nl.x.toFixed(4),t=Nl.y.toFixed(4),e=Nl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function X_(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ao).join(`
`)}function q_(n){let t=[];for(let e in n){let i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function Y_(n,t){let e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){let r=n.getActiveAttrib(t,s),o=r.name,a=1;r.type===n.FLOAT_MAT2&&(a=2),r.type===n.FLOAT_MAT3&&(a=3),r.type===n.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:n.getAttribLocation(t,o),locationSize:a}}return e}function Ao(n){return n!==""}function Ld(n,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Ud(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Z_=/^[ \t]*#include +<([\w\d./]+)>/gm;function gh(n){return n.replace(Z_,K_)}var J_=new Map;function K_(n,t){let e=ie[t];if(e===void 0){let i=J_.get(t);if(i!==void 0)e=ie[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return gh(e)}var $_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Nd(n){return n.replace($_,j_)}function j_(n,t,e,i){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Fd(n){let t=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?t+=`
#define HIGH_PRECISION`:n.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function Q_(n){let t="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===zc?t="SHADOWMAP_TYPE_PCF":n.shadowMapType===Ha?t="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===_i&&(t="SHADOWMAP_TYPE_VSM"),t}function t1(n){let t="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case Ts:case ws:t="ENVMAP_TYPE_CUBE";break;case Mo:t="ENVMAP_TYPE_CUBE_UV";break}return t}function e1(n){let t="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case ws:t="ENVMAP_MODE_REFRACTION";break}return t}function n1(n){let t="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Hc:t="ENVMAP_BLENDING_MULTIPLY";break;case Hu:t="ENVMAP_BLENDING_MIX";break;case Gu:t="ENVMAP_BLENDING_ADD";break}return t}function i1(n){let t=n.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function s1(n,t,e,i){let s=n.getContext(),r=e.defines,o=e.vertexShader,a=e.fragmentShader,l=Q_(e),c=t1(e),h=e1(e),d=n1(e),u=i1(e),f=X_(e),g=q_(r),_=s.createProgram(),m,p,M=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Ao).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Ao).join(`
`),p.length>0&&(p+=`
`)):(m=[Fd(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ao).join(`
`),p=[Fd(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Pi?"#define TONE_MAPPING":"",e.toneMapping!==Pi?ie.tonemapping_pars_fragment:"",e.toneMapping!==Pi?G_("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",ie.colorspace_pars_fragment,H_("linearToOutputTexel",e.outputColorSpace),W_(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Ao).join(`
`)),o=gh(o),o=Ld(o,e),o=Ud(o,e),a=gh(a),a=Ld(a,e),a=Ud(a,e),o=Nd(o),a=Nd(a),e.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===Qc?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Qc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let v=M+m+o,x=M+p+a,A=Pd(s,s.VERTEX_SHADER,v),E=Pd(s,s.FRAGMENT_SHADER,x);s.attachShader(_,A),s.attachShader(_,E),e.index0AttributeName!==void 0?s.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function R(I){if(n.debug.checkShaderErrors){let O=s.getProgramInfoLog(_)||"",H=s.getShaderInfoLog(A)||"",Y=s.getShaderInfoLog(E)||"",Z=O.trim(),G=H.trim(),it=Y.trim(),W=!0,mt=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(W=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,_,A,E);else{let bt=Dd(s,A,"vertex"),Ct=Dd(s,E,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+Z+`
`+bt+`
`+Ct)}else Z!==""?console.warn("THREE.WebGLProgram: Program Info Log:",Z):(G===""||it==="")&&(mt=!1);mt&&(I.diagnostics={runnable:W,programLog:Z,vertexShader:{log:G,prefix:m},fragmentShader:{log:it,prefix:p}})}s.deleteShader(A),s.deleteShader(E),D=new Mr(s,_),T=Y_(s,_)}let D;this.getUniforms=function(){return D===void 0&&R(this),D};let T;this.getAttributes=function(){return T===void 0&&R(this),T};let b=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return b===!1&&(b=s.getProgramParameter(_,B_)),b},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=z_++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=A,this.fragmentShader=E,this}var r1=0,_h=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let e=t.vertexShader,i=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(i),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){let e=this.shaderCache,i=e.get(t);return i===void 0&&(i=new xh(t),e.set(t,i)),i}},xh=class{constructor(t){this.id=r1++,this.code=t,this.usedTimes=0}};function o1(n,t,e,i,s,r,o){let a=new Yr,l=new _h,c=new Set,h=[],d=s.logarithmicDepthBuffer,u=s.vertexTextures,f=s.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(T){return c.add(T),T===0?"uv":`uv${T}`}function m(T,b,I,O,H){let Y=O.fog,Z=H.geometry,G=T.isMeshStandardMaterial?O.environment:null,it=(T.isMeshStandardMaterial?e:t).get(T.envMap||G),W=it&&it.mapping===Mo?it.image.height:null,mt=g[T.type];T.precision!==null&&(f=s.getMaxPrecision(T.precision),f!==T.precision&&console.warn("THREE.WebGLProgram.getParameters:",T.precision,"not supported, using",f,"instead."));let bt=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,Ct=bt!==void 0?bt.length:0,Yt=0;Z.morphAttributes.position!==void 0&&(Yt=1),Z.morphAttributes.normal!==void 0&&(Yt=2),Z.morphAttributes.color!==void 0&&(Yt=3);let oe,pe,zt,K;if(mt){let le=yi[mt];oe=le.vertexShader,pe=le.fragmentShader}else oe=T.vertexShader,pe=T.fragmentShader,l.update(T),zt=l.getVertexShaderID(T),K=l.getFragmentShaderID(T);let nt=n.getRenderTarget(),wt=n.state.buffers.depth.getReversed(),_t=H.isInstancedMesh===!0,Mt=H.isBatchedMesh===!0,jt=!!T.map,te=!!T.matcap,C=!!it,tt=!!T.aoMap,j=!!T.lightMap,X=!!T.bumpMap,$=!!T.normalMap,ft=!!T.displacementMap,ot=!!T.emissiveMap,gt=!!T.metalnessMap,Ot=!!T.roughnessMap,Vt=T.anisotropy>0,w=T.clearcoat>0,y=T.dispersion>0,N=T.iridescence>0,k=T.sheen>0,et=T.transmission>0,q=Vt&&!!T.anisotropyMap,Et=w&&!!T.clearcoatMap,at=w&&!!T.clearcoatNormalMap,Dt=w&&!!T.clearcoatRoughnessMap,Rt=N&&!!T.iridescenceMap,lt=N&&!!T.iridescenceThicknessMap,xt=k&&!!T.sheenColorMap,Bt=k&&!!T.sheenRoughnessMap,Ft=!!T.specularMap,yt=!!T.specularColorMap,Wt=!!T.specularIntensityMap,L=et&&!!T.transmissionMap,st=et&&!!T.thicknessMap,pt=!!T.gradientMap,At=!!T.alphaMap,ct=T.alphaTest>0,Q=!!T.alphaHash,Lt=!!T.extensions,Zt=Pi;T.toneMapped&&(nt===null||nt.isXRRenderTarget===!0)&&(Zt=n.toneMapping);let xe={shaderID:mt,shaderType:T.type,shaderName:T.name,vertexShader:oe,fragmentShader:pe,defines:T.defines,customVertexShaderID:zt,customFragmentShaderID:K,isRawShaderMaterial:T.isRawShaderMaterial===!0,glslVersion:T.glslVersion,precision:f,batching:Mt,batchingColor:Mt&&H._colorsTexture!==null,instancing:_t,instancingColor:_t&&H.instanceColor!==null,instancingMorph:_t&&H.morphTexture!==null,supportsVertexTextures:u,outputColorSpace:nt===null?n.outputColorSpace:nt.isXRRenderTarget===!0?nt.texture.colorSpace:fs,alphaToCoverage:!!T.alphaToCoverage,map:jt,matcap:te,envMap:C,envMapMode:C&&it.mapping,envMapCubeUVHeight:W,aoMap:tt,lightMap:j,bumpMap:X,normalMap:$,displacementMap:u&&ft,emissiveMap:ot,normalMapObjectSpace:$&&T.normalMapType===td,normalMapTangentSpace:$&&T.normalMapType===$c,metalnessMap:gt,roughnessMap:Ot,anisotropy:Vt,anisotropyMap:q,clearcoat:w,clearcoatMap:Et,clearcoatNormalMap:at,clearcoatRoughnessMap:Dt,dispersion:y,iridescence:N,iridescenceMap:Rt,iridescenceThicknessMap:lt,sheen:k,sheenColorMap:xt,sheenRoughnessMap:Bt,specularMap:Ft,specularColorMap:yt,specularIntensityMap:Wt,transmission:et,transmissionMap:L,thicknessMap:st,gradientMap:pt,opaque:T.transparent===!1&&T.blending===us&&T.alphaToCoverage===!1,alphaMap:At,alphaTest:ct,alphaHash:Q,combine:T.combine,mapUv:jt&&_(T.map.channel),aoMapUv:tt&&_(T.aoMap.channel),lightMapUv:j&&_(T.lightMap.channel),bumpMapUv:X&&_(T.bumpMap.channel),normalMapUv:$&&_(T.normalMap.channel),displacementMapUv:ft&&_(T.displacementMap.channel),emissiveMapUv:ot&&_(T.emissiveMap.channel),metalnessMapUv:gt&&_(T.metalnessMap.channel),roughnessMapUv:Ot&&_(T.roughnessMap.channel),anisotropyMapUv:q&&_(T.anisotropyMap.channel),clearcoatMapUv:Et&&_(T.clearcoatMap.channel),clearcoatNormalMapUv:at&&_(T.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Dt&&_(T.clearcoatRoughnessMap.channel),iridescenceMapUv:Rt&&_(T.iridescenceMap.channel),iridescenceThicknessMapUv:lt&&_(T.iridescenceThicknessMap.channel),sheenColorMapUv:xt&&_(T.sheenColorMap.channel),sheenRoughnessMapUv:Bt&&_(T.sheenRoughnessMap.channel),specularMapUv:Ft&&_(T.specularMap.channel),specularColorMapUv:yt&&_(T.specularColorMap.channel),specularIntensityMapUv:Wt&&_(T.specularIntensityMap.channel),transmissionMapUv:L&&_(T.transmissionMap.channel),thicknessMapUv:st&&_(T.thicknessMap.channel),alphaMapUv:At&&_(T.alphaMap.channel),vertexTangents:!!Z.attributes.tangent&&($||Vt),vertexColors:T.vertexColors,vertexAlphas:T.vertexColors===!0&&!!Z.attributes.color&&Z.attributes.color.itemSize===4,pointsUvs:H.isPoints===!0&&!!Z.attributes.uv&&(jt||At),fog:!!Y,useFog:T.fog===!0,fogExp2:!!Y&&Y.isFogExp2,flatShading:T.flatShading===!0&&T.wireframe===!1,sizeAttenuation:T.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:wt,skinning:H.isSkinnedMesh===!0,morphTargets:Z.morphAttributes.position!==void 0,morphNormals:Z.morphAttributes.normal!==void 0,morphColors:Z.morphAttributes.color!==void 0,morphTargetsCount:Ct,morphTextureStride:Yt,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:T.dithering,shadowMapEnabled:n.shadowMap.enabled&&I.length>0,shadowMapType:n.shadowMap.type,toneMapping:Zt,decodeVideoTexture:jt&&T.map.isVideoTexture===!0&&he.getTransfer(T.map.colorSpace)===_e,decodeVideoTextureEmissive:ot&&T.emissiveMap.isVideoTexture===!0&&he.getTransfer(T.emissiveMap.colorSpace)===_e,premultipliedAlpha:T.premultipliedAlpha,doubleSided:T.side===rn,flipSided:T.side===sn,useDepthPacking:T.depthPacking>=0,depthPacking:T.depthPacking||0,index0AttributeName:T.index0AttributeName,extensionClipCullDistance:Lt&&T.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Lt&&T.extensions.multiDraw===!0||Mt)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:T.customProgramCacheKey()};return xe.vertexUv1s=c.has(1),xe.vertexUv2s=c.has(2),xe.vertexUv3s=c.has(3),c.clear(),xe}function p(T){let b=[];if(T.shaderID?b.push(T.shaderID):(b.push(T.customVertexShaderID),b.push(T.customFragmentShaderID)),T.defines!==void 0)for(let I in T.defines)b.push(I),b.push(T.defines[I]);return T.isRawShaderMaterial===!1&&(M(b,T),v(b,T),b.push(n.outputColorSpace)),b.push(T.customProgramCacheKey),b.join()}function M(T,b){T.push(b.precision),T.push(b.outputColorSpace),T.push(b.envMapMode),T.push(b.envMapCubeUVHeight),T.push(b.mapUv),T.push(b.alphaMapUv),T.push(b.lightMapUv),T.push(b.aoMapUv),T.push(b.bumpMapUv),T.push(b.normalMapUv),T.push(b.displacementMapUv),T.push(b.emissiveMapUv),T.push(b.metalnessMapUv),T.push(b.roughnessMapUv),T.push(b.anisotropyMapUv),T.push(b.clearcoatMapUv),T.push(b.clearcoatNormalMapUv),T.push(b.clearcoatRoughnessMapUv),T.push(b.iridescenceMapUv),T.push(b.iridescenceThicknessMapUv),T.push(b.sheenColorMapUv),T.push(b.sheenRoughnessMapUv),T.push(b.specularMapUv),T.push(b.specularColorMapUv),T.push(b.specularIntensityMapUv),T.push(b.transmissionMapUv),T.push(b.thicknessMapUv),T.push(b.combine),T.push(b.fogExp2),T.push(b.sizeAttenuation),T.push(b.morphTargetsCount),T.push(b.morphAttributeCount),T.push(b.numDirLights),T.push(b.numPointLights),T.push(b.numSpotLights),T.push(b.numSpotLightMaps),T.push(b.numHemiLights),T.push(b.numRectAreaLights),T.push(b.numDirLightShadows),T.push(b.numPointLightShadows),T.push(b.numSpotLightShadows),T.push(b.numSpotLightShadowsWithMaps),T.push(b.numLightProbes),T.push(b.shadowMapType),T.push(b.toneMapping),T.push(b.numClippingPlanes),T.push(b.numClipIntersection),T.push(b.depthPacking)}function v(T,b){a.disableAll(),b.supportsVertexTextures&&a.enable(0),b.instancing&&a.enable(1),b.instancingColor&&a.enable(2),b.instancingMorph&&a.enable(3),b.matcap&&a.enable(4),b.envMap&&a.enable(5),b.normalMapObjectSpace&&a.enable(6),b.normalMapTangentSpace&&a.enable(7),b.clearcoat&&a.enable(8),b.iridescence&&a.enable(9),b.alphaTest&&a.enable(10),b.vertexColors&&a.enable(11),b.vertexAlphas&&a.enable(12),b.vertexUv1s&&a.enable(13),b.vertexUv2s&&a.enable(14),b.vertexUv3s&&a.enable(15),b.vertexTangents&&a.enable(16),b.anisotropy&&a.enable(17),b.alphaHash&&a.enable(18),b.batching&&a.enable(19),b.dispersion&&a.enable(20),b.batchingColor&&a.enable(21),b.gradientMap&&a.enable(22),T.push(a.mask),a.disableAll(),b.fog&&a.enable(0),b.useFog&&a.enable(1),b.flatShading&&a.enable(2),b.logarithmicDepthBuffer&&a.enable(3),b.reversedDepthBuffer&&a.enable(4),b.skinning&&a.enable(5),b.morphTargets&&a.enable(6),b.morphNormals&&a.enable(7),b.morphColors&&a.enable(8),b.premultipliedAlpha&&a.enable(9),b.shadowMapEnabled&&a.enable(10),b.doubleSided&&a.enable(11),b.flipSided&&a.enable(12),b.useDepthPacking&&a.enable(13),b.dithering&&a.enable(14),b.transmission&&a.enable(15),b.sheen&&a.enable(16),b.opaque&&a.enable(17),b.pointsUvs&&a.enable(18),b.decodeVideoTexture&&a.enable(19),b.decodeVideoTextureEmissive&&a.enable(20),b.alphaToCoverage&&a.enable(21),T.push(a.mask)}function x(T){let b=g[T.type],I;if(b){let O=yi[b];I=ud.clone(O.uniforms)}else I=T.uniforms;return I}function A(T,b){let I;for(let O=0,H=h.length;O<H;O++){let Y=h[O];if(Y.cacheKey===b){I=Y,++I.usedTimes;break}}return I===void 0&&(I=new s1(n,b,T,r),h.push(I)),I}function E(T){if(--T.usedTimes===0){let b=h.indexOf(T);h[b]=h[h.length-1],h.pop(),T.destroy()}}function R(T){l.remove(T)}function D(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:x,acquireProgram:A,releaseProgram:E,releaseShaderCache:R,programs:h,dispose:D}}function a1(){let n=new WeakMap;function t(o){return n.has(o)}function e(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function s(o,a,l){n.get(o)[a]=l}function r(){n=new WeakMap}return{has:t,get:e,remove:i,update:s,dispose:r}}function l1(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.z!==t.z?n.z-t.z:n.id-t.id}function Od(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function Bd(){let n=[],t=0,e=[],i=[],s=[];function r(){t=0,e.length=0,i.length=0,s.length=0}function o(d,u,f,g,_,m){let p=n[t];return p===void 0?(p={id:d.id,object:d,geometry:u,material:f,groupOrder:g,renderOrder:d.renderOrder,z:_,group:m},n[t]=p):(p.id=d.id,p.object=d,p.geometry=u,p.material=f,p.groupOrder=g,p.renderOrder=d.renderOrder,p.z=_,p.group=m),t++,p}function a(d,u,f,g,_,m){let p=o(d,u,f,g,_,m);f.transmission>0?i.push(p):f.transparent===!0?s.push(p):e.push(p)}function l(d,u,f,g,_,m){let p=o(d,u,f,g,_,m);f.transmission>0?i.unshift(p):f.transparent===!0?s.unshift(p):e.unshift(p)}function c(d,u){e.length>1&&e.sort(d||l1),i.length>1&&i.sort(u||Od),s.length>1&&s.sort(u||Od)}function h(){for(let d=t,u=n.length;d<u;d++){let f=n[d];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:i,transparent:s,init:r,push:a,unshift:l,finish:h,sort:c}}function c1(){let n=new WeakMap;function t(i,s){let r=n.get(i),o;return r===void 0?(o=new Bd,n.set(i,[o])):s>=r.length?(o=new Bd,r.push(o)):o=r[s],o}function e(){n=new WeakMap}return{get:t,dispose:e}}function h1(){let n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new P,color:new St};break;case"SpotLight":e={position:new P,direction:new P,color:new St,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new P,color:new St,distance:0,decay:0};break;case"HemisphereLight":e={direction:new P,skyColor:new St,groundColor:new St};break;case"RectAreaLight":e={color:new St,position:new P,halfWidth:new P,halfHeight:new P};break}return n[t.id]=e,e}}}function u1(){let n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new rt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new rt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new rt,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}var d1=0;function f1(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function p1(n){let t=new h1,e=u1(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new P);let s=new P,r=new ne,o=new ne;function a(c){let h=0,d=0,u=0;for(let T=0;T<9;T++)i.probe[T].set(0,0,0);let f=0,g=0,_=0,m=0,p=0,M=0,v=0,x=0,A=0,E=0,R=0;c.sort(f1);for(let T=0,b=c.length;T<b;T++){let I=c[T],O=I.color,H=I.intensity,Y=I.distance,Z=I.shadow&&I.shadow.map?I.shadow.map.texture:null;if(I.isAmbientLight)h+=O.r*H,d+=O.g*H,u+=O.b*H;else if(I.isLightProbe){for(let G=0;G<9;G++)i.probe[G].addScaledVector(I.sh.coefficients[G],H);R++}else if(I.isDirectionalLight){let G=t.get(I);if(G.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){let it=I.shadow,W=e.get(I);W.shadowIntensity=it.intensity,W.shadowBias=it.bias,W.shadowNormalBias=it.normalBias,W.shadowRadius=it.radius,W.shadowMapSize=it.mapSize,i.directionalShadow[f]=W,i.directionalShadowMap[f]=Z,i.directionalShadowMatrix[f]=I.shadow.matrix,M++}i.directional[f]=G,f++}else if(I.isSpotLight){let G=t.get(I);G.position.setFromMatrixPosition(I.matrixWorld),G.color.copy(O).multiplyScalar(H),G.distance=Y,G.coneCos=Math.cos(I.angle),G.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),G.decay=I.decay,i.spot[_]=G;let it=I.shadow;if(I.map&&(i.spotLightMap[A]=I.map,A++,it.updateMatrices(I),I.castShadow&&E++),i.spotLightMatrix[_]=it.matrix,I.castShadow){let W=e.get(I);W.shadowIntensity=it.intensity,W.shadowBias=it.bias,W.shadowNormalBias=it.normalBias,W.shadowRadius=it.radius,W.shadowMapSize=it.mapSize,i.spotShadow[_]=W,i.spotShadowMap[_]=Z,x++}_++}else if(I.isRectAreaLight){let G=t.get(I);G.color.copy(O).multiplyScalar(H),G.halfWidth.set(I.width*.5,0,0),G.halfHeight.set(0,I.height*.5,0),i.rectArea[m]=G,m++}else if(I.isPointLight){let G=t.get(I);if(G.color.copy(I.color).multiplyScalar(I.intensity),G.distance=I.distance,G.decay=I.decay,I.castShadow){let it=I.shadow,W=e.get(I);W.shadowIntensity=it.intensity,W.shadowBias=it.bias,W.shadowNormalBias=it.normalBias,W.shadowRadius=it.radius,W.shadowMapSize=it.mapSize,W.shadowCameraNear=it.camera.near,W.shadowCameraFar=it.camera.far,i.pointShadow[g]=W,i.pointShadowMap[g]=Z,i.pointShadowMatrix[g]=I.shadow.matrix,v++}i.point[g]=G,g++}else if(I.isHemisphereLight){let G=t.get(I);G.skyColor.copy(I.color).multiplyScalar(H),G.groundColor.copy(I.groundColor).multiplyScalar(H),i.hemi[p]=G,p++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=vt.LTC_FLOAT_1,i.rectAreaLTC2=vt.LTC_FLOAT_2):(i.rectAreaLTC1=vt.LTC_HALF_1,i.rectAreaLTC2=vt.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=d,i.ambient[2]=u;let D=i.hash;(D.directionalLength!==f||D.pointLength!==g||D.spotLength!==_||D.rectAreaLength!==m||D.hemiLength!==p||D.numDirectionalShadows!==M||D.numPointShadows!==v||D.numSpotShadows!==x||D.numSpotMaps!==A||D.numLightProbes!==R)&&(i.directional.length=f,i.spot.length=_,i.rectArea.length=m,i.point.length=g,i.hemi.length=p,i.directionalShadow.length=M,i.directionalShadowMap.length=M,i.pointShadow.length=v,i.pointShadowMap.length=v,i.spotShadow.length=x,i.spotShadowMap.length=x,i.directionalShadowMatrix.length=M,i.pointShadowMatrix.length=v,i.spotLightMatrix.length=x+A-E,i.spotLightMap.length=A,i.numSpotLightShadowsWithMaps=E,i.numLightProbes=R,D.directionalLength=f,D.pointLength=g,D.spotLength=_,D.rectAreaLength=m,D.hemiLength=p,D.numDirectionalShadows=M,D.numPointShadows=v,D.numSpotShadows=x,D.numSpotMaps=A,D.numLightProbes=R,i.version=d1++)}function l(c,h){let d=0,u=0,f=0,g=0,_=0,m=h.matrixWorldInverse;for(let p=0,M=c.length;p<M;p++){let v=c[p];if(v.isDirectionalLight){let x=i.directional[d];x.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(m),d++}else if(v.isSpotLight){let x=i.spot[f];x.position.setFromMatrixPosition(v.matrixWorld),x.position.applyMatrix4(m),x.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(m),f++}else if(v.isRectAreaLight){let x=i.rectArea[g];x.position.setFromMatrixPosition(v.matrixWorld),x.position.applyMatrix4(m),o.identity(),r.copy(v.matrixWorld),r.premultiply(m),o.extractRotation(r),x.halfWidth.set(v.width*.5,0,0),x.halfHeight.set(0,v.height*.5,0),x.halfWidth.applyMatrix4(o),x.halfHeight.applyMatrix4(o),g++}else if(v.isPointLight){let x=i.point[u];x.position.setFromMatrixPosition(v.matrixWorld),x.position.applyMatrix4(m),u++}else if(v.isHemisphereLight){let x=i.hemi[_];x.direction.setFromMatrixPosition(v.matrixWorld),x.direction.transformDirection(m),_++}}}return{setup:a,setupView:l,state:i}}function zd(n){let t=new p1(n),e=[],i=[];function s(h){c.camera=h,e.length=0,i.length=0}function r(h){e.push(h)}function o(h){i.push(h)}function a(){t.setup(e)}function l(h){t.setupView(e,h)}let c={lightsArray:e,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function m1(n){let t=new WeakMap;function e(s,r=0){let o=t.get(s),a;return o===void 0?(a=new zd(n),t.set(s,[a])):r>=o.length?(a=new zd(n),o.push(a)):a=o[r],a}function i(){t=new WeakMap}return{get:e,dispose:i}}var g1=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,_1=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function x1(n,t,e){let i=new rr,s=new rt,r=new rt,o=new ge,a=new Pa({depthPacking:Qu}),l=new Ia,c={},h=e.maxTextureSize,d={[Ci]:sn,[sn]:Ci,[rn]:rn},u=new wn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new rt},radius:{value:4}},vertexShader:g1,fragmentShader:_1}),f=u.clone();f.defines.HORIZONTAL_PASS=1;let g=new be;g.setAttribute("position",new en(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new ve(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=zc;let p=this.type;this.render=function(E,R,D){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||E.length===0)return;let T=n.getRenderTarget(),b=n.getActiveCubeFace(),I=n.getActiveMipmapLevel(),O=n.state;O.setBlending(Ri),O.buffers.depth.getReversed()===!0?O.buffers.color.setClear(0,0,0,0):O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);let H=p!==_i&&this.type===_i,Y=p===_i&&this.type!==_i;for(let Z=0,G=E.length;Z<G;Z++){let it=E[Z],W=it.shadow;if(W===void 0){console.warn("THREE.WebGLShadowMap:",it,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;s.copy(W.mapSize);let mt=W.getFrameExtents();if(s.multiply(mt),r.copy(W.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/mt.x),s.x=r.x*mt.x,W.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/mt.y),s.y=r.y*mt.y,W.mapSize.y=r.y)),W.map===null||H===!0||Y===!0){let Ct=this.type!==_i?{minFilter:Tn,magFilter:Tn}:{};W.map!==null&&W.map.dispose(),W.map=new Zn(s.x,s.y,Ct),W.map.texture.name=it.name+".shadowMap",W.camera.updateProjectionMatrix()}n.setRenderTarget(W.map),n.clear();let bt=W.getViewportCount();for(let Ct=0;Ct<bt;Ct++){let Yt=W.getViewport(Ct);o.set(r.x*Yt.x,r.y*Yt.y,r.x*Yt.z,r.y*Yt.w),O.viewport(o),W.updateMatrices(it,Ct),i=W.getFrustum(),x(R,D,W.camera,it,this.type)}W.isPointLightShadow!==!0&&this.type===_i&&M(W,D),W.needsUpdate=!1}p=this.type,m.needsUpdate=!1,n.setRenderTarget(T,b,I)};function M(E,R){let D=t.update(_);u.defines.VSM_SAMPLES!==E.blurSamples&&(u.defines.VSM_SAMPLES=E.blurSamples,f.defines.VSM_SAMPLES=E.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new Zn(s.x,s.y)),u.uniforms.shadow_pass.value=E.map.texture,u.uniforms.resolution.value=E.mapSize,u.uniforms.radius.value=E.radius,n.setRenderTarget(E.mapPass),n.clear(),n.renderBufferDirect(R,null,D,u,_,null),f.uniforms.shadow_pass.value=E.mapPass.texture,f.uniforms.resolution.value=E.mapSize,f.uniforms.radius.value=E.radius,n.setRenderTarget(E.map),n.clear(),n.renderBufferDirect(R,null,D,f,_,null)}function v(E,R,D,T){let b=null,I=D.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(I!==void 0)b=I;else if(b=D.isPointLight===!0?l:a,n.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){let O=b.uuid,H=R.uuid,Y=c[O];Y===void 0&&(Y={},c[O]=Y);let Z=Y[H];Z===void 0&&(Z=b.clone(),Y[H]=Z,R.addEventListener("dispose",A)),b=Z}if(b.visible=R.visible,b.wireframe=R.wireframe,T===_i?b.side=R.shadowSide!==null?R.shadowSide:R.side:b.side=R.shadowSide!==null?R.shadowSide:d[R.side],b.alphaMap=R.alphaMap,b.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,b.map=R.map,b.clipShadows=R.clipShadows,b.clippingPlanes=R.clippingPlanes,b.clipIntersection=R.clipIntersection,b.displacementMap=R.displacementMap,b.displacementScale=R.displacementScale,b.displacementBias=R.displacementBias,b.wireframeLinewidth=R.wireframeLinewidth,b.linewidth=R.linewidth,D.isPointLight===!0&&b.isMeshDistanceMaterial===!0){let O=n.properties.get(b);O.light=D}return b}function x(E,R,D,T,b){if(E.visible===!1)return;if(E.layers.test(R.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&b===_i)&&(!E.frustumCulled||i.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(D.matrixWorldInverse,E.matrixWorld);let H=t.update(E),Y=E.material;if(Array.isArray(Y)){let Z=H.groups;for(let G=0,it=Z.length;G<it;G++){let W=Z[G],mt=Y[W.materialIndex];if(mt&&mt.visible){let bt=v(E,mt,T,b);E.onBeforeShadow(n,E,R,D,H,bt,W),n.renderBufferDirect(D,null,H,bt,E,W),E.onAfterShadow(n,E,R,D,H,bt,W)}}}else if(Y.visible){let Z=v(E,Y,T,b);E.onBeforeShadow(n,E,R,D,H,Z,null),n.renderBufferDirect(D,null,H,Z,E,null),E.onAfterShadow(n,E,R,D,H,Z,null)}}let O=E.children;for(let H=0,Y=O.length;H<Y;H++)x(O[H],R,D,T,b)}function A(E){E.target.removeEventListener("dispose",A);for(let D in c){let T=c[D],b=E.target.uuid;b in T&&(T[b].dispose(),delete T[b])}}}var y1={[Ga]:Wa,[Xa]:Za,[qa]:Ja,[ds]:Ya,[Wa]:Ga,[Za]:Xa,[Ja]:qa,[Ya]:ds};function v1(n,t){function e(){let L=!1,st=new ge,pt=null,At=new ge(0,0,0,0);return{setMask:function(ct){pt!==ct&&!L&&(n.colorMask(ct,ct,ct,ct),pt=ct)},setLocked:function(ct){L=ct},setClear:function(ct,Q,Lt,Zt,xe){xe===!0&&(ct*=Zt,Q*=Zt,Lt*=Zt),st.set(ct,Q,Lt,Zt),At.equals(st)===!1&&(n.clearColor(ct,Q,Lt,Zt),At.copy(st))},reset:function(){L=!1,pt=null,At.set(-1,0,0,0)}}}function i(){let L=!1,st=!1,pt=null,At=null,ct=null;return{setReversed:function(Q){if(st!==Q){let Lt=t.get("EXT_clip_control");Q?Lt.clipControlEXT(Lt.LOWER_LEFT_EXT,Lt.ZERO_TO_ONE_EXT):Lt.clipControlEXT(Lt.LOWER_LEFT_EXT,Lt.NEGATIVE_ONE_TO_ONE_EXT),st=Q;let Zt=ct;ct=null,this.setClear(Zt)}},getReversed:function(){return st},setTest:function(Q){Q?nt(n.DEPTH_TEST):wt(n.DEPTH_TEST)},setMask:function(Q){pt!==Q&&!L&&(n.depthMask(Q),pt=Q)},setFunc:function(Q){if(st&&(Q=y1[Q]),At!==Q){switch(Q){case Ga:n.depthFunc(n.NEVER);break;case Wa:n.depthFunc(n.ALWAYS);break;case Xa:n.depthFunc(n.LESS);break;case ds:n.depthFunc(n.LEQUAL);break;case qa:n.depthFunc(n.EQUAL);break;case Ya:n.depthFunc(n.GEQUAL);break;case Za:n.depthFunc(n.GREATER);break;case Ja:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}At=Q}},setLocked:function(Q){L=Q},setClear:function(Q){ct!==Q&&(st&&(Q=1-Q),n.clearDepth(Q),ct=Q)},reset:function(){L=!1,pt=null,At=null,ct=null,st=!1}}}function s(){let L=!1,st=null,pt=null,At=null,ct=null,Q=null,Lt=null,Zt=null,xe=null;return{setTest:function(le){L||(le?nt(n.STENCIL_TEST):wt(n.STENCIL_TEST))},setMask:function(le){st!==le&&!L&&(n.stencilMask(le),st=le)},setFunc:function(le,Hn,an){(pt!==le||At!==Hn||ct!==an)&&(n.stencilFunc(le,Hn,an),pt=le,At=Hn,ct=an)},setOp:function(le,Hn,an){(Q!==le||Lt!==Hn||Zt!==an)&&(n.stencilOp(le,Hn,an),Q=le,Lt=Hn,Zt=an)},setLocked:function(le){L=le},setClear:function(le){xe!==le&&(n.clearStencil(le),xe=le)},reset:function(){L=!1,st=null,pt=null,At=null,ct=null,Q=null,Lt=null,Zt=null,xe=null}}}let r=new e,o=new i,a=new s,l=new WeakMap,c=new WeakMap,h={},d={},u=new WeakMap,f=[],g=null,_=!1,m=null,p=null,M=null,v=null,x=null,A=null,E=null,R=new St(0,0,0),D=0,T=!1,b=null,I=null,O=null,H=null,Y=null,Z=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),G=!1,it=0,W=n.getParameter(n.VERSION);W.indexOf("WebGL")!==-1?(it=parseFloat(/^WebGL (\d)/.exec(W)[1]),G=it>=1):W.indexOf("OpenGL ES")!==-1&&(it=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),G=it>=2);let mt=null,bt={},Ct=n.getParameter(n.SCISSOR_BOX),Yt=n.getParameter(n.VIEWPORT),oe=new ge().fromArray(Ct),pe=new ge().fromArray(Yt);function zt(L,st,pt,At){let ct=new Uint8Array(4),Q=n.createTexture();n.bindTexture(L,Q),n.texParameteri(L,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(L,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Lt=0;Lt<pt;Lt++)L===n.TEXTURE_3D||L===n.TEXTURE_2D_ARRAY?n.texImage3D(st,0,n.RGBA,1,1,At,0,n.RGBA,n.UNSIGNED_BYTE,ct):n.texImage2D(st+Lt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,ct);return Q}let K={};K[n.TEXTURE_2D]=zt(n.TEXTURE_2D,n.TEXTURE_2D,1),K[n.TEXTURE_CUBE_MAP]=zt(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),K[n.TEXTURE_2D_ARRAY]=zt(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),K[n.TEXTURE_3D]=zt(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),nt(n.DEPTH_TEST),o.setFunc(ds),X(!1),$(Bc),nt(n.CULL_FACE),tt(Ri);function nt(L){h[L]!==!0&&(n.enable(L),h[L]=!0)}function wt(L){h[L]!==!1&&(n.disable(L),h[L]=!1)}function _t(L,st){return d[L]!==st?(n.bindFramebuffer(L,st),d[L]=st,L===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=st),L===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=st),!0):!1}function Mt(L,st){let pt=f,At=!1;if(L){pt=u.get(st),pt===void 0&&(pt=[],u.set(st,pt));let ct=L.textures;if(pt.length!==ct.length||pt[0]!==n.COLOR_ATTACHMENT0){for(let Q=0,Lt=ct.length;Q<Lt;Q++)pt[Q]=n.COLOR_ATTACHMENT0+Q;pt.length=ct.length,At=!0}}else pt[0]!==n.BACK&&(pt[0]=n.BACK,At=!0);At&&n.drawBuffers(pt)}function jt(L){return g!==L?(n.useProgram(L),g=L,!0):!1}let te={[ki]:n.FUNC_ADD,[wu]:n.FUNC_SUBTRACT,[Eu]:n.FUNC_REVERSE_SUBTRACT};te[Au]=n.MIN,te[Cu]=n.MAX;let C={[Ru]:n.ZERO,[Pu]:n.ONE,[Iu]:n.SRC_COLOR,[da]:n.SRC_ALPHA,[Ou]:n.SRC_ALPHA_SATURATE,[Nu]:n.DST_COLOR,[Lu]:n.DST_ALPHA,[Du]:n.ONE_MINUS_SRC_COLOR,[fa]:n.ONE_MINUS_SRC_ALPHA,[Fu]:n.ONE_MINUS_DST_COLOR,[Uu]:n.ONE_MINUS_DST_ALPHA,[Bu]:n.CONSTANT_COLOR,[zu]:n.ONE_MINUS_CONSTANT_COLOR,[ku]:n.CONSTANT_ALPHA,[Vu]:n.ONE_MINUS_CONSTANT_ALPHA};function tt(L,st,pt,At,ct,Q,Lt,Zt,xe,le){if(L===Ri){_===!0&&(wt(n.BLEND),_=!1);return}if(_===!1&&(nt(n.BLEND),_=!0),L!==Tu){if(L!==m||le!==T){if((p!==ki||x!==ki)&&(n.blendEquation(n.FUNC_ADD),p=ki,x=ki),le)switch(L){case us:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case fr:n.blendFunc(n.ONE,n.ONE);break;case kc:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Vc:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}else switch(L){case us:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case fr:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case kc:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Vc:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}M=null,v=null,A=null,E=null,R.set(0,0,0),D=0,m=L,T=le}return}ct=ct||st,Q=Q||pt,Lt=Lt||At,(st!==p||ct!==x)&&(n.blendEquationSeparate(te[st],te[ct]),p=st,x=ct),(pt!==M||At!==v||Q!==A||Lt!==E)&&(n.blendFuncSeparate(C[pt],C[At],C[Q],C[Lt]),M=pt,v=At,A=Q,E=Lt),(Zt.equals(R)===!1||xe!==D)&&(n.blendColor(Zt.r,Zt.g,Zt.b,xe),R.copy(Zt),D=xe),m=L,T=!1}function j(L,st){L.side===rn?wt(n.CULL_FACE):nt(n.CULL_FACE);let pt=L.side===sn;st&&(pt=!pt),X(pt),L.blending===us&&L.transparent===!1?tt(Ri):tt(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),o.setFunc(L.depthFunc),o.setTest(L.depthTest),o.setMask(L.depthWrite),r.setMask(L.colorWrite);let At=L.stencilWrite;a.setTest(At),At&&(a.setMask(L.stencilWriteMask),a.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),a.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),ot(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?nt(n.SAMPLE_ALPHA_TO_COVERAGE):wt(n.SAMPLE_ALPHA_TO_COVERAGE)}function X(L){b!==L&&(L?n.frontFace(n.CW):n.frontFace(n.CCW),b=L)}function $(L){L!==Su?(nt(n.CULL_FACE),L!==I&&(L===Bc?n.cullFace(n.BACK):L===bu?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):wt(n.CULL_FACE),I=L}function ft(L){L!==O&&(G&&n.lineWidth(L),O=L)}function ot(L,st,pt){L?(nt(n.POLYGON_OFFSET_FILL),(H!==st||Y!==pt)&&(n.polygonOffset(st,pt),H=st,Y=pt)):wt(n.POLYGON_OFFSET_FILL)}function gt(L){L?nt(n.SCISSOR_TEST):wt(n.SCISSOR_TEST)}function Ot(L){L===void 0&&(L=n.TEXTURE0+Z-1),mt!==L&&(n.activeTexture(L),mt=L)}function Vt(L,st,pt){pt===void 0&&(mt===null?pt=n.TEXTURE0+Z-1:pt=mt);let At=bt[pt];At===void 0&&(At={type:void 0,texture:void 0},bt[pt]=At),(At.type!==L||At.texture!==st)&&(mt!==pt&&(n.activeTexture(pt),mt=pt),n.bindTexture(L,st||K[L]),At.type=L,At.texture=st)}function w(){let L=bt[mt];L!==void 0&&L.type!==void 0&&(n.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function y(){try{n.compressedTexImage2D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function N(){try{n.compressedTexImage3D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function k(){try{n.texSubImage2D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function et(){try{n.texSubImage3D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function q(){try{n.compressedTexSubImage2D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Et(){try{n.compressedTexSubImage3D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function at(){try{n.texStorage2D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Dt(){try{n.texStorage3D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Rt(){try{n.texImage2D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function lt(){try{n.texImage3D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function xt(L){oe.equals(L)===!1&&(n.scissor(L.x,L.y,L.z,L.w),oe.copy(L))}function Bt(L){pe.equals(L)===!1&&(n.viewport(L.x,L.y,L.z,L.w),pe.copy(L))}function Ft(L,st){let pt=c.get(st);pt===void 0&&(pt=new WeakMap,c.set(st,pt));let At=pt.get(L);At===void 0&&(At=n.getUniformBlockIndex(st,L.name),pt.set(L,At))}function yt(L,st){let At=c.get(st).get(L);l.get(st)!==At&&(n.uniformBlockBinding(st,At,L.__bindingPointIndex),l.set(st,At))}function Wt(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),h={},mt=null,bt={},d={},u=new WeakMap,f=[],g=null,_=!1,m=null,p=null,M=null,v=null,x=null,A=null,E=null,R=new St(0,0,0),D=0,T=!1,b=null,I=null,O=null,H=null,Y=null,oe.set(0,0,n.canvas.width,n.canvas.height),pe.set(0,0,n.canvas.width,n.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:nt,disable:wt,bindFramebuffer:_t,drawBuffers:Mt,useProgram:jt,setBlending:tt,setMaterial:j,setFlipSided:X,setCullFace:$,setLineWidth:ft,setPolygonOffset:ot,setScissorTest:gt,activeTexture:Ot,bindTexture:Vt,unbindTexture:w,compressedTexImage2D:y,compressedTexImage3D:N,texImage2D:Rt,texImage3D:lt,updateUBOMapping:Ft,uniformBlockBinding:yt,texStorage2D:at,texStorage3D:Dt,texSubImage2D:k,texSubImage3D:et,compressedTexSubImage2D:q,compressedTexSubImage3D:Et,scissor:xt,viewport:Bt,reset:Wt}}function M1(n,t,e,i,s,r,o){let a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new rt,h=new WeakMap,d,u=new WeakMap,f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(w,y){return f?new OffscreenCanvas(w,y):Xr("canvas")}function _(w,y,N){let k=1,et=Vt(w);if((et.width>N||et.height>N)&&(k=N/Math.max(et.width,et.height)),k<1)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){let q=Math.floor(k*et.width),Et=Math.floor(k*et.height);d===void 0&&(d=g(q,Et));let at=y?g(q,Et):d;return at.width=q,at.height=Et,at.getContext("2d").drawImage(w,0,0,q,Et),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+et.width+"x"+et.height+") to ("+q+"x"+Et+")."),at}else return"data"in w&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+et.width+"x"+et.height+")."),w;return w}function m(w){return w.generateMipmaps}function p(w){n.generateMipmap(w)}function M(w){return w.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:w.isWebGL3DRenderTarget?n.TEXTURE_3D:w.isWebGLArrayRenderTarget||w.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function v(w,y,N,k,et=!1){if(w!==null){if(n[w]!==void 0)return n[w];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let q=y;if(y===n.RED&&(N===n.FLOAT&&(q=n.R32F),N===n.HALF_FLOAT&&(q=n.R16F),N===n.UNSIGNED_BYTE&&(q=n.R8)),y===n.RED_INTEGER&&(N===n.UNSIGNED_BYTE&&(q=n.R8UI),N===n.UNSIGNED_SHORT&&(q=n.R16UI),N===n.UNSIGNED_INT&&(q=n.R32UI),N===n.BYTE&&(q=n.R8I),N===n.SHORT&&(q=n.R16I),N===n.INT&&(q=n.R32I)),y===n.RG&&(N===n.FLOAT&&(q=n.RG32F),N===n.HALF_FLOAT&&(q=n.RG16F),N===n.UNSIGNED_BYTE&&(q=n.RG8)),y===n.RG_INTEGER&&(N===n.UNSIGNED_BYTE&&(q=n.RG8UI),N===n.UNSIGNED_SHORT&&(q=n.RG16UI),N===n.UNSIGNED_INT&&(q=n.RG32UI),N===n.BYTE&&(q=n.RG8I),N===n.SHORT&&(q=n.RG16I),N===n.INT&&(q=n.RG32I)),y===n.RGB_INTEGER&&(N===n.UNSIGNED_BYTE&&(q=n.RGB8UI),N===n.UNSIGNED_SHORT&&(q=n.RGB16UI),N===n.UNSIGNED_INT&&(q=n.RGB32UI),N===n.BYTE&&(q=n.RGB8I),N===n.SHORT&&(q=n.RGB16I),N===n.INT&&(q=n.RGB32I)),y===n.RGBA_INTEGER&&(N===n.UNSIGNED_BYTE&&(q=n.RGBA8UI),N===n.UNSIGNED_SHORT&&(q=n.RGBA16UI),N===n.UNSIGNED_INT&&(q=n.RGBA32UI),N===n.BYTE&&(q=n.RGBA8I),N===n.SHORT&&(q=n.RGBA16I),N===n.INT&&(q=n.RGBA32I)),y===n.RGB&&(N===n.UNSIGNED_INT_5_9_9_9_REV&&(q=n.RGB9_E5),N===n.UNSIGNED_INT_10F_11F_11F_REV&&(q=n.R11F_G11F_B10F)),y===n.RGBA){let Et=et?Gr:he.getTransfer(k);N===n.FLOAT&&(q=n.RGBA32F),N===n.HALF_FLOAT&&(q=n.RGBA16F),N===n.UNSIGNED_BYTE&&(q=Et===_e?n.SRGB8_ALPHA8:n.RGBA8),N===n.UNSIGNED_SHORT_4_4_4_4&&(q=n.RGBA4),N===n.UNSIGNED_SHORT_5_5_5_1&&(q=n.RGB5_A1)}return(q===n.R16F||q===n.R32F||q===n.RG16F||q===n.RG32F||q===n.RGBA16F||q===n.RGBA32F)&&t.get("EXT_color_buffer_float"),q}function x(w,y){let N;return w?y===null||y===Ji||y===gr?N=n.DEPTH24_STENCIL8:y===oi?N=n.DEPTH32F_STENCIL8:y===pr&&(N=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):y===null||y===Ji||y===gr?N=n.DEPTH_COMPONENT24:y===oi?N=n.DEPTH_COMPONENT32F:y===pr&&(N=n.DEPTH_COMPONENT16),N}function A(w,y){return m(w)===!0||w.isFramebufferTexture&&w.minFilter!==Tn&&w.minFilter!==Nn?Math.log2(Math.max(y.width,y.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?y.mipmaps.length:1}function E(w){let y=w.target;y.removeEventListener("dispose",E),D(y),y.isVideoTexture&&h.delete(y)}function R(w){let y=w.target;y.removeEventListener("dispose",R),b(y)}function D(w){let y=i.get(w);if(y.__webglInit===void 0)return;let N=w.source,k=u.get(N);if(k){let et=k[y.__cacheKey];et.usedTimes--,et.usedTimes===0&&T(w),Object.keys(k).length===0&&u.delete(N)}i.remove(w)}function T(w){let y=i.get(w);n.deleteTexture(y.__webglTexture);let N=w.source,k=u.get(N);delete k[y.__cacheKey],o.memory.textures--}function b(w){let y=i.get(w);if(w.depthTexture&&(w.depthTexture.dispose(),i.remove(w.depthTexture)),w.isWebGLCubeRenderTarget)for(let k=0;k<6;k++){if(Array.isArray(y.__webglFramebuffer[k]))for(let et=0;et<y.__webglFramebuffer[k].length;et++)n.deleteFramebuffer(y.__webglFramebuffer[k][et]);else n.deleteFramebuffer(y.__webglFramebuffer[k]);y.__webglDepthbuffer&&n.deleteRenderbuffer(y.__webglDepthbuffer[k])}else{if(Array.isArray(y.__webglFramebuffer))for(let k=0;k<y.__webglFramebuffer.length;k++)n.deleteFramebuffer(y.__webglFramebuffer[k]);else n.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&n.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&n.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let k=0;k<y.__webglColorRenderbuffer.length;k++)y.__webglColorRenderbuffer[k]&&n.deleteRenderbuffer(y.__webglColorRenderbuffer[k]);y.__webglDepthRenderbuffer&&n.deleteRenderbuffer(y.__webglDepthRenderbuffer)}let N=w.textures;for(let k=0,et=N.length;k<et;k++){let q=i.get(N[k]);q.__webglTexture&&(n.deleteTexture(q.__webglTexture),o.memory.textures--),i.remove(N[k])}i.remove(w)}let I=0;function O(){I=0}function H(){let w=I;return w>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+w+" texture units while this GPU supports only "+s.maxTextures),I+=1,w}function Y(w){let y=[];return y.push(w.wrapS),y.push(w.wrapT),y.push(w.wrapR||0),y.push(w.magFilter),y.push(w.minFilter),y.push(w.anisotropy),y.push(w.internalFormat),y.push(w.format),y.push(w.type),y.push(w.generateMipmaps),y.push(w.premultiplyAlpha),y.push(w.flipY),y.push(w.unpackAlignment),y.push(w.colorSpace),y.join()}function Z(w,y){let N=i.get(w);if(w.isVideoTexture&&gt(w),w.isRenderTargetTexture===!1&&w.isExternalTexture!==!0&&w.version>0&&N.__version!==w.version){let k=w.image;if(k===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(k.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{K(N,w,y);return}}else w.isExternalTexture&&(N.__webglTexture=w.sourceTexture?w.sourceTexture:null);e.bindTexture(n.TEXTURE_2D,N.__webglTexture,n.TEXTURE0+y)}function G(w,y){let N=i.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&N.__version!==w.version){K(N,w,y);return}e.bindTexture(n.TEXTURE_2D_ARRAY,N.__webglTexture,n.TEXTURE0+y)}function it(w,y){let N=i.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&N.__version!==w.version){K(N,w,y);return}e.bindTexture(n.TEXTURE_3D,N.__webglTexture,n.TEXTURE0+y)}function W(w,y){let N=i.get(w);if(w.version>0&&N.__version!==w.version){nt(N,w,y);return}e.bindTexture(n.TEXTURE_CUBE_MAP,N.__webglTexture,n.TEXTURE0+y)}let mt={[si]:n.REPEAT,[zi]:n.CLAMP_TO_EDGE,[pa]:n.MIRRORED_REPEAT},bt={[Tn]:n.NEAREST,[$u]:n.NEAREST_MIPMAP_NEAREST,[So]:n.NEAREST_MIPMAP_LINEAR,[Nn]:n.LINEAR,[ja]:n.LINEAR_MIPMAP_NEAREST,[Zi]:n.LINEAR_MIPMAP_LINEAR},Ct={[ed]:n.NEVER,[ad]:n.ALWAYS,[nd]:n.LESS,[jc]:n.LEQUAL,[id]:n.EQUAL,[od]:n.GEQUAL,[sd]:n.GREATER,[rd]:n.NOTEQUAL};function Yt(w,y){if(y.type===oi&&t.has("OES_texture_float_linear")===!1&&(y.magFilter===Nn||y.magFilter===ja||y.magFilter===So||y.magFilter===Zi||y.minFilter===Nn||y.minFilter===ja||y.minFilter===So||y.minFilter===Zi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(w,n.TEXTURE_WRAP_S,mt[y.wrapS]),n.texParameteri(w,n.TEXTURE_WRAP_T,mt[y.wrapT]),(w===n.TEXTURE_3D||w===n.TEXTURE_2D_ARRAY)&&n.texParameteri(w,n.TEXTURE_WRAP_R,mt[y.wrapR]),n.texParameteri(w,n.TEXTURE_MAG_FILTER,bt[y.magFilter]),n.texParameteri(w,n.TEXTURE_MIN_FILTER,bt[y.minFilter]),y.compareFunction&&(n.texParameteri(w,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(w,n.TEXTURE_COMPARE_FUNC,Ct[y.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===Tn||y.minFilter!==So&&y.minFilter!==Zi||y.type===oi&&t.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||i.get(y).__currentAnisotropy){let N=t.get("EXT_texture_filter_anisotropic");n.texParameterf(w,N.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,s.getMaxAnisotropy())),i.get(y).__currentAnisotropy=y.anisotropy}}}function oe(w,y){let N=!1;w.__webglInit===void 0&&(w.__webglInit=!0,y.addEventListener("dispose",E));let k=y.source,et=u.get(k);et===void 0&&(et={},u.set(k,et));let q=Y(y);if(q!==w.__cacheKey){et[q]===void 0&&(et[q]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,N=!0),et[q].usedTimes++;let Et=et[w.__cacheKey];Et!==void 0&&(et[w.__cacheKey].usedTimes--,Et.usedTimes===0&&T(y)),w.__cacheKey=q,w.__webglTexture=et[q].texture}return N}function pe(w,y,N){return Math.floor(Math.floor(w/N)/y)}function zt(w,y,N,k){let q=w.updateRanges;if(q.length===0)e.texSubImage2D(n.TEXTURE_2D,0,0,0,y.width,y.height,N,k,y.data);else{q.sort((lt,xt)=>lt.start-xt.start);let Et=0;for(let lt=1;lt<q.length;lt++){let xt=q[Et],Bt=q[lt],Ft=xt.start+xt.count,yt=pe(Bt.start,y.width,4),Wt=pe(xt.start,y.width,4);Bt.start<=Ft+1&&yt===Wt&&pe(Bt.start+Bt.count-1,y.width,4)===yt?xt.count=Math.max(xt.count,Bt.start+Bt.count-xt.start):(++Et,q[Et]=Bt)}q.length=Et+1;let at=n.getParameter(n.UNPACK_ROW_LENGTH),Dt=n.getParameter(n.UNPACK_SKIP_PIXELS),Rt=n.getParameter(n.UNPACK_SKIP_ROWS);n.pixelStorei(n.UNPACK_ROW_LENGTH,y.width);for(let lt=0,xt=q.length;lt<xt;lt++){let Bt=q[lt],Ft=Math.floor(Bt.start/4),yt=Math.ceil(Bt.count/4),Wt=Ft%y.width,L=Math.floor(Ft/y.width),st=yt,pt=1;n.pixelStorei(n.UNPACK_SKIP_PIXELS,Wt),n.pixelStorei(n.UNPACK_SKIP_ROWS,L),e.texSubImage2D(n.TEXTURE_2D,0,Wt,L,st,pt,N,k,y.data)}w.clearUpdateRanges(),n.pixelStorei(n.UNPACK_ROW_LENGTH,at),n.pixelStorei(n.UNPACK_SKIP_PIXELS,Dt),n.pixelStorei(n.UNPACK_SKIP_ROWS,Rt)}}function K(w,y,N){let k=n.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(k=n.TEXTURE_2D_ARRAY),y.isData3DTexture&&(k=n.TEXTURE_3D);let et=oe(w,y),q=y.source;e.bindTexture(k,w.__webglTexture,n.TEXTURE0+N);let Et=i.get(q);if(q.version!==Et.__version||et===!0){e.activeTexture(n.TEXTURE0+N);let at=he.getPrimaries(he.workingColorSpace),Dt=y.colorSpace===Ii?null:he.getPrimaries(y.colorSpace),Rt=y.colorSpace===Ii||at===Dt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,y.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,y.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Rt);let lt=_(y.image,!1,s.maxTextureSize);lt=Ot(y,lt);let xt=r.convert(y.format,y.colorSpace),Bt=r.convert(y.type),Ft=v(y.internalFormat,xt,Bt,y.colorSpace,y.isVideoTexture);Yt(k,y);let yt,Wt=y.mipmaps,L=y.isVideoTexture!==!0,st=Et.__version===void 0||et===!0,pt=q.dataReady,At=A(y,lt);if(y.isDepthTexture)Ft=x(y.format===_r,y.type),st&&(L?e.texStorage2D(n.TEXTURE_2D,1,Ft,lt.width,lt.height):e.texImage2D(n.TEXTURE_2D,0,Ft,lt.width,lt.height,0,xt,Bt,null));else if(y.isDataTexture)if(Wt.length>0){L&&st&&e.texStorage2D(n.TEXTURE_2D,At,Ft,Wt[0].width,Wt[0].height);for(let ct=0,Q=Wt.length;ct<Q;ct++)yt=Wt[ct],L?pt&&e.texSubImage2D(n.TEXTURE_2D,ct,0,0,yt.width,yt.height,xt,Bt,yt.data):e.texImage2D(n.TEXTURE_2D,ct,Ft,yt.width,yt.height,0,xt,Bt,yt.data);y.generateMipmaps=!1}else L?(st&&e.texStorage2D(n.TEXTURE_2D,At,Ft,lt.width,lt.height),pt&&zt(y,lt,xt,Bt)):e.texImage2D(n.TEXTURE_2D,0,Ft,lt.width,lt.height,0,xt,Bt,lt.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){L&&st&&e.texStorage3D(n.TEXTURE_2D_ARRAY,At,Ft,Wt[0].width,Wt[0].height,lt.depth);for(let ct=0,Q=Wt.length;ct<Q;ct++)if(yt=Wt[ct],y.format!==Kn)if(xt!==null)if(L){if(pt)if(y.layerUpdates.size>0){let Lt=oh(yt.width,yt.height,y.format,y.type);for(let Zt of y.layerUpdates){let xe=yt.data.subarray(Zt*Lt/yt.data.BYTES_PER_ELEMENT,(Zt+1)*Lt/yt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ct,0,0,Zt,yt.width,yt.height,1,xt,xe)}y.clearLayerUpdates()}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ct,0,0,0,yt.width,yt.height,lt.depth,xt,yt.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,ct,Ft,yt.width,yt.height,lt.depth,0,yt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else L?pt&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,ct,0,0,0,yt.width,yt.height,lt.depth,xt,Bt,yt.data):e.texImage3D(n.TEXTURE_2D_ARRAY,ct,Ft,yt.width,yt.height,lt.depth,0,xt,Bt,yt.data)}else{L&&st&&e.texStorage2D(n.TEXTURE_2D,At,Ft,Wt[0].width,Wt[0].height);for(let ct=0,Q=Wt.length;ct<Q;ct++)yt=Wt[ct],y.format!==Kn?xt!==null?L?pt&&e.compressedTexSubImage2D(n.TEXTURE_2D,ct,0,0,yt.width,yt.height,xt,yt.data):e.compressedTexImage2D(n.TEXTURE_2D,ct,Ft,yt.width,yt.height,0,yt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):L?pt&&e.texSubImage2D(n.TEXTURE_2D,ct,0,0,yt.width,yt.height,xt,Bt,yt.data):e.texImage2D(n.TEXTURE_2D,ct,Ft,yt.width,yt.height,0,xt,Bt,yt.data)}else if(y.isDataArrayTexture)if(L){if(st&&e.texStorage3D(n.TEXTURE_2D_ARRAY,At,Ft,lt.width,lt.height,lt.depth),pt)if(y.layerUpdates.size>0){let ct=oh(lt.width,lt.height,y.format,y.type);for(let Q of y.layerUpdates){let Lt=lt.data.subarray(Q*ct/lt.data.BYTES_PER_ELEMENT,(Q+1)*ct/lt.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,Q,lt.width,lt.height,1,xt,Bt,Lt)}y.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,lt.width,lt.height,lt.depth,xt,Bt,lt.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,Ft,lt.width,lt.height,lt.depth,0,xt,Bt,lt.data);else if(y.isData3DTexture)L?(st&&e.texStorage3D(n.TEXTURE_3D,At,Ft,lt.width,lt.height,lt.depth),pt&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,lt.width,lt.height,lt.depth,xt,Bt,lt.data)):e.texImage3D(n.TEXTURE_3D,0,Ft,lt.width,lt.height,lt.depth,0,xt,Bt,lt.data);else if(y.isFramebufferTexture){if(st)if(L)e.texStorage2D(n.TEXTURE_2D,At,Ft,lt.width,lt.height);else{let ct=lt.width,Q=lt.height;for(let Lt=0;Lt<At;Lt++)e.texImage2D(n.TEXTURE_2D,Lt,Ft,ct,Q,0,xt,Bt,null),ct>>=1,Q>>=1}}else if(Wt.length>0){if(L&&st){let ct=Vt(Wt[0]);e.texStorage2D(n.TEXTURE_2D,At,Ft,ct.width,ct.height)}for(let ct=0,Q=Wt.length;ct<Q;ct++)yt=Wt[ct],L?pt&&e.texSubImage2D(n.TEXTURE_2D,ct,0,0,xt,Bt,yt):e.texImage2D(n.TEXTURE_2D,ct,Ft,xt,Bt,yt);y.generateMipmaps=!1}else if(L){if(st){let ct=Vt(lt);e.texStorage2D(n.TEXTURE_2D,At,Ft,ct.width,ct.height)}pt&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,xt,Bt,lt)}else e.texImage2D(n.TEXTURE_2D,0,Ft,xt,Bt,lt);m(y)&&p(k),Et.__version=q.version,y.onUpdate&&y.onUpdate(y)}w.__version=y.version}function nt(w,y,N){if(y.image.length!==6)return;let k=oe(w,y),et=y.source;e.bindTexture(n.TEXTURE_CUBE_MAP,w.__webglTexture,n.TEXTURE0+N);let q=i.get(et);if(et.version!==q.__version||k===!0){e.activeTexture(n.TEXTURE0+N);let Et=he.getPrimaries(he.workingColorSpace),at=y.colorSpace===Ii?null:he.getPrimaries(y.colorSpace),Dt=y.colorSpace===Ii||Et===at?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,y.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,y.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Dt);let Rt=y.isCompressedTexture||y.image[0].isCompressedTexture,lt=y.image[0]&&y.image[0].isDataTexture,xt=[];for(let Q=0;Q<6;Q++)!Rt&&!lt?xt[Q]=_(y.image[Q],!0,s.maxCubemapSize):xt[Q]=lt?y.image[Q].image:y.image[Q],xt[Q]=Ot(y,xt[Q]);let Bt=xt[0],Ft=r.convert(y.format,y.colorSpace),yt=r.convert(y.type),Wt=v(y.internalFormat,Ft,yt,y.colorSpace),L=y.isVideoTexture!==!0,st=q.__version===void 0||k===!0,pt=et.dataReady,At=A(y,Bt);Yt(n.TEXTURE_CUBE_MAP,y);let ct;if(Rt){L&&st&&e.texStorage2D(n.TEXTURE_CUBE_MAP,At,Wt,Bt.width,Bt.height);for(let Q=0;Q<6;Q++){ct=xt[Q].mipmaps;for(let Lt=0;Lt<ct.length;Lt++){let Zt=ct[Lt];y.format!==Kn?Ft!==null?L?pt&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Lt,0,0,Zt.width,Zt.height,Ft,Zt.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Lt,Wt,Zt.width,Zt.height,0,Zt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):L?pt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Lt,0,0,Zt.width,Zt.height,Ft,yt,Zt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Lt,Wt,Zt.width,Zt.height,0,Ft,yt,Zt.data)}}}else{if(ct=y.mipmaps,L&&st){ct.length>0&&At++;let Q=Vt(xt[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,At,Wt,Q.width,Q.height)}for(let Q=0;Q<6;Q++)if(lt){L?pt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,xt[Q].width,xt[Q].height,Ft,yt,xt[Q].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,Wt,xt[Q].width,xt[Q].height,0,Ft,yt,xt[Q].data);for(let Lt=0;Lt<ct.length;Lt++){let xe=ct[Lt].image[Q].image;L?pt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Lt+1,0,0,xe.width,xe.height,Ft,yt,xe.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Lt+1,Wt,xe.width,xe.height,0,Ft,yt,xe.data)}}else{L?pt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,Ft,yt,xt[Q]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,Wt,Ft,yt,xt[Q]);for(let Lt=0;Lt<ct.length;Lt++){let Zt=ct[Lt];L?pt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Lt+1,0,0,Ft,yt,Zt.image[Q]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Lt+1,Wt,Ft,yt,Zt.image[Q])}}}m(y)&&p(n.TEXTURE_CUBE_MAP),q.__version=et.version,y.onUpdate&&y.onUpdate(y)}w.__version=y.version}function wt(w,y,N,k,et,q){let Et=r.convert(N.format,N.colorSpace),at=r.convert(N.type),Dt=v(N.internalFormat,Et,at,N.colorSpace),Rt=i.get(y),lt=i.get(N);if(lt.__renderTarget=y,!Rt.__hasExternalTextures){let xt=Math.max(1,y.width>>q),Bt=Math.max(1,y.height>>q);et===n.TEXTURE_3D||et===n.TEXTURE_2D_ARRAY?e.texImage3D(et,q,Dt,xt,Bt,y.depth,0,Et,at,null):e.texImage2D(et,q,Dt,xt,Bt,0,Et,at,null)}e.bindFramebuffer(n.FRAMEBUFFER,w),ot(y)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,k,et,lt.__webglTexture,0,ft(y)):(et===n.TEXTURE_2D||et>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&et<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,k,et,lt.__webglTexture,q),e.bindFramebuffer(n.FRAMEBUFFER,null)}function _t(w,y,N){if(n.bindRenderbuffer(n.RENDERBUFFER,w),y.depthBuffer){let k=y.depthTexture,et=k&&k.isDepthTexture?k.type:null,q=x(y.stencilBuffer,et),Et=y.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,at=ft(y);ot(y)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,at,q,y.width,y.height):N?n.renderbufferStorageMultisample(n.RENDERBUFFER,at,q,y.width,y.height):n.renderbufferStorage(n.RENDERBUFFER,q,y.width,y.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,Et,n.RENDERBUFFER,w)}else{let k=y.textures;for(let et=0;et<k.length;et++){let q=k[et],Et=r.convert(q.format,q.colorSpace),at=r.convert(q.type),Dt=v(q.internalFormat,Et,at,q.colorSpace),Rt=ft(y);N&&ot(y)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Rt,Dt,y.width,y.height):ot(y)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Rt,Dt,y.width,y.height):n.renderbufferStorage(n.RENDERBUFFER,Dt,y.width,y.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Mt(w,y){if(y&&y.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(n.FRAMEBUFFER,w),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let k=i.get(y.depthTexture);k.__renderTarget=y,(!k.__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),Z(y.depthTexture,0);let et=k.__webglTexture,q=ft(y);if(y.depthTexture.format===tr)ot(y)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,et,0,q):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,et,0);else if(y.depthTexture.format===_r)ot(y)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,et,0,q):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,et,0);else throw new Error("Unknown depthTexture format")}function jt(w){let y=i.get(w),N=w.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==w.depthTexture){let k=w.depthTexture;if(y.__depthDisposeCallback&&y.__depthDisposeCallback(),k){let et=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,k.removeEventListener("dispose",et)};k.addEventListener("dispose",et),y.__depthDisposeCallback=et}y.__boundDepthTexture=k}if(w.depthTexture&&!y.__autoAllocateDepthBuffer){if(N)throw new Error("target.depthTexture not supported in Cube render targets");let k=w.texture.mipmaps;k&&k.length>0?Mt(y.__webglFramebuffer[0],w):Mt(y.__webglFramebuffer,w)}else if(N){y.__webglDepthbuffer=[];for(let k=0;k<6;k++)if(e.bindFramebuffer(n.FRAMEBUFFER,y.__webglFramebuffer[k]),y.__webglDepthbuffer[k]===void 0)y.__webglDepthbuffer[k]=n.createRenderbuffer(),_t(y.__webglDepthbuffer[k],w,!1);else{let et=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,q=y.__webglDepthbuffer[k];n.bindRenderbuffer(n.RENDERBUFFER,q),n.framebufferRenderbuffer(n.FRAMEBUFFER,et,n.RENDERBUFFER,q)}}else{let k=w.texture.mipmaps;if(k&&k.length>0?e.bindFramebuffer(n.FRAMEBUFFER,y.__webglFramebuffer[0]):e.bindFramebuffer(n.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=n.createRenderbuffer(),_t(y.__webglDepthbuffer,w,!1);else{let et=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,q=y.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,q),n.framebufferRenderbuffer(n.FRAMEBUFFER,et,n.RENDERBUFFER,q)}}e.bindFramebuffer(n.FRAMEBUFFER,null)}function te(w,y,N){let k=i.get(w);y!==void 0&&wt(k.__webglFramebuffer,w,w.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),N!==void 0&&jt(w)}function C(w){let y=w.texture,N=i.get(w),k=i.get(y);w.addEventListener("dispose",R);let et=w.textures,q=w.isWebGLCubeRenderTarget===!0,Et=et.length>1;if(Et||(k.__webglTexture===void 0&&(k.__webglTexture=n.createTexture()),k.__version=y.version,o.memory.textures++),q){N.__webglFramebuffer=[];for(let at=0;at<6;at++)if(y.mipmaps&&y.mipmaps.length>0){N.__webglFramebuffer[at]=[];for(let Dt=0;Dt<y.mipmaps.length;Dt++)N.__webglFramebuffer[at][Dt]=n.createFramebuffer()}else N.__webglFramebuffer[at]=n.createFramebuffer()}else{if(y.mipmaps&&y.mipmaps.length>0){N.__webglFramebuffer=[];for(let at=0;at<y.mipmaps.length;at++)N.__webglFramebuffer[at]=n.createFramebuffer()}else N.__webglFramebuffer=n.createFramebuffer();if(Et)for(let at=0,Dt=et.length;at<Dt;at++){let Rt=i.get(et[at]);Rt.__webglTexture===void 0&&(Rt.__webglTexture=n.createTexture(),o.memory.textures++)}if(w.samples>0&&ot(w)===!1){N.__webglMultisampledFramebuffer=n.createFramebuffer(),N.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,N.__webglMultisampledFramebuffer);for(let at=0;at<et.length;at++){let Dt=et[at];N.__webglColorRenderbuffer[at]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,N.__webglColorRenderbuffer[at]);let Rt=r.convert(Dt.format,Dt.colorSpace),lt=r.convert(Dt.type),xt=v(Dt.internalFormat,Rt,lt,Dt.colorSpace,w.isXRRenderTarget===!0),Bt=ft(w);n.renderbufferStorageMultisample(n.RENDERBUFFER,Bt,xt,w.width,w.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+at,n.RENDERBUFFER,N.__webglColorRenderbuffer[at])}n.bindRenderbuffer(n.RENDERBUFFER,null),w.depthBuffer&&(N.__webglDepthRenderbuffer=n.createRenderbuffer(),_t(N.__webglDepthRenderbuffer,w,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(q){e.bindTexture(n.TEXTURE_CUBE_MAP,k.__webglTexture),Yt(n.TEXTURE_CUBE_MAP,y);for(let at=0;at<6;at++)if(y.mipmaps&&y.mipmaps.length>0)for(let Dt=0;Dt<y.mipmaps.length;Dt++)wt(N.__webglFramebuffer[at][Dt],w,y,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+at,Dt);else wt(N.__webglFramebuffer[at],w,y,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+at,0);m(y)&&p(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Et){for(let at=0,Dt=et.length;at<Dt;at++){let Rt=et[at],lt=i.get(Rt),xt=n.TEXTURE_2D;(w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(xt=w.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(xt,lt.__webglTexture),Yt(xt,Rt),wt(N.__webglFramebuffer,w,Rt,n.COLOR_ATTACHMENT0+at,xt,0),m(Rt)&&p(xt)}e.unbindTexture()}else{let at=n.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(at=w.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(at,k.__webglTexture),Yt(at,y),y.mipmaps&&y.mipmaps.length>0)for(let Dt=0;Dt<y.mipmaps.length;Dt++)wt(N.__webglFramebuffer[Dt],w,y,n.COLOR_ATTACHMENT0,at,Dt);else wt(N.__webglFramebuffer,w,y,n.COLOR_ATTACHMENT0,at,0);m(y)&&p(at),e.unbindTexture()}w.depthBuffer&&jt(w)}function tt(w){let y=w.textures;for(let N=0,k=y.length;N<k;N++){let et=y[N];if(m(et)){let q=M(w),Et=i.get(et).__webglTexture;e.bindTexture(q,Et),p(q),e.unbindTexture()}}}let j=[],X=[];function $(w){if(w.samples>0){if(ot(w)===!1){let y=w.textures,N=w.width,k=w.height,et=n.COLOR_BUFFER_BIT,q=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Et=i.get(w),at=y.length>1;if(at)for(let Rt=0;Rt<y.length;Rt++)e.bindFramebuffer(n.FRAMEBUFFER,Et.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Rt,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,Et.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Rt,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,Et.__webglMultisampledFramebuffer);let Dt=w.texture.mipmaps;Dt&&Dt.length>0?e.bindFramebuffer(n.DRAW_FRAMEBUFFER,Et.__webglFramebuffer[0]):e.bindFramebuffer(n.DRAW_FRAMEBUFFER,Et.__webglFramebuffer);for(let Rt=0;Rt<y.length;Rt++){if(w.resolveDepthBuffer&&(w.depthBuffer&&(et|=n.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&(et|=n.STENCIL_BUFFER_BIT)),at){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Et.__webglColorRenderbuffer[Rt]);let lt=i.get(y[Rt]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,lt,0)}n.blitFramebuffer(0,0,N,k,0,0,N,k,et,n.NEAREST),l===!0&&(j.length=0,X.length=0,j.push(n.COLOR_ATTACHMENT0+Rt),w.depthBuffer&&w.resolveDepthBuffer===!1&&(j.push(q),X.push(q),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,X)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,j))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),at)for(let Rt=0;Rt<y.length;Rt++){e.bindFramebuffer(n.FRAMEBUFFER,Et.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Rt,n.RENDERBUFFER,Et.__webglColorRenderbuffer[Rt]);let lt=i.get(y[Rt]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,Et.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Rt,n.TEXTURE_2D,lt,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,Et.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.resolveDepthBuffer===!1&&l){let y=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[y])}}}function ft(w){return Math.min(s.maxSamples,w.samples)}function ot(w){let y=i.get(w);return w.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function gt(w){let y=o.render.frame;h.get(w)!==y&&(h.set(w,y),w.update())}function Ot(w,y){let N=w.colorSpace,k=w.format,et=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||N!==fs&&N!==Ii&&(he.getTransfer(N)===_e?(k!==Kn||et!==ri)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",N)),y}function Vt(w){return typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement?(c.width=w.naturalWidth||w.width,c.height=w.naturalHeight||w.height):typeof VideoFrame<"u"&&w instanceof VideoFrame?(c.width=w.displayWidth,c.height=w.displayHeight):(c.width=w.width,c.height=w.height),c}this.allocateTextureUnit=H,this.resetTextureUnits=O,this.setTexture2D=Z,this.setTexture2DArray=G,this.setTexture3D=it,this.setTextureCube=W,this.rebindTextures=te,this.setupRenderTarget=C,this.updateRenderTargetMipmap=tt,this.updateMultisampleRenderTarget=$,this.setupDepthRenderbuffer=jt,this.setupFrameBufferTexture=wt,this.useMultisampledRTT=ot}function S1(n,t){function e(i,s=Ii){let r,o=he.getTransfer(s);if(i===ri)return n.UNSIGNED_BYTE;if(i===tl)return n.UNSIGNED_SHORT_4_4_4_4;if(i===el)return n.UNSIGNED_SHORT_5_5_5_1;if(i===qc)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Yc)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===Wc)return n.BYTE;if(i===Xc)return n.SHORT;if(i===pr)return n.UNSIGNED_SHORT;if(i===Qa)return n.INT;if(i===Ji)return n.UNSIGNED_INT;if(i===oi)return n.FLOAT;if(i===mr)return n.HALF_FLOAT;if(i===Zc)return n.ALPHA;if(i===Jc)return n.RGB;if(i===Kn)return n.RGBA;if(i===tr)return n.DEPTH_COMPONENT;if(i===_r)return n.DEPTH_STENCIL;if(i===xr)return n.RED;if(i===nl)return n.RED_INTEGER;if(i===Kc)return n.RG;if(i===il)return n.RG_INTEGER;if(i===sl)return n.RGBA_INTEGER;if(i===bo||i===To||i===wo||i===Eo)if(o===_e)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===bo)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===To)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===wo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Eo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===bo)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===To)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===wo)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Eo)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===rl||i===ol||i===al||i===ll)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===rl)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===ol)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===al)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===ll)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===cl||i===hl||i===ul)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===cl||i===hl)return o===_e?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===ul)return o===_e?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===dl||i===fl||i===pl||i===ml||i===gl||i===_l||i===xl||i===yl||i===vl||i===Ml||i===Sl||i===bl||i===Tl||i===wl)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===dl)return o===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===fl)return o===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===pl)return o===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===ml)return o===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===gl)return o===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===_l)return o===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===xl)return o===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===yl)return o===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===vl)return o===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Ml)return o===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Sl)return o===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===bl)return o===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Tl)return o===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===wl)return o===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===El||i===Al||i===Cl)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===El)return o===_e?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Al)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Cl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Rl||i===Pl||i===Il||i===Dl)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===Rl)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Pl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Il)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Dl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===gr?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}var b1=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,T1=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,yh=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let i=new no(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,i=new wn({vertexShader:b1,fragmentShader:T1,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new ve(new En(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},vh=class extends di{constructor(t,e){super();let i=this,s=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,d=null,u=null,f=null,g=null,_=typeof XRWebGLBinding<"u",m=new yh,p={},M=e.getContextAttributes(),v=null,x=null,A=[],E=[],R=new rt,D=null,T=new He;T.viewport=new ge;let b=new He;b.viewport=new ge;let I=[T,b],O=new Va,H=null,Y=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let nt=A[K];return nt===void 0&&(nt=new ir,A[K]=nt),nt.getTargetRaySpace()},this.getControllerGrip=function(K){let nt=A[K];return nt===void 0&&(nt=new ir,A[K]=nt),nt.getGripSpace()},this.getHand=function(K){let nt=A[K];return nt===void 0&&(nt=new ir,A[K]=nt),nt.getHandSpace()};function Z(K){let nt=E.indexOf(K.inputSource);if(nt===-1)return;let wt=A[nt];wt!==void 0&&(wt.update(K.inputSource,K.frame,c||o),wt.dispatchEvent({type:K.type,data:K.inputSource}))}function G(){s.removeEventListener("select",Z),s.removeEventListener("selectstart",Z),s.removeEventListener("selectend",Z),s.removeEventListener("squeeze",Z),s.removeEventListener("squeezestart",Z),s.removeEventListener("squeezeend",Z),s.removeEventListener("end",G),s.removeEventListener("inputsourceschange",it);for(let K=0;K<A.length;K++){let nt=E[K];nt!==null&&(E[K]=null,A[K].disconnect(nt))}H=null,Y=null,m.reset();for(let K in p)delete p[K];t.setRenderTarget(v),f=null,u=null,d=null,s=null,x=null,zt.stop(),i.isPresenting=!1,t.setPixelRatio(D),t.setSize(R.width,R.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(K){r=K,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){a=K,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(K){c=K},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d===null&&_&&(d=new XRWebGLBinding(s,e)),d},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(K){if(s=K,s!==null){if(v=t.getRenderTarget(),s.addEventListener("select",Z),s.addEventListener("selectstart",Z),s.addEventListener("selectend",Z),s.addEventListener("squeeze",Z),s.addEventListener("squeezestart",Z),s.addEventListener("squeezeend",Z),s.addEventListener("end",G),s.addEventListener("inputsourceschange",it),M.xrCompatible!==!0&&await e.makeXRCompatible(),D=t.getPixelRatio(),t.getSize(R),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let wt=null,_t=null,Mt=null;M.depth&&(Mt=M.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,wt=M.stencil?_r:tr,_t=M.stencil?gr:Ji);let jt={colorFormat:e.RGBA8,depthFormat:Mt,scaleFactor:r};d=this.getBinding(),u=d.createProjectionLayer(jt),s.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),x=new Zn(u.textureWidth,u.textureHeight,{format:Kn,type:ri,depthTexture:new eo(u.textureWidth,u.textureHeight,_t,void 0,void 0,void 0,void 0,void 0,void 0,wt),stencilBuffer:M.stencil,colorSpace:t.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{let wt={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,e,wt),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),x=new Zn(f.framebufferWidth,f.framebufferHeight,{format:Kn,type:ri,colorSpace:t.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),zt.setContext(s),zt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function it(K){for(let nt=0;nt<K.removed.length;nt++){let wt=K.removed[nt],_t=E.indexOf(wt);_t>=0&&(E[_t]=null,A[_t].disconnect(wt))}for(let nt=0;nt<K.added.length;nt++){let wt=K.added[nt],_t=E.indexOf(wt);if(_t===-1){for(let jt=0;jt<A.length;jt++)if(jt>=E.length){E.push(wt),_t=jt;break}else if(E[jt]===null){E[jt]=wt,_t=jt;break}if(_t===-1)break}let Mt=A[_t];Mt&&Mt.connect(wt)}}let W=new P,mt=new P;function bt(K,nt,wt){W.setFromMatrixPosition(nt.matrixWorld),mt.setFromMatrixPosition(wt.matrixWorld);let _t=W.distanceTo(mt),Mt=nt.projectionMatrix.elements,jt=wt.projectionMatrix.elements,te=Mt[14]/(Mt[10]-1),C=Mt[14]/(Mt[10]+1),tt=(Mt[9]+1)/Mt[5],j=(Mt[9]-1)/Mt[5],X=(Mt[8]-1)/Mt[0],$=(jt[8]+1)/jt[0],ft=te*X,ot=te*$,gt=_t/(-X+$),Ot=gt*-X;if(nt.matrixWorld.decompose(K.position,K.quaternion,K.scale),K.translateX(Ot),K.translateZ(gt),K.matrixWorld.compose(K.position,K.quaternion,K.scale),K.matrixWorldInverse.copy(K.matrixWorld).invert(),Mt[10]===-1)K.projectionMatrix.copy(nt.projectionMatrix),K.projectionMatrixInverse.copy(nt.projectionMatrixInverse);else{let Vt=te+gt,w=C+gt,y=ft-Ot,N=ot+(_t-Ot),k=tt*C/w*Vt,et=j*C/w*Vt;K.projectionMatrix.makePerspective(y,N,k,et,Vt,w),K.projectionMatrixInverse.copy(K.projectionMatrix).invert()}}function Ct(K,nt){nt===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices(nt.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(s===null)return;let nt=K.near,wt=K.far;m.texture!==null&&(m.depthNear>0&&(nt=m.depthNear),m.depthFar>0&&(wt=m.depthFar)),O.near=b.near=T.near=nt,O.far=b.far=T.far=wt,(H!==O.near||Y!==O.far)&&(s.updateRenderState({depthNear:O.near,depthFar:O.far}),H=O.near,Y=O.far),O.layers.mask=K.layers.mask|6,T.layers.mask=O.layers.mask&3,b.layers.mask=O.layers.mask&5;let _t=K.parent,Mt=O.cameras;Ct(O,_t);for(let jt=0;jt<Mt.length;jt++)Ct(Mt[jt],_t);Mt.length===2?bt(O,T,b):O.projectionMatrix.copy(T.projectionMatrix),Yt(K,O,_t)};function Yt(K,nt,wt){wt===null?K.matrix.copy(nt.matrixWorld):(K.matrix.copy(wt.matrixWorld),K.matrix.invert(),K.matrix.multiply(nt.matrixWorld)),K.matrix.decompose(K.position,K.quaternion,K.scale),K.updateMatrixWorld(!0),K.projectionMatrix.copy(nt.projectionMatrix),K.projectionMatrixInverse.copy(nt.projectionMatrixInverse),K.isPerspectiveCamera&&(K.fov=ps*2*Math.atan(1/K.projectionMatrix.elements[5]),K.zoom=1)}this.getCamera=function(){return O},this.getFoveation=function(){if(!(u===null&&f===null))return l},this.setFoveation=function(K){l=K,u!==null&&(u.fixedFoveation=K),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=K)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(O)},this.getCameraTexture=function(K){return p[K]};let oe=null;function pe(K,nt){if(h=nt.getViewerPose(c||o),g=nt,h!==null){let wt=h.views;f!==null&&(t.setRenderTargetFramebuffer(x,f.framebuffer),t.setRenderTarget(x));let _t=!1;wt.length!==O.cameras.length&&(O.cameras.length=0,_t=!0);for(let C=0;C<wt.length;C++){let tt=wt[C],j=null;if(f!==null)j=f.getViewport(tt);else{let $=d.getViewSubImage(u,tt);j=$.viewport,C===0&&(t.setRenderTargetTextures(x,$.colorTexture,$.depthStencilTexture),t.setRenderTarget(x))}let X=I[C];X===void 0&&(X=new He,X.layers.enable(C),X.viewport=new ge,I[C]=X),X.matrix.fromArray(tt.transform.matrix),X.matrix.decompose(X.position,X.quaternion,X.scale),X.projectionMatrix.fromArray(tt.projectionMatrix),X.projectionMatrixInverse.copy(X.projectionMatrix).invert(),X.viewport.set(j.x,j.y,j.width,j.height),C===0&&(O.matrix.copy(X.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),_t===!0&&O.cameras.push(X)}let Mt=s.enabledFeatures;if(Mt&&Mt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&_){d=i.getBinding();let C=d.getDepthInformation(wt[0]);C&&C.isValid&&C.texture&&m.init(C,s.renderState)}if(Mt&&Mt.includes("camera-access")&&_){t.state.unbindTexture(),d=i.getBinding();for(let C=0;C<wt.length;C++){let tt=wt[C].camera;if(tt){let j=p[tt];j||(j=new no,p[tt]=j);let X=d.getCameraImage(tt);j.sourceTexture=X}}}}for(let wt=0;wt<A.length;wt++){let _t=E[wt],Mt=A[wt];_t!==null&&Mt!==void 0&&Mt.update(_t,nt,c||o)}oe&&oe(K,nt),nt.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:nt}),g=null}let zt=new kd;zt.setAnimationLoop(pe),this.setAnimationLoop=function(K){oe=K},this.dispose=function(){}}},Rs=new gn,w1=new ne;function E1(n,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function i(m,p){p.color.getRGB(m.fogColor.value,nh(n)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,M,v,x){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),d(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p)):p.isMeshStandardMaterial?(r(m,p),u(m,p),p.isMeshPhysicalMaterial&&f(m,p,x)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),_(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,M,v):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===sn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===sn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let M=t.get(p),v=M.envMap,x=M.envMapRotation;v&&(m.envMap.value=v,Rs.copy(x),Rs.x*=-1,Rs.y*=-1,Rs.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(Rs.y*=-1,Rs.z*=-1),m.envMapRotation.value.setFromMatrix4(w1.makeRotationFromEuler(Rs)),m.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,M,v){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*M,m.scale.value=v*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function d(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function u(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,M){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===sn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=M.texture,m.transmissionSamplerSize.value.set(M.width,M.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){let M=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(M.matrixWorld),m.nearDistance.value=M.shadow.camera.near,m.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function A1(n,t,e,i){let s={},r={},o=[],a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(M,v){let x=v.program;i.uniformBlockBinding(M,x)}function c(M,v){let x=s[M.id];x===void 0&&(g(M),x=h(M),s[M.id]=x,M.addEventListener("dispose",m));let A=v.program;i.updateUBOMapping(M,A);let E=t.render.frame;r[M.id]!==E&&(u(M),r[M.id]=E)}function h(M){let v=d();M.__bindingPointIndex=v;let x=n.createBuffer(),A=M.__size,E=M.usage;return n.bindBuffer(n.UNIFORM_BUFFER,x),n.bufferData(n.UNIFORM_BUFFER,A,E),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,v,x),x}function d(){for(let M=0;M<a;M++)if(o.indexOf(M)===-1)return o.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(M){let v=s[M.id],x=M.uniforms,A=M.__cache;n.bindBuffer(n.UNIFORM_BUFFER,v);for(let E=0,R=x.length;E<R;E++){let D=Array.isArray(x[E])?x[E]:[x[E]];for(let T=0,b=D.length;T<b;T++){let I=D[T];if(f(I,E,T,A)===!0){let O=I.__offset,H=Array.isArray(I.value)?I.value:[I.value],Y=0;for(let Z=0;Z<H.length;Z++){let G=H[Z],it=_(G);typeof G=="number"||typeof G=="boolean"?(I.__data[0]=G,n.bufferSubData(n.UNIFORM_BUFFER,O+Y,I.__data)):G.isMatrix3?(I.__data[0]=G.elements[0],I.__data[1]=G.elements[1],I.__data[2]=G.elements[2],I.__data[3]=0,I.__data[4]=G.elements[3],I.__data[5]=G.elements[4],I.__data[6]=G.elements[5],I.__data[7]=0,I.__data[8]=G.elements[6],I.__data[9]=G.elements[7],I.__data[10]=G.elements[8],I.__data[11]=0):(G.toArray(I.__data,Y),Y+=it.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,O,I.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function f(M,v,x,A){let E=M.value,R=v+"_"+x;if(A[R]===void 0)return typeof E=="number"||typeof E=="boolean"?A[R]=E:A[R]=E.clone(),!0;{let D=A[R];if(typeof E=="number"||typeof E=="boolean"){if(D!==E)return A[R]=E,!0}else if(D.equals(E)===!1)return D.copy(E),!0}return!1}function g(M){let v=M.uniforms,x=0,A=16;for(let R=0,D=v.length;R<D;R++){let T=Array.isArray(v[R])?v[R]:[v[R]];for(let b=0,I=T.length;b<I;b++){let O=T[b],H=Array.isArray(O.value)?O.value:[O.value];for(let Y=0,Z=H.length;Y<Z;Y++){let G=H[Y],it=_(G),W=x%A,mt=W%it.boundary,bt=W+mt;x+=mt,bt!==0&&A-bt<it.storage&&(x+=A-bt),O.__data=new Float32Array(it.storage/Float32Array.BYTES_PER_ELEMENT),O.__offset=x,x+=it.storage}}}let E=x%A;return E>0&&(x+=A-E),M.__size=x,M.__cache={},this}function _(M){let v={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(v.boundary=4,v.storage=4):M.isVector2?(v.boundary=8,v.storage=8):M.isVector3||M.isColor?(v.boundary=16,v.storage=12):M.isVector4?(v.boundary=16,v.storage=16):M.isMatrix3?(v.boundary=48,v.storage=48):M.isMatrix4?(v.boundary=64,v.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),v}function m(M){let v=M.target;v.removeEventListener("dispose",m);let x=o.indexOf(v.__bindingPointIndex);o.splice(x,1),n.deleteBuffer(s[v.id]),delete s[v.id],delete r[v.id]}function p(){for(let M in s)n.deleteBuffer(s[M]);o=[],s={},r={}}return{bind:l,update:c,dispose:p}}var Ol=class{constructor(t={}){let{canvas:e=ld(),context:i=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1}=t;this.isWebGLRenderer=!0;let f;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=i.getContextAttributes().alpha}else f=o;let g=new Uint32Array(4),_=new Int32Array(4),m=null,p=null,M=[],v=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Pi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let x=this,A=!1;this._outputColorSpace=Ce;let E=0,R=0,D=null,T=-1,b=null,I=new ge,O=new ge,H=null,Y=new St(0),Z=0,G=e.width,it=e.height,W=1,mt=null,bt=null,Ct=new ge(0,0,G,it),Yt=new ge(0,0,G,it),oe=!1,pe=new rr,zt=!1,K=!1,nt=new ne,wt=new P,_t=new ge,Mt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},jt=!1;function te(){return D===null?W:1}let C=i;function tt(S,U){return e.getContext(S,U)}try{let S={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"180"}`),e.addEventListener("webglcontextlost",pt,!1),e.addEventListener("webglcontextrestored",At,!1),e.addEventListener("webglcontextcreationerror",ct,!1),C===null){let U="webgl2";if(C=tt(U,S),C===null)throw tt(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(S){throw console.error("THREE.WebGLRenderer: "+S.message),S}let j,X,$,ft,ot,gt,Ot,Vt,w,y,N,k,et,q,Et,at,Dt,Rt,lt,xt,Bt,Ft,yt,Wt;function L(){j=new Xg(C),j.init(),Ft=new S1(C,j),X=new Bg(C,j,t,Ft),$=new v1(C,j),X.reversedDepthBuffer&&u&&$.buffers.depth.setReversed(!0),ft=new Zg(C),ot=new a1,gt=new M1(C,j,$,ot,X,Ft,ft),Ot=new kg(x),Vt=new Wg(x),w=new tm(C),yt=new Fg(C,w),y=new qg(C,w,ft,yt),N=new Kg(C,y,w,ft),lt=new Jg(C,X,gt),at=new zg(ot),k=new o1(x,Ot,Vt,j,X,yt,at),et=new E1(x,ot),q=new c1,Et=new m1(j),Rt=new Ng(x,Ot,Vt,$,N,f,l),Dt=new x1(x,N,X),Wt=new A1(C,ft,X,$),xt=new Og(C,j,ft),Bt=new Yg(C,j,ft),ft.programs=k.programs,x.capabilities=X,x.extensions=j,x.properties=ot,x.renderLists=q,x.shadowMap=Dt,x.state=$,x.info=ft}L();let st=new vh(x,C);this.xr=st,this.getContext=function(){return C},this.getContextAttributes=function(){return C.getContextAttributes()},this.forceContextLoss=function(){let S=j.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){let S=j.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return W},this.setPixelRatio=function(S){S!==void 0&&(W=S,this.setSize(G,it,!1))},this.getSize=function(S){return S.set(G,it)},this.setSize=function(S,U,z=!0){if(st.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}G=S,it=U,e.width=Math.floor(S*W),e.height=Math.floor(U*W),z===!0&&(e.style.width=S+"px",e.style.height=U+"px"),this.setViewport(0,0,S,U)},this.getDrawingBufferSize=function(S){return S.set(G*W,it*W).floor()},this.setDrawingBufferSize=function(S,U,z){G=S,it=U,W=z,e.width=Math.floor(S*z),e.height=Math.floor(U*z),this.setViewport(0,0,S,U)},this.getCurrentViewport=function(S){return S.copy(I)},this.getViewport=function(S){return S.copy(Ct)},this.setViewport=function(S,U,z,V){S.isVector4?Ct.set(S.x,S.y,S.z,S.w):Ct.set(S,U,z,V),$.viewport(I.copy(Ct).multiplyScalar(W).round())},this.getScissor=function(S){return S.copy(Yt)},this.setScissor=function(S,U,z,V){S.isVector4?Yt.set(S.x,S.y,S.z,S.w):Yt.set(S,U,z,V),$.scissor(O.copy(Yt).multiplyScalar(W).round())},this.getScissorTest=function(){return oe},this.setScissorTest=function(S){$.setScissorTest(oe=S)},this.setOpaqueSort=function(S){mt=S},this.setTransparentSort=function(S){bt=S},this.getClearColor=function(S){return S.copy(Rt.getClearColor())},this.setClearColor=function(){Rt.setClearColor(...arguments)},this.getClearAlpha=function(){return Rt.getClearAlpha()},this.setClearAlpha=function(){Rt.setClearAlpha(...arguments)},this.clear=function(S=!0,U=!0,z=!0){let V=0;if(S){let F=!1;if(D!==null){let dt=D.texture.format;F=dt===sl||dt===il||dt===nl}if(F){let dt=D.texture.type,Tt=dt===ri||dt===Ji||dt===pr||dt===gr||dt===tl||dt===el,Nt=Rt.getClearColor(),It=Rt.getClearAlpha(),Gt=Nt.r,Xt=Nt.g,kt=Nt.b;Tt?(g[0]=Gt,g[1]=Xt,g[2]=kt,g[3]=It,C.clearBufferuiv(C.COLOR,0,g)):(_[0]=Gt,_[1]=Xt,_[2]=kt,_[3]=It,C.clearBufferiv(C.COLOR,0,_))}else V|=C.COLOR_BUFFER_BIT}U&&(V|=C.DEPTH_BUFFER_BIT),z&&(V|=C.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),C.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",pt,!1),e.removeEventListener("webglcontextrestored",At,!1),e.removeEventListener("webglcontextcreationerror",ct,!1),Rt.dispose(),q.dispose(),Et.dispose(),ot.dispose(),Ot.dispose(),Vt.dispose(),N.dispose(),yt.dispose(),Wt.dispose(),k.dispose(),st.dispose(),st.removeEventListener("sessionstart",an),st.removeEventListener("sessionend",wr),ui.stop()};function pt(S){S.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),A=!0}function At(){console.log("THREE.WebGLRenderer: Context Restored."),A=!1;let S=ft.autoReset,U=Dt.enabled,z=Dt.autoUpdate,V=Dt.needsUpdate,F=Dt.type;L(),ft.autoReset=S,Dt.enabled=U,Dt.autoUpdate=z,Dt.needsUpdate=V,Dt.type=F}function ct(S){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function Q(S){let U=S.target;U.removeEventListener("dispose",Q),Lt(U)}function Lt(S){Zt(S),ot.remove(S)}function Zt(S){let U=ot.get(S).programs;U!==void 0&&(U.forEach(function(z){k.releaseProgram(z)}),S.isShaderMaterial&&k.releaseShaderCache(S))}this.renderBufferDirect=function(S,U,z,V,F,dt){U===null&&(U=Mt);let Tt=F.isMesh&&F.matrixWorld.determinant()<0,Nt=Le(S,U,z,V,F);$.setMaterial(V,Tt);let It=z.index,Gt=1;if(V.wireframe===!0){if(It=y.getWireframeAttribute(z),It===void 0)return;Gt=2}let Xt=z.drawRange,kt=z.attributes.position,ae=Xt.start*Gt,ye=(Xt.start+Xt.count)*Gt;dt!==null&&(ae=Math.max(ae,dt.start*Gt),ye=Math.min(ye,(dt.start+dt.count)*Gt)),It!==null?(ae=Math.max(ae,0),ye=Math.min(ye,It.count)):kt!=null&&(ae=Math.max(ae,0),ye=Math.min(ye,kt.count));let ze=ye-ae;if(ze<0||ze===1/0)return;yt.setup(F,V,Nt,z,It);let Ee,Se=xt;if(It!==null&&(Ee=w.get(It),Se=Bt,Se.setIndex(Ee)),F.isMesh)V.wireframe===!0?($.setLineWidth(V.wireframeLinewidth*te()),Se.setMode(C.LINES)):Se.setMode(C.TRIANGLES);else if(F.isLine){let Ht=V.linewidth;Ht===void 0&&(Ht=1),$.setLineWidth(Ht*te()),F.isLineSegments?Se.setMode(C.LINES):F.isLineLoop?Se.setMode(C.LINE_LOOP):Se.setMode(C.LINE_STRIP)}else F.isPoints?Se.setMode(C.POINTS):F.isSprite&&Se.setMode(C.TRIANGLES);if(F.isBatchedMesh)if(F._multiDrawInstances!==null)er("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),Se.renderMultiDrawInstances(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount,F._multiDrawInstances);else if(j.get("WEBGL_multi_draw"))Se.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else{let Ht=F._multiDrawStarts,Ue=F._multiDrawCounts,ue=F._multiDrawCount,In=It?w.get(It).bytesPerElement:1,Bs=ot.get(V).currentProgram.getUniforms();for(let Dn=0;Dn<ue;Dn++)Bs.setValue(C,"_gl_DrawID",Dn),Se.render(Ht[Dn]/In,Ue[Dn])}else if(F.isInstancedMesh)Se.renderInstances(ae,ze,F.count);else if(z.isInstancedBufferGeometry){let Ht=z._maxInstanceCount!==void 0?z._maxInstanceCount:1/0,Ue=Math.min(z.instanceCount,Ht);Se.renderInstances(ae,ze,Ue)}else Se.render(ae,ze)};function xe(S,U,z){S.transparent===!0&&S.side===rn&&S.forceSinglePass===!1?(S.side=sn,S.needsUpdate=!0,me(S,U,z),S.side=Ci,S.needsUpdate=!0,me(S,U,z),S.side=rn):me(S,U,z)}this.compile=function(S,U,z=null){z===null&&(z=S),p=Et.get(z),p.init(U),v.push(p),z.traverseVisible(function(F){F.isLight&&F.layers.test(U.layers)&&(p.pushLight(F),F.castShadow&&p.pushShadow(F))}),S!==z&&S.traverseVisible(function(F){F.isLight&&F.layers.test(U.layers)&&(p.pushLight(F),F.castShadow&&p.pushShadow(F))}),p.setupLights();let V=new Set;return S.traverse(function(F){if(!(F.isMesh||F.isPoints||F.isLine||F.isSprite))return;let dt=F.material;if(dt)if(Array.isArray(dt))for(let Tt=0;Tt<dt.length;Tt++){let Nt=dt[Tt];xe(Nt,z,F),V.add(Nt)}else xe(dt,z,F),V.add(dt)}),p=v.pop(),V},this.compileAsync=function(S,U,z=null){let V=this.compile(S,U,z);return new Promise(F=>{function dt(){if(V.forEach(function(Tt){ot.get(Tt).currentProgram.isReady()&&V.delete(Tt)}),V.size===0){F(S);return}setTimeout(dt,10)}j.get("KHR_parallel_shader_compile")!==null?dt():setTimeout(dt,10)})};let le=null;function Hn(S){le&&le(S)}function an(){ui.stop()}function wr(){ui.start()}let ui=new kd;ui.setAnimationLoop(Hn),typeof self<"u"&&ui.setContext(self),this.setAnimationLoop=function(S){le=S,st.setAnimationLoop(S),S===null?ui.stop():ui.start()},st.addEventListener("sessionstart",an),st.addEventListener("sessionend",wr),this.render=function(S,U){if(U!==void 0&&U.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(A===!0)return;if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),st.enabled===!0&&st.isPresenting===!0&&(st.cameraAutoUpdate===!0&&st.updateCamera(U),U=st.getCamera()),S.isScene===!0&&S.onBeforeRender(x,S,U,D),p=Et.get(S,v.length),p.init(U),v.push(p),nt.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),pe.setFromProjectionMatrix(nt,ii,U.reversedDepth),K=this.localClippingEnabled,zt=at.init(this.clippingPlanes,K),m=q.get(S,M.length),m.init(),M.push(m),st.enabled===!0&&st.isPresenting===!0){let dt=x.xr.getDepthSensingMesh();dt!==null&&B(dt,U,-1/0,x.sortObjects)}B(S,U,0,x.sortObjects),m.finish(),x.sortObjects===!0&&m.sort(mt,bt),jt=st.enabled===!1||st.isPresenting===!1||st.hasDepthSensing()===!1,jt&&Rt.addToRenderList(m,S),this.info.render.frame++,zt===!0&&at.beginShadows();let z=p.state.shadowsArray;Dt.render(z,S,U),zt===!0&&at.endShadows(),this.info.autoReset===!0&&this.info.reset();let V=m.opaque,F=m.transmissive;if(p.setupLights(),U.isArrayCamera){let dt=U.cameras;if(F.length>0)for(let Tt=0,Nt=dt.length;Tt<Nt;Tt++){let It=dt[Tt];Jt(V,F,S,It)}jt&&Rt.render(S);for(let Tt=0,Nt=dt.length;Tt<Nt;Tt++){let It=dt[Tt];ut(m,S,It,It.viewport)}}else F.length>0&&Jt(V,F,S,U),jt&&Rt.render(S),ut(m,S,U);D!==null&&R===0&&(gt.updateMultisampleRenderTarget(D),gt.updateRenderTargetMipmap(D)),S.isScene===!0&&S.onAfterRender(x,S,U),yt.resetDefaultState(),T=-1,b=null,v.pop(),v.length>0?(p=v[v.length-1],zt===!0&&at.setGlobalState(x.clippingPlanes,p.state.camera)):p=null,M.pop(),M.length>0?m=M[M.length-1]:m=null};function B(S,U,z,V){if(S.visible===!1)return;if(S.layers.test(U.layers)){if(S.isGroup)z=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(U);else if(S.isLight)p.pushLight(S),S.castShadow&&p.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||pe.intersectsSprite(S)){V&&_t.setFromMatrixPosition(S.matrixWorld).applyMatrix4(nt);let Tt=N.update(S),Nt=S.material;Nt.visible&&m.push(S,Tt,Nt,z,_t.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||pe.intersectsObject(S))){let Tt=N.update(S),Nt=S.material;if(V&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),_t.copy(S.boundingSphere.center)):(Tt.boundingSphere===null&&Tt.computeBoundingSphere(),_t.copy(Tt.boundingSphere.center)),_t.applyMatrix4(S.matrixWorld).applyMatrix4(nt)),Array.isArray(Nt)){let It=Tt.groups;for(let Gt=0,Xt=It.length;Gt<Xt;Gt++){let kt=It[Gt],ae=Nt[kt.materialIndex];ae&&ae.visible&&m.push(S,Tt,ae,z,_t.z,kt)}}else Nt.visible&&m.push(S,Tt,Nt,z,_t.z,null)}}let dt=S.children;for(let Tt=0,Nt=dt.length;Tt<Nt;Tt++)B(dt[Tt],U,z,V)}function ut(S,U,z,V){let F=S.opaque,dt=S.transmissive,Tt=S.transparent;p.setupLightsView(z),zt===!0&&at.setGlobalState(x.clippingPlanes,z),V&&$.viewport(I.copy(V)),F.length>0&&ee(F,U,z),dt.length>0&&ee(dt,U,z),Tt.length>0&&ee(Tt,U,z),$.buffers.depth.setTest(!0),$.buffers.depth.setMask(!0),$.buffers.color.setMask(!0),$.setPolygonOffset(!1)}function Jt(S,U,z,V){if((z.isScene===!0?z.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[V.id]===void 0&&(p.state.transmissionRenderTarget[V.id]=new Zn(1,1,{generateMipmaps:!0,type:j.has("EXT_color_buffer_half_float")||j.has("EXT_color_buffer_float")?mr:ri,minFilter:Zi,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:he.workingColorSpace}));let dt=p.state.transmissionRenderTarget[V.id],Tt=V.viewport||I;dt.setSize(Tt.z*x.transmissionResolutionScale,Tt.w*x.transmissionResolutionScale);let Nt=x.getRenderTarget(),It=x.getActiveCubeFace(),Gt=x.getActiveMipmapLevel();x.setRenderTarget(dt),x.getClearColor(Y),Z=x.getClearAlpha(),Z<1&&x.setClearColor(16777215,.5),x.clear(),jt&&Rt.render(z);let Xt=x.toneMapping;x.toneMapping=Pi;let kt=V.viewport;if(V.viewport!==void 0&&(V.viewport=void 0),p.setupLightsView(V),zt===!0&&at.setGlobalState(x.clippingPlanes,V),ee(S,z,V),gt.updateMultisampleRenderTarget(dt),gt.updateRenderTargetMipmap(dt),j.has("WEBGL_multisampled_render_to_texture")===!1){let ae=!1;for(let ye=0,ze=U.length;ye<ze;ye++){let Ee=U[ye],Se=Ee.object,Ht=Ee.geometry,Ue=Ee.material,ue=Ee.group;if(Ue.side===rn&&Se.layers.test(V.layers)){let In=Ue.side;Ue.side=sn,Ue.needsUpdate=!0,re(Se,z,V,Ht,Ue,ue),Ue.side=In,Ue.needsUpdate=!0,ae=!0}}ae===!0&&(gt.updateMultisampleRenderTarget(dt),gt.updateRenderTargetMipmap(dt))}x.setRenderTarget(Nt,It,Gt),x.setClearColor(Y,Z),kt!==void 0&&(V.viewport=kt),x.toneMapping=Xt}function ee(S,U,z){let V=U.isScene===!0?U.overrideMaterial:null;for(let F=0,dt=S.length;F<dt;F++){let Tt=S[F],Nt=Tt.object,It=Tt.geometry,Gt=Tt.group,Xt=Tt.material;Xt.allowOverride===!0&&V!==null&&(Xt=V),Nt.layers.test(z.layers)&&re(Nt,U,z,It,Xt,Gt)}}function re(S,U,z,V,F,dt){S.onBeforeRender(x,U,z,V,F,dt),S.modelViewMatrix.multiplyMatrices(z.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),F.onBeforeRender(x,U,z,V,S,dt),F.transparent===!0&&F.side===rn&&F.forceSinglePass===!1?(F.side=sn,F.needsUpdate=!0,x.renderBufferDirect(z,U,V,F,S,dt),F.side=Ci,F.needsUpdate=!0,x.renderBufferDirect(z,U,V,F,S,dt),F.side=rn):x.renderBufferDirect(z,U,V,F,S,dt),S.onAfterRender(x,U,z,V,F,dt)}function me(S,U,z){U.isScene!==!0&&(U=Mt);let V=ot.get(S),F=p.state.lights,dt=p.state.shadowsArray,Tt=F.state.version,Nt=k.getParameters(S,F.state,dt,U,z),It=k.getProgramCacheKey(Nt),Gt=V.programs;V.environment=S.isMeshStandardMaterial?U.environment:null,V.fog=U.fog,V.envMap=(S.isMeshStandardMaterial?Vt:Ot).get(S.envMap||V.environment),V.envMapRotation=V.environment!==null&&S.envMap===null?U.environmentRotation:S.envMapRotation,Gt===void 0&&(S.addEventListener("dispose",Q),Gt=new Map,V.programs=Gt);let Xt=Gt.get(It);if(Xt!==void 0){if(V.currentProgram===Xt&&V.lightsStateVersion===Tt)return Gn(S,Nt),Xt}else Nt.uniforms=k.getUniforms(S),S.onBeforeCompile(Nt,x),Xt=k.acquireProgram(Nt,It),Gt.set(It,Xt),V.uniforms=Nt.uniforms;let kt=V.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(kt.clippingPlanes=at.uniform),Gn(S,Nt),V.needsLights=Os(S),V.lightsStateVersion=Tt,V.needsLights&&(kt.ambientLightColor.value=F.state.ambient,kt.lightProbe.value=F.state.probe,kt.directionalLights.value=F.state.directional,kt.directionalLightShadows.value=F.state.directionalShadow,kt.spotLights.value=F.state.spot,kt.spotLightShadows.value=F.state.spotShadow,kt.rectAreaLights.value=F.state.rectArea,kt.ltc_1.value=F.state.rectAreaLTC1,kt.ltc_2.value=F.state.rectAreaLTC2,kt.pointLights.value=F.state.point,kt.pointLightShadows.value=F.state.pointShadow,kt.hemisphereLights.value=F.state.hemi,kt.directionalShadowMap.value=F.state.directionalShadowMap,kt.directionalShadowMatrix.value=F.state.directionalShadowMatrix,kt.spotShadowMap.value=F.state.spotShadowMap,kt.spotLightMatrix.value=F.state.spotLightMatrix,kt.spotLightMap.value=F.state.spotLightMap,kt.pointShadowMap.value=F.state.pointShadowMap,kt.pointShadowMatrix.value=F.state.pointShadowMatrix),V.currentProgram=Xt,V.uniformsList=null,Xt}function tn(S){if(S.uniformsList===null){let U=S.currentProgram.getUniforms();S.uniformsList=Mr.seqWithValue(U.seq,S.uniforms)}return S.uniformsList}function Gn(S,U){let z=ot.get(S);z.outputColorSpace=U.outputColorSpace,z.batching=U.batching,z.batchingColor=U.batchingColor,z.instancing=U.instancing,z.instancingColor=U.instancingColor,z.instancingMorph=U.instancingMorph,z.skinning=U.skinning,z.morphTargets=U.morphTargets,z.morphNormals=U.morphNormals,z.morphColors=U.morphColors,z.morphTargetsCount=U.morphTargetsCount,z.numClippingPlanes=U.numClippingPlanes,z.numIntersection=U.numClipIntersection,z.vertexAlphas=U.vertexAlphas,z.vertexTangents=U.vertexTangents,z.toneMapping=U.toneMapping}function Le(S,U,z,V,F){U.isScene!==!0&&(U=Mt),gt.resetTextureUnits();let dt=U.fog,Tt=V.isMeshStandardMaterial?U.environment:null,Nt=D===null?x.outputColorSpace:D.isXRRenderTarget===!0?D.texture.colorSpace:fs,It=(V.isMeshStandardMaterial?Vt:Ot).get(V.envMap||Tt),Gt=V.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,Xt=!!z.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),kt=!!z.morphAttributes.position,ae=!!z.morphAttributes.normal,ye=!!z.morphAttributes.color,ze=Pi;V.toneMapped&&(D===null||D.isXRRenderTarget===!0)&&(ze=x.toneMapping);let Ee=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,Se=Ee!==void 0?Ee.length:0,Ht=ot.get(V),Ue=p.state.lights;if(zt===!0&&(K===!0||S!==b)){let fn=S===b&&V.id===T;at.setState(V,S,fn)}let ue=!1;V.version===Ht.__version?(Ht.needsLights&&Ht.lightsStateVersion!==Ue.state.version||Ht.outputColorSpace!==Nt||F.isBatchedMesh&&Ht.batching===!1||!F.isBatchedMesh&&Ht.batching===!0||F.isBatchedMesh&&Ht.batchingColor===!0&&F.colorTexture===null||F.isBatchedMesh&&Ht.batchingColor===!1&&F.colorTexture!==null||F.isInstancedMesh&&Ht.instancing===!1||!F.isInstancedMesh&&Ht.instancing===!0||F.isSkinnedMesh&&Ht.skinning===!1||!F.isSkinnedMesh&&Ht.skinning===!0||F.isInstancedMesh&&Ht.instancingColor===!0&&F.instanceColor===null||F.isInstancedMesh&&Ht.instancingColor===!1&&F.instanceColor!==null||F.isInstancedMesh&&Ht.instancingMorph===!0&&F.morphTexture===null||F.isInstancedMesh&&Ht.instancingMorph===!1&&F.morphTexture!==null||Ht.envMap!==It||V.fog===!0&&Ht.fog!==dt||Ht.numClippingPlanes!==void 0&&(Ht.numClippingPlanes!==at.numPlanes||Ht.numIntersection!==at.numIntersection)||Ht.vertexAlphas!==Gt||Ht.vertexTangents!==Xt||Ht.morphTargets!==kt||Ht.morphNormals!==ae||Ht.morphColors!==ye||Ht.toneMapping!==ze||Ht.morphTargetsCount!==Se)&&(ue=!0):(ue=!0,Ht.__version=V.version);let In=Ht.currentProgram;ue===!0&&(In=me(V,U,F));let Bs=!1,Dn=!1,Cr=!1,Ne=In.getUniforms(),Wn=Ht.uniforms;if($.useProgram(In.program)&&(Bs=!0,Dn=!0,Cr=!0),V.id!==T&&(T=V.id,Dn=!0),Bs||b!==S){$.buffers.depth.getReversed()&&S.reversedDepth!==!0&&(S._reversedDepth=!0,S.updateProjectionMatrix()),Ne.setValue(C,"projectionMatrix",S.projectionMatrix),Ne.setValue(C,"viewMatrix",S.matrixWorldInverse);let bn=Ne.map.cameraPosition;bn!==void 0&&bn.setValue(C,wt.setFromMatrixPosition(S.matrixWorld)),X.logarithmicDepthBuffer&&Ne.setValue(C,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&Ne.setValue(C,"isOrthographic",S.isOrthographicCamera===!0),b!==S&&(b=S,Dn=!0,Cr=!0)}if(F.isSkinnedMesh){Ne.setOptional(C,F,"bindMatrix"),Ne.setOptional(C,F,"bindMatrixInverse");let fn=F.skeleton;fn&&(fn.boneTexture===null&&fn.computeBoneTexture(),Ne.setValue(C,"boneTexture",fn.boneTexture,gt))}F.isBatchedMesh&&(Ne.setOptional(C,F,"batchingTexture"),Ne.setValue(C,"batchingTexture",F._matricesTexture,gt),Ne.setOptional(C,F,"batchingIdTexture"),Ne.setValue(C,"batchingIdTexture",F._indirectTexture,gt),Ne.setOptional(C,F,"batchingColorTexture"),F._colorsTexture!==null&&Ne.setValue(C,"batchingColorTexture",F._colorsTexture,gt));let Xn=z.morphAttributes;if((Xn.position!==void 0||Xn.normal!==void 0||Xn.color!==void 0)&&lt.update(F,z,In),(Dn||Ht.receiveShadow!==F.receiveShadow)&&(Ht.receiveShadow=F.receiveShadow,Ne.setValue(C,"receiveShadow",F.receiveShadow)),V.isMeshGouraudMaterial&&V.envMap!==null&&(Wn.envMap.value=It,Wn.flipEnvMap.value=It.isCubeTexture&&It.isRenderTargetTexture===!1?-1:1),V.isMeshStandardMaterial&&V.envMap===null&&U.environment!==null&&(Wn.envMapIntensity.value=U.environmentIntensity),Dn&&(Ne.setValue(C,"toneMappingExposure",x.toneMappingExposure),Ht.needsLights&&is(Wn,Cr),dt&&V.fog===!0&&et.refreshFogUniforms(Wn,dt),et.refreshMaterialUniforms(Wn,V,W,it,p.state.transmissionRenderTarget[S.id]),Mr.upload(C,tn(Ht),Wn,gt)),V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(Mr.upload(C,tn(Ht),Wn,gt),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&Ne.setValue(C,"center",F.center),Ne.setValue(C,"modelViewMatrix",F.modelViewMatrix),Ne.setValue(C,"normalMatrix",F.normalMatrix),Ne.setValue(C,"modelMatrix",F.matrixWorld),V.isShaderMaterial||V.isRawShaderMaterial){let fn=V.uniformsGroups;for(let bn=0,Kl=fn.length;bn<Kl;bn++){let ss=fn[bn];Wt.update(ss,In),Wt.bind(ss,In)}}return In}function is(S,U){S.ambientLightColor.needsUpdate=U,S.lightProbe.needsUpdate=U,S.directionalLights.needsUpdate=U,S.directionalLightShadows.needsUpdate=U,S.pointLights.needsUpdate=U,S.pointLightShadows.needsUpdate=U,S.spotLights.needsUpdate=U,S.spotLightShadows.needsUpdate=U,S.rectAreaLights.needsUpdate=U,S.hemisphereLights.needsUpdate=U}function Os(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return E},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return D},this.setRenderTargetTextures=function(S,U,z){let V=ot.get(S);V.__autoAllocateDepthBuffer=S.resolveDepthBuffer===!1,V.__autoAllocateDepthBuffer===!1&&(V.__useRenderToTexture=!1),ot.get(S.texture).__webglTexture=U,ot.get(S.depthTexture).__webglTexture=V.__autoAllocateDepthBuffer?void 0:z,V.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(S,U){let z=ot.get(S);z.__webglFramebuffer=U,z.__useDefaultFramebuffer=U===void 0};let Er=C.createFramebuffer();this.setRenderTarget=function(S,U=0,z=0){D=S,E=U,R=z;let V=!0,F=null,dt=!1,Tt=!1;if(S){let It=ot.get(S);if(It.__useDefaultFramebuffer!==void 0)$.bindFramebuffer(C.FRAMEBUFFER,null),V=!1;else if(It.__webglFramebuffer===void 0)gt.setupRenderTarget(S);else if(It.__hasExternalTextures)gt.rebindTextures(S,ot.get(S.texture).__webglTexture,ot.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){let kt=S.depthTexture;if(It.__boundDepthTexture!==kt){if(kt!==null&&ot.has(kt)&&(S.width!==kt.image.width||S.height!==kt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");gt.setupDepthRenderbuffer(S)}}let Gt=S.texture;(Gt.isData3DTexture||Gt.isDataArrayTexture||Gt.isCompressedArrayTexture)&&(Tt=!0);let Xt=ot.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Xt[U])?F=Xt[U][z]:F=Xt[U],dt=!0):S.samples>0&&gt.useMultisampledRTT(S)===!1?F=ot.get(S).__webglMultisampledFramebuffer:Array.isArray(Xt)?F=Xt[z]:F=Xt,I.copy(S.viewport),O.copy(S.scissor),H=S.scissorTest}else I.copy(Ct).multiplyScalar(W).floor(),O.copy(Yt).multiplyScalar(W).floor(),H=oe;if(z!==0&&(F=Er),$.bindFramebuffer(C.FRAMEBUFFER,F)&&V&&$.drawBuffers(S,F),$.viewport(I),$.scissor(O),$.setScissorTest(H),dt){let It=ot.get(S.texture);C.framebufferTexture2D(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_CUBE_MAP_POSITIVE_X+U,It.__webglTexture,z)}else if(Tt){let It=U;for(let Gt=0;Gt<S.textures.length;Gt++){let Xt=ot.get(S.textures[Gt]);C.framebufferTextureLayer(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0+Gt,Xt.__webglTexture,z,It)}}else if(S!==null&&z!==0){let It=ot.get(S.texture);C.framebufferTexture2D(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,It.__webglTexture,z)}T=-1},this.readRenderTargetPixels=function(S,U,z,V,F,dt,Tt,Nt=0){if(!(S&&S.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let It=ot.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&Tt!==void 0&&(It=It[Tt]),It){$.bindFramebuffer(C.FRAMEBUFFER,It);try{let Gt=S.textures[Nt],Xt=Gt.format,kt=Gt.type;if(!X.textureFormatReadable(Xt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!X.textureTypeReadable(kt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=S.width-V&&z>=0&&z<=S.height-F&&(S.textures.length>1&&C.readBuffer(C.COLOR_ATTACHMENT0+Nt),C.readPixels(U,z,V,F,Ft.convert(Xt),Ft.convert(kt),dt))}finally{let Gt=D!==null?ot.get(D).__webglFramebuffer:null;$.bindFramebuffer(C.FRAMEBUFFER,Gt)}}},this.readRenderTargetPixelsAsync=async function(S,U,z,V,F,dt,Tt,Nt=0){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let It=ot.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&Tt!==void 0&&(It=It[Tt]),It)if(U>=0&&U<=S.width-V&&z>=0&&z<=S.height-F){$.bindFramebuffer(C.FRAMEBUFFER,It);let Gt=S.textures[Nt],Xt=Gt.format,kt=Gt.type;if(!X.textureFormatReadable(Xt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!X.textureTypeReadable(kt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let ae=C.createBuffer();C.bindBuffer(C.PIXEL_PACK_BUFFER,ae),C.bufferData(C.PIXEL_PACK_BUFFER,dt.byteLength,C.STREAM_READ),S.textures.length>1&&C.readBuffer(C.COLOR_ATTACHMENT0+Nt),C.readPixels(U,z,V,F,Ft.convert(Xt),Ft.convert(kt),0);let ye=D!==null?ot.get(D).__webglFramebuffer:null;$.bindFramebuffer(C.FRAMEBUFFER,ye);let ze=C.fenceSync(C.SYNC_GPU_COMMANDS_COMPLETE,0);return C.flush(),await cd(C,ze,4),C.bindBuffer(C.PIXEL_PACK_BUFFER,ae),C.getBufferSubData(C.PIXEL_PACK_BUFFER,0,dt),C.deleteBuffer(ae),C.deleteSync(ze),dt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(S,U=null,z=0){let V=Math.pow(2,-z),F=Math.floor(S.image.width*V),dt=Math.floor(S.image.height*V),Tt=U!==null?U.x:0,Nt=U!==null?U.y:0;gt.setTexture2D(S,0),C.copyTexSubImage2D(C.TEXTURE_2D,z,0,0,Tt,Nt,F,dt),$.unbindTexture()};let Ar=C.createFramebuffer(),Sn=C.createFramebuffer();this.copyTextureToTexture=function(S,U,z=null,V=null,F=0,dt=null){dt===null&&(F!==0?(er("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),dt=F,F=0):dt=0);let Tt,Nt,It,Gt,Xt,kt,ae,ye,ze,Ee=S.isCompressedTexture?S.mipmaps[dt]:S.image;if(z!==null)Tt=z.max.x-z.min.x,Nt=z.max.y-z.min.y,It=z.isBox3?z.max.z-z.min.z:1,Gt=z.min.x,Xt=z.min.y,kt=z.isBox3?z.min.z:0;else{let Xn=Math.pow(2,-F);Tt=Math.floor(Ee.width*Xn),Nt=Math.floor(Ee.height*Xn),S.isDataArrayTexture?It=Ee.depth:S.isData3DTexture?It=Math.floor(Ee.depth*Xn):It=1,Gt=0,Xt=0,kt=0}V!==null?(ae=V.x,ye=V.y,ze=V.z):(ae=0,ye=0,ze=0);let Se=Ft.convert(U.format),Ht=Ft.convert(U.type),Ue;U.isData3DTexture?(gt.setTexture3D(U,0),Ue=C.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(gt.setTexture2DArray(U,0),Ue=C.TEXTURE_2D_ARRAY):(gt.setTexture2D(U,0),Ue=C.TEXTURE_2D),C.pixelStorei(C.UNPACK_FLIP_Y_WEBGL,U.flipY),C.pixelStorei(C.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),C.pixelStorei(C.UNPACK_ALIGNMENT,U.unpackAlignment);let ue=C.getParameter(C.UNPACK_ROW_LENGTH),In=C.getParameter(C.UNPACK_IMAGE_HEIGHT),Bs=C.getParameter(C.UNPACK_SKIP_PIXELS),Dn=C.getParameter(C.UNPACK_SKIP_ROWS),Cr=C.getParameter(C.UNPACK_SKIP_IMAGES);C.pixelStorei(C.UNPACK_ROW_LENGTH,Ee.width),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,Ee.height),C.pixelStorei(C.UNPACK_SKIP_PIXELS,Gt),C.pixelStorei(C.UNPACK_SKIP_ROWS,Xt),C.pixelStorei(C.UNPACK_SKIP_IMAGES,kt);let Ne=S.isDataArrayTexture||S.isData3DTexture,Wn=U.isDataArrayTexture||U.isData3DTexture;if(S.isDepthTexture){let Xn=ot.get(S),fn=ot.get(U),bn=ot.get(Xn.__renderTarget),Kl=ot.get(fn.__renderTarget);$.bindFramebuffer(C.READ_FRAMEBUFFER,bn.__webglFramebuffer),$.bindFramebuffer(C.DRAW_FRAMEBUFFER,Kl.__webglFramebuffer);for(let ss=0;ss<It;ss++)Ne&&(C.framebufferTextureLayer(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,ot.get(S).__webglTexture,F,kt+ss),C.framebufferTextureLayer(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,ot.get(U).__webglTexture,dt,ze+ss)),C.blitFramebuffer(Gt,Xt,Tt,Nt,ae,ye,Tt,Nt,C.DEPTH_BUFFER_BIT,C.NEAREST);$.bindFramebuffer(C.READ_FRAMEBUFFER,null),$.bindFramebuffer(C.DRAW_FRAMEBUFFER,null)}else if(F!==0||S.isRenderTargetTexture||ot.has(S)){let Xn=ot.get(S),fn=ot.get(U);$.bindFramebuffer(C.READ_FRAMEBUFFER,Ar),$.bindFramebuffer(C.DRAW_FRAMEBUFFER,Sn);for(let bn=0;bn<It;bn++)Ne?C.framebufferTextureLayer(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,Xn.__webglTexture,F,kt+bn):C.framebufferTexture2D(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,Xn.__webglTexture,F),Wn?C.framebufferTextureLayer(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,fn.__webglTexture,dt,ze+bn):C.framebufferTexture2D(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,fn.__webglTexture,dt),F!==0?C.blitFramebuffer(Gt,Xt,Tt,Nt,ae,ye,Tt,Nt,C.COLOR_BUFFER_BIT,C.NEAREST):Wn?C.copyTexSubImage3D(Ue,dt,ae,ye,ze+bn,Gt,Xt,Tt,Nt):C.copyTexSubImage2D(Ue,dt,ae,ye,Gt,Xt,Tt,Nt);$.bindFramebuffer(C.READ_FRAMEBUFFER,null),$.bindFramebuffer(C.DRAW_FRAMEBUFFER,null)}else Wn?S.isDataTexture||S.isData3DTexture?C.texSubImage3D(Ue,dt,ae,ye,ze,Tt,Nt,It,Se,Ht,Ee.data):U.isCompressedArrayTexture?C.compressedTexSubImage3D(Ue,dt,ae,ye,ze,Tt,Nt,It,Se,Ee.data):C.texSubImage3D(Ue,dt,ae,ye,ze,Tt,Nt,It,Se,Ht,Ee):S.isDataTexture?C.texSubImage2D(C.TEXTURE_2D,dt,ae,ye,Tt,Nt,Se,Ht,Ee.data):S.isCompressedTexture?C.compressedTexSubImage2D(C.TEXTURE_2D,dt,ae,ye,Ee.width,Ee.height,Se,Ee.data):C.texSubImage2D(C.TEXTURE_2D,dt,ae,ye,Tt,Nt,Se,Ht,Ee);C.pixelStorei(C.UNPACK_ROW_LENGTH,ue),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,In),C.pixelStorei(C.UNPACK_SKIP_PIXELS,Bs),C.pixelStorei(C.UNPACK_SKIP_ROWS,Dn),C.pixelStorei(C.UNPACK_SKIP_IMAGES,Cr),dt===0&&U.generateMipmaps&&C.generateMipmap(Ue),$.unbindTexture()},this.initRenderTarget=function(S){ot.get(S).__webglFramebuffer===void 0&&gt.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?gt.setTextureCube(S,0):S.isData3DTexture?gt.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?gt.setTexture2DArray(S,0):gt.setTexture2D(S,0),$.unbindTexture()},this.resetState=function(){E=0,R=0,D=null,$.reset(),yt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ii}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=he._getDrawingBufferColorSpace(t),e.unpackColorSpace=he._getUnpackColorSpace()}};var Xd={type:"change"},bh={type:"start"},Yd={type:"end"},zl=new Vi,qd=new Yn,C1=Math.cos(70*xi.DEG2RAD),Ke=new P,An=2*Math.PI,Me={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Sh=1e-6,kl=class extends vo{constructor(t,e=null){super(t,e),this.state=Me.NONE,this.target=new P,this.cursor=new P,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:qi.ROTATE,MIDDLE:qi.DOLLY,RIGHT:qi.PAN},this.touches={ONE:Yi.ROTATE,TWO:Yi.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new P,this._lastQuaternion=new ke,this._lastTargetPosition=new P,this._quat=new ke().setFromUnitVectors(t.up,new P(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new dr,this._sphericalDelta=new dr,this._scale=1,this._panOffset=new P,this._rotateStart=new rt,this._rotateEnd=new rt,this._rotateDelta=new rt,this._panStart=new rt,this._panEnd=new rt,this._panDelta=new rt,this._dollyStart=new rt,this._dollyEnd=new rt,this._dollyDelta=new rt,this._dollyDirection=new P,this._mouse=new rt,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=P1.bind(this),this._onPointerDown=R1.bind(this),this._onPointerUp=I1.bind(this),this._onContextMenu=B1.bind(this),this._onMouseWheel=U1.bind(this),this._onKeyDown=N1.bind(this),this._onTouchStart=F1.bind(this),this._onTouchMove=O1.bind(this),this._onMouseDown=D1.bind(this),this._onMouseMove=L1.bind(this),this._interceptControlDown=z1.bind(this),this._interceptControlUp=k1.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Xd),this.update(),this.state=Me.NONE}update(t=null){let e=this.object.position;Ke.copy(e).sub(this.target),Ke.applyQuaternion(this._quat),this._spherical.setFromVector3(Ke),this.autoRotate&&this.state===Me.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(i)&&isFinite(s)&&(i<-Math.PI?i+=An:i>Math.PI&&(i-=An),s<-Math.PI?s+=An:s>Math.PI&&(s-=An),i<=s?this._spherical.theta=Math.max(i,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+s)/2?Math.max(i,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(Ke.setFromSpherical(this._spherical),Ke.applyQuaternion(this._quatInverse),e.copy(this.target).add(Ke),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){let a=Ke.length();o=this._clampDistance(a*this._scale);let l=a-o;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){let a=new P(this._mouse.x,this._mouse.y,0);a.unproject(this.object);let l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;let c=new P(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(a),this.object.updateMatrixWorld(),o=Ke.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(zl.origin.copy(this.object.position),zl.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(zl.direction))<C1?this.object.lookAt(this.target):(qd.setFromNormalAndCoplanarPoint(this.object.up,this.target),zl.intersectPlane(qd,this.target))))}else if(this.object.isOrthographicCamera){let o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Sh||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Sh||this._lastTargetPosition.distanceToSquared(this.target)>Sh?(this.dispatchEvent(Xd),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?An/60*this.autoRotateSpeed*t:An/60/60*this.autoRotateSpeed}_getZoomScale(t){let e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){Ke.setFromMatrixColumn(e,0),Ke.multiplyScalar(-t),this._panOffset.add(Ke)}_panUp(t,e){this.screenSpacePanning===!0?Ke.setFromMatrixColumn(e,1):(Ke.setFromMatrixColumn(e,0),Ke.crossVectors(this.object.up,Ke)),Ke.multiplyScalar(t),this._panOffset.add(Ke)}_pan(t,e){let i=this.domElement;if(this.object.isPerspectiveCamera){let s=this.object.position;Ke.copy(s).sub(this.target);let r=Ke.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/i.clientHeight,this.object.matrix),this._panUp(2*e*r/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let i=this.domElement.getBoundingClientRect(),s=t-i.left,r=e-i.top,o=i.width,a=i.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(An*this._rotateDelta.x/e.clientHeight),this._rotateUp(An*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(An*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-An*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(An*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-An*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(i,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(i,s)}}_handleTouchStartDolly(t){let e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(i*i+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{let i=this._getSecondPointerPosition(t),s=.5*(t.pageX+i.x),r=.5*(t.pageY+i.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(An*this._rotateDelta.x/e.clientHeight),this._rotateUp(An*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(i,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){let e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(i*i+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let o=(t.pageX+e.x)*.5,a=(t.pageY+e.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new rt,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){let e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){let e=t.deltaMode,i={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}};function R1(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n)))}function P1(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function I1(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Yd),this.state=Me.NONE;break;case 1:let t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function D1(n){let t;switch(n.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case qi.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=Me.DOLLY;break;case qi.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=Me.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=Me.ROTATE}break;case qi.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=Me.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=Me.PAN}break;default:this.state=Me.NONE}this.state!==Me.NONE&&this.dispatchEvent(bh)}function L1(n){switch(this.state){case Me.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case Me.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case Me.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function U1(n){this.enabled===!1||this.enableZoom===!1||this.state!==Me.NONE||(n.preventDefault(),this.dispatchEvent(bh),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(Yd))}function N1(n){this.enabled!==!1&&this._handleKeyDown(n)}function F1(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case Yi.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=Me.TOUCH_ROTATE;break;case Yi.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=Me.TOUCH_PAN;break;default:this.state=Me.NONE}break;case 2:switch(this.touches.TWO){case Yi.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=Me.TOUCH_DOLLY_PAN;break;case Yi.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=Me.TOUCH_DOLLY_ROTATE;break;default:this.state=Me.NONE}break;default:this.state=Me.NONE}this.state!==Me.NONE&&this.dispatchEvent(bh)}function O1(n){switch(this._trackPointer(n),this.state){case Me.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case Me.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case Me.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case Me.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=Me.NONE}}function B1(n){this.enabled!==!1&&n.preventDefault()}function z1(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function k1(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}var Th=6653,ai=()=>(Th=Math.imul(1664525,Th)+1013904223>>>0,Th/4294967296),We=256,wh=new Float32Array(We*We);for(let n=0;n<wh.length;n++)wh[n]=ai();function br(n,t,e,i){let s=n*e/We,r=t*i/We,o=Math.floor(s),a=Math.floor(r),l=s-o,c=r-a;l*=l*(3-2*l),c*=c*(3-2*c);let h=(d,u)=>wh[u%i*73%We*We+(d%e+e)%e*61%We];return(1-c)*((1-l)*h(o,a)+l*h(o+1,a))+c*((1-l)*h(o,a+1)+l*h(o+1,a+1))}function Co(n){let t=document.createElement("canvas");t.width=t.height=We;let e=t.getContext("2d"),i=e.createImageData(We,We);for(let r=0;r<We;r++)for(let o=0;o<We;o++){let a=r/We,l=br(o,r,5,5),c=br(o,r,25,25),h=218+24*l+10*c,d=0;if(n==="plaster"){let g=br(o,r,13,3);h=212+31*l+10*c-17*(1-V1(a/.24))*g}else n==="wood"?h=144+83*(br(o,r,70,4)*.48+br(o+10*Math.sin(a*6.28),r,20,2)*.52)+22*l:n==="clay"?(h=177+53*l+22*c,d=4*(l-.5)):n==="stone"&&(h=182+49*l+16*c);let u=(r*We+o)*4,f=(ai()-.5)*(n==="plaster"?14:22);i.data[u]=h+f,i.data[u+1]=h+f,i.data[u+2]=h+f+d,i.data[u+3]=255}if(e.putImageData(i,0,0),n==="canopy"){e.fillStyle="#a2a792",e.fillRect(0,0,We,We);for(let r=0;r<8200;r++){let o=ai()*We,a=ai()*We,l=48+ai()*36+br(o,a,8,8)*10;e.fillStyle="hsl(65,10%,"+l+"%)",e.beginPath(),e.ellipse(o,a,2+ai()*4,1+ai()*2.6,ai()*3.14,0,Math.PI*2),e.fill()}}if(n==="plaster")for(let r=0;r<2;r++)for(let o=0;o<10;o++)for(let a=0;a<4;a++){if(ai()<a*.21+o*.052)continue;let l=r*(We-1)+(r?-1:1)*(a*12+o%2*6),c=We-7*o-ai()*2;e.fillStyle="rgba(118,111,95,"+(.15+ai()*.19)+")",e.beginPath(),e.moveTo(l,c),e.lineTo(l+10,c-1),e.lineTo(l+9,c-5),e.lineTo(l+2,c-5),e.closePath(),e.fill()}let s=new nn(t);return s.colorSpace=Ce,s.wrapS=s.wrapT=si,s.anisotropy=4,new hn({map:s,roughness:.91,bumpMap:s,bumpScale:.01})}function V1(n){return n=Math.min(1,Math.max(0,n)),n*n*(3-2*n)}var Eh={plaster:Co("plaster"),wood:Co("wood"),clay:Co("clay"),stone:Co("stone"),canopy:Co("canopy")};function Zd(){let n=document.createElement("canvas");n.width=n.height=64;let t=n.getContext("2d"),e=t.createLinearGradient(0,0,14,64);e.addColorStop(0,"#94b6ad"),e.addColorStop(.44,"#b9c7b3"),e.addColorStop(.48,"#829384"),e.addColorStop(1,"#c2ad85"),t.fillStyle=e,t.fillRect(0,0,64,64);for(let s=0;s<3;s++)t.fillStyle="rgba(242,245,211,.16)",t.beginPath(),t.moveTo(43+s*19,0),t.lineTo(48+s*19,0),t.lineTo(6+s*19,64),t.lineTo(s*19,64),t.fill();let i=new nn(n);return i.colorSpace=Ce,new hn({map:i,emissive:16759120,emissiveIntensity:.02,roughness:.38})}function H1(){let n=document.createElement("canvas");n.width=512,n.height=256;let t=n.getContext("2d");t.fillStyle="#a39e93",t.fillRect(0,0,512,256);for(let r=0;r<8;r++)for(let o=-1;o<8;o++){let a=o*68+r%2*34,l=r*32,c=Math.round(216+14*Math.sin(o*31+r*19));t.fillStyle="rgb("+c+","+(c-2)+","+(c-6)+")",t.fillRect(a+1,l+1,66,30),t.fillStyle="#ffffff25",t.fillRect(a+2,l+2,63,2),t.fillStyle="#38362626",t.fillRect(a+2,l+28,63,2)}let e=t.getImageData(0,0,512,256);for(let r=0;r<e.data.length;r+=4){let o=(Math.random()-.5)*14;for(let a=0;a<3;a++)e.data[r+a]+=o}t.putImageData(e,0,0);let i=new nn(n);i.wrapS=i.wrapT=si,i.colorSpace=Ce,i.anisotropy=4;let s=new hn({map:i,roughness:.94});return s.onBeforeCompile=r=>{r.vertexShader=r.vertexShader.replace("#include <uv_vertex>",`#include <uv_vertex>
    vec3 loc=(instanceMatrix*vec4(position,1.)).xyz;
    vec3 side=abs(normalize(mat3(instanceMatrix)*normal));
    vMapUv=(side.y>.7?loc.xz:(side.x>.7?loc.zy:loc.xy))/vec2(5.4,2.7);
  `)},s}Eh.masonry=H1();var se=Math.PI*2,J=(n,t,e)=>new P(n,t,e),Ah=42121;function vi(){return Ah=Math.imul(Ah,1664525)+1013904223>>>0,Ah/4294967296}var ht=(n,t)=>n+(t-n)*vi(),Be=n=>n[Math.floor(vi()*n.length)];function Pt(n,t=.09){return new St(n).multiplyScalar(ht(1-t,1+t))}function Ro(n,t){let e=new cr;return n.forEach(([i,s],r)=>r?e.lineTo(i,s):e.moveTo(i,s)),e.closePath(),new uo(e,{depth:t,bevelEnabled:!1}).translate(0,0,-t/2)}var G1=Ro([[-.5,-.5],[.29,-.5],[.43,-.42],[.5,-.23],[.5,.23],[.43,.42],[.29,.5],[-.5,.5]],1).rotateX(-Math.PI/2),W1={paver:Ro([[-.49,-.38],[-.36,-.5],[.38,-.48],[.5,-.34],[.48,.37],[.35,.5],[-.41,.48],[-.5,.34]],1).rotateX(-Math.PI/2),box:new Hi(1,1,1),ball:new vs(.5,12,8),leaf:new ur(.5,0),crown:new ur(.5,1),cyl:new Gi(.5,.5,1,12),barrel:new fo([[.38,-.5],[.46,-.43],[.5,-.15],[.5,.15],[.46,.43],[.38,.5]].map(n=>new rt(...n)),12),cone:new xs(.5,1,9),pine:new xs(.5,1,9,1),spire:new xs(.5,1,4).rotateY(Math.PI/4),millBody:new Gi(.43,.55,1,24),roofScale:Ro([[-.5,-.38],[-.36,-.5],[.33,-.5],[.5,-.38],[.42,.5],[-.42,.5]],1),gable:Ro([[-.5,0],[.5,0],[0,1]],1),tile:G1,disk:new Gi(.5,.5,1,24),ring:new po(.5,.052,6,40),arch:Ro([[-.5,-.5],[.5,-.5],[.5,.17],[.43,.33],[.23,.46],[0,.5],[-.23,.46],[-.43,.33],[-.5,.17]],1)},X1=new hn({roughness:.94,flatShading:!0}),Ch=Zd(),q1=new Jn({color:16768917}),Y1={standard:X1,glass:Ch,glow:q1,...Eh},Z1=new gn,J1=new ke,K1=J(0,1,0),Oe=class{constructor(t){this.root=t,this.frame=new ne,this.batches=new Map}group(t,e,i,s,r){let o=this.frame;this.frame=o.clone().multiply(new ne().makeTranslation(t,e,i)).multiply(new ne().makeRotationY(s));try{r()}finally{this.frame=o}}put(t,e,i,s,r,o,a,l,c=0,h=0,d=0,u="standard"){u==="standard"&&t==="tile"&&(u="clay"),this.place(t,e,J(i,s,r),J1.setFromEuler(Z1.set(c,h,d)),J(o,a,l),u)}place(t,e,i,s,r,o="standard"){let a=t+"-"+o;this.batches.has(a)||this.batches.set(a,{type:t,material:o,matrices:[],colors:[]});let l=this.batches.get(a);l.matrices.push(new ne().compose(i,s,r).premultiply(this.frame)),l.colors.push(new St(e))}beam(t,e,i,s,r=s,o="box"){let a=i.clone().sub(e);this.place(o,t,e.clone().lerp(i,.5),new ke().setFromUnitVectors(K1,a.clone().normalize()),J(s,a.length(),r))}finish(){for(let{type:t,material:e,matrices:i,colors:s}of this.batches.values()){let r=new gs(W1[t],Y1[e],i.length);i.forEach((o,a)=>{r.setMatrixAt(a,o),r.setColorAt(a,s[a])}),r.castShadow=e!=="glow"&&e!=="glass",r.receiveShadow=r.castShadow,this.root.add(r)}this.batches.clear()}};function li(n,t,e,i,s={}){let r=new be;r.setAttribute("position",new Kt(t,3)),r.setAttribute("color",new Kt(i,3)),r.setIndex(e),r.computeVertexNormals();let o=new ve(r,new hn({vertexColors:!0,side:rn,flatShading:!0,...s}));return o.receiveShadow=!0,n.add(o),o}function Ki(n,t,e,i,s,r,o,a,l){let c=document.createElement("canvas");c.width=512,c.height=128;let h=c.getContext("2d");h.fillStyle=i,h.textAlign="center",h.textBaseline="middle",h.font="bold 68px Georgia",h.fillText(e,256,66,482);let d=new nn(c);d.colorSpace=Ce;let u=new ve(new En(a,l),new Jn({map:d,transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2}));u.position.set(s,r,o),u.applyMatrix4(t.frame),n.add(u)}var qt={x:162,z:-55,y:4},xn=new _n([[8,1.18],[11.5,2.32],[15.5,2.8],[20,4],[29,1],[39,-6],[49,-9],[59,-1],[66,9],[77,10],[84,2],[85,-10],[96,-19],[110,-17],[120,-6],[132,-2],[144,-9],[155,-13],[161,-18],[162,-22.2]].map(([n,t])=>new P(n,0,t))),$1=xn.getSpacedPoints(Math.ceil(xn.getLength()/.65)),Vl=new Map;for(let n of $1){let t=Math.floor(n.x/8)+","+Math.floor(n.z/8);Vl.has(t)||Vl.set(t,[]),Vl.get(t).push(n)}function Ds(n,t){let e=1/0,i=Math.floor(n/8),s=Math.floor(t/8);for(let r=-1;r<=1;r++)for(let o=-1;o<=1;o++)for(let a of Vl.get(i+o+","+(s+r))||[])e=Math.min(e,(a.x-n)**2+(a.z-t)**2);return Math.sqrt(e)}function $i(n,t){let e=Math.abs(n-qt.x)-22.3,i=Math.abs(t-qt.z)-20.2;return Math.hypot(Math.max(e,0),Math.max(i,0))+Math.min(Math.max(e,i),0)-3.25}function Rh(n,t,e){return e=Math.min(1,Math.max(0,e)),n+(t-n)*e*e*(3-2*e)}function Ph(n,t){let e=$i(n,t);if(e<9){let o=Rh(4,1,(e+.65)/2.3);return Rh(o,4,(e-6.18)/2.55)}let i=2.4+1.8*Math.sin(n*.062+t*.026)+1.15*Math.cos(t*.098)+.38*Math.sin(n*.25-t*.1),s=Math.max(0,(Math.abs(t+15)-93)/31,(n-211)/39),r=3.5*Math.exp(-(((n-158)/19)**2+((t+9)/13)**2));return Rh(4,i+r,(e-9)/15)+Math.min(s,1)*(10+6*Math.cos(n*.073+t*.06))}var Ih=xn.getPoint(0),Jd=-Math.atan2(xn.getTangent(0).x,-xn.getTangent(0).z);var Bn=n=>-9-3*Math.sin(n*.092)-n*.13,Mi=n=>2.05+.35*Math.cos(n*.21),Dh=(n,t,e)=>n+(t-n)*e;function Xe(n,t,e){let i=Math.min(1,Math.max(0,(e-n)/(t-n)));return i*i*(3-2*i)}var ji=[{id:"bakery",name:"Bramble Bakery",x:4.1,z:8.2,y:1.1,a:-.2,w:4.3,d:3.65,h:3.9,roof:"#b95336",wall:"#eddbaf"},{id:"mill",name:"Brook Mill",x:-9,z:7.4,y:.65,a:.08,w:3.55,d:3.5,h:3.6,roof:"#b15a40",wall:"#d9caa4"},{id:"inn",name:"The Copper Kettle",x:-1.2,z:-2.5,y:2.45,a:.14,w:4.6,d:3.7,h:4.15,roof:"#b65539",wall:"#f0d8a4"},{id:"slate",name:"The Bindery",x:8.6,z:-1.5,y:3.45,a:-.55,w:3.6,d:3.1,h:3.9,roof:"#617e82",wall:"#e6d9b8"},{id:"tower",name:"Hilltop Clock",x:8,z:-16,y:6.65,a:-.12,w:3.2,d:3.15,h:4.25,roof:"#ac5840",wall:"#ddcda9"},{id:"wind",name:"Clover Windmill",x:-16.2,z:-12,y:4.7,a:.35,w:3,d:3,h:6.8},{id:"potter",name:"Potter\u2019s Cottage",x:-20.4,z:2.7,y:1.65,a:.7,w:3.4,d:3.2,h:2.9,roof:"#ac6248",wall:"#edd4b5"},{id:"herb",name:"Rosemary House",x:-.9,z:-14,y:4.55,a:.45,w:3.6,d:3.4,h:3.3,roof:"#758578",wall:"#e7cdaa"}];function Lh(n){return n.id==="wind"?0:n.w*(n.id==="mill"?.25:-.25)}function Po(n,t){let e=Lh(n),i=(n.id==="wind"?1.71:n.d/2+.24)+t;return{x:n.x+e*Math.cos(n.a)+i*Math.sin(n.a),z:n.z-e*Math.sin(n.a)+i*Math.cos(n.a)}}function ce(n,t){if(n>=54.25)return Ph(n,t);let e=.85+.5*Math.sin(.21*n+.08*t)+.39*Math.cos(t*.29)+.47*Math.sin(.32*n-.11*t);e+=5.65*Math.exp(-((n-7)**2/166+(t+17)**2/159))+4.3*Math.exp(-((n+17)**2/110+(t+13)**2/117)),e+=1.3*Math.sin(n*.11+2.5)*Math.cos(t*.1)*Xe(16,32,Math.hypot(n,t));for(let s of ji){let r=Math.max(0,Math.abs(n-s.x)-s.w*.52),o=Math.max(0,Math.abs(t-s.z)-s.d*.52);e=Dh(s.y,e,Xe(.15,3.6,Math.hypot(r,o)))}let i=Math.abs(n-Bn(t))-Mi(t);return e=Dh(-1.24,e,Xe(-.4,2.1,i)),n>42?Dh(e,Ph(n,t),Xe(42,54.25,n)):e}var j1=[[[1,31],[.7,21],[1.7,15],[1.6,11],[.9,7],[-1,3],[-.9,.3]],[[-21,6],[-17,6],[-13,4],[-10,3.4],[-6,3.5],[-2,4],[2,5],[6,3],[8,1]],[[1,4],[3,1.5],[3.7,-3.2],[4.7,-6.3],[8,-8.8],[9.3,-11.2],[8.5,-13.6]],[[-1,1],[-4,-1.6],[-4.2,-6],[-3.2,-9.2],[-.3,-11.9]],[[-17,6],[-18,2],[-18.7,-3],[-17,-7],[-15.6,-10.1]],[[1.4,11],[2.2,10.8],[3.8,10.5]],[[-8,3.6],[-7.1,6],[-7,9.1],[-8.6,9.8]]],Kd=j1.map(n=>new _n(n.map(([t,e])=>J(t,0,e)))),Q1=Kd.flatMap(n=>n.getSpacedPoints(Math.ceil(n.getLength()/.7)));function Io(n,t,e){return Q1.some(i=>Math.abs(n-i.x)<e&&Math.abs(t-i.z)<e&&(i.x-n)**2+(i.z-t)**2<e*e)}function Do(n,t,e=0){return ji.some(i=>{let s=n-i.x,r=t-i.z;return Math.abs(s*Math.cos(i.a)-r*Math.sin(i.a))<i.w/2+e&&Math.abs(s*Math.sin(i.a)+r*Math.cos(i.a))<i.d/2+e})}function Hl(){let n=document.createElement("canvas");n.width=n.height=256;let t=n.getContext("2d");t.fillStyle="#e1dfbc",t.fillRect(0,0,256,256);for(let i=0;i<13e3;i++){t.fillStyle=Be(["#c2c19d","#f4f1cf","#babb94","#dedcb7"]);let s=vi()*256,r=vi()*256;t.fillRect(s,r,ht(.5,2.8),ht(.5,2))}let e=new nn(n);return e.wrapS=e.wrapT=si,e.colorSpace=Ce,e.anisotropy=4,e}function $d(n,t){let e=[],i=[],s=[],r=[];for(let h=0;h<=175;h++)for(let d=0;d<=175;d++){let u=(d-87.5)*.62,f=(h-175/2)*.62,g=ce(u,f);e.push(u,g,f),r.push(u*.38,f*.38);let _=.5+.21*Math.sin(u*.46+f*.08)+.13*Math.sin(f*.83-u*.34)+.1*Math.cos(f*.18+u*.18)+ht(-.05,.05),m=new St("#68954e").lerp(new St("#b2cc75"),_);m.lerp(new St("#88886a"),1-Xe(-.6,1.45,Math.abs(u-Bn(f))-Mi(f)));let p=1;for(let M of ji){let v=u-M.x,x=f-M.z,A=Math.abs(v*Math.cos(M.a)-x*Math.sin(M.a)),E=Math.abs(v*Math.sin(M.a)+x*Math.cos(M.a)),R=Math.hypot(Math.max(0,A-M.w*.5),Math.max(0,E-M.d*.5));p=Math.min(p,Xe(0,1.45,R))}if(m.lerp(new St("#7e805b"),(1-p)*.75),Io(u,f,.9)&&m.lerp(new St("#999075"),.63),s.push(m.r,m.g,m.b),d&&h){let M=h*176+d;i.push(M-175-2,M-1,M,M-175-2,M,M-175-1)}}li(n,e,i,s,{map:Hl()}).geometry.setAttribute("uv",new Kt(r,2));let c=new Map;Kd.forEach((h,d)=>{let u=h.getLength(),f=Math.ceil(u/.46),g=d>4?2:3;for(let _=0;_<f;_++){let m=_/f,p=h.getPointAt(m),M=h.getTangentAt(m),v=Math.atan2(M.x,M.z);for(let x=0;x<g;x++){let A=(x-(g-1)/2)*.5,E=p.x+M.z*A+ht(-.035,.035),R=p.z-M.x*A+ht(-.035,.035);if(Math.abs(E-Bn(R))<Mi(R)+.65)continue;let D=Math.floor(E),T=Math.floor(R),b=!1;for(let G=D-1;G<=D+1;G++)for(let it=T-1;it<=T+1;it++)c.get(G+","+it)?.some(mt=>mt.k!==d&&(mt.x-E)**2+(mt.z-R)**2<.49**2)&&(b=!0);if(b)continue;let I=D+","+T;c.has(I)||c.set(I,[]),c.get(I).push({x:E,z:R,k:d});let O=(ce(E+.05,R)-ce(E-.05,R))/.1,H=(ce(E,R+.05)-ce(E,R-.05))/.1,Y=J(-O,1,-H).normalize(),Z=new ke().setFromUnitVectors(J(0,1,0),Y).multiply(new ke().setFromAxisAngle(J(0,1,0),v+ht(-.07,.07)));t.place("paver",Pt(Be(["#c5b79a","#c8bea7","#b4a78c","#b5af98"])),J(E,ce(E,R)+.035,R),Z,J(ht(.45,.49),.085,ht(.39,.45)),"stone")}}})}function jd(n){let t=[],e=[],i=[];for(let s=0;s<14600;s++){let r=ht(-32,33),o=ht(-32,33);if(Do(r,o,.1)||Io(r,o,.86)||Math.abs(r-Bn(o))<Mi(o)+.3)continue;let a=ce(r,o)-.026,l=ht(.14,.46);for(let c=0;c<5;c++){let h=ht(0,se),d=Math.cos(h),u=Math.sin(h),f=ht(0,.12),g=r+f*d,_=o+f*u,m=ht(.02,.048),p=l*ht(.55,1.18),M=t.length/3;t.push(g-u*m,a,_+d*m,g+u*m,a,_-d*m,g+d*p*.48,a+p,_+u*p*.48),e.push(M,M+1,M+2);let v=new St(Be(["#68863e","#83984c","#8da953","#a0b95d"])),x=v.clone().multiplyScalar(1.26);i.push(v.r*.75,v.g*.75,v.b*.75,v.r,v.g,v.b,x.r,x.g,x.b)}}li(n,t,e,i)}function Qd(n){let e=Bn(3.9),i=7.8,s=r=>.73+1.04*Math.sin(Math.PI*r);for(let r=0;r<31;r++){let o=(r+.5)/31,a=e+(o-.5)*i,l=s(o),c=1.04*Math.PI*Math.cos(Math.PI*o)/i;n.put("box",Pt("#b8aa91"),a,l,3.9,i/31+.012,.26,2.05,0,0,Math.atan(c));for(let h of[-1,1]){let d=3.9+h*1.01;n.put("box",Pt("#a99c80"),a,l-.24,d,i/31+.01,.42,.35,0,0,Math.atan(c)),r%2===0&&(n.put("box",Pt("#ae9e80"),a,l+.28,d,.5,.6,.32,0,0,Math.atan(c)),n.put("box",Pt("#d6c7a5"),a,l+.6,d,.51,.13,.4,0,0,Math.atan(c))),(o<.19||o>.81)&&n.put("box",Pt("#a49a82"),a,(l-.95)/2,d,.27,l+1.15,.4)}}}function Gl(n,t){let e=(n-Bn(3.9))/7.8+.5;return e>=0&&e<=1&&Math.abs(t-3.9)<.86?Math.max(ce(n,t),.86+1.04*Math.sin(e*Math.PI)):ce(n,t)}function tf(n,t){return Math.hypot(n-6.09,t+15.6)<1.5||Math.hypot(n+10.55,t-9.88)<1.43?!1:n>31||Math.abs(t)>32?n>25&&n<213&&t<49&&t>(n<54.25?-48:-102):n<-31||Do(n,t,.24)?!1:Math.abs(n-Bn(t))>Mi(t)+.32||Math.abs(t-3.9)<.87&&Math.abs(n-Bn(3.9))<4}var zn="#544439",ci="#805a3c",$e="#655040",ef="#e7d4aa",Qi="#383f39",Uh=[],Wl=[],Xl=[],Nh=[];function rf(n,t,e,i,s,r){let o=e/2+.3,a=t+.63,l=Math.ceil(o/.4),c=Math.ceil(a/.4),h=o/l,d=a/c;for(let u of[-1,1])n.group(0,i,0,-u*Math.PI/2,()=>{n.put("box",$e,o*.5,s*.5-.065,0,Math.hypot(o,s),.12,a,0,0,-Math.atan2(s,o),"wood");let f=g=>s*(1-g/o)+.15*Math.sin(Math.PI*g/o);for(let g=0;g<l;g++){let _=(g+.55)*h,m=f(_),p=-s/o+.15*Math.PI/o*Math.cos(Math.PI*_/o),M=Math.atan(p);for(let v=0;v<c+g%2;v++){let x=Math.max(0,(v-g%2*.5)*d),A=Math.min(a,(v+1-g%2*.5)*d);n.put("tile",Pt(r,.24),_+.022,m+.041+ht(0,.014),(x+A-a)/2,h*Math.hypot(1,p)*1.12,.095,A-x-.008,0,0,M)}}for(let g of[-1,1])n.beam($e,J(0,s+.012,g*a/2),J(o,0,g*a/2),.12,.14)});for(let u=0;u<c;u++)n.put("cyl",Pt(r,.15),(u+.5-c/2)*d,i+s+.07,0,.24,d*.99,.24,0,0,Math.PI/2)}function tx(n,t,e,i,s){n.put("box",ci,t,e-.07,i+.11,s+.16,.2,.32);for(let r=0;r<9;r++){let o=t+ht(-.46,.46)*s,a=i+ht(.06,.26);n.put("leaf",Be(["#59753e","#69884a","#3f6343"]),o,e+.07,a,.21,.19,.2),n.put("ball",Be(["#d67e86","#f1d496","#ba5a71","#ede3cc"]),o,e+ht(.14,.23),a,.085,.08,.09)}}function Ls(n,t,e,i,s=.74,r=.94,o=!0,a=!1){if(n.put("box",zn,t,e,i+.035,s+.16,r+.17,.13),n.put("box","#faf9ed",t,e,i+.105,s,r,.043,0,0,0,"glass"),n.put("box",$e,t,e,i+.15,.055,r,.06),n.put("box",$e,t,e,i+.15,s,.055,.06),n.put("box","#937452",t,e-r*.5-.08,i+.08,s+.28,.1,.23),o)for(let l of[-1,1]){let c=t+l*(s*.67+.09);n.put("box","#587263",c,e,i+.048,s*.3,r+.07,.09);for(let h=0;h<5;h++)n.put("box",Pt("#76816a"),c,e+(h-2)*r*.18,i+.103,s*.3,.046,.055)}a&&tx(n,t,e-r*.5-.1,i+.12,s)}function ex(n,t,e,i){let s=-t*.31,r=-e*.18,o=i+.55;n.put("box","#9d7d68",s,o+1.05,r,.53,2.1,.56);for(let l=0;l<9;l++)for(let c=0;c<2;c++)n.put("box",Pt("#ae8973",.18),s+(c-.5)*.26,o+l*.225,r+.282,.244,.192,.028);n.put("box",$e,s,o+2.12,r,.68,.17,.69);let a=J(s,o+2.27,r).applyMatrix4(n.frame);Wl.push(a)}function nx(n,t,e,i,s){n.group(0,t+.55,e*.31,Math.PI/2,()=>{n.put("box",ef,0,.3,0,1.15,.72,1.27),n.put("gable",ef,0,.65,0,1.36,.7,1.13,0,Math.PI/2),rf(n,1.12,1.18,.7,.69,s),n.group(-.59,.32,0,-Math.PI/2,()=>Ls(n,0,0,0,.52,.57,!1))})}function ix(n,t,e){let{w:i,d:s,h:r,wall:o,roof:a,id:l}=t,c=s/2;n.put("box","#9d9580",0,-.97,0,i+.12,2.34,s+.12,0,0,0,"stone"),n.put("box",o,0,r/2,0,i,r,s,0,0,0,"plaster"),n.put("gable",o,0,r-.02,0,s,1.91,i,0,Math.PI/2,0,"plaster");for(let d of[-1,1])n.group(0,0,d*c,d===1?0:Math.PI,()=>{for(let u of[-i/2+.04,0,i/2-.04])n.put("box",zn,u,r/2,0,.12,r+.05,.17,0,0,0,"wood");for(let u of[.16,r*.49,r-.12])n.put("box",zn,0,u,0,i+.12,.14,.17);for(let u of[-i*.25,i*.25])Ls(n,u,r*.74,.018,.71,.95,!0,d===1);for(let u=0;u<7;u++)n.put("box",$e,(u/6-.5)*i,r-.04,.19,.115,.18,.5,.18)}),n.group(d*i/2,0,0,d*Math.PI/2,()=>{n.put("box",zn,0,r*.49,.025,s,.14,.13);for(let u of[-s*.46,s*.46])n.put("box",zn,u,r*.5,0,.13,r,.13);n.beam(zn,J(-s*.47,.25,.052),J(-s*.17,r*.46,.052),.12),n.beam(zn,J(s*.47,r*.51,.052),J(s*.15,r*.96,.052),.12),Ls(n,0,r*.7,.055,.69,.91,!1),Ls(n,0,r+.46,.04,.54,.57,!1),n.put("box",zn,0,r-.02,.04,s,.13,.14);for(let u of[-1,1])n.beam($e,J(u*s*.38,r+.05,.052),J(u*.27,r+1.41,.052),.095,.115)});for(let d=0;d<18;d++){let u=ht(-i*.47,i*.47),f=.22+Math.pow(vi(),2)*r*.83;n.put("leaf",Pt("#c7b994"),u,f,c+.015,ht(.08,.26),ht(.035,.085),.018)}let h=Lh(t);n.put("arch",zn,h,1.02,c+.1,1.01,1.97,.16),n.put("arch",l==="bakery"?"#647e6d":"#97764e",h,1.01,c+.195,.82,1.76,.071),Ls(n,h,1.41,c+.24,.39,.35,!1);for(let d=0;d<5;d++)n.put("box",l==="bakery"?"#506e5e":"#806748",h+(d-2)*.15,.65,c+.237,.012,.91,.009);if(n.put("ball","#c9aa67",h+.27,.8,c+.28,.095,.095,.085),n.put("box","#b4aa92",h,.085,c+.43,1.3,.17,.75),Ls(n,-h,1.19,c+.02,.85,.86,!0),rf(n,i,s,r,1.92,a),(l==="bakery"||l==="inn")&&nx(n,r,s,i,a),ex(n,i,s,r),l==="bakery"){for(let d=0;d<11;d++){let u=(d-5)*i/11,f=d%2?"#b95646":"#f1dfb5";n.put("box",f,u,2.2,c+.52,i/11+.003,.09,1.2,.23),n.put("arch",f,u,1.97,c+1.1,i/11,.25,.08,0,0,Math.PI)}for(let d of[-i*.46,i*.46])n.put("cyl",ci,d,1.01,c+1.04,.085,2.02,.085);n.put("box",ci,i*.22,.67,c+.71,1.56,.19,.7);for(let d=0;d<7;d++){let u=i*.22+ht(-.64,.64),f=c+ht(.43,.93);n.put("ball",Pt("#c88944"),u,.83,f,.25,.15,.39,0,ht(-.6,.6)),n.put("box","#f3cf8d",u,.903,f,.13,.011,.025,0,.45)}n.put("box","#634c39",0,2.51,c+.14,1.73,.35,.12),Ki(e,n,"BAKERY","#f9e4b5",0,2.51,c+.21,1.57,.31),sx(n,-i*.45,.12,c+1.49)}else if(l==="inn"){n.put("box",ci,0,r*.52,c+.3,i*.94,.14,.77,0,0,0,"wood"),n.put("box",ci,0,r*.52+.58,c+.64,i*.94,.105,.11,0,0,0,"wood");for(let d=0;d<=16;d++)n.put("box",$e,(d/16-.5)*i*.91,r*.52+.3,c+.64,.058,.54,.065);for(let d of[-1,1])n.beam($e,J(d*i*.38,r*.52-.57,c+.08),J(d*i*.38,r*.52-.03,c+.69),.12);n.put("box",zn,i*.5+.24,2.8,c,.62,.09,.1),n.put("box","#506b5e",i*.5+.49,2.43,c,.53,.51,.12),Ki(e,n,"INN","#fce2a4",i*.5+.49,2.43,c+.07,.44,.2)}nf(n,i*.52,0,c+.38),l!=="tower"&&nf(n,i*.51+.47,-.04,c+.15,.73);for(let d=0;d<48;d++){let u=ht(.4,r),f=i*.45+.13*Math.sin(u*3)+ht(-.22,.11);n.put("leaf",Be(["#5d7947","#87954c","#607243"]),f,u,c+.13,ht(.13,.31),ht(.13,.29),.11,0,0,ht(-.8,.8))}}function nf(n,t,e,i,s=1){n.put("barrel",Pt("#967450"),t,e+.35*s,i,.56*s,.7*s,.56*s);for(let r of[.15,.52])n.put("cyl",Qi,t,e+r*s,i,.55*s,.048*s,.55*s);n.put("disk",ci,t,e+.7*s,i,.43*s,.026*s,.43*s)}function sx(n,t,e,i){n.group(t,e,i,-.38,()=>{let s="#272a2b";n.put("ball",s,0,.235,-.05,.31,.4,.34,-.18);for(let a of[-1,1])n.put("ball",s,a*.105,.15,-.06,.18,.23,.25),n.put("ball","#303334",a*.068,.14,.087,.073,.24,.075),n.put("ball","#353637",a*.07,.051,.112,.094,.069,.11);n.put("ball",s,0,.45,.056,.32,.275,.265);for(let a of[-1,1]){n.put("cone",s,a*.103,.585,.035,.136,.16,.11,0,0,-a*.15),n.put("cone","#806568",a*.103,.589,.071,.065,.094,.032,0,0,-a*.15),n.put("ball","#c7ba76",a*.073,.468,.172,.048,.029,.018),n.put("box","#242628",a*.073,.468,.183,.009,.023,.008);for(let l of[-.014,.012])n.beam("#a7a295",J(a*.054,.417+l,.181),J(a*.183,.421+l*1.6,.199),.005,.005)}n.put("ball","#997a78",0,.422,.192,.039,.027,.028);let o=new _n([J(.03,.102,-.151),J(.15,.07,-.21),J(.24,.055,-.134),J(.248,.073,-.018),J(.203,.102,.027)]).getPoints(8);for(let a=1;a<o.length;a++){let l=.071-a*.003;n.beam(s,o[a-1],o[a],l,l,"cyl"),n.put("ball",s,...o[a].toArray(),l,l,l)}})}function of(n,t,e,i=0){for(let s=0;s<Math.floor(e*17);s++){let r=ht(0,se),o=ht(.16,e-.16),a=t-i*o/e;n.put("box",Pt(Be(["#c1ae8c","#cbbb9b","#d8c8a8"])),Math.sin(r)*(a-.012),o,Math.cos(r)*(a-.012),ht(.15,.37),ht(.09,.19),.065,0,r)}}function af(n,t,e,i,s,r){n.put("cone",$e,0,t+i/2,0,e*1.94,i,e*1.94);let o=Math.atan(e/i);for(let a=0;a<r;a++){let l=(a+.5)/r,c=e*(1-l),h=t+i*l,d=Math.max(5,Math.round(se*c/.32));for(let u=0;u<d;u++){let f=(u+a%2*.52)*se/d;n.group(0,0,0,f,()=>n.put("roofScale",Pt(s,.18),0,h,c,se*c/d*1.12,Math.hypot(i,e)/r*1.14,.095,-o,0,0,"clay"))}}}function rx(n,t){n.put("cyl","#d9c8a6",0,7.7/2,0,1.24*2,7.7,1.24*2,0,0,0,"plaster"),of(n,1.24,7.7);for(let s of[.28,5.75,7.28,7.58])n.put("disk","#b3a382",0,s,0,2.64,.17,2.64);for(let s=0;s<4;s++)n.group(0,0,0,s*Math.PI/2,()=>{Ls(n,0,4.1,1.24-.07,.37,.84,!1),n.put("disk",$e,0,6.55,1.24-.03,1.29,.17,1.29,Math.PI/2),n.put("disk","#f2db9e",0,6.55,1.24+.075,1.12,.04,1.12,Math.PI/2);for(let o=0;o<12;o++){let a=o*se/12;n.put("box",$e,.46*Math.sin(a),6.55+.46*Math.cos(a),1.24+.11,.036,.105,.025,0,0,-a)}let r=new Re;r.matrixAutoUpdate=!1,r.matrix.copy(n.frame).multiply(new ne().makeTranslation(0,6.55,1.24+.15)),t.add(r);for(let[o,a,l]of[["hour",.3,.055],["minute",.42,.036]]){let c=new Re;r.add(c);let h=new Oe(c);h.put("box",Qi,0,a*.42,o==="minute"?.014:0,l,a,.025),h.finish(),Nh.push({hand:c,kind:o})}n.put("ball",Qi,0,6.55,1.24+.19,.081,.081,.041)});af(n,7.67,1.69,2.4,"#688782",8),n.put("cyl",Qi,0,10.23,0,.048,.76,.048),n.put("ball","#c4a25e",0,10.33,0,.19,.19,.19)}function ox(n){n.put("millBody","#d5c4a3",0,6/2,0,3.05,6,3.05,0,0,0,"plaster"),of(n,1.676,6,.367);for(let e=0;e<4;e++)n.group(0,0,0,e*Math.PI/2,()=>{n.put("arch",$e,0,2.82,1.43,.51,.99,.13),n.put("arch","#edcd8b",0,2.82,1.51,.34,.79,.04,0,0,0,"glass"),n.put("box",$e,0,2.81,1.55,.035,.76,.045)});n.put("arch",zn,0,1,1.61,1.07,2.04,.18),n.put("arch",ci,0,.96,1.71,.87,1.86,.08),n.put("cyl",$e,0,5.92,0,3.37,.24,3.37),af(n,6.02,1.87,2.39,"#b76046",8)}function sf(n,t,e,i,s,r,o,a){let l=new Re;l.matrixAutoUpdate=!1,l.matrix.copy(t.frame).multiply(new ne().makeTranslation(e,i,s)),n.add(l);let c=new Re;l.add(c);let h=new Oe(c);return o(h),h.finish(),Uh.push({hub:c,axis:r,speed:a}),c}function ax(n){n.put("cyl",$e,0,0,0,.44,.46,.44,Math.PI/2);for(let t=0;t<4;t++){let e=t*se/4+.43,i=(s,r,o=0)=>J(Math.cos(e)*r-Math.sin(e)*s,Math.sin(e)*r+Math.cos(e)*s,o);n.beam(zn,i(.1,0),i(3.44,0),.11,.12),n.put("box","#dac69e",...i(2.35,.3,-.045).toArray(),.57,2.07,.033,0,0,e);for(let s of[0,.32,.66])n.beam(ci,i(1.22,s),i(3.48,s),.063,.07);for(let s=0;s<8;s++){let r=1.22+s*.32;n.beam($e,i(r,-.04,.035),i(r,.7,.035),.055,.065)}}}function lx(n){for(let t of[-.3,.3]){n.put("ring",ci,0,0,t,3.34,3.34,2.15),n.put("ring",$e,0,0,t,2.84,2.84,1.1);for(let e=0;e<10;e++){let i=e*se/10;n.beam(ci,J(0,0,t),J(1.63*Math.sin(i),1.63*Math.cos(i),t),.12,.12)}}for(let t=0;t<20;t++){let e=t*se/20;n.put("box",Pt(ci),1.67*Math.sin(e),1.67*Math.cos(e),0,.34,.13,.81,0,0,-e)}n.put("cyl",Qi,0,0,0,.34,1.05,.34,Math.PI/2)}function Fh(n,t,e,i){n.group(t,e,i,0,()=>{n.put("cyl",zn,0,1.45,0,.14,2.9,.14),n.put("box",$e,.22,2.83,0,.58,.11,.15),n.put("box","#ffdf92",.44,2.44,0,.27,.4,.27,0,0,0,"glass");for(let s of[-1,1])for(let r of[-1,1])n.put("box",Qi,.44+s*.15,2.44,r*.15,.036,.46,.036);n.put("spire",Qi,.44,2.74,0,.53,.24,.53),n.put("box",Qi,.44,2.21,0,.34,.06,.34),Xl.push(J(.44,2.43,0).applyMatrix4(n.frame))})}function lf(n,t){for(let e of ji)t.group(e.x,e.y,e.z,e.a,()=>{e.id==="wind"?(ox(t),sf(n,t,0,5.8,1.8,"z",ax,.23)):ix(t,e,n),e.id==="tower"&&t.group(-2,0,.64,0,()=>rx(t,n)),e.id==="mill"&&sf(n,t,-1.73,1.14,e.d/2+.6,"z",lx,-.34)});for(let[e,i]of[[-.2,13],[-6,5.6],[-15.6,5.1],[3.4,-4.5],[8.4,-11.4],[-16,-6],[-2.2,-8.4]])Fh(t,e,ce(e,i),i)}var de="#684530",Pe="#a57449",yn="#bc915e",Ie="#454640",qe="#c49a53",Rn="#f1dfbc",cx=["#7d4140","#48645c","#af8952","#536375","#785449"];function Ut(n,t,e,i,s,r,o,a=Pe){n.put("box",a,t,e,i,s,r,o,0,0,0,"wood")}function Te(n,t,e,i,s,r=.87){Ut(n,t,r-.055,e,i,.11,s,yn),Ut(n,t,r-.19,e,i-.13,.19,s-.13,Pe);for(let o of[-1,1])for(let a of[-1,1]){let l=t+o*(i/2-.11),c=e+a*(s/2-.11);Ut(n,l,(r-.19)/2,c,.12,r-.19,.12),n.put("ball",de,l,.15,c,.15,.17,.15)}}function Uo(n,t,e,i=0,s="#667b67"){n.group(t,0,e,i,()=>{Te(n,0,0,.53,.54,.47),n.put("box",s,0,.49,0,.49,.065,.46);for(let r of[-1,1])Ut(n,r*.2,.73,.218,.075,.64,.084);Ut(n,0,.88,.22,.46,.13,.075,yn),Ut(n,0,1.02,.22,.5,.085,.08)})}function je(n,t,e,i,s,r,o){Ut(n,t,r/2,e,i,r,s,o||Pe),Ut(n,t,r+.025,e,i+.09,.075,s+.065,yn),Ut(n,t,.085,e,i+.06,.13,s+.045,de);for(let a of[-1,1]){let l=t+a*i*.236,c=e+s/2;Ut(n,l,r*.51,c+.021,i*.44,r*.76,.055,o||yn),Ut(n,l,r*.51,c+.051,i*.34,r*.62,.025,o||Pe),n.put("ball",qe,t+a*.085,r*.56,c+.09,.072,.072,.068)}}function zh(n,t,e,i,s=.15,r=.36,o=.23,a=Be(cx)){n.put("box",Rn,t,e+r/2,i,s-.02,r-.025,o-.012);for(let l of[-1,1])n.put("box",a,t+l*(s/2-.008),e+r/2,i,.017,r,o);n.put("box",a,t,e+r/2,i+o/2,s,r,.038);for(let l of[.19,.76,.85])n.put("box",qe,t,e+r*l,i+o/2+.022,s*.83,.014,.008)}function on(n,t,e,i,s=0){n.group(t,e,i,s,()=>{n.put("box",Rn,0,.055,0,.47,.09,.34);for(let r of[.008,.105])n.put("box","#6c5144",0,r,0,.49,.018,.37)})}function Cn(n,t,e,i,s=.3,r="#8ca397",o="jar"){let a=s*(o==="bottle"?.62:1);n.put("ball",r,t,e+s*.41,i,a*.96,s*.81,a*.96),n.put("cyl",r,t,e+s*.76,i,a*.53,s*.34,a*.53),n.put("cyl",r,t,e+s*.91,i,a*.66,s*.083,a*.66),n.put("disk","#52483d",t,e+s*.955,i,a*.474,.009,a*.474),o==="bottle"&&n.put("cyl",Pe,t,e+s*1.01,i,a*.42,.09,a*.42)}function ql(n,t,e,i){n.put("cyl","#d1ba8b",t,e+.084,i,.14,.16,.14),n.put("disk","#604736",t,e+.166,i,.111,.006,.111),n.put("ring","#d1ba8b",t+.084,e+.095,i,.112,.118,.43)}function Yl(n,t,e,i,s=.36){n.put("disk",Rn,t,e+.016,i,s,.032,s),n.put("ring","#78918a",t,e+.035,i,s*.78,s*.78,.15,Math.PI/2)}function ts(n,t,e,i,s=.52,r=!1){Cn(n,t,e,i,s*.54,"#b57856");for(let o=0;o<7;o++){let a=o*2.4,l=s*(.12+.027*(o%4)),c=s*(.73+.11*(o%3)),h=t+Math.sin(a)*l,d=i+Math.cos(a)*l;n.beam("#678252",J(t,e+s*.43,i),J(h,e+c,d),.015,.015,"cyl"),n.put("leaf",Be(["#5b8059","#819951","#586f47"]),h,e+c-.04,d,s*.23,s*.37,s*.13,.45,a,.3),r&&n.put("ball",Be(["#c48891","#ded4a4","#cfafa4"]),h,e+c+.02,d,.079,.08,.075)}}function dn(n,t,e,i,s=.22){n.put("disk",qe,t,e+.018,i,.15,.03,.15),n.put("cyl",Rn,t,e+s/2,i,.074,s,.074),n.put("ball","#ffeea6",t,e+s+.048,i,.034,.1,.034,0,0,0,"glow")}function Oh(n,t,e,i,s=.48){n.put("ball","#c98e4d",t,e+s*.22,i,s,s*.48,s*.63);for(let r=-1;r<2;r++)n.put("box","#f2cc84",t+r*s*.21,e+s*(r===0?.45:.414),i,.023,.013,s*.23,0,.44)}function Lo(n,t,e,i,s=.7){n.put("barrel","#c0a983",t,e+.34*s,i,.62*s,.7*s,.53*s),n.put("ball","#b49a73",t,e+.73*s,i,.31*s,.18*s,.3*s),n.put("cyl",de,t,e+.65*s,i,.34*s,.037,.31*s)}function hf(n,t,e,i,s,r=qe){n.put("ring",r,t,e,i,s*1.83,s*1.83,2.6);for(let o=0;o<16;o++){let a=o*se/16;n.put("box",r,t+Math.sin(a)*s,e+Math.cos(a)*s,i,s*.22,s*.24,.11,0,0,-a),o%2===0&&n.beam(r,J(t,e,i),J(t+s*.88*Math.sin(a),e+s*.88*Math.cos(a),i),s*.105,.083)}n.put("cyl",Ie,t,e,i,s*.32,.19,s*.32,Math.PI/2)}function No(n,t,e,i,s,r){for(let o=0;o<3;o++){let a=e+o*.54;Ut(n,t,a,i,s,.075,.42,yn);let l=Math.floor(s/(r==="books"?.21:.44));for(let c=0;c<l;c++){let h=t+(c+.5-l/2)*(s-.16)/l;r==="books"?zh(n,h,a+.042,i,.13+.025*(c%3),.27+.047*((c+o)%4)):r==="bread"?Oh(n,h,a+.055,i,.37):Cn(n,h,a+.047,i,.24+.045*((o+c)%4),Be(["#84998a","#be8864","#739298","#d3bc8e","#976f69"]),r==="herbs"?"bottle":"jar")}}for(let o of[-1,1])Ut(n,t+o*(s*.5-.04),e+.54,i,.078,1.45,.39,de)}function Ns(n,t,e,i=!1){let s=i?2.22:1.68;for(let r of[-1,1])n.put("box","#aa9a80",t+r*s*.407,.66,e,s*.19,1.32,.82,0,0,0,"stone");n.put("box","#a0927c",t,1.71,e,s,.62,.82,0,0,0,"stone"),n.put("gable","#b2a48d",t,2.01,e,s,.54,.82),n.put("box","#988b76",t,2.49,e,.69,.85,.68,0,0,0,"stone"),n.put("box","#48392f",t,.71,e-.3,s*.68,1.47,.17,0,0,0,"stone");for(let r=0;r<6;r++)for(let o=0;o<5;o++)n.put("box",Pt("#625044",.15),t+(o-2)*s*.115,.28+r*.18,e-.18,s*.108,.157,.07);for(let r=0;r<7;r++)n.put("leaf","#ac4931",t+(r-3)*.096,.203,e+.24,.13,.06,.13,0,r,0,"glow");for(let r of[-1,1])for(let o=0;o<4;o++)n.put("paver",Pt("#ac8568"),t+r*s*.375,.18+o*.23,e+.46,.24,.21,.16);for(let r=0;r<9;r++){let o=Math.PI*r/8;n.put("box",Pt("#ba9375"),t+s*.37*Math.cos(o),.98+.52*Math.sin(o),e+.47,.2,.23,.16,0,0,o-Math.PI/2)}n.put("box","#918470",t,.075,e+.47,s+.26,.15,.65,0,0,0,"stone");for(let r=0;r<4;r++)n.put("cyl",de,t+(r-1.5)*.17,.23,e+.46,.13,.47,.13,Math.PI/2,.2),n.put("leaf","#ed9449",t+(r-1.5)*.15,.4,e+.49,.14,.3+r%2*.1,.12,0,0,.1*r,"glow")}function cf(n,t,e,i){Ut(n,t,.37,e,1.3,.2,2.12,de);for(let s of[-.59,.59])for(let r of[-.94,.94])Ut(n,t+s,.3,e+r,.11,.6,.11);Ut(n,t,.66,e-.99,1.32,.64,.12,yn),n.put("box",Rn,t,.53,e,1.24,.19,2.03),n.put("box",i,t,.65,e+.3,1.25,.09,1.4);for(let s=0;s<5;s++)n.put("box",Rn,t,.699,e-.18+s*.235,1.22,.01,.022);n.put("ball","#f0dfbd",t,.69,e-.68,.91,.2,.43)}function Bh(n,t,e,i,s,r){let o=new Re;o.matrixAutoUpdate=!1,o.matrix.copy(n.frame).multiply(new ne().makeTranslation(t,e,i)),n.root.add(o);let a=new Re;o.add(a);let l=new Oe(a);s(l),l.finish(),n.root.userData.motion.push((c,h)=>r(a,c,h))}function Us(n,t,e,i,s,r,o=qe){Bh(n,t,e,i,a=>hf(a,0,0,0,s,o),(a,l)=>a.rotation.z=l*r)}function hx(n){Ut(n,0,1.14,0,.65,2.28,.43),Ut(n,0,.13,0,.76,.24,.53,de),Ut(n,0,2.26,0,.79,.13,.52,yn),n.put("arch",de,0,.98,.229,.46,1.27,.034),Bh(n,0,1.53,.27,t=>{t.put("box",qe,0,-.4,0,.033,.81,.035),t.put("disk",qe,0,-.82,0,.23,.058,.23,Math.PI/2)},(t,e)=>t.rotation.z=.125*Math.sin(e*3.14)),n.put("disk",qe,0,1.84,.25,.59,.08,.59,Math.PI/2),n.put("disk",Rn,0,1.84,.298,.5,.03,.5,Math.PI/2);for(let t=0;t<12;t++){let e=t*se/12;n.put("box",de,Math.sin(e)*.203,1.84+Math.cos(e)*.203,.32,.015,.05,.012,0,0,-e)}for(let t of[.13,.19])Bh(n,0,1.84,.34,e=>e.put("box",Ie,0,t*.4,0,.024,t,.016),(e,i,s)=>e.rotation.z=-se*(t===.13?s/12:s%1))}function uf(n,t,e){cf(n,-2.66,-2.5,e),je(n,-1.55,-3.32,.7,.49,.62),dn(n,-1.57,.69,-3.31),t.id==="inn"?cf(n,.12,-2.58,"#8a6860"):t.id==="tower"?(Us(n,.1,1.45,-3.67,.71,.16),Us(n,1.16,1.01,-3.64,.44,-.255,"#907b53"),je(n,.61,-3.38,1.65,.56,.6,"#788675")):(je(n,.24,-3.48,1.25,.63,1.48,e),ts(n,.22,1.55,-3.45,.5)),je(n,2.05,-3.43,.92,.61,.65),on(n,2.06,.72,-3.4,.11)}function df(n,t,e){function i(a,l,c,h=.79){n.group(-3.76,0,a,Math.PI/2,c),e(-3.76,a,h,l)}function s(a,l,c,h=.85){n.group(a,0,-3.49,0,c),e(a,-3.49,l,h)}function r(a){je(n,0,0,2.46,.74,.88),No(n,0,1.36,-.12,2.35,a)}let o=(a,l,c,h,d)=>{n.group(a,0,l,0,d),e(a,l,c,h)};switch(t){case"bakery":s(-1.55,2.45,()=>{Ns(n,0,0,!0),n.beam(yn,J(1.06,.29,.64),J(1.36,1.98,.21),.075,.075,"cyl"),n.put("paver",yn,1.09,.44,.6,.31,.065,.51,1.24,0,-.14)},1.5),s(1.1,2.46,()=>r("bread")),i(.09,2.65,()=>{Te(n,0,0,2.65,.85);for(let a=0;a<4;a++)Oh(n,-.91+a*.57,.88,.06,.46)}),o(-1.15,.65,1.62,.88,()=>{Te(n,0,0,1.62,.88),n.put("box","#debf92",-.1,.884,.01,.73,.028,.46),Oh(n,-.15,.91,.02,.45),n.put("cyl",yn,.46,.96,.02,.12,.55,.12,Math.PI/2),Cn(n,-.57,.88,-.15,.25)});break;case"mill":s(-1.54,2.21,()=>{Te(n,0,0,2.21,1,.58);for(let a=0;a<2;a++)n.put("disk",Pt("#ada590"),0,.73+a*.21,0,1.4,.23,1.4,0,0,0,"stone");n.put("cyl",de,0,1.68,0,.18,1.48,.18),Us(n,.75,1.69,-.15,.47,.46,Pe)},1.1),s(1.32,2.1,()=>{je(n,0,0,2.1,.78,.88);for(let a=0;a<3;a++)Lo(n,(a-1)*.55,.93,0,.8)}),i(-.5,2.3,()=>{Te(n,0,0,2.3,.75),Cn(n,-.62,.89,0,.44),on(n,.36,.88,0,.15)}),o(-2.36,1.36,1.1,.84,()=>{Lo(n,-.27,0,.06,1.02),Lo(n,.27,0,-.12,.88)});break;case"inn":s(-2.53,1.86,()=>Ns(n,0,0),1.42),s(.21,2.65,()=>{je(n,0,0,2.65,.79,1.02,"#647c70"),No(n,0,1.39,-.1,2.54,"pots")});for(let a of[-.95,1.38]){o(-2.18,a,1.57,.83,()=>{Te(n,0,0,1.57,.83);for(let l of[-.46,.46])Yl(n,l,.88,0),ql(n,l+.18,.89,.1);dn(n,0,.89,0)});for(let l of[-1,1])Uo(n,-2.18,a+l*.71,l===1?0:Math.PI),e(-2.18,a+l*.71,.55,.54)}break;case"slate":s(-1.89,2.65,()=>{je(n,0,0,2.65,.74,.67),No(n,0,.89,-.12,2.6,"books")}),s(1.13,2.37,()=>{Te(n,0,0,2.37,.81),Ut(n,.22,.99,0,1.14,.18,.65);for(let a of[-.24,.68])Ut(n,a,1.28,0,.09,.68,.1);Ut(n,.22,1.62,0,1.14,.12,.15),n.put("cyl",Ie,.22,1.39,0,.075,.44,.075),Ut(n,.22,1.2,0,.97,.12,.54)}),i(.1,2.45,()=>r("books")),o(-1.12,.77,1.63,.91,()=>{Te(n,0,0,1.63,.91),on(n,-.41,.88,.01,-.23);for(let a=0;a<4;a++)n.put("box",Rn,.27+a*.015,.89+a*.018,0,.5,.012,.4,0,a*.06);dn(n,.65,.88,-.18)});break;case"tower":s(-.89,2.8,()=>{je(n,0,0,2.8,.76,.73,"#748173"),Us(n,-.67,1.75,-.28,.63,.22),Us(n,.26,1.42,-.23,.42,-.33),Us(n,.94,1.73,-.25,.3,.46)}),i(.2,2.43,()=>{Te(n,0,0,2.43,.8),on(n,-.59,.88,.04),hf(n,.22,1.26,-.1,.34),Cn(n,.82,.88,-.02,.34)}),s(1.82,1.24,()=>hx(n)),Uo(n,-2.26,.61,.41),e(-2.26,.61,.64,.62);break;case"wind":s(-1.12,2.4,()=>{Te(n,0,0,2.4,.95,.65),n.put("disk","#a99e87",0,.81,0,1.22,.3,1.22),n.put("cone",Pe,0,1.48,0,1.27,1.12,1.27,0,0,Math.PI),n.put("disk","#5e4b39",0,2.04,0,1.11,.02,1.11),Us(n,-.86,1.3,0,.42,-.37,Pe)},1.05),s(1.57,1.73,()=>{for(let a=0;a<3;a++)Lo(n,(a-1)*.53,0,0,1)}),i(-.1,2.28,()=>{je(n,0,0,2.28,.74,.91),on(n,-.58,.96,0),Cn(n,.45,.96,0,.41),ql(n,0,.96,.16)}),o(-2.48,1.58,.94,.73,()=>{Ut(n,0,.38,0,.92,.74,.73);for(let a of[-1,1])Ut(n,a*.35,.38,.38,.09,.74,.06,de);Lo(n,0,.76,0,.67)});break;case"potter":s(-2.12,1.87,()=>Ns(n,0,0,!0),1.45),s(.72,2.6,()=>r("pots")),i(-.03,2.48,()=>{Te(n,0,0,2.48,.79);for(let a=0;a<4;a++)Cn(n,-.86+a*.56,.88,0,.35+a*.045,"#b67859")}),o(-1.39,.8,1.12,1.1,()=>{n.put("disk",Pe,0,.19,0,.91,.15,.91),n.put("cyl",Ie,0,.42,0,.15,.53,.15),n.put("disk","#ad967d",0,.74,0,.93,.11,.93),Cn(n,0,.8,0,.5,"#ba795d")}),Uo(n,-1.43,1.72),e(-1.43,1.72,.55,.54);break;case"herb":s(-1.93,2.45,()=>r("herbs")),s(1.06,2.25,()=>{je(n,0,0,2.25,.78,.9,"#788871"),ts(n,-.62,.96,0,.7,!0),Cn(n,.1,.96,0,.4),ts(n,.71,.96,0,.59)}),i(-.22,2.23,()=>{Te(n,0,0,2.23,.78);for(let a=0;a<4;a++)ts(n,-.79+a*.52,.88,0,.54+a*.06,!0)}),o(-1.26,.81,1.55,.88,()=>{Te(n,0,0,1.55,.88),Cn(n,-.31,.88,0,.32,"#8e9a88"),n.put("cyl",de,-.25,1.21,0,.065,.28,.065,0,0,-.52),on(n,.33,.88,.01,.2)});break}}var we=4.4,vn=4.05,De=2.85,kn=-.95,es=2.86,Vn=2.78,kh=17,ux={bakery:["#e1c6a1","#a35949","#7a8c77"],mill:["#d3c5ab","#627e80","#8c7e5e"],inn:["#e7c496","#9b574c","#567c70"],slate:["#d3c7ac","#4d7680","#758c7b"],tower:["#d9c7a4","#48667b","#8a885e"],wind:["#dbcaa5","#869066","#8c6952"],potter:["#e4c2a6","#b66f52","#788c89"],herb:["#d5d0ac","#5f8068","#9b7277"]};function ff(n,t,e,i,s,r,o){let a=document.createElement("canvas");a.width=256,a.height=384;let l=a.getContext("2d");l.fillStyle=o,l.fillRect(0,0,256,384);for(let[u,f,g]of[[4,"#584f40",5],[11,"#d4b77b",3],[18,"#d8c59b",2],[28,"#dfc797",3],[33,"#4c5f59",4]])l.strokeStyle=f,l.lineWidth=g,l.strokeRect(u,u,256-2*u,384-2*u);function c(u,f,g,_,m){l.fillStyle=m,l.beginPath(),l.moveTo(u,f-_),l.lineTo(u+g,f),l.lineTo(u,f+_),l.lineTo(u-g,f),l.fill()}for(let u=0;u<3;u++){let f=87+u*104;c(128,f,60,47,"#d2af77"),c(128,f,47,35,"#55695e"),c(128,f,29,23,"#dbc69b"),c(128,f,16,13,o);for(let g of[-1,1])c(128+g*77,f,9,13,"#d6be8e")}l.fillStyle="#fff3c719";for(let u=0;u<384;u+=3)l.fillRect(0,u,256,1);let h=new nn(a);h.colorSpace=Ce,h.anisotropy=4;let d=new ve(new En(s,r),new hn({map:h,roughness:1}));d.rotation.x=-Math.PI/2,d.position.set(t,e+.011,i),d.receiveShadow=!0,n.add(d)}function dx(n){n.group(0,0,vn-.1,Math.PI,()=>{n.put("arch",de,0,1.17,.025,1.48,2.34,.11),n.put("arch","#788979",0,1.11,.1,1.25,2.19,.07);for(let t=-2;t<=2;t++)Ut(n,t*.2,.72,.145,.012,1.38,.012,de);for(let t of[.45,1.3])n.put("box",Ie,-.32,t,.16,.47,.06,.045);n.put("ball",qe,.42,1.01,.19,.106,.11,.11)})}function pf(n,t,e,i,s,r){n.group(t,e,i,s,()=>{Ut(n,0,0,0,.86,1.02,.081,de),n.put("box",qe,0,0,.045,.78,.94,.018),n.put("box",Rn,0,0,.06,.71,.87,.012),n.beam("#758465",J(0,-.33,.072),J(.04,.31,.072),.022);for(let o=0;o<8;o++){let a=o%2?1:-1;n.put("leaf",o>5?r:"#859772",a*.094,-.22+o*.068,.08,.18,.105,.025,0,0,a*.54)}})}function fx(n,t,e,i,s,r){n.group(t,e,i,s,()=>{Ut(n,0,.78,.13,1.83,.07,.075,de);for(let o of[-1,1]){for(let a=0;a<5;a++){let l=o*(.63+a*.043);n.put("box",Pt(r,.12),l,.11,.145+.015*(a%2),.059,1.28-.045*(a%3),.065,0,0,o*.037)}n.put("box",qe,o*.72,-.06,.195,.2,.045,.037)}})}function Vh(n,t,e,i,s,r,o,a){t.group(e,i,s,r,()=>{Ut(t,0,0,0,1.57,1.53,.12,de);let l=new ve(new En(1.35,1.3),new Jn({color:16777215,toneMapped:!1}));l.position.z=.075,l.applyMatrix4(t.frame),n.scene.add(l),n.windows.push({mesh:l,side:o}),Ut(t,0,0,.095,.064,1.36,.055),Ut(t,0,0,.095,1.41,.065,.055),Ut(t,0,-.78,.05,1.78,.12,.29,yn)}),fx(t,e,i,s,r,a)}function mf(n,t,e,i,s){let r=e-s;n.put("cyl",Ie,t,e-s*.5,i,.032,s,.032),n.put("cone",qe,t,r+.12,i,.68,.28,.68),n.put("ball","#ffda98",t,r-.05,i,.31,.34,.31,0,0,0,"glow"),n.put("disk",qe,t,r-.22,i,.26,.05,.26)}function px(n,t,e){let[i,s,r]=ux[e.id],o=e.id==="wind",a=we*2,l=vn*2,c=5.18,h=6.55;function d(u,f,g){let _=Math.ceil((u-f)/.29);for(let m=0;m<_;m++){let p=f+(u-f)*(m+.5)/_;for(let M=-we,v=0;M<we-.001;v++){let x=Math.min(we,M+(v===0?1.2+m%4*.54:2.61));Ut(t,(M+x)/2,g-.065,p,x-M-.012,.13,(u-f)/_-.008,Pt("#b38a62",.12)),M=x}}}d(vn,-vn,0),d(kn,-vn,De);for(let[u,f,g,_]of[[0,-vn,0,a],[0,vn,Math.PI,a],[-we,0,Math.PI/2,l],[we,0,-Math.PI/2,l]])t.group(u,0,f,g,()=>{t.put("box",i,0,c/2,0,_,c,.15,0,0,0,"plaster");for(let m of[.08,.76,De-.11,c-.08])Ut(t,0,m,.082,_,.13,.13,de);for(let m=0;m<Math.floor(_/.27);m++)Ut(t,(m+.5)*.27-_/2,.4,.084,.257,.66,.08,Pt(r,.08));for(let m of[-_*.47,0,_*.47])Ut(t,m,c/2,.09,.15,c,.16,de)});if(o)for(let u of[-1,1])for(let f of[-1,1])t.group(u*(we-.3),0,f*(vn-.3),u===f?Math.PI/4:-Math.PI/4,()=>{t.put("box","#c0ad8b",0,c/2,0,.98,c,.25,0,0,0,"stone")});for(let u of[-1,1]){t.put("gable",i,0,c,u*vn,a,h-c,.18,0,0,0,"plaster");let f=Math.atan2(h-c,we);t.put("box","#a6845f",u*we/2,(c+h)/2,0,Math.hypot(we,h-c)+.2,.18,l+.15,0,0,-u*f,"wood")}for(let u of[-3.77,-1.35,1.12,3.78]){for(let f of[-1,1])t.beam(de,J(f*we,c-.11,u),J(0,h-.14,u),.2,.2);Ut(t,0,c-.1,u,a,.18,.18,de);for(let f of[-1,1])t.beam(Pe,J(f*(we-.15),c-.81,u),J(f*(we-.94),c-.1,u),.12)}Ut(t,0,De-.18,kn,a,.27,.19,de);for(let u=-4.15;u<Vn-.13;u+=.44)Ut(t,u,De+.43,kn,.071,.85,.08);Ut(t,(-we+Vn)/2,De+.87,kn,we+Vn,.11,.12,yn);for(let u of[-3.12,1.88])Ut(t,u,De/2,kn,.14,De,.14,de),t.beam(Pe,J(u,De-.62,kn),J(u+.46,De-.14,kn),.12);for(let u=0;u<kh;u++){let f=(u+1)*De/kh,g=(es-kn)/kh,_=es-(u+.5)*g;Ut(t,(Vn+we)/2,f-.081,_,we-Vn,.165,g+.024,yn),Ut(t,(Vn+we)/2,f-.17,_+g*.49,we-Vn,.18,.044,Pe),u%3===0&&Ut(t,Vn+.04,f+.43,_,.077,.86,.077,de)}for(let u of[Vn+.04,we-.12])t.beam(Pe,J(u,.9,es),J(u,De+.91,kn),.09,.09);t.beam(de,J(Vn+.03,-.03,es),J(Vn+.03,De-.15,kn),.14,.2),dx(t),Vh(n,t,-we+.13,1.84,2.46,Math.PI/2,"left",s),Vh(n,t,we-.13,3.6,.1,-Math.PI/2,"right",s),Vh(n,t,-.95,De+1.44,-vn+.13,0,"rear",s),pf(t,-we+.15,1.78,-2.48,Math.PI/2,s),pf(t,we-.15,1.84,2.75,-Math.PI/2,s),t.group(0,De,0,0,()=>uf(t,e,s)),n.block(-2.66,-2.5,1.32,2.12,De),n.block(-1.55,-3.32,.72,.51,De),e.id==="inn"?n.block(.12,-2.58,1.32,2.12,De):n.block(e.id==="tower"?.61:.24,-3.43,e.id==="tower"?1.65:1.25,.67,De),n.block(2.05,-3.43,.94,.64,De);for(let u of[-3.12,1.88])n.block(u,kn,.14,.14);return df(t,e.id,n.block),t.group(-2.72,0,vn-.45,Math.PI,()=>{je(t,0,0,1.72,.63,.73,r),ts(t,-.53,.8,0,.5,!0),on(t,.21,.8,0,.18),dn(t,.6,.8,-.07)}),n.block(-2.72,vn-.45,1.77,.66),t.group(1.4,0,vn-.15,Math.PI,()=>{Ut(t,0,1.71,0,1.17,.14,.11,yn);for(let u=-1;u<=1;u++)t.put("ball",qe,u*.39,1.71,.11,.093,.09,.15);t.put("box",s,-.38,1.19,.13,.31,.92,.11,0,0,-.06)}),mf(t,-.52,5.02,1.73,1.8),mf(t,1.16,De-.15,-2.04,.38),ff(n.scene,.62,0,.72,2.02,3.72,s),ff(n.scene,.24,De,-2.03,1.87,1.1,r),n}function gf(n){let t=new ms;t.background=new St("#625444");let e=[],i=[],s=(u,f,g,_,m=0)=>e.push({x:u,z:f,w:g,d:_,y:m}),r=[];t.userData.motion=r;let o={scene:t,windows:i,block:s,plot:n,animate:(u,f)=>{for(let g of r)g(u,f)}},a=new Oe(t);px(o,a,n),a.finish();let l=new bs("#f7f4ea","#ad9984",1.47),c=new gi("#ffdaa6",16,15,2);c.position.set(-.52,3.2,1.73);let h=new gi("#ffe4ba",9,11,2);h.position.set(.6,1.98,-2.24);let d=new _o("#fff0cb",65,20,1.13,.7,1.4);return d.position.set(-3.95,3.12,2.27),d.target.position.set(.3,0,-.85),d.castShadow=!0,d.shadow.mapSize.set(1024,1024),d.shadow.bias=-6e-4,d.shadow.normalBias=.012,d.shadow.camera.near=.15,t.add(l,c,h,d,d.target),o.light=u=>{l.intensity=1.47-u*.59,c.intensity=16+u*4,d.intensity=39-u*34,h.intensity=9+u*3},o.nextFloor=(u,f,g)=>{if(Math.abs(u)>we-.28||Math.abs(f)>vn-.29||n.id==="wind"&&we-Math.abs(u)+vn-Math.abs(f)<1.04)return null;let _=0;if(f<=kn)_=g>De-.34?De:0;else if(f<es&&u>Vn+.15)_=De*(es-f)/(es-kn);else if(f<es&&u>Vn-.15)return null;return Math.abs(_-g)>.27||e.some(m=>Math.abs(m.y-_)<.68&&Math.abs(u-m.x)<m.w/2+.19&&Math.abs(f-m.z)<m.d/2+.19)?null:_},o}function _f(n,t,e){let i={left:[-1,0,Math.PI/2],right:[1,0,-Math.PI/2],rear:[0,-1,0]},s=new Map,r=new He(64,1.04,.08,295);return o=>{let a=o.plot,l=n.getRenderTarget(),c=e.position.clone();try{for(let{side:h,mesh:d}of o.windows){s.has(h)||s.set(h,new Zn(256,248));let u=s.get(h),[f,g,_]=i[h],m=f*(a.w/2+.42),p=g*(a.d/2+.46);r.position.set(a.x+m*Math.cos(a.a)+p*Math.sin(a.a),a.y+(h==="left"?1.62:a.h*.78),a.z-m*Math.sin(a.a)+p*Math.cos(a.a)),r.rotation.set(-.07,a.a+_,0,"YXZ"),e.position.copy(r.position),n.setRenderTarget(u),n.render(t,r),d.material.map!==u.texture&&(d.material.map=u.texture,d.material.needsUpdate=!0)}}finally{n.setRenderTarget(l),e.position.copy(c)}}}function mx(n){let t=[],e=[],i=[],s=[];for(let c=0;c<=253;c++)for(let h=0;h<=233;h++){let d=54.25+h*.88,u=-120+c*.88,f=ce(d,u),g=$i(d,u);t.push(d,f,u),s.push(d*.38,u*.38);let _=new St("#6b8a55").lerp(new St("#a4ba73"),.49+.21*Math.sin(d*.31+u*.12)+.15*Math.cos(u*.56)+ht(-.05,.05));if(g>-.8&&g<8.5&&_.lerp(new St("#9b9980"),.66),i.push(_.r,_.g,_.b),h&&c){if(Math.abs(d-.88/2-qt.x)<21.8&&Math.abs(u-.88/2-qt.z)<19.8)continue;let m=c*234+h;e.push(m-233-2,m-1,m,m-233-2,m,m-233-1)}}li(n,t,e,i,{map:Hl()}).geometry.setAttribute("uv",new Kt(s,2))}function gx(n,t,e,i){let s=ce(t,e),r=ht(0,se);n.put("cyl",Pt("#725e49"),t,s+2.7*i,e,.43*i,5.8*i,.43*i,0,0,0,"wood");for(let o=0;o<5;o++){let a=(2.2+o*.94)*i,l=(3.85-o*.56)*i;n.put("pine",Pt(Be(["#426948","#50764d","#587d51"])),t,s+a+i*1.18,e,l,2.7*i,l,.025,r+o*.58,0,"canopy");for(let c=0;c<5;c++){let h=r+c*se/5+o*.43,d=l*.28;n.put("pine",Pt("#56784d"),t+d*Math.sin(h),s+a+.64*i,e+d*Math.cos(h),l*.53,1.54*i,l*.55,.1,h,0,"canopy")}}}function _x(n,t,e,i){let s=ce(t,e),r=ht(0,se);n.beam("#746a50",J(t,s-.1,e),J(t+.12*i,s+3.3*i,e),.46*i,.4*i,"cyl");for(let o=0;o<6;o++){let a=r+o*2.4,l=(o===5?.25:1.16)*i,c=(o===5?5.35:ht(3.85,4.85))*i,h=t+Math.sin(a)*l,d=e+Math.cos(a)*l;n.beam("#73694e",J(t+.1*i,s+2.34*i,e),J(h,s+c,d),.18*i,.18*i,"cyl"),n.put("crown",Pt(Be(["#789851","#78944d","#8da15a","#699152"])),h,s+c,d,i*2.64,i*1.85,i*2.57,.15,a,0,"canopy")}}function xx(n,t){let e=Math.ceil(xn.getLength()/.35),i=[],s=[],r=[],o=[];for(let l=0;l<=e;l++){let c=xn.getPointAt(l/e),h=xn.getTangentAt(l/e),d=1.32+.14*Math.sin(l*.06);for(let u=0;u<5;u++){let f=(u-2)*d*.49+(u===0||u===4?ht(-.07,.07):0),g=c.x+h.z*f,_=c.z-h.x*f;i.push(g,ce(g,_)+.055,_),o.push(g*.66,_*.66);let m=Pt(u===0||u===4?"#9b9a69":u===2?"#b6a17c":"#c3ac84",.062);if(s.push(m.r,m.g,m.b),u&&l){let p=l*5+u;r.push(p-6,p-1,p,p-6,p,p-5)}}if(l%3===0){let u=ht(-1.25,1.25),f=c.x+h.z*u,g=c.z-h.x*u;t.put("paver",Pt("#b6aa90"),f,ce(f,g)+.076,g,ht(.08,.31),.035,ht(.06,.17),0,ht(0,se))}}li(n,i,r,s,{map:Hl()}).geometry.setAttribute("uv",new Kt(o,2))}function yx(n,t,e,i){let s=xn.getPointAt(e),r=xn.getTangentAt(e),o=s.x-r.z*1.77,a=s.z+r.x*1.77,l=ce(o,a),c=Math.atan2(-r.x,-r.z);t.group(o,l,a,c,()=>{t.put("box","#70583d",0,.94,0,.14,1.89,.15,0,0,0,"wood"),t.put("box","#405f52",0,1.63,0,1.74,.39,.12),Ki(n,t,i,"#f5dfaa",0,1.63,.066,1.58,.31),t.group(0,1.63,-.067,Math.PI,()=>Ki(n,t,"Briarwick","#f5dfaa",0,0,0,1.42,.3))})}function xf(n){mx(n);let t=new Oe(n);xx(n,t);for(let[r,o]of[[.024,"Thornmere Castle"],[.36,"Pinewood Way"],[.73,"Castle Road"],[.967,"Thornmere Castle"]])yx(n,t,r,o);for(let r=1;r<16;r++){let o=xn.getPointAt(r/16),a=xn.getTangentAt(r/16),l=r%2?1:-1,c=o.x+l*1.82*a.z,h=o.z-l*1.82*a.x;Fh(t,c,ce(c,h),h)}t.finish();let e=new Map;function i(r,o,a){let l=Math.floor(r/5)+","+Math.floor(o/5);e.has(l)||e.set(l,[]),e.get(l).push({x:r,z:o,r:a})}for(let r=25;r<219;r+=24)for(let o=-98;o<62;o+=24){let a=new Oe(n);for(let l=0;l<33;l++){let c=r+ht(0,24),h=o+ht(0,24),d=Ds(c,h),u=$i(c,h);if(d<2.9||u<12||c<51&&d>9||c<54.25&&Math.abs(h)>49||c>qt.x-20&&c<qt.x+18&&h>qt.z+23&&h<qt.z+53&&Math.abs(c-qt.x)<9)continue;let f=ht(.87,1.65);l%3===0?_x(a,c,h,f):gx(a,c,h,f),i(c,h,f*.24+.16)}a.finish()}let s=new Oe(n);for(let r=0;r<2250;r++){let o=ht(.05,.98),a=xn.getPointAt(o),l=xn.getTangentAt(o),c=(r%2?-1:1)*ht(1.65,9),h=a.x+c*l.z,d=a.z-c*l.x,u=ce(h,d);if(!(Ds(h,d)<1.58)){if(r%8===0){s.put("leaf",Pt("#909487"),h,u+.06,d,.68,.44,.52,.1,o*8);continue}if(r%11===0){for(let f=0;f<3;f++){let g=h+f*.12;s.put("cyl","#e6d9b7",g,u+.09,d,.046,.18,.046),s.put("ball","#b86743",g,u+.18,d,.17,.09,.17)}continue}for(let f=0;f<6;f++){let g=f*2.4+r;s.put("leaf",Pt(r%3?"#708b4f":"#899f56"),h+.13*Math.sin(g),u+.15,d+.14*Math.cos(g),.105,.38,.14,.65*Math.cos(g),0,-.65*Math.sin(g))}}}return s.finish(),(r,o)=>{let a=Math.floor(r/5),l=Math.floor(o/5);for(let c=-1;c<=1;c++)for(let h=-1;h<=1;h++)for(let d of e.get(a+h+","+(l+c))||[])if((r-d.x)**2+(o-d.z)**2<d.r*d.r)return!1;return!0}}var jn="#c4b9a3",Pn="#d7c9aa",Ye="#86847e";var Mn="#c6a35d",hi="#92515a",Fo=class{constructor(t){this.root=t,this.b=new Oe(t),this.surfaces=[],this.blocks=[],this.spirals=[],this.zones=[],this.flames=[],this.flags=[]}box(t,e,i,s,r,o,a=jn,l="masonry"){this.b.put("box",a,t,e,i,s,r,o,0,0,0,l)}obstacle(t,e,i,s,r,o){this.blocks.push({x:t,z:e,w:i/2+.18,d:s/2+.18,base:r,top:o})}solid(t,e,i,s,r,o,a=jn,l="masonry"){this.box(t,e+r/2,i,s,r,o,a,l),this.obstacle(t,i,s,o,e,e+r)}slab(t,e,i,s,r,o="#b4a891",a="masonry"){e<=t||s<=i||(this.box((t+e)/2,r-.12,(i+s)/2,e-t,.24,s-i,o,a),this.surfaces.push({x1:t,x2:e,z1:i,z2:s,y:r}))}cutSlab(t,e,i,s,r,[o,a,l,c],h){this.slab(t,o,i,s,r,h),this.slab(a,e,i,s,r,h),this.slab(o,a,i,l,r,h),this.slab(o,a,c,s,r,h)}stairs(t,e,i,s,r,o,a=Pn){let l=Math.ceil(Math.abs(o-r)/.18),c=(s-i)/l;for(let h=0;h<l;h++){let d=r+(o-r)*(h+1)/l;this.box((t+e)/2,d-.105,i+(h+.5)*c,e-t,.21,Math.abs(c)+.018,a)}this.surfaces.push({x1:t,x2:e,z1:Math.min(i,s),z2:Math.max(i,s),y:r,zStart:i,slope:(o-r)/(s-i)});for(let h of[t+.015,e-.015])this.b.beam("#776c59",J(h,r-.12,i),J(h,o-.12,s),.1,.23)}wall(t,e,i,s,r,o,a=[],l=jn,c=.38){let h=(u,f,g,_)=>{if(f-u<.002||_-g<.002)return;let m=(u+f)/2;this.solid(t==="x"?m:e,g,t==="x"?e:m,t==="x"?f-u:c,_-g,t==="x"?c:f-u,l)},d=i;for(let[u,f,g=0,_=2.6]of[...a].sort((m,p)=>m[0]-p[0])){let m=u-f/2,p=u+f/2;h(d,m,r,r+o),h(m,p,r,r+g),h(m,p,r+g+_,r+o);let M=t==="x"?u:e,v=t==="x"?e:u;this.b.group(M,r+g,v,t==="x"?0:Math.PI/2,()=>{for(let x of[-1,1])this.b.put("box",Pn,x*(f/2+.04),_/2,0,.105,_,c+.09,0,0,0,"stone");this.b.put("box",Pn,0,_+.065,0,f+.24,.16,c+.14,0,0,0,"stone")}),d=p}h(d,s,r,r+o)}rail(t,e,i,s,r,o="#79694f"){let a=i-t,l=s-e,c=Math.ceil(Math.hypot(a,l)/1.35);for(let h=0;h<=c;h++)this.box(t+a*h/c,r+.49,e+l*h/c,.1,.98,.1,o,"wood");for(let h of[.48,.95])this.b.beam(o,J(t,r+h,e),J(i,r+h,s),.087);this.obstacle((t+i)/2,(e+s)/2,Math.abs(a)+.055,Math.abs(l)+.055,r,r+1)}plaque(t,e,i,s,r=0,o=1.9){this.b.group(e,i,s,r,()=>{this.box(0,0,0,o,.34,.08,"#485e58","wood"),Ki(this.root,this.b,t,"#f5dc9e",0,0,.046,o-.1,.26)})}room(t,e,i,s,r,o,a){this.zones.push({name:t,x1:e,x2:i,z1:s,z2:r,base:o,top:a})}furnishing(t,e,i,s,r,o,a=0,l=1){this.b.group(t,i,e,a,()=>o(this.b));let c=Math.abs(Math.cos(a)),h=Math.abs(Math.sin(a));this.obstacle(t,e,s*c+r*h,s*h+r*c,i,i+l)}torch(t,e,i){this.b.put("cyl","#545047",t,e-.22,i,.13,.51,.13),this.b.put("cone","#9e7950",t,e+.02,i,.28,.27,.28,0,0,Math.PI),this.b.put("leaf","#ffd07a",t,e+.27,i,.19,.43,.19,0,0,0,"glow"),this.flames.push(J(t,e+.27,i))}banner(t,e,i,s,r,o=0){this.b.group(t,e,i,o,()=>{this.box(0,0,0,s,r,.055,hi,"standard"),this.b.put("gable",hi,0,-r/2,0,s,.46,.051,0,0,Math.PI);for(let a of[-1,1])this.box(a*s*.44,0,.035,.05,r,.022,Mn,"standard");this.b.put("spire",Mn,0,.06,.052,s*.49,r*.43,.041,0,0,0),this.box(0,r/2+.05,0,s+.35,.096,.13,Mn,"standard")})}floorAt(t,e,i,s=null){let r=[];s!==null&&r.push(s);for(let a of this.surfaces)t>=a.x1&&t<=a.x2&&e>=a.z1&&e<=a.z2&&r.push(a.slope===void 0?a.y:a.y+(e-a.zStart)*a.slope);for(let a of this.spirals){let l=t-a.x,c=e-a.z,h=Math.hypot(l,c);if(h<.5||h>1.79)continue;let d=(Math.atan2(l,c)+Math.PI*2)%(Math.PI*2)/(Math.PI*2);for(let u=0;u<2;u++)r.push((u+d)*a.rise)}let o=null;for(let a of r)Math.abs(a-i)>.38||o!==null&&a<=o||this.blocks.some(l=>Math.abs(t-l.x)<l.w&&Math.abs(e-l.z)<l.d&&a+.19<l.top&&a+1.53>l.base)||(o=a);return o}location(t,e,i){let s=this.zones.find(r=>t>=r.x1&&t<=r.x2&&e>=r.z1&&e<=r.z2&&i>=r.base-.17&&i<r.top);return s?s.name:i<-6?"Dragon vault":i<-.5?"The dungeons":i>3.8?"Battlements":"Castle courtyard"}};function Zl(n,t,e,i="#708589"){Ut(n,t,.36,e,1.06,.2,1.98,de);for(let s of[-.44,.44])for(let r of[-.88,.88])Ut(n,t+s,.21,e+r,.11,.42,.11);n.put("box",Rn,t,.51,e,1.03,.15,1.93),n.put("box",i,t,.6,e+.25,1.06,.1,1.43),n.put("ball",Rn,t,.66,e-.69,.77,.19,.38),Ut(n,t,.69,e-.96,1.1,.7,.1)}function Bo(n,t,e,i=1){n.put("barrel",Pt(Pe),t,i/2,e,i*.73,i,i*.73);for(let s of[.2,.76])n.put("cyl",Ie,t,i*s,e,i*.72,.05,i*.72)}function vf(n,t,e){je(n,t,e,1.03,.61,.54,de);for(let i of[-1,1])n.put("box",qe,t+i*.36,.58,e,.07,.022,.64)}function yf(n,t,e,i,s,r,o=hi){n.box(t,r+.014,e,i,.028,s,o,"standard");for(let a of[-1,1])n.box(t+a*(i/2-.075),r+.033,e,.041,.009,s-.09,Mn,"standard");for(let a=0;a<Math.floor(s/1.6);a++)n.b.put("box",Mn,t,r+.036,e-s*.5+.85+a*1.6,.28,.01,.28,0,Math.PI/4)}function Hh(n,t,e,i,s,r,o=0){n.furnishing(t,e,i,s,.76,a=>{je(a,0,0,s,.72,.77),No(a,0,1.02,-.11,s-.09,r)},o,2.4)}function Oo(n,t,e,i,s){n.furnishing(t,e,i,1.1,2,r=>Zl(r,0,0,s))}function ns(n,t,e,i,s,r,o,a){n.wall(t,e,i,s,r,o,a.map(l=>[l,1.58]),"#c6baa2",.25)}function Mf(n,t,e,i,s,r,o,a){let l=Math.atan2(o,s/2);for(let c of[-1,1])n.b.put("box",a,t,r+o/2,e+c*s/4,i+.68,.2,Math.hypot(s/2,o)+.53,c*l,0,0,"clay");for(let c of[-1,1])n.b.put("gable",jn,t+c*i/2,r,e,s,o,.29,0,Math.PI/2,0,"masonry");for(let c=0;c<Math.ceil(i/.57);c++)n.b.put("cyl",Pt(a),t-i/2+c*.57+.25,r+o+.091,e,.19,.57,.19,0,0,Math.PI/2);for(let c of[-1,1])for(let h=1;h<8;h++){let d=h/8;n.box(t,r+o*(1-d)+.086,e+c*s*.5*d,i+.61,.055,.085,Pt(a),"clay")}}function Sf(n){n.wall("x",-4.8,-15.2,15.2,0,4.8,[[-11,1.52,1.25,1.8],[0,3.1,0,3.57],[10.5,1.62,1.12,2.16]]),n.wall("x",-16.6,-15.2,15.2,0,4.8,[[-10.9,1.27,1.35,1.8],[0,1.36,2.1,1.82],[11,1.26,1.35,2.1]]);for(let s of[-15.2,15.2])n.wall("z",s,-16.6,-4.8,0,4.8,[[-10.6,1.32,1.3,1.72]]);ns(n,"z",-6,-16.6,-4.8,0,4.8,[-9]),ns(n,"z",6,-16.6,-4.8,0,4.8,[-8]),n.cutSlab(-15.2,15.2,-16.6,-4.8,4.8,[3.58,5.83,-14.2,-5.84],"#a99980"),n.stairs(3.58,5.83,-5.84,-14.2,0,4.8),n.rail(3.59,-14.13,3.59,-5.88,4.8),n.rail(5.81,-14.1,5.81,-5.87,4.8);for(let s of[-16.6,-4.8])n.wall("x",s,-15.2,15.2,4.8,4.05,[-11,-4.3,0,4.3,11].map(r=>[r,1.32,.94,1.91]));for(let s of[-15.2,15.2])n.wall("z",s,-16.6,-4.8,4.8,4.05,[[-10.8,1.52,.98,1.95]]);ns(n,"z",-6,-16.6,-4.8,4.8,4.05,[-10.45]),ns(n,"z",6,-16.6,-4.8,4.8,4.05,[-15.13]),ns(n,"x",-13.55,-15.2,-6,4.8,4.05,[-10.1]),ns(n,"x",-9.75,6,15.2,4.8,4.05,[8.6]),ns(n,"z",12.5,-9.75,-4.8,4.8,4.05,[-6.9]),Mf(n,0,(-16.6+-4.8)/2,30.4,-4.8- -16.6,8.85,3.4,"#4e7181"),n.b.put("gable","#cfc1a5",0,8.79,-4.8+.11,7.15,3.36,.48,0,0,0,"masonry");for(let s of[-1,1])n.b.beam(Pn,J(s*3.65,8.75,-4.8+.4),J(0,12.27,-4.8+.4),.22,.3);n.b.put("disk",Mn,0,9.76,-4.8+.39,1.5,.13,1.5,Math.PI/2),n.b.put("disk","#71999e",0,9.76,-4.8+.473,1.34,.06,1.34,Math.PI/2);for(let s=0;s<8;s++){let r=s*Math.PI/4;n.b.beam(Mn,J(0,9.76,-4.8+.52),J(.62*Math.cos(r),9.76+.62*Math.sin(r),-4.8+.52),.056)}for(let s of[-14.6,-8.2,0,8.2,14.6])for(let r of[-1,1])n.b.beam(de,J(s,8.73,(-16.6+-4.8)/2+r*(-4.8- -16.6)/2),J(s,12.05,(-16.6+-4.8)/2),.19,.19);n.banner(-3.56,2.9,-4.8+.27,1.08,2.62),n.banner(3.56,2.9,-4.8+.27,1.08,2.62),n.plaque("Great Hall",0,3.94,-4.8+.25),n.room("Great hall & throne",-6,6,-16.6,-4.8,0,4.6),yf(n,0,-10.6,2.04,10.6,0),n.furnishing(0,-15.1,0,2.5,1.66,s=>{s.put("box","#aa987a",0,.13,.03,2.5,.26,1.59,0,0,0,"masonry"),Ut(s,0,.71,0,1.08,.19,.82);for(let r of[-.47,.47])Ut(s,r,.46,0,.12,.6,.67),Ut(s,r,.98,0,.13,.17,.78);Ut(s,0,1.31,-.36,1.13,1.55,.15),s.put("arch",hi,0,1.38,-.26,.89,1.29,.055);for(let r of[-.47,0,.47])s.put("spire",Mn,r,2.23,-.34,.22,.37,.22)});for(let s of[-2.54,2.54])n.banner(s,2.62,-16.33,1.42,2.74),n.torch(s*.64,2.12,-16.12);for(let s of[-14.8,-10.5,-6.28]){n.box(0,4.53,s,11.82,.28,.25,de,"wood");for(let r of[-1,1])n.b.beam(Pe,J(r*5.79,3.18,s),J(r*4.38,4.48,s),.19,.2)}n.b.put("cyl",Ie,0,4.03,-10.46,.055,.87,.055),n.b.put("ring",qe,0,3.55,-10.46,1.85,1.85,1.04,Math.PI/2);for(let s=0;s<8;s++){let r=s*Math.PI/4;dn(n.b,.93*Math.sin(r),3.55,-10.46+.93*Math.cos(r),.22)}for(let s of[-3.22,2.12])n.furnishing(s,-10.85,0,1.28,4.24,r=>{Te(r,0,0,1.15,4.24);for(let o of[-1.52,-.51,.51,1.52])Yl(r,-.16,.88,o),ql(r,.24,.88,o+.12);dn(r,.19,.88,.02);for(let o of[-1,1]){Ut(r,o*.89,.42,0,.31,.11,3.9);for(let a of[-1.6,1.6])Ut(r,o*.89,.2,a,.16,.4,.17)}});n.room("Kitchens & scullery",-15.2,-6,-16.6,-4.8,0,3.8),n.furnishing(-12.8,-15.85,0,2.4,1.25,s=>Ns(s,0,0,!0)),n.furnishing(-11.25,-10.8,0,2.8,.98,s=>{Te(s,0,0,2.8,.98),Cn(s,-.72,.87,0,.52,"#9a6b49"),Yl(s,.26,.87,0,.5),Cn(s,.89,.87,0,.36)}),ns(n,"x",-12.98,-10.35,-6,0,4.8,[-8.15]),n.wall("z",-10.35,-16.6,-12.98,0,4.8,[]),n.zones.unshift({name:"Pantry & buttery",x1:-10.35,x2:-6,z1:-16.6,z2:-12.98,base:0,top:4}),Hh(n,-8.1,-16.05,0,3.36,"pots");for(let s of[-9.68,-8.84])n.furnishing(s,-14.26,0,.7,.7,r=>Bo(r,0,0));n.room("Chapel",6,15.2,-16.6,-4.8,0,4.2);for(let s of[-9.05,-11,-12.95])for(let r of[8.46,12.93])n.furnishing(r,s,0,2.2,.52,o=>{Te(o,0,0,2.2,.51,.46),Ut(o,0,.69,.22,2.18,.43,.09)});n.furnishing(10.68,-15.45,0,2.25,.89,s=>{Te(s,0,0,2.25,.89,1);for(let r of[-.87,.87])dn(s,r,1,0,.38);on(s,0,1,0)}),yf(n,10.68,-10.55,1.45,8.4,0,"#547786"),n.room("Council chamber",-6,6,-16.6,-4.8,4.8,8.8),n.furnishing(-.9,-10.53,4.8,2.1,3.1,s=>{Te(s,0,0,2.1,3.1),on(s,-.32,.87,.55,.16),dn(s,.41,.87,-.48)});for(let s of[-11.56,-9.44])for(let r of[-2.62,.85])n.furnishing(r,s,4.8,.55,.55,o=>Uo(o,0,0),r<0?-Math.PI/2:Math.PI/2);n.room("Royal library",-15.2,-6,-13.55,-4.8,4.8,8.8);for(let s of[-11.6,-7.63])Hh(n,-14.58,s,4.8,3.35,"books",Math.PI/2);n.furnishing(-10.55,-8.9,4.8,2.25,.96,s=>{Te(s,0,0,2.25,.96),on(s,-.41,.88,0),zh(s,.38,.88,0),dn(s,.86,.88,-.2)}),n.room("Treasury",-15.2,-6,-16.6,-13.55,4.8,8.8);for(let s of[-13.65,-11.6,-8.48])n.furnishing(s,-15.63,4.8,1.16,.65,r=>{vf(r,0,0);for(let o=0;o<8;o++)r.put("disk",Mn,(o%4-.5)*.13,.62+Math.floor(o/4)*.045,0,.15,.035,.15)});n.room("Royal bedchamber",6,15.2,-16.6,-9.75,4.8,8.8),n.furnishing(12.09,-14.22,4.8,2.05,2.43,s=>{Zl(s,-.48,0,hi),Zl(s,.48,0,hi);for(let r of[-1,1])for(let o of[-1.1,1.1])Ut(s,r,1.24,o,.11,2.48,.11);s.put("box",hi,0,2.5,0,2.19,.18,2.42)}),n.room("Royal solar",6,12.5,-9.75,-4.8,4.8,8.8),n.furnishing(10.4,-6.48,4.8,1.4,.81,s=>{Te(s,0,0,1.4,.81),on(s,-.3,.87,0),ts(s,.39,.87,0,.54,!0)}),n.room("Garderobe",12.5,15.2,-9.75,-4.8,4.8,8.8),n.furnishing(14.47,-8.56,4.8,.78,1,s=>{Ut(s,0,.32,0,.78,.64,1),s.put("disk","#4b4237",0,.645,0,.32,.015,.39)})}function bf(n){for(let t of[-1,1]){let e=t<0?-19.65:12.45,i=t<0?-12.45:19.65,s=t<0?i:e,r=t<0?e:i;n.wall("z",s,-2,13.5,0,3.53,[.32,5.59,10.96].map(a=>[a,1.67])),n.wall("z",r,-2,13.5,0,3.53,[.5,5.85,11].map(a=>[a,1,.96,1.43]));for(let a of[-2,3.22,8.04,13.5])n.wall("x",a,e,i,0,3.53,[]);n.b.put("box","#647674",(e+i)/2,4.11,5.75,7.73,.2,16.1,0,0,t*.15,"clay");for(let a of[-2,3.22,8.04,13.5])n.box((e+i)/2,3.59,a,7.2,.17,.26,de,"wood");let o=t<0?["Guard barracks","Armoury","Smithy"]:["Infirmary","Servants\u2019 quarters","Stables"];for(let a=0;a<3;a++){let l=[.32,5.59,10.96][a];n.room(o[a],e,i,[-2,3.22,8.04][a],[3.22,8.04,13.5][a],0,4),n.plaque(o[a],s-t*.24,2.99,l,-t*Math.PI/2,2.13)}}for(let t of[-18.65,-16.49])Oo(n,t,.2,0,"#617781");for(let t of[16.34,18.56])Oo(n,t,.13,0,"#e1dabe");Hh(n,18.89,2.21,0,1.38,"herbs",-Math.PI/2);for(let t of[16.44,18.59])Oo(n,t,5.45,0,"#87785e");n.furnishing(-17.55,5.52,0,2.52,.74,t=>{je(t,0,0,2.52,.73,.8);for(let e=-2;e<=2;e++)t.put("arch",e%2?hi:"#577987",e*.48,1.45,0,.4,.75,.12,0,0,Math.PI),t.put("ball",qe,e*.48,1.45,.08,.11,.11,.06)}),n.furnishing(-18.49,12.26,0,1.92,1.35,t=>Ns(t,0,0),Math.PI/2),n.furnishing(-15.65,10.25,0,1.25,.69,t=>{Ut(t,0,.3,0,.74,.6,.6),t.put("box",Ie,0,.71,0,1.14,.25,.44),t.put("cone",Ie,-.65,.74,0,.35,.58,.35,0,0,Math.PI/2)});for(let t of[9.08,11.52])n.furnishing(18.25,t,0,2.2,.97,e=>{Ut(e,0,.32,0,2.2,.24,.67),e.put("box","#bda364",0,.53,0,1.97,.3,.59);for(let i of[-.91,.91])Ut(e,i,.2,0,.11,.4,.55)});for(let t of[10.38,12.9])n.solid(17.84,0,t,3.3,1.1,.13,Pe,"wood")}function Tf(n){function t(e,i,s,r,o,a){let l=(s+r)/2,c=o.length===1?[l]:[(s+l)/2,(l+r)/2],h=a>0?i:e,d=a>0?e:i;n.wall("z",h,s,r,0,3.12,c.map(u=>[u,1.47])),n.wall("z",d,s,r,0,3.12,c.map(u=>[u,.97,1.14,1.33]));for(let u of[s,r])n.wall("x",u,e,i,0,3.12,[[(e+i)/2,1.07,1.14,1.31]]);o.length>1&&n.wall("x",l,e,i,0,3.12,[]),Mf(n,(e+i)/2,l,i-e,r-s,3.12,1.58,"#797e75");for(let[u,f]of o.entries())n.room(f,e,i,u===0?s:l,u===o.length-1?r:l,0,3.1),n.plaque(f,h+a*.25,2.85,c[u],a*Math.PI/2,1.93)}t(-11.1,-5.65,5.65,13.65,["Bakehouse","Brewhouse"],1),n.furnishing(-10.32,7.35,0,1.83,1.29,e=>Ns(e,0,0,!0),Math.PI/2),n.furnishing(-7.85,8.93,0,1.65,.71,e=>{Te(e,0,0,1.65,.71);for(let i of[-.42,.09,.56])e.put("ball","#be884c",i,.98,0,.46,.22,.26)});for(let e of[10.79,12.4])n.furnishing(-9.7,e,0,1.4,1.4,i=>{Bo(i,0,0,1.65),i.put("cyl",qe,.02,.68,.67,.065,.25,.067,Math.PI/2)},0,1.67);t(3.15,9.47,-3.18,1.96,["Laundry & linen room"],-1),n.furnishing(7.63,-1.32,0,1.36,1.36,e=>{Bo(e,0,0,1.48),e.put("disk","#718d8d",0,1.47,0,1.02,.035,1.02),e.put("box",Pe,.12,1.49,.14,.4,.75,.065,.31)}),n.furnishing(5.38,-2.64,0,1.95,.71,e=>{je(e,0,0,1.95,.71,.77);for(let i=0;i<5;i++)e.put("box",i%2?Rn:"#9db1aa",0,.85+i*.07,0,.95,.075,.48)}),t(-11.15,-5.78,-3,1.72,["Guest chamber"],1),Oo(n,-9.93,-1.11,0,"#aa7d73"),n.furnishing(-7.23,-2.33,0,.86,.61,e=>{je(e,0,0,.86,.61,.64),dn(e,0,.69,0)}),n.furnishing(16.63,11.02,0,1.72,.82,e=>{let i="#8f6349";e.put("ball",i,0,1,0,1.39,.75,.59),e.put("ball",i,-.58,1.44,0,.45,.99,.43,0,0,-.27),e.put("ball",i,-.82,1.8,0,.67,.35,.31,0,0,.13);for(let s of[-1,1]){e.put("cone",i,-.62,2.04,s*.09,.11,.25,.09),e.put("ball","#292725",-.82,1.86,s*.15,.044,.046,.031);for(let r of[-.43,.48])e.beam(i,J(r,.88,s*.17),J(r+.04,.15,s*.21),.12,.13,"cyl"),e.put("box","#493e33",r+.016,.077,s*.21,.16,.15,.14)}e.beam("#544038",J(.61,1.13,0),J(.79,.49,0),.16,.19,"cyl")},.15,1.87)}function wf(n){n.cutSlab(-17,17,-13,14,-4.8,[-1.75,1.05,-10.4,3.4],"#958c7c");for(let s of[-13,14])n.wall("x",s,-17,17,-4.8,4.75,[],Ye);for(let s of[-17,17])n.wall("z",s,-13,14,-4.8,4.75,[],Ye);n.stairs(6.25,8.75,12.8,3,0,-4.8),n.stairs(-1.75,1.05,3.4,-10.4,-4.8,-10.45,Ye);for(let s of[-1.75,1.05])n.rail(s,-10.44,s,3.38,-4.8);n.plaque("Dragon vault",-.38,-1.5,3.62,0,2.05);for(let s=0;s<4;s++){let r=-9.7+s*5.64;n.wall("x",r-2.8,-17,-9,-4.8,4.5,[],Ye);for(let o=0;o<15;o++){let a=r-2.64+o*.37;Math.abs(a-r)<.76||n.solid(-8.99,-4.8,a,.087,3.15,.09,Ie,"standard")}n.box(-9,-4.8+3.1,r,.16,.15,5.53,Ie,"standard"),n.furnishing(-15.3,r,-4.8,1.02,2.02,o=>Zl(o,0,0,"#827655")),n.room("Prison cell "+(s+1),-17,-9,r-2.8,r+2.8,-4.8,-.1),n.torch(-8.7,-4.8+2.15,r+1.22)}n.wall("z",9.85,-13,14,-4.8,4.65,[[-8,1.62],[.65,1.65],[9.7,1.65]],Ye);for(let s of[-3.6,5.37])n.wall("x",s,9.85,17,-4.8,4.65,[],Ye);n.room("Royal crypt",9.85,17,-13,-3.6,-4.8,-.1);for(let s of[-10.9,-7.15])n.furnishing(14.3,s,-4.8,1.26,2.1,r=>{r.put("box","#827e78",0,.4,0,1.26,.8,2.13,0,0,0,"masonry"),r.put("paver",Pn,0,.87,0,1.4,.18,2.22)});n.room("Warden\u2019s office",9.85,17,-3.6,5.37,-4.8,-.1),n.furnishing(14.25,.12,-4.8,2.3,.85,s=>{Te(s,0,0,2.3,.85),on(s,-.4,.88,0),dn(s,.65,.88,0)}),n.room("Wine cellar",9.85,17,5.37,14,-4.8,-.1);for(let s=0;s<4;s++)for(let r=0;r<2;r++)n.furnishing(14.5+r*1.02,6.6+s*1.61,-4.8,.87,.87,o=>Bo(o,0,0,1.14));n.room("Prison galleries",-17,17,-13,14,-4.8,-.1),n.slab(-20,20,-18.5,18.5,-16,"#706b65"),n.slab(-18.9,18.9,-18.2,-10.4,-10.45,"#948d81");for(let s of[-18.5,18.5])n.wall("x",s,-20,20,-16,11.1,[],"#77736e",.64);for(let s of[-19.8,19.8])n.wall("z",s,-18.5,18.5,-16,11.1,[[-.6,2.1,0,3.12],[10.1,2.1,0,3.12]],"#77736e",.64);n.cutSlab(-20,20,-18.5,18.5,-4.8-.12,[-1.83,1.13,-10.52,3.48],"#77736e"),n.stairs(10,12.85,-10.4,2.2,-10.45,-16),n.rail(-18.8,-10.42,-1.88,-10.42,-10.45),n.rail(1.18,-10.42,9.93,-10.42,-10.45),n.rail(12.92,-10.42,18.8,-10.42,-10.45),n.room("Dragon viewing gallery",-19.7,19.7,-18.5,-10.36,-10.45,-6),n.room("Dragon vault",-20,20,-18.5,18.5,-16,-10.51);for(let s of[-16.7,16.7])for(let r of[-12,-3,6,14])n.solid(s,-16,r,1.1,8.15,1.1,"#74716e"),n.box(s,-16+.23,r,1.67,.46,1.67,Ye),n.b.beam(Ye,J(s,-16+7.7,r),J(s*.6,-16+10.85,r),.66,.79),n.torch(s-Math.sign(s)*.68,-16+3.05,r);for(let s of[-7,7])n.torch(s,-10.45+1.81,-10.68),n.box(s,-10.45+.71,-10.69,.4,1.42,.4,Ye);for(let s=0;s<240;s++){let r=s*2.4,o=.22+4*Math.sqrt(s%101/101),a=-1.9+Math.cos(r)*o,l=4+Math.sin(r)*o;n.b.put("disk",Pt(s%3?"#bb9348":"#d0ab59"),a,-16+.043+(4.4-o)*.055,l,.2,.06,.2,.04,s*.3)}for(let s of[-1,1]){let r=s<0?-30:19.8,o=s<0?-19.8:30,a=s*30;n.slab(r,o,-5.3,15.1,-16,"#81796e"),n.slab(r,o,-5.3,15.1,-16+4.3,"#7a756f"),n.wall("z",a,-5.3,15.1,-16,4.3,[],Ye);for(let l of[-5.3,4.7,15.1])n.wall("x",l,r,o,-16,4.3,l===4.7?[[(r+o)/2,1.7]]:[],Ye);n.room(s<0?"Dragon keeper\u2019s station":"Chain winch chamber",r,o,-5.3,4.7,-16,-12),n.room(s<0?"Feeding stores":"Deep hoard chamber",r,o,4.7,15.1,-16,-12);for(let l of[-.6,10.1])n.torch(s*20.45,-16+2.23,l+1.45);n.plaque(s<0?"Keeper\u2019s station":"Chain winches",s*19.42,-16+3.6,-.6,-s*Math.PI/2,2.67)}n.furnishing(-25,-1.4,-16,2.49,1.03,s=>{Te(s,0,0,2.49,1.03),on(s,-.54,.87,0),Cn(s,.05,.87,.1,.39),dn(s,.93,.87,0)}),Oo(n,-28,1.62,-16,"#667b77");for(let s=0;s<4;s++)for(let r=0;r<2;r++)n.furnishing(-27.5+r*1.45,6.5+s*1.94,-16,1,1,o=>Bo(o,0,0,1.32));for(let s of[23.3,27.24])n.furnishing(s,-.8,-16,2,1.7,r=>{for(let o of[-1,1])Ut(r,o*.8,.78,0,.29,1.56,1.02);r.put("cyl",Ie,0,1.29,0,1.02,2.18,1.02,0,0,Math.PI/2);for(let o=0;o<9;o++)r.put("ring","#968975",-.65+o*.16,1.3,0,1.07,1.07,1,0,Math.PI/2)},0,1.9);for(let s of[23,26.6])for(let r of[8.1,12.57])n.furnishing(s,r,-16,1.32,.83,o=>{vf(o,0,0);for(let a=0;a<15;a++)o.put("disk",Mn,(a%5-2)*.14,.62+Math.floor(a/5)*.035,0,.15,.05,.15)});for(let s of[-1,1])for(let r=0;r<13;r++){let o=-15+r*2.66,a=s*(18+.61*Math.sin(r*2.3));if(!(Math.min(Math.abs(o+.6),Math.abs(o-10.1))<1.9)&&(n.b.put("crown",Pt("#656b69"),a,-16+.5,o,2.31,2.39+1.4*Math.sin(r*.7),2.61,.17,r,0,"stone"),n.obstacle(a,o,1.93,1.88,-16,-16+1.87),n.b.put("cone",Pt("#777977"),a,-7,o,1.12,3.3,1.07,0,.4*r,Math.PI),r%3===0))for(let l=0;l<4;l++)n.b.put("spire","#75b7b2",a-s*.77+l*.16,-16+.56,o+l*.22,.35,1.03+l*.1,.39,0,l,.22)}for(let s of[-5,5.9,14.2])for(let r of[-1,1]){let o=J(r*16.64,-9.55,s),a=J(r*12.5,-16+9.05,s),l=J(r*6,-16+10.5,s),c=J(0,-16+10.85,s);n.b.beam(Ye,o,a,.67,.69),n.b.beam(Ye,a,l,.61,.69),n.b.beam(Ye,l,c,.55,.69)}for(let s of[-12,11.65]){n.b.put("ring",Ie,s,-14,13.75,1.05,1.05,3),n.solid(s,-16,14.17,1.26,2.91,1,Ye);for(let r=0;r<17;r++)n.b.put("ring",Ie,s+(s>0?-1:1)*r*.19,-16+.16+1.67*Math.exp(-.18*r),13.57-r*.26,.34,.49,1.08,1.15,r%2?1.19:.1)}n.obstacle(-2,3.5,3.7,7.75,-16,-16+4.2),n.obstacle(-2.1,-1.7,1.72,3.7,-16,-16+5.3)}var Fs="#86483e",Tr="#a96346",Jl="#dfc8a0",Ef="#b4825d";function Qn(n,t,e,i=12){let s=[],r=[],o=[],a=new _n(t.map(u=>J(u[0],u[1],u[2]))),l=(t.length-1)*3+1,c=null,h=null;for(let u=0;u<l;u++){let f=u/(l-1),g=a.getPoint(f),_=a.getTangent(f).normalize(),m=f*(t.length-1),p=Math.min(t.length-2,Math.floor(m)),M=m-p,v=xi.lerp(t[p][3],t[p+1][3],M),x=xi.lerp(t[p][4],t[p+1][4],M);c?h.applyQuaternion(new ke().setFromUnitVectors(c,_)).normalize():(h=J(0,1,0).cross(_),h.lengthSq()<.01&&h.set(1,0,0),h.normalize()),c=_;let A=_.clone().cross(h).normalize();for(let E=0;E<i;E++){let R=E*se/i,D=Math.sin(R),T=g.clone().addScaledVector(h,v*Math.cos(R)).addScaledVector(A,x*D);s.push(...T.toArray());let b=Pt(D<-.44&&e===Fs?Ef:e,.035);if(o.push(b.r,b.g,b.b),u){let I=u*i+E,O=u*i+(E+1)%i;r.push(I-i,O-i,I,O-i,O,I)}}}for(let u=1;u<i-1;u++){let f=(l-1)*i;r.push(0,u,u+1,f,f+u+1,f+u)}let d=li(n,s,r,o);d.castShadow=!0}function vx(n,t){let e=[[.74,3,0,.45,.45],[2.35,4.05,-.72,.34,.34],[3.9,5.65,-1.37,.25,.25],[4.57,6.36,-.87,.2,.21]],i=u=>u.map(([f,...g])=>[f*t,...g]);Qn(n,i(e),Fs);let s=J(t*4.57,6.36,-.87),r=[[7.65,4.25,.05],[7.41,2.4,2.04],[6.4,1.35,4],[4.64,1.43,5.66],[2.53,1.65,5.9],[.86,2.44,3.12]],o=([u,f,g])=>J(t*u,f,g),a=[],l=[],c=[];for(let u=0;u<r.length-1;u++){let f=o(r[u]),g=o(r[u+1]),_=f.clone().lerp(g,.5).lerp(s,.105),m=s.clone().lerp(_,.58);m.y+=.25;let p=[s,f,_,g,m],M=a.length/3;for(let[v,x]of p.entries()){a.push(...x.toArray());let A=new St(v===4?"#bc805a":v===0?"#975043":"#aa674d");l.push(A.r,A.g,A.b)}for(let v of[[0,1,4],[1,2,4],[2,3,4],[3,0,4]])c.push(...v.map(x=>M+x))}let h=a.length/3;for(let u of[s,o(r.at(-1)),J(t*.77,3.04,.08),J(t*2.35,4.08,-.7)]){a.push(...u.toArray());let f=new St("#a45c48");l.push(f.r,f.g,f.b)}c.push(h,h+1,h+3,h+1,h+2,h+3);let d=li(n,a,c,l);d.castShadow=!0;for(let u of r){let f=o(u),g=s.clone().lerp(f,.5);g.y+=.17,Qn(n,[[...s.toArray(),.115,.12],[...g.toArray(),.083,.09],[...f.toArray(),.018,.022]],Tr,7)}Qn(n,i([[4.57,6.36,-.87,.13,.13],[4.62,6.68,-1.11,.09,.1],[4.48,6.9,-1.18,.008,.008]]),Jl,8)}function Af(n){let t=new Re;t.position.set(-2,-15.98,2.8),n.add(t);let e=new Re;t.add(e);let i=new Oe(e);Qn(e,[[0,2.2,-1.7,.58,.79],[0,2.48,-.87,1.38,1.41],[0,2.38,.48,1.72,1.5],[.1,2.13,2.1,1.72,1.31],[.35,1.82,3.49,1.23,.96],[.75,1.57,4.47,.73,.64]],Fs,18),Qn(e,[[.62,1.63,3.9,.89,.75],[1.13,1.22,5.54,.73,.61],[2.32,.88,7.08,.54,.44],[4.21,.68,7.94,.38,.32],[5.98,.59,7.48,.26,.23],[6.81,.7,6.25,.16,.16],[6.7,.9,5.24,.07,.09],[6.36,1.03,4.83,.012,.014]],Fs);for(let a of[-1,1]){for(let l of[!1,!0]){let c=l?2.43:-.86;Qn(e,[[a*.98,2.44,c,.61,.64],[a*1.69,1.96,c+.28,.51,.49],[a*2.1,.92,c+.49,.36,.43],[a*1.9,.44,c-.05,.25,.27],[a*1.96,.25,c-.89,.34,.2]],Fs);for(let h=-1;h<=1;h++){let d=a*(1.96+h*.24);Qn(e,[[a*(1.96+h*.14),.27,c-.71,.15,.15],[d,.22,c-1.12,.11,.1],[d+a*h*.09,.16,c-1.45,.009,.014]],Jl,7)}}for(let l=0;l<13;l++){let c=-.71+l*.3,h=2.93-.14*Math.abs(c-1),d=a*(1.35+.17*Math.sin(l*.3));i.put("leaf",Pt(Tr,.1),d,h,c,.24,.37,.44,0,0,a*.26)}}for(let a=0;a<15;a++){let l=-1.33+a*.49,c=l<3.8?3.96-.15*Math.abs(l-.1):2.25-(l-3.8)*.58,h=l<3?.03:Math.pow(l-3,1.6)*.23;i.put("cone",Tr,h,c,l,.38,.65-a*.02,.5,-.35)}let s=new Re;s.position.set(0,2.77,-1.2),e.add(s);let r=new Oe(s);Qn(s,[[0,-.2,.3,.85,.91],[-.14,.18,-.58,.75,.82],[-.38,.76,-1.34,.62,.67],[-.39,1.4,-2.02,.55,.64],[-.23,1.61,-2.76,.58,.56]],Fs),Qn(s,[[-.26,1.64,-2.23,.53,.45],[-.22,1.72,-2.8,.82,.58],[-.17,1.58,-3.3,.74,.47],[-.12,1.38,-3.93,.44,.3],[-.08,1.35,-4.28,.41,.23]],Fs),Qn(s,[[-.2,1.28,-2.75,.57,.25],[-.15,1.17,-3.28,.57,.19],[-.09,1.12,-4.14,.36,.12]],Ef);for(let a of[-1,1]){Qn(s,[[a*.43-.24,1.98,-2.56,.27,.28],[a*.71-.24,2.4,-2.21,.21,.21],[a*.91-.24,2.75,-1.73,.13,.13],[a*.98-.24,3.04,-1.5,.01,.01]],Jl),r.put("ball","#f5ac40",a*.67-.2,1.78,-3.1,.2,.21,.29,0,a*.45,0,"glow"),r.put("ball","#262021",a*.749-.2,1.79,-3.16,.054,.155,.07),r.put("leaf",Tr,a*.59-.2,1.98,-2.99,.37,.22,.65,0,a*.3),r.put("ball","#362d2a",a*.22-.08,1.48,-4.22,.134,.086,.088);for(let l=0;l<5;l++)r.put("cone",Jl,a*(.54-l*.032)-.12,1.23,-3.12-l*.2,.08,.16-.014*l,.082,0,0,Math.PI);Qn(s,[[a*.64-.24,1.64,-2.54,.22,.24],[a*1.02-.24,1.77,-2.17,.14,.14],[a*1.32-.24,1.82,-1.95,.01,.01]],Tr)}for(let a=0;a<7;a++){let l=a/6;r.put("cone",Tr,-.14-.17*Math.sin(l*Math.PI),.79+l*1.6,-.27-l*2.03,.23,.48-l*.1,.26,-.49)}for(let a of[-1,1])for(let l=0;l<8;l++){let c=l/7;r.put("leaf",Pt("#ad674f"),a*(.71-.24*c)-.19,.29+c*1.34,-.24-c*1.95,.16,.26,.3,0,0,a*.26)}r.finish(),i.finish();let o=[-1,1].map(a=>{let l=new Re;return e.add(l),vx(l,a),l});return a=>{e.scale.y=1+.012*Math.sin(a*1.32),s.rotation.y=.14*Math.sin(a*.32),s.rotation.x=.033*Math.sin(a*.76),o.forEach((l,c)=>l.rotation.z=(c?1:-1)*.025*Math.sin(a*.71))}}function Mx(n,t,e,i){n.b.put("cyl",Mn,t,e+.63,i,.074,1.75,.074),n.b.put("ball",Mn,t,e+1.54,i,.16,.16,.16);let s=[],r=[];for(let l=0;l<=8;l++){let c=l/8;if(s.push(c*1.68,0,0,c*1.68,-.56*(1-c),0),l){let h=l*2;r.push(h-2,h-1,h+1,h-2,h+1,h)}}let o=new be;o.setAttribute("position",new Kt(s,3)),o.setIndex(r),o.computeVertexNormals();let a=new ve(o,new hn({color:hi,side:rn,roughness:1}));a.position.set(t,e+1.43,i),n.root.add(a),n.flags.push(a)}function Cf(n,t,e,i,s,r){let a=l=>s*Math.pow(1-l,1.24);for(let l=0;l<16;l++){let c=(l+.5)/16,h=a(c),d=Math.max(6,Math.ceil(2*Math.PI*h/.43)),u=Math.atan(1.24*s/r*Math.pow(1-c,.24));for(let f=0;f<d;f++){let g=(f+.5*(l%2))*se/d;n.b.group(t,e+r*c,i,g,()=>n.b.put("roofScale",Pt("#4f7281",.17),0,0,h,se*h/d*1.17,r/16/Math.cos(u)*1.13,.095,-u,0,0,"clay"))}}n.b.put("cone","#374f61",t,e+r*.49,i,1.63*s,r*.98,1.63*s),n.b.put("disk",Mn,t,e+.05,i,s*1.97,.105,s*1.97),Mx(n,t,e+r,i)}function Sx(n,t,e,i,s){let o=t-Math.sign(t)*2.55,a=t+Math.sign(t)*2.55,l=e-Math.sign(e)*2.55,c=e+Math.sign(e)*2.55,h=1.91;for(let[u,f,g,_]of[["x",l,t,!0],["x",c,t,!1],["z",o,e,!0],["z",a,e,!1]]){for(let m=0;m<2;m++){let p=_?[[g,h,0,2.57]]:[[g,.57,1.15,1.38]];n.wall(u,f,g-2.55,g+2.55,m*i,i,p,"#bfb6a2",.37)}n.wall(u,f,g-2.55,g+2.55,2*i,2.29,[[g,1.68,.73,1.34]],jn,.37);for(let m of[3.18,i-.11,2*i-.13,2*i+2.32])n.box(u==="x"?g:f,m,u==="x"?f:g,u==="x"?2.55*2+.19:.5,.2,u==="x"?.5:2.55*2+.19,Pn,"stone")}for(let u of[i,i*2])n.cutSlab(t-2.55,t+2.55,e-2.55,e+2.55,u,[t-1.57,t+1.57,e-1.57,e+1.57],"#ad9f86");n.solid(t,0,e,.56,i*2+.9,.56,Ye),n.spirals.push({x:t,z:e,rise:i});for(let u=0;u<52;u++){let f=(u+.5)*se/26,g=(u+1)*i/26;n.b.put("box",Pt(Pn,.055),t+Math.sin(f)*1.02,g-.1,e+Math.cos(f)*1.02,.443,.2,1.57,0,f,0,"masonry")}let d=i*2+2.48;n.b.put("box",Ye,t,d,e,2.55*2+.39,.33,2.55*2+.39,0,0,0,"masonry"),Cf(n,t,d+.12,e,3.86,s),n.room((e>0?"Gate":"Crown")+" tower \xB7 "+(t>0?"East":"West"),t-2.55,t+2.55,e-2.55,e+2.55,0,d)}function bx(n){for(let t of[-1,1]){let e=t*22,i=t*20,s=t>0?19.3:-22.45,r=t>0?22.45:-19.3;n.wall("z",e,-17.45,17.45,0,4.8,[],jn,.72),n.slab(s,r,-17.45,17.45,4.8),n.wall("z",e,-17.45,17.45,4.8,.7,[],Pn,.52),n.rail(t*19.4,-17.4,t*19.4,17.4,4.8),t<0?n.wall("x",i,-19.45,19.45,0,4.8,[],jn,.73):n.wall("x",i,-19.45,19.45,0,4.8,[[0,4.1,0,4.02]],jn,.82),n.slab(-19.45,19.45,t<0?-20.43:17.35,t<0?-17.35:20.43,4.8),n.wall("x",i,-19.45,19.45,4.8,.74,[],Pn,.5),n.rail(-19.45,t*17.45,19.45,t*17.45,4.8);for(let o=-17;o<=17;o+=1.5)n.box(e,5.87,o,.6,.81,.73,jn);for(let o=-18.7;o<=18.9;o+=1.46)n.box(o,5.87,i,.73,.81,.62,jn);for(let o=-15;o<16;o+=5)n.box(e+Math.sign(e)*.39,2.25,o,.42,4.5,.69,"#b5aa95"),(t<0||o!==0)&&n.box(o,2.22,i+Math.sign(i)*.37,.77,4.44,.41,"#b5aa95")}for(let t of[-22,22])for(let e of[-20,20])Sx(n,t,e,4.8,e<0?8.55:6.44)}function Tx(n){for(let t of[-1,1]){let e=t*4.7;n.wall("x",15.4,e-2.1,e+2.1,0,4.8,[[e,1.61]]);for(let r of[e-2.1,e+2.1])n.wall("z",r,15.4,20,0,4.8,[]);n.slab(e-2.1,e+2.1,15.4,20,4.8),n.furnishing(e,18.85,0,1.4,.67,r=>{Te(r,0,0,1.4,.67),on(r,-.2,.88,0),dn(r,.49,.88,0)}),n.room("Gatehouse watch room",e-2.1,e+2.1,15.4,20,0,4.6);for(let r of[e-2.1,e+2.1])n.wall("z",r,15.4,20.42,4.8,3.05,[[19.08,1.84]]);for(let r of[15.4,20.42])n.wall("x",r,e-2.1,e+2.1,4.8,3.05,[[e,1.15,.84,1.61]]);let i=e+.44,s=e+1.79;n.cutSlab(e-2.1,e+2.1,15.4,20.42,7.85,[i,s,16.2,19.22],"#a69e8c"),n.stairs(i,s,19.22,16.2,4.8,7.85);for(let r of[e-2.1,e+2.1])n.wall("z",r,15.4,20.42,7.85,2.09,[[18.26,1.74,.67,1.24]]);for(let r of[15.4,20.42])n.wall("x",r,e-2.1,e+2.1,7.85,2.09,[[e,1.64,.67,1.24]]);n.box(e,9.96,18.26,4.63,.23,4.68,Pn,"stone"),Cf(n,e,10.03,18.26,3.19,6.08),n.room("Gatehouse lookout",e-2.1,e+2.1,15.4,20.42,4.8,10),n.banner(e,3.13,20.5,1.04,2.4),n.torch(t*2.64,2.15,20.63)}for(let t=0;t<15;t++){let e=t*Math.PI/14;n.b.put("box",Pt(Pn),2.27*Math.cos(e),3.18+1.21*Math.sin(e),20.48,.37,.47,.33,0,0,e-Math.PI/2,"stone")}for(let t=-4;t<=4;t++)n.b.put("box",Ie,t*.42,3.8,19.89,.07,.75,.082);n.box(0,3.83,19.89,4.05,.065,.09,Ie,"standard"),n.plaque("Thornmere",0,5.05,20.4,0,2.45)}function wx(n,t,e){let i=[],s=[],r=[];for(let l=0;l<=96;l++){let c=l%96/96*se,h=Math.cos(c),d=Math.sin(c);for(let u of[-.35,8.35]){let f=0,g=56;for(let p=0;p<12;p++){let M=(f+g)/2;$i(qt.x+h*M,qt.z+d*M)<u?f=M:g=M}let _=h*g,m=d*g;i.push(_,-1.48,m),r.push(u<0?-.8:.8,m)}if(l){let u=2*l;s.push(u-2,u,u+1,u-2,u+1,u-1)}}let a=new be;a.setAttribute("position",new Kt(i,3)),a.setAttribute("uv",new Kt(r,2)),a.setIndex(s),n.add(new ve(a,t));for(let l=0;l<340;l++){let c=ht(-36,36),h=ht(-34,34),d=$i(qt.x+c,qt.z+h);d<1.5||d>7||Math.abs(c)<3&&h>0||(e.put("disk",Pt("#789658"),c,-1.45,h,.25,.022,.21,0,ht(0,se)),l%5===0&&e.put("leaf","#e4c8a6",c,-1.39,h,.12,.085,.13))}}function Ex(n){let t=new Re;t.position.set(0,.1,20.82),n.root.add(t);let e=new Oe(t),i=11.65;for(let a=0;a<45;a++)e.put("box",Pt("#96724e"),0,-.09,(a+.5)*i/45,3.96,.2,i/45-.015,0,0,0,"wood");for(let a of[-1.67,0,1.67])e.put("box","#6e5841",a,-.28,i/2,.27,.33,i,0,0,0,"wood");for(let a of[-1.82,1.82])for(let l=0;l<13;l++)e.put("disk",Ie,a,.021,.46+l*.88,.078,.034,.078);e.finish();let s=[];for(let a of[-1,1]){let l=J(a*2.16,4.85,20.48);n.b.put("ring",Ie,...l.toArray(),.53,.52,1.05);let c=new Re;n.root.add(c);let h=new Oe(c);for(let d=0;d<35;d++)h.put("ring",Ie,0,(d+.5)/35,0,.11,.041,.72,0,d%2*Math.PI/2);h.finish(),s.push({group:c,mount:l,side:a})}n.plaque("Bridge winch",-3.23,1.76,33.1,0,1.45);for(let a of[33,18.24])n.box(-2.72,.53,a,.46,1.06,.46,Ye),n.b.put("cyl",Pe,-2.72,1.04,a,.39,.71,.39,0,0,Math.PI/2),n.b.beam(Ie,J(-3.09,1.03,a),J(-3.09,1.34,a+.22),.07);let r=0,o=0;return{get down(){return r<.025&&o===0},action(a,l,c){return Math.abs(c)<.5&&(Math.hypot(a+2.72,l-33)<2.45&&l>32.48||Math.hypot(a+2.72,l-18.24)<2.34&&l<20)?o?"Lower drawbridge":"Raise drawbridge":""},toggle(){o=o===0?1.32:0},tick(a){r+=Math.sign(o-r)*Math.min(Math.abs(o-r),a*.7),t.rotation.x=-r;for(let{group:l,mount:c,side:h}of s){let u=J(h*1.82,.1+Math.sin(r)*(i-.32),20.82+Math.cos(r)*(i-.32)).sub(c);l.position.copy(c),l.quaternion.setFromUnitVectors(J(0,1,0),u.clone().normalize()),l.scale.y=u.length()}}}}function Rf(n,t){let e=new Re;e.position.set(qt.x,qt.y,qt.z),n.add(e);let i=new Fo(e);i.cutSlab(-24.5,24.5,-22.66,22.66,0,[6.25,8.75,3,12.8],"#b4aa95"),bx(i),Tx(i),Sf(i),bf(i),Tf(i);for(let d of[6.25,8.75])i.rail(d,3,d,12.75,0);i.rail(6.25,3,8.75,3,0);for(let d of[6.08,8.92])i.box(d,1.55,12.94,.13,3.1,.14,Pe,"wood");i.plaque("Prison & dragon vault",7.5,2.92,12.95,0,2.78);for(let[d,u]of[[-3.7,10.7],[-7.7,3.62],[10.6,-.77],[10.62,11]])i.b.put("disk","#a1957a",d,.16,u,1.32,.32,1.32),i.b.put("crown",Pt("#708953"),d,.69,u,1.22,.99,1.19,0,u,0,"canopy"),i.obstacle(d,u,1.2,1.2,0,1.2);for(let d=0;d<22;d++){let u=d*se/22;i.b.put("box",Pt(Pn),-4.8+1.03*Math.sin(u),.43,3.1+1.03*Math.cos(u),.34,.86,.24,0,u,0,"masonry")}i.b.put("disk","#384e49",-4.8,.33,3.1,1.88,.027,1.88);for(let d of[-1,1])i.box(-4.8+d*.97,1.07,3.1,.13,2.14,.17,Pe,"wood");i.b.put("cyl",Pe,-4.8,1.91,3.1,.3,2.21,.3,0,0,Math.PI/2),i.b.put("cyl","#8b7658",-4.55,1.24,3.1,.026,1.19,.026),i.b.put("barrel","#77684d",-4.55,.72,3.1,.33,.34,.33),i.obstacle(-4.8,3.1,2.26,2.26,0,1);for(let d of[-2.1,2.1])i.torch(d,2.25,-4.48);wx(e,t,i.b);let s=Ex(i);i.b.finish();let r=new Re;e.add(r);let o=new Fo(r);wf(o),o.b.finish();for(let d of["surfaces","blocks","zones"])i[d].push(...o[d]);let a=Af(r),l=[[-9,-2,1,"#ffe0a4",30],[7,-2,5,"#ffc58b",27],[-4,-8,-9,"#efba83",28],[0,-10,-3,"#ffc499",46],[9,-12,5,"#a3dbdc",55],[-9,-10,8,"#e2ad73",56]].map(([d,u,f,g,_])=>{let m=new gi(g,_,27,1.6);return m.position.set(d,u,f),r.add(m),m}),c=new gi("#ffdb9a",10,15,1.65);c.position.set(0,3.47,-10.46),e.add(c);let h=new gi("#ffcc89",12,21,1.6);return h.position.set(1.6,3.05,18),e.add(h),{bridge:s,kit:i,nearby(d,u){return Math.abs(d-qt.x)<36&&Math.abs(u-qt.z)<34},next(d,u,f,g){let _=d-qt.x,m=u-qt.z,p=$i(d,u),M=f-qt.y,v=Math.abs(_)<1.79&&m>=20.6&&m<=32.66&&s.down,A=(Math.abs(_)>24.5||Math.abs(m)>22.66)&&(p<=-.33||p>7.82)?g-qt.y:null;v&&(A=.1);let E=i.floorAt(_,m,M,A);return E===null?null:qt.y+E},area(d,u,f){let g=d-qt.x,_=u-qt.z;return Math.abs(g)>25||Math.abs(_)>23?"Thornmere Castle":i.location(g,_,f-qt.y)},tick(d,u,f,g,_){s.tick(u);let m=!g&&Math.hypot(f.x-qt.x,f.z-qt.z)<78;if(r.visible=m,c.visible=m&&f.y>qt.y-1,h.visible=c.visible&&_>.12,c.intensity=11+_*12,!!m){for(let p of l)p.visible=f.y<qt.y+2;a(d);for(let p of i.flags){let M=p.geometry.attributes.position;for(let v=0;v<=8;v++){let x=v/8,A=.22*x*Math.sin(d*2.3-x*5+p.position.x);M.setZ(v*2,A),M.setZ(v*2+1,A+.053*x)}M.needsUpdate=!0}}}}}function Ax(){let n=document.createElement("canvas");n.width=n.height=128;let t=n.getContext("2d");for(let i=0;i<1800;i++){let s=ht(0,se),r=Math.sqrt(vi()),o=.8+.1*Math.sin(s*5+.2)+.064*Math.cos(s*9);if(r>o)continue;let a=64+60*r*Math.cos(s),l=64+60*r*Math.sin(s),c=Math.round(ht(56,87)-l*.07);t.fillStyle="hsl(61, 14%, "+c+"%)",t.beginPath(),t.ellipse(a,l,ht(1.1,3.9),ht(.9,2.1),ht(-1.2,1.2),0,se),t.fill()}let e=new nn(n);return e.colorSpace=Ce,e}function Pf(n,t){let e=[],i=[];function s(o,a,l,c=!0){if(o>8&&Ds(o,a)<2.9)return;let h=ce(o,a)-.08,d=J(o,h,a),u=J(o+ht(-.23,.23)*l,h+2.2*l,a+ht(-.23,.23)*l);t.beam(Pt("#645842"),d,u,.46*l,.4*l,"cyl");for(let f=0;f<5;f++){let g=f*se/5+ht(-.35,.35),_=ht(.63,1.39)*l,m=J(u.x+Math.cos(g)*_,h+ht(3.1,4.45)*l,u.z+Math.sin(g)*_);t.beam(Pt("#6c5d44"),u.clone().lerp(d,ht(0,.34)),m,.22*l,.22*l,"cyl");let p=ht(1.8,2.7)*l,M=Be(["#698c4d","#7f9a50","#708e44","#78974f","#8ca652"]);if(t.put("crown",Pt(M,.09),m.x,m.y,m.z,p*.82,p*.57,p*.8,ht(-.24,.24),g,0,"canopy"),c)for(let v=0;v<21;v++){let x=ht(0,se),A=ht(-.62,.96),E=Math.sqrt(1-A*A),R=J(m.x+Math.cos(x)*p*.4*E,m.y+p*.31*A,m.z+Math.sin(x)*p*.4*E),D=new ke().setFromEuler(new gn(-A*.9,Math.PI/2-x,ht(-.65,.65),"YXZ")),T=p*ht(.53,.76);e.push({m:new ne().compose(R,D,J(T,T*.8,1)),c:Pt(M,.1).multiplyScalar(1.2+A*.15)})}}return i.push([o,a,l]),d}for(let[o,a,l]of[[-18,10,1.13],[13.1,5.4,1.24],[-5,-10,.93],[14.5,-13,1.06],[-23,-9,1.1],[-21,17,1.2],[18,13,1.28],[-21,-17,1],[-12,-23,1.03],[3,-23,.96],[18.3,-3,1.17]])s(o,a,l);for(let o=0;o<480;o++){let a=ht(-50,50),l=ht(-50,38);Math.abs(a)<18&&l>-17||a>-17&&a<24&&l>12||Do(a,l,3.2)||Io(a,l,2)||Math.abs(a-Bn(l))<Mi(l)+2.5||i.some(([c,h])=>(c-a)**2+(h-l)**2<13)||s(a,l,ht(.69,1.32),Math.hypot(a,l)<42)}let r=new gs(new En(1,1),new hn({map:Ax(),alphaTest:.46,side:rn,roughness:1}),e.length);e.forEach(({m:o,c:a},l)=>{r.setMatrixAt(l,o),r.setColorAt(l,a)}),r.receiveShadow=!0,n.add(r);for(let o=0;o<3100;o++){let a=ht(-35,33),l=ht(-33,33);if(Do(a,l,.5)||Io(a,l,1)||Math.abs(a-Bn(l))<Mi(l)+.32)continue;let c=ce(a,l),h=ht(.2,.89),d=Be(["#739047","#95a956","#869e59","#708848"]);if(o%4===0)t.put("crown",Pt(d),a,c+h*.21,l,h*1.3,h*.79,h,ht(-.22,.22),ht(0,se));else if(o%3===0)t.put("leaf",Pt("#a5a38c"),a,c,l,h*.84,h*.48,h,ht(-.3,.3),ht(0,6));else{let u=Be(["#eee5be","#f6d77a","#c796b0","#b39cbd","#efebcb"]);for(let f=0;f<5;f++){let g=a+ht(-.27,.27),_=l+ht(-.27,.27),m=ce(g,_),p=ht(.14,.35);t.put("box","#78914c",g,m+p*.5,_,.014,p,.014),t.put("leaf",Pt(u),g,m+p,_,.087,.07,.086)}}}for(let o=0;o<330;o++){let a=ht(-43,42),l=Bn(a)+Be([-1,1])*(Mi(a)+ht(-.52,.98)),c=ht(.18,.76);t.put("leaf",Pt(Be(["#a4a591","#959781","#9eaa86"])),l,ce(l,a)+.065,a,c*1.3,c*.75,c,ht(-.5,.5),ht(0,se))}for(let o of[[[6.9,12.1],[8.9,10],[10.2,7.2]],[[-3,8],[-5.5,7],[-6.7,5.4]],[[9.9,-5.5],[11,-8.5],[11,-12.5]],[[-18.5,-8.4],[-20,-10],[-20,-14]],[[-4.5,-4.3],[-6,-4.4],[-7,-5.8]]]){let a=null;for(let l=1;l<o.length;l++){let[c,h]=o[l-1],[d,u]=o[l],f=Math.ceil(Math.hypot(d-c,u-h)/1.65);for(let g=l===1?0:1;g<=f;g++){let _=g/f,m=c+(d-c)*_,p=h+(u-h)*_,M=ce(m,p),v=J(m,M,p);if(t.put("box",Pt("#886f4f"),m,M+.55,p,.15,1.13,.16,0,ht(-.1,.1),ht(-.05,.05)),a)for(let x of[.37,.82])t.beam(Pt("#937955"),a.clone().add(J(0,x,0)),v.clone().add(J(0,x,0)),.11,.12);a=v}}}}function Cx(n){let t=[],e=[],i=[];for(let o=0;o<27;o++)for(let a=0;a<=180;a++){let l=a%180/180*se,c=37+o*5.6,h=c*Math.cos(l),d=c*Math.sin(l),u=8+5*Math.sin(l*7+.5)+3*Math.sin(l*15+1)+2*Math.cos(l*24),f=13+6*Math.sin(l*9+2.4)+4*Math.cos(l*17),g=-4+Math.exp(-(((c-66)/13)**2))*u+Math.exp(-(((c-99)/15)**2))*f+Math.exp(-(((c-141)/17)**2))*(21+6*Math.cos(l*11)),_=Xe(32,56,h)*(1-Xe(89,111,Math.abs(d+10)));t.push(h,g-_*40,d);let m=new St("#879e72").lerp(new St("#8ca29c"),Xe(48,145,c));if(m.multiplyScalar(.93+.066*Math.sin(h*.21+d*.24)),e.push(m.r,m.g,m.b),o&&a){let p=o*181+a;i.push(p-180-2,p-1,p,p-180-2,p,p-180-1)}}li(n,t,i,e)}function Rx(){let t=new Uint8Array(65536);for(let i=0;i<t.length;i++)t[i]=vi()*255;let e=new sr(t,256,256,xr);return e.minFilter=e.magFilter=Nn,e.wrapS=e.wrapT=si,e.needsUpdate=!0,e}function If(n){Cx(n);let t={clock:{value:0},night:{value:0},dusk:{value:0},noiseMap:{value:Rx()},dayTop:{value:new St("#529ed5")},dayLow:{value:new St("#e0e9d9")}},e=new ve(new vs(190,32,20),new wn({side:sn,depthWrite:!1,uniforms:t,vertexShader:"varying vec3 dir; void main(){dir=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",fragmentShader:`varying vec3 dir;uniform sampler2D noiseMap;uniform float clock,night,dusk;uniform vec3 dayTop,dayLow;
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
      }`}));e.frustumCulled=!1,e.renderOrder=-10,n.add(e);let i=[],s=[],r=[];for(let l=0;l<=255;l++){let c=-53+l*106/255,h=Bn(c),d=Mi(c)+.95;for(let u of[-1,1])i.push(h+u*d,-.76,c),r.push(u,c);if(l){let u=l*2;s.push(u-2,u,u+1,u-2,u+1,u-1)}}let o=new be;o.setAttribute("position",new Kt(i,3)),o.setAttribute("uv",new Kt(r,2)),o.setIndex(s);let a=new ve(o,new wn({uniforms:t,side:rn,vertexShader:"varying vec2 world;varying vec2 river;void main(){world=position.xz;river=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",fragmentShader:`varying vec2 world;varying vec2 river;uniform float clock,night,dusk;uniform sampler2D noiseMap;
  void main(){vec2 p=world;float w=texture2D(noiseMap,(p*vec2(3.,14.)+vec2(clock*.6,-clock*2.))/256.).r;
  float c=sin(p.y*12.+sin(p.x*3.+clock)+clock*1.9);float spark=smoothstep(.72,.91,w)*smoothstep(.3,.96,c);
  vec3 col=mix(vec3(.066,.28,.27),vec3(.22,.54,.52),abs(river.x)*.71+w*.22);col+=spark*.34;col=mix(col,vec3(.34,.32,.24),dusk*.40);col*=1.-night*.83;
  gl_FragColor=vec4(col,1.);
  #include <colorspace_fragment>
  }`}));return n.add(a),{uniforms:t,sky:e,waterMaterial:a.material}}var fe=n=>document.getElementById(n),Px={sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/>',eye:'<path d="M2 12q10-14 20 0-10 14-20 0Z"/><circle cx="12" cy="12" r="3"/>',play:'<path d="m7 4 13 8-13 8z"/>',stop:'<rect x="5" y="5" width="14" height="14" rx="1"/>',walk:'<circle cx="14" cy="4" r="2"/><path d="m8 21 4-7 4 7m-5-7 2-7 3 4 4 1M6 13l3-4 4-2"/>',pin:'<path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z"/><circle cx="12" cy="10" r="2"/>',up:'<path d="m5 15 7-7 7 7"/>'},Df=n=>'<svg aria-hidden="true" viewBox="0 0 24 24">'+Px[n]+"</svg>";document.querySelectorAll("[data-icon]").forEach(n=>n.innerHTML=Df(n.dataset.icon));function Ix(){let n=new ms,t=new He(46,1,.08,295),e=new Ol({antialias:!0,powerPreference:"high-performance"});e.setPixelRatio(Math.min(devicePixelRatio,1.65)),e.shadowMap.enabled=!0,e.shadowMap.type=Ha,e.shadowMap.autoUpdate=!1,e.shadowMap.needsUpdate=!0,fe("view").appendChild(e.domElement);let i=e.domElement;i.setAttribute("aria-label","Briarwick village view"),i.tabIndex=0,n.fog=new jr("#dce6d7",.0125);let s=new bs("#fff4dc","#8c9b73",1.55);n.add(s);let r=new yo("#fff0ce",2.05);n.add(r),r.position.set(-24,38,19),n.add(r.target),r.castShadow=!0,r.shadow.mapSize.set(2048,2048);let o=r.shadow.camera;o.left=-33,o.right=33,o.top=34,o.bottom=-32,o.near=.5,o.far=112,r.shadow.normalBias=.035,r.shadow.bias=-22e-5;let a=If(n),l=new Oe(n);$d(n,l),lf(n,l),Qd(l),Pf(n,l),jd(n),l.finish();let c=xf(n),h=Rf(n,a.waterMaterial),d=J(11.7,11.2,36),u=J(-1.2,4.6,-1.4),f=new kl(t,i);f.enablePan=!1,f.enableDamping=!0,f.dampingFactor=.095,f.minDistance=4,f.maxDistance=53,f.minPolarAngle=.3,f.maxPolarAngle=Math.PI*.485,t.position.copy(d),f.target.copy(u),f.update();let g=document.createElement("canvas");g.width=g.height=64;let _=g.getContext("2d"),m=_.createRadialGradient(32,32,0,32,32,32);m.addColorStop(0,"white"),m.addColorStop(.35,"rgba(255,255,255,.65)"),m.addColorStop(1,"rgba(255,255,255,0)"),_.fillStyle=m,_.fillRect(0,0,64,64);let p=new nn(g),M=Wl.length*10,v=new Float32Array(M*3),x=new be;x.setAttribute("position",new en(v,3));let A=new _s({map:p,color:"#ded8cf",size:.85,transparent:!0,opacity:.27,depthWrite:!1}),E=new ar(x,A);E.frustumCulled=!1,n.add(E);let R=new be().setFromPoints(Xl),D=new _s({color:"#ffbf70",size:1.35,map:p,transparent:!0,blending:fr,depthWrite:!1});n.add(new ar(R,D));let T=Xl.map(B=>{let ut=new ve(new En(3.3,3.3),new Jn({map:p,color:"#e6ab64",blending:fr,transparent:!0,depthWrite:!1}));ut.position.set(B.x,ce(B.x,B.z)+.065,B.z);let Jt=(ce(B.x+.1,B.z)-ce(B.x-.1,B.z))/.2,ee=(ce(B.x,B.z+.1)-ce(B.x,B.z-.1))/.2;return ut.quaternion.setFromUnitVectors(J(0,0,1),J(-Jt,1,-ee).normalize()),n.add(ut),ut}),b=new Float32Array(108),I=new be;I.setAttribute("position",new en(b,3));let O=new to(I,new or({color:"#606954"}));O.frustumCulled=!1,n.add(O);function H(B){for(let ut of Uh)ut.hub.rotation[ut.axis]=B*ut.speed;for(let ut=0;ut<M;ut++){let Jt=Wl[Math.floor(ut/10)],ee=(ut%10*.1+B*.13)%1;v[ut*3]=Jt.x+ee*ee*.88+.07*Math.sin(ee*12+ut),v[ut*3+1]=Jt.y+ee*2.2,v[ut*3+2]=Jt.z+ee*.2+.07*Math.cos(ee*8+ut)}x.attributes.position.needsUpdate=!0;for(let ut=0;ut<9;ut++){let Jt=B*.048+ut*.21,ee=-1+Math.cos(Jt)*12+ut*.8,re=-24+Math.sin(Jt)*6+ut*.78,me=13+Math.sin(Jt*2.3+ut)*.58,tn=Math.sin(B*4.5+ut*2)*.13+.07;b.set([ee-.28,me+tn,re,ee,me,re+.05,ee,me,re+.05,ee+.28,me+tn,re],ut*12)}I.attributes.position.needsUpdate=!0}let Y=new St("#f2f6ff"),Z=new St("#9eb5dc"),G=new St("#8c9e73"),it=new St("#536077"),W=new St("#fff3df"),mt=new St("#ffb174"),bt=new St("#a6bee1"),Ct=new St("#d8e4d3"),Yt=new St("#ddb894"),oe=new St("#485671"),pe=new St("#3b3640"),zt=12,K=null,nt=-24;function wt(B){zt=(B%24+24)%24;for(let{hand:re,kind:me}of Nh)re.rotation.z=-se*(me==="hour"?zt/12:zt%1);let ut=1-Xe(4.6,7.45,zt)*(1-Xe(17.5,20.65,zt)),Jt=Math.max(1-Xe(0,2.6,Math.abs(zt-18.35)),1-Xe(0,2.1,Math.abs(zt-6.75)))*.89;if(a.uniforms.night.value=ut,a.uniforms.dusk.value=Jt,s.color.copy(Y).lerp(Z,ut),s.groundColor.copy(G).lerp(it,ut),s.intensity=1.55-ut*1.29,r.color.copy(W).lerp(mt,Jt).lerp(bt,ut),r.intensity=2.03-ut*1.77,Math.abs(zt-nt)>.18){let re=(zt-6)*Math.PI/12;r.position.set(r.target.position.x-23+27*Math.cos(re),r.target.position.y+15+23*Math.max(0,Math.sin(re)),r.target.position.z+19+8*Math.cos(re)),e.shadowMap.needsUpdate=!0,nt=zt}n.fog.color.copy(Ct).lerp(Yt,Jt*.8).lerp(oe,ut),n.fog.density=.012+ut*.011,Ch.emissiveIntensity=.019+ut*1.7,D.opacity=ut*.65;for(let re of T)re.material.opacity=ut*.42;A.opacity=.23-ut*.1,O.visible=ut<.6,fe("hour").value=zt;let ee=Math.floor(zt*60+.001);fe("time").textContent=String(Math.floor(ee/60)).padStart(2,"0")+":"+String(ee%60).padStart(2,"0"),fe("phase").textContent=ut>.78?"Nightfall":zt<8.2?"Dawn":zt>=17.4?"Dusk":"Daylight",document.querySelectorAll("[data-hour]").forEach(re=>re.classList.toggle("chosen",Math.abs(+re.dataset.hour-zt)<.15))}wt(12);let _t="orbit",Mt=null,jt=0,te=0,C=0,tt=null,j=null,X=new Set,$=new Map,ft={id:"castle",name:"Thornmere Castle"},ot=()=>pt(qt.x,qt.z+43,0,.12),gt=_f(e,n,a.sky),Ot=0,Vt="",w=null,y=0,N=null,k=null,et=0,q=NaN,Et=fe("doorAction"),at=fe("roomName");function Dt(B,ut,Jt,ee,re){t.position.set(B,ut,Jt),te=ee,C=re,t.rotation.set(C,te,0,"YXZ")}function Rt(){if(!w)return;let B=w.plot,ut=Po(B,1.2);w=null,le(),y=0,at.hidden=!0,at.textContent="",Et.hidden=!0,X.clear(),tt=null,Ot=Gl(ut.x,ut.z),Dt(ut.x,Ot+1.57,ut.z,B.a+Math.PI,0),e.shadowMap.needsUpdate=!0}function lt(B){$.has(B.id)||$.set(B.id,gf(B)),w=$.get(B.id),le(),y=0,at.hidden=!1,at.textContent=B.name,X.clear(),tt=null,N=null,Et.hidden=!0,Dt(0,1.57,3.54,.135,.075),q=NaN,e.shadowMap.needsUpdate=!0,i.focus({preventScroll:!0})}function xt(){if(!Et.hidden){if(Vt)h.bridge.toggle(),Bt(!1);else if(w)Rt();else if(N){let B=N;B===ft?ot():(_t!=="walk"&&Wt("walk"),lt(B))}i.focus({preventScroll:!0})}}Et.onclick=xt,Et.onpointerup=B=>{B.pointerType==="touch"&&B.isPrimary&&Et.contains(document.elementFromPoint(B.clientX,B.clientY))&&xt()};function Bt(B){let ut="";if(Vt="",_t!=="walk")N=_t==="orbit"&&!Mt?k:null,N&&(ut=N===ft?"Walk to the castle gate":"Enter "+N.name);else if(w){if(N=null,y<.15&&Math.abs(t.position.x)<.96&&t.position.z>2.36&&Math.cos(te)<-.18&&(ut="Step outside",B&&Math.abs(t.position.x)<.61&&t.position.z>3.63)){Rt();return}}else{N=null,h.nearby(t.position.x,t.position.z)&&(Vt=h.bridge.action(t.position.x-qt.x,t.position.z-qt.z,Ot-qt.y),ut=Vt);for(let Jt of ji){let ee=Po(Jt,0),re=t.position.x-ee.x,me=t.position.z-ee.z,tn=re*Math.cos(Jt.a)-me*Math.sin(Jt.a),Gn=re*Math.sin(Jt.a)+me*Math.cos(Jt.a);if(!(Math.abs(tn)>.98||Gn<-.13||Gn>1.92||Math.cos(te-Jt.a)<.12)){if(N=Jt,ut="Enter "+Jt.name,B&&Math.abs(tn)<.53&&Gn<.39){lt(Jt);return}break}}}Et.hidden=!ut,ut&&Et.lastElementChild.textContent!==ut&&(Et.lastElementChild.textContent=ut)}let Ft=new _n([d,J(-5,10,29),J(-17,10,18),J(-8,13,27),J(9,10,23),J(19,13,24),d],!1),yt=new _n([u,J(-2,4,-2),J(-1,3.6,1),J(1,4,-4),J(-1,4.2,0),J(-2,4.7,-2),u],!1);function Wt(B){Rt(),f.maxDistance=53,k=null,N=null,Vt="",Et.hidden=!0,at.hidden=!0,_t=B,f.enabled=B==="orbit",X.clear(),tt=null,Mt=null,fe("tour").setAttribute("aria-pressed",B==="tour"),fe("walk").setAttribute("aria-pressed",B==="walk"),fe("tour").querySelector("i").innerHTML=Df(B==="tour"?"stop":"play"),fe("tour").querySelector("span").textContent=B==="tour"?"Stop":"Tour",fe("pad").hidden=B!=="walk"||!matchMedia("(pointer: coarse)").matches,fe("hint").innerHTML=B==="walk"?"WASD to walk <span>\xB7</span> Drag to look":B==="tour"?"Village tour <span>\xB7</span> Esc to leave":"Drag to orbit <span>\xB7</span> Scroll to zoom"}function L(B,ut,Jt=1.15){f.update(),Mt={from:t.position.clone(),aim:f.target.clone(),pos:B,target:ut,elapsed:0,duration:Jt}}function st(B=!1){Rt(),_t==="walk"&&(j={x:t.position.x,z:t.position.z,yaw:te,pitch:C,y:Ot},f.target.copy(t.position).add(t.getWorldDirection(J(0,0,0)).multiplyScalar(6))),Wt("orbit"),B?L(d,u):f.update()}function pt(B=1.5,ut=14.1,Jt=.1,ee=.035){Wt("walk"),Ot=Gl(B,ut),t.position.set(B,Ot+1.57,ut),te=Jt,C=ee,t.rotation.order="YXZ",t.rotation.set(C,te,0),i.focus({preventScroll:!0})}fe("walk").onclick=()=>{if(At(),_t==="walk")st(!0);else if(k===ft)ot();else if(k){let B=k,ut=Po(B,1.5);pt(ut.x,ut.z,B.a,0)}else j?(pt(j.x,j.z,j.yaw,j.pitch),Ot=j.y,t.position.y=Ot+1.57):pt()},fe("tour").onclick=()=>{if(At(),_t==="tour"){st();return}K=null,Wt("tour"),jt=0,wt(12)},f.addEventListener("start",()=>{Mt=null,k=null,Bt(!1)}),fe("hour").oninput=B=>{_t==="tour"&&st(),K=null,wt(+B.target.value)},document.querySelectorAll("[data-hour]").forEach(B=>B.onclick=()=>{_t==="tour"&&st(),K=+B.dataset.hour});function At(){fe("places").setAttribute("aria-expanded","false"),fe("placeList").hidden=!0}for(let B of[{id:"home",name:"Village overlook"},...ji]){let ut=document.createElement("button");ut.type="button",ut.textContent=B.name,ut.onclick=()=>{if(At(),B.id==="home"){st(!0);return}let Jt=J(B.x,B.y+(B.id==="wind"?3.8:B.h*.58),B.z);if(_t==="walk"){let me=Po(B,1.5);pt(me.x,me.z,B.a,0),Bt(!1);return}_t!=="orbit"&&st();let ee=B.id==="wind"||B.id==="tower"?11:8.5,re=J(B.x+Math.sin(B.a+.45)*ee,B.y+4.4,B.z+Math.cos(B.a+.45)*ee);re.y=Math.max(re.y,ce(re.x,re.z)+2),k=B,L(re,Jt)},fe("placeList").append(ut)}let ct=new Map;for(let[B,ut,Jt,ee,re]of[["Woodland trail",Ih.x,Ih.z,Jd,0],["Thornmere Castle",qt.x,qt.z+41,0,.1]]){let me=document.createElement("button");me.textContent=B,me.onclick=()=>{At(),B===ft.name&&_t!=="walk"?(Wt("orbit"),f.maxDistance=100,k=ft,L(J(qt.x+25,qt.y+23,qt.z+58),J(qt.x,qt.y+4.3,qt.z+1),1.55)):pt(ut,Jt,ee,re)},ct.set(B===ft.name?"#thornmere-castle":"#woodland-trail",me.onclick),fe("placeList").append(me)}fe("places").onclick=()=>{let B=fe("placeList").hidden;fe("placeList").hidden=!B,fe("places").setAttribute("aria-expanded",B)},document.addEventListener("pointerdown",B=>{B.target.closest(".dock")||At()});let Q=fe("guide");fe("help").onclick=()=>Q.showModal(),fe("closeHelp").onclick=()=>Q.close();function Lt(){let B=document.body.classList.toggle("clean");fe("show").hidden=!B,At()}fe("hide").onclick=fe("show").onclick=Lt;let Zt=new Set(["KeyW","KeyA","KeyS","KeyD","ArrowUp","ArrowLeft","ArrowDown","ArrowRight","ShiftLeft","ShiftRight"]);window.addEventListener("keydown",B=>{if(!(Q.open||B.ctrlKey||B.altKey||B.metaKey)){if(B.code==="KeyH"&&!B.repeat){Lt();return}if(B.code==="Escape"){fe("placeList").hidden?w?Rt():_t!=="orbit"&&st(!0):At();return}if(B.code==="KeyE"&&!Et.hidden&&!B.repeat){B.preventDefault(),xt();return}_t==="walk"&&Zt.has(B.code)&&B.target.tagName!=="INPUT"&&(B.preventDefault(),X.add(B.code))}}),window.addEventListener("keyup",B=>X.delete(B.code)),window.addEventListener("blur",()=>X.clear()),i.addEventListener("pointerdown",B=>{_t==="walk"&&(tt={id:B.pointerId,x:B.clientX,y:B.clientY},i.setPointerCapture(B.pointerId))}),i.addEventListener("pointermove",B=>{tt?.id===B.pointerId&&(te-=(B.clientX-tt.x)*.004,C=xi.clamp(C-(B.clientY-tt.y)*.004,-1.22,1.24),tt.x=B.clientX,tt.y=B.clientY,t.rotation.set(C,te,0))});for(let B of["pointerup","pointercancel","lostpointercapture"])i.addEventListener(B,()=>tt=null);document.querySelectorAll("[data-key]").forEach(B=>{B.onpointerdown=ut=>{ut.preventDefault(),X.add(B.dataset.key),B.setPointerCapture(ut.pointerId)},B.onpointerup=B.onpointercancel=B.onlostpointercapture=()=>X.delete(B.dataset.key)});function xe(B){let ut=Number(X.has("KeyW")||X.has("ArrowUp"))-Number(X.has("KeyS")||X.has("ArrowDown")),Jt=Number(X.has("KeyD")||X.has("ArrowRight"))-Number(X.has("KeyA")||X.has("ArrowLeft")),ee=(X.has("ShiftLeft")||X.has("ShiftRight")?4.2:2.55)*B/Math.max(1,Math.hypot(ut,Jt)),re=t.position.x+(Jt*Math.cos(te)-ut*Math.sin(te))*ee,me=t.position.z-(ut*Math.cos(te)+Jt*Math.sin(te))*ee;if(w){let Sn=re-t.position.x,S=me-t.position.z,U=Math.max(1,Math.ceil(Math.hypot(Sn,S)/.09));for(let V=0;V<U;V++){let F=w.nextFloor(t.position.x+Sn/U,t.position.z,y);F!==null&&(t.position.x+=Sn/U,y=F),F=w.nextFloor(t.position.x,t.position.z+S/U,y),F!==null&&(t.position.z+=S/U,y=F)}t.position.y=xi.lerp(t.position.y,y+1.57,1-Math.exp(-B*18));let z=w.plot.name+(y>=2.84?" \xB7 Loft":"");at.textContent!==z&&(at.textContent=z),Bt(ut>0);return}let tn=(Sn,S)=>{let U=Gl(Sn,S);return h.nearby(Sn,S)?h.next(Sn,S,Ot,U):tf(Sn,S)&&c(Sn,S)?U:null},Gn=re-t.position.x,Le=me-t.position.z,is=Math.max(1,Math.ceil(Math.hypot(Gn,Le)/.12));for(let Sn=0;Sn<is;Sn++){if(Gn){let S=t.position.x+Gn/is,U=tn(S,t.position.z);U!==null&&(t.position.x=S,Ot=U)}if(Le){let S=t.position.z+Le/is,U=tn(t.position.x,S);U!==null&&(t.position.z=S,Ot=U)}}t.position.y=xi.lerp(t.position.y,Ot+1.57,1-Math.exp(-B*15));let Os=t.position.x,Er=t.position.z,Ar=h.nearby(Os,Er)?h.area(Os,Er,Ot):Os>16&&Ds(Os,Er)<8?"Pinewood Way":"";at.hidden=!Ar,at.textContent!==Ar&&(at.textContent=Ar),Bt(ut>0)}function le(){e.setSize(innerWidth,innerHeight),t.aspect=innerWidth/innerHeight,t.fov=w?innerWidth<innerHeight?78:68:innerWidth<innerHeight?59:46,t.updateProjectionMatrix()}window.addEventListener("resize",le),le();let Hn=()=>ct.get(location.hash)?.();window.addEventListener("hashchange",Hn),Hn();let an=0,wr=performance.now(),ui=!1;e.setAnimationLoop(B=>{let ut=Math.min(.1,Math.max(0,(B-wr)/1e3));if(wr=B,document.hidden)return;if(an+=ut,_t==="tour"){jt=(jt+ut)%48;let Le=jt/48;t.position.copy(Ft.getPoint(Le)),f.target.copy(yt.getPoint(Le)),t.lookAt(f.target);let is=Le<.47?12+2*Le:Le<.76?13+10*Xe(.47,.76,Le):23+13*Xe(.85,1,Le);wt(is)}else if(_t==="walk")Q.open||xe(ut);else if(Mt){Mt.elapsed+=ut;let Le=Xe(0,1,Mt.elapsed/Mt.duration);t.position.lerpVectors(Mt.from,Mt.pos,Le),f.target.lerpVectors(Mt.aim,Mt.target,Le),f.update(),Le>=1&&(Mt=null)}else f.update();if(_t==="orbit"){Bt(!1);let Le=ce(t.position.x,t.position.z)+.65;t.position.y<Le&&(t.position.y=Le,t.lookAt(f.target))}if(K!==null){let Le=(K-zt+36)%24-12;Math.abs(Le)<.015?(wt(K),K=null):wt(zt+Le*(1-Math.exp(-ut*4.3)))}let Jt=!w&&_t==="walk"?t.position:_t==="orbit"?f.target:u,ee=Math.round(Jt.x/14)*14,re=Math.round(Jt.z/14)*14;(r.target.position.x!==ee||r.target.position.z!==re)&&(r.position.x+=ee-r.target.position.x,r.position.z+=re-r.target.position.z,r.target.position.set(ee,0,re),e.shadowMap.needsUpdate=!0);let me=_t==="walk"&&!w&&h.nearby(t.position.x,t.position.z)?Xe(.5,4,qt.y-Ot):0,tn=a.uniforms.night.value;r.intensity=(2.03-tn*1.77)*(1-me*.94),s.intensity=(1.55-tn*1.29)*(1-me)+.69*me;let Gn=Xe(28,86,Jt.x);n.fog.density=.012-Gn*.004+tn*.011+me*.012,n.fog.color.copy(Ct).lerp(Yt,a.uniforms.dusk.value*.8).lerp(oe,tn).lerp(pe,me),h.tick(an,ut,t.position,!!w,tn),a.sky.position.copy(t.position),a.uniforms.clock.value=an,H(an),w?(w.light(a.uniforms.night.value),w.animate(an,zt),(!Number.isFinite(q)||Math.abs(q-zt)>.015&&B-et>350)&&(gt(w),q=zt,et=B,e.shadowMap.needsUpdate=!0),e.render(w.scene,t)):e.render(n,t),ui||(fe("loading").hidden=!0,ui=!0)})}try{Ix()}catch(n){console.error(n),fe("loading").textContent="The village could not open. Enable WebGL 2 or hardware acceleration in your browser and reload."}})();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2025 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
