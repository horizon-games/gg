import { Archetype, Entity } from '../../../../src/ecs'
import Archetypes from './Archetypes'
import { Components } from '../components'
import { CardStatus } from '../types'

export default new Archetype<Components>(Archetypes.PlayerDeckCards, [
  (entity: Entity<Components>) =>
    !!entity.components.player &&
    entity.components.player.id === 1 &&
    !!entity.components.card &&
    entity.components.card.status === CardStatus.Deck
])
