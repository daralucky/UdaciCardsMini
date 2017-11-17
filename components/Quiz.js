import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, Keyboard } from 'react-native';
import { addNewCard } from '../actions';
import myStyles from '../utils/styles';

class Quiz extends Component {
  static navigationOptions = () => {
    return {
      title: `Quiz`,
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      question: '',
      answer: '',
      cardIndex: 0,
      quizzes: [],
      currentQuiz: {
        qa: 0, // q=0, a=1
        header: '',
        btnText: '',
      },
    };

    this.myScore = 0;
  }

  componentDidMount() {
    const quiz = this.props.navigation.state.params.currentDeck.questions;

    // console.log('quiz:' + JSON.stringify(quiz, null, 2));
    this.setState({
      currentQuiz: {
        qa: 0,
        header: quiz[this.state.cardIndex].question,
        btnText: 'Show Answer',
      },
      quizzes: quiz,
    });
  }

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

  toggleQA = () => {
    if (this.state.currentQuiz.qa === 1) {
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

  correctAnswer = () => {
    // update score
    this.myScore = this.myScore + 1;

    // show next question
    this.showNextQuiz();
  };

  incorrectAnswer = () => {
    // do nothing just show next question
    this.showNextQuiz();
  };

  showNextQuiz = () => {
    if (this.state.cardIndex === this.state.quizzes.length - 1) {
      this.props.navigation.navigate('QuizResult', {
        currentDeck: this.props.navigation.state.params.currentDeck,
        quizNumber: this.state.quizzes.length,
        score: this.myScore,
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
  };

  render() {
    return (
      <View style={myStyles.container}>
        <View>
          <Text>
            Question {this.state.cardIndex + 1} Of {this.state.quizzes.length}
          </Text>
        </View>
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
            onPress={() => this.correctAnswer()}
          >
            <Text style={myStyles.btnText}> Correct</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={myStyles.btnDanger}
            onPress={() => this.incorrectAnswer()}
          >
            <Text style={myStyles.btnText}>Incorrect</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default connect(null, { addNewCard })(Quiz);
