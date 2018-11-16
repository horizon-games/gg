import { System, EntityManager, Entity } from '../../../../src/ecs'
import { Components } from '../components'

class DeckSystem extends System<Components> {
  update(manager: EntityManager<Components>, dt: number) {}
}
