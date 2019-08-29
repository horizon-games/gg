# GG is the Good Game Engine :-)

## Entity Component System

### Entity

An entity acts as a container for components. They have a unique id and include helper methods for working with their included components. Entities are managed by an **EntityManager** and are grouped by **Archetypes**.

`reset()`

Resets an Entity to an empty state and gets a new unique id.

`renew()`

Used by EntityManager to re instantiate an entity from the object pool.

`hasComponent(type: ComponentType)` \_alias: has

Checks if entity contains a component by type.

`hasComponents(...type: ComponentTypes[])`

Checks if entity contains every component by type.

`addComponent(component: Component)`

Adds a component.

TODO....

### Component

Components are responsible for storing data. They include a value property and helper methods for attaching and detaching:

`onAttach(entity: Entity)`

Runs when added or toggled on an entity.

`onDetach(entity: Entity)`

Runs when removed from entity or when entity is reset (usually when released back into object pool).

### Assemblage

A function which returns an array of instantiated components

```typescript
(...args: any[]) => Component[]
```

### Archetype

Archetypes are responsible for grouping entities by their components.
They specify component filters to group on.

#### Filter presets

`Archetype.include(...componentTypes: ComponentType[])`

Grouped entities will contain these component types.

`Archetype.exclude(...componentTypes: ComponentType[])`

Grouped entities will not contain these component types.

`Archetype.only(...componentTypes: ComponentType[])`

Grouped entities will contain only these componet types.

`Archetype.any(...componentTypes: ComponentType[])`

Grouped entities will contain any of these component types.

#### Custom filters

In conjunction with the supplied filter presets you may also supply any custom filter
that adheres to the pattern:

```typescript
;(entity: Entity<ComponentTypes>) => boolean
```

Filters are only triggered when a change event is detected from the **EntityManager**.
These change events are occur when:

- an entity is added to the manager.
- an entity is removed from the manager.
- an entity is renewed from the manager entity pool.
- an entity is released back into the manager entity pool.
- a component is added to a managed entity.
- a component is removed from a managed entity.
- a component is toggled on a managed entity.

**NOTE:** Changes within component values are not tracked.

### EntityManager

All entities and archetypes in a **World** are managed by the **EntityManager**.
It is responsible for coordinating component change events within entities
to archetypes as well as renewing and releasing entities from an object pool.

Generally the **EntityManager** is only used interally by the **World**.

### System

Systems perform logic based on entities and their components.
Generally select which entities they are interested in from archetypes.
All Systems include an update method.

### World

The world is the user facing interface responsible for registering systems and archetype, creating and removing entities, and most importantly updating systems.
