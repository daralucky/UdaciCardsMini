import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { getAllDecks, getSingleDeck } from '../utils/api';
import CardNew from './CardNew';
import myStyles from '../utils/styles';

class QuizResult extends Component {
  static navigationOptions = ({ navigation }) => {
    //const { title } = navigation.state.params.currentDeck;

    return {
      title: `Quiz Result`,
    };
  };

  render() {
    const currentDeck = this.props.navigation.state.params.currentDeck;
    //console.log('currentDeck:' + JSON.stringify(currentDeck, null, 2));

    return (
      <View style={myStyles.container}>
        <View style={myStyles.deckContainer}>
          <Text style={myStyles.deckTitle}>Your Score: 99% correct.</Text>
        </View>
        <View style={myStyles.btnGroup}>
          <TouchableOpacity
            style={myStyles.btnWarning}
            onPress={() =>
              this.props.navigation.navigate('Quiz', {
                currentDeck,
              })}
          >
            <Text style={myStyles.btnText}>Restart Quiz</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={myStyles.btnSuccess}
            onPress={() =>
              this.props.navigation.navigate('DeckDetail', {
                currentDeck,
              })}
          >
            <Text style={myStyles.btnText}>Back to Deck</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default QuizResult;
