import * as ActionTypes from '../constants/ActionTypes';
import { DECK_STORAGE_KEY } from '../constants/index';

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

export const fetchDeckFromStorage = async => dispatch => {
    try {
        const value = await AsyncStorage.getItem(DECK_STORAGE_KEY);
        if (value !== null){
            // We have data!!
            //console.log(value);

           // call to action
            dispatch(getAllDecks(JSON.parse(value)));

        }
      } catch (error) {
        console.log('ERROR: FAILED TO GET CONTENT FROM STORAGE.');
      }

};
