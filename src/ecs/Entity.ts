import Component, {
  ComponentTypes,
  getComponentTypeFromClass
} from './Component'

type ValueOf<T> = T[keyof T]

type ComponentValues<T extends ComponentTypes> = {
  [type in keyof T]: T[type]['value']
}

type ComponentChangeEventTypes = 'add' | 'remove'

interface ComponentChangeEvent<C extends ComponentTypes> {
  type: ComponentChangeEventTypes
  entity: Entity<C>
  componentType: keyof C
}

export type EntityListener<C extends ComponentTypes> = (
  ev: ComponentChangeEvent<C>
) => void

let instanceIdx = 0

export default class Entity<C extends ComponentTypes> {
  id: number
  components: Partial<ComponentValues<C>> = {}

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
    if (!this.hasComponent(component.type)) {
      this.components[component.type] = component.value
      component.onAttach(this)
      this.componentChangeListeners.forEach(listener =>
        listener({ type: 'add', entity: this, componentType: component.type })
      )
    } else {
      throw new Error(
        `Entity already contains component of type ${component.type}.`
      )
    }
  }

  removeComponent = (type: string) => {
    if (this.hasComponent(type)) {
      // XXX Cannot detach because we no longer hold onto a reference to the component class instance
      //this.components[type]!.onDetach(this)
      delete this.components[type]

      this.componentChangeListeners.forEach(listener =>
        listener({ type: 'remove', entity: this, componentType: type })
      )
    }
  }

  hasComponent(type: string): boolean {
    return !!this.componentTypes.includes(type)
  }

  hasComponents = (...types: string[]): boolean => {
    return types.every(type => this.hasComponent(type))
  }

  getComponent<T extends keyof C>(type: T): C[T]['value'] {
    if (this.hasComponent(type as string)) {
      return this.components[type] as C[T]['value']
    } else {
      throw new Error(`Entity does not contain component of ${type}.`)
    }
  }

  setComponent<T extends keyof C>(type: T, value: Partial<C[T]['value']>) {
    if (this.hasComponent(type as string)) {
      this.components[type] = value
    } else {
      throw new Error(`Entity does not contain component of type ${type}.`)
    }
  }

  toggleComponent(componentClass: { new (): Component }, predicate: boolean) {
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
