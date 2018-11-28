import {
  PositionComponent,
  PlayerComponent,
  DomComponent,
  CardComponent,
  ColorComponent,
  WidthComponent,
  HeightComponent,
  BoxShadowComponent,
  BorderRadiusComponent,
  RotationComponent,
  HoverComponent,
  MaterialComponent,
  OrderComponent,
  MeshComponent,
  TextureComponent
} from '../components'
import { Card, CardStatus } from '../types'
import $ from 'jquery'
import {
  TextureLoader,
  MeshBasicMaterial,
  Mesh,
  PlaneGeometry,
  DoubleSide,
  Group,
  MeshStandardMaterial
} from 'three'
import { degreesToRadians } from '../utils'
import scene from '../scene'
//@ts-ignore
import GLTFLoader from 'three-gltf-loader'

const loader = new GLTFLoader()
const backTexture = new TextureLoader().load(`images/back.jpg`)
const backMaterial = new MeshStandardMaterial({
  map: backTexture,
  side: DoubleSide
})

backTexture.repeat.x = 3.9
backTexture.repeat.y = 2.76
backTexture.offset.x = -2.82
//backTexture.offset.x = (300 / 100) * 0.8

let group: any
let face: any
let back: any

loader.load(
  // resource URL
  'models/card-lauren1.glb',
  // called when the resource is loaded
  function(gltf: any) {
    group = gltf.scene.children[0]
    group.scale.set(0.2, 0.2, 0.2)
    console.log('mesh', group)
    back = group.children[1] as Mesh
    group.children[2].material = new MeshStandardMaterial({ color: 0xffffff })
    back.material = backMaterial
    // mesh.rotation.z = Math.PI / 2
    // mesh.rotation.y = Math.PI / 2
    // scene.add(group)
  },
  // called while loading is progressing
  function(xhr: any) {
    console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
  },
  // called when loading has errors
  function(error: any) {
    console.log('An error happened')
  }
)

const CardAssemblage = (card: Card, status: CardStatus) => {
  const element = $('<div/>').get(0)
  const isPlayer = card.playerId === 1

  const texture = new TextureLoader().load(`images/${card.artId}.jpg`)
  const material = new MeshStandardMaterial({ map: texture, side: DoubleSide })

  const object3d = group.clone()
  object3d.children[0].material = material
  object3d.castShadow = true
  object3d.receiveShadow = true

  return [
    new CardComponent({
      id: card.id,
      cardType: card.type,
      name: card.name,
      cost: card.cost,
      status
    }),
    new TextureComponent(texture),
    new MaterialComponent(material),
    new MeshComponent(object3d),
    new PlayerComponent({ id: card.playerId }),
    new WidthComponent(125),
    new HeightComponent(175),
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
    })
  ]
}

export default CardAssemblage
