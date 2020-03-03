import { Archetype, Entity } from '../../../../src/ecs'
import { Components } from '../components'
import { CardStatus } from '../types'

export default class DeckCardsArchetype extends Archetype<Components> {
  filters = [
    Archetype.include('card'),
    (entity: Entity<Components>) =>
      entity.components.card!.value.status === CardStatus.Deck
  ]
}
