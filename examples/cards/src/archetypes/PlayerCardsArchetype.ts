import { Archetype, Entity } from '../../../../src/ecs'
import { Components } from '../components'

export default class PlayerCardsArchetype extends Archetype<Components> {
  filters = [
    this.include('card'),
    this.include('player'),
    (entity: Entity<Components>) => entity.components.player!.value.id === 1
  ]
}
