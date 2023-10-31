import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { Image, ImageSourcePropType, Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import Button from '../components/Button';
import { useGame } from '../context/gameContext';

interface CardDeckSelectionProps {
  isVisible: boolean;
  onClose: () => void;
};

const ownedCardDecks = [
  { image: require('../assets/images/card_deck1.png'), index: 1 },
  { image: require('../assets/images/card_deck2.png'), index: 2 },
  { image: require('../assets/images/card_deck3.png'), index: 3 },
];
const availableCardDecks = [
  { image: require('../assets/images/card_deck4.png'), index: 4 },
  { image: require('../assets/images/card_deck5.png'), index: 5 },
  { image: require('../assets/images/card_deck6.png'), index: 6 },
];

export default function CardDeckSelection({ isVisible, onClose }: CardDeckSelectionProps) {
  const [selectedCardIndex, setSelectedCardIndex] = useState(-1);
  const { updatePlayableDeck } = useGame();

  const RenderCardDecks = (myArray: { image: ImageSourcePropType; index: number; }[], owned: boolean) => {
    return myArray.map((cardDeck) => {
      const isSelected = selectedCardIndex === cardDeck.index;
      return (
        <View style={styles.cardsContainer} key={cardDeck.index}>
          <Pressable
            key={cardDeck.index}
            style={({ pressed }) => [
              { opacity: pressed ? 0.5 : 1.0 },
              styles.cardDeckContainer,
              isSelected && styles.cardDeckContainerSelected,
            ]}
            onPress={() => {
              updatePlayableDeck(cardDeck.image)
              setSelectedCardIndex(cardDeck.index);
            }} >
            <Image style={styles.cardDeck} source={cardDeck.image} />
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
    <Modal animationType='slide' presentationStyle='pageSheet' visible={isVisible}>
      <View style={styles.decksView}>
        <LinearGradient
          // Background Linear Gradient
          colors={['#1F1F1F', '#373737', '#1E1E1E']}
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
            onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  decksView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1E1E1E',
  },
  background: {
    position: 'absolute',
    alignItems: 'center',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
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
    marginHorizontal: 10,
    overflow: 'hidden',
    marginTop: 10,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  cardDeckContainerSelected: {
    borderColor: 'blue',
  },
  viewContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 10,
  },
  decksContainer: {
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
