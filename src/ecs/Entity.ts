import { ComponentTypes } from './Component'

type ValueOf<T> = T[keyof T]

type ComponentChangeEventTypes = 'add' | 'remove'

interface ComponentChangeEvent<C extends ComponentTypes> {
  type: ComponentChangeEventTypes
  entity: Entity<C>
  component: ValueOf<C>
}

export type EntityListener<C extends ComponentTypes> = (
  ev: ComponentChangeEvent<C>
) => void

let instanceIdx = 0

export default class Entity<C extends ComponentTypes> {
  id: number
  components: Partial<C> = {}

  get componentTypes(): Array<keyof C> {
    return Object.keys(this.components)
  }

  private componentChangeListeners: Set<EntityListener<C>> = new Set()

  constructor(...components: Array<ValueOf<C>>) {
    this.reset()
    this.renew(components)
  }

  renew(components: Array<ValueOf<C>> = []): Entity<C> {
    components.forEach(this.addComponent)
    return this
  }

  reset(): Entity<C> {
    this.id = ++instanceIdx
    this.components = {}
    this.componentChangeListeners = new Set()
    return this
  }

  onComponentChange(listener: EntityListener<C>) {
    this.componentChangeListeners.add(listener)
    return () => this.componentChangeListeners.delete(listener)
  }

  addComponent = (component: ValueOf<C>) => {
    this.components[component.type] = component

    this.componentChangeListeners.forEach(listener =>
      listener({ type: 'add', entity: this, component })
    )
  }

  removeComponent = (type: string) => {
    const component = this.components[type]

    if (component) {
      delete this.components[type]

      this.componentChangeListeners.forEach(listener =>
        listener({ type: 'remove', entity: this, component })
      )
    }
  }

  hasComponent(type: string): boolean {
    return !!this.components[type]
  }

  hasComponents = (...types: string[]): boolean => {
    return types.every(type => this.hasComponent(type))
  }

  getComponent<T extends keyof C>(type: T): C[T] {
    const component = this.components[type] as C[T]

    if (component) {
      return component
    } else {
      throw new Error(`Entity does not contain component of ${type}.`)
    }
  }

  setComponent<T extends keyof C>(type: T, value: Partial<C[T]>) {
    const component = this.components[type] as C[T]

    if (component) {
      Object.assign(component, value)
    } else {
      throw new Error(`Entity does not contain component of type ${type}.`)
    }
  }
}
