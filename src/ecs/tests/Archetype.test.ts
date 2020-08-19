import Archetype from '../Archetype'
import Entity from '../Entity'

import {
  Components,
  PositionComponent,
  RotationComponent,
  VelocityComponent,
  StaticComponent
} from './Component.fixtures'

describe('Archetype', () => {
  test('can create archetype', () => {
    class AllArchetype extends Archetype<Components> {}
    class EmptyArchetype extends Archetype<Components> {
      filters = [this.only()]
    }

    expect(new AllArchetype().filters.length).toBe(0)
    expect(new EmptyArchetype().filters.length).toBe(1)
  })

  test('can create archetype with filters', () => {
    class AllArchetype extends Archetype<Components> {}
    class AnyArchetype extends Archetype<Components> {
      filters = [this.any('position', 'rotation')]
    }
    class EmptyArchetype extends Archetype<Components> {
      filters = [this.only()]
    }
    class NonEmptyArchetype extends Archetype<Components> {
      filters = [(x: Entity<Components>) => x.componentTypes.length > 0]
    }
    class PositionOnlyArchetype extends Archetype<Components> {
      filters = [this.only('position')]
    }
    class PositionArchetype extends Archetype<Components> {
      filters = [this.include('position')]
    }
    class PhysicalArchetype extends Archetype<Components> {
      filters = [
        this.include('position', 'rotation', 'velocity'),
        this.exclude('static')
      ]
    }
    class ExcludeArchetype extends Archetype<Components> {
      filters = [this.exclude('position', 'rotation', 'velocity')]
    }

    const entity = new Entity<Components>()

    const allArchetype = new AllArchetype()
    const anyArchetype = new AnyArchetype()
    const emptyArchetype = new EmptyArchetype()
    const nonEmptyArchetype = new NonEmptyArchetype()
    const positionOnlyArchetype = new PositionOnlyArchetype()
    const positionArchetype = new PositionArchetype()
    const physicalArchetype = new PhysicalArchetype()
    const excludeArchetype = new ExcludeArchetype()

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
    class PositionArchetype extends Archetype<Components> {
      filters = [this.include('position')]
    }
    const archetype = new PositionArchetype()

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
    class PositionArchetype extends Archetype<Components> {
      filters = [this.include('position')]
    }

    const archetype = new PositionArchetype()

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
    class PositionArchetype extends Archetype<Components> {
      filters = [this.include('position')]
    }

    const archetype = new PositionArchetype()

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
