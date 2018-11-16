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
      const boxShadow = entity.getComponent('boxshadow')
      const position = entity.getComponent('position')

      if (document.body.contains(element)) {
      } else {
        document.body.appendChild(element)
      }

      if (width && height) {
        $(element)
          .width(width)
          .height(height)
      }

      if (position) {
        $(element).css({
          position: 'absolute',
          left: `${position.x}px`,
          top: `${position.y}px`
        })
      }

      if (color) {
        $(element).css(
          'background-color',
          `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
        )
      }

      if (boxShadow) {
        $(element).css(
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
