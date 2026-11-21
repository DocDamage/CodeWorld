import * as T from 'three';
import {actionIds} from './actions.js';
import {TAU,range,tint,v,label} from './model.js';
import {farmHeight,fieldAt,farmStations} from './farm-layout.js';
import {wagonCapacity} from './farm-state.js';

const {water,feed,eggs,store,troughs}=farmStations;
const near=(x,z,p,r)=>Math.hypot(x-p.x,z-p.z)<r;
const walnut='#594733',iron='#656764',oak='#776044';
const name=crop=>crop[0].toUpperCase()+crop.slice(1);

function sign(b,x,z,caption,yaw=0){
  b.group(x,farmHeight(x,z),z,yaw,()=>{
    b.put('box',walnut,0,.68,0,.076,1.36,.077,0,0,0,'wood');
    b.put('box','#594b3b',0,1.21,.038,1.28,.30,.075,0,0,0,'wood');
    label(b.root,b,caption,'#e8d9b6',0,1.213,.079,1.13,.25);
  });
}

function waterSpray(root){
  const count=57,geometry=new T.BufferGeometry(),positions=new Float32Array(count*3);
  geometry.setAttribute('position',new T.BufferAttribute(positions,3).setUsage(T.DynamicDrawUsage));
  const particles=Array.from({length:count},()=>({life:0,x:0,y:0,z:0,vx:0,vy:0,vz:0}));
  const spray=new T.Points(geometry,new T.PointsMaterial({size:.038,color:'#adcad1',transparent:true,opacity:.84,depthWrite:false}));
  spray.frustumCulled=false;spray.visible=false;root.add(spray);
  let remaining=0,cursor=0,accum=0,source;
  return {
    splash(x,z,field,yaw){
      const fx=Math.max(field.minX+.2,Math.min(field.maxX-.2,x-Math.sin(yaw)*1.1)),fz=Math.max(field.minZ+.2,Math.min(field.maxZ-.2,z-Math.cos(yaw)*1.1));
      source={x,z,fx,fz};remaining=.67;spray.visible=true;
    },
    tick(dt){
      if(!spray.visible)return;
      let alive=false;
      if(remaining>0){
        remaining-=dt;accum+=dt*79;
        while(accum>=1){
          accum--;const p=particles[cursor];cursor=(cursor+1)%count;
          const {x,z,fx,fz}=source;
          Object.assign(p,{x,y:farmHeight(x,z)+.74,z,vx:(fx-x)*1.95+range(-.58,.58),vy:range(.01,1.2),vz:(fz-z)*1.95+range(-.58,.58),life:.77});
        }
      }
      particles.forEach((p,i)=>{
        if(p.life>0){p.life-=dt;p.vy-=9.81*dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.z+=p.vz*dt;if(p.y<farmHeight(p.x,p.z))p.life=0;}
        if(p.life>0)alive=true;
        positions.set([p.x,p.life>0?p.y:-30,p.z],i*3);
      });
      geometry.attributes.position.needsUpdate=true;spray.visible=alive||remaining>0;
    }
  };
}

export function buildWorksites(root,b,work,vehicle){
  const streams=waterSpray(root),troughContents=[];
  for(const trough of troughs){
    const {x,z,kind}=trough,y=farmHeight(x,z);
    b.group(x,y,z,0,()=>{
      b.put('box','#534739',0,.16,0,1.35,.28,.49,0,0,0,'wood');
      for(const x of [-.63,.63])b.put('box',oak,x,.24,0,.10,.34,.55,0,0,0,'wood');
      for(const z of [-.215,.215])b.put('box',oak,0,.265,z,1.31,.20,.065,0,0,0,'wood');
    });
    const food=new T.Mesh(new T.BoxGeometry(1.16,.037,.35),new T.MeshStandardMaterial({color:kind==='pig'?'#79634c':'#9b8457',roughness:1}));
    food.position.set(x,y+.305,z);food.receiveShadow=true;root.add(food);troughContents.push({food,y,kind});
    sign(b,x+.82,z-.26,`${trough.name.toUpperCase()} FEED`);
  }
  b.group(feed.x,farmHeight(feed.x,feed.z),feed.z,0,()=>{
    b.put('box','#70583f',.29,.42,.11,1.14,.71,.72,0,0,0,'wood');
    b.put('box',walnut,.29,.79,.11,1.21,.063,.77,0,0,0,'wood');
    for(let i=0;i<3;i++)b.put('barrel',tint('#a6906c'),-.61,.28+i*.28,.08,.56,.35,.68,0,i*.15,.11);
    b.put('cyl',iron,.29,.87,.11,.31,.15,.31);
  });
  sign(b,feed.x+.7,feed.z-.5,'GRAIN BIN');
  b.group(water.x,farmHeight(water.x,water.z),water.z,0,()=>{
    b.put('cyl',iron,0,.45,-.27,.083,.91,.083);
    b.beam('#949389',v(0,.89,-.27),v(0,.88,.19),.07,.07,'cyl');b.put('cyl',iron,0,.821,.19,.078,.18,.078);
    b.put('ring','#867453',0,.97,-.27,.23,.23,.65,Math.PI/2);
    b.put('box',walnut,0,.041,.27,.66,.081,.55,0,0,0,'wood');
  });
  sign(b,water.x+.59,water.z-.55,'WATER');
  sign(b,store.x-.65,store.z+.66,'BARN DELIVERY',Math.PI);
  sign(b,-52.95,53.9,'FIELD EQUIPMENT',Math.PI);
  const nestEggs=[];
  b.group(eggs.x,farmHeight(eggs.x,eggs.z),eggs.z,0,()=>{
    b.put('box',walnut,0,.52,0,1.84,.125,.75,0,0,0,'wood');
    for(const x of [-.90,0,.90])b.put('box',oak,x,.70,0,.09,.44,.72,0,0,0,'wood');
    b.put('box',oak,0,.73,.34,1.86,.36,.082,0,0,0,'wood');
    for(const x of [-.80,.80])for(const z of [-.25,.25])b.put('box',walnut,x,.28,z,.09,.56,.089,0,0,0,'wood');
    for(let i=0;i<33;i++)b.put('box',tint('#aa9466'),range(-.84,.84),range(.61,.65),range(-.33,.28),.19,.012,.034,0,i*2.9);
  });
  for(let i=0;i<8;i++){
    const egg=new T.Mesh(new T.SphereGeometry(.072,14,9),new T.MeshStandardMaterial({color:i%3?'#dcc9ac':'#b99c7b',roughness:.58}));
    egg.rotation.z=range(-.65,.65);egg.scale.y=1.41;
    egg.position.set(eggs.x+(i-3.5)*.183,farmHeight(eggs.x,eggs.z)+.712,eggs.z+Math.sin(i*2.4)*.16);root.add(egg);nestEggs.push(egg);
  }
  return {
    tick(dt){
      streams.tick(dt);
      for(let i=0;i<nestEggs.length;i++)nestEggs[i].visible=i<work.nest;
      for(const {food,y,kind} of troughContents){food.visible=work.animals[kind].fed>0;food.position.y=y+.19+work.animals[kind].fed/110*.115;}
    },
    fieldAction(x,z,yaw){
      const field=fieldAt(x,z,.83);if(!field)return null;
      const crop=field.crop,status=work.fields[crop];
      if(status.stage==='ripe')return {id:actionIds.farm.fieldHarvest,objectId:`farm:field:${crop}`,label:work.hasSickle?`Reap ${crop} with bronze sickle`:`Harvest ${crop}`,perform:()=>{
        const result=work.harvest(crop);return result.ok?`Stored ${result.amount} ${crop}.`:result.reason;
      }};
      if(status.stage==='fallow')return {id:actionIds.farm.fieldTill,objectId:`farm:field:${crop}`,label:`Till the ${crop} plot`,perform:()=>{work.till(crop);return `${name(crop)} plot prepared.`;}};
      if(status.stage==='tilled')return {id:actionIds.farm.fieldPlant,objectId:`farm:field:${crop}`,label:`Plant ${crop}`,perform:()=>{
        const result=work.plant(crop);return result.ok?`Planted ${crop}. Water the rows or wait for rain.`:result.reason;
      }};
      if(status.moisture<.68)return {id:actionIds.farm.fieldWater,objectId:`farm:field:${crop}`,label:`Water ${crop}`,perform:()=>{
        const result=work.water(crop);if(result.ok)streams.splash(x,z,field,yaw);return result.ok?`Watered ${crop}.`:result.reason;
      }};
      return null;
    },
    stationAction(x,z){
      if(near(x,z,water,1.38))return {id:actionIds.farm.waterRefill,objectId:'farm:station:water',label:'Refill the watering can',perform:()=>work.refill().ok?'Watering can refilled.':'The watering can is full.'};
      if(near(x,z,feed,1.40))return {id:actionIds.farm.feedMix,objectId:'farm:station:feed',label:'Mix animal feed',perform:()=>{const m=work.mixFeed();return m.ok?`Mixed ${m.amount} feed rations.`:m.reason;}};
      if(near(x,z,eggs,1.47))return {id:actionIds.farm.eggsCollect,objectId:'farm:station:eggs',label:'Collect eggs',perform:()=>{const m=work.collectEggs();return m.ok?`Collected ${m.amount} ${m.amount===1?'egg':'eggs'}.`:m.reason;}};
      for(const trough of troughs)if(near(x,z,trough,1.35))return {id:actionIds.farm.animalFeed,objectId:`farm:trough:${trough.kind}`,label:`Feed the ${trough.name}`,perform:()=>{
        const result=work.feed(trough.kind);return result.ok?`Filled the ${trough.name}' trough.`:result.reason;
      }};
      if(vehicle.nearWagon(x,z)){
        if(near(vehicle.wagon.x,vehicle.wagon.z,store,5.0)&&work.wagonLoad)return {id:actionIds.farm.wagonUnload,objectId:'farm:wagon',label:'Unload the hay wagon',perform:()=>`Stored ${work.unloadWagon().amount} units from the wagon.`};
        return {id:actionIds.farm.wagonLoad,objectId:'farm:wagon',label:'Load harvest onto the wagon',perform:()=>{const m=work.loadWagon();return m.ok?`Loaded ${m.amount} units onto the wagon.`:m.reason;}};
      }
      return null;
    },
    driverAction(){
      const {x,z}=vehicle.pose,field=fieldAt(x,z);
      if(vehicle.hitched){
        if(near(x,z,store,6.5)&&work.wagonLoad)return {id:actionIds.farm.wagonUnload,objectId:'farm:wagon',label:'Unload the wagon at the barn',perform:()=>`Stored ${work.unloadWagon().amount} units from the wagon.`};
        if(field&&work.fields[field.crop].stage==='ripe')return {id:actionIds.farm.fieldHarvest,objectId:`farm:field:${field.crop}`,label:`Harvest ${field.crop} into the wagon`,perform:()=>{
          const result=work.harvest(field.crop,'wagon');return result.ok?`Loaded ${result.amount} ${field.crop}.`:result.reason;
        }};
        return null;
      }
      return {id:actionIds.farm.plowToggle,objectId:'farm:tractor',label:vehicle.plowing?'Raise the plow':'Lower the plow',perform:()=>{
        const lowered=vehicle.togglePlow();
        return lowered===null?'Clear the area behind the tractor before lowering the plow.':lowered?'Plow lowered. Drive across an unprepared plot.':'Plow raised.';
      }};
    },
    description(x,z){
      const where=vehicle.mounted?vehicle.pose:{x,z},field=fieldAt(where.x,where.z,.83);
      if(field){
        const state=work.fields[field.crop],moisture=Math.round(state.moisture*100);
        const stage=({fallow:'Bare soil',tilled:'Ready to plant',growing:`Growing ${Math.floor(state.growth*100)}%`,ripe:'Ready to harvest'})[state.stage];
        return {title:name(field.crop),text:`${stage} · Moisture ${moisture}% · Seeds ${work.stock.seeds[field.crop]}`};
      }
      if(vehicle.mounted)return {title:'Farm tractor',text:vehicle.hitched?`Wagon ${work.wagonLoad} / ${wagonCapacity} · Drive to the barn to unload`:
        vehicle.plowing?'Plow lowered · Cross an unprepared field':'Plow raised'};
      const trough=troughs.find(t=>near(x,z,t,2.1));
      if(trough)return {title:`${name(trough.name)}' trough`,text:work.animals[trough.kind].fed>0?'The animals are fed.':'The trough needs feed.'};
      if(near(x,z,eggs,2.0))return {title:'Hen house',text:`Eggs in the nests ${work.nest}`};
      if(near(x,z,feed,2.0))return {title:'Grain bin',text:'Mix new feed from three units of corn, wheat, or barley.'};
      return {title:'Farm supplies',text:'Walk to a field sign, an animal trough, or the tractor.'};
    }
  };
}
