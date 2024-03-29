import { Archetype } from '../../../../src'
import { Components } from '../components'

export class CardsArchetype extends Archetype<Components> {
  filters = [this.include('card')]
}
