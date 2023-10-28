import { doc, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, TouchableWithoutFeedback, Keyboard } from 'react-native';

import TermsAndConditions from './TermsAndConditions';
import Button from '../components/Button';
import { useAuth } from '../context/authContext';
import { FIREBASE_DB } from '../firebaseConfig.js';

export default function Register() {

  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  }

  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const { signUp } = useAuth();
  const db = FIREBASE_DB;

  const handleSignUp = async () => {
    setError('');
    try {
      if (password !== passwordConfirm) {
        setError('Passwords do not match');
        return;
      }
      const registerResponse = await signUp(email, password);
      const user = registerResponse.user;
      const usersCollection = doc(db, 'users', user.uid);
      await setDoc(usersCollection, {
        username: nickname,
        games_won: 0,
        total_drinks: 0,
        total_points: 0,
        packs_owned: ["estonia"]
      });
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} >
      <View style={styles.container}>
        <TermsAndConditions isVisible={isModalVisible} onClose={toggleModal} />
        <Text style={styles.drinkIQLogo}>DRINKIQ</Text>
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.input}
            placeholderTextColor='#ABABAB80'
            placeholder='Nickname'
            autoCapitalize='none'
            onChangeText={(text) => setNickname(text)}
            value={nickname}
          />
          <TextInput
            style={styles.input}
            placeholderTextColor='#ABABAB80'
            placeholder='Email'
            autoCapitalize='none'
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
          <TextInput
            style={styles.input}
            placeholder='Password'
            placeholderTextColor='#ABABAB80'
            autoCapitalize='none'
            textContentType="oneTimeCode" // Hacky solution to disable iOS password autofill
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry
            autoCorrect={false}
          />
          <TextInput
            style={styles.input}
            placeholderTextColor='#ABABAB80'
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
          <Button text='Sign Up' onPress={handleSignUp} />
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
    backgroundColor: '#1E1E1E',
  },
  drinkIQLogo: {
    marginTop: 100,
    fontFamily: 'Knewave',
    fontSize: 40,
    color: 'white',
  },
  textInputContainer: {
    marginTop: 100,
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
    color: 'white',
    fontFamily: 'Basic',
  },
  input: {
    width: '80%',
    height: 40,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 45,
    fontFamily: 'Cabin-Regular',
    fontSize: 18,
    color: '#ABABAB',
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

    alignItems: 'center',
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
