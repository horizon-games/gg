import Archetype from '../Archetype'
import Entity from '../Entity'
import { Components } from './Component.fixtures'

export class AllArchetype extends Archetype<Components> {}
export class AnyArchetype extends Archetype<Components> {
  filters = [Archetype.include<Components>('position', 'static')]
}
export class EmptyArchetype extends Archetype<Components> {
  filters = [Archetype.only()]
}
export class NonEmptyArchetype extends Archetype<Components> {
  filters = [(entity: Entity<Components>) => entity.componentTypes.length > 0]
}
export class PositionOnlyArchetype extends Archetype<Components> {
  filters = [Archetype.only('position')]
}
export class PositionArchetype extends Archetype<Components> {
  filters = [Archetype.include('position')]
}
export class PhysicalArchetype extends Archetype<Components> {
  filters = [
    Archetype.include('position'),
    Archetype.include('rotation'),
    Archetype.include('velocity'),
    Archetype.exclude('static')
  ]
}
