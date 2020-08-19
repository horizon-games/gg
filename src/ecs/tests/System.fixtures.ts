import System from '../System'
import EntityManager from '../EntityManager'
import { Components } from './Component.fixtures'
import { PhysicalArchetype } from './Archetype.fixtures'

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
