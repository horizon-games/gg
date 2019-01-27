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
    if (!this.systems.has(system.type)) {
      this.systems.set(system.type, system)
      system.init(this.manager)
    } else {
      throw new Error(
        `World: Could not add system as '${system.type}' already exists.`
      )
    }
  }

  addSystems(...systems: Array<System<C>>) {
    systems.forEach(system => this.addSystem(system))
  }

  removeSystem(type: string): System<C> {
    const system = this.systems.get(type)
    if (system) {
      this.systems.delete(type)
      return system
    } else {
      throw new Error(
        `World: Could not delete system as '${type}' does not exists.`
      )
    }
  }

  hasSystem(type: string): boolean {
    return this.systems.has(type)
  }

  getSystem(type: string): System<C> {
    const system = this.systems.get(type)
    if (system) {
      return system
    } else {
      throw new Error(
        `World: Could not delete system as '${type}' does not exists.`
      )
    }
  }

  addArchetype(archetype: Archetype<C>) {
    this.manager.addArchetype(archetype)
  }

  removeArchetype(archetypeID: number) {
    this.manager.removeArchetype(archetypeID)
  }

  hasArchetype(archetypeID: number): boolean {
    return this.manager.hasArchetype(archetypeID)
  }

  getArchetype(archetypeID: number): Archetype<C> {
    return this.manager.getArchetype(archetypeID)
  }

  createEntity(components: Array<ValueOf<C>> = []): Entity<C> {
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

  getEntities(entityIds: number[]): Array<Entity<C>> {
    return entityIds.map(this.getEntity.bind(this)) //.filter(entity => entity !== undefined)
  }

  update(dt: number, time: number) {
    this.systems.forEach(system => {
      if (system.enabled) {
        system.update(this.manager, dt, time)
      }
    })
  }
}
