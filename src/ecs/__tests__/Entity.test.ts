import Entity from '../Entity'

import { Components, PositionComponent } from './component.fixtures'
import Component from '../Component'
import { createEntityFixture } from './entity.fixtures'

class TagComponent extends Component {}

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
    const pos = new PositionComponent({ x: 0, y: 0, z: 0 })
    const entity = new Entity<Components>(pos)

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
  })

  test('can toggle a tag component', () => {
    const entity = new Entity<any>()

    entity.toggleComponent(TagComponent, true)

    expect(entity.hasComponent('tag')).toBe(true)

    entity.toggleComponent(TagComponent, false)

    expect(entity.hasComponent('tag')).toBe(false)
  })
})
