import { describe, test, expect } from 'vitest'

import { Archetype } from '../src/Archetype'
import { World } from '../src/World'

import { PhysicalArchetype } from './Archetype.fixtures'
import { Components, physicalAssemblage } from './Component.fixtures'
import { PhysicsSystem } from './System.fixtures'

describe('World', () => {
  test('can create', () => {
    const world = new World<Components>()
  })

  test('can add archetype', () => {
    const world = new World<Components>()

    class AllArchetype extends Archetype<Components> {}

    world.addArchetype(AllArchetype)

    expect(world.hasArchetype(AllArchetype)).toBe(true)

    world.createEntity(physicalAssemblage())

    expect(world.getArchetype(AllArchetype).entities.length).toBe(1)
  })

  test('can add systems', () => {
    const world = new World<Components>()
    world.addArchetype(PhysicalArchetype)
    world.addSystems(new PhysicsSystem())

    // No entities yet, should have no effect
    world.update(16, 1)

    // Adding entities
    world.createEntity(physicalAssemblage())
    world.createEntity(physicalAssemblage())
    world.createEntity(physicalAssemblage())
    world.createEntity(physicalAssemblage())

    // Now the system should modify this entity
    world.update(16, 2)

    expect(world.getArchetype(PhysicalArchetype).entities.length).toBe(4)
    expect(
      world
        .getArchetype(PhysicalArchetype)
        .entities[0].getComponentValue('position').x
    ).toBe(1)
    expect(world.systemTypes).toEqual(['PhysicsSystem'])
  })

  test('can get systems', () => {
    const world = new World<Components>()
    world.addArchetype(PhysicalArchetype)
    world.addSystems(new PhysicsSystem())

    expect(world.hasSystem(PhysicsSystem)).toBe(true)

    const a = world.getSystem(PhysicsSystem)
    expect(a).toBeInstanceOf(PhysicsSystem)
  })
})
