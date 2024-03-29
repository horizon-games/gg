import { System, EntityManager } from '../../../../src'
import { PlayerCardsArchetype, OpponentCardsArchetype } from '../archetypes'
import { Components, PositionComponent } from '../components'
import { CardStatus } from '../types'

const updateDeckPosition = (
  playerId: number,
  position: PositionComponent['value'],
  idx: number
) => {
  position.x = playerId ? window.innerWidth - 160 : 30
  position.y = playerId ? window.innerHeight - 205 : 30
  position.z = -40 + idx * 2
}

export class DeckSystem extends System<Components> {
  update(manager: EntityManager<Components>) {
    const { entities: playerCards } = manager.getArchetype(PlayerCardsArchetype)
    const { entities: opponentCards } = manager.getArchetype(
      OpponentCardsArchetype
    )

    playerCards
      .filter(
        (entity) => entity.components.card!.value.status === CardStatus.Deck
      )
      .forEach((entity, idx) => {
        const position = entity.getComponentValue('position')
        const player = entity.getComponentValue('player')
        updateDeckPosition(player.id, position, idx)
      })

    opponentCards
      .filter(
        (entity) => entity.components.card!.value.status === CardStatus.Deck
      )
      .forEach((entity, idx) => {
        const position = entity.getComponentValue('position')
        const player = entity.getComponentValue('player')
        updateDeckPosition(player.id, position, idx)
      })
  }
}
