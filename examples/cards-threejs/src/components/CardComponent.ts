import { Component } from '../../../../src'
import { CardType, CardStatus } from '../types'

export class CardComponent extends Component<{
  id: number
  type: CardType
  status: CardStatus
  name: string
  cost: number
}> {}
