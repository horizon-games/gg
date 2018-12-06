import { Archetype, Entity } from '../../../../src/ecs'
import Archetypes from './Archetypes'
import { Components } from '../components'
import { CardStatus } from '../types'

export default new Archetype<Components>(Archetypes.DeckCards, [
  Archetype.include('card'),
  (entity: Entity<Components>) =>
    entity.components.card!.value.status === CardStatus.Deck
])
