import Entity from '../Entity'

import { Components, PositionComponent } from './component.fixtures'
import Component from '../Component'

class TagComponent extends Component {}
class PrimitiveValueComponent extends Component {
  value: number
}
class ArrayValueComponent extends Component {
  value: number[]
}

describe('Entity', () => {
  test('can create', () => {
    const entity = new Entity<Components>()

    expect(entity.componentTypes.length).toBe(0)
  })

  test('can add component', () => {
    const pos = new PositionComponent({ x: 1, y: 2, z: 3 })
    const entity = new Entity<Components>()

    expect(entity.componentTypes.length).toBe(0)

    entity.addComponent(pos)

    expect(entity.componentTypes.length).toBe(1)
    expect(entity.hasComponents('position')).toBe(true)
    expect(entity.getComponent('position')).toEqual({
      x: 1,
      y: 2,
      z: 3
    })
  })

  test('can set component value', () => {
    const entity = new Entity<{
      position: PositionComponent
      primitiveValue: PrimitiveValueComponent
      arrayValue: ArrayValueComponent
    }>([
      new PositionComponent({ x: 0, y: 0, z: 0 }),
      new PrimitiveValueComponent(1),
      new ArrayValueComponent([1, 2])
    ])

    const component = entity.getComponent('position')
    component.x = 1

    expect(entity.getComponent('position')).toEqual({
      x: 1,
      y: 0,
      z: 0
    })

    entity.setComponent('position', { y: 2 })

    expect(entity.getComponent('position')).toEqual({
      x: 1,
      y: 2,
      z: 0
    })

    expect(entity.getComponent('primitiveValue')).toBe(1)
    entity.setComponent('primitiveValue', 2)

    expect(entity.getComponent('primitiveValue')).toBe(2)

    expect(entity.getComponent('arrayValue')).toEqual([1, 2])

    entity.setComponent('arrayValue', [3, 4])

    expect(entity.getComponent('arrayValue')).toEqual([3, 4])
  })

  test('can toggle a tag component', () => {
    const entity = new Entity<any>()

    entity.toggleComponent(TagComponent, true)

    expect(entity.hasComponent('tag')).toBe(true)

    entity.toggleComponent(TagComponent, false)

    expect(entity.hasComponent('tag')).toBe(false)
  })

  test('can handle onChange event', () => {
    const entity = new Entity<any>()
    const spy = jest.fn()
    const disposer = entity.onChange(spy)

    expect(spy).not.toHaveBeenCalled()

    entity.toggleComponent(TagComponent, true)

    expect(spy).toHaveBeenCalled()
    expect(spy).toHaveBeenCalledWith({
      type: 'add',
      componentType: 'tag',
      entity
    })

    entity.toggleComponent(TagComponent, false)

    expect(spy).toHaveBeenCalledWith({
      type: 'remove',
      componentType: 'tag',
      entity
    })

    disposer()

    entity.toggleComponent(TagComponent, true)

    expect(spy.mock.calls.length).toBe(2)
  })
})
