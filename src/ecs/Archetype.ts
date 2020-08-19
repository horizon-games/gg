import { ComponentTypes } from './Component'
import Entity from './Entity'

type ValueOf<T> = T[keyof T]

export type ArchetypeComponentFilter<C extends ComponentTypes> = (
  ...componentTypes: (keyof C)[]
) => ArchetypeFilterPredicate<C>

export type ArchetypeFilterPredicate<C extends ComponentTypes> = (
  entity: Entity<C>
) => boolean

export type ArchetypeChangeEventTypes = 'add' | 'remove'

export interface ArchetypeChangeEvent<C extends ComponentTypes> {
  type: ArchetypeChangeEventTypes
  archetype: Archetype<C>
  entity: Entity<C>
  component: ValueOf<C> | undefined
}

export type ArchetypeChangeListener<C extends ComponentTypes> = (
  ev: ArchetypeChangeEvent<C>
) => void

interface ArchetypeComponentFilterPresets<C extends ComponentTypes> {
  include: ArchetypeComponentFilter<C>
  exclude: ArchetypeComponentFilter<C>
  only: ArchetypeComponentFilter<C>
  any: ArchetypeComponentFilter<C>
}

export default abstract class Archetype<C extends ComponentTypes>
  implements ArchetypeComponentFilterPresets<C> {
  include: ArchetypeComponentFilter<C> = (...componentTypes: (keyof C)[]) => (
    entity: Entity<C>
  ) => entity.hasComponents(...componentTypes)

  exclude: ArchetypeComponentFilter<C> = (...componentTypes: (keyof C)[]) => (
    entity: Entity<C>
  ) => componentTypes.every(type => !entity.hasComponent(type))

  only: ArchetypeComponentFilter<C> = (...componentTypes: (keyof C)[]) => (
    entity: Entity<C>
  ) =>
    componentTypes.length === entity.componentTypes.length &&
    entity.hasComponents(...componentTypes)

  any: ArchetypeComponentFilter<C> = (...componentTypes: (keyof C)[]) => (
    entity: Entity<C>
  ) => componentTypes.some(type => entity.hasComponent(type))

  filters: ArchetypeFilterPredicate<C>[] = []

  readonly entities: Entity<C>[] = []

  private onChangeListeners: Set<ArchetypeChangeListener<C>> = new Set()
  private onAddListeners: Set<ArchetypeChangeListener<C>> = new Set()
  private onRemoveListeners: Set<ArchetypeChangeListener<C>> = new Set()

  onChange(listener: ArchetypeChangeListener<C>) {
    this.onChangeListeners.add(listener)
    return () => this.onChangeListeners.delete(listener)
  }

  onAdd(listener: ArchetypeChangeListener<C>) {
    this.onAddListeners.add(listener)
    return () => this.onAddListeners.delete(listener)
  }

  onRemove(listener: ArchetypeChangeListener<C>) {
    this.onRemoveListeners.add(listener)
    return () => this.onRemoveListeners.delete(listener)
  }

  matchesEntity(entity: Entity<C>): boolean {
    return this.filters.every(filter => filter(entity))
  }

  hasEntity(entity: Entity<C>): boolean {
    return this.entities.indexOf(entity) !== -1
  }

  handleEntityChange(entity: Entity<C>, component?: ValueOf<C>) {
    if (this.hasEntity(entity)) {
      // Does this entity need to be removed
      if (!this.matchesEntity(entity)) {
        this.handleEntityRemove(entity, component)
      }
    } else {
      // Does this entity need to be added
      if (this.matchesEntity(entity)) {
        this.handleEntityAdd(entity, component)
      }
    }
  }

  handleEntityAdd(entity: Entity<C>, component?: ValueOf<C>) {
    if (this.matchesEntity(entity)) {
      if (!this.hasEntity(entity)) {
        const ev: ArchetypeChangeEvent<C> = {
          type: 'add',
          archetype: this,
          entity,
          component
        }

        this.entities.push(entity)

        for (const listener of this.onAddListeners) {
          listener(ev)
        }

        for (const listener of this.onChangeListeners) {
          listener(ev)
        }
      }
    }
  }

  handleEntityRemove(entity: Entity<C>, component?: ValueOf<C>) {
    if (this.hasEntity(entity)) {
      const idx = this.entities.indexOf(entity)

      if (idx !== -1) {
        const ev: ArchetypeChangeEvent<C> = {
          type: 'remove',
          archetype: this,
          entity,
          component
        }

        this.entities.splice(idx, 1)

        for (const listener of this.onRemoveListeners) {
          listener(ev)
        }

        for (const listener of this.onChangeListeners) {
          listener(ev)
        }
      }
    }
  }
}
