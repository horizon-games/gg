import { Archetype } from '../../../../src'
import { Components } from '../components'

export class LightsArchetype extends Archetype<Components> {
  filters = [this.include('light')]
}
