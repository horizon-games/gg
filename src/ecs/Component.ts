import Entity from './Entity'

const ComponentTypeRegExp = /Component$/
export const getComponentTypeFromClass = (klass: any): string =>
  klass.name.charAt(0).toLowerCase() +
  klass.name.slice(1).replace(ComponentTypeRegExp, '')

export default class Component {
  readonly type: string = getComponentTypeFromClass(this.constructor)
  value?: any

  constructor(value?: any) {
    this.value = value
  }

  onAttach(entity: Entity<any>) {
    // stub
  }

  onDetach(entity: Entity<any>) {
    // stub
  }
}

export interface ComponentTypes {
  [key: string]: Component
}
