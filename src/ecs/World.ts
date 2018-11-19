import Archetype from './Archetype'
import { ComponentTypes } from './Component'
import Entity from './Entity'
import EntityManager from './EntityManager'
import System from './System'

type ValueOf<T> = T[keyof T]

/*

World registers systems, archetypes and entities. Updates systems.

*/

export default class World<C extends ComponentTypes> {
  private systems: Map<string, System<C>> = new Map()
  manager: EntityManager<C> = new EntityManager<C>()

  get systemTypes(): string[] {
    return Array.from(this.systems.keys())
  }

  addSystem(system: System<C>) {
    if (!this.systems.has(system.type)) {
      this.systems.set(system.type, system)
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

  createEntity(...components: Array<ValueOf<C>>): Entity<C> {
    return this.manager.renewEntity(...components)
  }

  update(dt: number) {
    this.systems.forEach(system => {
      if (system.enabled) {
        system.update(this.manager, dt)
      }
    })
  }
}
