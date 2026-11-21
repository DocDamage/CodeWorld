import test from 'node:test';
import assert from 'node:assert/strict';
import {exportWorldManifest,validateWorldManifest} from '../src/world-objects.js';

test('manifest validation preserves filtered selections and rejects data lost in JSON export',()=>{
  const subset=exportWorldManifest({ids:['bakery']});
  assert.ok(validateWorldManifest(subset).ok);
  for(const broken of [
    m=>m.objects[0].transform.scale=[1,NaN,1],
    m=>m.objects[0].anchors.entrance.position=[1,2],
    m=>m.objects[0].parentId='bakery',
    m=>m.objects[0].unexportable=()=>1,
    m=>m.objects[0].unexportable=new Map(),
    m=>m.objects[0].relationships.circular=m,
  ]){
    const copy=structuredClone(subset);broken(copy);assert.equal(validateWorldManifest(copy).ok,false);
  }
});
