import { System, EntityManager, Entity } from '../../../../src/ecs'
import { Components } from '../components'
import { Archetypes } from '../archetypes'

export default class RenderSystem extends System<Components> {
  update(manager: EntityManager<Components>, dt: number) {
    const { entities } = manager.getArchetype(Archetypes.Renderable)

    entities.forEach(entity => {
      const position = entity.getComponent('position')
      const rotation = entity.getComponent('rotation')
      const mesh = entity.getComponent('mesh')
      mesh.position.set(position.x / 200, position.y / 200, position.z / 200)
      mesh.rotation.set(rotation.x, rotation.y, rotation.z)
    })
  }
}

// export default class RenderSystem extends System<Components> {
//   update(manager: EntityManager<Components>, dt: number) {
//     const { entities } = manager.getArchetype(Archetypes.Renderable)

//     entities.forEach(entity => {
//       const { element, className } = entity.getComponent('dom')
//       const width = entity.getComponent('width')
//       const height = entity.getComponent('height')
//       const boxShadow = entity.getComponent('boxShadow')
//       const position = entity.getComponent('position')
//       const borderRadius = entity.getComponent('borderRadius')
//       const rotation = entity.getComponent('rotation')
//       const card = entity.getComponent('card')
//       const material = entity.getComponent('material')
//       const player = entity.getComponent('player')
//       const isPlayer = player.id === 1
//       const showFace =
//         (isPlayer && card.status !== CardStatus.Deck) ||
//         card.status === CardStatus.Field
//       const $element = $(element)

//       const viewport = $('body > main')

//       $element.attr('data-id', entity.id)

//       if (document.body.contains(element)) {
//       } else {
//         if (card) {
//           $element
//             .addClass(className)
//             .html(
//               `<div class="face">
//                 <div class="title">${card.name}</div>
//                 <div class="cost">${card.cost}</div>
//               </div>
//               <div class="back"></div>`
//             )
//             .children()
//         }
//         viewport.append(element)
//       }

//       if (showFace) {
//         $element.children().show()
//       }

//       if (width && height) {
//         $element.width(width).height(height)
//       }

//       const transforms = []

//       if (position) {
//         transforms.push(
//           `translate3d(${position.x}px, ${position.y}px, ${position.z}px)`
//         )
//         $element.css('z-index', Math.round(position.z))
//       }

//       if (rotation) {
//         transforms.push(
//           `rotateZ(${rotation.z}deg) rotateX(${rotation.x}deg) rotateY(${
//             rotation.y
//           }deg)`
//         )
//       }

//       if (transforms.length) {
//         $element.css({
//           position: 'absolute',
//           left: 0,
//           top: 0,
//           transform: transforms.join(' '),
//           transformOrigin: `50% 50%`
//         })
//       }

//       if (material) {
//         $element.find('.face').css({
//           'background-image': `linear-gradient(rgba(32,64,255,0), rgba(32,64,255,0.1), rgba(255,32,128,0.2), rgba(32,0,64,0.8), rgba(16,0,32,1)), url("images/${
//             material.imageSrc
//           }")`
//         })
//       }

//       if (borderRadius) {
//         $element.css('borderRadius', `${borderRadius}px`)
//         $element.children().css('borderRadius', `${borderRadius}px`)
//       }

//       if (boxShadow) {
//         $element.css(
//           'box-shadow',
//           `${boxShadow.hOffset}px ${boxShadow.vOffset}px ${boxShadow.blur}px ${
//             boxShadow.spread
//           }px rgba(${boxShadow.color.r}, ${boxShadow.color.g}, ${
//             boxShadow.color.b
//           }, ${boxShadow.color.a})`
//         )
//       }
//     })
//   }
// }
