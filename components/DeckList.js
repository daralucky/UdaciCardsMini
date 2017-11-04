import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

class DeckList extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Home View</Text>

        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('DeckDetail', { deckId: 12345 })}
        >
          <Text style={styles.btn}>To Deck Detail</Text>
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
});

export default DeckList;
