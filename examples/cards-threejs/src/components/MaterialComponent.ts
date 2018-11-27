import { Component } from '../../../../src/ecs'
import { MeshBasicMaterial, Texture } from 'three'

export default class MaterialComponent extends Component {
  value: MeshBasicMaterial
}
