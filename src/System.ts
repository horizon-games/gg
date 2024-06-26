import { ComponentTypes } from './Component'
import { EntityManager } from './EntityManager'

interface SystemOptions {
  priority: number
  enabled: boolean
}

export abstract class System<C extends ComponentTypes> {
  enabled: boolean = true

  constructor(options: Partial<SystemOptions> = {}) {
    Object.assign(this, options)
  }

  init(_: EntityManager<C>): void {
    // stub
  }

  abstract update(manager: EntityManager<C>, dt: number, time: number): void

  enable() {
    this.enabled = true
  }

  disable() {
    this.enabled = false
  }
}
