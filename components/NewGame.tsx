//import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Button from './res/Button';


function NewGame( { navigation }: {navigation: any}): JSX.Element {

  return (
    <View style={styles.newGameView}>
      <View style={styles.hostGameButton}>
        <Button onPress={() => {
            console.log('Host Game Button pressed!');
            navigation.navigate('Lobby');
        }}
        text="HOST GAME"/>
       </View>
        <View style={styles.joinGameButton}>
            <Button onPress={() => {
                console.log('Join Game Button pressed!');
                navigation.navigate('JoinGame');
            }}
            text="JOIN GAME"/>
        </View>
      </View>

  );
}
const styles = StyleSheet.create({
    settingsButton: {
        height: 50,
    },
    newGameView: {
      alignItems: 'center',
      backgroundColor: '#1E1E1E',
      flex: 1,
    },
    hostGameButton: {
      alignItems: 'center',
      height: 50,
      width: 100,
      marginTop: 200,
    },
    joinGameButton: {
      alignItems: 'center',
      height: 50,
      width: 100,
      marginTop: 50,
    },
    cardButtonContainer: {

    },
  });
export default NewGame;


