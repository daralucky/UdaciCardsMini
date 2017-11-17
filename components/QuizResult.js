import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { getAllDecks, getSingleDeck } from '../utils/api';
import CardNew from './CardNew';
import myStyles from '../utils/styles';
import { clearLocalNotification, setLocalNotification } from '../utils/helpers';

class QuizResult extends Component {
  static navigationOptions = () => {
    // const { title } = navigation.state.params.currentDeck;

    return {
      title: `Quiz Result`,
    };
  };

  // now that user have finish the quiz let's clear notification
  componentDidMount() {
    clearLocalNotification().then(setLocalNotification());
  }

  render() {
    const currentDeck = this.props.navigation.state.params.currentDeck;
    const quizNumber = this.props.navigation.state.params.quizNumber;
    const score = this.props.navigation.state.params.score;

    const scoreFormat = Math.ceil(score * 100 / quizNumber);

    return (
      <View style={myStyles.container}>
        <View style={myStyles.deckContainer}>
          <Text style={myStyles.deckTitle}>
            Your got {scoreFormat} % correct answers.
          </Text>
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
