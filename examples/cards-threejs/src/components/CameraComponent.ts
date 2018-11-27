import { Component } from '../../../../src/ecs'
import { PerspectiveCamera } from 'three'

export default class SceneComponent extends Component {
  value: {
    object: PerspectiveCamera
    fov: number
    aspect: number
    near: number
    far: number
    zoom: number
  }
}
