import { describe, test, expect } from 'vitest'

import { EntityManager } from '../src/EntityManager'
import { System } from '../src/System'

import { AllArchetype } from './Archetype.fixtures'
import { Components } from './Component.fixtures'

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
