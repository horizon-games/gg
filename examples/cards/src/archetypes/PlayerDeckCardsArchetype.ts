import { Archetype, Entity } from '../../../../src'
import { Components } from '../components'
import { CardStatus } from '../types'

export class PlayerDeckCardsArchetype extends Archetype<Components> {
  filters = [
    (entity: Entity<Components>) =>
      !!entity.components.player!.value &&
      entity.components.player!.value.id === 1 &&
      !!entity.components.card! &&
      entity.components.card!.value.status === CardStatus.Deck,
  ]
}
