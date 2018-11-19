import { System, EntityManager, Entity } from '../../../../src/ecs'
import { Components, PositionComponent } from '../components'
import { Archetypes } from '../archetypes'
import { CardStatus } from '../types'

const updateDeckPosition = (
  playerId: number,
  position: PositionComponent,
  idx: number
) => {
  position.x = (playerId ? window.innerWidth - 160 : 30) + idx * 2
  position.y = (playerId ? window.innerHeight - 205 : 30) + idx
}

export default class DeckSystem extends System<Components> {
  update(manager: EntityManager<Components>, dt: number) {
    const { entities } = manager.getArchetype(Archetypes.Cards)

    const opponentCards = entities.filter(
      entity =>
        entity.components.card!.status === CardStatus.Deck &&
        entity.components.player!.id === 0
    )

    const playerCards = entities.filter(
      entity =>
        entity.components.card!.status === CardStatus.Deck &&
        entity.components.player!.id === 1
    )

    opponentCards.forEach((entity, idx) => {
      const position = entity.getComponent('position')
      const player = entity.getComponent('player')
      updateDeckPosition(player.id, position, idx)
    })

    playerCards.forEach((entity, idx) => {
      const position = entity.getComponent('position')
      const player = entity.getComponent('player')
      updateDeckPosition(player.id, position, idx)
    })
  }
}
