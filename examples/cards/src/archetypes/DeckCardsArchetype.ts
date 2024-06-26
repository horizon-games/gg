import { Archetype, Entity } from '../../../../src'
import { Components } from '../components'
import { CardStatus } from '../types'

export class DeckCardsArchetype extends Archetype<Components> {
  filters = [
    this.include('card'),
    (entity: Entity<Components>) =>
      entity.components.card!.value.status === CardStatus.Deck,
  ]
}
