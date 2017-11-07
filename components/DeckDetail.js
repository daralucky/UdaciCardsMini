import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { getAllDecks, getSingleDeck } from '../utils/api';
import CardNew from './CardNew';

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
          <TouchableOpacity
            style={styles.btnWarning}
            onPress={() =>
              this.props.navigation.navigate('CardNew', {
                currentDeck,
              })}
          >
            <Text style={styles.btnText}> Add Card</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnSuccess}
            onPress={this.handlePress}
          >
            <Text style={styles.btnText}>Start Quiz</Text>
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
    flex: 5,
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
  btnPrimary: {
    backgroundColor: '#337ab7',
    borderColor: '#2e6da4',
    width: 150,
    margin: 5,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  btnSuccess: {
    backgroundColor: '#5cb85c',
    borderColor: '#4cae4c',
    width: 150,
    margin: 5,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  btnWarning: {
    backgroundColor: '#f0ad4e',
    borderColor: '#eea236',
    width: 150,
    margin: 5,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  btnDanger: {
    backgroundColor: '#d9534f',
    borderColor: '#d43f3a',
    width: 150,
    margin: 5,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  btnText: {
    color: '#fff',
  },
  deckTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default DeckDetail;
