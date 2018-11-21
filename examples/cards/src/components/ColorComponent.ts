import { Component } from '../../../../src/ecs'

export default class ColorComponent extends Component {
  value: {
    r: number
    g: number
    b: number
    a: number
  }
}
