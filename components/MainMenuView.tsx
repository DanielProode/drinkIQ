import React from 'react';
import {Alert, Button, StyleSheet, TouchableHighlight, View} from 'react-native';
import ProfileButton from '../components/ProfileButton';


function onPressButton () {
    Alert.alert('You pressed settings!!');
}

function MainMenuView(): JSX.Element {

  return (
    <View style={styles.mainView}>
        <View style={styles.bodyContainer}>
            <View style={styles.buttonContainer}>
                <Button onPress={() => {
                    console.log('New Game Button pressed!');
                }}
                title="New game"
                color="#AAAAAA"/>
            </View>
            <View style={styles.cardButtonContainer}>
                <Button onPress={() => {
                    console.log('Card Decks Button pressed!');
                }}
                title="Card Decks"
                color="#AAAAAA"/>
            </View>
        </View>
        <View style={styles.settingsButtonContainer}>
            <TouchableHighlight
            activeOpacity={0.6}
            underlayColor="#DDDDDD"
            onPress={onPressButton}>
                <ProfileButton/>
            </TouchableHighlight>
        </View>
    </View>
  );
}
const styles = StyleSheet.create({
    mainView: {
        alignItems: 'center',
        flex: 2,
        backgroundColor: 'pink',
    },
    bodyContainer: {
        marginTop: 20,
    },
    cardButtonContainer: {
        marginTop: 20,
    },
    buttonContainer: {
        marginTop: 50,
    },
    settingsButtonContainer: {
        marginTop: 'auto',
        marginLeft: 'auto',
        padding: 50,
    },

  });
export default MainMenuView;


