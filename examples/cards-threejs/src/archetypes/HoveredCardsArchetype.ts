import { Archetype } from '../../../../src'
import { Components } from '../components'

export class HoveredCardsArchetype extends Archetype<Components> {
  filters = [this.include('hover')]
}
