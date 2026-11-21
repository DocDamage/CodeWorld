# Briarwick implementation and verification

The baseline was `main` at `dc4253b`. Its production bundle built and all 79 original tests passed. Work continued on `codex/briarwick-world` with a tested Bramble Bakery implementation before the other buildings adopted the same pattern.

## Changes visible in the game

- The King’s chamber grew from about 63 to 139 square metres. A wardrobe, washstand, bedside cabinets, upholstered benches, and a fireside reading area furnish the expanded space. Tall library shelves stand clear of windows. The service wings and household lodges have larger working areas and furnishings for their individual trades. The feeding stores and hoard chamber extend deeper into the vault.
- Meadow soil has a continuous turf texture. Close to the player, tapered blades follow the terrain, yield to wind and foot traffic, and fade into the turf with distance. Walkable paths, crops, buildings, and open water have exclusion masks. Broadleaf trees and conifers have tapered trunks, forked branches, leaf and needle sprays, and wind-matched silhouettes. The orchard, shoreline, and woodland share those meshes.
- Deer, farm animals, the stable horse, and Aurelith have revised anatomy. Ground animals check body clearance while moving around solids. The mine entrance and its approach occupy the rail yard clear of the town bridge.
- A mountain river runs to the cliff lip at Alder Falls. Water accelerates over the drop into spray, foam, and a plunge pool. A separate hillside spring feeds the town brook. Cloud layers move with the weather and respond to the sun and storm light.

## Verification

All 115 tests passed on the feature branch. The production bundle built successfully, npm audit reported zero vulnerabilities, and the running game validated all 162 logical objects at startup.

The collision tests exercise movement past a trunk, a coop, logs, rocks and other solid footprints. Castle tests traverse the courtyard to all fourteen aboveground service rooms, check clearance at windows, and follow the canopy bed from its selected mesh to its owning room. Manifest tests cover JSON round-tripping, local and world transforms, per-instance ownership, binding replacement, supported placement edits and invalid input.

In a fresh browser profile, the bakery was moved and rotated. After reload, its new entrance opened the correct interior. Reset restored the original entrance coordinates. The same browser loaded farm and mine snapshots produced by the original implementation, a lake journal, and a saved tour checkpoint. The farm displayed 17 saved eggs, the journal displayed its original catch and sighting, and the tour resumed at 2× speed. The checks also mounted the tractor, visited the mine and forge, boarded the sailboat, cast a line, entered the royal chamber, and handed the tour back to walking.

## Browser rendering

The original and revised production bundles ran locally in Edge, at noon under the Overcast preset, at 1100 × 660 on Intel Iris Xe graphics through ANGLE/D3D11. Counts below are default-framebuffer WebGL submissions. Reflections and shadow-map passes render offscreen. Counts are representative settled frames. The King's chamber arrival now faces the sitting area as well as the bed.

| View | Original draws | Revised draws | Original triangles | Revised triangles |
| --- | ---: | ---: | ---: | ---: |
| Village approach | 159 | 242 | 1.39 M | 1.00 M |
| Pinewood Way | 447 | 493 | 2.56 M | 2.44 M |
| King’s chamber | 183 | 198 | 1.60 M | 0.66 M |

Independently addressable buildings and castle sections split some material batches, which raises draw counts. Shared tree geometry, a reusable nearby grass mesh, and culling the underground rooms from upstairs reduce submitted triangles. The village and chamber sampled about 17 ms between frames in both builds. Woodland samples varied between about 17 and 33 ms on this machine. These measurements cover three camera positions on one GPU. [Paired browser captures](media/world-views.jpg)

## Development boundary

Village exteriors, village interiors, castle sections, and selected furnishings have procedural construction bindings. Animated equipment also exposes live scene roots. Bringing a new rig into the game still requires mapping its pivots, effects, and controls. For the first asset replacement, fit one owned building assembly to the bakery's entrance and footprint, then repeat the same placement and doorway checks. [Authoring guide](WORLD_OBJECTS.md) · [Exported bakery record and children](examples/bramble-bakery.json)
