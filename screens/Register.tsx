import { doc, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, TouchableWithoutFeedback, Keyboard } from 'react-native';

import Button from '../components/Button';
import { DEFAULT_PACK } from '../constants/general';
import { ALMOSTWHITE, BACKGROUND_COLOR, LIGHTGREY, MEDIUMGREY, PRIMARY_COLOR, TRANSPARENTGREY, SECONDARY_COLOR } from '../constants/styles/colors';
import { FONT_FAMILY_BOLD, FONT_FAMILY_REGULAR, LOGO_FONT_FAMILY_REGULAR, MEDIUM_LOGO_FONT_SIZE, REGULAR_FONT_SIZE, REGULAR_LOGO_FONT_SIZE } from '../constants/styles/typography';
import { useAuth } from '../context/authContext';
import { FIREBASE_DB } from '../firebaseConfig.js';
import TermsAndConditions from '../modals/TermsAndConditions';

export default function Register() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const { signUp } = useAuth();

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  }

  const handleSignUp = async () => {
    setError('');
    try {
      if (password !== passwordConfirm) {
        setError('Passwords do not match');
        return;
      }
      const registerResponse = await signUp(email, password);
      const user = registerResponse.user;
      const usersCollection = doc(FIREBASE_DB, 'users', user.uid);
      const cardDecksPlayed: Record<string, number[]> = {
        [DEFAULT_PACK]: [],
      };
      await setDoc(usersCollection, {
        username: nickname,
        games_won: 0,
        total_drinks: 0,
        total_points: 0,
        packs_owned: [DEFAULT_PACK],
        packs_played: cardDecksPlayed,
      });
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} >
      <View style={styles.container}>
        <TermsAndConditions isVisible={isModalVisible} onClose={toggleModal} />
        <Text style={styles.drinkIQLogo}>Drink<Text style={styles.drinkIQOrange}>IQ</Text></Text>
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.input}
            placeholderTextColor={TRANSPARENTGREY}
            placeholder='Nickname'
            autoCapitalize='none'
            onChangeText={(text) => setNickname(text)}
            value={nickname}
          />
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
            placeholder='Password'
            placeholderTextColor={TRANSPARENTGREY}
            autoCapitalize='none'
            textContentType="oneTimeCode" // Hacky solution to disable iOS password autofill
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry
            autoCorrect={false}
          />
          <TextInput
            style={styles.input}
            placeholderTextColor={TRANSPARENTGREY}
            placeholder='Confirm Password'
            autoCapitalize='none'
            textContentType="oneTimeCode" // Hacky solution to disable iOS password autofill
            onChangeText={(text) => setPasswordConfirm(text)}
            value={passwordConfirm}
            secureTextEntry
            autoCorrect={false}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button text='Sign Up' onPress={handleSignUp} buttonBgColor="#F76D31" buttonBorderColor="#F76D31" />
          {error ? <Text style={styles.error}>Sign Up failed: {error}</Text> : null}
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
    marginTop: 100,
    fontFamily: LOGO_FONT_FAMILY_REGULAR,
    fontSize: MEDIUM_LOGO_FONT_SIZE,
    color: SECONDARY_COLOR,
    letterSpacing: 3,
  },
  drinkIQOrange: {
    color: PRIMARY_COLOR,
  },
  textInputContainer: {
    marginTop: 100,
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: REGULAR_LOGO_FONT_SIZE,
    marginBottom: 20,
    color: SECONDARY_COLOR,
    fontFamily: FONT_FAMILY_REGULAR,
  },
  input: {
    width: '80%',
    height: 40,
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
    flex: 1,
    alignItems: 'center',
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
  touchableTerms: {
    bottom: 60,
    alignItems: 'center',
  },
  innerText: {
    fontFamily: FONT_FAMILY_BOLD,
    color: SECONDARY_COLOR,
  },
  outerText: {
    width: 300,
    textAlign: 'center',
    color: ALMOSTWHITE,
    fontFamily: FONT_FAMILY_REGULAR,
    lineHeight: 20,
  },
});
