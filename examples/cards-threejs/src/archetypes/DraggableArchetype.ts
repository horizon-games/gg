import { Archetype } from '../../../../src/ecs'
import { Components } from '../components'

export default class DraggableArchetype extends Archetype<Components> {
  filters = [Archetype.include('draggable')]
}
