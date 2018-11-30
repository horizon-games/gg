import createStore, { Store } from 'unistore'
import { State, PlayerState, CardType } from './types'

// @ts-ignore
import sillyname from 'sillyname'

let cardIdx = 0
const getCardId = () => {
  return ++cardIdx
}

const getCardType = (): CardType => {
  const types = [CardType.Unit, CardType.Spell]

  return types[Math.floor(Math.random() * types.length)]
}

const getCard = (playerId: number) => ({
  id: getCardId(),
  playerId,
  type: getCardType(),
  name: sillyname(),
  cost: Math.ceil(Math.random() * 9),
  artId: Math.ceil(Math.random() * 32)
})

const getPlayerState = (playerId: number): PlayerState => ({
  inDeck: [
    getCard(playerId),
    getCard(playerId),
    getCard(playerId),
    getCard(playerId),
    getCard(playerId),
    getCard(playerId),
    getCard(playerId),
    getCard(playerId),
    getCard(playerId),
    getCard(playerId),
    getCard(playerId),
    getCard(playerId),
    getCard(playerId),
    getCard(playerId),
    getCard(playerId),
    getCard(playerId),
    getCard(playerId),
    getCard(playerId),
    getCard(playerId),
    getCard(playerId)
  ],
  inHand: [],
  inPlay: [],
  mana: 1,
  manaMax: 1
})

const state: State = {
  players: [getPlayerState(0), getPlayerState(1)],
  currentPlayerId: 1,
  turnIndex: 0
}

const store = createStore(state)

export default store
