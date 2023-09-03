//import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Button, StyleSheet, View } from 'react-native';


function NewGame( { navigation }: {navigation: any}): JSX.Element {

  return (
    <View style={styles.newGameView}>
      <View style={styles.buttonContainer}>
        <Button onPress={() => {
            console.log('Host Game Button pressed!');
            navigation.navigate('Lobby');
        }}
        title="HOST GAME"
        color="#FFFFFF"/>
       </View>
        <View style={styles.buttonContainer}>
            <Button onPress={() => {
                console.log('Join Game Button pressed!');
                navigation.navigate('JoinGame');
            }}
            title="JOIN GAME"
            color="#FFFFFA"/>
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
    buttonContainer: {
      height: 50,
      width: 100,
      marginTop: 50,
    },
    cardButtonContainer: {

    },
  });
export default NewGame;


