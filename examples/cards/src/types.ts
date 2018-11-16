export const enum CardTypes {
  Unit,
  Spell
}

export interface Card {
  id: number
  type: CardTypes
  name: string
  cost: number
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
