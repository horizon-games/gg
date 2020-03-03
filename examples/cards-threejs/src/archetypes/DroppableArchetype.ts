import { Archetype } from '../../../../src/ecs'
import { Components } from '../components'

export default class DroppableArchetype extends Archetype<Components> {
  filters = [Archetype.include('droppable')]
}
