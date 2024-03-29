import { Vector3 } from 'three'

import { System, EntityManager } from '../../../../src'
import { PlayerCardsArchetype, OpponentCardsArchetype } from '../archetypes'
import camera from '../camera'
import { Components, PositionComponent } from '../components'
import { CardStatus } from '../types'
import { get2DPositionAtDepth } from '../utils'

const updateCardPosition = (
  deckPosition: Vector3,
  position: PositionComponent['value'],
  idx: number
) => {
  position.x = deckPosition.x
  position.y = deckPosition.y
  position.z = idx / 100
}

export class DeckSystem extends System<Components> {
  update(manager: EntityManager<Components>, dt: number) {
    const { entities: playerCards } = manager.getArchetype(PlayerCardsArchetype)
    const { entities: opponentCards } = manager.getArchetype(
      OpponentCardsArchetype
    )

    const playerDeckPosition = get2DPositionAtDepth(camera, 0.8, -0.7)
    const opponentDeckPosition = get2DPositionAtDepth(camera, -0.8, 0.7)

    playerCards
      .filter(
        (entity) => entity.components.card!.value.status === CardStatus.Deck
      )
      .forEach((entity, idx) => {
        const position = entity.getComponentValue('position')
        const player = entity.getComponentValue('player')
        updateCardPosition(playerDeckPosition, position, idx)
      })

    opponentCards
      .filter(
        (entity) => entity.components.card!.value.status === CardStatus.Deck
      )
      .forEach((entity, idx) => {
        const position = entity.getComponentValue('position')
        const player = entity.getComponentValue('player')
        updateCardPosition(opponentDeckPosition, position, idx)
      })
  }
}
