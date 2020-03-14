import { Archetype } from '../../../../src/ecs'
import { Components } from '../components'

export default class LightsArchetype extends Archetype<Components> {
  filters = [this.include('light')]
}
