import { ComponentTypes } from './Component'
import Archetype from './Archetype'
import Entity from './Entity'
import EntityPool from './EntityPool'

type ValueOf<T> = T[keyof T]

interface EntityManagerOptions {
  poolSize: number
}

export default class EntityManager<C extends ComponentTypes> {
  entities: Map<number, Entity<C>> = new Map()
  archetypes: Map<string, Archetype<C>> = new Map()
  entityPool: EntityPool<C>
  entityChangeDisposers: Map<number, () => void> = new Map()

  constructor({ poolSize }: EntityManagerOptions = { poolSize: 1000 }) {
    this.entityPool = new EntityPool<C>(poolSize)
  }

  filter(types: string[]): Entity<C>[] {
    return Array.from(this.entities.values()).filter(entity =>
      entity.hasComponents(...types)
    )
  }

  addEntity(entity: Entity<C>) {
    if (!this.entities.has(entity.id)) {
      this.entities.set(entity.id, entity)

      // Add entity listener
      this.entityChangeDisposers.set(
        entity.id,
        entity.onChange(ev => {
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
      this.archetypes.forEach(archetype => {
        archetype.handleEntityAdd(entity)
      })
    }
  }

  removeEntity(entity: Entity<C>) {
    if (this.entities.has(entity.id)) {
      this.entities.delete(entity.id)

      // clean up entity listener disposers
      if (this.entityChangeDisposers.has(entity.id)) {
        this.entityChangeDisposers.get(entity.id)!()
        this.entityChangeDisposers.delete(entity.id)
      }

      // Remove entity from archetypes
      this.archetypes.forEach(archetype => {
        archetype.handleEntityRemove(entity)
      })
    }
  }

  hasEntity(entityId: number): boolean {
    return this.entities.has(entityId)
  }

  getEntity(entityId: number): Entity<C> | undefined {
    return this.entities.get(entityId)
  }

  renewEntity(components: ValueOf<C>[] = []): Entity<C> {
    const entity = this.entityPool.renew(components)
    this.addEntity(entity)
    return entity
  }

  releaseEntity(entity: Entity<C>) {
    if (this.hasEntity(entity.id)) {
      this.removeEntity(entity)
      this.entityPool.release(entity)
    }
  }

  addArchetype(archetype: Archetype<C>) {
    const type = archetype.constructor.name

    if (!this.archetypes.has(type)) {
      this.archetypes.set(type, archetype)

      // Add matching entities to archetypes
      this.entities.forEach(entity => {
        archetype.handleEntityAdd(entity)
      })
    } else {
      throw new Error(
        `EntityManager: Could not add archetype as '${type}' already exists.`
      )
    }
  }

  removeArchetype<T extends Archetype<C>>(
    klass: new (...args: any[]) => T
  ): Archetype<C> {
    const archetype = this.archetypes.get(klass.name)
    if (archetype) {
      this.archetypes.delete(klass.name)
      return archetype
    } else {
      throw new Error(
        `EntityManager: Could not delete archetype as '${klass.name}' does not exists.`
      )
    }
  }

  hasArchetype<T extends Archetype<C>>(
    klass: new (...args: any[]) => T
  ): boolean {
    return this.archetypes.has(klass.name)
  }

  getArchetype<T extends Archetype<C>>(klass: new (...args: any[]) => T): T {
    const archetype = this.archetypes.get(klass.name)
    if (archetype) {
      return archetype as T
    } else {
      throw new Error(
        `EntityManager: Could not get archetype as '${klass.name}' does not exists.`
      )
    }
  }

  private handleEntityAddComponent(entity: Entity<C>, component: ValueOf<C>) {
    if (this.hasEntity(entity.id)) {
      this.archetypes.forEach(archetype => {
        archetype.handleEntityChange(entity, component)
      })
    }
  }

  private handleEntityRemoveComponent(
    entity: Entity<C>,
    component: ValueOf<C>
  ) {
    if (this.hasEntity(entity.id)) {
      this.archetypes.forEach(archetype => {
        archetype.handleEntityChange(entity, component)
      })
    }
  }
}
