import { describe, test, expect } from 'vitest'

import { Entity } from '../src/Entity'
import { EntityManager } from '../src/EntityManager'

import {
  AllArchetype,
  EmptyArchetype,
  PhysicalArchetype,
  PositionOnlyArchetype,
  NonEmptyArchetype,
  PositionArchetype,
} from './Archetype.fixtures'
import {
  Components,
  PositionComponent,
  RotationComponent,
  StaticComponent,
  VelocityComponent,
} from './Component.fixtures'

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
      new VelocityComponent({ x: 1, y: 2, z: 3 }),
    ])

    manager.addEntity(entity)
    expect(manager.filter(['position'])).toEqual([entity])
    expect(manager.filter(['position', 'rotation'])).toEqual([entity])
    expect(manager.filter(['position', 'rotation'])).toEqual([entity])
  })

  test('can add archetypes', () => {
    const manager = new EntityManager<Components>()
    const entity = new Entity<Components>()

    manager.addEntity(entity)

    const allArchetype = manager.addArchetype(AllArchetype)
    const emptyArchetype = manager.addArchetype(EmptyArchetype)
    const nonEmptyArchetype = manager.addArchetype(NonEmptyArchetype)
    const positionOnlyArchetype = manager.addArchetype(PositionOnlyArchetype)
    const positionArchetype = manager.addArchetype(PositionArchetype)
    const physicalArchetype = manager.addArchetype(PhysicalArchetype)

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

  // test('can renew and release entities from entity pool', () => {
  //   const manager = new EntityManager()
  //   const entity1 = manager.renewEntity()
  //   const { id } = entity1

  //   entity1.add(new PositionComponent({ x: 0, y: 0, z: 0 }))
  //   expect(entity1).toBeInstanceOf(Entity)

  //   manager.releaseEntity(entity1)

  //   expect(
  //     entity1.componentTypes.length,
  //     'to have no components after release'
  //   ).toBe(0)
  //   expect(entity1.id, 'to be removed').not.toBe(id)

  //   const entity2 = manager.renewEntity()

  //   expect(entity2, 'to be shared reference to entity1').toBe(entity1)
  // })
})
