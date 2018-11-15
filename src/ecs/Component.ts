const ComponentTypeRegExp = /Component$/
export const getComponentTypeFromClass = (klass: any): string =>
  klass.name.replace(ComponentTypeRegExp, '').toLowerCase()

export default class Component {
  readonly type: string = getComponentTypeFromClass(this.constructor)

  constructor(data: object = {}) {
    Object.assign(this, data)
  }
}

export interface ComponentClass<T extends Component> {
  new (): T
}

export interface ComponentTypes {
  [key: string]: Component
}
