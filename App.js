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
import * as Color from './utils/colors';
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

const MainNavigator = StackNavigator(
  {
    Home: {
      screen: Tabs,
    },
    DeckDetail: {
      screen: DeckDetail,
      navigationOptions: {
        headerTintColor: Color.white,
        headerStyle: {
          backgroundColor: Color.purple,
        },
      },
    },
    CardNew: {
      screen: CardNew,
      navigationOptions: {
        headerTintColor: Color.white,
        headerStyle: {
          backgroundColor: Color.warningColor,
        },
      },
    },
  },
  {
    headerMode: 'screen',
  }
);

const store = configureStore();

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <UdaciStatusBar
            backgroundColor={Color.red}
            barStyle="light-content"
          />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}
