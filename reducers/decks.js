import {
  RECEIVE_DECKS,
  ADD_NEW_DECK,
  ADD_NEW_CARD,
} from '../constants/ActionTypes';

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

    case ADD_NEW_CARD:
      const currentDeck = state[action.payload.key];

      currentDeck.questions.push(action.payload.newCard);

      return {
        ...state,
        [action.payload.key]: currentDeck,
      };

    default:
      return state;
  }
}

export default decks;
