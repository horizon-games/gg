import createStore, { Store } from 'unistore'

const enum CardTypes {
  Unit,
  Spell
}

interface Card {
  id: number
  type: CardTypes
  name: string
  cost: number
}

interface State {
  inDeck: Card[]
  inHand: Card[]
  inPlay: Card[]
}

const state: State = {
  inDeck: [
    { id: 1, type: CardTypes.Unit, name: 'A', cost: 1 },
    { id: 2, type: CardTypes.Unit, name: 'B', cost: 2 },
    { id: 3, type: CardTypes.Unit, name: 'C', cost: 3 },
    { id: 4, type: CardTypes.Unit, name: 'D', cost: 4 },
    { id: 5, type: CardTypes.Unit, name: 'E', cost: 5 },
    { id: 6, type: CardTypes.Spell, name: 'F', cost: 1 },
    { id: 7, type: CardTypes.Spell, name: 'G', cost: 2 },
    { id: 8, type: CardTypes.Spell, name: 'H', cost: 3 },
    { id: 9, type: CardTypes.Spell, name: 'I', cost: 4 }
  ],
  inHand: [],
  inPlay: []
}

const store = createStore(state)

const actions = {
  drawCard() {
    const { inDeck, inHand } = store.getState()
    const len = inDeck.length

    if (len > 0) {
      const idx = Math.floor(Math.random()) * len
      const card = inDeck[idx]
      inDeck.splice(idx, 1)
      inHand.push(card)
    }

    store.setState({ inDeck, inHand })
  },

  playCard() {
    const { inHand, inPlay } = store.getState()
    const len = inHand.length

    if (len > 0) {
      const idx = Math.floor(Math.random()) * len
      const card = inHand[idx]
      inHand.splice(idx, 1)
      inPlay.push(card)
    }

    store.setState({ inHand, inPlay })
  }
}

store.subscribe((state: State) => {
  console.log('State update', state)
})

window.onkeydown = (ev: any) => {
  const key = ev.keyCode

  switch (key) {
    case 68: // (d)rawCard
      console.log('drawCard')
      actions.drawCard()
      break

    case 80: // (p)layCard
      console.log('playCard')
      actions.playCard()
      break
  }
}
