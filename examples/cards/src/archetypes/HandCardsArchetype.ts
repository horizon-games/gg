import { Archetype, Entity } from '../../../../src'
import { Components } from '../components'
import { CardStatus } from '../types'

export class HandCardsArchetype extends Archetype<Components> {
  filters = [
    this.include('card'),
    (entity: Entity<Components>) =>
      entity.components.card!.value.status === CardStatus.Hand,
  ]
}
