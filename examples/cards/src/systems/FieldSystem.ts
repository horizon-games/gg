import { System, EntityManager, Entity } from '../../../../src/ecs'
import { Components, PositionComponent } from '../components'
import { Archetypes } from '../archetypes'
import { CardStatus } from '../types'

export default class FieldSystem extends System<Components> {
  update(manager: EntityManager<Components>, dt: number) {
    let { entities: playerCards } = manager.getArchetype(Archetypes.PlayerCards)
    let { entities: opponentCards } = manager.getArchetype(
      Archetypes.OpponentCards
    )
    playerCards = playerCards.filter(
      entity => entity.components.card!.status === CardStatus.Field
    )
    opponentCards = opponentCards.filter(
      entity => entity.components.card!.status === CardStatus.Field
    )
  }
}
