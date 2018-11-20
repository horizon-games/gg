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
console.log(cards)

const updateCardEntity = (card: Card, status: CardStatus) => {
  if (!cards.has(card.id)) {
    const entity = world.createEntity(...CardAssemblage(card, status))
    cards.set(card.id, entity)
  } else {
    const entity = cards.get(card.id)
    if (entity) {
      entity.components.card!.status = status
    }
  }
}

const syncState = (state: State) => {
  state.players.forEach((player, playerId) => {
    player.inDeck.forEach(card => {
      updateCardEntity(card, CardStatus.Deck)
    })

    player.inHand.forEach(card => {
      updateCardEntity(card, CardStatus.Hand)
    })

    player.inPlay.forEach(card => {
      updateCardEntity(card, CardStatus.Field)
    })
  })
}

store.subscribe((state: State) => {
  console.log('State update', state)
  syncState(state)
})

window.onkeydown = (ev: any) => {
  const key = ev.keyCode
  const { currentPlayerId } = store.getState()

  switch (key) {
    case 68: // (d)rawCard
      console.log('drawCard')
      drawCard(1)

      break

    // case 80: // (p)layCard
    //   console.log('playCard')
    //   playCard(currentPlayerId, 0)
    //   break
  }
}

$('body').mousemove(ev => {
  const target = $(ev.target)
  const id = Number(target.data('id'))
  world.manager.entities.forEach(entity => {
    if (entity.hasComponent('hover')) {
      entity.setComponent('hover', { value: false })
    }
  })

  if (id) {
    const entity = world.manager.getEntity(id)
    if (entity && entity.hasComponent('hover')) {
      entity.setComponent('hover', { value: true })
    }
  }
})

$('body').click(ev => {
  const target = $(ev.target)
  const id = Number(target.data('id'))

  if (id) {
    const entity = world.manager.getEntity(id)
    if (entity && entity.hasComponent('hover')) {
      entity.setComponent('hover', { value: true })

      playCard(entity.components.player!.id, entity.components.card!.id)
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

const loop = () => {
  stats.begin()

  world.update(0)

  stats.end()

  requestAnimationFrame(loop)
}

init()
