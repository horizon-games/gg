import { Archetype } from '../../../../src'
import { Components } from '../components'

export class DroppableArchetype extends Archetype<Components> {
  filters = [this.include('droppable')]
}
