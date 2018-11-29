import { System, EntityManager, Entity } from '../../../../src/ecs'
import { Components, PositionComponent } from '../components'
import { Archetypes } from '../archetypes'
import { CardStatus } from '../types'
import { get2DPositionAtDepth } from '../utils'
import camera from '../camera'
import { Vector3 } from 'three'

const updateCardPosition = (
  deckPosition: Vector3,
  position: PositionComponent['value'],
  idx: number
) => {
  position.x = deckPosition.x
  position.y = deckPosition.y
  position.z = idx / 100
}

export default class DeckSystem extends System<Components> {
  update(manager: EntityManager<Components>, dt: number) {
    const { entities: playerCards } = manager.getArchetype(
      Archetypes.PlayerCards
    )
    const { entities: opponentCards } = manager.getArchetype(
      Archetypes.OpponentCards
    )

    const playerDeckPosition = get2DPositionAtDepth(camera, 0.8, -0.7)
    const opponentDeckPosition = get2DPositionAtDepth(camera, -0.8, 0.7)

    playerCards
      .filter(entity => entity.components.card!.status === CardStatus.Deck)
      .forEach((entity, idx) => {
        const position = entity.getComponent('position')
        const player = entity.getComponent('player')
        updateCardPosition(playerDeckPosition, position, idx)
      })

    opponentCards
      .filter(entity => entity.components.card!.status === CardStatus.Deck)
      .forEach((entity, idx) => {
        const position = entity.getComponent('position')
        const player = entity.getComponent('player')
        updateCardPosition(opponentDeckPosition, position, idx)
      })
  }
}
