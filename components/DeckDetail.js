import React, { Component } from 'react';
import { View, Text } from 'react-native';

class DeckDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    const { deckId } = navigation.state.params;

    return {
      title: `Deck ID: ${deckId}`,
    };
  };
  render() {
    return (
      <View>
        <Text>
          Deck Detail - deckId: {this.props.navigation.state.params.deckId}
        </Text>
      </View>
    );
  }
}

export default DeckDetail;
