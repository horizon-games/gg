import Component, {
  ComponentTypes,
  getComponentTypeFromClass
} from './Component'

type ValueOf<T> = T[keyof T]

// type ComponentValues<T extends ComponentTypes> = {
//   [type in keyof T]: T[type]['value']
// }

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
  //componentInstances: Partial<C> = {}
  //components: Partial<ComponentValues<C>> = {}
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
    Object.keys(this.components).forEach(type => {
      this.removeComponent(type)
    })

    this.id = ++instanceIdx
    this.componentChangeListeners = new Set()
    return this
  }

  onComponentChange(listener: EntityListener<C>) {
    this.componentChangeListeners.add(listener)
    return () => this.componentChangeListeners.delete(listener)
  }

  addComponent = (component: ValueOf<C>) => {
    if (!this.hasComponent(component.type)) {
      this.components[component.type] = component

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
      this.components[type]!.onDetach(this)

      delete this.components[type]

      this.componentChangeListeners.forEach(listener =>
        listener({ type: 'remove', entity: this, componentType: type })
      )
    }
  }

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

  setComponent<T extends keyof C>(type: T, value: C[T]['value']) {
    if (this.hasComponent(type as string)) {
      this.components[type]!.value = value
    } else {
      throw new Error(`Entity does not contain component of type ${type}.`)
    }
  }

  set = this.setComponent

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
