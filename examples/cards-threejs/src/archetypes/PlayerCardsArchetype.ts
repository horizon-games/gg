import { Archetype, Entity } from '../../../../src/ecs'
import Archetypes from './Archetypes'
import { Components } from '../components'

export default new Archetype<Components>(Archetypes.PlayerCards, [
  Archetype.include('card'),
  Archetype.include('player'),
  (entity: Entity<Components>) => entity.components.player!.value.id === 1
])
