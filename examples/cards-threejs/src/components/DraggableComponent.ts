import { Component } from '../../../../src'

export class DraggableComponent extends Component<{
  type: string
  isDragging?: boolean
  isDroppable?: boolean
}> {}
