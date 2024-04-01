import { Entity } from './Entity'

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
export function getComponentTypeFromClass(klass: any): string {
  const name = klass.name
  const noUnderscoreName = name.replace(/^_?/, '')
  return (
    noUnderscoreName.charAt(0).toLowerCase() +
    noUnderscoreName.slice(1).replace(ComponentTypeRegExp, '')
  )
}

export abstract class Component<T> {
  readonly type: string = getComponentTypeFromClass(this.constructor)

  constructor(public value: T) {}

  onAttach(_entity: Entity<any>) {
    // stub
  }

  onDetach(_entity: Entity<any>) {
    // stub
  }
}

export type ComponentTypes = Record<string, Component<any>>
