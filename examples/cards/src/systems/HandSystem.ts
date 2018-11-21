import { System, EntityManager, Entity } from '../../../../src/ecs'
import { Components, PositionComponent, RotationComponent } from '../components'
import { Archetypes } from '../archetypes'
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

    if (index > hoveringIdx) {
      x += 20
    } else if (index === hoveringIdx) {
      x += Math.min(1, Math.max(index - half, -1)) * 10
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
    y += step
  }

  return y
}

const cardRotation = (index: number, degreesRot: number, cardCount: number) => {
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
  const position = entity.getComponent('position')
  const rotation = entity.getComponent('rotation')
  const player = entity.getComponent('player')
  const isPlayer = player.id === 1
  const xStep = 100
  const yStep = 20
  const rStep = 4
  const x = cardPositionX(idx, xStep, cardCount, isHovering, hoveringIdx)
  const y =
    cardPositionY(
      idx,
      isPlayer ? -yStep : yStep,
      cardCount,
      isHovering,
      hoveringIdx
    ) + (isPlayer ? window.innerHeight - 225 : 50)
  const rot = cardRotation(idx, isPlayer ? rStep : -rStep, cardCount)
  const dt = 0.16

  if (Math.abs(position.x - x) > 0.1 || Math.abs(position.y - y) > 0.1) {
    position.x = lerp(position.x, x, dt)
    position.y = lerp(position.y, y, dt)
  }

  if (Math.abs(rotation - rot) > 0.1) {
    entity.setComponent('rotation', lerp(rotation, rot, dt))
  }
}

export default class HandSystem extends System<Components> {
  update(manager: EntityManager<Components>, dt: number) {
    let { entities: playerCards } = manager.getArchetype(Archetypes.PlayerCards)
    let { entities: opponentCards } = manager.getArchetype(
      Archetypes.OpponentCards
    )

    playerCards = playerCards.filter(
      entity => entity.components.card!.status === CardStatus.Hand
    )
    opponentCards = opponentCards.filter(
      entity => entity.components.card!.status === CardStatus.Hand
    )

    const isHoveringPlayerCards = playerCards.some(
      entity => entity.components.hover!
    )
    const isHoveringOpponentCards = opponentCards.some(
      entity => entity.components.hover!
    )
    const playerHoveringIdx = playerCards.findIndex(
      entity => entity.components.hover!
    )
    const opponentHoveringIdx = opponentCards.findIndex(
      entity => entity.components.hover!
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
