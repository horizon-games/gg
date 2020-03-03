import { Archetype, Entity } from '../../../../src/ecs'
import { Components } from '../components'

export default class PlayerCardsArchetype extends Archetype<Components> {
  filters = [
    Archetype.include('card'),
    Archetype.include('player'),
    (entity: Entity<Components>) => entity.components.player!.value.id === 1
  ]
}
