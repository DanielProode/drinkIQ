import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useState, useCallback } from 'react';
import { Image, StyleSheet, Text, Pressable, View } from 'react-native';

import TermsAndConditions from './TermsAndConditions';
import Button from '../components/Button';
interface WelcomeViewProps {
  navigation: NativeStackNavigationProp<any>;
}

export default function WelcomeView({ navigation }: WelcomeViewProps) {
  const [fontsLoaded, fontError] = useFonts({
    'Basic': require('../assets/fonts/Basic.ttf'),
    'Cabin-Bold': require('../assets/fonts/Cabin-Bold.ttf'),
    'Cabin-Medium': require('../assets/fonts/Cabin-Medium.ttf'),
    'Cabin-Regular': require('../assets/fonts/Cabin-Regular.ttf'),
    'Cabin-SemiBold': require('../assets/fonts/Cabin-SemiBold.ttf'),
    'CarterOne-Regular': require('../assets/fonts/CarterOne-Regular.ttf'),
    'Knewave': require('../assets/fonts/Knewave.ttf'),
  });
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  }

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return <></>;
  }

  return (
    <View style={styles.welcomeView} onLayout={onLayoutRootView}>
      <TermsAndConditions isVisible={isModalVisible} onClose={toggleModal} />
      <Image style={styles.cheersIcon}
        source={require('../assets/images/cheers_icon.png')} />
      <Text style={styles.drinkIQLogo}>DRINKIQ</Text>
      <View style={styles.contentView}>
        <Text style={styles.welcomeText}>Log in To start playing!</Text>
        <View style={styles.googleLogoContainer}>
          <Button
            onPress={() => navigation.navigate('Login')}
            text="LOGIN" />
        </View>
        <View style={styles.appleLogoContainer}>
        <Button
            onPress={() => navigation.navigate('Register')}
            text="REGISTER" />
        </View>
      </View>
      <Pressable
        style={styles.touchableTerms}
        onPress={toggleModal}>
        <Text style={styles.outerText}>By signing up you agree with the
          <Text
            style={styles.innerText}> drinkIQ Terms and Conditions.</Text>
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  welcomeView: {
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    flexDirection: 'column',
    flex: 1,
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
  contentView: {
    marginTop: 150,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 23,
    fontFamily: 'Basic',
    color: 'white',
  },
  touchableTerms: {
    flex: 1,
    alignItems: 'center',
  },
  googleLogo: {
    height: 50,
    width: 315,
  },
  googleLogoContainer: {
    marginTop: 20,
  },
  appleLogoContainer: {
    marginTop: 20,
  },
  appleLogo: {
    height: 50,
    width: 315,
  },
  innerText: {
    fontFamily: 'Cabin-Bold',
    color: '#FFFFFF95',
  },
  outerText: {
    position: 'absolute',
    bottom: 0,
    width: 300,
    textAlign: 'center',
    marginBottom: 20,
    color: '#FFFFFF95',
    fontFamily: 'Cabin-Regular',
  },
});
