import { System, EntityManager, Entity } from '../../../../src/ecs'
import { Components, PositionComponent } from '../components'
import { Archetypes } from '../archetypes'
import { CardStatus } from '../types'

const updateDeckPosition = (
  playerId: number,
  position: PositionComponent,
  idx: number
) => {
  position.x = window.innerWidth / 2
  position.y = window.innerHeight / 2 + (playerId ? 10 : -180)
}

export default class FieldSystem extends System<Components> {
  update(manager: EntityManager<Components>, dt: number) {
    const { entities } = manager.getArchetype(Archetypes.Cards)
    const cards = entities.filter(
      entity => entity.components.card!.status === CardStatus.Field
    )

    cards.forEach((entity, idx) => {
      const position = entity.getComponent('position')
      const player = entity.getComponent('player')
      updateDeckPosition(player.id, position, idx)
    })
  }
}
