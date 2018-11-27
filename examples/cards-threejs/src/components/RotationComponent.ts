import { Component } from '../../../../src/ecs'

export default class RotationComponent extends Component {
  value: {
    x: number
    y: number
    z: number
  }
}
