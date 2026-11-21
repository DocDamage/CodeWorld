export const weatherPresets={
  clear:{label:'Clear',cloud:.20,rain:0,snow:0,mist:.12,wind:.32,storm:0},
  overcast:{label:'Overcast',cloud:.75,rain:0,snow:0,mist:.27,wind:.57,storm:0},
  rain:{label:'Rain',cloud:.86,rain:.62,snow:0,mist:.39,wind:.68,storm:0},
  storm:{label:'Thunderstorm',cloud:1,rain:1,snow:0,mist:.54,wind:1,storm:1},
  fog:{label:'Valley fog',cloud:.68,rain:0,snow:0,mist:.93,wind:.11,storm:0},
  snow:{label:'Snow',cloud:.83,rain:0,snow:.90,mist:.43,wind:.42,storm:0}
};

const nextFront={clear:['overcast','fog'],overcast:['rain','clear','snow'],rain:['storm','overcast','fog'],storm:['rain','overcast'],fog:['overcast','clear'],snow:['overcast','fog']};
const fields=['cloud','rain','snow','mist','wind','storm'];

export function createWeatherCycle(random=Math.random) {
  let mode='auto',front='overcast',remaining=35;
  const state={...weatherPresets[front],wetness:0,snowpack:0,runoff:1,gust:0,flash:0,time:0};
  let thunder=2.8,gustAge=0,gustWait=2,gustDuration=1,gustPeak=0;
  let heading=-.16,targetHeading=heading,band=1,bandTarget=1,bandTime=13,denseBand=true;
  Object.assign(state,{windX:Math.cos(heading),windZ:Math.sin(heading),severity:1});
  return {
    state,
    get front(){return front;},
    select(next){
      if(next==='auto'){mode=next;remaining=22;}
      else if(Object.hasOwn(weatherPresets,next)){mode=next;front=next;}
    },
    step(dt){
      state.time+=dt;
      if(mode==='auto'&&(remaining-=dt)<=0){
        const options=nextFront[front];front=options[Math.floor(random()*options.length)];
        remaining=45+random()*50;
      }
      const target=weatherPresets[front],blend=1-Math.exp(-dt*.52);
      // Successive precipitation bands pass even if a front is held in the menu.
      if((bandTime-=dt)<=0){
        bandTarget=denseBand?.83+.17*random():.21+.44*random();
        denseBand=!denseBand;bandTime=10+random()*16;
      }
      band+=(bandTarget-band)*(1-Math.exp(-dt*.32));state.severity=band;
      for(const key of fields){
        let intensity=1;
        if(key==='rain'||key==='storm')intensity=band;
        if(key==='mist'&&target.rain)intensity=.74+.26*band;
        if(key==='cloud')intensity=1-.19*target.rain*(1-band);
        if(key==='wind')intensity=1-.36*target.storm*(1-band);
        state[key]+=(target[key]*intensity-state[key])*blend;
      }
      state.wetness+=(state.rain-state.wetness)*(1-Math.exp(-dt*(state.rain>state.wetness?.19:.042)));
      state.snowpack+=(state.snow-state.snowpack)*(1-Math.exp(-dt*(state.snow>state.snowpack?.085:.065+state.rain*.12)));
      state.runoff=.87+state.rain*.32+state.wetness*.38+state.snowpack*.09;
      if((gustWait-=dt)<=0){
        gustDuration=2+random()*5;gustWait=gustDuration+1.6+random()*7;
        gustAge=0;gustPeak=.40+.78*random();targetHeading=heading+(random()-.5)*1.22;
      }
      gustAge+=dt;
      const phase=Math.min(1,gustAge/gustDuration);
      const pulse=Math.sin(Math.PI*Math.pow(phase,.74))**2;
      heading+=(targetHeading-heading)*(1-Math.exp(-dt*.38));
      state.windX=Math.cos(heading);state.windZ=Math.sin(heading);
      state.gust=state.wind*(.48+gustPeak*pulse+.07*band);
      thunder-=dt*state.storm;
      if(thunder<=0){thunder=4+random()*9;state.flash=1;}
      else state.flash*=Math.exp(-dt*7.8);
    }
  };
}
