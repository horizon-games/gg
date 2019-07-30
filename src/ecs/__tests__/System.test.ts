import System from '../System'
import EntityManager from '../EntityManager'

import { Components } from './component.fixtures'

enum Archetypes {
  All,
  Empty,
  NonEmpty,
  PositionOnly,
  Position,
  Physical
}

class PhysicsSystem extends System<Components> {
  update(manager: EntityManager<Components>, dt: number, time: number) {
    const all = manager.getArchetype(Archetypes.All)
  }
}

describe('System', () => {
  test('can create', () => {
    const system = new PhysicsSystem()
    expect(system.enabled).toBe(true)
  })
})
