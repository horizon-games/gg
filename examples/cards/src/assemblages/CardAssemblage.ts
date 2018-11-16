import {
  PositionComponent,
  PlayerComponent,
  DomComponent,
  CardComponent,
  ColorComponent,
  WidthComponent,
  HeightComponent,
  BoxShadowComponent,
  BorderRadiusComponent
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
    new PlayerComponent({ id: card.playerId }),
    new WidthComponent({ value: 160 }),
    new HeightComponent({ value: 240 }),
    new PositionComponent({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight
    }),
    new DomComponent({ element }),
    new ColorComponent({
      r: card.playerId === 0 ? 255 : 0,
      g: 0,
      b: card.playerId === 0 ? 0 : 255,
      a: 0.5
    }),
    new BoxShadowComponent({
      hOffset: 0,
      vOffset: 2,
      blur: 6,
      spread: 1,
      color: new ColorComponent({ r: 0, g: 0, b: 0, a: 0.1 })
    }),
    new BorderRadiusComponent({ value: 6 })
  ]
}

export default CardAssemblage
