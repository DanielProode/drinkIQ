import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';

function Lobby( { navigation }: {navigation: any}): JSX.Element {


    function generateCode() {
        const randomInt = (min: number, max: number) => 
        Math.floor(Math.random() * (max - min + 1)) + min;

        // In the future, check if active game already exists with generated code

        return randomInt(100000, 999999);
    }

  return (
    <View style={styles.joinGameView}>
    <Text style={styles.roomCodeText}>ROOM CODE:</Text>
    <Text style={styles.codeText}>#{generateCode()}</Text>
    <TouchableHighlight
            activeOpacity={0.6}
            underlayColor={'#d3d3d3'}
            onPress={ () => navigation.navigate('GameView') }
            style={styles.startGameButton}>
                <Text>START GAME</Text>
    </TouchableHighlight>
    </View>

  );
}


const styles = StyleSheet.create({
    joinGameView: {
        marginTop: 100,
        alignItems: 'center',
    },
    gameCodeInput: {
        marginTop: 50,
        width: 120,
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
        borderColor: 'gray',
        textAlign: 'center',
    },
    roomCodeText: {
        fontSize: 50,
    },
    codeText: {
        fontSize: 40,
    },
    startGameButton: {
        padding: 10,
        backgroundColor: '#DDDDDD',
        marginTop: 50,
    },
  });
export default Lobby;
