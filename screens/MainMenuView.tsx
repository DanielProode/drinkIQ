import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import Button from '../components/Button';

// Navigation prop temporarily as any
// https://stackoverflow.com/questions/63132548/react-navigation-5-error-binding-element-navigation-implicitly-has-an-any-ty

export default function MainMenuView({ navigation }: { navigation: any }): JSX.Element {
  const [fontsLoaded, fontError] = useFonts({
    'Basic': require('../assets/fonts/Basic.ttf'),
    'Cabin-Bold': require('../assets/fonts/Cabin-Bold.ttf'),
    'Cabin-Medium': require('../assets/fonts/Cabin-Medium.ttf'),
    'Cabin-Regular': require('../assets/fonts/Cabin-Regular.ttf'),
    'Cabin-SemiBold': require('../assets/fonts/Cabin-SemiBold.ttf'),
    'CarterOne-Regular': require('../assets/fonts/CarterOne-Regular.ttf'),
    'Knewave': require('../assets/fonts/Knewave.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return <></>;
  }

  return (
    <View style={styles.mainView} onLayout={onLayoutRootView}>
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
