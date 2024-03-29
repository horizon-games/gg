import { Archetype } from '../../../../src'
import { Components } from '../components'

export class RenderableArchetype extends Archetype<Components> {
  filters = [this.include('mesh')]
}
