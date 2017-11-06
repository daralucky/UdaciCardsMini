import { GET_ALL_DECKS } from '../constants/ActionTypes';

function deck(state = [], action) {
  switch (action.type) {
    case GET_ALL_DECKS:
      const { decks } = action;
      return { ...state, ...decks };

    default:
      return state;
  }
}

export default deck;
