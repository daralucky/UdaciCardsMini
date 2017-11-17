import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import { addNewCard } from '../actions';
import myStyles from '../utils/styles';

class CardNew extends Component {
  static navigationOptions = () => {
    return {
      title: `Add Card`,
    };
  };

  state = { question: '', answer: '' };

  createCard(key) {
    // hide keyboard
    Keyboard.dismiss();

    this.props.addNewCard(key, this.state.question, this.state.answer);

    this.setState({ question: '' });
    this.setState({ answer: '' });

    this.toCurrentDeck();
  }

  toCurrentDeck = () => {
    this.props.navigation.navigate('DeckDetail', {
      currentDeck: this.props.navigation.state.params.currentDeck,
    });
  };

  render() {
    const { currentDeck } = this.props.navigation.state.params;
    // console.log('currentDeck:' + JSON.stringify(currentDeck, null, 2));
    return (
      <KeyboardAvoidingView behavior="padding" style={myStyles.container}>
        <TextInput
          value={this.state.question}
          onChangeText={text => this.setState({ question: text })}
          style={myStyles.input}
          placeholder="Question"
        />
        <TextInput
          value={this.state.answer}
          onChangeText={text => this.setState({ answer: text })}
          style={myStyles.input}
          placeholder="Answer"
        />
        <TouchableOpacity
          style={myStyles.btnWarning}
          onPress={() => this.createCard(currentDeck.key)}
        >
          <Text style={myStyles.btnText}>Submit</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

export default connect(null, { addNewCard })(CardNew);
