import React from 'react';
import { Image, StyleSheet, View } from 'react-native';



function ProfileButton(): JSX.Element {

  return (
    <View>
        <Image style={styles.settingsButton} source={require('../src/profile_icon.png')}/>
    </View>
  );
}
const styles = StyleSheet.create({
    settingsButton: {
        height: 50,
        width: 50,
    },

  });
export default ProfileButton;


