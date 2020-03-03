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
  const position = entity.getComponentValue('position')
  const rotation = entity.getComponentValue('rotation')
  const player = entity.getComponentValue('player')
  const isPlayer = player.id === 1
  const xStep = 135
  const yStep = 20
  const rStep = 4
  const x = window.innerWidth / 2 - (cardCount / 2) * xStep + xStep * idx
  const y = window.innerHeight / 2 + (isPlayer ? 10 : -180)
  const dt = 0.16
  const rotZ = 0
  const rotY = 0
  const z = -25

  if (
    Math.abs(position.x - x) > 0.1 ||
    Math.abs(position.y - y) > 0.1 ||
    Math.abs(position.z - z) > 0.1
  ) {
    position.x = lerp(position.x, x, dt)
    position.y = lerp(position.y, y, dt)
    position.z = lerp(position.z, z, dt)
  } else {
    if (Math.abs(rotation.y - rotY) > 0.1) {
      rotation.y = lerp(rotation.y, rotY, dt / 3)
    }
  }

  if (Math.abs(rotation.z - rotZ) > 0.1) {
    rotation.z = lerp(rotation.z, rotZ, dt)
  }
}

export default class FieldSystem extends System<Components> {
  update(manager: EntityManager<Components>, dt: number) {
    let { entities: playerCards } = manager.getArchetype(PlayerCardsArchetype)
    let { entities: opponentCards } = manager.getArchetype(
      OpponentCardsArchetype
    )

    playerCards = playerCards.filter(
      entity => entity.components.card!.value.status === CardStatus.Field
    )
    opponentCards = opponentCards.filter(
      entity => entity.components.card!.value.status === CardStatus.Field
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
