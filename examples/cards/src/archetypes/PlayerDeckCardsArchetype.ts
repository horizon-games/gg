import { Archetype, Entity } from '../../../../src/ecs'
import Archetypes from './Archetypes'
import { Components } from '../components'
import { CardStatus } from '../components/CardComponent'

export default new Archetype<Components>(Archetypes.Cards, [
  (entity: Entity<Components>) =>
    entity.hasComponent('player') &&
    entity.components.player.id === 2 &&
    entity.hasComponent('card') &&
    entity.components.card.status === CardStatus.Deck
])
