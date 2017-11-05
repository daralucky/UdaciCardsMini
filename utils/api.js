import { AsyncStorage } from 'react-native';
import { DECK_STORAGE_KEY } from '../constants/index';

export function saveDeck({ key, deck }) {
  console.log(JSON.stringify(key, null, 2));
  console.log(JSON.stringify(deck, null, 2));

  return AsyncStorage.mergeItem(
    DECK_STORAGE_KEY,
    JSON.stringify({
      [key]: deck,
    })
  );
}

export async function getSingleDeck(key) {
  /*
  let data = await AsyncStorage.getItem(DECK_STORAGE_KEY).then(res => {
    //const data = JSON.parse(results);
    return JSON.parse(res);
    //console.log('data: ' + JSON.stringify(data, null, 2));
    //console.log('data[key]: ' + JSON.stringify(data[key], null, 2));
    //return data[key];
  });

  return data[key];
  */

  const value = await AsyncStorage.getItem(DECK_STORAGE_KEY);

  // We have data!!
  const data = JSON.parse(value);
  console.log('key: ' + key);
  console.log('data: ' + JSON.stringify(data, null, 2));
  console.log('data[key]: ' + JSON.stringify(data[key], null, 2));

  return data[key];

  //return value[key];
}

export function getAllDecks() {
  AsyncStorage.getItem(DECK_STORAGE_KEY).then(results => {
    if (results !== null) {
      console.log(results);
    }

    //return results;
  });
}

export function clearAll() {
  AsyncStorage.getAllKeys((err, keys) => {
    console.log(JSON.stringify(keys, null, 2));
    AsyncStorage.multiRemove(keys, err => {
      // keys  removed, if they existed
      // do most stuff after removal (if you want)
      console.log('ALL KEYS REMOVED');
    });
  });
}
