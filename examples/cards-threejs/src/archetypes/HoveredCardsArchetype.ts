import { Archetype } from '../../../../src/ecs'
import { Components } from '../components'

export default class HoveredCardsArchetype extends Archetype<Components> {
  filters = [this.include('hover')]
}
