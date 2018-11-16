import Stats from 'stats.js'
import { State, CardStatus } from './types'
import store from './store'
import { drawCard, playCard } from './actions'
import { World, Archetype } from '../../../src/ecs'
import RenderSystem from './systems/RenderSystem'
import { RenderableArchetype, Archetypes, CardsArchetype } from './archetypes'
import { Components } from './components'
import CardAssemblage from './assemblages/CardAssemblage'
import DeckSystem from './systems/DeckSystem'

const stats = new Stats()

const world = new World<Components>()

world.addArchetype(RenderableArchetype)
world.addArchetype(CardsArchetype)

world.addSystem(new RenderSystem())
world.addSystem(new DeckSystem())

store.subscribe((state: State) => {
  console.log('State update', state)

  state.players.forEach((player, playerId) => {
    player.inDeck.forEach(card => {
      world.createEntity(...CardAssemblage(card, CardStatus.Deck))
    })
  })
})

window.onkeydown = (ev: any) => {
  const key = ev.keyCode
  const { currentPlayerId } = store.getState()

  switch (key) {
    case 68: // (d)rawCard
      console.log('drawCard')
      drawCard(currentPlayerId)
      break

    case 80: // (p)layCard
      console.log('playCard')
      playCard(currentPlayerId, 0)
      break
  }
}

const init = () => {
  // Add Stats
  document.body.appendChild(stats.dom)

  drawCard(0)
  drawCard(0)
  drawCard(0)

  drawCard(1)
  drawCard(1)
  drawCard(1)

  // Start loop
  requestAnimationFrame(loop)
}

const loop = () => {
  stats.begin()

  world.update(0)

  stats.end()

  requestAnimationFrame(loop)
}

init()
