import { System, EntityManager, Entity } from '../../../../src'
import { PlayerCardsArchetype, OpponentCardsArchetype } from '../archetypes'
import { Components } from '../components'
import { CardStatus } from '../types'
import { degreesToRadians, lerp } from '../utils'

const cardPositionX = (
  index: number,
  step: number,
  cardCount: number,
  isHovering: boolean,
  hoveringIdx: number
) => {
  let x = -((cardCount - 1) * step) / 2 + index * step

  if (isHovering) {
    const half = (cardCount - 1) / 2

    const hoveredMoved = Math.min(1, Math.max(hoveringIdx - half, -1)) * 20

    if (index > hoveringIdx) {
      x += step + hoveredMoved
    } else if (index === hoveringIdx) {
      x += hoveredMoved
    } else if (index < hoveringIdx) {
      x += -step / 4
    }
  }

  return x / 200
}

const cardPositionY = (
  index: number,
  step: number,
  cardCount: number,
  isHovering: boolean,
  hoveringIdx: number
) => {
  const mid = Math.ceil(cardCount / 2)
  let i = index - mid
  let s = step
  let y
  if (cardCount % 2 === 0) {
    if (i >= 0) {
      i += 1
    }
    if (i === -1 || i === 1) {
      s = step
    }
    y = Math.abs(i) * -s
  } else {
    i += 1
    if (i === 0) {
      y = -step / 2
    } else {
      y = Math.abs(i) * -s
    }
  }

  if (isHovering && hoveringIdx === index) {
    y += step * 4
  }

  return y / 200
}

// const cardPositionZ = (
//   index: number,
//   order: number,
//   step: number,
//   isHovering: boolean,
//   hoveringIdx: number
// ) => {
//   let z
//   if (isHovering && hoveringIdx === index) {
//     z = index + step
//   } else {
//     z = order
//   }

//   return z / 200
// }

const cardRotation = (
  index: number,
  isPlayer: boolean,
  degreesRot: number,
  cardCount: number
) => {
  const mid = Math.floor(cardCount / 2)
  return degreesToRadians((index - mid) * degreesRot)
}

const updateCardPosition = (
  entity: Entity<Components>,
  idx: number,
  cardCount: number,
  isHovering: boolean,
  hoveringIdx: number
) => {
  const position = entity.getComponentValue('position')
  const rotation = entity.getComponentValue('rotation')
  const player = entity.getComponentValue('player')
  const order = entity.getComponentValue('order')

  const isPlayer = player.id === 1
  const xStep = 100
  const yStep = 10
  const rStep = 4
  const zStep = 1
  const x = cardPositionX(idx, xStep, cardCount, isHovering, hoveringIdx)
  const y =
    cardPositionY(
      idx,
      isPlayer ? yStep : -yStep,
      cardCount,
      isHovering,
      hoveringIdx
    ) + (isPlayer ? -2.0 : 2.5)
  const rotX = degreesToRadians(isPlayer ? 20 : 0)
  const rotY = degreesToRadians(isPlayer ? 0 : 178) // slight angle
  const rotZ = cardRotation(idx, isPlayer, -rStep, cardCount)
  const dt = 0.16 / 2
  let z = isPlayer ? 0.5 + order / 30 : 0.03 // + (order * 2) / 200 // cardPositionZ(idx, order, zStep, isHovering, hoveringIdx)

  if (isPlayer && isHovering && hoveringIdx === idx) {
    z += 0.07
  }

  if (position.x !== x || position.y !== y || position.z !== z) {
    position.x = lerp(position.x, x, dt)
    position.y = lerp(position.y, y, dt)
    position.z = lerp(position.z, z, dt)
  }

  if (rotation.z !== z || rotation.y !== rotY || rotation.x !== rotX) {
    rotation.y = lerp(rotation.y, rotY, dt)
    rotation.z = lerp(rotation.z, rotZ, dt)
    rotation.x = lerp(rotation.x, rotX, dt)
  }
}

export class HandSystem extends System<Components> {
  update(manager: EntityManager<Components>, dt: number) {
    let { entities: playerCards } = manager.getArchetype(PlayerCardsArchetype)
    let { entities: opponentCards } = manager.getArchetype(
      OpponentCardsArchetype
    )

    playerCards = playerCards
      .filter(
        (entity) => entity.components.card!.value.status === CardStatus.Hand
      )
      .sort((a, b) => a.components.order!.value - b.components.order!.value)
    opponentCards = opponentCards.filter(
      (entity) => entity.components.card!.value.status === CardStatus.Hand
    )

    const isHoveringPlayerCards = playerCards.some((entity) =>
      entity.hasComponent('hover')
    )
    const isHoveringOpponentCards = opponentCards.some((entity) =>
      entity.hasComponent('hover')
    )
    const playerHoveringIdx = playerCards.findIndex((entity) =>
      entity.hasComponent('hover')
    )
    const opponentHoveringIdx = opponentCards.findIndex((entity) =>
      entity.hasComponent('hover')
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
