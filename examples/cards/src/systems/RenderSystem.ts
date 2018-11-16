import { System, EntityManager, Entity } from '../../../../src/ecs'
import { Components } from '../components'

export default class RenderSystem extends System<Components> {
  update(manager: EntityManager<Components>, dt: number) {}
}
