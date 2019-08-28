import System from '../System'
import EntityManager from '../EntityManager'
import { Components } from './Component.fixtures'
import { Archetypes } from './Archetype.fixtures'

export class PhysicsSystem extends System<Components> {
  update(manager: EntityManager<Components>, dt: number) {
    const all = manager.getArchetype(Archetypes.Physical)

    all.entities.forEach(entity => {
      entity.getComponent('position')!.x += 1
    })
  }

  someMethod() {
    return 5
  }
}
