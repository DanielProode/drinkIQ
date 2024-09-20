import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Image } from 'expo-image';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Button from '../components/Button';
import { DRINKIQ_LOGO_IMAGE } from '../constants/general';
import { BACKGROUND_COLOR, PRIMARY_COLOR, SECONDARY_COLOR } from '../constants/styles/colors';
import { BIG_LOGO_FONT_SIZE, FONT_FAMILY_REGULAR, LOGO_FONT_FAMILY_REGULAR, REGULAR_LOGO_FONT_SIZE } from '../constants/styles/typography';
import Tutorial from '../modals/Tutorial';

interface MainMenuProps {
  navigation: NativeStackNavigationProp<any>;
}


export default function MainMenu({ navigation }: MainMenuProps) {
  const [isTutorialModalVisible, setIsTutorialModalVisible] = useState(false);

  const toggleTutorialModal = () => {
    setIsTutorialModalVisible(!isTutorialModalVisible)
  };

  return (
    <View style={styles.mainView}>
      <Tutorial onClose={toggleTutorialModal} isVisible={isTutorialModalVisible} />
      <Image contentFit="contain" style={styles.cheersIcon} source={DRINKIQ_LOGO_IMAGE} />
      <Text style={styles.drinkIQLogo}>Drink<Text style={styles.drinkIQOrange}>IQ</Text></Text>
      <View style={styles.bodyContainer}>
        <View >
          <Button onPress={() => {
            navigation.navigate('NewGame');
          }}
            text="New game"
            buttonBgColor="#F76D31"
            buttonBorderColor="#F76D31" />
        </View>
        <View >
          <Button onPress={() => {
            navigation.navigate('CardDecks');
          }}
            text="Card Decks" />
        </View>
        <View >
          <Button onPress={() => {
            toggleTutorialModal();
          }}
            text="How to play" />
        </View>
        <View >
          <Button onPress={() => {
            navigation.navigate('Profile');
          }}
            text="Profile" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: BACKGROUND_COLOR,
  },
  cheersIcon: {
    position: 'absolute',
    width: 250,
    height: 250,
    right: 20,
    top: 20,
    opacity: 0.3,
  },
  drinkIQLogo: {
    fontFamily: LOGO_FONT_FAMILY_REGULAR,
    marginTop: 150,
    fontSize: BIG_LOGO_FONT_SIZE,
    color: SECONDARY_COLOR,
    letterSpacing: 3,
  },
  drinkIQOrange: {
    color: PRIMARY_COLOR,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 100,
    flex: 1,
  },
  welcomeMessage: {
    fontSize: REGULAR_LOGO_FONT_SIZE,
    textAlign: 'center',
    fontFamily: FONT_FAMILY_REGULAR,
    color: SECONDARY_COLOR,
  },
  bodyContainer: {
    flex: 4,
    display: 'flex',
    justifyContent: 'center',
    gap: 30,
  },
});
