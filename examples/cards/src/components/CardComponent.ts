import { Component } from '../../../../src/ecs'

export enum CardStatus {
  Hand,
  Deck,
  Field,
  Graveyard,
  Dust
}

export default class CardComponent extends Component {
  id: number
  status: CardStatus
  name: string
  cost: number
}
