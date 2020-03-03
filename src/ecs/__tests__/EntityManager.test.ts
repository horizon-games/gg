import EntityManager from '../EntityManager'
import Entity from '../Entity'
import Archetype from '../Archetype'

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

describe('EntityManager', () => {
  test('can create', () => {
    const manager = new EntityManager<Components>()
    expect(manager.entities.size).toBe(0)
  })

  test('can add an entity', () => {
    const manager = new EntityManager<Components>()
    const entity = new Entity<Components>()
    manager.addEntity(entity)
    expect(manager.entities.size).toBe(1)
  })

  test('can find entities with specific types', () => {
    const manager = new EntityManager<Components>()

    const entity = new Entity<Components>([
      new PositionComponent({ x: 1, y: 2, z: 3 }),
      new RotationComponent({ x: 1, y: 2, z: 3 }),
      new VelocityComponent({ x: 1, y: 2, z: 3 })
    ])

    manager.addEntity(entity)
    expect(manager.filter(['position'])).toEqual([entity])
    expect(manager.filter(['position', 'rotation'])).toEqual([entity])
    expect(manager.filter(['position', 'rotation'])).toEqual([entity])
  })

  test('can add archetypes', () => {
    const manager = new EntityManager()

    const entity = new Entity<Components>()

    manager.addEntity(entity)

    const allArchetype = new Archetype(Archetypes.All)
    const emptyArchetype = new Archetype(Archetypes.Empty, [Archetype.only()])
    const nonEmptyArchetype = new Archetype(Archetypes.NonEmpty, [
      (x: Entity<Components>) => x.componentTypes.length > 0
    ])
    const positionOnlyArchetype = new Archetype(Archetypes.PositionOnly, [
      Archetype.only('position')
    ])
    const positionArchetype = new Archetype(Archetypes.Position, [
      Archetype.include('position')
    ])
    const physicalArchetype = new Archetype(Archetypes.Physical, [
      Archetype.include('position'),
      Archetype.include('rotation'),
      Archetype.include('velocity'),
      Archetype.exclude('static')
    ])

    manager.addArchetype(allArchetype)
    manager.addArchetype(emptyArchetype)
    manager.addArchetype(nonEmptyArchetype)
    manager.addArchetype(positionOnlyArchetype)
    manager.addArchetype(positionArchetype)
    manager.addArchetype(physicalArchetype)

    expect(allArchetype.hasEntity(entity)).toBe(true)
    expect(emptyArchetype.hasEntity(entity)).toBe(true)
    expect(nonEmptyArchetype.hasEntity(entity)).toBe(false)
    expect(positionOnlyArchetype.hasEntity(entity)).toBe(false)
    expect(positionArchetype.hasEntity(entity)).toBe(false)
    expect(physicalArchetype.hasEntity(entity)).toBe(false)

    entity.addComponent(new PositionComponent({ x: 0, y: 0, z: 0 }))

    expect(emptyArchetype.hasEntity(entity)).toBe(false)
    expect(nonEmptyArchetype.hasEntity(entity)).toBe(true)
    expect(positionOnlyArchetype.hasEntity(entity)).toBe(true)
    expect(positionArchetype.hasEntity(entity)).toBe(true)
    expect(physicalArchetype.hasEntity(entity)).toBe(false)

    entity.addComponent(new RotationComponent({ x: 0, y: 0, z: 0 }))

    expect(positionOnlyArchetype.hasEntity(entity)).toBe(false)
    expect(positionArchetype.hasEntity(entity)).toBe(true)
    expect(physicalArchetype.hasEntity(entity)).toBe(false)

    entity.addComponent(new VelocityComponent({ x: 0, y: 0, z: 0 }))

    expect(positionArchetype.hasEntity(entity)).toBe(true)
    expect(physicalArchetype.hasEntity(entity)).toBe(true)

    entity.addComponent(new StaticComponent())

    expect(physicalArchetype.hasEntity(entity)).toBe(false)
  })

  test('can renew and release entities from entity pool', () => {
    const manager = new EntityManager({ poolSize: 10 })
    const entity = manager.renewEntity()

    expect(entity).toBeInstanceOf(Entity)

    manager.releaseEntity(entity)
  })
})
