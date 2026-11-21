import assert from 'node:assert/strict';
import {test} from 'node:test';
import {alderSource,alderStage,alderWidth,alderX,lakeHeight,lipZ} from '../src/lake-layout.js';
import {brookStage} from '../src/brook.js';
import {riverX,riverWidth,springZ} from '../src/layout.js';
import {height} from '../src/world-height.js';

test('Alder headwaters descend from the headwall to a supported lip above open water',()=>{
  assert.ok(lakeHeight(alderX(alderSource+3),lipZ+alderSource+3)>alderStage(alderSource+3));
  for(let s=0;s<alderSource;s+=.25){
    const x=alderX(s),z=lipZ+s,water=alderStage(s);
    assert.ok(alderStage(s+.25)>water);
    assert.ok(lakeHeight(x,z)<water);
    for(const side of [-1,1])assert.ok(lakeHeight(x+side*(alderWidth(s)+1),z)>water);
  }
  assert.ok(Math.abs(alderStage(0)-lakeHeight(alderX(0),lipZ))<1);
  assert.ok(lakeHeight(alderX(0),lipZ-4.5)<0);
});

test('the town brook issues from a closed spring bank and runs downhill into its old channel',()=>{
  assert.ok(height(riverX(springZ-1.4),springZ-1.4)>brookStage(springZ));
  for(let z=springZ;z<12;z+=.25){
    assert.ok(brookStage(z)>brookStage(z+.25));
    assert.ok(height(riverX(z),z)<brookStage(z));
  }
  assert.ok(riverWidth(springZ+2)>riverWidth(springZ)*2);
});
