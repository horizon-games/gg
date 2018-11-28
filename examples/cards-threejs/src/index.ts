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

import {
  WebGLRenderer,
  PlaneGeometry,
  MeshBasicMaterial,
  Mesh,
  TextureLoader,
  RepeatWrapping,
  Vector2,
  DoubleSide,
  PCFSoftShadowMap,
  PointLight,
  MeshStandardMaterial,
  DirectionalLight,
  SpotLight
} from 'three'
import MouseSystem from './systems/MouseSystem'

const renderer = new WebGLRenderer({ antialias: true })
renderer.shadowMap.enabled = true
renderer.shadowMap.type = PCFSoftShadowMap

var light1 = new DirectionalLight(0xffffff, 0.7)
light1.position.set(0, 0, 5)
light1.castShadow = true
light1.shadow.mapSize.width = 2048
light1.shadow.mapSize.height = 2048

scene.add(light1)

var light2 = new PointLight(0xffffff, 0.3)
light2.position.set(0, 0, 5)
light2.castShadow = true
light2.shadow.mapSize.width = 2048
light2.shadow.mapSize.height = 2048
scene.add(light2)

const mouse = new Vector2()
let width = window.innerWidth
let height = window.innerHeight

const backgroundTexture = new TextureLoader().load('images/background.png')
backgroundTexture.wrapS = RepeatWrapping
backgroundTexture.wrapT = RepeatWrapping
backgroundTexture.repeat.set(10, 10)

var gameBoard = new Mesh(
  new PlaneGeometry(100, 100, 10),
  new MeshStandardMaterial({ map: backgroundTexture })
)
gameBoard.receiveShadow = true
gameBoard.position.set(0, 0, 0)
scene.add(gameBoard)

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
  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setSize(width, height)
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

let frame = 0
const loop = () => {
  stats.begin()
  frame++

  world.update(0)

  stats.end()
  cube.rotation.x += 0.01
  cube.rotation.y += 0.01
  cube.rotation.z += 0.01

  light2.position.set(
    Math.sin(frame / 100) * 20,
    Math.cos(frame / 100) * 20,
    10
  )
  renderer.render(scene, camera)
  requestAnimationFrame(loop)
}

setTimeout(init, 1000)
