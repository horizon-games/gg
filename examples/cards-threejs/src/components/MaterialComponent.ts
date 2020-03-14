import { Component } from '../../../../src/ecs'
import { MeshBasicMaterial, MeshPhysicalMaterial } from 'three'

export default class MaterialComponent extends Component<
  MeshBasicMaterial | MeshPhysicalMaterial
> {}
