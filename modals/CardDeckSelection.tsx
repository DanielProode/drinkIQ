import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import Button from '../components/Button';
import { CARD_PACKS } from '../constants/general';
import useGameStore from '../store/gameStore';
import useUserStore from '../store/userStore';

interface CardDeckSelectionProps {
  isVisible: boolean;
  onClose: () => void;
};

export default function CardDeckSelection({ isVisible, onClose }: CardDeckSelectionProps) {
  const [selectedCardIndex, setSelectedCardIndex] = useState(-1);
  const { updatePlayableDeckImage, updatePlayableDeck, updatePlayableCardBackground } = useGameStore();
  const { packs_owned } = useUserStore();

  const renderDecks = () => {
    return CARD_PACKS.map((cardPack, index) => {
      const isSelected = selectedCardIndex === index;
      return (
        <View style={styles.cardsContainer} key={index}>
          <Pressable
            key={index}
            style={({ pressed }) => [
              { opacity: pressed ? 0.5 : 1.0 },
              styles.cardDeckContainer,
              isSelected && styles.cardDeckContainerSelected,
            ]}
            onPress={() => {
              updatePlayableDeckImage(cardPack.previewImage)
              updatePlayableDeck(cardPack.id)
              updatePlayableCardBackground(cardPack.image)
              setSelectedCardIndex(index);
            }}
            disabled={!(packs_owned && packs_owned.includes(cardPack.id))} >
            <Image style={styles.cardDeck} source={cardPack.previewImage} />
            {!(packs_owned && packs_owned.includes(cardPack.id)) && <View style={styles.overlay} />}
          </Pressable>
          {!(packs_owned && packs_owned.includes(cardPack.id)) && (
            <View style={styles.priceContainer}>
              <Text style={styles.priceText}>BUY FOR 4.99€</Text>
            </View>
          )}
        </View>
      );
    });
  }

  return (
    <Modal animationType='slide' presentationStyle='pageSheet' visible={isVisible}>
      <View style={styles.decksView}>
        <LinearGradient
          // Background Linear Gradient
          colors={['#1F1F1F', '#373737', '#1E1E1E']}
          style={styles.background}
        />
        <View style={styles.decksContainer}>
          <Text style={styles.text}>CHOOSE A DECK</Text>
          <View style={styles.viewContainer}>
            {renderDecks()}
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
  overlay: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#00000099',
    position: 'absolute',
    zIndex: 1,
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
