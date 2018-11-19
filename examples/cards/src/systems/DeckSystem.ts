import { System, EntityManager, Entity } from '../../../../src/ecs'
import { Components, PositionComponent } from '../components'
import { Archetypes } from '../archetypes'
import { CardStatus } from '../types'

const updateDeckPosition = (
  playerId: number,
  position: PositionComponent,
  idx: number
) => {
  position.x = (playerId ? window.innerWidth - 175 : 30) + idx
  position.y = (playerId ? window.innerHeight - 225 : 30) + idx
}

export default class DeckSystem extends System<Components> {
  update(manager: EntityManager<Components>, dt: number) {
    const { entities } = manager.getArchetype(Archetypes.Cards)
    const cards = entities.filter(
      entity => entity.components.card!.status === CardStatus.Deck
    )

    cards.forEach((entity, idx) => {
      const position = entity.getComponent('position')
      const player = entity.getComponent('player')
      updateDeckPosition(player.id, position, idx)
    })
  }
}
