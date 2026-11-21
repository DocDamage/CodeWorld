const copyChoices=choices=>choices.map(({id,label})=>({id,label}));

const choiceSets={
  stranger:[
    {id:'ask_name',label:'Ask the dragon’s name'},
    {id:'offer_name',label:'Introduce yourself'},
    {id:'ask_chains',label:'Ask why the vault is barred'},
  ],
  introduced:[
    {id:'ask_story',label:'Ask how Aurelith came here'},
    {id:'ask_hoard',label:'Ask about the relics'},
    {id:'offer_help',label:'Offer your friendship'},
  ],
  accord:[
    {id:'promise',label:'Promise to return as a friend'},
    {id:'ask_relic',label:'Ask about the moonstone astrolabe'},
  ],
  friend:[
    {id:'ask_flight',label:'Ask what the sky feels like'},
    {id:'ask_relic',label:'Ask about the moonstone astrolabe'},
    {id:'farewell',label:'Take your leave'},
  ],
};

const openings={
  stranger:'Easy, little wanderer. I mean you no harm. The iron is the castle’s caution, not my temper. Will you speak in peace?',
  introduced:'You have returned. Ask what you wish; old stone has made me fond of honest voices.',
  accord:'The vault remembers our accord. I do as well.',
  friend:'Welcome back, friend. Your footfall is lighter than the wardens’ and much better company.',
};

const responses={
  ask_name:{
    chapter:'introduced',relationship:1,
    text:'Aurelith. Once the hill-folk called me Ember-under-Stars. I have kept both names, as I keep every gift freely given.',
  },
  offer_name:{
    chapter:'introduced',relationship:1,
    text:'Then I will remember you by it. Names are small treasures, and the only kind no thief can make poorer by sharing.',
  },
  ask_chains:{
    chapter:'introduced',relationship:1,
    text:'These chains are ceremonial now. Long ago I sheltered the first king during a siege; his heirs shelter me in return. We have occasionally disagreed about the number of locks required.',
  },
  ask_story:{
    chapter:'introduced',relationship:2,
    text:'I came wounded from the northern storms. Thornmere gave me a roof vast enough for wings and silence enough to heal. I stayed for the people, though they tell the tale as if I stayed for gold.',
  },
  ask_hoard:{
    chapter:'introduced',relationship:2,
    text:'Most pieces are memories entrusted to me: the pilgrim bell, the summer crown, the green-glass sword. Gold is merely the soft ground on which the important things can rest.',
  },
  offer_help:{
    chapter:'accord',relationship:2,
    text:'Friendship is help enough, if it is freely offered. Give me no oath of service—only a promise that we may speak again beneath an open sky.',
  },
  promise:{
    chapter:'friend',relationship:3,befriended:true,
    text:'Then the promise is shared. From this hour, the doors of my memory are open to you. Come as a friend, and Aurelith will answer as one.',
  },
  ask_relic:{
    text:'The moonstone astrolabe belonged to a navigator who mapped roads by starlight. Turn its silver ring and it still points toward the place you most hope to see.',
  },
  ask_flight:{
    text:'The sky is not empty. It has currents like a river, warm pillars above sunlit rock and cold blue roads between clouds. Someday, friend, perhaps Thornmere will remember that my wings were not made only for ceilings.',
  },
  farewell:{
    open:false,
    text:'Go gently, friend. I will know your step when you return.',
  },
};

/** A small UI-agnostic state machine for Aurelith's optional friendship arc. */
export function createDragonDialogue(){
  let state={speaker:'Aurelith',text:'',choices:[],relationship:0,chapter:'stranger',befriended:false,open:false};
  const snapshot=()=>({
    ...state,
    choices:copyChoices(state.choices),
  });
  const set=(patch,choiceKey=patch.chapter||state.chapter)=>{
    state={...state,...patch,choices:patch.open===false?[]:copyChoices(choiceSets[choiceKey]||choiceSets.introduced)};
    return snapshot();
  };
  return {
    get snapshot(){return snapshot();},
    talk(){
      const chapter=state.befriended?'friend':state.chapter;
      return set({open:true,chapter,text:openings[chapter]||openings.introduced},chapter);
    },
    reply(choiceId){
      if(!state.open)throw new Error('Dragon dialogue is not open');
      if(!state.choices.some(choice=>choice.id===choiceId))throw new RangeError('Unknown dragon dialogue choice: '+choiceId);
      const response=responses[choiceId];
      const chapter=response.chapter||state.chapter;
      return set({
        ...response,
        chapter,
        relationship:Math.max(state.relationship,response.relationship||0),
        befriended:state.befriended||!!response.befriended,
        open:response.open!==false,
      },chapter);
    },
    close(){return set({open:false,text:''});},
  };
}
