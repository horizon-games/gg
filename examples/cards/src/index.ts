import Stats from 'stats.js'
import { State } from './types'
import store from './store'
import { drawCard, playCard } from './actions'
import { World } from '../../../src/ecs'

const stats = new Stats()

const world = new World()

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
  // Start loop
  requestAnimationFrame(loop)
}

const loop = () => {
  stats.begin()

  world.update(0)

  stats.end()

  requestAnimationFrame(loop)
}
