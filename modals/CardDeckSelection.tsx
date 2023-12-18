import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { ref, update } from 'firebase/database';
import { useState } from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';

import Button from '../components/Button';
import CardDeckSquare from '../components/CardDeckSquare';
import { CARD_PACKS } from '../constants/general';
import { FIREBASE_RTDB } from '../firebaseConfig';
import useGameStore from '../store/gameStore';

interface CardDeckSelectionProps {
  roomCode: string;
  isVisible: boolean;
  onClose: () => void;
};

export default function CardDeckSelection({ roomCode, isVisible, onClose, }: CardDeckSelectionProps) {
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  const { playableDeckIndex, updatePlayableDeckIndex } = useGameStore();

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
        <LinearGradient
          // Background Linear Gradient
          colors={['#1F1F1F', '#373737', '#1E1E1E']}
          style={styles.background}
        />
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
