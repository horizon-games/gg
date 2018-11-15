import { ComponentTypes } from './Component'
import Entity from './Entity'

type ArchetypeComponentFilter<C extends ComponentTypes> = (
  ...componentTypes: Array<keyof C>
) => ArchetypeFilterPredicate<C>
type ArchetypeFilterPredicate<C extends ComponentTypes> = (
  entity: Entity<C>
) => boolean

export default class Archetype<C extends ComponentTypes> {
  static include: ArchetypeComponentFilter<ComponentTypes> = (
    ...componentTypes
  ) => entity => entity.hasComponents(...(componentTypes as string[]))

  static exclude: ArchetypeComponentFilter<ComponentTypes> = (
    ...componentTypes
  ) => entity => !entity.hasComponents(...(componentTypes as string[]))

  static only: ArchetypeComponentFilter<ComponentTypes> = (
    ...componentTypes
  ) => entity =>
    componentTypes.length === entity.componentTypes.length &&
    entity.hasComponents(...(componentTypes as string[]))

  id: number

  filters: Array<ArchetypeFilterPredicate<C>>

  readonly entities: Array<Entity<C>> = []

  constructor(id: number, filters: Array<ArchetypeFilterPredicate<C>> = []) {
    this.id = id
    this.filters = filters
  }

  matchesEntity(entity: Entity<C>): boolean {
    return this.filters.every(filter => filter(entity))
  }

  hasEntity(entity: Entity<C>): boolean {
    return this.entities.indexOf(entity) !== -1
  }

  handleEntityComponentChange(entity: Entity<C>) {
    if (this.hasEntity(entity)) {
      // Does this entity need to be removed
      if (!this.matchesEntity(entity)) {
        this.handleEntityRemove(entity)
      }
    } else {
      // Does this entity need to be added
      if (this.matchesEntity(entity)) {
        this.handleEntityAdd(entity)
      }
    }
  }

  handleEntityAdd(entity: Entity<C>) {
    if (this.matchesEntity(entity)) {
      if (!this.hasEntity(entity)) {
        this.entities.push(entity)
      }
    }
  }

  handleEntityRemove(entity: Entity<C>) {
    if (this.hasEntity(entity)) {
      const idx = this.entities.indexOf(entity)

      if (idx !== -1) {
        this.entities.splice(idx, 1)
      }
    }
  }
}
