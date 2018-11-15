import Component from '../Component'
import { PositionComponent } from './component.fixtures'

describe('Component', () => {
  test('can create', () => {
    const component = new PositionComponent({ x: 1, y: 2, z: 3 })

    expect(component).toBeInstanceOf(Component)
    expect(component).toBeInstanceOf(PositionComponent)
    expect(component).toEqual({ type: 'position', x: 1, y: 2, z: 3 })

    component.x = 4

    expect(component).toEqual({ type: 'position', x: 4, y: 2, z: 3 })
  })
})
