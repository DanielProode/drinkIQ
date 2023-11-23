import { Image, ImageSourcePropType, Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import Button from '../components/Button';
import useGameStore from '../store/gameStore';

interface AvatarSelectionProps {
  isVisible: boolean;
  onClose: () => void;
};

const avatarIcons1 = [
  require('../assets/images/avatar_1.png'),
  require('../assets/images/avatar_2.png'),
  require('../assets/images/avatar_3.png'),
  require('../assets/images/avatar_4.png')];
const avatarIcons2 = [
  require('../assets/images/avatar_6.png'),
  require('../assets/images/avatar_7.png'),
  require('../assets/images/avatar_8.png'),
  require('../assets/images/avatar_9.png')];
const drinkIcons1 = [
  require('../assets/images/drink_1.png'),
  require('../assets/images/drink_2.png'),
  require('../assets/images/drink_3.png'),
  require('../assets/images/drink_4.png')];
const drinkIcons2 = [
  require('../assets/images/drink_6.png'),
  require('../assets/images/drink_7.png'),
  require('../assets/images/drink_8.png'),
  require('../assets/images/drink_9.png')];

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
            {RenderCircles(avatarIcons1, false)}
          </View>
          <View style={styles.avatarCircles}>
            {RenderCircles(avatarIcons2, false)}
          </View>
          <Text style={styles.selectDrinkText}>Select your drink:</Text>
          <View style={styles.drinkCircles}>
            {RenderCircles(drinkIcons1, true)}
          </View>
          <View style={styles.drinkCircles}>
            {RenderCircles(drinkIcons2, true)}
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
