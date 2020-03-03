import Stats from 'stats.js'
import { State, CardStatus, Card } from './types'
import store from './store'
import { drawCard, playCard } from './actions'
import { World, Archetype, Entity } from '../../../src/ecs'
import RenderSystem from './systems/RenderSystem'
import {
  RenderableArchetype,
  CardsArchetype,
  PlayerCardsArchetype,
  OpponentCardsArchetype
} from './archetypes'
import { Components } from './components'
import CardAssemblage from './assemblages/CardAssemblage'
import DeckSystem from './systems/DeckSystem'
import HandSystem from './systems/HandSystem'
import $ from 'jquery'
import FieldSystem from './systems/FieldSystem'

const stats = new Stats()

const world = new World<Components>()

world.addArchetype(RenderableArchetype)
world.addArchetype(CardsArchetype)
world.addArchetype(PlayerCardsArchetype)
world.addArchetype(OpponentCardsArchetype)

world.addSystem(new RenderSystem())
world.addSystem(new DeckSystem())
world.addSystem(new HandSystem())
world.addSystem(new FieldSystem())

console.log(world)

const cards: Map<number, Entity<Components>> = new Map()

const updateCardEntity = (card: Card, status: CardStatus, index: number) => {
  if (!cards.has(card.id)) {
    const entity = world.createEntity(CardAssemblage(card, status))
    cards.set(card.id, entity)
  } else {
    const entity = cards.get(card.id)
    if (entity) {
      entity.components.card!.value.status = status
      entity.components.order!.value = index
    }
  }
}

const syncState = (state: State) => {
  state.players.forEach((player, playerId) => {
    player.inDeck.forEach((card, idx) => {
      updateCardEntity(card, CardStatus.Deck, idx)
    })

    player.inHand.forEach((card, idx) => {
      updateCardEntity(card, CardStatus.Hand, idx)
    })

    player.inPlay.forEach((card, idx) => {
      updateCardEntity(card, CardStatus.Field, idx)
    })
  })
}

store.subscribe((state: State) => {
  console.log('State update', state)
  syncState(state)
})

window.onkeydown = (ev: any) => {
  const key = ev.keyCode

  switch (key) {
    case 68: // (d)rawCard
      console.log('drawCard')
      drawCard(1)

      break
  }
}

$('body').mousemove(ev => {
  const target = $(ev.target).closest('.card')
  const id = Number(target.data('id'))
  world.manager.entities.forEach(entity => {
    if (entity.hasComponent('hover')) {
      entity.setComponentValue('hover', false)
    }
  })

  if (id) {
    const entity = world.manager.getEntity(id)
    if (entity && entity.hasComponent('hover')) {
      const { status } = entity.components.card!.value

      if (status !== CardStatus.Deck) {
        entity.setComponentValue('hover', true)
      }
    }
  }
})

$('body').on('click', '.card', ev => {
  const target = $(ev.target).closest('.card')
  const id = Number(target.data('id'))

  if (id) {
    const entity = world.manager.getEntity(id)
    if (entity) {
      const { status } = entity.components.card!.value
      switch (status) {
        case CardStatus.Deck:
          drawCard(entity.components.player!.value.id)
          break

        case CardStatus.Hand:
          playCard(
            entity.components.player!.value.id,
            entity.components.card!.value.id
          )
          break
      }
    }
  }
})

const stagger = (fns: any[], timeout: number) => {
  setTimeout(() => {
    if (fns.length) {
      fns.shift()()
      stagger(fns, timeout)
    }
  }, timeout)
}

const init = () => {
  // Add Stats
  document.body.appendChild(stats.dom)

  syncState(store.getState())

  // Start loop
  requestAnimationFrame(loop)

  stagger(
    [
      () => drawCard(0),
      () => drawCard(0),
      () => drawCard(0),
      () => drawCard(0),
      () => drawCard(0),

      () => drawCard(1),
      () => drawCard(1),
      () => drawCard(1),
      () => drawCard(1),
      () => drawCard(1)
    ],
    200
  )
}

let frame = 0
const loop = () => {
  frame++
  stats.begin()

  world.update(0, frame)

  stats.end()

  requestAnimationFrame(loop)
}

init()
