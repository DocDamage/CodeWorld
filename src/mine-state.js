import {MINE,MINE_ROUTE_LENGTH,minePoint,mineTangent} from './mine-layout.js';
import {METALS,createForgeState,forgeSnapshot,stockCount} from './smithing.js';

const clamp=(value,min,max)=>Math.max(min,Math.min(max,Number(value)||0));
const distance=(a,x,z,y)=>Math.hypot(a.x-x,a.z-z,(a.y-y)*.45);
const veinSpecs=[
  ['iron',.035,10,1],['copper',.19,7,-1],['tin',.39,6,1],['silver',.61,4,-1],['iron',.82,7,1],
];

const cargoTotal=cargo=>METALS.reduce((total,metal)=>total+cargo[metal],0);

function cartCargo(savedCart){
  const cargo=Object.fromEntries(METALS.map(metal=>[metal,0]));
  if(savedCart?.cargo&&typeof savedCart.cargo==='object'){
    let room=MINE.capacity;
    for(const metal of METALS){
      cargo[metal]=Math.min(stockCount(savedCart.cargo[metal]),room);
      room-=cargo[metal];
    }
  }else cargo.iron=Math.min(stockCount(savedCart?.load),MINE.capacity);
  return cargo;
}

function setCartLoad(cargo,value){
  const target=Math.min(stockCount(value),MINE.capacity),current=cargoTotal(cargo);
  if(target>current)cargo.iron+=target-current;
  else if(target<current){
    let remove=current-target;
    for(const metal of [...METALS].reverse()){
      const amount=Math.min(cargo[metal],remove);
      cargo[metal]-=amount;remove-=amount;
    }
  }
}

function poseAt(progress){
  const point=minePoint(progress),tangent=mineTangent(progress);
  return {...point,yaw:Math.atan2(-tangent.x,-tangent.z),pitch:Math.atan2(tangent.y,Math.hypot(tangent.x,tangent.z))};
}

export function createMineState(saved={}){
  const delivered=stockCount(saved?.delivered);
  const savedVeins=Array.isArray(saved?.veins)?saved.veins:[];
  const veins=veinSpecs.map(([ore,progress,total,side],index)=>{
    const point=minePoint(progress),tangent=mineTangent(progress),horizontal=Math.hypot(tangent.x,tangent.z)||1;
    return {ore,progress,total,side,remaining:Math.min(stockCount(savedVeins[index]??total),total),
      x:point.x+tangent.z/horizontal*side*1.28,y:point.y+.95,z:point.z-tangent.x/horizontal*side*1.28};
  });
  const cargo=cartCargo(saved?.cart);
  const cart={
    capacity:MINE.capacity,
    progress:clamp(saved?.cart?.progress??.028,0,1),
    cargo,
    mounted:false,
    get load(){return cargoTotal(cargo);},
    set load(value){setCartLoad(cargo,value);},
    get pose(){return poseAt(this.progress);},
  };
  const forge=createForgeState(saved?.forge,delivered);
  const state={
    cart,veins,forge,delivered,
    action(x,z,y){
      const pose=cart.pose;
      if(cart.mounted)return 'Dismount';
      if(cart.progress>.992&&cart.load&&distance(pose,x,z,y)<2.8)return `Unload ${cart.load} ore at Brook Armory`;
      const vein=veins.filter(item=>item.remaining&&distance(item,x,z,y)<1.85)
        .sort((a,b)=>distance(a,x,z,y)-distance(b,x,z,y))[0];
      if(vein&&cart.load<cart.capacity&&distance(pose,vein.x,vein.z,vein.y)<5.8)return `Mine ${vein.ore} ore (${cart.load}/${cart.capacity} loaded)`;
      if(distance(pose,x,z,y)<2.45)return `Ride${cart.load?' loaded':''} ore cart`;
      return '';
    },
    perform(x,z,y){
      const label=this.action(x,z,y),pose=cart.pose;
      if(!label)return {ok:false,message:'Move closer to the railway equipment.'};
      if(label==='Dismount'){
        cart.mounted=false;
        return {ok:true,mounted:false,pose:{x:pose.x+Math.cos(pose.yaw)*1.12,y:pose.y,z:pose.z-Math.sin(pose.yaw)*1.12,yaw:pose.yaw}};
      }
      if(label.startsWith('Unload')){
        const amount=cart.load,received=[];
        for(const metal of METALS){
          if(cargo[metal])received.push(`${cargo[metal]} ${metal}`);
          forge.ore[metal]+=cargo[metal];cargo[metal]=0;
        }
        this.delivered+=amount;
        let renewed=0;
        for(const vein of veins){const before=vein.remaining;vein.remaining=Math.min(vein.total,vein.remaining+2);renewed+=vein.remaining-before;}
        const seams=renewed?` ${renewed} new seam${renewed===1?'':'s'} opened below.`:'';
        return {ok:true,amount,renewed,message:`Brook Armory received ${received.join(', ')}. Use the forge to smelt ore into bars.${seams}`};
      }
      if(label.startsWith('Mine')){
        const vein=veins.filter(item=>item.remaining&&distance(item,x,z,y)<1.85)
          .sort((a,b)=>distance(a,x,z,y)-distance(b,x,z,y))[0];
        if(!vein||cart.load>=cart.capacity)return {ok:false,message:'The cart cannot take more ore.'};
        const power=forge.tools.masterPick?3:forge.tools.ironPick?2:1;
        const amount=Math.min(power,vein.remaining,cart.capacity-cart.load);
        vein.remaining-=amount;cargo[vein.ore]+=amount;
        const tool=forge.tools.masterPick?'Master Pick':forge.tools.ironPick?'Iron Pick':'Hand pick';
        return {ok:true,amount,ore:vein.ore,message:`${tool} loaded ${amount} ${vein.ore} ore (${cart.load}/${cart.capacity}).`};
      }
      cart.mounted=true;return {ok:true,mounted:true,pose:cart.pose,message:'Ore cart ready. Drive along the rails.'};
    },
    drive(dt,forward){
      if(!cart.mounted)return cart.pose;
      const speed=cart.load?5.2:6.4;
      cart.progress=clamp(cart.progress+clamp(forward,-1,1)*Math.max(0,dt)*speed/MINE_ROUTE_LENGTH,0,1);
      return cart.pose;
    },
    dismount(){
      if(!cart.mounted)return null;
      const pose=cart.pose;cart.mounted=false;
      return {x:pose.x+Math.cos(pose.yaw)*1.12,y:pose.y,z:pose.z-Math.sin(pose.yaw)*1.12,yaw:pose.yaw};
    },
    snapshot(){return {version:2,delivered:this.delivered,cart:{progress:cart.progress,load:cart.load,cargo:{...cargo}},veins:veins.map(vein=>vein.remaining),forge:forgeSnapshot(forge)};},
  };
  return state;
}
