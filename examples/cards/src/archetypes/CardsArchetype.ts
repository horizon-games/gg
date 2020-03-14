import { Archetype } from '../../../../src/ecs'
import { Components } from '../components'

export default class CardsArchetype extends Archetype<Components> {
  filters = [this.include('card')]
}
