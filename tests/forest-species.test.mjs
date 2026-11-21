import assert from 'node:assert/strict';
import {test} from 'node:test';
import * as T from 'three';
import {forestAnimal} from '../src/forest-models.js';
import {closestForestSite,forestSites,forestSpecies,inHuntingWoods} from '../src/forest-species.js';

test('all twenty woodland species have distinct forms at discoverable habitats',()=>{
  assert.equal(forestSpecies.length,20);
  assert.equal(new Set(forestSpecies.map(s=>s.name)).size,20);
  assert.equal(new Set(forestSpecies.map(s=>s.form)).size,20);
  for(const [index,site] of forestSites.entries()){
    const local=forestSpecies.filter(s=>s.site===index);
    assert.equal(local.length,5);
    for(const spec of local){
      const x=site.x+spec.dx,z=site.z+spec.dz;
      assert.ok(inHuntingWoods(x,z));
      assert.equal(closestForestSite(x,z),site);
      const rig=forestAnimal(spec),bounds=new T.Box3().setFromObject(rig.root);
      assert.ok(rig.head&&rig.legs.length>=2);
      assert.ok(rig.legs.every(leg=>leg.upper?.isGroup&&leg.lower?.isGroup&&leg.foot?.isGroup));
      assert.ok(bounds.max.y>0&&bounds.min.y<.12*spec.length);
      assert.ok(bounds.max.z-bounds.min.z>spec.length*.6);
    }
  }
});
