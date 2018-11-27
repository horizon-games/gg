export enum CardType {
  Unit = 'unit',
  Spell = 'spell'
}

export enum CardStatus {
  Hand,
  Deck,
  Field,
  Graveyard,
  Dust
}

export interface Card {
  id: number
  type: CardType
  name: string
  cost: number
  playerId: number
  artId: number
}

export interface State {
  players: PlayerState[]
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
