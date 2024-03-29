import { Component } from '../../../../src'

import { ColorComponent } from './ColorComponent'

export class BoxShadowComponent extends Component<{
  hOffset: number
  vOffset: number
  blur: number
  spread: number
  color: ColorComponent['value']
}> {}
