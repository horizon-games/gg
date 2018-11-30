import { Component, Entity } from '../../../../src/ecs'
import { Object3D } from 'three'
import scene from '../scene'

export default class MeshComponent extends Component {
  value: Object3D

  onAttach(entity: Entity<any>) {
    this.value.userData.entityId = entity.id
    scene.add(this.value)
  }

  onDetach() {
    scene.remove(this.value)
  }
}
