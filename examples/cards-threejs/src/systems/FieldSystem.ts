import { System, EntityManager, Entity } from '../../../../src/ecs'
import { Components, PositionComponent, RotationComponent } from '../components'
import { Archetypes } from '../archetypes'
import { CardStatus } from '../types'
import screen from '../screen'
import { lerp } from '../utils'

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

  return screen.width / 2 + x - 62
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
  const xStep = 1.2
  const yStep = 2
  const rStep = 4
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

export default class FieldSystem extends System<Components> {
  update(manager: EntityManager<Components>, dt: number) {
    let { entities: playerCards } = manager.getArchetype(Archetypes.PlayerCards)
    let { entities: opponentCards } = manager.getArchetype(
      Archetypes.OpponentCards
    )

    playerCards = playerCards
      .filter(entity => entity.components.card!.status === CardStatus.Field)
      .sort((a, b) => a.components.order! - b.components.order!)

    opponentCards = opponentCards
      .filter(entity => entity.components.card!.status === CardStatus.Field)
      .sort((a, b) => a.components.order! - b.components.order!)

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
