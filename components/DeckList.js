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

import { orange } from '../utils/colors';

import { clearAllRecordsFromStorage } from '../utils/api';

function DeckItem({ navigation, title, questions }) {
  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        onPress={() => navigation.navigate('DeckDetail', { deckTitle: title })}
      >
        <View style={styles.deckItem}>
          <Text style={styles.deckTitle}>{title}</Text>
          <Text>{questions.length} cards</Text>
        </View>
        <View style={styles.deckLine} />
      </TouchableOpacity>
    </View>
  );
}

class DeckList extends Component {
  componentDidMount() {
    this.props.fetchDecks();
  }
  renderItem = ({ item }) => {
    return <DeckItem navigation={this.props.navigation} {...item} />;
  };
  render() {
    const { decks } = this.props;

    return (
      <View style={styles.container}>
        <FlatList
          data={decks}
          renderItem={this.renderItem}
          keyExtractor={(decks, title) => title}
        />
        <TouchableOpacity onPress={() => clearAllRecordsFromStorage()}>
          <Text style={styles.btn}>Delete All Data</Text>
        </TouchableOpacity>
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

function mapStateToProps(state) {
  console.log('state.decks:' + JSON.stringify(state.decks, null, 2));

  let decks = [];

  for (const [key, value] of Object.entries(state.decks)) {
    decks.push({ key: key, ...value });
  }

  console.log('DeckList:' + JSON.stringify(decks, null, 2));

  return { decks };
}

const mapDispatchToProps = dispatch => {
  return {
    fetchDecks: () => dispatch(fetchDecksFromAPI()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeckList);
