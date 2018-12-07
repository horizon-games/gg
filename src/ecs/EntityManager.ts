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
  archetypes: Map<number, Archetype<C>> = new Map()
  entityPool: EntityPool<C>
  entityListenerDisposers: Map<number, () => void> = new Map()

  constructor({ poolSize }: EntityManagerOptions = { poolSize: 1000 }) {
    this.entityPool = new EntityPool<C>(poolSize)
  }

  filter(types: string[]): Array<Entity<C>> {
    return Array.from(this.entities.values()).filter(entity =>
      entity.hasComponents(...types)
    )
  }

  addEntity(entity: Entity<C>) {
    if (!this.entities.has(entity.id)) {
      this.entities.set(entity.id, entity)

      // Add entity listener
      this.entityListenerDisposers.set(
        entity.id,
        entity.onComponentChange(ev => {
          const { type, entity, componentType } = ev
          switch (type) {
            case 'add':
              this.handleEntityAddComponent(entity, componentType)
              break

            case 'remove':
              this.handleEntityRemoveComponent(entity, componentType)
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
      if (this.entityListenerDisposers.has(entity.id)) {
        this.entityListenerDisposers.get(entity.id)!()
        this.entityListenerDisposers.delete(entity.id)
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

  renewEntity(components: Array<ValueOf<C>> = []): Entity<C> {
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
    this.archetypes.set(archetype.id, archetype)

    // Add matching entities to archetypes
    this.entities.forEach(entity => {
      archetype.handleEntityAdd(entity)
    })
  }

  removeArchetype(archetypeID: number) {
    this.archetypes.delete(archetypeID)
  }

  hasArchetype(archetypeID: number): boolean {
    return this.archetypes.has(archetypeID)
  }

  getArchetype(archetypeID: number): Archetype<C> {
    const archetype = this.archetypes.get(archetypeID)

    if (archetype) {
      return archetype
    } else {
      throw new Error('EntityManager does not contain Archetype')
    }
  }

  private handleEntityAddComponent(entity: Entity<C>, _: keyof C) {
    if (this.hasEntity(entity.id)) {
      this.archetypes.forEach(archetype => {
        archetype.handleEntityComponentChange(entity)
      })
    }
  }

  private handleEntityRemoveComponent(entity: Entity<C>, _: keyof C) {
    if (this.hasEntity(entity.id)) {
      this.archetypes.forEach(archetype => {
        archetype.handleEntityComponentChange(entity)
      })
    }
  }
}
