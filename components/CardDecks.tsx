import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function CardDecks(): JSX.Element {

  return (
    <View style={styles.cardDeckView}>
      <Text>Card Deck 1</Text>
      <Text>Card Deck 2</Text>
      <Text>Card Deck 3</Text>
      <Text>Card Deck 4</Text>
      <Text>Card Deck 5</Text>
    </View>

  );
}
const styles = StyleSheet.create({
    cardDeckView: {
        marginTop: 100,
        alignItems: 'center',
    },
  });
export default CardDecks;
