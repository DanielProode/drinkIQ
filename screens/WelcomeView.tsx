import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Image, StyleSheet, Text, Pressable, View } from 'react-native';

import TermsAndConditions from './TermsAndConditions';
import Button from '../components/Button';
interface WelcomeViewProps {
  navigation: NativeStackNavigationProp<any>;
}

export default function WelcomeView({ navigation }: WelcomeViewProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  }

  return (
    <View style={styles.welcomeView}>
      <TermsAndConditions isVisible={isModalVisible} onClose={toggleModal} />
      <Image style={styles.cheersIcon}
        source={require('../assets/images/cheers_icon.png')} />
      <Text style={styles.drinkIQLogo}>DRINKIQ</Text>
      <View style={styles.contentView}>
        <Text style={styles.welcomeText}>Welcome!</Text>
        <View style={styles.loginSignupButtonContainer}>
          <Button
            onPress={() => navigation.navigate('Login')}
            text="LOG IN"
            buttonWidthNumber={2.78} 
            buttonBgColor='#6C8EC870'/>
        <Button
            onPress={() => navigation.navigate('Register')}
            text="SIGN UP"
            buttonWidthNumber={2.78} />
        </View>
        <View style={styles.buttonContainer}>
        <Button
            onPress={() => navigation.navigate('Register')}
            text="JOIN GAME AS GUEST"
            buttonWidthNumber={1.3} />
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
  loginSignupButtonContainer: {
    marginTop: 20,
    gap: 20,
    flexDirection: 'row',
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
  buttonContainer: {
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
    bottom: 20,
    width: 300,
    textAlign: 'center',
    marginBottom: 20,
    color: '#FFFFFF95',
    fontFamily: 'Cabin-Regular',
  },
});
