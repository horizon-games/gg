import { System, EntityManager, Entity } from '../../../../src/ecs'
import { Components } from '../components'
import { Archetypes } from '../archetypes'
import $ from 'jquery'
import { positionArchetype } from '../../../../src/ecs/__tests__/archetype.fixtures'

export default class RenderSystem extends System<Components> {
  update(manager: EntityManager<Components>, dt: number) {
    const { entities } = manager.getArchetype(Archetypes.Renderable)

    entities.forEach(entity => {
      const { element } = entity.getComponent('dom')
      const { value: width } = entity.getComponent('width')
      const { value: height } = entity.getComponent('height')
      const color = entity.getComponent('color')
      const boxShadow = entity.getComponent('boxShadow')
      const position = entity.getComponent('position')
      const borderRadius = entity.getComponent('borderRadius')
      const rotation = entity.getComponent('rotation')

      const $element = $(element)

      $element.attr('data-id', entity.id)

      if (document.body.contains(element)) {
      } else {
        document.body.appendChild(element)
      }

      if (width && height) {
        $element.width(width).height(height)
      }

      const transforms = []

      if (position) {
        // $element.css({
        //   position: 'absolute',
        //   left: `${position.x}px`,
        //   top: `${position.y}px`
        // })
        transforms.push(
          `translateX(${position.x}px) translateY(${position.y}px)`
        )
      }

      if (rotation) {
        // $element.css({
        //   transform: `rotate(${rotation.value}deg)`,
        //   transformOrigin: `50% 50%`
        // })
        transforms.push(`rotate(${rotation.value}deg)`)
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

      if (borderRadius) {
        $element.css('borderRadius', `${borderRadius.value}px`)
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
