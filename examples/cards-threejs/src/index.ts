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
  OpponentCardsArchetype,
  HoveredCardsArchetype
} from './archetypes'
import { Components } from './components'
import CardAssemblage from './assemblages/CardAssemblage'
import DeckSystem from './systems/DeckSystem'
import HandSystem from './systems/HandSystem'
import FieldSystem from './systems/FieldSystem'
import camera from './camera'
import scene from './scene'

import $ from 'jquery'

import {
  WebGLRenderer,
  PlaneGeometry,
  MeshBasicMaterial,
  Mesh,
  TextureLoader,
  RepeatWrapping,
  Vector2
} from 'three'
import MouseSystem from './systems/MouseSystem'

const renderer = new WebGLRenderer()

const mouse = new Vector2()
let width = window.innerWidth
let height = window.innerHeight

const texture = new TextureLoader().load('images/background.png')
texture.wrapS = RepeatWrapping
texture.wrapT = RepeatWrapping
texture.repeat.set(2, 2)

scene.background = texture

const stats = new Stats()

const world = new World<Components>()

world.addArchetype(RenderableArchetype)
world.addArchetype(CardsArchetype)
world.addArchetype(PlayerCardsArchetype)
world.addArchetype(HoveredCardsArchetype)
world.addArchetype(OpponentCardsArchetype)

world.addSystem(new DeckSystem())
world.addSystem(new HandSystem())
world.addSystem(new FieldSystem())
world.addSystem(new MouseSystem())
world.addSystem(new RenderSystem())

console.log(world)

const cards: Map<number, Entity<Components>> = new Map()

const updateCardEntity = (card: Card, status: CardStatus, index: number) => {
  if (!cards.has(card.id)) {
    const entity = world.createEntity(...CardAssemblage(card, status))
    entity.components.mesh!.userData.entityId = entity.id
    cards.set(card.id, entity)
    scene.add(entity.components.mesh!)
  } else {
    const entity = cards.get(card.id)
    if (entity) {
      entity.components.card!.status = status
      entity.components.order! = index
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

window.addEventListener('resize', function(ev) {
  width = window.innerWidth
  height = window.innerHeight
  console.log('hey')
  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setSize(width, height)
})

$('body').mousemove(function(ev) {
  mouse.x = (ev.clientX! / width) * 2 - 1
  mouse.y = (ev.clientY! / height) * 2 - 1

  // const target = $(ev.target).closest('.card')
  // const id = Number(target.data('id'))
  // world.manager.entities.forEach(entity => {
  //   if (entity.hasComponent('hover')) {
  //     entity.setComponent('hover', false)
  //   }
  // })

  // if (id) {
  //   const entity = world.manager.getEntity(id)
  //   if (entity && entity.hasComponent('hover')) {
  //     const { status } = entity.components.card!

  //     if (status !== CardStatus.Deck) {
  //       entity.setComponent('hover', true)
  //     }
  //   }
  // }
})

$('body').on('click', '.card', function(ev) {
  const target = $(ev.target).closest('.card')
  const id = Number(target.data('id'))

  if (id) {
    const entity = world.manager.getEntity(id)
    if (entity) {
      const { status } = entity.components.card!
      switch (status) {
        case CardStatus.Deck:
          drawCard(entity.components.player!.id)
          break

        case CardStatus.Hand:
          playCard(entity.components.player!.id, entity.components.card!.id)
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

const cube = new Mesh(
  new PlaneGeometry(1, 1, 1),
  new MeshBasicMaterial({ color: 0x00ff00 })
)

const init = () => {
  // Add Stats
  document.body.appendChild(stats.dom)

  // Add Renderer
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)

  scene.add(cube)

  camera.position.z = 5

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
  cube.rotation.x += 0.01
  cube.rotation.y += 0.01
  renderer.render(scene, camera)
  requestAnimationFrame(loop)
}

init()
