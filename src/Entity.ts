import {
  getComponentTypeFromClass,
  ComponentOf,
  ComponentTypes,
} from './Component'

export type EntityChangeEventTypes = 'add' | 'remove'

export interface EntityChangeEvent<C extends ComponentTypes> {
  type: EntityChangeEventTypes
  entity: Entity<C>
  component: ComponentOf<C>
}

export type EntityChangeListener<C extends ComponentTypes> = (
  ev: EntityChangeEvent<C>
) => void

const UNDEFINED_ID = -1

let instanceIdx = 0

/**
 * Entity is a container for components.
 */
export class Entity<C extends ComponentTypes> {
  id: number = UNDEFINED_ID
  components: Partial<C> = {}

  /** List of components */
  get componentTypes(): (keyof C)[] {
    return Object.keys(this.components)
  }

  private onChangeListeners: Set<EntityChangeListener<C>> = new Set()

  constructor(components: ComponentOf<C>[] = []) {
    this.reset()
    this.addComponents(components)
  }

  /**
   * Reset the entity to its initial state
   */
  reset(): Entity<C> {
    for (const type of this.componentTypes.reverse()) {
      this.removeComponent(type)
    }
    this.id = ++instanceIdx
    this.onChangeListeners = new Set()
    return this
  }

  /**
   * Clone an Entity
   */
  clone(): Entity<C> {
    return new Entity<C>(Object.values(this.components))
  }

  /**
   * Attach an onChange listener to the entity
   */
  onChange(listener: EntityChangeListener<C>) {
    this.onChangeListeners.add(listener)
    return () => this.onChangeListeners.delete(listener)
  }

  /**
   * Remove an onChange listener from the entity
   */
  removeOnChange(listener: EntityChangeListener<C>) {
    if (this.onChangeListeners.has(listener)) {
      this.onChangeListeners.delete(listener)
    }
  }

  /**
   * Check if the entity has a component
   */
  hasComponent(type: keyof C): boolean {
    return !!this.components[type]
  }

  // tslint:disable-next-line
  has = this.hasComponent

  /**
   * Check if the entity has multiple components
   */
  hasComponents = (...types: (keyof C)[]): boolean => {
    return types.every((type) => this.hasComponent(type))
  }

  /**
   * Add a component to the entity
   */
  addComponent = (component: ComponentOf<C>) => {
    if (this.hasComponent(component.type)) {
      throw new Error(
        `Entity already contains component of type ${component.type}.`
      )
    }

    this.components[component.type as keyof C] = component

    component.onAttach(this)

    for (const listener of this.onChangeListeners) {
      listener({ type: 'add', entity: this, component })
    }
  }

  // tslint:disable-next-line
  add = this.addComponent

  /**
   * Add multiple components to the entity
   */
  addComponents = (components: ComponentOf<C>[]) => {
    for (const component of components) {
      this.addComponent(component)
    }
  }

  /**
   * Remove a component from the entity
   */
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

  /**
   * Add or remove a component based on a predicated value
   */
  toggleComponent(
    componentClass: new (value: void) => ComponentOf<C>,
    predicate: boolean
  ) {
    const componentType = getComponentTypeFromClass(componentClass)

    if (predicate) {
      // Only add the component if it doesn't exist. Avoid throwing
      if (!this.hasComponent(componentType)) {
        this.addComponent(new componentClass())
      }
    } else {
      this.removeComponent(componentType)
    }
  }

  // tslint:disable-next-line
  toggle = this.toggleComponent

  /**
   * Get the component on the entity
   */
  getComponent<T extends keyof C>(type: T): C[T] | undefined {
    return this.components[type]
  }

  /**
   * Get the value of the component on the entity
   */
  getComponentValue<T extends keyof C>(type: T): C[T]['value'] {
    if (!this.hasComponent(type)) {
      throw new Error(
        `Entity does not contain component of type ${String(type)}.`
      )
    }

    return this.components[type]!.value
  }

  // tslint:disable-next-line
  get = this.getComponentValue

  /**
   * Set the value of the component on the entity
   */
  setComponentValue<T extends keyof C>(
    type: T,
    value: Partial<C[T]['value']> | C[T]['value']
  ) {
    if (!this.hasComponent(type)) {
      throw new Error(
        `Entity does not contain component of type ${String(type)}.`
      )
    }

    if (typeof value === 'object' && !Array.isArray(value)) {
      Object.assign(this.components[type]!.value, value)
    } else {
      this.components[type]!.value = value
    }
  }

  // tslint:disable-next-line
  set = this.setComponentValue
}
