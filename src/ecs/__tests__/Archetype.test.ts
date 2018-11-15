import Archetype from '../Archetype'
import Entity from '../Entity'

import {
  Components,
  PositionComponent,
  RotationComponent,
  VelocityComponent,
  StaticComponent
} from './component.fixtures'

enum Archetypes {
  All,
  Empty,
  NonEmpty,
  PositionOnly,
  Position,
  Physical
}

describe('Archetype', () => {
  test('can create archetype', () => {
    const allArchetype = new Archetype<Components>(Archetypes.All)
    const emptyArchetype = new Archetype<Components>(Archetypes.Empty, [
      Archetype.only()
    ])

    expect(allArchetype.filters.length).toBe(0)
    expect(emptyArchetype.filters.length).toBe(1)
  })

  test('can create archetype with filters', () => {
    const allArchetype = new Archetype<Components>(Archetypes.All)
    const emptyArchetype = new Archetype<Components>(Archetypes.Empty, [
      Archetype.only()
    ])
    const nonEmptyArchetype = new Archetype<Components>(Archetypes.NonEmpty, [
      (x: Entity<Components>) => x.componentTypes.length > 0
    ])
    const positionOnlyArchetype = new Archetype<Components>(
      Archetypes.PositionOnly,
      [Archetype.only('position')]
    )
    const positionArchetype = new Archetype<Components>(Archetypes.Position, [
      Archetype.include('position')
    ])
    const physicalArchetype = new Archetype<Components>(Archetypes.Physical, [
      Archetype.include('position'),
      Archetype.include('rotation'),
      Archetype.include('velocity'),
      Archetype.exclude('static')
    ])

    const entity = new Entity()

    expect(allArchetype.matchesEntity(entity)).toBe(true)
    expect(emptyArchetype.matchesEntity(entity)).toBe(true)
    expect(nonEmptyArchetype.matchesEntity(entity)).toBe(false)
    expect(positionOnlyArchetype.matchesEntity(entity)).toBe(false)
    expect(positionArchetype.matchesEntity(entity)).toBe(false)
    expect(physicalArchetype.matchesEntity(entity)).toBe(false)

    entity.addComponent(new PositionComponent({ x: 0, y: 0, z: 0 }))

    expect(allArchetype.matchesEntity(entity)).toBe(true)
    expect(emptyArchetype.matchesEntity(entity)).toBe(false)
    expect(nonEmptyArchetype.matchesEntity(entity)).toBe(true)
    expect(positionOnlyArchetype.matchesEntity(entity)).toBe(true)
    expect(positionArchetype.matchesEntity(entity)).toBe(true)
    expect(physicalArchetype.matchesEntity(entity)).toBe(false)

    entity.addComponent(new RotationComponent({ x: 0, y: 0, z: 0 }))

    expect(allArchetype.matchesEntity(entity)).toBe(true)
    expect(emptyArchetype.matchesEntity(entity)).toBe(false)
    expect(nonEmptyArchetype.matchesEntity(entity)).toBe(true)
    expect(positionOnlyArchetype.matchesEntity(entity)).toBe(false)
    expect(positionArchetype.matchesEntity(entity)).toBe(true)
    expect(physicalArchetype.matchesEntity(entity)).toBe(false)

    entity.addComponent(new VelocityComponent({ x: 0, y: 0, z: 0 }))

    expect(physicalArchetype.matchesEntity(entity)).toBe(true)

    entity.addComponent(new StaticComponent())

    expect(physicalArchetype.matchesEntity(entity)).toBe(false)
  })
})
