const triple=value=>Array.isArray(value)&&value.length===3&&value.every(Number.isFinite);

function isJsonValue(value,ancestors){
  if(value===null||typeof value==='string'||typeof value==='boolean')return true;
  if(typeof value==='number')return Number.isFinite(value);
  if(typeof value!=='object'||ancestors.has(value))return false;
  if(!Array.isArray(value)&&Object.getPrototypeOf(value)!==Object.prototype&&Object.getPrototypeOf(value)!==null)return false;
  ancestors.add(value);
  const valid=Object.values(value).every(child=>isJsonValue(child,ancestors));
  ancestors.delete(value);return valid;
}
export function validateManifest(manifest,version){
  const errors=[];
  if(manifest?.schema!=='briarwick-world-objects')errors.push('Unsupported manifest schema');
  if(manifest?.version!==version)errors.push('Unsupported manifest version');
  if(!isJsonValue(manifest,new Set()))errors.push('Manifest contains a non-JSON value or a circular reference');
  if(!Array.isArray(manifest?.objects))return {ok:false,errors:[...errors,'Manifest objects must be an array']};
  const parents=new Map();
  for(const record of manifest.objects){
    const id=record?.id;
    if(typeof id!=='string'||!id.trim()){errors.push('Object is missing a stable string id');continue;}
    if(parents.has(id))errors.push('Duplicate object id: '+id);
    parents.set(id,record.parentId);
    if(!['position','rotation','scale'].every(key=>triple(record.transform?.[key])))
      errors.push('Invalid transform: '+id);
    if(!record.visual?.assetKey||!record.type||!record.gameplayRole)errors.push('Incomplete object identity: '+id);
    for(const [name,anchor] of Object.entries(record.anchors??{}))
      if(!triple(anchor?.position)||anchor.forward!==undefined&&!triple(anchor.forward))errors.push('Invalid anchor: '+id+'/'+name);
  }
  // In a selection the ancestor can legitimately live outside this document.
  for(const id of parents.keys()){
    const seen=new Set();let parent=id;
    while(parents.has(parent)){
      if(seen.has(parent)){errors.push('Circular parent relationship: '+id);break;}
      seen.add(parent);parent=parents.get(parent);
    }
  }
  return {ok:errors.length===0,errors};
}
