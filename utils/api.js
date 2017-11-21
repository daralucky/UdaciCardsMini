import { AsyncStorage } from 'react-native';
import { DECK_STORAGE_KEY } from '../constants/index';

export function getAllDecksFromStorage() {
  return AsyncStorage.getItem(DECK_STORAGE_KEY).then(res => JSON.parse(res));
}

export function saveDeckToStorage({ key, deck }) {
  // console.log(JSON.stringify(key, null, 2));
  // console.log(JSON.stringify(deck, null, 2));

  return AsyncStorage.mergeItem(
    DECK_STORAGE_KEY,
    JSON.stringify({
      [key]: deck,
    })
  );
}

export function addCardToStorage({ key, newCard }) {
  // console.log(JSON.stringify(key, null, 2));
  // console.log(JSON.stringify(newCard, null, 2));

  return AsyncStorage.getItem(DECK_STORAGE_KEY).then(results => {
    const data = JSON.parse(results);
    data[key].questions.push(newCard);
    AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data));
  });
}
