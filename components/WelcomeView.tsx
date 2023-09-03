import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import TermsAndConditions from './TermsAndConditions';

function WelcomeView( { navigation }: {navigation: any}): JSX.Element {

    const [ visibility, setVisibility ] = useState(false);

  return (
    <View style={styles.welcomeView}>
        {visibility ? (<TermsAndConditions visibility={setVisibility} />) : null}
        <Text style={styles.drinkIQLogo}>DRINKIQ</Text>
        <View style={styles.contentView}>
            <Text style={styles.welcomeText}>Log in To start playing!</Text>
            <View style={styles.googleLogoContainer}>
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={ () => navigation.navigate('MainMenuView') }>
                    <Image
                    style={styles.googleLogo}
                    source={require('../src/google_icon.png')}/>
            </TouchableOpacity>
            </View>
            <View style={styles.appleLogoContainer}>
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={ () => navigation.navigate('MainMenuView') }>
                    <Image
                    style={styles.appleLogo}
                    source={require('../src/apple_icon.png')}/>
            </TouchableOpacity>
            </View>
        </View>
        <Text style={styles.outerText}>By signing up you agree with the
        <Text onPress={()=>
        setVisibility(!visibility)} style={styles.innerText}> drinkIQ Terms and Conditions.</Text>
        </Text>
    </View>

  );
}
const styles = StyleSheet.create({
    welcomeView: {
        alignItems: 'center',
        backgroundColor: '#1E1E1E',
        flexDirection: 'column',
        flex: 1,
    },
    drinkIQLogo: {
        fontFamily: 'Knewave',
        marginTop: 100,
        fontSize: 80,
        color: 'white',
    },
    contentView: {
        marginTop: 150,
        alignItems: 'center',
    },
    welcomeText: {
        fontSize: 23,
        fontFamily: 'Basic',
        color: 'white',
    },
    googleLogo: {
        height: 50,
        width: 315,
    },
    googleLogoContainer: {
        marginTop: 40,
    },
    appleLogoContainer: {
        marginTop: 20,
    },
    appleLogo: {
        height: 50,
        width: 315,
    },
    googleLogin: {
        marginTop: 100,
        fontSize: 20,
    },
    innerText: {
        fontFamily: 'Cabin-Bold',
        color: '#FFFFFF95',
    },
    outerText: {
        position: 'absolute',
        bottom: 0,
        width: 300,
        textAlign: 'center',
        marginBottom: 20,
        color: '#FFFFFF95',
        fontFamily: 'Cabin',
    },
  });
export default WelcomeView;
