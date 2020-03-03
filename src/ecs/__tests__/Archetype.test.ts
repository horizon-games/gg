import Archetype from '../Archetype'
import Entity from '../Entity'

import {
  Components,
  PositionComponent,
  RotationComponent,
  VelocityComponent,
  StaticComponent
} from './Component.fixtures'

enum Archetypes {
  All,
  Any,
  Empty,
  NonEmpty,
  PositionOnly,
  Position,
  Physical,
  Exclude
}

describe('Archetype', () => {
  test('can create archetype', () => {
    const allArchetype = new Archetype<Components>(Archetypes.All)
    const emptyArchetype = new Archetype<Components>(Archetypes.Empty, [
      Archetype.only<Components>()
    ])

    expect(allArchetype.filters.length).toBe(0)
    expect(emptyArchetype.filters.length).toBe(1)
  })

  test('can create archetype with filters', () => {
    const allArchetype = new Archetype<Components>(Archetypes.All)
    const anyArchetype = new Archetype<Components>(Archetypes.Any, [
      Archetype.any<Components>('position', 'rotation')
    ])
    const emptyArchetype = new Archetype<Components>(Archetypes.Empty, [
      Archetype.only<Components>()
    ])
    const nonEmptyArchetype = new Archetype<Components>(Archetypes.NonEmpty, [
      (x: Entity<Components>) => x.componentTypes.length > 0
    ])
    const positionOnlyArchetype = new Archetype<Components>(
      Archetypes.PositionOnly,
      [Archetype.only<Components>('position')]
    )
    const positionArchetype = new Archetype<Components>(Archetypes.Position, [
      Archetype.include<Components>('position')
    ])
    const physicalArchetype = new Archetype<Components>(Archetypes.Physical, [
      Archetype.include<Components>('position', 'rotation', 'velocity'),
      Archetype.exclude<Components>('static')
    ])
    const excludeArchetype = new Archetype<Components>(Archetypes.Exclude, [
      Archetype.exclude<Components>('position', 'rotation', 'velocity')
    ])

    const entity = new Entity<Components>()

    expect(allArchetype.matchesEntity(entity)).toBe(true)
    expect(anyArchetype.matchesEntity(entity)).toBe(false)
    expect(emptyArchetype.matchesEntity(entity)).toBe(true)
    expect(nonEmptyArchetype.matchesEntity(entity)).toBe(false)
    expect(positionOnlyArchetype.matchesEntity(entity)).toBe(false)
    expect(positionArchetype.matchesEntity(entity)).toBe(false)
    expect(physicalArchetype.matchesEntity(entity)).toBe(false)
    expect(excludeArchetype.matchesEntity(entity)).toBe(true)

    entity.addComponent(new PositionComponent({ x: 0, y: 0, z: 0 }))

    expect(allArchetype.matchesEntity(entity)).toBe(true)
    expect(anyArchetype.matchesEntity(entity)).toBe(true)
    expect(emptyArchetype.matchesEntity(entity)).toBe(false)
    expect(nonEmptyArchetype.matchesEntity(entity)).toBe(true)
    expect(positionOnlyArchetype.matchesEntity(entity)).toBe(true)
    expect(positionArchetype.matchesEntity(entity)).toBe(true)
    expect(physicalArchetype.matchesEntity(entity)).toBe(false)
    expect(excludeArchetype.matchesEntity(entity)).toBe(false)

    entity.addComponent(new RotationComponent({ x: 0, y: 0, z: 0 }))

    expect(allArchetype.matchesEntity(entity)).toBe(true)
    expect(anyArchetype.matchesEntity(entity)).toBe(true)
    expect(emptyArchetype.matchesEntity(entity)).toBe(false)
    expect(nonEmptyArchetype.matchesEntity(entity)).toBe(true)
    expect(positionOnlyArchetype.matchesEntity(entity)).toBe(false)
    expect(positionArchetype.matchesEntity(entity)).toBe(true)
    expect(physicalArchetype.matchesEntity(entity)).toBe(false)
    expect(excludeArchetype.matchesEntity(entity)).toBe(false)

    entity.addComponent(new VelocityComponent({ x: 0, y: 0, z: 0 }))

    expect(physicalArchetype.matchesEntity(entity)).toBe(true)
    expect(excludeArchetype.matchesEntity(entity)).toBe(false)

    entity.addComponent(new StaticComponent())

    expect(physicalArchetype.matchesEntity(entity)).toBe(false)

    entity.removeComponent('position')

    expect(excludeArchetype.matchesEntity(entity)).toBe(false)

    entity.removeComponent('rotation')

    expect(excludeArchetype.matchesEntity(entity)).toBe(false)

    entity.removeComponent('velocity')

    expect(excludeArchetype.matchesEntity(entity)).toBe(true)
  })

  test('can handle onChange event', () => {
    const archetype = new Archetype<Components>(Archetypes.Position, [
      Archetype.include('position')
    ])

    const spy = jest.fn()
    const disposer = archetype.onChange(spy)

    expect(spy).not.toHaveBeenCalled()

    const entity = new Entity<any>()

    archetype.handleEntityChange(entity)

    expect(archetype.entities).toHaveLength(0)

    expect(spy).not.toHaveBeenCalled()

    entity.addComponent(new PositionComponent({ x: 0, y: 0, z: 0 }))

    archetype.handleEntityChange(entity)

    expect(archetype.entities).toHaveLength(1)

    expect(spy).toHaveBeenCalled()
    expect(spy).toHaveBeenCalledWith({
      type: 'add',
      archetype,
      entity
    })

    entity.removeComponent('position')

    archetype.handleEntityChange(entity)

    expect(archetype.entities).toHaveLength(0)

    expect(spy).toHaveBeenCalledWith({
      type: 'remove',
      archetype,
      entity
    })

    disposer()

    entity.addComponent(new PositionComponent({ x: 0, y: 0, z: 0 }))

    archetype.handleEntityChange(entity)

    expect(spy.mock.calls).toHaveLength(2)
  })

  test('can handle onAdd event', () => {
    const archetype = new Archetype<Components>(Archetypes.Position, [
      Archetype.include('position')
    ])

    const spy = jest.fn()
    const disposer = archetype.onAdd(spy)

    expect(spy).not.toHaveBeenCalled()

    const entity = new Entity<any>()

    archetype.handleEntityChange(entity)

    expect(archetype.entities).toHaveLength(0)

    expect(spy).not.toHaveBeenCalled()

    entity.addComponent(new PositionComponent({ x: 0, y: 0, z: 0 }))

    archetype.handleEntityChange(entity)

    expect(archetype.entities).toHaveLength(1)

    expect(spy).toHaveBeenCalled()
    expect(spy).toHaveBeenCalledWith({
      type: 'add',
      archetype,
      entity
    })

    entity.removeComponent('position')

    archetype.handleEntityChange(entity)

    expect(archetype.entities).toHaveLength(0)

    disposer()

    entity.addComponent(new PositionComponent({ x: 0, y: 0, z: 0 }))

    archetype.handleEntityChange(entity)

    expect(spy.mock.calls).toHaveLength(1)
  })

  test('can handle onRemove event', () => {
    const archetype = new Archetype<Components>(Archetypes.Position, [
      Archetype.include('position')
    ])

    const spy = jest.fn()
    const disposer = archetype.onRemove(spy)

    expect(spy).not.toHaveBeenCalled()

    const entity = new Entity<any>()

    archetype.handleEntityChange(entity)

    expect(archetype.entities).toHaveLength(0)

    expect(spy).not.toHaveBeenCalled()

    entity.addComponent(new PositionComponent({ x: 0, y: 0, z: 0 }))

    archetype.handleEntityChange(entity)

    expect(archetype.entities).toHaveLength(1)

    expect(spy).not.toHaveBeenCalled()

    entity.removeComponent('position')

    archetype.handleEntityChange(entity)

    expect(spy).toHaveBeenCalledWith({
      type: 'remove',
      archetype,
      entity
    })

    expect(archetype.entities).toHaveLength(0)

    disposer()

    entity.addComponent(new PositionComponent({ x: 0, y: 0, z: 0 }))

    archetype.handleEntityChange(entity)

    entity.removeComponent('position')

    archetype.handleEntityChange(entity)

    expect(spy.mock.calls).toHaveLength(1)
  })
})
