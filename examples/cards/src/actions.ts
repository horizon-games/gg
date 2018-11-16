import { State } from './types'
import store from './store'

export const drawCard = (playerId: number) => {
  const playerState = store.getState().players[playerId]
  const { inDeck, inHand } = playerState
  const len = inDeck.length

  if (len > 0) {
    const idx = Math.floor(Math.random()) * len
    const card = inDeck[idx]
    inDeck.splice(idx, 1)
    inHand.push(card)
  }

  store.setState({
    players: {
      ...store.getState().players,
      [playerId]: { ...playerState }
    }
  })
}

export const playCard = (playerId: number, cardId: number) => {
  const playerState = store.getState().players[playerId]
  const { inHand, inPlay } = playerState
  const idx = inHand.findIndex(card => card.id === cardId)

  if (idx !== -1) {
    const card = inHand[idx]
    inHand.splice(idx, 1)
    inPlay.push(card)
  }

  store.setState({
    players: {
      ...store.getState().players,
      [playerId]: { ...playerState }
    }
  })
}

export const endTurn = () => {
  const state = store.getState()
  const { currentPlayerId } = state
  const nextPlayerId = currentPlayerId === 1 ? 2 : 1
  const nextPlayerState = state.players[nextPlayerId]

  const turnIndex = state.turnIndex + 1

  store.setState({
    turnIndex,
    currentPlayerId: nextPlayerId,
    players: {
      ...state.players,
      [nextPlayerId]: {
        ...nextPlayerState,
        mana: turnIndex,
        manaMax: turnIndex
      }
    }
  })
}
