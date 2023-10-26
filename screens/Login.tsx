import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';

import Button from '../components/Button';
import { useAuth } from '../context/authContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signIn } = useAuth();

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
      <View style={styles.container}>
        <Text style={styles.drinkIQLogo}>DRINKIQ</Text>
        <View style={styles.textInputContainer}>
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
            placeholderTextColor='#ABABAB80'
            placeholder='Password'
            autoCapitalize='none'
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button text='LOGIN' onPress={handleLogin} />
          {error ? <Text style={styles.error}>Login failed: {error}</Text> : null}
        </View>
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
    marginTop: 150,
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    marginTop: 100,
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
    flex: 1.6,
    alignItems: 'center',
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});
