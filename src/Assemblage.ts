import { Component } from './Component'

export type Assemblage = (...args: any[]) => Component<any>[]
