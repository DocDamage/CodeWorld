import {closePlaces} from './places.js';
const el=id=>document.getElementById(id);

export function setupControllerMenu({canvas,weatherSelect,selectWeather,clearMovement,currentTime,setTime,hideUI}){
  const guide=el('guide');el('help').onclick=()=>guide.showModal();el('closeHelp').onclick=()=>guide.close();
  const controllerMenu=el('controllerMenu'),placeMenu=el('placeList'),controllerWeather=el('padWeather'),controllerHour=el('padHour');
  controllerWeather.replaceChildren(...Array.from(weatherSelect.options,option=>option.cloneNode(true)));
  controllerWeather.onchange=()=>{weatherSelect.value=controllerWeather.value;selectWeather(weatherSelect.value);};
  controllerHour.oninput=()=>setTime(+controllerHour.value);
  el('closeController').onclick=()=>controllerMenu.close();
  el('padWalk').onclick=()=>{controllerMenu.close();el('walk').click();};
  el('padTour').onclick=()=>{controllerMenu.close();el('tour').click();};
  el('padHelp').onclick=()=>{controllerMenu.close();guide.showModal();};
  el('padHud').onclick=()=>{controllerMenu.close();hideUI();};
  el('padPlaces').onclick=()=>{controllerMenu.close();openPlacesWithPad();};
  controllerMenu.addEventListener('close',()=>{if(placeMenu.hidden&&!guide.open)canvas.focus({preventScroll:true});});

  function openPlacesWithPad(){
    if(document.body.classList.contains('clean'))hideUI();
    if(placeMenu.hidden)el('places').click();
    placeMenu.querySelector('button')?.focus();
  }
  function openController(){
    closePlaces();clearMovement();
    controllerHour.value=currentTime();controllerWeather.value=weatherSelect.value;
    controllerMenu.showModal();el('padPlaces').focus();
  }
  function moveMenuFocus(root,input){
    const choices=Array.from(root.querySelectorAll('button,input,select')).filter(node=>!node.disabled&&node.getClientRects().length);
    if(!choices.length)return;
    let current=choices.indexOf(document.activeElement);
    if(input.up||input.down){
      current=current<0?0:(current+(input.up?-1:1)+choices.length)%choices.length;
      choices[current].focus();choices[current].scrollIntoView({block:'nearest'});return;
    }
    const focus=choices[current]??choices[0];
    if(input.left||input.right){
      const direction=input.left?-1:1;
      if(focus.tagName==='SELECT'){
        focus.selectedIndex=(focus.selectedIndex+direction+focus.options.length)%focus.options.length;
        focus.dispatchEvent(new Event('change',{bubbles:true}));
      }else if(focus.type==='range'){
        if(direction>0)focus.stepUp();else focus.stepDown();
        focus.dispatchEvent(new Event('input',{bubbles:true}));
      }else if(focus.type==='checkbox')focus.click();
    }
    if(input.confirm||input.interact)focus.click();
  }
  return {guide,controllerMenu,placeMenu,openPlacesWithPad,openController,moveMenuFocus};
}
