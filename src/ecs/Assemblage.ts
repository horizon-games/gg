import Component from './Component'

type Assemblage = (...args: any[]) => Component<any>[]

export default Assemblage
