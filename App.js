import React from 'react';
import { Provider } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { purple, white, red } from './utils/colors';
import { Constants } from 'expo';
import DeckList from './components/DeckList';
import DeckNew from './components/DeckNew';
import DeckDetail from './components/DeckDetail';
import CardNew from './components/CardNew';
import configureStore from './store/configureStore';

function UdaciStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

const Tabs = TabNavigator(
  {
    Home: {
      screen: DeckList,
      navigationOptions: {
        tabBarLabel: 'DECKS',
      },
    },
    NewDeck: {
      screen: DeckNew,
      navigationOptions: {
        tabBarLabel: 'NEW DECK',
      },
    },
  },
  {
    navigationOptions: {
      header: null,
    },
  }
);

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },
  DeckDetail: {
    screen: DeckDetail,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      },
    },
  },
  CardNew: {
    screen: CardNew,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: '#f0ad4e',
      },
    },
  },
});

const store = configureStore();

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <UdaciStatusBar backgroundColor={red} barStyle="light-content" />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    //backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    backgroundColor: '#E53224',
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    //borderColor: '#000',
  },
  btnText: {
    color: '#000',
  },
});
