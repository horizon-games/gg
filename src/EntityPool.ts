import { ComponentOf, ComponentTypes } from './Component'
import { Entity } from './Entity'

/**
 * Manages a pool of reusable Entities.
 * Once an Entity is released, it can be renewed with new components
 */
export class EntityPool<C extends ComponentTypes> {
  readonly entities: Entity<C>[]

  /** Size of the pool */
  readonly size: number = 0

  /** Cursor to the next available entity in the pool */
  private head: number = -1

  constructor(size: number) {
    this.size = size
    this.entities = new Array(size)

    // Fill the pool with new entities
    for (let idx = 0; idx < size; idx++) {
      this.entities[++this.head] = new Entity<C>()
    }
  }

  /**
   * The count of used entities in the pool
   * */
  get length(): number {
    return this.size - this.head - 1
  }

  /**
   * Whether the pool is full or not
   * */
  get isExhausted(): boolean {
    return this.head === -1
  }

  /**
   * Get an Entity from the pool
   * */
  getEntity(components: ComponentOf<C>[] = []): Entity<C> {
    if (this.isExhausted) {
      throw new Error(
        'EntityPool: Attempted to take an Entity from an exhausted pool.'
      )
    }

    const entity = this.entities[this.head--]
    entity.addComponents(components)

    return entity
  }

  /**
   * Release an Entity back into the pool
   * */
  releaseEntity(entity: Entity<C>) {
    if (this.head === this.size - 1) {
      throw new Error(
        'EntityPool: Attempted to release an Entity back into a full pool.'
      )
    }

    entity.reset()
    this.entities[++this.head] = entity
  }
}
