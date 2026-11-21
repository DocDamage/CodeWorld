import * as T from 'three';

// The brow, sockets, nasal opening and maxilla share one continuous bone face.
// A recessed backing behind the cutouts keeps the cavities dark at torchlight.
export function skullFaceGeometry(){
  const face=new T.Shape();
  face.moveTo(0,.34);
  face.bezierCurveTo(.21,.35,.30,.22,.272,.056);
  face.quadraticCurveTo(.252,-.018,.221,-.047);
  face.quadraticCurveTo(.283,-.127,.212,-.149);
  face.quadraticCurveTo(.156,-.144,.139,-.202);
  face.quadraticCurveTo(.120,-.244,0,-.238);
  face.quadraticCurveTo(-.120,-.244,-.139,-.202);
  face.quadraticCurveTo(-.156,-.144,-.212,-.149);
  face.quadraticCurveTo(-.283,-.127,-.221,-.047);
  face.quadraticCurveTo(-.252,-.018,-.272,.056);
  face.bezierCurveTo(-.30,.22,-.21,.35,0,.34);
  for(const side of [-1,1]){
    const orbit=new T.Path();
    orbit.moveTo(side*.042,.018);
    orbit.bezierCurveTo(side*.045,.093,side*.138,.117,side*.209,.090);
    orbit.bezierCurveTo(side*.247,.069,side*.209,-.032,side*.150,-.052);
    orbit.bezierCurveTo(side*.092,-.075,side*.043,-.046,side*.042,.018);
    face.holes.push(orbit);
  }
  const nose=new T.Path();nose.moveTo(0,-.048);nose.quadraticCurveTo(.019,-.063,.048,-.148);
  nose.quadraticCurveTo(.021,-.172,0,-.149);nose.quadraticCurveTo(-.021,-.172,-.048,-.148);
  nose.quadraticCurveTo(-.019,-.063,0,-.048);face.holes.push(nose);
  const geometry=new T.ExtrudeGeometry(face,{depth:.075,bevelEnabled:true,bevelThickness:.016,bevelSize:.012,bevelSegments:2,curveSegments:6});
  const p=geometry.attributes.position;
  for(let i=0;i<p.count;i++){
    const x=p.getX(i),y=p.getY(i);
    p.setZ(i,p.getZ(i)+.116-.85*x*x-.56*Math.max(0,y-.07)**2);
  }
  geometry.computeVertexNormals();return geometry;
}
