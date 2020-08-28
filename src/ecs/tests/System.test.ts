import type EntityManager from '../EntityManager'
import System from '../System'
import { AllArchetype } from './Archetype.fixtures'
import type { Components } from './Component.fixtures'

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
