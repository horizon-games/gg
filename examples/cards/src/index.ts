import Stats from 'stats.js'
import { State } from './types'
import store from './store'
import { drawCard, playCard } from './actions'
import { World } from '../../../src/ecs'
import RenderSystem from './systems/RenderSystem'
const stats = new Stats()

const world = new World()

world.addSystem(new RenderSystem())

store.subscribe((state: State) => {
  console.log('State update', state)
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
  drawCard(1)
  drawCard(1)
  drawCard(1)

  drawCard(2)
  drawCard(2)
  drawCard(2)

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
