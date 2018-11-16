import Stats from 'stats.js'
import { World } from '../../../src/ecs'
import { createRenderingContext } from './RenderingContext'

import { Components } from './components'
import { BirdArchetype, Archetypes } from './archetypes'
import BirdAssemblage from './assemblages/BirdAssemblage'
import FlockingSystem from './systems/FlockingSystem'
import RenderSystem from './systems/RenderSystem'

const FLOCK_SIZE = Number(process.env.FLOCK_SIZE)

const stats = new Stats()

const world = new World<Components>()

// Archetypes
world.addArchetype(BirdArchetype)

// Systems
world.addSystems(new FlockingSystem(), new RenderSystem())

const init = () => {
  // Add Stats
  document.body.appendChild(stats.dom)

  const canvas = document.getElementById('flocking')! as HTMLCanvasElement

  createRenderingContext(canvas)

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  for (let i = 0; i < FLOCK_SIZE; i++) {
    world.createEntity(
      ...BirdAssemblage(window.innerWidth / 2, window.innerHeight / 2)
    )
  }

  // Start loop
  requestAnimationFrame(loop)
}

let loopIdx = 0

const loop = () => {
  stats.begin()

  world.update(loopIdx++)

  stats.end()

  requestAnimationFrame(loop)
}

document.addEventListener('DOMContentLoaded', init, false)
