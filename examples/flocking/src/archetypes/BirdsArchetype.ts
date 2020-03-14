import { Archetype } from '../../../../src/ecs'
import { Components } from '../components'

type BirdComponents = Pick<Components, 'position' | 'velocity' | 'acceleration'>

export default class BirdsArchetype extends Archetype<BirdComponents> {
  filters = [
    this.include('position'),
    this.include('velocity'),
    this.include('acceleration')
  ]
}
