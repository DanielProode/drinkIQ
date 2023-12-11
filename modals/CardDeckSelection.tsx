import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import Button from '../components/Button';
import { CARD_PACKS, DEFAULT_DECK_PREVIEW_IMAGE } from '../constants/general';
import useGameStore from '../store/gameStore';
import useUserStore from '../store/userStore';

interface CardDeckSelectionProps {
  isVisible: boolean;
  onClose: () => void;
};

export default function CardDeckSelection({ isVisible, onClose }: CardDeckSelectionProps) {
  const [selectedCardIndex, setSelectedCardIndex] = useState(-1);
  const { updatePlayableDeckImage, updatePlayableDeck, updatePlayableDeckName, updatePlayableCardBackground } = useGameStore();
  const { packs_owned } = useUserStore();
  const [ selectedCardDeck, setSelectedCardDeck ] = useState(DEFAULT_DECK_PREVIEW_IMAGE);

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
              updatePlayableDeckName(cardPack.name)
              updatePlayableCardBackground(cardPack.image)
              setSelectedCardIndex(index)
              setSelectedCardDeck(cardPack.previewImage)
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
        <Image style={styles.selectedCardDeck} source={selectedCardDeck} />
        <Text style={styles.selectedCardDeckName}>Estonia</Text>
          <View style={styles.viewContainer}>
            {renderDecks()}
          </View>
          <Button
            marginTop={20}
            text="CONTINUE"
            onPress={onClose}
            buttonBgColor="#F76D31"
            buttonBorderColor="#F76D31" />
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
  selectedCardDeck: {
    height: 200,
    width: 200,
    borderRadius: 5,
  },
  selectedCardDeckName: {
    color: 'white',
    fontFamily: 'JosefinSans-Bold',
    fontSize: 18,
    marginTop: 10,
    marginBottom: 100,
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
