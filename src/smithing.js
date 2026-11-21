export const METALS=Object.freeze(['iron','copper','tin','silver']);

export const RECIPES=Object.freeze([
  Object.freeze({id:'ironPick',name:'Iron Pick',cost:Object.freeze({iron:2}),description:'Mines up to 2 ore per swing.'}),
  Object.freeze({id:'bronzeSickle',name:'Bronze Sickle',cost:Object.freeze({copper:1,tin:1}),description:'Gather one extra unit of produce per hand-harvested plot.'}),
  Object.freeze({id:'masterPick',name:'Master Pick',cost:Object.freeze({iron:2,tin:1,silver:1}),description:'Mines up to 3 ore per swing.',requires:'ironPick'}),
]);

const recipeById=new Map(RECIPES.map(recipe=>[recipe.id,recipe]));
export function stockCount(value){
  const n=Number(value);
  return Number.isFinite(n)?Math.min(Number.MAX_SAFE_INTEGER,Math.max(0,Math.floor(n))):0;
}

function metalStock(source={}){
  return Object.fromEntries(METALS.map(metal=>[metal,stockCount(source?.[metal])]));
}

function toolStock(source={}){
  return Object.fromEntries(RECIPES.map(recipe=>[recipe.id,source?.[recipe.id]===true]));
}

export function createForgeState(saved,legacyDelivered=0){
  const persisted=saved&&typeof saved==='object';
  const ore=persisted?metalStock(saved.ore):metalStock({iron:legacyDelivered});
  const bars=metalStock(persisted?saved.bars:null);
  const tools=toolStock(persisted?saved.tools:null);
  const canCraft=id=>{
    const recipe=recipeById.get(id);
    return !!recipe&&!tools[id]&&(!recipe.requires||tools[recipe.requires])
      &&Object.entries(recipe.cost).every(([metal,amount])=>bars[metal]>=amount);
  };
  return {
    ore,bars,tools,canCraft,
    smelt(metal){
      if(!METALS.includes(metal))return {ok:false,message:'Choose iron, copper, tin, or silver ore to smelt.'};
      if(ore[metal]<2)return {ok:false,message:`Brook Armory needs 2 ${metal} ore to smelt a bar.`};
      ore[metal]-=2;bars[metal]++;
      return {ok:true,message:`Smelted 2 ${metal} ore into 1 ${metal} bar.`};
    },
    craft(id){
      const recipe=recipeById.get(id);
      if(!recipe)return {ok:false,message:'That tool is not available at Brook Armory.'};
      if(tools[id])return {ok:false,message:`${recipe.name} has already been forged.`};
      if(recipe.requires&&!tools[recipe.requires]){
        const required=recipeById.get(recipe.requires);
        return {ok:false,message:`Forge the ${required?.name??recipe.requires} first.`};
      }
      const missing=Object.entries(recipe.cost).filter(([metal,amount])=>bars[metal]<amount);
      if(missing.length){
        const needs=missing.map(([metal,amount])=>`${amount} ${metal} bar${amount===1?'':'s'}`).join(' and ');
        return {ok:false,message:`${recipe.name} still needs ${needs}.`};
      }
      for(const [metal,amount] of Object.entries(recipe.cost))bars[metal]-=amount;
      tools[id]=true;
      return {ok:true,message:`Forged and equipped ${recipe.name}. ${recipe.description}`};
    },
  };
}

export function forgeSnapshot(forge){
  return {ore:metalStock(forge?.ore),bars:metalStock(forge?.bars),tools:toolStock(forge?.tools)};
}
