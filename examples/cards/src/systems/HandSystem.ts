import { System, EntityManager, Entity } from '../../../../src/ecs'
import { Components, PositionComponent, RotationComponent } from '../components'
import { PlayerCardsArchetype, OpponentCardsArchetype } from '../archetypes'
import { CardStatus } from '../types'

const lerp = (a: number, b: number, dt: number): number => {
  return a + dt * (b - a)
}

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
      x += 80 + hoveredMoved
    } else if (index === hoveringIdx) {
      x += hoveredMoved
    } else if (index < hoveringIdx) {
      x += -20
    }
  }

  return window.innerWidth / 2 + x - 62
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

  return y
}

const cardPositionZ = (
  index: number,
  order: number,
  step: number,
  isHovering: boolean,
  hoveringIdx: number
) => {
  if (isHovering && hoveringIdx === index) {
    return index + step
  } else {
    return order
  }
}

const cardRotation = (
  index: number,
  isPlayer: boolean,
  degreesRot: number,
  cardCount: number
) => {
  const mid = Math.floor(cardCount / 2)
  return (index - mid) * degreesRot
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
  const xStep = 40
  const yStep = 5
  const rStep = 4
  const zStep = 200
  const x = cardPositionX(idx, xStep, cardCount, isHovering, hoveringIdx)
  const y =
    cardPositionY(
      idx,
      isPlayer ? -yStep : yStep,
      cardCount,
      isHovering,
      hoveringIdx
    ) + (isPlayer ? window.innerHeight - 225 : 50)
  const rotY = isPlayer ? 0 : 180
  const rotZ = cardRotation(idx, isPlayer, isPlayer ? rStep : -rStep, cardCount)
  const dt = 0.16 / 2
  const z = order // cardPositionZ(idx, order, zStep, isHovering, hoveringIdx)

  position.z = z

  if (
    Math.abs(position.x - x) > 0.1 ||
    Math.abs(position.y - y) > 0.1
    // Math.abs(position.z - z) > 0.1
  ) {
    position.x = lerp(position.x, x, dt)
    position.y = lerp(position.y, y, dt)
    // position.z = lerp(position.z, z, dt)
  }

  if (Math.abs(rotation.z - rotZ) > 0.1 || Math.abs(rotation.y - rotY) > 0.1) {
    rotation.y = lerp(rotation.y, rotY, dt)
    rotation.z = lerp(rotation.z, rotZ, dt)
  }
}

export default class HandSystem extends System<Components> {
  update(manager: EntityManager<Components>, dt: number) {
    let { entities: playerCards } = manager.getArchetype(PlayerCardsArchetype)
    let { entities: opponentCards } = manager.getArchetype(
      OpponentCardsArchetype
    )

    playerCards = playerCards
      .filter(
        entity => entity.components.card!.value.status === CardStatus.Hand
      )
      .sort((a, b) => a.components.order!.value - b.components.order!.value)
    opponentCards = opponentCards.filter(
      entity => entity.components.card!.value.status === CardStatus.Hand
    )

    const isHoveringPlayerCards = playerCards.some(
      entity => entity.components.hover!.value
    )
    const isHoveringOpponentCards = opponentCards.some(
      entity => entity.components.hover!.value
    )
    const playerHoveringIdx = playerCards.findIndex(
      entity => entity.components.hover!.value
    )
    const opponentHoveringIdx = opponentCards.findIndex(
      entity => entity.components.hover!.value
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
