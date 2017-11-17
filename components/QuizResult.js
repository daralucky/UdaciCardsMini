import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
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
    const {
      currentDeck,
      quizNumber,
      score,
    } = this.props.navigation.state.params;

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
