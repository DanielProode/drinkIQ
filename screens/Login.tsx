import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Image } from 'expo-image';
import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableWithoutFeedback, Keyboard, Pressable } from 'react-native';

import Button from '../components/Button';
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
      <View style={styles.container}>
        <TermsAndConditions isVisible={isModalVisible} onClose={toggleModal} />
        <Image style={styles.cheersIcon}
          source={require('../assets/images/cheers_icon.png')} />
        <Text style={styles.drinkIQLogo}>Drink<Text style={styles.drinkIQOrange}>IQ</Text></Text>
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
          {error ? <Text style={styles.error}>Login failed: {error}</Text> : null}
          <Button text='LOGIN' onPress={handleLogin} buttonBgColor="#F76D31" buttonBorderColor="#F76D31"/>
          <Pressable
            onPress={() => navigation.navigate('Register')}>
            <Text style={styles.signUpText}>Don't have an account?
              <Text style={styles.innerText}> Sign Up</Text>
            </Text>
          </Pressable>
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
    fontFamily: 'JetbrainsMono-Bold',
    marginTop: 150,
    fontSize: 60,
    color: 'white',
    letterSpacing: 3,
  },
  drinkIQOrange: {
    color: '#F76D31',
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
  textInputContainer: {
    marginTop: 100,
    width: '100%',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 45,
    fontFamily: 'JosefinSans-Bold',
    fontSize: 18,
    color: '#ABABAB',
  },
  buttonContainer: {
    alignItems: 'center',
    rowGap: 30,
  },
  touchableTerms: {
    flex: 1,
    alignItems: 'center',
  },
  outerText: {
    position: 'absolute',
    bottom: 20,
    width: 300,
    textAlign: 'center',
    marginBottom: 20,
    color: '#FFFFFF95',
    fontFamily: 'JosefinSans-Regular',
  },
  signUpText: {
    color: '#FFFFFF95',
    fontFamily: 'JosefinSans-Regular',
  },
  innerText: {
    fontFamily: 'JosefinSans-Bold',
    color: 'white',
  },
  error: {
    color: 'red',
  },
});
