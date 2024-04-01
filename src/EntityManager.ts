import { Archetype } from './Archetype'
import { ComponentOf, ComponentTypes } from './Component'
import { Entity } from './Entity'

export class EntityManager<C extends ComponentTypes> {
  entities: Map<number, Entity<C>> = new Map()
  archetypes: Map<string, Archetype<C>> = new Map()
  entityChangeDisposers: Map<number, () => void> = new Map()

  /**
   * Filter entities by component types
   */
  filter(types: string[]): Entity<C>[] {
    return Array.from(this.entities.values()).filter((entity) =>
      entity.hasComponents(...types)
    )
  }

  /**
   * Add an entity to the manager
   */
  addEntity(entity: Entity<C>) {
    if (!this.hasEntity(entity.id)) {
      this.entities.set(entity.id, entity)

      // Add entity listener
      this.entityChangeDisposers.set(
        entity.id,
        entity.onChange((ev) => {
          const { type, entity, component } = ev
          switch (type) {
            case 'add':
              this.handleEntityAddComponent(entity, component)
              break

            case 'remove':
              this.handleEntityRemoveComponent(entity, component)
          }
        })
      )

      // Add entity to archetypes
      for (const archetype of this.archetypes.values()) {
        archetype.handleEntityAdd(entity)
      }
    }
  }

  /**
   * Remove an entity from the manager
   */
  removeEntity(entity: Entity<C>) {
    if (this.hasEntity(entity.id)) {
      this.entities.delete(entity.id)

      // clean up entity listener disposers
      if (this.entityChangeDisposers.has(entity.id)) {
        this.entityChangeDisposers.get(entity.id)!()
        this.entityChangeDisposers.delete(entity.id)
      }

      // Remove entity from archetypes
      for (const archetype of this.archetypes.values()) {
        archetype.handleEntityRemove(entity)
      }

      entity.reset()
    }
  }
  /**
   * Check if the manager has an entity
   */
  hasEntity(entityId: number): boolean {
    return this.entities.has(entityId)
  }

  /**
   * Get an entity from the manager
   */
  getEntity(entityId: number): Entity<C> | undefined {
    return this.entities.get(entityId)
  }

  /**
   * Create a new entity and add it to the manager
   */
  createEntity(components: ComponentOf<C>[] = []): Entity<C> {
    const entity = new Entity<C>(components)
    this.addEntity(entity)

    return entity
  }

  /**
   * Add an archetype to the manager
   */
  addArchetype<T extends Archetype<C>>(klass: new (...args: any[]) => T) {
    const type = klass.name

    if (this.archetypes.has(type)) {
      throw new Error(
        `EntityManager: Could not add archetype as '${type}' already exists.`
      )
    }

    const archetype = new klass()
    this.archetypes.set(type, archetype)

    // Add matching entities to archetypes
    for (const entity of this.entities.values()) {
      archetype.handleEntityAdd(entity)
    }

    return archetype
  }

  /**
   * Remove an archetype from the manager
   */
  removeArchetype<T extends Archetype<C>>(
    klass: new (...args: any[]) => T
  ): Archetype<C> {
    const archetype = this.archetypes.get(klass.name)

    if (!archetype) {
      throw new Error(
        `EntityManager: Could not delete archetype as '${klass.name}' does not exists.`
      )
    }

    this.archetypes.delete(klass.name)

    return archetype
  }

  /**
   * Check if the manager has an archetype
   */
  hasArchetype<T extends Archetype<C>>(
    klass: new (...args: any[]) => T
  ): boolean {
    return this.archetypes.has(klass.name)
  }

  /**
   * Get an archetype from the manager
   */
  getArchetype<T extends Archetype<C>>(klass: new (...args: any[]) => T): T {
    const archetype = this.archetypes.get(klass.name)

    if (!archetype) {
      throw new Error(
        `EntityManager: Could not get archetype as '${klass.name}' does not exists.`
      )
    }

    return archetype as T
  }

  /**
   * Handle entity add component event
   */
  private handleEntityAddComponent(
    entity: Entity<C>,
    component: ComponentOf<C>
  ) {
    if (this.hasEntity(entity.id)) {
      for (const archetype of this.archetypes.values()) {
        archetype.handleEntityChange(entity, component)
      }
    }
  }

  /**
   * Handle entity remove component event
   */
  private handleEntityRemoveComponent(
    entity: Entity<C>,
    component: ComponentOf<C>
  ) {
    if (this.hasEntity(entity.id)) {
      for (const archetype of this.archetypes.values()) {
        archetype.handleEntityChange(entity, component)
      }
    }
  }
}
