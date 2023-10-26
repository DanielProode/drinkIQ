import { Image, ScrollView, StyleSheet, Text, TouchableHighlight, View } from 'react-native';

export default function CardDecks() {
  const cardDeck1 = require('../assets/images/card_deck1.png');
  const cardDeck2 = require('../assets/images/card_deck2.png');
  const cardDeck3 = require('../assets/images/card_deck3.png');

  return (
    <View style={styles.cardDeckView}>
      <Text style={styles.drinkIQLogo}>DRINKIQ</Text>
      <View style={styles.buttonContainer}>
      <Text style={styles.availableDecksText}>Available decks</Text>
      <Text style={styles.newDecksText}>New decks</Text>
      </View>
      <View style={styles.cardsView}>
       
        <ScrollView style={styles.scrollView}>
          <TouchableHighlight
            style={styles.cardViewTouchable}
            onPress={() => console.log('Pressed deck1!')}>
              <>
            <Image style={styles.card} source={cardDeck1} />
            <Text style={styles.deckTitle}>Deck 1</Text>
            </>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.cardViewTouchable}
            onPress={() => console.log('Pressed deck2!')}>
              <>
            <Image style={styles.card} source={cardDeck2} />
            <Text style={styles.deckTitle}>Deck 2</Text>
            </>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.cardViewTouchable}
            onPress={() => console.log('Pressed deck3!')}>
              <>
            <Image style={styles.card} source={cardDeck3} />
            <Text style={styles.deckTitle}>Deck 3</Text>
            </>
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
  buttonContainer: {
    flexDirection: 'row',
    gap: 40,
    justifyContent: 'center',
    marginTop: 50,
  },
  deckTitle: {
    fontFamily: 'Basic',
    color: 'white',
    fontSize: 24,
    alignSelf: 'flex-start',
    marginLeft: 20,
  },
  availableDecksText: {
    fontFamily: 'Basic',
    color: 'white',
    fontSize: 26,
  },
  newDecksText: {
    fontFamily: 'Basic',
    color: 'white',
    fontSize: 26,
  },
  scrollView: {
  },
  explainerText: {
    fontSize: 40,
    color: 'white',
    alignSelf: 'center',
    fontFamily: 'Basic',
  },
  drinkIQLogo: {
    fontFamily: 'Knewave',
    marginTop: 50,
    marginLeft: 20,
    fontSize: 30,
    color: 'white',
  },
  card: {
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
    borderRadius: 40,
    width: 300,
    height: 150,
    alignItems: 'center',
    marginBottom: 40,
  },
});
