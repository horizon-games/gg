import type Entity from './Entity'

// export type FilterComponents<C> = Pick<
//   C,
//   {
//     [K in keyof C]: C[K] extends Component<any> ? K : never
//   }[keyof C]
// >
// export type ComponentKeyOf<C> = keyof FilterComponents<C>
// export type ComponentOf<C> = FilterComponents<C>[keyof FilterComponents<C>]
// export type ComponentKeyOf<C> = {
//   [K in keyof C]: C[K] extends Component<any> ? K : never
// }[keyof C]
// export type ComponentOf<C> = {
//   [K in keyof C]: C[K] extends Component<any> ? C[K] : never
// }[keyof C]

export type ComponentKeyOf<C> = keyof C
export type ComponentOf<C> = C[keyof C]

const ComponentTypeRegExp = /Component$/
export const getComponentTypeFromClass = (klass: any): string =>
  klass.name.charAt(0).toLowerCase() +
  klass.name.slice(1).replace(ComponentTypeRegExp, '')

export default abstract class Component<T extends any> {
  readonly type: string = getComponentTypeFromClass(this.constructor)

  constructor(public value: T) {}

  onAttach(entity: Entity<any>) {
    // stub
  }

  onDetach(entity: Entity<any>) {
    // stub
  }
}

export interface ComponentTypes {
  [key: string]: Component<any>
}

// export type ComponentTypes = {}
