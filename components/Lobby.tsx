import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';

function Lobby( { navigation }: {navigation: any}): JSX.Element {

    let gameCode = 0;

    function generateCode() {
        const randomInt = (min: number, max: number) =>
        Math.floor(Math.random() * (max - min + 1)) + min;

        // In the future, check if active game already exists with generated code

        gameCode = randomInt(100000, 999999);
    }

    generateCode();

  return (
    <View style={styles.joinGameView}>
    <Text style={styles.roomCodeText}>ROOM CODE:</Text>
    <Text style={styles.codeText}>#{gameCode}</Text>
    <TouchableHighlight
            activeOpacity={0.6}
            underlayColor={'#d3d3d3'}
            onPress={ () =>
                navigation.navigate('GameView', {gameCode: gameCode}) }
            style={styles.startGameButton}>
                <Text>START GAME</Text>
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
    },
    roomCodeText: {
        fontSize: 50,
        marginTop: 200,
        color: 'white',
    },
    codeText: {
        fontSize: 40,
        color: 'white',
    },
    startGameButton: {
        padding: 10,
        backgroundColor: '#DDDDDD',
        marginTop: 50,
    },
  });
export default Lobby;
