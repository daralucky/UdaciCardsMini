import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { getAllDecks, getSingleDeck } from '../utils/api';

class DeckDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params.currentDeck;

    return {
      title: `${title}`,
    };
  };

  handlePress = () => {
    //alert('Hello');
    this.toHome();
  };

  toHome = () => {
    this.props.navigation.dispatch(
      NavigationActions.back({ key: this.props.navigation.state.key })
    );
  };

  getSingle = () => {
    //const single = getSingleDeck('1509857756522');
    //console.log('single: ' + JSON.stringify(single, null, 2));
  };

  render() {
    const currentDeck = this.props.navigation.state.params.currentDeck;
    console.log('currentDeck:' + JSON.stringify(currentDeck, null, 2));

    return (
      <View style={styles.container}>
        <View style={styles.deckContainer}>
          <Text style={styles.deckTitle}>{currentDeck.title}</Text>
          <Text>{currentDeck.questions.length} cards</Text>
        </View>
        <View style={styles.btnGroup}>
          <TouchableOpacity onPress={this.handlePress}>
            <Text style={styles.btn}>Go Back</Text>
          </TouchableOpacity>
        </View>
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
  deckContainer: {
    flex: 3,
    marginLeft: 10,
    marginRight: 10,
    //backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnGroup: {
    flex: 1,
    paddingBottom: 20,
    alignItems: 'center',
    justifyContent: 'flex-end',
    //alignSelf: 'flex-end',
  },
  btn: {
    //flex: 1,
    backgroundColor: '#E53224',
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    //borderColor: '#000',
  },
  deckTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default DeckDetail;
