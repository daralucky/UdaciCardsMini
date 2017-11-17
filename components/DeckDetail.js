import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import myStyles from '../utils/styles';

class DeckDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params.currentDeck;

    return {
      title: `${title}`,
    };
  };

  render() {
    const { currentDeck } = this.props.navigation.state.params;
    // console.log('currentDeck:' + JSON.stringify(currentDeck, null, 2));

    return (
      <View style={myStyles.container}>
        <View style={myStyles.deckContainer}>
          <Text style={myStyles.deckTitle}>{currentDeck.title}</Text>
          <Text>{currentDeck.questions.length} cards</Text>
        </View>
        <View style={myStyles.btnGroup}>
          <TouchableOpacity
            style={myStyles.btnWarning}
            onPress={() =>
              this.props.navigation.navigate('CardNew', {
                currentDeck,
              })}
          >
            <Text style={myStyles.btnText}> Add Card</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={myStyles.btnSuccess}
            onPress={() =>
              this.props.navigation.navigate('Quiz', {
                currentDeck,
              })}
          >
            <Text style={myStyles.btnText}>Start Quiz</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={myStyles.btnDanger}
            onPress={() =>
              this.props.navigation.navigate('Home', {
                currentDeck,
              })}
          >
            <Text style={myStyles.btnText}>Back to Deck List</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default DeckDetail;
