import { Component } from '../../../../src/ecs'

export default class DraggableComponent extends Component {
  value: {
    type: string
    isDragging: boolean
    isDroppable: boolean
  }
}
