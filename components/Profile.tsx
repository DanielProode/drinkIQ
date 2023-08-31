import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';



function Profile(): JSX.Element {

  return (
    <View style={styles.profileView}>
        <Image style={styles.settingsButton} source={require('../src/profile_icon.png')}/>
        <Text>Welcome to the profile page!</Text>
    </View>
  );
}
const styles = StyleSheet.create({
    settingsButton: {
        height: 50,
        width: 50,
    },
    profileView: {
      alignItems: 'center',
      marginTop: 100,
    },

  });
export default Profile;


