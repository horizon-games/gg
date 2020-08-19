import Component from '../Component'
import { PositionComponent } from './Component.fixtures'

describe('Component', () => {
  test('can create', () => {
    const component = new PositionComponent({ x: 1, y: 2, z: 3 })

    expect(component).toBeInstanceOf(Component)
    expect(component).toBeInstanceOf(PositionComponent)
    expect(component.type).toBe('position')
    expect(component.value).toEqual({ x: 1, y: 2, z: 3 })

    component.value.x = 4

    expect(component.value).toEqual({ x: 4, y: 2, z: 3 })
  })
})
