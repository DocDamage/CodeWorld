import {fieldPlan,animalPlan} from './farm-layout.js';

export const waterCapacity=8;
export const wagonCapacity=32;
export const milkingDuration=3.6;
const cropNames=fieldPlan.map(field=>field.crop);
const animalNames=animalPlan.map(animal=>animal.kind);
const stages=['fallow','tilled','growing','ripe'];
const opening=['ripe',.68,'tilled','fallow','ripe','fallow','ripe',.46,'ripe',.72,.51,'fallow'];
const durations=[63,55,38,51,64,75,55,43,56,66,52,47];
const cropYields=[12,10,8,10,9,7,10,7,6,6,5,8];
const bounded=(v,min,max,fallback=0)=>Number.isFinite(v)?Math.min(max,Math.max(min,v)):fallback;
const amounts=(keys,saved,initial=0)=>Object.fromEntries(keys.map(key=>[key,Math.floor(bounded(saved?.[key],0,99999,initial))]));
const sum=values=>Object.values(values).reduce((total,x)=>total+x,0);
const fail=reason=>({ok:false,reason});
const done=(amount=0)=>({ok:true,amount});

export function createFarmWork(load,hasBronzeSickle=()=>false){
  const saved=load?.version===1?load:null;
  const fields=Object.fromEntries(cropNames.map((crop,i)=>{
    const old=saved?.fields?.[crop],start=opening[i];
    const stage=stages.includes(old?.stage)?old.stage:typeof start==='number'?'growing':start;
    return [crop,{stage,growth:stage==='ripe'?1:stage==='growing'?bounded(old?.growth,0,.999,typeof start==='number'?start:0):0,
      moisture:bounded(old?.moisture,0,1,typeof start==='number'?.69:.10),duration:durations[i],yield:cropYields[i]}];
  }));
  const stock={seeds:amounts(cropNames,saved?.stock?.seeds,3),produce:amounts(cropNames,saved?.stock?.produce),
    wagon:amounts(cropNames,saved?.stock?.wagon),water:Math.floor(bounded(saved?.stock?.water,0,waterCapacity,waterCapacity)),
    feed:Math.floor(bounded(saved?.stock?.feed,0,99999,9)),eggs:Math.floor(bounded(saved?.stock?.eggs,0,99999)),
    milk:Math.floor(bounded(saved?.stock?.milk,0,99999))};
  const animals=Object.fromEntries(animalNames.map(kind=>[kind,{fed:bounded(saved?.animals?.[kind]?.fed,0,110,kind==='cow'?65:0)}]));
  const pails=Array.from({length:2},(_,i)=>{
    const elapsed=bounded(saved?.pails?.[i]?.elapsed,0,milkingDuration);
    return {elapsed,running:saved?.pails?.[i]?.running===true&&elapsed<milkingDuration};
  });
  let nest=Math.floor(bounded(saved?.nest,0,18,3)),eggClock=bounded(saved?.eggClock,0,17.99),version=0;
  function changed(amount){version++;return done(amount);}

  return {
    fields,stock,animals,pails,
    get revision(){return version;},get nest(){return nest;},
    get wagonLoad(){return sum(stock.wagon);},
    get harvestTotal(){return sum(stock.produce);},
    get feedGrain(){return stock.produce.corn+stock.produce.wheat+stock.produce.barley;},
    till(crop){
      const field=fields[crop];if(field?.stage!=='fallow')return fail('Only bare ground needs tilling.');
      field.stage='tilled';return changed();
    },
    plant(crop){
      const field=fields[crop];if(field?.stage!=='tilled')return fail('Prepare the soil first.');
      if(!stock.seeds[crop])return fail('This crop needs seed.');
      stock.seeds[crop]--;field.stage='growing';field.growth=0;return changed();
    },
    water(crop){
      const field=fields[crop];if(!field||field.stage!=='growing')return fail('Water a planted field.');
      if(!stock.water)return fail('Refill the watering can at the tower.');
      if(field.moisture>=.80)return fail('The soil is already wet.');
      stock.water--;field.moisture=1;return changed();
    },
    refill(){
      if(stock.water===waterCapacity)return fail('The can is full.');
      stock.water=waterCapacity;return changed();
    },
    get hasSickle(){return hasBronzeSickle();},
    harvest(crop,target='store'){
      const field=fields[crop];if(field?.stage!=='ripe')return fail('This crop is still growing.');
      if(target==='wagon'&&this.wagonLoad+field.yield>wagonCapacity)return fail('Unload the wagon at the barn.');
      const amount=field.yield+Number(target==='store'&&this.hasSickle);
      (target==='wagon'?stock.wagon:stock.produce)[crop]+=amount;
      stock.seeds[crop]++;field.stage='tilled';field.growth=0;return changed(amount);
    },
    loadWagon(){
      let amount=0,room=wagonCapacity-this.wagonLoad;
      for(const crop of cropNames){
        const n=Math.min(stock.produce[crop],room);
        stock.produce[crop]-=n;stock.wagon[crop]+=n;amount+=n;room-=n;
      }
      return amount?changed(amount):fail(room?'There is no harvest to load.':'The wagon is full.');
    },
    unloadWagon(){
      const amount=this.wagonLoad;
      if(!amount)return fail('The wagon is empty.');
      for(const crop of cropNames){stock.produce[crop]+=stock.wagon[crop];stock.wagon[crop]=0;}
      return changed(amount);
    },
    mixFeed(){
      if(this.feedGrain<3)return fail('Bring three units of corn, wheat, or barley.');
      let remaining=3;
      for(const crop of ['corn','wheat','barley']){const n=Math.min(remaining,stock.produce[crop]);stock.produce[crop]-=n;remaining-=n;}
      stock.feed+=6;return changed(6);
    },
    feed(kind){
      const animal=animals[kind];if(!animal)return fail('No trough at this location.');
      if(!stock.feed)return fail('Mix more feed at the grain bin.');
      if(animal.fed>88)return fail('That trough is full.');
      stock.feed--;animal.fed=110;return changed();
    },
    collectEggs(){
      if(!nest)return fail('The hens have not laid yet.');
      const amount=nest;stock.eggs+=amount;nest=0;return changed(amount);
    },
    milk(slot){
      const pail=pails[slot];
      if(!pail||pail.running)return fail('Milking is already in progress.');
      if(pail.elapsed>=milkingDuration){pail.elapsed=0;stock.milk++;return changed(1);}
      if(animals.cow.fed<=0)return fail('Feed the cows at their pasture trough first.');
      pail.running=true;return changed();
    },
    advanceMilking(dt){
      if(!Number.isFinite(dt)||dt<=0)return;
      for(const pail of pails)if(pail.running){
        pail.elapsed=Math.min(milkingDuration,pail.elapsed+dt);
        pail.running=pail.elapsed<milkingDuration;version++;
      }
    },
    step(dt,rain=0){
      dt=bounded(dt,0,360);if(!dt)return;
      let dirty=false;
      for(const field of Object.values(fields)){
        const age=field.growth,water=field.moisture;
        field.moisture=bounded(water+dt*(.104*bounded(rain,0,1)-.0048),0,1);
        if(field.stage==='growing'){
          const wet=bounded((Math.max(water,field.moisture)-.15)/.28,0,1);
          field.growth=Math.min(1,age+wet*dt/field.duration);
          if(field.growth>=1)field.stage='ripe';
        }
        dirty ||= field.moisture!==water||field.growth!==age;
      }
      const layingTime=Math.min(dt,animals.chicken.fed);
      if(layingTime){
        eggClock+=layingTime;
        const count=Math.floor(eggClock/18);
        nest=Math.min(18,nest+count);eggClock-=count*18;
      }
      for(const animal of Object.values(animals))if(animal.fed>0){animal.fed=Math.max(0,animal.fed-dt);dirty=true;}
      if(dirty)version++;
    },
    snapshot(){return structuredClone({version:1,fields,stock,animals,pails,nest,eggClock});}
  };
}
