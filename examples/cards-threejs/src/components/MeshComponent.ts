import { Object3D } from 'three'

import { Component, Entity } from '../../../../src'
import scene from '../scene'

export class MeshComponent extends Component<Object3D> {
  onAttach(entity: Entity<any>) {
    this.value.userData.entityId = entity.id
    scene.add(this.value)
  }

  onDetach() {
    scene.remove(this.value)
  }
}
