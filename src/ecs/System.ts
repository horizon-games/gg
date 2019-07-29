import EntityManager from './EntityManager'
import { ComponentTypes } from './Component'

interface SystemOptions {
  priority: number
  enabled: boolean
}

const SystemTypeRegExp = /System$/
const getSystemTypeFromClass = (klass: any) =>
  klass.name.charAt(0).toLowerCase() +
  klass.name.slice(1).replace(SystemTypeRegExp, '')

export default abstract class System<C extends ComponentTypes> {
  readonly type: string = getSystemTypeFromClass(this.constructor)

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
