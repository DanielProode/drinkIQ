import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import Button from '../components/Button';


export default function NewGame({ navigation }: { navigation: any }): JSX.Element {
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
    <View style={styles.newGameView}>
      <Text style={styles.enterCodeText}>ENTER GAME CODE:</Text>
      <TextInput
        style={styles.gameCodeInput}
        onChangeText={(text) => onChanged(text)}
        value={number}
        onSubmitEditing={(value) => setNumber(value.nativeEvent.text)}
        placeholder="#XXXXXX"
        keyboardType="numeric"
        maxLength={6}
        placeholderTextColor="#FFFFFF80"
      />
      <View style={styles.buttonContainer}>
        <Button
          onPress={() =>
            navigation.navigate('JoinGame', { gameCode: number })}
          text="JOIN GAME"
          disabled={disabled} />
      </View>
      <Text style={styles.hostGameText}>...or Host a game yourself!</Text>
      <View style={styles.hostGameButton}>
        <Button onPress={() => {
          console.log('Host Game Button pressed!');
          navigation.navigate('HostGame');
        }}
          text="HOST GAME" />
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  settingsButton: {
    height: 50,
  },
  enterCodeText: {
    fontSize: 30,
    marginTop: 200,
    color: 'white',
  },
  newGameView: {
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    flex: 1,
  },
  buttonContainer: {
    marginTop: 30,
  },
  gameCodeInput: {
    marginTop: 20,
    width: 120,
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    borderColor: 'gray',
    textAlign: 'center',
    fontFamily: 'CarterOne-Regular',
    color: 'white',
  },
  hostGameButton: {
    alignItems: 'center',
    height: 50,
    width: 100,
    marginTop: 20,
  },
  hostGameText: {
    color: 'white',
    marginTop: 200,
  },
  joinGameButton: {
    alignItems: 'center',
    height: 50,
    width: 100,
    marginTop: 250,
  },
});
