import Component, {
  ComponentTypes,
  getComponentTypeFromClass
} from './Component'

type ValueOf<T> = T[keyof T]

// type ComponentValues<T extends ComponentTypes> = {
//   [type in keyof T]: T[type]['value']
// }

export type EntityChangeEventTypes = 'add' | 'remove'

export interface EntityChangeEvent<C extends ComponentTypes> {
  type: EntityChangeEventTypes
  entity: Entity<C>
  component: C[keyof C]
}

export type EntityChangeListener<C extends ComponentTypes> = (
  ev: EntityChangeEvent<C>
) => void

const UNDEFINED_ID = -1

let instanceIdx = 0

export default class Entity<C extends ComponentTypes> {
  id: number = UNDEFINED_ID
  components: Partial<C> = {}

  get componentTypes(): (keyof C)[] {
    return Object.keys(this.components)
  }

  private onChangeListeners: Set<EntityChangeListener<C>> = new Set()

  constructor(components: ValueOf<C>[] = []) {
    this.reset()
    this.renew(components)
  }

  renew(components: ValueOf<C>[] = []): Entity<C> {
    for (const component of components) {
      this.addComponent(component)
    }
    return this
  }

  reset(): Entity<C> {
    for (const type of this.componentTypes.reverse()) {
      this.removeComponent(type)
    }
    this.id = ++instanceIdx
    this.onChangeListeners = new Set()
    return this
  }

  onChange(listener: EntityChangeListener<C>) {
    this.onChangeListeners.add(listener)
    return () => this.onChangeListeners.delete(listener)
  }

  removeOnChange(listener: EntityChangeListener<C>) {
    if (this.onChangeListeners.has(listener)) {
      this.onChangeListeners.delete(listener)
    }
  }

  hasComponent(type: keyof C): boolean {
    return !!this.components[type]
  }

  // tslint:disable-next-line
  has = this.hasComponent

  hasComponents = (...types: (keyof C)[]): boolean => {
    return types.every(type => this.hasComponent(type))
  }

  addComponent = (component: ValueOf<C>) => {
    if (!this.hasComponent(component.type)) {
      this.components[component.type as keyof C] = component

      component.onAttach(this)

      for (const listener of this.onChangeListeners) {
        listener({ type: 'add', entity: this, component })
      }
    } else {
      throw new Error(
        `Entity already contains component of type ${component.type}.`
      )
    }
  }

  // tslint:disable-next-line
  add = this.addComponent

  removeComponent = (type: keyof C) => {
    if (this.hasComponent(type)) {
      const component = this.components[type]!

      delete this.components[type]

      component.onDetach(this)

      for (const listener of this.onChangeListeners) {
        listener({ type: 'remove', entity: this, component })
      }
    }
  }

  // tslint:disable-next-line
  remove = this.removeComponent

  toggleComponent(
    componentClass: new (value: void) => ValueOf<C>,
    predicate: boolean
  ) {
    const componentType = getComponentTypeFromClass(componentClass)

    if (predicate) {
      if (!this.hasComponent(componentType)) {
        this.addComponent(new componentClass())
      }
    } else {
      this.removeComponent(componentType)
    }
  }

  // tslint:disable-next-line
  toggle = this.toggleComponent

  // Get component instance
  getComponent<T extends keyof C>(type: T): C[T] | undefined {
    return this.components[type]
  }

  getComponentValue<T extends keyof C>(type: T): C[T]['value'] {
    if (this.hasComponent(type)) {
      return this.components[type]!.value
    } else {
      throw new Error(`Entity does not contain component of type ${type}.`)
    }
  }

  // tslint:disable-next-line
  get = this.getComponentValue

  setComponentValue<T extends keyof C>(
    type: T,
    value: Partial<C[T]['value']> | C[T]['value']
  ) {
    if (this.hasComponent(type)) {
      if (typeof value === 'object' && !Array.isArray(value)) {
        Object.assign(this.components[type]!.value, value)
      } else {
        this.components[type]!.value = value
      }
    } else {
      throw new Error(`Entity does not contain component of type ${type}.`)
    }
  }

  // tslint:disable-next-line
  set = this.setComponentValue
}
