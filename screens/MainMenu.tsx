import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Image } from 'expo-image';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Button from '../components/Button';
import { DRINKIQ_LOGO_IMAGE } from '../constants/general';
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
      <Image style={styles.cheersIcon} source={DRINKIQ_LOGO_IMAGE} />
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
        <View style={styles.cardButtonContainer}>
          <Button onPress={() => {
            navigation.navigate('CardDecks');
          }}
            text="Card Decks" />
        </View>
        <View style={styles.tutorialButtonContainer}>
          <Button onPress={() => {
            toggleTutorialModal();
          }}
            text="How to play" />
        </View>
        <View style={styles.settingsButtonContainer}>
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
    backgroundColor: '#1E1E1E',
  },
  cheersIcon: {
    position: 'absolute',
    contentFit: 'contain',
    width: 250,
    height: 250,
    right: 20,
    top: 20,
    opacity: 0.3,
  },
  drinkIQLogo: {
    fontFamily: 'JetbrainsMono-Bold',
    marginTop: 150,
    fontSize: 60,
    color: 'white',
    letterSpacing: 3,
  },
  drinkIQOrange: {
    color: '#F76D31',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 100,
    flex: 1,
  },
  welcomeMessage: {
    fontSize: 30,
    textAlign: 'center',
    fontFamily: 'Basic',
    color: 'white',
  },
  bodyContainer: {
    flex: 4,
    marginTop: 120,
  },
  cardButtonContainer: {
    marginTop: 20,
  },
  settingsButtonContainer: {
    marginTop: 20,
  },
  tutorialButtonContainer: {
    marginTop: 20,
  },
});
