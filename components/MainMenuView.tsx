import React from 'react';
import { Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import Button from './res/Button';

// Navigation prop temporarily as any
// https://stackoverflow.com/questions/63132548/react-navigation-5-error-binding-element-navigation-implicitly-has-an-any-ty





function MainMenuView( { navigation }: {navigation: any}): JSX.Element {

  return (
    <View style={styles.mainView}>
        <Image style={styles.cheersIcon}
                source={require('../src/cheers_icon.png')}/>
        <Text style={styles.drinkIQLogo}>DRINKIQ</Text>
        <View style={styles.logoContainer}>
        <Text style={styles.welcomeMessage}>Welcome to drinkIQ!</Text>
      </View>
        <View style={styles.bodyContainer}>
            <View style={styles.buttonContainer}>
                <Button onPress={() => {
                    console.log('New Game Button pressed!');
                    navigation.navigate('NewGame');
                }}
                text="New game"/>
            </View>
            <View style={styles.cardButtonContainer}>
                <Button onPress={() => {
                    console.log('Card Decks Button pressed!');
                    navigation.navigate('CardDecks');
                }}
                text="Card Decks"/>
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
    </View>
  );
}
const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#1E1E1E',
    },
    cheersIcon: {
        position: 'absolute',
        resizeMode: 'contain',
        width: 250,
        height: 250,
        right: 20,
        top: 20,
        opacity: 0.3,
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    drinkIQLogo: {
        fontFamily: 'Knewave',
        marginTop: 150,
        fontSize: 60,
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
        fontFamily: 'Basic',
        color: 'white',
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


