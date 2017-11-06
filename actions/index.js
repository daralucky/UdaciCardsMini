import * as ActionTypes from '../constants/ActionTypes';
import { DECK_STORAGE_KEY } from '../constants/index';
import { AsyncStorage } from 'react-native';

export const addNewDeck = deck => {
  return {
    type: ActionTypes.ADD_DECK,
    payload: {
      deck,
    },
  };
};

export const getAllDecks = decks => {
  return {
    type: ActionTypes.GET_ALL_DECKS,
    decks,
  };
};

//function ()

const fetchDeckFromStorage = (res, dispatch) => {
  dispatch(getAllDecks(res));
};

export const myFirstFetch = () => dispatch => {
  AsyncStorage.getItem(DECK_STORAGE_KEY).then(results => {
    //if (results !== null) {
    console.log(
      'myFirstFetch: ' + JSON.stringify(JSON.parse(results), null, 2)
    );
    dispatch(getAllDecks(JSON.parse(results)));
    //}
  });

  //dispatch(getAllDecks({ hello: 'World' }));
};
