import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchDecksFromAPI } from '../actions';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import myStyles from '../utils/styles';
import { clearAllRecordsFromStorage } from '../utils/api';

function DeckItem({ navigation, deck }) {
  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        onPress={() => navigation.navigate('DeckDetail', { currentDeck: deck })}
      >
        <View style={myStyles.deckItem}>
          <Text style={myStyles.deckTitle}>{deck.title}</Text>
          <Text>
            {typeof deck.questions !== 'undefined'
              ? deck.questions.length
              : '0'}{' '}
            cards
          </Text>
        </View>
        <View style={myStyles.deckLine} />
      </TouchableOpacity>
    </View>
  );
}

class DeckList extends Component {
  componentDidMount() {
    this.props.fetchDecks();
  }
  renderItem = ({ item }) => {
    return <DeckItem navigation={this.props.navigation} deck={item} />;
  };
  render() {
    const { decks } = this.props;

    return (
      <View style={myStyles.container}>
        <FlatList
          data={decks}
          renderItem={this.renderItem}
          keyExtractor={(decks, title) => title}
        />
        <TouchableOpacity
          style={myStyles.btnDanger}
          onPress={() => clearAllRecordsFromStorage()}
        >
          <Text style={myStyles.btnText}>Delete All Data</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

function mapStateToProps(state) {
  //console.log('state.decks:' + JSON.stringify(state.decks, null, 2));

  let decks = [];

  for (const [key, value] of Object.entries(state.decks)) {
    decks.push({ key: key, ...value });
  }

  //console.log('DeckList:' + JSON.stringify(decks, null, 2));

  return { decks };
}

const mapDispatchToProps = dispatch => {
  return {
    fetchDecks: () => dispatch(fetchDecksFromAPI()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeckList);
