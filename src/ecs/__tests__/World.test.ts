import World from '../World'
import Archetype from '../Archetype'
import { Components, physicalAssemblage } from './component.fixtures'
import { PhysicsSystem } from './system.fixtures'
import { Archetypes, physicalArchetype } from './archetype.fixtures'

describe('World', () => {
  test('can create', () => {
    const world = new World<Components>()
  })

  test('can add archetype', () => {
    const world = new World<Components>()
    world.addArchetype(new Archetype(Archetypes.All))

    expect(world.hasArchetype(Archetypes.All)).toBe(true)

    world.createEntity(physicalAssemblage())

    expect(world.getArchetype(Archetypes.All).entities.length).toBe(1)
  })

  test('can add systems', () => {
    const world = new World<Components>()
    world.addArchetype(physicalArchetype)
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

    expect(world.getArchetype(Archetypes.Physical).entities.length).toBe(4)
    expect(
      world
        .getArchetype(Archetypes.Physical)
        .entities[0].getComponent('position').x
    ).toBe(1)
    expect(world.systemTypes).toEqual(['PhysicsSystem'])
  })

  test('can get systems', () => {
    const world = new World<Components>()
    world.addArchetype(physicalArchetype)
    world.addSystems(new PhysicsSystem())

    expect(world.hasSystem(PhysicsSystem)).toBe(true)

    const a = world.getSystem(PhysicsSystem)
    expect(a).toBeInstanceOf(PhysicsSystem)
  })
})
