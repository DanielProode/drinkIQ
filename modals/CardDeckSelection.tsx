import { Image } from 'expo-image';
import { ref, update } from 'firebase/database';
import { useState } from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';

import Button from '../components/Button';
import CardDeckSquare from '../components/CardDeckSquare';
import { CARD_PACKS } from '../constants/general';
import { BACKGROUND_COLOR, SECONDARY_COLOR } from '../constants/styles/colors';
import { FONT_FAMILY_BOLD, REGULAR_FONT_SIZE } from '../constants/styles/typography';
import { FIREBASE_RTDB } from '../firebaseConfig';
import useGameStore from '../store/gameStore';

interface CardDeckSelectionProps {
  isVisible: boolean;
  onClose: () => void;
};

export default function CardDeckSelection({ isVisible, onClose, }: CardDeckSelectionProps) {
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  const { roomCode, playableDeckIndex, updatePlayableDeckIndex } = useGameStore();

  const updatePlayableDeckInDatabase = async () => {
    const roomRef = ref(FIREBASE_RTDB, `rooms/${roomCode}`);
    try {
      await update(roomRef, { cardDeck: playableDeckIndex });
      console.log(`Playable card deck updated`);
    } catch (error) {
      console.error('Error updating playable card deck in database:', error);
    }
  }

  const handlePress = (index: number) => {
    setSelectedCardIndex(index);
    updatePlayableDeckIndex(index);
  }

  return (
    <Modal animationType='slide' presentationStyle='pageSheet' visible={isVisible}>
      <View style={styles.decksView}>
        <View style={styles.decksContainer}>
          <Image style={styles.selectedCardDeck} source={CARD_PACKS[selectedCardIndex].image} />
          <Text style={styles.selectedCardDeckName}>{CARD_PACKS[selectedCardIndex].name}</Text>
          <View style={styles.viewContainer}>
            {CARD_PACKS.map((cardPack, index) => (
              <CardDeckSquare cardPack={cardPack} index={index} selectedCardIndex={selectedCardIndex} handlePress={handlePress} key={cardPack.id} />
            ))}
          </View>
          <Button
            marginTop={20}
            text="CONTINUE"
            onPress={() => {onClose(); updatePlayableDeckInDatabase()}}
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
    backgroundColor: BACKGROUND_COLOR,
  },
  selectedCardDeck: {
    height: 200,
    width: 200,
    borderRadius: 5,
  },
  selectedCardDeckName: {
    color: SECONDARY_COLOR,
    fontFamily: FONT_FAMILY_BOLD,
    fontSize: REGULAR_FONT_SIZE,
    marginTop: 10,
    marginBottom: 100,
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
});
