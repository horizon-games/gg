import { System, EntityManager, Entity } from '../../../../src/ecs'
import { Components, PositionComponent, RotationComponent } from '../components'
import { Archetypes } from '../archetypes'
import { CardStatus } from '../types'

const lerp = (a: number, b: number, dt: number): number => {
  return a + dt * (b - a)
}

const cardPositionY = (
  index: number,
  yStep: number,
  cardCount: number,
  isHovering: boolean,
  hoveringIdx: number
) => {
  const mid = Math.ceil(cardCount / 2)
  let i = index - mid
  let s = yStep

  let y
  if (cardCount % 2 === 0) {
    if (i >= 0) {
      i += 1
    }
    if (i === -1 || i === 1) {
      s = yStep
    }
    y = Math.abs(i) * -s
  } else {
    i += 1
    if (i === 0) {
      y = -yStep / 2
    } else {
      y = Math.abs(i) * -s
    }
  }

  if (isHovering && hoveringIdx === index) {
    y += yStep
  }

  return y
}

const cardRotation = (index: number, degreesRot: number, cardCount: number) => {
  const mid = Math.ceil(cardCount / 2)
  let i = index - mid
  let r = degreesRot

  if (cardCount % 2 === 0) {
    if (i >= 0) {
      i += 1
    }
    if (i === -1 || i === 1) {
      r = degreesRot / 2
    }
  } else {
    i += 1
  }
  return i * r
}

const updateCardPosition = (
  entity: Entity<Components>,
  idx: number,
  cardCount: number
) => {
  const position = entity.getComponent('position')
  const rotation = entity.getComponent('rotation')
  const player = entity.getComponent('player')
  const hover = entity.getComponent('hover')
  const isHovering = hover.value
  const hoveringIdx = idx
  const isPlayer = player.id === 1
  const x = window.innerWidth / 2 + idx * 100 - (cardCount * 100) / 2
  const y =
    cardPositionY(
      idx,
      isPlayer ? -20 : 20,
      cardCount,
      isHovering,
      hoveringIdx
    ) + (isPlayer ? window.innerHeight - 225 : 50)

  const rot = cardRotation(idx, isPlayer ? 4 : -4, cardCount)
  const dt = 0.16

  if (position.x !== x || position.y !== y) {
    position.x = lerp(position.x, x, dt)
    position.y = lerp(position.y, y, dt)
  }

  if (rotation.value !== rot) {
    rotation.value = lerp(rotation.value, rot, dt)
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

    opponentCards.forEach((entity, idx) => {
      updateCardPosition(entity, idx, opponentCards.length)
    })

    playerCards.forEach((entity, idx) => {
      updateCardPosition(entity, idx, playerCards.length)
    })
  }
}
