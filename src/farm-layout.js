export const farm = Object.freeze({
  name: 'Briarwick Commons Farm',
  entry: Object.freeze({ x: -48, z: 24, a: Math.PI / 2 }),
  overview: Object.freeze({ x: -80, y: 72, z: 118 }),
  bounds: Object.freeze({ minX: -112, maxX: -44, minZ: 10, maxZ: 93 }),
});

export function inFarm(x,z){
  const {minX,maxX,minZ,maxZ}=farm.bounds;
  return x>=minX&&x<=maxX&&z>=minZ&&z<=maxZ;
}

const xs = [[-110, -101.5], [-99.5, -91], [-89, -80.5], [-78.5, -70], [-68, -57], [-55, -45]];
const crops = [
  ['corn', '#638344'], ['wheat', '#c9a958'], ['carrots', '#668342'],
  ['potatoes', '#70804a'], ['tomatoes', '#587848'], ['pumpkins', '#688249'],
  ['barley', '#b9984d'], ['beets', '#6e8149'], ['cabbage', '#739359'],
  ['sunflowers', '#78813f'], ['lavender', '#777b59'], ['beans', '#5f804d'],
];

export const fieldPlan = Object.freeze(crops.map(([crop, color], index) => {
  const row = index < 6 ? 0 : 1;
  const [minX, maxX] = xs[index % 6];
  return Object.freeze({
    crop, color, minX, maxX,
    minZ: row ? 78 : 59,
    maxZ: row ? 91 : 73,
    level: .64 + .055 * ((index * 5) % 4),
  });
}));

export const animalPlan = Object.freeze([
  Object.freeze({ kind: 'cow', count: 7, minX: -109, maxX: -94, minZ: 29, maxZ: 53 }),
  Object.freeze({ kind: 'chicken', count: 12, minX: -78, maxX: -67, minZ: 35, maxZ: 53 }),
  Object.freeze({ kind: 'pig', count: 6, minX: -64, maxX: -46, minZ: 34, maxZ: 53 }),
]);

export const farmStations=Object.freeze({
  water:{x:-63.6,z:18.8},feed:{x:-71.6,z:25.6},eggs:{x:-74.8,z:42.5},store:{x:-79.2,z:27.9},
  troughs:[{kind:'cow',name:'cows',x:-93.30,z:35.1},{kind:'chicken',name:'hens',x:-74.8,z:38.1},{kind:'pig',name:'pigs',x:-56.9,z:36.3}]
});

export function fieldAt(x,z,margin=0){
  return fieldPlan.find(field=>x>=field.minX-margin&&x<=field.maxX+margin&&z>=field.minZ-margin&&z<=field.maxZ+margin);
}

const clamp = (value, min = 0, max = 1) => Math.max(min, Math.min(max, value));
const smooth = value => { const t = clamp(value); return t * t * (3 - 2 * t); };
const mix = (a, b, t) => a + (b - a) * t;
const rectDistance = (x, z, rectangle) => Math.hypot(
  Math.max(rectangle.minX - x, 0, x - rectangle.maxX),
  Math.max(rectangle.minZ - z, 0, z - rectangle.maxZ),
);

/** Terrain contract used by land.height: deterministic, smooth, and already flattened under farm assets. */
export function farmHeight(x, z) {
  let y = .78 + .12 * Math.sin(x * .16 + z * .07) + .08 * Math.cos(z * .21 - x * .05);
  const lane = Math.abs(z - 24);
  y = mix(.82, y, smooth((lane - 1.7) / 2.2));
  const crossLane = Math.abs(x + 86);
  if (z > 23 && z < 92) y = mix(.78, y, smooth((crossLane - 1.35) / 2.1));
  for (const field of fieldPlan) {
    const distance = rectDistance(x, z, field);
    y = mix(field.level, y, smooth(distance / 1.45));
  }
  for (const pad of [
    { minX: -107, maxX: -96, minZ: 13, maxZ: 27, level: .86 },
    { minX: -95, maxX: -77, minZ: 11, maxZ: 33, level: .79 },
    { minX: -65, maxX: -45, minZ: 32, maxZ: 55, level: .73 },
  ]) y = mix(pad.level, y, smooth(rectDistance(x, z, pad) / 1.2));
  // Repeated foot traffic has worn a shallow hollow beside the pig trough.
  const wallow=((x+55.4)/4.2)**2+((z-39.1)/2.3)**2;
  const yard=Math.exp(-(((x+55.4)/8)**4+((z-39.1)/6)**4));
  const tread=.047*Math.sin(.95*x+.34*z)+.028*Math.sin(1.05*z-.46*x);
  return y+yard*(tread+.014*(z-39.1))-.21*Math.exp(-wallow);
}

const rectangles = [
  { minX: -106.3, maxX: -96.8, minZ: 15, maxZ: 25.2 }, // farmhouse
  { minX: -94.2, maxX: -77.8, minZ: 11.8, maxZ: 24.6 }, // main dairy barn
  { minX: -63.1, maxX: -53.4, minZ: 45.3, maxZ: 51.4 }, // pig shelter
  { minX: -77.6, maxX: -72.2, minZ: 43.4, maxZ: 49.2 }, // large coop
  { minX: -70.9, maxX: -67.1, minZ: 46.1, maxZ: 50.1 }, // small coop
  { minX: -111.1, maxX: -107.2, minZ: 11.2, maxZ: 16.1 }, // tool shed
  {minX:-90.0,maxX:-88.15,minZ:24.8,maxZ:33.2}, // west stalls
  {minX:-83.85,maxX:-82.0,minZ:24.8,maxZ:33.2}, // east stalls
];
export function underFarmRoof(x,z){
  return rectangles.some(rect=>x>=rect.minX&&x<=rect.maxX&&z>=rect.minZ&&z<=rect.maxZ);
}
const circles = [
  { x: -70, z: 15.8, r: 2.4 }, // silo
  { x: -63.5, z: 16, r: 1.55 }, // water tower
  { x: -106, z: 34.5, r: .5 }, { x: -101.5, z: 36.5, r: .48 },
  { x: -106.5, z: 43, r: .52 }, { x: -101.2, z: 46.2, r: .5 },
];
const fences = [
  [-112, 10, -44, 10], [-112, 10, -112, 93], [-112, 93, -44, 93],
  [-44, 10, -44, 21.4], [-44, 26.7, -44, 93],
  [-73.5, 10, -73.5, 21.2], [-73.5, 27, -73.5, 55],
  [-112, 55.5, -88.5, 55.5], [-83.5, 55.5, -52.65, 55.5], [-47.35,55.5,-44,55.5],
  [-112, 75.7, -88.5, 75.7], [-83.5, 75.7, -52.65, 75.7], [-47.35,75.7,-44,75.7],
  [-92, 28, -92, 53.5], [-92, 53.5, -112, 53.5],
  [-80, 34, -80, 54], [-65, 33, -65, 54],
];

function segmentDistance(x, z, [ax, az, bx, bz]) {
  const dx = bx - ax, dz = bz - az;
  const t = clamp(((x - ax) * dx + (z - az) * dz) / (dx * dx + dz * dz));
  return Math.hypot(x - (ax + dx * t), z - (az + dz * t));
}

/** True means a player may occupy this point. Outside the farm is left to the other world clearances. */
export function farmClear(x, z) {
  const { minX, maxX, minZ, maxZ } = farm.bounds;
  if (x < minX - .3 || x > maxX + .3 || z < minZ - .3 || z > maxZ + .3) return true;
  if (rectangles.some(rect => x > rect.minX - .22 && x < rect.maxX + .22 && z > rect.minZ - .22 && z < rect.maxZ + .22)) return false;
  if (circles.some(circle => Math.hypot(x - circle.x, z - circle.z) < circle.r + .22)) return false;
  return !fences.some(segment => segmentDistance(x, z, segment) < .22);
}

export const farmFencePlan = Object.freeze(fences.map(segment => Object.freeze(segment)));

export function farmSheltered(x,z){
  return z>24.26&&z<33.75&&((x>-90.28&&x<-88.03)||(x>-83.97&&x<-81.72));
}
