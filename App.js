import React from 'react';
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
import DeckDetail from './components/DeckDetail';

function UdaciStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

const Home = ({ navigation }) => {
  handlePress = () => {
    alert('Hello');
  };
  return (
    <View style={styles.container}>
      <Text>Home View</Text>

      <TouchableOpacity
        onPress={() => navigation.navigate('DeckDetail', { deckId: 12345 })}
      >
        <Text style={styles.btn}>To Deck Detail</Text>
      </TouchableOpacity>
    </View>
  );
};

const Dashboard = () => {
  return (
    <View style={styles.container}>
      <Text>Dashboard</Text>
    </View>
  );
};

const Tabs = TabNavigator(
  {
    Home: {
      screen: Home,
    },
    Dashboard: {
      screen: Dashboard,
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
});

export default class App extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <UdaciStatusBar backgroundColor={red} barStyle="light-content" />
        <MainNavigator />
      </View>
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
