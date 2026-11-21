import assert from 'node:assert/strict';
import { test } from 'node:test';

test('each village door has a clear stone approach', async () => {
  const { plots, roads, doorstep, pavingAllowed, onBridge } = await import('../src/layout.js');
  assert.equal(plots.length, 8);
  for (const plot of plots) {
    const road = roads.find(item => item.destination === plot.id);
    const end = road.curve.getPointAt(1);
    const door = doorstep(plot, .36);
    assert.ok(Math.hypot(end.x - door.x, end.z - door.z) < .01, plot.name);
    assert.ok(pavingAllowed(end.x, end.z), plot.name);
    assert.ok(!pavingAllowed(plot.x, plot.z), plot.name);
  }
  for(const {curve} of roads){
    for(const point of curve.getSpacedPoints(Math.ceil(curve.getLength()/.18))){
      assert.ok(pavingAllowed(point.x,point.z)||onBridge(point.x,point.z,.06),`${point.x}, ${point.z}`);
    }
  }
});

test('the brook powers the mill and the sluice can stop it', async () => {
  const { createMillDrive, millWheel } = await import('../src/hydraulics.js');
  assert.ok(millWheel.waterline > millWheel.y - millWheel.radius);
  const drive = createMillDrive();
  for (let i = 0; i < 480; i++) drive.step(1 / 60, 1);
  assert.ok(drive.speed > .45);
  const start = drive.angle;
  drive.toggle();
  for (let i = 0; i < 840; i++) drive.step(1 / 60, 1);
  assert.ok(drive.angle > start);
  assert.ok(drive.speed < .02);
  assert.ok(Math.max(...drive.buckets) < .01);
});

test('weather transitions control precipitation, wetness, and runoff', async () => {
  const { createWeatherCycle } = await import('../src/weather-cycle.js');
  const weather = createWeatherCycle(() => .5);
  weather.select('storm');
  assert.ok(weather.state.rain < .3);
  for (let i = 0; i < 1800; i++) weather.step(1 / 60);
  assert.ok(weather.state.rain > .85 && weather.state.wetness > .6 && weather.state.runoff > 1.1);
  weather.select('snow');
  for (let i = 0; i < 1800; i++) weather.step(1 / 60);
  assert.ok(weather.state.snow > .65 && weather.state.rain < .02);
  weather.select('fog');
  for (let i = 0; i < 1800; i++) weather.step(1 / 60);
  assert.ok(weather.state.mist > .6 && weather.state.snow < .02);
  weather.select('auto');
  for(let i=0;i<1800;i++)weather.step(1/60);
  assert.notEqual(weather.front,'fog');
});
