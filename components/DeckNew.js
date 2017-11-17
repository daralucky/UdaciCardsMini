import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { addNewDeck } from '../actions';
import myStyles from '../utils/styles';

class DeckNew extends Component {
  state = { title: '' };

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
        <Text style={myStyles.question}>What is the title of your deck?</Text>
        <TextInput
          value={this.state.title}
          onChangeText={text => this.setState({ title: text })}
          style={myStyles.input}
          placeholder="Deck Title"
        />
        <TouchableOpacity
          style={myStyles.btnSuccess}
          onPress={() => this.createDeck()}
        >
          <Text style={myStyles.btnText}>Submit</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

export default connect(null, { addNewDeck })(DeckNew);
