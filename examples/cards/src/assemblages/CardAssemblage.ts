import {
  PositionComponent,
  PlayerComponent,
  DOMComponent,
  CardComponent,
  ColorComponent,
  WidthComponent,
  HeightComponent,
  BoxShadowComponent
} from '../components'
import { Card, CardStatus } from '../types'
import $ from 'jquery'

const CardAssemblage = (card: Card, status: CardStatus) => {
  const element = $('<div/>').get(0)

  return [
    new CardComponent({
      id: card.id,
      type: card.type,
      name: card.name,
      cost: card.cost,
      status
    }),
    new PlayerComponent({ id: card.playerId }),
    new WidthComponent({ value: 160 }),
    new HeightComponent({ value: 320 }),
    new PositionComponent({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight
    }),
    new DOMComponent({ element }),
    new ColorComponent({
      r: card.playerId === 0 ? 255 : 0,
      g: 64,
      b: card.playerId === 0 ? 0 : 255,
      a: 1.0
    }),
    new BoxShadowComponent({
      hOffset: 0,
      vOffset: 2,
      blur: 6,
      spread: 1,
      color: new ColorComponent({ r: 0, g: 0, b: 0, a: 0.1 })
    })
  ]
}

export default CardAssemblage
