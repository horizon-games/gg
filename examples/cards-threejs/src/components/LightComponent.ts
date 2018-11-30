import { Component } from '../../../../src/ecs'
import { DirectionalLight, PointLight, SpotLight } from 'three'
import scene from '../scene'

export default class LightComponent extends Component {
  value: DirectionalLight | PointLight | SpotLight

  onAttach() {
    this.value.castShadow = true
    scene.add(this.value)
  }
}
