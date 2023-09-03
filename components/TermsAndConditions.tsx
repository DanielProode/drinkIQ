import React, { } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

function TermsAndConditions(props: { visibility: any; }): JSX.Element {

    const { visibility } = props;

  return (
    <View style={styles.termsView}>
        <View style={styles.termsView}>
        <Text style={styles.closeButton} onPress={() => visibility(false)}>X</Text>
        <View style={styles.termsTextView} >
            <ScrollView>
            <Text style={styles.text}>Terms and conditions</Text>
            <Text style={styles.termsParagraph}>1. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque id purus ac massa maximus ornare nec ac risus. Quisque convallis maximus nunc, vitae porta nisl tincidunt a. Proin at sem vestibulum, convallis turpis a, lacinia mi. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Pellentesque mattis efficitur augue vitae auctor. Fusce massa lacus, tincidunt non turpis at, malesuada pellentesque libero. In hac habitasse platea dictumst. Nullam sem eros, ullamcorper nec maximus et, porttitor sit amet nisl. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec eu eleifend est, dignissim cursus massa. Donec ut elementum leo, vitae tincidunt velit. Nullam placerat lectus urna, a aliquet leo dictum a. Aliquam erat volutpat.</Text>
            <Text style={styles.termsParagraph}>2. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque id purus ac massa maximus ornare nec ac risus. Quisque convallis maximus nunc, vitae porta nisl tincidunt a. Proin at sem vestibulum, convallis turpis a, lacinia mi. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Pellentesque mattis efficitur augue vitae auctor. Fusce massa lacus, tincidunt non turpis at, malesuada pellentesque libero. In hac habitasse platea dictumst. Nullam sem eros, ullamcorper nec maximus et, porttitor sit amet nisl. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec eu eleifend est, dignissim cursus massa. Donec ut elementum leo, vitae tincidunt velit. Nullam placerat lectus urna, a aliquet leo dictum a. Aliquam erat volutpat.</Text>
            <Text style={styles.termsParagraph}>3. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque id purus ac massa maximus ornare nec ac risus. Quisque convallis maximus nunc, vitae porta nisl tincidunt a. Proin at sem vestibulum, convallis turpis a, lacinia mi. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Pellentesque mattis efficitur augue vitae auctor. Fusce massa lacus, tincidunt non turpis at, malesuada pellentesque libero. In hac habitasse platea dictumst. Nullam sem eros, ullamcorper nec maximus et, porttitor sit amet nisl. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec eu eleifend est, dignissim cursus massa. Donec ut elementum leo, vitae tincidunt velit. Nullam placerat lectus urna, a aliquet leo dictum a. Aliquam erat volutpat.</Text>
            </ScrollView>
        </View>
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
        fontFamily: 'Basic',
        color: '#1E1E1E',
        fontSize: 40,
        right: 5,
        top: 5,
    },
    termsTextView: {
        marginTop: 50,
    },
    text: {
        color: 'black',
        fontSize: 20,
        fontFamily: 'Basic',
    },
    termsParagraph: {
        marginTop: 10,
    },
  });
export default TermsAndConditions;
