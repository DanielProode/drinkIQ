import React from 'react';
import {Button, Image, ImageBackground, StyleSheet, Text, TouchableHighlight, View} from 'react-native';

// Navigation prop temporarily as any
// https://stackoverflow.com/questions/63132548/react-navigation-5-error-binding-element-navigation-implicitly-has-an-any-ty


const image = {uri: 'https://static.wixstatic.com/media/48d979_e9e241e2d4794ed684f345398d7d4ff8~mv2.png/v1/fill/w_640,h_522,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/48d979_e9e241e2d4794ed684f345398d7d4ff8~mv2.png'};


function MainMenuView( { navigation }: {navigation: any}): JSX.Element {

  return (
    <View style={styles.mainView}>
        <ImageBackground source={image} resizeMode="repeat" style={styles.backgroundImage}>
        <View style={styles.logoContainer}>
        <Image source={require('../src/drinkIQ_logo.png')}/>
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
            underlayColor="#DDDDDD"
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
        flex: 2,
        backgroundColor: 'grey',
    },
    backgroundImage: {
        flex: 2,
    },
    logoContainer: {
        alignItems: 'center',
        marginTop: 100,
        flex: 1,
      },
      welcomeMessage: {
        fontWeight: 'bold',
        fontSize: 30,
        textAlign: 'center',
        color: 'lightgray',
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
    }

  });
export default MainMenuView;


