const buttonIndices={confirm:0,back:1,interact:2,toggleWalk:3,previous:4,next:5,places:8,menu:9,up:12,down:13,left:14,right:15,dragLess:14,driveMode:15,anchor:13,scopeToggle:12};
const empty={connected:false,moveX:0,forward:0,lookX:0,lookY:0,sprint:false,zoom:0,active:false};

function stick(rawX=0,rawY=0,deadzone=.17){
  const radius=Math.hypot(rawX,rawY);
  if(radius<=deadzone)return [0,0];
  const response=(Math.min(radius,1)-deadzone)/(1-deadzone);
  return [rawX/radius*response,rawY/radius*response];
}

export function createGamepadControls(read=()=>navigator.getGamepads?.()??[]){
  let index=null,previous={},held={};
  return {
    poll(dt=0){
      let pads;
      try{pads=Array.from(read()??[]).filter(p=>p?.connected&&p.mapping==='standard');}catch{pads=[];}
      const pad=pads.find(p=>p.index===index)??pads[0];
      if(!pad){index=null;previous={};held={};return empty;}
      if(index!==pad.index){index=pad.index;previous={};held={};}
      const button=i=>pad.buttons[i]?.value??0;
      const [moveX,moveY]=stick(pad.axes[0],pad.axes[1]);
      const [lookX,lookY]=stick(pad.axes[2],pad.axes[3]);
      const state={...empty,connected:true,moveX,forward:-moveY,lookX,lookY,sprint:button(10)>.5,zoom:button(7)-button(6),
        reelHeld:!!pad.buttons[2]?.pressed||button(2)>.55,
        active:!!(moveX||moveY||lookX||lookY||pad.buttons.some(item=>item?.pressed))};
      const stickMenu={up:moveY<-.69,down:moveY>.69,left:moveX<-.75,right:moveX>.75};
      for(const [key,i] of Object.entries(buttonIndices)){
        const down=!!stickMenu[key]||!!pad.buttons[i]?.pressed||button(i)>.55;
        const repeats=i>=12&&key!=='anchor'&&key!=='dragLess'&&key!=='driveMode'&&key!=='scopeToggle';
        held[key]=down?(held[key]??0)+dt:0;
        state[key]=down&&(!previous[key]||(repeats&&held[key]>.36&&Math.floor((held[key]-.36)/.135)>Math.floor((held[key]-dt-.36)/.135)));
        previous[key]=down;
      }
      return state;
    },
    pulse(strong=.20,weak=.12,duration=80){
      try{read()?.[index]?.vibrationActuator?.playEffect('dual-rumble',{duration,strongMagnitude:strong,weakMagnitude:weak})?.catch(()=>{});}catch{}
    }
  };
}
