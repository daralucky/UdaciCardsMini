import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addNewDeck } from '../actions';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import myStyles from '../utils/styles';

class CardNew extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: `Add Card`,
    };
  };

  state = { question: '', answer: '' };

  createDeck() {
    this.props.addNewDeck(this.state.title);
    this.setState({ title: '' });
    this.toHome();
  }

  toHome = () => {
    this.props.navigation.dispatch(
      NavigationActions.back({ key: this.props.navigation.state.key })
    );
  };

  render() {
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
          onPress={() => this.createDeck()}
        >
          <Text style={myStyles.btnText}>Submit</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

export default connect(null, { addNewDeck })(CardNew);
