import { Archetype } from './Archetype'
import { ComponentOf, ComponentTypes } from './Component'
import { Entity } from './Entity'
import { EntityManager } from './EntityManager'
import { System } from './System'

interface WorldOptions {}

/**
 * World registers systems, archetypes and entities. Updates systems.
 */
export class World<C extends ComponentTypes> {
  manager: EntityManager<C> = new EntityManager<C>()

  private systems: Map<string, System<C>> = new Map()

  constructor({}: WorldOptions = {}) {
    this.manager = new EntityManager<C>()
  }

  /** List of systems */
  get systemTypes(): string[] {
    return Array.from(this.systems.keys())
  }

  /**
   * Add a system to the world and initialize it
   */
  addSystem(system: System<C>) {
    const type = system.constructor.name

    if (this.systems.has(type)) {
      throw new Error(
        `World: Could not add system as '${type}' already exists.`
      )
    }

    this.systems.set(type, system)
    system.init(this.manager)
  }

  /**
   * Add multiple systems to the world
   */
  addSystems(...systems: System<C>[]) {
    for (const system of systems) {
      this.addSystem(system)
    }
  }

  /**
   * Remove a system from the world
   */
  removeSystem<T extends System<C>>(
    klass: new (...args: any[]) => T
  ): System<C> {
    const system = this.getSystem(klass)

    if (!system) {
      throw new Error(
        `World: Could not delete system as '${klass.name}' does not exist.`
      )
    }

    this.systems.delete(klass.name)
    return system
  }

  /**
   * Check if a system exists in the world
   */
  hasSystem<T extends System<C>>(klass: new (...args: any[]) => T): boolean {
    return this.systems.has(klass.name)
  }

  /**
   * Get a system from the world
   */
  getSystem<T extends System<C>>(klass: new (...args: any[]) => T): T {
    const system = this.systems.get(klass.name)

    if (!system) {
      throw new Error(
        `World: Could not get system as '${klass.name}' does not exists.`
      )
    }

    return system as T
  }

  /**
   * Add an archetype to the world
   */
  addArchetype<T extends Archetype<C>>(klass: new (...args: any[]) => T) {
    return this.manager.addArchetype(klass)
  }

  /**
   * Remove an archetype from the world
   */
  removeArchetype<T extends Archetype<C>>(klass: new (...args: any[]) => T) {
    return this.manager.removeArchetype(klass)
  }

  /**
   * Check if an archetype exists in the world
   */
  hasArchetype<T extends Archetype<C>>(
    klass: new (...args: any[]) => T
  ): boolean {
    return this.manager.hasArchetype(klass)
  }

  /**
   * Get an archetype from the world
   */
  getArchetype<T extends Archetype<C>>(klass: new (...args: any[]) => T): T {
    return this.manager.getArchetype(klass)
  }

  /**
   * Create a new entity
   */
  createEntity(components: ComponentOf<C>[] = []): Entity<C> {
    return this.manager.renewEntity(components)
  }

  /**
   * Remove an entity from the world
   */
  removeEntity(entityId: number) {
    const entity = this.getEntity(entityId)

    if (entity) {
      this.manager.releaseEntity(entity)
    }
  }

  /**
   * Get an entity from the world
   */
  getEntity = (entityId: number): Entity<C> | undefined => {
    return this.manager.getEntity(entityId)
  }

  /**
   * Get multiple entities from the world
   */
  getEntities(entityIds: number[]): (Entity<C> | undefined)[] {
    return entityIds.map(this.getEntity)
  }

  /**
   * Update all systems
   */
  update(dt: number, time: number) {
    for (const system of this.systems.values()) {
      if (system.enabled) {
        system.update(this.manager, dt, time)
      }
    }
  }
}
