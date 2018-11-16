import { System, EntityManager, Entity } from '../../../../src/ecs'
import { Components } from '../components'

class ManaSystem extends System<Components> {
  update(manager: EntityManager<Components>, dt: number) {}
}
