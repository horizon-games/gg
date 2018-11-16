import createStore, { Store } from 'unistore'
import { State, PlayerState, CardTypes } from './types'

//@ts-ignore
import sillyname from 'sillyname'

let cardIdx = 0
const getCardId = () => {
  return ++cardIdx
}

const getCardType = (): CardTypes => {
  const types = [CardTypes.Unit, CardTypes.Spell]

  return types[Math.floor(Math.random() * types.length)]
}

const getCard = (playerId: number) => ({
  id: getCardId(),
  playerId,
  type: getCardType(),
  name: sillyname(),
  cost: Math.floor(Math.random() * 10)
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
  players: {
    1: getPlayerState(1),
    2: getPlayerState(2)
  },
  currentPlayerId: 1,
  turnIndex: 0
}

const store = createStore(state)

export default store
