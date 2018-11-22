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
  MaterialComponent
} from '../components'
import { Card, CardStatus } from '../types'
import $ from 'jquery'

const CardAssemblage = (card: Card, status: CardStatus) => {
  const element = $('<div/>').get(0)

  return [
    new CardComponent({
      id: card.id,
      cardType: card.type,
      name: card.name,
      cost: card.cost,
      status
    }),
    new MaterialComponent({
      imageSrc: `${card.artId}.jpg`
    }),
    new PlayerComponent({ id: card.playerId }),
    new WidthComponent(125),
    new HeightComponent(175),
    new HoverComponent(false),
    new PositionComponent({
      x: 0,
      y: 0
    }),
    new RotationComponent(0),
    new DomComponent({ element }),
    new ColorComponent({
      r: card.playerId === 0 ? 255 : 100,
      g: 100,
      b: card.playerId === 0 ? 100 : 255,
      a: 1
    }),
    new BoxShadowComponent({
      hOffset: 0,
      vOffset: 2,
      blur: 6,
      spread: 2,
      color: new ColorComponent({ r: 0, g: 0, b: 0, a: 0.5 }).value
    }),
    new BorderRadiusComponent(6)
  ]
}

export default CardAssemblage
