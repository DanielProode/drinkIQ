import React, { useState } from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { TextInput } from 'react-native';

function JoinGame( { navigation }: {navigation: any}): JSX.Element {

    const [ code, getCode ] = useState('');
    const [ number, setNumber ] = React.useState('');

    const onChanged = (text: string) => {
        let newText = '';
        let numbers = '0123456789';

        for (var i = 0; i < text.length; i++) {
            if (numbers.indexOf(text[i]) > -1 ) {
                newText = newText + text[i];
            }
        }
        setNumber(newText);
    };

  return (
    <View style={styles.joinGameView}>
    <Text style={styles.enterCodeText}>ENTER GAME CODE:</Text>
    <TextInput
        style={styles.gameCodeInput}
        onChangeText = {(text)=> onChanged(text)}
        value={number}
        onSubmitEditing={(value) => getCode(value.nativeEvent.text)}
        placeholder="#XXXXXX"
        keyboardType="numeric"
        maxLength={6}
        />
        <Text>Game code is: {code}</Text>
        <TouchableHighlight
            activeOpacity={0.6}
            underlayColor={'#d3d3d3'}
            onPress={ () => navigation.navigate('GameView') }
            style={styles.startGameButton}>
                <Text>JOIN GAME</Text>
        </TouchableHighlight>
    </View>

  );
}
const styles = StyleSheet.create({
    joinGameView: {
        alignItems: 'center',
        backgroundColor: '#1E1E1E',
        flex: 1,
    },
    gameCodeInput: {
        marginTop: 50,
        width: 120,
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
        borderColor: 'gray',
        textAlign: 'center',
        color: 'white',
    },
    enterCodeText: {
        fontSize: 30,
        marginTop: 200,
        color: 'white',
    },
    startGameButton: {
        padding: 10,
        backgroundColor: '#DDDDDD',
        marginTop: 50,
    },
  });
export default JoinGame;
