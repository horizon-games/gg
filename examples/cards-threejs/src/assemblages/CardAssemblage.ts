import {
  PositionComponent,
  PlayerComponent,
  CardComponent,
  RotationComponent,
  MaterialComponent,
  OrderComponent,
  MeshComponent,
  TextureComponent,
  DraggableComponent,
  DroppableComponent
} from '../components'
import { Card, CardStatus } from '../types'
import {
  TextureLoader,
  Mesh,
  MeshStandardMaterial,
  MeshPhysicalMaterial
} from 'three'
import { degreesToRadians } from '../utils'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
// @ts-ignore
import cardModel from '../models/card.glb'
// @ts-ignore
import images from '../images/*.jpg'

const backTexture = new TextureLoader().load(images.back)
const backMaterial = new MeshStandardMaterial({
  map: backTexture
})

const loader = new GLTFLoader()
let group: any

loader.load(cardModel, (gltf: any) => {
  console.log('gltf', gltf)
  group = gltf.scene.children[0]
  group.scale.set(0.2, 0.2, 0.2)
  const [face, trim, back] = group.children
  trim.material = new MeshStandardMaterial({ color: 0xffffff })
  back.material = backMaterial
  group.traverse((obj: Mesh) => {
    obj.receiveShadow = true
    obj.castShadow = true
  })
})

const createCardAssemblage = (card: Card, status: CardStatus) => {
  const isPlayer = card.playerId === 1

  const texture = new TextureLoader().load(images[card.artId])
  const material = new MeshPhysicalMaterial({ map: texture })
  material.reflectivity = 0
  material.metalness = 0
  const object3d = group.clone()
  object3d.children[0].material = material

  return [
    new CardComponent({
      id: card.id,
      type: card.type,
      name: card.name,
      cost: card.cost,
      status
    }),
    new TextureComponent(texture),
    new MaterialComponent(material),
    new MeshComponent(object3d),
    new PlayerComponent({ id: card.playerId }),
    new OrderComponent(0),
    new PositionComponent({
      x: 0,
      y: 0,
      z: 0
    }),
    new RotationComponent({
      x: 0,
      y: degreesToRadians(180),
      z: degreesToRadians(Math.random() * 4 - 2 + 180)
    }),
    new DraggableComponent({ type: 'card' }),
    new DroppableComponent({ receives: ['target'] })
  ]
}

export default createCardAssemblage
