import { Image } from 'expo-image';
import { Modal, StyleSheet, Text, View } from 'react-native';

import Button from '../components/Button';
import { AVATAR_ICONS, DRINK_ICONS } from '../constants/general';
import { BACKGROUND_COLOR, GREY, SECONDARY_COLOR } from '../constants/styles/colors';
import { FONT_FAMILY_REGULAR, HEADER_FONT_SIZE } from '../constants/styles/typography';

interface Player {
    username: string;
    avatar: number;
    drink: number;
  }

interface PlayerProfileProps {
    profile: Player;
    isVisible: boolean;
    onClose: () => void;
};

export default function PlayerProfile({ profile, isVisible, onClose }: PlayerProfileProps) {
  return (
    <Modal visible={isVisible} animationType='slide' presentationStyle='pageSheet'>
      <View style={styles.profileView}>
        <View style={styles.viewContainer}>
            <Text style={styles.baseText}>Username: {profile.username}</Text>
            <Text style={styles.baseText}>Total points: </Text>
            
            <View style={styles.avatarCircle}>
                <Image contentFit="contain" style={styles.avatar} source={AVATAR_ICONS[profile.avatar]} />
                <Image contentFit="contain" style={styles.drink} source={DRINK_ICONS[profile.drink]} />
            </View>

        </View>
        <Button
            style={styles.closeButton}
            marginTop={50}
            onPress={onClose}
            text="CLOSE" />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  profileView: {
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
  closeButton: {
    marginBottom: 20,
  },
  avatarAndDrinkContainer: {
    flex: 1,
    marginTop: 20,
    height: 60,
    width: 300,
  },
  avatar: {
    flex: 1,
    width: '80%',
    height: '80%',
    alignSelf: 'center',
  },
  drink: {
    position: 'absolute',
    width: '45%',
    height: '45%',
    alignSelf: 'flex-end',
    bottom: 0,
  },
  deckButtonContainer: {
    width: 100,
    alignSelf: 'center',
    aspectRatio: 1 / 1,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 10,
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
    marginTop: 30,
    width: '48%',
    aspectRatio: 1 / 1,
    backgroundColor: SECONDARY_COLOR,
    borderRadius: 80,
  },
  profileBackground: {
    width: '20.0%',
    aspectRatio: 1 / 1,
    backgroundColor: GREY,
    borderRadius: 20,
  },
  viewContainer: {
    flex: 1,
    marginTop: 30,
    marginBottom: 50,
    alignItems: 'center',
  },
  selectAvatarText: {
    color: SECONDARY_COLOR,
    fontFamily: FONT_FAMILY_REGULAR,
    fontSize: HEADER_FONT_SIZE,
  },
  selectDrinkText: {
    color: SECONDARY_COLOR,
    fontFamily: FONT_FAMILY_REGULAR,
    marginTop: 10,
    fontSize: HEADER_FONT_SIZE,
  },
  baseText: {
    color: SECONDARY_COLOR,
    fontFamily: FONT_FAMILY_REGULAR,
    marginTop: 10,
    fontSize: HEADER_FONT_SIZE,
  },
});
