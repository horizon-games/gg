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
  OrderComponent
} from '../components'
import { Card, CardStatus } from '../types'
import $ from 'jquery'

// @ts-ignore
import images from '../images/*.jpg'

const CardAssemblage = (card: Card, status: CardStatus) => {
  const element = $('<div/>').get(0)
  const isPlayer = card.playerId === 1

  return [
    new CardComponent({
      id: card.id,
      cardType: card.type,
      name: card.name,
      cost: card.cost,
      status
    }),
    new MaterialComponent({
      imageSrc: images[card.artId]
    }),
    new PlayerComponent({ id: card.playerId }),
    new WidthComponent(125),
    new HeightComponent(175),
    new HoverComponent(false),
    new OrderComponent(0),
    new PositionComponent({
      x: 0,
      y: 0,
      z: 0
    }),
    new RotationComponent({
      x: 0,
      y: 180,
      z: Math.random() * 4 - 2 + 180
    }),
    new DomComponent({ className: 'card', element }),
    new BoxShadowComponent({
      hOffset: 0,
      vOffset: 2,
      blur: 6,
      spread: 2,
      color: new ColorComponent({ r: 0, g: 0, b: 0, a: 0.3 }).value
    }),
    new BorderRadiusComponent(6)
  ]
}

export default CardAssemblage
