import { Image, ImageSourcePropType, Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import Button from '../components/Button';
import { AVATAR_ICONS_1, AVATAR_ICONS_2, DRINK_ICONS_1, DRINK_ICONS_2 } from '../constants/general';
import useGameStore from '../store/gameStore';

interface AvatarSelectionProps {
  isVisible: boolean;
  onClose: () => void;
};

export default function AvatarSelection({ isVisible, onClose }: AvatarSelectionProps) {
  const { avatar, drink, updateAvatar, updateDrink } = useGameStore();

  const RenderCircles = (myArray: ImageSourcePropType[], isDrink: boolean) => {
    return myArray.map((item, index) => {
      return (
        <Pressable
          style={styles.avatarCircle}
          key={index}
          onPress={() => isDrink ? updateDrink(item) : updateAvatar(item)}>
          <Image style={styles.avatar} source={item} />
        </Pressable>
      );
    });
  };

  return (
    <Modal visible={isVisible} animationType='slide' presentationStyle='pageSheet'>
      <View style={styles.joinGameView}>
        <View style={styles.avatarAndDrinkContainer}>
          <View style={styles.profileBackground}>
            <Image style={styles.avatar} source={avatar} />
          </View>
          <View style={styles.drinkContainer}>
            <Image style={styles.drink} source={drink} />
          </View>
        </View>
        <View style={styles.viewContainer}>
          <Text style={styles.selectAvatarText}>Select your avatar:</Text>
          <View style={styles.avatarCircles}>
            {RenderCircles(AVATAR_ICONS_1, false)}
          </View>
          <View style={styles.avatarCircles}>
            {RenderCircles(AVATAR_ICONS_2, false)}
          </View>
          <Text style={styles.selectDrinkText}>Select your drink:</Text>
          <View style={styles.drinkCircles}>
            {RenderCircles(DRINK_ICONS_1, true)}
          </View>
          <View style={styles.drinkCircles}>
            {RenderCircles(DRINK_ICONS_2, true)}
          </View>
          <Button
            marginTop={50}
            onPress={onClose}
            text="SAVE SELECTION" />
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
  avatarAndDrinkContainer: {
    marginTop: 20,
    height: 60,
  },
  avatar: {
    flex: 1,
    resizeMode: 'contain',
    width: '70%',
    height: '70%',
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
    gap: 18,
    marginTop: 20,
  },
  drinkCircles: {
    flexDirection: 'row',
    gap: 18,
    marginTop: 20,
  },
  avatarCircle: {
    width: 60,
    height: 60,
    aspectRatio: 1 / 1,
    backgroundColor: '#d8d8d8',
    borderRadius: 40,
  },
  profileBackground: {
    width: '20.0%',
    aspectRatio: 1 / 1,
    backgroundColor: '#d8d8d8',
    borderRadius: 20,
  },
  viewContainer: {
    flex: 1,
    marginTop: 30,
    marginBottom: 50,
    alignItems: 'center',
  },
  selectAvatarText: {
    color: 'white',
    fontFamily: 'Basic',
    fontSize: 20,
  },
  selectDrinkText: {
    color: 'white',
    fontFamily: 'Basic',
    marginTop: 10,
    fontSize: 20,
  },
});
