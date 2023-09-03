import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native';
import Button from './res/Button';

function JoinGame( { navigation }: {navigation: any}): JSX.Element {

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
        onSubmitEditing={(value) => setNumber(value.nativeEvent.text)}
        placeholder="#XXXXXX"
        keyboardType="numeric"
        maxLength={6}
        />
        <Text style={styles.gameCode}>Game code is: {number}</Text>
        <View style={styles.buttonContainer}>
        <Button
            onPress={ () =>
                navigation.navigate('GameView', {gameCode: number}) }
            text="JOIN GAME"/>
        </View>
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
        marginTop: 20,
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
    buttonContainer: {
        marginTop: 30,
    },
    gameCode: {
        color: '#FFFFFF80',
    },
    startGameButton: {
        padding: 10,
        backgroundColor: '#DDDDDD',
        marginTop: 50,
    },
  });
export default JoinGame;
