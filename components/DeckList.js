import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';

import { orange } from '../utils/colors';
import getDecks from '../utils/deckdata';

function DeckItem({ title, cards }) {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.deckItem}>
        <Text style={styles.deckTitle}>{title}</Text>
        <Text>{cards} cards</Text>
      </View>
      <View style={styles.deckLine} />
    </View>
  );
}

class DeckList extends Component {
  renderItem = ({ item }) => {
    return <DeckItem key={item.title} {...item} />;
  };
  render() {
    const decks = getDecks();

    return (
      <View style={styles.container}>
        <Text>Home View</Text>

        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('DeckDetail', { deckId: 12345 })}
        >
          <Text style={styles.btn}>To Deck Detail</Text>
        </TouchableOpacity>

        <FlatList
          data={decks}
          renderItem={this.renderItem}
          keyExtractor={(decks, title) => title}
        />
      </View>
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
  btn: {
    backgroundColor: '#E53224',
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    //borderColor: '#000',
  },
  deckItem: {
    flex: 1,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 10,
    marginBottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deckTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  deckLine: {
    marginTop: 5,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: orange,
    width: 350,
  },
});

export default DeckList;
