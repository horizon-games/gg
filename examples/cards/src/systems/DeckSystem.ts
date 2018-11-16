import { System, EntityManager, Entity } from '../../../../src/ecs'
import { Components } from '../components'
import { Archetypes } from '../archetypes'

export default class DeckSystem extends System<Components> {
  update(manager: EntityManager<Components>, dt: number) {
    const { entities } = manager.getArchetype(Archetypes.Cards)
    entities.forEach(entity => {
      const position = entity.getComponent('position')

      if (position) {
        position.x += 0.1
        position.y += 0.1
      }
    })
  }
}
