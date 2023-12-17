import { LinearGradient } from 'expo-linear-gradient';
import { FlatList, Image, Modal, StyleSheet, Text, View } from 'react-native';

import Button from '../components/Button';
import AvatarCircle from '../components/AvatarCircle';
import { AVATAR_ICONS, DRINK_ICONS } from '../constants/general';
import useGameStore from '../store/gameStore';
import { ref, update } from 'firebase/database';
import { FIREBASE_RTDB } from '../firebaseConfig';

interface AvatarSelectionProps {
  isVisible: boolean;
  onClose: () => void;
  roomCode: string;
};

export default function AvatarSelection({ isVisible, onClose, roomCode }: AvatarSelectionProps) {
  const { playerId, avatar, drink, updateAvatar, updateDrink } = useGameStore();

  const updateAvatarAndDrinkInDatabase = async () => {
    const playerRef = ref(FIREBASE_RTDB, `rooms/${roomCode}/players/${playerId}`);

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
            renderItem={({ item, index }) => <AvatarCircle avatarIcon={item} onPress={() => updateAvatar(index)} index={index} isAvatar />}
          />

          <LinearGradient
            // Button Linear Gradient
            colors={['transparent', '#1E1E1E80']}
            style={styles.rightGradientColor}
            start={[0, 0]}
            end={[1, 0]}
          />
          <LinearGradient
            // Button Linear Gradient
            colors={['#1E1E1E80', 'transparent']}
            style={styles.leftGradientColor}
            start={[0, 0]}
            end={[1, 0]}
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
            renderItem={({ item, index }) => <AvatarCircle avatarIcon={item} onPress={() => updateDrink(index)} index={index} isAvatar={false} />}
          />
          <LinearGradient
            // Button Linear Gradient
            colors={['transparent', '#1E1E1E80']}
            style={styles.rightGradientColor}
            start={[0, 0]}
            end={[1, 0]}
          />
          <LinearGradient
            // Button Linear Gradient
            colors={['#1E1E1E80', 'transparent']}
            style={styles.leftGradientColor}
            start={[0, 0]}
            end={[1, 0]}
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
    backgroundColor: '#1E1E1E',
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
    resizeMode: 'contain',
    width: '90%',
    height: '90%',
    alignSelf: 'center',
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
    resizeMode: 'contain',
    width: '70%',
    height: '70%',
    alignSelf: 'center',
  },
  cheersIcon: {
    position: 'absolute',
    resizeMode: 'contain',
    width: 80,
    height: 80,
    right: -30,
    opacity: 0.3,
  },
  avatarCircles: {
    flexDirection: 'row',
    marginTop: 20,
  },
  avatarCircle: {
    width: 70,
    height: 70,
    aspectRatio: 1 / 1,
    backgroundColor: '#d8d8d8',
    borderRadius: 40,
    marginRight: 10,
  },
  avatarCircleSelected: {
    width: 70,
    height: 70,
    aspectRatio: 1 / 1,
    backgroundColor: '#d8d8d8',
    borderRadius: 40,
    marginRight: 10,
    borderWidth: 3,
    borderColor: '#F76D31'
  },
  bigCircle: {
    marginTop: 20,
    width: '35.0%',
    aspectRatio: 1 / 1,
    backgroundColor: '#d8d8d8',
    borderRadius: 200,
  },
  viewContainer: {
    flex: 1,
    marginTop: 10,
    width: '90%',
    alignItems: 'center',
  },
  selectAvatarText: {
    color: 'white',
    fontFamily: 'JosefinSans-Bold',
    fontSize: 20,
  },
  selectDrinkText: {
    color: 'white',
    fontFamily: 'JosefinSans-Bold',
    marginTop: 30,
    fontSize: 20,
  },
  buttonContainer: {
    marginBottom: 50,
  },
});
