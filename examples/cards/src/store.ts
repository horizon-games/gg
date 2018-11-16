import createStore, { Store } from 'unistore'
import { State, PlayerState, CardTypes } from './types'

//@ts-ignore
import sillyname from 'sillyname'

let cardIdx = 0
const getCardId = () => {
  return ++cardIdx
}

const getPlayerState = (): PlayerState => ({
  inDeck: [
    { id: getCardId(), type: CardTypes.Unit, name: sillyname(), cost: 1 },
    { id: getCardId(), type: CardTypes.Unit, name: sillyname(), cost: 2 },
    { id: getCardId(), type: CardTypes.Unit, name: sillyname(), cost: 3 },
    { id: getCardId(), type: CardTypes.Unit, name: sillyname(), cost: 4 },
    { id: getCardId(), type: CardTypes.Unit, name: sillyname(), cost: 5 },
    { id: getCardId(), type: CardTypes.Spell, name: sillyname(), cost: 1 },
    { id: getCardId(), type: CardTypes.Spell, name: sillyname(), cost: 2 },
    { id: getCardId(), type: CardTypes.Spell, name: sillyname(), cost: 3 },
    { id: getCardId(), type: CardTypes.Spell, name: sillyname(), cost: 4 }
  ],
  inHand: [],
  inPlay: [],
  mana: 1,
  manaMax: 1
})

const state: State = {
  players: {
    1: getPlayerState(),
    2: getPlayerState()
  },
  currentPlayerId: 1,
  turnIndex: 0
}

const store = createStore(state)

export default store
