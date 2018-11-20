import { Archetype, Entity } from '../../../../src/ecs'
import Archetypes from './Archetypes'
import { Components } from '../components'

export default new Archetype<Components>(Archetypes.OpponentCards, [
  Archetype.include('card'),
  Archetype.include('player'),
  (entity: Entity<Components>) => entity.components.player!.id === 0
])
