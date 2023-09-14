import { Image, ScrollView, StyleSheet, Text, TouchableHighlight, View } from 'react-native';

export default function CardDecks(): JSX.Element {
  const cardDeck1 = require('../assets/images/card_deck1.png');
  const cardDeck2 = require('../assets/images/card_deck2.png');
  const cardDeck3 = require('../assets/images/card_deck3.png');

  return (
    <View style={styles.cardDeckView}>
      <View style={styles.cardsView}>
        <Text style={styles.explainerText}>Here are your available card decks!</Text>
        <ScrollView style={styles.scrollView}>
          <TouchableHighlight
            style={styles.cardViewTouchable}
            onPress={() => console.log('Pressed deck1!')}>
            <Image style={styles.card} source={cardDeck1} />
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.cardViewTouchable}
            onPress={() => console.log('Pressed deck2!')}>
            <Image style={styles.card} source={cardDeck2} />
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.cardViewTouchable}
            onPress={() => console.log('Pressed deck3!')}>
            <Image style={styles.card} source={cardDeck3} />
          </TouchableHighlight>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardDeckView: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    paddingLeft: 20,
    paddingRight: 20,
  },
  scrollView: {
  },
  explainerText: {
    fontSize: 40,
    color: 'white',
    alignSelf: 'center',
    fontFamily: 'Basic',
  },
  card: {
    flex: 1,
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
  },
  cardsView: {
    flex: 1,
    marginTop: 50,
    width: '100%',
    alignItems: 'center',
  },
  cardViewTouchable: {
    width: 400,
    height: 400,
    alignItems: 'center',
  },
});
