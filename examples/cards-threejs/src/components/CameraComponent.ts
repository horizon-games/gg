import { PerspectiveCamera } from 'three'

import { Component } from '../../../../src'

export class SceneComponent extends Component<{
  object: PerspectiveCamera
  fov: number
  aspect: number
  near: number
  far: number
  zoom: number
}> {}
