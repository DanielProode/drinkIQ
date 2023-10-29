import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Keyboard, StyleSheet, Text, TextInput, View, TouchableWithoutFeedback } from 'react-native';

import Button from '../components/Button';

interface NewGameProps {
  navigation: NativeStackNavigationProp<any>;
}

export default function NewGame({ navigation }: NewGameProps) {
  const [disabled, setDisabled] = useState(true);
  const [gameCode, setGameCode] = useState('');

  // In the future, check if active game already exists with generated code
  const generateGameCode = () => {
    const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
    const generatedGameCode = randomInt(100000, 999999).toString()
    return generatedGameCode;
  };

  const onChanged = (text: string) => {
    const numbers = '0123456789';
    let newText = '';

    for (let i = 0; i < text.length; i++) {
      if (numbers.indexOf(text[i]) > -1) {
        newText = newText + text[i];
      }
    }
    setGameCode(newText);

    if (text.length === 6) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} >
      <View style={styles.newGameView}>
        <Text style={styles.drinkIQLogo}>DRINKIQ</Text>
        <View style={styles.gameCodeContainer}>
          <Text style={styles.hashtag}>#</Text>
          <TextInput
            style={styles.gameCodeInput}
            onChangeText={(text) => onChanged(text)}
            value={gameCode}
            onSubmitEditing={(value) => setGameCode(value.nativeEvent.text)}
            placeholder="XXXXXX"
            keyboardType="numeric"
            maxLength={6}
            placeholderTextColor="#FFFFFF80"
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => {
              Keyboard.dismiss();
              navigation.navigate('Lobby', { gameCode })
            }}
            text="JOIN GAME"
            disabled={disabled} />
        </View>
        <Text style={styles.hostGameText}>OR</Text>
        <View style={styles.hostGameButton}>
          <Button onPress={() => {
            navigation.navigate('Lobby', { gameCode: generateGameCode(), gameHost: true });
          }}
            text="HOST GAME" />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  newGameView: {
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    flex: 1,
  },
  drinkIQLogo: {
    fontFamily: 'Knewave',
    marginTop: 50,
    fontSize: 30,
    color: 'white',
  },
  buttonContainer: {
    marginTop: 30,
  },
  gameCodeContainer: {
    marginTop: 100,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  hashtag: {
    color: 'gray',
    fontSize: 40,
    marginTop: 20,
  },
  gameCodeInput: {
    marginTop: 20,
    width: 120,
    borderBottomWidth: 3,
    padding: 10,
    borderColor: 'gray',
    textAlign: 'center',
    fontFamily: 'CarterOne-Regular',
    fontSize: 24,
    color: 'white',
  },
  hostGameButton: {
    alignItems: 'center',
    height: 50,
    width: 100,
    marginTop: 60,
  },
  hostGameText: {
    fontFamily: 'CarterOne-Regular',
    color: 'white',
    fontSize: 40,
    marginTop: 130,
  },
});
