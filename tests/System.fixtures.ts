import type EntityManager from '../src/EntityManager'
import System from '../src/System'
import { PhysicalArchetype } from './Archetype.fixtures'
import type { Components } from './Component.fixtures'

export class PhysicsSystem extends System<Components> {
  update(manager: EntityManager<Components>, dt: number) {
    const all = manager.getArchetype(PhysicalArchetype)

    for (const entity of all.entities) {
      entity.getComponentValue('position').x += 1
    }
  }

  someMethod() {
    return 5
  }
}
