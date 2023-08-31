import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function GameView(): JSX.Element {

  return (
    <View style={styles.gameView}>
      <Text style={styles.gameText}>Main Game</Text>
    </View>

  );
}
const styles = StyleSheet.create({
    gameView: {
        marginTop: 100,
        alignItems: 'center',
    },
    gameText: {
        fontSize: 50,
    }
  });
export default GameView;
