import { lakeHabitat } from './lake-layout.js';

const habitats = (reeds, shallows, openWater, falls) => Object.freeze({
  reeds, shallows, 'open water': openWater, falls,
});

const abundance = Object.freeze({common:1, uncommon:.58, rare:.24, legendary:.08});

function species(name, description, minWeight, maxWeight, color, weights, rarity = 'common') {
  return Object.freeze({
    name, description, minWeight, maxWeight, color,
    habitatWeights: habitats(...weights), abundance:abundance[rarity], rarity,
  });
}

// The weights are deliberately ecological rather than merely cosmetic: anglers
// can learn where a fish lives and move around the lake to target it.
export const FISH_SPECIES = Object.freeze([
  species('Common Roach', 'A silver-sided shoal fish with bright vermilion fins.', .15, 1.8, '#b9c7c1', [3, 3, 2, 1]),
  species('Rudd', 'A warm-gold surface feeder that shelters beneath lily pads.', .2, 2.4, '#d4aa48', [4, 3, 1, 0]),
  species('European Perch', 'Olive flanks, dark bars, and a fiercely raised dorsal fin.', .3, 5.2, '#66824a', [2, 3, 3, 2]),
  species('Tench', 'A secretive bronze-green bottom feeder fond of quiet weeds.', .7, 8.5, '#6f713b', [4, 3, 1, 0]),
  species('Crucian Carp', 'A deep-bodied little carp glowing amber in reed-bed light.', .4, 4.6, '#a98235', [4, 3, 1, 0]),
  species('Common Carp', 'A broad bronze lake veteran with powerful, careful runs.', 2.0, 31, '#92713c', [2, 4, 3, 0], 'uncommon'),
  species('Mirror Carp', 'An old carp wearing a scattered mosaic of enormous scales.', 3.0, 35, '#a48251', [1, 3, 3, 0], 'rare'),
  species('Grass Carp', 'A long pale grazer that cruises the margins for fresh shoots.', 2.5, 27, '#9ca477', [3, 4, 2, 0], 'uncommon'),
  species('Northern Pike', 'A mottled green ambush hunter shaped like a living spear.', 1.2, 24, '#61794a', [4, 3, 2, 1], 'uncommon'),
  species('Zander', 'A sleek dusk hunter with glassy eyes and needle-like teeth.', 1.0, 16, '#6f8074', [0, 1, 4, 2], 'uncommon'),
  species('Brown Trout', 'A copper-dappled stream fish holding near cold, quick water.', .4, 9.5, '#9a6943', [0, 1, 2, 5], 'uncommon'),
  species('Rainbow Trout', 'A strong silver trout washed by a rose-colored side stripe.', .5, 10.5, '#88a9a2', [0, 1, 3, 5], 'uncommon'),
  species('Brook Trout', 'A jewel-spotted cold-water fish with white-edged fins.', .25, 4.2, '#5e795e', [0, 1, 1, 5], 'rare'),
  species('Arctic Char', 'A scarce deep-water beauty with a blue back and ember belly.', .8, 12, '#54727e', [0, 0, 4, 3], 'rare'),
  species('Grayling', 'A graceful current fish crowned by a sail-like violet dorsal.', .35, 4.0, '#8c8292', [0, 1, 1, 5], 'uncommon'),
  species('Atlantic Salmon', 'A powerful silver traveler resting below the Alder Falls.', 3.0, 29, '#a8b5b5', [0, 0, 1, 5], 'legendary'),
  species('European Eel', 'A shadowy serpent-shaped wanderer that feeds after sunset.', .4, 8.0, '#4a5142', [3, 3, 2, 2], 'uncommon'),
  species('Burbot', 'A whiskered night hunter marbled like stones on the lake bed.', .6, 9.0, '#71634f', [0, 1, 4, 3], 'rare'),
  species('Wels Catfish', 'A huge broad-headed predator with long searching barbels.', 4.0, 58, '#525a50', [1, 2, 5, 0], 'legendary'),
  species('Stone Loach', 'A tiny whiskered bottom-dweller that hugs clean gravel.', .04, .3, '#8b7657', [1, 3, 1, 4]),
  species('Gudgeon', 'A speckled little shoal fish that noses over sandy shallows.', .05, .45, '#a08c6f', [1, 4, 2, 3]),
  species('Dace', 'A quick silver fish that flashes where lake water begins to run.', .08, 1.2, '#adbab5', [0, 2, 2, 4]),
  species('Chub', 'A bold, blunt-headed fish that patrols shade and broken current.', .4, 7.0, '#8c927c', [1, 3, 2, 4]),
  species('Bream', 'A tall bronze slab-sided fish browsing the soft open lake bed.', .5, 10, '#8c7955', [1, 2, 5, 0]),
  species('White Bream', 'A bright deep-bodied shoal fish with a neat forked tail.', .25, 3.2, '#b7b3a0', [1, 3, 4, 0]),
  species('Bleak', 'A tiny blue-silver surface fish that gathers in glittering clouds.', .03, .25, '#9fb8c3', [1, 3, 4, 2]),
  species('Minnow', 'A thumb-sized striped fish thriving along bright pebbled edges.', .01, .12, '#766f4d', [3, 4, 1, 4]),
  species('Three-spined Stickleback', 'A tiny armored hunter nesting among submerged stems.', .01, .09, '#737f6a', [5, 3, 0, 1]),
  species('Bullhead', 'A squat broad-headed fish concealed beneath cool stream stones.', .04, .5, '#695f4d', [0, 2, 1, 5]),
  species('Golden Orfe', 'A rare sun-bright fish cruising high over the open water.', .7, 8.5, '#d4a33e', [1, 2, 5, 1], 'rare'),
]);

/** Selects a species from the local habitat without consuming any other random values. */
export function chooseCatch(x, z, rng = Math.random) {
  const habitat = lakeHabitat(x, z);
  const available = FISH_SPECIES.filter(entry => entry.habitatWeights[habitat] > 0);
  const total = available.reduce((sum, entry) => sum + entry.habitatWeights[habitat]*entry.abundance, 0);
  const sample = Math.max(0, Math.min(1 - Number.EPSILON, Number(rng()) || 0)) * total;
  let cursor = 0;
  for (const entry of available) {
    cursor += entry.habitatWeights[habitat]*entry.abundance;
    if (sample < cursor) return entry;
  }
  return available.at(-1);
}
