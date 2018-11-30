import { Archetype } from '../../../../src/ecs'
import Archetypes from './Archetypes'
import { Components } from '../components'

export default new Archetype<Components>(Archetypes.Draggable, [
  Archetype.include('draggable')
])
