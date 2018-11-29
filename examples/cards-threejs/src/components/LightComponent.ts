import { Component } from '../../../../src/ecs'
import { DirectionalLight, PointLight, SpotLight } from 'three'

export default class LightComponent extends Component {
  value: DirectionalLight | PointLight | SpotLight
}
