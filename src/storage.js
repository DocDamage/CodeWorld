export function createJsonStore(storage){
  const getStorage=typeof storage==='function'?storage:()=>storage;
  return Object.freeze({
    read(key){
      try{const value=getStorage().getItem(key);return value==null?null:JSON.parse(value);}catch{return null;}
    },
    write(key,value){
      try{getStorage().setItem(key,JSON.stringify(value));return true;}catch{return false;}
    },
    remove(key){
      try{getStorage().removeItem(key);return true;}catch{return false;}
    }
  });
}
