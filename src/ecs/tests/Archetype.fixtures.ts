import Archetype from '../Archetype'
import type Entity from '../Entity'
import type { Components } from './Component.fixtures'

export class AllArchetype extends Archetype<Components> {}
export class AnyArchetype extends Archetype<Components> {
  filters = [this.include('position', 'static')]
}
export class EmptyArchetype extends Archetype<Components> {
  filters = [this.only()]
}
export class NonEmptyArchetype extends Archetype<Components> {
  filters = [(entity: Entity<Components>) => entity.componentTypes.length > 0]
}
export class PositionOnlyArchetype extends Archetype<Components> {
  filters = [this.only('position')]
}
export class PositionArchetype extends Archetype<Components> {
  filters = [this.include('position')]
}
export class PhysicalArchetype extends Archetype<Components> {
  filters = [
    this.include('position', 'rotation', 'velocity'),
    this.exclude('static')
  ]
}
