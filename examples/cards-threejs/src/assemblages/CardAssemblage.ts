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
  DoubleSide
} from 'three'
import { degreesToRadians } from '../utils'

const CardAssemblage = (card: Card, status: CardStatus) => {
  const element = $('<div/>').get(0)
  const isPlayer = card.playerId === 1

  const texture = new TextureLoader().load(`images/${card.artId}.jpg`)
  const material = new MeshBasicMaterial({ map: texture, side: DoubleSide })
  const mesh = new Mesh(new PlaneGeometry(0.635, 0.889), material)

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
    new MeshComponent(mesh),
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
