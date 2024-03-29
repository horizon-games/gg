import { DirectionalLight, PointLight, SpotLight } from 'three'

import { Component } from '../../../../src'
import scene from '../scene'

export class LightComponent extends Component<
  DirectionalLight | PointLight | SpotLight
> {
  onAttach() {
    this.value.castShadow = true
    scene.add(this.value)
  }
}
