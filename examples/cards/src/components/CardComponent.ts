import { Component } from '../../../../src/ecs'
import { CardType, CardStatus } from '../types'

export default class CardComponent extends Component {
  value: {
    id: number
    type: CardType
    status: CardStatus
    name: string
    cost: number
  }
}
