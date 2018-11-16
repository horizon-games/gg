import {
  PositionComponent,
  PlayerComponent,
  DOMComponent,
  CardComponent,
  ColorComponent
} from '../components'
import { CardStatus } from '../components/CardComponent'
import { Card } from '../types'

const CardAssemblage = (card: Card, status: CardStatus) => {
  return [
    new PositionComponent({ x: 0, y: 0 }),
    new PlayerComponent({ id: card.playerId }),
    new CardComponent({
      id: card.id,
      name: card.name,
      cost: card.cost,
      status
    }),
    new DOMComponent({ element: new HTMLDivElement() }),
    new ColorComponent({ r: 128, g: 128, b: 128, a: 1.0 })
  ]
}

export default CardAssemblage
