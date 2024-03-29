import { Archetype, Entity } from '../../../../src'
import { Components } from '../components'

export class PlayerCardsArchetype extends Archetype<Components> {
  filters = [
    this.include('card'),
    this.include('player'),
    (entity: Entity<Components>) => entity.components.player!.value.id === 1,
  ]
}
