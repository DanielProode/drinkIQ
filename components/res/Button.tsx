import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const width = Dimensions.get('window').width;

function Button({ text, onPress, disabled}: any): JSX.Element {

  return (
    <TouchableOpacity onPress={onPress}
                      disabled={disabled}>
      <View style={ disabled ? styles.btnDisabledContainer : styles.btnContainer}>
        <Text style={styles.btnText}> {text} </Text>
      </View>
    </TouchableOpacity>

  );
}
const styles = StyleSheet.create({
    btnContainer: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 8,
        width: width / 1.3,
        borderRadius: 5,
    },
    btnDisabledContainer: {
      backgroundColor: '#FFFFFF50',
      paddingVertical: 8,
      width: width / 1.3,
      borderRadius: 5,
  },
    btnText: {
        color: '#1E1E1E',
        fontSize: 16,
        textTransform: 'uppercase',
        textAlign: 'center',
        fontFamily: 'Basic',
    },

  });
export default Button;
