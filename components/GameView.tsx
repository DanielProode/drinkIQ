import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function GameView ({route}: {route: any}) {

    const { gameCode } = route.params;

  return (
    <View style={styles.gameView}>
      <Text style={styles.gameText}>Main Game</Text>
      <Text style={styles.gameCode}>#{gameCode}</Text>
    </View>

  );
}
const styles = StyleSheet.create({
    gameView: {
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#1E1E1E',
    },
    gameText: {
        fontSize: 50,
        marginTop: 200,
    },
    gameCode: {
        fontSize: 20,
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
  });
export default GameView;
