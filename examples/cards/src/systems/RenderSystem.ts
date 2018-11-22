import { System, EntityManager, Entity } from '../../../../src/ecs'
import { Components } from '../components'
import { Archetypes } from '../archetypes'
import $ from 'jquery'
import { positionArchetype } from '../../../../src/ecs/__tests__/archetype.fixtures'
import { CardStatus } from '../types'

export default class RenderSystem extends System<Components> {
  update(manager: EntityManager<Components>, dt: number) {
    const { entities } = manager.getArchetype(Archetypes.Renderable)

    entities.forEach(entity => {
      const { element } = entity.getComponent('dom')
      const width = entity.getComponent('width')
      const height = entity.getComponent('height')
      const color = entity.getComponent('color')
      const boxShadow = entity.getComponent('boxShadow')
      const position = entity.getComponent('position')
      const borderRadius = entity.getComponent('borderRadius')
      const rotation = entity.getComponent('rotation')
      const card = entity.getComponent('card')
      const material = entity.getComponent('material')
      const player = entity.getComponent('player')
      const isPlayer = player.id === 1
      const showFace =
        (isPlayer && card.status !== CardStatus.Deck) ||
        card.status === CardStatus.Field
      const $element = $(element)

      $element.attr('data-id', entity.id)

      if (document.body.contains(element)) {
      } else {
        if (card) {
          $element
            .html(
              `<div>
              <div class="title">${card.name}</div>
              <div class="cost">${card.cost}</div>
            </div>`
            )
            .children()
            .hide()
        }
        document.body.appendChild(element)
      }

      if (showFace) {
        $element.children().show()
      }

      if (width && height) {
        $element.width(width).height(height)
      }

      const transforms = []

      if (position) {
        transforms.push(
          `translateX(${position.x}px) translateY(${position.y}px)`
        )
      }

      if (rotation) {
        transforms.push(`rotate(${rotation}deg)`)
      }

      if (transforms.length) {
        $element.css({
          position: 'absolute',
          left: 0,
          top: 0,
          transform: transforms.join(' '),
          transformOrigin: `50% 50%`
        })
      }

      if (color) {
        $element.css(
          'background-color',
          `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
        )
      }

      if (material) {
        const backgroundImage = showFace
          ? `linear-gradient(rgba(32,64,255,0), rgba(32,64,255,0.1), rgba(255,32,128,0.2), rgba(32,0,64,0.8), rgba(16,0,32,1)), url("images/${
              material.imageSrc
            }")`
          : `url("images/back.png")`

        $element.css({
          'background-image': backgroundImage,
          'background-size': 'cover',
          'background-position': '50% 33%',
          'background-repeat': 'norepeat'
        })
      }

      if (borderRadius) {
        $element.css('borderRadius', `${borderRadius}px`)
      }

      if (boxShadow) {
        $element.css(
          'box-shadow',
          `${boxShadow.hOffset}px ${boxShadow.vOffset}px ${boxShadow.blur}px ${
            boxShadow.spread
          }px rgba(${boxShadow.color.r}, ${boxShadow.color.g}, ${
            boxShadow.color.b
          }, ${boxShadow.color.a})`
        )
      }
    })
  }
}
