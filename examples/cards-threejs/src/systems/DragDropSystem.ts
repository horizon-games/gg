import { System, EntityManager } from '../../../../src/ecs'
import { Components, HoverComponent } from '../components'
import { Archetypes, PlayerCardsArchetype } from '../archetypes'
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
let xDist: number
let yDist: number

const mouseDist = new Vector2()

export default class DragDropSystem extends System<Components> {
  update(manager: EntityManager<Components>, dt: number) {
    const { entities: draggable } = manager.getArchetype(Archetypes.Draggable)
    const { entities: droppable } = manager.getArchetype(Archetypes.Droppable)

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
                const { type } = dragSource.components.draggable!
                const { receives } = entity.components.droppable!

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
                  entity.components.position!.x - pos.x,
                  entity.components.position!.y - pos.y
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
        const card = dragSource.getComponent('card')
        const player = dragSource.getComponent('player')

        if (card.status === CardStatus.Deck) {
          return
        }

        const position = dragSource.getComponent('position')
        const rotation = dragSource.getComponent('rotation')
        const mesh = dragSource.getComponent('mesh')
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
          //rotation.x = lerp(mesh.rotation.x, 0, 0.5)
          rotation.y = lerp(mesh.rotation.y, 0, 0.5)
        }
        rotation.z = lerp(mesh.rotation.z, 0, 0.5)
      } else {
        if (dragSource && dropTarget) {
          const card = dragSource.getComponent('card')
          const player = dragSource.getComponent('player')
          playCard(player.id, card.id)
        }

        isDragging = false
        dragSource = null
        dropTarget = null
      }
    }
  }
}
