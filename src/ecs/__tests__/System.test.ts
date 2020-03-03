import System from '../System'
import EntityManager from '../EntityManager'

import { Components } from './Component.fixtures'
import { AllArchetype } from './Archetype.fixtures'

class PhysicsSystem extends System<Components> {
  update(manager: EntityManager<Components>, dt: number, time: number) {
    const all = manager.getArchetype(AllArchetype)
  }
}

describe('System', () => {
  test('can create', () => {
    const system = new PhysicsSystem()
    expect(system.enabled).toBe(true)
  })
})
