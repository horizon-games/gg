import { Raycaster } from 'three'

import { System, EntityManager } from '../../../../src'
import { drawCard } from '../actions'
import { HoveredCardsArchetype } from '../archetypes'
import camera from '../camera'
import { Components, HoverComponent } from '../components'
import mouse from '../mouse'
import scene from '../scene'
import { CardStatus } from '../types'

const raycaster = new Raycaster()

window.addEventListener('click', () => {
  if (hoveredEntity) {
    const player = hoveredEntity.getComponentValue('player')
    const card = hoveredEntity.getComponentValue('card')
    switch (card.status) {
      case CardStatus.Deck:
        drawCard(player.id)
        break

      // case CardStatus.Hand:
      //   playCard(player.id, card.id)
      //   break
    }
  }
})

let hoveredEntity: any

export class MouseSystem extends System<Components> {
  update(manager: EntityManager<Components>, dt: number) {
    const { entities } = manager.getArchetype(HoveredCardsArchetype)

    raycaster.setFromCamera(mouse.position, camera)

    const intersections = raycaster.intersectObjects(scene.children, true)
    entities.forEach((entity) => entity.removeComponent('hover'))
    hoveredEntity = null
    document.body.style.cursor = 'default'

    if (intersections.length) {
      const {
        object: { parent },
      } = intersections[0]
      if (parent) {
        const { entityId } = parent.userData
        if (entityId) {
          const entity = manager.getEntity(entityId)
          if (entity) {
            hoveredEntity = entity
            entity.addComponent(new HoverComponent())
            document.body.style.cursor = 'pointer'
          }
        }
      }
    }
  }
}
