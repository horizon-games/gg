import { Component } from '../../../../src/ecs'

export default class DroppableComponent extends Component<{
  receives: string[]
  isHovered: boolean
}> {}
