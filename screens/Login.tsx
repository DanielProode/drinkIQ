import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Image } from 'expo-image';
import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableWithoutFeedback, Keyboard, Pressable, KeyboardAvoidingView } from 'react-native';

import Button from '../components/Button';
import { ALMOSTWHITE, BACKGROUND_COLOR, LIGHTGREY, MEDIUMGREY, PRIMARY_COLOR, TRANSPARENTGREY, SECONDARY_COLOR } from '../constants/styles/colors';
import { BIG_LOGO_FONT_SIZE, FONT_FAMILY_BOLD, FONT_FAMILY_REGULAR, LOGO_FONT_FAMILY_REGULAR, REGULAR_FONT_SIZE } from '../constants/styles/typography';
import { useAuth } from '../context/authContext';
import TermsAndConditions from '../modals/TermsAndConditions';

interface LoginProps {
  navigation: NativeStackNavigationProp<any>;
}

export default function Login({ navigation }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { signIn } = useAuth();

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleLogin = async () => {
    setError('');
    try {
      await signIn(email, password);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} >
      <KeyboardAvoidingView style={styles.container}>
        <TermsAndConditions isVisible={isModalVisible} onClose={toggleModal} />
        <View style={styles.topContainer}>
        <Image contentFit="contain" style={styles.cheersIcon}
          source={require('../assets/images/cheers_icon.png')} />
        <Text style={styles.drinkIQLogo}>Drink<Text style={styles.drinkIQOrange}>IQ</Text></Text>
        </View>
        <View style={styles.middleContainer}>
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.input}
            placeholderTextColor={TRANSPARENTGREY}
            placeholder='Email'
            autoCapitalize='none'
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
          <TextInput
            style={styles.input}
            placeholderTextColor={TRANSPARENTGREY}
            placeholder='Password'
            autoCapitalize='none'
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry
          />
        </View>
        {error ? <Text style={styles.error}>Login failed: {error}</Text> : null}
          <Button text='LOGIN' onPress={handleLogin} buttonBgColor="#F76D31" buttonBorderColor="#F76D31"/>
          <Pressable
            style={styles.signUpContainer}
            onPress={() => navigation.navigate('Register')}>
            <Text style={styles.signUpText}>Don't have an account?
              <Text style={styles.innerText}> Sign Up</Text>
            </Text>
          </Pressable>
        </View>
        <View style={styles.bottomContainer}>
        <Pressable
          style={styles.touchableTerms}
          onPress={toggleModal}>
          <Text style={styles.outerText}>By signing up you agree with the
            <Text
              style={styles.innerText}> drinkIQ Terms and Conditions.</Text>
          </Text>
        </Pressable>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: BACKGROUND_COLOR,
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
  signUpContainer: {
    marginTop: 10,
    height: 30,
    justifyContent: 'center',
  },
  middleContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topContainer: {
    flex: 1,
  },
  cheersIcon: {
    position: 'absolute',
    width: 250,
    height: 250,
    right: 20,
    top: 20,
    opacity: 0.3,
  },
  textInputContainer: {
    alignItems: 'center',
    width: '100%',
  },
  input: {
    width: '80%',
    borderBottomWidth: 1,
    borderColor: MEDIUMGREY,
    borderRadius: 5,
    padding: 10,
    marginBottom: 45,
    fontFamily: FONT_FAMILY_BOLD,
    fontSize: REGULAR_FONT_SIZE,
    color: LIGHTGREY,
  },
  buttonContainer: {
    alignItems: 'center',
    rowGap: 30,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  touchableTerms: {
    bottom: 60,
  },
  outerText: {
    width: 300,
    textAlign: 'center',
    color: ALMOSTWHITE,
    fontFamily: FONT_FAMILY_REGULAR,
    lineHeight: 20,
  },
  innerText: {
    fontFamily: FONT_FAMILY_BOLD,
    color: SECONDARY_COLOR,
  },
  signUpText: {
    color: ALMOSTWHITE,
    fontFamily: FONT_FAMILY_REGULAR,
  },
  error: {
    color: 'red',
  },
});
