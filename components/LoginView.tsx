import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function LoginView(): JSX.Element {

  return (
    <View style={styles.loginView}>
      <Text>Log In With Google</Text>
    </View>

  );
}
const styles = StyleSheet.create({
    loginView: {
        marginTop: 100,
        alignItems: 'center',
    },
  });
export default LoginView;
