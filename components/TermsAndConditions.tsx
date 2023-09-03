import React, { } from 'react';
import { StyleSheet, Text, View } from 'react-native';

function TermsAndConditions(props: { visibility: any; }): JSX.Element {

    const { visibility } = props;

  return (
    <View style={styles.termsView}>
        <View>
        <Text style={styles.closeButton} onPress={() => visibility(false)}>X</Text>
        <Text style={styles.text}>TNC LOREM IPSUM</Text>
        </View>
    </View>

  );
}
const styles = StyleSheet.create({
    termsView: {
        position: 'absolute',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        top: 20, bottom: 20, left: 20, right: 20,
        padding: 10,
        zIndex: 1,
    },
    closeButton: {
        position: 'absolute',
        fontSize: 40,
        right: 5,
        top: 5,
    },
    text: {
        color: 'black',
        fontSize: 20,
    },
  });
export default TermsAndConditions;
