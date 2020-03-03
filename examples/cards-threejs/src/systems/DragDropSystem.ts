import { System, EntityManager } from '../../../../src/ecs'
import { Components, HoverComponent } from '../components'
import { DraggableArchetype, DroppableArchetype } from '../archetypes'
import { Vector2, Raycaster } from 'three'
import camera from '../camera'
import scene from '../scene'
import { drawCard, playCard } from '../actions'
import { CardStatus } from '../types'
import screen from '../screen'
import mouse from '../mouse'
import { get2DPositionAtDepth, lerp } from '../utils'

const raycaster = new Raycaster()

let isDragging: boolean = false
let dragSource: any = null
let dropTarget: any = null

const mouseDist = new Vector2()

export default class DragDropSystem extends System<Components> {
  update(manager: EntityManager<Components>, dt: number) {
    const { entities: draggable } = manager.getArchetype(DraggableArchetype)
    const { entities: droppable } = manager.getArchetype(DroppableArchetype)

    raycaster.setFromCamera(mouse.position, camera)

    const intersections = raycaster.intersectObjects(scene.children, true)
    const found = intersections.some(x => {
      const object3d = x.object.userData.entityId ? x.object : x.object.parent
      if (object3d) {
        const { entityId } = object3d.userData
        if (entityId) {
          const entity = manager.getEntity(entityId)
          if (entity) {
            if (isDragging) {
              if (
                !mouse.isPressed &&
                entity !== dragSource &&
                entity.hasComponent('droppable')
              ) {
                const { type } = dragSource.components.draggable!.value
                const { receives } = entity.components.droppable!.value

                if (receives.includes(type)) {
                  dropTarget = entity
                  return true
                }
              }
            } else {
              if (mouse.isPressed && entity.hasComponent('draggable')) {
                isDragging = true
                dragSource = entity
                const pos = get2DPositionAtDepth(
                  camera,
                  mouse.position.x,
                  mouse.position.y,
                  0.5
                )
                mouseDist.set(
                  entity.components.position!.value.x - pos.x,
                  entity.components.position!.value.y - pos.y
                )
                return true
              }
            }
          }
        }
      }
      return false
    })

    if (isDragging) {
      if (mouse.isPressed) {
        const card = dragSource.getComponentValue('card')
        const player = dragSource.getComponentValue('player')

        if (card.status === CardStatus.Deck) {
          return
        }

        const position = dragSource.getComponentValue('position')
        const rotation = dragSource.getComponentValue('rotation')
        const mesh = dragSource.getComponentValue('mesh')
        const pos = get2DPositionAtDepth(
          camera,
          mouse.position.x,
          mouse.position.y,
          1
        )
        position.x = lerp(mesh.position.x, pos.x /* + mouseDist.x */, 0.5)
        position.y = lerp(mesh.position.y, pos.y /* + mouseDist.y */, 0.5)
        position.z = lerp(mesh.position.z, pos.z, 0.5)

        if (player.id === 1) {
          // rotation.x = lerp(mesh.rotation.x, 0, 0.5)
          rotation.y = lerp(mesh.rotation.y, 0, 0.5)
        }
        rotation.z = lerp(mesh.rotation.z, 0, 0.5)
      } else {
        if (dragSource && dropTarget) {
          const card = dragSource.getComponentValue('card')
          const player = dragSource.getComponentValue('player')
          playCard(player.id, card.id)
        }

        isDragging = false
        dragSource = null
        dropTarget = null
      }
    }
  }
}
