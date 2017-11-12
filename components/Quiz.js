import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addNewCard } from '../actions';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import myStyles from '../utils/styles';

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      cardIndex: 0,
      quizzes: [],
      currentQuiz: {
        qa: 0, //q=0, a=1
        header: '',
        btnText: '',
      },
    };
  }

  componentDidMount() {
    const quiz = this.props.navigation.state.params.currentDeck.questions;
    console.log('quiz:' + JSON.stringify(quiz, null, 2));

    this.setState({
      currentQuiz: {
        qa: 0,
        header: quiz[this.state.cardIndex].question,
        btnText: 'Show Answer',
      },
      quizzes: quiz,
    });
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: `Quiz`,
    };
  };

  state = { question: '', answer: '' };

  createCard(key) {
    //hide keyboard
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

  toggleQA = () => {
    console.log(
      'this.state.cardIndex:' + JSON.stringify(this.state.cardIndex, null, 2)
    );
    console.log(
      'this.state.currentQuiz.qa:' +
        JSON.stringify(this.state.currentQuiz.qa, null, 2)
    );

    if (this.state.currentQuiz.qa == 1) {
      this.setState({
        currentQuiz: {
          qa: 0,
          header: this.state.quizzes[this.state.cardIndex].question,
          btnText: 'Show Answer',
        },
      });
    } else {
      this.setState({
        currentQuiz: {
          qa: 1,
          header: this.state.quizzes[this.state.cardIndex].answer,
          btnText: 'Show Question',
        },
      });
    }
  };

  showNextQuiz = () => {
    console.log(
      'this.state.cardIndex:' + JSON.stringify(this.state.cardIndex, null, 2)
    );

    console.log(
      'quizzes(length - 1): ' +
        JSON.stringify(this.state.quizzes.length - 1, null, 2)
    );

    if (this.state.cardIndex == this.state.quizzes.length - 1) {
      this.props.navigation.navigate('QuizResult', {
        currentDeck: this.props.navigation.state.params.currentDeck,
      });
    } else {
      const newIndex = this.state.cardIndex + 1;

      this.setState((prevState, props) => ({
        cardIndex: newIndex,
        currentQuiz: {
          qa: 0,
          header: this.state.quizzes[newIndex].question,
          btnText: 'Show Answer',
        },
      }));
    }

    console.log(
      'AFTER -- this.state.cardIndex:' +
        JSON.stringify(this.state.cardIndex, null, 2)
    );
    console.log(
      'this.state.currentQuiz.qa:' +
        JSON.stringify(this.state.currentQuiz.qa, null, 2)
    );
  };

  render() {
    const currentDeck = this.props.navigation.state.params.currentDeck;
    //const quiz = currentDeck.questions;
    //console.log('quiz:' + JSON.stringify(quiz, null, 2));

    //const currentQuiz = currentDeck.questions[this.state.cardIndex];
    //console.log('currentQuiz:' + JSON.stringify(currentQuiz, null, 2));

    return (
      <View style={myStyles.container}>
        <View style={myStyles.deckContainer}>
          <Text style={myStyles.deckTitle}>
            {this.state.currentQuiz.header}
          </Text>
          <TouchableOpacity
            style={myStyles.btnInfo}
            onPress={() => this.toggleQA()}
          >
            <Text style={myStyles.btnText}>
              {this.state.currentQuiz.btnText}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={myStyles.btnGroup}>
          <TouchableOpacity
            style={myStyles.btnSuccess}
            onPress={() => this.showNextQuiz()}
          >
            <Text style={myStyles.btnText}> Correct</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={myStyles.btnDanger}
            onPress={() =>
              this.props.navigation.navigate('Quiz', {
                currentDeck,
              })}
          >
            <Text style={myStyles.btnText}>Incorrect</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default connect(null, { addNewCard })(Quiz);
