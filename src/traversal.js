export function createTraversal({castle,catacomb,mine,lakeScene,farmScene,woodland,villageTreesClear,village,walkable,walkHeight,atLake}){
  function nearbySpots(x,z,max=6,step=.3){
    const points=[{x,z}];
    for(let radius=step;radius<=max+.001;radius+=step){
      const count=Math.max(12,Math.ceil(radius*Math.PI*2/step));
      for(let i=0;i<count;i++){const angle=i*Math.PI*2/count;points.push({x:x+Math.cos(angle)*radius,z:z+Math.sin(angle)*radius});}
    }
    return points;
  }
  function resolveRoomHandoff(state,room){
    if(!room)return null;
    for(const point of nearbySpots(state.x,state.z,2.4,.18)){
      const floor=room.nextFloor(point.x,point.z,state.floor);
      if(floor!==null&&Math.abs(floor-state.floor)<.03)return {...point,floor};
    }
    return null;
  }
  function resolveOutdoorHandoff(state){
    for(const point of nearbySpots(state.x,state.z)){
      const ground=walkHeight(point.x,point.z),preferred=state.floor??ground;
      let floor=null;
      if(state.domain==='castle')floor=castle.next(point.x,point.z,preferred,ground);
      else if(state.domain==='catacomb')floor=catacomb.next(point.x,point.z,preferred,ground);
      else if(state.domain==='mine')floor=mine.next(point.x,point.z,preferred,ground);
      else if(atLake(point.x,point.z))floor=walkable(point.x,point.z)&&lakeScene.clear(point.x,point.z)?ground:null;
      else floor=walkable(point.x,point.z)&&farmScene.clear(point.x,point.z)&&woodland.clear(point.x,point.z)&&villageTreesClear(point.x,point.z)&&village.walkable(point.x,point.z)?ground:null;
      if(floor!==null&&(state.floor===null||Math.abs(floor-state.floor)<.4))return {...point,floor};
    }
    return null;
  }
  function nextFloor(x,z,previousX,previousZ,previousY){
    const ground=walkHeight(x,z);
    const insideCatacomb=catacomb.at(previousX,previousZ,previousY,.7);
    const inMine=mine.nearby(previousX,previousZ)&&mine.at(previousX,previousZ,previousY,.45);
    if(mine.nearby(x,z)){
      const floor=mine.next(x,z,previousY,ground);
      if(floor!==null&&Math.abs(floor-previousY)<.32&&(inMine||insideCatacomb||Math.hypot(x-mine.yard.x,z-mine.yard.z)<5.5))return floor;
    }
    if(catacomb.nearby(x,z)){
      const floor=catacomb.next(x,z,previousY,ground);
      if(insideCatacomb||floor!==null&&Math.abs(floor-previousY)<.32)return floor;
    }
    if(inMine&&Math.abs(ground-previousY)>.5)return null;
    if(atLake(x,z))return walkable(x,z)&&lakeScene.clear(x,z)?ground:null;
    if(castle.nearby(x,z))return castle.next(x,z,previousY,ground);
    return walkable(x,z)&&farmScene.clear(x,z)&&woodland.clear(x,z)&&villageTreesClear(x,z)&&village.walkable(x,z)?ground:null;
  }
  return {nextFloor,resolveRoomHandoff,resolveOutdoorHandoff};
}
