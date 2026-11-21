# Authoring Briarwick world objects

## Give the object a home

Use an authored ID such as `bakery`, `room:bakery`, or `castle:fixture:royal-bed`. Keep it when the name, position, mesh, or construction order changes. Use these IDs for new saved references and action targets. Existing farm and mine snapshots, tour checkpoints, and lake journals retain their original keys and formats.

Put placement and dimensions in the layout that owns them. Village plots live in `src/layout.js`. Castle room bounds come from the same `CastleKit.room` calls used for navigation. Derive a plain record with the object's ID, role, region, parent, transform, visual key, and applicable anchors or collision bounds. Link children through `linkWorldObject(parentId, childId)`. A well may belong to a village while a delivery cart belongs to one shop. A road approach refers to the shop it serves.

Coordinates use metres in a right-handed space with Y up. A camera looks along local −Z. Rotations are radians in YXZ Euler order. Anchors are relative to their object. `worldAnchor(id, name)` composes the parent transforms and reports the coordinate domain. Village interiors render in their own scene, so their anchors resolve within that interior. The exterior doorway links those spaces.

## Build and replace visuals

Give a complete building a persistent group positioned at its plot. Build its geometry, signs, machinery, and emitters in local coordinates. Use a child pivot for a clock hand or rotor. Use `Builder.group` for temporary construction transforms. Large castle sections and selected furniture have independent groups. Repeated pieces can share one instanced draw.

```js
builder.owner('bakery', 'bakery:exterior', () => {
  buildExterior(builder);
});
```

Builder records the owner and part alongside each instance matrix. A new builder inherits its nearest named ancestor as the default owner. Picking resolves the owner of the particular instance, including after a batch rebuild. Use shared geometry and materials for paving, leaves, stonework, and detail within a building. Additional shared geometry can be registered with `registerSharedGeometry(key, geometry)`.

Village exteriors dispatch through symbolic keys such as `procedural:village/bakery`. Before constructing the scene, use `visualBindings.replace(assetKey, { kind, build })` to select another implementation. An exterior builder receives `{root, builder, plot}`. Use the supplied local origin and scale, keep door and delivery clearances, and attach animated parts at the required pivots. Dimensions, collision, and the interior relationship belong to the plot. Interior and castle builders have their own construction interfaces.

`live-scene` identifies an existing runtime assembly. The sailboat and drawbridge, for example, expose their real moving roots. Replacing those rigs requires adapting the animation and gameplay attachment points. The `spatial-reference` binding identifies a location for inspection and export, such as a room boundary whose stonework shares a structural batch.

## Inspect and export

Open browser developer tools while the game is running. Interiors have logical records before their meshes are first loaded.

```js
const world = window.briarwickWorld;
world.list({regionId: 'region:castle'});
world.inspect('castle:fixture:royal-bed');
world.anchor('bakery', 'entrance');
world.pick(raycastIntersection);

const selection = world.exportManifest({rootId: 'bakery', includeDescendants: true});
world.validate(selection);
JSON.stringify(selection, null, 2);
```

A version 1 manifest contains logical records, hierarchy, relationships, transforms, boundaries, anchors, and symbolic visual keys. Village building records also capture the resolved architectural colours and dimensions and the procedural generator's starting state. Replaying procedural detail requires the matching builder revision. Exported transforms describe authored placement. A running vehicle's simulation state belongs to its gameplay system. See the [bakery JSON exported from the running game](examples/bramble-bakery.json).

## Edit placement

```js
window.briarwickWorld.editPlacement('bakery', {x: 12.2, a: -0.4});
window.briarwickWorld.resetPlacements();
```

The browser stores a versioned development override and reloads. Startup rebuilds the placed group, entrance, collision, final road approach, paving, path cache, terrain heights, and grass exclusion maps together. The mill stays anchored to the brook. Moving it requires editing the connected waterwheel, sluice, drive, and water system together. Use a clear site when moving a building.

## Future engine work

The manifest supplies object identities, relationships, and logical placement for an Unreal importer. Geometry needs a separate asset-export step. Validate a real replacement asset against the bakery's scale, entrance, floor height, and collision before expanding the mapping. Convert axes, handedness and units at the import boundary. Materials, shaders, animation, physics, and input need destination-engine implementations. Keep JavaScript simulation changes covered by the existing gameplay and save tests.
