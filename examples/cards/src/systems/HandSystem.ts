import { System, EntityManager, Entity } from '../../../../src/ecs'
import { Components } from '../components'

export default class HandSystem extends System<Components> {
  update(manager: EntityManager<Components>, dt: number) {}
}
