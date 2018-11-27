import { System, EntityManager, Entity } from '../../../../src/ecs'
import { Components, PositionComponent, HoverComponent } from '../components'
import { Archetypes } from '../archetypes'
import { Vector2, Raycaster, Vector3 } from 'three'
import camera from '../camera'
import scene from '../scene'
import { drawCard, playCard } from '../actions'
import { CardStatus } from '../types'

const raycaster = new Raycaster()
const mouse = new Vector2()
let screenWidth = window.innerWidth
let screenHeight = window.innerHeight

window.addEventListener('mousemove', function(ev) {
  mouse.x = (ev.clientX! / screenWidth) * 2 - 1
  mouse.y = -(ev.clientY! / screenHeight) * 2 + 1
})

window.addEventListener('resize', function() {
  screenWidth = window.innerWidth
  screenHeight = window.innerHeight
})

window.addEventListener('click', function() {
  if (hoveredEntity) {
    const player = hoveredEntity.getComponent('player')
    const card = hoveredEntity.getComponent('card')
    switch (card.status) {
      case CardStatus.Deck:
        drawCard(player.id)
        break

      case CardStatus.Hand:
        playCard(player.id, card.id)
        break
    }
  }
})

let hoveredEntity: any

export default class MouseSystem extends System<Components> {
  update(manager: EntityManager<Components>, dt: number) {
    const { entities } = manager.getArchetype(Archetypes.HoveredCards)

    raycaster.setFromCamera(mouse, camera)

    const intersections = raycaster.intersectObjects(scene.children)
    entities.forEach(entity => entity.removeComponent('hover'))
    hoveredEntity = null

    if (intersections.length) {
      const { object } = intersections[0]
      const { entityId } = object.userData
      if (entityId) {
        const entity = manager.getEntity(entityId)
        if (entity) {
          hoveredEntity = entity
          entity.addComponent(new HoverComponent())
        }
      }
    }
  }
}

// const get2DPoint = (worldVector: Vector3): Vector2 => {
//   const vector = projector.projectVector(worldVector, camera)
//   const halfWidth = screenWidth / 2
//   const halfHeight = screenHeight / 2

//   return new Vector2(
//     Math.round(vector.x * halfWidth + halfWidth),
//     Math.round(-vector.y * halfHeight + halfHeight)
//   )
// }
