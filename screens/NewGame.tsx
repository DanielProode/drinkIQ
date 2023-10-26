import { useState } from 'react';
import { Keyboard, StyleSheet, Text, TextInput, View, TouchableWithoutFeedback } from 'react-native';

import Button from '../components/Button';


export default function NewGame({ navigation }: { navigation: any }) {
  const [number, setNumber] = useState('');
  const [disabled, setDisabled] = useState(true)
  const onChanged = (text: string) => {
    const numbers = '0123456789';
    let newText = '';

    for (let i = 0; i < text.length; i++) {
      if (numbers.indexOf(text[i]) > -1) {
        newText = newText + text[i];
      }
    }
    setNumber(newText);

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
        value={number}
        onSubmitEditing={(value) => setNumber(value.nativeEvent.text)}
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
            navigation.navigate('JoinGame', { gameCode: number })}}
          text="JOIN GAME"
          disabled={disabled} />
      </View>
      <Text style={styles.hostGameText}>OR</Text>
      <View style={styles.hostGameButton}>
        <Button onPress={() => {
          console.log('Host Game Button pressed!');
          navigation.navigate('HostGame');
        }}
          text="HOST GAME" />
      </View>
    </View>
    </TouchableWithoutFeedback>

  );
}

const styles = StyleSheet.create({
  enterCodeText: {
    fontSize: 30,
    marginTop: 200,
    fontFamily: 'CarterOne-Regular',
    color: 'white',
  },
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
