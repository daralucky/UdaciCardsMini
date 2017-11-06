import { RECEIVE_DECKS, ADD_NEW_DECK } from '../constants/ActionTypes';

function decks(state = [], action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      const { decks } = action;
      return { ...state, ...decks };

    case ADD_NEW_DECK:
      const { newDeck } = action.payload;
      // console.log('POST_ADD_NEW: ' + JSON.stringify(action.payload, null, 2))
      return {
        ...state,
        [newDeck.key]: newDeck.deck,
      };

    default:
      return state;
  }
}

export default decks;
