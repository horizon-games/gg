import { System, EntityManager, Entity } from '../../../../src'
import { PlayerCardsArchetype, OpponentCardsArchetype } from '../archetypes'
import { Components } from '../components'
import { CardStatus } from '../types'
import { lerp } from '../utils'

// const cardPositionX = (
//   index: number,
//   step: number,
//   cardCount: number,
//   isHovering: boolean,
//   hoveringIdx: number
// ) => {
//   let x = -((cardCount - 1) * step) / 2 + index * step

//   if (isHovering) {
//     const half = (cardCount - 1) / 2

//     if (index > hoveringIdx) {
//       x += 20
//     } else if (index === hoveringIdx) {
//       x += Math.min(1, Math.max(index - half, -1)) * 10
//     }
//   }

//   return screen.width / 2 + x - 62
// }

// const cardPositionY = (
//   index: number,
//   step: number,
//   cardCount: number,
//   isHovering: boolean,
//   hoveringIdx: number
// ) => {
//   const mid = Math.ceil(cardCount / 2)
//   let i = index - mid
//   let s = step
//   let y
//   if (cardCount % 2 === 0) {
//     if (i >= 0) {
//       i += 1
//     }
//     if (i === -1 || i === 1) {
//       s = step
//     }
//     y = Math.abs(i) * -s
//   } else {
//     i += 1
//     if (i === 0) {
//       y = -step / 2
//     } else {
//       y = Math.abs(i) * -s
//     }
//   }

//   if (isHovering && hoveringIdx === index) {
//     y += step
//   }

//   return y
// }

// const cardRotation = (index: number, degreesRot: number, cardCount: number) => {
//   const mid = Math.floor(cardCount / 2)
//   return (index - mid) * degreesRot
// }

const updateCardPosition = (
  entity: Entity<Components>,
  idx: number,
  cardCount: number,
  _isHovering: boolean,
  _hoveringIdx: number
) => {
  const position = entity.getComponentValue('position')
  const rotation = entity.getComponentValue('rotation')
  const player = entity.getComponentValue('player')
  const isPlayer = player.id === 1
  const xStep = 1.2
  // const yStep = 2
  // const rStep = 4
  const x = -(cardCount / 2) * xStep + xStep * idx + xStep / 2
  const y = isPlayer ? -0.8 : 0.8
  const z = 0.1
  const dt = 0.16
  const rotX = 0
  const rotZ = 0
  const rotY = 0

  if (position.x !== x || position.y !== y) {
    position.x = lerp(position.x, x, dt)
    position.y = lerp(position.y, y, dt)
  } else {
    rotation.y = lerp(rotation.y, rotY, dt)
  }

  if (rotation.y === rotY) {
    position.z = lerp(position.z, z, dt)
  }

  if (rotation.z !== rotZ || rotation.x !== rotX) {
    rotation.z = lerp(rotation.z, rotZ, dt)
    rotation.x = lerp(rotation.x, rotX, dt)
  }
}

export class FieldSystem extends System<Components> {
  update(manager: EntityManager<Components>, dt: number) {
    let { entities: playerCards } = manager.getArchetype(PlayerCardsArchetype)
    let { entities: opponentCards } = manager.getArchetype(
      OpponentCardsArchetype
    )

    playerCards = playerCards
      .filter(
        (entity) => entity.components.card!.value.status === CardStatus.Field
      )
      .sort((a, b) => a.components.order!.value - b.components.order!.value)

    opponentCards = opponentCards
      .filter(
        (entity) => entity.components.card!.value.status === CardStatus.Field
      )
      .sort((a, b) => a.components.order!.value - b.components.order!.value)

    const isHoveringPlayerCards = playerCards.some((entity) =>
      entity.has('hover')
    )
    const isHoveringOpponentCards = opponentCards.some((entity) =>
      entity.has('hover')
    )
    const playerHoveringIdx = playerCards.findIndex((entity) =>
      entity.has('hover')
    )
    const opponentHoveringIdx = opponentCards.findIndex((entity) =>
      entity.has('hover')
    )

    playerCards.forEach((entity, idx) => {
      updateCardPosition(
        entity,
        idx,
        playerCards.length,
        isHoveringPlayerCards,
        playerHoveringIdx
      )
    })

    opponentCards.forEach((entity, idx) => {
      updateCardPosition(
        entity,
        idx,
        opponentCards.length,
        isHoveringOpponentCards,
        opponentHoveringIdx
      )
    })
  }
}
