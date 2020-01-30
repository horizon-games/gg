import Stats from 'stats.js'
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
import { World, Entity } from '../../../src/ecs'
import { State, CardStatus, Card } from './types'
import store from './store'
import { drawCard } from './actions'
import {
  RenderableArchetype,
  CardsArchetype,
  PlayerCardsArchetype,
  OpponentCardsArchetype,
  HoveredCardsArchetype,
  LightsArchetype,
  DraggableArchetype,
  DroppableArchetype
} from './archetypes'
import {
  Components,
  DroppableComponent,
  MeshComponent,
  PositionComponent,
  RotationComponent
} from './components'
import createCardAssemblage from './assemblages/CardAssemblage'
import DeckSystem from './systems/DeckSystem'
import HandSystem from './systems/HandSystem'
import FieldSystem from './systems/FieldSystem'
import LightsSystem from './systems/LightsSystem'
import MouseSystem from './systems/MouseSystem'
import RenderSystem from './systems/RenderSystem'
import DragDropSystem from './systems/DragDropSystem'
import screen from './screen'
import camera from './camera'
import scene from './scene'
import LightAssemblage from './assemblages/LightAssemblage'

// @ts-ignore
import backgroundImage from './images/background.png'

const world = new World<Components>()
console.log(world)

world.addArchetype(RenderableArchetype)
world.addArchetype(CardsArchetype)
world.addArchetype(PlayerCardsArchetype)
world.addArchetype(HoveredCardsArchetype)
world.addArchetype(OpponentCardsArchetype)
world.addArchetype(LightsArchetype)
world.addArchetype(DraggableArchetype)
world.addArchetype(DroppableArchetype)

world.addSystem(new DeckSystem())
world.addSystem(new HandSystem())
world.addSystem(new FieldSystem())
world.addSystem(new MouseSystem())
world.addSystem(new DragDropSystem())
world.addSystem(new LightsSystem())
world.addSystem(new RenderSystem())

const renderer = new WebGLRenderer({ antialias: true })
renderer.shadowMap.enabled = true
renderer.shadowMap.type = PCFSoftShadowMap

const backgroundTexture = new TextureLoader().load(backgroundImage)
backgroundTexture.wrapS = RepeatWrapping
backgroundTexture.wrapT = RepeatWrapping
backgroundTexture.repeat.set(10, 10)

const gameBoard = new Mesh(
  new PlaneGeometry(100, 100, 10),
  new MeshStandardMaterial({ map: backgroundTexture })
)
gameBoard.receiveShadow = true
gameBoard.position.set(0, 0, 0)
scene.add(gameBoard)

// LIGHTS
const light1 = new SpotLight(0xffffff, 1)
light1.position.set(0, 0, 5)
light1.castShadow = true
light1.shadow.mapSize.width = 2048
light1.shadow.mapSize.height = 2048

scene.add(light1)

// Light entities
world.createEntity(LightAssemblage(0xaa00ff, 0.3))
world.createEntity(LightAssemblage(0x00ffaa, 0.3))

// Droppable Zones
world.createEntity([
  new DroppableComponent({ receives: ['card'] }),
  new MeshComponent(
    new Mesh(new PlaneGeometry(8, 3), new MeshBasicMaterial({ visible: false }))
  ),
  new PositionComponent({ x: 0, y: 0, z: 0.1 }),
  new RotationComponent({ x: 0, y: 0, z: 0 })
])

// Lookup for added cards
const cards: Map<number, Entity<Components>> = new Map()

const updateCardEntity = (card: Card, status: CardStatus, index: number) => {
  if (!cards.has(card.id)) {
    const entity = world.createEntity(createCardAssemblage(card, status))
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
  syncState(state)
})

window.onkeydown = (ev: any) => {
  const key = ev.keyCode

  switch (key) {
    case 68: // (d)rawCard
      drawCard(1)

      break
  }
}

window.addEventListener('resize', ev => {
  const { width, height } = screen
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

const init = () => {
  // Add Stats
  document.body.appendChild(stats.dom)

  // Add Renderer
  renderer.setSize(screen.width, screen.height)
  document.body.appendChild(renderer.domElement)

  syncState(store.getState())

  // Start loop
  requestAnimationFrame(loop)

  // Draw cards for initial player hands
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

const stats = new Stats()

let frame = 0
const loop = () => {
  stats.begin()
  frame++

  world.update(0, frame)

  renderer.render(scene, camera)

  stats.end()

  requestAnimationFrame(loop)
}

setTimeout(init, 1000)
