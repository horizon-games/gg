import { Component } from '../../../../src/ecs'

export default class DroppableComponent extends Component {
  value: {
    receives: string[]
    isHovered: boolean
  }
}
