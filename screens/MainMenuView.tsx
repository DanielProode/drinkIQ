import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View } from 'react-native';

import Button from '../components/Button';

interface MainMenuViewProps {
  navigation: NativeStackNavigationProp<any>;
}

export default function MainMenuView({ navigation }: MainMenuViewProps) {

  return (
    <View style={styles.mainView}>
      <Image style={styles.cheersIcon}
        source={require('../assets/images/cheers_icon.png')} />
      <Text style={styles.drinkIQLogo}>DRINKIQ</Text>
      <View style={styles.logoContainer}>
        <Text style={styles.welcomeMessage}>Welcome to drinkIQ!</Text>
      </View>
      <View style={styles.bodyContainer}>
        <View >
          <Button onPress={() => {
            navigation.navigate('NewGame');
          }}
            text="New game" />
        </View>
        <View style={styles.cardButtonContainer}>
          <Button onPress={() => {
            navigation.navigate('CardDecks');
          }}
            text="Card Decks" />
        </View>
        <View style={styles.settingsButtonContainer}>
          <Button onPress={() => {
            navigation.navigate('Settings');
          }}
            text="Settings" />
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
    resizeMode: 'contain',
    width: 250,
    height: 250,
    right: 20,
    top: 20,
    opacity: 0.3,
  },
  drinkIQLogo: {
    fontFamily: 'Knewave',
    marginTop: 150,
    fontSize: 60,
    color: 'white',
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
  },
  cardButtonContainer: {
    marginTop: 20,
  },
  settingsButtonContainer: {
    marginTop: 20,
  },
});
