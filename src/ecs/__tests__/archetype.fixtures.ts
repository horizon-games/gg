import Archetype from '../Archetype'
import Entity from '../Entity'
import { Components } from './component.fixtures'

export enum Archetypes {
  All,
  Empty,
  NonEmpty,
  PositionOnly,
  Position,
  Physical
}

export const allArchetype = new Archetype<Components>(Archetypes.All)
export const emptyArchetype = new Archetype<Components>(Archetypes.Empty, [
  Archetype.only()
])
export const nonEmptyArchetype = new Archetype<Components>(
  Archetypes.NonEmpty,
  [(entity: Entity<Components>) => entity.componentTypes.length > 0]
)
export const positionOnlyArchetype = new Archetype<Components>(
  Archetypes.PositionOnly,
  [Archetype.only('position')]
)
export const positionArchetype = new Archetype<Components>(
  Archetypes.Position,
  [Archetype.include('position')]
)
export const physicalArchetype = new Archetype<Components>(
  Archetypes.Physical,
  [
    Archetype.include('position'),
    Archetype.include('rotation'),
    Archetype.include('velocity'),
    Archetype.exclude('static')
  ]
)
