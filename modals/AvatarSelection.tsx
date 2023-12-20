import { Image } from 'expo-image';
import { ref, update } from 'firebase/database';
import { useState } from 'react';
import { FlatList, Modal, StyleSheet, Text, View } from 'react-native';

import AvatarCircle from '../components/AvatarCircle';
import Button from '../components/Button';
import { AVATAR_ICONS, DRINK_ICONS } from '../constants/general';
import { BACKGROUND_COLOR, GREY, SECONDARY_COLOR } from '../constants/styles/colors';
import { FONT_FAMILY_BOLD, HEADER_FONT_SIZE } from '../constants/styles/typography';
import { useAuth } from '../context/authContext';
import { FIREBASE_RTDB } from '../firebaseConfig';
import useGameStore from '../store/gameStore';

interface AvatarSelectionProps {
  isVisible: boolean;
  onClose: () => void;
  roomCode: string;
};

export default function AvatarSelection({ isVisible, onClose, roomCode }: AvatarSelectionProps) {
  const { avatar, drink, updateAvatar, updateDrink } = useGameStore();
  const [selectedAvatarIndex, setSelectedAvatarIndex] = useState(0);
  const [selectedDrinkIndex, setSelectedDrinkIndex] = useState(0);
  const { authUser } = useAuth();
  const userId = authUser ? authUser.uid : '';

  const updateAvatarAndDrinkInDatabase = async () => {
    const playerRef = ref(FIREBASE_RTDB, `rooms/${roomCode}/players/${userId}`);

    try {
      await update(playerRef, { avatar, drink });
      console.log(`Avatar and drink updated`);
    } catch (error) {
      console.error('Error updating avatar and drink in database:', error);
    }
  }

  return (
    <Modal visible={isVisible} animationType='slide' presentationStyle='pageSheet'>
      <View style={styles.joinGameView}>
        <View style={styles.bigCircle}>
          <Image style={styles.avatar} source={AVATAR_ICONS[avatar]} />
        </View>
        <View style={styles.viewContainer}>
          <FlatList 
          showsHorizontalScrollIndicator={false}
          snapToInterval={30}
          decelerationRate="fast"
          horizontal
          style={styles.avatarCircles}
          data={AVATAR_ICONS}
          renderItem={({item, index}) => <AvatarCircle selectedAvatarIndex={selectedAvatarIndex} setSelectedAvatarIndex={setSelectedAvatarIndex} selectedDrinkIndex={selectedDrinkIndex} setSelectedDrinkIndex={setSelectedDrinkIndex} avatarIcon={item} onPress={() => updateAvatar(index)} index={index} isAvatar/>}
          />

        </View>
        <Text style={styles.selectDrinkText}>Drink of your choice?</Text>
        <View style={styles.bigCircle}>
          <Image style={styles.avatar} source={DRINK_ICONS[drink]} />
        </View>
        <View style={styles.viewContainer}>

            
          <FlatList 
          showsHorizontalScrollIndicator={false}
          snapToInterval={30}
          decelerationRate="fast"
          horizontal
          style={styles.avatarCircles}
          data={DRINK_ICONS}
          renderItem={({item, index}) => <AvatarCircle selectedAvatarIndex={selectedAvatarIndex} setSelectedAvatarIndex={setSelectedAvatarIndex} selectedDrinkIndex={selectedDrinkIndex} setSelectedDrinkIndex={setSelectedDrinkIndex} avatarIcon={item} onPress={() => updateDrink(index)} index={index} isAvatar={false}/>}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            marginTop={50}
            onPress={() => { onClose(); updateAvatarAndDrinkInDatabase(); }}
            text="DONE"
            buttonBgColor="#F76D31"
            buttonBorderColor="#F76D31"
            buttonWidthNumber={2.5} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  joinGameView: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: BACKGROUND_COLOR,
  },
  drinkContainer: {
    width: 50,
    height: 50,
    bottom: 40,
    right: '-15%',
  },
  leftGradientColor: {
    position: 'absolute',
    left: 0,
    width: 50,
    height: '100%',
  },
  rightGradientColor: {
    position: 'absolute',
    right: 0,
    width: 50,
    height: '100%',
  },
  avatar: {
    flex: 1,
    contentFit: 'contain',
    width: '90%',
    height: '90%',
    alignSelf: 'center',
  },
  selectDrinkText: {
    color: SECONDARY_COLOR,
    fontFamily: FONT_FAMILY_BOLD,
    marginTop: 30,
    fontSize: HEADER_FONT_SIZE,
  },
  deckButtonContainer: {
    width: 100,
    alignSelf: 'center',
    aspectRatio: 1 / 1,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 10,
  },
  drink: {
    flex: 1,
    contentFit: 'contain',
    width: '70%',
    height: '70%',
    alignSelf: 'center',
  },
  cheersIcon: {
    position: 'absolute',
    contentFit: 'contain',
    width: 80,
    height: 80,
    right: -30,
    opacity: 0.3,
  },
  avatarCircles: {
    flexDirection: 'row',
    marginTop: 20,
  },
  bigCircle: {
    marginTop: 20,
    width: '35.0%',
    aspectRatio: 1 / 1,
    backgroundColor: GREY,
    borderRadius: 200,
  },
  viewContainer: {
    flex: 1,
    marginTop: 10,
    width: '90%',
    alignItems: 'center',
  },
  buttonContainer: {
    marginBottom: 50,
  },
});
