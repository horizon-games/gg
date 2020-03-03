import { Component } from '../../../../src/ecs'
import ColorComponent from './ColorComponent'

export default class BoxShadowComponent extends Component<{
  hOffset: number
  vOffset: number
  blur: number
  spread: number
  color: ColorComponent['value']
}> {}
