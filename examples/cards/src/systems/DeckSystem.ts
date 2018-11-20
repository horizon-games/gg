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
    const { entities: playerCards } = manager.getArchetype(
      Archetypes.PlayerCards
    )
    const { entities: opponentCards } = manager.getArchetype(
      Archetypes.OpponentCards
    )

    playerCards
      .filter(entity => entity.components.card!.status === CardStatus.Deck)
      .forEach((entity, idx) => {
        const position = entity.getComponent('position')
        const player = entity.getComponent('player')
        updateDeckPosition(player.id, position, idx)
      })

    opponentCards
      .filter(entity => entity.components.card!.status === CardStatus.Deck)
      .forEach((entity, idx) => {
        const position = entity.getComponent('position')
        const player = entity.getComponent('player')
        updateDeckPosition(player.id, position, idx)
      })
  }
}
