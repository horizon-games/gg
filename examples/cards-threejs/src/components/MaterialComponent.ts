import { MeshBasicMaterial, MeshPhysicalMaterial } from 'three'

import { Component } from '../../../../src'

export class MaterialComponent extends Component<
  MeshBasicMaterial | MeshPhysicalMaterial
> {}
