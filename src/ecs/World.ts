import Archetype from './Archetype'
import { ComponentTypes } from './Component'
import Entity from './Entity'
import EntityManager from './EntityManager'
import System from './System'

type ValueOf<T> = T[keyof T]

/*

World registers systems, archetypes and entities. Updates systems.

*/

interface WorldOptions {
  poolSize: number
}

export default class World<C extends ComponentTypes> {
  manager: EntityManager<C> = new EntityManager<C>()

  private systems: Map<string, System<C>> = new Map()

  constructor({ poolSize }: WorldOptions = { poolSize: 1000 }) {
    this.manager = new EntityManager<C>({ poolSize })
  }

  get systemTypes(): string[] {
    return Array.from(this.systems.keys())
  }

  addSystem(system: System<C>) {
    const type = system.constructor.name
    if (!this.systems.has(type)) {
      this.systems.set(type, system)
      system.init(this.manager)
    } else {
      throw new Error(
        `World: Could not add system as '${type}' already exists.`
      )
    }
  }

  addSystems(...systems: System<C>[]) {
    systems.forEach(system => this.addSystem(system))
  }

  removeSystem<T extends System<C>>(
    klass: new (...args: any[]) => T
  ): System<C> {
    const system = this.systems.get(klass.name)
    if (system) {
      this.systems.delete(klass.name)
      return system
    } else {
      throw new Error(
        `World: Could not delete system as '${klass.name}' does not exists.`
      )
    }
  }

  hasSystem<T extends System<C>>(klass: new (...args: any[]) => T): boolean {
    return this.systems.has(klass.name)
  }

  getSystem<T extends System<C>>(klass: new (...args: any[]) => T): T {
    const system = this.systems.get(klass.name)
    if (system) {
      return system as T
    } else {
      throw new Error(
        `World: Could not get system as '${klass.name}' does not exists.`
      )
    }
  }

  addArchetype<T extends Archetype<C>>(klass: new (...args: any[]) => T) {
    return this.manager.addArchetype(klass)
  }

  removeArchetype<T extends Archetype<C>>(klass: new (...args: any[]) => T) {
    return this.manager.removeArchetype(klass)
  }

  hasArchetype<T extends Archetype<C>>(
    klass: new (...args: any[]) => T
  ): boolean {
    return this.manager.hasArchetype(klass)
  }

  getArchetype<T extends Archetype<C>>(klass: new (...args: any[]) => T): T {
    return this.manager.getArchetype(klass)
  }

  createEntity(components: ValueOf<C>[] = []): Entity<C> {
    return this.manager.renewEntity(components)
  }

  removeEntity(entityId: number) {
    const entity = this.getEntity(entityId)

    if (entity) {
      this.manager.releaseEntity(entity)
    }
  }

  getEntity(entityId: number): Entity<C> | undefined {
    return this.manager.getEntity(entityId)
  }

  getEntities(entityIds: number[]): Entity<C>[] {
    return entityIds.map(this.getEntity.bind(this))
  }

  update(dt: number, time: number) {
    this.systems.forEach(system => {
      if (system.enabled) {
        system.update(this.manager, dt, time)
      }
    })
  }
}
