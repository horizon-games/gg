import type { ComponentOf, ComponentTypes } from './Component'
import Entity from './Entity'

export default class EntityPool<C extends ComponentTypes> {
  head: number = -1
  entities: Entity<C>[]

  constructor(public size: number) {
    this.entities = new Array(size)

    for (let idx = 0; idx < size; idx++) {
      this.entities[++this.head] = new Entity<C>()
    }
  }

  get length(): number {
    return this.size - this.head - 1
  }

  // Take an Entity from the pool
  renew(components: ComponentOf<C>[] = []): Entity<C> {
    if (this.head >= 0) {
      const entity = this.entities[this.head--]
      return entity.renew(components)
    } else {
      throw new Error(
        'EntityPool: Attempted to take an Entity from an exhausted pool.'
      )
    }
  }

  // Release an Entity back into the pool
  release(entity: Entity<C>) {
    if (entity instanceof Entity) {
      if (this.head < this.size - 1) {
        this.entities[++this.head] = entity
      } else {
        throw new Error(
          'EntityPool: Attempted to release an Entity back into a full pool.'
        )
      }
    } else {
      throw new Error('EntityPool: Released object was not an Entity.')
    }
  }
}
