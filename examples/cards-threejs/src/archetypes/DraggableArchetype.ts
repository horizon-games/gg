import { Archetype } from '../../../../src'
import { Components } from '../components'

export class DraggableArchetype extends Archetype<Components> {
  filters = [this.include('draggable')]
}
