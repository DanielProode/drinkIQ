import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function CardDecks(): JSX.Element {

  return (
    <View style={styles.cardDeckView}>
      <Text style={styles.cardText}>Card Deck 1</Text>
      <Text style={styles.cardText}>Card Deck 2</Text>
      <Text style={styles.cardText}>Card Deck 3</Text>
      <Text style={styles.cardText}>Card Deck 4</Text>
      <Text style={styles.cardText}>Card Deck 5</Text>
    </View>

  );
}
const styles = StyleSheet.create({
    cardDeckView: {
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#1E1E1E',
    },
    cardText: {
        marginTop: 50,
        color: 'white',
        fontSize: 50,
    },
  });
export default CardDecks;
