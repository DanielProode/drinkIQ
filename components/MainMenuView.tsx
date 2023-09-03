import React from 'react';
import {Button, Image, ImageBackground, StyleSheet, Text, TouchableHighlight, View} from 'react-native';

// Navigation prop temporarily as any
// https://stackoverflow.com/questions/63132548/react-navigation-5-error-binding-element-navigation-implicitly-has-an-any-ty


const image = require('../src/trivia_bg.png');


function MainMenuView( { navigation }: {navigation: any}): JSX.Element {

  return (
    <View style={styles.mainView}>
        <ImageBackground source={image} style={styles.backgroundImage}>
        <View style={styles.logoContainer}>
        <Text style={styles.drinkIQLogo}>DRINKIQ</Text>
        <Text style={styles.welcomeMessage}>Welcome to drinkIQ!</Text>
      </View>
        <View style={styles.bodyContainer}>
            <View style={styles.buttonContainer}>
                <Button onPress={() => {
                    console.log('New Game Button pressed!');
                    navigation.navigate('NewGame');
                }}
                title="New game"
                color="#AAAAAA"/>
            </View>
            <View style={styles.cardButtonContainer}>
                <Button onPress={() => {
                    console.log('Card Decks Button pressed!');
                    navigation.navigate('CardDecks');
                }}
                title="Card Decks"
                color="#AAAAAA"/>
            </View>
        </View>
        <View style={styles.settingsButtonContainer}>
            <TouchableHighlight
            activeOpacity={0.6}
            underlayColor="#DDEDDD"
            onPress={ () => navigation.navigate('Profile') }>
                <View>
                    <Image
                    style={styles.profilePicture}
                    source={require('../src/profile_icon.png')}/>
                </View>
            </TouchableHighlight>
        </View>
        </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: 'grey',
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    drinkIQLogo: {
        fontFamily: 'Knewave',
        marginTop: 100,
        fontSize: 80,
        color: 'white',
    },
    logoContainer: {
        alignItems: 'center',
        marginTop: 100,
        flex: 1,
      },
      welcomeMessage: {
        fontSize: 30,
        textAlign: 'center',
        color: 'lightgray',
        fontFamily: 'Knewave-Regular',
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
        padding: 30,
    },
    profilePicture: {
        width: 70,
        height: 70,
    },

  });
export default MainMenuView;


