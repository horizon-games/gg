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
import {
  TextureLoader,
  Mesh,
  MeshStandardMaterial,
  MeshBasicMaterial
} from 'three'
import { degreesToRadians } from '../utils'
import scene from '../scene'
//@ts-ignore
import GLTFLoader from 'three-gltf-loader'

const backTexture = new TextureLoader().load(`images/back.jpg`)
const backMaterial = new MeshStandardMaterial({
  map: backTexture
})

// backTexture.repeat.x = 3.9
// backTexture.repeat.y = 2.76
// backTexture.offset.x = -2.82
// backTexture.offset.x = (300 / 100) * 0.8

const loader = new GLTFLoader()
let group: any

loader.load('models/card.glb', function(gltf: any) {
  console.log(gltf)
  group = gltf.scene.children[0]
  group.scale.set(0.2, 0.2, 0.2)
  const [face, trim, back] = group.children
  trim.material = new MeshStandardMaterial({ color: 0xffffff })
  back.material = backMaterial
  group.traverse(function(obj: Mesh) {
    obj.receiveShadow = true
    obj.castShadow = true
  })
})

const CardAssemblage = (card: Card, status: CardStatus) => {
  const isPlayer = card.playerId === 1

  const texture = new TextureLoader().load(`images/${card.artId}.jpg`)
  const material = new MeshBasicMaterial({ map: texture })

  const object3d = group.clone()
  object3d.children[0].material = material
  scene.add(object3d)

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
