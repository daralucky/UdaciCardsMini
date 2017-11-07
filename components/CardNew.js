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
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <TextInput
          value={this.state.question}
          onChangeText={text => this.setState({ question: text })}
          style={styles.input}
          placeholder="Question"
        />
        <TextInput
          value={this.state.answer}
          onChangeText={text => this.setState({ answer: text })}
          style={styles.input}
          placeholder="Answer"
        />
        <TouchableOpacity
          style={styles.btnWarning}
          onPress={() => this.createDeck()}
        >
          <Text style={styles.btnText}>Submit</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
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
  question: {
    fontSize: 22,
    fontWeight: 'bold',
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
  btnText: {
    color: '#fff',
  },
  input: {
    width: 300,
    height: 44,
    padding: 8,
    borderWidth: 1,
    borderColor: '#757575',
    margin: 10,
  },
});

export default connect(null, { addNewDeck })(CardNew);
