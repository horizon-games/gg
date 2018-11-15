import { Archetype } from '../../../ecs'
import Archetypes from './Archetypes'
import { Components } from '../components'

type BirdComponents = Pick<Components, 'position' | 'velocity' | 'acceleration'>

export default new Archetype<BirdComponents>(Archetypes.Birds, [
  Archetype.include('position'),
  Archetype.include('velocity'),
  Archetype.include('acceleration')
])
