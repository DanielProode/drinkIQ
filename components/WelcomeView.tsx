import React from 'react';
import { Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native';

function WelcomeView( { navigation }: {navigation: any}): JSX.Element {

  return (
    <View style={styles.welcomeView}>
    <Text style={styles.welcomeText}>Welcome to drinkIQ!</Text>
    <Text style={styles.googleLogin}>Log In to start playing!</Text>
    <TouchableHighlight
            activeOpacity={0.6}
            underlayColor="#DDDDDD"
            onPress={ () => navigation.navigate('MainMenuView') }>
                <View>
                    <Image
                    style={styles.googleLogo}
                    source={require('../src/google_logo.png')}/>
                </View>
            </TouchableHighlight>
    </View>

  );
}
const styles = StyleSheet.create({
    welcomeView: {
        marginTop: 100,
        alignItems: 'center',
    },
    welcomeText: {
        fontSize: 40,
    },
    googleLogo: {
        height: 100,
        width: 200,
    },
    googleLogin: {
        marginTop: 100,
        fontSize: 20,
    },
  });
export default WelcomeView;
