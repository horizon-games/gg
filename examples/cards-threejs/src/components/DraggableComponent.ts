import { Component } from '../../../../src/ecs'

export default class DraggableComponent extends Component<{
  type: string
  isDragging: boolean
  isDroppable: boolean
}> {}
