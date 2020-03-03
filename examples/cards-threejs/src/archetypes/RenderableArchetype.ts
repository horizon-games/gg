import { Archetype } from '../../../../src/ecs'
import { Components } from '../components'

export default class RenderableArchetype extends Archetype<Components> {
  filters = [Archetype.include('mesh')]
}
