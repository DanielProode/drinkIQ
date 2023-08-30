import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import MainMenuView from './components/MainMenuView';

function App(): JSX.Element {
  return (
    <View style={styles.mainView}>
      <View style={styles.logoContainer}>
        <Image source={require('./src/drinkIQ_logo.png')}/>
        <Text style={styles.welcomeMessage}>Welcome to drinkIQ!</Text>
      </View>
      <MainMenuView/>
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    display: 'flex',
    backgroundColor: '#d3d3d3',
    flex: 1,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 100,
    flex: 1,
  },
  welcomeMessage: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
  },

});

export default App;
