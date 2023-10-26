import { doc, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

import Button from '../components/Button';
import { useAuth } from '../context/authContext';
import { FIREBASE_DB } from '../firebaseConfig.js';

export default function Register() {
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const db = FIREBASE_DB;
  const { signUp } = useAuth();

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
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder='Email'
        autoCapitalize='none'
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder='Nickname'
        onChangeText={(text) => setNickname(text)}
        value={nickname}
      />
      <TextInput
        style={styles.input}
        placeholder='Password'
        autoCapitalize='none'
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder='Confirm Password'
        autoCapitalize='none'
        onChangeText={(text) => setPasswordConfirm(text)}
        value={passwordConfirm}
        secureTextEntry
      />
      <Button text='Sign Up' onPress={handleSignUp} />
      {error ? <Text style={styles.error}>Sign Up failed: {error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: 'white',
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'white'
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});
