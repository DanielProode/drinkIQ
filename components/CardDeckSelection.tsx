import { LinearGradient } from 'expo-linear-gradient';
import { Image, ImageSourcePropType, Pressable, StyleSheet, Text, View } from 'react-native';

import Button from './Button';
import { useState } from 'react';

export default function CardDeckSelection(props: { visibility: any; handleCardDeck: any }) {

  const { visibility } = props;

  const { handleCardDeck } = props;

  const ownedCardDecks = [
    require('../assets/images/card_deck1.png'),
    require('../assets/images/card_deck2.png'),
    require('../assets/images/card_deck3.png'),
  ];
  const availableCardDecks = [
    require('../assets/images/card_deck4.png'),
    require('../assets/images/card_deck5.png'),
    require('../assets/images/card_deck6.png'),
  ];


  const [selectedCardIndex, setSelectedCardIndex] = useState(-1);

  const RenderCardDecks = (myArray: ImageSourcePropType[], owned: boolean) => {
    return myArray.map((cardDeck, index) => {
      const isSelected = selectedCardIndex === index;

      return (
        <View style={styles.cardsContainer} key={index}>
        <Pressable
          key={index}
          style={({ pressed }) => [
            { opacity: pressed ? 0.5 : 1.0 },
            styles.cardDeckContainer,
            isSelected && owned && styles.cardDeckContainerSelected,
            ]}
          onPress={() => {
            handleCardDeck(cardDeck)

            setSelectedCardIndex(index);
            
          }
          } >
          <Image style={styles.cardDeck} source={cardDeck} />
          
        </Pressable>
        {!owned && (
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>3.99€</Text>
          
          </View>
          )}
        </View>
      );
    });
  };

  return (
    <View style={styles.decksView}>
        <LinearGradient
        // Background Linear Gradient
        colors={['#1F1F1F','#373737', '#1E1E1E']}
        style={styles.background}
      />
        <View style={styles.decksContainer} >
          <Text style={styles.text}>CHOOSE A DECK</Text>
          <View style={styles.viewContainer}>
            {RenderCardDecks(ownedCardDecks, true)}
          </View>
          <Text style={styles.text}>CARD DECKS AVAILABLE</Text>
          <View style={styles.viewContainer}>
            {RenderCardDecks(availableCardDecks, false)}
          </View>
          <Button 
          marginTop={20}
          text="CONTINUE"
          onPress={() => visibility(false)}/>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  decksView: {
    position: 'absolute',
    alignItems: 'center',
    top: 150, bottom: 150,
    width: '95%',
    zIndex: 1,
    headerBackVisible: false,
  },
  background: {
    position: 'absolute',
    alignItems: 'center',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    borderRadius: 20,
  },
  cardDeck: {
    flex: 1,
    resizeMode: 'contain',
    alignSelf: 'center',
    borderRadius: 10,
    
  },
  cardDeckContainer: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginHorizontal: 5,
    overflow: 'hidden',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  cardDeckContainerSelected: {
    borderColor: 'blue',
  },
  viewContainer: {
    flexDirection: 'row',
    width: '100%',
    height: undefined,
    marginTop: 20,
    marginBottom: 10,
  },

  decksContainer: {
    marginTop: 50,
    alignItems: 'center',
    width: '95%',
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontFamily: 'Basic',
    marginTop: 20,
  },
  priceContainer: {
    alignItems: 'center',
    marginTop: 5,
  },
  priceText: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'Basic',
  },
  cardsContainer: {
    flex: 1,
    width: '100%',
  },

});
