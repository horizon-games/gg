import Entity from '../Entity'

import {
  Components,
  PositionComponent,
  VelocityComponent,
  RotationComponent,
  AccelerationComponent
} from './component.fixtures'

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
      type: 'position',
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
      type: 'position',
      x: 1,
      y: 0,
      z: 0
    })

    expect(entity.setComponent('position', { y: 2, z: 3 }))
    expect(entity.getComponent('position')).toEqual({
      type: 'position',
      x: 1,
      y: 2,
      z: 3
    })
  })
})
