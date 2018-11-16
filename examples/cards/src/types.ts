export enum CardTypes {
  Unit = 'unit',
  Spell = 'spell'
}

export interface Card {
  id: number
  type: CardTypes
  name: string
  cost: number
  playerId: number
}

export interface State {
  players: Record<number, PlayerState>
  currentPlayerId: number
  turnIndex: number
}

export interface PlayerState {
  mana: number
  manaMax: number
  inDeck: Card[]
  inHand: Card[]
  inPlay: Card[]
}
