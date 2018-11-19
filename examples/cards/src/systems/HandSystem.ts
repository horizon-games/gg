import { System, EntityManager, Entity } from '../../../../src/ecs'
import { Components, PositionComponent, RotationComponent } from '../components'
import { Archetypes } from '../archetypes'
import { CardStatus } from '../types'

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
  playerId: number,
  position: PositionComponent,
  rotation: RotationComponent,
  idx: number,
  cardCount: number,
  isHovering: boolean,
  hoveringIdx: number
) => {
  position.x = window.innerWidth / 2 + idx * 100 - (cardCount * 100) / 2
  position.y =
    cardPositionY(
      idx,
      playerId ? -20 : 20,
      cardCount,
      isHovering,
      hoveringIdx
    ) + (playerId ? window.innerHeight - 225 : 50)

  rotation.value = cardRotation(idx, playerId ? 4 : -4, cardCount)
}

export default class HandSystem extends System<Components> {
  update(manager: EntityManager<Components>, dt: number) {
    const { entities } = manager.getArchetype(Archetypes.Cards)
    const opponentCards = entities.filter(
      entity =>
        entity.components.card!.status === CardStatus.Hand &&
        entity.components.player!.id === 0
    )

    const playerCards = entities.filter(
      entity =>
        entity.components.card!.status === CardStatus.Hand &&
        entity.components.player!.id === 1
    )

    opponentCards.forEach((entity, idx) => {
      const card = entity.getComponent('card')
      if (card.status === CardStatus.Hand) {
        const position = entity.getComponent('position')
        const rotation = entity.getComponent('rotation')
        const player = entity.getComponent('player')
        const hover = entity.getComponent('hover')
        const isHovering = hover.value
        const hoveringIdx = idx

        updateCardPosition(
          player.id,
          position,
          rotation,
          idx,
          opponentCards.length,
          isHovering,
          hoveringIdx
        )
      }
    })

    playerCards.forEach((entity, idx) => {
      const card = entity.getComponent('card')
      if (card.status === CardStatus.Hand) {
        const position = entity.getComponent('position')
        const rotation = entity.getComponent('rotation')
        const player = entity.getComponent('player')
        const hover = entity.getComponent('hover')
        const isHovering = hover.value
        const hoveringIdx = idx
        updateCardPosition(
          player.id,
          position,
          rotation,
          idx,
          playerCards.length,
          isHovering,
          hoveringIdx
        )
      }
    })
  }
}
