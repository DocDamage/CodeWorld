import {METALS,RECIPES} from './smithing.js';

const capitalize=name=>name[0].toUpperCase()+name.slice(1);
export function describeCargo(stock){
  return METALS.filter(metal=>stock[metal]>0).map(metal=>stock[metal]+' '+metal).join(', ');
}

export function buildForgePanel(dialog,forge,save){
  const result=dialog.querySelector('#smithResult'),close=dialog.querySelector('#closeSmithy');
  const table=dialog.querySelector('#smithMetals'),recipes=dialog.querySelector('#smithRecipes');
  const metalRows=[],toolRows=[];
  function element(tag,text=''){
    const node=document.createElement(tag);
    if(text)node.textContent=text;
    return node;
  }
  function actionButton(name,perform){
    const button=element('button',name);
    button.type='button';
    button.onclick=()=>{
      const action=perform();
      if(action.ok)save();
      refresh();
      result.textContent=action.message;
      if(button.disabled)focusAvailable();
    };
    return button;
  }
  for(const metal of METALS){
    const row=element('tr'),label=element('th',capitalize(metal)),ore=element('td'),bars=element('td'),action=element('td');
    label.scope='row';
    const button=actionButton('Smelt',()=>forge.smelt(metal));
    button.setAttribute('aria-label','Smelt '+metal+' bar');
    action.append(button);row.append(label,ore,bars,action);table.append(row);
    metalRows.push({metal,ore,bars,button});
  }
  for(const recipe of RECIPES){
    const row=element('div'),description=element('div'),name=element('h4',recipe.name);
    const cost=Object.entries(recipe.cost).map(([metal,n])=>n+' '+metal+' '+(n===1?'bar':'bars'));
    if(recipe.requires)cost.push(RECIPES.find(item=>item.id===recipe.requires).name);
    description.append(name,element('small',cost.join(' + ')),element('p',recipe.description));
    const button=actionButton('Forge',()=>forge.craft(recipe.id));
    button.setAttribute('aria-label','Forge '+recipe.name);
    row.className='smith-recipe';row.append(description,button);recipes.append(row);
    toolRows.push({recipe,button});
  }
  function refresh(){
    for(const {metal,ore,bars,button} of metalRows){
      ore.textContent=forge.ore[metal];bars.textContent=forge.bars[metal];button.disabled=forge.ore[metal]<2;
    }
    for(const {recipe,button} of toolRows){
      const made=forge.tools[recipe.id];
      button.disabled=!forge.canCraft(recipe.id);
      button.textContent=made?'Forged':'Forge';
      button.setAttribute('aria-label',(made?'Forged ':'Forge ')+recipe.name);
    }
  }
  function focusAvailable(){
    (dialog.querySelector('tbody button:enabled,.smith-recipe button:enabled')??close).focus({preventScroll:true});
  }
  close.onclick=()=>dialog.close();
  return {open(){
    result.textContent='';refresh();dialog.showModal();focusAvailable();
  }};
}
