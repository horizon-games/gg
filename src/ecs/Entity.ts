import Component, {
  ComponentTypes,
  getComponentTypeFromClass
} from './Component'

type ValueOf<T> = T[keyof T]

// type ComponentValues<T extends ComponentTypes> = {
//   [type in keyof T]: T[type]['value']
// }

type EntityChangeEventTypes = 'add' | 'remove'

interface EntityChangeEvent<C extends ComponentTypes> {
  type: EntityChangeEventTypes
  entity: Entity<C>
  componentType: keyof C
}

export type EntityChangeListener<C extends ComponentTypes> = (
  ev: EntityChangeEvent<C>
) => void

let instanceIdx = 0

export default class Entity<C extends ComponentTypes> {
  id: number
  components: Partial<C> = {}

  get componentTypes(): Array<keyof C> {
    return Object.keys(this.components)
  }

  private onChangeListeners: Set<EntityChangeListener<C>> = new Set()

  constructor(components: Array<ValueOf<C>> = []) {
    this.reset()
    this.renew(components)
  }

  renew(components: Array<ValueOf<C>> = []): Entity<C> {
    components.forEach(this.addComponent)
    return this
  }

  reset(): Entity<C> {
    this.componentTypes.reverse().forEach(this.removeComponent)
    this.id = ++instanceIdx
    this.onChangeListeners = new Set()
    return this
  }

  onChange(listener: EntityChangeListener<C>) {
    this.onChangeListeners.add(listener)
    return () => this.onChangeListeners.delete(listener)
  }

  addComponent = (component: ValueOf<C>) => {
    if (!this.hasComponent(component.type)) {
      this.components[component.type] = component

      component.onAttach(this)
      this.onChangeListeners.forEach(listener =>
        listener({ type: 'add', entity: this, componentType: component.type })
      )
    } else {
      throw new Error(
        `Entity already contains component of type ${component.type}.`
      )
    }
  }

  add = this.addComponent

  removeComponent = (type: string) => {
    if (this.hasComponent(type)) {
      this.components[type]!.onDetach(this)

      delete this.components[type]

      this.onChangeListeners.forEach(listener =>
        listener({ type: 'remove', entity: this, componentType: type })
      )
    }
  }

  remove = this.removeComponent

  hasComponent(type: string): boolean {
    return !!this.components[type]
  }

  has = this.hasComponent

  hasComponents = (...types: string[]): boolean => {
    return types.every(type => this.hasComponent(type))
  }

  getComponent<T extends keyof C>(type: T): C[T]['value'] {
    if (this.hasComponent(type as string)) {
      return this.components[type]!.value
    } else {
      throw new Error(`Entity does not contain component of ${type}.`)
    }
  }

  get = this.getComponent

  setComponent<T extends keyof C>(
    type: T,
    value: Partial<C[T]['value']> | C[T]['value']
  ) {
    if (this.hasComponent(type as string)) {
      if (typeof value === 'object' && !Array.isArray(value)) {
        Object.assign(this.getComponent(type), value)
      } else {
        this.components[type]!.value = value
      }
    } else {
      throw new Error(`Entity does not contain component of type ${type}.`)
    }
  }

  set = this.setComponent

  toggleComponent(componentClass: { new (): ValueOf<C> }, predicate: boolean) {
    const componentType = getComponentTypeFromClass(componentClass)

    if (predicate) {
      if (!this.hasComponent(componentType)) {
        this.addComponent(new componentClass())
      }
    } else {
      this.removeComponent(componentType)
    }
  }
}
